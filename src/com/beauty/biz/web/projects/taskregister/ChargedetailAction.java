package com.beauty.biz.web.projects.taskregister;


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

import com.beauty.biz.entity.iteminfo.Iteminfo;
import com.beauty.biz.entity.projects.Projectdetail;
import com.beauty.biz.entity.projects.Projectitem;
import com.beauty.biz.entity.projects.Projects;
import com.beauty.biz.entity.projects.Projectsamplefee;
import com.beauty.biz.entity.projects.Projectsampleitem;
import com.beauty.biz.service.projects.ProjectDetailManager;
import com.beauty.biz.service.projects.ProjectitemManager;
import com.beauty.biz.service.projects.ProjectsManager;
import com.beauty.biz.service.projects.ProjectsamplefeeManager;
import com.beauty.common.page.QueryResult;
import com.beauty.common.web.StrutsAction;

/**
 * 费用明细
 * 
 */
@Results( {
@Result(name = "toEntpriseListPage", location = "entprise2-select.jsp"), })
public class ChargedetailAction extends StrutsAction<Projects> {
	private static final long serialVersionUID = -3773642206601005701L;
	private String page;// 当前页数
	private String rows; // 每页显示记录
	private String json;// 页面传递json字符串,也可向客户端回写消息用
	private String opinion; // 反馈信息
	private String info; // action信息
	private String status;

	private String projectcode;


	private String ent;
	private String projectsamplefeeid;
	private String projectitemid;
	private String newPrice;	
	private String newAmount;

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
	private ProjectsamplefeeManager manager;
	@Autowired
	private ProjectsManager projectsManager;
	@Autowired
	private ProjectitemManager projectitemManager;
	
	

	public void itemchargedetailList() throws Exception {//计算项目费用
		int intPage = Integer.parseInt((page == null || page == "0") ? "1" : page);
		int maxIndex = Integer.parseInt((rows == null || rows == "0") ? "20": rows);
		int startIndex = (intPage - 1) * maxIndex;
		long total = 0l;
			List<Projectitem> itemList = pdManager
					.createQuery("from Projectitem o where o.projectcode = ? ", projectcode).list();
			total = itemList.size();
			List<Map<String, Object>> rowData = new ArrayList<Map<String, Object>>();
			for (Projectitem item : itemList) {
				Map<String, Object> map = new HashMap<String, Object>();
				map.put("projectitemid", item.getProjectitemid());
				map.put("itemid", item.getItem().getItemid());
				map.put("itemtype", item.getItemtype().getItemtypename());
				map.put("itemname", item.getItem().getItemname());
				map.put("price", item.getItemfee());
				map.put("analysisFee", item.getItem().getStandfee());
				rowData.add(map);					
			}
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("total", total);
		map.put("rows", rowData);

		String resultJson = JSONObject.fromObject(map).toString();
		getResponse().getWriter().write(resultJson);
		
		
	}
//	public void samplechargedetailList() throws Exception {//展现人员车辆费用
//		int intPage = Integer.parseInt((page == null || page == "0") ? "1": page);
//		int maxIndex = Integer.parseInt((rows == null || rows == "0") ? "20": rows);
//		int startIndex = (intPage - 1) * maxIndex;
//
//		List<Object> paramValues = new ArrayList<Object>();
//		StringBuilder whereSQL = new StringBuilder();
//
//		String fieldSQL = "detail,samplefee";
//		String tableSQL = " Projectdetail as detail left outer join detail.projectsamplefees as samplefee";
//		whereSQL.append("1=1");
//		if (null != projectcode && !"".equals(projectcode)) {
//			whereSQL.append(" and detail.projectcode = ?");
//			paramValues.add(projectcode);
//		}
//
//		LinkedHashMap<String, String> orderby = new LinkedHashMap<String, String>();
//		orderby.put("detail.ent.entname", "asc");
//		orderby.put("samplefee.technicaltype", "asc");
//		QueryResult<Object[]> q = pdManager.getScrollDateByHQL(startIndex,
//				maxIndex, fieldSQL, tableSQL, whereSQL.toString(), paramValues
//						.toArray(), orderby);
//		long total = q.getTotalrecord();
//
//		List<Map<String, Object>> rowData = new ArrayList<Map<String, Object>>();
//		List<Object[]> list = q.getResultlist();
//		for (Object[] obj : list) {
//			Map<String, Object> map = new HashMap<String, Object>();
//			Projectdetail detail = (Projectdetail) obj[0];
//			Projectsamplefee samplefee = (Projectsamplefee) obj[1];
//			map.put("projectdetail", detail == null ? "" : detail.getProjectdetailid());
//			map.put("entid", detail == null ? "" : detail.getEnt().getEntid());
//			map.put("entname", detail == null ? "" : detail.getEnt().getEntname());
//			map.put("projectcode", detail == null ? "" : detail.getProjectcode());
//			map.put("projectsamplefeeid", samplefee == null ? "" : samplefee.getProjectsamplefeeid());
//			map.put("technicalid", samplefee == null ? "" : samplefee.getTechnicalid());
//			map.put("type", samplefee == null ? "" : samplefee.getTechnicaltype());
//			map.put("amount", samplefee == null ? "" : samplefee.getAmount());
//			if(samplefee.getTechnicaltype()=="1"||samplefee.getTechnicaltype().equals("1")){
//				map.put("typename", samplefee == null ? "" : "人员费用");
//			}
//			if(samplefee.getTechnicaltype()=="2"||samplefee.getTechnicaltype().equals("2")){
//				map.put("typename", samplefee == null ? "" : "车辆费用");
//			}
//			
//			map.put("samid", samplefee == null ? "" : samplefee.getTechnicalid().getId());//id
//		    map.put("name", samplefee == null ? "" : samplefee.getTechnicalid().getName());//名称
//			map.put("price", samplefee == null ? "" : samplefee.getPrice());//费用
//			rowData.add(map);
//		}
//		Map<String, Object> map = new HashMap<String, Object>();
//		map.put("total", total);
//		map.put("rows", rowData);
//
//		String resultJson = JSONObject.fromObject(map).toString();
//		getResponse().getWriter().write(resultJson);
//	}
	public void updateSampleFee() throws IOException {
		try {
			Projectsamplefee pitem = manager.get(this.projectsamplefeeid);	
			if(newPrice!=null&&!newPrice.equals("")){
				pitem.setPrice(newPrice);
			}
			if(newAmount!=null&&!newAmount.equals("")){
				pitem.setAmount(newAmount);		
			}
			manager.save(pitem);
			sendMsg("success");

		} catch (Exception ex) {
			sendMsg("error");
		}
	}

	public void updateItemFee() throws IOException {
		try {
			Projectitem pitem = projectitemManager.get(this.projectitemid);	
			if(newPrice!=null&&!newPrice.equals("")&&pitem!=null){
				pitem.setItemfee(newPrice);
				projectitemManager.save(pitem);
				this.account(pitem.getProjectcode());
			}
			sendMsg("success");
		} catch (Exception ex) {
			sendMsg("error");
		}
	}

	/**
	 * 结算费用
	 * @throws IOException 
	 */
	public void account(String projectcode) throws IOException {
		try {
			Projects project = projectsManager.getProjectByProjectcode(projectcode);
			List<Projectitem> itemList = pdManager
			.createQuery("from Projectitem o where o.projectcode = ? ", projectcode).list();
			Float sumfee = 0.0f;
			for (Projectitem item : itemList) {
				if(item.getItemfee()!=null)
				{
					sumfee=sumfee+Float.valueOf(item.getItemfee());
				}				
			}
			project.setDetectionfee(String.valueOf(sumfee));
			
			projectsManager.save(project);
		} catch (Exception e) {
			e.printStackTrace();
		}

	}
	
	/**
	 * 获得结算费用
	 * @throws IOException 
	 */
	public void getaccount() throws IOException {
		Map<String, Object> map = new HashMap<String, Object>();
		try{
			Projects project = projectsManager.getProjectByProjectcode(projectcode);
			Float feepay = Float.valueOf(project.getDetectionfee());
//			feepay = pdManager.updateFee(projectcode,feepay);
			map.put("message", "success");
			map.put("feepay", feepay);
			json = JSONObject.fromObject(map).toString();
		}catch (Exception ex) {
			ex.printStackTrace();
			map.put("message", "error");
		}
		sendMsg(json);

	}
		
		
	public void doViewEntity(){
		Projects project = projectsManager.getProjectByProjectcode(id);
		String fee = project.getDetectionfee();
		getRequest().setAttribute("totalCost", fee);
	}
	
	@Override
	public String list() throws Exception{	
		Projects project = projectsManager.getProjectByProjectcode(id);
		String fee = project.getDetectionfee();
		getRequest().setAttribute("totalCost", fee);
		return StrutsAction.LIST;
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

	public String getNewPrice() {
		return newPrice;
	}
	public void setNewPrice(String newPrice) {
		this.newPrice = newPrice;
	}
	public String getNewAmount() {
		return newAmount;
	}
	public void setNewAmount(String newAmount) {
		this.newAmount = newAmount;
	}
	public void setProjectsamplefeeid(String projectsamplefeeid) {
		this.projectsamplefeeid = projectsamplefeeid;
	}
	public String getProjectsamplefeeid() {
		return projectsamplefeeid;
	}
	public String getProjectitemid() {
		return projectitemid;
	}
	public void setProjectitemid(String projectitemid) {
		this.projectitemid = projectitemid;
	}

}
