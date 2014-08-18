package com.beauty.biz.dao.entpriseinfo;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.beauty.common.orm.hibernate3.HibernateDao;
import com.beauty.biz.entity.entpriseinfo.Industry;

@Repository
public class IndustryDao extends HibernateDao<Industry> {
	/**
	 * 获得 行业类型 序列值
	 * 
	 * @param sequenceName
	 *            :序列名称 :"SEQ_INDUSTRY"
	 * 
	 */
	public String getSequence(String sequenceName) {
		return super.getSequence(sequenceName);
	}

	/**
	 * 获取行业类型的json串
	 */
	@SuppressWarnings("unchecked")
	public List<Industry> getAllIndustryByParentTypeCode(String parenttypecode) {
		String hql = "from Industry i where i.parenttypecode=?";
		List<Industry> list = createQuery(hql,
				(Object[]) new String[] { parenttypecode }).list();
		return list;
	}
}
