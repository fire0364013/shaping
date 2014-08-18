package com.beauty.biz.dao;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.beauty.biz.entity.ModuleRight;
import com.beauty.common.orm.hibernate3.HibernateDao;

@Repository
@Transactional(rollbackFor = { Exception.class })
public class PermissionDao extends HibernateDao<ModuleRight> {
	public void delete(String id) {

		String hqlDelete = "delete ModuleRight c where c.roleid = :roleid";
		// or String hqlDelete = "delete Customer where name = :oldName";
		createQuery(hqlDelete).setString("roleid", id).executeUpdate();
	}

}
