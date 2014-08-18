package com.beauty.biz.dao.entpriseinfo;

import org.springframework.stereotype.Repository;

import com.beauty.common.orm.hibernate3.HibernateDao;
import com.beauty.biz.entity.entpriseinfo.Scale;

@Repository
public class ScaleDao extends HibernateDao<Scale> {
	/**
	 * 获得 企业规模 序列值
	 * 
	 * @param sequenceName
	 *            :序列名称 :"SEQ_SCALE"
	 * 
	 */
	public String getSequence(String sequenceName) {
		return super.getSequence(sequenceName);
	}
}
