package com.beauty.biz.web.normalauditrecord;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.springframework.beans.factory.annotation.Autowired;

import com.beauty.biz.entity.Normalauditrecord;
import com.beauty.biz.service.NormalAuditRecordManager;
import com.beauty.common.page.QueryResult;
import com.beauty.common.utils.EasyStr;
import com.beauty.common.utils.SearchUtil;
import com.beauty.common.web.StrutsAction;

public class NormalauditrecordAction extends StrutsAction<Normalauditrecord> {

	private static final long serialVersionUID = 7104196147551512373L;
	private String page;
	private String rows;

	@Autowired
	private NormalAuditRecordManager normalAuditRecordManager;

	private String moduleid;// 模块编号

	public String getModuleid() {
		return moduleid;
	}

	public void setModuleid(String moduleid) {
		this.moduleid = moduleid;
	}

	/**
	 * 获取所有的评审意见：下拉框
	 * 
	 * @throws IOException
	 */
	public void getNormalAuditRecordOpinion() throws IOException {
		String strModule = java.net.URLDecoder.decode(this.moduleid, "UTF-8");
		List<Normalauditrecord> queryList = normalAuditRecordManager
				.getList(strModule);
		List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
		for (Normalauditrecord record : queryList) {
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("id", record.getId());
			map.put("content", record.getContent());
			list.add(map);
		}
		String json = JSONArray.fromObject(list).toString();
		sendMsg(json);
	}

	public void opinionList() throws Exception {
		int intPage = Integer.parseInt((page == null || page == "0") ? "1"
				: page);
		int maxIndex = Integer.parseInt((rows == null || rows == "0") ? "20"
				: rows);
		int startIndex = (intPage - 1) * maxIndex;

		StringBuilder whereSB = new StringBuilder();
		List<Object> params = new ArrayList<Object>();
		LinkedHashMap<String, String> orderby = new LinkedHashMap<String, String>();

		String strModule = java.net.URLDecoder.decode(this.moduleid, "UTF-8");
		SearchUtil.getStringSearchByLower(whereSB, params, "moduleid", "=",
				strModule);

		QueryResult<Normalauditrecord> q = normalAuditRecordManager
				.getQueryResult(startIndex, maxIndex, whereSB.toString(),
						params.toArray(), orderby);

		long total = q.getTotalrecord();
		List<Map<String, Object>> rowData = new ArrayList<Map<String, Object>>();
		List<Normalauditrecord> recordList = q.getResultlist();
		for (Normalauditrecord n : recordList) {
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("id", n.getId());
			map.put("content", n.getContent());
			rowData.add(map);
		}
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("total", total);
		map.put("rows", rowData);
		String resultJson = JSONObject.fromObject(map).toString();
		getResponse().getWriter().write(resultJson);
	}

	public String getPage() {
		return page;
	}

	public void setPage(String page) {
		this.page = page;
	}

	public String getRows() {
		return rows;
	}

	public void setRows(String rows) {
		this.rows = rows;
	}

}
