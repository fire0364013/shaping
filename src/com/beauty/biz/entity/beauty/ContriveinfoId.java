package com.beauty.biz.entity.beauty;

import java.sql.Timestamp;
import javax.persistence.Column;
import javax.persistence.Embeddable;

/**
 * ContriveinfoId entity. @author MyEclipse Persistence Tools
 */
@Embeddable
public class ContriveinfoId implements java.io.Serializable {

	// Fields

	private String contriveinfoid;//明细id
	private String contriveid;//活动id
	private String customid;//客户id
	private Timestamp buytime;//购买时间
	private String validstatus;//有效状态
	private String remark;//备注

	// Constructors

	/** default constructor */
	public ContriveinfoId() {
	}

	/** full constructor */
	public ContriveinfoId(String contriveinfoid, String contriveid,
			String customid, Timestamp buytime, String validstatus,
			String remark) {
		this.contriveinfoid = contriveinfoid;
		this.contriveid = contriveid;
		this.customid = customid;
		this.buytime = buytime;
		this.validstatus = validstatus;
		this.remark = remark;
	}

	// Property accessors

	@Column(name = "contriveinfoid", length = 20)
	public String getContriveinfoid() {
		return this.contriveinfoid;
	}

	public void setContriveinfoid(String contriveinfoid) {
		this.contriveinfoid = contriveinfoid;
	}

	@Column(name = "contriveid", length = 20)
	public String getContriveid() {
		return this.contriveid;
	}

	public void setContriveid(String contriveid) {
		this.contriveid = contriveid;
	}

	@Column(name = "customid", length = 20)
	public String getCustomid() {
		return this.customid;
	}

	public void setCustomid(String customid) {
		this.customid = customid;
	}

	@Column(name = "buytime", length = 19)
	public Timestamp getBuytime() {
		return this.buytime;
	}

	public void setBuytime(Timestamp buytime) {
		this.buytime = buytime;
	}

	@Column(name = "validstatus", length = 2)
	public String getValidstatus() {
		return this.validstatus;
	}

	public void setValidstatus(String validstatus) {
		this.validstatus = validstatus;
	}

	@Column(name = "remark", length = 200)
	public String getRemark() {
		return this.remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	public boolean equals(Object other) {
		if ((this == other))
			return true;
		if ((other == null))
			return false;
		if (!(other instanceof ContriveinfoId))
			return false;
		ContriveinfoId castOther = (ContriveinfoId) other;

		return ((this.getContriveinfoid() == castOther.getContriveinfoid()) || (this
				.getContriveinfoid() != null
				&& castOther.getContriveinfoid() != null && this
				.getContriveinfoid().equals(castOther.getContriveinfoid())))
				&& ((this.getContriveid() == castOther.getContriveid()) || (this
						.getContriveid() != null
						&& castOther.getContriveid() != null && this
						.getContriveid().equals(castOther.getContriveid())))
				&& ((this.getCustomid() == castOther.getCustomid()) || (this
						.getCustomid() != null
						&& castOther.getCustomid() != null && this
						.getCustomid().equals(castOther.getCustomid())))
				&& ((this.getBuytime() == castOther.getBuytime()) || (this
						.getBuytime() != null
						&& castOther.getBuytime() != null && this.getBuytime()
						.equals(castOther.getBuytime())))
				&& ((this.getValidstatus() == castOther.getValidstatus()) || (this
						.getValidstatus() != null
						&& castOther.getValidstatus() != null && this
						.getValidstatus().equals(castOther.getValidstatus())))
				&& ((this.getRemark() == castOther.getRemark()) || (this
						.getRemark() != null
						&& castOther.getRemark() != null && this.getRemark()
						.equals(castOther.getRemark())));
	}

	public int hashCode() {
		int result = 17;

		result = 37
				* result
				+ (getContriveinfoid() == null ? 0 : this.getContriveinfoid()
						.hashCode());
		result = 37
				* result
				+ (getContriveid() == null ? 0 : this.getContriveid()
						.hashCode());
		result = 37 * result
				+ (getCustomid() == null ? 0 : this.getCustomid().hashCode());
		result = 37 * result
				+ (getBuytime() == null ? 0 : this.getBuytime().hashCode());
		result = 37
				* result
				+ (getValidstatus() == null ? 0 : this.getValidstatus()
						.hashCode());
		result = 37 * result
				+ (getRemark() == null ? 0 : this.getRemark().hashCode());
		return result;
	}

}