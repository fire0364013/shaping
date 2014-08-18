package com.beauty.biz.entity.dictionary;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * Dictionaryindex entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "DICTIONARYINDEX")
public class Dictionaryindex implements java.io.Serializable {

	// Fields
	private static final long serialVersionUID = -8499213723624751297L;
	private String dictionarycode;
	private String dictionaryname;

	@Id
	@Column(name = "DICTIONARYCODE", unique = true, nullable = false, length = 20)
	public String getDictionarycode() {
		return this.dictionarycode;
	}

	public void setDictionarycode(String dictionarycode) {
		this.dictionarycode = dictionarycode;
	}

	@Column(name = "DICTIONARYNAME", length = 20)
	public String getDictionaryname() {
		return this.dictionaryname;
	}

	public void setDictionaryname(String dictionaryname) {
		this.dictionaryname = dictionaryname;
	}

}