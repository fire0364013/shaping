package com.beauty.biz.dao.entpriseinfo;

import org.springframework.stereotype.Repository;

import com.beauty.common.orm.hibernate3.HibernateDao;
import com.beauty.biz.entity.entpriseinfo.Registertype;

@Repository
public class RegistertypeDao extends HibernateDao<Registertype> {
	/**
	 * 获得 登记注册类型 序列值
	 * 
	 * @param sequenceName
	 *            :序列名称 :"SEQ_REGISTERTYPE"
	 * 
	 */
	public String getSequence(String sequenceName) {
		return super.getSequence(sequenceName);
	}
}
