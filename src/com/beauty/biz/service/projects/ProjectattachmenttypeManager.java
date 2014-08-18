package com.beauty.biz.service.projects;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.beauty.biz.dao.projects.ProjectattachmenttypeDao;
import com.beauty.biz.entity.projects.Projectattachmenttype;

/**
 * 项目附件类型
 * 
 * @author wjy
 * 
 */
@Service
@Transactional
public class ProjectattachmenttypeManager {

	@Autowired
	private ProjectattachmenttypeDao projectattachmenttypeDao;

	/**
	 * 获取类型的下拉框
	 * 
	 * @return
	 */
	public List<Projectattachmenttype> getAll() {
		List<Projectattachmenttype> attTypeList = projectattachmenttypeDao
				.getAllOrder();
		return attTypeList;
	}

	/**
	 * 根据逐渐id获得实体
	 * 
	 * @param atttypeid
	 * @return
	 */
	public Projectattachmenttype getProTypeById(String atttypeid) {
		return projectattachmenttypeDao.get(atttypeid);
	}

}
