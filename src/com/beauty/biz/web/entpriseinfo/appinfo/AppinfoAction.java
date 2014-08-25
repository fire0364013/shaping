package com.beauty.biz.web.entpriseinfo.appinfo;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import net.sf.json.JSONObject;

import org.springframework.beans.factory.annotation.Autowired;

import com.beauty.biz.entity.entpriseinfo.Appinfo;
import com.beauty.biz.service.entpriseinfo.AppinfoManager;
import com.beauty.common.page.QueryResult;
import com.beauty.common.utils.SearchUtil;
import com.beauty.common.web.StrutsAction;


public class AppinfoAction extends StrutsAction<Appinfo>{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String rows;
	private String page;
	private String appinfoname;

	@Autowired
	private AppinfoManager appinfoManager;
	
	/**
	 * 跳转list页面
	 * @return
	 */
	public String toListPage(){
		return "list";
	}
	
	public String toList() {

		// 当前第几页
		int intPage = Integer.parseInt((page == null || page == "0") ? "1"
				: page);
		// 每页多少行
		int maxIndex = Integer
				.parseInt((rows == null || rows == "0") ? "10"
						: rows);
		// 开始页
		int startIndex = (intPage - 1) * maxIndex;
		
		StringBuilder whereSB = new StringBuilder();
		List<Object> params = new ArrayList<Object>();
		LinkedHashMap<String, String> orderby = new LinkedHashMap<String, String>();
		if(appinfoname != null && !"".equals(appinfoname)){
			SearchUtil.getStringSearch(whereSB, params, "appinfoname", "like",
				"%"+appinfoname+"%");
		}
		// ============================2：原生实体SQL==============================="
		QueryResult<Appinfo> q;
		try {
			q = appinfoManager.getQueryResult(startIndex, maxIndex, whereSB
					.toString(), params.toArray(), orderby);
			// 总条数
			long total = q.getTotalrecord();
			List<Map<String, Object>> rowslist = new ArrayList<Map<String, Object>>();
			// QueryResult里封装的list
			List<Appinfo> appinfoList = q.getResultlist();
			for (Appinfo appinfo : appinfoList) {

				// 列表要显示的字段及值
				Map<String, Object> map = new HashMap<String, Object>();
				map.put("appinfoid", appinfo.getAppinfoid());
				map.put("appinfoname", appinfo.getAppinfoname()==null?"":appinfo.getAppinfoname());
				map.put("remark", appinfo.getRemark()==null?"":appinfo.getRemark());
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
		try{
		 if(entity.getAppinfoid()==null || "".equals(entity.getAppinfoid())){
			 id = appinfoManager.getId();
			 entity.setAppinfoid(id);
			 appinfoManager.save(entity);
		 }else{
			 appinfoManager.save(entity);
		 }
		 sendMsg("success");
		}catch(Exception e){
			e.printStackTrace();
			sendMsg("fail");
		}
		return null;
	}
	
	public String getRows() {
		return rows;
	}

	public void setRows(String rows) {
		this.rows = rows;
	}

	public String getPage() {
		return page;
	}

	public void setPage(String page) {
		this.page = page;
	}

	public String getAppinfoname() {
		return appinfoname;
	}

	public void setAppinfoname(String appinfoname) {
		this.appinfoname = appinfoname;
	}



}
