package com.beauty.biz.service.projects;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.beauty.biz.dao.projects.ProjectsamplefeeDao;
import com.beauty.biz.entity.projects.Projectsamplefee;

@Service
@Transactional
public class ProjectsamplefeeManager {

	@Autowired
	private ProjectsamplefeeDao projectsamplefeeDao;
	
	public Projectsamplefee get(String projectsamplefeeid) {
		return projectsamplefeeDao.get(projectsamplefeeid);
	}

	public void save(Projectsamplefee entity) {
		projectsamplefeeDao.save(entity);
	}

}
