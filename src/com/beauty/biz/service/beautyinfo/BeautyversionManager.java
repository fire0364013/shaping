package com.beauty.biz.service.beautyinfo;

import java.util.LinkedHashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.beauty.biz.dao.beautyinfo.BeautyversionDao;
import com.beauty.biz.entity.beautyinfo.Beautyversion;
import com.beauty.common.page.QueryResult;

@Service
@Transactional
public class BeautyversionManager {
	
	@Autowired
	private BeautyversionDao beautyversionDao;
	
	/**
	 * 去往list页面 和条件查询
	 */
	public QueryResult<Beautyversion> getQueryResult(int startIndex,
			int maxResult, String whereJPQL, Object[] params,
			LinkedHashMap<String, String> orderby) throws Exception {
		return beautyversionDao.getScrollData(startIndex, maxResult, whereJPQL,params, orderby);
	}

	/**
	 * 
	 * 
	 * @throws Exception
	 */
	public Beautyversion getById(String id) {
		return beautyversionDao.get(id);
	}
	
	 /**
	  * 保存
	  */
	public void saveorupadate(Beautyversion beautyversion){
		beautyversionDao.save(beautyversion);
	}
	
	public String getId(){
		return beautyversionDao.getId();
	}
}
