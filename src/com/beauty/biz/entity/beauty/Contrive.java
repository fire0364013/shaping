package com.beauty.biz.entity.beauty;

import java.sql.Timestamp;
import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

/**
 * 促销活动信息表
 * Contrive entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "contrive")
public class Contrive implements java.io.Serializable {

	// Fields

	private String contriveid;//活动id
	private String contrivetype;//活动类型
	private String entid;//企业id
	private String produceid;//产品id
	private String contrivecount;//活动数量
	private String contriveprice;//活动价格
	private Date startdate;//开始日期
	private Date enddate;//截止时间
	private Timestamp operatedate;//操作日期
	private String operator;//操作人员
	private String validstatus;//有效状态
	private String remark;//备注

	// Constructors

	/** default constructor */
	public Contrive() {
	}

	/** minimal constructor */
	public Contrive(String contriveid) {
		this.contriveid = contriveid;
	}

	/** full constructor */
	public Contrive(String contriveid, String contrivetype, String entid,
			String produceid, String contrivecount, String contriveprice,
			Date startdate, Date enddate, Timestamp operatedate,
			String operator, String validstatus, String remark) {
		this.contriveid = contriveid;
		this.contrivetype = contrivetype;
		this.entid = entid;
		this.produceid = produceid;
		this.contrivecount = contrivecount;
		this.contriveprice = contriveprice;
		this.startdate = startdate;
		this.enddate = enddate;
		this.operatedate = operatedate;
		this.operator = operator;
		this.validstatus = validstatus;
		this.remark = remark;
	}

	// Property accessors
	@Id
	@Column(name = "contriveid", unique = true, nullable = false, length = 20)
	public String getContriveid() {
		return this.contriveid;
	}

	public void setContriveid(String contriveid) {
		this.contriveid = contriveid;
	}

	@Column(name = "contrivetype", length = 2)
	public String getContrivetype() {
		return this.contrivetype;
	}

	public void setContrivetype(String contrivetype) {
		this.contrivetype = contrivetype;
	}

	@Column(name = "entid", length = 20)
	public String getEntid() {
		return this.entid;
	}

	public void setEntid(String entid) {
		this.entid = entid;
	}

	@Column(name = "produceid", length = 20)
	public String getProduceid() {
		return this.produceid;
	}

	public void setProduceid(String produceid) {
		this.produceid = produceid;
	}

	@Column(name = "contrivecount", length = 20)
	public String getContrivecount() {
		return this.contrivecount;
	}

	public void setContrivecount(String contrivecount) {
		this.contrivecount = contrivecount;
	}

	@Column(name = "contriveprice", length = 20)
	public String getContriveprice() {
		return this.contriveprice;
	}

	public void setContriveprice(String contriveprice) {
		this.contriveprice = contriveprice;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "startdate", length = 10)
	public Date getStartdate() {
		return this.startdate;
	}

	public void setStartdate(Date startdate) {
		this.startdate = startdate;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "enddate", length = 10)
	public Date getEnddate() {
		return this.enddate;
	}

	public void setEnddate(Date enddate) {
		this.enddate = enddate;
	}

	@Column(name = "operatedate", length = 19)
	public Timestamp getOperatedate() {
		return this.operatedate;
	}

	public void setOperatedate(Timestamp operatedate) {
		this.operatedate = operatedate;
	}

	@Column(name = "operator", length = 20)
	public String getOperator() {
		return this.operator;
	}

	public void setOperator(String operator) {
		this.operator = operator;
	}

	@Column(name = "validstatus", length = 2)
	public String getValidstatus() {
		return this.validstatus;
	}

	public void setValidstatus(String validstatus) {
		this.validstatus = validstatus;
	}

	@Column(name = "remark", length = 200)
	public String getRemark() {
		return this.remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

}