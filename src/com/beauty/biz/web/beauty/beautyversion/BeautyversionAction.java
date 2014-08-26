package com.beauty.biz.web.beauty.beautyversion;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import net.sf.json.JSONObject;

import org.springframework.beans.factory.annotation.Autowired;

import com.beauty.biz.entity.beautyinfo.Beautyversion;
import com.beauty.biz.service.beautyinfo.BeautyversionManager;
import com.beauty.common.page.QueryResult;
import com.beauty.common.utils.EasyStr;
import com.beauty.common.utils.SearchUtil;
import com.beauty.common.web.StrutsAction;

/**
 * 医美版本表
 * @author bing
 *
 */
public class BeautyversionAction extends StrutsAction<Beautyversion> {

	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String rows;
	private String page;
	private String entname;

	@Autowired
	private BeautyversionManager beautyversionManager;
	
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
				.parseInt((rows == null || rows == "0") ? "20"
						: rows);
		// 开始页
		int startIndex = (intPage - 1) * maxIndex;
		
		StringBuilder whereSB = new StringBuilder();
		List<Object> params = new ArrayList<Object>();
		LinkedHashMap<String, String> orderby = new LinkedHashMap<String, String>();
		orderby.put("operatedate", "desc");
		SearchUtil.getStringSearch(whereSB, params, "validstatus", "=",
				"1");
		if(entname != null && !"".equals(entname)){
			SearchUtil.getStringSearch(whereSB, params, "entprise.entname", "like",
				"%"+this.entname+"%");
		}
		// ============================2：原生实体SQL==============================="
		QueryResult<Beautyversion> q;
		try {
			q = beautyversionManager.getQueryResult(startIndex, maxIndex, whereSB
					.toString(), params.toArray(), orderby);
			// 总条数
			long total = q.getTotalrecord();
			List<Map<String, Object>> rowslist = new ArrayList<Map<String, Object>>();
			// QueryResult里封装的list
			List<Beautyversion> beautyversionList = q.getResultlist();
			for (Beautyversion beautyversion : beautyversionList) {

				// 列表要显示的字段及值
				Map<String, Object> map = new HashMap<String, Object>();
				map.put("beautyversionid", beautyversion.getBeautyversionid());
				map.put("entname", beautyversion.getEntprise()==null?"":beautyversion.getEntprise().getEntname());
				map.put("versioninfo", beautyversion.getVersioninfo()==null?"":beautyversion.getVersioninfo());
				map.put("operator", beautyversion.getOperator()==null?"":beautyversion.getOperator());
				map.put("operatedate", EasyStr.getDate(beautyversion.getOperatedate()));
				map.put("mobilephone", beautyversion.getMobilephone()==null?"":beautyversion.getMobilephone());
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
	
	public void doInputEntity() throws Exception{
		String entid = getSessionUser().getEntid();
		String entname = getSessionUser().getEntname();
		getRequest().setAttribute("entid", entid);
		getRequest().setAttribute("entname", entname);
	}
	
	public String save() throws IOException {
		try{
		 if(entity.getBeautyversionid()==null || "".equals(entity.getBeautyversionid())){
			 id = beautyversionManager.getId();
			 entity.setOperatedate(new Date());
			 entity.setBeautyversionid(id);
			 beautyversionManager.saveorupadate(entity);
		 }else{
			 entity.setOperatedate(new Date());
			 beautyversionManager.saveorupadate(entity);
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
		entity = beautyversionManager.getById(id);
		if(entity != null){
			entity.setValidstatus("0");
			beautyversionManager.saveorupadate(entity);
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
			entity = beautyversionManager.getById(id);
			if(entity != null){
				entity.setValidstatus("0");
				beautyversionManager.saveorupadate(entity);
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

	public String getEntname() {
		return entname;
	}

	public void setEntname(String entname) {
		this.entname = entname;
	}
	
	
}
