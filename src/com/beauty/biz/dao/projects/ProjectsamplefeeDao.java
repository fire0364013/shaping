package com.beauty.biz.dao.projects;

import org.springframework.stereotype.Repository;

import com.beauty.common.orm.hibernate3.HibernateDao;
import com.beauty.biz.entity.projects.Projectsamplefee;

@Repository
public class ProjectsamplefeeDao extends HibernateDao<Projectsamplefee> {
	
	
/**
 * 根据企业查询所对应的费用
 * @param s：企业编号
 * @return 任务采样费用
 */
	public Projectsamplefee getSamplefeebyEnt(String s) {
	
		Projectsamplefee projectsamplefee = (Projectsamplefee) createQuery("from Projectsamplefee p where p.ent.entid = ?",s).uniqueResult();
		return projectsamplefee;
	}

}
