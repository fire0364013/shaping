package com.beauty.biz.service.beauty;

import java.util.LinkedHashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.beauty.biz.dao.beauty.BeautyinfoDao;
import com.beauty.biz.entity.beauty.Beautyinfo;
import com.beauty.common.page.QueryResult;

@Service
@Transactional
public class BeautyinfoManager {

	@Autowired
	private BeautyinfoDao beautyinfoDao;
	/**
	 * 去往list页面 和条件查询
	 */
	public QueryResult<Beautyinfo> getQueryResult(int startIndex,
			int maxResult, String whereJPQL, Object[] params,
			LinkedHashMap<String, String> orderby) throws Exception {
		return beautyinfoDao.getScrollData(startIndex, maxResult, whereJPQL,params, orderby);
	}
	
	/**
	 * 
	 * 
	 * @throws Exception
	 */
	public Beautyinfo getById(String id) {
		return beautyinfoDao.get(id);
	}
	
	 /**
	  * 保存
	  */
	public void save(Beautyinfo beautyinfo){
		beautyinfoDao.save(beautyinfo);
	}
	
	public String getId(){
		return beautyinfoDao.getId();
	}
	
	public List<Beautyinfo> getAll(){
		return beautyinfoDao.getAll();
	}
}
