package com.beauty.biz.service;

import java.util.List;

import org.hibernate.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.beauty.biz.dao.PendingDao;

/**
 * @Description 本类主要处理PendingManager.java
 * @author chenxz
 * @date 2012-9-5
 */
@Service
@Transactional
public class PendingManager {

	@Autowired
	private PendingDao pendingDao;

	/**
	 * 获取待办记录条数
	 * 
	 * @param hql
	 *            hql语句，写在数据库中
	 * @return
	 */
	public int getPendings(String hql, Object... values) {
		return pendingDao.getPendings(hql, values);
	}

	/**
	 * 获取待办记录条数
	 * 
	 * @param hql
	 *            hql语句，写在数据库中
	 * @return
	 */
	public int getPendingsBySQL(String hql, Object... values) {
		return pendingDao.getPendingsBySQL(hql, values);
	}

	public int getPersonCount(String hql, Object... objects) {
		return pendingDao.getPersonCount(hql, objects);
	}

	// 获取仪器维护、检定、校准的待办
	public List<Object[]> getDevices(String hql) {
		return pendingDao.getDevices(hql);
	}

	public Object getSumcount(String hql, Object... values) {
		return pendingDao.getSumcount(hql, values);
	}

	/**
	 * hql语句查询
	 * 
	 * @param hql
	 * @param values
	 * @return
	 */
	public Query createQuery(String hql, Object... values) {
		return pendingDao.createQuery(hql, values);
	}
}
