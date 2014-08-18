package com.beauty.biz.service;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.hibernate.Query;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.beauty.biz.dao.ModuleDao;
import com.beauty.biz.dao.PermissionDao;
import com.beauty.biz.entity.Module;
import com.beauty.biz.entity.ModuleRight;
import com.beauty.common.page.QueryResult;

@Service
@Transactional
public class ModuleManager {
	@Autowired
	private ModuleDao moduleDao;
	@Autowired
	private PermissionDao permissionDao;

	/**
	 * 根据条件查询
	 * 
	 * @param request
	 *            HTTP请求
	 */
	public List<Module> queryResult(HttpServletRequest request) {
		List<Criterion> criterions = new ArrayList<Criterion>();
		String modulename = request.getParameter("modulename");
		String moduletype = request.getParameter("moduletype");
		if (null != modulename && !modulename.equals("")) {
			criterions.add(Restrictions.like("modulename", modulename,
					MatchMode.ANYWHERE));
		}
		if (null != moduletype && !moduletype.equals("")) {
			criterions.add(Restrictions.like("moduletype", moduletype,
					MatchMode.ANYWHERE));
		}
		return moduleDao.query(criterions.toArray(new Criterion[criterions
				.size()]));
	}

	/**
	 * 模块分页 单个实体查询
	 */
	public QueryResult<Module> getQueryResult(int startIndex, int maxResult,
			String whereJPQL, Object[] params,
			LinkedHashMap<String, String> orderby) throws Exception {
		return moduleDao.getScrollData(startIndex, maxResult, whereJPQL,
				params, orderby);
	}

	/**
	 * 根据MODULEID查询
	 */
	public Module getModule(Serializable moduleid) {
		return moduleDao.get(moduleid);
	}

	/**
	 *获取所有模块
	 */
	public List<Module> getModules() {
		// return moduleDao.getAll();
		return moduleDao.getModulesList();
	}

	/**
	 * 增加或修改模块
	 * 
	 * @param moduleinfo
	 *            模块实体对象
	 */
	public void addOrUpdateModule(Object moduleinfo) {
		moduleDao.save(moduleinfo);
	}

	/**
	 * 删除
	 * 
	 * @param id
	 *            模块ID
	 */
	public void delete(Serializable id) {
		moduleDao.delete(id);
	}

	/**
	 * 根据条件查询模块 HQL
	 * 
	 * @param s
	 *            父模块ID
	 */
	public List<Module> createHQLQuery(String s) {
		String hqlStr = "from Module as d where d.parentmoduleid = ?";
		String[] params = { s };
		Query q = moduleDao.createQuery(hqlStr, params);
		List<Module> list = q.list();
		return list;
	}

	// /*
	// * 模块树 子节点
	// */
	// public List getChildrenNodes(String moduleid){
	// List<Module> childrens = createHQLQuery(moduleid);
	// List<Map<String,Object>> rows = new ArrayList<Map<String,Object>>();
	//		
	// Map<String, Object> map = new HashMap<String, Object>();
	// if(childrens==null||childrens.size()==0){
	// map.put("id", module.getModuleid());
	// map.put("text", module.getModulename());
	// rows.add(map);
	// }else{
	// map.put("id", module.getModuleid());
	// map.put("text", module.getModulename());
	// rows.add(map);
	// }
	// for(Module childrens)
	// List<Map<String,Object>> childrens = new ArrayList<Map<String,Object>>();
	// return childrens;
	//		
	// }

	/**
	 *获取所有模块
	 */
	public List<Module> getModulesForMenu() {
		List<Module> list2 = moduleDao.getAll();
		List<Module> list3 = new ArrayList<Module>();
		for (Module module : list2) {
			if ("0".equals(module.getParentmoduleid())) {
				// System.out.println("父节点："+module.getModuleid()+"___"+module.getModulename());
				getSubModule(list2, module);
			}
		}
		for (Module module : list2) {
			if ("0".equals(module.getParentmoduleid())) {
				list3.add(module);
			}
		}

		list2.removeAll(list2);
		return list3;
	}

	/**
	 *获取所有模块,通过当前用户id,非hql查询
	 */
	public List<Module> getModulesForMenu(String userid) {
		List<Module> list1 = moduleDao.getModuleByUserid(userid);
		List<Module> list2 = moduleDao.getSubModuleByUserid(userid);
		// List<Module> list3 = new ArrayList<Module>();

		/*
		 * for(Module module : list2){
		 * if("0".equals(module.getParentmoduleid())){
		 * //System.out.println("父节点："
		 * +module.getModuleid()+"___"+module.getModulename());
		 * getSubModule(list2, module); } }
		 */
		/*
		 * for(Module module : list2){
		 * if("0".equals(module.getParentmoduleid())){ list3.add(module); } }
		 */
		// 将子模块加载到父模块中
		for (Module module : list1) {
			getSubModule(list2, module);
		}

		list2.clear();// .removeAll(list2);
		return list1;
	}

	// 将子模块添加父模块中
	private void getSubModule(List<Module> list, Module module) {
		if (null != list) {
			for (Module module2 : list) {
				if (module2.getParentmoduleid().equals(module.getModuleid())) {
					module.getSubNodeList().add(module2);
					// System.out.println("子节点："+module2.getModuleid()+"___"+module2.getModulename());
				}
			}
		}
	}

	/*
	 * 获取授权模块
	 */
	public List<ModuleRight> getModuleRight(HttpServletRequest request) {
		String roleid = request.getParameter("id");
		// Role role = roleDao.get(Integer.parseInt(roleid));
		List<Criterion> criterions = new ArrayList<Criterion>();
		criterions.add(Restrictions.like("roleid", roleid));

		List<ModuleRight> list = permissionDao.query(criterions
				.toArray(new Criterion[criterions.size()]));
		;
		return list;
	}
}
