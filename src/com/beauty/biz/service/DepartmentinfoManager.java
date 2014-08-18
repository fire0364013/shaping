package com.beauty.biz.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.hibernate.criterion.Criterion;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.beauty.biz.dao.DepartmentinfoDao;
import com.beauty.biz.dao.group.DepartmentgroupDao;
import com.beauty.biz.dao.group.UsergroupDao;
import com.beauty.biz.entity.Departmentinfo;
import com.beauty.biz.entity.group.Departmentgroup;
import com.beauty.biz.entity.group.Usergroup;
import com.beauty.common.page.QueryResult;

@Service
@Transactional
public class DepartmentinfoManager {

	/**
	 * 
	 */
	@Autowired
	private DepartmentinfoDao departmentinfoDao;
	@Autowired
	private DepartmentgroupDao departmentgroupDao;
	@Autowired
	private UsergroupDao usergroupDao;

	/**
	 * 得到所有部门的json串
	 * */
	public String getAllDepartJSON() {
		// 查部门并加入map
		List<Departmentinfo> regionList = getAll();
		List<Map<String, Object>> rowsData = new ArrayList<Map<String, Object>>();
		for (Departmentinfo d : regionList) {
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("deptid", d.getDeptid());// 存 code
			map.put("deptname", d.getDeptname());// 存name
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
	 * 保存
	 * 
	 * @param departmentinfo
	 */
	public void saveorupadate(Departmentinfo departmentinfo) {
		departmentinfoDao.save(departmentinfo);
	}

	/**
	 * 分管站长的数据
	 * 
	 * @param ids
	 * @return
	 * @throws Exception
	 */
	public List<Departmentinfo> getDList(String ids) throws Exception {
		return departmentinfoDao.getAllByIn(ids);
	}

	/**
	 * 查询出部门所有信息
	 * 
	 * @return
	 */
	public List<Departmentinfo> getAll() {
		List<Departmentinfo> depar = departmentinfoDao.getAllOrderBy();
		return depar;
	}

	/**
	 * 查询出部门所有信息
	 * 
	 * @return
	 */
	public List<Departmentinfo> getAllOther(String did) {
		List<Departmentinfo> depar = departmentinfoDao.getAllOther(did);
		return depar;
	}

	/**
	 * 根据id查询
	 * 
	 * @return
	 */
	public Departmentinfo getByID(String id) {
		Departmentinfo depar = departmentinfoDao.get(id);
		return depar;
	}

	/**
	 * 条件查询
	 * 
	 * @return
	 * @throws Exception
	 */
	public List<Departmentinfo> getByAttr(Integer id) throws Exception {
		List<Departmentinfo> depar = departmentinfoDao.getAllByAttr(id);
		return depar;
	}

	/**
	 * 条件，暂时没用到
	 * 
	 * @param request
	 * @return
	 */
	public List<Departmentinfo> queryResult(final Criterion... criterions) {

		return departmentinfoDao.query(criterions);
	}

	/**
	 * 批量删除
	 * 
	 * @param ids
	 */
	public void deleteAll(String ids) {
		String[] deparid = ids.split(",");
		for (int i = 0; i < deparid.length; i++) {
			delete(deparid[i]);
		}

	}

	/**
	 * 单条删除
	 * 
	 * @param id
	 */
	public void delete(String id) {
		departmentinfoDao.delete(id);
		String hqldepargroup = "from Departmentgroup r where r.deptid=?";
		List<Departmentgroup> deparGroupList = departmentinfoDao.createQuery(
				hqldepargroup, id).list();
		for (Departmentgroup departmentgroup : deparGroupList) {
			// 删除部门组
			String groupid = departmentgroup.getGroupid();
			departmentgroupDao.delete(groupid);
			// 删除部门组用户
			String hql = "from Usergroup u where u.groupid =?";
			List<Usergroup> usergroupList = usergroupDao.createQuery(hql,
					groupid).list();
			for (Usergroup usergroup : usergroupList) {
				usergroupDao.deleteByEntity(usergroup);
			}
			// 删除项目仪器
			String snalysesetHql = "from Analyseset where departmentinfo.deptid=? and departmentgroup.groupid=?";
		}
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
	public QueryResult<Departmentinfo> getQueryResult(int startIndex,
			int maxResult, String whereJPQL, Object[] params,
			LinkedHashMap<String, String> orderby) throws Exception {
		return departmentinfoDao.getScrollData(startIndex, maxResult,
				whereJPQL, params, orderby);
	}

	/**
	 * 查询序列
	 * 
	 * @param sequenceName
	 * @return
	 */
	public String getSequence(String sequenceName) {
		return departmentinfoDao.getSequence(sequenceName);
	}

}
