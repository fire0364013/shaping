package com.beauty.biz.web.iteminfo;

import java.io.File;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.convention.annotation.Results;
import org.apache.struts2.json.JSONException;
import org.apache.struts2.json.JSONUtil;
import org.springframework.beans.factory.annotation.Autowired;

import com.beauty.biz.service.SystemlogManager;
import com.beauty.common.page.QueryResult;
import com.beauty.common.utils.SearchUtil;
import com.beauty.common.utils.SessionUser;
import com.beauty.common.web.StrutsAction;
import com.beauty.biz.entity.iteminfo.Container;
import com.beauty.biz.entity.iteminfo.Iteminfo;
import com.beauty.biz.entity.iteminfo.Monitoritemtype;
import com.beauty.biz.entity.projects.Projectsampleitem;
import com.beauty.biz.service.iteminfo.ContainerManager;
import com.beauty.biz.service.iteminfo.ItemTypeManager;
import com.beauty.biz.service.iteminfo.IteminfoManager;

@Results( { @Result(name = StrutsAction.LIST, location = "iteminfo-list.jsp"),
		@Result(name = "picitemlist", location = "selectpreitemitem-list.jsp"),
// //@Result(name ="method-list", location = "method-list.jsp"),
// @Result(name ="view", location = "iteinfo-detail.jsp"),
// @Result(name =StrutsAction.INPUT, location = "type-input.jsp"),
		@Result(name = "showContainer", location = "showcontainer-list.jsp"),
		@Result(name = "showsavedose", location = "showsavedose-list.jsp"),
		@Result(name="ItemList",location="selectitem.jsp")
})
public class IteminfoAction extends StrutsAction<Iteminfo> {

	private static final long serialVersionUID = 1L;
	@Autowired
	private IteminfoManager iteminfoManager;
	@Autowired
	private ItemTypeManager itemTypeManager;
	@Autowired
	private ContainerManager containerManger;
	@Autowired
	private SystemlogManager systemlogManager;

	private String rows;// 用于接收页面上的行
	private String page;// 用于接收页面上的页
	private String ids;// 接收删除时的id
	private String unitid;// 接收保存时候的计量单位
	private String itemname;
	//private String monitoritemtype;
	//private String monitorpointtype;
	private String itemtypeid;// 项目类型
	private String monitorpointtypeid;//项目小类型
	private String itemid;// 用于接收传过来的itemid
	private String itemflag;// 用于做在项目集中没有右键，在项目管理中有右键操作
	private String containerid;// 样品容器id
	private String itemtype;// 项目类型
	List<Monitoritemtype> itemTypeList;
	private String flag;

	public String getItemflag() {
		return itemflag;
	}

	public void setItemflag(String itemflag) {
		this.itemflag = itemflag;
	}

	public String getItemid() {
		return itemid;
	}

	public void setItemid(String itemid) {
		this.itemid = itemid;
	}
//加载树（全部加载）
	public void tree() throws IOException {
		try{
		List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();

		// 项目类型
			List<Monitoritemtype> nodes = itemTypeManager.getItemTypeByParent(this.itemtype);
			for (Monitoritemtype type : nodes) {
				Map<String, Object> map = new HashMap<String, Object>();
				map.put("id", type.getItemtypeid());
				map.put("text", type.getItemtypename());
				map.put("state", "closed");
				map.put("attributes", "{'flag':'type','sampletype':'"+ type.getSampletypesign() + "'}");
				list.add(map);
			}	


		// 项目
		List<Iteminfo> items = iteminfoManager.getItemsByType(this.itemtype);
		for (Iteminfo item : items) {
			Map<String, Object> mapItem = new HashMap<String, Object>();
			mapItem.put("id", item.getItemid());
			mapItem.put("text", item.getItemname()+"--"+item.getStandfee());
			mapItem.put("state", "");
			mapItem.put("attributes", "{'flag':'item'}"); // 标记此节点是项目
			list.add(mapItem);
		}

		String json = JSONArray.fromObject(list).toString();
		getResponse().getWriter().write(json);
		}catch(Exception e){
			e.printStackTrace();
		}
	}
	//***********************************************异步加载树 msp******************************************************************
	public void btree() throws IOException {
		List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();

		// 项目大类型
		List<Monitoritemtype> bnodes = itemTypeManager.findAll("parentitemtypeid", "0");
			for (Monitoritemtype type : bnodes) {
				Map<String, Object> map = new HashMap<String, Object>();
				map.put("id", type.getItemtypeid());
				map.put("text", type.getItemtypename());
				map.put("state", "closed");
				map.put("attributes", "{'flag':'btype','sampletype':'"+ type.getSampletypesign() + "'}");
				list.add(map);
			}	
		String json = JSONArray.fromObject(list).toString();
		getResponse().getWriter().write(json);
	}

	
	public void item() throws IOException {
		List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
		

		// 项目
		List<Iteminfo> itemList = iteminfoManager.getItemListByMptid(monitorpointtypeid);
			for (Iteminfo type : itemList) {
				Map<String, Object> map = new HashMap<String, Object>();
				map.put("id", type.getItemid());
				map.put("text", type.getItemname());
				map.put("state", "");
				map.put("attributes", "{'flag':'item'}");
				list.add(map);
			}	
		String json = JSONArray.fromObject(list).toString();
		getResponse().getWriter().write(json);
	}
	
	//****************************************************************************************************************************

	/**
	 * 查询出列表中所有数据 以及条件查询
	 * 
	 * @return
	 */
	public String toList() {
		// 当前第几页
		int intPage = Integer.parseInt((page == null || page == "0") ? "1": page);
		// 每页多少行
		int maxIndex = Integer.parseInt((rows == null || rows == "0") ? "20": rows);
		// 开始页
		int startIndex = (intPage - 1) * maxIndex;

		String whereSB = "1=1";
		List<Object> params = new ArrayList<Object>();
		LinkedHashMap<String, String> orderby = new LinkedHashMap<String, String>();
//		orderby.put("monitoritemtype.itemtypeid", "asc");
		orderby.put("itemname", "asc");
		if(null != itemname && !"".equals(itemname))
		{
			whereSB += " and itemname like ?";
			params.add("%" + itemname + "%");
		}
		if(null != itemtypeid && !"".equals(itemtypeid))
		{
			whereSB += " and monitoritemtype.itemtypeid = ?";
			params.add("%" + itemtypeid + "%");
		}
		//只能看到本单位的项目
		whereSB += " and entid ='"+getSessionUser().getEntid()+"' ";
		// ============================2：原生实体SQL==============================="
		QueryResult<Iteminfo> q;
		try {
			q = iteminfoManager.getQueryResult(startIndex, maxIndex, whereSB, params.toArray(), orderby);
			// 总条数
			long total = q.getTotalrecord();
			List<Map<String, Object>> rowslist = new ArrayList<Map<String, Object>>();
			// QueryResult里封装的list
			List<Iteminfo> userList = q.getResultlist();
			for (Iteminfo iteminfo : userList) {
				// 列表要显示的字段及值
				Map<String, Object> map = new HashMap<String, Object>();
				map.put("itemid", iteminfo.getItemid());

				map.put("itemname", iteminfo.getItemname());
				Monitoritemtype itemtypename = iteminfo.getMonitoritemtype();
				map.put("monitoritemtype", itemtypename != null ? itemtypename
						.getItemtypename() : "");
				map.put("standfee", iteminfo.getStandfee());
				rowslist.add(map);
			}
			Map<String, Object> mapall = new HashMap<String, Object>();
			mapall.put("total", total);
			mapall.put("rows", rowslist);
			String json = JSONObject.fromObject(mapall).toString();
			getResponse().getWriter().write(json);
		} catch (Exception e) {
		}
		return null;
	}

	/**
	 * 新增查询项目名称的方法~wjy
	 * 
	 * @return
	 */
	public String toListforEmployeeinfo() {
		int intPage = Integer.parseInt((page == null || page == "0") ? "1"
				: page);
		int maxIndex = Integer.parseInt((rows == null || rows == "0") ? "20"
				: rows);
		int startIndex = (intPage - 1) * maxIndex;
		StringBuilder whereSB = new StringBuilder();
		List<Object> params = new ArrayList<Object>();
		LinkedHashMap<String, String> orderby = new LinkedHashMap<String, String>();
		orderby.put("itemid", "asc");
		SearchUtil.getStringSearch(whereSB, params, "itemname", "like",
				this.itemname);
		SearchUtil.getStringSearch(whereSB, params,
				"monitoritemtype.itemtypeid", "like", this.itemtypeid);
		QueryResult<Iteminfo> q;
		try {
			q = iteminfoManager.getQueryResult(startIndex, maxIndex, whereSB
					.toString(), params.toArray(), orderby);
			;// .getResultlist();
			// 总条数
			long total = q.getTotalrecord();
			List<Map<String, Object>> rowslist = new ArrayList<Map<String, Object>>();
			List<Iteminfo> userList = q.getResultlist();
			for (Iteminfo Iteminfo : userList) {
				Map<String, Object> map = new HashMap<String, Object>();
				map.put("itemid", Iteminfo.getItemid());
				map.put("itemname", Iteminfo.getItemname());
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



	/**
	 * 重写转向增加和修改页面的方法
	 */
	@Override
	protected void doInputEntity() throws Exception {
		List<Monitoritemtype> itemType = itemTypeManager.findAll(
				"parentitemtypeid", "0");
		getRequest().setAttribute("itemType", itemType);
		getRequest().setAttribute("entity", entity);
	}

	/**
	 * 重写转向详情页面的方法
	 */
	@Override
	protected void doViewEntity() throws Exception {
		List<Monitoritemtype> itemType = itemTypeManager.findAll(
				"parentitemtypeid", "0");

		getRequest().setAttribute("itemType", itemType);
		getRequest().setAttribute("entity", entity);
	}

	/**
	 * 保存
	 */
	@Override
	public String save() throws Exception {
		try {
			String itemid = entity.getItemid();
			if (itemid != null && !itemid.equals("")) {// 修改（判断是否为修改）
				if (flagName.equals(equalsName)) {
					saveEntity();
					sendMsg("success");
				} else {
					boolean flag = iteminfoManager.getItemByName(equalsName,itemtypeid,monitorpointtypeid);
					if (flag) {
						sendMsg("exist");
					} else {
						entity.setItemname(equalsName);
						saveEntity();
						sendMsg("success");
					}
				}

				// 向日志表中插入数据************开始
				SessionUser session = getSessionUser();
				String operatecontent = "修改了监测项目id为" + itemid + "的记录";
				systemlogManager.addSystemLog(session.getModule(), session
						.getUserid(), operatecontent);
				// **********************结束
			} else {
				try {
					boolean flag = iteminfoManager.getItemByName(equalsName,
							itemtypeid,monitorpointtypeid);
					if (flag) {
						sendMsg("exist");
					} else {
						String itemids = iteminfoManager
								.getSequence("SEQ_ITEMINFO");
						entity.setItemid(itemids);
						entity.setCreateby(getSessionUser().getUserid());// createby
																			// 创建人
																			// 保存创建人的id
						Date date = new Date();
						entity.setCreatetime(date);
						entity.setItemname(equalsName);
						entity.setEntid(getSessionUser().getEntid());
						/*
						 * entity.setIspreitem("N"); String preitem =
						 * entity.getPreitem(); Iteminfo preIteminfo =
						 * iteminfoManager.get(preitem);
						 * preIteminfo.setIspreitem("Y");
						 */
						saveEntity();
						// 向日志表中插入数据************开始
						SessionUser session = getSessionUser();
						String operatecontent = "增加了项目id为" + itemids + "的记录";
						systemlogManager.addSystemLog(session.getModule(),
								session.getUserid(), operatecontent);
						// **********************结束
						sendMsg("success");
					}
				} catch (Exception e) {

				}
			}
		} catch (Exception e) {
			e.printStackTrace();
			sendMsg("fail");
		}
		return null;
	}

	/**
	 * 保存实体
	 */
	private void saveEntity() {
		entity.setItemname(equalsName);
//		String containerid = entity.getContainer().getContainerid();
//		Container con = containerManger.findById(containerid);
//		if(con != null){
//			entity.setContainer(con);
//		}
		Monitoritemtype monitoritemtype = itemTypeManager.get(itemtypeid);// 项目类型
		if (monitoritemtype != null) {
			entity.setMonitoritemtype(monitoritemtype);
		}
				iteminfoManager.save(entity);
	}

	/**
	 * 重写转向列表页面的list方法
	 */
	@Override
	public String list() throws Exception {
		List<Monitoritemtype> itemType = itemTypeManager.findAll(
				"parentitemtypeid", "0");
		getRequest().setAttribute("itemType", itemType);
		return LIST;
	}

	/**
	 * 获取监测项目列表数据
	 * 
	 * @return
	 * @throws Exception
	 */
	public String getItemList() throws Exception {
		int pageNum = Integer
				.parseInt(page == null || page == "0" ? "1" : page);
		int pageCount = Integer.parseInt(rows == null || rows == "0" ? "10"
				: rows);
		int pageStartIndex = (pageNum - 1) * pageCount;

		StringBuilder whereSB = new StringBuilder();
		List<Object> params = new ArrayList<Object>();
		SearchUtil.getStringSearch(whereSB, params, "itemname", "like",
				this.itemname);
		SearchUtil.getStringSearch(whereSB, params,
				"monitoritemtype.itemtypename", "like", this.itemtype);
		if (flag.equals("iteminfo")) {
			SearchUtil.getStringSearch(whereSB, params, "ispreitem", "=", "Y");
		}
		// SearchUtil.getStringSearch(whereSB, params,
		// "monitoritemtype.parentitemtypeid", "=", "0");
		LinkedHashMap<String, String> orderBy = new LinkedHashMap<String, String>();
		orderBy.put("itemid", "asc");
		QueryResult<Iteminfo> q = iteminfoManager.getQueryResult(
				pageStartIndex, pageCount, whereSB.toString(),
				params.toArray(), orderBy);

		long total = q.getTotalrecord();
		List<Map<String, Object>> datas = new ArrayList<Map<String, Object>>();
		List<Iteminfo> itemList = q.getResultlist();
		for (Iteminfo item : itemList) {
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("id", item.getItemid());
			// map.put("itemtypeid",
			// item.getMonitoritemtype()==null?"":item.getMonitoritemtype().getItemtypeid());
			map.put("itemtype", item.getMonitoritemtype() == null ? "" : item
					.getMonitoritemtype().getItemtypename());
			map.put("itemname", item.getItemname());
//			map.put("units", item.getUnit() == null ? "" : item.getUnit()
//					.getUnitname());
			datas.add(map);
		}

		Map<String, Object> map = new HashMap<String, Object>();
		map.put("total", total);
		map.put("rows", datas);
		String resultJson = JSONObject.fromObject(map).toString();
		sendMsg(resultJson);
		return null;
	}

	public void getItemListForTemplate() throws Exception {
		int pageNum = Integer
				.parseInt(page == null || page == "0" ? "1" : page);
		int pageCount = Integer.parseInt(rows == null || rows == "0" ? "10"
				: rows);
		int pageStartIndex = (pageNum - 1) * pageCount;

		StringBuilder whereSB = new StringBuilder();
		List<Object> params = new ArrayList<Object>();
		SearchUtil.getStringSearchByLower(whereSB, params, "itemname", "like",
				this.itemname);
		SearchUtil.getStringSearch(whereSB, params,
				"monitoritemtype.sampletypesign", "=", java.net.URLDecoder
						.decode(this.itemtype, "UTF-8"));
		SearchUtil.getStringSearch(whereSB, params,
				"monitoritemtype.parentitemtypeid", "=", "0");
		SearchUtil.getStringSearch(whereSB, params, "ispreitem", "<>", "Y");
		LinkedHashMap<String, String> orderby = new LinkedHashMap<String, String>();
		orderby.put("monitoritemtype.itemtypeid", "asc");
		orderby.put("itemname", "asc");
		QueryResult<Iteminfo> q = iteminfoManager.getQueryResult(
				pageStartIndex, pageCount, whereSB.toString(),
				params.toArray(), orderby);

		long total = q.getTotalrecord();
		List<Map<String, Object>> datas = new ArrayList<Map<String, Object>>();
		List<Iteminfo> itemList = q.getResultlist();
		for (Iteminfo item : itemList) {
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("id", item.getItemid());
			map.put("itemtype", item.getMonitoritemtype() == null ? "" : item
					.getMonitoritemtype().getItemtypename());
			map.put("itemname", item.getItemname());
			datas.add(map);
		}
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("total", total);
		map.put("rows", datas);
		String resultJson = JSONObject.fromObject(map).toString();
		getResponse().getWriter().write(resultJson);
	}
//	public void dalei() throws Exception{//根据前台ajax请求大类级联小类
//		List<Map<String, Object>> datas = new ArrayList<Map<String, Object>>();
//		List<Monitorpointtype> xiaolei = mangager.getMonitorpointitemType2(itemtypeid);
//		
//		for (Monitorpointtype smallitemtype : xiaolei) {
//			Map<String, Object> map = new HashMap<String, Object>();
//			map.put("monitorpointtypeid", smallitemtype.getMonitorpointtypeid() == null ? "" : smallitemtype.getMonitorpointtypeid());
//			map.put("monitorpointtypename", smallitemtype.getMonitorpointtypename());
//			datas.add(map);
//		}
//		Map<String, Object> mapAll = new HashMap<String, Object>();
//		mapAll.put("rowsData", datas);
//		// 变成jsonobject
//		String first = JSONArray.fromObject(mapAll).toString();
//		String jsonStr = first.substring(1, first.length() - 1);
//		sendMsg(JSONObject.fromObject(jsonStr).toString());
//	}

	//分包项目树
	public void subItemTree(){
		try {
			String projectcode = getRequest().getParameter("projectcode");
			List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
			// 项目类型
			List<Monitoritemtype> nodes = itemTypeManager
					.getProjectMonitorType(projectcode, this.itemtype);// 根节点
			for (Monitoritemtype type : nodes) {
				Map<String, Object> map = new HashMap<String, Object>();
				map.put("id", type.getItemtypeid());
				map.put("text", type.getItemtypename());
				map.put("state", "closed");
				map.put("attributes", "{'flag':'type','sampletype':'"
						+ type.getSampletypesign() + "'}");
				list.add(map);
			}

			// 项目
			List<Iteminfo> items = iteminfoManager.getProjectMonitorItem(
					projectcode, itemtype);

			for (Iteminfo item : items) {
				Map<String, Object> mapItem = new HashMap<String, Object>();
				mapItem.put("id", item.getItemid());
				mapItem.put("text", item.getItemname());
				mapItem.put("state", "");
				mapItem.put("attributes", "{'flag':'item'}");
				list.add(mapItem);
			}
			String str = JSONArray.fromObject(list).toString();
			sendMsg(str);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	public void getSelectItemList(){
		try{
			String itemname = getRequest().getParameter("itemname");
			String itemtypeid = getRequest().getParameter("itemtypeid");//当前的项目类型编号
			String whereSQL = " where 1 = 1";
			if(null!=itemname && !"".equals(itemname)){
				whereSQL+="  and i.itemname like '%"+itemname+"%' ";
			}	
			
			if(null!=itemtypeid && !"".equals(itemtypeid)){
				whereSQL+=" and i.monitoritemtype.itemtypeid = '"+itemtypeid+"' ";
			}
			String hql="";
			List<Iteminfo> itemList =new ArrayList<Iteminfo>();	 
			
			hql="select distinct i from Iteminfo i" +
					 whereSQL+" order by i.itemname asc";
			itemList= iteminfoManager.getItemListByHQL(hql);
			
			List<Map<String,Object>> rowData = new ArrayList<Map<String,Object>>();
			long total = itemList.size();
			for(Iteminfo item : itemList){
				Map<String, Object> map = new HashMap<String, Object>();
				map.put("itemtypename", item.getMonitoritemtype()==null?"":item.getMonitoritemtype().getItemtypename());
				map.put("itemtypeid", item.getMonitoritemtype()==null?"":item.getMonitoritemtype().getItemtypeid());
				map.put("itemid", item.getItemid());
				map.put("itemname", item.getItemname());
				rowData.add(map);
			}
			
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("total", total);
			map.put("rows", rowData);
			String resultJson = JSONObject.fromObject(map).toString();
			getResponse().getWriter().write(resultJson);
		}catch(Exception e){
			e.printStackTrace();
		}
	}
	
	public String toListPage(){
		itemTypeList = iteminfoManager.getMonitoritemtype();
		return "ItemList";
	}
	
	public String showContainer(){
		return "showContainer";
	}
	
	public String showsavedose(){
		return "showsavedose";
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

	public String getContainerid() {
		return containerid;
	}

	public void setContainerid(String containerid) {
		this.containerid = containerid;
	}

	public String getItemname() {
		return itemname;
	}

	public void setItemname(String itemname) {
		this.itemname = itemname;
	}


	public String getIds() {
		return ids;
	}

	public void setIds(String ids) {
		this.ids = ids;
	}

	public String getItemtypeid() {
		return itemtypeid;
	}

	public void setItemtypeid(String itemtypeid) {
		this.itemtypeid = itemtypeid;
	}

	public String getUnitid() {
		return unitid;
	}

	public void setUnitid(String unitid) {
		this.unitid = unitid;
	}

	public String getItemtype() {
		return itemtype;
	}

	public void setItemtype(String itemtype) {
		this.itemtype = itemtype;
	}

	public List<Monitoritemtype> getItemTypeList() {
		return itemTypeList;
	}

	public void setItemTypeList(List<Monitoritemtype> itemTypeList) {
		this.itemTypeList = itemTypeList;
	}

	public String getFlag() {
		return flag;
	}

	public void setFlag(String flag) {
		this.flag = flag;
	}

	public void setMonitorpointtypeid(String monitorpointtypeid) {
		this.monitorpointtypeid = monitorpointtypeid;
	}

	public String getMonitorpointtypeid() {
		return monitorpointtypeid;
	}
	

}
