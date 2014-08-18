package com.beauty.biz.entity.workflow;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * 
 * @author beauty405
 *
 */
@Entity
@Table(name="WORKFLOW_EVENT")
public class WorkflowEvent implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 6795919270961647140L;
	
	private int eventId;//动作编号
	private Integer sourceTaskId;//前置任务编码
	private Integer targetTaskId;//后置任务编码
	private String workflowCode;//工作流编码
	private Integer eventEnable;//动作有效性
	private String eventName;//动作名称
	private String eventPath;//动作路径
	private Integer eventType;//动作类型te
	private Integer eventOutput;//出口点
	private Integer eventInput;//进口点
	private String description;//动作描述
	
	@Id
	@Column(name="EVENT_ID",unique=true,nullable=false,length=8)
	public int getEventId() {
		return eventId;
	}
	public void setEventId(int eventId) {
		this.eventId = eventId;
	}
	@Column(name="SOURCE_TASK_ID",nullable=false,length=8)
	public Integer getSourceTaskId() {
		return sourceTaskId;
	}
	public void setSourceTaskId(Integer sourceTaskId) {
		this.sourceTaskId = sourceTaskId;
	}
	@Column(name="TARGET_TASK_ID",nullable=false,length=8)
	public Integer getTargetTaskId() {
		return targetTaskId;
	}
	public void setTargetTaskId(Integer targetTaskId) {
		this.targetTaskId = targetTaskId;
	}
	@Column(name="WORKFLOW_CODE",nullable=false,length=64)
	public String getWorkflowCode() {
		return workflowCode;
	}
	public void setWorkflowCode(String workflowCode) {
		this.workflowCode = workflowCode;
	}
	@Column(name="EVENT_ENABLE",length=8)
	public Integer getEventEnable() {
		return eventEnable;
	}
	public void setEventEnable(Integer eventEnable) {
		this.eventEnable = eventEnable;
	}
	@Column(name="EVENT_NAME",length=64)
	public String getEventName() {
		return eventName;
	}
	public void setEventName(String eventName) {
		this.eventName = eventName;
	}
	@Column(name="EVENT_PATH",length=256)
	public String getEventPath() {
		return eventPath;
	}
	public void setEventPath(String eventPath) {
		this.eventPath = eventPath;
	}
	@Column(name="EVENT_TYPE",length=8)
	public Integer getEventType() {
		return eventType;
	}
	public void setEventType(Integer eventType) {
		this.eventType = eventType;
	}
	@Column(name="EVENT_INPUT",length=8)
	public Integer getEventInput() {
		return eventInput;
	}
	public void setEventInput(Integer eventInput) {
		this.eventInput = eventInput;
	}
	@Column(name="EVENT_OUTPUT",length=8)
	public Integer getEventOutput() {
		return eventOutput;
	}
	public void setEventOutput(Integer eventOutput) {
		this.eventOutput = eventOutput;
	}
	@Column(name="EVENT_DESCRIPTION",length=256)
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
}