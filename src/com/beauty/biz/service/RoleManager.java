package com.beauty.biz.service;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import net.sf.json.JSONObject;

import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.beauty.biz.dao.PermissionDao;
import com.beauty.biz.dao.RoleDao;
import com.beauty.biz.entity.Role;
import com.beauty.common.page.QueryResult;

@Service
@Transactional
public class RoleManager {
	@Autowired
	private RoleDao roleDao;
	@Autowired
	private PermissionDao permissionDao;

	/**
	 * 获得序列值 主键
	 * 
	 * @param sequenceName
	 *            :序列名称 如角色表的序列是:"SEQ_ROLE"
	 * 
	 */
	public String getSequence(String sequenceName) {
		return roleDao.getSequence(sequenceName);
	}

	/**
	 * 根据条件查询
	 */
	public List<Role> queryResult(HttpServletRequest request) {
		List<Criterion> criterions = new ArrayList<Criterion>();
		String name = request.getParameter("rolename");
		System.out.println("role name:" + name);
		if (null != name)
			criterions.add(Restrictions.like("rolename", name,
					MatchMode.ANYWHERE));
		return roleDao.query(criterions
				.toArray(new Criterion[criterions.size()]));
	}

	/**
	 * 删除角色
	 */
	public boolean batchDelete(String str) {
		boolean flag = false;
		try {
			// System.out.println("json字符串："+str);
			JSONObject jsonObj = JSONObject.fromObject(str);
			String roleidArr = jsonObj.getString("roleid");
			String roleStr = roleidArr;

			if (roleidArr.contains("[")) {
				roleStr = roleidArr.substring(1, roleidArr.length() - 1);// 去掉[和]
			}
			String[] arrId = roleStr.split(",");
			for (String s : arrId) {
				String roleid = s.substring(1, s.length() - 1);// 去掉""
				// System.out.println(s.length());
				roleDao.delete(roleid); // 删除角色
				permissionDao.delete(roleid); // 删除角色对应的权限
			}
			flag = true;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return flag;
	}

	/**
	 * 增加或修改角色
	 */
	public void addOrUpdateRole(Role role) {
		roleDao.save(role);
	}

	/**
	 * 角色分页 单个实体查询
	 */
	public QueryResult<Role> getQueryResult(int startIndex, int maxResult,
			String whereJPQL, Object[] params,
			LinkedHashMap<String, String> orderby) throws Exception {
		return roleDao.getScrollData(startIndex, maxResult, whereJPQL, params,
				orderby);
	}

	// /**
	// * 角色分页 根据SQL类型分页查询
	// */
	// public QueryResult<Role> getByNativeSearch(int startIndex, int maxResult,
	// String sql, String sqlType, Object[] params) throws Exception{
	// return roleDao.getScrollDateByNativeSQL(startIndex, maxResult, sql,
	// sqlType, params);
	// }

	/**
	 *获取所有的角色
	 */
	public List<Role> getRoles() {
		// List<Role> roleList = roleDao.getAll();
		// List<Role> newlist = new ArrayList<Role>();
		// for(int i=0;i<roleList.size();i++){
		// if(newlist.size()== 0){
		// newlist.add(roleList.get(i));
		// }else{
		// int count = 0;
		// for(int j=0;j<newlist.size();j++){
		// //System.out.println("roleList"+(roleList.get(i)).getRoleid()+"newlist"+(newlist.get(j)).getRoleid());
		// if(roleList.get(i).getRoleid()==newlist.get(j).getRoleid()){
		// count++;
		// //newlist.add(roleList.get(i));
		// }
		// }
		// if(count==0){
		// newlist.add(roleList.get(i));
		// }
		// }
		// }
		// return roleDao.getAll();
		return roleDao.getListRole();// 获得用户的List 根据名字进行升序排列
	}

	/**
	 * 获取单个实体
	 * 
	 * @param id
	 * @return
	 */
	public Role getRole(String id) {
		return roleDao.get(id);
	}
}
