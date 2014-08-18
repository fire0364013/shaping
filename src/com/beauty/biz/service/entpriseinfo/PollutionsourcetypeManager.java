package com.beauty.biz.service.entpriseinfo;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.beauty.common.page.QueryResult;
import com.beauty.biz.dao.entpriseinfo.PollutionsourcetypeDao;
import com.beauty.biz.entity.entpriseinfo.Pollutionsourcetype;

@Service
@Transactional
public class PollutionsourcetypeManager {
	@Autowired
	private PollutionsourcetypeDao pollutionsourcetypeDao;

	/**
	 * 获得所有污染源类型实体
	 * */
	public List<Pollutionsourcetype> getAllPollutionsourcetype() {
		return pollutionsourcetypeDao.getAll();
	}

	/**
	 * 获得所有污染源类型实体
	 * */
	public List<Pollutionsourcetype> getAllPollutionsourcetypeOrderby() {
		String hql = "select o from Pollutionsourcetype o order by o.sourcetype";
		List<Pollutionsourcetype> list = pollutionsourcetypeDao
				.createQuery(hql).list();
		return list;
	}

	/**
	 * 获得污染源类型实体
	 * 
	 * @param sourcetypecode
	 *            : 污染源类型编号
	 */
	public Pollutionsourcetype getPollutionsourcetypeBySourcetypecode(
			String sourcetypecode) {
		return pollutionsourcetypeDao.get(sourcetypecode);
	}
	
	public QueryResult<Pollutionsourcetype> getQueryResult(int startIndex, int maxIndex,
			String whereSB, Object[] params, LinkedHashMap<String, String> orderby) throws Exception{
		return pollutionsourcetypeDao.getScrollData(startIndex, maxIndex, whereSB, params, orderby);
	}
}
