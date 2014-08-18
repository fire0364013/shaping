package com.beauty.biz.entity.workflow;

// default package

import javax.persistence.Column;
import javax.persistence.Embeddable;

/**
 * WorkflowStepActionId entity. @author MyEclipse Persistence Tools
 */
@Embeddable
public class WorkflowStepActionId implements java.io.Serializable {

	// Fields
	private static final long serialVersionUID = -8781369631200184040L;
	private String stepactioncode;
	private String stepcode;
	private String workflowcode;

	public WorkflowStepActionId() {

	}

	// Property accessors

	@Column(name = "STEPACTIONCODE", nullable = false, length = 40)
	public String getStepactioncode() {
		return this.stepactioncode;
	}

	public void setStepactioncode(String stepactioncode) {
		this.stepactioncode = stepactioncode;
	}

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
		if (!(other instanceof WorkflowStepActionId))
			return false;
		WorkflowStepActionId castOther = (WorkflowStepActionId) other;

		return ((this.getStepactioncode() == castOther.getStepactioncode()) || (this
				.getStepactioncode() != null
				&& castOther.getStepactioncode() != null && this
				.getStepactioncode().equals(castOther.getStepactioncode())))
				&& ((this.getStepcode() == castOther.getStepcode()) || (this
						.getStepcode() != null
						&& castOther.getStepcode() != null && this
						.getStepcode().equals(castOther.getStepcode())))
				&& ((this.getWorkflowcode() == castOther.getWorkflowcode()) || (this
						.getWorkflowcode() != null
						&& castOther.getWorkflowcode() != null && this
						.getWorkflowcode().equals(castOther.getWorkflowcode())));
	}

	public int hashCode() {
		int result = 17;

		result = 37
				* result
				+ (getStepactioncode() == null ? 0 : this.getStepactioncode()
						.hashCode());
		result = 37 * result
				+ (getStepcode() == null ? 0 : this.getStepcode().hashCode());
		result = 37
				* result
				+ (getWorkflowcode() == null ? 0 : this.getWorkflowcode()
						.hashCode());
		return result;
	}

}