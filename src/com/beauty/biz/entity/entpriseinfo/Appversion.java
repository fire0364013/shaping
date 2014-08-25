package com.beauty.biz.entity.entpriseinfo;

import java.sql.Timestamp;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;

/**
 * 应用版本表
 * Appversion entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "appversion")
public class Appversion implements java.io.Serializable {

	// Fields

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String appversionid;//应用版本id
	private String appversionnumber;//版本序号
	private String appversionname;//版本名称
	private String appversionlog;//更新日志
	private String appversionurl;//下载地址
	private String releaser;//发布人员
	private Date releasedate;//发布日期
	private String operator;//操作人员
	private Timestamp operateDate;//操作日期
	private String validstatus;//有效状态
	private String remark;//备注

	// Constructors

	/** default constructor */
	public Appversion() {
	}

	/** minimal constructor */
	public Appversion(String appversionid) {
		this.appversionid = appversionid;
	}

	/** full constructor */
	public Appversion(String appversionid, String appversionnumber,
			String appversionname, String appversionlog, String appversionurl,
			String releaser, Timestamp releasedate, String operator,
			Timestamp operateDate, String validstatus, String remark) {
		this.appversionid = appversionid;
		this.appversionnumber = appversionnumber;
		this.appversionname = appversionname;
		this.appversionlog = appversionlog;
		this.appversionurl = appversionurl;
		this.releaser = releaser;
		this.releasedate = releasedate;
		this.operator = operator;
		this.operateDate = operateDate;
		this.validstatus = validstatus;
		this.remark = remark;
	}

	// Property accessors
	@Id
	@Column(name = "appversionid", unique = true, nullable = false, length = 20)
	public String getAppversionid() {
		return this.appversionid;
	}

	public void setAppversionid(String appversionid) {
		this.appversionid = appversionid;
	}

	@Column(name = "appversionnumber", length = 20)
	public String getAppversionnumber() {
		return this.appversionnumber;
	}

	public void setAppversionnumber(String appversionnumber) {
		this.appversionnumber = appversionnumber;
	}

	@Column(name = "appversionname", length = 200)
	public String getAppversionname() {
		return this.appversionname;
	}

	public void setAppversionname(String appversionname) {
		this.appversionname = appversionname;
	}

	@Column(name = "appversionlog", length = 2000)
	public String getAppversionlog() {
		return this.appversionlog;
	}

	public void setAppversionlog(String appversionlog) {
		this.appversionlog = appversionlog;
	}

	@Column(name = "appversionurl")
	public String getAppversionurl() {
		return this.appversionurl;
	}

	public void setAppversionurl(String appversionurl) {
		this.appversionurl = appversionurl;
	}

	@Column(name = "releaser", length = 20)
	public String getReleaser() {
		return this.releaser;
	}

	public void setReleaser(String releaser) {
		this.releaser = releaser;
	}

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "releasedate", length = 7)
	@NotFound(action=NotFoundAction.IGNORE)
	public Date getReleasedate() {
		return this.releasedate;
	}

	public void setReleasedate(Date releasedate) {
		this.releasedate = releasedate;
	}

	@Column(name = "Operator", length = 20)
	public String getOperator() {
		return this.operator;
	}

	public void setOperator(String operator) {
		this.operator = operator;
	}

	@Column(name = "OperateDate", length = 19)
	public Timestamp getOperateDate() {
		return this.operateDate;
	}

	public void setOperateDate(Timestamp operateDate) {
		this.operateDate = operateDate;
	}

	@Column(name = "validstatus", length = 2)
	public String getValidstatus() {
		return this.validstatus;
	}

	public void setValidstatus(String validstatus) {
		this.validstatus = validstatus;
	}

	@Column(name = "remark")
	public String getRemark() {
		return this.remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

}