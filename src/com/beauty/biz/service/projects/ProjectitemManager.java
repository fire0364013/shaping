package com.beauty.biz.service.projects;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.beauty.biz.dao.projects.ProjectitemDao;
import com.beauty.biz.dao.projects.ProjectsamplefeeDao;
import com.beauty.biz.entity.projects.Projectitem;
import com.beauty.biz.entity.projects.Projectsamplefee;

@Service
@Transactional
public class ProjectitemManager {

	@Autowired
	private ProjectitemDao projectitemDao;
	
	public Projectitem get(String projectitemid) {
		return projectitemDao.get(projectitemid);
	}

	public void save(Projectitem entity) {
		projectitemDao.save(entity);
	}

}
