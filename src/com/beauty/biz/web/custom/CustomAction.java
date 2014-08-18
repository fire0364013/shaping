package com.beauty.biz.web.custom;



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
import com.beauty.biz.entity.Custom;
import com.beauty.biz.entity.Departmentinfo;
import com.beauty.biz.entity.Employeeinfo;
import com.beauty.biz.entity.Userinfo;
import com.beauty.biz.entity.dictionary.Dictionaryinfo;
import com.beauty.biz.service.CertificateinfoManager;
import com.beauty.biz.service.CustomManager;
import com.beauty.biz.service.DictionaryManager;
import com.beauty.biz.service.EmployeeinfoManager;
import com.beauty.biz.service.UserInfoManager;
import com.beauty.common.page.QueryResult;
import com.beauty.common.web.StrutsAction;

/**
 * 客户基础信息管理
 * 
 * @author lby
 * 
 */
@Results( {
		@Result(name = "input", location = "custom-input.jsp"),
		@Result(name = StrutsAction.VIEW, location = "custom-view.jsp"),
		@Result(name = "list", location = "custom-list.jsp"),
		@Result(name = StrutsAction.RELOAD, location = "custom.action", type = StrutsAction.REDIRECT), })
public class CustomAction extends StrutsAction<Custom> {
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
	@Autowired
	private CustomManager custominfoManager;// 雇员信息
	@Autowired
	private UserInfoManager userInfoManager;// 用户信息
	@Autowired
	private CertificateinfoManager certificateinfoManager;// 上岗证
	@Autowired
	private DictionaryManager dictionaryManager;
	private List<Departmentinfo> departmentList;// 用于获取部门

	/**
	 * 用于显示列表页面
	 */
	@Override
	public String list() throws Exception {
		departmentList = custominfoManager.getAll();
		return "list";
	}

	@Override
	public String view() throws Exception {
//		departmentList = custominfoManager.getAll();
//		Userinfo uinfo = userInfoManager.get(userids);
//		this.setUserinfo(uinfo);
		characterList = dictionaryManager.getDictionaryinfoByNarycode("KHXG");
		occupationList = dictionaryManager.getDictionaryinfoByNarycode("KHZY");
		return "view";
	}

	@Override
	public String input() throws Exception {
//		departmentList = custominfoManager.getAll();
//		Userinfo uinfo = userInfoManager.get(userids);
//		this.setUserinfo(uinfo);
		characterList = dictionaryManager.getDictionaryinfoByNarycode("KHXG");
		occupationList = dictionaryManager.getDictionaryinfoByNarycode("KHZY");
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
		whereSQL += " and e.entid ='"+getSessionUser().getEntid()+"' ";
		String fieldSQL = "e.customid,e.customname,e.sex,e.status,e.mobilephone";
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
			custominfoManager.deleteOnlyOne(getRequest());
			custominfoManager.addLog(getRequest().getParameter("id"), getSessionUser(), "删除");
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
			custominfoManager.batchDelete(getRequest());
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
			if (entity.getCustomid()!= null
					&& !"".equals(entity.getCustomid())) {

//				Userinfo user = userInfoManager.get(userids);
//				if (user != null) {
//					entity.setUserid(user);
//				}
//				List<Certificateinfo> certilist = certificateinfoManager
//						.getCertByUserid(userids);
//				if (certilist.size() > 0) {
//					entity.setStationno(certilist.get(0).getStationno());// 保存上岗证编号
//				}
				custominfoManager.saveUpdate(entity);
				sendMsg("success");
			} else {
				String customid = certificateinfoManager
						.getSeq("SEQ_CUSTOMINFO");
				entity.setCustomid(customid);// 保存人员表序列
				entity.setEntid(getSessionUser().getEntid());
				entity.setStatus("1");
//				Userinfo user = userInfoManager.get(userids);
//				if (user != null) {
//					entity.setUserid(user);
//				}
//				List<Certificateinfo> certilist = certificateinfoManager
//						.getCertByUserid(userids);
//				if (certilist.size() > 0) {
//					entity.setStationno(certilist.get(0).getStationno());// 保存上岗证编号
//				}
				custominfoManager.saveUpdate(entity);
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
			List<Object[]> listEmplyee = custominfoManager.getEmpleList();

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

}
