package com.beauty.biz.service.group;

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

import com.beauty.biz.dao.SystemlogDao;
import com.beauty.biz.dao.group.DepartmentgroupDao;
import com.beauty.biz.dao.group.UsergroupDao;
import com.beauty.biz.entity.group.Departmentgroup;
import com.beauty.biz.entity.group.Usergroup;
import com.beauty.common.page.QueryResult;
import com.beauty.common.utils.SessionUser;

@Service
@Transactional
public class DepartmentgroupManager {
	@Autowired
	private DepartmentgroupDao departmentgroupDao;
	@Autowired
	private UsergroupDao usergroupDao;
	@Autowired
	private SystemlogDao systemlogDao;

	/**
	 * 自定义hql语句来查询
	 * 
	 * @param hql
	 * @param values
	 * @return
	 */
	public Query queryEntiy(String hql, Object... values) {
		return departmentgroupDao.createQuery(hql, values);
	}

	public void save(Departmentgroup entity) {
		departmentgroupDao.save(entity);
	}

	/**
	 * 获取某个部门下的所有组json串
	 * 
	 * @param parentregioncode
	 * @return String json串
	 */
	public String getAllGroupByDepartJSON(String deptid) {

		// 查用户角色名并加入map
		List<Departmentgroup> deptgroupList = getAllGroupByDepart(deptid);
		List<Map<String, Object>> rowsData = new ArrayList<Map<String, Object>>();
		for (Departmentgroup r : deptgroupList) {
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("groupid", r.getGroupid());// 存 code
			map.put("groupname", r.getGroupname());// 存name
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
	 * 获取某个部门下的所有组
	 */
	public List<Departmentgroup> getAllGroupByDepart(String deptid) {
		List<Departmentgroup> list = departmentgroupDao
				.getAllGroupByDepart(deptid);
		return list;
	}

	/**
	 * 根据id查询
	 * 
	 * @return
	 */
	public Departmentgroup getById(String id) {
		Departmentgroup depar = departmentgroupDao.get(id);
		return depar;
	}

	/**
	 * 查询序列
	 * 
	 * @param sequenceName
	 * @return
	 */
	public String getSequence(String sequenceName) {
		return departmentgroupDao.getSequence(sequenceName);
	}

	/**
	 * 修改仪器设备类型
	 * 
	 * @param devicetypeid
	 *            仪器设备类型编号
	 * @param analyseSetId
	 *            分析设置编号
	 */
	public boolean updateDeviceType(String devicetypeid, String analyseSetId) {
		try {
			departmentgroupDao
					.createUpdateBySQL(
							"update Analyseset o set o.devicetype.devicetypeid = ? where o.analysesetid = ?",
							devicetypeid, analyseSetId);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}

	/**
	 * 单条删除
	 * 
	 * @param id
	 */
	@SuppressWarnings("unchecked")
	public void deleteById(String deptid, String groupid, SessionUser session) {
		// 删除部门组
		departmentgroupDao.delete(groupid);
		// 删除部门组用户
		String hql = "from Usergroup u where u.groupid =?";
		List<Usergroup> usergroupList = usergroupDao.createQuery(hql, groupid)
				.list();
		for (Usergroup usergroup : usergroupList) {
			usergroupDao.deleteByEntity(usergroup);
		}
		// 向日志表中插入数据************开始
		String operatecontent = "删除了部门组id为" + deptid + "的记录";
		systemlogDao.addSystemLog(session.getModule(), session.getUserid(),
				operatecontent);
		// **********************结束
	}

	/**
	 * 通过实体删除
	 * 
	 * @param entity
	 */
	@SuppressWarnings("unchecked")
	public void deleteByentity(Departmentgroup entity, SessionUser session) {
		departmentgroupDao.deleteByEntity(entity);
		String hql = "from Usergroup u where u.groupid =?";
		List<Usergroup> usergroupList = usergroupDao.createQuery(hql,
				entity.getGroupid()).list();
		for (Usergroup usergroup : usergroupList) {
			usergroupDao.deleteByEntity(usergroup);
		}
		// 向日志表中插入数据************开始
		String operatecontent = "删除了部门组id为" + entity.getGroupid() + "的记录";
		systemlogDao.addSystemLog(session.getModule(), session.getUserid(),
				operatecontent);
		// **********************结束
	}

	/**
	 * 去往list页面 以及条件查询
	 * 
	 * @param startIndex
	 * @param maxResult
	 * @param whereJPQL
	 * @param params
	 * @param orderby
	 * @return
	 * @throws Exception
	 */
	public QueryResult<Departmentgroup> getQueryResult(int startIndex,
			int maxResult, String whereJPQL, Object[] params,
			LinkedHashMap<String, String> orderby) throws Exception {
		return departmentgroupDao.getScrollData(startIndex, maxResult,
				whereJPQL, params, orderby);
	}
}
