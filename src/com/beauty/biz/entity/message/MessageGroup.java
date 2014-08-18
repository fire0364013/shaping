package com.beauty.biz.entity.message;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
@Entity
@Table(name = "MESSAGEGROUP")
public class MessageGroup implements Serializable {
	private static final long serialVersionUID = 4469202826883624755L;
	
	private String groupid; // 组的id
	private String groupname;// 组的名字
	
	
	
	public MessageGroup() {
	
	}
	public MessageGroup(String groupid, String groupname) {
		super();
		this.groupid = groupid;
		this.groupname = groupname;
	}
	
	
	@Id
	@Column(name = "GROUPID", unique = true, nullable = false, length = 20)
	public String getGroupid() {
		return groupid;
	}
	public void setGroupid(String groupid) {
		this.groupid = groupid;
	}
	@Column(name = "GROUPNAME", length = 40)
	public String getGroupname() {
		return groupname;
	}
	public void setGroupname(String groupname) {
		this.groupname = groupname;
	}

}
