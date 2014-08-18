package com.beauty.biz.entity.iteminfo;

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

import com.beauty.biz.entity.Unit;
import com.beauty.biz.entity.entpriseinfo.EntpriseInfo;


/**
 * Iteminfo entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "ITEMINFO")
public class Iteminfo implements java.io.Serializable {
	private static final long serialVersionUID = 6790055547836882733L;
	// Fields
	private String itemid; // 项目编号
	private Monitoritemtype monitoritemtype; // 项目类型===========
	private String itemname; // 项目名称
	private String remark; // 备注
	private String createby; // 创建人
	private Date createtime; // 创建时间
	private String entid; // 所属企业
	private String standfee;//费用标准
	private String orderid;//序号



	// Property accessors
	@Id
	@Column(name = "ITEMID", unique = true, nullable = false, length = 50)
	public String getItemid() {
		return this.itemid;
	}

	public void setItemid(String itemid) {
		this.itemid = itemid;
	}


	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "ITEMTYPEID")
	@NotFound(action = NotFoundAction.IGNORE)
	public Monitoritemtype getMonitoritemtype() {
		return this.monitoritemtype;
	}

	public void setMonitoritemtype(Monitoritemtype monitoritemtype) {
		this.monitoritemtype = monitoritemtype;
	}

	@Column(name = "ITEMNAME", nullable = false, length = 100)
	public String getItemname() {
		return this.itemname;
	}

	public void setItemname(String itemname) {
		this.itemname = itemname;
	}


	@Column(name = "REMARK", length = 4000)
	public String getRemark() {
		return this.remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	@Column(name = "CREATEBY", length = 50)
	public String getCreateby() {
		return this.createby;
	}

	public void setCreateby(String createby) {
		this.createby = createby;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "CREATETIME", nullable = false, length = 7)
	public Date getCreatetime() {
		return this.createtime;
	}

	public void setCreatetime(Date createtime) {
		this.createtime = createtime;
	}

//	@ManyToOne(fetch = FetchType.LAZY)
//	@JoinColumn(name = "ENTID")
//	@NotFound(action = NotFoundAction.IGNORE)
	@Column(name = "ENTID", length = 30)
	public String getEntid() {
		return entid;
	}

	public void setEntid(String entid) {
		this.entid = entid;
	}

	@Column(name = "STANDFEE", length = 20)
	public String getStandfee() {
		return standfee;
	}

	public void setStandfee(String standfee) {
		this.standfee = standfee;
	}

	@Column(name = "ORDERID", length = 20)
	public String getOrderid() {
		return orderid;
	}

	public void setOrderid(String orderid) {
		this.orderid = orderid;
	}



}