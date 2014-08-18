package com.beauty.biz.service.projects;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.beauty.biz.dao.iteminfo.IteminfoDao;
import com.beauty.biz.dao.projects.ProjectsampleitemDao;
import com.beauty.biz.entity.iteminfo.Iteminfo;
import com.beauty.biz.entity.projects.Projectsampleitem;

@Service
@Transactional
public class ProjectsampleitemManager {
	@Autowired
	private ProjectsampleitemDao psiDao;
	@Autowired
	private IteminfoDao itemDao;


	public void updateSampleItem(Projectsampleitem sampleitem){
		try {
			psiDao.save(sampleitem);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public void removeSampleItem(String samplingitems) {
		try {
			String[] arr = samplingitems.split(",");
			for (String s : arr) {
				psiDao.delete(s);
			}

		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public Query createQuery(String hql, Object... values) {
		return psiDao.createQuery(hql, values);
	}

	public Projectsampleitem get(String id) {
		return psiDao.get(id);
	}

	public void save(Projectsampleitem entity) {
		psiDao.save(entity);
	}
}
