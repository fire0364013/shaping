package com.beauty.biz.entity.group;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;

import com.beauty.biz.entity.Userinfo;

/**
 * Usergroup entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "USERGROUP")
public class Usergroup implements java.io.Serializable {

	// Fields

	/**
	 * 
	 */
	private static final long serialVersionUID = 6708920350083227438L;
	private String usergroupid;
	private String deptid;
	private String groupid;
	private Userinfo userinfo;
	private String isprincipal;

	// Property accessors
	@Id
	@Column(name = "USERGROUPID", unique = true, nullable = false, length = 20)
	public String getUsergroupid() {
		return this.usergroupid;
	}

	public void setUsergroupid(String usergroupid) {
		this.usergroupid = usergroupid;
	}

	@Column(name = "DEPTID", length = 20)
	public String getDeptid() {
		return this.deptid;
	}

	public void setDeptid(String deptid) {
		this.deptid = deptid;
	}

	@Column(name = "GROUPID", length = 20)
	public String getGroupid() {
		return this.groupid;
	}

	public void setGroupid(String groupid) {
		this.groupid = groupid;
	}

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "USERID")
	@NotFound(action = NotFoundAction.IGNORE)
	public Userinfo getUserinfo() {
		return userinfo;
	}

	public void setUserinfo(Userinfo userinfo) {
		this.userinfo = userinfo;
	}

	@Column(name = "ISPRINCIPAL")
	public String getIsprincipal() {
		return isprincipal;
	}

	public void setIsprincipal(String isprincipal) {
		this.isprincipal = isprincipal;
	}

}