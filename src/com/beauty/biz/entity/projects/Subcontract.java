package com.beauty.biz.entity.projects;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "SUBCONTRACT")
public class Subcontract implements java.io.Serializable {

	// Fields

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String subcontractid;
	private String projectcode;
	private String subName;
	private String subAddr;
	private String subLinkman;
	private String subPhone;
	private String subitems;
	private String subreason;
	private String subremark;

	@Id
	@Column(name = "SUBCONTRACTID", unique = true, nullable = false, length = 32)
	public String getSubcontractid() {
		return this.subcontractid;
	}

	public void setSubcontractid(String subcontractid) {
		this.subcontractid = subcontractid;
	}

	@Column(name = "PROJECTCODE", length = 20)
	public String getProjectcode() {
		return this.projectcode;
	}

	public void setProjectcode(String projectcode) {
		this.projectcode = projectcode;
	}

	@Column(name = "SUB_NAME", length = 50)
	public String getSubName() {
		return this.subName;
	}

	public void setSubName(String subName) {
		this.subName = subName;
	}

	@Column(name = "SUB_ADDR", length = 100)
	public String getSubAddr() {
		return this.subAddr;
	}

	public void setSubAddr(String subAddr) {
		this.subAddr = subAddr;
	}

	@Column(name = "SUB_LINKMAN", length = 32)
	public String getSubLinkman() {
		return this.subLinkman;
	}

	public void setSubLinkman(String subLinkman) {
		this.subLinkman = subLinkman;
	}

	@Column(name = "SUB_PHONE", length = 13)
	public String getSubPhone() {
		return this.subPhone;
	}

	public void setSubPhone(String subPhone) {
		this.subPhone = subPhone;
	}

	@Column(name = "SUBITEMS", length = 1000)
	public String getSubitems() {
		return this.subitems;
	}

	public void setSubitems(String subitems) {
		this.subitems = subitems;
	}

	@Column(name = "SUBREASON", length = 1000)
	public String getSubreason() {
		return this.subreason;
	}

	public void setSubreason(String subreason) {
		this.subreason = subreason;
	}

	@Column(name = "SUBREMARK", length = 1000)
	public String getSubremark() {
		return this.subremark;
	}

	public void setSubremark(String subremark) {
		this.subremark = subremark;
	}

}
