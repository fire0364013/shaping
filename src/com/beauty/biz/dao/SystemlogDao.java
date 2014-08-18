package com.beauty.biz.dao;

import java.sql.Timestamp;
import java.util.List;

import org.springframework.stereotype.Repository;

import com.beauty.biz.entity.Module;
import com.beauty.biz.entity.Systemlog;
import com.beauty.biz.entity.Userinfo;
import com.beauty.common.orm.hibernate3.HibernateDao;

/**
 * 系统日志Dao
 * 
 * @author lh
 * 
 */
@Repository
public class SystemlogDao extends HibernateDao<Systemlog> {
	// 保存日志
	public void addSystemLog(Module moduleEntity, String userid,
			String operatecontent) {
		if (moduleEntity != null && !("").equals(userid)) {
			Systemlog systemlog = new Systemlog();
			long nowTime = System.nanoTime();
			// SimpleDateFormat sdf = new
			// SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			// String ly_time = sdf.format(new java.util.Date());
			systemlog.setLogid(nowTime + "");// 日志id
			systemlog.setModuleid(moduleEntity);// 模块id
			Timestamp ts = new Timestamp(System.currentTimeMillis());
			systemlog.setOperatetime(ts);// 操作时间
			String hql = "from Userinfo where userid=?";
			List<Userinfo> userlist = createQuery(hql, userid).list();
			if (userlist.size() > 0) {
				systemlog.setOperationuser(userlist.get(0));// 操作人
			}
			systemlog.setOperatecontent(operatecontent);// 操作说明
			save(systemlog);
		}
	}

	// 系统登录和注销
	public void addSystemLog(String userid, String operatecontent) {
		if (!("").equals(userid)) {
			Systemlog systemlog = new Systemlog();
			long nowTime = System.nanoTime();
			systemlog.setLogid(nowTime + "");// 日志id
			systemlog.setModuleid(null);// 模块id
			Timestamp ts = new Timestamp(System.currentTimeMillis());
			systemlog.setOperatetime(ts);// 操作时间
			String hql = "from Userinfo where userid=?";
			List<Userinfo> userlist = createQuery(hql, userid).list();
			if (userlist.size() > 0) {
				systemlog.setOperationuser(userlist.get(0));// 操作人
			}
			systemlog.setOperatecontent(operatecontent);// 操作说明
			save(systemlog);
		}
	}
}
