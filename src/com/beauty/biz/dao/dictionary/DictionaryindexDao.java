package com.beauty.biz.dao.dictionary;

import java.util.List;

import org.hibernate.Query;
import org.springframework.stereotype.Repository;

import com.beauty.biz.entity.dictionary.Dictionaryindex;
import com.beauty.common.orm.hibernate3.HibernateDao;

@Repository
public class DictionaryindexDao extends HibernateDao<Dictionaryindex>{
	

	/**
	 * 查询数据字典
	 */
	@SuppressWarnings("unchecked")
	public List<Dictionaryindex> getDictIndexOrderBy() {
		Query query = createQuery("from Dictionaryindex di  order by di.dictionarycode ");
		List<Dictionaryindex> feeVersionList = query.list();
		return feeVersionList;
	}
	
}
