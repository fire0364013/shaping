package com.beauty.biz.dao.iteminfo;

import java.util.List;

import org.hibernate.Query;
import org.springframework.stereotype.Repository;

import com.beauty.common.orm.hibernate3.HibernateDao;
import com.raq.dm.Session;
import com.beauty.biz.entity.iteminfo.Iteminfo;
import com.beauty.biz.entity.iteminfo.Monitoritemtype;

@Repository
public class IteminfoDao extends HibernateDao<Iteminfo> {
	@SuppressWarnings("unchecked")
	public boolean getItemByName(String itemname, String itemtypeid,String monitorpointtypeid) {
		if (itemname != null) {
			String hql = "from Iteminfo r where r.itemname=? and r.monitoritemtype.itemtypeid=? ";
			Query query = createQuery(hql, itemname, itemtypeid);
			List<Iteminfo> listItemnmae = query.list();
			if (listItemnmae.size() == 0) {
				return false;
			} else {
				return true;
			}
		} else {
			return true;
		}
	}

	/**
	 * 查询类型
	 * 
	 * @param id
	 *            类型ID
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public List<Monitoritemtype> getItemFir(String id) {
		Query query = createQuery(
				"from Monitoritemtype m where m.parentitemtypeid=? order by m.itemtypeid asc)",
				id);
		List<Monitoritemtype> listuser = query.list();
		return listuser;
	}

	/**
	 * 没有参数的hql查询
	 * 
	 * @param hql
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public List<Iteminfo> getItemListByHQL(String hql) {
		Query query = createQuery(hql);
		return query.list();
	}

	/**
	 * 查询所有的iteminfo的id值
	 * 
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public List<String> getItemid() {
		Query query = createQuery("select g.itemid from Iteminfo g");
		List<String> listitemid = query.list();
		return listitemid;
	}
	/**
	 * 根据项目小类型查出所有的项目信息
	 * 
	 * @return
	 */
	public List<Iteminfo> getItemListByMptid(String monitorpointtypeid){
		Query query = createQuery("from Iteminfo o ");
		return query.list();
	}
	
	/**
	 * 根据项目小类型查出所有的项目信息
	 * 
	 * @return
	 */
	public List<Iteminfo> getItemBySavedoseid(String savedoseid){
		Query query = createQuery("from Iteminfo o where o.samplesavedose = ?",savedoseid);
		return query.list();
	}
	/**
	 * 根据项目小类型查出所有的项目信息
	 * 
	 * @return
	 */
	public List<Iteminfo> getItemByContainerid(String containerid){
		Query query = createQuery("from Iteminfo o where o.container.containerid = ?",containerid);
		return query.list();
	}
}
