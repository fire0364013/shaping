package com.beauty.biz.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * 用户角色表~做checkbox使用 Userroleinfo entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "USERROLEINFO")
public class Userroleinfo implements java.io.Serializable {

	// Fields
	private static final long serialVersionUID = 1L;
	private String id; // id 序列~
	private String userid; // 用户id
	private String roleid; // 角色id

	// Constructors

	/** default constructor */
	public Userroleinfo() {
	}

	/** minimal constructor */
	public Userroleinfo(String id) {
		this.id = id;
	}

	/** full constructor */
	public Userroleinfo(String id, String userid, String roleid) {
		this.id = id;
		this.userid = userid;
		this.roleid = roleid;
	}

	// Property accessors
	@Id
	@Column(name = "ID", unique = true, nullable = false, length = 30)
	public String getId() {
		return this.id;
	}

	public void setId(String id) {
		this.id = id;
	}

	@Column(name = "USERID", length = 30)
	public String getUserid() {
		return this.userid;
	}

	public void setUserid(String userid) {
		this.userid = userid;
	}

	@Column(name = "ROLEID", length = 30)
	public String getRoleid() {
		return this.roleid;
	}

	public void setRoleid(String roleid) {
		this.roleid = roleid;
	}

}