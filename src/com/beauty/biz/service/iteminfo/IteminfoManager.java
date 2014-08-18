package com.beauty.biz.service.iteminfo;

import java.util.LinkedHashMap;
import java.util.List;

import org.hibernate.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.beauty.common.page.QueryResult;
import com.beauty.biz.dao.iteminfo.IteminfoDao;
import com.beauty.biz.dao.iteminfo.MonitoritemtypeDao;
import com.beauty.biz.entity.iteminfo.Iteminfo;
import com.beauty.biz.entity.iteminfo.Monitoritemtype;

@Service
@Transactional
@SuppressWarnings("unchecked")
public class IteminfoManager {
	@Autowired
	private IteminfoDao itemInfoDao;
	@Autowired
	private MonitoritemtypeDao monitoritemtypeDao;

	public List<Iteminfo> getItemsByType(String itemtype) {
		List<Iteminfo> list = itemInfoDao
				.createQuery(
						"from Iteminfo o where o.monitoritemtype.itemtypeid = ? order by o.orderid",
						itemtype).list();
		return list;
	}

	public List<Iteminfo> getProjectMonitorItem(String projectcode,
			String itemtypeid) {
		return itemInfoDao
				.createQuery(
						"select o.item from Projectitem o where o.projectcode = ? and o.itemtype.itemtypeid = ? ORDER BY o.item.itemname asc",
						projectcode, itemtypeid).list();
	}

	public Query createQuery(String hql, Object... values) {
		return itemInfoDao.createQuery(hql, values);
	}

	public Iteminfo get(String id) {
		return itemInfoDao.get(id);
	}

	public QueryResult<Iteminfo> getQueryResult(int startIndex, int maxResult,
			String whereJPQL, Object[] params,
			LinkedHashMap<String, String> orderby) throws Exception {
		return itemInfoDao.getScrollData(startIndex, maxResult, whereJPQL,
				params, orderby);
	}

	public void delete(String id) {
		try {
			itemInfoDao.delete(id);// 删除自身表里面的数据
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	/**
	 * 批量删除
	 * 
	 * @param ids
	 */
	public void deleteAll(String ids) {
		String[] itemids = ids.split(",");
		for (int i = 0; i < itemids.length; i++) {
			itemInfoDao.delete(itemids[i]);// 删除自身表里面的数据
		}
	}

	public boolean getItemByName(String itemname, String itemtypeid,String monitorpointtypeid) {
		return itemInfoDao.getItemByName(itemname, itemtypeid,monitorpointtypeid);
	}

	public String getSequence(String sequenceName) {
		return itemInfoDao.getSequence(sequenceName);
	}

	public void save(Iteminfo entity) {
		itemInfoDao.save(entity);
	}

	/**
	 * 获取项目类型 父节点
	 * 
	 * @param
	 */
	public List<Monitoritemtype> getItemTrees(String id) {
		List<Monitoritemtype> itemTreess = itemInfoDao.getItemFir(id);
		return itemTreess;
	}

	/*
	 * 根据HQL查询实体
	 */
	public QueryResult<Iteminfo> getEntityByHQL(int startIndex, int maxResult,
			String searchField, String fromSQL, String whereSQL,
			Object[] params, LinkedHashMap<String, String> orderby)
			throws Exception {
		return itemInfoDao.getEntityByHQL(startIndex, maxResult, searchField,
				fromSQL, whereSQL, params, orderby);
	}

	/**
	 * 根据hql语句查询
	 * 
	 * @param hql
	 * @return
	 */
	public List<Iteminfo> getItemListByHQL(String hql) {
		return itemInfoDao.getItemListByHQL(hql);
	}

	public List<String> batchGetItemid() {
		return itemInfoDao.getItemid();
	}
	/**
	 * 根据项目小类型查出所有的项目信息
	 * 
	 * @return
	 */
	public List<Iteminfo> getItemListByMptid(String monitorpointtypeid){
		return itemInfoDao.getItemListByMptid(monitorpointtypeid);
	}
	/**
	 * 根据项目小类型查出所有的项目信息
	 * 
	 * @return
	 */
	public List<Iteminfo> getItemBySavedoseid(String savedoseid){
		return itemInfoDao.getItemBySavedoseid(savedoseid);
	}
	/**
	 * 根据项目小类型查出所有的项目信息
	 * 
	 * @return
	 */
	public List<Iteminfo> getItemByContainerid(String containerid){
		return itemInfoDao.getItemByContainerid(containerid);
	}
	
	public void setContarByContainerid(String containerid){
		List<Iteminfo> items = itemInfoDao.getItemByContainerid(containerid);
		if(items.size()>0){
			for(Iteminfo item:items){
//				item.setContainer(null);
				itemInfoDao.save(item);
			}
		}
	}
	public void setSavedoseBySavedoseid(String savedoseid){
		List<Iteminfo> items = itemInfoDao.getItemBySavedoseid(savedoseid);
		if(items.size()>0){
			for(Iteminfo item:items){
				itemInfoDao.save(item);
			}
		}
	}
}
