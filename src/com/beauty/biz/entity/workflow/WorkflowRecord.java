package com.beauty.biz.entity.workflow;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;

/**
 * 
 * @author beauty405
 *
 */
@Entity
@Table(name="WORKFLOW_RECORD")
public class WorkflowRecord implements Serializable {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 6881042817749276101L;
	
	private int recodeId;//记录编号
	private int sourceTaskId;//前置任务编号
	private int targetTaskId;//后置任务编号
	private String workflowCode;//工作流编码
	private Integer entityId;//业务实体编号
	private String recordName;//动作名称
	private String description;//动作描述
	private Integer recordUserId;//操作人
	private Date recordTime;//操作时间
	
	@Id
	@Column(name="RECORD_ID",unique=true,nullable=false,length=8)
	public int getRecodeId() {
		return recodeId;
	}
	public void setRecodeId(int recodeId) {
		this.recodeId = recodeId;
	}
	@Column(name="SOURCE_TASK_ID",nullable=false,length=8)
	public int getSourceTaskId() {
		return sourceTaskId;
	}
	public void setSourceTaskId(int sourceTaskId) {
		this.sourceTaskId = sourceTaskId;
	}
	@Column(name="TARGET_TASK_ID",nullable=false,length=8)
	public int getTargetTaskId() {
		return targetTaskId;
	}
	public void setTargetTaskId(int targetTaskId) {
		this.targetTaskId = targetTaskId;
	}
	@Column(name="WORKFLOW_CODE",nullable=false,length=64)
	public String getWorkflowCode() {
		return workflowCode;
	}
	public void setWorkflowCode(String workflowCode) {
		this.workflowCode = workflowCode;
	}
	@Column(name="ENTITY_ID",nullable=false,length=8)
	public Integer getEntityId() {
		return entityId;
	}
	public void setEntityId(Integer entityId) {
		this.entityId = entityId;
	}
	@Column(name="RECORD_NAME",length=64)
	public String getRecordName() {
		return recordName;
	}
	public void setRecordName(String recordName) {
		this.recordName = recordName;
	}
	@Column(name="RECORD_DESCRIPTION",length=256)
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	@Column(name="RECORD_USER",nullable=false,length=8)
	public Integer getRecordUserId() {
		return recordUserId;
	}
	public void setRecordUserId(Integer recordUserId) {
		this.recordUserId = recordUserId;
	}
	@Temporal(TemporalType.DATE)
	@Column(name="RECORD_TIME",length=7)
	@NotFound(action=NotFoundAction.IGNORE)
	public Date getRecordTime() {
		return recordTime;
	}
	public void setRecordTime(Date recordTime) {
		this.recordTime = recordTime;
	}

}