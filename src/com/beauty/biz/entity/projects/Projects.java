package com.beauty.biz.entity.projects;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;

import com.beauty.biz.entity.Custom;
import com.beauty.biz.entity.Employeeinfo;
import com.beauty.biz.entity.Userinfo;
import com.beauty.biz.entity.entpriseinfo.EntpriseInfo;

/**
 * 监测项目()实体
 */
@Entity
@Table(name = "PROJECTS")
public class Projects implements java.io.Serializable
{

		private static final long serialVersionUID = 7762691822225987063L;
		private String projectcode;			
		private String projectname;			
		private String registby;
		private EntpriseInfo wtEntprise;
		private Employeeinfo agentperson;	
		private Employeeinfo chargedoctor;
		private Date registdate;	
		private Date dealdate;
		private Custom customid;    
		private String projectrealcode;
		private String intentionitem;
		private String intentioniteminfo;
		private String detectionfee;
		private String paymenttype;
		private EntpriseInfo monitorentid;
		private String nextAuditPerson;//处理人
		private Employeeinfo counselor;//咨询师
		private String isreturn;
		private String status;				
		private String remark;	


		@Id
		@Column(name = "PROJECTCODE", unique = true, nullable = false, length = 40)
		public String getProjectcode() {
			return this.projectcode;
		}

		public void setProjectcode(String projectcode) {
			this.projectcode = projectcode;
		}

		@Column(name = "PROJECTNAME", length = 200)
		public String getProjectname() {
			return this.projectname;
		}

		public void setProjectname(String projectname) {
			this.projectname = projectname;
		}

//		@ManyToOne(fetch=FetchType.LAZY)
//		@JoinColumn(name = "REGISTBY")
//		@NotFound(action=NotFoundAction.IGNORE)
		@Column(name = "REGISTBY", length = 40)		
		public String getRegistby() {
			return registby;
		}

		public void setRegistby(String registby) {
			this.registby = registby;
		}


		@Temporal(TemporalType.TIMESTAMP)
		@Column(name = "REGISTDATE", length = 7)
		@NotFound(action=NotFoundAction.IGNORE)
		public Date getRegistdate() {
			return this.registdate;
		}

		public void setRegistdate(Date registdate) {
			this.registdate = registdate;
		}
		@Temporal(TemporalType.TIMESTAMP)
		@Column(name = "DEALDATE", length = 7)
		@NotFound(action=NotFoundAction.IGNORE)
		public Date getDealdate() {
			return dealdate;
		}

		public void setDealdate(Date dealdate) {
			this.dealdate = dealdate;
		}

		@Column(name = "STATUS", length = 40)
		public String getStatus() {
			return this.status;
		}

		public void setStatus(String status) {
			this.status = status;
		}

		@Column(name = "REMARK", length = 500)
		public String getRemark() {
			return remark;
		}

		public void setRemark(String remark) {
			this.remark = remark;
		}
		
		@Column(name = "ISRETURN", length = 2)
		public String getIsreturn() {
			return isreturn;
		}

		public void setIsreturn(String isreturn) {
			this.isreturn = isreturn;
		}
		
		@ManyToOne(fetch=FetchType.LAZY)
		@JoinColumn(name = "ENTRUSTENTID")
		@NotFound(action=NotFoundAction.IGNORE)
//		@Column(name = "ENTRUSTENTID", length = 20)
		public EntpriseInfo getWtEntprise() {
			return wtEntprise;
		}

		public void setWtEntprise(EntpriseInfo wtEntprise) {
			this.wtEntprise = wtEntprise;
		}


		

		@Column(name = "PROJECTREALCODE", length = 40)
		public String getProjectrealcode() {
			return projectrealcode;
		}

		public void setProjectrealcode(String projectrealcode) {
			this.projectrealcode = projectrealcode;
		}

		@Column(name = "INTENTIONITEM", length = 200)
	public String getIntentionitem() {
			return intentionitem;
		}

		public void setIntentionitem(String intentionitem) {
			this.intentionitem = intentionitem;
		}

		@Column(name = "INTENTIONITEMINFO", length = 400)
		public String getIntentioniteminfo() {
			return intentioniteminfo;
		}

		public void setIntentioniteminfo(String intentioniteminfo) {
			this.intentioniteminfo = intentioniteminfo;
		}

	@Column(name = "DETECTIONFEE", precision = 22, scale = 0)
	public String getDetectionfee()
	{
		return this.detectionfee;
	}

	public void setDetectionfee(String detectionfee)
	{
		this.detectionfee = detectionfee;
	}

	@Column(name = "PAYMENTTYPE", length = 20)
	public String getPaymenttype()
	{
		return this.paymenttype;
	}

	public void setPaymenttype(String paymenttype)
	{
		this.paymenttype = paymenttype;
	}

	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name = "MONITORENTID")
	@NotFound(action=NotFoundAction.IGNORE)
	public EntpriseInfo getMonitorentid() {
		return monitorentid;
	}

	public void setMonitorentid(EntpriseInfo monitorentid) {
		this.monitorentid = monitorentid;
	}


	@Column(name = "NEXTAUDITPERSON", length = 20)
	public String getNextAuditPerson() {
		return nextAuditPerson;
	}

	public void setNextAuditPerson(String nextAuditPerson) {
		this.nextAuditPerson = nextAuditPerson;
	}

	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name = "CUSTOMID")
	@NotFound(action=NotFoundAction.IGNORE)
	public Custom getCustomid() {
		return customid;
	}

	public void setCustomid(Custom customid) {
		this.customid = customid;
	}

	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name = "AGENTPERSON")
	@NotFound(action=NotFoundAction.IGNORE)	
	public Employeeinfo getAgentperson() {
		return agentperson;
	}

	public void setAgentperson(Employeeinfo agentperson) {
		this.agentperson = agentperson;
	}

	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name = "CHARGEDOCTOR")
	@NotFound(action=NotFoundAction.IGNORE)	
	public Employeeinfo getChargedoctor() {
		return chargedoctor;
	}

	public void setChargedoctor(Employeeinfo chargedoctor) {
		this.chargedoctor = chargedoctor;
	}

	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name = "COUNSELOR")
	@NotFound(action=NotFoundAction.IGNORE)	
	public Employeeinfo getCounselor() {
		return counselor;
	}

	public void setCounselor(Employeeinfo counselor) {
		this.counselor = counselor;
	}
	
	

	
}