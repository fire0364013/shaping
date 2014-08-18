package com.beauty.biz.entity.message;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;

import com.beauty.biz.entity.Userinfo;

@Entity
@Table(name = "MESSAGEBUSINESSGROUP")
public class MessageBusinessGroup implements Serializable {

	private static final long serialVersionUID = 8431996811298877022L;
	private String businessgroupid;
	private String businesscode;
	private MessageGroup groupid;
	public MessageBusinessGroup() {

	}
	@Id
	@Column(name = "businessgroupid", unique = true, nullable = false, length = 20)
	public String getBusinessgroupid() {
		return businessgroupid;
	}
	public void setBusinessgroupid(String businessgroupid) {
		this.businessgroupid = businessgroupid;
	}
	
	@Column(name = "BUSINESSCODE", length = 20)
	public String getBusinesscode() {
		return businesscode;
	}
	public void setBusinesscode(String businesscode) {
		this.businesscode = businesscode;
	}

	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="GROUPID")
	@NotFound(action=NotFoundAction.IGNORE)
	public MessageGroup getGroupid() {
		return groupid;
	}
	public void setGroupid(MessageGroup groupid) {
		this.groupid = groupid;
	}
	
	
	

}
