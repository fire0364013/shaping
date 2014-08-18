package com.beauty.biz.service;

import java.util.LinkedHashMap;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.beauty.biz.dao.SavedoseDao;
import com.beauty.biz.dao.SystemlogDao;
import com.beauty.biz.entity.Savedose;
import com.beauty.common.page.QueryResult;
import com.beauty.common.utils.SessionUser;

@Service
@Transactional
public class SavedoseManager {
	@Autowired
	private SavedoseDao savedoseDao;
	@Autowired
	private SystemlogDao systemlogDao;// 系统日志

	/*
	 * 单个实体查询
	 */
	public QueryResult<Savedose> getQueryResult(int startIndex, int maxResult,
			String whereJPQL, Object[] params,
			LinkedHashMap<String, String> orderby) throws Exception {
		return savedoseDao.getScrollData(startIndex, maxResult, whereJPQL,
				params, orderby);
	}

	/**
	 * 获得保存剂编号的序列
	 */
	public String getSeq(String sequenceName) {
		return savedoseDao.getSequence(sequenceName);
	}

	/**
	 * 保存当前实体
	 */
	public void saveUpdate(Savedose savedose) {
		savedoseDao.save(savedose);
	}

	/**
	 * 根据名字查询实体
	 * 
	 * @param name
	 * @return
	 */
	public boolean getEntityByName(String name) {
		return savedoseDao.getEntityByName(name);
	}

	/**
	 * 单条删除
	 */
	public void deleteOnlyOne(HttpServletRequest request, SessionUser session) {
		String s = request.getParameter("id");
		savedoseDao.delete(s);
		String operatecontent = "删除了保存剂id为" + s + "的记录";
		systemlogDao.addSystemLog(session.getModule(), session.getUserid(),
				operatecontent);
	}

	/*
	 * 删除选中区域
	 */
	public void batchDelete(HttpServletRequest request, SessionUser session) {
		String str = request.getParameter("id");
		String[] arrId = str.split(",");
		for (String s : arrId) {
			try {
				savedoseDao.delete(s);// 批量删除~真删除的时候用这个
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		String newId = str.replace(",", "、");
		String operatecontent = "删除了保存剂id为" + newId + "的记录";
		systemlogDao.addSystemLog(session.getModule(), session.getUserid(),
				operatecontent);
	}
}
