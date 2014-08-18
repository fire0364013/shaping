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
@Table(name = "EMPLOYEEINFO")
public class Employeeinfo implements java.io.Serializable {

	// Fields
	private static final long serialVersionUID = 1L;
	private String employeeinfoid;// 人员编号
	private String employeeinfoname;//人员姓名
	private String mobilephone;//联系电话
	private String sex;//联系电话
	private String carId;// 身份证号
	private Date birthday;// 出生日期
	private String nation;// 民族
	private String nativeplace;// 籍贯
	private String educationlevel;// 学历
	private String graduationschool;// 毕业学校
	private Date graduationdate;// 毕业日期
	private String major;// 所学专业
	private String address;// 住址
	private String post;// 职务
	private String technicalship;// 职称
	private String technicallevel;// 职称级别
	private Date entrytime;// 入职时间
	private String political;// 政治面貌
	private String stationno;// 上岗证编号
	private String status;// 状态（在岗、离职、外聘）
	private String remark;// 备注
	private String nickName;//简称
	private String entid;//所属企业

	// Constructors

	/** default constructor */
	public Employeeinfo() {
	}

	@Column(name = "STATIONNO", length = 50)
	public String getStationno() {
		return this.stationno;
	}

	public void setStationno(String stationno) {
		this.stationno = stationno;
	}

	@Column(name = "STATUS", length = 50)
	public String getStatus() {
		return this.status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	/** minimal constructor */
	public Employeeinfo(String employeeinfoid) {
		this.employeeinfoid = employeeinfoid;
	}

	// Property accessors
	@Id
	@Column(name = "EMPLOYEEINFOID", unique = true, nullable = false, length = 50)
	public String getEmployeeinfoid() {
		return this.employeeinfoid;
	}

	public void setEmployeeinfoid(String employeeinfoid) {
		this.employeeinfoid = employeeinfoid;
	}


	@Column(name = "EMPLOYEEINFONAME", length = 30)
	public String getEmployeeinfoname() {
		return employeeinfoname;
	}

	public void setEmployeeinfoname(String employeeinfoname) {
		this.employeeinfoname = employeeinfoname;
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

	@Column(name = "NATION", length = 50)
	public String getNation() {
		return this.nation;
	}

	public void setNation(String nation) {
		this.nation = nation;
	}

	@Column(name = "NATIVEPLACE", length = 100)
	public String getNativeplace() {
		return this.nativeplace;
	}

	public void setNativeplace(String nativeplace) {
		this.nativeplace = nativeplace;
	}

	@Column(name = "EDUCATIONLEVEL", length = 30)
	public String getEducationlevel() {
		return this.educationlevel;
	}

	public void setEducationlevel(String educationlevel) {
		this.educationlevel = educationlevel;
	}

	@Column(name = "GRADUATIONSCHOOL", length = 100)
	public String getGraduationschool() {
		return this.graduationschool;
	}

	public void setGraduationschool(String graduationschool) {
		this.graduationschool = graduationschool;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "GRADUATIONDATE", length = 7)
	public Date getGraduationdate() {
		return this.graduationdate;
	}

	public void setGraduationdate(Date graduationdate) {
		this.graduationdate = graduationdate;
	}

	@Column(name = "MAJOR", length = 100)
	public String getMajor() {
		return this.major;
	}

	public void setMajor(String major) {
		this.major = major;
	}

	@Column(name = "ADDRESS", length = 200)
	public String getAddress() {
		return this.address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	@Column(name = "POST", length = 50)
	public String getPost() {
		return this.post;
	}

	public void setPost(String post) {
		this.post = post;
	}

	@Column(name = "TECHNICALSHIP", length = 50)
	public String getTechnicalship() {
		return this.technicalship;
	}

	public void setTechnicalship(String technicalship) {
		this.technicalship = technicalship;
	}

	@Column(name = "TECHNICALLEVEL", length = 50)
	public String getTechnicallevel() {
		return this.technicallevel;
	}

	public void setTechnicallevel(String technicallevel) {
		this.technicallevel = technicallevel;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "ENTRYTIME", length = 7)
	public Date getEntrytime() {
		return this.entrytime;
	}

	public void setEntrytime(Date entrytime) {
		this.entrytime = entrytime;
	}

	@Column(name = "POLITICAL", length = 10)
	public String getPolitical() {
		return this.political;
	}

	public void setPolitical(String political) {
		this.political = political;
	}

	@Column(name = "REMARK", length = 500)
	public String getRemark() {
		return this.remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	public void setNickName(String nickName) {
		this.nickName = nickName;
	}
	@Column(name = "NICKNAME", length = 30)
	public String getNickName() {
		return nickName;
	}

	@Column(name = "ENTID", length = 30)
	public String getEntid() {
		return entid;
	}

	public void setEntid(String entid) {
		this.entid = entid;
	}

	@Column(name = "MOBILEPHONE", length = 30)
	public String getMobilephone() {
		return mobilephone;
	}

	public void setMobilephone(String mobilephone) {
		this.mobilephone = mobilephone;
	}

	@Column(name = "SEX", length = 30)
	public String getSex() {
		return sex;
	}

	public void setSex(String sex) {
		this.sex = sex;
	}

}