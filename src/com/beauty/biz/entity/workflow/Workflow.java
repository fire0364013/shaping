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
@Table(name="WORKFLOW")
public class Workflow implements Serializable {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 5656283280104781109L;
	
	private int workflowId;//工作流编号
	private String workflowCode;//工作流编码
	private String workflowName;//工作流名称
	private String tableName;//工作流关联表名
	private String tableFieldName;//工作流关联字段
	private Integer workflowEnable;//工作流可用性
	
	@Id
	@Column(name="WORKFLOW_ID",unique=true,nullable=false,length=8)
	public int getWorkflowId() {
		return workflowId;
	}
	public void setWorkflowId(int workflowId) {
		this.workflowId = workflowId;
	}
	@Column(name="WORKFLOW_CODE",unique=true,nullable=false,length=64)
	public String getWorkflowCode() {
		return workflowCode;
	}
	public void setWorkflowCode(String workflowCode) {
		this.workflowCode = workflowCode;
	}
	@Column(name="WORKFLOW_NAME",length=128)
	public String getWorkflowName() {
		return workflowName;
	}
	public void setWorkflowName(String workflowName) {
		this.workflowName = workflowName;
	}
	@Column(name="TABLE_NAME",length=64)
	public String getTableName() {
		return tableName;
	}
	public void setTableName(String tableName) {
		this.tableName = tableName;
	}
	@Column(name="TABLE_FIELDNAME",length=64)
	public String getTableFieldName() {
		return tableFieldName;
	}
	public void setTableFieldName(String tableFieldName) {
		this.tableFieldName = tableFieldName;
	}
	@Column(name="WORKFLOW_ENABLE",length=8)
	public Integer getWorkflowEnable() {
		return workflowEnable;
	}
	public void setWorkflowEnable(Integer workflowEnable) {
		this.workflowEnable = workflowEnable;
	}

}