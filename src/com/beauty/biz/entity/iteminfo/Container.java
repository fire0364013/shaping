package com.beauty.biz.entity.iteminfo;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * 容器表 Container entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "CONTAINER")
public class Container implements java.io.Serializable {

	// Fields
	private static final long serialVersionUID = 1717123564467078003L;
	private String containerid;// 容器编号
	private String containername;// 容器名称
	private String tag;// 容器标识符
	private String remark;// 备注

	// Constructors

	/** default constructor */
	public Container() {
	}

	/** minimal constructor */
	public Container(String containerid) {
		this.containerid = containerid;
	}

	/** full constructor */
	public Container(String containerid, String containername, String tag,
			String remark) {
		this.containerid = containerid;
		this.containername = containername;
		this.tag = tag;
		this.remark = remark;
	}

	// Property accessors
	@Id
	@Column(name = "CONTAINERID", unique = true, nullable = false, length = 20)
	public String getContainerid() {
		return this.containerid;
	}

	public void setContainerid(String containerid) {
		this.containerid = containerid;
	}

	@Column(name = "CONTAINERNAME", length = 40)
	public String getContainername() {
		return this.containername;
	}

	public void setContainername(String containername) {
		this.containername = containername;
	}

	@Column(name = "TAG", length = 20)
	public String getTag() {
		return this.tag;
	}

	public void setTag(String tag) {
		this.tag = tag;
	}

	@Column(name = "REMARK", length = 500)
	public String getRemark() {
		return this.remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

}