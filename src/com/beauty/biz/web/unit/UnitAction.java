package com.beauty.biz.web.unit;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import net.sf.json.JSONObject;

import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.convention.annotation.Results;
import org.springframework.beans.factory.annotation.Autowired;

import com.beauty.biz.entity.Unit;
import com.beauty.biz.service.SystemlogManager;
import com.beauty.biz.service.UnitManager;
import com.beauty.common.page.QueryResult;
import com.beauty.common.utils.SearchUtil;
import com.beauty.common.utils.SessionUser;
import com.beauty.common.web.StrutsAction;

/**
 * 计量单位管理
 * 
 * @author
 * 
 */
@Results( { @Result(name = "list", location = "unit-list.jsp"), })
public class UnitAction extends StrutsAction<Unit> {
	@Autowired
	private UnitManager unitManager;
	@Autowired
	private SystemlogManager systemlogManager;
	private String page;
	private String rows;
	private String unitName;
	private String json;

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

	public String getUnitName() {
		return unitName;
	}

	public void setUnitName(String unitName) {
		this.unitName = unitName;
	}

	public String getJson() {
		return json;
	}

	public void setJson(String json) {
		this.json = json;
	}

	/**
	 * 返回计量单位列表页面
	 */

	public String list() {
		return "list";
	}

	/**
	 * 计量单位查询 分页显示
	 * 
	 * @throws Exception
	 */
	public String unitList() throws Exception {
		int initPageNum = Integer.parseInt((page == null || page == "0") ? "1"
				: page); // 当前页码
		int initPageCount = Integer
				.parseInt((rows == null || rows == "0") ? "20" : rows); // 页面大小
		int pageStartIndex = (initPageNum - 1) * initPageCount; //

		StringBuilder whereSB = new StringBuilder();
		List<Object> params = new ArrayList<Object>();
		SearchUtil.getStringSearchByLower(whereSB, params, "unitname", "like",
				this.unitName);
		LinkedHashMap<String, String> orderBy = new LinkedHashMap<String, String>();
		orderBy.put("unitname", "asc");
		QueryResult<Unit> q = unitManager.getQueryResult(pageStartIndex,
				initPageCount, whereSB.toString(), params.toArray(), orderBy);

		long total = q.getTotalrecord();
		List<Map<String, Object>> datas = new ArrayList<Map<String, Object>>();
		List<Unit> unitList = q.getResultlist();
		for (Unit unit : unitList) {
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("id", unit.getUnitid());
			map.put("unitid", unit.getUnitid());
			map.put("unitname", unit.getUnitname());
			map.put("descript", unit.getDescription());
			datas.add(map);
		}
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("total", total);
		map.put("rows", datas);
		String jsonStr = JSONObject.fromObject(map).toString();
		getResponse().getWriter().write(jsonStr);
		return null;
	}

	/**
	 * 重写save方法 添加和修改计量单位
	 */

	public String save() throws Exception {
		try {
			if (entity.getUnitid() == null || "".equals(entity.getUnitid())) {
				entity.setUnitid(unitManager.getSequence("SEQ_UNIT"));
			}
			unitManager.addOrUpdate(entity);
			sendMsg("success");
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			sendMsg("faild");
		}
		return null;
	}

	/**
	 * 删除计量单位
	 */
	public String deleteUnit() throws Exception {
		try {
			String[] arrId = json.split(",");
			for (String s : arrId) {
				unitManager.delete(s);
			}
			// 向日志表中插入数据************开始
			String newids = json.replace(",", "、");
			SessionUser session = getSessionUser();
			String operatecontent = "删除了计量单位id为" + newids + "的记录";
			systemlogManager.addSystemLog(session.getModule(), session
					.getUserid(), operatecontent);
			// **********************结束
			sendMsg("success");
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			sendMsg("faild");
		}
		return null;
	}
}
