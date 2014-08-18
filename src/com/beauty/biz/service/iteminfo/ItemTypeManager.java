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
import com.beauty.biz.entity.iteminfo.Itemgroup;
import com.beauty.biz.entity.iteminfo.Iteminfo;
import com.beauty.biz.entity.iteminfo.Monitoritemtype;

@Service
@Transactional
public class ItemTypeManager {
	@Autowired
	private MonitoritemtypeDao monitoritemtypeDao;
	@Autowired
	private IteminfoDao iteminfoDao;

	/**
	 * 获取项目类型
	 * 
	 * @param
	 */
	public List<Monitoritemtype> getItemTypeByParent(String parentType) {
		List<Monitoritemtype> list = monitoritemtypeDao.createQuery(
				"from Monitoritemtype o where o.parentitemtypeid = ?",
				parentType).list();
		return list;
	}

	public List<Monitoritemtype> getProjectMonitorType(String projectcode,
			String itemtypeid, String sampletype) {
		List<Monitoritemtype> piList = monitoritemtypeDao
				.createQuery(
						"select distinct o.itemtype from Projectitem o where o.projectcode = ? "
								+ "and o.itemtype.parentitemtypeid = ? and o.itemtype.sampletypesign = ?",
						projectcode, itemtypeid, sampletype).list();
		return piList;
	}
	
	public List<Monitoritemtype> getProjectMonitorType(String projectcode,
			String itemtypeid) {
		List<Monitoritemtype> piList = monitoritemtypeDao
				.createQuery(
						"select distinct o.itemtype from Projectitem o where o.projectcode = ? "
								+ "and o.itemtype.parentitemtypeid = ? ",
						projectcode, itemtypeid).list();
		return piList;
	}

	public Monitoritemtype get(String id) {
		return monitoritemtypeDao.get(id);
	}

	/**
	 * 用HQL语句查询
	 * 
	 * @param hql
	 *            查询语句
	 * @param values
	 *            参数值
	 * @return
	 */
	public Query createQuery(String hql, Object... values) {
		return iteminfoDao.createQuery(hql, values);
	}

	/**
	 * 获取序列值主键
	 * 
	 * @param sequenceName
	 *            序列名称"SEQ_MONITORITEMTYPE"
	 * @return
	 */
	public String getSequence(String sequenceName) {
		return monitoritemtypeDao.getSequence(sequenceName);
	}

	/**
	 * 重命名方法
	 * 
	 * @param type项目类型实体
	 */
	public int rename(Monitoritemtype type) {
		return monitoritemtypeDao.rename(type);
	}

	/**
	 * 添加类型方法
	 */
	public void addType(Monitoritemtype type) {
		monitoritemtypeDao.save(type);
	}

	/**
	 * 添加类型项目方法
	 * 
	 * @param typeItem
	 */
	public void addTypeItem(Itemgroup typeItem) {
		monitoritemtypeDao.save(typeItem);
	}

	/**
	 * 删除类型方法
	 */

	public void delete(String id, String s, String parentId) {
		if ("type".equals(s)) {
			deleteType(id, s);// 删除类型
		} else {
			monitoritemtypeDao.remove(id, s, parentId);// 删除类型下的项目
		}
	}

	/**
	 * 删除类型，包括子类型
	 * 
	 * @param id
	 */
	public void deleteType(String id, String s) {
		monitoritemtypeDao.delete(id);
		monitoritemtypeDao.remove(id, s, "");
		Query query = monitoritemtypeDao.createNativeQuery(
				"from Monitoritemtype o where o.parentitemtypeid = ?", id);
		List<Monitoritemtype> list = query.list();
		for (Monitoritemtype monitoritem : list) {
			deleteType(monitoritem.getItemtypeid(), s);
		}
	}

	/**
	 * 分页查询 项目信息
	 */
	public QueryResult<Iteminfo> getQueryResult(int startIndex, int maxResult,
			String whereJPQL, Object[] params,
			LinkedHashMap<String, String> orderby) throws Exception {
		return iteminfoDao.getScrollDate(startIndex, maxResult, whereJPQL,
				params, orderby);
	}

	/**
	 * 根据一个条件查询
	 * 
	 * @param colname
	 * @param valuename
	 * @return
	 */
	public List<Monitoritemtype> findAll(String colname, String valuename) {
		return monitoritemtypeDao.findByParentId(colname, valuename);

	}

	/**
	 * 保存
	 * 
	 * @param entity
	 */
	public void save(Iteminfo entity) {
		monitoritemtypeDao.save(entity);
	}

	/**
	 * 根据id查询
	 */
	public Monitoritemtype findById(String id) {
		return monitoritemtypeDao.get(id);
	}

	public QueryResult<Object[]> getScrollDateByHQL(int startIndex,
			int maxResult, String searchField, String fromSQL, String whereSQL,
			Object[] params, LinkedHashMap<String, String> orderby)
			throws Exception {
		return iteminfoDao.getScrollDateByHQL(startIndex, maxResult,
				searchField, fromSQL, whereSQL, params, orderby);
	}

}
