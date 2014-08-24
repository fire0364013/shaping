package com.beauty.biz.service.entpriseinfo;

import java.util.LinkedHashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.beauty.biz.dao.entpriseinfo.AppversionDao;
import com.beauty.biz.entity.entpriseinfo.Appversion;
import com.beauty.common.page.QueryResult;

@Service
@Transactional
public class AppversionManager {

	@Autowired
	private AppversionDao appversionDao;
	
	/**
	 * 去往list页面 和条件查询
	 */
	public QueryResult<Appversion> getQueryResult(int startIndex,
			int maxResult, String whereJPQL, Object[] params,
			LinkedHashMap<String, String> orderby) throws Exception {
		return appversionDao.getScrollData(startIndex, maxResult, whereJPQL,params, orderby);
	}
	
	/**
	 * 
	 * 
	 * @throws Exception
	 */
	public Appversion getById(String id) {
		return appversionDao.get(id);
	}
	
	 /**
	  * 保存
	  */
	public void save(Appversion advertinfo){
		appversionDao.save(advertinfo);
	}
	
	public String getId(){
		return appversionDao.getId();
	}
	
	public List<Appversion> getAll(){
		return appversionDao.getAll();
	}
}
