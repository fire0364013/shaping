package com.beauty.biz.entity;

// default package

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * QcSampleType entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "QCSAMPLETYPE"

)
public class QcSampleType implements java.io.Serializable {

	private static final long serialVersionUID = 1L;
	// Fields

	private String qctypeid;
	private String qcsampletypename;
	private String qccategory;

	// Constructors

	/** default constructor */
	public QcSampleType() {
	}

	/** minimal constructor */
	public QcSampleType(String qctypeid) {
		this.qctypeid = qctypeid;
	}

	/** full constructor */
	public QcSampleType(String qctypeid, String qcsampletypename) {
		this.qctypeid = qctypeid;
		this.qcsampletypename = qcsampletypename;
	}

	// Property accessors
	@Id
	@Column(name = "QCTYPEID", unique = true, nullable = false, length = 20)
	public String getQctypeid() {
		return this.qctypeid;
	}

	public void setQctypeid(String qctypeid) {
		this.qctypeid = qctypeid;
	}

	@Column(name = "QCSAMPLETYPENAME", length = 40)
	public String getQcsampletypename() {
		return this.qcsampletypename;
	}

	public void setQcsampletypename(String qcsampletypename) {
		this.qcsampletypename = qcsampletypename;
	}

	@Column(name = "QCCATEGORY")
	public String getQccategory() {
		return qccategory;
	}

	public void setQccategory(String qccategory) {
		this.qccategory = qccategory;
	}

}