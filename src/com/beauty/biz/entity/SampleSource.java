package com.beauty.biz.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * 样品来源实体
 */
@Entity
@Table(name = "SAMPLESOURCE")
public class SampleSource implements java.io.Serializable {
	// Fields

	private static final long serialVersionUID = -3194998578297194643L;
	private String samplesourceid; // 样品来源编号
	private String samplesourcename;// 样品来源名称

	// Constructors

	/** default constructor */
	public SampleSource() {
	}

	/** minimal constructor */
	public SampleSource(String samplesourceid) {
		this.samplesourceid = samplesourceid;
	}

	/** full constructor */
	public SampleSource(String samplesourceid, String samplesourcename) {
		this.samplesourceid = samplesourceid;
		this.samplesourcename = samplesourcename;
	}

	// Property accessors
	@Id
	@Column(name = "SAMPLESOURCEID", unique = true, nullable = false, length = 10)
	public String getSamplesourceid() {
		return this.samplesourceid;
	}

	public void setSamplesourceid(String samplesourceid) {
		this.samplesourceid = samplesourceid;
	}

	@Column(name = "SAMPLESOURCENAME", length = 50)
	public String getSamplesourcename() {
		return this.samplesourcename;
	}

	public void setSamplesourcename(String samplesourcename) {
		this.samplesourcename = samplesourcename;
	}

}