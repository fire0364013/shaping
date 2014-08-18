package com.beauty.biz.service;

import java.util.LinkedHashMap;
import java.util.List;

import org.hibernate.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.beauty.biz.dao.NormalAuditRecordDao;
import com.beauty.biz.entity.Normalauditrecord;
import com.beauty.common.page.QueryResult;

@Service
@Transactional
public class NormalAuditRecordManager {
	@Autowired
	private NormalAuditRecordDao normalAuditRecordDao;

	public List<Normalauditrecord> getList(String module) {
		Query query = normalAuditRecordDao.createQuery(
				"from Normalauditrecord o where o.moduleid = "+ module);
		List<Normalauditrecord> list = query.list();
		return list;
	}

	@SuppressWarnings("unchecked")
	public QueryResult getQueryResult(int startIndex, int maxResult,
			String whereJPQL, Object[] params,
			LinkedHashMap<String, String> orderby) throws Exception {
		return normalAuditRecordDao.getScrollData(startIndex, maxResult,
				whereJPQL, params, orderby);
	}

}
