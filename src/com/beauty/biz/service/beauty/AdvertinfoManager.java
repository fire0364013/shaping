package com.beauty.biz.service.beauty;

import java.util.LinkedHashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.beauty.biz.dao.beauty.AdvertinfoDao;
import com.beauty.biz.entity.beauty.Advertinfo;
import com.beauty.common.page.QueryResult;

@Service
@Transactional
public class AdvertinfoManager {

	@Autowired
	private AdvertinfoDao advertinfoDao;
	
	/**
	 * 去往list页面 和条件查询
	 */
	public QueryResult<Advertinfo> getQueryResult(int startIndex,
			int maxResult, String whereJPQL, Object[] params,
			LinkedHashMap<String, String> orderby) throws Exception {
		return advertinfoDao.getScrollData(startIndex, maxResult, whereJPQL,params, orderby);
	}
	
	/**
	 * 
	 * 
	 * @throws Exception
	 */
	public Advertinfo getById(String id) {
		return advertinfoDao.get(id);
	}
	
	 /**
	  * 保存
	  */
	public void save(Advertinfo advertinfo){
		advertinfoDao.save(advertinfo);
	}
	
	public String getId(){
		return advertinfoDao.getId();
	}
	
	public List<Advertinfo> getAll(){
		return advertinfoDao.getAll();
	}
}
