package com.beauty.biz.web.userinfo;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.sql.Blob;
import java.text.SimpleDateFormat;
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
import org.hibernate.Hibernate;
import org.springframework.beans.factory.annotation.Autowired;

import com.beauty.biz.entity.Departmentinfo;
import com.beauty.biz.entity.Userinfo;
import com.beauty.biz.service.CertificateinfoManager;
import com.beauty.biz.service.DepartmentinfoManager;
import com.beauty.biz.service.EmployeeinfoManager;
import com.beauty.biz.service.SystemlogManager;
import com.beauty.biz.service.UserInfoManager;
import com.beauty.common.page.QueryResult;
import com.beauty.common.utils.SearchUtil;
import com.beauty.common.utils.SessionUser;
import com.beauty.common.web.StrutsAction;

@Results( {
		@Result(name = "list", location = "userinfolist.jsp"),
		@Result(name = StrutsAction.VIEW, location = "userinfo-view.jsp"),
		@Result(name = "oneAndMany", location = "userinfo-oneandmany.jsp"),
		@Result(name = "toTree", location = "userinfo-toTree.jsp"),
		@Result(name = "toEntpriseListPage", location = "entprise1-select.jsp"),
		@Result(name = "uploadPic", location = "picCut.jsp"),
		@Result(name = StrutsAction.RELOAD, location = "userinfo.action", type = StrutsAction.REDIRECT),
		@Result(name = "uploadSin", location = "picSin.jsp") })
public class UserinfoAction extends StrutsAction<Userinfo> {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	@Autowired
	private UserInfoManager userInfoService;// 注入的Service层
	// 注入的部门的Service
	@Autowired
	private DepartmentinfoManager departmentinfoService;
	@Autowired
	private SystemlogManager systemlogManager;
	// 查询出所有部门的list
	private List<Departmentinfo> listDepar;
	private String flag;
	private String filename;
	private int lenPic;// 这里是用作电子签章展示无图片还是数据库的数据
	// 删除的时候获取页面上传递的id
	private String uids;
	private String rows;// 行数
	private String page;// 页数
	private String realname;// 查询条件 真实姓名
	private String userstatus;// 查询条件 用户状态
	private String filePic;// 将图片保存到工程里面
	private String[] file;// 图片上传 上传框的名字
	private String[] fileFileName;// 用于上传时候获取名字
	private String[] fileContentType;// 用于上传的时候获取文件类型
	private String filevisa;// 电子签章上传
	private String[] filevisaFileName;// 用于获取签章的名字
	private String[] filevisaContentType;// 用户获取签章的文件类型
	private String deptid;// 用于获取部门id
	private Departmentinfo departmentinfo;// 用户获取页面上的部门信息
	private String loginname;
	private String entname;//所属单位
	private String depid;// 这里是分管部门的id
	private String depatnames;// 分管部门的名称
	// =========begin=====wjy================
	private String userid;// 提供一个属性id userid~~以保存用户信息的时候，同时往人员里面添加一条记录——wjy
	@Autowired
	private EmployeeinfoManager employeeinfoManager;
	@Autowired
	private CertificateinfoManager certificateinfoManager;

	private String encodeDateJPG;
	private String encodeDateJPGPic;

	/**
	 * 
	 * 查询出列表页面上所有的数据 以及条件查询
	 */

	public String toList() {

		// 当前第几页
		int intPage = Integer.parseInt((page == null || page == "0") ? "1"
				: page);
		// 每页多少行
		int maxIndex = Integer.parseInt((rows == null || rows == "0") ? "20"
				: rows);
		// 开始页
		int startIndex = (intPage - 1) * maxIndex;

		StringBuilder whereSB = new StringBuilder();
		List<Object> params = new ArrayList<Object>();
		LinkedHashMap<String, String> orderby = new LinkedHashMap<String, String>();
//		orderby.put("departmentinfo.deptid", "asc");
		orderby.put("userid", "asc");
		SearchUtil.getStringSearch(whereSB, params, "realname", "like",
				this.realname);
		SearchUtil.getStringSearch(whereSB, params, "userstatus", "=",
				this.userstatus);
		SearchUtil.getStringSearch(whereSB, params, "entid.enaname",
				"like", this.entname);
		// ============================2：原生实体SQL==============================="
		QueryResult<Userinfo> q;
		try {
			q = userInfoService.getQueryResult(startIndex, maxIndex, whereSB
					.toString(), params.toArray(), orderby);
			;// .getResultlist();
			// 总条数
			long total = q.getTotalrecord();
			List<Map<String, Object>> rowslist = new ArrayList<Map<String, Object>>();
			// QueryResult里封装的list
			List<Userinfo> userList = q.getResultlist();
			for (Userinfo userinfo : userList) {
				// 列表要显示的字段及值
				Map<String, Object> map = new HashMap<String, Object>();
				map.put("userid", userinfo.getUserid());
				map.put("loginname", userinfo.getLoginname());
				map.put("realname", userinfo.getRealname());
				map.put("orderid", userinfo.getOrderid());
				map.put("sex", userinfo.getSex());
				if (userinfo.getEntid() != null
						&& !userinfo.getEntid().equals("")) {
					map.put("entname", userinfo.getEntid().getEntname());
				} else {
					map.put("entname", "");
				}
				map.put("userstatus", userinfo.getUserstatus());
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
	
	/**
	 * 进入企业单选页面
	 * */
	public String toEntpriseListPage() {
		return "toEntpriseListPage";
	}

	/**
	 * 单条数据停用
	 * 
	 * @throws Exception
	 */
	public String deleteOnlyOne() {
		try {
			// 通过id获取对象
			Userinfo userinfo = userInfoService.get(id);
			// 将一个状态变成0 停用时0 正常是1
			userinfo.setUserstatus("0");
			// 保存此用户
			userInfoService.saveorupadate(userinfo);

			// 向日志表中插入数据************开始
			SessionUser session = getSessionUser();
			String operatecontent = "停用了用户id为" + id + "的记录";
			systemlogManager.addSystemLog(session.getModule(), session
					.getUserid(), operatecontent);
			// **********************结束

			sendMsg("success");

		} catch (IOException e) {
			e.printStackTrace();
		}
		return null;
	}
	/**
	 * 根据部门信息获取人员信息
	 */
	public void getUserBydept(){
		String deptid = getRequest().getParameter("deptid");
		try {
			getResponse().setContentType("text/html");
			StrutsAction.getResponse().getWriter().write(
					userInfoService.getAllUserByDepart(deptid));
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	/**
	 * 获取人员信息
	 */
	public void getUser(){
		try {
			List<Userinfo> users = userInfoService.getList();
			List<Map<String,Object>> rowLists = new ArrayList<Map<String,Object>>();
			for(Userinfo user:users){
				Map<String,Object> map = new HashMap<String, Object>();
				map.put("userid", user.getUserid());
				map.put("realname", user.getRealname()==null?"":user.getRealname());
				rowLists.add(map);
			}
			String json = JSONArray.fromObject(rowLists).toString();
			getResponse().getWriter().write(json);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	/**
	 * 批量删除
	 */
	public void deleteAll() {
		try {
			SessionUser session = getSessionUser();
			//userInfoService.deleteAll(uids, session);
			//employeeinfoManager.deleteAll(uids);// 删除的时候同时将人员表里的信息进行删除----wjy
			sendMsg("success");
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	/**
	 * 重写doInputEntity()方法 在进入添加和修改页面的时候将部门表中的内容全部查出
	 */
	@Override
	protected void doInputEntity() throws Exception {
		try {
			depatnames = "";
			depid = entity.getManagedepts();
			String depatOne = "";
			if (depid != null) {
				String[] manage = depid.split(",");
				for (int i = 0; i < manage.length; i++) {
					departmentinfo = departmentinfoService.getByID(manage[i]);
					if (departmentinfo != null) {
						if (depatnames.equals("")) {
							depatnames = departmentinfo.getDeptname();
						} else {
							depatnames = depatnames + ","
									+ departmentinfo.getDeptname();
						}
					}
				}
			}
//			String photo = entity.getPhoto();
//			if (photo != null && !("").equals(photo)) {
//				String path = getRequest().getSession().getServletContext()
//						.getRealPath(photo);
//				File str_File = new File(path);
//				if (!str_File.exists()) {
//					entity.setPhoto("");
//				}
//			}
//			listDepar = departmentinfoService.getAll();
//			// 电子签章的展示~~begin~~~
//			if (entity.getSignpicture() != null
//					&& !("").equals(entity.getSignpicture())) {
//				lenPic = 1;
//			}
		} catch (Exception e) {
			e.printStackTrace();
		}

	}

	/**
	 * 重写doViewEntity()方法 在详情的时候将部门表中的内容全部查出
	 */
	@Override
	protected void doViewEntity() throws Exception {
		entname = entity.getEntid().getEntname();
		depatnames = "";
		depid = entity.getManagedepts();
		String depatOne = "";
		if (depid != null) {
			String[] manage = depid.split(",");
			for (int i = 0; i < manage.length; i++) {
				departmentinfo = departmentinfoService.getByID(manage[i]);
				if (depatnames.equals("")) {
					depatnames = departmentinfo.getDeptname();
				} else {
					depatnames = depatnames + ","
							+ departmentinfo.getDeptname();
				}
			}
		}
		// 获取头像
		String photo = entity.getPhoto();
		if (photo != null && !("").equals(photo)) {
			String path = getRequest().getSession().getServletContext()
					.getRealPath(photo);
			File str_File = new File(path);
			if (!str_File.exists()) {
				entity.setPhoto("");
			}
		}
		// 获取电子签章
		if (entity.getSignpicture() != null
				&& !("").equals(entity.getSignpicture())) {
			lenPic = 1;
		}

		listDepar = departmentinfoService.getAll();
	}

	/**
	 * 
	 * 去往list页面
	 */
	public String list() {
		listDepar = departmentinfoService.getAll();
		return "list";
	}

	/**
	 * 验证登录名是否重复
	 * 
	 * @return
	 * @throws Exception
	 */
	public String validateLoginName() throws Exception {
		List<Userinfo> listuser = userInfoService.validateLoginName(
				"loginname", loginname);
		// System.out.println();
		if (listuser.size() > 0) {
			sendMsg("success");
		}
		return null;
	}

	/**
	 * 保存
	 */
	@Override
	public String save() throws Exception {
		String uuid = entity.getUserid();
		String fileorclname = "";
		byte buffer2[] = null;
		// 判断id是否为空以判断是增加还是修改
		if (uuid == null || "".equals(uuid)) {
			if (loginname != null && !loginname.equals("")) {
				List<Userinfo> listuser = userInfoService.validateLoginName(
						"loginname", loginname);
				if (listuser.size() > 0) {
					sendMsg("fail");
				} else {
//					// 上传照片
//					fileorclname = upload();
//					// 上传电子签章
//					if (null != filevisa && filevisa.length() > 0) {/*
//																	 * File f =
//																	 * new
//																	 * File(filevisa
//																	 * );
//																	 * FileInputStream
//																	 * fin = new
//																	 * FileInputStream
//																	 * (f);
//																	 * entity.
//																	 * setSignpicture
//																	 * (
//																	 * Hibernate
//																	 * .
//																	 * createBlob
//																	 * (fin));
//																	 */
//
//						// ==== 上传电子签章的修改~~~~wjy
//						// ~~此处是将该图片的前缀与后缀拆开，而后重新拼接成截取后的工程中的图片
//						String ext = "";
//						if (null != filevisaFileName[0]
//								&& !"".equals(filevisaFileName[0])) {
//							filename = filevisaFileName[0].substring(0,
//									filevisaFileName[0].lastIndexOf("."));
//							ext = filevisaFileName[0]
//									.substring(filevisaFileName[0]
//											.lastIndexOf("."));
//						}
//						byte buffer[] = new byte[1024];
//						// 此处是从工程中读取所截取的图片~~~begin~~~~
//						// 此处是从工程中读取所截取的图片~~~begin~~~~
//						String filenamePic = encodeDateJPG.substring(
//								encodeDateJPG.lastIndexOf("/"), encodeDateJPG
//										.length());
//						filenamePic = filenamePic.substring(4, filenamePic
//								.length());
//						String realPath = getRequest().getSession()
//								.getServletContext().getRealPath(
//										"/lims/tempUserPic/NewSin"
//												+ filenamePic);// 读取照片的路径 Pic
//						File f = new File(realPath);
//						FileInputStream fin = new FileInputStream(f);
//						entity.setSignpicture(Hibernate.createBlob(fin));
//						// 此时可以讲图片从工程的文件路径中删除~~~begin~~~
//						/*
//						 * if(f.exists()) { f.delete(); }
//						 */
//						// 此时可以讲图片从工程的文件路径中删除！~~~~end~~~
//						// ====
//					}
					String did = userInfoService.getSequence("SEQ_USER");
					entity.setUserid(did);
					entity.setUserstatus("1");
					entity.setPhoto(fileorclname);
					Date date1 = new Date();
//					entity.setManagedepts(depid);
					entity.setCreatetime(date1);
//					Departmentinfo departmentinfo2 = departmentinfoService
//							.getByID(deptid);
//					entity.setDepartmentinfo(departmentinfo2);
					userInfoService.saveorupadate(entity);

					// 向日志表中插入数据************开始
					SessionUser session = getSessionUser();
					String operatecontent = "增加了用户id为" + did + "的记录";
					systemlogManager.addSystemLog(session.getModule(), session
							.getUserid(), operatecontent);
					// **********************结束

					sendMsg("success");

				}
			}
		} else {
			if (file != null) {
				fileorclname = upload();
				entity.setPhoto(fileorclname);
			}
			try {
				// 上传电子签章
//				if (null != filevisa && filevisa.length() > 0) {
//					// ==== 上传电子签章的修改~~~~wjy ~~此处是将该图片的前缀与后缀拆开，而后重新拼接成截取后的工程中的图片
//					String ext = "";
//					if (null != filevisaFileName[0]
//							&& !"".equals(filevisaFileName[0])) {
//						filename = filevisaFileName[0].substring(0,
//								filevisaFileName[0].lastIndexOf("."));
//						ext = filevisaFileName[0].substring(filevisaFileName[0]
//								.lastIndexOf("."));
//					}
//					byte buffer[] = new byte[1024];
//					// 此处是从工程中读取所截取的图片~~~begin~~~~
//					String filenamePic = encodeDateJPG.substring(encodeDateJPG
//							.lastIndexOf("/"), encodeDateJPG.length());
//					filenamePic = filenamePic
//							.substring(4, filenamePic.length());
//					String realPath = getRequest().getSession()
//							.getServletContext().getRealPath(
//									"/lims/tempUserPic/NewSin" + filenamePic);// 读取照片的路径
//																				// Pic
//					File f = new File(realPath);
//					FileInputStream fin = new FileInputStream(f);
//					entity.setSignpicture(Hibernate.createBlob(fin));
//					// ====
//				}
//				Departmentinfo departmentinfo2 = null;
//				if (deptid != null) {
//					departmentinfo2 = departmentinfoService.getByID(deptid);
////					entity.setDepartmentinfo(departmentinfo2);
//				}
//				if (depid != null) {
//					entity.setManagedepts(depid);
//				}
				userInfoService.saveorupadate(entity);

				// 向日志表中插入数据************开始
				SessionUser session = getSessionUser();
				String operatecontent = "修改了用户id为" + uuid + "的记录";
				systemlogManager.addSystemLog(session.getModule(), session
						.getUserid(), operatecontent);
				// **********************结束
			} catch (Exception e) {
			}
			sendMsg("success");
		}
		return null;
	}

	/**
	 * 获取电子签章
	 */
	public void getBlobPic() {
		try {
			Userinfo userinfo = userInfoService.get(id);
			Blob signpicture = userinfo.getSignpicture();
			if (signpicture != null) {
				InputStream in;
				in = signpicture.getBinaryStream();
				getResponse().setContentType("image/jpeg");
				OutputStream out = getResponse().getOutputStream();
				byte[] buf = new byte[1024];
				int len;
				while ((len = in.read(buf)) != -1) {
					out.write(buf, 0, len);
				}
				in.close();
				out.close();
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	/**
	 * 上传文件，从系统中读取所截取的文件~~author~~wjy
	 * 
	 * @return
	 * @throws Exception
	 */
	public String upload() throws Exception {
		String filename = "";
		String fileorclnames = "";
		String ext = "";
		Date date = new Date();
		if (file != null) {
			for (int i = 0; i < file.length; i++) {
				if (null != fileFileName[i] && !"".equals(fileFileName[i])) {
			        filename = fileFileName[i].substring(0, fileFileName[i].lastIndexOf("."));
			        ext = fileFileName[i].substring(fileFileName[i].lastIndexOf("."));
				}
				String newfilename = date.getTime() + filename + ext;
				String filenamePic = encodeDateJPGPic.substring(encodeDateJPGPic.lastIndexOf("/"), encodeDateJPGPic.length());
				filenamePic = filenamePic.substring(4, filenamePic.length());
				//此处是问题的症结，如果文件夹不存在呢？(bug)
				String savePath = getRequest().getSession().getServletContext().getRealPath("/lims/uploadFiles");
				File file1 = new File(savePath);
				if(!file1.exists()){
					file1.mkdirs();
				}
				File filea = new File(getRequest().getSession().getServletContext().getRealPath("/lims/uploadFiles/" + filenamePic));

				fileorclnames = "lims/uploadFiles/" + filenamePic;
				byte buffer[] = new byte[1024];
				// 此处是从工程中读取所截取的图片~~~begin~~~~

				String realPath = getRequest().getSession().getServletContext().getRealPath("/lims/tempUserPic/NewPic" + filenamePic);// 读取照片的路径
																				// Pic
				InputStream is = new FileInputStream(realPath);// 此处是读取工程中的路径
				// InputStream is = new FileInputStream(file[i]);//此处是原来读流的文件路径

					FileOutputStream output = new FileOutputStream(filea);
					int bytesRead = 0;
					while ((bytesRead = is.read(buffer, 0, 1024)) != -1) {
						output.write(buffer, 0, bytesRead);
					}
					output.close();
		
				is.close();
			}
		}// file!=null结束
		return fileorclnames;
	}

	/**
	 * 上传 ~~此处是刘欢写的原来的，读取给的绝对路径的文件
	 * 
	 * @throws Exception
	 */

	/**
	 * public String upload() throws Exception{ String filename=""; String
	 * fileorclnames=""; String ext=""; Date date=new Date(); if(file!=null){
	 * for (int i = 0; i < file.length; i++) { if(null!= fileFileName[i] &&
	 * !"".equals(fileFileName[i]) ){ filename = fileFileName[i].substring(0,
	 * fileFileName[i].lastIndexOf("."));
	 * ext=fileFileName[i].substring(fileFileName[i].lastIndexOf(".")); } String
	 * newfilename =date.getTime()+filename+ext; File filea = new
	 * File(getRequest
	 * ().getSession().getServletContext().getRealPath("/lims/uploadFiles/"
	 * +newfilename)); fileorclnames="lims/uploadFiles/"+newfilename; byte
	 * buffer[]= new byte[1024]; InputStream is = new FileInputStream(file[i]);
	 * FileOutputStream output = new FileOutputStream(filea); int bytesRead=0;
	 * while((bytesRead=is.read(buffer,0,1024))!=-1){
	 * output.write(buffer,0,bytesRead); } output.close(); is.close(); }
	 * }//file!=null结束 return fileorclnames; }
	 */

	/**
	 * 上传图片，并将图片存到系统中
	 * 
	 * @throws Exception
	 */
	public void uploadPic() throws Exception {
		String ext = "";
		if (filePic != "") {// 
			// 保存图片~~~begin~~~~
			String unEncodeFilePic = filePic;
			filePic = java.net.URLDecoder.decode(filePic, "UTF-8");
			filename = filePic.substring(filePic.lastIndexOf("\\"), filePic
					.length());
			filename = filename.substring(1, filename.length());
			// 此处是解决图片传中文的问题，默认将图片保存为日期类型，存在后台，然后从后台进行获取非中文的字符，进行src传值。
			SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddhhmmss");
			Date datenow = new Date();
			String createTime = sdf.format(datenow);
			flagName = createTime + ".jpg";
			File filea = null;
			if (flag.equals("Pic")) {// 保存照片
				filea = new File(getRequest().getSession().getServletContext()
						.getRealPath("/lims/tempUserPic/Pic" + flagName));
			} else {// 保存电子签章
				filea = new File(getRequest().getSession().getServletContext()
						.getRealPath("/lims/tempUserPic/Sin" + flagName));
			}// filecSin
			byte buffer[] = new byte[1024];

			InputStream iss = null;
			if (flag.equals("Pic")) {// 保存照片
				if (file != null) {
					for (int i = 0; i < file.length; i++) {
						iss = new FileInputStream(file[i]);// 此处是照片的name属性传值

					}
				}// 照片的和电子签章的input都在userinfo-input里面。
				// 现在主要是想让这里可以传过来值，然后用别人电脑访问这个电脑可以传照片
			} else {// 保存电子签章
				iss = new FileInputStream(filevisa);// 此处是电子签章的name属性传值
			}
			// InputStream iss = new FileInputStream(filePic);
			FileOutputStream output = new FileOutputStream(filea);
			int bytesRead = 0;
			while ((bytesRead = iss.read(buffer, 0, 1024)) != -1) {
				output.write(buffer, 0, bytesRead);
			}
			output.close();
			iss.close();
			// 保存图片~~~end~~~~
			/*
			 * 此处是返回图片流 FileInputStream is = new FileInputStream(filePic); int i
			 * = is.available(); // 得到文件大小 byte data[] = new byte[i];
			 * is.read(data); // 读数据 is.close();
			 * getResponse().setContentType("image/jpeg");// 设置返回的文件类型
			 * OutputStream toClient = getResponse().getOutputStream(); //
			 * 得到向客户端输出二进制数据的对象 toClient.write(data); // 输出数据 toClient.close();
			 */
		}
		sendMsg("success" + "#" + flagName);

	}

	/**
	 * 上传图片，并将图片存到系统中
	 * 
	 * @throws Exception
	 */
	public String uploadPicIF() throws Exception {
		flagName = flagName;
		return "uploadPic";
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

	public Departmentinfo getDepartmentinfo() {
		return departmentinfo;
	}

	public void setDepartmentinfo(Departmentinfo departmentinfo) {
		this.departmentinfo = departmentinfo;
	}

	public void setPage(String page) {
		this.page = page;
	}

	public String getRealname() {
		return realname;
	}

	public void setRealname(String realname) {
		this.realname = realname;
	}

	public String getUserstatus() {
		return userstatus;
	}

	public void setUserstatus(String userstatus) {
		this.userstatus = userstatus;
	}

	public String getDeptid() {
		return deptid;
	}

	public void setDeptid(String deptid) {
		this.deptid = deptid;
	}

	public String[] getFile() {
		return file;
	}

	public void setFile(String[] file) {
		this.file = file;
	}

	public String[] getFileFileName() {
		return fileFileName;
	}

	public void setFileFileName(String[] fileFileName) {
		this.fileFileName = fileFileName;
	}

	public String[] getFileContentType() {
		return fileContentType;
	}

	public void setFileContentType(String[] fileContentType) {
		this.fileContentType = fileContentType;
	}

	public String getFilevisa() {
		return filevisa;
	}

	public void setFilevisa(String filevisa) {
		this.filevisa = filevisa;
	}

	public String[] getFilevisaFileName() {
		return filevisaFileName;
	}

	public void setFilevisaFileName(String[] filevisaFileName) {
		this.filevisaFileName = filevisaFileName;
	}

	public String[] getFilevisaContentType() {
		return filevisaContentType;
	}

	public void setFilevisaContentType(String[] filevisaContentType) {
		this.filevisaContentType = filevisaContentType;
	}

	public String getLoginname() {
		return loginname;
	}

	public void setLoginname(String loginname) {
		this.loginname = loginname;
	}

	public String getUids() {
		return uids;
	}

	public void setUids(String uids) {
		this.uids = uids;
	}

	public List<Departmentinfo> getListDepar() {
		return listDepar;
	}

	public void setListDepar(List<Departmentinfo> listDepar) {
		this.listDepar = listDepar;
	}

	public String getDepatnames() {
		return depatnames;
	}

	public void setDepatnames(String depatnames) {
		this.depatnames = depatnames;
	}

	public CertificateinfoManager getCertificateinfoManager() {
		return certificateinfoManager;
	}

	public void setCertificateinfoManager(
			CertificateinfoManager certificateinfoManager) {
		this.certificateinfoManager = certificateinfoManager;
	}

	public EmployeeinfoManager getEmployeeinfoManager() {
		return employeeinfoManager;
	}

	public void setEmployeeinfoManager(EmployeeinfoManager employeeinfoManager) {
		this.employeeinfoManager = employeeinfoManager;
	}

	public String getUserid() {
		return userid;
	}

	public void setUserid(String userid) {
		this.userid = userid;
	}

	// =========end=====wjy================

	public String getDepid() {
		return depid;
	}

	public void setDepid(String depid) {
		this.depid = depid;
	}

	public int getLenPic() {
		return lenPic;
	}

	public void setLenPic(int lenPic) {
		this.lenPic = lenPic;
	}

	public String getFilePic() {
		return filePic;
	}

	public void setFilePic(String filePic) {
		this.filePic = filePic;
	}

	public String getFilename() {
		return filename;
	}

	public void setFilename(String filename) {
		this.filename = filename;
	}

	public String getFlag() {
		return flag;
	}

	public void setFlag(String flag) {
		this.flag = flag;
	}

	public String getEncodeDateJPG() {
		return encodeDateJPG;
	}

	public void setEncodeDateJPG(String encodeDateJPG) {
		this.encodeDateJPG = encodeDateJPG;
	}

	public String getEncodeDateJPGPic() {
		return encodeDateJPGPic;
	}

	public void setEncodeDateJPGPic(String encodeDateJPGPic) {
		this.encodeDateJPGPic = encodeDateJPGPic;
	}

	public String getEntname() {
		return entname;
	}

	public void setEntname(String entname) {
		this.entname = entname;
	}

}
