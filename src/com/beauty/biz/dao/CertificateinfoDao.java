package com.beauty.biz.dao;

import java.util.List;

import org.hibernate.Query;
import org.springframework.stereotype.Repository;

import com.beauty.biz.entity.Certificateinfo;
import com.beauty.common.orm.hibernate3.HibernateDao;

/**
 * CertificateinfoDao
 * 
 * @author wjy
 * 
 */
@Repository
public class CertificateinfoDao extends HibernateDao<Certificateinfo> {
	public Certificateinfo getCertificateinfo(String hql) {
		Query query = createQuery(hql);
		return (Certificateinfo) query.uniqueResult();
	}

	public List<Certificateinfo> getCertificateinfoList(String hql) {
		Query query = createQuery(hql);
		return (List<Certificateinfo>) query.list();
	}

	/**
	 * 根据用户id删除数据
	 * 
	 * @param id
	 */
	public void deletecert(String id) {
		String hqlDelete = "delete Certificateinfo c where c.userinfo.userid=:userid";
		createQuery(hqlDelete).setString("userid", id).executeUpdate();
	}

	/**
	 * 此处是导出excel的时候用的， 按照userid 进行排序
	 * 
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public List<Certificateinfo> getAllList() {
		String hqlDelete = "from Certificateinfo c order by c.userinfo.departmentinfo.orderid , c.userinfo.realname ,c.iteminfo.monitoritemtype.itemtypename ,c.iteminfo.reportitemname asc";
		Query query = createQuery(hqlDelete);
		return query.list();
	}

	@SuppressWarnings("unchecked")
	public List<Certificateinfo> getCertByUserid(String userid) {
		String hqlDelete = "from Certificateinfo c where  c.userinfo.userid=:userid";
		Query query = createQuery(hqlDelete).setString("userid", userid);
		return query.list();
	}

	/**
	 * 删除项目的时候，根据项目id删除数据
	 * 
	 * @param id
	 */
	public void deletecertByItem(String id) {
		String hqlDelete = "delete Certificateinfo c where c.iteminfo.itemid=:itemid";
		createQuery(hqlDelete).setString("itemid", id).executeUpdate();
	}

	/**
	 * 删除方法的时候，根据方法id删除数据
	 * 
	 * @param id
	 */
	public void deletecertByMethod(String id) {
		String hqlDelete = "delete Certificateinfo c where c.method.methodid=:method";
		createQuery(hqlDelete).setString("method", id).executeUpdate();
	}

	/**
	 * 根据项目id获取实体
	 * 
	 * @param itemid
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public List<Certificateinfo> getListByItem(String itemid) {
		Query query = createQuery(
				"from Certificateinfo c where c.iteminfo.itemid=? ", itemid);
		return query.list();
	}

	/**
	 * 人员上岗证
	 * 
	 * @param hql
	 * @param objects
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public List<Certificateinfo> getListByHQL(String hql, Object... objects) {
		Query query = createQuery(hql, objects);
		return query.list();
	}

	/**
	 * 根据名字查询该实体是否存在
	 * 
	 * @param methodname
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public boolean getBooleanByName(String userid, String itemid,
			String methodid) {
		String hql = "from Certificateinfo a where a.userinfo.userid=? and  a.iteminfo.itemid=? and a.method.methodid=? ";
		Query query = createQuery(hql, userid, itemid, methodid);
		List<Certificateinfo> list = query.list();
		if (list.size() == 0) {
			return false;
		} else {
			return true;
		}
	}

	/**
	 * 根据名字查询该上岗证编号是否存在
	 * 
	 * @param methodname
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public boolean getBooleanByStationno(String userids, String stationno) {
		// 先查询上岗证 名字和上岗证编号是否存在，如果本身就已经存在，就不做操作，直接保存。
		String hql = "from Certificateinfo a where  a.userinfo.userid=? and  a.stationno=? ";
		Query query = createQuery(hql, userids, stationno);
		List<Certificateinfo> list = query.list();
		if (list.size() == 0) { // 如果不存在，就查询上岗证编号，如果存在，就保存。
			String HQL = "from Certificateinfo a where  a.stationno=? ";
			Query queryHQL = createQuery(HQL, stationno);
			List<Certificateinfo> listHQL = queryHQL.list();
			if (listHQL.size() == 0) {
				return false;
			} else {
				return true;
			}
		} else {
			return false;
		}
	}

	/**
	 * 根据条件获取人员上岗证条数
	 * 
	 * @param hql
	 * @param values
	 * @return
	 */
	public int getCertificateinfoCount(String hql, Object... values) {
		return createQuery(hql, values).list().size();
	}

}
