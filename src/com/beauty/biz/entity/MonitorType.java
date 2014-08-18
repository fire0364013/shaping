package com.beauty.biz.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * 监测业务类型 实体
 */
@Entity
@Table(name = "MONITORTYPE")
public class MonitorType implements java.io.Serializable {
	// Fields

	private static final long serialVersionUID = 2916387545287313422L;
	private String monitortypeid; // 业务类型编号
	private String monitortypename; // 业务类型名称
	private String monitornature; // 监测性质
	private String monitortypecode; // 监测类型编码
	private String monitorpointtype;// 监测点类型(多个使用逗号分隔)
	private String parenttype; // 父业务类型名称
	private String workflowcode; // 流程编码

	// Property accessors
	@Id
	@Column(name = "MONITORTYPEID", unique = true, nullable = false, length = 20)
	public String getMonitortypeid() {
		return this.monitortypeid;
	}

	public void setMonitortypeid(String monitortypeid) {
		this.monitortypeid = monitortypeid;
	}

	@Column(name = "MONITORTYPENAME", length = 50)
	public String getMonitortypename() {
		return this.monitortypename;
	}

	public void setMonitortypename(String monitortypename) {
		this.monitortypename = monitortypename;
	}

	@Column(name = "MONITORNATURE", length = 50)
	public String getMonitornature() {
		return this.monitornature;
	}

	public void setMonitornature(String monitornature) {
		this.monitornature = monitornature;
	}

	@Column(name = "MONITORTYPECODE", length = 20)
	public String getMonitortypecode() {
		return this.monitortypecode;
	}

	public void setMonitortypecode(String monitortypecode) {
		this.monitortypecode = monitortypecode;
	}

	@Column(name = "MONITORPOINTTYPE", length = 100)
	public String getMonitorpointtype() {
		return monitorpointtype;
	}

	public void setMonitorpointtype(String monitorpointtype) {
		this.monitorpointtype = monitorpointtype;
	}

	@Column(name = "PARENTTYPENAME", length = 50)
	public String getParenttype() {
		return this.parenttype;
	}

	public void setParenttype(String parenttype) {
		this.parenttype = parenttype;
	}

	@Column(name = "WORKFLOWCODE", length = 40)
	public String getWorkflowcode() {
		return workflowcode;
	}

	public void setWorkflowcode(String workflowcode) {
		this.workflowcode = workflowcode;
	}

}