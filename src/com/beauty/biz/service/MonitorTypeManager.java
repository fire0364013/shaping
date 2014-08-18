package com.beauty.biz.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.hibernate.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.beauty.biz.dao.MonitorTypeDao;
import com.beauty.biz.entity.MonitorType;
import com.beauty.common.page.QueryResult;

@Service
@Transactional
public class MonitorTypeManager {
	@Autowired
	private MonitorTypeDao monitorTypeDao;

	/**
	 * 获得所有监测业务类型实体
	 */
	public List<MonitorType> getAllMonitortype() {
		return monitorTypeDao.getAll();
	}

	/**
	 * 获得所有监测业务类型实体 根据名字进行的排序
	 */
	public List<MonitorType> getAllMonitortypeOrder() {
		return monitorTypeDao.getAllMonitortypeOrder();
	}

	/**
	 * 获得监测业务类型实体
	 * 
	 * @param monitortypeid
	 *            实体id
	 */
	public MonitorType getMonitorTypeByMonitortypeid(String monitortypeid) {
		return monitorTypeDao.get(monitortypeid);
	}

	public String getMonitornature(String monitortypeid) {
		MonitorType monitorType = monitorTypeDao.get(monitortypeid);
		return monitorType.getMonitornature();
	}

	/**
	 * 获取某个父类型所有子类型实体
	 */
	public List<MonitorType> getAllMonitorTypeByParentType(String parentType) {
		return monitorTypeDao.getAllMonitorTypeByParentType(parentType);
	}

	/**
	 * 获取某个父业务类型的监测业务类型的json串
	 * 
	 * @return String json串
	 */
	public String getAllMonitorTypeByParentTypeJson(String parentType) {// getAllMonitorTypeByParentTypes

		// 查用户角色名并加入map
		List<MonitorType> typeList = monitorTypeDao
				.getAllMonitorTypeByParentType(parentType);
		List<Map<String, Object>> rowsData = new ArrayList<Map<String, Object>>();
		for (MonitorType m : typeList) {
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("monitortypeid", m.getMonitortypeid());// 存 code
			map.put("monitortypename", m.getMonitortypename());// 存name
			rowsData.add(map);
		}
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("rowsData", rowsData);
		// 变成jsonobject
		String first = JSONArray.fromObject(map).toString();
		String jsonStr = first.substring(1, first.length() - 1);
		return JSONObject.fromObject(jsonStr).toString();
	}

	/**
	 * 获取某几个父业务类型的监测业务类型的json串
	 * 
	 * @return String json串
	 */
	public String getAllMonitorTypeByParentTypesJson(String parentType) {

		// 查用户角色名并加入map
		List<MonitorType> typeList = monitorTypeDao
				.getAllMonitorTypeByParentTypes(parentType);
		List<Map<String, Object>> rowsData = new ArrayList<Map<String, Object>>();
		for (MonitorType m : typeList) {
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("monitortypeid", m.getMonitortypeid());// 存 code
			map.put("monitortypename", m.getMonitortypename());// 存name
			rowsData.add(map);
		}
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("rowsData", rowsData);
		// 变成jsonobject
		String first = JSONArray.fromObject(map).toString();
		String jsonStr = first.substring(1, first.length() - 1);
		return JSONObject.fromObject(jsonStr).toString();
	}

	/**
	 * 单条删除
	 * 
	 * @param id
	 */
	public void delete(String id) {
		monitorTypeDao.delete(id);
	}

	/**
	 * 去往list页面， 并且条件查询
	 * 
	 * @param startIndex
	 * @param maxResult
	 * @param whereJPQL
	 * @param params
	 * @param orderby
	 * @return
	 * @throws Exception
	 */
	public QueryResult<MonitorType> getQueryResult(int startIndex,
			int maxResult, String whereJPQL, Object[] params,
			LinkedHashMap<String, String> orderby) throws Exception {
		return monitorTypeDao.getScrollData(startIndex, maxResult, whereJPQL,
				params, orderby);
	}

	/**
	 * 保存
	 * 
	 * @param departmentinfo
	 */
	public void saveorupadate(MonitorType trainplan) {
		monitorTypeDao.save(trainplan);
	}

	/**
	 * 根据id查询
	 * 
	 * @return
	 */
	public MonitorType getByID(String id) {
		return monitorTypeDao.get(id);
	}

	/**
	 * 查询序列
	 * 
	 * @param sequenceName
	 * @return
	 */
	public String getSequence(String sequenceName) {
		return monitorTypeDao.getSequence(sequenceName);
	}

	/**
	 * HQL查询
	 * 
	 * @param sql查询语句
	 * @param values参数值
	 * @return
	 */
	public Query createNativeQuery(String sql, Object... values) {
		return monitorTypeDao.createNativeQuery(sql, values);
	}
}
