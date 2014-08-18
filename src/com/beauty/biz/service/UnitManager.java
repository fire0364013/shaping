package com.beauty.biz.service;

import java.io.Serializable;
import java.util.LinkedHashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.beauty.biz.dao.UnitDao;
import com.beauty.biz.entity.Unit;
import com.beauty.common.page.QueryResult;

@Service
@Transactional
public class UnitManager {
	@Autowired
	private UnitDao unitDao;

	/**
	 * 分页查询
	 * 
	 * @param startIndex
	 *            每页开始索引
	 * @param maxResult
	 *            页面大小
	 * @param whereJPQL
	 *            查询条件
	 * @param params
	 *            参数
	 * @param orderby
	 *            排序
	 * @return
	 * @throws Exception
	 */
	public QueryResult<Unit> getQueryResult(int startIndex, int maxResult,
			String whereJPQL, Object[] params,
			LinkedHashMap<String, String> orderby) throws Exception {
		return unitDao.getScrollData(startIndex, maxResult, whereJPQL, params,
				orderby);
	}

	/**
	 * 获取序列值主键
	 * 
	 * @param sequenceName
	 *            序列名称"SEQ_UNIT"
	 * @return
	 */
	public String getSequence(String sequenceName) {
		return unitDao.getSequence(sequenceName);
	}

	/**
	 * 添加或修改
	 * 
	 * @param unit
	 *            实体对象
	 */
	public void addOrUpdate(Unit unit) {
		unitDao.save(unit);
	}

	/**
	 * 获得unit的数据 根据名字升序
	 * 
	 * @return
	 */
	public List<Unit> getUnitList() {
		List<Unit> unitList = unitDao.getUnitListOrderby();
		return unitList;
	}

	/**
	 * 获得unit的数据 根据名字升序
	 * 
	 * @return
	 */
	public List<Unit> getUnitListByUnitType() {
		List<Unit> unitList = unitDao.getUnitListByUnitType();
		return unitList;
	}

	/**
	 * 删除
	 * 
	 * @param id
	 *            计量单位ID
	 */
	public void delete(Serializable id) {
		unitDao.delete(id);
	}

	/**
	 * 获得单位实体
	 */
	public Unit get(String unitid) {
		return unitDao.get(unitid);
	}

}
