package com.beauty.biz.entity.projects;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;

import com.beauty.biz.entity.iteminfo.Iteminfo;
import com.beauty.biz.entity.iteminfo.Monitoritemtype;

/**
 * Projectitem entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "PROJECTITEM")
public class Projectitem implements java.io.Serializable {

	// Fields

	private String projectitemid;
	private String projectcode;
	private Monitoritemtype itemtype;
	private Iteminfo item;
	private String itemfee;

	// Property accessors
	@Id
	@Column(name = "PROJECTITEMID", unique = true, nullable = false, length = 20)
	public String getProjectitemid() {
		return this.projectitemid;
	}

	public void setProjectitemid(String projectitemid) {
		this.projectitemid = projectitemid;
	}

	@Column(name = "PROJECTCODE", length = 20)
	public String getProjectcode() {
		return this.projectcode;
	}

	public void setProjectcode(String projectcode) {
		this.projectcode = projectcode;
	}

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "ITEMTYPEID")
	@NotFound(action = NotFoundAction.IGNORE)
	public Monitoritemtype getItemtype() {
		return itemtype;
	}

	public void setItemtype(Monitoritemtype itemtype) {
		this.itemtype = itemtype;
	}

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "ITEMID")
	@NotFound(action = NotFoundAction.IGNORE)
	public Iteminfo getItem() {
		return item;
	}

	public void setItem(Iteminfo item) {
		this.item = item;
	}

	@Column(name = "ITEMFEE", length = 20)
	public String getItemfee() {
		return itemfee;
	}

	public void setItemfee(String itemfee) {
		this.itemfee = itemfee;
	}

}