package com.beauty.biz.entity.entpriseinfo;

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

import com.beauty.biz.entity.dictionary.Dictionaryinfo;


/**
 * 企业信息实体
 */
@Entity
@Table(name = "ENTPRISEINFO")
public class EntpriseInfo implements java.io.Serializable {
	// Fields

	private static final long serialVersionUID = -5604390631455136493L;
	private String entid; // 企业编号
	private String entname; // 企业名称
	private Region province; // 省份
	private Region city; // 城市
	private Region region; // 行政区
	private String organizationcode; // 组织机构代码
	private String fictitiousman; // 法人
	private String telphone; // 电话
	private String mobilephone; // 手机
	private String fax; // 传真
	private String email; // 邮箱
	private String postalcode; // 邮编
	private Pollutionsourcetype pollutionsourcetype;// 企业类型编号
	private Scale scale; // 企业规模编号
	private String address; // 详细地址
	private Date practicedate; // 开业时间
	private String remark; // 备注
	private String linkman;// 联系人


	/** default constructor */
	public EntpriseInfo() {
	}

	// Property accessors
	@Id
	@Column(name = "ENTID", unique = true, nullable = false, length = 40)
	public String getEntid() {
		return this.entid;
	}

	public void setEntid(String entid) {
		this.entid = entid;
	}

	@Column(name = "ENTNAME", nullable = false, length = 80)
	public String getEntname() {
		return this.entname;
	}

	public void setEntname(String entname) {
		this.entname = entname;
	}

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "PROVINCE")
	public Region getProvince() {
		return this.province;
	}

	public void setProvince(Region province) {
		this.province = province;
	}

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "CITY")
	public Region getCity() {
		return this.city;
	}

	public void setCity(Region city) {
		this.city = city;
	}

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "REGION")
	@NotFound(action = NotFoundAction.IGNORE)
	public Region getRegion() {
		return this.region;
	}

	public void setRegion(Region region) {
		this.region = region;
	}

	@Column(name = "ORGANIZATIONCODE", length = 40)
	public String getOrganizationcode() {
		return this.organizationcode;
	}

	public void setOrganizationcode(String organizationcode) {
		this.organizationcode = organizationcode;
	}

	@Column(name = "FICTITIOUSMAN", length = 20)
	public String getFictitiousman() {
		return this.fictitiousman;
	}

	public void setFictitiousman(String fictitiousman) {
		this.fictitiousman = fictitiousman;
	}

	@Column(name = "TELPHONE", length = 20)
	public String getTelphone() {
		return this.telphone;
	}

	public void setTelphone(String telphone) {
		this.telphone = telphone;
	}

	@Column(name = "MOBILEPHONE", length = 30)
	public String getMobilephone() {
		return this.mobilephone;
	}

	public void setMobilephone(String mobilephone) {
		this.mobilephone = mobilephone;
	}

	@Column(name = "FAX", length = 20)
	public String getFax() {
		return this.fax;
	}

	public void setFax(String fax) {
		this.fax = fax;
	}

	@Column(name = "EMAIL", length = 40)
	public String getEmail() {
		return this.email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	@Column(name = "POSTALCODE", length = 10)
	public String getPostalcode() {
		return this.postalcode;
	}

	public void setPostalcode(String postalcode) {
		this.postalcode = postalcode;
	}

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "SOURCETYPECODE")
	@NotFound(action = NotFoundAction.IGNORE)
	public Pollutionsourcetype getPollutionsourcetype() {
		return pollutionsourcetype;
	}

	public void setPollutionsourcetype(Pollutionsourcetype pollutionsourcetype) {
		this.pollutionsourcetype = pollutionsourcetype;
	}


	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "SCALECODE")
	public Scale getScale() {
		return scale;
	}

	public void setScale(Scale scale) {
		this.scale = scale;
	}



	@Column(name = "ADDRESS", length = 80)
	public String getAddress() {
		return this.address;
	}

	public void setAddress(String address) {
		this.address = address;
	}


	@Temporal(TemporalType.DATE)
	@Column(name = "PRACTICEDATE")
	public Date getPracticedate() {
		return practicedate;
	}

	public void setPracticedate(Date practicedate) {
		this.practicedate = practicedate;
	}

	@Column(name = "REMARK", length = 500)
	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	@Column(name = "LINKMAN", length = 40)
	public String getLinkman() {
		return linkman;
	}

	public void setLinkman(String linkman) {
		this.linkman = linkman;
	}


}