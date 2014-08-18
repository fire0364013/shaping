package com.beauty.biz.service.entpriseinfo;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.beauty.biz.dao.DictionaryDao;
import com.beauty.biz.dao.SystemlogDao;
import com.beauty.biz.entity.dictionary.Dictionaryinfo;
import com.beauty.common.page.QueryResult;
import com.beauty.common.utils.SessionUser;
import com.beauty.biz.dao.entpriseinfo.EntpriseInfoDao;
import com.beauty.biz.entity.entpriseinfo.EntpriseInfo;
import com.beauty.biz.entity.entpriseinfo.Registertype;

@Service
@Transactional
public class EntpriseInfoManager {
	@Autowired
	private EntpriseInfoDao entpriseInfoDao;
	@Autowired
	private SystemlogDao systemlogDao; // 系统日志
	@Autowired
	private DictionaryDao dictionaryDao; // 关注程度

	/**
	 * 获得序列值
	 * 
	 * @param sequenceName
	 *            :序列名称 是:"SEQ_ENTERPRISE"
	 * 
	 */
	public String getSequence(String sequenceName) {
		return entpriseInfoDao.getSequence(sequenceName);
	}

	/**
	 * 查询所有企业信息实体
	 * 
	 * @param where
	 *            : 条件
	 * @param params
	 *            : 与条件对应的值数组
	 */
	public List<EntpriseInfo> getAllEntpriseInfo() {
		return entpriseInfoDao.getAll();
	}

	/**
	 * 查询满足条件的企业信息实体
	 * 
	 * @param where
	 *            : 条件
	 * @param params
	 *            : 与条件对应的值数组
	 */
	public List<EntpriseInfo> getAllEntpriseInfo(String where, Object[] params) {
		return entpriseInfoDao.getAllEntpriseInfo(where, params);
	}

	/**
	 * 查询满足条件的企业信息实体
	 * 
	 * @param where
	 *            : 条件
	 * @param params
	 *            : 与条件对应的值数组
	 */
	public JSONObject getAllEntpriseInfoJson(String where, Object[] params) {
		List<EntpriseInfo> list = getAllEntpriseInfo(where.toString(), params);
		List<Map<String, Object>> rowData = new ArrayList<Map<String, Object>>();
		for (EntpriseInfo e : list) {
			Map<String, Object> m = new HashMap<String, Object>();
			m.put("entid", e.getEntid());
			m.put("entname", e.getEntname());
			rowData.add(m);
		}
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("rowsData", rowData);// jquery easyui 需要的结果集
		// 变成jsonobject
		String first = JSONArray.fromObject(map).toString();
		String jsonStr = first.substring(1, first.length() - 1);
		return JSONObject.fromObject(jsonStr);
	}

	/**
	 * 通过主键获取企业信息
	 * 
	 * @param id
	 * @return
	 * @author chenxzh
	 */
	public EntpriseInfo getEntpriseinfo(String id) {
		EntpriseInfo entinfo = entpriseInfoDao.get(id);
		return entinfo;
	}

	/*
	 * 企业分页 单个实体查询
	 */
	public QueryResult<EntpriseInfo> getQueryResult(int startIndex,
			int maxResult, String whereJPQL, Object[] params,
			LinkedHashMap<String, String> orderby) throws Exception {
		return entpriseInfoDao.getScrollData(startIndex, maxResult, whereJPQL,
				params, orderby);
	}

	/**
	 * 增加或修改角色
	 */
	public void addOrUpdateEntpriseInfo(EntpriseInfo entpriseInfo) {
		entpriseInfoDao.save(entpriseInfo);
	}

	/**
	 * 删除企业信息
	 */
	public boolean deleteEntpriseInfo(String ids, SessionUser sessionUser) {
		boolean flag = false;
		try {
			JSONObject jsonObj = JSONObject.fromObject(ids);
			String entidArr = jsonObj.getString("entid");
			String entidStr = entidArr;
			String entids = "";
			if (entidArr.contains("[")) {
				entidStr = entidArr.substring(1, entidArr.length() - 1);// 去掉[和]
			}
			String[] arrId = entidStr.split(",");
			for (String s : arrId) {
				String entid = s.substring(1, s.length() - 1);// 去掉""
				entpriseInfoDao.delete(entid);
				entids = entids + entid + "、";
			}
			// 向日志表中插入数据************开始
			if (entidStr != null && !"".equals(entidStr)) {
				entids = entids.substring(0, entids.length() - 1);
				String operatecontent = "";
				operatecontent = "删除了企业id为" + entids + "的记录";
				systemlogDao.addSystemLog(sessionUser.getModule(), sessionUser
						.getUserid(), operatecontent);
			}
			// **********************结束
			flag = true;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return flag;

	}

	/**
	 * @param ids
	 *            批量删除
	 */
	public void deleteAll(String ids) {
		String[] id = ids.split(",");

		for (int i = 0; i < id.length; i++) {
			entpriseInfoDao.delete(id[i]);
		}
	}

	public boolean getEntityByName(String entname) {
		List<EntpriseInfo> entList = entpriseInfoDao.createQuery(
				"from EntpriseInfo o where o.entname = ?", entname).list();
		if (entList.size() > 0) {
			return true;
		} else {
			return false;
		}
	}

	/**
	 * 获得所有关注程度实体
	 * */
	public List<Dictionaryinfo> getAllDictionaryinfo() {
		String hql = "select o from Dictionaryinfo o  where o.dictionarycode='GZCD' order by o.dorder";
		List<Dictionaryinfo> list = entpriseInfoDao.createQuery(hql).list();
		return list;
	}

	/**
	 * 获得所有关注程度实体
	 * */
	public Dictionaryinfo getDictionaryinfo(String dinfoid) {
		return dictionaryDao.get(dinfoid);
	}

}
