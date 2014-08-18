package com.beauty.biz.entity;

import java.math.BigDecimal;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * NormalauditrecordId entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "NORMALAUDITRECORD")
public class Normalauditrecord implements java.io.Serializable {

	// Fields
	private static final long serialVersionUID = 1L;
	private String id;
	private String moduleid;
	private String content;
	private BigDecimal recordsort;

	@Id
	@Column(name = "ID", nullable = false, length = 20)
	public String getId() {
		return this.id;
	}

	public void setId(String id) {
		this.id = id;
	}

	@Column(name = "MODULEID", length = 20)
	public String getModuleid() {
		return moduleid;
	}

	public void setModuleid(String moduleid) {
		this.moduleid = moduleid;
	}

	@Column(name = "CONTENT", length = 500)
	public String getContent() {
		return this.content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	@Column(name = "RECORDSORT", precision = 22, scale = 0)
	public BigDecimal getRecordsort() {
		return this.recordsort;
	}

	public void setRecordsort(BigDecimal recordsort) {
		this.recordsort = recordsort;
	}

}