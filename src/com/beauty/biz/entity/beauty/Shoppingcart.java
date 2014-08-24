package com.beauty.biz.entity.beauty;

import java.sql.Timestamp;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * 购物车表
 * Shoppingcart entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "shoppingcart")
public class Shoppingcart implements java.io.Serializable {

	// Fields

	private String orderid;//订单id
	private String ordercode;//订单号
	private String ordertype;//订单类型
	private String customid;//客户id
	private Timestamp orderdate;//下单时间
	private String produceid;//商品id
	private String producecount;//商品数量
	private String unitprice;//商品价格
	private String orderprice;//订单价格
	private String discount;//折扣
	private String remark;//备注信息

	// Constructors

	/** default constructor */
	public Shoppingcart() {
	}

	/** minimal constructor */
	public Shoppingcart(String orderid) {
		this.orderid = orderid;
	}

	/** full constructor */
	public Shoppingcart(String orderid, String ordercode, String ordertype,
			String customid, Timestamp orderdate, String produceid,
			String producecount, String unitprice, String orderprice,
			String discount, String remark) {
		this.orderid = orderid;
		this.ordercode = ordercode;
		this.ordertype = ordertype;
		this.customid = customid;
		this.orderdate = orderdate;
		this.produceid = produceid;
		this.producecount = producecount;
		this.unitprice = unitprice;
		this.orderprice = orderprice;
		this.discount = discount;
		this.remark = remark;
	}

	// Property accessors
	@Id
	@Column(name = "orderid", unique = true, nullable = false, length = 20)
	public String getOrderid() {
		return this.orderid;
	}

	public void setOrderid(String orderid) {
		this.orderid = orderid;
	}

	@Column(name = "ordercode", length = 20)
	public String getOrdercode() {
		return this.ordercode;
	}

	public void setOrdercode(String ordercode) {
		this.ordercode = ordercode;
	}

	@Column(name = "ordertype", length = 2)
	public String getOrdertype() {
		return this.ordertype;
	}

	public void setOrdertype(String ordertype) {
		this.ordertype = ordertype;
	}

	@Column(name = "customid", length = 20)
	public String getCustomid() {
		return this.customid;
	}

	public void setCustomid(String customid) {
		this.customid = customid;
	}

	@Column(name = "orderdate", length = 19)
	public Timestamp getOrderdate() {
		return this.orderdate;
	}

	public void setOrderdate(Timestamp orderdate) {
		this.orderdate = orderdate;
	}

	@Column(name = "produceid", length = 20)
	public String getProduceid() {
		return this.produceid;
	}

	public void setProduceid(String produceid) {
		this.produceid = produceid;
	}

	@Column(name = "producecount", length = 20)
	public String getProducecount() {
		return this.producecount;
	}

	public void setProducecount(String producecount) {
		this.producecount = producecount;
	}

	@Column(name = "unitprice", length = 20)
	public String getUnitprice() {
		return this.unitprice;
	}

	public void setUnitprice(String unitprice) {
		this.unitprice = unitprice;
	}

	@Column(name = "orderprice", length = 20)
	public String getOrderprice() {
		return this.orderprice;
	}

	public void setOrderprice(String orderprice) {
		this.orderprice = orderprice;
	}

	@Column(name = "discount", length = 20)
	public String getDiscount() {
		return this.discount;
	}

	public void setDiscount(String discount) {
		this.discount = discount;
	}

	@Column(name = "remark", length = 200)
	public String getRemark() {
		return this.remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

}