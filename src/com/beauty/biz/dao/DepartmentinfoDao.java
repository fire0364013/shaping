package com.beauty.biz.dao;

import java.util.List;
import org.hibernate.Query;
import org.springframework.stereotype.Repository;

import com.beauty.biz.entity.Departmentinfo;
import com.beauty.common.orm.hibernate3.HibernateDao;

@Repository
public class DepartmentinfoDao extends HibernateDao<Departmentinfo> {

	/**
	 * 倒序查询所有部门
	 */

	@SuppressWarnings("unchecked")
	public List<Departmentinfo> getAllOrderBy() {
		Query query = createQuery("from Departmentinfo a  order by a.orderid ");
		List<Departmentinfo> listuser = query.list();
		return listuser;
	}

	@SuppressWarnings("unchecked")
	public List<Departmentinfo> getAllOther(String did) {
		List<Departmentinfo> listuser = null;
		if (did == null || did.equals("")) {
			Query query = createQuery("from Departmentinfo a  order by a.orderid ");
			listuser = query.list();
		} else {
			Query query = createQuery(
					"from Departmentinfo a where a.deptid=? order by a.orderid ",
					did);
			listuser = query.list();
		}

		return listuser;
	}

	@SuppressWarnings("unchecked")
	public List<Departmentinfo> getAllByAttr(Integer parentdeptid)
			throws Exception {
		Query query = createQuery(
				"from Departmentinfo d where d.parentdeptid = ?", parentdeptid);
		List<Departmentinfo> departuser = query.list();
		return departuser;
	}

	@SuppressWarnings("unchecked")
	public List<Departmentinfo> getAllByIn(String ids) throws Exception {
		Query query = createQuery("from Departmentinfo d where d.deptid in ("
				+ ids + ")   order by d.orderid ");
		List<Departmentinfo> departuser = query.list();
		return departuser;
	}
}
