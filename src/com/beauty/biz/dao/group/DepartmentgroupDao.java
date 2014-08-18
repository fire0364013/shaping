package com.beauty.biz.dao.group;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.beauty.biz.entity.group.Departmentgroup;
import com.beauty.common.orm.hibernate3.HibernateDao;

@Repository
public class DepartmentgroupDao extends HibernateDao<Departmentgroup> {

	/**
	 * 获取某个部门下的所有组json串
	 */
	@SuppressWarnings("unchecked")
	public List<Departmentgroup> getAllGroupByDepart(String deptid) {
		String hql = "from Departmentgroup r where r.deptid=? order by groupname asc";
		List<Departmentgroup> list = createQuery(hql, deptid).list();
		return list;
	}

	/**
	 * 删除对象
	 * 
	 * @param entity
	 *            实体类
	 */
	public void deleteByEntity(final Object entity) {
		getSession().delete(entity);
	}

}
