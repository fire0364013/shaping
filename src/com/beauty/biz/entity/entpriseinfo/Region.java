package com.beauty.biz.entity.entpriseinfo;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * 行政区域表 Region的实体类 Region entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "REGION")
public class Region implements java.io.Serializable {

	// Fields
	private static final long serialVersionUID = 1L;
	private String regioncode; // 区域编号
	private String regionname; // 区域名字
	private String parentregioncode; // 父节点编号
	private String isused; // 是否在使用中~

	// Constructors

	/** default constructor */
	public Region() {
	}

	/** minimal constructor */
	public Region(String regioncode) {
		this.regioncode = regioncode;
	}

	/** full constructor */
	public Region(String regioncode, String regionname,
			String parentregioncode, String isused) {
		this.regioncode = regioncode;
		this.regionname = regionname;
		this.parentregioncode = parentregioncode;
		this.isused = isused;
	}

	// Property accessors
	@Id
	@Column(name = "REGIONCODE", unique = true, nullable = false, length = 20)
	public String getRegioncode() {
		return this.regioncode;
	}

	public void setRegioncode(String regioncode) {
		this.regioncode = regioncode;
	}

	@Column(name = "REGIONNAME", length = 50)
	public String getRegionname() {
		return this.regionname;
	}

	public void setRegionname(String regionname) {
		this.regionname = regionname;
	}

	@Column(name = "PARENTREGIONCODE", length = 20)
	public String getParentregioncode() {
		return this.parentregioncode;
	}

	public void setParentregioncode(String parentregioncode) {
		this.parentregioncode = parentregioncode;
	}

	@Column(name = "ISUSED", length = 2)
	public String getIsused() {
		return this.isused;
	}

	public void setIsused(String isused) {
		this.isused = isused;
	}

}