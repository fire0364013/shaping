package com.beauty.biz.dao.projects;

import java.util.List;

import org.hibernate.Query;
import org.springframework.stereotype.Repository;

import com.beauty.common.orm.hibernate3.HibernateDao;
import com.beauty.common.page.QueryResult;
import com.beauty.biz.entity.projects.Projectdetail;

@Repository
public class ProjectDetailDao extends HibernateDao<Projectdetail> {

	@SuppressWarnings("unchecked")
	public List<Projectdetail> getProjectdetailListByHql(String hql,
			Object... values) {
		Query query = createQuery(hql, values);
		return query.list();
	}

	@SuppressWarnings("unchecked")
	public List<Projectdetail> getProjectdetailList(String hql, Object[] values) {
		Query query = createQuery(hql, values);
		return query.list();
	}
/*
 * 根据projectcode查出每个企业对应的项目分析费
 */
	public QueryResult<Object[]> getAnalysefeeByHQL(String projectcode) {
		QueryResult<Object[]> qr = new QueryResult<Object[]>();
		String hql ="select detail,point from  Projectdetail as detail left outer join detail.projectmonitorpoints as point where 1=1 and detail.projectcode = ?";
		Query query = createQuery(hql, projectcode);
		qr.setResultlist(query.list());
		return qr;
	}
	/*
	 * 根据projectcode查出每个企业对应的项目分析费
	 */
		public QueryResult<Object[]> getSampleFeeByHQL(String projectcode) {
			QueryResult<Object[]> qr = new QueryResult<Object[]>();
			String hql ="select detail,samplefee from  Projectdetail as detail left outer join detail.projectsamplefees as samplefee where 1=1 and detail.projectcode = ?";
			Query query = createQuery(hql, projectcode);
			qr.setResultlist(query.list());
			return qr;
		}
}
