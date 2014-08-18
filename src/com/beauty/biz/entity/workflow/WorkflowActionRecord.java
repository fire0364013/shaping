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
@Table(name = "WORKFLOWACTIONRECORD"

)
public class WorkflowActionRecord implements java.io.Serializable {

	// Fields
	private static final long serialVersionUID = 7144380802652115923L;
	private String actionid;// 节点动作编号
	private String stepactioncode;// 节点动作编码
	private String stepcode;// 步骤编号
	private String targetstepcode;// 跳转到步骤编号
	private String workflowcode;// 工作流编码
	private String audituserid;// 审核人
	private Date audittime;// 审核时间
	private String auditattribute;// 审核记录
	private String entityid;// 业务数据表编号
	private String targettype;//提交类型：1 提交  2 退回
	private String steptype;//步骤类型:project 任务   sample 样品  item  项目 report 报告
	
	// Constructors

	/** default constructor */
	public WorkflowActionRecord() {
	}

	// Property accessors
	@Id
	@Column(name = "ACTIONID", unique = true, nullable = false, length = 20)
	public String getActionid() {
		return this.actionid;
	}

	public void setActionid(String actionid) {
		this.actionid = actionid;
	}

	@Column(name = "STEPACTIONCODE", length = 40)
	public String getStepactioncode() {
		return this.stepactioncode;
	}

	public void setStepactioncode(String stepactioncode) {
		this.stepactioncode = stepactioncode;
	}

	@Column(name = "STEPCODE", length = 40)
	public String getStepcode() {
		return this.stepcode;
	}

	public void setStepcode(String stepcode) {
		this.stepcode = stepcode;
	}

	@Column(name = "TARGETSTEPCODE", length = 40)
	public String getTargetstepcode() {
		return targetstepcode;
	}

	public void setTargetstepcode(String targetstepcode) {
		this.targetstepcode = targetstepcode;
	}

	@Column(name = "WORKFLOWCODE", length = 40)
	public String getWorkflowcode() {
		return this.workflowcode;
	}

	public void setWorkflowcode(String workflowcode) {
		this.workflowcode = workflowcode;
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

	@Column(name = "ENTITYID", length = 20)
	public String getEntityid() {
		return entityid;
	}

	public void setEntityid(String entityid) {
		this.entityid = entityid;
	}

	@Column(name = "TARGETTYPE", length = 20)
	public String getTargettype() {
		return targettype;
	}

	public void setTargettype(String targettype) {
		this.targettype = targettype;
	}

	@Column(name = "STEPTYPE", length = 10)
	public String getSteptype() {
		return steptype;
	}

	public void setSteptype(String steptype) {
		this.steptype = steptype;
	}

}