package com.beauty.biz.entity.beauty;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * 应用信息表
 * Appinfo entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "appinfo")
public class Appinfo implements java.io.Serializable {

	// Fields

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String appinfoid;//应用id
	private String appinfoname;//应用名称
	private String remark;//备注

	// Constructors

	/** default constructor */
	public Appinfo() {
	}

	/** minimal constructor */
	public Appinfo(String appinfoid) {
		this.appinfoid = appinfoid;
	}

	/** full constructor */
	public Appinfo(String appinfoid, String appinfoname, String remark) {
		this.appinfoid = appinfoid;
		this.appinfoname = appinfoname;
		this.remark = remark;
	}

	// Property accessors
	@Id
	@Column(name = "appinfoid", unique = true, nullable = false, length = 20)
	public String getAppinfoid() {
		return this.appinfoid;
	}

	public void setAppinfoid(String appinfoid) {
		this.appinfoid = appinfoid;
	}

	@Column(name = "appinfoname", length = 200)
	public String getAppinfoname() {
		return this.appinfoname;
	}

	public void setAppinfoname(String appinfoname) {
		this.appinfoname = appinfoname;
	}

	@Column(name = "remark", length = 200)
	public String getRemark() {
		return this.remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

}