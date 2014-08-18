package com.beauty.biz.web.permission;

import java.io.IOException;
import java.util.List;

import net.sf.json.JSONObject;

import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.convention.annotation.Results;
import org.springframework.beans.factory.annotation.Autowired;

import com.beauty.biz.entity.ModuleRight;
import com.beauty.biz.entity.Role;
import com.beauty.biz.service.PermissionManager;
import com.beauty.biz.service.RoleManager;
import com.beauty.common.web.StrutsAction;

@SuppressWarnings("serial")
@Results( { @Result(name = StrutsAction.SUCCESS, location = "permission.jsp"),
// @Result(name="BACK",location=PermissionAction.MODULETREE_ACTION,type=StrutsAction.REDIRECT_ACTION),
})
public class PermissionAction extends StrutsAction<ModuleRight> {
	@Autowired
	private PermissionManager permissionManager;
	@Autowired
	private RoleManager roleManager;

	private List<Role> roleList;
	private String json;

	public List<Role> getRoleList() {
		return roleList;
	}

	public void setRoleList(List<Role> roleList) {
		this.roleList = roleList;
	}

	public String getJson() {
		return json;
	}

	public void setJson(String json) {
		this.json = json;
	}

	// public static final String MODULETREE_ACTION =
	// "module/module!moduleTree.action";

	public void grantRight() throws IOException {
		permissionManager.addOrUpdateRole(JSONObject.fromObject(json));
		json = "{'success':'0'}";
		sendMsg(json);
	}

	public String list() throws Exception {
		roleList = roleManager.getRoles();
		return StrutsAction.SUCCESS;
	}
}
