package com.beauty.biz.web.projects.taskapprove;


import java.util.ArrayList;
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

import com.beauty.biz.entity.MonitorType;
import com.beauty.biz.entity.Userinfo;
import com.beauty.biz.entity.projects.Projects;
import com.beauty.biz.entity.workflow.WorkflowActionRecord;
import com.beauty.biz.entity.workflow.WorkflowStep;
import com.beauty.biz.entity.workflow.WorkflowStepAction;
import com.beauty.biz.entity.workflow.WorkflowStepId;
import com.beauty.biz.service.UserInfoManager;
import com.beauty.biz.service.WorkflowManager;
import com.beauty.biz.service.projects.ProjectsManager;
import com.beauty.biz.service.workflow.WorkflowManage;
import com.beauty.common.Money;
import com.beauty.common.SendContent;
import com.beauty.common.page.QueryResult;
import com.beauty.common.utils.EasyStr;
import com.beauty.common.utils.SearchUtil;
import com.beauty.common.web.StrutsAction;

/**
 * 任务签发
 * 
 */
@Results( {
// @Result(name=TaskapproveAction.TOTASKAPPROVE,location="taskapprove.jsp"),
@Result(name = TaskapproveAction.TOSEARCHPAGE, location = "taskapprove-search.jsp"),
@Result(name = "opinionNew", location = "../appraiseopinion/opinion-input-new.jsp") ,
})
public class TaskapproveAction extends StrutsAction<Projects> {
	private static final long serialVersionUID = -4505531549223555103L;
	private static final String TOSEARCHPAGE = "toSearchPage"; // 进入查询页面的字符串
	private String page;// 当前页数
	private String rows; // 每页显示记录
	private String json;// 页面传递json字符串,也可向客户端回写消息用
	private String projectcode;// 任务编号
	private String registby;// 登记人
	private String monitortype;// 任务类型
	private String wtentprise;// 监测单位
	private Date registdate1;// 登记日期1
	private Date registdate2;// 登记日期2
	private String monitornature;// 任务性质
	private String projectrealcode;
	private String projectname;
	private String opinion; // 反馈信息
	private String info; // action信息
	private List<MonitorType> monitorTypeList;// 所有监测业务类型

	// 注入的Service层
	@Autowired
	private ProjectsManager projectsManager; // 监测项目
	@Autowired
	private WorkflowManager wfManager;
	@Autowired
	private WorkflowManage workflowManage;
	@Autowired
	private UserInfoManager userinfoManager;

	/**
	 * 进入查询页面
	 */
	public String toSearchPage() throws Exception {
//		monitorTypeList = projectsManager.getAllMonitortype();
		return TaskapproveAction.TOSEARCHPAGE;
	}

	/**
	 * 转向意见页面
	 * 
	 * @return
	 */
	public String opinionDlg() {
		return "opinion";
	}

	/**
	 * ajax调用，返回监测类型的json串
	 * 
	 * @throws UnsupportedEncodingException
	 */
	// public void getAllMonitorTypeByParentTypesJson() throws
	// UnsupportedEncodingException{
	// String parenttypeName = getRequest().getParameter("parenttype");
	// String parenttypeuri= java.net.URLDecoder.decode(parenttypeName,"UTF-8");
	// try {
	// getResponse().setContentType("text/html");
	// getResponse().getWriter().write(monitorTypeManager.getAllMonitorTypeByParentTypesJson(parenttypeuri));
	// } catch (IOException e) {
	// e.printStackTrace();
	// }
	// }

	/**
	 * 查询列表 显示分页
	 */
	public void taskList() throws Exception {
		int intPage = Integer.parseInt((page == null || page == "0") ? "1"
				: page);
		int maxIndex = Integer.parseInt((rows == null || rows == "0") ? "20"
				: rows);
		int startIndex = (intPage - 1) * maxIndex;

		StringBuilder whereSB = new StringBuilder();
		List<Object> params = new ArrayList<Object>();
		LinkedHashMap<String, String> orderby = new LinkedHashMap<String, String>();
		orderby.put("registdate", "desc");
		orderby.put("projectcode", "desc");
		
		SearchUtil.getInSearch(whereSB, params, "nextAuditPerson", "=", getSessionUser().getUserid());
		SearchUtil.getInSearch2(whereSB, params, "status", "in",
			"'TaskApprove','TaskApprove1','TaskApprove2'");
		SearchUtil.getStringSearchByLower(whereSB, params, "projectcode",
				"like", projectcode);
		SearchUtil.getStringSearchByLower(whereSB, params, "parentprojectcode",
				"like", projectcode);
		SearchUtil.getStringSearchByLower(whereSB, params, "userinfo.realname",
				"like", registby);
		SearchUtil.getStringSearchByLower(whereSB, params, "projectrealcode",
				"like", projectrealcode);
		SearchUtil.getStringSearchByLower(whereSB, params, "projectname",
				"like", projectname);
		SearchUtil.getStringSearchByLower(whereSB, params,
				"monitortype.monitortypeid", "=", monitortype);
		SearchUtil.getStringSearchByLower(whereSB, params,
				"wtEntprise.entname", "like", wtentprise);
		SearchUtil.getDateBetweenSearch(whereSB, params, "registdate",
				registdate1, registdate2);
		
		QueryResult<Projects> q = projectsManager.getQueryResult(startIndex,
				maxIndex, whereSB.toString(), params.toArray(), orderby);

		long total = q.getTotalrecord();
		List<Map<String, Object>> rowData = new ArrayList<Map<String, Object>>();
		List<Projects> entpriseInfoList = q.getResultlist();
		for (Projects p : entpriseInfoList) {
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("projectcode", p.getProjectcode() != null ? p
					.getProjectcode() : "");
			map.put("projectrealcode", p.getProjectrealcode() != null ? p
					.getProjectrealcode() : "");
			map.put("projectname", p.getProjectname() != null ? p
					.getProjectname() : "");
			map.put("stepcode", p.getStatus() != null ? p.getStatus() : "");
			map.put("registdate", p.getRegistdate() != null ? EasyStr
					.getDateYMDHM(p.getRegistdate()) : "");
			map.put("detectionfee", p.getDetectionfee()==null?"":p.getDetectionfee());
			rowData.add(map);
		}

		Map<String, Object> map = new HashMap<String, Object>();
		map.put("total", total);
		map.put("rows", rowData);

		String resultJson = JSONObject.fromObject(map).toString();

		getResponse().getWriter().write(resultJson);
	}

	public void getUserList(){
		List<Userinfo> userlist = userinfoManager.getList();
		getRequest().setAttribute("userlist", userlist);
	}
	public void operate() {
		try {
			JSONObject jsonObj = JSONObject.fromObject(this.json);
			String taskid = getRequest().getParameter("taskid");
			String userid = getRequest().getParameter("userid");
			JSONArray arr = jsonObj.getJSONArray("data");
			if (arr != null && !"".equals(arr)) {
				for (int i = 0; i < arr.size(); i++) {
					JSONObject obj = JSONObject.fromObject(arr.get(i));
					String pcode = obj.getString("projectcode");
					String scode = obj.getString("stepcode");
					String nextStep = "";
					WorkflowStepAction wsa = null;
					Projects project = projectsManager.getProjects(pcode);
//					StringBuffer message   = new StringBuffer("");
					String messageuser = "";//该记录的当事人
					//退回操作
					if(this.info.equals("退回"))
					{
						wsa = wfManager.getNextStepCode(
								scode, StrutsAction.MONITORWORKFLOW, this.info);
						//退回时，要从审核记录表中去找到最新的提交至该状态的记录的前状态
						WorkflowActionRecord workflowActionRecord =wfManager.getBackWorkflowRecord(project.getProjectcode(), wsa.getId().getStepcode(),"project");
						if(workflowActionRecord!=null)
						{
							nextStep = workflowActionRecord.getStepcode();
							messageuser = workflowActionRecord.getAudituserid();
							// 发布审核记录
							projectsManager.updateBackStatus(pcode, nextStep, getSessionUser(), opinion, userid);
							wfManager.releaseOpinionNew(pcode, wsa,nextStep, opinion, getSessionUser());
							
						}
					}else//提交操作
					{
						wsa = wfManager.getNextStepCode(
								scode, StrutsAction.MONITORWORKFLOW, this.info);
						if(taskid == null || "0".equals(taskid)){//既定流程
							nextStep = wsa.getNextstepcode();
						}else{//手选流程
							nextStep = taskid;
						}
						// 发布审核记录
						wfManager.releaseOpinionNew(pcode, wsa,nextStep, opinion, getSessionUser());
						projectsManager.updateStatusNew(pcode, nextStep,
								getSessionUser(), this.opinion,userid);
						//如果跳转到签发状态，具体到个人;如果跳转到采样安排，不到具体个人；如果到样品接收，不到具体个人；
						if(nextStep.startsWith("TaskApprove"))
						{
							messageuser = userid;
						}
					}
					WorkflowStep step = wfManager.getStep(nextStep, "");
					if(step!=null)
					{
//						message.append("任务流水号：").append(pcode).append("将流转至").append(step.getStepname()).append(",请及时处理！");
//						messagegroupManager.sendMeg(nextStep, message.toString(),messageuser);
						String content = SendContent.getProjectContent(pcode, step.getStepname());
					}
				}
			}
			sendMsg("success");
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	
	public String initworkflow() throws Exception{
		String workflowcode =  getRequest().getParameter("workflowcode");
		String projectcode =  getRequest().getParameter("projectcode");
		Projects obj = projectsManager.getProjects(projectcode);
		String status = obj.getStatus();
		List<WorkflowStep> workflowSteps = new ArrayList<WorkflowStep>();
		//委托任务要根据任务的费用,以及当前的状态来筛选提交流程
		//
		if(1==1)
		{
			if(Double.valueOf(obj.getDetectionfee())>Money.lowMoney&&Double.valueOf(obj.getDetectionfee())<=Money.upMoney )
			{
				if( "TaskApprove".equals(status))
				{
					WorkflowStep workflowStep1 = new WorkflowStep();
					WorkflowStepId WorkflowStepId1 = new WorkflowStepId();
					WorkflowStepId1.setStepcode("TaskApprove1");
					workflowStep1.setId(WorkflowStepId1);
					workflowStep1.setStepname("任务签发审核");
					workflowSteps.add(workflowStep1);
				}
			}
			if(Double.valueOf(obj.getDetectionfee())>Money.upMoney){
				if("TaskApprove".equals(status))
				{
					WorkflowStep workflowStep1 = new WorkflowStep();
					WorkflowStepId WorkflowStepId1 = new WorkflowStepId();
					WorkflowStepId1.setStepcode("TaskApprove1");
					workflowStep1.setId(WorkflowStepId1);
					workflowStep1.setStepname("任务签发审核");
					workflowSteps.add(workflowStep1);
					
					WorkflowStep workflowStep2 = new WorkflowStep();
					WorkflowStepId WorkflowStepId2 = new WorkflowStepId();
					WorkflowStepId2.setStepcode("TaskApprove2");
					workflowStep2.setId(WorkflowStepId2);
					workflowStep2.setStepname("任务签发复核");
					workflowSteps.add(workflowStep2);
				}else if("TaskApprove1".equals(status))
				{
					WorkflowStep workflowStep1 = new WorkflowStep();
					WorkflowStepId WorkflowStepId1 = new WorkflowStepId();
					WorkflowStepId1.setStepcode("TaskApprove2");
					workflowStep1.setId(WorkflowStepId1);
					workflowStep1.setStepname("任务签发复核");
					workflowSteps.add(workflowStep1);
				}
			}
		}
//		List<Map<String,Object>> rowlist = new ArrayList<Map<String, Object>>();
//		for(WorkflowStep work:workflowSteps){
//			Map<String,Object> map = new HashMap<String,Object>();
//			map.put("code", work.getId().getStepcode());
//			map.put("value", work.getStepname()==null?"":work.getStepname());
//			rowlist.add(map);
//		}
//		String resultJson = JSONArray.fromObject(rowlist).toString();
//		getResponse().getWriter().write(resultJson);
		getRequest().setAttribute("userPwd", getSessionUser().getPassword());
		getRequest().setAttribute("deptid", getSessionUser().getDepartmentinfo().getDeptid());
		getRequest().setAttribute("workflowSteps", workflowSteps);
		return "opinionNew";
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

	public List<MonitorType> getMonitorTypeList() {
		return monitorTypeList;
	}

	public void setMonitorTypeList(List<MonitorType> monitorTypeList) {
		this.monitorTypeList = monitorTypeList;
	}

}
