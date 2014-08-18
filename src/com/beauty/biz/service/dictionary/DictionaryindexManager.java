package com.beauty.biz.service.dictionary;

import java.util.LinkedHashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.beauty.biz.dao.dictionary.DictionaryindexDao;
import com.beauty.biz.entity.dictionary.Dictionaryindex;
import com.beauty.common.page.QueryResult;

@Service
@Transactional
public class DictionaryindexManager {
	
	@Autowired
	private DictionaryindexDao dictIndexDao;
	
	
	/**
	 * 查询数据字典具有排序效果的
	 * 
	 * @return
	 */
	public List<Dictionaryindex> getDeviceTypeOrderBy() {
		List<Dictionaryindex> dictIndexList = dictIndexDao.getDictIndexOrderBy();
		return dictIndexList;
	}
	
	/**
	 * 去往list页面 和条件查询
	 */
	public QueryResult<Dictionaryindex> getQueryResult(int startIndex,
			int maxResult, String whereJPQL, Object[] params,
			LinkedHashMap<String, String> orderby) throws Exception {
		return dictIndexDao.getScrollData(startIndex, maxResult, whereJPQL,params, orderby);
	}
	
	/**
	 * 单条数据删除
	 * 
	 * @throws Exception
	 */
	public void delete(String id) {
		dictIndexDao.delete(id);
	}
	/**
	 * 批量删除
	 */
	public void deleteAll(String ids) {
		String[] dict = ids.split(",");
		for (int i = 0; i < dict.length; i++) {
			dictIndexDao.delete(dict[i]);
		}
	}
	
	 /**
	  * 保存
	  */
	public void saveorupadate(Dictionaryindex dictIndex){
		dictIndexDao.save(dictIndex);
	}
	
	
	/**
	 * 查询序列
	 * 
	 * @param sequenceName
	 * @return
	 */
	public String getSequence(String sequenceName) {
		return dictIndexDao.getSequence(sequenceName);
	}
}
