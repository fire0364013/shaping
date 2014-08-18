package com.beauty.biz.entity.iteminfo;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;

/**
 * Itemgroup entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "ITEMGROUP")
public class Itemgroup implements java.io.Serializable {

	// Fields

	private static final long serialVersionUID = -7817583390610338515L;
	private String id; // 排序用的
	private String itemid;// 详细信息编号
	private String itemtypeid;// 项目编号
	private Monitoritemtype monitoritemtype;// 监测类型
	private Iteminfo iteminfo;

	// Constructors
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "ITEMTYPEID", insertable = false, updatable = false)
	@NotFound(action = NotFoundAction.IGNORE)
	public Monitoritemtype getMonitoritemtype() {
		return monitoritemtype;
	}

	public void setMonitoritemtype(Monitoritemtype monitoritemtype) {
		this.monitoritemtype = monitoritemtype;
	}

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "ITEMID", insertable = false, updatable = false)
	@NotFound(action = NotFoundAction.IGNORE)
	public Iteminfo getIteminfo() {
		return iteminfo;
	}

	public void setIteminfo(Iteminfo iteminfo) {
		this.iteminfo = iteminfo;
	}

	/** default constructor */
	public Itemgroup() {
	}

	/** minimal constructor */
	public Itemgroup(String id) {
		this.id = id;
	}

	// Property accessors
	@Id
	@Column(name = "ID", unique = true, nullable = false, length = 20)
	public String getId() {
		return this.id;
	}

	public void setId(String id) {
		this.id = id;
	}

	@Column(name = "ITEMID", length = 50)
	public String getItemid() {
		return this.itemid;
	}

	public void setItemid(String itemid) {
		this.itemid = itemid;
	}

	@Column(name = "ITEMTYPEID", length = 10)
	public String getItemtypeid() {
		return this.itemtypeid;
	}

	public void setItemtypeid(String itemtypeid) {
		this.itemtypeid = itemtypeid;
	}

}