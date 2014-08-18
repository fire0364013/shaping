package com.beauty.biz.service;

import java.util.LinkedHashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.beauty.biz.dao.SystemlogDao;
import com.beauty.biz.entity.Module;
import com.beauty.biz.entity.Systemlog;
import com.beauty.common.page.QueryResult;

/**
 * 系统日志manager
 * 
 * @author lh
 * 
 */
@Service
@Transactional
public class SystemlogManager {
	@Autowired
	private SystemlogDao systemlogDao;

	/**
	 * 去往list页面， 并且条件查询
	 * 
	 * @param startIndex
	 * @param maxResult
	 * @param whereJPQL
	 * @param params
	 * @param orderby
	 * @return
	 * @throws Exception
	 */
	public QueryResult<Systemlog> getQueryResult(int startIndex, int maxResult,
			String whereJPQL, Object[] params,
			LinkedHashMap<String, String> orderby) throws Exception {
		return systemlogDao.getScrollData(startIndex, maxResult, whereJPQL,
				params, orderby);
	}

	/**
	 * 删除
	 * 
	 * @param id
	 */
	public void delete(String logid) {
		if (logid != null && !("").equals(logid)) {
			String[] logids = logid.split(",");
			for (String logidspilt : logids) {
				systemlogDao.delete(logidspilt);
			}
		}
	}

	/**
	 * 清空日志
	 */
	public void delectAllEntity() {
		String hql = "delete from Systemlog";
		systemlogDao.createQuery(hql).executeUpdate();
	}

	/**
	 * 保存系统日志
	 */
	public void addSystemLog(Module moduleEntity, String userid,
			String operatecontent) {
		systemlogDao.addSystemLog(moduleEntity, userid, operatecontent);
	}

	/**
	 * 保存系统日志
	 */
	public void addSystemLog(String userid, String operatecontent) {
		systemlogDao.addSystemLog(userid, operatecontent);
	}

}
