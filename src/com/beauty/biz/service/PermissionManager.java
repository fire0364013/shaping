package com.beauty.biz.service;

import net.sf.json.JSONObject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.beauty.biz.dao.PermissionDao;
import com.beauty.biz.entity.ModuleRight;

@Service
@Transactional
public class PermissionManager {
	@Autowired
	private PermissionDao permissionDao;

	/*
	 * 角色授权
	 */
	public void addOrUpdateRole(JSONObject jsonObj) {
		String roleid = jsonObj.getString("roleid");
		String moduleid = jsonObj.getString("moduleid");
		String moduleStr = moduleid.substring(1, moduleid.length() - 1);// 去掉[和]
		permissionDao.delete(roleid);
		if (moduleStr != null && !"".equals(moduleStr)) {
			String[] s = moduleStr.split(",");
			for (int i = 0; i < s.length; i++) {
				ModuleRight mr = new ModuleRight();
				mr.setId(permissionDao.getSequence("SEQ_MODUEL_RIGHT"));
				mr.setRoleid(roleid);
				mr.setModuleid(s[i].substring(1, s[i].length() - 1));// 去掉""
				permissionDao.save(mr);
			}
		}
	}

}
