package com.beauty.biz.entity.stink;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

/**
 * 恶臭（环境空气）原始记录表(另一个实体) Stinkairorinalrecord entity.
 * 
 * @author zhugy
 */
@Entity
@Table(name = "STINKAIRORINALRECORD")
public class Stinkairorinalrecord implements java.io.Serializable {
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
	private String assessorcode;// 嗅辨员编号
	private String dilutionfirst1; // 第一次稀释倍数
	private String dilutionfirsta11; // A第一次稀释次序1的结果（1为对，0为错，2为不明）
	// private String dilutionfirstb11; //B第一次稀释次序1的结果（1为对，0为错，2为不明）
	// private String dilutionfirstc11; //C第一次稀释次序1的结果（1为对，0为错，2为不明）
	// private String dilutionfirstd11; //E第一次稀释次序1的结果（1为对，0为错，2为不明）
	// private String dilutionfirste11; //E第一次稀释次序1的结果（1为对，0为错，2为不明）
	// private String dilutionfirstf11; //F第一次稀释次序1的结果（1为对，0为错，2为不明）
	private String dilutionfirsta12; // A第一次稀释次序2的结果
	// private String dilutionfirstb12; //B第一次稀释次序2的结果
	// private String dilutionfirstc12; //C第一次稀释次序2的结果
	// private String dilutionfirstd12; //D第一次稀释次序2的结果
	// private String dilutionfirste12; //E第一次稀释次序2的结果
	// private String dilutionfirstf12; //F第一次稀释次序2的结果
	private String dilutionfirsta13; // A第一次稀释次序3的结果
	// private String dilutionfirstb13; //B第一次稀释次序3的结果
	// private String dilutionfirstc13; //C第一次稀释次序3的结果
	// private String dilutionfirstd13; //D第一次稀释次序3的结果
	// private String dilutionfirste13; //E第一次稀释次序3的结果
	// private String dilutionfirstf13; //F第一次稀释次序3的结果
	private String dilutionfirst2; // 第二次稀释倍数
	private String dilutionfirsta21; // A第二次稀释次序1的结果
	// private String dilutionfirstb21; //B第二次稀释次序1的结果
	// private String dilutionfirstc21; //C第二次稀释次序1的结果
	// private String dilutionfirstd21; //D第二次稀释次序1的结果
	// private String dilutionfirste21; //E第二次稀释次序1的结果
	// private String dilutionfirstf21; //F第二次稀释次序1的结果
	private String dilutionfirsta22; // A第二次稀释次序2的结果
	// private String dilutionfirstb22; //B第二次稀释次序2的结果
	// private String dilutionfirstc22; //C第二次稀释次序2的结果
	// private String dilutionfirstd22; //D第二次稀释次序2的结果
	// private String dilutionfirste22; //E第二次稀释次序2的结果
	// private String dilutionfirstf22; //F第二次稀释次序2的结果
	private String dilutionfirsta23; // A第二次稀释次序3的结果
	// private String dilutionfirstb23; //B第二次稀释次序3的结果
	// private String dilutionfirstc23; //C第二次稀释次序3的结果
	// private String dilutionfirstd23; //D第二次稀释次序3的结果
	// private String dilutionfirste23; //E第二次稀释次序3的结果
	// private String dilutionfirstf23; //F第二次稀释次序3的结果

	// Constructors

	/** default constructor */
	public Stinkairorinalrecord() {
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

	@Column(name = "ASSESSOR", length = 40)
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

	@Column(name = "DILUTIONFIRST1", precision = 48, scale = 0)
	public String getDilutionfirst1() {
		return this.dilutionfirst1;
	}

	public void setDilutionfirst1(String dilutionfirst1) {
		this.dilutionfirst1 = dilutionfirst1;
	}

	@Column(name = "DILUTIONFIRST2", precision = 48, scale = 0)
	public String getDilutionfirst2() {
		return this.dilutionfirst2;
	}

	public void setDilutionfirst2(String dilutionfirst2) {
		this.dilutionfirst2 = dilutionfirst2;
	}

	@Column(name = "ASSESSORCODE", length = 10)
	public String getAssessorcode() {
		return assessorcode;
	}

	public void setAssessorcode(String assessorcode) {
		this.assessorcode = assessorcode;
	}

	@Column(name = "DILUTIONFIRSTA11", precision = 48, scale = 0)
	public String getDilutionfirsta11() {
		return dilutionfirsta11;
	}

	public void setDilutionfirsta11(String dilutionfirsta11) {
		this.dilutionfirsta11 = dilutionfirsta11;
	}

	// @Column(name = "DILUTIONFIRSTB11", precision = 48, scale = 0)
	// public String getDilutionfirstb11() {
	// return dilutionfirstb11;
	// }
	//
	// public void setDilutionfirstb11(String dilutionfirstb11) {
	// this.dilutionfirstb11 = dilutionfirstb11;
	// }
	//	
	// @Column(name = "DILUTIONFIRSTC11", precision = 48, scale = 0)
	// public String getDilutionfirstc11() {
	// return dilutionfirstc11;
	// }
	//
	// public void setDilutionfirstc11(String dilutionfirstc11) {
	// this.dilutionfirstc11 = dilutionfirstc11;
	// }
	//
	// @Column(name = "DILUTIONFIRSTD11", precision = 48, scale = 0)
	// public String getDilutionfirstd11() {
	// return dilutionfirstd11;
	// }
	//
	// public void setDilutionfirstd11(String dilutionfirstd11) {
	// this.dilutionfirstd11 = dilutionfirstd11;
	// }
	//
	// @Column(name = "DILUTIONFIRSTE11", precision = 48, scale = 0)
	// public String getDilutionfirste11() {
	// return dilutionfirste11;
	// }
	//
	// public void setDilutionfirste11(String dilutionfirste11) {
	// this.dilutionfirste11 = dilutionfirste11;
	// }
	//
	// @Column(name = "DILUTIONFIRSTF11", precision = 48, scale = 0)
	// public String getDilutionfirstf11() {
	// return dilutionfirstf11;
	// }
	//
	// public void setDilutionfirstf11(String dilutionfirstf11) {
	// this.dilutionfirstf11 = dilutionfirstf11;
	// }

	@Column(name = "DILUTIONFIRSTA12", precision = 48, scale = 0)
	public String getDilutionfirsta12() {
		return dilutionfirsta12;
	}

	public void setDilutionfirsta12(String dilutionfirsta12) {
		this.dilutionfirsta12 = dilutionfirsta12;
	}

	// @Column(name = "DILUTIONFIRSTB12", precision = 48, scale = 0)
	// public String getDilutionfirstb12() {
	// return dilutionfirstb12;
	// }
	//
	// public void setDilutionfirstb12(String dilutionfirstb12) {
	// this.dilutionfirstb12 = dilutionfirstb12;
	// }
	//
	// @Column(name = "DILUTIONFIRSTC12", precision = 48, scale = 0)
	// public String getDilutionfirstc12() {
	// return dilutionfirstc12;
	// }
	//
	// public void setDilutionfirstc12(String dilutionfirstc12) {
	// this.dilutionfirstc12 = dilutionfirstc12;
	// }
	//
	// @Column(name = "DILUTIONFIRSTD12", precision = 48, scale = 0)
	// public String getDilutionfirstd12() {
	// return dilutionfirstd12;
	// }
	//
	// public void setDilutionfirstd12(String dilutionfirstd12) {
	// this.dilutionfirstd12 = dilutionfirstd12;
	// }

	// @Column(name = "DILUTIONFIRSTE12", precision = 48, scale = 0)
	// public String getDilutionfirste12() {
	// return dilutionfirste12;
	// }
	//
	// public void setDilutionfirste12(String dilutionfirste12) {
	// this.dilutionfirste12 = dilutionfirste12;
	// }
	//
	// @Column(name = "DILUTIONFIRSTF12", precision = 48, scale = 0)
	// public String getDilutionfirstf12() {
	// return dilutionfirstf12;
	// }
	//
	// public void setDilutionfirstf12(String dilutionfirstf12) {
	// this.dilutionfirstf12 = dilutionfirstf12;
	// }

	@Column(name = "DILUTIONFIRSTA13", precision = 48, scale = 0)
	public String getDilutionfirsta13() {
		return dilutionfirsta13;
	}

	public void setDilutionfirsta13(String dilutionfirsta13) {
		this.dilutionfirsta13 = dilutionfirsta13;
	}

	// @Column(name = "DILUTIONFIRSTB13", precision = 48, scale = 0)
	// public String getDilutionfirstb13() {
	// return dilutionfirstb13;
	// }
	//
	// public void setDilutionfirstb13(String dilutionfirstb13) {
	// this.dilutionfirstb13 = dilutionfirstb13;
	// }
	//
	// @Column(name = "DILUTIONFIRSTC13", precision = 48, scale = 0)
	// public String getDilutionfirstc13() {
	// return dilutionfirstc13;
	// }
	//
	// public void setDilutionfirstc13(String dilutionfirstc13) {
	// this.dilutionfirstc13 = dilutionfirstc13;
	// }
	//
	// @Column(name = "DILUTIONFIRSTD13", precision = 48, scale = 0)
	// public String getDilutionfirstd13() {
	// return dilutionfirstd13;
	// }
	//
	// public void setDilutionfirstd13(String dilutionfirstd13) {
	// this.dilutionfirstd13 = dilutionfirstd13;
	// }
	//
	// @Column(name = "DILUTIONFIRSTE13", precision = 48, scale = 0)
	// public String getDilutionfirste13() {
	// return dilutionfirste13;
	// }
	//
	// public void setDilutionfirste13(String dilutionfirste13) {
	// this.dilutionfirste13 = dilutionfirste13;
	// }

	// @Column(name = "DILUTIONFIRSTF13", precision = 48, scale = 0)
	// public String getDilutionfirstf13() {
	// return dilutionfirstf13;
	// }
	//
	// public void setDilutionfirstf13(String dilutionfirstf13) {
	// this.dilutionfirstf13 = dilutionfirstf13;
	// }

	@Column(name = "DILUTIONFIRSTA21", precision = 48, scale = 0)
	public String getDilutionfirsta21() {
		return dilutionfirsta21;
	}

	public void setDilutionfirsta21(String dilutionfirsta21) {
		this.dilutionfirsta21 = dilutionfirsta21;
	}

	// @Column(name = "DILUTIONFIRSTB21", precision = 48, scale = 0)
	// public String getDilutionfirstb21() {
	// return dilutionfirstb21;
	// }
	//
	// public void setDilutionfirstb21(String dilutionfirstb21) {
	// this.dilutionfirstb21 = dilutionfirstb21;
	// }
	//
	// @Column(name = "DILUTIONFIRSTC21", precision = 48, scale = 0)
	// public String getDilutionfirstc21() {
	// return dilutionfirstc21;
	// }
	//
	// public void setDilutionfirstc21(String dilutionfirstc21) {
	// this.dilutionfirstc21 = dilutionfirstc21;
	// }
	//
	// @Column(name = "DILUTIONFIRSTD21", precision = 48, scale = 0)
	// public String getDilutionfirstd21() {
	// return dilutionfirstd21;
	// }
	//
	// public void setDilutionfirstd21(String dilutionfirstd21) {
	// this.dilutionfirstd21 = dilutionfirstd21;
	// }
	//
	// @Column(name = "DILUTIONFIRSTE21", precision = 48, scale = 0)
	// public String getDilutionfirste21() {
	// return dilutionfirste21;
	// }
	//
	// public void setDilutionfirste21(String dilutionfirste21) {
	// this.dilutionfirste21 = dilutionfirste21;
	// }

	// @Column(name = "DILUTIONFIRSTF21", precision = 48, scale = 0)
	// public String getDilutionfirstf21() {
	// return dilutionfirstf21;
	// }
	//
	// public void setDilutionfirstf21(String dilutionfirstf21) {
	// this.dilutionfirstf21 = dilutionfirstf21;
	// }

	@Column(name = "DILUTIONFIRSTA22", precision = 48, scale = 0)
	public String getDilutionfirsta22() {
		return dilutionfirsta22;
	}

	public void setDilutionfirsta22(String dilutionfirsta22) {
		this.dilutionfirsta22 = dilutionfirsta22;
	}

	// @Column(name = "DILUTIONFIRSTB22", precision = 48, scale = 0)
	// public String getDilutionfirstb22() {
	// return dilutionfirstb22;
	// }
	//
	// public void setDilutionfirstb22(String dilutionfirstb22) {
	// this.dilutionfirstb22 = dilutionfirstb22;
	// }
	//
	// @Column(name = "DILUTIONFIRSTC22", precision = 48, scale = 0)
	// public String getDilutionfirstc22() {
	// return dilutionfirstc22;
	// }
	//
	// public void setDilutionfirstc22(String dilutionfirstc22) {
	// this.dilutionfirstc22 = dilutionfirstc22;
	// }
	//
	// @Column(name = "DILUTIONFIRSTD22", precision = 48, scale = 0)
	// public String getDilutionfirstd22() {
	// return dilutionfirstd22;
	// }
	//
	// public void setDilutionfirstd22(String dilutionfirstd22) {
	// this.dilutionfirstd22 = dilutionfirstd22;
	// }

	// @Column(name = "DILUTIONFIRSTE22", precision = 48, scale = 0)
	// public String getDilutionfirste22() {
	// return dilutionfirste22;
	// }
	//
	// public void setDilutionfirste22(String dilutionfirste22) {
	// this.dilutionfirste22 = dilutionfirste22;
	// }
	//
	// @Column(name = "DILUTIONFIRSTF22", precision = 48, scale = 0)
	// public String getDilutionfirstf22() {
	// return dilutionfirstf22;
	// }
	//
	// public void setDilutionfirstf22(String dilutionfirstf22) {
	// this.dilutionfirstf22 = dilutionfirstf22;
	// }
	@Column(name = "DILUTIONFIRSTA23", precision = 48, scale = 0)
	public String getDilutionfirsta23() {
		return dilutionfirsta23;
	}

	public void setDilutionfirsta23(String dilutionfirsta23) {
		this.dilutionfirsta23 = dilutionfirsta23;
	}

	// @Column(name = "DILUTIONFIRSTB23", precision = 48, scale = 0)
	// public String getDilutionfirstb23() {
	// return dilutionfirstb23;
	// }
	//
	// public void setDilutionfirstb23(String dilutionfirstb23) {
	// this.dilutionfirstb23 = dilutionfirstb23;
	// }
	//
	// @Column(name = "DILUTIONFIRSTC23", precision = 48, scale = 0)
	// public String getDilutionfirstc23() {
	// return dilutionfirstc23;
	// }
	//
	// public void setDilutionfirstc23(String dilutionfirstc23) {
	// this.dilutionfirstc23 = dilutionfirstc23;
	// }
	//
	// @Column(name = "DILUTIONFIRSTD23", precision = 48, scale = 0)
	// public String getDilutionfirstd23() {
	// return dilutionfirstd23;
	// }
	//
	// public void setDilutionfirstd23(String dilutionfirstd23) {
	// this.dilutionfirstd23 = dilutionfirstd23;
	// }
	//
	// @Column(name = "DILUTIONFIRSTE23", precision = 48, scale = 0)
	// public String getDilutionfirste23() {
	// return dilutionfirste23;
	// }

	// public void setDilutionfirste23(String dilutionfirste23) {
	// this.dilutionfirste23 = dilutionfirste23;
	// }
	//
	// @Column(name = "DILUTIONFIRSTF23", precision = 48, scale = 0)
	// public String getDilutionfirstf23() {
	// return dilutionfirstf23;
	// }
	//
	// public void setDilutionfirstf23(String dilutionfirstf23) {
	// this.dilutionfirstf23 = dilutionfirstf23;
	// }
	//	

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
