package com.beauty.biz.entity.beauty;

import javax.persistence.AttributeOverride;
import javax.persistence.AttributeOverrides;
import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * 促销活动明细表
 * Contriveinfo entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "contriveinfo")
public class Contriveinfo implements java.io.Serializable {

	// Fields

	private ContriveinfoId id;

	// Constructors

	/** default constructor */
	public Contriveinfo() {
	}

	/** full constructor */
	public Contriveinfo(ContriveinfoId id) {
		this.id = id;
	}

	// Property accessors
	@EmbeddedId
	@AttributeOverrides( {
			@AttributeOverride(name = "contriveinfoid", column = @Column(name = "contriveinfoid", length = 20)),
			@AttributeOverride(name = "contriveid", column = @Column(name = "contriveid", length = 20)),
			@AttributeOverride(name = "customid", column = @Column(name = "customid", length = 20)),
			@AttributeOverride(name = "buytime", column = @Column(name = "buytime", length = 19)),
			@AttributeOverride(name = "validstatus", column = @Column(name = "validstatus", length = 2)),
			@AttributeOverride(name = "remark", column = @Column(name = "remark", length = 200)) })
	public ContriveinfoId getId() {
		return this.id;
	}

	public void setId(ContriveinfoId id) {
		this.id = id;
	}

}