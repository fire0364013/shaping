package com.beauty.biz.service.entpriseinfo;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.beauty.biz.dao.SystemlogDao;
import com.beauty.common.page.QueryResult;
import com.beauty.common.utils.SessionUser;
import com.beauty.biz.dao.entpriseinfo.RegionDao;
import com.beauty.biz.entity.entpriseinfo.Region;

/**
 * 
 * @author wjy
 * 
 */
@Service
@Transactional
public class RegionManager {

	@Autowired
	private RegionDao regionDao;
	@Autowired
	private SystemlogDao systemlogDao;

	public RegionDao getRegionDao() {
		return regionDao;
	}

	public void setRegionDao(RegionDao regionDao) {
		this.regionDao = regionDao;
	}

	// 获取区域信息
	public List<Region> getAll() {
		List<Region> reg = regionDao.getAll();
		return reg;
	}

	/**
	 * 获取所有可用的省份信息
	 */
	public List<Region> getAllProvince() {
		List<Region> list = regionDao.getAllProvince();
		return list;
	}

	/**
	 * 获取某个省份下的所有可用的城市信息或某个城市下的所有可用的行政区
	 */
	public List<Region> getAllRegion(String parentregioncode) {
		List<Region> list = regionDao.getAllRegion(parentregioncode);
		return list;
	}

	/**
	 * 获取某个省份下的所有可用的城市信息或某个城市下的所有可用的行政区的json串
	 * 
	 * @param parentregioncode
	 * @return String json串
	 */
	public String getJsonCityOrRegion(String parentregioncode) {

		// 查用户角色名并加入map
		List<Region> regionList = getAllRegion(parentregioncode);
		List<Map<String, Object>> rowsData = new ArrayList<Map<String, Object>>();
		for (Region r : regionList) {
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("regioncode", r.getRegioncode());// 存 code
			map.put("regionname", r.getRegionname());// 存name
			rowsData.add(map);
		}
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("rowsData", rowsData);
		// 变成jsonobject
		String first = JSONArray.fromObject(map).toString();
		String jsonStr = first.substring(1, first.length() - 1);
		return JSONObject.fromObject(jsonStr).toString();
	}

	// 保存或更新区域信息
	public void saveUpdate(Region region) {
		regionDao.save(region);
	}

	// 根据逐渐id删除数据
	public void delete(String id) {
		regionDao.delete(id);
	}

	// 这里是返回查询结果的~~
	public List<Region> queryResult(HttpServletRequest request) {
		List<Criterion> criterions = new ArrayList<Criterion>();
		String regionnames = request.getParameter("regionnames");// 区域名称regionnames~.这是页面上的id属性
		if (null != regionnames && !"".equals(regionnames)) {
			criterions.add(Restrictions.like("regionname", regionnames,
					MatchMode.ANYWHERE));
			request.setAttribute("regionnames", regionnames);
		}
		String regioncode = request.getParameter("regioncode");
		if (null != regioncode && !"".equals(regioncode)) {
			criterions.add(Restrictions.like("regioncode", Integer
					.parseInt(regioncode)));
			request.setAttribute("regioncode", regioncode);
		}
		return regionDao.query(criterions.toArray(new Criterion[criterions
				.size()]));
	}

	/*
	 * 删除选中区域
	 */
	public void batchDelete(HttpServletRequest request, SessionUser session) {
		String str = request.getParameter("id");
		String[] arrId = str.split(",");
		for (String s : arrId) {
			try {
				regionDao.delete(s);// 批量删除~真删除的时候用这个
				// regionDao.updata(s);//批量修改，假删除的时候用这个
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		String newId = str.replace(",", "、");
		String operatecontent = "删除了行政区域id为" + newId + "的记录";
		systemlogDao.addSystemLog(session.getModule(), session.getUserid(),
				operatecontent);
	}

	// 插入区域的时候进行区域编号的判断
	public boolean saveRegion(String id) {
		return regionDao.saveInput(id);
	}

	/*
	 * 单个实体查询
	 */
	public QueryResult<Region> getQueryResult(int startIndex, int maxResult,
			String whereJPQL, Object[] params,
			LinkedHashMap<String, String> orderby) throws Exception {
		return regionDao.getScrollData(startIndex, maxResult, whereJPQL,
				params, orderby);
	}

	// /*
	// * 根据SQL类型查询
	// */
	// public QueryResult<Region> getByNativeSearch(int startIndex, int
	// maxResult,
	// String sql, String sqlType, Object[] params) throws Exception {
	// return regionDao.getScrollDateByNativeSQL(startIndex, maxResult, sql,
	// sqlType, params);
	// }

	// /**
	// * 原生SQL 条件查询
	// *
	// * @throws Exception
	// */
	// public QueryResult<Region> getScrollDateByNativeSQL(int startIndex,
	// int maxResult, String sql, String sqlType, Object[] params)
	// throws Exception {
	// return regionDao.getScrollDateByNativeSQL(startIndex, maxResult, sql,
	// sqlType, params);
	// }

	/**
	 * 获得区域实体
	 * 
	 * @param regioncode
	 *            : 区域编号
	 */
	public Region get(String regioncode) {
		return regionDao.get(regioncode);
	}
}
