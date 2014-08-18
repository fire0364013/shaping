package com.beauty.biz.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * Savedose entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "SAVEDOSE")
public class Savedose implements java.io.Serializable {

	// Fields
	private static final long serialVersionUID = 1565287712171301400L;
	private String savedoseid;// 保存剂ID
	private String savedosename;// 保存及name
	private String remark;// 备注

	// Constructors

	/** default constructor */
	public Savedose() {
	}

	/** minimal constructor */
	public Savedose(String savedoseid) {
		this.savedoseid = savedoseid;
	}

	/** full constructor */
	public Savedose(String savedoseid, String savedosename, String remark) {
		this.savedoseid = savedoseid;
		this.savedosename = savedosename;
		this.remark = remark;
	}

	// Property accessors
	@Id
	@Column(name = "SAVEDOSEID", unique = true, nullable = false, length = 20)
	public String getSavedoseid() {
		return this.savedoseid;
	}

	public void setSavedoseid(String savedoseid) {
		this.savedoseid = savedoseid;
	}

	@Column(name = "SAVEDOSENAME", length = 50)
	public String getSavedosename() {
		return this.savedosename;
	}

	public void setSavedosename(String savedosename) {
		this.savedosename = savedosename;
	}

	@Column(name = "REMARK", length = 500)
	public String getRemark() {
		return this.remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

}