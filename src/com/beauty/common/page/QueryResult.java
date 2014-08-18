package com.beauty.common.page;

import java.util.List;

/**
 * 
 * @author zhuGy
 * 
 * @param <T>
 */
public class QueryResult<T> {

	private List<T> resultlist;// list
	private long totalrecord;// 总记录数
	private int totalpages;// 总页数

	public long getTotalpages() {
		return totalpages;
	}

	public void setTotalpages(int totalpages) {
		this.totalpages = totalpages;
	}

	public List<T> getResultlist() {
		return resultlist;
	}

	public void setResultlist(List<T> resultlist) {
		this.resultlist = resultlist;
	}

	public long getTotalrecord() {
		return totalrecord;
	}

	public void setTotalrecord(long totalrecord) {
		this.totalrecord = totalrecord;
	}

}
