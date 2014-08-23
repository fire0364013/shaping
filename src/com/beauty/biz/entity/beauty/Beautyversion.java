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
 * 医美版本表
 * @author bing
 *
 */
@Entity
@Table(name = "beautyversion")
public class Beautyversion {
	private String beautyversionid;//版本id
	private EntpriseInfo entprise;//企业id
	private String versioninfo;//版本说明
	private String operator;//提交人
	private Date operatedate;//提交日期
	private String mobilephone;//联系电话
	private String validstatus;//有效状态
	private String remark;//备注
	
	@Id
	@Column(name = "beautyversionid", unique = true, nullable = false, length = 20)
	public String getBeautyversionid() {
		return beautyversionid;
	}
	public void setBeautyversionid(String beautyversionid) {
		this.beautyversionid = beautyversionid;
	}
	
//	@Column(name = "entid", length = 20)
//	public String getEntid() {
//		return entid;
//	}
//	public void setEntid(String entid) {
//		this.entid = entid;
//	}
	
	@Column(name = "versioninfo", length = 200)
	public String getVersioninfo() {
		return versioninfo;
	}
	public void setVersioninfo(String versioninfo) {
		this.versioninfo = versioninfo;
	}
	
	@Column(name = "operator", length = 20)
	public String getOperator() {
		return operator;
	}
	public void setOperator(String operator) {
		this.operator = operator;
	}
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "operatedate", length = 7)
	@NotFound(action=NotFoundAction.IGNORE)
	public Date getOperatedate() {
		return operatedate;
	}
	public void setOperatedate(Date operatedate) {
		this.operatedate = operatedate;
	}
	
	@Column(name = "mobilephone", length = 20)
	public String getMobilephone() {
		return mobilephone;
	}
	public void setMobilephone(String mobilephone) {
		this.mobilephone = mobilephone;
	}
	
	@Column(name = "validstatus", length = 20)
	public String getValidstatus() {
		return validstatus;
	}
	public void setValidstatus(String validstatus) {
		this.validstatus = validstatus;
	}
	
	@Column(name = "remark", length = 200 )
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "entid")
	public EntpriseInfo getEntprise() {
		return entprise;
	}
	public void setEntprise(EntpriseInfo entprise) {
		this.entprise = entprise;
	}
	
	
}
