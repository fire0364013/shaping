package com.beauty.biz.service.projects;

import java.util.LinkedHashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.beauty.common.page.QueryResult;
import com.beauty.biz.dao.projects.ProjectattachmentDao;
import com.beauty.biz.dao.projects.ProjectattachmentVoDao;
import com.beauty.biz.entity.projects.Projectattachment;
import com.beauty.biz.entity.projects.ProjectattachmentVo;

/**
 * 项目附件
 * 
 * @author wjy
 * 
 */
@Service
@Transactional
public class ProjectattachmentManager {
	@Autowired
	private ProjectattachmentDao projectattachmentDao;
	@Autowired
	private ProjectattachmentVoDao projectattachmentVoDao;
	/*
	 * 单个实体查询
	 */
	public QueryResult<Projectattachment> getQueryResult(int startIndex,
			int maxResult, String whereJPQL, Object[] params,
			LinkedHashMap<String, String> orderby) throws Exception {
		return projectattachmentDao.getScrollDate(startIndex, maxResult,
				whereJPQL, params, orderby);
	}

	/*
	 * 单个实体查询
	 */
	public QueryResult<ProjectattachmentVo> getQueryResult1(int startIndex,
			int maxResult, String whereJPQL, Object[] params,
			LinkedHashMap<String, String> orderby) throws Exception {
		return projectattachmentVoDao.getScrollDate(startIndex, maxResult,
				whereJPQL, params, orderby);
	}
	/**
	 * 由序列名获取序列id
	 * 
	 * @param sequenceName
	 * @return
	 */
	public String getSeq(String sequenceName) {
		return projectattachmentDao.getSequence(sequenceName);
	}

	/**
	 * 根据实体保存
	 * 
	 * @param projectattachment
	 */
	public void saveUpdate(Projectattachment projectattachment) {
		projectattachmentDao.save(projectattachment);
	}
	/**
	 * 根据实体保存
	 * 
	 * @param projectattachment
	 */
	public void saveUpdate(ProjectattachmentVo projectattachment) {
		projectattachmentVoDao.save(projectattachment);
	}
	/**
	 * 批量删除的时候~
	 * 
	 * @param id
	 */
	public void batchDelete(String ids) {
		String[] otherid = ids.split(",");
		for (int i = 0; i < otherid.length; i++) {
			projectattachmentDao.delete(otherid[i]);
		}
	}
}
