package com.beauty.biz.web.dictionary;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.convention.annotation.Results;
import org.springframework.beans.factory.annotation.Autowired;

import com.beauty.biz.entity.dictionary.Dictionaryinfo;
import com.beauty.biz.service.DictionaryManager;
import com.beauty.biz.service.SystemlogManager;
import com.beauty.common.page.QueryResult;
import com.beauty.common.utils.SearchUtil;
import com.beauty.common.utils.SessionUser;
import com.beauty.common.web.StrutsAction;

@Results( { @Result(name = "add", location = "dictionaryinfo-add.jsp"),
    })
public class DictionaryinfoAction extends StrutsAction<Dictionaryinfo>{
	private static final long serialVersionUID = 1L;
	@Autowired
	private DictionaryManager dictManage;
	@Autowired
	private SystemlogManager systemlogManager;
	
	private String dictCode;
	private String dinfoid;
	private String dictionarycode;
	private String dinfocode;
	private String dinfoname;
	private String dorder;
	private String rows;
	private String page;
	private String ids;// 批量删除的时候获取id
	
	private Dictionaryinfo dictionaryinfo;
	
	private List<Dictionaryinfo> dictinfoList;
	
	public String toList() {

		// 当前第几页
		int intPage = Integer.parseInt((page == null || page == "0") ? "1" : page);
		// 每页多少行
		int maxIndex = Integer.parseInt((getRows() == null || getRows() == "0") ? "20": getRows());
		// 开始页
		int startIndex = (intPage - 1) * maxIndex;

		StringBuilder whereSB = new StringBuilder();
		List<Object> params = new ArrayList<Object>();
		LinkedHashMap<String, String> orderby = new LinkedHashMap<String, String>();
		if (dictCode != null && !"".equals(dictCode)) {
			SearchUtil.getStringSearchByLower(whereSB, params, "dictionarycode",
					"=", this.dictCode);
		}
		orderby.put("dinfoid", "asc");
//		SearchUtil.getStringSearch(whereSB, params, "dinfoName", "like",this.dinfoName);
		// ============================2：原生实体SQL==============================="
		QueryResult<Dictionaryinfo> q;
		try {
			q = dictManage.getQueryResult(startIndex, maxIndex, whereSB.toString(), params.toArray(), orderby);
			// 总条数
			long total = q.getTotalrecord();
			List<Map<String, Object>> rowslist = new ArrayList<Map<String, Object>>();
			// QueryResult里封装的list
			List<Dictionaryinfo> dictList = q.getResultlist();
			for (Dictionaryinfo dictinfo : dictList) {

				// 列表要显示的字段及值
				Map<String, Object> map = new HashMap<String, Object>();
				map.put("dinfoid", dictinfo.getDinfoid());
				map.put("dictionarycode", dictinfo.getDictionarycode());
				map.put("dinfocode",dictinfo.getDinfocode() );
				map.put("dinfoname",dictinfo.getDinfoname());
				map.put("dorder", dictinfo.getDorder());
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
	
	public String dictinfoList() {
		int intPage = Integer.parseInt((page == null || page == "0") ? "1"
				: page);
		int maxIndex = Integer.parseInt((rows == null || rows == "0") ? "23"
				: rows);
		int startIndex = (intPage - 1) * maxIndex;

		StringBuilder whereSB = new StringBuilder();
		List<Object> params = new ArrayList<Object>();
		LinkedHashMap<String, String> orderby = new LinkedHashMap<String, String>();
		orderby.put("dinfoid", "asc");
		SearchUtil.getStringSearch(whereSB, params, "dictionarycode", "=",
				dictCode);

		QueryResult<Dictionaryinfo> q;
		try {
			q = dictManage.getQueryResult(startIndex, maxIndex, whereSB
					.toString(), params.toArray(), orderby);
		
		long total = q.getTotalrecord();
		List<Map<String, Object>> rows2 = new ArrayList<Map<String, Object>>();
		List<Dictionaryinfo> dictinfoList = q.getResultlist();
		// jquery easyui 需要返回的结果集
		for (Dictionaryinfo dictinfo : dictinfoList) {
			// 列表要显示的字段及值
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("dinfoid", dictinfo.getDinfoid());
			map.put("dictionarycode", dictinfo.getDictionarycode());
			map.put("dinfocode",dictinfo.getDinfocode() );
			map.put("dinfoname",dictinfo.getDinfoname());
			map.put("dorder", dictinfo.getDorder());
			
			rows2.add(map);

		}
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("total", total);// jquery easyui 需要的总记录数
		map.put("rows", rows2);// jquery easyui 需要的结果集

		String first = JSONArray.fromObject(map).toString();//
		String jsonString = first.substring(1, first.length() - 1);// 去掉“[”和“]”
		getResponse().getWriter().write(jsonString);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}// .getResultlist();

		return null;
	}
	
	public String save() throws IOException {
		try {
			if (dictionaryinfo.getDinfoid() == null||"".equals(dictionaryinfo.getDinfoid())) {
				String mid = dictManage.getSequence("SEQ_Dictionaryinfo");
				dictionaryinfo.setDinfoid(mid);
				// 向日志表中插入数据************开始
				SessionUser session = getSessionUser();
				String operatecontent = "添加了字典详情编号为" + dictionaryinfo.getDinfocode() + "的记录";
				systemlogManager.addSystemLog(session.getModule(), session
						.getUserid(), operatecontent);
				// **********************结束
			} else {
				// 向日志表中插入数据************开始
				SessionUser session = getSessionUser();
				String operatecontent = "修改了字典详情编号为" + dictionaryinfo.getDinfoid() + "的记录";
				systemlogManager.addSystemLog(session.getModule(), session.getUserid(), operatecontent);
				// **********************结束
			}
			dictManage.saveorupadate(dictionaryinfo);
			sendMsg("success");
		} catch (Exception e) {
			sendMsg("fail");
		}
		return null;
	}
	
	public void test(){
		String test = "";
		System.out.println(test);
	}

	/**
	 * 单条数据删除
	 * 
	 * @throws Exception
	 */
	public void deleteOnlyOne() throws Exception {
		dictManage.delete(id);
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
		dictManage.deleteAll(getIds());
		// 向日志表中插入数据************开始
		String newids = getIds().replace(",", "、");
		SessionUser session = getSessionUser();
		String operatecontent = "删除了编号为" + newids + "的记录";
		systemlogManager.addSystemLog(session.getModule(), session.getUserid(),operatecontent);
		// **********************结束
		sendMsg("success");
	}
	
	/**
	 * 用于显示详情
	 */
	public String toview() {
		String dictionarycode = getRequest().getParameter("id");
		getRequest().setAttribute("id", dictionarycode);
		return "views";
	}
	
	public void doInputEntity(){
		dictionaryinfo = dictManage.getByid(dinfoid);
		getRequest().setAttribute("dictionarycode", dictionarycode);
	}
	
	/**
	 *用于显示添加页面 
	 */
	public String add() {
		return "add";
	}
//*********************************get,set**************************************************************
	/**
	 * @return the rows
	 */
	public String getRows() {
		return rows;
	}

	/**
	 * @param rows the rows to set
	 */
	public void setRows(String rows) {
		this.rows = rows;
	}

	/**
	 * @return the page
	 */
	public String getPage() {
		return page;
	}

	/**
	 * @param page the page to set
	 */
	public void setPage(String page) {
		this.page = page;
	}

	
	/**
	 * @return the ids
	 */
	public String getIds() {
		return ids;
	}

	/**
	 * @param ids the ids to set
	 */
	public void setIds(String ids) {
		this.ids = ids;
	}

	/**
	 * @return the dictinfoList
	 */
	public List<Dictionaryinfo> getDictinfoList() {
		return dictinfoList;
	}

	/**
	 * @param dictinfoList the dictinfoList to set
	 */
	public void setDictinfoList(List<Dictionaryinfo> dictinfoList) {
		this.dictinfoList = dictinfoList;
	}

	/**
	 * @return the serialversionuid
	 */
	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	/**
	 * @return the dinfoid
	 */
	public String getDinfoid() {
		return dinfoid;
	}

	/**
	 * @param dinfoid the dinfoid to set
	 */
	public void setDinfoid(String dinfoid) {
		this.dinfoid = dinfoid;
	}

	/**
	 * @return the dictionarycode
	 */
	public String getDictionarycode() {
		return dictionarycode;
	}

	/**
	 * @return the dictCode
	 */
	public String getDictCode() {
		return dictCode;
	}

	/**
	 * @param dictCode the dictCode to set
	 */
	public void setDictCode(String dictCode) {
		this.dictCode = dictCode;
	}

	/**
	 * @param dictionarycode the dictionarycode to set
	 */
	public void setDictionarycode(String dictionarycode) {
		this.dictionarycode = dictionarycode;
	}

	/**
	 * @return the dinfocode
	 */
	public String getDinfocode() {
		return dinfocode;
	}

	/**
	 * @param dinfocode the dinfocode to set
	 */
	public void setDinfocode(String dinfocode) {
		this.dinfocode = dinfocode;
	}

	/**
	 * @return the dinfoname
	 */
	public String getDinfoname() {
		return dinfoname;
	}

	/**
	 * @param dinfoname the dinfoname to set
	 */
	public void setDinfoname(String dinfoname) {
		this.dinfoname = dinfoname;
	}

	/**
	 * @return the dorder
	 */
	public String getDorder() {
		return dorder;
	}

	/**
	 * @param dorder the dorder to set
	 */
	public void setDorder(String dorder) {
		this.dorder = dorder;
	}

	/**
	 * @return the dictionaryinfo
	 */
	public Dictionaryinfo getDictionaryinfo() {
		return dictionaryinfo;
	}

	/**
	 * @param dictionaryinfo the dictionaryinfo to set
	 */
	public void setDictionaryinfo(Dictionaryinfo dictionaryinfo) {
		this.dictionaryinfo = dictionaryinfo;
	}

	
}
