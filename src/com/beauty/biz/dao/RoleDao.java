package com.beauty.biz.dao;

import java.util.List;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.beauty.biz.entity.Role;
import com.beauty.biz.entity.Userinfo;
import com.beauty.common.orm.hibernate3.HibernateDao;

@Repository
public class RoleDao extends HibernateDao<Role> {

	/**
	 * 根据条件进行删除
	 * 
	 * @param id
	 *            角色ID
	 */
	public void delete(String id) {

		String hqlDelete = "delete Role c where c.roleid = :roleid";
		// or String hqlDelete = "delete Customer where name = :oldName";
		createQuery(hqlDelete).setString("roleid", id).executeUpdate();
	}

	/**
	 * 获得序列值
	 * 
	 * @param sequenceName
	 *            :序列名称 如角色表的序列是:"SEQ_ROLE"
	 * 
	 */
	public String getSequence(String sequenceName) {
		return super.getSequence(sequenceName);
	}

	/**
	 * 获得用户的List 根据名字进行升序排列
	 * 
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public List<Role> getListRole() {
		return super.createQuery("from Role a order by a.orderid").list();
	}
}
