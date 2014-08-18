package com.beauty.biz.entity.entpriseinfo;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * 污染源类型 Pollutionsourcetype entity.
 */
@Entity
@Table(name = "POLLUTIONSOURCETYPE")
public class Pollutionsourcetype implements java.io.Serializable {

	// Fields
	private static final long serialVersionUID = -7683437850805546869L;
	private String sourcetypecode;// 污染源类型编号
	private String sourcetypename;// 污染源类型名称
	private String sourcetype; // 污染源类型（1表示企业，2表示大环境）

	// Constructors

	/** default constructor */
	public Pollutionsourcetype() {
	}

	/** full constructor */
	public Pollutionsourcetype(String sourcetypecode, String sourcetypename) {
		this.sourcetypecode = sourcetypecode;
		this.sourcetypename = sourcetypename;
	}

	// Property accessors
	@Id
	@Column(name = "SOURCETYPECODE", unique = true, nullable = false, length = 10)
	public String getSourcetypecode() {
		return this.sourcetypecode;
	}

	public void setSourcetypecode(String sourcetypecode) {
		this.sourcetypecode = sourcetypecode;
	}

	@Column(name = "SOURCETYPENAME", nullable = false, length = 30)
	public String getSourcetypename() {
		return this.sourcetypename;
	}

	public void setSourcetypename(String sourcetypename) {
		this.sourcetypename = sourcetypename;
	}

	@Column(name = "SOURCETYPE", nullable = false, length = 2)
	public String getSourcetype() {
		return sourcetype;
	}

	public void setSourcetype(String sourcetype) {
		this.sourcetype = sourcetype;
	}

}