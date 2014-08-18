package com.beauty.biz.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;


/**
 * 
 * 人员上岗证信息表 Certificateinfo entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "CERTIFICATEINFO")
public class Certificateinfo implements java.io.Serializable {

	// Fields
	private static final long serialVersionUID = 1L;
	private String id; // 主键编号
	// private Iteminfo itemid;//项目编号 外键参照 iteminfo表
	/*
	 * private String methodid;//方法编号 外键参照 method表 private String userid;//用户编号
	 * 外键参照userinfo表
	 */
	private Userinfo userinfo;// 用户编号 外键参照userinfo表

	private String stationno;// 上岗证编号
	private Date licensingdate;// 领证日期
	private Date theorycheckdate;// 理论考核日期
	private String theorycheckresult;// 理论考核结果（合格、不合格）
	private Date realcheckdate;// 实样考核日期
	private String realcheckresult;// 实样考核结果（合格，不合格）
	private String skillcheckresult;// 技能考核结果(合格，不合格)
	private Date skillcheckdate;// 技能考核日期
	private String attachment;// 附件
	private String createby;// 创建人
	private Date createdate;// 创建日期

	// private Set<Iteminfo> itemList = new HashSet<Iteminfo>(0);
	// Constructors

	/** default constructor */
	public Certificateinfo() {
	}


	/** minimal constructor */
	public Certificateinfo(String id, String stationno) {
		this.id = id;
		this.stationno = stationno;
	}


	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "USERID")
	@NotFound(action = NotFoundAction.IGNORE)
	public Userinfo getUserinfo() {
		return userinfo;
	}

	public void setUserinfo(Userinfo userinfo) {
		this.userinfo = userinfo;
	}

	// Property accessors
	@Id
	@Column(name = "ID", unique = true, nullable = false, length = 50)
	public String getId() {
		return this.id;
	}

	public void setId(String id) {
		this.id = id;
	}

	@Column(name = "STATIONNO", nullable = false, length = 20)
	public String getStationno() {
		return this.stationno;
	}

	public void setStationno(String stationno) {
		this.stationno = stationno;
	}

	@Column(name = "ATTACHMENT", length = 500)
	public String getAttachment() {
		return this.attachment;
	}

	public void setAttachment(String attachment) {
		this.attachment = attachment;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "THEORYCHECKDATE", length = 7)
	public Date getTheorycheckdate() {
		return this.theorycheckdate;
	}

	public void setTheorycheckdate(Date theorycheckdate) {
		this.theorycheckdate = theorycheckdate;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "LICENSINGDATE", length = 7)
	public Date getLicensingdate() {
		return licensingdate;
	}

	public void setLicensingdate(Date licensingdate) {
		this.licensingdate = licensingdate;
	}

	@Column(name = "THEORYCHECKRESULT", length = 50)
	public String getTheorycheckresult() {
		return this.theorycheckresult;
	}

	public void setTheorycheckresult(String theorycheckresult) {
		this.theorycheckresult = theorycheckresult;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "REALCHECKDATE", length = 7)
	public Date getRealcheckdate() {
		return this.realcheckdate;
	}

	public void setRealcheckdate(Date realcheckdate) {
		this.realcheckdate = realcheckdate;
	}

	@Column(name = "REALCHECKRESULT", length = 50)
	public String getRealcheckresult() {
		return this.realcheckresult;
	}

	public void setRealcheckresult(String realcheckresult) {
		this.realcheckresult = realcheckresult;
	}

	@Column(name = "SKILLCHECKRESULT", length = 50)
	public String getSkillcheckresult() {
		return this.skillcheckresult;
	}

	public void setSkillcheckresult(String skillcheckresult) {
		this.skillcheckresult = skillcheckresult;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "SKILLCHECKDATE", length = 7)
	public Date getSkillcheckdate() {
		return this.skillcheckdate;
	}

	public void setSkillcheckdate(Date skillcheckdate) {
		this.skillcheckdate = skillcheckdate;
	}

	@Column(name = "CREATEBY", length = 50)
	public String getCreateby() {
		return this.createby;
	}

	public void setCreateby(String createby) {
		this.createby = createby;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "CREATEDATE", length = 7)
	public Date getCreatedate() {
		return this.createdate;
	}

	public void setCreatedate(Date createdate) {
		this.createdate = createdate;
	}

}