package com.beauty.biz.web.projects.taskregister;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import net.sf.json.JSONObject;

import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.convention.annotation.Results;
import org.springframework.beans.factory.annotation.Autowired;

import com.beauty.biz.entity.entpriseinfo.EntpriseInfo;
import com.beauty.biz.entity.projects.Projectdetail;
import com.beauty.biz.entity.projects.Projects;
import com.beauty.biz.entity.projects.Projectsampleitem;
import com.beauty.biz.service.projects.ProjectDetailManager;
import com.beauty.biz.service.projects.ProjectsManager;
import com.beauty.common.page.QueryResult;
import com.beauty.common.utils.SearchUtil;
import com.beauty.common.web.StrutsAction;

/**
 * 委托监测
 * 
 */
@Results( {
// @Result(name="toSearchPage",location="monitortask-search.jsp"),
// @Result(name="toOpinionPage",location="opinion-input.jsp"),
// @Result(name="toRegisterPage",location="taskregister-info.jsp"),
@Result(name = "toEntpriseListPage", location = "entprise2-select.jsp"), })
public class ProjectdetailAction extends StrutsAction<Projects> {
	private static final long serialVersionUID = -3773642206601005701L;
	private String page;// 当前页数
	private String rows; // 每页显示记录
	private String json;// 页面传递json字符串,也可向客户端回写消息用
	private String opinion; // 反馈信息
	private String info; // action信息
	private String status;

	private String projectcode;
	private String ent;

	/**
	 * 进入企业多选页面
	 * */
	public String toEntpriseListPage() {
		return "toEntpriseListPage";
	}

	// 注入的Service层
	@Autowired
	private ProjectDetailManager pdManager;
	@Autowired
	private ProjectsManager projectManager;

	
	public void detailList() throws Exception {
		int intPage = Integer.parseInt((page == null || page == "0") ? "1"
				: page);
		int maxIndex = Integer.parseInt((rows == null || rows == "0") ? "20"
				: rows);
		int startIndex = (intPage - 1) * maxIndex;

		List<Object> paramValues = new ArrayList<Object>();
		StringBuilder whereSQL = new StringBuilder();

		String fieldSQL = "detail,point";
		String tableSQL = " Projectdetail as detail left outer join detail.projectmonitorpoints as point";
		whereSQL.append("1=1");
		if (null != projectcode && !"".equals(projectcode)) {
			whereSQL.append(" and detail.projectcode = ?");
			paramValues.add(projectcode);
		}

		LinkedHashMap<String, String> orderby = new LinkedHashMap<String, String>();
		orderby.put("detail.ent.entname", "asc");
		// orderby.put("point.monitorpointtypeid.monitorpointtypename", "asc");
		// orderby.put("point.monitorpointid.monitorname", "asc");

		QueryResult<Object[]> q = pdManager.getScrollDateByHQL(startIndex,
				maxIndex, fieldSQL, tableSQL, whereSQL.toString(), paramValues
						.toArray(), orderby);
		long total = q.getTotalrecord();

		List<Map<String, Object>> rowData = new ArrayList<Map<String, Object>>();
		List<Object[]> list = q.getResultlist();
		for (Object[] obj : list) {
			Map<String, Object> map = new HashMap<String, Object>();
			Projectdetail detail = (Projectdetail) obj[0];
			map.put("projectdetail", detail == null ? "" : detail
					.getProjectdetailid());
			map.put("entid", detail == null ? "" : detail.getEnt().getEntid());
			map.put("entname", detail == null ? "" : detail.getEnt()
					.getEntname());
			map.put("projectcode", detail == null ? "" : detail
					.getProjectcode());

			String monitoritem = "";
			map.put("itemname", monitoritem);
			rowData.add(map);
		}
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("total", total);
		map.put("rows", rowData);

		String resultJson = JSONObject.fromObject(map).toString();
		getResponse().getWriter().write(resultJson);
	}

	public void getMonitor() throws IOException{
		try{
			Projects project = projectManager.getProjectByProjectcode(projectcode);
//			sendMsg(project.getMonitortype().getMonitortypecode());
		}catch(Exception e){
			sendMsg("fail");
		}
	}
	public void entList() throws Exception {
		try {
			int intPage = Integer.parseInt((page == null || page == "0") ? "1"
					: page);
			int maxIndex = Integer
					.parseInt((rows == null || rows == "0") ? "16" : rows);
			int startIndex = (intPage - 1) * maxIndex;

			String monitortypeid = getRequest().getParameter("monitortypeid");
			
			List<Projectdetail> pdList = pdManager.createQuery(
					"from Projectdetail o where o.projectcode = ?",
					this.projectcode).list();
			String exitEnt = "";
			for (Projectdetail pd : pdList) {
				if (!"".equals(exitEnt))
					exitEnt = exitEnt + ",";
				exitEnt = exitEnt + pd.getEnt().getEntid();
			}
			StringBuilder whereSB = new StringBuilder();
			List<Object> params = new ArrayList<Object>();
			LinkedHashMap<String, String> orderby = new LinkedHashMap<String, String>();
			orderby.put("entname", "asc");
			if(monitortypeid.equals("1")){//污染源
				SearchUtil.getStringSearch(whereSB, params,
						"pollutionsourcetype.sourcetypename", "like","%污染源%");
			}else if(monitortypeid.equals("2")){//环境质量
				SearchUtil.getStringSearch(whereSB, params,
						"pollutionsourcetype.sourcetypename", "not like", "%污染源%");
			}
			SearchUtil.getStringSearchByLower(whereSB, params, "entname",
					"like", getRequest().getParameter("entname"));
			SearchUtil.getStringSearch(whereSB, params,
					"pollutionsourcetype.sourcetypecode", "=", getRequest()
							.getParameter("sourcetypecode"));
			SearchUtil.getStringSearch(whereSB, params,
					"pollutionsourcetype.sourcetype", "=", getRequest()
							.getParameter("servicetype"));
			SearchUtil.getStringSearch(whereSB, params, "region.regioncode",
					"=", getRequest().getParameter("regioncode"));
			if (null != exitEnt && !"".equals(exitEnt)) {
				SearchUtil.getInSearch(whereSB, params, "entid", "not in",
						exitEnt);
			}
			QueryResult<EntpriseInfo> q = pdManager.getQueryEntResult(
					startIndex, maxIndex, whereSB.toString(), params.toArray(),
					orderby);// .getResultlist();

			long total = q.getTotalrecord();
			List<Map<String, Object>> rowData = new ArrayList<Map<String, Object>>();
			List<EntpriseInfo> entpriseInfoList = q.getResultlist();
			for (EntpriseInfo entInfo : entpriseInfoList) {
				Map<String, Object> map = new HashMap<String, Object>();
				map.put("entid", entInfo.getEntid());
				map.put("entname", entInfo.getEntname() != null ? entInfo
						.getEntname() : "");
				map.put("region", entInfo.getRegion() != null ? entInfo
						.getRegion().getRegionname() : "");
				map.put("pollutionsourcetype",
						entInfo.getPollutionsourcetype() != null ? entInfo
								.getPollutionsourcetype().getSourcetypename()
								: "");
				map.put("scale", entInfo.getScale() != null ? entInfo
						.getScale().getScalename() : "");
//				map.put("industry", entInfo.getIndustry() != null ? (entInfo
//						.getIndustry().getIndustrytypename() != null ? entInfo
//						.getIndustry().getIndustrytypename() : "") : "");
				map.put("address", entInfo.getAddress() != null ? entInfo
						.getAddress() : "");
				map.put("linkman", entInfo.getLinkman() != null ? entInfo
						.getLinkman() : "");
				map.put("telphone", entInfo.getTelphone() != null ? entInfo
						.getTelphone() : "");
				rowData.add(map);

			}
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("total", total);
			map.put("rows", rowData);
			String resultJson = JSONObject.fromObject(map).toString();
			getResponse().getWriter().write(resultJson);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public void addProjectDetail() throws IOException {
		if (pdManager.save(projectcode, ent)) {
			sendMsg("success");
		} else {
			sendMsg("fail");
		}
	}

	public void deleteProjectDetail() throws IOException {
		pdManager.remove(this.id);
		sendMsg("success");
	}

	
	@SuppressWarnings("unchecked")
	public void checkFee(){
	    try{
			String msg = "success";
			
//			List<Projectdetail> details = pdManager.getByprojectcode(projectcode);
//			for(Projectdetail detail :details){
//				List<Projectmonitorpoint> points = pdManager.getBydetailid(detail.getProjectdetailid());
//				if(points.size()>0){
//					for(Projectmonitorpoint point:points){
//						if(point.getMonitorpointid()==null||"".equals(point.getMonitorpointid())){
//							msg = "fail";
//							break;
//						}else if(point.getMonitorpointtypeid() == null ||"".equals(point.getMonitorpointtypeid())){
//							msg = "fail";
//							break;
//						}
//						Set<Projectsamplingset> sets = point.getProjectsamplingsets();
//						if(sets.size()>0){
//							for(Projectsamplingset set :sets){
//								List<Projectsampleitem> itemList = pdManager
//								.createQuery("from Projectsampleitem o where o.samplingsetid.samplingsetid = ? ", set.getSamplingsetid()).list();
//								if(itemList.size()>0){
//									
//								}else{
//									msg = "fail";
//									break;
//								}
//							}
//						}else{
//							msg = "fail";
//							break;
//						}
//						
//					}
//				}else{
//					msg="fail";
//					break;
//				}
//			}
//			Projects project = projectManager.getProjectByProjectcode(projectcode);
//			if(project.getDetectionfee()==null||"".equals(project.getDetectionfee())){
//				msg = "nofee";
//			}
			sendMsg(msg);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	public String getInfo() {
		return info;
	}

	public void setInfo(String info) {
		this.info = info;
	}

	public String getOpinion() {
		return opinion;
	}

	public void setOpinion(String opinion) {
		this.opinion = opinion;
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

	public String getJson() {
		return json;
	}

	public void setJson(String json) {
		this.json = json;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getProjectcode() {
		return projectcode;
	}

	public void setProjectcode(String projectcode) {
		this.projectcode = projectcode;
	}

	public String getEnt() {
		return ent;
	}

	public void setEnt(String ent) {
		this.ent = ent;
	}

}
