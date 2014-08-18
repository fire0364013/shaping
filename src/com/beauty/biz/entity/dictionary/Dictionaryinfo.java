package com.beauty.biz.entity.dictionary;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * Dictionnaryinfo entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "DICTIONARYINFO")
public class Dictionaryinfo implements java.io.Serializable {

	// Fields
	private static final long serialVersionUID = 2454655602304203369L;
	private String dinfoid;
	private String dictionarycode;
	private String dinfocode;
	private String dinfoname;
	private String dorder;

	@Id
	@Column(name = "DINFOID", unique = true, nullable = false, length = 20)
	public String getDinfoid() {
		return this.dinfoid;
	}

	public void setDinfoid(String dinfoid) {
		this.dinfoid = dinfoid;
	}



	/**
	 * @return the dictionarycode
	 */
	@Column(name = "DICTIONNARYCODE", length = 20)
	public String getDictionarycode() {
		return dictionarycode;
	}

	/**
	 * @param dictionarycode the dictionarycode to set
	 */
	public void setDictionarycode(String dictionarycode) {
		this.dictionarycode = dictionarycode;
	}

	@Column(name = "DINFOCODE", length = 20)
	public String getDinfocode() {
		return this.dinfocode;
	}

	public void setDinfocode(String dinfocode) {
		this.dinfocode = dinfocode;
	}

	@Column(name = "DINFONAME", length = 20)
	public String getDinfoname() {
		return this.dinfoname;
	}

	public void setDinfoname(String dinfoname) {
		this.dinfoname = dinfoname;
	}

	@Column(name = "DORDER", length = 10)
	public String getDorder() {
		return this.dorder;
	}

	public void setDorder(String dorder) {
		this.dorder = dorder;
	}

}