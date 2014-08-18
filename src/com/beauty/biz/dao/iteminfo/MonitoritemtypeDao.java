package com.beauty.biz.dao.iteminfo;

import java.util.List;

import org.hibernate.Query;
import org.springframework.stereotype.Repository;

import com.beauty.common.orm.hibernate3.HibernateDao;
import com.beauty.biz.entity.dictionary.Dictionaryindex;
import com.beauty.biz.entity.iteminfo.Monitoritemtype;

@Repository
public class MonitoritemtypeDao extends HibernateDao<Monitoritemtype> {
	/**
	 * 重命名
	 * 
	 * @param type
	 *            类型实体
	 * @return flag
	 */
	public int rename(Monitoritemtype type) {
		int flag = 0;
		try {
			String sql = "update Monitoritemtype m set m.itemtypename=? where m.itemtypeid=?";
			Query query = createQuery(sql, type.getItemtypename(), type
					.getItemtypeid());
			flag = query.executeUpdate();
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
		}
		return flag;

	}

	/**
	 * 删除类型下的项目
	 * 
	 * @param id类型ID
	 * @param p父节点ID
	 * @return flag
	 */

	public int remove(String id, String s, String p) {
		try {
			Query query = null;
			if ("type".equals(s)) {
				query = createQuery(
						"delete Itemgroup i where i.itemtypeid = ?", id);
			} else {
				query = createQuery(
						"delete Itemgroup i where i.itemid = ? and i.itemtypeid = ?",
						id, p);
			}
			query.executeUpdate();
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			return 0;
		}
		return 1;
	}

	/**
	 * SQL语句
	 * 
	 * @param sql查询语句
	 * @param values参数值
	 * @return
	 */
	public int deleteChildrenType(String sql, Object... values) {
		int number = 0;
		try {
			Query query = createQuery(sql, values);
			number = query.executeUpdate();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return number;
	}

	/**
	 * 根据条件查询
	 */
	@SuppressWarnings("unchecked")
	public List<Monitoritemtype> findByParentId(String colname, String valuename) {
		Query query = createQuery("from Monitoritemtype d where d." + colname
				+ " = ?", valuename);
		List<Monitoritemtype> listdevice = query.list();
		return listdevice;
	}

	public List<Monitoritemtype> getItemtypeOrderBy() {
		Query query = createQuery("from Monitoritemtype di  order by di.itemtypeid ");
		List<Monitoritemtype> itemtypeList = query.list();
		return itemtypeList;
	}

	

}
