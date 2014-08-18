package com.beauty.biz.dao;

import java.util.List;

import org.hibernate.Query;
import org.springframework.stereotype.Repository;

import com.beauty.biz.entity.Employeeinfo;
import com.beauty.common.orm.hibernate3.HibernateDao;

/**
 * EmployeeinfoDao
 * 
 * @author wjy
 * 
 */
@Repository
public class EmployeeinfoDao extends HibernateDao<Employeeinfo> {

	public void deleteuser(String id) {
		String hqlDelete = "delete Employeeinfo m where m.userid=:userid";
		createQuery(hqlDelete).setString("userid", id).executeUpdate();
	}

	public List<Object[]> getAllById() {
		String hql = "select u.realname,u.sex,e.birthday,e.technicalship,e.stationno,e.post,e.status from  Userinfo u left join u.employeeinfo e  order by u.userid";
		// Userinfo u left join u.employeeinfo e
		// String hqlDelete="from Employeeinfo c order by c.userid.userid";
		Query query = createQuery(hql);
		return query.list();
	}

}
