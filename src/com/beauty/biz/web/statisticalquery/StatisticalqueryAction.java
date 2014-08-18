package com.beauty.biz.web.statisticalquery;




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

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.usermodel.HSSFFont;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.hssf.util.HSSFColor;
import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.convention.annotation.Results;
import org.springframework.beans.factory.annotation.Autowired;

import com.beauty.biz.entity.Certificateinfo;
import com.beauty.biz.entity.Custom;
import com.beauty.biz.entity.Departmentinfo;
import com.beauty.biz.entity.Employeeinfo;
import com.beauty.biz.entity.Userinfo;
import com.beauty.biz.entity.dictionary.Dictionaryinfo;
import com.beauty.biz.entity.entpriseinfo.EntpriseInfo;
import com.beauty.biz.entity.projects.Projectitem;
import com.beauty.biz.entity.projects.Projects;
import com.beauty.biz.service.CertificateinfoManager;
import com.beauty.biz.service.CustomManager;
import com.beauty.biz.service.DictionaryManager;
import com.beauty.biz.service.EmployeeinfoManager;
import com.beauty.biz.service.UserInfoManager;
import com.beauty.biz.service.entpriseinfo.EntpriseInfoManager;
import com.beauty.biz.service.projects.ProjectsManager;
import com.beauty.common.page.QueryResult;
import com.beauty.common.utils.EasyStr;
import com.beauty.common.utils.SearchUtil;
import com.beauty.common.web.StrutsAction;

/**
 * 客户基础信息管理
 * 
 * @author lby
 * 
 */
@Results( {
		@Result(name = "customlist", location = "custom-list.jsp"),
		@Result(name = "employeelist", location = "employee-list.jsp"),
		@Result(name = "projectlist", location = "project-list.jsp"),
		@Result(name = StrutsAction.RELOAD, location = "custom.action", type = StrutsAction.REDIRECT), })
public class StatisticalqueryAction extends StrutsAction<Custom> {
	private static final long serialVersionUID = 6766745021420627475L;
	private String customid;// 人员编号
	private String sex;// 性别
	private String carId;// 身份证号
	private Date birthday;// 出生日期
	private String address;// 住址
	private String remark;// 备注
	private String realnames;// 用户获取页面上提供的查询名字
	private String deptidnames;// 用户获取页面上提供的部门名称
	private String userids;// 用于获取页面上的userid
	private Userinfo userinfo;// userinfo类，用于获取userinfo~以及对应 的department名称
	private String page;
	private String rows;
	private JSONObject result;
	private List<Dictionaryinfo> characterList;//性格列表
	private List<Dictionaryinfo> occupationList;//职业列表
	private String customname;
	private String employeeinfoname;
	private String wtentprise;// 委托单位
	private Date registdate1;// 登记日期1
	private Date registdate2;// 登记日期2
	private String entname;//企业名称
	private String mtentprise;//手术单位
	@Autowired
	private CustomManager custominfoManager;// 雇员信息
	@Autowired
	private UserInfoManager userInfoManager;// 用户信息
	@Autowired
	private CertificateinfoManager certificateinfoManager;// 上岗证
	@Autowired
	private DictionaryManager dictionaryManager;
	private List<Departmentinfo> departmentList;// 用于获取部门
	@Autowired
	private EmployeeinfoManager employeeinfoManager;
	@Autowired
	private ProjectsManager projectsManager;
	@Autowired
	private EntpriseInfoManager entpriseInfoManager;

	/**
	 * 用于显示列表页面
	 */
	public String tocustomlist() throws Exception {
		return "customlist";
	}
	
	/**
	 * 用于显示列表页面
	 */
	public String toemployeelist() throws Exception {
		return "employeelist";
	}
	
	/**
	 * 用于显示列表页面
	 */
	public String toprojectlist() throws Exception {
		return "projectlist";
	}


	/**
	 * 查询客户列表
	 * 
	 * @param mapping
	 * @param form
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	public String customList() throws Exception {
		int intPage = Integer.parseInt((page == null || page == "0") ? "1"
				: page);
		int maxIndex = Integer.parseInt((rows == null || rows == "0") ? "23"
				: rows);
		int startIndex = (intPage - 1) * maxIndex;
		LinkedHashMap<String, String> orderby = new LinkedHashMap<String, String>();
		orderby.put("e.customid", "asc");// 根据客户名字排序

		List<Object> paramValues = new ArrayList<Object>();
//		String customname = getRequest().getParameter("customname");// 姓名

		String whereSQL = "1=1 ";
		if (null != customname && !"".equals(customname)) {
			whereSQL += " and e.customname like ?";
			paramValues.add("%" + customname + "%");
		}
		if (null != sex && !"".equals(sex)) {
			whereSQL += " and e.sex = ?";
			paramValues.add( sex );
		}		
		//只能看到本单位的客户
//		whereSQL += " and e.entid ='"+getSessionUser().getEntid()+"' ";
		String fieldSQL = "e.customid,e.customname,e.sex,e.status,e.mobilephone,e.entid";
		String tableSQL = "";
		tableSQL = " Custom e";// hql
		QueryResult<Object[]> q;
		try {
			q = custominfoManager.getScrollDateByHQL(startIndex, maxIndex,
					fieldSQL, tableSQL, whereSQL, paramValues.toArray(),
					orderby);
			long total = q.getTotalrecord();
			List<Map<String, Object>> rows2 = new ArrayList<Map<String, Object>>();
			List<Object[]> customList = q.getResultlist();
			// jquery easyui 需要返回的结果集
			for (int i = 0; i < customList.size(); i++) {
				// 列表要显示的字段及值
				Map<String, Object> map = new HashMap<String, Object>();
				map.put("customid", customList.get(i)[0]);// 客户编号
				map.put("customname", customList.get(i)[1]);// //客户姓名
				map.put("sex", customList.get(i)[2]);//性别
				map.put("status", customList.get(i)[3]);// 状态是否有效
				map.put("mobilephone", customList.get(i)[4]);//联系方式
				EntpriseInfo entpriseInfo = entpriseInfoManager.getEntpriseinfo(customList.get(i)[5].toString());
				map.put("entname", entpriseInfo!=null?entpriseInfo.getEntname():"");//所属企业名称
				rows2.add(map);
			}
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("total", total);// jquery easyui 需要的总记录数
			map.put("rows", rows2);// jquery easyui 需要的结果集
			String first = JSONArray.fromObject(map).toString();//
			String jsonString = first.substring(1, first.length() - 1);// 去掉“[”和“]”
			getResponse().getWriter().write(jsonString);
		} catch (Exception e) {
			e.printStackTrace();
		}

		return null;
	}

	/**
	 * 查询客户列表
	 * 
	 * @param mapping
	 * @param form
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	public String employeeList() throws Exception {
		int intPage = Integer.parseInt((page == null || page == "0") ? "1"
				: page);
		int maxIndex = Integer.parseInt((rows == null || rows == "0") ? "23"
				: rows);
		int startIndex = (intPage - 1) * maxIndex;
		LinkedHashMap<String, String> orderby = new LinkedHashMap<String, String>();
//		orderby.put("u.departmentinfo.orderid", "asc");// 先根据部门排序
		orderby.put("e.employeeinfoid", "asc");// 再根据部门人员名字排序

		List<Object> paramValues = new ArrayList<Object>();
//		String val = getRequest().getParameter("post");// 职务
//		String employeeinfoname = getRequest().getParameter("employeeinfoname");// 姓名
//		String deptidnamesm = getRequest().getParameter("deptidnames");// 部门

		String whereSQL = "1=1 ";
//		if (null != val && !"".equals(val)) {
//			whereSQL += " and post like ?";
//			paramValues.add("%" + val + "%");
//		}
		if (null != employeeinfoname && !"".equals(employeeinfoname)) {
			whereSQL += " and e.employeeinfoname like ?";
			paramValues.add("%" + employeeinfoname + "%");
		}
		if (null != entname && !"".equals(entname)) {
			whereSQL += " and e.entid in (select tt.entid from EntpriseInfo tt where tt.entname like ?)";
			paramValues.add("%" + entname + "%");
		}
		//只能看到本单位的客户
//		whereSQL += " and e.entid ='"+getSessionUser().getEntid()+"' ";
//		if (null != deptidnamesm && !"".equals(deptidnamesm)) {
//			whereSQL += " and u.departmentinfo.deptid = ?";
//			paramValues.add(deptidnamesm);
//		}
		String fieldSQL = "e.employeeinfoid,e.employeeinfoname,e.sex,e.status,e.mobilephone,e.entid";
		String tableSQL = "";
		tableSQL = " Employeeinfo e ";// hql
		QueryResult<Object[]> q;
		try {
			q = employeeinfoManager.getScrollDateByHQL(startIndex, maxIndex,
					fieldSQL, tableSQL, whereSQL, paramValues.toArray(),
					orderby);
			long total = q.getTotalrecord();
			List<Map<String, Object>> rows2 = new ArrayList<Map<String, Object>>();
			List<Object[]> employeeList = q.getResultlist();
			// jquery easyui 需要返回的结果集 select * from userinfo u left join
			// employeeinfo e on u.userid=e.userid
			for (int i = 0; i < employeeList.size(); i++) {
				// 列表要显示的字段及值
				Map<String, Object> map = new HashMap<String, Object>();
				map.put("employeeinfoid", employeeList.get(i)[0]);// 人员编号
//				map.put("userid", employeeList.get(i)[1]);// 用户编号--->> 获得用户的登陆名
//															// 部门编号，部门名称
//				map.put("departname", employeeList.get(i)[2]);// 获得用户部门
				map.put("employeeinfoname", employeeList.get(i)[1]);// //用户姓名
				map.put("sex", employeeList.get(i)[2]);// 职务
				map.put("isjob", employeeList.get(i)[3]);// 是否在职//在岗、离职、外聘
				map.put("mobilephone", employeeList.get(i)[4]);//简称
				EntpriseInfo entpriseInfo = entpriseInfoManager.getEntpriseinfo(employeeList.get(i)[5].toString());
				map.put("entname", entpriseInfo!=null?entpriseInfo.getEntname():"");//所属企业名称				
				rows2.add(map);
			}
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("total", total);// jquery easyui 需要的总记录数
			map.put("rows", rows2);// jquery easyui 需要的结果集
			String first = JSONArray.fromObject(map).toString();//
			String jsonString = first.substring(1, first.length() - 1);// 去掉“[”和“]”
			getResponse().getWriter().write(jsonString);
		} catch (Exception e) {
			e.printStackTrace();
		}

		return null;
	}
	
	
	public void taskList() throws Exception {
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
		SearchUtil.getStringSearch(whereSB, params, "wtEntprise.entname",
				"like", wtentprise);		
		SearchUtil.getStringSearch(whereSB, params, "monitorentid.entname",
				"like", mtentprise);		
		SearchUtil.getDateBetweenSearch(whereSB, params, "registdate",
				registdate1, registdate2);		
//		SearchUtil.getStringSearch(whereSB, params, "status",
//				"=", "deal");
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

	public String getDeptidnames() {
		return deptidnames;
	}

	public void setDeptidnames(String deptidnames) {
		this.deptidnames = deptidnames;
	}

	private Departmentinfo departmentinfo;

	public String getRealnames() {
		return realnames;
	}

	public void setRealnames(String realnames) {
		this.realnames = realnames;
	}

	public String getUserids() {
		return userids;
	}

	public void setUserids(String userids) {
		this.userids = userids;
	}

	public List<Departmentinfo> getDepartmentList() {
		return departmentList;
	}

	public void setDepartmentList(List<Departmentinfo> departmentList) {
		this.departmentList = departmentList;
	}

	public Departmentinfo getDepartmentinfo() {
		return departmentinfo;
	}

	public void setDepartmentinfo(Departmentinfo departmentinfo) {
		this.departmentinfo = departmentinfo;
	}

	public String getcustomid() {
		return customid;
	}

	public void setCustomid(String customid) {
		this.customid = customid;
	}


	public String getSex() {
		return sex;
	}

	public void setSex(String sex) {
		this.sex = sex;
	}

	public String getCarId() {
		return carId;
	}

	public void setCarId(String carId) {
		this.carId = carId;
	}

	public Date getBirthday() {
		return birthday;
	}

	public void setBirthday(Date birthday) {
		this.birthday = birthday;
	}


	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}


	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
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

	public JSONObject getResult() {
		return result;
	}

	public void setResult(JSONObject result) {
		this.result = result;
	}

	public Userinfo getUserinfo() {
		return userinfo;
	}

	public void setUserinfo(Userinfo userinfo) {
		this.userinfo = userinfo;
	}

	public List<Dictionaryinfo> getCharacterList() {
		return characterList;
	}

	public void setCharacterList(List<Dictionaryinfo> characterList) {
		this.characterList = characterList;
	}

	public List<Dictionaryinfo> getOccupationList() {
		return occupationList;
	}

	public void setOccupationList(List<Dictionaryinfo> occupationList) {
		this.occupationList = occupationList;
	}

	public String getCustomname() {
		return customname;
	}

	public void setCustomname(String customname) {
		this.customname = customname;
	}

	public String getCustomid() {
		return customid;
	}

	public String getEmployeeinfoname() {
		return employeeinfoname;
	}

	public void setEmployeeinfoname(String employeeinfoname) {
		this.employeeinfoname = employeeinfoname;
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

	public String getEntname() {
		return entname;
	}

	public void setEntname(String entname) {
		this.entname = entname;
	}

	public String getMtentprise() {
		return mtentprise;
	}

	public void setMtentprise(String mtentprise) {
		this.mtentprise = mtentprise;
	}

}
