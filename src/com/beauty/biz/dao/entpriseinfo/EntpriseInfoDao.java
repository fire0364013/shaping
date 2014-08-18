package com.beauty.biz.dao.entpriseinfo;

import java.util.List;

import org.hibernate.Query;
import org.springframework.stereotype.Repository;

import com.beauty.biz.entity.entpriseinfo.EntpriseInfo;
import com.beauty.common.orm.hibernate3.HibernateDao;

@Repository
public class EntpriseInfoDao extends HibernateDao<EntpriseInfo> {
	/**
	 * 获得序列值
	 * 
	 * @param sequenceName
	 *            :序列名称 :"SEQ_ENTERPRISE"
	 * 
	 */
	public String getSequence(String sequenceName) {
		return super.getSequence(sequenceName);
	}

	/**
	 * 根据条件进行删除
	 * 
	 * @param id
	 *            企业信息实体ID
	 */
	public void delete(String id) {

		String hqlDelete = "delete EntpriseInfo c where c.entid = :entid";
		// or String hqlDelete = "delete Customer where name = :oldName";
		createQuery(hqlDelete).setString("entid", id).executeUpdate();
	}

	/**
	 * 查询满足条件的企业信息实体
	 * 
	 * @param where
	 *            : 条件
	 * @param params
	 *            : 与条件对应的值数组
	 */
	@SuppressWarnings("unchecked")
	public List<EntpriseInfo> getAllEntpriseInfo(String where, Object[] params) {
		String hql = " from EntpriseInfo o ";
		if (null != where && !"".equals(where)) {
			hql += " where " + where;
		}
		hql += " order by o.entname asc";
		Query query = getSession().createQuery(hql);
		if (null != params && params.length > 0) {
			setParameter(query, params);
		}
		return query.list();
	}

	/**
	 * 设置参数值
	 * 
	 * @param params
	 *            参数值数组
	 */
	private static void setParameter(Query query, Object[] params) {
		if (params != null) {
			for (int i = 0; i < params.length; i++) {
				query.setParameter(i, params[i]);
			}
		}
	}
}
