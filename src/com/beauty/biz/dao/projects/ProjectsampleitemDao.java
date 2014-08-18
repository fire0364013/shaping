package com.beauty.biz.dao.projects;

import java.util.List;

import org.hibernate.Query;
import org.springframework.stereotype.Repository;

import com.beauty.common.orm.hibernate3.HibernateDao;
import com.beauty.biz.entity.projects.Projectsampleitem;

@Repository
public class ProjectsampleitemDao extends HibernateDao<Projectsampleitem> {
	/**
	 * 根据项目采样设置id获取样品项目List
	 * 
	 * @param ppointid
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public List<Projectsampleitem> getItemListBySamplesetid(String samplingsetid) {
		Query query = createQuery(
				" from Projectsampleitem o  where o.samplingsetid.samplingsetid = ? order by o.item.orderid",
				samplingsetid);
		return query.list();// and o.item.ispreitem = 'N' 判断前置项目
	}
	
	/**
	 * 根据项目采样设置id获取样品项目List
	 * 
	 * @param ppointid
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public List<Projectsampleitem> getItemListByitemid(String itemid,String pmsetid) {
		Query query = createQuery(
				" from Projectsampleitem o  where o.item.itemid = ? and o.samplingsetid.samplingsetid=?  order by o.item.orderid",
				itemid,pmsetid);
		return query.list();// and o.item.ispreitem = 'N' 判断前置项目
	}
}
