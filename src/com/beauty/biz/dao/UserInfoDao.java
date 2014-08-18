package com.beauty.biz.dao;

import java.util.List;

import org.hibernate.Query;
import org.springframework.stereotype.Repository;

import com.beauty.biz.entity.Userinfo;
import com.beauty.common.orm.hibernate3.HibernateDao;

@Repository
public class UserInfoDao extends HibernateDao<Userinfo> {
	public Query createQuerys(String sql, Object... values) {
		Query query = getSession().createQuery(sql);
		if (values != null) {
			for (int i = 0; i < values.length; i++) {
				query.setParameter(i, values[i]);
			}
		}
		return query;
	}

	/**
	 * 根据登录名与密码查找用户，用于登录
	 * 
	 * @param loginName
	 *            登录名
	 * @param password
	 *            密码
	 * 
	 */
	@SuppressWarnings("unchecked")
	public List<Userinfo> getUserinfo(final String loginname,
			final String password) {
		// return super.createQuery("from Userinfo a where a.userstatus='1'
		// and a.loginname = ? and a.password = ?", loginname,password).list();
		// 未注销用户
		return super
				.createQuery(
						"from Userinfo a where lower(a.loginname) = ? and a.password = ?",
						loginname.toLowerCase(), password).list();
	}

	public Userinfo getUserInfo(String userid) {
		return get(userid);
	}

	@SuppressWarnings("unchecked")
	public List<Userinfo> validateLoginName(String colname, Object valuename) {
		Query query = createQuery(
				"from Userinfo a where a." + colname + " = ?", valuename);
		List<Userinfo> listuser = query.list();
		return listuser;
	}

	/**
	 * 获取正常状态用户
	 * 
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public List<Userinfo> getList() {
		Query query = createQuery("from Userinfo u where u.userstatus = ?", "1");
		List<Userinfo> listuser = query.list();
		return listuser;
	}

	/**
	 * 保存对象
	 * 
	 * @param entity
	 *            保存的实体对象
	 */
	public void saveUserinfo(final Object entity) {
		getSession().saveOrUpdate(entity);
		// 调用flush方法，强制Hibernate立即执行insert sql
		getSession().flush();
		// 通过refresh方法，强制Hibernate执行select for update
		// getSession().refresh(entity, LockMode.UPGRADE);
	}

	/**
	 * 根据名字查询该实体是否存在
	 * 
	 * @param methodname
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public boolean getBooleanByName(final String loginname) {
		String hql = "from Userinfo a where lower(a.loginname) = ? ";
		Query query = createQuery(hql, loginname.toLowerCase());
		List<Userinfo> list = query.list();
		if (list.size() == 0) {
			return false;
		} else {
			return true;
		}

	}
}
