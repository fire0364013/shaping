package com.beauty.common.web;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.List;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;

import org.apache.struts2.ServletActionContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.w3c.dom.Document;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

import com.beauty.common.orm.hibernate3.HibernateDao;
import com.beauty.common.utils.ReflectUtils;
import com.beauty.common.utils.SessionUser;
import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionSupport;
import com.opensymphony.xwork2.ModelDriven;
import com.opensymphony.xwork2.Preparable;

/**
 * 扩展ActionSupport的泛型基类
 * <br />封装CRUD基本方法，可在子类进行覆盖重写
 * @author 
 * @param <T> 实体类型
 */
public class StrutsAction<T> extends ActionSupport implements ModelDriven<T>, Preparable{
	private static final long serialVersionUID = -524544777605899234L;
	protected String id; //实体类的主键ID
	protected  String flagName;//用于判断从数据库读出名字~当修改的时候，用于判断用于校验的那个属性不能重复的判定，详见：MethodAction
	protected  String equalsName;//用于向后台传所输入的名字
	protected Class<T> entityClass; //T的反射类型
	protected T entity; //T类型对象
	protected List<T> list; //页面列表list
	protected Logger logger = LoggerFactory.getLogger(StrutsAction.class); //日志记录
	public static final String RELOAD = "reload"; //重定向的返回字符串
	public static final String VIEW = "view"; //查看方法的返回字符串
	public static final String LIST = "list"; //列表方法的返回字符串
	public static final String REDIRECT = "redirect"; //重定向，@Result type属性对应的值
	public static final String REDIRECT_ACTION = "redirectAction"; //Action之间重定向，@Result type属性对应的值
	public static final String YQWXWORKFLOW = "WX_EQUIPMENT";//仪器维修工作流
	public static final String YQBFWORKFLOW = "BF_EQUIPMENT";//仪器报废工作流
	public static final String MATERIALPURCHASEWORKFLOW = "CG_MATERIALS";//物品采购工作流
	public static final String MONITORWORKFLOW = "JC_PROJECT";//监测任务工作流
	public static final int CERTIFICATE = 3;//上岗证过期时间
	@SuppressWarnings("unchecked")
	@Autowired
	@Qualifier("hibernateDao")
	protected HibernateDao hibernateDao;
	
	/**
	 * 在构造函数中利用反射机制获得参数T的具体类
	 */
	public StrutsAction(){
		this.entityClass = ReflectUtils.getClassGenricType(getClass());
	}
	
	/**
	 * Action的默认执行方法
	 */
	@Override
	public String execute() throws Exception{
		doListEntity();
		return SUCCESS;
	}
	
	/**
	 * 进入新增或修改页面
	 */
	@Override
	public String input() throws Exception{
		doInputEntity();
		return INPUT;
	}
	
	/**
	 * 进入查看页面
	 */
	public String view() throws Exception{
		doViewEntity();
		return VIEW;
	}

	/**
	 * 新增或修改
	 */
	public String save() throws Exception{
		doSaveEntity();
		return RELOAD;
	}
	
	/**
	 * 复制
	 */
	public String copy() throws Exception{
		doCopyEntity();
		return RELOAD;
	}
	
	/**
	 * 删除
	 */
	public String delete() throws Exception{
		doDeleteEntity();
		return RELOAD;
	}
	
	/**
	 * 下载
	 * @return
	 * @throws Exception
	 */
	public String downLoad() throws Exception{
		return downLoadImpl();
	}
	/**
	 * execute回调方法，处理进入主页面的相关逻辑，可在子类中覆盖此方法
	 */
	@SuppressWarnings("unchecked")
	protected void doListEntity() throws Exception{
		list = hibernateDao.getAll(entityClass);
	}
	
	/**
	 * input回调方法，处理进入新增或修改页面前的相关逻辑，可在子类中覆盖此方法
	 */
	protected void doInputEntity() throws Exception{}
	
	/**
	 * view回调方法，处理进入查看页面的相关逻辑，可在子类中覆盖此方法
	 */
	protected void doViewEntity() throws Exception{}
	
	/**
	 * copy回调方法，处理复制的相关逻辑，可在子类中覆盖此方法
	 */
	protected void doCopyEntity() throws Exception{}
	
	/**
	 * save回调方法，处理删除的相关逻辑，可在子类中覆盖此方法
	 */
	protected void doSaveEntity() throws Exception{
		try {
			hibernateDao.save(entity);
		}catch (Exception e) {
			logger.error(e.getMessage(), e);
		}
	}
	
	/**
	 * delete回调方法，处理删除相关逻辑，可在子类中覆盖此方法
	 */
	protected void doDeleteEntity() throws Exception{
		try {
			hibernateDao.delete(entityClass,id);
		}catch (Exception e) {
			logger.error(e.getMessage(), e);
		}
	}
	
	public void prepareInput() throws Exception {
		prepareEntity();
	}

	public void prepareSave() throws Exception {
		prepareEntity();
	}
	
	public void prepareView() throws Exception {
		prepareEntity();
	}
	
	public void prepareCopy() throws Exception {
		prepareEntity();
	}
	
	@SuppressWarnings("unchecked")
	protected void prepareEntity() throws Exception{
		if (null != id && !"".equals(id)) {
			entity = (T)hibernateDao.get(entityClass,id);
		} else {
			entity = entityClass.newInstance();
		}
	}
	
	/**
	 * 取得HttpSession函数
	 */
	public static HttpSession getSession() {
		return ServletActionContext.getRequest().getSession();
	}

	/**
	 * 取得HttpRequest函数.
	 */
	public static HttpServletRequest getRequest() {
		return ServletActionContext.getRequest();
	}

	/**
	 * 取得HttpResponse函数
	 */
	public static HttpServletResponse getResponse() {
		return ServletActionContext.getResponse();
	}
	
	
	/**
	 * ModelDriven接口定义的方法，返回实体对象
	 */
	public T getModel() {
		return entity;
	}
	
	/**
	 * 页面列表显示的list
	 */
	@SuppressWarnings("unchecked")
	public List getList() {
		return list;
	}
	
	/**
	 * 进入列表页面
	 */
	public String list() throws Exception{			
		return StrutsAction.LIST;
	}
	
	/**
	 * 获取页面传递的id值
	 * @param id 主键ID
	 */
	public void setId(String id) {
		this.id = id;
	}
	
	public String getId() {
		return id;
	}
	
	
	/**
	 * 名字不能相同的判断
	 * @return
	 */
	public String getFlagName() {
		return flagName;
	}

	public void setFlagName(String flagName) {
		this.flagName = flagName;
	}
	
	public String getEqualsName() {
		return equalsName;
	}

	public void setEqualsName(String equalsName) {
		this.equalsName = equalsName;
	}
	
	
	/**
	 * Preparable接口的方法，设置为空方法体是屏蔽它去拦截所有的方法
	 */
	public void prepare() throws Exception {}
	
	/**
	 * 向客户端的js发送字符串
	 * @param jsonStr 发送的内容
	 * @throws IOException
	 * */	
	public void sendMsg(String jsonStr)throws IOException{
		HttpServletResponse response = ServletActionContext.getResponse();
//		response.setCharacterEncoding("UTF-8");
//		response.reset();
		getResponse().setContentType("text/html");
		response.getWriter().write(jsonStr);
	}
	
	/**
	 * 获取当前用户
	 * */
	public SessionUser getSessionUser(){
		ActionContext ac = ActionContext.getContext();
		SessionUser sessionUser = (SessionUser)ac.getSession().get("sessionUser");
		return sessionUser;
	}
	/**
	 * 下载方法的实现
	 * @return
	 * @throws Exception
	 */
	public String downLoadImpl() throws Exception{
		BufferedInputStream bis =null;
		ServletOutputStream stream  =null;
		BufferedOutputStream bos =null;		
		//String fileSave=getRequest().getParameter("path");
		//fileSave = new String(fileSave.getBytes("iso-8859-1"),"utf-8");
		//fileSave = java.net.URLDecoder.decode(fileSave,"UTF-8");
		String fileSave=java.net.URLDecoder.decode(getRequest().getParameter("path"),"UTF-8");//保存的时候只获取文件的名字  转码解码的问题
		String flag=getRequest().getParameter("flg");//这个表示是用作判断是ajax调用还是form表单的提交
		if(flag==null){
			flag="1";
		}
		String fileName="lims/uploadFiles/"+fileSave;//path~此处为约定。页面传参的时候，就需要用到href='methodversion!downLoad.action?path=""
		try{
		getResponse().reset();
		getResponse().setContentType("application/x-msdownload");
		getResponse().addHeader("Content-Disposition", "attachment;filename=\""+new String(fileSave.substring(13).getBytes("GB2312"),"iso-8859-1")+"\"");
		
		String realPath = getRequest().getSession().getServletContext().getRealPath(fileName);
		bis = new BufferedInputStream(new FileInputStream(realPath));
			if ("0".equals(flag)) {
				sendMsg("success");
			} else {
				stream = getResponse().getOutputStream();
				bos = new BufferedOutputStream(stream);
				// getResponse().getWriter().write(stream);
				byte[] buff = new byte[20480];
				while (bis.read(buff, 0, buff.length) != -1) {
					bos.write(buff, 0, buff.length);
				}
				bos.flush();
		}
		}catch(Exception e){
			System.out.println("文件路径"+fileName+"找不到！");
			sendMsg("fail");
		}finally{
			if (bos!=null) {
				bos.close();
			}
			if (bis != null) {
				bis.close();
			}
		}
		return null;		
	}
	
	
	//解析xml
	public static String getSqlText(String nodeName,String fileName,String xmlId){
		String text = "";
		try{
			DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
			DocumentBuilder db = dbf.newDocumentBuilder();
			 File file= new File(fileName);
			Document document = db.parse(file);
		//	Document document = db.parse(fileName);
			NodeList nodes = document.getElementsByTagName(nodeName);
			
			for(int i=0;i<nodes.getLength();i++){
				NodeList childList = nodes.item(i).getChildNodes();
				for(int j=0;j<childList.getLength();j++){
					Node child = childList.item(j);
					if("id".toUpperCase().equals(child.getNodeName().toUpperCase())){
						String childIDStr = child.getTextContent();
						if(childIDStr.equals(xmlId)){
							for(int k=0;k<childList.getLength();k++){
								if("Text".toUpperCase().equals(childList.item(k).getNodeName().toUpperCase())){
									Node childText = 	nodes.item(i).getChildNodes().item(k);
									text =  childText.getTextContent();
									return text;
								}
							}
							
						}
					}else{
						continue;
					}
				}
			}
		}catch(Exception e){
		}
		return text;
	}

}
	

