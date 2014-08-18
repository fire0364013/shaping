package com.beauty.biz.entity.projects;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * Sampleenvparamdata entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "SAMPLEENVPARAMDATA")
public class Sampleenvparamdata implements java.io.Serializable {

	// Fields

	private String paramvalueid;
	private String sampleid;
	private String paramid;
	private String paramvalue;

	// Constructors

	/** default constructor */
	public Sampleenvparamdata() {
	}

	/** minimal constructor */
	public Sampleenvparamdata(String paramvalueid) {
		this.paramvalueid = paramvalueid;
	}

	/** full constructor */
	public Sampleenvparamdata(String paramvalueid, String sampleid,
			String paramid, String paramvalue) {
		this.paramvalueid = paramvalueid;
		this.sampleid = sampleid;
		this.paramid = paramid;
		this.paramvalue = paramvalue;
	}

	// Property accessors
	@Id
	@Column(name = "PARAMVALUEID", unique = true, nullable = false, length = 40)
	public String getParamvalueid() {
		return this.paramvalueid;
	}

	public void setParamvalueid(String paramvalueid) {
		this.paramvalueid = paramvalueid;
	}

	@Column(name = "SAMPLEID", length = 40)
	public String getSampleid() {
		return this.sampleid;
	}

	public void setSampleid(String sampleid) {
		this.sampleid = sampleid;
	}

	@Column(name = "PARAMID", length = 40)
	public String getParamid() {
		return this.paramid;
	}

	public void setParamid(String paramid) {
		this.paramid = paramid;
	}

	@Column(name = "PARAMVALUE", length = 200)
	public String getParamvalue() {
		return this.paramvalue;
	}

	public void setParamvalue(String paramvalue) {
		this.paramvalue = paramvalue;
	}

}