package com.beauty.biz.entity.stink;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

/**
 * 恶臭（环境空气）原始记录表 Stinkairrecord entity.
 * 
 * @author zhugy
 */
@Entity
@Table(name = "STINKAIRRECORD")
public class Stinkairrecord implements java.io.Serializable {
	// Fields
	private static final long serialVersionUID = 1613999898459986752L;
	private String id; // 编号
	private String analyst;// 分析员（存储两个分析员的用户编号，用逗号隔开）
	private String assessor;// 嗅辨员（存储嗅辨员的用户编号）
	private String distribution;// 配气员（存储配气员的用户编号）
	private String projectid;// 任务编号
	private Date analysisdate;// 分析日期
	private String samplecode;// 样品编号
	private String sampleitemtestid;// 样品项目编号
	private String dilutionfirst;// 第一次稀释倍数
	private String dilutionfirst1;// 第一次稀释实验次序1的结果（1为对，0为错，2为不明）
	private String dilutionfirst2;// 第一次稀释实验次序2的结果（1为对，0为错，2为不明）
	private String dilutionfirst3;// 第一次稀释实验次序3的结果（1为对，0为错，2为不明）
	private String dilutionsecord;// 第二次稀释倍数
	private String dilutionsecord1;// 第二次稀释实验次序1的结果（1为对，0为错，2为不明）
	private String dilutionsecord2;// 第二次稀释实验次序2的结果（1为对，0为错，2为不明）
	private String dilutionsecord3;// 第二次稀释实验次序3的结果（1为对，0为错，2为不明）
	private String assessorcode;// 嗅辨员编号

	// Constructors

	/** default constructor */
	public Stinkairrecord() {
	}

	// Property accessors

	// @Column(name = "ID", length = 20)
	@Id
	@Column(name = "ID", unique = true, nullable = false, length = 20)
	public String getId() {
		return this.id;
	}

	public void setId(String id) {
		this.id = id;
	}

	@Column(name = "ANALYST", length = 50)
	public String getAnalyst() {
		return this.analyst;
	}

	public void setAnalyst(String analyst) {
		this.analyst = analyst;
	}

	@Column(name = "ASSESSOR", length = 100)
	public String getAssessor() {
		return this.assessor;
	}

	public void setAssessor(String assessor) {
		this.assessor = assessor;
	}

	@Column(name = "DISTRIBUTION", length = 50)
	public String getDistribution() {
		return this.distribution;
	}

	public void setDistribution(String distribution) {
		this.distribution = distribution;
	}

	@Column(name = "PROJECTID", length = 20)
	public String getProjectid() {
		return this.projectid;
	}

	public void setProjectid(String projectid) {
		this.projectid = projectid;
	}

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "ANALYSISDATE", length = 7)
	public Date getAnalysisdate() {
		return this.analysisdate;
	}

	public void setAnalysisdate(Date analysisdate) {
		this.analysisdate = analysisdate;
	}

	@Column(name = "SAMPLECODE", length = 50)
	public String getSamplecode() {
		return this.samplecode;
	}

	public void setSamplecode(String samplecode) {
		this.samplecode = samplecode;
	}

	@Column(name = "SAMPLEITEMTESTID", length = 40)
	public String getSampleitemtestid() {
		return this.sampleitemtestid;
	}

	public void setSampleitemtestid(String sampleitemtestid) {
		this.sampleitemtestid = sampleitemtestid;
	}

	@Column(name = "DILUTIONFIRST", precision = 22, scale = 0)
	public String getDilutionfirst() {
		return this.dilutionfirst;
	}

	public void setDilutionfirst(String dilutionfirst) {
		this.dilutionfirst = dilutionfirst;
	}

	@Column(name = "DILUTIONFIRST1", precision = 22, scale = 0)
	public String getDilutionfirst1() {
		return this.dilutionfirst1;
	}

	public void setDilutionfirst1(String dilutionfirst1) {
		this.dilutionfirst1 = dilutionfirst1;
	}

	@Column(name = "DILUTIONFIRST2", precision = 22, scale = 0)
	public String getDilutionfirst2() {
		return this.dilutionfirst2;
	}

	public void setDilutionfirst2(String dilutionfirst2) {
		this.dilutionfirst2 = dilutionfirst2;
	}

	@Column(name = "DILUTIONFIRST3", precision = 22, scale = 0)
	public String getDilutionfirst3() {
		return this.dilutionfirst3;
	}

	public void setDilutionfirst3(String dilutionfirst3) {
		this.dilutionfirst3 = dilutionfirst3;
	}

	@Column(name = "DILUTIONSECORD", precision = 22, scale = 0)
	public String getDilutionsecord() {
		return this.dilutionsecord;
	}

	public void setDilutionsecord(String dilutionsecord) {
		this.dilutionsecord = dilutionsecord;
	}

	@Column(name = "DILUTIONSECORD1", precision = 22, scale = 0)
	public String getDilutionsecord1() {
		return this.dilutionsecord1;
	}

	public void setDilutionsecord1(String dilutionsecord1) {
		this.dilutionsecord1 = dilutionsecord1;
	}

	@Column(name = "DILUTIONSECORD2", precision = 22, scale = 0)
	public String getDilutionsecord2() {
		return this.dilutionsecord2;
	}

	public void setDilutionsecord2(String dilutionsecord2) {
		this.dilutionsecord2 = dilutionsecord2;
	}

	@Column(name = "DILUTIONSECORD3", precision = 22, scale = 0)
	public String getDilutionsecord3() {
		return this.dilutionsecord3;
	}

	public void setDilutionsecord3(String dilutionsecord3) {
		this.dilutionsecord3 = dilutionsecord3;
	}

	@Column(name = "ASSESSORCODE", length = 10)
	public String getAssessorcode() {
		return assessorcode;
	}

	public void setAssessorcode(String assessorcode) {
		this.assessorcode = assessorcode;
	}

	// public boolean equals(Object other) {
	// if ((this == other))
	// return true;
	// if ((other == null))
	// return false;
	// if (!(other instanceof StinkairrecordId))
	// return false;
	// StinkairrecordId castOther = (StinkairrecordId) other;
	//
	// return ((this.getId() == castOther.getId()) || (this.getId() != null
	// && castOther.getId() != null && this.getId().equals(
	// castOther.getId())))
	// && ((this.getAnalyst() == castOther.getAnalyst()) || (this
	// .getAnalyst() != null
	// && castOther.getAnalyst() != null && this.getAnalyst()
	// .equals(castOther.getAnalyst())))
	// && ((this.getAssessor() == castOther.getAssessor()) || (this
	// .getAssessor() != null
	// && castOther.getAssessor() != null && this
	// .getAssessor().equals(castOther.getAssessor())))
	// && ((this.getDistribution() == castOther.getDistribution()) || (this
	// .getDistribution() != null
	// && castOther.getDistribution() != null && this
	// .getDistribution().equals(castOther.getDistribution())))
	// && ((this.getProjectid() == castOther.getProjectid()) || (this
	// .getProjectid() != null
	// && castOther.getProjectid() != null && this
	// .getProjectid().equals(castOther.getProjectid())))
	// && ((this.getAnalysisdate() == castOther.getAnalysisdate()) || (this
	// .getAnalysisdate() != null
	// && castOther.getAnalysisdate() != null && this
	// .getAnalysisdate().equals(castOther.getAnalysisdate())))
	// && ((this.getSamplecode() == castOther.getSamplecode()) || (this
	// .getSamplecode() != null
	// && castOther.getSamplecode() != null && this
	// .getSamplecode().equals(castOther.getSamplecode())))
	// && ((this.getSampleitemtestid() == castOther
	// .getSampleitemtestid()) || (this.getSampleitemtestid() != null
	// && castOther.getSampleitemtestid() != null && this
	// .getSampleitemtestid().equals(
	// castOther.getSampleitemtestid())))
	// && ((this.getDilutionfirst() == castOther.getDilutionfirst()) || (this
	// .getDilutionfirst() != null
	// && castOther.getDilutionfirst() != null && this
	// .getDilutionfirst()
	// .equals(castOther.getDilutionfirst())))
	// && ((this.getDilutionfirst1() == castOther.getDilutionfirst1()) || (this
	// .getDilutionfirst1() != null
	// && castOther.getDilutionfirst1() != null && this
	// .getDilutionfirst1().equals(
	// castOther.getDilutionfirst1())))
	// && ((this.getDilutionfirst2() == castOther.getDilutionfirst2()) || (this
	// .getDilutionfirst2() != null
	// && castOther.getDilutionfirst2() != null && this
	// .getDilutionfirst2().equals(
	// castOther.getDilutionfirst2())))
	// && ((this.getDilutionfirst3() == castOther.getDilutionfirst3()) || (this
	// .getDilutionfirst3() != null
	// && castOther.getDilutionfirst3() != null && this
	// .getDilutionfirst3().equals(
	// castOther.getDilutionfirst3())))
	// && ((this.getDilutionsecord() == castOther.getDilutionsecord()) || (this
	// .getDilutionsecord() != null
	// && castOther.getDilutionsecord() != null && this
	// .getDilutionsecord().equals(
	// castOther.getDilutionsecord())))
	// && ((this.getDilutionsecord1() == castOther
	// .getDilutionsecord1()) || (this.getDilutionsecord1() != null
	// && castOther.getDilutionsecord1() != null && this
	// .getDilutionsecord1().equals(
	// castOther.getDilutionsecord1())))
	// && ((this.getDilutionsecord2() == castOther
	// .getDilutionsecord2()) || (this.getDilutionsecord2() != null
	// && castOther.getDilutionsecord2() != null && this
	// .getDilutionsecord2().equals(
	// castOther.getDilutionsecord2())))
	// && ((this.getDilutionsecord3() == castOther
	// .getDilutionsecord3()) || (this.getDilutionsecord3() != null
	// && castOther.getDilutionsecord3() != null && this
	// .getDilutionsecord3().equals(
	// castOther.getDilutionsecord3())));
	// }

	// public int hashCode() {
	// int result = 17;
	//
	// result = 37 * result + (getId() == null ? 0 : this.getId().hashCode());
	// result = 37 * result
	// + (getAnalyst() == null ? 0 : this.getAnalyst().hashCode());
	// result = 37 * result
	// + (getAssessor() == null ? 0 : this.getAssessor().hashCode());
	// result = 37
	// * result
	// + (getDistribution() == null ? 0 : this.getDistribution()
	// .hashCode());
	// result = 37 * result
	// + (getProjectid() == null ? 0 : this.getProjectid().hashCode());
	// result = 37
	// * result
	// + (getAnalysisdate() == null ? 0 : this.getAnalysisdate()
	// .hashCode());
	// result = 37
	// * result
	// + (getSamplecode() == null ? 0 : this.getSamplecode()
	// .hashCode());
	// result = 37
	// * result
	// + (getSampleitemtestid() == null ? 0 : this
	// .getSampleitemtestid().hashCode());
	// result = 37
	// * result
	// + (getDilutionfirst() == null ? 0 : this.getDilutionfirst()
	// .hashCode());
	// result = 37
	// * result
	// + (getDilutionfirst1() == null ? 0 : this.getDilutionfirst1()
	// .hashCode());
	// result = 37
	// * result
	// + (getDilutionfirst2() == null ? 0 : this.getDilutionfirst2()
	// .hashCode());
	// result = 37
	// * result
	// + (getDilutionfirst3() == null ? 0 : this.getDilutionfirst3()
	// .hashCode());
	// result = 37
	// * result
	// + (getDilutionsecord() == null ? 0 : this.getDilutionsecord()
	// .hashCode());
	// result = 37
	// * result
	// + (getDilutionsecord1() == null ? 0 : this.getDilutionsecord1()
	// .hashCode());
	// result = 37
	// * result
	// + (getDilutionsecord2() == null ? 0 : this.getDilutionsecord2()
	// .hashCode());
	// result = 37
	// * result
	// + (getDilutionsecord3() == null ? 0 : this.getDilutionsecord3()
	// .hashCode());
	// return result;
	// }
}
