package com.beauty.biz.web.systemlog;

import java.io.IOException;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import net.sf.json.JSONObject;

import org.apache.struts2.convention.annotation.Results;
import org.springframework.beans.factory.annotation.Autowired;

import com.beauty.biz.entity.Module;
import com.beauty.biz.entity.Systemlog;
import com.beauty.biz.entity.Userinfo;
import com.beauty.biz.service.ModuleManager;
import com.beauty.biz.service.SystemlogManager;
import com.beauty.biz.service.UserInfoManager;
import com.beauty.common.page.QueryResult;
import com.beauty.common.utils.SearchUtil;
import com.beauty.common.web.StrutsAction;
import com.ibm.icu.text.SimpleDateFormat;

/**
 * 系统日志action
 * 
 * @author lh
 * 
 */
@Results( {
// @Result(name="inceptlist",location="sampleitemincept-list.jsp"),

})
public class SystemlogAction extends StrutsAction<Systemlog> {
	/**
	 * 
	 */
	private static final long serialVersionUID = 100191877710350964L;

	@Autowired
	private SystemlogManager systemlogManager;
	private String rows;
	private String page;
	private String realname;
	private Timestamp startime;
	private Timestamp endtime;

	/**
	 * 查询出列表中所有数据 以及条件查询
	 * 
	 * @return
	 */
	public String toList() {
		// 当前第几页
		int intPage = Integer.parseInt((page == null || page == "0") ? "1"
				: page);
		// 每页多少行
		int maxIndex = Integer.parseInt((rows == null || rows == "0") ? "20"
				: rows);
		// 开始页
		int startIndex = (intPage - 1) * maxIndex;

		StringBuilder whereSB = new StringBuilder();
		List<Object> params = new ArrayList<Object>();
		LinkedHashMap<String, String> orderby = new LinkedHashMap<String, String>();
		orderby.put("operatetime", "desc");
		SearchUtil.getStringSearch(whereSB, params, "operationuser.realname",
				"like", this.realname);
		SearchUtil.getDateBetweenSearch(whereSB, params, "operatetime",
				startime, endtime);
		// ============================2：原生实体SQL==============================="
		QueryResult<Systemlog> q;
		try {
			q = systemlogManager.getQueryResult(startIndex, maxIndex, whereSB
					.toString(), params.toArray(), orderby);
			;// .getResultlist();
			// 总条数
			long total = q.getTotalrecord();
			List<Map<String, Object>> rowslist = new ArrayList<Map<String, Object>>();
			// QueryResult里封装的list
			List<Systemlog> logList = q.getResultlist();
			for (Systemlog systemlog : logList) {
				// 列表要显示的字段及值
				Map<String, Object> map = new HashMap<String, Object>();
				map.put("logid", systemlog.getLogid());// 操作日志id
				map.put("operationuser",
						systemlog.getOperationuser() != null ? systemlog
								.getOperationuser().getRealname() : "");// 操作人
				Timestamp operatetime = systemlog.getOperatetime();
				String tsStr = "";
				if (operatetime != null) {
					SimpleDateFormat sdf = new SimpleDateFormat(
							"yyyy年MM月dd日  HH时mm分ss秒");
					tsStr = sdf.format(operatetime);
				}
				map.put("operatetime", tsStr);// 操作时间

				map.put("moduleid", systemlog.getModuleid() != null ? systemlog
						.getModuleid().getModulename() : "");// 模块id
				map.put("operatecontent", systemlog.getOperatecontent());// 操作说明
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
	 * 删除
	 * 
	 * @throws Exception
	 */
	public void deleteEntity() throws Exception {
		systemlogManager.delete(id);
		sendMsg("success");
	}

	@Override
	protected void doViewEntity() throws Exception {
		Timestamp operatetime = entity.getOperatetime();
		SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String dateString = formatter.format(operatetime);
		getRequest().setAttribute("operatetime", dateString);
	}

	/**
	 * 保存系统日志
	 */
	/*
	 * public void saveSystemLog(){
	 * systemlogManager.addSystemLog(m.getModule("0803"), u.getUserInfo("100"),
	 * "222222"); }
	 */
	/**
	 * 清除所有日志
	 */
	public void deleteAllEntity() {
		try {
			systemlogManager.delectAllEntity();
			sendMsg("success");
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
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

	public String getRealname() {
		return realname;
	}

	public void setRealname(String realname) {
		this.realname = realname;
	}

	public Timestamp getStartime() {
		return startime;
	}

	public void setStartime(Timestamp startime) {
		this.startime = startime;
	}

	public Timestamp getEndtime() {
		return endtime;
	}

	public void setEndtime(Timestamp endtime) {
		this.endtime = endtime;
	}

}
