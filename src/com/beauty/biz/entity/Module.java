package com.beauty.biz.entity;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

/**
 * Module entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "MODULEINFO")
public class Module implements java.io.Serializable {

	private static final long serialVersionUID = 1L;
	// Fields
	private String moduleid;
	private String modulename;
	private String parentmoduleid;
	private String moduletype;
	private String url;
	private Integer orderid;
	private String remindhql; // 待办提醒sql
	private List<Module> subNodeList = new ArrayList<Module>();
	private String sqltype;

	@Transient
	public List<Module> getSubNodeList() {
		return subNodeList;
	}

	public void setSubNodeList(List<Module> subNodeList) {
		this.subNodeList = subNodeList;
	}

	// Constructors
	/** default constructor */
	public Module() {
	}

	// Property accessors
	@Id
	@Column(name = "MODULEID", unique = true, nullable = false, precision = 38, scale = 0)
	// @GenericGenerator(name = "generator", strategy = "increment")
	// @GeneratedValue(generator = "generator")
	public String getModuleid() {
		return this.moduleid;
	}

	public void setModuleid(String moduleid) {
		this.moduleid = moduleid;
	}

	@Column(name = "MODULENAME", length = 100)
	public String getModulename() {
		return this.modulename;
	}

	public void setModulename(String modulename) {
		this.modulename = modulename;
	}

	@Column(name = "PARENTMODULEID", length = 30)
	public String getParentmoduleid() {
		return this.parentmoduleid;
	}

	public void setParentmoduleid(String parentmoduleid) {
		this.parentmoduleid = parentmoduleid;
	}

	@Column(name = "MODULETYPE", length = 50)
	public String getModuletype() {
		return this.moduletype;
	}

	public void setModuletype(String moduletype) {
		this.moduletype = moduletype;
	}

	@Column(name = "URL", length = 200)
	public String getUrl() {
		return this.url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	@Column(name = "ORDERID", length = 20)
	public Integer getOrderid() {
		return this.orderid;
	}

	public void setOrderid(Integer orderid) {
		this.orderid = orderid;
	}

	@Column(name = "REMINDHQL", length = 200)
	public String getRemindhql() {
		return remindhql;
	}

	public void setRemindhql(String remindhql) {
		this.remindhql = remindhql;
	}

	@Column(name = "SQLTYPE", length = 30)
	public String getSqltype() {
		return sqltype;
	}

	public void setSqltype(String sqltype) {
		this.sqltype = sqltype;
	}

}