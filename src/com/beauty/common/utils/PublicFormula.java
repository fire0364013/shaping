package com.beauty.common.utils;

import java.util.Date;
import java.util.Map;

/**
 * 公式调用中间类
 * @author cxz
 *
 */
public class PublicFormula {
	
	private Map<String,String> rowlist;						//每行数据
	private String  sampleitemtestid;						//样品项目id
	private String  analysissparamid;						//分析参数id
	private String paramname;								//参数名称
	private String 	type;									//质控类型
	private String 	orderid;								//排序
	private String isrepavgdata;							//是否重复样平均值 Y /N
	private String itemid;									//项目id
	private String methodid;								//方法id
	private Date samplingstartdate;
	private String entyid;									//實體id
	
	//用来存放参数组数
	private String[] params;
	public String[] getParams() {
		return params;
	}
	public void setParams(String[] params) {
		this.params = params;
	}
	
	
	public Map<String, String> getRowlist() {
		return rowlist;
	}
	public void setRowlist(Map<String, String> rowlist) {
		this.rowlist = rowlist;
	}	

	public String getSampleitemtestid() {
		return sampleitemtestid;
	}
	public void setSampleitemtestid(String sampleitemtestid) {
		this.sampleitemtestid = sampleitemtestid;
	}
	public String getAnalysissparamid() {
		return analysissparamid;
	}
	public void setAnalysissparamid(String analysissparamid) {
		this.analysissparamid = analysissparamid;
	}
	
	public String getParamname() {
		return paramname;
	}
	
	public void setParamname(String paramname) {
		this.paramname = paramname;
	}
	
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getOrderid() {
		return orderid;
	}
	public void setOrderid(String orderid) {
		this.orderid = orderid;
	}
	public String getIsrepavgdata() {
		return isrepavgdata;
	}
	public void setIsrepavgdata(String isrepavgdata) {
		this.isrepavgdata = isrepavgdata;
	}
	public String getItemid() {
		return itemid;
	}
	public void setItemid(String itemid) {
		this.itemid = itemid;
	}
	public String getMethodid() {
		return methodid;
	}
	public void setMethodid(String methodid) {
		this.methodid = methodid;
	}
	public Date getSamplingstartdate() {
		return samplingstartdate;
	}
	public void setSamplingstartdate(Date samplingstartdate) {
		this.samplingstartdate = samplingstartdate;
	}
	public String getEntyid() {
		return entyid;
	}
	public void setEntyid(String entyid) {
		this.entyid = entyid;
	}
	
}	
