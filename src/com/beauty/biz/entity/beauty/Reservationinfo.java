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
 * 客户预约表
 * Reservationinfo entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "reservationinfo")
public class Reservationinfo implements java.io.Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	// Fields

	private String reservationinfoid;//预约id
	private String customid;//客户id
	private Timestamp operatedate;//操作时间
	private String employeeid;//技师id
	private String itemid;//项目id
	private Date reservationdate;//预约日期
	private String reservationtime;//预约时间
	private String validstatus;//有效状态
	private String remark;//备注

	// Constructors

	/** default constructor */
	public Reservationinfo() {
	}

	/** minimal constructor */
	public Reservationinfo(String reservationinfoid) {
		this.reservationinfoid = reservationinfoid;
	}

	/** full constructor */
	public Reservationinfo(String reservationinfoid, String customid,
			Timestamp operatedate, String employeeid, String itemid,
			Date reservationdate, String reservationtime, String validstatus,
			String remark) {
		this.reservationinfoid = reservationinfoid;
		this.customid = customid;
		this.operatedate = operatedate;
		this.employeeid = employeeid;
		this.itemid = itemid;
		this.reservationdate = reservationdate;
		this.reservationtime = reservationtime;
		this.validstatus = validstatus;
		this.remark = remark;
	}

	// Property accessors
	@Id
	@Column(name = "reservationinfoid", unique = true, nullable = false, length = 20)
	public String getReservationinfoid() {
		return this.reservationinfoid;
	}

	public void setReservationinfoid(String reservationinfoid) {
		this.reservationinfoid = reservationinfoid;
	}

	@Column(name = "customid", length = 20)
	public String getCustomid() {
		return this.customid;
	}

	public void setCustomid(String customid) {
		this.customid = customid;
	}

	@Column(name = "operatedate", length = 19)
	public Timestamp getOperatedate() {
		return this.operatedate;
	}

	public void setOperatedate(Timestamp operatedate) {
		this.operatedate = operatedate;
	}

	@Column(name = "employeeid", length = 20)
	public String getEmployeeid() {
		return this.employeeid;
	}

	public void setEmployeeid(String employeeid) {
		this.employeeid = employeeid;
	}

	@Column(name = "itemid", length = 20)
	public String getItemid() {
		return this.itemid;
	}

	public void setItemid(String itemid) {
		this.itemid = itemid;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "reservationdate", length = 10)
	public Date getReservationdate() {
		return this.reservationdate;
	}

	public void setReservationdate(Date reservationdate) {
		this.reservationdate = reservationdate;
	}

	@Column(name = "reservationtime", length = 2)
	public String getReservationtime() {
		return this.reservationtime;
	}

	public void setReservationtime(String reservationtime) {
		this.reservationtime = reservationtime;
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