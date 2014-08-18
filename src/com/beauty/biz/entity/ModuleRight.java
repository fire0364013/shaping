package com.beauty.biz.entity;

// default package

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * ModuleRight entity.
 * 
 * @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "MODULERIGHT")
public class ModuleRight implements java.io.Serializable {

	// Fields
	private static final long serialVersionUID = 1L;
	private String id;
	private String roleid;
	private String moduleid;

	// Constructors

	/** default constructor */
	public ModuleRight() {
	}

	// Property accessors
	// @GenericGenerator(name = "generator", strategy = "increment")
	// @GeneratedValue(generator = "generator")
	@Id
	@Column(name = "ID", unique = true, nullable = false, precision = 38, scale = 0)
	public String getId() {
		return this.id;
	}

	public void setId(String id) {
		this.id = id;
	}

	@Column(name = "ROLEID", precision = 38, scale = 0)
	public String getRoleid() {
		return this.roleid;
	}

	public void setRoleid(String roleid) {
		this.roleid = roleid;
	}

	@Column(name = "MODULEID", precision = 38, scale = 0)
	public String getModuleid() {
		return this.moduleid;
	}

	public void setModuleid(String moduleid) {
		this.moduleid = moduleid;
	}

}