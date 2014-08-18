package com.beauty.biz.entity.workflow;

// default package

import javax.persistence.AttributeOverride;
import javax.persistence.AttributeOverrides;
import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * WorkflowStep entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "WORKFLOWSTEP"

)
public class WorkflowStep implements java.io.Serializable {

	// Fields
	private static final long serialVersionUID = -4080476067806851683L;
	private WorkflowStepId id;
	private String stepname;
	private String targetstepcode;//可跳转节点
	private String steptype;//步骤类型  project 任务   sample 样品  item  项目
	private int orderid;

	// Constructors

	/** default constructor */
	public WorkflowStep() {
	}

	/** minimal constructor */
	public WorkflowStep(WorkflowStepId id) {
		this.id = id;
	}

	// Property accessors
	@EmbeddedId
	@AttributeOverrides( {
			@AttributeOverride(name = "stepcode", column = @Column(name = "STEPCODE", nullable = false, length = 40)),
			@AttributeOverride(name = "workflowcode", column = @Column(name = "WORKFLOWCODE", nullable = false, length = 40)) })
	public WorkflowStepId getId() {
		return this.id;
	}

	public void setId(WorkflowStepId id) {
		this.id = id;
	}

	@Column(name = "STEPNAME", length = 40)
	public String getStepname() {
		return this.stepname;
	}

	public void setStepname(String stepname) {
		this.stepname = stepname;
	}

	@Column(name = "TARGETSTEPCODE", length = 100)
	public String getTargetstepcode() {
		return targetstepcode;
	}

	public void setTargetstepcode(String targetstepcode) {
		this.targetstepcode = targetstepcode;
	}

	@Column(name = "STEPTYPE", length = 10)
	public String getSteptype() {
		return steptype;
	}

	public void setSteptype(String steptype) {
		this.steptype = steptype;
	}

	@Column(name = "ORDERID", precision = 38, scale = 0)
	public int getOrderid() {
		return this.orderid;
	}

	public void setOrderid(int orderid) {
		this.orderid = orderid;
	}

}