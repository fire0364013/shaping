package com.beauty.biz.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.beauty.common.orm.hibernate3.HibernateDao;

/**
 * @Description 本类主要处理PendingDao.java
 * @author chenxz
 * @date 2012-9-5
 */
@Repository
public class PendingDao extends HibernateDao<Object> {

	// 获取待办记录条数
	public int getPendings(String hql, Object... values) {
		return createQuery(hql, values).list().size();
	}

	// 获取待办记录条数
	public int getPendingsBySQL(String sql, Object... values) {
		return createSQLQuery(sql, values).list().size();
	}

	@SuppressWarnings("unchecked")
	public int getPersonCount(String hql, Object... objects) {
		List<Object> list = createQuery(hql, objects).list();
		return list.size();
	}

	// 获取仪器维护、检定、校准的待办
	@SuppressWarnings("unchecked")
	public List<Object[]> getDevices(String hql) {
		List<Object[]> list = createQuery(hql).list();
		return list;
	}

	public Object getSumcount(String hql, Object... values) {
		Object list = createSQLQuery(hql, values).uniqueResult();
		return list;
	}
}
