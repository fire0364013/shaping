package com.beauty.biz.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * Conventionruleinfo entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "CONVENTIONRULEINFO")
public class Conventionruleinfo implements java.io.Serializable {

	// Fields
	private static final long serialVersionUID = 6867488545045570428L;
	private String conventionid;// 修约编号
	private String conventionname;// 修约规则
	private String remark;// 修约备注

	// Constructors

	/** default constructor */
	public Conventionruleinfo() {
	}

	/** minimal constructor */
	public Conventionruleinfo(String conventionid) {
		this.conventionid = conventionid;
	}

	/** full constructor */
	public Conventionruleinfo(String conventionid, String conventionname,
			String remark) {
		this.conventionid = conventionid;
		this.conventionname = conventionname;
		this.remark = remark;
	}

	// Property accessors
	@Id
	@Column(name = "CONVENTIONID", unique = true, nullable = false, length = 50)
	public String getConventionid() {
		return this.conventionid;
	}

	public void setConventionid(String conventionid) {
		this.conventionid = conventionid;
	}

	@Column(name = "CONVENTIONNAME", length = 60)
	public String getConventionname() {
		return this.conventionname;
	}

	public void setConventionname(String conventionname) {
		this.conventionname = conventionname;
	}

	@Column(name = "REMARK", length = 4000)
	public String getRemark() {
		return this.remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

}