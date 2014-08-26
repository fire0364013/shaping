package com.beauty.biz.service.entpriseinfo;

import java.util.LinkedHashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.beauty.biz.dao.entpriseinfo.AppinfoDao;
import com.beauty.biz.entity.entpriseinfo.Appinfo;
import com.beauty.common.page.QueryResult;

@Service
@Transactional
public class AppinfoManager {

	@Autowired
	private AppinfoDao appinfoDao;
	
	/**
	 * 去往list页面 和条件查询
	 */
	public QueryResult<Appinfo> getQueryResult(int startIndex,
			int maxResult, String whereJPQL, Object[] params,
			LinkedHashMap<String, String> orderby) throws Exception {
		return appinfoDao.getScrollData(startIndex, maxResult, whereJPQL,params, orderby);
	}
	
	/**
	 * 
	 * 
	 * @throws Exception
	 */
	public Appinfo getById(String id) {
		return appinfoDao.get(id);
	}
	
	 /**
	  * 保存
	  */
	public void save(Appinfo appinfo){
		appinfoDao.save(appinfo);
	}
	
	public String getId(){
		return appinfoDao.getId();
	}
	
	public List<Appinfo> getAll(){
		return appinfoDao.getAll();
	}
}
