package com.beauty.biz.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.beauty.biz.entity.Module;
import com.beauty.common.orm.hibernate3.HibernateDao;

@Repository
public class ModuleDao extends HibernateDao<Module> {
	@SuppressWarnings("unchecked")
	public List<Module> getModuleByUserid(String userid) {
		List<Module> list = createQuery(
				"select distinct module from Userroleinfo userroleinfo,ModuleRight moduleright,Module module"
						+ " where userroleinfo.roleid=moduleright.roleid  and module.moduleid=moduleright.moduleid and userroleinfo.userid=? and module.parentmoduleid='0' order by  module.orderid ",
				userid).list();
		// List<Module> list2 = new ArrayList<Module>();
		// for(int i=0; i<list.size(); i++){
		// Object[] obj = (Object[])list.get(i);
		// Module module = new Module();
		// module.setModuleid(null==obj[0]?null:obj[0].toString());
		// module.setModulename(null==obj[1]?null:obj[1].toString());
		// module.setParentmoduleid(null==obj[2]? null:obj[2].toString());
		// module.setModuletype(null==obj[3]?null:obj[3].toString());
		// module.setUrl(null==obj[4]?null:obj[4].toString());
		// module.setOrderid(null==obj[5]?null:obj[5].toString());
		// list2.add(module);
		// }
		return list;
	}

	@SuppressWarnings("unchecked")
	public List<Module> getSubModuleByUserid(String userid) {
		List<Module> list = createQuery(
				"select distinct module from Userroleinfo userroleinfo,ModuleRight moduleright,Module module"
						+ " where userroleinfo.roleid=moduleright.roleid  and module.moduleid=moduleright.moduleid and userroleinfo.userid=? and module.parentmoduleid !='0' order by  module.orderid ",
				userid).list();
		// List<Module> list2 = new ArrayList<Module>();
		// for(int i=0; i<list.size(); i++){
		// Object[] obj = (Object[])list.get(i);
		// Module module = new Module();
		// module.setModuleid(null==obj[0]?null:obj[0].toString());
		// module.setModulename(null==obj[1]?null:obj[1].toString());
		// module.setParentmoduleid(null==obj[2]? null:obj[2].toString());
		// module.setModuletype(null==obj[3]?null:obj[3].toString());
		// module.setUrl(null==obj[4]?null:obj[4].toString());
		// module.setOrderid(null==obj[5]?null:obj[5].toString());
		// list2.add(module);
		// }
		return list;
	}

	/**
	 * 获得模块的List 根据名字进行升序排列
	 * 
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public List<Module> getModulesList() {
		return super.createQuery("from Module t order by t.moduleid,t.orderid")
				.list();
	}
}
