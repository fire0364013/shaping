package com.beauty.biz.web.role;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import net.sf.json.JSONObject;

import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.convention.annotation.Results;
import org.springframework.beans.factory.annotation.Autowired;

import com.beauty.biz.entity.Role;
import com.beauty.biz.service.RoleManager;
import com.beauty.biz.service.UserInfoManager;
import com.beauty.common.page.QueryResult;
import com.beauty.common.utils.SearchUtil;
import com.beauty.common.web.StrutsAction;

/**
 * 角色管理
 * 
 * @author
 */
@Results( {
		// @Result(name="json",type="json",params={"root","result"}),//,params={"root","result"},location="user-json.jsp"),//params={"ignoreHierarchy","false"}
		@Result(name = "list", location = "role-list.jsp"),
		@Result(name = StrutsAction.RELOAD, location = "role-list.action", type = StrutsAction.REDIRECT), })
public class RoleAction extends StrutsAction<Role> {

	private static final long serialVersionUID = 7104196147551512373L;
	@Autowired
	private RoleManager roleManager;
	@Autowired
	private UserInfoManager userInfoManager;

	private String rolename;// 角色名称
	private String page;// 当前页数
	private String rows; // 每页显示记录

	private String json;// 页面传递json字符串

	public String getJson() {
		return json;
	}

	public void setJson(String json) {
		this.json = json;
	}

	// 查询条件
	public String getRolename() {
		return rolename;
	}

	public void setRolename(String rolename) {
		this.rolename = rolename;
	}

	public String getPage() {
		return page;
	}

	public void setPage(String page) {
		this.page = page;
	}

	public String getRows() {
		return rows;
	}

	public void setRows(String rows) {
		this.rows = rows;
	}

	/**
	 * 进入列表页面
	 */
	public String list() throws Exception {
		return "list";
	}

	/**
	 * 查询列表 显示分页
	 */
	public String roleList() throws Exception {
		int intPage = Integer.parseInt((page == null || page == "0") ? "1"
				: page);// 当前页码
		int maxIndex = Integer.parseInt((rows == null || rows == "0") ? "20"
				: rows);// 页面大小
		int startIndex = (intPage - 1) * maxIndex;// 每页第一条记录的索引
		StringBuilder whereSB = new StringBuilder();
		List<Object> params = new ArrayList<Object>();
		LinkedHashMap<String, String> orderby = new LinkedHashMap<String, String>();
		orderby.put("orderid", "asc");// 排序规则
		SearchUtil.getStringSearch(whereSB, params, "rolename", "like",
				this.rolename);// 查询条件
		QueryResult<Role> q = roleManager.getQueryResult(startIndex, maxIndex,
				whereSB.toString(), params.toArray(), orderby);
		;// .getResultlist();

		long total = q.getTotalrecord();
		List<Map<String, Object>> rowData = new ArrayList<Map<String, Object>>();
		List<Role> roleList = q.getResultlist();
		// jquery easyui 需要返回的结果集
		for (Role role : roleList) {
			// 列表要显示的字段及值
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("id", role.getRoleid());
			map.put("roleid", role.getRoleid());
			map.put("rolename", role.getRolename());
			map.put("allowendit", role.getAllowendit());
			map.put("allowdelete", role.getAllowdelete());
			map.put("deleteflag", role.getDeleteflag());
			if (role.getUpdateuserid() == null
					|| "".equals(role.getUpdateuserid())) {
				map.put("updateuser", "");
			} else {
				map.put("updateuser", userInfoManager.get(
						role.getUpdateuserid()).getLoginname());
			}

			if (role.getUpdatetime() == null || "".equals(role.getUpdatetime())) {
				map.put("updatetime", "");
			} else {
				map.put("updatetime", role.getUpdatetime().toString()
						.substring(0, 19));
			}
			rowData.add(map);
		}

		Map<String, Object> map = new HashMap<String, Object>();
		map.put("total", total);// jquery easyui 需要的总记录数
		map.put("rows", rowData);// jquery easyui 需要的结果集

		String resultJson = JSONObject.fromObject(map).toString();

		getResponse().getWriter().write(resultJson);// 将结果输出到页面
		return null;
	}

	/**
	 * 重写修改增加方法
	 */
	protected void doSaveEntity() throws Exception {
		try {
			Date date = new Date();
			String id = "";
			if (entity.getRoleid() == null || "".equals(entity.getRoleid())) {
				id = roleManager.getSequence("SEQ_ROLE");
				entity.setRoleid(id);
				entity.setOrderid(id);
			}
			// entity.setUpdatetime(EasyStr.parseDateYMD(dateStr));
			if (getSessionUser() != null) {
				entity.setUpdateuserid(getSessionUser().getUserid());
			}
			entity.setUpdatetime(date);
			roleManager.addOrUpdateRole(entity);
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
		}
	}

	/**
	 * 删除角色：批量删除和单个删除
	 * 
	 * @throws IOException
	 */
	public void deleteRole() throws IOException {
		boolean flag = roleManager.batchDelete(json);
		if (flag) {
			sendMsg("success");
		} else {
			sendMsg("error");
		}
	}

	/**
	 * 查看角色
	 */
	protected void doViewEntity() throws Exception {
		entity = roleManager.getRole(this.id);
		// if(entity.getUpdateuserid()==null||"".equals(entity.getUpdateuserid())){
		// entity.setUpdateuserid("");
		// }else{
		// entity.setUpdateuserid(userInfoManager.get(entity.getUpdateuserid()).getLoginname());
		// }
	}

	/**
	 * 进入修改页面
	 */
	protected void doInputEntity() throws Exception {
		if (this.id != null && !"".equals(this.id)) {
			entity = roleManager.getRole(this.id);
		}
	}

}
