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
@Table(name = "MESSAGEUSERGROUP")
public class MessageUserGroup implements Serializable {

	private static final long serialVersionUID = 8431996811298877022L;
	private String usergroupid;
	private String groupid;
	private Userinfo userinfo;
	public MessageUserGroup() {

	}
	public MessageUserGroup(String usergroupid, String groupid,
			Userinfo userinfo) {
		super();
		this.usergroupid = usergroupid;
		this.groupid = groupid;
		this.userinfo = userinfo;
	}
	@Id
	@Column(name = "USERGROUPID", unique = true, nullable = false, length = 20)
	public String getUsergroupid() {
		return usergroupid;
	}
	public void setUsergroupid(String usergroupid) {
		this.usergroupid = usergroupid;
	}
	@Column(name = "GROUPID", length = 20)
	public String getGroupid() {
		return groupid;
	}
	public void setGroupid(String groupid) {
		this.groupid = groupid;
	}
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "USERID")
	@NotFound(action = NotFoundAction.IGNORE)
	public Userinfo getUserinfo() {
		return userinfo;
	}
	public void setUserinfo(Userinfo userinfo) {
		this.userinfo = userinfo;
	}
	
	

}
