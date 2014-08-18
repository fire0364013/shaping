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
import com.beauty.biz.entity.projects.Projects;

@Entity
@Table(name = "PROJECTSAMPLEFEE")
public class Projectsamplefee implements java.io.Serializable {

	// Fields
	private static final long serialVersionUID = 1L;
	private String projectsamplefeeid; // 任务采样费用编号
	private Projects project; // 任务编号
	private Projectdetail projectdetail;//任务监测企业
	private String technicaltype; // 采样基础费用类型
	private EntpriseInfo ent; // 企业编号
	private String price; // 价格
	private String amount; // 数量
	private String remark; // 备注

	// Constructors

	/** default constructor */
	public Projectsamplefee() {
	}

	/** minimal constructor */
	public Projectsamplefee(String projectsamplefeeid) {
		this.projectsamplefeeid = projectsamplefeeid;
	}

	@Id
	@Column(name = "PROJECTSAMPLEFEEID", unique = true, nullable = false, length = 20)
	public String getProjectsamplefeeid() {
		return projectsamplefeeid;
	}

	public void setProjectsamplefeeid(String projectsamplefeeid) {
		this.projectsamplefeeid = projectsamplefeeid;
	}


	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "PROJECTCODE")
	@NotFound(action = NotFoundAction.IGNORE)
	public Projects getProject() {
		return this.project;
	}

	public void setProject(Projects project) {
		this.project = project;
	}





	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "PROJECTDETAILID")
	@NotFound(action = NotFoundAction.IGNORE)
	public Projectdetail getProjectdetail() {
		return projectdetail;
	}

	public void setProjectdetail(Projectdetail projectdetail) {
		this.projectdetail = projectdetail;
	}

	@Column(name = "TECHNICALTYPE", length = 40)
	public String getTechnicaltype() {
		return technicaltype;
	}

	public void setTechnicaltype(String technicaltype) {
		this.technicaltype = technicaltype;
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


	@Column(name = "PRICE", length = 40)
	public String getPrice() {
		return price;
	}

	public void setPrice(String price) {
		this.price = price;
	}

	@Column(name = "AMOUNT", length = 40)
	public String getAmount() {
		return amount;
	}

	public void setAmount(String amount) {
		this.amount = amount;
	}

	@Column(name = "REMARK", length = 500)
	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}



}