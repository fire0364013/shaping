package com.beauty.biz.dao.iteminfo;

import java.util.List;

import org.hibernate.Query;
import org.springframework.stereotype.Repository;

import com.beauty.common.orm.hibernate3.HibernateDao;
import com.beauty.biz.entity.iteminfo.Container;

@Repository
public class ContainerDao extends HibernateDao<Container> {
	/**
	 * 根据名字查询实体
	 * 
	 * @param name
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public boolean getEntityByName(String name) {
		if (name != null) {
			String hql = "from Container a where a.containername=?";
			Query query = createQuery(hql, name);
			List<Container> listItemnmae = query.list();
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
