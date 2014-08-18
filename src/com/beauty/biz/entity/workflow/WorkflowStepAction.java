package com.beauty.biz.entity.workflow;

// default package

import javax.persistence.AttributeOverride;
import javax.persistence.AttributeOverrides;
import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * WorkflowStepAction entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "WORKFLOWSTEPACTION")
public class WorkflowStepAction implements java.io.Serializable {
	// Fields
	private static final long serialVersionUID = -8129940896144597952L;
	private WorkflowStepActionId id;
	private String actionname;
	private String nextstepcode;
	private String actionfullname;
	private String laststepcode;

	// Constructors
	/** default constructor */
	public WorkflowStepAction() {
	}

	/** minimal constructor */
	public WorkflowStepAction(WorkflowStepActionId id) {
		this.id = id;
	}

	/** full constructor */
	public WorkflowStepAction(WorkflowStepActionId id, String actionname,
			String nextstepcode) {
		this.id = id;
		this.actionname = actionname;
		this.nextstepcode = nextstepcode;
	}

	// Property accessors
	@EmbeddedId
	@AttributeOverrides( {
			@AttributeOverride(name = "stempactioncode", column = @Column(name = "STEMPACTIONCODE", nullable = false, length = 40)),
			@AttributeOverride(name = "stepcode", column = @Column(name = "STEPCODE", nullable = false, length = 40)),
			@AttributeOverride(name = "workflowcode", column = @Column(name = "WORKFLOWCODE", nullable = false, length = 40)) })
	public WorkflowStepActionId getId() {
		return this.id;
	}

	public void setId(WorkflowStepActionId id) {
		this.id = id;
	}

	@Column(name = "ACTIONNAME", length = 40)
	public String getActionname() {
		return this.actionname;
	}

	public void setActionname(String actionname) {
		this.actionname = actionname;
	}

	@Column(name = "NEXTSTEPCODE", length = 40)
	public String getNextstepcode() {
		return this.nextstepcode;
	}

	public void setNextstepcode(String nextstepcode) {
		this.nextstepcode = nextstepcode;
	}

	@Column(name = "ACTIONFULLNAME", length = 40)
	public String getActionfullname() {
		return actionfullname;
	}

	public void setActionfullname(String actionfullname) {
		this.actionfullname = actionfullname;
	}

	@Column(name = "LASTSTEPCODE", length = 40)
	public String getLaststepcode() {
		return laststepcode;
	}

	public void setLaststepcode(String laststepcode) {
		this.laststepcode = laststepcode;
	}
}