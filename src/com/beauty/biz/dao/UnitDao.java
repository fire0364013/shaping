package com.beauty.biz.dao;

import java.util.List;

import org.hibernate.Query;
import org.springframework.stereotype.Repository;

import com.beauty.biz.entity.Unit;
import com.beauty.common.orm.hibernate3.HibernateDao;

@Repository
public class UnitDao extends HibernateDao<Unit> {

	/**
	 * 查询类型
	 * 
	 * @param id
	 *            类型ID
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public List<Unit> getUnitListOrderby() {
		Query query = createQuery("from Unit u order by lower(u.unitname) asc");
		List<Unit> listuser = query.list();
		return listuser;
	}

	/**
	 * 查询类型
	 * 
	 * @param id
	 *            类型ID
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public List<Unit> getUnitListByUnitType() {
		String hql = "from Unit u where unittype=?  order by lower(u.unitname) asc";
		Query query = createQuery(hql, "物品单位");
		List<Unit> listuser = query.list();
		return listuser;
	}
}
