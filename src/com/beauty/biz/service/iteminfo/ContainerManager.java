package com.beauty.biz.service.iteminfo;

import java.util.LinkedHashMap;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.beauty.biz.dao.SystemlogDao;
import com.beauty.common.page.QueryResult;
import com.beauty.common.utils.SessionUser;
import com.beauty.biz.dao.iteminfo.ContainerDao;
import com.beauty.biz.entity.iteminfo.Container;

@Service
@Transactional
public class ContainerManager {
	@Autowired
	private ContainerDao containerDao;
	@Autowired
	private SystemlogDao systemlogDao;

	/*
	 * 单个实体查询
	 */
	public QueryResult<Container> getQueryResult(int startIndex, int maxResult,
			String whereJPQL, Object[] params,
			LinkedHashMap<String, String> orderby) throws Exception {
		return containerDao.getScrollData(startIndex, maxResult, whereJPQL,
				params, orderby);
	}

	/*
	 * 删除选中容器
	 */
	public void batchDelete(HttpServletRequest request, SessionUser session) {
		String str = request.getParameter("id");
		String[] arrId = str.split(",");
		for (String s : arrId) {
			try {
				containerDao.delete(s);// 批量删除~真删除的时候用这个
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		String newId = str.replace(",", "、");
		String operatecontent = "删除了容器id为" + newId + "的记录";
		systemlogDao.addSystemLog(session.getModule(), session.getUserid(),
				operatecontent);
	}

	/**
	 * 单条删除
	 */
	public void deleteOnlyOne(HttpServletRequest request, SessionUser session) {
		String s = request.getParameter("id");
		containerDao.delete(s);
		String operatecontent = "删除了容器id为" + s + "的记录";
		systemlogDao.addSystemLog(session.getModule(), session.getUserid(),
				operatecontent);
	}

	/**
	 * 保存当前实体
	 */
	public void saveUpdate(Container ep) {
		containerDao.save(ep);
	}

	/**
	 * 根据名字查询实体
	 * 
	 * @param name
	 * @return
	 */
	public boolean getEntityByName(String name) {
		return containerDao.getEntityByName(name);
	}

	/**
	 * 获得环境参数编号的序列
	 */
	public String getSeq(String sequenceName) {
		return containerDao.getSequence(sequenceName);
	}

	/**
	 * 查询采样容器下拉框
	 * 
	 * @return
	 */
	public List<Container> findAll() {
		List<Container> containerTypeList = containerDao.getAll();
		return containerTypeList;
	}

	/**
	 * 根据id查询
	 */
	public Container findById(String id) {
		return containerDao.get(id);
	}

}
