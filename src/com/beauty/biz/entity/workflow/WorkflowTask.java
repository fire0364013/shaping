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
@Table(name="WORKFLOW_TASK")
public class WorkflowTask implements Serializable {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = -4460094312047118062L;
	
	private int taskId;//任务编号
	private String taskCode;//任务代码
	private String taskName;//任务名称
	private String workflowCode;//流程代码
	private Integer taskOrder;//任务次序
	private Integer taskWidth;//任务节点宽度
	private Integer taskHeight;//任务节点高度
	private Integer taskTop;//任务Y轴
	private Integer taskLeft;//任务X轴
	private Integer taskEnable;//任务可用性
	private String taskImage;//任务图片
	
	@Id
	@Column(name="TASK_ID",unique=true,nullable=false,length=8)
	public int getTaskId() {
		return taskId;
	}
	public void setTaskId(int taskId) {
		this.taskId = taskId;
	}
	@Column(name="TASK_CODE",nullable=false,length=64)
	public String getTaskCode() {
		return taskCode;
	}
	public void setTaskCode(String taskCode) {
		this.taskCode = taskCode;
	}
	@Column(name="TASK_NAME",length=128)
	public String getTaskName() {
		return taskName;
	}
	public void setTaskName(String taskName) {
		this.taskName = taskName;
	}
	@Column(name="WORKFLOW_CODE",nullable=false,length=64)
	public String getWorkflowCode() {
		return workflowCode;
	}
	public void setWorkflowCode(String workflowCode) {
		this.workflowCode = workflowCode;
	}
	@Column(name="TASK_ORDER",length=8)
	public Integer getTaskOrder() {
		return taskOrder;
	}
	public void setTaskOrder(Integer taskOrder) {
		this.taskOrder = taskOrder;
	}
	@Column(name="TASK_WIDTH",length=8)
	public Integer getTaskWidth() {
		return taskWidth;
	}
	public void setTaskWidth(Integer taskWidth) {
		this.taskWidth = taskWidth;
	}
	@Column(name="TASK_HEIGHT",length=8)
	public Integer getTaskHeight() {
		return taskHeight;
	}
	public void setTaskHeight(Integer taskHeight) {
		this.taskHeight = taskHeight;
	}
	@Column(name="TASK_TOP",length=8)
	public Integer getTaskTop() {
		return taskTop;
	}
	public void setTaskTop(Integer taskTop) {
		this.taskTop = taskTop;
	}
	@Column(name="TASK_LEFT",length=8)
	public Integer getTaskLeft() {
		return taskLeft;
	}
	public void setTaskLeft(Integer taskLeft) {
		this.taskLeft = taskLeft;
	}
	@Column(name="TASK_ENABLE",length=8)
	public Integer getTaskEnable() {
		return taskEnable;
	}
	public void setTaskEnable(Integer taskEnable) {
		this.taskEnable = taskEnable;
	}
	@Column(name="TASK_IMAGE",length=128)
	public String getTaskImage() {
		return taskImage;
	}
	public void setTaskImage(String taskImage) {
		this.taskImage = taskImage;
	}
} 