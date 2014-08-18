package com.beauty.biz.dao;

import java.util.List;

import org.hibernate.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.beauty.biz.entity.Role;
import com.beauty.biz.entity.Userinfo;
import com.beauty.biz.entity.Userroleinfo;
import com.beauty.common.orm.hibernate3.HibernateDao;

@Repository
public class UserroleinfoDao extends HibernateDao<Userroleinfo> {

	/**
	 * 获取用户所没有的权限left
	 */
	@SuppressWarnings("unchecked")
	public List<Role> getRolesLeft(String id) {
		Query query = createQuery(
				"select r from Role r where r.roleid not in (select uri.roleid from Userroleinfo uri where uri.userid=?)",
				id);
		List<Role> listuser = query.list();
		return listuser;

	}

	/**
	 * 获取用户所有的权限right
	 */
	@SuppressWarnings("unchecked")
	public List<Role> getRolesRight(String id) {
		Query query = createQuery(
				"select r from Role r where r.roleid  in (select uri.roleid from Userroleinfo uri where uri.userid=?)",
				id);
		List<Role> listuser = query.list();
		return listuser;

	}

	// 获取单个用户

	public Userinfo getSingleUser(String id) {
		return (Userinfo) getSession().get(Userinfo.class, id);
	};

	/**
	 * 1.在对用户进行保存的时候，先根据ID删除该用户的所有权限，然后对其进行保存
	 * 
	 * @param userId
	 */
	public void deleteCheckUserId(String userId) {
		String hqlCheckDelete = "delete Userroleinfo uri where uri.userid=:userid";
		createQuery(hqlCheckDelete).setString("userid", userId).executeUpdate();
	}

}
