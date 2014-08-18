package com.beauty.biz.entity.group;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * 部门组表 Departmentgroup entity. @author lh
 */
@Entity
@Table(name = "DEPARTMENTGROUP")
public class Departmentgroup implements java.io.Serializable {

	// Fields

	/**
	 * 
	 */
	private static final long serialVersionUID = 7558725026112938012L;
	private String groupid; // 组的id
	private String groupname;// 组的名字
	private String deptid;// 部门的id

	// Constructors

	/** default constructor */
	public Departmentgroup() {
	}

	/** minimal constructor */
	public Departmentgroup(String groupid) {
		this.groupid = groupid;
	}

	/** full constructor */
	public Departmentgroup(String groupid, String groupname, String deptid) {
		this.groupid = groupid;
		this.groupname = groupname;
		this.deptid = deptid;
	}

	// Property accessors
	@Id
	@Column(name = "GROUPID", unique = true, nullable = false, length = 20)
	public String getGroupid() {
		return this.groupid;
	}

	public void setGroupid(String groupid) {
		this.groupid = groupid;
	}

	@Column(name = "GROUPNAME", length = 40)
	public String getGroupname() {
		return this.groupname;
	}

	public void setGroupname(String groupname) {
		this.groupname = groupname;
	}

	@Column(name = "DEPTID", length = 18)
	public String getDeptid() {
		return this.deptid;
	}

	public void setDeptid(String deptid) {
		this.deptid = deptid;
	}

}