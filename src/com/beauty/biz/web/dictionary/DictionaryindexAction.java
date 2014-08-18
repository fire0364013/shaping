package com.beauty.biz.web.dictionary;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import net.sf.json.JSONObject;

import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.convention.annotation.Results;
import org.springframework.beans.factory.annotation.Autowired;

import com.beauty.biz.entity.dictionary.Dictionaryindex;
import com.beauty.biz.service.SystemlogManager;
import com.beauty.biz.service.dictionary.DictionaryindexManager;
import com.beauty.common.page.QueryResult;
import com.beauty.common.utils.SearchUtil;
import com.beauty.common.utils.SessionUser;
import com.beauty.common.web.StrutsAction;

@Results( { @Result(name = "dictinfo", location = "dictionary.jsp"), })
public class DictionaryindexAction extends StrutsAction<Dictionaryindex> {

	private static final long serialVersionUID = 1L;
	@Autowired
	private DictionaryindexManager dictIndexManage;
	@Autowired
	private SystemlogManager systemlogManager;

	private String dictCode;
	private String rows;
	private String page;
	private String dictName;
	private String ids;// 批量删除的时候获取id

	private List<Dictionaryindex> dictIndexList;

	public String toList() {

		// 当前第几页
		int intPage = Integer.parseInt((page == null || page == "0") ? "1"
				: page);
		// 每页多少行
		int maxIndex = Integer
				.parseInt((getRows() == null || getRows() == "0") ? "20"
						: getRows());
		// 开始页
		int startIndex = (intPage - 1) * maxIndex;

		StringBuilder whereSB = new StringBuilder();
		List<Object> params = new ArrayList<Object>();
		LinkedHashMap<String, String> orderby = new LinkedHashMap<String, String>();
		orderby.put("dictionarycode", "asc");
		SearchUtil.getStringSearch(whereSB, params, "dictionaryname", "like",
				this.dictName);
		// ============================2：原生实体SQL==============================="
		QueryResult<Dictionaryindex> q;
		try {
			q = dictIndexManage.getQueryResult(startIndex, maxIndex, whereSB
					.toString(), params.toArray(), orderby);
			// 总条数
			long total = q.getTotalrecord();
			List<Map<String, Object>> rowslist = new ArrayList<Map<String, Object>>();
			// QueryResult里封装的list
			List<Dictionaryindex> dictList = q.getResultlist();
			for (Dictionaryindex dictIndex : dictList) {

				// 列表要显示的字段及值
				Map<String, Object> map = new HashMap<String, Object>();
				map.put("dictCode", dictIndex.getDictionarycode());
				map.put("dictName", dictIndex.getDictionaryname());
				rowslist.add(map);
			}
			Map<String, Object> mapall = new HashMap<String, Object>();
			mapall.put("total", total);
			mapall.put("rows", rowslist);
			String json = JSONObject.fromObject(mapall).toString();
			getResponse().getWriter().write(json);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	public String save() throws IOException {
		// try {
		// if (entity.getDictionaryname() == null||
		// entity.getDictionaryname().equals("")) {
		// String mid = dictIndexManage.getSequence("SEQ_FEEVERSION");
		// entity.setDictionarycode(mid);
		// // 向日志表中插入数据************开始
		// SessionUser session = getSessionUser();
		// String operatecontent = "添加了词典编号为" + entity.getDictionarycode() +
		// "的记录";
		// systemlogManager.addSystemLog(session.getModule(), session
		// .getUserid(), operatecontent);
		// // **********************结束
		// } else {
		// // 向日志表中插入数据************开始
		// SessionUser session = getSessionUser();
		// String operatecontent = "修改了词典编号为" + entity.getDictionarycode() +
		// "的记录";
		// systemlogManager.addSystemLog(session.getModule(),
		// session.getUserid(), operatecontent);
		// // **********************结束
		// }

		dictIndexManage.saveorupadate(entity);

		sendMsg("success");
		// } catch (Exception e) {
		// sendMsg("fail");
		// }
		return null;
	}

	/**
	 * 单条数据删除
	 * 
	 * @throws Exception
	 */
	public void deleteOnlyOne() throws Exception {
		dictIndexManage.delete(id);
		// 向日志表中插入数据************开始
		SessionUser session = getSessionUser();
		String operatecontent = "删除了编号为" + id + "的记录";
		systemlogManager.addSystemLog(session.getModule(), session.getUserid(),
				operatecontent);
		// **********************结束
		sendMsg("success");
	}

	/**
	 * 批量删除
	 */
	public void deleteAll() throws Exception {
		dictIndexManage.deleteAll(getIds());
		// 向日志表中插入数据************开始
		String newids = getIds().replace(",", "、");
		SessionUser session = getSessionUser();
		String operatecontent = "删除了编号为" + newids + "的记录";
		systemlogManager.addSystemLog(session.getModule(), session.getUserid(),
				operatecontent);
		// **********************结束
		sendMsg("success");
	}

	/**
	 * 进入字典详情查看页面
	 * 
	 * @return history
	 * @throws Exception
	 */
	public String dictinfo() throws Exception {
		String dictcode = getRequest().getParameter("dictCode");
		getRequest().setAttribute("dictcode", dictcode);
		return "dictinfo";
	}

	// *********************************get,set**************************************************************

	public void setRows(String rows) {
		this.rows = rows;
	}

	public String getRows() {
		return rows;
	}

	public String getPage() {
		return page;
	}

	public void setPage(String page) {
		this.page = page;
	}

	public String getDictName() {
		return dictName;
	}

	public void setDictName(String dictName) {
		this.dictName = dictName;
	}

	public void setIds(String ids) {
		this.ids = ids;
	}

	public String getIds() {
		return ids;
	}

	public List<Dictionaryindex> getDictIndexList() {
		return dictIndexList;
	}

	public void setDictIndexList(List<Dictionaryindex> dictIndexList) {
		this.dictIndexList = dictIndexList;
	}

	/**
	 * @return the dictIndexManage
	 */
	public DictionaryindexManager getDictIndexManage() {
		return dictIndexManage;
	}

	/**
	 * @param dictIndexManage
	 *            the dictIndexManage to set
	 */
	public void setDictIndexManage(DictionaryindexManager dictIndexManage) {
		this.dictIndexManage = dictIndexManage;
	}

	/**
	 * @return the systemlogManager
	 */
	public SystemlogManager getSystemlogManager() {
		return systemlogManager;
	}

	/**
	 * @param systemlogManager
	 *            the systemlogManager to set
	 */
	public void setSystemlogManager(SystemlogManager systemlogManager) {
		this.systemlogManager = systemlogManager;
	}

	/**
	 * @return the dictCode
	 */
	public String getDictCode() {
		return dictCode;
	}

	/**
	 * @param dictCode
	 *            the dictCode to set
	 */
	public void setDictCode(String dictCode) {
		this.dictCode = dictCode;
	}

}
