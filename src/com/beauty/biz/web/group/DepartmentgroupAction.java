package com.beauty.biz.web.group;

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
import org.apache.struts2.json.JSONUtil;
import org.springframework.beans.factory.annotation.Autowired;

import com.beauty.biz.entity.Certificateinfo;
import com.beauty.biz.entity.Departmentinfo;
import com.beauty.biz.entity.Userinfo;
import com.beauty.biz.entity.group.Departmentgroup;
import com.beauty.biz.entity.group.Usergroup;
import com.beauty.biz.service.CertificateinfoManager;
import com.beauty.biz.service.DepartmentinfoManager;
import com.beauty.biz.service.SystemlogManager;
import com.beauty.biz.service.UserInfoManager;
import com.beauty.biz.service.group.DepartmentgroupManager;
import com.beauty.biz.service.group.UsergroupManager;
import com.beauty.common.page.QueryResult;
import com.beauty.common.utils.SearchUtil;
import com.beauty.common.utils.SessionUser;
import com.beauty.common.web.StrutsAction;

@Results( {

		@Result(name = StrutsAction.LIST, location = "departmentgroup-list.jsp"),
		@Result(name = "toUserGroup", location = "userGroup.jsp"),
		@Result(name = "toDeptGroupUser", location = "deptGroupUser.jsp"),
		@Result(name = "toDeptGroupUser2", location = "deptGroupUser2.jsp"),
		@Result(name = "toDeptGroupUser3", location = "deptGroupUser3.jsp"),
		@Result(name = "toGroupItem", location = "selectgroupitem-list.jsp"),
		@Result(name = StrutsAction.RELOAD, location = "departmentgroup.action", type = StrutsAction.REDIRECT),
		@Result(name = "toDeviceInput", location = "devicetype-input.jsp"),

})
public class DepartmentgroupAction extends StrutsAction<Departmentgroup> {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1407765809741362645L;
	@Autowired
	private DepartmentgroupManager departmentgroupManager;// 部门组的Service
	@Autowired
	private DepartmentinfoManager departmentinfoService;// 注入的部门的Service
	@Autowired
	private UsergroupManager usergroupManager;
	@Autowired
	private UserInfoManager userInfoManager;
	@Autowired
	private SystemlogManager systemlogManager;
	@Autowired
	private CertificateinfoManager certificateinfoManager;// 上岗证
	@Autowired

	private String groupid;
	private String groupname;
	private String deptid;
	private String rows;// 行数
	private String page;// 页数
	private String realname;// 查询条件 真实姓名
	private String userid;
	private String usergroupid;
	private String thisuserid;// 显示人信息的时候用
	private String username;// 显示人信息的时候用
	private String itemname;
	private String itemtype;
	private String methodname;
	private String itemtypeid;
	private String itemid;
	private String analysesetid;
	private String methodid;
	private String sampleitemtestids;
	private String devicetypeid;


	/**
	 * 查询出部门分组树
	 */
	@SuppressWarnings("unchecked")
	public String toTrees() throws Exception {
		List<Departmentinfo> listDepar = departmentinfoService.getAllOther(null);// 按序号排序 查询出部门的所有数据
		Map<String, Object> allMap = new HashMap<String, Object>();// 封装所有数据的map
		ArrayList<Map<String, Object>> departmentMap = new ArrayList<Map<String, Object>>();// 接受部门信息的list
		for (Departmentinfo departmentinfo : listDepar) {// 循环查询部门所产生的list，以下上将list循环放进map里
			Map<String, Object> m = new HashMap<String, Object>();
			m.put("id", departmentinfo.getDeptid());
			m.put("text", departmentinfo.getDeptname());
			m.put("attributes", "department");
			ArrayList<Map<String, Object>> groupMapList = new ArrayList<Map<String, Object>>();// 接受组信息的list
			String hql = "from Departmentgroup d where d.deptid=?";// 查询组信息的list，以下是将此list放进map里
			List<Departmentgroup> depargroupList = departmentgroupManager.queryEntiy(hql, departmentinfo.getDeptid()).list();
			for (Departmentgroup departmentgroup : depargroupList) {
				Map<String, Object> groupmap = new HashMap<String, Object>();
				groupmap.put("id", departmentgroup.getGroupid());
				groupmap.put("text", departmentgroup.getGroupname());
				groupmap.put("attributes", "group");
				groupMapList.add(groupmap);
			}
			m.put("children", groupMapList);// 将封装好的组的list放进部门的children里
			departmentMap.add(m);
		}
		allMap.put("id", "");
		allMap.put("text", "组");
		allMap.put("children", departmentMap);
		ArrayList<Map<String, Object>> allList = new ArrayList<Map<String, Object>>();
		allList.add(allMap);
		String treeListJson = JSONUtil.serialize(allList).toString();
		// System.out.println(treeListJson);
		// System.out.println(allList);
		getResponse().getWriter().write(treeListJson);
		return null;
	}


	/**
	 * 保存对象
	 */

	@Override
	public String save() throws Exception {
		if (id == null || id.equals("")) {
			String depgroupid = departmentgroupManager
					.getSequence("SEQ_DEPARTGROUP");
			entity.setGroupid(depgroupid);
			// 向日志表中插入数据************开始
			SessionUser session = getSessionUser();
			String operatecontent = "增加了部门组id为" + depgroupid + "的记录";
			systemlogManager.addSystemLog(session.getModule(), session
					.getUserid(), operatecontent);
			// **********************结束
		} else {
			// 向日志表中插入数据************开始
			SessionUser session = getSessionUser();
			String operatecontent = "修改了部门组id为" + id + "的记录";
			systemlogManager.addSystemLog(session.getModule(), session
					.getUserid(), operatecontent);
			// **********************结束
		}
		entity.setGroupname(groupname);
		entity.setDeptid(deptid);
		departmentgroupManager.save(entity);

		sendMsg("success");
		return null;
	}

	/**
	 * 批量删除组
	 * 
	 * @throws IOException
	 */
	public void deleteAll() throws IOException {
		List<Departmentgroup> grouplist = departmentgroupManager
				.getAllGroupByDepart(deptid);
		SessionUser session = getSessionUser();
		for (Departmentgroup departmentgroup : grouplist) {
			departmentgroupManager.deleteByentity(departmentgroup, session);
		}
		sendMsg("success");
	}

	/**
	 * 单条删除组
	 * 
	 * @throws IOException
	 */
	public void deleteOne() throws IOException {
		Departmentgroup deptgroup = departmentgroupManager.getById(groupid);
		if (deptgroup != null) {
			SessionUser session = getSessionUser();
			departmentgroupManager.deleteById(deptgroup.getDeptid(), groupid,
					session);
		}
		sendMsg("success");
	}

	/**
	 * 修改仪器设备类型
	 * 
	 * @throws IOException
	 */
	public void updateDeviceType() throws IOException {
		try {
			departmentgroupManager.updateDeviceType(devicetypeid, analysesetid);
			sendMsg("success");
		} catch (Exception e) {
			e.printStackTrace();
			sendMsg("fail");
		}
	}

	/**
	 * 显示用户信息
	 */
	public void showUserGroup() {
		try {
			// 当前第几页
			int intPage = Integer.parseInt((page == null || page == "0") ? "1"
					: page);
			// 每页多少行
			int maxIndex = Integer
					.parseInt((rows == null || rows == "0") ? "20" : rows);
			// 开始页
			int startIndex = (intPage - 1) * maxIndex;

			StringBuilder whereSB = new StringBuilder();
			List<Object> params = new ArrayList<Object>();
			LinkedHashMap<String, String> orderby = new LinkedHashMap<String, String>();
			orderby.put("userinfo.orderid", "asc");
			if (!("").equals(realname) && realname != null) {
				String thisrealname = java.net.URLDecoder.decode(realname,
						"UTF-8");
				SearchUtil.getStringSearch(whereSB, params,
						"userinfo.realname", "like", thisrealname);
			}
			SearchUtil.getStringSearch(whereSB, params, "deptid", "=",
					this.deptid);
			SearchUtil.getStringSearch(whereSB, params, "groupid", "=",
					this.groupid);
			// ============================2：原生实体SQL==============================="
			QueryResult<Usergroup> q;
			q = usergroupManager.getQueryResult(startIndex, maxIndex, whereSB
					.toString(), params.toArray(), orderby);
			;// .getResultlist();
			// 总条数
			long total = q.getTotalrecord();
			List<Map<String, Object>> rowslist = new ArrayList<Map<String, Object>>();
			// QueryResult里封装的list
			List<Usergroup> userList = q.getResultlist();
			for (Usergroup usergroup : userList) {
				// 列表要显示的字段及值
				Map<String, Object> map = new HashMap<String, Object>();
				map.put("usergroupid", usergroup.getUsergroupid());
				map.put("deptid", usergroup.getDeptid());
				map.put("groupid", usergroup.getGroupid());
				map.put("isprincipal", usergroup.getIsprincipal());
				Userinfo userinfo = usergroup.getUserinfo();
				if (userinfo != null) {
					map.put("userid", userinfo.getUserid());
					map.put("realname", userinfo.getRealname());
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
	}

	/**
	 * 设置负责人
	 */
	@SuppressWarnings("unchecked")
	public void setPrincipal() {
		Usergroup usergroup = usergroupManager.getById(usergroupid);
		String hql = "from Usergroup u where u.groupid =? and u.deptid=?";
		List<Usergroup> groupquery = usergroupManager.getByTerm(hql,
				usergroup.getGroupid(), usergroup.getDeptid()).list();
		for (Usergroup userGroupOther : groupquery) {
			userGroupOther.setIsprincipal("N");
			usergroupManager.save(userGroupOther);
		}
		usergroup.setIsprincipal("Y");
		usergroupManager.save(usergroup);

		// 向日志表中插入数据************开始
		SessionUser session = getSessionUser();
		String operatecontent = "将用户id为" + usergroupid + "的记录设置成负责人";
		systemlogManager.addSystemLog(session.getModule(), session.getUserid(),
				operatecontent);
		// **********************结束
	}

	/**
	 * 保存用户
	 * 
	 * @throws IOException
	 */
	@SuppressWarnings("unchecked")
	public void saveUserGroup() throws IOException {
		if (userid != null && !userid.equals("")) {
			String[] userids = userid.split(",");
			// 先查出此用户在的组，然后将其改变成先要存的组
			for (int i = 0; i < userids.length; i++) {
				String hql = "from Usergroup u where userinfo.userid=?";
				List<Usergroup> groupquery = usergroupManager.getByTerm(hql,
						userids[i]).list();
				if (groupquery.size() > 0) {
					for (Usergroup usergroupquery : groupquery) {
						usergroupquery.setGroupid(groupid);
						usergroupquery.setDeptid(deptid);
						usergroupquery.setIsprincipal("N");
						usergroupManager.save(usergroupquery);
					}
				} else {
					Usergroup usergroup = new Usergroup();
					usergroup.setUsergroupid(usergroupManager
							.getSequence("SEQ_USERGROUP"));
					usergroup.setGroupid(groupid);
					usergroup.setDeptid(deptid);
					usergroup.setIsprincipal("N");
					usergroup.setUserinfo(userInfoManager.get(userids[i]));
					usergroupManager.save(usergroup);
				}
			}// for
			// 向日志表中插入数据************开始
			String newuserid = userid.replace(",", "、");
			SessionUser session = getSessionUser();
			String operatecontent = "将用户id为" + newuserid + "的记录分在了部门组id为"
					+ groupid + "的组";
			systemlogManager.addSystemLog(session.getModule(), session
					.getUserid(), operatecontent);
			// **********************结束
			sendMsg("success");
		}
	}

	// 获取一个组下所有人员
	/*
	 * public void getUserGroupData(){ try {
	 * if(groupid!=null&&!("").equals(groupid)){ String userids=""; String
	 * username=""; String
	 * hql="from Usergroup u where u.groupid =? and u.deptid=?"; List<Usergroup>
	 * groupquery = usergroupManager.getByTerm(hql,groupid,deptid).list(); for
	 * (Usergroup usergroup : groupquery) { Userinfo
	 * usrinfo=usergroup.getUserinfo(); if(usrinfo!=null){ if(userids==""){
	 * userids=usrinfo.getUserid(); username=usrinfo.getRealname(); }else{
	 * userids+=","+usrinfo.getUserid(); username+=","+usrinfo.getRealname(); }
	 * } }//for String json=userids+"&"+username; sendMsg(json); } } catch
	 * (IOException e) { e.printStackTrace(); } }
	 */
	/**
	 * 显示选择人员列表信息
	 * 
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings("unchecked")
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
		// 先将已经存在与此组下的人查出，然后去除
		orderby.put("orderid", "asc");
		String hql = "select distinct userinfo.userid from Usergroup u where u.groupid =? and u.deptid=?";
		List<String> groupquery = usergroupManager.getByTerm(hql, groupid,
				deptid).list();
		String itemidStr = "0";
		for (String userid : groupquery) {
			if (itemidStr.equals("0")) {
				itemidStr = userid;
			} else {
				itemidStr += "," + userid;
			}
		}
		// Departmentinfo departmentinfo =
		// departmentinfoService.getByID(deptid);realname
		SearchUtil.getStringSearch(whereSB, params, "departmentinfo.deptid",
				"=", deptid);
		SearchUtil.getInSearch(whereSB, params, "userid", "not in", itemidStr);
		// ============================2：原生实体SQL==============================="
		QueryResult<Userinfo> q;
		try {
			q = userInfoManager.getQueryResult(startIndex, maxIndex, whereSB
					.toString(), params.toArray(), orderby);
			;// .getResultlist();
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
			e.printStackTrace();
		}
		return null;
	}

	/**
	 * 显示选择人员列表信息
	 * 
	 * @return
	 * @throws Exception
	 */
	public void toOneAndManyList2() throws Exception {
		try {
			String hql = " select o from Usergroup o where o.deptid="
					+ getSessionUser().getDepartmentinfo().getDeptid()
					+ " and o.groupid in(" + this.groupid + ")";
			List<Usergroup> list = usergroupManager.getUsergroupList(hql);
			List<Usergroup> list2 = new ArrayList<Usergroup>();
			if (list != null && list.size() > 0) {
				for (Usergroup group : list) {
					if (group.getUserinfo() != null) {
						String userid = group.getUserinfo().getUserid();
						hql = " from Certificateinfo o where o.iteminfo.itemid="
								+ this.itemid
								+ " and o.userinfo.userid="
								+ userid;// +" and o.method.methodid="+this.methodid
						// Certificateinfo certificateinfo =
						// certificateinfoManager.getCertificateinfo(hql);
						List<Certificateinfo> certificateinfoList = certificateinfoManager
								.getCertificateinfoList(hql);
						if (certificateinfoList != null
								&& certificateinfoList.size() > 0) {
							// list.remove(group);
							list2.add(group);
						}
					}
				}
			}
			// 总条数
			long total = list2.size();
			List<Map<String, Object>> rowslist = new ArrayList<Map<String, Object>>();
			if (list2 != null && list2.size() > 0) {
				for (Usergroup usergroup : list2) {
					// 列表要显示的字段及值
					Map<String, Object> map = new HashMap<String, Object>();

					map.put("userid",
							usergroup.getUserinfo() != null ? usergroup
									.getUserinfo().getUserid() : "");
					map.put("realname",
							usergroup.getUserinfo() != null ? usergroup
									.getUserinfo().getRealname() : "");
					map.put("orderid",
							usergroup.getUserinfo() != null ? usergroup
									.getUserinfo().getOrderid() : "");
					rowslist.add(map);
				}
			}
			Map<String, Object> mapall = new HashMap<String, Object>();
			mapall.put("total", total);
			mapall.put("rows", rowslist);
			String json = JSONObject.fromObject(mapall).toString();
			getResponse().getWriter().write(json);

		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	/**
	 * 显示选择人员列表信息
	 * 
	 * @return
	 * @throws Exception
	 */
	public void toOneAndManyList3() throws Exception {
		try {
			String[] arrSampleitemtestids = this.sampleitemtestids.split(",");
			// 总条数
			long total = 0;
			List<Map<String, Object>> rowslist = new ArrayList<Map<String, Object>>();
			if (arrSampleitemtestids != null && arrSampleitemtestids.length > 0) {
				String hql = " select o from Usergroup o where o.deptid="
						+ getSessionUser().getDepartmentinfo().getDeptid()
						+ " and o.groupid in(" + this.groupid + ")";
				List<Usergroup> list = usergroupManager.getUsergroupList(hql);
				List<Usergroup> list2 = new ArrayList<Usergroup>();
				if (list != null && list.size() > 0) {
					for (Usergroup group : list) {
						if (group.getUserinfo() != null) {
							String userid = group.getUserinfo().getUserid();
							for (String sitemid : arrSampleitemtestids) {
								hql = " from Certificateinfo o where o.iteminfo.itemid="
										+ " and o.userinfo.userid=" + userid;
								// " and o.method.methodid="+
								// sampleitem.getMethodid().getMethodid()+
								List<Certificateinfo> certificateinfoList = certificateinfoManager
										.getCertificateinfoList(hql);
								if (certificateinfoList != null
										&& certificateinfoList.size() > 0) {
									list2.add(group);
								}
							}
						}
					}
				}
				// 去除重复
				int len1 = list2.size();
				for (int i = 0; i < len1 - 1; i++) {
					Usergroup war = list2.get(i);
					for (int j = i + 1; j < len1; j++) {
						if (war.getUserinfo().getUserid().equals(
								list2.get(j).getUserinfo().getUserid())) {
							list2.remove(j);
							j--;
							len1--;
						}
					}
				}

				total = list2.size();
				for (Usergroup usergroup : list2) {
					// 列表要显示的字段及值
					Map<String, Object> map = new HashMap<String, Object>();

					map.put("userid",
							usergroup.getUserinfo() != null ? usergroup
									.getUserinfo().getUserid() : "");
					map.put("realname",
							usergroup.getUserinfo() != null ? usergroup
									.getUserinfo().getRealname() : "");
					map.put("orderid",
							usergroup.getUserinfo() != null ? usergroup
									.getUserinfo().getOrderid() : "");
					rowslist.add(map);
				}
			}
			Map<String, Object> mapall = new HashMap<String, Object>();
			mapall.put("total", total);
			mapall.put("rows", rowslist);
			String json = JSONObject.fromObject(mapall).toString();
			getResponse().getWriter().write(json);

		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	/**
	 * 显示选择人员列表信息(通过部门编号和组编号)(给批次设置复核人用)
	 * 
	 * @return
	 * @throws Exception
	 */
	public String toOneList() throws Exception {
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
		orderby.put("userinfo.realname", "asc");

		SearchUtil.getStringSearch(whereSB, params, "deptid", "=", this.deptid);
		SearchUtil.getStringSearch(whereSB, params, "groupid", "=",
				this.groupid);
		// ============================2：原生实体SQL==============================="
		QueryResult<Usergroup> q;
		try {
			q = usergroupManager.getQueryResult(startIndex, maxIndex, whereSB
					.toString(), params.toArray(), orderby);
			;// .getResultlist();
			// 总条数
			long total = q.getTotalrecord();
			List<Map<String, Object>> rowslist = new ArrayList<Map<String, Object>>();
			// QueryResult里封装的list
			List<Usergroup> userList = q.getResultlist();
			for (Usergroup usergroup : userList) {
				// 列表要显示的字段及值
				Map<String, Object> map = new HashMap<String, Object>();
				map.put("usergroupid", usergroup.getUsergroupid());
				Userinfo userinfo = usergroup.getUserinfo();
				if (userinfo != null) {
					map.put("userid", userinfo.getUserid());
					map.put("realname", userinfo.getRealname());
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
	 * 删除用户
	 * 
	 * @throws IOException
	 */
	public void deleteAllUser() throws IOException {
		if (usergroupid != null && !usergroupid.equals("")) {
			String[] usergroupids = usergroupid.split(",");
			for (int i = 0; i < usergroupids.length; i++) {
				usergroupManager.delete(usergroupids[i]);
			}
			// 向日志表中插入数据************开始
			String newusergroupid = usergroupid.replace(",", "、");
			SessionUser session = getSessionUser();
			String operatecontent = "删除了部门组中用户id为" + newusergroupid + "的记录";
			systemlogManager.addSystemLog(session.getModule(), session
					.getUserid(), operatecontent);
			// **********************结束
			sendMsg("success");
		}
	}

	/**
	 * 跳转到用户选择页面(给部门下的组添加用户用)
	 * 
	 * @return
	 */
	public String toUserGroup() {
		return "toUserGroup";
	}

	/**
	 * 跳转到用户选择页面(设置批次复核人用)
	 * 
	 * @return
	 */
	public String toDeptGroupUser() {
		if (deptid == null || "".equals(deptid)) {
			this.deptid = getSessionUser().getDepartmentinfo().getDeptid();
		}
		return "toDeptGroupUser";
	}

	/**
	 * 跳转到用户选择页面(设置批次复核人用)
	 * 
	 * @return
	 */
	public String toDeptGroupUser2() {
		if (groupid == null || "".equals(groupid)) {
			String hql = " select o.groupid from Usergroup o where o.deptid="
					+ getSessionUser().getDepartmentinfo().getDeptid()
					+ " and o.userinfo.userid=" + getSessionUser().getUserid();
			List<String> list = usergroupManager.getGroupidList(hql);
			String temp = "";
			if (list != null && list.size() > 0) {
				for (String strGroupid : list) {
					temp = temp + strGroupid + ",";
				}
			}
			if (temp != null && !temp.equals("")) {
				temp = temp.substring(0, temp.length() - 1);
			}
			this.groupid = temp;
		}

		return "toDeptGroupUser2";
	}

	/**
	 * 跳转到用户选择页面(设置按样品复核人用)
	 * 
	 * @return
	 */
	public String toDeptGroupUser3() {
		if (groupid == null || "".equals(groupid)) {
			String hql = " select o.groupid from Usergroup o where o.deptid="
					+ getSessionUser().getDepartmentinfo().getDeptid()
					+ " and o.userinfo.userid=" + getSessionUser().getUserid();
			List<String> list = usergroupManager.getGroupidList(hql);
			String temp = "";
			if (list != null && list.size() > 0) {
				for (String strGroupid : list) {
					temp = temp + strGroupid + ",";
				}
			}
			if (temp != null && !temp.equals("")) {
				temp = temp.substring(0, temp.length() - 1);
			}
			this.groupid = temp;
		}
		return "toDeptGroupUser3";
	}

	/**
	 * 删除 一条用户
	 * 
	 * @throws IOException
	 */
	public void deleteOnlyOne() throws IOException {
		usergroupManager.delete(id);
		// 向日志表中插入数据************开始
		SessionUser session = getSessionUser();
		String operatecontent = "删除了部门组中用户id为" + id + "的记录";
		systemlogManager.addSystemLog(session.getModule(), session.getUserid(),
				operatecontent);
		// **********************结束
		sendMsg("success");
	}



	public String getGroupid() {
		return groupid;
	}

	public void setGroupid(String groupid) {
		this.groupid = groupid;
	}

	public String getGroupname() {
		return groupname;
	}

	public void setGroupname(String groupname) {
		this.groupname = groupname;
	}

	public String getDeptid() {
		return deptid;
	}

	public void setDeptid(String deptid) {
		this.deptid = deptid;
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

	public String getUserid() {
		return userid;
	}

	public void setUserid(String userid) {
		this.userid = userid;
	}

	public String getUsergroupid() {
		return usergroupid;
	}

	public void setUsergroupid(String usergroupid) {
		this.usergroupid = usergroupid;
	}

	public String getThisuserid() {
		return thisuserid;
	}

	public void setThisuserid(String thisuserid) {
		this.thisuserid = thisuserid;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getItemname() {
		return itemname;
	}

	public void setItemname(String itemname) {
		this.itemname = itemname;
	}

	public String getItemtypeid() {
		return itemtypeid;
	}

	public void setItemtypeid(String itemtypeid) {
		this.itemtypeid = itemtypeid;
	}


	public String getItemid() {
		return itemid;
	}

	public void setItemid(String itemid) {
		this.itemid = itemid;
	}

	public String getAnalysesetid() {
		return analysesetid;
	}

	public void setAnalysesetid(String analysesetid) {
		this.analysesetid = analysesetid;
	}

	public String getDevicetypeid() {
		return devicetypeid;
	}

	public void setDevicetypeid(String devicetypeid) {
		this.devicetypeid = devicetypeid;
	}

	public String getItemtype() {
		return itemtype;
	}

	public void setItemtype(String itemtype) {
		this.itemtype = itemtype;
	}

	public String getMethodname() {
		return methodname;
	}

	public void setMethodname(String methodname) {
		this.methodname = methodname;
	}


	public String getMethodid() {
		return methodid;
	}

	public void setMethodid(String methodid) {
		this.methodid = methodid;
	}

	public String getSampleitemtestids() {
		return sampleitemtestids;
	}

	public void setSampleitemtestids(String sampleitemtestids) {
		this.sampleitemtestids = sampleitemtestids;
	}

}
