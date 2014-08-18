package com.beauty.biz.web.projects.taskregister;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.convention.annotation.Results;
import org.springframework.beans.factory.annotation.Autowired;

import com.beauty.biz.entity.projects.Projectitem;
import com.beauty.biz.entity.projects.Projects;
import com.beauty.biz.entity.projects.Subcontract;
import com.beauty.biz.service.entpriseinfo.EntpriseInfoManager;
import com.beauty.biz.service.projects.ProjectDetailManager;
import com.beauty.biz.service.projects.ProjectsManager;
import com.beauty.biz.entity.Userinfo;
import com.beauty.biz.entity.dictionary.Dictionaryinfo;
import com.beauty.biz.entity.entpriseinfo.EntpriseInfo;
import com.beauty.biz.service.DictionaryManager;
import com.beauty.biz.service.UserInfoManager;
import com.beauty.common.Money;
import com.beauty.common.SendContent;
import com.beauty.common.page.QueryResult;
import com.beauty.common.utils.EasyStr;
import com.beauty.common.utils.SearchUtil;
import com.beauty.common.web.StrutsAction;

/**
 * 委托监测
 * 
 */
@Results( {
		@Result(name = "toSearchPage", location = "monitortask-search.jsp"),
		@Result(name = "toyiyuanSearchPage", location = "monitortask-yiyuansearch.jsp"),
		@Result(name = "toxiehuiSearchPage", location = "monitortask-xiehuisearch.jsp"),
		@Result(name = "toOpinionPage", location = "opinion-input.jsp"),
		@Result(name = "toRegisterPage", location = "taskregister-info.jsp"),
		@Result(name = "toEntpriseListPage", location = "entprise1-select.jsp"),
		@Result(name = "toEntpriseListPage2", location = "entprise2-select.jsp"),
		@Result(name = "toCustomListPage", location = "custom1-select.jsp"),
		@Result(name = "toEmployeeListPage", location = "employee1-select.jsp"),
		@Result(name = "toItemPage", location = "item-select1.jsp"),
		@Result(name = "waiweiList", location = "taskregister-list-waiwei.jsp"),
		@Result(name = "waiweiInput", location = "taskregister-input-waiwei.jsp"),
		@Result(name = "waiweiView", location = "taskregister-view-waiwei.jsp"),
		@Result(name = "waiweiInfo", location = "taskregister-info-waiwei.jsp"),
		@Result(name = "yiyuanList", location = "taskregister-list-yiyuan.jsp"),		
		@Result(name = "yiyuanInput", location = "taskregister-input-yiyuan.jsp"),
		@Result(name = "yiyuanView", location = "taskregister-view-yiyuan.jsp"),
		@Result(name = "xiehuiList", location = "taskregister-list-xiehui.jsp"),
//		@Result(name = "waiweiInfo", location = "taskregister-info-waiwei.jsp"),		
		@Result(name = "subcontract", location = "subcontract.jsp"),
		@Result(name="toSubPageView",location="subcontract-view.jsp"),
		@Result(name="toSubbackageList",location="subcontract-list.jsp"),
		@Result(name="toItemPage3",location="item-select3.jsp"),
		@Result(name="toprojectplanPage",location="project_plan_report.jsp"),
		@Result(name = "opinionNew", location = "../appraiseopinion/opinion-input-new.jsp") ,
})
public class TaskregisterAction extends StrutsAction<Projects> {
	private static final long serialVersionUID = -3773642206601005701L;
	private String page;// 当前页数
	private String rows; // 每页显示记录
	private String json;// 页面传递json字符串,也可向客户端回写消息用
	private Projects project;
	private Subcontract subcontract;//分包详情

	private String projectcode;// 任务编号
	private String registby;// 登记人
	private String monitortype;// 任务类型
	private String wtentprise;// 委托单位
	private Date registdate1;// 登记日期1
	private Date registdate2;// 登记日期2
	private String monitornature;// 任务性质
	private String projectrealcode;
	private String projectname;
	private String completedate;
	private String itemid;
	private String itemname;

	private List<Dictionaryinfo> monitorNatureList;// 任务性质
	private List<Dictionaryinfo> projectSourceList;// 任务来源
	private List<Dictionaryinfo> projectElementList;// 任务要素
	private String opinion; // 反馈信息
	private String info; // action信息
	private String status;
	private String months ;//批量设置月份

	// 注入的Service层
	@Autowired
	private ProjectsManager projectsManager;
	@Autowired
	private UserInfoManager userInfoManager; // 用户
	@Autowired
	private ProjectDetailManager pdManager;
	@Autowired
	private DictionaryManager dictionaryManager;
	@Autowired
	private EntpriseInfoManager entpriseInfoManager;
	
	public String waiweiList(){
		return "waiweiList";
	}
	
	public String yiyuanList(){
		return "yiyuanList";
	}	
	
	public String xiehuiList(){
		return "xiehuiList";
	}	
	
	public String waiweiInput() throws Exception{
		doInputEntity();
		monitorNatureList = dictionaryManager.getDictionaryinfoByNarycode("WTXZ");
		return "waiweiInput";
	}
	public String yiyuanInput() throws Exception{
		doInputEntity();
		monitorNatureList = dictionaryManager.getDictionaryinfoByNarycode("BDXZ");
		return "yiyuanInput";
	}
	
	public String View() throws Exception{
		doViewEntity();
		return "View";
	}
	
	public String waiweiView() throws Exception{
		doViewEntity();
		monitorNatureList = dictionaryManager.getDictionaryinfoByNarycode("WTXZ");
		return "waiweiView";
	}
	public String yiyuanView() throws Exception{
		doViewEntity();
		return "yiyuanView";
	}

	public String waiweiInfo(){
		EntpriseInfo ei = entpriseInfoManager.getEntpriseinfo(getSessionUser().getEntid());
		if(ei!=null)
		{
			project = new Projects();
			project.setProjectname(ei.getEntname());
		}
		return "waiweiInfo";
	}
	public String biduiInfo(){
		return "biduiInfo";
	}
	public String wuranyuanInfo(){
//		if(monitortype!=null && !monitortype.equals(""))
//		{
//			monitorTypeList = projectsManager.getMonitortypeById(monitortype);
//		}else
//		{
//			monitorTypeList = projectsManager.getAllMonitortype();
//		}
//		monitorNatureList = dictionaryManager.getDictionaryinfoByNarycode("JCDM");
//		List<SampleSource> sampleSourceList = projectsManager
//				.getAllSampleSource();
//		String entid = getRequest().getParameter("entid");
//		EntpriseInfo jcEntprise = projectsManager.getEntpriseinfo(entid);
//		getRequest().setAttribute("jcEntprise", jcEntprise);
//		getRequest().setAttribute("sampleSourceList", sampleSourceList);
		return "wuranyuanInfo";
	}
	public String huanjingInfo(){
		return "huanjingInfo";
	}
	public String linshiInfo(){
		return "linshiInfo";
	}
	public void getPollutionSourceType() throws IOException {
		String monitortypeid = getRequest().getParameter("monitortypeid");
		String jsonStr ="";
		if(monitortypeid.equals("1")||monitortypeid.equals("2")){
			jsonStr = projectsManager.getPollutionSourceType(monitortypeid);
		}else{
			jsonStr = projectsManager.getPollutionSourceType();
		}
		
		sendMsg(jsonStr);
	}

	public void getCityOrRegion() throws IOException {
		String parentRegionCode = getRequest().getSession().getServletContext()
				.getInitParameter("parentRegionCode");
		String jsonStr = projectsManager.getJsonCityOrRegion(parentRegionCode);
		sendMsg(jsonStr);
	}

	/**
	 * 进入基本信息登记页面
	 */
	public String toRegisterPage() throws Exception {
//		monitorTypeList = projectsManager.getAllMonitortype();
//		List<SampleSource> sampleSourceList = projectsManager
//				.getAllSampleSource();
//		String entid = getRequest().getParameter("entid");
//		EntpriseInfo jcEntprise = projectsManager.getEntpriseinfo(entid);
//		getRequest().setAttribute("jcEntprise", jcEntprise);
		return "toRegisterPage";
	}

	/**
	 * 进入企业单选页面
	 * */
	public String toEntpriseListPage() {
		return "toEntpriseListPage";
	}
	
	/**
	 * 进入客户单选页面
	 * */
	public String toCustomListPage() {
		return "toCustomListPage";
	}	

	/**
	 * 进入代理人单选页面
	 * */
	public String toEmployeeListPage() {
		return "toEmployeeListPage";
	}		
	
	/**
	 * 进入企业单选页面
	 * */
	public String toSingleSelectPage() {
		return "toSingleSelectPage";
	}
	
	/**
	 * 进入企业多选页面
	 * */
	public String toEntpriseListPage2() {
		getRequest().setAttribute("monitortypeid", getRequest().getParameter("monitortypeid"));
		return "toEntpriseListPage2";
	}
	/**
	 * 进入查询页面
	 */
	public String toSearchPage() throws Exception {
//		if(monitortype!=null &&!monitortype.equals(""))
//		{
//			monitorTypeList = projectsManager.getMonitortypeById(monitortype);
//		}else
//		{
//			monitorTypeList = projectsManager.getAllMonitortype();
//		}
		return "toSearchPage";
	}
	
	/**
	 * 进入医院查询页面
	 */
	public String toyiyuanSearchPage() throws Exception {
//		if(monitortype!=null &&!monitortype.equals(""))
//		{
//			monitorTypeList = projectsManager.getMonitortypeById(monitortype);
//		}else
//		{
//			monitorTypeList = projectsManager.getAllMonitortype();
//		}
		return "toyiyuanSearchPage";
	}	
	
	/**
	 * 进入协会查询页面
	 */
	public String toxiehuiSearchPage() throws Exception {
//		if(monitortype!=null &&!monitortype.equals(""))
//		{
//			monitorTypeList = projectsManager.getMonitortypeById(monitortype);
//		}else
//		{
//			monitorTypeList = projectsManager.getAllMonitortype();
//		}
		return "toxiehuiSearchPage";
	}	

	/**
	 * 转向意见页面
	 */
	public String toOpinionPage() {
		return "toOpinionPage";
	}
	public void getSubInfo() throws IOException{
		try{
			Projects project = projectsManager.getProjectByProjectcode(projectcode);
//			String subinfo = project.getIssubpackage();
			String subinfo = "";
			sendMsg(subinfo);
		}catch(IOException e){
			e.printStackTrace();
			sendMsg("");
		}
	}
	/**
	 * 转向项目页面
	 * 
	 * @return
	 */
	public String toItemPage() {
		return "toItemPage";
	}
	/**
	 * 转向分包页面
	 */
	public String toSubbackageList(){
		return "toSubbackageList";
	}
	public void getMonitorTypeMonitornature() {
		String monitortypeid = getRequest().getParameter("monitortypeid");
		try {
			getResponse().setContentType("text/html");
//			getResponse().getWriter().write(
//					projectsManager.getMonitornature(monitortypeid));
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public void taskList() throws Exception {
		int intPage = Integer.parseInt((page == null || page == "0") ? "1"
				: page);
		int maxIndex = Integer.parseInt((rows == null || rows == "0") ? "20"
				: rows);
		int startIndex = (intPage - 1) * maxIndex;

//		String whereSB = "1=1 ";
		StringBuilder whereSB = new StringBuilder();
//		whereSB.append("1=1 ");
//		whereSB.append(" and  wtEntprise.entid = "+getSessionUser().getEntid());
		List<Object> params = new ArrayList<Object>();
		LinkedHashMap<String, String> orderby = new LinkedHashMap<String, String>();
//		orderby.put("registdate", "desc");
		orderby.put("projectcode", "desc");

		SearchUtil.getStringSearch(whereSB, params, "agentperson.employeeinfoname",
				"like", registby);
		SearchUtil.getStringSearch(whereSB, params, "projectcode",
				"like", projectcode);
		SearchUtil.getStringSearch(whereSB, params, "projectname",
				"like", projectname);
		SearchUtil.getStringSearch(whereSB, params, "monitorentid.entname",
				"like", wtentprise);		
		SearchUtil.getDateBetweenSearch(whereSB, params, "registdate",
				registdate1, registdate2);
		SearchUtil.getStringSearch(whereSB, params, "wtEntprise.entid",
				"=", getSessionUser().getEntid());

		
		QueryResult<Projects> q = projectsManager.getQueryResult(startIndex,
				maxIndex, whereSB.toString(), params.toArray(), orderby);

		long total = q.getTotalrecord();
		List<Map<String, Object>> rowData = new ArrayList<Map<String, Object>>();
		List<Projects> entpriseInfoList = q.getResultlist();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		for (Projects p : entpriseInfoList) {
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("projectcode", p.getProjectcode() != null ? p
					.getProjectcode() : ""); // 任务编号
			map.put("projectrealcode", p.getProjectrealcode() != null ? p
					.getProjectrealcode() : ""); // 签发时产生任务正式编号
			map.put("projectname", p.getProjectname() != null ? p
					.getProjectname() : ""); // 任务名称
//			map.put("wtentprise", p.getWtEntprise() != null ? p.getWtEntprise()
//					.getEntname() : ""); // 委托单位
			map.put("stepcode", p.getStatus() != null ? p
					.getStatus() : ""); // 任务状态			
			map.put("stepname", EasyStr.getStatusName(p.getStatus())); // 任务状态名称
			map.put("registdate", p.getRegistdate() != null ? EasyStr
					.getDateYMDHM(p.getRegistdate()) : ""); // 登记日期
			map.put("registby", p.getAgentperson()!= null ? p.getAgentperson().getEmployeeinfoname() : ""); // 登记人
//			map.put("completedate", p.getCompletedate() != null ? sdf.format(p
//					.getCompletedate()) : "");// 要求完成日期
//			map.put("issubpackage", p.getIssubpackage()!=null?p.getIssubpackage():"");
			rowData.add(map);
		}

		Map<String, Object> map = new HashMap<String, Object>();
		map.put("total", total);
		map.put("rows", rowData);

		String resultJson = JSONObject.fromObject(map).toString();

		getResponse().getWriter().write(resultJson);
	}
	
	public void yiyuantaskList() throws Exception {
		int intPage = Integer.parseInt((page == null || page == "0") ? "1"
				: page);
		int maxIndex = Integer.parseInt((rows == null || rows == "0") ? "20"
				: rows);
		int startIndex = (intPage - 1) * maxIndex;

//		String whereSB = "1=1 ";
		StringBuilder whereSB = new StringBuilder();
//		whereSB.append("1=1 ");
		List<Object> params = new ArrayList<Object>();
		LinkedHashMap<String, String> orderby = new LinkedHashMap<String, String>();
//		orderby.put("registdate", "desc");
		orderby.put("projectcode", "desc");

//		SearchUtil.getStringSearchByLower(whereSB, params, "userinfo.realname",
//				"like", registby);
//		SearchUtil.getStringSearchByLower(whereSB, params, "projectrealcode",
//				"like", projectrealcode);
//		if(projectname!=null && !"".equals(""))
//		{
//			whereSB+=" and projectname like ?";
//			params.add("%" + projectname + "%");
//		}
//		SearchUtil.getStringSearchByLower(whereSB, params,
//				"monitortype.monitortypeid", "=", monitortype);
//		SearchUtil.getStringSearchByLower(whereSB, params,
//				"wtEntprise.entname", "like", wtentprise);
//		SearchUtil.getDateBetweenSearch(whereSB, params, "registdate",
//				registdate1, registdate2);
//		whereSB.append(" and parentprojectcode is null");
//		SearchUtil.getStringSearchByLower(whereSB, params,
//				"parentprojectcode", "is ", "null");
		SearchUtil.getStringSearch(whereSB, params, "chargedoctor.employeeinfoname",
				"like", registby);
		SearchUtil.getStringSearch(whereSB, params, "projectcode",
				"like", projectcode);
		SearchUtil.getStringSearch(whereSB, params, "projectname",
				"like", projectname);
		SearchUtil.getStringSearch(whereSB, params, "wtEntprise.entname",
				"like", wtentprise);		
		SearchUtil.getDateBetweenSearch(whereSB, params, "registdate",
				registdate1, registdate2);		
		SearchUtil.getStringSearch(whereSB, params, "monitorentid.entid",
				"=", getSessionUser().getEntid());
		
		whereSB.append(" and status is not null and status!='Register'");
		QueryResult<Projects> q = projectsManager.getQueryResult(startIndex,
				maxIndex, whereSB.toString(), params.toArray(), orderby);

		long total = q.getTotalrecord();
		List<Map<String, Object>> rowData = new ArrayList<Map<String, Object>>();
		List<Projects> entpriseInfoList = q.getResultlist();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		for (Projects p : entpriseInfoList) {
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("projectcode", p.getProjectcode() != null ? p
					.getProjectcode() : ""); // 任务编号
			map.put("projectrealcode", p.getProjectrealcode() != null ? p
					.getProjectrealcode() : ""); // 签发时产生任务正式编号
			map.put("projectname", p.getProjectname() != null ? p
					.getProjectname() : ""); // 任务名称
			map.put("wtentprise", p.getWtEntprise() != null ? p.getWtEntprise()
					.getEntname() : ""); // 委托单位
			map.put("customid", p.getCustomid() != null ? p
					.getCustomid().getCustomid() : ""); // 任务名称			
			map.put("stepcode", p.getStatus() != null ? p
					.getStatus() : ""); // 任务状态			
			map.put("stepname", EasyStr.getStatusName(p.getStatus())); // 任务状态名称
			map.put("registdate", p.getRegistdate() != null ? EasyStr
					.getDateYMDHM(p.getRegistdate()) : ""); // 登记日期
//			map.put("registby", p.getUserinfo() != null ? p.getUserinfo()
//					.getRealname() : ""); // 登记人
//			map.put("completedate", p.getCompletedate() != null ? sdf.format(p
//					.getCompletedate()) : "");// 要求完成日期
//			map.put("issubpackage", p.getIssubpackage()!=null?p.getIssubpackage():"");
			rowData.add(map);
		}

		Map<String, Object> map = new HashMap<String, Object>();
		map.put("total", total);
		map.put("rows", rowData);

		String resultJson = JSONObject.fromObject(map).toString();

		getResponse().getWriter().write(resultJson);
	}	
	
	
	public void xiehuitaskList() throws Exception {
		int intPage = Integer.parseInt((page == null || page == "0") ? "1"
				: page);
		int maxIndex = Integer.parseInt((rows == null || rows == "0") ? "20"
				: rows);
		int startIndex = (intPage - 1) * maxIndex;

		StringBuilder whereSB = new StringBuilder();
//		whereSB.append("1=1 ");
		List<Object> params = new ArrayList<Object>();
		LinkedHashMap<String, String> orderby = new LinkedHashMap<String, String>();
		orderby.put("projectcode", "desc");

//		SearchUtil.getStringSearchByLower(whereSB, params, "chargedoctor.employeeinfoname",
//				"like", registby);
//		SearchUtil.getStringSearchByLower(whereSB, params, "projectcode",
//				"like", projectcode);
//		SearchUtil.getStringSearchByLower(whereSB, params, "projectname",
//				"like", projectname);
		SearchUtil.getStringSearch(whereSB, params, "monitorentid.entname",
				"like", wtentprise);		
		SearchUtil.getDateBetweenSearch(whereSB, params, "registdate",
				registdate1, registdate2);		
		SearchUtil.getStringSearch(whereSB, params, "status",
				"=", "deal");
//		whereSB.append("  and status='deal'");
		QueryResult<Projects> q = projectsManager.getQueryResult(startIndex,
				maxIndex, whereSB.toString(), params.toArray(), orderby);

		long total = q.getTotalrecord();
		List<Map<String, Object>> rowData = new ArrayList<Map<String, Object>>();
		List<Projects> entpriseInfoList = q.getResultlist();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		for (Projects p : entpriseInfoList) {
			List<Projectitem> projectitems = projectsManager.getItemsByProject(p.getProjectcode());
			for(Projectitem pi:projectitems)
			{
				Map<String, Object> map = new HashMap<String, Object>();
				map.put("monitorentid", p.getMonitorentid() != null ? p
						.getMonitorentid().getEntid() : ""); // 任务编号
				map.put("monitorentname", p.getMonitorentid() != null ? p
						.getMonitorentid().getEntname() : ""); // 任务编号				
				map.put("projectcode", p.getProjectcode() != null ? p
						.getProjectcode() : ""); // 任务编号
				map.put("projectrealcode", p.getProjectrealcode() != null ? p
						.getProjectrealcode() : ""); // 签发时产生任务正式编号
				map.put("projectname", p.getProjectname() != null ? p
						.getProjectname() : ""); // 任务名称
				map.put("wtentprise", p.getWtEntprise() != null ? p.getWtEntprise()
						.getEntname() : ""); // 委托单位
				map.put("monitorentname", p.getMonitorentid() != null ? p.getMonitorentid()
						.getEntname() : ""); // 手术单位
				map.put("customid", p.getCustomid() != null ? p.getCustomid().getCustomid(): ""); // 顾客序号
				map.put("customname", p.getCustomid() != null ? p.getCustomid().getCustomname(): ""); // 顾客姓名
				map.put("mobilephone", p.getCustomid() != null ? p.getCustomid().getMobilephone(): ""); // 顾客电话
				map.put("sex", p.getCustomid() != null ? p.getCustomid().getSex(): ""); // 顾客性别
				map.put("age", p.getCustomid() != null ? getAge(p.getCustomid().getBirthday()): "");//顾客年龄
				map.put("dealdate", p.getDealdate() != null ? EasyStr
						.getDateYMD(p.getDealdate()) : "");//成交日期
				map.put("projectitemid", pi.getProjectitemid()); // 任务项目编号				
				map.put("itemid", pi.getItem() != null ? pi.getItem().getItemid(): ""); // 项目编号
				map.put("itemname", pi.getItem() != null ? pi.getItem().getItemname(): ""); // 项目名称
				map.put("standfee", pi.getItemfee()!= null ? pi.getItemfee(): ""); // 项目费用
				
				map.put("stepcode", p.getStatus() != null ? p
						.getStatus() : ""); // 任务状态			
				map.put("stepname", EasyStr.getStatusName(p.getStatus())); // 任务状态名称
				rowData.add(map);
			}
		}

		Map<String, Object> map = new HashMap<String, Object>();
		map.put("total", total);
		map.put("rows", rowData);

		String resultJson = JSONObject.fromObject(map).toString();

		getResponse().getWriter().write(resultJson);
	}		
	
	/** 计算年龄 */ 
	public  String getAge(Date birthDay) throws Exception { 
	        Calendar cal = Calendar.getInstance(); 

	        if (cal.before(birthDay)) { 
	            throw new IllegalArgumentException( 
	                "The birthDay is before Now.It's unbelievable!"); 
	        } 

	        int yearNow = cal.get(Calendar.YEAR); 
	        int monthNow = cal.get(Calendar.MONTH)+1; 
	        int dayOfMonthNow = cal.get(Calendar.DAY_OF_MONTH); 
	        
	        cal.setTime(birthDay); 
	        int yearBirth = cal.get(Calendar.YEAR); 
	        int monthBirth = cal.get(Calendar.MONTH); 
	        int dayOfMonthBirth = cal.get(Calendar.DAY_OF_MONTH); 

	        int age = yearNow - yearBirth; 

	        if (monthNow <= monthBirth) { 
	            if (monthNow == monthBirth) { 
	                //monthNow==monthBirth 
	                if (dayOfMonthNow < dayOfMonthBirth) { 
	                    age--; 
	                } 
	            } else { 
	                //monthNow>monthBirth 
	                age--; 
	            } 
	        } 

	        return age +""; 
	    }	

	public void add() throws IOException {
		try {
//			Userinfo userinfo = userInfoManager.get(getSessionUser()
//					.getUserid());
			String id = projectsManager.getSequence("SEQ_PROJECTS");
			project.setStatus("Register");
			project.setRegistdate(new Date());
			project.setRegistby(getSessionUser().getUserid());
			project.setWtEntprise(entpriseInfoManager.getEntpriseinfo(getSessionUser().getEntid()));
			project.setProjectcode(id);
//			project.setCompletedate(EasyStr.parseDateYMD(completedate));
						
			projectsManager.save(project);
			
			
//			if(project.getMonitorentid()!=null && !project.getMonitorentid().equals(""))
//			{
//				//生成任务监测企业数据及采样费用明细数据
//				pdManager.save(id, project.getMonitorentid());
//			}
			
//			projectsManager.addProjectItems(id, itemid);
			projectsManager.addLog(id, getSessionUser(), "添加");
			sendMsg("success");
		} catch (Exception e) {
			e.printStackTrace();
			sendMsg("fail");
		}
	}

	//跳转分包信息项目页面
	public String toItemPage3(){
		return "toItemPage3";
	}
	
	public String toSubPage(){
		if(id!=null && !"".equals(id)){
//			subcontract = subcontractManager.getById(id);
		}
		getRequest().setAttribute("projectcode", projectcode);
		return "subcontract";
	}
	
	public String toSubPageView(){
		return "toSubPageView";
	}
	public void update() throws IOException {
		try {
			Projects obj = projectsManager
					.getProjects(project.getProjectcode());
			obj.setProjectname(project.getProjectname());
			obj.setRemark(project.getRemark());
			obj.setMonitorentid(project.getMonitorentid());
			obj.setPaymenttype(project.getPaymenttype());
			obj.setAgentperson(project.getAgentperson());
			obj.setIntentioniteminfo(project.getIntentioniteminfo());
			projectsManager.save(obj);
//			pdManager.update(obj.getProjectcode(), project.getMonitorentid());
//			projectsManager.addProjectItems(obj.getProjectcode(), itemid);
			sendMsg("success");
		} catch (Exception e) {
			e.printStackTrace();
			sendMsg("fail");
		}
	}
	
	public void updateyiyuan() throws IOException {
		try {
			Projects obj = projectsManager
					.getProjects(project.getProjectcode());
//			obj.setProjectname(project.getProjectname());
//			obj.setRemark(project.getRemark());
//			obj.setMonitorentid(project.getMonitorentid());
//			obj.setPaymenttype(project.getPaymenttype());
//			obj.setAgentperson(project.getAgentperson());
//			obj.setIntentioniteminfo(project.getIntentioniteminfo());
//			pdManager.update(obj.getProjectcode(), project.getMonitorentid());
			obj.setChargedoctor(project.getChargedoctor());
			obj.setCounselor(project.getCounselor());
			projectsManager.addProjectItems(obj, itemid);
			projectsManager.save(obj);
			sendMsg("success");
		} catch (Exception e) {
			e.printStackTrace();
			sendMsg("fail");
		}
	}	

	@Override
	public String copy() throws IOException {
		try {
			Userinfo userinfo = userInfoManager.get(getSessionUser()
					.getUserid());
//			projectsManager.copyProject(projectcode, userinfo);
			sendMsg("success");
		} catch (Exception e) {
			e.printStackTrace();
			sendMsg("fail");
		}
		return null;
	}

	@Override
	protected void doInputEntity() throws Exception {
//		if(monitortype!=null && !monitortype.equals(""))
//		{
//			monitorTypeList = projectsManager.getMonitortypeById(monitortype);
//		}else
//		{
//			monitorTypeList = projectsManager.getAllMonitortype();
//		}
//		sampleSourceList = projectsManager.getAllSampleSource();
//
		if (project == null || "".equals(project)) {
			project = projectsManager.getProjectByProjectcode(id);
		}
//		if(subcontract==null || "".equals(subcontract)){
//			subcontract = subcontractManager.getById(id);
//		}
//		json = workflowManager.getStep(project.getStatus(),
//				project.getWorkflowcode()).getStepname();
		Map<String, Object> map = projectsManager.getProjectItems(project
				.getProjectcode());
		itemid = (String) map.get("itemid");
		itemname = (String) map.get("itemname");
	}

	@Override
	protected void doViewEntity() throws Exception {
		if (project == null || "".equals(project)) {
			project = projectsManager.getProjectByProjectcode(id);
		}
//		json = workflowManager.getStep(project.getStatus(),
//				project.getWorkflowcode()).getStepname();
		Map<String, Object> map = projectsManager.getProjectItems(project
				.getProjectcode());
		itemid = (String) map.get("itemid");
		itemname = (String) map.get("itemname");
	}

	public void remove() throws IOException {
		try {
			projectsManager.deletePorject(projectcode);
			projectsManager.addLog(projectcode, getSessionUser(), "删除");
			sendMsg("success");
		} catch (Exception e) {
			e.printStackTrace();
			sendMsg("fail");
		}
	}
	
	public void matchingsamplesource() throws IOException{
		try{
			Projects projects = projectsManager.getProjects(projectcode);
//			String samplesourceid = projects.getSamplesource().getSamplesourceid();
//			if(samplesourceid==null&&samplesourceid==""){
//				sendMsg("数据异常，请检查样品来源类型");
//			}else{
//				sendMsg(samplesourceid);
//			}
		}catch(Exception e){
			e.printStackTrace();
			sendMsg("fail");
		}
	}

	public void operateyiyuan() throws IOException {
		String taskid = getRequest().getParameter("taskid");
		String opinion = getRequest().getParameter("opinion");
//		 JSONObject jsonObj = JSONObject.fromObject(this.json);
		
		JSONArray arr = JSONArray.fromObject(this.json);

		if (arr != null && !"".equals(arr)) {
			for (int i = 0; i < arr.size(); i++) {
				JSONObject obj = JSONObject.fromObject(arr.get(i));
				String pcode = obj.getString("projectcode");
				String scode = obj.getString("stepcode");
				project = projectsManager.getProjectByProjectcode(pcode);
				List<Projectitem> projectitems = projectsManager.getItemsByProject(pcode);
				if(project.getChargedoctor()==null)
				{
					sendMsg("doctor");
				}
				if(projectitems.size()==0)
				{
					sendMsg("item");
				}
				project.setStatus(taskid);
				project.setDealdate(new Date());
				project.setIsreturn(opinion);
				projectsManager.save(project);
				sendMsg("success");
			}
		}
		
	}
	
	public void operate() throws IOException {
		String taskid = getRequest().getParameter("taskid");
		String userid = getRequest().getParameter("userid");
//		 JSONObject jsonObj = JSONObject.fromObject(this.json);
		
		JSONArray arr = JSONArray.fromObject(this.json);

		if (arr != null && !"".equals(arr)) {
			for (int i = 0; i < arr.size(); i++) {
				JSONObject obj = JSONObject.fromObject(arr.get(i));
				String pcode = obj.getString("projectcode");
				String scode = obj.getString("stepcode");
				project = projectsManager.getProjectByProjectcode(pcode);
				if(project.getAgentperson()==null)
				{
					sendMsg("agent");
				}else if(project.getMonitorentid()==null)
				{
					sendMsg("monitor");
				}else if(project.getCustomid()==null)
				{
					sendMsg("custom");
				}else
				{
					project.setStatus("TaskApprove");
					projectsManager.save(project);
					sendMsg("success");
				}
			}
		}
		
	}	

	/**
	 * 跳转到任务计划单
	 * @return
	 */
	public String toprojectplanPage(){
		return "toprojectplanPage";
	}
	
	/**
	 * 任务计划单监测类型单选按钮
	 */
	public void initMonitortypeList() throws IOException {
//		List<Map<String, Object>> list = projectsManager
//				.getMonitortype(this.projectcode);
		String json = JSONArray.fromObject(list).toString();
		getResponse().getWriter().write(json);
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

	public String getRegistby() {
		return registby;
	}

	public void setRegistby(String registby) {
		this.registby = registby;
	}

	public String getMonitortype() {
		return monitortype;
	}

	public void setMonitortype(String monitortype) {
		this.monitortype = monitortype;
	}

	public String getWtentprise() {
		return wtentprise;
	}

	public void setWtentprise(String wtentprise) {
		this.wtentprise = wtentprise;
	}

	public Date getRegistdate1() {
		return registdate1;
	}

	public void setRegistdate1(Date registdate1) {
		this.registdate1 = registdate1;
	}

	public Date getRegistdate2() {
		return registdate2;
	}

	public void setRegistdate2(Date registdate2) {
		this.registdate2 = registdate2;
	}

	public String getProjectcode() {
		return projectcode;
	}

	public void setProjectcode(String projectcode) {
		this.projectcode = projectcode;
	}

	public String getMonitornature() {
		return monitornature;
	}

	public void setMonitornature(String monitornature) {
		this.monitornature = monitornature;
	}


	public List<Dictionaryinfo> getMonitorNatureList() {
		return monitorNatureList;
	}
	public void setMonitorNatureList(List<Dictionaryinfo> monitorNatureList) {
		this.monitorNatureList = monitorNatureList;
	}
	public List<Dictionaryinfo> getProjectSourceList() {
		return projectSourceList;
	}
	public void setProjectSourceList(List<Dictionaryinfo> projectSourceList) {
		this.projectSourceList = projectSourceList;
	}
	public List<Dictionaryinfo> getProjectElementList() {
		return projectElementList;
	}
	public void setProjectElementList(List<Dictionaryinfo> projectElementList) {
		this.projectElementList = projectElementList;
	}
	public String getProjectrealcode() {
		return projectrealcode;
	}

	public void setProjectrealcode(String projectrealcode) {
		this.projectrealcode = projectrealcode;
	}

	public String getProjectname() {
		return projectname;
	}

	public void setProjectname(String projectname) {
		this.projectname = projectname;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}


	public Projects getProject() {
		return project;
	}

	public void setProject(Projects project) {
		this.project = project;
	}

	public String getCompletedate() {
		return completedate;
	}

	public void setCompletedate(String completedate) {
		this.completedate = completedate;
	}

	public String getItemid() {
		return itemid;
	}

	public void setItemid(String itemid) {
		this.itemid = itemid;
	}

	public String getItemname() {
		return itemname;
	}

	public void setItemname(String itemname) {
		this.itemname = itemname;
	}

	public String getMonths() {
		return months;
	}

	public void setMonths(String months) {
		this.months = months;
	}
	public Subcontract getSubcontract() {
		return subcontract;
	}
	public void setSubcontract(Subcontract subcontract) {
		this.subcontract = subcontract;
	}

}
