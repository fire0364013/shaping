package com.beauty.biz.web.beauty.beautyinfo;

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

import com.beauty.biz.entity.beauty.Beautyinfo;
import com.beauty.biz.service.beauty.BeautyinfoManager;
import com.beauty.common.page.QueryResult;
import com.beauty.common.utils.EasyStr;
import com.beauty.common.utils.SearchUtil;
import com.beauty.common.utils.SessionUser;
import com.beauty.common.web.StrutsAction;
/**
 * 医美明细
 * @author bing
 *
 */
public class BeautyinfoAction extends StrutsAction<Beautyinfo>{
	private static final long serialVersionUID = 1L;
	private String page;//页面
	private String rows;//行数.
	private String beautyversionid;//医美版本
	private File[] file;// 上传的名字
	private String[] fileFileName;// 用于上传时候获取名字
	private String[] fileContentType;// 用于上传的时候获取文件类型

	private String infotitle;// 附件名称
	private String attfilname;//
	private String remark;
	
	@Autowired
	private BeautyinfoManager beautyinfoManager;//项目附件
	

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
		orderby.put("beautyinfoid", "desc");
		if(beautyversionid == null ||beautyversionid.equals("")){
			long total = 0;
			List<Map<String,Object>> rowslist = new ArrayList<Map<String,Object>>();
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("total", total);// jquery easyui 需要的总记录数
			map.put("rows", rowslist);// jquery easyui 需要的结果集
			String first = JSONArray.fromObject(map).toString();//
			String jsonString = first.substring(1, first.length() - 1);// 去掉“[”和“]”
			getResponse().getWriter().write(jsonString);
		}else{
		SearchUtil.getStringSearch(whereSB, params, "beautyversionid","=", this.beautyversionid);
		if(infotitle !=null &&!"".equals(infotitle)){
			SearchUtil.getStringSearch(whereSB, params, "infotitle","like", "%"+this.infotitle+"%");
		}
		
		SearchUtil.getStringSearch(whereSB, params, "validStatus","=", "1");
		QueryResult<Beautyinfo> q;
		try {
			q   =  beautyinfoManager.getQueryResult(startIndex, maxIndex, whereSB.toString(), params.toArray(), orderby);
		//总条数
		long total = q.getTotalrecord();
		List<Map<String,Object>> rowslist = new ArrayList<Map<String,Object>>();
		//QueryResult里封装的list
		List<Beautyinfo> attList = q.getResultlist();
		for(Beautyinfo att : attList){
			//列表要显示的字段及值
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("beautyinfoid", att.getBeautyinfoid());//主键id
			map.put("infotitle", att.getInfotitle()==null?"":att.getInfotitle());////附件名称
			map.put("uploadOperator", att.getUploadOperator());//上传人
			if(att.getUploadTime()!=null){
				map.put("uploadTime",EasyStr.getDate(att.getUploadTime()));//上传时间
			}
			map.put("infoPicUrl1", att.getInfoPicUrl1());//图片
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
						
					}
					entity.setInfoPicUrl1(fileorclname);//保存图片
					entity.setInfoPicUrl2(fileorclname);//保存图片
					entity.setInfoPicUrl3(fileorclname);//保存图片
					id = beautyinfoManager.getId();
					entity.setBeautyinfoid(id);//序列获得的主键
					entity.setUploadTime(new Date());// 创建日期保存当前 日期
					SessionUser sessionUser = getSessionUser();
					entity.setUploadOperator(sessionUser.getRealname());// 创建人保存当前登录人
					beautyinfoManager.save(entity);
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
				Beautyinfo beautyinfo = beautyinfoManager.getById(id);
				if(beautyinfo != null){
					beautyinfo.setValidStatus("0");
					beautyinfoManager.save(beautyinfo);
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
	public String getBeautyversionid() {
		return beautyversionid;
	}
	public void setBeautyversionid(String beautyversionid) {
		this.beautyversionid = beautyversionid;
	}
	public String getInfotitle() {
		return infotitle;
	}
	public void setInfotitle(String infotitle) {
		this.infotitle = infotitle;
	}
	
}
