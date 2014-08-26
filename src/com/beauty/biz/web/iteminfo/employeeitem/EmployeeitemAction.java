package com.beauty.biz.web.iteminfo.employeeitem;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import net.sf.json.JSONObject;

import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.convention.annotation.Results;
import org.springframework.beans.factory.annotation.Autowired;

import com.beauty.biz.entity.beautyinfo.Employeeitem;
import com.beauty.biz.entity.iteminfo.Iteminfo;
import com.beauty.biz.service.iteminfo.EmployeeitemManager;
import com.beauty.biz.service.iteminfo.IteminfoManager;
import com.beauty.common.page.QueryResult;
import com.beauty.common.utils.SearchUtil;
import com.beauty.common.web.StrutsAction;

@Results({
	@Result(name="edit",location="employeeitem-edit.jsp"),
}
)

public class EmployeeitemAction extends StrutsAction<Employeeitem>{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String rows;
	private String page;
	private String employeeinfoname;
	private String itemname;
	private String itemids;

	@Autowired
	private EmployeeitemManager employeeitemManager;
	@Autowired
	private IteminfoManager iteminfomanager;
	
	/**
	 * 跳转list页面
	 * @return
	 */
	public String toListPage(){
		return "list";
	}
	
	public String toList() {

		// 当前第几页
		int intPage = Integer.parseInt((page == null || page == "0") ? "1"
				: page);
		// 每页多少行
		int maxIndex = Integer
				.parseInt((rows == null || rows == "0") ? "10"
						: rows);
		// 开始页
		int startIndex = (intPage - 1) * maxIndex;
		
		StringBuilder whereSB = new StringBuilder();
		List<Object> params = new ArrayList<Object>();
		LinkedHashMap<String, String> orderby = new LinkedHashMap<String, String>();
		orderby.put("employeeid.employeeinfoid", "desc");
		SearchUtil.getStringSearch(whereSB, params, "validstatus", "=",
				"1");
		if(employeeinfoname != null && !"".equals(employeeinfoname)){
			SearchUtil.getStringSearch(whereSB, params, "employeeid.employeeinfoname", "like",
				"%"+employeeinfoname+"%");
		}
		if(itemname != null && !"".equals(itemname)){
			SearchUtil.getStringSearch(whereSB, params, "itemid.itemname", "like",
					"%"+itemname+"%");
		}
		// ============================2：原生实体SQL==============================="
		QueryResult<Employeeitem> q;
		try {
			q = employeeitemManager.getQueryResult(startIndex, maxIndex, whereSB
					.toString(), params.toArray(), orderby);
			// 总条数
			long total = q.getTotalrecord();
			List<Map<String, Object>> rowslist = new ArrayList<Map<String, Object>>();
			// QueryResult里封装的list
			List<Employeeitem> employeeitemList = q.getResultlist();
			for (Employeeitem employeeitem : employeeitemList) {

				// 列表要显示的字段及值
				Map<String, Object> map = new HashMap<String, Object>();
				map.put("employeeitemid", employeeitem.getEmployeeitemid());
				map.put("employeeinfoname", employeeitem.getEmployeeid()==null?"":
					employeeitem.getEmployeeid().getEmployeeinfoname()==null?"":
						employeeitem.getEmployeeid().getEmployeeinfoname());
				map.put("itemname", employeeitem.getItemid()==null?"":
					employeeitem.getItemid().getItemname()==null?"":
						employeeitem.getItemid().getItemname());
				map.put("isgoldmedal", (employeeitem.getIsgoldmedal()!=null&&employeeitem.getIsgoldmedal().equals("1"))?"是":"否");
				map.put("grade", employeeitem.getGrade()==null?"":employeeitem.getGrade());
				rowslist.add(map);
			}
			Map<String, Object> mapall = new HashMap<String, Object>();
			mapall.put("total", total);
			mapall.put("rows", rowslist);
			String json = JSONObject.fromObject(mapall).toString();
			getResponse().getWriter().write(json);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	public String save() throws IOException {
		try{
			 if(entity.getEmployeeitemid()==null || "".equals(entity.getEmployeeitemid())){
				String[] items = itemids.split(",");
				for(String item:items){
					boolean flag = employeeitemManager.ishaveitemByuse(item,entity.getEmployeeid().getEmployeeinfoid());
					if(flag){
						Employeeitem eitem = new Employeeitem();
						 id = employeeitemManager.getId();
						 eitem.setEmployeeitemid(id);
						 Iteminfo iteminfo = iteminfomanager.get(item);
						 eitem.setItemid(iteminfo);
						 eitem.setBewrite(entity.getBewrite());
						 eitem.setEmployeeid(entity.getEmployeeid());
						 eitem.setGrade(entity.getGrade());
						 eitem.setIsgoldmedal(entity.getIsgoldmedal());
						 eitem.setRemark(entity.getRemark());
						 eitem.setValidstatus(entity.getValidstatus());
						 employeeitemManager.save(eitem);
					}
				}
			 }else{
				 employeeitemManager.save(entity);
			 }
		 sendMsg("success");
		}catch(Exception e){
			e.printStackTrace();
			sendMsg("fail");
		}
		return null;
	}
	
	public String edit(){
		Employeeitem eitem = employeeitemManager.getById(id);
		getRequest().setAttribute("eitem", eitem);
		return "edit";
	}
	
	public String delete() throws IOException{
		try{
		entity = employeeitemManager.getById(id);
		if(entity != null){
			entity.setValidstatus("0");
			employeeitemManager.save(entity);
		}
		sendMsg("success");
		}catch(Exception e){
			e.printStackTrace();
			sendMsg("fail");
		}
		return null;
	}
	
	public String deleteMany() throws IOException{
		try{
		String idd = getRequest().getParameter("ids");
		String[] ids = idd.split(",");
		for(String id :ids){
			entity = employeeitemManager.getById(id);
			if(entity != null){
				entity.setValidstatus("0");
				employeeitemManager.save(entity);
			}
		}
		sendMsg("success");
		}catch(Exception e){
			e.printStackTrace();
			sendMsg("fail");
		}
		return null;
	}

	public String getRows() {
		return rows;
	}

	public void setRows(String rows) {
		this.rows = rows;
	}

	public String getPage() {
		return page;
	}

	public void setPage(String page) {
		this.page = page;
	}

	public String getEmployeeinfoname() {
		return employeeinfoname;
	}

	public void setEmployeeinfoname(String employeeinfoname) {
		this.employeeinfoname = employeeinfoname;
	}

	public String getItemname() {
		return itemname;
	}

	public void setItemname(String itemname) {
		this.itemname = itemname;
	}

	public String getItemids() {
		return itemids;
	}

	public void setItemids(String itemids) {
		this.itemids = itemids;
	}
	
	
}
