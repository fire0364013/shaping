package com.beauty.biz.entity.projects;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * Timelinessset entity.
 * 
 * @author zhugy
 */
@Entity
@Table(name = "TIMELINESSSET")
public class Timelinessset implements java.io.Serializable {
	private static final long serialVersionUID = 5843416691704208065L;
	// Fields

	private String timelinesssetid;// 主键id
	private String monitortypeid;// 监测类型id
	private String stepcode;// 流程编码
	private String monitordays;// 监测天数
	private String beexpireddays;// 将要到期的天数

	// Constructors

	/** default constructor */
	public Timelinessset() {
	}

	/** minimal constructor */
	public Timelinessset(String timelinesssetid) {
		this.timelinesssetid = timelinesssetid;
	}

	// Property accessors
	@Id
	@Column(name = "TIMELINESSSETID", nullable = false, length = 20)
	public String getTimelinesssetid() {
		return this.timelinesssetid;
	}

	public void setTimelinesssetid(String timelinesssetid) {
		this.timelinesssetid = timelinesssetid;
	}

	@Column(name = "MONITORTYPEID", length = 20)
	public String getMonitortypeid() {
		return this.monitortypeid;
	}

	public void setMonitortypeid(String monitortypeid) {
		this.monitortypeid = monitortypeid;
	}

	@Column(name = "STEPCODE", length = 20)
	public String getStepcode() {
		return stepcode;
	}

	public void setStepcode(String stepcode) {
		this.stepcode = stepcode;
	}

	@Column(name = "MONITORDAYS")
	public String getMonitordays() {
		return this.monitordays;
	}

	public void setMonitordays(String monitordays) {
		this.monitordays = monitordays;
	}

	@Column(name = "BEEXPIREDDAYS")
	public String getBeexpireddays() {
		return beexpireddays;
	}

	public void setBeexpireddays(String beexpireddays) {
		this.beexpireddays = beexpireddays;
	}

}