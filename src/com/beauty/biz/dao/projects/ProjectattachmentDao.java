package com.beauty.biz.dao.projects;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.beauty.common.orm.hibernate3.HibernateDao;
import com.beauty.biz.entity.projects.Projectattachment;

/**
 * 项目附件
 * 
 * @author wjy
 * 
 */
@Repository
public class ProjectattachmentDao extends HibernateDao<Projectattachment> {

}
