package com.beauty.biz.service.entpriseinfo;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.beauty.biz.dao.entpriseinfo.ScaleDao;
import com.beauty.biz.entity.entpriseinfo.Scale;

@Service
@Transactional
public class ScaleManager {
	@Autowired
	private ScaleDao scaleDao;

	/**
	 * 获得所有企业规模实体
	 * */
	public List<Scale> getAllScale() {
		return scaleDao.getAll();
	}

	/**
	 * 获得所有企业规模实体
	 * */
	public List<Scale> getAllScaleOrderByScalecode() {
		String hql = " select o from Scale o order by o.scalecode";
		List<Scale> list = scaleDao.createQuery(hql).list();
		return list;
	}

	/**
	 * 获得企业规模实体
	 * 
	 * @param scalecode
	 *            企业规模编号
	 */
	public Scale getScaleByScalecode(String scalecode) {
		return scaleDao.get(scalecode);
	}

}
