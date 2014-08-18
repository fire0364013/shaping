package com.beauty.biz.entity.author;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;

import com.beauty.biz.entity.MonitorType;

/**
 * Authorizedsignature entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "AUTHORIZEDSIGNATURE")
public class Authorizedsignature implements java.io.Serializable {

	private static final long serialVersionUID = 1L;
	private String authorizedid;
	private String signatureuser;// //授权用户 这个也可以使多个~~以逗号隔开 signatureuser
	// private Userinfo userinfo;
	private MonitorType monitorType;// 监测业务类别 monitortypeid
	private String monitorpointtype;// 监测点类型 这个是多个，以逗号隔开

	// Constructors

	/** default constructor */
	public Authorizedsignature() {
	}

	public String getSignatureuser() {
		return signatureuser;
	}

	public void setSignatureuser(String signatureuser) {
		this.signatureuser = signatureuser;
	}

	@Column(name = "MONITORPOINTTYPEID", length = 30)
	public String getMonitorpointtype() {
		return monitorpointtype;
	}

	public void setMonitorpointtype(String monitorpointtype) {
		this.monitorpointtype = monitorpointtype;
	}

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "monitortypeid")
	@NotFound(action = NotFoundAction.IGNORE)
	public MonitorType getMonitorType() {
		return monitorType;
	}

	public void setMonitorType(MonitorType monitorType) {
		this.monitorType = monitorType;
	}

	/** minimal constructor */
	public Authorizedsignature(String authorizedid) {
		this.authorizedid = authorizedid;
	}

	/** full constructor */

	// Property accessors
	@Id
	@Column(name = "AUTHORIZEDID", unique = true, nullable = false, length = 30)
	public String getAuthorizedid() {
		return this.authorizedid;
	}

	public void setAuthorizedid(String authorizedid) {
		this.authorizedid = authorizedid;
	}

}