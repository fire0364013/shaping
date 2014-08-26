package com.beauty.biz.web;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.struts2.ServletActionContext;
import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.convention.annotation.Results;
import org.springframework.beans.factory.annotation.Autowired;

import com.beauty.biz.entity.Module;
import com.beauty.biz.entity.Userinfo;
import com.beauty.biz.service.ModuleManager;
import com.beauty.biz.service.SystemlogManager;
import com.beauty.biz.service.UserInfoManager;
import com.beauty.common.utils.SessionUser;
import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionSupport;
import com.opensymphony.xwork2.Preparable;

/**
 * 登录页面
 * 
 * @author
 */
@Results( {
		@Result(name = "welcome", location = "login.jsp"),
		@Result(name = "index", location = "adbp.jsp"),
		@Result(name = "background", location = "index-background.jsp"),
		@Result(name = LoginAction.SUCCESS, location = "login.jsp"),
		@Result(name = "leftMenu", location = "leftmenu.jsp"),// ,params={"list","${list"}
		@Result(name = "editPassword", location = "password-input.jsp"),
		@Result(name = "reload", location = "index.jsp") // ,type="redirect")
// @Result(name="error",location="error.jsp")
})
public class LoginAction extends ActionSupport implements Preparable {
	private static final long serialVersionUID = 7426884192651468542L;

	private List<Module> list = new ArrayList<Module>(); // 页面列表list

	@Autowired
	private UserInfoManager userInfoManager;
	@Autowired
	private ModuleManager moduleManager;
	@Autowired
	private SystemlogManager systemlogManager;

	private String loginname;
	private String password;
	private String json;

	public String welcome() {
		return "welcome";
	}

	// /**
	// * 登录:原始登录方法
	// * @throws Exception
	// * */
	// public String login() throws Exception{
	// Userinfo user = userInfoManager.getUserinfo(loginname,password);
	// if(user!=null){
	// ActionContext ac = ActionContext.getContext();
	// SessionUser sessionUser = new
	// SessionUser(user.getUserid(),user.getLoginname(),user.getPassword(),user.getRealname());
	// ac.getSession().put("sessionUser", sessionUser);
	// return "index";
	// }else{
	// HttpServletRequest request = ServletActionContext.getRequest();
	// request.setAttribute("msg", "用户名或密码错误！");
	// // addActionError("用户名或密码错误！");
	// return LoginAction.SUCCESS;
	// // }
	//		
	// }

	public String editPassword() {
		return "editPassword";
	}

	public void savePassword() throws IOException {
		ActionContext ac = ActionContext.getContext();
		SessionUser sessionUser = (SessionUser) ac.getSession().get(
				"sessionUser");
		// HttpServletRequest request = ServletActionContext.getRequest();
		// String password1 = request.getParameter("password1");

		// if(null != password1 && null!=sessionUser.getPassword() &&
		// !password1.equals(sessionUser.getPassword())){
		// // addActionError("原密码输入错误！");
		// request.setAttribute("msg", "原密码输入错误！");
		// }else{
		// Userinfo userinfo =
		// userInfoManager.getUserInfo(sessionUser.getUserid());
		//			
		// userinfo.setPassword(password);
		// userInfoManager.save(userinfo);
		// sessionUser.setPassword(userinfo.getPassword());
		// ac.getSession().put("sessionUser", sessionUser);
		// // addActionMessage("密码修改成功");
		// request.setAttribute("msg", "密码修改成功！");
		// }

		// return "reload";
		try {

			JSONObject jsonObj = JSONObject.fromObject(json);
			String password1 = jsonObj.getString("password1");
			String password = jsonObj.getString("password");
			if (null != password1 && null != sessionUser.getPassword()
					&& !password1.equals(sessionUser.getPassword())) {
				json = "{\"success\":\"0\",\"msg\":\"原密码输入不正确!\"}";
			} else {
				Userinfo userinfo = userInfoManager.getUserInfo(sessionUser
						.getUserid());

				userinfo.setPassword(password);
				userInfoManager.save(userinfo);
				sessionUser.setPassword(userinfo.getPassword());
				// ac.getSession().put("sessionUser", sessionUser);
				json = "{\"success\":\"1\",\"msg\":\"密码修改成功!\"}";
			}
			sendMsg(json);
		} catch (Exception e) {
			e.getMessage();
		}

	}

	public String leftMenu() {
		ActionContext ac = ActionContext.getContext();
		SessionUser sessionUser = (SessionUser) ac.getSession().get(
				"sessionUser");
		list = sessionUser.getModuleList();// moduleManager.getModulesForMenu(sessionUser.getUserid());
		return "leftMenu";
	}

	// 将当前访问的模块放到session中,供系统日志维护时用
	public void setModuleToSession() {
		ActionContext ac = ActionContext.getContext();
		SessionUser sessionUser = (SessionUser) ac.getSession().get(
				"sessionUser");
		Module module = moduleManager.getModule(ServletActionContext
				.getRequest().getParameter("moduleid"));
		sessionUser.setModule(module);
	}

	/**
	 * 页面列表显示的list
	 */
	public List<Module> getList() {
		return list;
	}

	// public static void/*List<Module>*/ getSubModule(List<Module> list,Module
	// module){
	// List<Module> list2 = null;
	// if(null != list){
	// list2 =new ArrayList<Module>();
	// for(Module module2 : list){
	// if(Integer.parseInt(module2.getParentmoduleid()) ==
	// module.getModuleid()){
	// list2.add(module2);
	// System.out.println("子节点："+module2.getModuleid()+"___"+module2.getModulename());
	// }
	// }
	// }
	// //return list;
	// }

	/**
	 * 登录:校验成功后直接定向到首页面
	 * 
	 * @throws Exception
	 * */
	public String login() throws Exception {
		return "index";
	}

	public String background() {
		return "background";
	}

	/**
	 * 登录验证：验证成功后，将登录用户信息放到session中，否则向前台发提示信息
	 * 
	 * @throws Exception
	 * */
	public String valid() throws Exception {
		try {
			JSONObject jsonObj = JSONObject.fromObject(json);
			String loginname = jsonObj.getString("loginname");
			String password = jsonObj.getString("password");

			// 现根据用户名去查询，如果用户名不存在，则提示用户名不存在
			// ，如果用户名存在，则查询用户名和密码，提示密码错误！
			boolean flag = userInfoManager.getBooleanByName(loginname);
			if (!flag) {
				json = "{\"success\":\"3\",\"msg\":\"用户名不存在!\"}";
			} else {
				Userinfo user = userInfoManager
						.getUserinfo(loginname, password);
				if (null != user) {
					if ("1".equals(user.getUserstatus())) {
						ActionContext ac = ActionContext.getContext();
						List<Module> moduleList = moduleManager
								.getModulesForMenu(user.getUserid());
						SessionUser sessionUser = new SessionUser(user
								.getUserid(), user.getLoginname(), user
								.getPassword(), user.getRealname(), moduleList,
								user.getDepartmentinfo(), user.getManagedepts(),user.getEntid().getEntid(),user.getEntid().getEntname());
						ac.getSession().put("sessionUser", sessionUser);
						// ///////////////添加系统日志////////////////////
						String operatecontent = "";
						operatecontent = "登录了系统";
						systemlogManager.addSystemLog(sessionUser.getUserid(),
								operatecontent);
						json = "{\"success\":\"1\",\"msg\":\"登录成功!\"}";
					} else {
						json = "{\"success\":\"-1\",\"msg\":\"该用户已注销!\"}";
					}
				} else {
					json = "{\"success\":\"0\",\"msg\":\"密码错误!\"}";
				}
			}
			sendMsg(json);
		} catch (Exception e) {
			json = "{\"success\":\"2\",\"msg\":\"数据库连接异常,请与系统管理员联系!\"}";
			sendMsg(json);
		}
		return null;
	}

	/**
	 * 向客户端的js发送字符串
	 * 
	 * @param jsonStr
	 *            发送的内容
	 * @throws IOException
	 * */
	public void sendMsg(String jsonStr) throws IOException {
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setCharacterEncoding("UTF-8");
		response.getWriter().write(jsonStr);
	}

	/**
	 * 注销或退出系统
	 * 
	 * @throws IOException
	 * */
	public String logout() throws Exception {
		// 退出时清空session中的内容
		ActionContext ac = ActionContext.getContext();
		// ///////////////添加系统日志//////////////////////
		SessionUser sessionUser = (SessionUser) ac.getSession().get(
				"sessionUser");
		String operatecontent = "";
		operatecontent = "注销了系统";
		systemlogManager.addSystemLog(sessionUser.getUserid(), operatecontent);
		// ///////////////添加系统日志//////////////////////
		ac.getSession().remove("sessionUser");
		ac.getSession().put("sessionUser", null);
		return SUCCESS;
	}

	/**
	 * 帮助文档下载方法的实现
	 * 
	 * @return
	 * @throws Exception
	 */
	public String showHelpWord() throws Exception {

		HttpServletResponse response = ServletActionContext.getResponse();
		HttpServletRequest request = ServletActionContext.getRequest();
		BufferedInputStream bis = null;
		ServletOutputStream stream = null;
		BufferedOutputStream bos = null;
		String flag = request.getParameter("flg");// 这个表示是用作判断是ajax调用还是form表单的提交
		if (flag == null) {// 此处是避免flag没有传输过来。避免bug 的产生
			flag = "1";
		}
		String fileName = "lims/helpFiles/";//
		try {
			String realPath = request.getSession().getServletContext()
					.getRealPath(fileName);// 此处是有系统文件路径得到磁盘路径的方法
			String filePath = "";// 在磁盘里找到的文件的绝对路径
			String filename = "";// 当前help文档里的文件名字，只取一个。
			ArrayList<String> filelist = new ArrayList<String>();
			File root = new File(realPath);// 此处是找到当前文件下有几个文件，只取第一个就可以了，把路径和名字赋给前面的变量。
			File[] files = root.listFiles();
			for (File file : files) {
				if (file.isDirectory()) {
					// 此处如果当前目录不是根路径，那么就执行递归调用，查找所有文件
					getFiles(file.getAbsolutePath());
					filelist.add(file.getAbsolutePath());
				} else {
					filePath = file.getAbsolutePath();// 在磁盘里找到的文件的绝对路径
					filename = file.getName();// 当前help文档里的文件名字，只取一个。
				}
			}
			bis = new BufferedInputStream(new FileInputStream(filePath));
			response.reset();
			response.setContentType("application/x-msdownload");
			response.addHeader("Content-Disposition", "attachment;filename=\""
					+ new String(filename.getBytes("GB2312"), "iso-8859-1")
					+ "\"");

			if ("0".equals(flag)) {// 如果此处查找到了该文件，并且flag是0，说明是ajax调用，可以进行文件是否存在的判断
				sendMsg("success");
			} else {// 如果此处查找到了该文件，并且flag是1，说明是form调用，可以进行文件下载
				stream = response.getOutputStream();
				bos = new BufferedOutputStream(stream);
				byte[] buff = new byte[20480];
				while (bis.read(buff, 0, buff.length) != -1) {
					bos.write(buff, 0, buff.length);
				}
				bos.flush();
			}
		} catch (Exception e) {
			sendMsg("fail");// 如果此处找不到文件，就返回fail,文件不存在
		} finally {
			if (bos != null) {
				bos.close();
			}
			if (bis != null) {
				bis.close();
			}
		}
		return null;
	}

	/*
	 * 通过递归得到某一路径下所有的目录及其文件
	 */
	/**
	 * 此处是遍历某一个文件夹下面的文件，此处只需传过来所需要遍历的文件路径既可以
	 */
	public String getFiles(String filePath) {
		String fileName = "";
		ArrayList<String> filelist = new ArrayList<String>();
		File root = new File(filePath);
		File[] files = root.listFiles();
		for (File file : files) {
			if (file.isDirectory()) {// 此处是文件如果是根目录,则执行递归调用
				/*
				 * 递归调用
				 */
				getFiles(file.getAbsolutePath());
				filelist.add(file.getAbsolutePath());
				System.out.println("显示" + filePath + "下所有子目录及其文件"
						+ file.getAbsolutePath());
			} else {// 则直接显示当前文件夹
				System.out.println("显示" + filePath + "下所有子目录"
						+ file.getAbsolutePath());
				fileName = file.getAbsolutePath();// 此处是当前文件的绝对路径
				String c = file.getName();// 此处是文件的名字
			}
		}
		return fileName;// 返回一个路径
	}

	
	public void menu() throws Exception {
		Map<String,Object> map = new HashMap<String, Object>();
		ActionContext ac = ActionContext.getContext();
		SessionUser sessionUser = (SessionUser) ac.getSession().get(
				"sessionUser");
		list = sessionUser.getModuleList();// moduleManager.getModulesForMenu(sessionUser.getUserid());
		map.put("sucessFlag", true);
		map.put("menus", list);
		String first = JSONArray.fromObject(map).toString();//
		String jsonString = first.substring(1, first.length() - 1);// 去掉“[”和“]”
		sendMsg(jsonString);
	}
	
	/**
	 * 防止重复提示错误信息
	 * */
	public void prepare() {
		clearErrorsAndMessages();
	}

	public String getJson() {
		return json;
	}

	public void setJson(String json) {
		this.json = json;
	}

	public String getPassword() {
		return password;
	}

	public String getLoginname() {
		return loginname;
	}

	public void setLoginname(String loginname) {
		this.loginname = loginname;
	}

	public void setPassword(String password) {
		this.password = password;
	}
}