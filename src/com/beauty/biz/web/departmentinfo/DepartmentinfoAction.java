package com.beauty.biz.web.departmentinfo;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.convention.annotation.Results;
import org.springframework.beans.factory.annotation.Autowired;

import com.beauty.biz.entity.Departmentinfo;
import com.beauty.biz.service.DepartmentinfoManager;
import com.beauty.biz.service.SystemlogManager;
import com.beauty.biz.service.UserInfoManager;
import com.beauty.common.page.QueryResult;
import com.beauty.common.utils.SearchUtil;
import com.beauty.common.utils.SessionUser;
import com.beauty.common.web.StrutsAction;

@Results( {
		@Result(name = "list", location = "departmentlist.jsp"),
		@Result(name = "selectlist", location = "selectdepartmentlist.jsp"),
		@Result(name = StrutsAction.RELOAD, location = "departmentinfo.action", type = StrutsAction.REDIRECT),

})
public class DepartmentinfoAction extends StrutsAction<Departmentinfo> {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	/**
	 * 
	 */
	@Autowired
	private DepartmentinfoManager departmentinfoService;
	@Autowired
	private SystemlogManager systemlogManager;

	private List<Departmentinfo> listDepar;
	private String ids;
	private String rows;
	private JSONObject result;
	private String page;
	private String deptnames;
	private String deptnameid;

	/**
	 * ajax调用，返回省份的json串
	 */
	public void getAllDepartJSON() {
		try {
			getResponse().setContentType("text/html");
			StrutsAction.getResponse().getWriter().write(
					departmentinfoService.getAllDepartJSON());
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	/**
	 * 获取所有部门返回json
	 */
	public void getDeptAll(){
		List<Departmentinfo> lists = departmentinfoService.getAll();
		List<Map<String,Object>> rowlist = new ArrayList<Map<String, Object>>();
		for(Departmentinfo dept:lists){
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("deptid", dept.getDeptid());
			map.put("deptname", dept.getDeptname()==null?"":dept.getDeptname());
			rowlist.add(map);
		}
		String json = JSONArray.fromObject(rowlist).toString();
		try {
			getResponse().getWriter().write(json);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	/**
	 * 跳入增加和编辑页面 重写父类里的doInputEntity() 在跳入增加和删除页面的时候将所有部门全部查出
	 */
	@Override
	protected void doInputEntity() throws Exception {
		listDepar = departmentinfoService.getAll();

	}

	/**
	 * 跳入查看页面 重写父类里的doViewEntity() 在跳入查看页面的时候将所有部门全部查出
	 */

	@Override
	protected void doViewEntity() throws Exception {
		listDepar = departmentinfoService.getAll();
	}

	/**
	 * 重写父类的doSaveEntity()方法 在保存的时候自定义id
	 */
	@Override
	protected void doSaveEntity() throws Exception {
		String deptid = entity.getDeptid();

		if (deptid == null || "".equals(deptid)) {
			String did = departmentinfoService.getSequence("SEQ_DEPAR");
			entity.setDeptid(did);
			// 向日志表中插入数据************开始
			SessionUser session = getSessionUser();
			String operatecontent = "增加了部门id为" + did + "的记录";
			systemlogManager.addSystemLog(session.getModule(), session
					.getUserid(), operatecontent);
			// **********************结束
		} else {
			// 向日志表中插入数据************开始
			SessionUser session = getSessionUser();
			String operatecontent = "修改了部门id为" + deptid + "的记录";
			systemlogManager.addSystemLog(session.getModule(), session
					.getUserid(), operatecontent);
			// **********************结束
		}
		departmentinfoService.saveorupadate(entity);

	}

	/**
	 * 查询出列表中所有数据 以及条件查询
	 * 
	 * @return
	 */
	public String toList() {
		// 当前第几页
		int intPage = Integer.parseInt((page == null || page == "0") ? "1"
				: page);
		// 每页多少行
		int maxIndex = Integer.parseInt((rows == null || rows == "0") ? "20"
				: rows);
		// 开始页
		int startIndex = (intPage - 1) * maxIndex;

		StringBuilder whereSB = new StringBuilder();
		List<Object> params = new ArrayList<Object>();
		LinkedHashMap<String, String> orderby = new LinkedHashMap<String, String>();
		orderby.put("orderid", "asc");
		SearchUtil.getStringSearch(whereSB, params, "deptname", "like",
				this.deptnames);
		// ============================2：原生实体SQL==============================="
		QueryResult<Departmentinfo> q;
		try {
			q = departmentinfoService.getQueryResult(startIndex, maxIndex,
					whereSB.toString(), params.toArray(), orderby);
			;// .getResultlist();
			// 总条数
			long total = q.getTotalrecord();
			List<Map<String, Object>> rowslist = new ArrayList<Map<String, Object>>();
			// QueryResult里封装的list
			List<Departmentinfo> userList = q.getResultlist();
			for (Departmentinfo departmentinfo : userList) {
				// 列表要显示的字段及值
				Departmentinfo depar = departmentinfoService
						.getByID(departmentinfo.getParentdeptid() + "");
				Map<String, Object> map = new HashMap<String, Object>();
				map.put("deptid", departmentinfo.getDeptid());
				map.put("deptname", departmentinfo.getDeptname());
				map.put("orderid", departmentinfo.getOrderid());
				if (depar != null) {
					map.put("parentdeptid", depar.getDeptname());
				} else {
					map.put("parentdeptid", "");
				}
				rowslist.add(map);
			}
			Map<String, Object> mapall = new HashMap<String, Object>();
			mapall.put("total", total);
			mapall.put("rows", rowslist);
			String json = JSONObject.fromObject(mapall).toString();
			getResponse().getWriter().write(json);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	/**
	 * 批量删除
	 */
	public void deleteAll() throws Exception {
		if (!("").equals(ids)) {
			departmentinfoService.deleteAll(ids);
			String newids = ids.replace(",", "、");
			// 向日志表中插入数据************开始
			SessionUser session = getSessionUser();
			String operatecontent = "删除了部门id为" + newids + "的记录";
			systemlogManager.addSystemLog(session.getModule(), session
					.getUserid(), operatecontent);
			// **********************结束
		}
		sendMsg("success");

	}

	/**
	 * 单条数据删除
	 * 
	 * @throws Exception
	 */
	public void deleteOnlyOne() throws Exception {
		/*
		 * List<Criterion> criterions = new ArrayList<Criterion>(); if(null!=id
		 * && !"".equals(id)){
		 * criterions.add(Restrictions.eq("parentdeptid",id)); }
		 * List<Departmentinfo>
		 * delist=departmentinfoService.queryResult(criterions.toArray(new
		 * Criterion[criterions.size()]));
		 * 
		 * List<Criterion> criterions2 = new ArrayList<Criterion>(); if(null!=id
		 * && !"".equals(id)){ criterions2.add(Restrictions.eq("deptid",id)); }
		 * 
		 * List<Userinfo> ulist =
		 * userInfoService.findByCondition(criterions2.toArray(new
		 * Criterion[criterions2.size()])); if(delist!=null){
		 * 
		 * getResponse().getWriter().write("此部门有子部门，不能删除"); } if(ulist!=null){
		 * getResponse().getWriter().write("此部门 下有用户，不能删除"); }
		 * if(delist!=null&&ulist==null){
		 */
		departmentinfoService.delete(id);
		// 向日志表中插入数据************开始
		SessionUser session = getSessionUser();
		String operatecontent = "删除了部门id为" + id + "的记录";
		systemlogManager.addSystemLog(session.getModule(), session.getUserid(),
				operatecontent);
		// **********************结束
		sendMsg("success");
		// }

	}

	/**
	 * 
	 * 去往list页面
	 */

	public String list() {
		return "list";
	}

	/**
	 * 
	 * 去往 部门弹出框形式的list页面
	 */

	public String selectlist() {
		return "selectlist";
	}

	public String getIds() {
		return ids;
	}

	public void setIds(String ids) {
		this.ids = ids;
	}

	public List<Departmentinfo> getListDepar() {
		return listDepar;
	}

	public void setListDepar(List<Departmentinfo> listDepar) {
		this.listDepar = listDepar;
	}

	public DepartmentinfoManager getDepartmentinfoService() {
		return departmentinfoService;
	}

	public void setDepartmentinfoService(
			DepartmentinfoManager departmentinfoService) {
		this.departmentinfoService = departmentinfoService;
	}

	public String getRows() {
		return rows;
	}

	public void setRows(String rows) {
		this.rows = rows;
	}

	public JSONObject getResult() {
		return result;
	}

	public void setResult(JSONObject result) {
		this.result = result;
	}

	public String getPage() {
		return page;
	}

	public void setPage(String page) {
		this.page = page;
	}

	public String getDeptnames() {
		return deptnames;
	}

	public void setDeptnames(String deptnames) {
		this.deptnames = deptnames;
	}

	public String getDeptnameid() {
		return deptnameid;
	}

	public void setDeptnameid(String deptnameid) {
		this.deptnameid = deptnameid;
	}

}
