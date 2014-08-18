package com.beauty.biz.service.group;

import java.util.LinkedHashMap;
import java.util.List;

import org.hibernate.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.beauty.biz.dao.group.UsergroupDao;
import com.beauty.biz.entity.group.Usergroup;
import com.beauty.common.page.QueryResult;

@Service
@Transactional
public class UsergroupManager {
	@Autowired
	private UsergroupDao usergroupDao;

	/**
	 * 去往list页面 以及条件查询
	 * 
	 * @param startIndex
	 * @param maxResult
	 * @param whereJPQL
	 * @param params
	 * @param orderby
	 * @return
	 * @throws Exception
	 */
	public QueryResult<Usergroup> getQueryResult(int startIndex, int maxResult,
			String whereJPQL, Object[] params,
			LinkedHashMap<String, String> orderby) throws Exception {
		return usergroupDao.getScrollData(startIndex, maxResult, whereJPQL,
				params, orderby);
	}

	public List<String> getGroupidList(String hql) {
		return usergroupDao.getGroupidList(hql);
	}

	public List<Usergroup> getUsergroupList(String hql) {
		return usergroupDao.getUsergroupList(hql);
	}

	/**
	 * 查询序列
	 * 
	 * @param sequenceName
	 * @return
	 */
	public String getSequence(String sequenceName) {
		return usergroupDao.getSequence(sequenceName);
	}

	public void save(Usergroup entity) {
		usergroupDao.save(entity);
	}

	public void delete(String id) {
		usergroupDao.delete(id);
	}

	public Query getByTerm(String hql, Object... values) {
		return usergroupDao.createQuery(hql, values);
	}

	public Usergroup getById(String id) {
		return usergroupDao.get(id);
	}
}
