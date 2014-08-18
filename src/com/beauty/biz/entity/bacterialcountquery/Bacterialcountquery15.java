package com.beauty.biz.entity.bacterialcountquery;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * 细菌最可能数查询表（15管）实体 Bacterialcountquery15 entity.
 */
@Entity
@Table(name = "BACTERIALCOUNTQUERY15")
public class Bacterialcountquery15 implements java.io.Serializable {

	// Fields
	private static final long serialVersionUID = -2387097556693798846L;
	private String recordid;// 主键编号
	private String secondfermentcount1;// 复发酵阳性份数（10ml）
	private String secondfermentcount2;// 复发酵阳性份数（1ml）
	private String secondfermentcount3;// 复发酵阳性份数（0.1ml）
	private String mpn;// 最可能数（MPN）

	// Constructors

	/** default constructor */
	public Bacterialcountquery15() {
	}

	/** minimal constructor */
	public Bacterialcountquery15(String recordid) {
		this.recordid = recordid;
	}

	/** full constructor */
	public Bacterialcountquery15(String recordid, String secondfermentcount1,
			String secondfermentcount2, String secondfermentcount3, String mpn) {
		this.recordid = recordid;
		this.secondfermentcount1 = secondfermentcount1;
		this.secondfermentcount2 = secondfermentcount2;
		this.secondfermentcount3 = secondfermentcount3;
		this.mpn = mpn;
	}

	// Property accessors
	@Id
	@Column(name = "RECORDID", unique = true, nullable = false, length = 20)
	public String getRecordid() {
		return this.recordid;
	}

	public void setRecordid(String recordid) {
		this.recordid = recordid;
	}

	@Column(name = "SECONDFERMENTCOUNT1", precision = 38, scale = 0)
	public String getSecondfermentcount1() {
		return this.secondfermentcount1;
	}

	public void setSecondfermentcount1(String secondfermentcount1) {
		this.secondfermentcount1 = secondfermentcount1;
	}

	@Column(name = "SECONDFERMENTCOUNT2", precision = 38, scale = 0)
	public String getSecondfermentcount2() {
		return this.secondfermentcount2;
	}

	public void setSecondfermentcount2(String secondfermentcount2) {
		this.secondfermentcount2 = secondfermentcount2;
	}

	@Column(name = "SECONDFERMENTCOUNT3", precision = 38, scale = 0)
	public String getSecondfermentcount3() {
		return this.secondfermentcount3;
	}

	public void setSecondfermentcount3(String secondfermentcount3) {
		this.secondfermentcount3 = secondfermentcount3;
	}

	@Column(name = "MPN", length = 10)
	public String getMpn() {
		return this.mpn;
	}

	public void setMpn(String mpn) {
		this.mpn = mpn;
	}

}