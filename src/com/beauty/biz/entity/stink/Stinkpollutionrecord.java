package com.beauty.biz.entity.stink;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

/**
 * 
 * 恶臭原始记录表 Stinkpollutionrecord entity.
 * 
 * @author zhugy
 */
@Entity
@Table(name = "STINKPOLLUTIONRECORD")
public class Stinkpollutionrecord implements java.io.Serializable {
	// Fields

	private static final long serialVersionUID = 3396717525365526361L;
	private String id; // 编号
	private String analyst;// 分析员（存储两个分析员的用户编号，用逗号隔开）
	private String assessor;// 嗅辨员（存储嗅辨员的用户编号）
	private String distribution;// 配气员（存储配气员的用户编号）
	private String projectid;// 任务编号
	private Date analysisdate;// 分析日期
	private String samplecode;// 样品编号
	private String sampleitemtestid;// 样品项目编号
	private String dilution30;// 稀释倍数30的结果（1为对，0为错）
	private String dilution100;// 稀释倍数100的结果（1为对，0为错）
	private String dilution300;// 稀释倍数300的结果（1为对，0为错）
	private String dilution1000;// 稀释倍数1000的结果（1为对，0为错）
	private String dilution3000;// 稀释倍数3000的结果（1为对，0为错）
	private String dilution10000;// 稀释倍数10000的结果（1为对，0为错）
	private String dilution30000;// 稀释倍数30000的结果（1为对，0为错）
	private String dilution100000;// 稀释倍数100000的结果（1为对，0为错）
	private String assessorcode;// 嗅辨员编号

	// Constructors

	/** default constructor */
	public Stinkpollutionrecord() {
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

	@Column(name = "ASSESSOR", length = 50)
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

	@Column(name = "DILUTION30", precision = 22, scale = 0)
	public String getDilution30() {
		return this.dilution30;
	}

	public void setDilution30(String dilution30) {
		this.dilution30 = dilution30;
	}

	@Column(name = "DILUTION100", precision = 22, scale = 0)
	public String getDilution100() {
		return this.dilution100;
	}

	public void setDilution100(String dilution100) {
		this.dilution100 = dilution100;
	}

	@Column(name = "DILUTION300", precision = 22, scale = 0)
	public String getDilution300() {
		return this.dilution300;
	}

	public void setDilution300(String dilution300) {
		this.dilution300 = dilution300;
	}

	@Column(name = "DILUTION1000", precision = 22, scale = 0)
	public String getDilution1000() {
		return this.dilution1000;
	}

	public void setDilution1000(String dilution1000) {
		this.dilution1000 = dilution1000;
	}

	@Column(name = "DILUTION3000", precision = 22, scale = 0)
	public String getDilution3000() {
		return this.dilution3000;
	}

	public void setDilution3000(String dilution3000) {
		this.dilution3000 = dilution3000;
	}

	@Column(name = "DILUTION10000", precision = 22, scale = 0)
	public String getDilution10000() {
		return this.dilution10000;
	}

	public void setDilution10000(String dilution10000) {
		this.dilution10000 = dilution10000;
	}

	@Column(name = "DILUTION30000", precision = 22, scale = 0)
	public String getDilution30000() {
		return this.dilution30000;
	}

	public void setDilution30000(String dilution30000) {
		this.dilution30000 = dilution30000;
	}

	@Column(name = "DILUTION100000", precision = 22, scale = 0)
	public String getDilution100000() {
		return this.dilution100000;
	}

	public void setDilution100000(String dilution100000) {
		this.dilution100000 = dilution100000;
	}

	@Column(name = "ASSESSORCODE", length = 10)
	public String getAssessorcode() {
		return assessorcode;
	}

	public void setAssessorcode(String assessorcode) {
		this.assessorcode = assessorcode;
	}

	public boolean equals(Object other) {
		if ((this == other))
			return true;
		if ((other == null))
			return false;
		if (!(other instanceof Stinkpollutionrecord))
			return false;
		Stinkpollutionrecord castOther = (Stinkpollutionrecord) other;

		return ((this.getId() == castOther.getId()) || (this.getId() != null
				&& castOther.getId() != null && this.getId().equals(
				castOther.getId())))
				&& ((this.getAnalyst() == castOther.getAnalyst()) || (this
						.getAnalyst() != null
						&& castOther.getAnalyst() != null && this.getAnalyst()
						.equals(castOther.getAnalyst())))
				&& ((this.getAssessor() == castOther.getAssessor()) || (this
						.getAssessor() != null
						&& castOther.getAssessor() != null && this
						.getAssessor().equals(castOther.getAssessor())))
				&& ((this.getDistribution() == castOther.getDistribution()) || (this
						.getDistribution() != null
						&& castOther.getDistribution() != null && this
						.getDistribution().equals(castOther.getDistribution())))
				&& ((this.getProjectid() == castOther.getProjectid()) || (this
						.getProjectid() != null
						&& castOther.getProjectid() != null && this
						.getProjectid().equals(castOther.getProjectid())))
				&& ((this.getAnalysisdate() == castOther.getAnalysisdate()) || (this
						.getAnalysisdate() != null
						&& castOther.getAnalysisdate() != null && this
						.getAnalysisdate().equals(castOther.getAnalysisdate())))
				&& ((this.getSamplecode() == castOther.getSamplecode()) || (this
						.getSamplecode() != null
						&& castOther.getSamplecode() != null && this
						.getSamplecode().equals(castOther.getSamplecode())))
				&& ((this.getSampleitemtestid() == castOther
						.getSampleitemtestid()) || (this.getSampleitemtestid() != null
						&& castOther.getSampleitemtestid() != null && this
						.getSampleitemtestid().equals(
								castOther.getSampleitemtestid())))
				&& ((this.getDilution30() == castOther.getDilution30()) || (this
						.getDilution30() != null
						&& castOther.getDilution30() != null && this
						.getDilution30().equals(castOther.getDilution30())))
				&& ((this.getDilution100() == castOther.getDilution100()) || (this
						.getDilution100() != null
						&& castOther.getDilution100() != null && this
						.getDilution100().equals(castOther.getDilution100())))
				&& ((this.getDilution300() == castOther.getDilution300()) || (this
						.getDilution300() != null
						&& castOther.getDilution300() != null && this
						.getDilution300().equals(castOther.getDilution300())))
				&& ((this.getDilution1000() == castOther.getDilution1000()) || (this
						.getDilution1000() != null
						&& castOther.getDilution1000() != null && this
						.getDilution1000().equals(castOther.getDilution1000())))
				&& ((this.getDilution3000() == castOther.getDilution3000()) || (this
						.getDilution3000() != null
						&& castOther.getDilution3000() != null && this
						.getDilution3000().equals(castOther.getDilution3000())))
				&& ((this.getDilution10000() == castOther.getDilution10000()) || (this
						.getDilution10000() != null
						&& castOther.getDilution10000() != null && this
						.getDilution10000()
						.equals(castOther.getDilution10000())))
				&& ((this.getDilution30000() == castOther.getDilution30000()) || (this
						.getDilution30000() != null
						&& castOther.getDilution30000() != null && this
						.getDilution30000()
						.equals(castOther.getDilution30000())))
				&& ((this.getDilution100000() == castOther.getDilution100000()) || (this
						.getDilution100000() != null
						&& castOther.getDilution100000() != null && this
						.getDilution100000().equals(
								castOther.getDilution100000())));
	}

	public int hashCode() {
		int result = 17;

		result = 37 * result + (getId() == null ? 0 : this.getId().hashCode());
		result = 37 * result
				+ (getAnalyst() == null ? 0 : this.getAnalyst().hashCode());
		result = 37 * result
				+ (getAssessor() == null ? 0 : this.getAssessor().hashCode());
		result = 37
				* result
				+ (getDistribution() == null ? 0 : this.getDistribution()
						.hashCode());
		result = 37 * result
				+ (getProjectid() == null ? 0 : this.getProjectid().hashCode());
		result = 37
				* result
				+ (getAnalysisdate() == null ? 0 : this.getAnalysisdate()
						.hashCode());
		result = 37
				* result
				+ (getSamplecode() == null ? 0 : this.getSamplecode()
						.hashCode());
		result = 37
				* result
				+ (getSampleitemtestid() == null ? 0 : this
						.getSampleitemtestid().hashCode());
		result = 37
				* result
				+ (getDilution30() == null ? 0 : this.getDilution30()
						.hashCode());
		result = 37
				* result
				+ (getDilution100() == null ? 0 : this.getDilution100()
						.hashCode());
		result = 37
				* result
				+ (getDilution300() == null ? 0 : this.getDilution300()
						.hashCode());
		result = 37
				* result
				+ (getDilution1000() == null ? 0 : this.getDilution1000()
						.hashCode());
		result = 37
				* result
				+ (getDilution3000() == null ? 0 : this.getDilution3000()
						.hashCode());
		result = 37
				* result
				+ (getDilution10000() == null ? 0 : this.getDilution10000()
						.hashCode());
		result = 37
				* result
				+ (getDilution30000() == null ? 0 : this.getDilution30000()
						.hashCode());
		result = 37
				* result
				+ (getDilution100000() == null ? 0 : this.getDilution100000()
						.hashCode());
		return result;
	}
}
