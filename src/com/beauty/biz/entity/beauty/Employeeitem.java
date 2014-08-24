package com.beauty.biz.entity.beauty;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * 员工项目表
 * Employeeitem entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "employeeitem")
public class Employeeitem implements java.io.Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	// Fields

	private String employeeitemid;//员工项目id
	private String employeeid;//员工id
	private String itemid;//项目id
	private String bewrite;//描述
	private String isgoldmedal;//是否金牌项目
	private String grade;//评分
	private String validstatus;//有效状态
	private String remark;//备注

	// Constructors

	/** default constructor */
	public Employeeitem() {
	}

	/** minimal constructor */
	public Employeeitem(String employeeitemid) {
		this.employeeitemid = employeeitemid;
	}

	/** full constructor */
	public Employeeitem(String employeeitemid, String employeeid,
			String itemid, String bewrite, String isgoldmedal, String grade,
			String validstatus, String remark) {
		this.employeeitemid = employeeitemid;
		this.employeeid = employeeid;
		this.itemid = itemid;
		this.bewrite = bewrite;
		this.isgoldmedal = isgoldmedal;
		this.grade = grade;
		this.validstatus = validstatus;
		this.remark = remark;
	}

	// Property accessors
	@Id
	@Column(name = "employeeitemid", unique = true, nullable = false, length = 20)
	public String getEmployeeitemid() {
		return this.employeeitemid;
	}

	public void setEmployeeitemid(String employeeitemid) {
		this.employeeitemid = employeeitemid;
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

	@Column(name = "bewrite", length = 200)
	public String getBewrite() {
		return this.bewrite;
	}

	public void setBewrite(String bewrite) {
		this.bewrite = bewrite;
	}

	@Column(name = "isgoldmedal", length = 2)
	public String getIsgoldmedal() {
		return this.isgoldmedal;
	}

	public void setIsgoldmedal(String isgoldmedal) {
		this.isgoldmedal = isgoldmedal;
	}

	@Column(name = "grade", length = 20)
	public String getGrade() {
		return this.grade;
	}

	public void setGrade(String grade) {
		this.grade = grade;
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