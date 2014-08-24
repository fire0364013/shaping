package com.beauty.biz.entity.beautyinfo;

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
 * 医美图片表
 * @author bing
 *
 */
@Entity
@Table(name = "beautyinfo")
public class Beautyinfo {

	private String beautyinfoid;//明细id
	private String  beautyversionid;//版本id
	private String infotitle;//标题
	private String infoPicUrl2;//图片2
	private String infoPicUrl3;//图片3
	private String infoPicUrl1;//图片1
	private Date uploadTime;//上传时间
	private String uploadOperator;//上传人员
	private String validStatus;//有效状态 0:停用  1：正常
	private String remark;//备注
	
	@Id
	@Column(name = "beautyinfoid", unique = true, nullable = false, length = 20)
	public String getBeautyinfoid() {
		return beautyinfoid;
	}
	public void setBeautyinfoid(String beautyinfoid) {
		this.beautyinfoid = beautyinfoid;
	}
	
	@Column(name = "beautyversionid", length = 20)
	public String getBeautyversionid() {
		return beautyversionid;
	}
	public void setBeautyversionid(String beautyversionid) {
		this.beautyversionid = beautyversionid;
	}
	
	@Column(name = "infotitle", length = 100)
	public String getInfotitle() {
		return infotitle;
	}
	public void setInfotitle(String infotitle) {
		this.infotitle = infotitle;
	}
	
	@Column(name = "infoPicUrl2", length = 100)
	public String getInfoPicUrl2() {
		return infoPicUrl2;
	}
	public void setInfoPicUrl2(String infoPicUrl2) {
		this.infoPicUrl2 = infoPicUrl2;
	}
	
	@Column(name = "infoPicUrl3", length = 100)
	public String getInfoPicUrl3() {
		return infoPicUrl3;
	}
	public void setInfoPicUrl3(String infoPicUrl3) {
		this.infoPicUrl3 = infoPicUrl3;
	}
	
	@Column(name = "infoPicUrl1", length = 100)
	public String getInfoPicUrl1() {
		return infoPicUrl1;
	}
	public void setInfoPicUrl1(String infoPicUrl1) {
		this.infoPicUrl1 = infoPicUrl1;
	}
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "uploadTime", length = 7)
	@NotFound(action=NotFoundAction.IGNORE)
	public Date getUploadTime() {
		return uploadTime;
	}
	public void setUploadTime(Date uploadTime) {
		this.uploadTime = uploadTime;
	}
	
	@Column(name = "uploadOperator", length = 100)
	public String getUploadOperator() {
		return uploadOperator;
	}
	public void setUploadOperator(String uploadOperator) {
		this.uploadOperator = uploadOperator;
	}
	
	@Column(name = "validStatus", length = 1)
	public String getValidStatus() {
		return validStatus;
	}
	public void setValidStatus(String validStatus) {
		this.validStatus = validStatus;
	}
	
	@Column(name = "remark", length = 255)
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	
	
}
