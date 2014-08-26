package com.beauty.biz.web.beauty.advertinfo;

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

import org.springframework.beans.factory.annotation.Autowired;

import com.beauty.biz.entity.beautyinfo.Advertinfo;
import com.beauty.biz.service.beautyinfo.AdvertinfoManager;
import com.beauty.common.page.QueryResult;
import com.beauty.common.utils.EasyStr;
import com.beauty.common.utils.SearchUtil;
import com.beauty.common.utils.SessionUser;
import com.beauty.common.web.StrutsAction;

public class AdvertinfoAction extends StrutsAction<Advertinfo>{

	private static final long serialVersionUID = 1L;
	private String page;//页面
	private String rows;//行数.
	private File[] file;// 上传的名字
	private String[] fileFileName;// 用于上传时候获取名字
	private String[] fileContentType;// 用于上传的时候获取文件类型

	private String advertTitle;// 广告标题
	private String advertType;//广告类型
	private String attfilname;//
	private String remark;
	
	@Autowired
	private AdvertinfoManager advertinfoManager;//项目附件
	

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
		orderby.put("advertid", "desc");
		if(advertTitle !=null &&!"".equals(advertTitle)){
			SearchUtil.getStringSearch(whereSB, params, "advertTitle","like", "%"+this.advertTitle+"%");
		}
		if(advertType != null && !"".equals(advertType)){
			SearchUtil.getStringSearch(whereSB, params, "advertType","=", advertType);
		}
		
		SearchUtil.getStringSearch(whereSB, params, "validStatus","=", "1");
		QueryResult<Advertinfo> q;
		try {
			q   =  advertinfoManager.getQueryResult(startIndex, maxIndex, whereSB.toString(), params.toArray(), orderby);
		//总条数
		long total = q.getTotalrecord();
		List<Map<String,Object>> rowslist = new ArrayList<Map<String,Object>>();
		//QueryResult里封装的list
		List<Advertinfo> attList = q.getResultlist();
		for(Advertinfo att : attList){
			//列表要显示的字段及值
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("advertid", att.getAdvertid());//主键id
			map.put("entname", att.getEntprise().getEntname());
			map.put("advertType", att.getAdvertType()==null?"":att.getAdvertType());
			map.put("advertTitle", att.getAdvertTitle()==null?"":att.getAdvertTitle());////附件名称
			map.put("uploadOperator", att.getUploadOperator());//上传人
			if(att.getUploadTime()!=null){
				map.put("uploadTime",EasyStr.getDateYMD(att.getUploadTime()));//上传时间
			}
			map.put("advertPicUrl1", att.getAdvertPicUrl1());//图片
			map.put("releaseFlag", (att.getReleaseFlag()!=null && att.getReleaseFlag().equals("1"))?"发布":"没发布");//图片
			if(att.getReleaseTime()!=null){
			    map.put("releaseTime", EasyStr.getDateYMD(att.getReleaseTime()));//图片
			}
			rowslist.add(map);
		}
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("total", total);// jquery easyui 需要的总记录数
		map.put("rows", rowslist);// jquery easyui 需要的结果集
		String first = JSONArray.fromObject(map).toString();//
		String jsonString = first.substring(1, first.length() - 1);// 去掉“[”和“]”
		getResponse().getWriter().write(jsonString);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;	
	}
	
	public void doInputEntity() throws Exception{
		String entid = getSessionUser().getEntid();
		String entname = getSessionUser().getEntname();
		getRequest().setAttribute("entid", entid);
		getRequest().setAttribute("entname", entname);
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
						
					}
					entity.setAdvertPicUrl1(fileorclname);//保存图片
					entity.setAdvertPicUrl2(fileorclname);//保存图片
					entity.setAdvertPicUrl3(fileorclname);//保存图片
					id = advertinfoManager.getId();
					entity.setAdvertid(id);//序列获得的主键
					entity.setUploadTime(new Date());// 创建日期保存当前 日期
					SessionUser sessionUser = getSessionUser();
					entity.setUploadOperator(sessionUser.getRealname());// 创建人保存当前登录人
					advertinfoManager.save(entity);
					}
				sendMsg("success");
			} catch (Exception e) {
				e.printStackTrace();
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
			String[] ids = id.split(",");
			for(String id:ids){
				Advertinfo advertinfo = advertinfoManager.getById(id);
				if(advertinfo != null){
					advertinfo.setValidStatus("0");
					advertinfoManager.save(advertinfo);
				}
			}
			
//			String[] attFil=attfilname.split(",");
//			for(int i =0;i<attFil.length;i++){
//				String path = getRequest().getSession().getServletContext().getRealPath("lims/uploadFiles/"+attFil[i]);
//				File str_File = new File(path);
//				if(str_File.exists())
//				{
//					str_File.delete();
//				}
//			}
			
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
	public String getAdvertTitle() {
		return advertTitle;
	}
	public void setAdvertTitle(String advertTitle) {
		this.advertTitle = advertTitle;
	}
	public String getAdvertType() {
		return advertType;
	}
	public void setAdvertType(String advertType) {
		this.advertType = advertType;
	}
	
}
