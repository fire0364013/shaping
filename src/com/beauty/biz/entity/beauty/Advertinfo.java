package com.beauty.biz.entity.beauty;

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

import com.beauty.biz.entity.entpriseinfo.EntpriseInfo;

/**
 * 企业广告图片表
 * Advertinfo entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "advertinfo")
public class Advertinfo implements java.io.Serializable {

	// Fields

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String advertid; //广告序号
	private EntpriseInfo entprise;;//企业ID
	private String advertType;//广告类型
	private String advertTitle;//广告标题
	private String advertPicUrl2;//广告图片2
	private String advertPicUrl3;//广告图片3
	private String advertPicUrl1;//广告图片1
	private Date uploadTime;//上传时间
	private String uploadOperator;//上传人员
	private String releaseFlag;//发布状态
	private Date releaseTime;//发布时间
	private String validStatus;//有效状态
	private String remark;//备注

	// Constructors

	/** default constructor */
	public Advertinfo() {
	}

	/** minimal constructor */
	public Advertinfo(String advertid) {
		this.advertid = advertid;
	}

	// Property accessors
	@Id
	@Column(name = "advertid", unique = true, nullable = false, length = 20)
	public String getAdvertid() {
		return this.advertid;
	}

	public void setAdvertid(String advertid) {
		this.advertid = advertid;
	}

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "entid")
	public EntpriseInfo getEntprise() {
		return entprise;
	}
	public void setEntprise(EntpriseInfo entprise) {
		this.entprise = entprise;
	}

	@Column(name = "advertType", length = 10)
	public String getAdvertType() {
		return this.advertType;
	}

	public void setAdvertType(String advertType) {
		this.advertType = advertType;
	}

	@Column(name = "advertTitle", length = 100)
	public String getAdvertTitle() {
		return this.advertTitle;
	}

	public void setAdvertTitle(String advertTitle) {
		this.advertTitle = advertTitle;
	}

	@Column(name = "advertPicUrl2", length = 100)
	public String getAdvertPicUrl2() {
		return this.advertPicUrl2;
	}

	public void setAdvertPicUrl2(String advertPicUrl2) {
		this.advertPicUrl2 = advertPicUrl2;
	}

	@Column(name = "advertPicUrl3", length = 100)
	public String getAdvertPicUrl3() {
		return this.advertPicUrl3;
	}

	public void setAdvertPicUrl3(String advertPicUrl3) {
		this.advertPicUrl3 = advertPicUrl3;
	}

	@Column(name = "advertPicUrl1", length = 100)
	public String getAdvertPicUrl1() {
		return this.advertPicUrl1;
	}

	public void setAdvertPicUrl1(String advertPicUrl1) {
		this.advertPicUrl1 = advertPicUrl1;
	}

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "uploadTime", length = 7)
	@NotFound(action=NotFoundAction.IGNORE)
	public Date getUploadTime() {
		return this.uploadTime;
	}

	public void setUploadTime(Date uploadTime) {
		this.uploadTime = uploadTime;
	}

	@Column(name = "uploadOperator", length = 100)
	public String getUploadOperator() {
		return this.uploadOperator;
	}

	public void setUploadOperator(String uploadOperator) {
		this.uploadOperator = uploadOperator;
	}

	@Column(name = "releaseFlag", length = 2)
	public String getReleaseFlag() {
		return this.releaseFlag;
	}

	public void setReleaseFlag(String releaseFlag) {
		this.releaseFlag = releaseFlag;
	}

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "releaseTime", length = 7)
	@NotFound(action=NotFoundAction.IGNORE)
	public Date getReleaseTime() {
		return this.releaseTime;
	}

	public void setReleaseTime(Date releaseTime) {
		this.releaseTime = releaseTime;
	}

	@Column(name = "validStatus", length = 1)
	public String getValidStatus() {
		return this.validStatus;
	}

	public void setValidStatus(String validStatus) {
		this.validStatus = validStatus;
	}

	@Column(name = "remark")
	public String getRemark() {
		return this.remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

}