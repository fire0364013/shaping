package com.beauty.biz.service.entpriseinfo;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.beauty.biz.dao.entpriseinfo.IndustryDao;
import com.beauty.biz.entity.entpriseinfo.Industry;

@Service
@Transactional
public class IndustryManager {
	@Autowired
	private IndustryDao industryDao;

	/**
	 * 获得所有行业类型实体
	 * */
	public List<Industry> getAllIndustry() {
		return industryDao.getAll();
	}

	/**
	 * 获得行业类型实体
	 * 
	 * @param industrytypecode
	 *            : 行业类型编号
	 */
	public Industry getIndustryByIndustrytypecode(String industrytypecode) {
		return industryDao.get(industrytypecode);
	}

	/**
	 * 获取行业类型的json串
	 * 
	 * @param parenttypecode
	 * @return String json串
	 */
	public String getIndustryJson(String parenttypecode) {

		List<Industry> industryList = industryDao
				.getAllIndustryByParentTypeCode(parenttypecode);
		List<Map<String, Object>> rowsData = new ArrayList<Map<String, Object>>();
		for (Industry r : industryList) {
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("industrytypecode", r.getIndustrytypecode());// 存 code
			map.put("industrytypename", r.getIndustrytypename());// 存name
			rowsData.add(map);
		}
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("rowsData", rowsData);
		// 变成jsonobject
		String first = JSONArray.fromObject(map).toString();
		String jsonStr = first.substring(1, first.length() - 1);// 去掉"["和"]"
		return JSONObject.fromObject(jsonStr).toString();
	}
}
