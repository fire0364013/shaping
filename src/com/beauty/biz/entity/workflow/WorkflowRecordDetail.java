package com.beauty.biz.entity.workflow;

// default package

import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

/**
 * WorkflowActionRecord entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "WORKFLOWRECORDDETAIL"

)
public class WorkflowRecordDetail implements java.io.Serializable {

	// Fields
	private static final long serialVersionUID = 7144380802652115923L;
	private String id;
	private String actionid;// 审核记录编号
	private String audituserid;// 审核人
	private Date audittime;// 审核时间
	private String auditattribute;// 审核记录
	private String itemids;

	@Id
	@Column(name = "ID", unique = true, nullable = false, length = 40)
	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	@Column(name = "ACTIONID", length = 20)
	public String getActionid() {
		return this.actionid;
	}

	public void setActionid(String actionid) {
		this.actionid = actionid;
	}

	@Column(name = "AUDITUSERID", length = 40)
	public String getAudituserid() {
		return this.audituserid;
	}

	public void setAudituserid(String audituserid) {
		this.audituserid = audituserid;
	}

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "AUDITTIME", length = 7)
	public Date getAudittime() {
		return this.audittime;
	}

	public void setAudittime(Date audittime) {
		this.audittime = audittime;
	}

	@Column(name = "AUDITATTRIBUTE", length = 200)
	public String getAuditattribute() {
		return this.auditattribute;
	}

	public void setAuditattribute(String auditattribute) {
		this.auditattribute = auditattribute;
	}

	@Column(name = "ITEMIDS", length = 300)
	public String getItemids() {
		return itemids;
	}

	public void setItemids(String itemids) {
		this.itemids = itemids;
	}

}