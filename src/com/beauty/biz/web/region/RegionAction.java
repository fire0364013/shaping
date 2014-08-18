package com.beauty.biz.web.region;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.convention.annotation.Results;
import org.springframework.beans.factory.annotation.Autowired;

import com.beauty.biz.entity.entpriseinfo.Region;
import com.beauty.biz.service.SystemlogManager;
import com.beauty.biz.service.entpriseinfo.RegionManager;
import com.beauty.common.page.QueryResult;
import com.beauty.common.utils.SearchUtil;
import com.beauty.common.utils.SessionUser;
import com.beauty.common.web.StrutsAction;

/**
 * 行政区域
 * 
 * @author wjy
 * 
 */
@Results( {
		@Result(name = "json", type = "json", params = { "root", "result" }),
		@Result(name = StrutsAction.SUCCESS, location = "region-list.jsp"),
		@Result(name = StrutsAction.RELOAD, location = "region.action", type = StrutsAction.REDIRECT),

})
public class RegionAction extends StrutsAction<Region> {

	private static final long serialVersionUID = 1L;
	private String regioncode;
	private String regionName;

	private String page;
	private String rows;
	private JSONObject result;
	@Autowired
	private RegionManager regionManager;
	@Autowired
	private SystemlogManager systemlogManager;// 日志信息
	private List<Region> listRegion;
	private String ids;

	public String getRegionName() {
		return regionName;
	}

	public void setRegionName(String regionName) {
		this.regionName = regionName;
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

	public JSONObject getResult() {
		return result;
	}

	public String getRegioncode() {
		return regioncode;
	}

	public void setRegioncode(String regioncode) {
		this.regioncode = regioncode;
	}

	public List<Region> getListRegion() {
		return listRegion;
	}

	public void setListRegion(List<Region> listRegion) {
		this.listRegion = listRegion;
	}

	public String getIds() {
		return ids;
	}

	public void setIds(String ids) {
		this.ids = ids;
	}

	/**
	 * 跳入增加和删除页面 复写父类StrutsAction方法 在跳入增加和删除页面的时候将所有部门全部查出
	 */

	@Override
	protected void doInputEntity() throws Exception {
		listRegion = regionManager.getAll();
	}

	@Override
	protected void doListEntity() throws Exception {
		list = regionManager.queryResult(getRequest());
	}

	/**
	 * 查询流程定义列表
	 * 
	 * @param mapping
	 * @param form
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	public String regionList() throws Exception {
		int intPage = Integer.parseInt((page == null || page == "0") ? "1"
				: page);
		int maxIndex = Integer.parseInt((rows == null || rows == "0") ? "23"
				: rows);
		int startIndex = (intPage - 1) * maxIndex;

		StringBuilder whereSB = new StringBuilder();
		List<Object> params = new ArrayList<Object>();
		LinkedHashMap<String, String> orderby = new LinkedHashMap<String, String>();
		orderby.put("regioncode", "asc");
		SearchUtil.getStringSearch(whereSB, params, "regioncode", "like",
				this.regioncode);
		SearchUtil.getStringSearch(whereSB, params, "regionname", "like",
				this.regionName);

		QueryResult<Region> q;
		q = regionManager.getQueryResult(startIndex, maxIndex, whereSB
				.toString(), params.toArray(), orderby);// .getResultlist();

		long total = q.getTotalrecord();
		List<Map<String, Object>> rows2 = new ArrayList<Map<String, Object>>();
		List<Region> regionList = q.getResultlist();
		// jquery easyui 需要返回的结果集
		for (Region region : regionList) {
			// 列表要显示的字段及值
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("regioncode", region.getRegioncode());
			map.put("regionname", region.getRegionname());
			map.put("parentregioncode", region.getParentregioncode());
			String str = region.getIsused();
			map.put("isused", region.getIsused());
			rows2.add(map);
		}
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("total", total);// jquery easyui 需要的总记录数
		map.put("rows", rows2);// jquery easyui 需要的结果集
		String first = JSONArray.fromObject(map).toString();//
		String jsonString = first.substring(1, first.length() - 1);// 去掉“[”和“]”
		result = JSONObject.fromObject(jsonString);
		return "json";
	}

	// 删除区域
	public void deleteRegion() {
		SessionUser session = getSessionUser();
		regionManager.batchDelete(getRequest(), session);
		try {
			sendMsg("success");
		} catch (IOException e) {
		}
	}

	/**
	 * 重写父类的方法~保存该实体 在进行保存基础表的时候，要判断名字是否一样~分别针对新增和修改进行了判断
	 * 修改：修改分为，当前名字没有改变的修改：参见标识A，和名字改变的修改：参见标识B 新增，参见标识C
	 * 
	 * @throws IOException
	 */
	@Override
	public String save() throws Exception {
		String regioncodes = entity.getRegioncode();
		try {
			if (regioncodes != null && !regioncodes.equals("")) {// 这里是修改
				if (flagName.equals(equalsName)) { // A 如果名字没有改变，直接保存
					try {
						entity.setParentregioncode("0");
						regionManager.saveUpdate(entity);
						sendMsg("success");
					} catch (Exception e) {
						sendMsg("fail");
					}
				} else { // B 如果名字已经该改变了，name就根据当前写的名字跟数据库进行查询，如果为真，就是已经存在
					boolean flag = regionManager.saveRegion(equalsName);
					if (flag) {
						sendMsg("exist");
					} else {
						entity.setParentregioncode("0");
						regionManager.saveUpdate(entity);
						sendMsg("success");
					}
				}
			} else { // C，新增直接与数据库进行查询~判断其是否存在
				boolean flag = regionManager.saveRegion(equalsName);// 根据名字查看该方法是否存在
				if (flag) {
					sendMsg("exist");
				} else {
					entity.setRegioncode(equalsName);
					entity.setParentregioncode("0");
					regionManager.saveUpdate(entity);
					sendMsg("success");
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
			sendMsg("fail");
		}
		return null;
	}

	/**
	 * 删除一条数据
	 */
	public void deleteOnlyOne() {
		try {
			Region region = regionManager.get(id);
			String id = region.getIsused();
			if (!id.equals("0")) {
				region.setIsused("0");
				regionManager.saveUpdate(region);
				// 向日志表中插入数据************开始
				SessionUser session = getSessionUser();
				String operatecontent = "注销了行政区域id为" + id + "的记录";
				systemlogManager.addSystemLog(session.getModule(), session
						.getUserid(), operatecontent);
				// **********************结束
				sendMsg("success");
			} else {
				getResponse().getWriter().write("error");
			}
		} catch (IOException e) {
		}
	}
}
