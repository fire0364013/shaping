package com.beauty.biz.web.employeeinfo;


import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
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
import com.beauty.biz.entity.Departmentinfo;
import com.beauty.biz.entity.Employeeinfo;
import com.beauty.biz.entity.Userinfo;
import com.beauty.biz.service.CertificateinfoManager;
import com.beauty.biz.service.EmployeeinfoManager;
import com.beauty.biz.service.UserInfoManager;
import com.beauty.common.page.QueryResult;
import com.beauty.common.web.StrutsAction;

/**
 * 人员基础信息管理
 * 
 * @author lby
 * 
 */
@Results( {
		@Result(name = "input", location = "employee-input.jsp"),
		@Result(name = StrutsAction.VIEW, location = "employee-view.jsp"),
		@Result(name = "list", location = "employee-list.jsp"),
		@Result(name = StrutsAction.RELOAD, location = "employeeinfo.action", type = StrutsAction.REDIRECT), })
public class EmployeeinfoAction extends StrutsAction<Employeeinfo> {
	private static final long serialVersionUID = 6766745021420627475L;
	private String employeeinfoid;// 人员编号
	private String sex;// 性别
	private String carId;// 身份证号
	private Date birthday;// 出生日期
	private String nation;// 民族
	private String nativeplace;// 籍贯
	private String educationlevel;// 学历
	private String graduationschool;// 毕业学校
	private Date graduationdate;// 毕业日期
	private String major;// 所学专业
	private String address;// 住址
	private String post;// 职务
	private String technicalship;// 职称
	private String technicallevel;// 职称级别
	private String isjob;// 是否在职
	private Date entrytime;// 入职时间
	private String political;// 政治面貌
	private String remark;// 备注
	private String realnames;// 用户获取页面上提供的查询名字
	private String deptidnames;// 用户获取页面上提供的部门名称
	private String userids;// 用于获取页面上的userid
	private Userinfo userinfo;// userinfo类，用于获取userinfo~以及对应 的department名称
	private String page;
	private String rows;
	private String employeeinfoname;
	private JSONObject result;
	@Autowired
	private EmployeeinfoManager employeeinfoManager;// 雇员信息
	@Autowired
	private UserInfoManager userInfoManager;// 用户信息
	@Autowired
	private CertificateinfoManager certificateinfoManager;// 上岗证
	private List<Departmentinfo> departmentList;// 用于获取部门

	/**
	 * 用于显示列表页面
	 */
	@Override
	public String list() throws Exception {
		departmentList = employeeinfoManager.getAll();
		return "list";
	}

	@Override
	public String view() throws Exception {
//		departmentList = employeeinfoManager.getAll();
//		Userinfo uinfo = userInfoManager.get(userids);
//		this.setUserinfo(uinfo);
		return "view";
	}

	@Override
	public String input() throws Exception {
//		departmentList = employeeinfoManager.getAll();
//		Userinfo uinfo = userInfoManager.get(userids);
//		this.setUserinfo(uinfo);
		return "input";
	}

	/**
	 * 查询流程定义列表
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
		//只能看到本单位的客户
		whereSQL += " and e.entid ='"+getSessionUser().getEntid()+"' ";
//		if (null != deptidnamesm && !"".equals(deptidnamesm)) {
//			whereSQL += " and u.departmentinfo.deptid = ?";
//			paramValues.add(deptidnamesm);
//		}
		String fieldSQL = "e.employeeinfoid,e.employeeinfoname,e.sex,e.status,e.mobilephone";
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
	 * 删除一条数据
	 * 
	 * @throws IOException
	 */
	public void deleteOnlyOne() throws IOException {
		try {
			employeeinfoManager.deleteOnlyOne(getRequest());
			employeeinfoManager.addLog(getRequest().getParameter("id"), getSessionUser(), "删除");
			sendMsg("success");
		} catch (IOException e) {
			sendMsg("faild");

		}
	}

	/**
	 * 批量删除的时候
	 * 
	 * @throws IOException
	 */
	public void betchDeleteMethod() throws IOException {
		try {
			employeeinfoManager.batchDelete(getRequest());
			sendMsg("success");
		} catch (Exception e) {
			logger.error(e.getMessage(), e);

			sendMsg("faild");

		}
	}

	/**
	 * 保存当前人员
	 */
	@Override
	public String save() throws Exception {
		try {
			if (entity.getEmployeeinfoid() != null
					&& !"".equals(entity.getEmployeeinfoid())) {

//				Userinfo user = userInfoManager.get(userids);
//				if (user != null) {
//					entity.setUserid(user);
//				}
//				List<Certificateinfo> certilist = certificateinfoManager
//						.getCertByUserid(userids);
//				if (certilist.size() > 0) {
//					entity.setStationno(certilist.get(0).getStationno());// 保存上岗证编号
//				}
				employeeinfoManager.saveUpdate(entity);
				sendMsg("success");
			} else {
				String employeeid = certificateinfoManager
						.getSeq("SEQ_EMPLOYEEINFO");
				entity.setEmployeeinfoid(employeeid);// 保存人员表序列
				entity.setEntid(getSessionUser().getEntid());
//				Userinfo user = userInfoManager.get(userids);
//				if (user != null) {
//					entity.setUserid(user);
//				}
//				List<Certificateinfo> certilist = certificateinfoManager
//						.getCertByUserid(userids);
//				if (certilist.size() > 0) {
//					entity.setStationno(certilist.get(0).getStationno());// 保存上岗证编号
//				}
				employeeinfoManager.saveUpdate(entity);
				sendMsg("success");
			}
		} catch (Exception e) {
			e.printStackTrace();
			sendMsg("fail");
		}
		return null;
	}

	// ======导出开始

	/*
	 * 导出业务
	 */
	public String exportInfo() {
		try {
			getRequest().setCharacterEncoding("UTF-8");
			HSSFWorkbook wb = new HSSFWorkbook();
			// HSSFSheet sheet = wb.createSheet("new sheet");
			HSSFSheet sheet = wb.createSheet();
			wb.setSheetName(0, "上海市松江区环境监测站人员信息表", (short) 1);
			HSSFFont font = wb.createFont();
			font.setFontName("楷体");
			font.setFontHeight((short) 220);
			// ====过期状态
			HSSFCellStyle cs2 = wb.createCellStyle();
			HSSFFont font2 = wb.createFont();
			font2.setFontName("宋体");// 设置字体
			font2.setFontHeightInPoints((short) 15);// 字体大小
			cs2.setFont(font2);
			cs2.setAlignment(HSSFCellStyle.ALIGN_CENTER);// 水平居中
			cs2.setBorderBottom(HSSFCellStyle.BORDER_THIN);// 下边框
			cs2.setBorderLeft(HSSFCellStyle.BORDER_THIN);// 左边框
			cs2.setBorderRight(HSSFCellStyle.BORDER_THIN);// 右边框
			cs2.setBorderTop(HSSFCellStyle.BORDER_THIN);// 上边框
			cs2.setFillForegroundColor(HSSFColor.RED.index);// 设置背景色
			cs2.setFillPattern(HSSFCellStyle.SOLID_FOREGROUND);

			// ====

			// 表头 样式
			HSSFRow rowheader = sheet.createRow(0);
			HSSFCell cellheader = rowheader.createCell((short) 0);
			cellheader.setEncoding(HSSFCell.ENCODING_UTF_16);
			HSSFCellStyle cellstyleheader = wb.createCellStyle();// 样式
			HSSFFont font1 = wb.createFont();
			font1.setFontName("宋体");// 设置字体
			font1.setFontHeightInPoints((short) 10);// 字体大小
			font1.setBoldweight(HSSFFont.BOLDWEIGHT_BOLD);// 加粗
			cellstyleheader.setFont(font1);
			cellstyleheader.setAlignment(HSSFCellStyle.ALIGN_CENTER); // 指定单元格居中对齐
			cellstyleheader.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER); // 指定单元格垂直居中对齐
			cellstyleheader.setWrapText(true); // 指定单元格自动换行
			cellstyleheader.setBorderTop(HSSFCellStyle.BORDER_THIN);
			cellstyleheader.setBorderLeft(HSSFCellStyle.BORDER_THIN);
			cellstyleheader.setBorderRight(HSSFCellStyle.BORDER_THIN);
			cellstyleheader.setBorderBottom(HSSFCellStyle.BORDER_THIN);
			/*
			 * cellheader.setCellStyle(cellstyleheader); cellheader =
			 * rowheader.createCell((short) 0);
			 * cellheader.setEncoding(HSSFCell.ENCODING_UTF_16);
			 * cellheader.setCellValue("上海市松江区环境监测站人员信息表");
			 * cellheader.setCellStyle(cellstyleheader);
			 * sheet.addMergedRegion(new Region(0,(short)0,1,(short)8)); //合并单元格
			 * sheet.setColumnWidth((short) 0, (short) 7000);
			 */
			// 表列 样式
			// HSSFRow row = sheet.createRow(2); 此处是需要表头的时候用的
			HSSFRow row = sheet.createRow(0);
			HSSFCell cell = row.createCell((short) 0);
			cell.setEncoding(HSSFCell.ENCODING_UTF_16);
			HSSFCellStyle cellstyle = wb.createCellStyle();// 样式
			HSSFFont fonttable = wb.createFont();
			fonttable.setFontHeightInPoints((short) 10);// 字体大小
			cellstyle.setAlignment(HSSFCellStyle.ALIGN_CENTER); // 指定单元格居中对齐
			cellstyle.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER); // 指定单元格垂直居中对齐
			cellstyle.setWrapText(true); // 指定单元格自动换行
			cellstyle.setBorderTop(HSSFCellStyle.BORDER_THIN);
			cellstyle.setBorderLeft(HSSFCellStyle.BORDER_THIN);
			cellstyle.setBorderRight(HSSFCellStyle.BORDER_THIN);
			cellstyle.setBorderBottom(HSSFCellStyle.BORDER_THIN);

			// left
			HSSFCellStyle cellstyleleft = wb.createCellStyle();// 样式
			HSSFFont fonttableleft = wb.createFont();
			fonttableleft.setFontHeightInPoints((short) 10);// 字体大小
			cellstyleleft.setAlignment(HSSFCellStyle.ALIGN_LEFT); // 指定单元格居中对齐
			cellstyleleft.setVerticalAlignment(HSSFCellStyle.ALIGN_LEFT); // 指定单元格垂直居中对齐
			cellstyleleft.setWrapText(true); // 指定单元格自动换行
			cellstyleleft.setBorderTop(HSSFCellStyle.BORDER_THIN);
			cellstyleleft.setBorderLeft(HSSFCellStyle.BORDER_THIN);
			cellstyleleft.setBorderRight(HSSFCellStyle.BORDER_THIN);
			cellstyleleft.setBorderBottom(HSSFCellStyle.BORDER_THIN);

			// cellstyle.setBorderBottom((short) 1);
			cellstyle.setFont(fonttable);
			cell.setCellStyle(cellstyle);

			cell = row.createCell((short) 0);
			cell.setEncoding(HSSFCell.ENCODING_UTF_16);
			cell.setCellValue("序号");
			cell.setCellStyle(cellstyleheader);
			sheet.setColumnWidth((short) 0, (short) 1500);

			cell = row.createCell((short) 1);
			cell.setEncoding(HSSFCell.ENCODING_UTF_16);
			cell.setCellValue("单位");
			cell.setCellStyle(cellstyleheader);
			sheet.setColumnWidth((short) 1, (short) 3500);

			cell = row.createCell((short) 2);
			cell.setEncoding(HSSFCell.ENCODING_UTF_16);
			cell.setCellValue("姓名");
			cell.setCellStyle(cellstyleheader);
			sheet.setColumnWidth((short) 2, (short) 3000);

			cell = row.createCell((short) 3);
			cell.setEncoding(HSSFCell.ENCODING_UTF_16);
			cell.setCellValue("性别");
			cell.setCellStyle(cellstyleheader);
			sheet.setColumnWidth((short) 3, (short) 1500);

			cell = row.createCell((short) 4);
			cell.setEncoding(HSSFCell.ENCODING_UTF_16);
			cell.setCellValue("出生年月");
			cell.setCellStyle(cellstyleheader);
			sheet.setColumnWidth((short) 4, (short) 3000);

			cell = row.createCell((short) 5);
			cell.setEncoding(HSSFCell.ENCODING_UTF_16);
			cell.setCellValue("职称");
			cell.setCellStyle(cellstyleheader);
			sheet.setColumnWidth((short) 5, (short) 3000);

			cell = row.createCell((short) 6);
			cell.setEncoding(HSSFCell.ENCODING_UTF_16);
			cell.setCellValue("合格证总编号");
			cell.setCellStyle(cellstyleheader);
			sheet.setColumnWidth((short) 6, (short) 5000);

			cell = row.createCell((short) 7);
			cell.setEncoding(HSSFCell.ENCODING_UTF_16);
			cell.setCellValue("目前从事工作");
			cell.setCellStyle(cellstyleheader);
			sheet.setColumnWidth((short) 7, (short) 5000);

			cell = row.createCell((short) 8);
			cell.setEncoding(HSSFCell.ENCODING_UTF_16);
			cell.setCellValue("状态");
			cell.setCellStyle(cellstyleheader);
			sheet.setColumnWidth((short) 8, (short) 2000);
			List<Object[]> listEmplyee = employeeinfoManager.getEmpleList();

			if (listEmplyee != null && listEmplyee.size() > 0) {
				for (int i = 0; i < listEmplyee.size(); i++) {
					row = sheet.createRow(i + 1);

					cell = row.createCell((short) 0);
					cell.setEncoding(HSSFCell.ENCODING_UTF_16);
					cell.setCellValue(i + 1);// 序号
					cell.setCellStyle(cellstyle);

					cell = row.createCell((short) 1);
					cell.setEncoding(HSSFCell.ENCODING_UTF_16);
					cell.setCellValue("松江区监测站");// 单位
					cell.setCellStyle(cellstyleleft);

					cell = row.createCell((short) 2);
					cell.setEncoding(HSSFCell.ENCODING_UTF_16);
					if (listEmplyee.get(i)[0] != null
							&& !"".equals(listEmplyee.get(i)[0])) {
						cell.setCellValue(listEmplyee.get(i)[0].toString());// 姓名
					}
					cell.setCellStyle(cellstyleleft);

					cell = row.createCell((short) 3);
					cell.setEncoding(HSSFCell.ENCODING_UTF_16);
					if (listEmplyee.get(i)[1] != null
							&& !"".equals(listEmplyee.get(i)[1])) {
						cell.setCellValue(listEmplyee.get(i)[1].toString());// 性别
					}
					cell.setCellStyle(cellstyle);

					cell = row.createCell((short) 4);
					cell.setEncoding(HSSFCell.ENCODING_UTF_16);
					if (listEmplyee.get(i)[2] != null
							&& !"".equals(listEmplyee.get(i)[2])) {
						cell.setCellValue(listEmplyee.get(i)[2].toString()
								.substring(0, 7));// 出生年月
					}
					cell.setCellStyle(cellstyle);

					cell = row.createCell((short) 5);
					cell.setEncoding(HSSFCell.ENCODING_UTF_16);
					if (listEmplyee.get(i)[3] != null
							&& !"".equals(listEmplyee.get(i)[3])) {
						cell.setCellValue(listEmplyee.get(i)[3].toString());// 职称
					}
					cell.setCellStyle(cellstyleleft);

					cell = row.createCell((short) 6);
					cell.setEncoding(HSSFCell.ENCODING_UTF_16);
					if (listEmplyee.get(i)[4] != null
							&& !"".equals(listEmplyee.get(i)[4])) {
						cell.setCellValue(listEmplyee.get(i)[4].toString());// 合格证总编号
					}
					cell.setCellStyle(cellstyleleft);

					cell = row.createCell((short) 7);
					cell.setEncoding(HSSFCell.ENCODING_UTF_16);
					if (listEmplyee.get(i)[5] != null
							&& !"".equals(listEmplyee.get(i)[5])) {
						cell.setCellValue(listEmplyee.get(i)[5].toString());// 目前从事工作
					}
					cell.setCellStyle(cellstyleleft);

					cell = row.createCell((short) 8);
					cell.setEncoding(HSSFCell.ENCODING_UTF_16);
					if (listEmplyee.get(i)[6] != null
							&& !"".equals(listEmplyee.get(i)[6])) {
						cell.setCellValue(listEmplyee.get(i)[6].toString());// 状态
					}
					cell.setCellStyle(cellstyle);
				}
			}
			SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");
			Date datenow = new Date();
			String createTime = sdf.format(datenow);
			String datenowFile = "人员基本信息_" + createTime + ".xls";
			getResponse()
					.setContentType("application/vnd.ms-excel,charset=gbk");
			getResponse().setHeader(
					"Content-Disposition",
					"attachment;filename=\""
							+ java.net.URLEncoder.encode(datenowFile, "UTF-8")
							+ "\"");

			wb.write(getResponse().getOutputStream());
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	// ======导出结束

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

	public String getEmployeeinfoid() {
		return employeeinfoid;
	}

	public void setEmployeeinfoid(String employeeinfoid) {
		this.employeeinfoid = employeeinfoid;
	}

	public String getPost() {
		return post;
	}

	public void setPost(String post) {
		this.post = post;
	}

	public String getTechnicalship() {
		return technicalship;
	}

	public void setTechnicalship(String technicalship) {
		this.technicalship = technicalship;
	}

	public String getTechnicallevel() {
		return technicallevel;
	}

	public void setTechnicallevel(String technicallevel) {
		this.technicallevel = technicallevel;
	}

	public String getIsjob() {
		return isjob;
	}

	public void setIsjob(String isjob) {
		this.isjob = isjob;
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

	public String getNation() {
		return nation;
	}

	public void setNation(String nation) {
		this.nation = nation;
	}

	public String getNativeplace() {
		return nativeplace;
	}

	public void setNativeplace(String nativeplace) {
		this.nativeplace = nativeplace;
	}

	public String getEducationlevel() {
		return educationlevel;
	}

	public void setEducationlevel(String educationlevel) {
		this.educationlevel = educationlevel;
	}

	public String getGraduationschool() {
		return graduationschool;
	}

	public void setGraduationschool(String graduationschool) {
		this.graduationschool = graduationschool;
	}

	public Date getGraduationdate() {
		return graduationdate;
	}

	public void setGraduationdate(Date graduationdate) {
		this.graduationdate = graduationdate;
	}

	public String getMajor() {
		return major;
	}

	public void setMajor(String major) {
		this.major = major;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public Date getEntrytime() {
		return entrytime;
	}

	public void setEntrytime(Date entrytime) {
		this.entrytime = entrytime;
	}

	public String getPolitical() {
		return political;
	}

	public void setPolitical(String political) {
		this.political = political;
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

	public String getEmployeeinfoname() {
		return employeeinfoname;
	}

	public void setEmployeeinfoname(String employeeinfoname) {
		this.employeeinfoname = employeeinfoname;
	}

}
