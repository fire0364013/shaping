package com.beauty.biz.web.module;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import net.sf.json.JSONObject;

import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.convention.annotation.Results;
import org.springframework.beans.factory.annotation.Autowired;

import com.beauty.biz.entity.Module;
import com.beauty.biz.entity.ModuleRight;
import com.beauty.biz.service.ModuleManager;
import com.beauty.common.page.QueryResult;
import com.beauty.common.utils.SearchUtil;
import com.beauty.common.web.StrutsAction;

/**
 * 模块管理
 * 
 * @author
 */
@Results( { @Result(name = "list", location = "module-list.jsp"),
		@Result(name = "moduletree", location = "module-tree.jsp") })
public class ModuleAction extends StrutsAction<Module> {
	private static final long serialVersionUID = 1L;

	@Autowired
	private ModuleManager moduleManager;
	private List<ModuleRight> modulelist;
	private String page;// 当前第几页
	private String rows;// 每页的行数

	private String moduleid;
	private String json;

	public void setJson(String json) {
		this.json = json;
	}

	public String getModuleid() {
		return moduleid;
	}

	public void setModuleid(String moduleid) {
		this.moduleid = moduleid;
	}

	// 查询条件：模块名称，模块类型
	private String modulename;
	private String moduletype;

	public String getModulename() {
		return modulename;
	}

	public void setModulename(String modulename) {
		this.modulename = modulename;
	}

	public String getModuletype() {
		return moduletype;
	}

	public void setModuletype(String moduletype) {
		this.moduletype = moduletype;
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
	 * 权限树
	 * 
	 * @return
	 * @throws Exception
	 */
	public String moduleTree() throws Exception {

		list = moduleManager.getModules(); // 获取所有模块List
		modulelist = moduleManager.getModuleRight(getRequest());// 获取已授权模块List
		// for(ModuleRight mr:modulelist){
		// System.out.println(mr.getModuleid());
		// }

		return "moduletree";
	}

	public List<ModuleRight> getModulelist() {
		return modulelist;
	}

	/**
	 * 进入模块列表页
	 */
	public String list() {
		return "list";
	}

	/**
	 * 查询模块 显示分页
	 * 
	 * @return null
	 * @throws Exception
	 */

	public String moduleList() throws Exception {
		int thisPage = Integer.parseInt(page == null || page == "0" ? "1"
				: page);// 当前第几页：如果page为空或0，则当前默认第一页
		int rowCount = Integer.parseInt(rows == null || rows == "0" ? "20"
				: rows);// 每页行数:如果rows为空或0，则默认每页是10行
		int pageStartIndex = (thisPage - 1) * rowCount;// 每页第一条记录的索引
		try {
			StringBuilder whereSB = new StringBuilder();
			List<Object> params = new ArrayList<Object>();
			LinkedHashMap<String, String> orderBy = new LinkedHashMap<String, String>();
			// 查询条件
			SearchUtil.getStringSearch(whereSB, params, "modulename", "like",
					this.modulename);
			SearchUtil.getStringSearch(whereSB, params, "moduletype", "like",
					this.moduletype);
			orderBy.put("moduleid", "asc");// 列表排序方式
			QueryResult<Module> q = moduleManager.getQueryResult(
					pageStartIndex, rowCount, whereSB.toString(), params
							.toArray(), orderBy);
			long total = q.getTotalrecord();
			List<Map<String, Object>> datas = new ArrayList<Map<String, Object>>();
			List<Module> modules = q.getResultlist();
			for (Module module : modules) {
				// 列表要显示的字段和值
				Map<String, Object> map = new HashMap<String, Object>();
				map.put("id", module.getModuleid());
				map.put("moduleid", module.getModuleid());
				map.put("modulename", module.getModulename());
				map.put("moduletype", module.getModuletype());
				datas.add(map);
			}
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("total", total); // 总记录数
			map.put("rows", datas); // 值

			String result = JSONObject.fromObject(map).toString();// 将map里面的值转换成json字符串
			getResponse().getWriter().write(result);// 将json结果集输出到页面

		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	/**
	 * 重写增加修改方法 判断模块编号是否存在，如果存在则不能添加
	 */

	public String save() throws Exception {
		try {
			String op = getRequest().getParameter("operate");
			// System.out.println("模块操作："+op);
			if (op == null || "".equals(op)) {
				entity.setModuletype("0");
				List<Module> list = moduleManager.getModules();
				for (int i = 0; i < list.size(); i++) {
					Module module = list.get(i);
					if (module.getModuleid().equals(entity.getModuleid())) {
						sendMsg("faild");
						return null;
					}
				}
			}

			moduleManager.addOrUpdateModule(entity);
			sendMsg("success");
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
		}
		return null;
	}

	/**
	 * 删除模块
	 */
	public String deleteModule() throws Exception {
		try {
			String[] arrId = json.split(",");
			for (String s : arrId) {
				moduleManager.delete(s);
			}
			sendMsg("success");
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			sendMsg("faild");
		}
		return null;
	}
}
