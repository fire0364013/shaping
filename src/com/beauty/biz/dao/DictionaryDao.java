package com.beauty.biz.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.beauty.biz.entity.dictionary.Dictionaryinfo;
import com.beauty.common.orm.hibernate3.HibernateDao;

@Repository
public class DictionaryDao extends HibernateDao<Dictionaryinfo> {
	
	/**
	 * 获取给定字典类型的明细列表
	 * 
	 * @param monitortypeid
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public List<Dictionaryinfo> getDictionaryinfoByNarycode(String dictionnarycode) {
		String hql = " from Dictionaryinfo m  where m.dictionarycode = ? order by m.dorder";
		List<Dictionaryinfo> list = createQuery(hql,
				(Object[]) new String[] { dictionnarycode }).list();
		return list;
	}	
	
	
}
