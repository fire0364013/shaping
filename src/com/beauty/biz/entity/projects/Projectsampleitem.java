package com.beauty.biz.entity.projects;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;

import com.beauty.biz.entity.iteminfo.Iteminfo;

/**
 * Projectsampleitem entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "PROJECTSAMPLEITEM")
public class Projectsampleitem implements java.io.Serializable {

	// Fields
	private static final long serialVersionUID = 4706236990283373278L;
	private String sampleitemid; // 计划样品项目编号
	private Iteminfo item; // 检测项目编号
	private String itemtypeid; // 项目类型
	
	
	
	
  	private Float sampleFee;// 样品采集费
	private Float beforeFee;// 前处理费
	private Float analysisFee; //分析费

	// Constructors

	/** default constructor */
	public Projectsampleitem() {
	}

	/** minimal constructor */
	public Projectsampleitem(String sampleitemid) {
		this.sampleitemid = sampleitemid;
	}

	// Property accessors
	@Id
	@Column(name = "SAMPLEITEMID", unique = true, nullable = false, length = 40)
	public String getSampleitemid() {
		return this.sampleitemid;
	}

	public void setSampleitemid(String sampleitemid) {
		this.sampleitemid = sampleitemid;
	}


	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "ITEMID")
	@NotFound(action = NotFoundAction.IGNORE)
	public Iteminfo getItem() {
		return item;
	}

	public void setItem(Iteminfo item) {
		this.item = item;
	}

	@Column(name = "ITEMTYPEID")
	public String getItemtypeid() {
		return itemtypeid;
	}

	public void setItemtypeid(String itemtypeid) {
		this.itemtypeid = itemtypeid;
	}

	
	@Column(name = "SAMPLE_FEE", precision = 22, scale = 0)
	public Float getSampleFee() {
		return sampleFee;
	}

	public void setSampleFee(Float sampleFee) {
		this.sampleFee = sampleFee;
	}

	@Column(name = "BEFORE_FEE", precision = 22, scale = 0)
	public Float getBeforeFee() {
		return beforeFee;
	}

	public void setBeforeFee(Float beforeFee) {
		this.beforeFee = beforeFee;
	}

	@Column(name = "ANALYSIS_FEE", precision = 22, scale = 0)
	public Float getAnalysisFee() {
		return analysisFee;
	}

	public void setAnalysisFee(Float analysisFee) {
		this.analysisFee = analysisFee;
	}
}