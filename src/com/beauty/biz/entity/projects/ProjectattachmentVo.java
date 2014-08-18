package com.beauty.biz.entity.projects;

import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;

/**
 * Projectattachment entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "PROJECTATTACHMENT")
public class ProjectattachmentVo implements java.io.Serializable {

	// Fields

	private static final long serialVersionUID = 5143654346184659727L;
	private String attachmentid;// 附件编号
	private String projectid;//项目编号
	// private String attachmenttypeid;//附件类型编号
	private Projectattachmenttype projectattachmenttype;// 附件类型表的多对一的关系
	private String attachmentname;// 附件名称
	private String uploadperson;// 上传人
	private Date uploadtime;// 上传时间
	private String attachment;// 附件路径
	private String remark;// 备注

	// Constructors

	/** default constructor */
	public ProjectattachmentVo() {
	}

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "ATTACHMENTTYPEID")
	@NotFound(action = NotFoundAction.IGNORE)
	public Projectattachmenttype getProjectattachmenttype() {
		return projectattachmenttype;
	}

	public void setProjectattachmenttype(
			Projectattachmenttype projectattachmenttype) {
		this.projectattachmenttype = projectattachmenttype;
	}

	/** minimal constructor */
	public ProjectattachmentVo(String attachmentid) {
		this.attachmentid = attachmentid;
	}

	// Property accessors
	@Id
	@Column(name = "ATTACHMENTID", unique = true, nullable = false, length = 20)
	public String getAttachmentid() {
		return this.attachmentid;
	}

	public void setAttachmentid(String attachmentid) {
		this.attachmentid = attachmentid;
	}

	@Column(name = "ATTACHMENTNAME", length = 50)
	public String getAttachmentname() {
		return this.attachmentname;
	}

	public void setAttachmentname(String attachmentname) {
		this.attachmentname = attachmentname;
	}

	@Column(name = "UPLOADPERSON", length = 40)
	public String getUploadperson() {
		return this.uploadperson;
	}

	public void setUploadperson(String uploadperson) {
		this.uploadperson = uploadperson;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "UPLOADTIME", length = 7)
	public Date getUploadtime() {
		return this.uploadtime;
	}

	public void setUploadtime(Date uploadtime) {
		this.uploadtime = uploadtime;
	}

	@Column(name = "ATTACHMENT", length = 200)
	public String getAttachment() {
		return this.attachment;
	}

	public void setAttachment(String attachment) {
		this.attachment = attachment;
	}

	@Column(name = "REMARK", length = 500)
	public String getRemark() {
		return this.remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	@Column(name = "projectid", length = 40)
	public String getProjectid() {
		return projectid;
	}

	public void setProjectid(String projectid) {
		this.projectid = projectid;
	}

}