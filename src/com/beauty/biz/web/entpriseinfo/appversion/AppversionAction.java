package com.beauty.biz.web.entpriseinfo.appversion;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import net.sf.json.JSONObject;

import org.springframework.beans.factory.annotation.Autowired;

import com.beauty.biz.entity.entpriseinfo.Appversion;
import com.beauty.biz.service.entpriseinfo.AppversionManager;
import com.beauty.common.page.QueryResult;
import com.beauty.common.utils.EasyStr;
import com.beauty.common.utils.SearchUtil;
import com.beauty.common.utils.SessionUser;
import com.beauty.common.web.StrutsAction;

public class AppversionAction extends StrutsAction<Appversion>{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String rows;
	private String page;
	private String appversionname;
	private String appinfoid;

	@Autowired
	private AppversionManager appversionManager;
	
	
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
		orderby.put("releasedate", "desc");
		SearchUtil.getStringSearch(whereSB, params, "validstatus", "=",
				"1");
		SearchUtil.getStringSearch(whereSB, params, "appinfoid", "=",appinfoid);
		if(appversionname != null && !"".equals(appversionname)){
			SearchUtil.getStringSearch(whereSB, params, "appversionname", "like",
				"%"+appversionname+"%");
		}
		// ============================2：原生实体SQL==============================="
		QueryResult<Appversion> q;
		try {
			q = appversionManager.getQueryResult(startIndex, maxIndex, whereSB
					.toString(), params.toArray(), orderby);
			// 总条数
			long total = q.getTotalrecord();
			List<Map<String, Object>> rowslist = new ArrayList<Map<String, Object>>();
			// QueryResult里封装的list
			List<Appversion> appversionList = q.getResultlist();
			for (Appversion appversion : appversionList) {

				// 列表要显示的字段及值
				Map<String, Object> map = new HashMap<String, Object>();
				map.put("appversionid", appversion.getAppversionid());
				map.put("appversionnumber", appversion.getAppversionnumber()==null?"":appversion.getAppversionnumber());
				map.put("appversionname", appversion.getAppversionname()==null?"":appversion.getAppversionname());
				map.put("appversionurl", appversion.getAppversionurl()==null?"":appversion.getAppversionurl());
				map.put("releasedate", EasyStr.getDate(appversion.getReleasedate()));
				map.put("releaser", appversion.getReleaser()==null?"":appversion.getReleaser());
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
		 if(entity.getAppversionid()==null || "".equals(entity.getAppversionid())){
			 id = appversionManager.getId();
			 entity.setReleasedate(new Date());
			 SessionUser user = getSessionUser();
			 if(user != null){
				 entity.setReleaser(user.getRealname());
			 }
			 entity.setAppversionid(id);
			 appversionManager.save(entity);
		 }else{
			 entity.setReleasedate(new Date());
			 SessionUser user = getSessionUser();
			 if(user != null){
				 entity.setReleaser(user.getRealname());
			 }
			 appversionManager.save(entity);
		 }
		 sendMsg("success");
		}catch(Exception e){
			e.printStackTrace();
			sendMsg("fail");
		}
		return null;
	}
	
	public String delete() throws IOException{
		try{
		entity = appversionManager.getById(id);
		if(entity != null){
			entity.setValidstatus("0");
			appversionManager.save(entity);
		}
		sendMsg("success");
		}catch(Exception e){
			e.printStackTrace();
			sendMsg("fail");
		}
		return null;
	}
	
	public String deleteMany() throws IOException{
		try{
		String idd = getRequest().getParameter("ids");
		String[] ids = idd.split(",");
		for(String id :ids){
			entity = appversionManager.getById(id);
			if(entity != null){
				entity.setValidstatus("0");
				appversionManager.save(entity);
			}
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

	public String getAppversionname() {
		return appversionname;
	}

	public void setAppversionname(String appversionname) {
		this.appversionname = appversionname;
	}

	public String getAppinfoid() {
		return appinfoid;
	}

	public void setAppinfoid(String appinfoid) {
		this.appinfoid = appinfoid;
	}

	
}
