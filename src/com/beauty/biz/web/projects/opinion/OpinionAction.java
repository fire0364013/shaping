package com.beauty.biz.web.projects.opinion;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import net.sf.json.JSONObject;

import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.convention.annotation.Results;
import org.springframework.beans.factory.annotation.Autowired;

import com.beauty.biz.entity.projects.Projects;
import com.beauty.biz.service.projects.ProjectsManager;
import com.beauty.biz.service.UserInfoManager;
import com.beauty.common.page.QueryResult;
import com.beauty.common.utils.EasyStr;
import com.beauty.common.utils.SearchUtil;
import com.beauty.common.web.StrutsAction;

@Results({
	@Result(name="select",location="opinion-select.jsp"),
	@Result(name=OpinionAction.LIST,location="opinion-list.jsp")
})
public class OpinionAction extends StrutsAction<Projects> {
	private static final long serialVersionUID = 872912560586486160L;
	private String rows;						//列表数据
	private String page;						//页数
	private String showName;					//显示名字
	private String moduleid;					//模块编号
	private String workFlowName; // 哪个工作流StrutsAction.WTMONITORWORKFLO
	private String steptype;//审核记录类型
	@Autowired
	private UserInfoManager userInfoManager;				//用户
	@Autowired
	private ProjectsManager projectsManager;				//项目工作流
	
	public String select() throws Exception{
		moduleid=java.net.URLDecoder.decode(moduleid,"UTF-8");
		return "select";
	}
	
	protected void doInputEntity() throws Exception{
		showName=java.net.URLDecoder.decode(showName,"UTF-8");
	}
	
	public String opinionList(){
		int intPage = Integer.parseInt((page ==null || page =="0") ? "1":page);
		int maxIndex = Integer.parseInt((rows==null || rows=="0") ? "20":rows);
		int startIndex = (intPage-1)*maxIndex;
		StringBuilder whereSB = new StringBuilder();
		List<Object> params = new ArrayList<Object>();
		Projects project = projectsManager.getProjects(id);
		SearchUtil.getStringSearch(whereSB, params, "entityid","=",id);
		LinkedHashMap<String, String> orderby = new LinkedHashMap<String, String>();
		orderby.put("audittime", "asc");

		try {
		Map<String, Object> maps = new HashMap<String, Object>();
//		maps.put("total", total);
//		maps.put("rows", rowslist);
		String json = JSONObject.fromObject(maps).toString();
		getResponse().getWriter().write(json);
		} catch (Exception e) {
			e.printStackTrace();
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
	public String getShowName() {
		return showName;
	}
	public void setShowName(String showName) {
		this.showName = showName;
	}
	public String getModuleid() {
		return moduleid;
	}
	public void setModuleid(String moduleid) {
		this.moduleid = moduleid;
	}

	public String getWorkFlowName() {
		return workFlowName;
	}

	public void setWorkFlowName(String workFlowName) {
		this.workFlowName = workFlowName;
	}

	public String getSteptype() {
		return steptype;
	}

	public void setSteptype(String steptype) {
		this.steptype = steptype;
	}
	
	
}