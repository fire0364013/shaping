package com.beauty.biz.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;

/**
 * 人员信息表 Employeeinfo entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "CUSTOM")
public class Custom implements java.io.Serializable {

	// Fields
	private static final long serialVersionUID = 1L;
	private String customid;// 人员编号
	private String customname;//客户姓名
	private String carId;// 身份证号
	private Date birthday;// 出生日期
	private String address;// 住址
	private String status;// 状态（在岗、离职、外聘）
	private String remark;// 备注
	private String entid;//所属企业
	
	private String sex; //性别             
	private String consumptionlevel;// 消费级别
	private String mobilephone;// 电话
	private String familybackgroud;//家庭背景
	private String character;//性格
	private String marriage;//婚史
	private String occupation;//职业  
	private String satisfaction;//以往整形满意度
	private String dissatisfiedinfo;//不满意地方
	private String consumptionquota;//消费额度
	private String carfulinfo;//注意事项

	// Constructors

	/** default constructor */
	public Custom() {
	}


	@Column(name = "STATUS", length = 50)
	public String getStatus() {
		return this.status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	/** minimal constructor */
	public Custom(String customid) {
		this.customid = customid;
	}

	// Property accessors
	@Id
	@Column(name = "CUSTOMID", unique = true, nullable = false, length = 50)
	public String getCustomid() {
		return this.customid;
	}

	public void setCustomid(String customid) {
		this.customid = customid;
	}


	@Column(name = "CUSTOMNAME", length = 30)
	public String getCustomname() {
		return customname;
	}

	public void setCustomname(String customname) {
		this.customname = customname;
	}

	@Column(name = "CAR_ID", length = 30)
	public String getCarId() {
		return this.carId;
	}

	public void setCarId(String carId) {
		this.carId = carId;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "BIRTHDAY", length = 7)
	public Date getBirthday() {
		return this.birthday;
	}

	public void setBirthday(Date birthday) {
		this.birthday = birthday;
	}



	@Column(name = "ADDRESS", length = 200)
	public String getAddress() {
		return this.address;
	}

	public void setAddress(String address) {
		this.address = address;
	}


	@Column(name = "REMARK", length = 500)
	public String getRemark() {
		return this.remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}


	@Column(name = "ENTID", length = 30)
	public String getEntid() {
		return entid;
	}

	public void setEntid(String entid) {
		this.entid = entid;
	}


	@Column(name = "SEX", length = 5)
	public String getSex() {
		return sex;
	}


	public void setSex(String sex) {
		this.sex = sex;
	}

	@Column(name = "CONSUMPTIONLEVEL", length = 50)
	public String getConsumptionlevel() {
		return consumptionlevel;
	}


	public void setConsumptionlevel(String consumptionlevel) {
		this.consumptionlevel = consumptionlevel;
	}

	@Column(name = "MOBILEPHONE", length = 50)
	public String getMobilephone() {
		return mobilephone;
	}


	public void setMobilephone(String mobilephone) {
		this.mobilephone = mobilephone;
	}


	@Column(name = "FAMILYBACKGROUD", length = 50)
	public String getFamilybackgroud() {
		return familybackgroud;
	}


	public void setFamilybackgroud(String familybackgroud) {
		this.familybackgroud = familybackgroud;
	}

	@Column(name = "CHARACT", length = 50)
	public String getCharacter() {
		return character;
	}


	public void setCharacter(String character) {
		this.character = character;
	}


	@Column(name = "MARRIAGE", length = 30)
	public String getMarriage() {
		return marriage;
	}


	public void setMarriage(String marriage) {
		this.marriage = marriage;
	}


	@Column(name = "OCCUPATION", length = 50)
	public String getOccupation() {
		return occupation;
	}


	public void setOccupation(String occupation) {
		this.occupation = occupation;
	}


	@Column(name = "SATISFACTION", length = 50)
	public String getSatisfaction() {
		return satisfaction;
	}


	public void setSatisfaction(String satisfaction) {
		this.satisfaction = satisfaction;
	}


	@Column(name = "DISSATISFIEDINFO", length = 500)
	public String getDissatisfiedinfo() {
		return dissatisfiedinfo;
	}


	public void setDissatisfiedinfo(String dissatisfiedinfo) {
		this.dissatisfiedinfo = dissatisfiedinfo;
	}


	@Column(name = "CONSUMPTIONQUOTA", length = 10)
	public String getConsumptionquota() {
		return consumptionquota;
	}


	public void setConsumptionquota(String consumptionquota) {
		this.consumptionquota = consumptionquota;
	}


	@Column(name = "CARFULINFO", length = 500)
	public String getCarfulinfo() {
		return carfulinfo;
	}


	public void setCarfulinfo(String carfulinfo) {
		this.carfulinfo = carfulinfo;
	}

}