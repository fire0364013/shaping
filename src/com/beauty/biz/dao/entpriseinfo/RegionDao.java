package com.beauty.biz.dao.entpriseinfo;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.beauty.common.orm.hibernate3.HibernateDao;
import com.beauty.biz.entity.entpriseinfo.Region;

/**
 * Region的Dao
 * 
 * @author wjy
 * 
 */
@Repository
public class RegionDao extends HibernateDao<Region> {

	// 与数据库判断是否存在该数据
	public boolean saveInput(String id) {
		if (id != null) {
			Object obj = getSession().get(Region.class, id);
			if (obj == null) {
				return false;
			} else {
				return true;
			}
		} else {
			return true;
		}

	}

	/**
	 * 批量设置isused为否的操作时所使用到的语句~~
	 * 
	 * @param id
	 *            主键 regioncode传参
	 */
	public void updata(String id) {

		String hqlUpdata = "update Region r set isused='0' where r.regioncode = :regioncode";

		createQuery(hqlUpdata).setString("regioncode", id).executeUpdate();
	}

	/**
	 * 获取所有可用的省份信息
	 */
	@SuppressWarnings("unchecked")
	public List<Region> getAllProvince() {
		String hql = "from Region r where r.isused=? and r.parentregioncode=? order by r.regioncode ";
		List<Region> provinceList = createQuery(hql,
				(Object[]) new String[] { "1", "0" }).list();
		return provinceList;
	}

	/**
	 * 获取某个省份下的所有可用的城市信息或某个城市下的所有可用的行政区
	 */
	@SuppressWarnings("unchecked")
	public List<Region> getAllCityOrRegion(String parentregioncode) {
		String hql = "from Region r where r.isused=? and r.parentregioncode=? order by r.regioncode asc";
		List<Region> list = createQuery(hql,
				(Object[]) new String[] { "1", parentregioncode }).list();
		return list;
	}

	/**
	 * 获取某个省份下的所有可用的城市信息或某个城市下的所有可用的行政区
	 */
	@SuppressWarnings("unchecked")
	public List<Region> getAllRegion(String parentregioncode) {
		String hql = "from Region r where r.isused=? and r.parentregioncode like '"
				+ parentregioncode + "%' order by r.regioncode asc";
		List<Region> list = createQuery(hql, (Object[]) new String[] { "1" })
				.list();
		return list;
	}

}
