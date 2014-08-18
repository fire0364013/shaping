package com.beauty.biz.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.hibernate.Query;
import org.hibernate.criterion.Criterion;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.beauty.biz.dao.SystemlogDao;
import com.beauty.biz.dao.UserInfoDao;
import com.beauty.biz.entity.Userinfo;
import com.beauty.common.page.QueryResult;
import com.beauty.common.utils.SessionUser;

@Service
@Transactional
public class UserInfoManager {
	@Autowired
	private UserInfoDao userInfoDao;
	@Autowired
	private SystemlogDao systemlogDao;

	public UserInfoDao getUserInfoDao() {
		return userInfoDao;
	}

	public void setUserInfoDao(UserInfoDao userInfoDao) {
		this.userInfoDao = userInfoDao;
	}

	/**
	 * 保存或修改
	 */
	public void saveorupadate(Userinfo userinfo) {
		userInfoDao.save(userinfo);
	}

	public void delete(String id) {
		userInfoDao.delete(id);
	}

	public Userinfo getUserInfo(String userid) {
		return userInfoDao.getUserInfo(userid);
	}

	/**
	 * 分页 暂时没有用到
	 * 
	 * @param startIndex
	 * @param maxResult
	 * @param whereJPQL
	 * @param params
	 * @param orderby
	 * @return
	 */
	public List<Userinfo> findByPage(int startIndex, int maxResult,
			String whereJPQL, Object[] params,
			LinkedHashMap<String, String> orderby) {
		List<Userinfo> userList = null;
		try {
			QueryResult<Userinfo> result = userInfoDao.getScrollData(
					startIndex, maxResult, whereJPQL, params, orderby);
			userList = result.getResultlist();
		} catch (Exception e) {
		}
		return userList;
	}

	/**
	 * 
	 * @param sql
	 *            查询语句
	 * @param values
	 *            拼接参数
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public List<Userinfo> findAlllist(String sql, Object... values) {

		Query query = userInfoDao.createQuerys(sql, values);
		List<Userinfo> q = query.list();
		return q;

	}

	/**
	 * 
	 * @param request
	 * @return 通过条件查询
	 */
	public List<Userinfo> findByCondition(final Criterion... criterions) {

		return userInfoDao.query(criterions);

	}

	/**
	 * @param ids
	 *            批量删除
	 */
	public void deleteAll(String ids, SessionUser session) {
		if (!("").equals(ids)) {
			String[] usersid = ids.split(",");
			for (int i = 0; i < usersid.length; i++) {
				userInfoDao.delete(usersid[i]);
			}
			String newId = ids.replace(",", "、");
			String operatecontent = "删除了用户id为" + newId + "的记录";
			systemlogDao.addSystemLog(session.getModule(), session.getUserid(),
					operatecontent);
		}
	}

	/**
	 * 根据条件查询（用户登录用）
	 */
	public Userinfo getUserinfo(String loginname, String password) {
		List<Userinfo> list = userInfoDao.getUserinfo(loginname, password);
		return list.isEmpty() ? null : list.get(0);
	}

	public boolean getBooleanByName(String loginname) {
		return userInfoDao.getBooleanByName(loginname);
	}

	/**
	 * 保存对象
	 * 
	 * @param entity
	 *            保存的实体对象
	 */
	public void save(final Userinfo userinfo) {
		userInfoDao.save(userinfo);
	}

	/**
	 * 去往list页面 以及条件查询
	 * 
	 * @param startIndex
	 * @param maxResult
	 * @param whereJPQL
	 * @param params
	 * @param orderby
	 * @return
	 * @throws Exception
	 */
	public QueryResult<Userinfo> getQueryResult(int startIndex, int maxResult,
			String whereJPQL, Object[] params,
			LinkedHashMap<String, String> orderby) throws Exception {
		return userInfoDao.getScrollData(startIndex, maxResult, whereJPQL,
				params, orderby);
	}

	/***
	 * 通过id查询数据111
	 * 
	 * @param id
	 * @return
	 */
	public Userinfo get(String id) {
		Userinfo s = userInfoDao.get(id);
		return s;
	}

	/**
	 * 获取序列
	 * 
	 * @param sequenceName
	 * @return
	 */
	public String getSequence(String sequenceName) {
		return userInfoDao.getSequence(sequenceName);
	}

	/**
	 * 条件查询
	 * 
	 * @param colname
	 * @param valuename
	 * @return
	 */
	public List<Userinfo> validateLoginName(String colname, Object valuename) {
		List<Userinfo> listuser = userInfoDao.validateLoginName(colname,
				valuename);
		return listuser;
	}

	/**
	 * 获取正常状态用户
	 * 
	 * @return
	 */
	public List<Userinfo> getList() {
		List<Userinfo> listuser = userInfoDao.getList();
		return listuser;
	}

	/**
	 * 获取某个部门下的所有组json串
	 * 
	 * @param parentregioncode
	 * @return String json串
	 */
	public String getAllUserByDepartJSON(String deptid) {

		// 查用户角色名并加入map
		List<Userinfo> userList = validateLoginName("departmentinfo.deptid",
				deptid);
		List<Map<String, Object>> rowsData = new ArrayList<Map<String, Object>>();
		for (Userinfo us : userList) {
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("userid", us.getUserid());// 存 code
			map.put("realname", us.getRealname());// 存name
			rowsData.add(map);
		}
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("rowsData", rowsData);
		// 变成jsonobject
		String first = JSONArray.fromObject(map).toString();
		String jsonStr = first.substring(1, first.length() - 1);
		return JSONObject.fromObject(jsonStr).toString();
	}
	

	/**
	 * 获取某个部门下的所有组json串
	 * 
	 * @param parentregioncode
	 * @return String json串
	 */
	public String getAllUserByDepart(String deptid) {

		// 查用户角色名并加入map
		List<Userinfo> userList = validateLoginName("departmentinfo.deptid",
				deptid);
		List<Map<String, Object>> rowsData = new ArrayList<Map<String, Object>>();
		for (Userinfo us : userList) {
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("userid", us.getUserid());// 存 code
			map.put("realname", us.getRealname());// 存name
			rowsData.add(map);
		}
		String first = JSONArray.fromObject(rowsData).toString();
		return first;
	}
}
