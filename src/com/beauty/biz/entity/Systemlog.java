package com.beauty.biz.entity;

import java.sql.Timestamp;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;

import com.beauty.biz.entity.Module;
import com.beauty.biz.entity.Userinfo;

/**
 * Systemlog entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "SYSTEMLOG")
public class Systemlog implements java.io.Serializable {

	// Fields

	/**
	 * 
	 */
	private static final long serialVersionUID = 7230770494479537754L;
	private String logid;// 系统id
	private Userinfo operationuser;// 用户
	private Timestamp operatetime;// 操作时间
	private Module moduleid;// 模块id
	private String operatecontent;// 操作说明

	@Id
	@Column(name = "LOGID", unique = true, nullable = false, length = 20)
	public String getLogid() {
		return this.logid;
	}

	public void setLogid(String logid) {
		this.logid = logid;
	}

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "OPERATIONUSER")
	@NotFound(action = NotFoundAction.IGNORE)
	public Userinfo getOperationuser() {
		return this.operationuser;
	}

	public void setOperationuser(Userinfo operationuser) {
		this.operationuser = operationuser;
	}

	@Column(name = "OPERATETIME", length = 11)
	public Timestamp getOperatetime() {
		return this.operatetime;
	}

	public void setOperatetime(Timestamp operatetime) {
		this.operatetime = operatetime;
	}

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "MODULEID")
	@NotFound(action = NotFoundAction.IGNORE)
	public Module getModuleid() {
		return this.moduleid;
	}

	public void setModuleid(Module moduleid) {
		this.moduleid = moduleid;
	}

	@Column(name = "OPERATECONTENT", length = 200)
	public String getOperatecontent() {
		return this.operatecontent;
	}

	public void setOperatecontent(String operatecontent) {
		this.operatecontent = operatecontent;
	}

}