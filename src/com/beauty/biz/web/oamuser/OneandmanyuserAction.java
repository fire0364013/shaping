package com.beauty.biz.web.oamuser;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import net.sf.json.JSONObject;

import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.convention.annotation.Results;
import org.apache.struts2.json.JSONUtil;
import org.springframework.beans.factory.annotation.Autowired;

import com.beauty.biz.entity.Departmentinfo;
import com.beauty.biz.entity.Userinfo;
import com.beauty.biz.service.DepartmentinfoManager;
import com.beauty.biz.service.UserInfoManager;
import com.beauty.common.page.QueryResult;
import com.beauty.common.utils.SearchUtil;
import com.beauty.common.web.StrutsAction;

@Results( { @Result(name = "oneUser", location = "userinfo-oneuser.jsp"),
		@Result(name = "manyUser", location = "userinfo-manyuser.jsp") })
public class OneandmanyuserAction extends StrutsAction<Userinfo> {
	private static final long serialVersionUID = 1L;
	// 删除的时候获取页面上传递的id
	private String rows;// 行数
	private String page;// 页数
	private String realname;// 查询条件 真实姓名
	private String userstatus;// 查询条件 用户状态
	private String deptid;// 用于获取部门id
	private String loginname;
	private String userid;
	private String itemid;
	private String methodid;
	private String usernametest;
	private String projectleader;// 过滤项目负责人

	// 注入的Service层
	@Autowired
	private UserInfoManager userInfoService;
	// 注入的部门的Service
	@Autowired
	private DepartmentinfoManager departmentinfoService;
	// 查询出所有部门的list
	private List<Departmentinfo> listDepar;

	/**
	 * 去往单用户页面
	 * 
	 * @return
	 * @throws Exception
	 */
	public String toOneUser() throws Exception {
		listDepar = departmentinfoService.getAll();
		getRequest().setAttribute("listDepar", listDepar);
		return "oneUser";
	}

	/**
	 * 显示单用户右侧列表
	 * 
	 * @return
	 * @throws Exception
	 */
	public String showOneUser() throws Exception {

		return "oneUserRightList";
	}

	/**
	 * 去往拥有上岗证人员页面
	 * 
	 * @throws Exception
	 */
	public String toCertificate() throws Exception {
		if (realname != null && !("").equals(realname)) {
			realname = java.net.URLDecoder.decode(realname, "UTF-8");
		}
		return "certUser";
	}

	/**
	 * 去往多用户页面
	 * 
	 * @return
	 * @throws Exception
	 */
	public String toManyUser() throws Exception {
		try{
		if (realname != null && !("").equals(realname)) {
			realname = java.net.URLDecoder.decode(realname, "UTF-8");
		}
		listDepar = departmentinfoService.getAll();
		getRequest().setAttribute("listDepar", listDepar);
		return "manyUser";
		}catch(Exception e){
			e.printStackTrace();
			return null;
		}
	}

	/**
	 * 显示多用户右侧列表
	 * 
	 * @return
	 * @throws Exception
	 */
	public String showManyUser() throws Exception {

		return "manyUserRightList";
	}

	/**
	 * 显示多用户和单用户页面的人员列表信息
	 * 
	 * @return
	 * @throws Exception
	 */
	public String toOneAndManyList() throws Exception {
		// deptid
		// 当前第几页
		int intPage = Integer.parseInt((page == null || page == "0") ? "1"
				: page);
		// 每页多少行
		int maxIndex = Integer.parseInt((rows == null || rows == "0") ? "10"
				: rows);
		// 开始页
		int startIndex = (intPage - 1) * maxIndex;

		StringBuilder whereSB = new StringBuilder();
		List<Object> params = new ArrayList<Object>();
		LinkedHashMap<String, String> orderby = new LinkedHashMap<String, String>();
		orderby.put("orderid", "asc");
		// Departmentinfo departmentinfo =
		// departmentinfoService.getByID(deptid);realname
		if (userid != null && !"".equals(userid)) {
			whereSB.append(" userid.userid not in (" + userid + ")");
		}
		SearchUtil.getStringSearch(whereSB, params, "projectleader", "=",
				this.projectleader);
		SearchUtil.getStringSearch(whereSB, params, "departmentinfo.deptid",
				"=", deptid);
		SearchUtil.getStringSearch(whereSB, params, "realname", "like",
				realname);
		SearchUtil.getStringSearch(whereSB, params, "realname", "like",
				usernametest);
		//System.out.println(whereSB.toString());
		// SearchUtil.getStringSearch(whereSB, params, "userid.userid",
		// "not in",userid);
		// ============================2：原生实体SQL==============================="
		QueryResult<Userinfo> q;
		try {
			q = userInfoService.getQueryResult(startIndex, maxIndex, whereSB
					.toString(), params.toArray(), orderby);
			// .getResultlist();
			// 总条数
			long total = q.getTotalrecord();
			List<Map<String, Object>> rowslist = new ArrayList<Map<String, Object>>();
			// QueryResult里封装的list
			List<Userinfo> userinfolist = q.getResultlist();
			// List<Userinfo> userinfolist =
			// userInfoService.validateLoginName("departmentinfo",
			// departmentinfo);
			for (Userinfo userinfo : userinfolist) {
				// 列表要显示的字段及值
				Map<String, Object> map = new HashMap<String, Object>();
				// departname
//				map.put("departname",
//						userinfo.getDepartmentinfo() != null ? userinfo
//								.getDepartmentinfo().getDeptname() : "");
				map.put("userid", userinfo.getUserid());
				// map.put("loginname", userinfo.getLoginname());
				map.put("realname", userinfo.getRealname());
				map.put("orderid", userinfo.getOrderid());
				rowslist.add(map);
			}
			Map<String, Object> mapall = new HashMap<String, Object>();
			mapall.put("total", total);
			mapall.put("rows", rowslist);
			String json = JSONObject.fromObject(mapall).toString();
			getResponse().getWriter().write(json);

		} catch (Exception e) {
		}
		return null;
	}

	/*
	 * public String toTrees() throws Exception{
	 * listDepar=departmentinfoService.getByAttr(0); //Map<String, Object>
	 * allMap=new HashMap<String, Object>(); ArrayList<Map<String, Object>>
	 * listMap = new ArrayList<Map<String, Object>>(); for (int i = 0; i <
	 * listDepar.size(); i++) { Map<String, Object> m=new HashMap<String,
	 * Object>();
	 * 
	 * List<Departmentinfo> childList =
	 * departmentinfoService.getByAttr(Integer.parseInt
	 * (listDepar.get(i).getDeptid())); ArrayList<Map<String, Object>> listchild
	 * = new ArrayList<Map<String, Object>>(); for (int j = 0; j <
	 * childList.size(); j++) { Map<String, Object> mchild=new HashMap<String,
	 * Object>(); mchild.put("id", listDepar.get(j).getDeptid());
	 * mchild.put("text", listDepar.get(j).getDeptname());
	 * listchild.add(mchild); } m.put("id", listDepar.get(i).getDeptid());
	 * m.put("text", listDepar.get(i).getDeptname()); m.put("children",
	 * listchild); listMap.add(m); }
	 * 
	 * String treeListJson = JSONUtil.serialize(listMap).toString();
	 * System.out.println(treeListJson); System.out.println(listMap);
	 * getResponse().getWriter().write(treeListJson); return null; }
	 */
	/**
	 * 查询出部门 多用户和单用户选择的那颗树
	 */
	public String toTrees() throws Exception {
		listDepar = departmentinfoService.getAllOther(deptid);
		Map<String, Object> allMap = new HashMap<String, Object>();
		ArrayList<Map<String, Object>> listMap = new ArrayList<Map<String, Object>>();
		for (int i = 0; i < listDepar.size(); i++) {
			Map<String, Object> m = new HashMap<String, Object>();
			m.put("id", listDepar.get(i).getDeptid());
			m.put("text", listDepar.get(i).getDeptname());
			// m.put("children", listchild);
			listMap.add(m);
		}
		allMap.put("id", "");
		allMap.put("text", "部门");
		allMap.put("children", listMap);
		ArrayList<Map<String, Object>> allList = new ArrayList<Map<String, Object>>();
		allList.add(allMap);
		String treeListJson = JSONUtil.serialize(allList).toString();
		// System.out.println(treeListJson);
		// System.out.println(allList);
		getResponse().getWriter().write(treeListJson);
		return null;
	}

	public List<Departmentinfo> getListDepar() {
		return listDepar;
	}

	public void setListDepar(List<Departmentinfo> listDepar) {
		this.listDepar = listDepar;
	}

	public String getRows() {
		return rows;
	}

	public void setRows(String rows) {
		this.rows = rows;
	}

	public String getPage() {
		return page;
	}

	public void setPage(String page) {
		this.page = page;
	}

	public String getRealname() {
		return realname;
	}

	public void setRealname(String realname) {
		this.realname = realname;
	}

	public String getUserstatus() {
		return userstatus;
	}

	public void setUserstatus(String userstatus) {
		this.userstatus = userstatus;
	}

	public String getDeptid() {
		return deptid;
	}

	public void setDeptid(String deptid) {
		this.deptid = deptid;
	}

	public String getLoginname() {
		return loginname;
	}

	public void setLoginname(String loginname) {
		this.loginname = loginname;
	}

	public String getUserid() {
		return userid;
	}

	public void setUserid(String userid) {
		this.userid = userid;
	}

	public String getUsernametest() {
		return usernametest;
	}

	public void setUsernametest(String usernametest) {
		this.usernametest = usernametest;
	}

	public String getProjectleader() {
		return projectleader;
	}

	public void setProjectleader(String projectleader) {
		this.projectleader = projectleader;
	}

	public String getItemid() {
		return itemid;
	}

	public void setItemid(String itemid) {
		this.itemid = itemid;
	}

	public String getMethodid() {
		return methodid;
	}

	public void setMethodid(String methodid) {
		this.methodid = methodid;
	}
}
