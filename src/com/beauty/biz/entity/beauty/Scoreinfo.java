package com.beauty.biz.entity.beauty;

import java.sql.Timestamp;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * 积分明细表
 * Scoreinfo entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "scoreinfo")
public class Scoreinfo implements java.io.Serializable {

	// Fields

	private String scoreinfoid;//积分id
	private String orderid;//订单id
	private String customid;//客户id
	private String score;//积分
	private String scoretype;//积分类型
	private Timestamp createdate;//生成日期
	private String validstatus;//有效状态
	private String remark;//备注

	// Constructors

	/** default constructor */
	public Scoreinfo() {
	}

	/** minimal constructor */
	public Scoreinfo(String scoreinfoid) {
		this.scoreinfoid = scoreinfoid;
	}

	/** full constructor */
	public Scoreinfo(String scoreinfoid, String orderid, String customid,
			String score, String scoretype, Timestamp createdate,
			String validstatus, String remark) {
		this.scoreinfoid = scoreinfoid;
		this.orderid = orderid;
		this.customid = customid;
		this.score = score;
		this.scoretype = scoretype;
		this.createdate = createdate;
		this.validstatus = validstatus;
		this.remark = remark;
	}

	// Property accessors
	@Id
	@Column(name = "scoreinfoid", unique = true, nullable = false, length = 20)
	public String getScoreinfoid() {
		return this.scoreinfoid;
	}

	public void setScoreinfoid(String scoreinfoid) {
		this.scoreinfoid = scoreinfoid;
	}

	@Column(name = "orderid", length = 20)
	public String getOrderid() {
		return this.orderid;
	}

	public void setOrderid(String orderid) {
		this.orderid = orderid;
	}

	@Column(name = "customid", length = 20)
	public String getCustomid() {
		return this.customid;
	}

	public void setCustomid(String customid) {
		this.customid = customid;
	}

	@Column(name = "score", length = 20)
	public String getScore() {
		return this.score;
	}

	public void setScore(String score) {
		this.score = score;
	}

	@Column(name = "scoretype", length = 2)
	public String getScoretype() {
		return this.scoretype;
	}

	public void setScoretype(String scoretype) {
		this.scoretype = scoretype;
	}

	@Column(name = "createdate", length = 19)
	public Timestamp getCreatedate() {
		return this.createdate;
	}

	public void setCreatedate(Timestamp createdate) {
		this.createdate = createdate;
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