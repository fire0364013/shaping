package com.beauty.biz.web.userroleinfo;

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

import com.beauty.biz.entity.Userroleinfo;
import com.beauty.biz.service.UserroleinfoManager;
import com.beauty.common.page.QueryResult;
import com.beauty.common.utils.SearchUtil;
import com.beauty.common.web.StrutsAction;

/**
 * 用户基础信息管理模块里面的左右移动checkbox
 * 
 * @author wjy
 * 
 */
@Results( {
		@Result(name = "json", type = "json", params = { "root", "result" }),
		@Result(name = StrutsAction.SUCCESS, location = "userroleinfo-list.jsp"),
		@Result(name = StrutsAction.RELOAD, location = "userroleinfo.action", type = StrutsAction.REDIRECT),

})
public class UserroleinfoAction extends StrutsAction<Userroleinfo> {
	private static final long serialVersionUID = 1L;
	private String id; // id 序列~
	private String userid; // 用户id
	private String roleid; // 角色id
	private String page;
	private String rows;
	private JSONObject result;

	@Autowired
	private UserroleinfoManager userroleinfoManager;
	private List<Userroleinfo> listUserroleinfo;// 查出所有角色权限
	private String ids;

	public UserroleinfoManager getUserroleinfoManager() {
		return userroleinfoManager;
	}

	public void setUserroleinfoManager(UserroleinfoManager userroleinfoManager) {
		this.userroleinfoManager = userroleinfoManager;
	}

	public List<Userroleinfo> getListUserroleinfo() {
		return listUserroleinfo;
	}

	public void setListUserroleinfo(List<Userroleinfo> listUserroleinfo) {
		this.listUserroleinfo = listUserroleinfo;
	}

	public String getIds() {
		return ids;
	}

	public void setIds(String ids) {
		this.ids = ids;
	}

	public String getPage() {
		return page;
	}

	public void setPage(String page) {
		this.page = page;
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

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getUserid() {
		return userid;
	}

	public void setUserid(String userid) {
		this.userid = userid;
	}

	public String getRoleid() {
		return roleid;
	}

	public void setRoleid(String roleid) {
		this.roleid = roleid;
	}

	/**
	 * 进入列表页面
	 */
	public String list() throws Exception {

		return "list";
	}

	/**
	 * 重写父类的方法，在保存的时候自定义id
	 */
	@Override
	protected void doSaveEntity() throws Exception {

		String userid = entity.getUserid();
		entity.setUserid(userid);

		userroleinfoManager.saveUpdate(entity);
	}

	/**
	 * 查询流程定义列表
	 * 
	 * @param mapping
	 * @param form
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	public String userroleinfoList() throws Exception {
		int intPage = Integer.parseInt((page == null || page == "0") ? "1"
				: page);
		int maxIndex = Integer.parseInt((rows == null || rows == "0") ? "20"
				: rows);
		int startIndex = (intPage - 1) * maxIndex;

		StringBuilder whereSB = new StringBuilder();
		List<Object> params = new ArrayList<Object>();
		LinkedHashMap<String, String> orderby = new LinkedHashMap<String, String>();
		orderby.put("id", "asc");
		SearchUtil.getStringSearch(whereSB, params, "userid", "like",
				this.userid);
		SearchUtil.getStringSearch(whereSB, params, "roleid", "like",
				this.roleid);

		QueryResult<Userroleinfo> q;
		q = userroleinfoManager.getQueryResult(startIndex, maxIndex, whereSB
				.toString(), params.toArray(), orderby);// .getResultlist();

		long total = q.getTotalrecord();
		List<Map<String, Object>> rows2 = new ArrayList<Map<String, Object>>();
		List<Userroleinfo> userroleList = q.getResultlist();
		// jquery easyui 需要返回的结果集
		for (Userroleinfo userroleinfo : userroleList) {
			// 列表要显示的字段及值
			Map<String, Object> map = new HashMap<String, Object>();

			map.put("id", userroleinfo.getId());
			map.put("userid", userroleinfo.getUserid());
			map.put("roleid", userroleinfo.getRoleid());

			rows2.add(map);

		}

		Map<String, Object> map = new HashMap<String, Object>();
		map.put("total", total);// jquery easyui 需要的总记录数
		map.put("rows", rows2);// jquery easyui 需要的结果集

		String first = JSONArray.fromObject(map).toString();//
		String jsonString = first.substring(1, first.length() - 1);// 去掉“[”和“]”

		result = JSONObject.fromObject(jsonString);

		return "json";

	}

	/**
	 * 这个是当修改数据的时候所使用的方法
	 */
	/*
	 * @Override protected void doInputEntity() throws Exception { String
	 * id=entity.getId(); //findCheckBox(id); //getRolesFun();
	 * //listUserroleinfo = userroleinfoManager.getAll(); }
	 */

	/**
	 * 通过角色名获得其权限列表
	 */
	public void getRolesFun() {
		result = userroleinfoManager.getRoles(id);
		try {
			sendMsg(result.toString());
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	/*
	 * 当checkRole的时候对角色进行重新判定
	 */
	public void checkBoxRole() {
		userroleinfoManager.batchCheckRole(getRequest());
		try {
			sendMsg("success");
		} catch (IOException e) {
			e.printStackTrace();
		}

	}

}
