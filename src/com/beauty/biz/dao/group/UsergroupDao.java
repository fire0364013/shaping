package com.beauty.biz.dao.group;

import java.util.List;

import org.hibernate.Query;
import org.springframework.stereotype.Repository;

import com.beauty.biz.entity.group.Usergroup;
import com.beauty.common.orm.hibernate3.HibernateDao;

@Repository
public class UsergroupDao extends HibernateDao<Usergroup> {
	/**
	 * 删除对象
	 * 
	 * @param entity
	 *            实体类
	 */
	public void deleteByEntity(final Object entity) {
		getSession().delete(entity);
	}

	public List<String> getGroupidList(String hql) {
		Query query = this.createQuery(hql);
		return query.list();
	}

	public List<Usergroup> getUsergroupList(String hql) {
		Query query = this.createQuery(hql);
		return query.list();
	}
}
