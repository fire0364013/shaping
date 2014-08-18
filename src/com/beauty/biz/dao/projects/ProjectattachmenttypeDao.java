package com.beauty.biz.dao.projects;

import java.util.List;

import org.hibernate.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.beauty.common.orm.hibernate3.HibernateDao;
import com.beauty.biz.entity.projects.Projectattachmenttype;

/**
 * 项目附件类型
 * 
 * @author wjy
 * 
 */
@Repository
@Transactional(rollbackFor = { Exception.class })
public class ProjectattachmenttypeDao extends
		HibernateDao<Projectattachmenttype> {

	/**
	 * 获得项目附件类型的下拉框，根据逐渐进行排序
	 * 
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public List<Projectattachmenttype> getAllOrder() {
		Query query = createQuery("from Projectattachmenttype a  order by a.attachmenttypeid ");
		List<Projectattachmenttype> listtype = query.list();
		return listtype;
	}

}
