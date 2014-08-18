package com.beauty.biz.entity.projects;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * Projectattachmenttype entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "PROJECTATTACHMENTTYPE")
public class Projectattachmenttype implements java.io.Serializable {

	// Fields

	private static final long serialVersionUID = 8688042425131831578L;
	private String attachmenttypeid;// 附件类型编号
	private String attachmenttypename;// 附件类型名称

	// Constructors

	/** default constructor */
	public Projectattachmenttype() {
	}

	/** minimal constructor */
	public Projectattachmenttype(String attachmenttypeid) {
		this.attachmenttypeid = attachmenttypeid;
	}

	/** full constructor */
	public Projectattachmenttype(String attachmenttypeid,
			String attachmenttypename) {
		this.attachmenttypeid = attachmenttypeid;
		this.attachmenttypename = attachmenttypename;
	}

	// Property accessors
	@Id
	@Column(name = "ATTACHMENTTYPEID", unique = true, nullable = false, length = 20)
	public String getAttachmenttypeid() {
		return this.attachmenttypeid;
	}

	public void setAttachmenttypeid(String attachmenttypeid) {
		this.attachmenttypeid = attachmenttypeid;
	}

	@Column(name = "ATTACHMENTTYPENAME", length = 40)
	public String getAttachmenttypename() {
		return this.attachmenttypename;
	}

	public void setAttachmenttypename(String attachmenttypename) {
		this.attachmenttypename = attachmenttypename;
	}

}