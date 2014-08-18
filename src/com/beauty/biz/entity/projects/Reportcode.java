package com.beauty.biz.entity.projects;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * Reportcode entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "REPORTCODE")
public class Reportcode implements java.io.Serializable {

	// Fields

	private String reportcodeid;
	private String projectcode;
	private String monitorpointtypeid;
	private String reportcode;

	// Property accessors
	@Id
	@Column(name = "REPORTCODEID", unique = true, nullable = false, length = 40)
	public String getReportcodeid() {
		return this.reportcodeid;
	}

	public void setReportcodeid(String reportcodeid) {
		this.reportcodeid = reportcodeid;
	}

	@Column(name = "PROJECTCODE", length = 40)
	public String getProjectcode() {
		return this.projectcode;
	}

	public void setProjectcode(String projectcode) {
		this.projectcode = projectcode;
	}

	@Column(name = "MONITORPOINTTYPEID", length = 40)
	public String getMonitorpointtypeid() {
		return this.monitorpointtypeid;
	}

	public void setMonitorpointtypeid(String monitorpointtypeid) {
		this.monitorpointtypeid = monitorpointtypeid;
	}

	@Column(name = "REPORTCODE", length = 50)
	public String getReportcode() {
		return this.reportcode;
	}

	public void setReportcode(String reportcode) {
		this.reportcode = reportcode;
	}

}