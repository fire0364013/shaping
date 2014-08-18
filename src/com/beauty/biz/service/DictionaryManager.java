package com.beauty.biz.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.beauty.biz.dao.DictionaryDao;
import com.beauty.biz.entity.dictionary.Dictionaryinfo;
import com.beauty.common.page.QueryResult;

@Service
@Transactional
public class DictionaryManager {
	@Autowired
	private DictionaryDao dictDao;

	/**
	 * 查询字典详情具有排序效果的
	 * 
	 * @return
	 */
	public List<Map<String, Object>> getJsonDataByCode(String code) {
		List<Dictionaryinfo> dicList = dictDao
				.createQuery(
						"from Dictionaryinfo o where o.dictionarycode = ? order by o.dorder",
						code).list();
		List<Map<String, Object>> mapList = new ArrayList<Map<String, Object>>();
		for (Dictionaryinfo dic : dicList) {
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("code", dic.getDinfocode());
			map.put("value", dic.getDinfoname());
			mapList.add(map);
		}
		return mapList;
	}
	
	public List<Dictionaryinfo> getDictionaryinfoByNarycode(String dictionnarycode){
		return dictDao.getDictionaryinfoByNarycode(dictionnarycode);
	}
	
	/**
	 * 去往list页面 和条件查询
	 */
	public QueryResult<Dictionaryinfo> getQueryResult(int startIndex,
			int maxResult, String whereJPQL, Object[] params,
			LinkedHashMap<String, String> orderby) throws Exception {
		return dictDao.getScrollData(startIndex, maxResult, whereJPQL,params, orderby);
	}
	
	/**
	 * 单条数据删除
	 * 
	 * @throws Exception
	 */
	public void delete(String id) {
		dictDao.delete(id);
	}
	/**
	 * 批量删除
	 */
	public void deleteAll(String ids) {
		String[] dict = ids.split(",");
		for (int i = 0; i < dict.length; i++) {
			dictDao.delete(dict[i]);
		}
	}
	
	 /**
	  * 保存
	  */
	public void saveorupadate(Dictionaryinfo dictInfo){
		dictDao.save(dictInfo);
	}
	
	
	/**
	 * 查询序列
	 * 
	 * @param sequenceName
	 * @return
	 */
	public String getSequence(String sequenceName) {
		return dictDao.getSequence(sequenceName);
	}
	
	public Dictionaryinfo getByid(String id){
		return dictDao.get(id);
	}
}
