package com.beauty.biz.entity.entpriseinfo;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * 行业类型 Industry entity.
 */
@Entity
@Table(name = "INDUSTRY")
public class Industry implements java.io.Serializable {

	// Fields

	private static final long serialVersionUID = 9200870040497421907L;
	private String industrytypecode; // 行业类型编号
	private String industrytypename; // 行业类型名称
	private String parenttypecode; // 父行业类型编号

	// Constructors

	/** default constructor */
	public Industry() {
	}

	/** minimal constructor */
	public Industry(String industrytypecode, String industrytypename) {
		this.industrytypecode = industrytypecode;
		this.industrytypename = industrytypename;
	}

	/** full constructor */
	public Industry(String industrytypecode, String industrytypename,
			String parenttypecode) {
		this.industrytypecode = industrytypecode;
		this.industrytypename = industrytypename;
		this.parenttypecode = parenttypecode;
	}

	// Property accessors
	@Id
	@Column(name = "INDUSTRYTYPECODE", unique = true, nullable = false, length = 10)
	public String getIndustrytypecode() {
		return this.industrytypecode;
	}

	public void setIndustrytypecode(String industrytypecode) {
		this.industrytypecode = industrytypecode;
	}

	@Column(name = "INDUSTRYTYPENAME", nullable = false, length = 30)
	public String getIndustrytypename() {
		return this.industrytypename;
	}

	public void setIndustrytypename(String industrytypename) {
		this.industrytypename = industrytypename;
	}

	@Column(name = "PARENTTYPECODE", length = 10)
	public String getParenttypecode() {
		return this.parenttypecode;
	}

	public void setParenttypecode(String parenttypecode) {
		this.parenttypecode = parenttypecode;
	}

}