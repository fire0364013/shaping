package com.beauty.biz.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.beauty.biz.dao.UserroleinfoDao;
import com.beauty.biz.entity.Role;
import com.beauty.biz.entity.Userinfo;
import com.beauty.biz.entity.Userroleinfo;
import com.beauty.common.page.QueryResult;

@Service
@Transactional
public class UserroleinfoManager {

	@Autowired
	private UserroleinfoDao userroleinfoDao;

	public UserroleinfoDao getUserroleinfoDao() {
		return userroleinfoDao;
	}

	public void setUserroleinfoDao(UserroleinfoDao userroleinfoDao) {
		this.userroleinfoDao = userroleinfoDao;
	}

	/**
	 * 单个实体的查询
	 * 
	 * @param startIndex
	 * @param maxResult
	 * @param whereJPQL
	 * @param params
	 *            传入参数
	 * @param orderby
	 *            排序规则
	 * @return
	 * @throws Exception
	 */
	public QueryResult<Userroleinfo> getQueryResult(int startIndex,
			int maxResult, String whereJPQL, Object[] params,
			LinkedHashMap<String, String> orderby) throws Exception {
		return userroleinfoDao.getScrollData(startIndex, maxResult, whereJPQL,
				params, orderby);
	}

	// 保存或更新区域信息
	public void saveUpdate(Userroleinfo userroleinfo) {
		userroleinfoDao.save(userroleinfo);
	}

	// 修改数据的时候使用的方法
	public List<Userroleinfo> getAll() {
		List<Userroleinfo> usi = userroleinfoDao.getAll();
		return usi;
	}

	// 获得左右角色列表和用户名
	public JSONObject getRoles(String id) {

		Map<String, Object> map = new HashMap<String, Object>();
		// 查用户角色名并加入map
		Userinfo u = userroleinfoDao.getSingleUser(id);
		map.put("userName", u.getRealname());// 存name
		map.put("userId", id);// 存id
		// 获得左边列表
		map = this.getRolesLeft(map, id);
		// 获得右边列表
		map = this.getRolesRight(map, id);
		// 变成jsonobject
		String first = JSONArray.fromObject(map).toString();
		String jsonStr = first.substring(1, first.length() - 1);
		return JSONObject.fromObject(jsonStr);
	}

	// 获得角色权限左边
	public Map<String, Object> getRolesLeft(Map<String, Object> wholeMap,
			String id) {
		List<Role> roles = userroleinfoDao.getRolesLeft(id);
		List<Map<String, Object>> rows = new ArrayList<Map<String, Object>>();

		for (Role role : roles) {
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("roleIdLeft", role.getRoleid());
			map.put("roleNameLeft", role.getRolename());
			rows.add(map);
		}
		// Map<String, Object> map = new HashMap<String, Object>();

		wholeMap.put("Left", rows);

		return wholeMap;
	}

	// 获得角色权限右边
	public Map<String, Object> getRolesRight(Map<String, Object> wholeMap,
			String id) {
		List<Role> roles = userroleinfoDao.getRolesRight(id);
		List<Map<String, Object>> rows = new ArrayList<Map<String, Object>>();

		for (Role role : roles) {
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("roleIdRight", role.getRoleid());
			map.put("roleNameRight", role.getRolename());
			rows.add(map);
		}
		// Map<String, Object> map = new HashMap<String, Object>();

		wholeMap.put("Right", rows);
		return wholeMap;
	}

	/**
	 * 进行角色授权的时候使用的方法
	 * 
	 * @param request
	 */
	public void batchCheckRole(HttpServletRequest request) {
		String userId = request.getParameter("userid");

		String str = request.getParameter("id");

		String[] arrId = str.split(",");
		userroleinfoDao.deleteCheckUserId(userId);// 执行删除所有数据
		for (String s : arrId) {
			if (!s.equals("")) {
				Userroleinfo uri = new Userroleinfo();

				String idSeq = userroleinfoDao.getSequence("SEQ_USERROLEINFO");// 获取序列id
				uri.setId(idSeq);
				uri.setUserid(userId);

				uri.setRoleid(s);

				userroleinfoDao.save(uri);
			}
		}

	}
}
