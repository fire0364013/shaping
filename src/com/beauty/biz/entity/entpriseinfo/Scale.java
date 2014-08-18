package com.beauty.biz.entity.entpriseinfo;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * 企业规模 Scale entity.
 */
@Entity
@Table(name = "SCALE")
public class Scale implements java.io.Serializable {

	// Fields

	private static final long serialVersionUID = 6531001782946024438L;
	private String scalecode;// 企业规模编号
	private String scalename;// 企业规模名称

	// Constructors

	/** default constructor */
	public Scale() {
	}

	/** full constructor */
	public Scale(String scalecode, String scalename) {
		this.scalecode = scalecode;
		this.scalename = scalename;
	}

	// Property accessors
	@Id
	@Column(name = "SCALECODE", unique = true, nullable = false, length = 10)
	public String getScalecode() {
		return this.scalecode;
	}

	public void setScalecode(String scalecode) {
		this.scalecode = scalecode;
	}

	@Column(name = "SCALENAME", nullable = false, length = 30)
	public String getScalename() {
		return this.scalename;
	}

	public void setScalename(String scalename) {
		this.scalename = scalename;
	}

}