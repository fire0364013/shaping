package com.beauty.common.utils;

import java.util.List;

import com.beauty.biz.entity.Departmentinfo;
import com.beauty.biz.entity.Module;
import com.beauty.biz.entity.entpriseinfo.EntpriseInfo;

public class SessionUser {
	private String userid;				//用户编号
	private Departmentinfo departmentinfo; //部门编号
	private String entid; // 所属企业
	private String entname;//所属企业
	private String loginname;			//用户登录名	
	private String password;			//用户密码
	private String realname;			//姓名
//	private String sex;					//性别
//	private String email;				//EMAIL
//	private String linkphone;			//电话
//	private String fax;					//传真
//	private String mobilephone;			//手机
//	private String photo;				//照片
//	private Boolean signpicture;		//电子签章图片
//	private String userstatus;			//用户状态（1为正常0为注销）
//	private Date lastlogintime;			//最后登录时间
//	private String createby;			//创建人
//	private Date createtime;			//创建时间
//	private String orderid;	
	private List<Module> moduleList;
	private String managedepts;			//分管部门
	private Module module;
	public SessionUser(){}
	
	public SessionUser(String userid,String loginname,String password,
			String realname,List<Module> moduleList,Departmentinfo departmentinfo,
			String managedepts,String entid,String entname){
		this.userid = userid;
		this.loginname = loginname;
		this.password = password;
		this.realname = realname;
		this.moduleList = moduleList;
		this.departmentinfo = departmentinfo;
		this.managedepts = managedepts;
		this.entid = entid;
		this.entname = entname;
	}
	
	
	

	public List<Module> getModuleList() {
		return moduleList;
	}

	public void setModuleList(List<Module> moduleList) {
		this.moduleList = moduleList;
	}

	public String getRealname() {
		return realname;
	}

	public void setRealname(String realname) {
		this.realname = realname;
	}
	
	public String getUserid() {
		return userid;
	}

	public void setUserid(String userid) {
		this.userid = userid;
	}
	
	public String getLoginname() {
		return loginname;
	}
	public void setLoginname(String loginname) {
		this.loginname = loginname;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
//	public String getDeptid() {
//		return deptid;
//	}
//
//	public void setDeptid(String deptid) {
//		this.deptid = deptid;
//	}
	public Departmentinfo getDepartmentinfo() {
		return departmentinfo;
	}

	public void setDepartmentinfo(Departmentinfo departmentinfo) {
		this.departmentinfo = departmentinfo;
	}

	public String getEntid() {
		return entid;
	}

	public void setEntid(String entid) {
		this.entid = entid;
	}

	public String getManagedepts() {
		return managedepts;
	}

	public void setManagedepts(String managedepts) {
		this.managedepts = managedepts;
	}

	public Module getModule() {
		return module;
	}

	public void setModule(Module module) {
		this.module = module;
	}

	public String getEntname() {
		return entname;
	}

	public void setEntname(String entname) {
		this.entname = entname;
	}
	
	
}
