package com.beauty.biz.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * Departmentinfo entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "DEPARTMENTINFO")
public class Departmentinfo implements java.io.Serializable {

	// Fields

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String deptid; // 部门编号
	private String deptname; // 部门名称
	private Integer parentdeptid; // 父部门编号
	private String orderid; // 序号
	private String entid; // 所属企业序号

	/** minimal constructor */

	// Property accessors
	@Id
	@Column(name = "DEPTID", unique = true, length = 40)
	public String getDeptid() {
		return deptid;
	}

	public void setDeptid(String deptid) {
		this.deptid = deptid;
	}

	@Column(name = "DEPTNAME", nullable = false, length = 100)
	public String getDeptname() {
		return this.deptname;
	}

	public void setDeptname(String deptname) {
		this.deptname = deptname;
	}

	@Column(name = "PARENTDEPTID", nullable = false, precision = 38, scale = 0)
	public Integer getParentdeptid() {
		return parentdeptid;
	}

	public void setParentdeptid(Integer parentdeptid) {
		this.parentdeptid = parentdeptid;
	}

	@Column(name = "ORDERID", length = 20)
	public String getOrderid() {
		return this.orderid;
	}

	public void setOrderid(String orderid) {
		this.orderid = orderid;
	}

	@Column(name = "ENTID", length = 20)
	public String getEntid() {
		return entid;
	}

	public void setEntid(String entid) {
		this.entid = entid;
	}

}