package com.beauty.biz.entity;

// default package

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * Unit entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "UNIT"

)
public class Unit implements java.io.Serializable {

	// Fields

	private static final long serialVersionUID = -8601980536666239592L;
	private String unitid;
	private String unitname;
	private String description;
	private String unittype;

	// Constructors

	/** default constructor */
	public Unit() {
	}

	/** minimal constructor */
	public Unit(String unitid) {
		this.unitid = unitid;
	}

	/** full constructor */
	public Unit(String unitid, String unitname, String description) {
		this.unitid = unitid;
		this.unitname = unitname;
		this.description = description;
	}

	// Property accessors
	@Id
	@Column(name = "UNITID", unique = true, nullable = false, length = 10)
	public String getUnitid() {
		return this.unitid;
	}

	public void setUnitid(String unitid) {
		this.unitid = unitid;
	}

	@Column(name = "UNITNAME", length = 50)
	public String getUnitname() {
		return this.unitname;
	}

	public void setUnitname(String unitname) {
		this.unitname = unitname;
	}

	@Column(name = "DESCRIPTION", length = 50)
	public String getDescription() {
		return this.description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	@Column(name = "UNITTYPE", length = 50)
	public String getUnittype() {
		return unittype;
	}

	public void setUnittype(String unittype) {
		this.unittype = unittype;
	}

}