package com.beauty.biz.entity.workflow;

// default package

import javax.persistence.Column;
import javax.persistence.Embeddable;

/**
 * WorkflowStepId entity. @author MyEclipse Persistence Tools
 */
@Embeddable
public class WorkflowStepId implements java.io.Serializable {

	// Fields
	private static final long serialVersionUID = -6087950373793153142L;
	private String stepcode;
	private String workflowcode;

	// Constructors

	/** default constructor */
	public WorkflowStepId() {
	}

	/** full constructor */
	public WorkflowStepId(String stepcode, String workflowcode) {
		this.stepcode = stepcode;
		this.workflowcode = workflowcode;
	}

	// Property accessors

	@Column(name = "STEPCODE", nullable = false, length = 40)
	public String getStepcode() {
		return this.stepcode;
	}

	public void setStepcode(String stepcode) {
		this.stepcode = stepcode;
	}

	@Column(name = "WORKFLOWCODE", nullable = false, length = 40)
	public String getWorkflowcode() {
		return this.workflowcode;
	}

	public void setWorkflowcode(String workflowcode) {
		this.workflowcode = workflowcode;
	}

	public boolean equals(Object other) {
		if ((this == other))
			return true;
		if ((other == null))
			return false;
		if (!(other instanceof WorkflowStepId))
			return false;
		WorkflowStepId castOther = (WorkflowStepId) other;

		return ((this.getStepcode() == castOther.getStepcode()) || (this
				.getStepcode() != null
				&& castOther.getStepcode() != null && this.getStepcode()
				.equals(castOther.getStepcode())))
				&& ((this.getWorkflowcode() == castOther.getWorkflowcode()) || (this
						.getWorkflowcode() != null
						&& castOther.getWorkflowcode() != null && this
						.getWorkflowcode().equals(castOther.getWorkflowcode())));
	}

	public int hashCode() {
		int result = 17;

		result = 37 * result
				+ (getStepcode() == null ? 0 : this.getStepcode().hashCode());
		result = 37
				* result
				+ (getWorkflowcode() == null ? 0 : this.getWorkflowcode()
						.hashCode());
		return result;
	}

}