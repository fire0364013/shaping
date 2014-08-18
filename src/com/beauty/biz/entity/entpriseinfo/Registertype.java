package com.beauty.biz.entity.entpriseinfo;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * 登记注册类型 Registertype entity.
 */
@Entity
@Table(name = "REGISTERTYPE")
public class Registertype implements java.io.Serializable {

	// Fields

	private static final long serialVersionUID = 551635258931334808L;
	private String registertypecode;// 登记注册类型编号
	private String registertypename;// 登记注册类型名称

	// Constructors

	/** default constructor */
	public Registertype() {
	}

	/** full constructor */
	public Registertype(String registertypecode, String registertypename) {
		this.registertypecode = registertypecode;
		this.registertypename = registertypename;
	}

	// Property accessors
	@Id
	@Column(name = "REGISTERTYPECODE", unique = true, nullable = false, length = 10)
	public String getRegistertypecode() {
		return this.registertypecode;
	}

	public void setRegistertypecode(String registertypecode) {
		this.registertypecode = registertypecode;
	}

	@Column(name = "REGISTERTYPENAME", nullable = false, length = 30)
	public String getRegistertypename() {
		return this.registertypename;
	}

	public void setRegistertypename(String registertypename) {
		this.registertypename = registertypename;
	}

}