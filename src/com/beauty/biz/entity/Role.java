package com.beauty.biz.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * Role entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "ROLEINFO")
public class Role implements java.io.Serializable {

	// Fields

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String roleid;
	private String rolename;
	private String orderid;
	private String allowendit;
	private String allowdelete;
	private String deleteflag;
	private String updateuserid;
	private Date updatetime;

	// Constructors

	/** default constructor */
	public Role() {
	}

	/** minimal constructor */
	public Role(String roleid, String rolename) {
		this.roleid = roleid;
		this.rolename = rolename;
	}

	// private Set<Module> modules = new HashSet<Module>();// 角色对象集合
	//
	// @ManyToMany(cascade = CascadeType.REFRESH, fetch = FetchType.EAGER)
	// @JoinTable(name = "ModuleRight", inverseJoinColumns = @JoinColumn(name =
	// "MODULEID"), joinColumns = @JoinColumn(name = "ROLEID"))
	// public Set<Module> getModules() {
	// return modules;
	// }
	//
	// public void setModules(Set<Module> modules) {
	// this.modules = modules;
	// }

	// Property accessors
	// @GenericGenerator(name = "generator", strategy = "increment")
	@Id
	// @GeneratedValue(generator = "generator")
	@Column(name = "ROLEID", unique = true, nullable = false, precision = 38, scale = 0)
	public String getRoleid() {
		return this.roleid;
	}

	public void setRoleid(String roleid) {
		this.roleid = roleid;
	}

	@Column(name = "ROLENAME", nullable = false, length = 100)
	public String getRolename() {
		return this.rolename;
	}

	public void setRolename(String rolename) {
		this.rolename = rolename;
	}

	@Column(name = "ORDERID", precision = 38, scale = 0)
	public String getOrderid() {
		return this.orderid;
	}

	public void setOrderid(String orderid) {
		this.orderid = orderid;
	}

	@Column(name = "ALLOWENDIT", precision = 38, scale = 0)
	public String getAllowendit() {
		return this.allowendit;
	}

	public void setAllowendit(String allowendit) {
		this.allowendit = allowendit;
	}

	@Column(name = "ALLOWDELETE", precision = 38, scale = 0)
	public String getAllowdelete() {
		return this.allowdelete;
	}

	public void setAllowdelete(String allowdelete) {
		this.allowdelete = allowdelete;
	}

	@Column(name = "DELETEFLAG", length = 10)
	public String getDeleteflag() {
		return this.deleteflag;
	}

	public void setDeleteflag(String deleteflag) {
		this.deleteflag = deleteflag;
	}

	@Column(name = "UPDATEUSERID", length = 50)
	public String getUpdateuserid() {
		return this.updateuserid;
	}

	public void setUpdateuserid(String updateuserid) {
		this.updateuserid = updateuserid;
	}

	@Column(name = "UPDATETIME", length = 11)
	public Date getUpdatetime() {
		return this.updatetime;
	}

	public void setUpdatetime(Date updatetime) {
		this.updatetime = updatetime;
	}

}