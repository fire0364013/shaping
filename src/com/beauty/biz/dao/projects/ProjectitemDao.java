package com.beauty.biz.dao.projects;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.Query;
import org.springframework.stereotype.Repository;

import com.beauty.common.orm.hibernate3.HibernateDao;
import com.beauty.biz.entity.projects.Projectitem;
import com.beauty.biz.entity.projects.Projects;

@Repository
public class ProjectitemDao extends HibernateDao<Projectitem> {

	/**
	 * 根据projecrcode获取实体
	 * 
	 * @param projecrcode
	 * @return
	 */
	public List<Projectitem> getListByProjectcode(String projectcode) {
		Query query = createQuery("from Projectitem p where p.projectcode = ? ",
				projectcode);
		return  query.list();
	}
}
