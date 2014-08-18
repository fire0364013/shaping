package com.beauty.biz.web.projects.attachment;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import net.sf.json.JSONArray;

import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.convention.annotation.Results;
import org.springframework.beans.factory.annotation.Autowired;

import com.opensymphony.xwork2.ActionContext;
import com.beauty.biz.entity.projects.Projectattachment;
import com.beauty.biz.entity.projects.ProjectattachmentVo;
import com.beauty.biz.entity.projects.Projectattachmenttype;
import com.beauty.biz.entity.projects.Projects;
import com.beauty.biz.service.projects.ProjectattachmentManager;
import com.beauty.biz.service.projects.ProjectattachmenttypeManager;
import com.beauty.biz.service.projects.ProjectsManager;
import com.beauty.common.page.QueryResult;
import com.beauty.common.utils.SearchUtil;
import com.beauty.common.utils.SessionUser;
import com.beauty.common.web.StrutsAction;
/**
 * 项目附件
 * @author wjy
 *
 */
@Results({
	@Result(name="input",location="attachment-input.jsp"),
	@Result(name="list",location="attachment-list.jsp"),
	@Result(name="noadd",location="attachment-noadd.jsp"),
	@Result(name="listItem",location="attachment-list_item.jsp")
})
public class ProjectattachmentAction extends StrutsAction<Projectattachment>{
	private static final long serialVersionUID = 1L;
	private String page;//页面
	private String rows;//行数.
	private String projectid;//项目编号
	private File[] file;// 上传的名字
	private String[] fileFileName;// 用于上传时候获取名字
	private String[] fileContentType;// 用于上传的时候获取文件类型
	
	private String attachmenttypeid;//附件类型id
	private String attachmentname;// 附件名称
	private List<Projectattachmenttype> attaTypeList;//用于项目附件类型的下拉框
	private String attfilname;//删除附件的时候，要将磁盘里面的附件文件也删除
	private String remark;
	
	@Autowired
	private ProjectattachmentManager projectattachmentManager;//项目附件
	
	@Autowired
	private ProjectattachmenttypeManager ProjectattachmenttypeManager;//项目附件类型
	
	@Autowired
	private ProjectsManager rojectsManager;//项目类型


	@Override
	public String input() throws Exception {
		attaTypeList=ProjectattachmenttypeManager.getAll();//项目附件的下拉框
		return "input";
	}

	
	/**
	 * 进入list的展示页面
	 */
	public String noadd() throws Exception {
		attaTypeList=ProjectattachmenttypeManager.getAll();//项目附件的下拉框
		return "noadd";
	}
	
	
	/**
	 * 进入list的展示页面
	 */
	@Override
	public String list() throws Exception {
		this.projectid=this.id;
		attaTypeList=ProjectattachmenttypeManager.getAll();//项目附件的下拉框
		return "list";
	}
	/**
	 * 进入list的展示页面
	 */
	public String listItem() throws Exception {
		this.projectid=this.id;
		attaTypeList=ProjectattachmenttypeManager.getAll();//项目附件的下拉框
		return "listItem";
	}
	
	/**
	 * 加载列表信息
	 * @return
	 * @throws Exception
	 */
	public String toAtt()throws Exception{
		//当前第几页
		int intPage = Integer.parseInt((page ==null || page =="0") ? "1":page);
		//每页多少行
		int maxIndex = Integer.parseInt((rows==null || rows=="0") ? "20":rows);
		//开始页
		int startIndex = (intPage-1)*maxIndex;
		StringBuilder whereSB = new StringBuilder();
		List<Object> params = new ArrayList<Object>();
		LinkedHashMap<String, String> orderby = new LinkedHashMap<String, String>();
		orderby.put("attachmentid", "asc");
		if(projectid.equals("")){
			long total = 0;
			List<Map<String,Object>> rowslist = new ArrayList<Map<String,Object>>();
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("total", total);// jquery easyui 需要的总记录数
			map.put("rows", rowslist);// jquery easyui 需要的结果集
			String first = JSONArray.fromObject(map).toString();//
			String jsonString = first.substring(1, first.length() - 1);// 去掉“[”和“]”
			getResponse().getWriter().write(jsonString);
		}else{
		SearchUtil.getStringSearch(whereSB, params, "projects.projectcode","=", this.projectid);
		SearchUtil.getStringSearch(whereSB, params, "attachmentname","like", this.attachmentname);
		SearchUtil.getStringSearch(whereSB, params, "projectattachmenttype.attachmenttypeid","=", this.attachmenttypeid);
		
		QueryResult<Projectattachment> q;
		try {
			q   =  projectattachmentManager.getQueryResult(startIndex, maxIndex, whereSB.toString(), params.toArray(), orderby);
		//总条数
		long total = q.getTotalrecord();
		List<Map<String,Object>> rowslist = new ArrayList<Map<String,Object>>();
		//QueryResult里封装的list
		List<Projectattachment> attList = q.getResultlist();
		for(Projectattachment att : attList){
			//列表要显示的字段及值
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("attachmentid", att.getAttachmentid());//主键id
			map.put("attachmentname", att.getAttachmentname());////附件名称
			map.put("attachmenttype", att.getProjectattachmenttype().getAttachmenttypename());////附件类型
			map.put("uploadperson", att.getUploadperson());//上传人
			if(att.getUploadtime()!=null){
				map.put("uploadtime",att.getUploadtime().toString());//上传时间
			}
			map.put("attachment", att.getAttachment());//附件
			rowslist.add(map);
		}
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("total", total);// jquery easyui 需要的总记录数
		map.put("rows", rowslist);// jquery easyui 需要的结果集
		String first = JSONArray.fromObject(map).toString();//
		String jsonString = first.substring(1, first.length() - 1);// 去掉“[”和“]”
		getResponse().getWriter().write(jsonString);
		} catch (Exception e) {
		}
		}
		return null;	
	}

	/**
	 * 加载列表信息
	 * @return
	 * @throws Exception
	 */
	public String toList()throws Exception{
		//当前第几页
		int intPage = Integer.parseInt((page ==null || page =="0") ? "1":page);
		//每页多少行
		int maxIndex = Integer.parseInt((rows==null || rows=="0") ? "20":rows);
		//开始页
		int startIndex = (intPage-1)*maxIndex;
		StringBuilder whereSB = new StringBuilder();
		List<Object> params = new ArrayList<Object>();
		LinkedHashMap<String, String> orderby = new LinkedHashMap<String, String>();
		orderby.put("attachmentid", "asc");
		if(projectid.equals("")){
			long total = 0;
			List<Map<String,Object>> rowslist = new ArrayList<Map<String,Object>>();
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("total", total);// jquery easyui 需要的总记录数
			map.put("rows", rowslist);// jquery easyui 需要的结果集
			String first = JSONArray.fromObject(map).toString();//
			String jsonString = first.substring(1, first.length() - 1);// 去掉“[”和“]”
			getResponse().getWriter().write(jsonString);
		}else{
		SearchUtil.getStringSearch(whereSB, params, "projectid","=", this.projectid);
		SearchUtil.getStringSearch(whereSB, params, "attachmentname","like", this.attachmentname);
		SearchUtil.getStringSearch(whereSB, params, "projectattachmenttype.attachmenttypeid","=", this.attachmenttypeid);
		
		QueryResult<ProjectattachmentVo> q;
		try {
			q   =  projectattachmentManager.getQueryResult1(startIndex, maxIndex, whereSB.toString(), params.toArray(), orderby);
		//总条数
		long total = q.getTotalrecord();
		List<Map<String,Object>> rowslist = new ArrayList<Map<String,Object>>();
		//QueryResult里封装的list
		List<ProjectattachmentVo> attList = q.getResultlist();
		for(ProjectattachmentVo att : attList){
			//列表要显示的字段及值
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("attachmentid", att.getAttachmentid());//主键id
			map.put("attachmentname", att.getAttachmentname());////附件名称
			map.put("uploadperson", att.getUploadperson());//上传人
			if(att.getUploadtime()!=null){
				map.put("uploadtime",att.getUploadtime().toString());//上传时间
			}
			map.put("attachment", att.getAttachment());//附件
			rowslist.add(map);
		}
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("total", total);// jquery easyui 需要的总记录数
		map.put("rows", rowslist);// jquery easyui 需要的结果集
		String first = JSONArray.fromObject(map).toString();//
		String jsonString = first.substring(1, first.length() - 1);// 去掉“[”和“]”
		getResponse().getWriter().write(jsonString);
		} catch (Exception e) {
		}
		}
		return null;	
	}
	/**
	 * 保存项目信息~~
	 * 当前项目编号序列获得，附件类型传参  上传人呢session  时间  当前系统时间
	 */
	@Override
	public String save() throws Exception {
		Date date = new Date();
		String filename = "";
		String fileorclname = "";
		String ext = "";
			try {

				if (file != null) {
					for (int i = 0; i < file.length; i++) {

						if (null != fileFileName[i]&& !"".equals(fileFileName[i])) {
							filename = fileFileName[i].substring(0,fileFileName[i].lastIndexOf("."));
							ext = fileFileName[i].substring(fileFileName[i].lastIndexOf("."));
						}

						String newfilename = date.getTime() + filename + ext;// 在文件前加了当前系统时间
						if (fileorclname == null || fileorclname.equals("")) {
							fileorclname = newfilename;
						} else {
							fileorclname += "," + newfilename;
						}
						File filea = new File(getRequest().getSession().getServletContext().getRealPath("/lims/uploadFiles/"));
						if(!filea.exists()){
							filea.mkdirs();
						}
						
						filea = new File(getRequest().getSession().getServletContext().getRealPath("/lims/uploadFiles/" + newfilename));
						
						if(!filea.exists()){
							filea.createNewFile();
						}
						byte buffer[] = new byte[1024];
						InputStream is = new FileInputStream(file[i]);
						FileOutputStream output = new FileOutputStream(filea);
						int bytesRead = 0;
						while ((bytesRead = is.read(buffer, 0, 1024)) != -1) {
							output.write(buffer, 0, bytesRead);
						}
						output.close();

						is.close();
						entity.setAttachment(fileorclname);//保存附件
					}
				Projectattachmenttype  Projectattachmenttype= ProjectattachmenttypeManager.getProTypeById(attachmenttypeid);
				String[] projectcodes = projectid.split(",");
				for(String project:projectcodes){
					Projects projects = rojectsManager.getProjects(project);
					String	attachmentid = projectattachmentManager.getSeq("SEQ_PROJECTATTACHMENT");
					if (projects != null) {
						entity.setProjects(projects);//保存项目编号的实体
					}
					if (Projectattachmenttype != null) {
						entity.setProjectattachmenttype(Projectattachmenttype);//保存项目类型
					}
					entity.setAttachmentname(filename);
					entity.setAttachmentid(attachmentid);//序列获得的主键
					entity.setUploadtime(new Date());// 创建日期保存当前 日期
					ActionContext ac = ActionContext.getContext();
					SessionUser sessionUser = (SessionUser) ac.getSession().get("sessionUser");
					entity.setUploadperson(sessionUser.getRealname());// 创建人保存当前登录人
					projectattachmentManager.saveUpdate(entity);
					}
				}
				sendMsg("success");
			} catch (Exception e) {
				sendMsg("fail");
			}
		return null;
	}
	public String save2() throws Exception {
		Date date = new Date();
		String filename = "";
		String fileorclname = "";
		String ext = "";
		ProjectattachmentVo att = new ProjectattachmentVo();
			try {

				if (file != null) {
					for (int i = 0; i < file.length; i++) {

						if (null != fileFileName[i]&& !"".equals(fileFileName[i])) {
							filename = fileFileName[i].substring(0,fileFileName[i].lastIndexOf("."));
							ext = fileFileName[i].substring(fileFileName[i].lastIndexOf("."));
						}

						String newfilename = date.getTime() + filename + ext;// 在文件前加了当前系统时间
						if (fileorclname == null || fileorclname.equals("")) {
							fileorclname = newfilename;
						} else {
							fileorclname += "," + newfilename;
						}
						File filea = new File(getRequest().getSession().getServletContext().getRealPath("/lims/uploadFiles/"));
						if(!filea.exists()){
							filea.mkdirs();
						}
						
						filea = new File(getRequest().getSession().getServletContext().getRealPath("/lims/uploadFiles/" + newfilename));
						
						if(!filea.exists()){
							filea.createNewFile();
						}
						byte buffer[] = new byte[1024];
						InputStream is = new FileInputStream(file[i]);
						FileOutputStream output = new FileOutputStream(filea);
						int bytesRead = 0;
						while ((bytesRead = is.read(buffer, 0, 1024)) != -1) {
							output.write(buffer, 0, bytesRead);
						}
						output.close();

						is.close();
						att.setAttachment(fileorclname);//保存附件
					}
				
				Projectattachmenttype  Projectattachmenttype= ProjectattachmenttypeManager.getProTypeById(attachmenttypeid);
				String	attachmentid = projectattachmentManager.getSeq("SEQ_PROJECTATTACHMENT");
				att.setProjectid(projectid);//保存项目编号的实体
				if (Projectattachmenttype != null) {
					att.setProjectattachmenttype(Projectattachmenttype);//保存项目类型
				}
				att.setAttachmentid(attachmentid);//序列获得的主键
				att.setUploadtime(new Date());// 创建日期保存当前 日期
				ActionContext ac = ActionContext.getContext();
				SessionUser sessionUser = (SessionUser) ac.getSession().get("sessionUser");
				att.setUploadperson(sessionUser.getRealname());// 创建人保存当前登录人
				att.setAttachmentname(filename);
				att.setRemark(remark);
				projectattachmentManager.saveUpdate(att);
				}
				sendMsg("success");
			} catch (Exception e) {
				sendMsg("fail");
			}
		return null;
	}
	/**
	 * 批量删除的方法
	 * @throws IOException
	 */
	public void betchDelete() throws IOException  {
		try {
			projectattachmentManager.batchDelete(id);
			String[] attFil=attfilname.split(",");
			for(int i =0;i<attFil.length;i++){
				String path = getRequest().getSession().getServletContext().getRealPath("lims/uploadFiles/"+attFil[i]);
				File str_File = new File(path);
				if(str_File.exists())
				{
					str_File.delete();
				}
			}
			
			sendMsg("success");
		} catch (Exception e) {
			sendMsg("faild");
		}
		
	}
	
	//setter getter 开始
	
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

	public File[] getFile() {
		return file;
	}

	public void setFile(File[] file) {
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

	public String getAttachmenttypeid() {
		return attachmenttypeid;
	}

	public void setAttachmenttypeid(String attachmenttypeid) {
		this.attachmenttypeid = attachmenttypeid;
	}

	public String getAttachmentname() {
		return attachmentname;
	}

	public void setAttachmentname(String attachmentname) {
		this.attachmentname = attachmentname;
	}

	public List<Projectattachmenttype> getAttaTypeList() {
		return attaTypeList;
	}

	public void setAttaTypeList(List<Projectattachmenttype> attaTypeList) {
		this.attaTypeList = attaTypeList;
	}

	public String getProjectid() {
		return projectid;
	}

	public void setProjectid(String projectid) {
		this.projectid = projectid;
	}


	public String getAttfilname() {
		return attfilname;
	}


	public void setAttfilname(String attfilname) {
		this.attfilname = attfilname;
	}


	public String getRemark() {
		return remark;
	}


	public void setRemark(String remark) {
		this.remark = remark;
	}
	
}
