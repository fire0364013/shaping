package com.beauty.biz.entity.iteminfo;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * Monitoritemtype entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "MONITORITEMTYPE")
public class Monitoritemtype implements java.io.Serializable {

	// Fields

	private static final long serialVersionUID = 7554787494573036206L;
	private String itemtypeid;// 项目类型编号序列
	private String itemtypename;// 项目类型名称
	private String parentitemtypeid;// 父项目类型编号
	private String sampletypesign;
	private String pollutanttype;// 污染物质类型 monitorsearch 监测方案，项目弹出窗做判断的时候用

	// Property accessors
	@Id
	@Column(name = "ITEMTYPEID", unique = true, nullable = false, length = 10)
	public String getItemtypeid() {
		return this.itemtypeid;
	}

	public void setItemtypeid(String itemtypeid) {
		this.itemtypeid = itemtypeid;
	}

	@Column(name = "ITEMTYPENAME", length = 100)
	public String getItemtypename() {
		return this.itemtypename;
	}

	public void setItemtypename(String itemtypename) {
		this.itemtypename = itemtypename;
	}

	@Column(name = "SAMPLETYPESIGN", length = 30)
	public String getSampletypesign() {
		return sampletypesign;
	}

	public void setSampletypesign(String sampletypesign) {
		this.sampletypesign = sampletypesign;
	}

	@Column(name = "PARENTITEMTYPEID", length = 10)
	public String getParentitemtypeid() {
		return this.parentitemtypeid;
	}

	public void setParentitemtypeid(String parentitemtypeid) {
		this.parentitemtypeid = parentitemtypeid;
	}

	@Column(name = "POLLUTANTTYPE", length = 30)
	public String getPollutanttype() {
		return pollutanttype;
	}

	public void setPollutanttype(String pollutanttype) {
		this.pollutanttype = pollutanttype;
	}
}