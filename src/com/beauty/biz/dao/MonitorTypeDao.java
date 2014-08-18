package com.beauty.biz.dao;

import java.util.List;

import org.hibernate.Query;
import org.springframework.stereotype.Repository;

import com.beauty.biz.entity.MonitorType;
import com.beauty.common.orm.hibernate3.HibernateDao;

@Repository
public class MonitorTypeDao extends HibernateDao<MonitorType> {
	/**
	 * 获取某个父类型所有子类型实体
	 */
	@SuppressWarnings("unchecked")
	public List<MonitorType> getAllMonitorTypeByParentType(String parentType) {
		String hql = "from MonitorType m where m.parenttype=?";
		List<MonitorType> list = createQuery(hql,
				(Object[]) new String[] { parentType }).list();
		return list;
	}

	/**
	 * 获取某几个个父类型所有子类型实体
	 */
	@SuppressWarnings("unchecked")
	public List<MonitorType> getAllMonitorTypeByParentTypes(String parentTypes) {
		String[] str = parentTypes.split(",");
		String[] valArr = new String[str.length];
		String strTemp = "";
		for (int i = 0; i < str.length; i++) {
			strTemp += "?,";
			valArr[i] = str[i];
		}
		strTemp = strTemp.substring(0, strTemp.length() - 1);
		String hql = "from MonitorType m where m.parenttype in (" + strTemp
				+ ")";

		List<MonitorType> list = createQuery(hql, (Object[]) valArr).list();
		return list;
	}

	/**
	 * 报告组号为空的数据。测试报告 监测点id，监测点名称
	 * 
	 * @param projectcode
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public List<MonitorType> getAllMonitortypeOrder() {
		String hql = "from MonitorType m  order by m.monitortypename";
		Query query = createQuery(hql);
		List<MonitorType> monitorpointsList = query.list();
		return monitorpointsList;
	}
	/**
	 * 获取给定主键的监测类型列表
	 * 
	 * @param monitortypeid
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public List<MonitorType> getMonitortypeById(String motortypeid) {
		String hql = "from MonitorType m  where m.monitortypeid = ?";
		List<MonitorType> list = createQuery(hql,
				(Object[]) new String[] { motortypeid }).list();
		return list;
	}	
}
