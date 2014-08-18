package com.beauty.biz.dao;

import java.util.List;

import org.hibernate.Query;
import org.springframework.stereotype.Repository;

import com.beauty.biz.entity.Savedose;
import com.beauty.common.orm.hibernate3.HibernateDao;

@Repository
public class SavedoseDao extends HibernateDao<Savedose> {

	/**
	 * 根据名字查询实体
	 * 
	 * @param name
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public boolean getEntityByName(String name) {
		if (name != null) {
			String hql = "from Savedose a where a.savedosename=?";
			Query query = createQuery(hql, name);
			List<Savedose> listItemnmae = query.list();
			if (listItemnmae.size() == 0) {
				return false;
			} else {
				return true;
			}
		} else {
			return true;
		}

	}

}
