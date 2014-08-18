package com.beauty.biz.entity.projects;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;

import com.beauty.biz.entity.entpriseinfo.EntpriseInfo;

/**
 * Projectdetail entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "PROJECTDETAIL")
public class Projectdetail implements java.io.Serializable {

	private static final long serialVersionUID = 7288076267381613451L;
	// Fields

	private String projectdetailid;
	private EntpriseInfo ent;
	private String projectcode;
	private String status;
	private String analysefee;
	private String samplefee;
	private Set<Projectsamplefee> Projectsamplefees = new HashSet<Projectsamplefee>();

	// Property accessors
	@Id
	@Column(name = "PROJECTDETAILID", unique = true, nullable = false, length = 20)
	public String getProjectdetailid() {
		return projectdetailid;
	}

	public void setProjectdetailid(String projectdetailid) {
		this.projectdetailid = projectdetailid;
	}

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "ENTID")
	@NotFound(action = NotFoundAction.IGNORE)
	public EntpriseInfo getEnt() {
		return ent;
	}

	public void setEnt(EntpriseInfo ent) {
		this.ent = ent;
	}

	@Column(name = "PROJECTCODE", length = 40)
	public String getProjectcode() {
		return this.projectcode;
	}

	public void setProjectcode(String projectcode) {
		this.projectcode = projectcode;
	}


	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "projectdetail")
	public Set<Projectsamplefee> getProjectsamplefees() {
		return Projectsamplefees;
	}

	public void setProjectsamplefees(Set<Projectsamplefee> projectsamplefees) {
		Projectsamplefees = projectsamplefees;
	}

	@Column(name = "STATUS", length = 10)
	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	@Column(name = "ANALYSEFEE", length = 10)
	public String getAnalysefee() {
		return analysefee;
	}

	public void setAnalysefee(String analysefee) {
		this.analysefee = analysefee;
	}

	@Column(name = "SAMPLEFEE", length = 10)
	public String getSamplefee() {
		return samplefee;
	}

	public void setSamplefee(String samplefee) {
		this.samplefee = samplefee;
	}

}