package com.beauty.biz.entity;

import java.sql.Blob;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;

import com.beauty.biz.entity.entpriseinfo.EntpriseInfo;

/**
 * Userinfo entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "USERINFO")
public class Userinfo implements java.io.Serializable {

	// Fields

	private static final long serialVersionUID = 1L;
	private String userid; // 用户编号
	private Departmentinfo departmentinfo;// 部门编号
	private EntpriseInfo entid; // 所属企业
	private String loginname; // 用户登录名
	private String password; // 用户密码
	private String realname; // 姓名
	private String sex; // 性别
	private String email; // EMAIL
	private String linkphone; // 电话
	private String fax; // 传真
	private String mobilephone; // 手机
	private String photo; // 照片
	private Blob signpicture; // 电子签章图片
	private String userstatus; // 用户状态（1为正常0为注销）
	private Date lastlogintime; // 最后登录时间
	private String createby; // 创建人
	private Date createtime; // 创建时间
	private Integer orderid; // 序号
	private String clientip; // 客户端ip
	private String managedepts; // 分管部门
	private String projectleader; // 是否为项目负责人
	private String nickName;//简称

	@Id
	@Column(name = "USERID", unique = true, nullable = false, length = 30)
	public String getUserid() {
		return this.userid;
	}

	public void setUserid(String userid) {
		this.userid = userid;
	}

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "DEPTID")
	@NotFound(action = NotFoundAction.IGNORE)
	public Departmentinfo getDepartmentinfo() {
		return departmentinfo;
	}

	public void setDepartmentinfo(Departmentinfo departmentinfo) {
		this.departmentinfo = departmentinfo;
	}

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "ENTID")
	@NotFound(action = NotFoundAction.IGNORE)
	public EntpriseInfo getEntid() {
		return entid;
	}

	public void setEntid(EntpriseInfo entid) {
		this.entid = entid;
	}

	@Column(name = "LOGINNAME", nullable = false, length = 50)
	public String getLoginname() {
		return this.loginname;
	}

	public void setLoginname(String loginname) {
		this.loginname = loginname;
	}

	@Column(name = "PASSWORD", nullable = false, length = 50)
	public String getPassword() {
		return this.password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	@Column(name = "REALNAME", nullable = false, length = 50)
	public String getRealname() {
		return this.realname;
	}

	public void setRealname(String realname) {
		this.realname = realname;
	}

	@Column(name = "SEX", length = 50)
	public String getSex() {
		return this.sex;
	}

	public void setSex(String sex) {
		this.sex = sex;
	}

	@Column(name = "EMAIL", length = 100)
	public String getEmail() {
		return this.email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	@Column(name = "LINKPHONE", length = 20)
	public String getLinkphone() {
		return this.linkphone;
	}

	public void setLinkphone(String linkphone) {
		this.linkphone = linkphone;
	}

	@Column(name = "FAX", length = 20)
	public String getFax() {
		return this.fax;
	}

	public void setFax(String fax) {
		this.fax = fax;
	}

	@Column(name = "MOBILEPHONE", length = 50)
	public String getMobilephone() {
		return this.mobilephone;
	}

	public void setMobilephone(String mobilephone) {
		this.mobilephone = mobilephone;
	}

	@Column(name = "PHOTO", length = 500)
	public String getPhoto() {
		return this.photo;
	}

	public void setPhoto(String photo) {
		this.photo = photo;
	}

	@Column(name = "SIGNPICTURE", precision = 1, scale = 0)
	public Blob getSignpicture() {
		return this.signpicture;
	}

	public void setSignpicture(Blob signpicture) {
		this.signpicture = signpicture;
	}

	@Column(name = "USERSTATUS", length = 2)
	public String getUserstatus() {
		return this.userstatus;
	}

	public void setUserstatus(String userstatus) {
		this.userstatus = userstatus;
	}

	@Column(name = "LASTLOGINTIME", length = 11)
	public Date getLastlogintime() {
		return this.lastlogintime;
	}

	public void setLastlogintime(Date lastlogintime) {
		this.lastlogintime = lastlogintime;
	}

	@Column(name = "CREATEBY", length = 50)
	public String getCreateby() {
		return this.createby;
	}

	public void setCreateby(String createby) {
		this.createby = createby;
	}

	@Column(name = "CREATETIME", length = 11)
	public Date getCreatetime() {
		return this.createtime;
	}

	public void setCreatetime(Date createtime) {
		this.createtime = createtime;
	}

	@Column(name = "ORDERID", length = 38)
	public Integer getOrderid() {
		return this.orderid;
	}

	public void setOrderid(Integer orderid) {
		this.orderid = orderid;
	}

	@Column(name = "CLIENTIP", length = 20)
	public String getClientip() {
		return clientip;
	}

	public void setClientip(String clientip) {
		this.clientip = clientip;
	}

	@Column(name = "MANAGEDEPTS", length = 100)
	public String getManagedepts() {
		return managedepts;
	}

	public void setManagedepts(String managedepts) {
		this.managedepts = managedepts;
	}

	@Column(name = "PROJECTLEADER", length = 1)
	public String getProjectleader() {
		return projectleader;
	}

	public void setProjectleader(String projectleader) {
		this.projectleader = projectleader;
	}
	public void setNickName(String nickName) {
		this.nickName = nickName;
	}
	@Column(name = "NICKNAME", length = 30)
	public String getNickName() {
		return nickName;
	}

}