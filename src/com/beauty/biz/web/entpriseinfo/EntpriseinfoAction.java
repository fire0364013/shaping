package com.beauty.biz.web.entpriseinfo;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import net.sf.json.JSONObject;

import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.convention.annotation.Results;
import org.springframework.beans.factory.annotation.Autowired;

import com.beauty.biz.entity.dictionary.Dictionaryinfo;
import com.beauty.biz.entity.entpriseinfo.Appinfo;
import com.beauty.biz.entity.entpriseinfo.EntpriseInfo;
import com.beauty.biz.entity.entpriseinfo.Industry;
import com.beauty.biz.entity.entpriseinfo.Pollutionsourcetype;
import com.beauty.biz.entity.entpriseinfo.Region;
import com.beauty.biz.entity.entpriseinfo.Registertype;
import com.beauty.biz.entity.entpriseinfo.Scale;
import com.beauty.biz.service.SystemlogManager;
import com.beauty.biz.service.entpriseinfo.AppinfoManager;
import com.beauty.biz.service.entpriseinfo.EntpriseInfoManager;
import com.beauty.biz.service.entpriseinfo.IndustryManager;
import com.beauty.biz.service.entpriseinfo.PollutionsourcetypeManager;
import com.beauty.biz.service.entpriseinfo.RegionManager;
import com.beauty.biz.service.entpriseinfo.RegistertypeManager;
import com.beauty.biz.service.entpriseinfo.ScaleManager;
import com.beauty.common.page.QueryResult;
import com.beauty.common.utils.SearchUtil;
import com.beauty.common.utils.SessionUser;
import com.beauty.common.web.StrutsAction;

@Results( {
		@Result(name = "industry-input", location = "entpriseinfo-industyInput.jsp"),
		@Result(name = StrutsAction.INPUT, location = "entpriseinfo-input.jsp"),
		@Result(name = StrutsAction.LIST, location = "entpriseinfo-list.jsp"),
		@Result(name = StrutsAction.VIEW, location = "entpriseinfo-view.jsp"),
		@Result(name = StrutsAction.RELOAD, location = "entpriseinfo.action", type = StrutsAction.REDIRECT),
		@Result(name = "toApppage",location ="appversion-list.jsp")
})
public class EntpriseinfoAction extends StrutsAction<EntpriseInfo> {
	private static final long serialVersionUID = -8211124630488056735L;

	private String page;// 当前页数
	private String rows; // 每页显示记录
	private String json;// 页面传递json字符串
	private List<Scale> scaleList;// 查出所有企业规模实体
	private List<Industry> industryList;// 查出所有行业类型实体
	private List<Registertype> registertypeList;// 登记注册类型
	private List<Dictionaryinfo> dictionaryinfoList;// 关注程度
	private List<Pollutionsourcetype> pollutionsourcetypeList;// 污染源类型
	private List<Appinfo> appList;//App应用
	// private List<Region> regionList;//查出所有省份
	private Registertype registertype;// 登记注册编码
	private Pollutionsourcetype pollutionsourcetype;// 污染源编码
	private Industry industry;// 行业类型编码
	private Scale scale;// 规模编码
	private Region region;// 区编码
	private Region city;// 市编码
	private Region province;// 省编码
	private Dictionaryinfo attention;// 关注程度
	private String entids; // 企业id
	private String userids;// 用于获取页面上的userid
	private String regioncode;
	private String entname;
	private String sourcetype;
	// 注入的Service层
	@Autowired
	private EntpriseInfoManager entpriseInfoManager;
	@Autowired
	private ScaleManager scaleManager;
	@Autowired
	private IndustryManager industryManager;
	@Autowired
	private RegistertypeManager registertypeManager;
	@Autowired
	private PollutionsourcetypeManager pollutionsourcetypeManager;
	@Autowired
	private RegionManager regionManager;
	@Autowired
	private AppinfoManager appinfoManager;
	// @Autowired
	// private UserInfoManager userInfoManager;
	@Autowired
	private SystemlogManager systemlogManager;

	/**
	 * 进入列表页面
	 */
	public String list() throws Exception {
		return StrutsAction.LIST;
	}
	

	/**
	 * 查询列表 显示分页
	 */
	public String entpriseinfoList() throws Exception {
		try {
			int intPage = Integer.parseInt((page == null || page == "0") ? "1"
					: page);
			int maxIndex = Integer
					.parseInt((rows == null || rows == "0") ? "16" : rows);
			int startIndex = (intPage - 1) * maxIndex;

			StringBuilder whereSB = new StringBuilder();
			List<Object> params = new ArrayList<Object>();
			LinkedHashMap<String, String> orderby = new LinkedHashMap<String, String>();
			orderby.put("entname", "asc");
			if(entname != null && !"".equals(entname)){
				SearchUtil.getStringSearchByLower(whereSB, params, "entname",
						"like", entname);
			}
			if(regioncode != null && !"".equals(regioncode)){
				SearchUtil.getStringSearch(whereSB, params,
						"region.regioncode", "=", regioncode);
			}
			if(sourcetype != null && !"".equals(sourcetype)){
				SearchUtil.getStringSearch(whereSB, params,
						"pollutionsourcetype.sourcetypecode", "=", sourcetype);
			}
			
//			SearchUtil.getStringSearch(whereSB, params, "region.regioncode",
//					"=", regioncode);
			if (null != entids && !"".equals(entids)) {
				SearchUtil.getInSearch(whereSB, params, "entid", "not in",
						entids);
			}
			QueryResult<EntpriseInfo> q = entpriseInfoManager.getQueryResult(
					startIndex, maxIndex, whereSB.toString(), params.toArray(),
					orderby);// .getResultlist();

			long total = q.getTotalrecord();
			List<Map<String, Object>> rowData = new ArrayList<Map<String, Object>>();
			List<EntpriseInfo> entpriseInfoList = q.getResultlist();
			// jquery easyui 需要返回的结果集
			for (EntpriseInfo entInfo : entpriseInfoList) {

				// 列表要显示的字段及值
				Map<String, Object> map = new HashMap<String, Object>();
				map.put("entid", entInfo.getEntid());
				map.put("entname", entInfo.getEntname() != null ? entInfo
						.getEntname() : "");
				map.put("region", entInfo.getRegion() != null ? entInfo
						.getRegion().getRegionname() : "");
				map.put("pollutionsourcetype",
						entInfo.getPollutionsourcetype() != null ? entInfo
								.getPollutionsourcetype().getSourcetypename()
								: "");
				map.put("scale", entInfo.getScale() != null ? entInfo
						.getScale().getScalename() : "");
				map.put("address", entInfo.getAddress() != null ? entInfo
						.getAddress() : "");
				map.put("linkman", entInfo.getLinkman() != null ? entInfo
						.getLinkman() : "");
				map.put("telphone", entInfo.getTelphone() != null ? entInfo
						.getTelphone() : "");
				map.put("appinfoname", entInfo.getAppinfo()==null?"":
					entInfo.getAppinfo().getAppinfoname()==null?"":entInfo.getAppinfo().getAppinfoname());
				rowData.add(map);
			}
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("total", total);// jquery easyui 需要的总记录数
			map.put("rows", rowData);// jquery easyui 需要的结果集

			String resultJson = JSONObject.fromObject(map).toString();

			getResponse().getWriter().write(resultJson);// 将结果输出到页面
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	/**
	 * 保存实体，在保存之前度名字进行判断是否存在
	 */
	@Override
	public String save() throws Exception {
		try {
			if (entity.getEntid() != null && !entity.getEntid().equals("")) {
				if (flagName.equals(equalsName)) {
					saveEntity();
					sendMsg("success");
				} else {
					boolean flag = entpriseInfoManager
							.getEntityByName(equalsName);
					if (flag) {
						sendMsg("exist");
					} else {
						saveEntity();
						sendMsg("success");
					}
				}
			} else {
				boolean flag = entpriseInfoManager.getEntityByName(equalsName);
				if (flag) {
					sendMsg("exist");
				} else {
					String entid = entpriseInfoManager
							.getSequence("SEQ_ENTERPRISE");
					entity.setEntid(entid);
					saveEntity();
					sendMsg("success");
				}
			}
		} catch (Exception e) {
			sendMsg("fail");
		}
		return null;
	}

	/**
	 * 保存实体里的属性
	 */
	public void saveEntity() {
		if (null != getScale().getScalecode()
				&& !"".equals(getScale().getScalecode())) {
			entity.setScale(scaleManager.getScaleByScalecode(getScale()
					.getScalecode()));
		}
//		if (null != getIndustry().getIndustrytypecode()
//				&& !"".equals(getIndustry().getIndustrytypecode())) {
//			entity.setIndustry(industryManager
//					.getIndustryByIndustrytypecode(getIndustry()
//							.getIndustrytypecode()));
//		}
		if (null != getRegion().getRegioncode()
				&& !"".equals(getRegion().getRegioncode())) {
			entity.setRegion(regionManager.get(getRegion().getRegioncode()));
		}
		if (null != getProvince().getRegioncode()
				&& !"".equals(getProvince().getRegioncode())) {
			entity
					.setProvince(regionManager.get(getProvince()
							.getRegioncode()));
		}
		if (null != getCity().getRegioncode()
				&& !"".equals(getCity().getRegioncode())) {
			entity.setCity(regionManager.get(getCity().getRegioncode()));
		}
//		if (null != getRegistertype().getRegistertypecode()
//				&& !"".equals(getRegistertype().getRegistertypecode())) {
//			entity.setRegistertype(registertypeManager
//					.getRegistertypeByRegistertypecode(getRegistertype()
//							.getRegistertypecode()));
//		}
		if (null != getPollutionsourcetype().getSourcetypecode()
				&& !"".equals(getPollutionsourcetype().getSourcetypecode())) {
			entity
					.setPollutionsourcetype(pollutionsourcetypeManager
							.getPollutionsourcetypeBySourcetypecode(getPollutionsourcetype()
									.getSourcetypecode()));
		}
//		if (null != getAttention().getDinfoid()
//				&& !"".equals(getAttention().getDinfoid())) {
//			entity.setAttention(entpriseInfoManager
//					.getDictionaryinfo(getAttention().getDinfoid()));
//		}

		/*
		 * Userinfo user = userInfoManager.get(userids); if (user != null) {
		 * entity.setUserinfo(user); }
		 */

		entity.setEntname(equalsName);
		entpriseInfoManager.addOrUpdateEntpriseInfo(entity);

		// 向日志表中插入数据************开始
		SessionUser session = getSessionUser();
		String operatecontent = "添加了企业id为" + entity.getEntid() + "的记录";
		systemlogManager.addSystemLog(session.getModule(), session.getUserid(),
				operatecontent);
		// **********************结束

	}

	/**
	 * ajax调用，返回省份的json串
	 */
	public void getAllProvince() {
		try {
			getResponse().setContentType("text/html");
			getResponse().getWriter().write(
					regionManager.getJsonCityOrRegion("0"));
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	/**
	 * ajax调用，返回城市或行政区的json串
	 */
	public void getCityOrRegion() {
		try {
			getResponse().setContentType("text/html");
			getResponse().getWriter().write(
					regionManager.getJsonCityOrRegion(getRequest()
							.getParameter("parentregioncode")));
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	/**
	 * ajax调用，返回父id是"root"的行业类型的json串
	 */
	public void getAllIndustry() {
		try {
			getResponse().setContentType("text/html");
			getResponse().getWriter().write(
					industryManager.getIndustryJson("root"));
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	/**
	 * ajax调用，返回子行业类型的json串
	 */
	public void getAllSubIndustry() {
		try {
			getResponse().setContentType("text/html");
			getResponse().getWriter().write(
					industryManager.getIndustryJson(getRequest().getParameter(
							"parenttypecode")));
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	public String inputIndustry() throws Exception {
		return "industry-input";
	}

	/**
	 * 重写doInputEntity()方法 在进入添加和修改页面的时候将 企业规模实体 查出所有行业类型实体 登记注册类型实体 污染源类型实体查出来
	 */
	@Override
	protected void doInputEntity() throws Exception {
		scaleList = scaleManager.getAllScaleOrderByScalecode();// 所有企业规模实体
//		industryList = industryManager.getAllIndustry();// 返回父id是"root"的行业类型的json串
//		registertypeList = registertypeManager.getAllRegistertype();// 得所有登记注册类型实体
		registertypeList = new ArrayList<Registertype>();
		dictionaryinfoList = entpriseInfoManager.getAllDictionaryinfo();
		appList = appinfoManager.getAll();
		if (registertypeList != null && registertypeList.size() > 0) {
			int a = 0;
			for (int i = 0; i < registertypeList.size(); i++) {
				if (registertypeList.get(i).getRegistertypecode().equals("190")) {
					a = i;
				}
			}
			Collections.swap(registertypeList, a, 0);
		}
		pollutionsourcetypeList = pollutionsourcetypeManager
				.getAllPollutionsourcetypeOrderby();// 得所有污染源类型实体
		if (pollutionsourcetypeList != null
				&& pollutionsourcetypeList.size() > 0) {
			int a = 0;
			int b = 0;
			for (int i = 0; i < pollutionsourcetypeList.size(); i++) {
				if (pollutionsourcetypeList.get(i).getSourcetypecode().equals(
						"001")) {
					b = i;
				}
				if (pollutionsourcetypeList.get(i).getSourcetypecode().equals(
						"003")) {
					a = i;
				}
			}
			Collections.swap(pollutionsourcetypeList, b, a);
		}
	}

	/**
	 * 重写doViewEntity()方法
	 */
	@Override
	protected void doViewEntity() throws Exception {

		scaleList = scaleManager.getAllScaleOrderByScalecode();
//		industryList = industryManager.getAllIndustry();
//		registertypeList = registertypeManager.getAllRegistertype();
		registertypeList = new ArrayList<Registertype>();
		pollutionsourcetypeList = pollutionsourcetypeManager
				.getAllPollutionsourcetypeOrderby();
		dictionaryinfoList = entpriseInfoManager.getAllDictionaryinfo();
	}

	/**
	 * 数据删除
	 * 
	 * @throws IOException
	 * @throws Exception
	 */
	public void deleteEntpriseInfo() throws IOException {
		boolean flag = entpriseInfoManager.deleteEntpriseInfo(json,
				getSessionUser());
		if (flag) {
			sendMsg("success");
		} else {
			sendMsg("error");
		}
	}
	
	/**
	 * 跳转到App页面
	 * @return
	 */
	public String toApppage(){
		return "toApppage";
	}

	public List<Scale> getScaleList() {
		return scaleList;
	}

	public void setScaleList(List<Scale> scaleList) {
		this.scaleList = scaleList;
	}

	public List<Industry> getIndustryList() {
		return industryList;
	}

	public void setIndustryList(List<Industry> industryList) {
		this.industryList = industryList;
	}

	public List<Registertype> getRegistertypeList() {
		return registertypeList;
	}

	public void setRegistertypeList(List<Registertype> registertypeList) {
		this.registertypeList = registertypeList;
	}

	public List<Pollutionsourcetype> getPollutionsourcetypeList() {
		return pollutionsourcetypeList;
	}

	public void setPollutionsourcetypeList(
			List<Pollutionsourcetype> pollutionsourcetypeList) {
		this.pollutionsourcetypeList = pollutionsourcetypeList;
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

	public String getJson() {
		return json;
	}

	public void setJson(String json) {
		this.json = json;
	}

	public Region getProvince() {
		return province;
	}

	public void setProvince(Region province) {
		this.province = province;
	}

	public Registertype getRegistertype() {
		return registertype;
	}

	public void setRegistertype(Registertype registertype) {
		this.registertype = registertype;
	}

	public Pollutionsourcetype getPollutionsourcetype() {
		return pollutionsourcetype;
	}

	public void setPollutionsourcetype(Pollutionsourcetype pollutionsourcetype) {
		this.pollutionsourcetype = pollutionsourcetype;
	}

	public Industry getIndustry() {
		return industry;
	}

	public void setIndustry(Industry industry) {
		this.industry = industry;
	}

	public Scale getScale() {
		return scale;
	}

	public void setScale(Scale scale) {
		this.scale = scale;
	}

	public Region getRegion() {
		return region;
	}

	public void setRegion(Region region) {
		this.region = region;
	}

	public Region getCity() {
		return city;
	}

	public void setCity(Region city) {
		this.city = city;
	}

	public String getEntids() {
		return entids;
	}

	public void setEntids(String entids) {
		this.entids = entids;
	}

	public String getUserids() {
		return userids;
	}

	public void setUserids(String userids) {
		this.userids = userids;
	}

	public String getRegioncode() {
		return regioncode;
	}

	public void setRegioncode(String regioncode) {
		this.regioncode = regioncode;
	}

	public List<Dictionaryinfo> getDictionaryinfoList() {
		return dictionaryinfoList;
	}

	public void setDictionaryinfoList(List<Dictionaryinfo> dictionaryinfoList) {
		this.dictionaryinfoList = dictionaryinfoList;
	}

	public Dictionaryinfo getAttention() {
		return attention;
	}

	public void setAttention(Dictionaryinfo attention) {
		this.attention = attention;
	}


	public String getEntname() {
		return entname;
	}


	public void setEntname(String entname) {
		this.entname = entname;
	}


	public String getSourcetype() {
		return sourcetype;
	}


	public void setSourcetype(String sourcetype) {
		this.sourcetype = sourcetype;
	}


	public List<Appinfo> getAppList() {
		return appList;
	}


	public void setAppList(List<Appinfo> appList) {
		this.appList = appList;
	}

}
