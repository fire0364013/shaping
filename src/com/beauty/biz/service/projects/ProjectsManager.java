package com.beauty.biz.service.projects;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.hibernate.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.beauty.biz.dao.SystemlogDao;
import com.beauty.biz.dao.UserInfoDao;
import com.beauty.biz.entity.Userinfo;
import com.beauty.common.page.QueryResult;
import com.beauty.common.utils.SessionUser;
import com.beauty.biz.dao.entpriseinfo.EntpriseInfoDao;
import com.beauty.biz.dao.entpriseinfo.PollutionsourcetypeDao;
import com.beauty.biz.dao.entpriseinfo.RegionDao;
import com.beauty.biz.dao.iteminfo.IteminfoDao;
import com.beauty.biz.dao.projects.ProjectDetailDao;
import com.beauty.biz.dao.projects.ProjectitemDao;
import com.beauty.biz.dao.projects.ProjectsDao;
import com.beauty.biz.dao.projects.ProjectsamplefeeDao;
import com.beauty.biz.dao.projects.ProjectsampleitemDao;
import com.beauty.biz.entity.entpriseinfo.EntpriseInfo;
import com.beauty.biz.entity.entpriseinfo.Pollutionsourcetype;
import com.beauty.biz.entity.entpriseinfo.Region;
import com.beauty.biz.entity.iteminfo.Iteminfo;
import com.beauty.biz.entity.projects.Projectdetail;
import com.beauty.biz.entity.projects.Projectitem;
import com.beauty.biz.entity.projects.Projects;
import com.beauty.biz.entity.projects.Projectsamplefee;
import com.beauty.biz.entity.projects.Projectsampleitem;
import com.beauty.biz.entity.projects.Subcontract;

@Service
@Transactional
public class ProjectsManager {
	@Autowired
	private ProjectsDao projectsDao;
	@Autowired
	private RegionDao regionDao;
	@Autowired
	private PollutionsourcetypeDao pollutionsourcetypeDao;
	@Autowired
	private ProjectDetailDao projectDetailDao;
	@Autowired
	private EntpriseInfoDao entpriseInfoDao;
	@Autowired
	private SystemlogDao systemlogDao; // 系统日志
	@Autowired
	private IteminfoDao itemInfoDao;
	@Autowired
	private ProjectitemDao projectItemDao;
	@Autowired
	private ProjectsampleitemDao projectsampleitemDao;
	@Autowired
	private ProjectDetailDao projectdetailDao;
	@Autowired
	private UserInfoDao userInfoDao;
	@Autowired
	private ProjectsamplefeeDao projectsamplefeeDao;

	public void addProjectItems(Projects project, String items) {
		String[] arr = items.split(",");
		try {
			projectItemDao
					.createUpdateBySQL(
							"delete Projectitem o where o.projectcode = ?",
							project.getProjectcode());
			Float sumfee = 0.0f;
			for (String s : arr) {
				Projectitem pi = new Projectitem();
				Iteminfo i = itemInfoDao.get(s);
				String id = projectItemDao.getSequence("SEQ_PROJECTITEM");
				pi.setProjectitemid(id);
				pi.setProjectcode(project.getProjectcode());
				pi.setItemtype(i.getMonitoritemtype());
				pi.setItem(i);
				pi.setItemfee(i.getStandfee());
				if(i.getStandfee()!=null)
				{
					sumfee=sumfee+Float.valueOf(i.getStandfee());
				}
				
				projectItemDao.save(pi);
			}
			project.setDetectionfee(String.valueOf(sumfee));
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	public List<Projectitem> getItemsByProject(String projectcode) {
		return projectItemDao.getListByProjectcode(projectcode);
	}

	public Map<String, Object> getProjectItems(String projectcode) {
		Map<String, Object> map = new HashMap<String, Object>();
		String itemNames = "";
		String itemIds = "";
		try {
			List<Projectitem> piList = projectsDao
					.createQuery(
							"from Projectitem o where o.projectcode  = ? order by o.item.orderid",
							projectcode).list();
			for (Projectitem pi : piList) {
				itemIds = itemIds + pi.getItem().getItemid() + ",";
				itemNames = itemNames + pi.getItem().getItemname() + ",";
			}
			map.put("itemid", itemIds.substring(0, itemIds.length() - 1));
			map.put("itemname", itemNames.substring(0, itemNames.length() - 1));
		} catch (Exception e) {
			e.printStackTrace();
		}
		return map;
	}

	public String getPollutionSourceType() {
		List<Pollutionsourcetype> list = pollutionsourcetypeDao.getAll();
		List<Map<String, Object>> rowsData = new ArrayList<Map<String, Object>>();
		for (Pollutionsourcetype p : list) {
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("sourceid", p.getSourcetypecode());
			map.put("sourcename", p.getSourcetypename());
			rowsData.add(map);
		}
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("rowsData", rowsData);

		String first = JSONArray.fromObject(map).toString();
		String jsonStr = first.substring(1, first.length() - 1);
		return jsonStr;
	}
	//环境、污染源
	@SuppressWarnings("unchecked")
	public String getPollutionSourceType(String monitortypeid) {
		List<Pollutionsourcetype> list = null;
		if(monitortypeid.equals("1")){//污染源
			list = pollutionsourcetypeDao.createQuery("from Pollutionsourcetype p where p.sourcetypename like ?", "%污染源%").list();
		}else if(monitortypeid.equals("2")){
			list = pollutionsourcetypeDao.createQuery("from Pollutionsourcetype p where p.sourcetypename not like ?", "%污染源%").list();
		}
		List<Map<String, Object>> rowsData = new ArrayList<Map<String, Object>>();
		for (Pollutionsourcetype p : list) {
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("sourceid", p.getSourcetypecode());
			map.put("sourcename", p.getSourcetypename());
			rowsData.add(map);
		}
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("rowsData", rowsData);

		String first = JSONArray.fromObject(map).toString();
		String jsonStr = first.substring(1, first.length() - 1);
		return jsonStr;
	}

	public String getJsonCityOrRegion(String parentregioncode) {
		List<Region> regionList = regionDao.getAllRegion(parentregioncode);
		List<Map<String, Object>> rowsData = new ArrayList<Map<String, Object>>();
		for (Region r : regionList) {
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("regioncode", r.getRegioncode());
			map.put("regionname", r.getRegionname());
			rowsData.add(map);
		}
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("rowsData", rowsData);

		String first = JSONArray.fromObject(map).toString();
		String jsonStr = first.substring(1, first.length() - 1);
		return JSONObject.fromObject(jsonStr).toString();
	}


	public EntpriseInfo getEntpriseinfo(String id) {
		EntpriseInfo entinfo = entpriseInfoDao.get(id);
		return entinfo;
	}


	public QueryResult<Projects> getQueryResult(int startIndex, int maxResult,
			String whereJPQL, Object[] params,
			LinkedHashMap<String, String> orderby) throws Exception {
		return projectsDao.getScrollData(startIndex, maxResult, whereJPQL,
				params, orderby);
	}

	public String getSequence(String sequenceName) {
		return projectsDao.getSequence(sequenceName);
	}

	public Projects getProjects(String id) {
		return projectsDao.get(id);
	}

	public Query createQuery(String hql, Object... values) {
		return projectsDao.createQuery(hql, values);
	}

	public boolean deletePorject(String projectcode) {
		boolean flag = false;
		if (null != projectcode && !"".equals(projectcode)) {
			projectsDao.delete(projectcode);

			projectsDao
					.createUpdateBySQL(
							"delete Projectitem o where o.projectcode = ?",
							projectcode);
			flag = true;
		}
		return flag;
	}

	
	
	public void addLog(String projectcode, SessionUser sessionUser,
			String operate) {
		String operatecontent = operate + "了任务编码为" + projectcode + "的记录";
		systemlogDao.addSystemLog(sessionUser.getModule(), sessionUser
				.getUserid(), operatecontent);
	}

	public void save(Projects pro) {
		projectsDao.save(pro);
	}

	@SuppressWarnings("unchecked")
	public boolean updateStatus(String projectcode, String status, SessionUser user, String opinion,String userid)
			throws RuntimeException {
		try {
			Userinfo userinfo = userInfoDao.get(user
					.getUserid());
			Projects pro = projectsDao.get(projectcode);
			// 任务签发后，生成真实编号
			//通过比较要变为的流程状态来支持跳转节点
			if (null != pro.getStatus()
					&& ("TaskApprove".equals(status)||"TaskApprove1".equals(status)||"TaskApprove2".equals(status)||"SamplingSet".equals(status)||"SampeReceive".equals(status))
					&& (opinion == null || "".equals(opinion))) {
//				// 外委任务需要根据月份和企业来生成子任务数据
//				if ("TaskApprove2".equals(pro.getStatus())&&pro.getMonitortype().getMonitortypecode().equals("100")&&Double.parseDouble(pro.getDetectionfee())>50) {
//					
//					pro.setTaskdowndate(new Date());
//					pro.setProjectrealcode(createTaskCode(pro));
//					List<Projectdetail> detailList = projectsDao
//							.createNativeQuery(
//									"from Projectdetail o where o.projectcode = ?",
//									projectcode).list();
//					// 如果委托任务存在多个月份或多个企业，则需要拆分子任务
//					if (pro.getMonitormonth().indexOf(",") >= 0
//							|| detailList.size() > 1) {
//						String[] monitormonths = pro.getMonitormonth().split(
//								",");
//						//首先根据月份循环
//						for (int i = 0; i < monitormonths.length; i++) {
//							String month = monitormonths[i];
//							for (Projectdetail detail : detailList) {
//								// 子任务的真实任务编号
//								String projectrealcode = pro
//										.getProjectrealcode()
//										+ "-"
//										+ month
//										+ "-"
//										+ detail.getEnt().getEntid();
//								this.copyProject2Sub(projectcode,
//										month, detail.getEnt()
//												.getEntid(),projectrealcode, userinfo,status);
//							}
//						}
//					}
//				}else if(("TaskApprove".equals(pro.getStatus())||"TaskApprove1".equals(pro.getStatus()))&&pro.getMonitortype().getMonitortypecode().equals("100")&&Double.parseDouble(pro.getDetectionfee())>50){
//				}else{
//					pro.setTaskdowndate(new Date());
//					pro.setProjectrealcode(createTaskCode(pro));
//				}
//			}
//			
			}
			if(userid!=null){
				pro.setNextAuditPerson(userid);
			}
			pro.setStatus(status);
			projectsDao.save(pro);
			projectsDao
					.createUpdateBySQL(
							"update Projectdetail o set o.status = ? where o.projectcode = ?",
							status, projectcode);
			projectsDao
			.createUpdateBySQL(
					"update Projectmonitorpoint o set o.status = ? where o.project.projectcode = ?",
					status, projectcode);			
			return true;
		} catch (Exception e) {
			throw new RuntimeException(e.getMessage());
		}
	}
	
	@SuppressWarnings("unchecked")
	public boolean updateStatusNew(String projectcode, String status, SessionUser user, String opinion,String userid)
			throws RuntimeException {
		try {
			Userinfo userinfo = userInfoDao.get(user
					.getUserid());
			Projects pro = projectsDao.get(projectcode);
			// 任务签发后，生成真实编号
			if(userid!=null){
				pro.setNextAuditPerson(userid);
			}
			pro.setStatus(status);
			projectsDao.save(pro);
			projectsDao
					.createUpdateBySQL(
							"update Projectdetail o set o.status = ? where o.projectcode = ?",
							status, projectcode);
			projectsDao
			.createUpdateBySQL(
					"update Projectmonitorpoint o set o.status = ? where o.project.projectcode = ?",
					status, projectcode);			
			return true;
		} catch (Exception e) {
			throw new RuntimeException(e.getMessage());
		}
	}	

	public String createTaskCode(String mtCode) {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy");
		String strDate = sdf.format(new java.util.Date());
		String strCode = "FS" + strDate;
		String newCode = "";

		List<String> proList = projectsDao
				.createQuery(
						"select p.projectrealcode from Projects p where p.monitortype.monitortypecode = ? and p.projectrealcode is not null order by p.projectrealcode desc",
						mtCode).list();
		if (null != proList && proList.size() > 0) {
			String strTemp = proList.get(0);
			if ("100".equals(mtCode)) {
				String wtCode = strTemp.substring(6, 9);
				strCode = strCode + (Integer.parseInt(wtCode) + 1);
			} else {
				strCode = strCode + mtCode;
			}
			strTemp = strTemp.substring(9, strTemp.length());
			int proCount = Integer.parseInt(strTemp);
			if (proCount >= 1 && proCount <= 9) {
				proCount = proCount + 1;
				newCode = strCode + "00" + proCount;
			} else if (proCount >= 10 && proCount <= 99) {
				proCount = proCount + 1;
				newCode = strCode + "0" + proCount;
			} else {
				proCount = proCount + 1;
				newCode = strCode + proCount;
			}
		} else {
			newCode = strCode + "101" + "001";
		}
		return newCode;
	}
	
	public String createTaskCode(Projects pro) {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");
		String strDate = sdf.format(new java.util.Date());
		String strCode = "" ;
		String newCode = "";
		String mtCode = "";
		if ("100".equals(mtCode)||"004".equals(mtCode)) {// 委托监测、比对
			//外委任务编号格式为：任务性质代码、年份、流水号、流水号的分号、流水号分号的次级分号，具体格式为：×× ×× ×××―××―××
			// 主任务编号
			strCode =strDate.substring(0, 4);
			List<String> proList = projectsDao
					.createQuery(
							"select p.projectrealcode from Projects p where p.projectrealcode like '"+strCode+"%' and p.projectrealcode is not null and p.parentprojectcode is null order by p.projectrealcode desc").list();
			if (null != proList && proList.size() > 0) {
				String strTemp = proList.get(0);
				System.err.println("strTemp===="+strTemp);
				String wtCode = strTemp.substring(6, 10);
				System.err.println("wtCode===="+wtCode);
				int proCount = Integer.parseInt(wtCode);
				if (proCount >= 0 && proCount < 9) {
					proCount = proCount + 1;
					newCode = strCode + "000" + proCount;
				} else if (proCount >= 9 && proCount < 99) {
					proCount = proCount + 1;
					newCode = strCode + "00" + proCount;
				} else if (proCount >= 99 && proCount < 999) {
					proCount = proCount + 1;
					newCode = strCode + "0" + proCount;
				} else {
					proCount = proCount + 1;
					newCode = strCode + proCount;
				}
			} else {
				newCode = strCode + "0001";
			}
		}
		return newCode;
	}

	public QueryResult<Projects> getScrollDataByHQL(int startIndex,
			int maxResult, String searchField, String fromSQL, String whereSQL,
			Object[] params, LinkedHashMap<String, String> orderby)
			throws Exception {
		return projectsDao.getEntityByHQL(startIndex, maxResult, searchField,
				fromSQL, whereSQL, params, orderby);
	}

	/**
	 * 根据code获取实体
	 * 
	 * @param startCode
	 * @return
	 */
	public List<Projects> getProjectByCode(String startCode) {
		return projectsDao.getProjectByCode(startCode);
	}

	/**
	 * 根据projecrcode获取实体
	 * 
	 * @param projecrcode
	 * @return
	 */
	public Projects getProjectByProjectcode(String projectcode) {
		return projectsDao.getProjectByProjectcode(projectcode);
	}

	/*
	 * 根据HQL查询实体
	 */
	public QueryResult<Projects> getEntityByHQL(int startIndex, int maxResult,
			String searchField, String fromSQL, String whereSQL,
			Object[] params, LinkedHashMap<String, String> orderby)
			throws Exception {
		return projectsDao.getEntityByHQL(startIndex, maxResult, searchField,
				fromSQL, whereSQL, params, orderby);
	}


	/*
	 * SQL查询
	 */
	public QueryResult<Projects> getQueryResultBySQL(int startIndex,
			int maxResult, String whereJPQL, Object[] params,
			LinkedHashMap<String, String> orderby) throws Exception {
		return projectsDao.getScrollDateBySQL(startIndex, maxResult, whereJPQL,
				params, orderby);
	}
	
	/**
	 * 根据主任务编号查询子任务
	 * 
	 * @param parentProjectCode
	 *            主任务编号
	 * @return
	 */
	public List<Projects> getProjectByParentCode(String parentProjectCode) 
	{
		return projectsDao.getProjectByParentCode(parentProjectCode);
	}
	
	/**
	 * 根据SQL查询
	 * 
	 * @param sql
	 *            sql语句
	 * @param values
	 *            参数值
	 * @return
	 */
	public Query queryList(String sql, Object... values) {
		return projectsDao.createNativeQuery(sql, values);
	}	
	
	public boolean updateBackStatus(String projectcode, String status, SessionUser user, String opinion,String userid)
	throws RuntimeException {
			try {
				Projects pro = projectsDao.get(projectcode);
				pro.setStatus(status);
				projectsDao.save(pro);
				projectsDao
						.createUpdateBySQL(
								"update Projectdetail o set o.status = ? where o.projectcode = ?",
								status, projectcode);
				projectsDao
				.createUpdateBySQL(
						"update Projectmonitorpoint o set o.status = ? where o.project.projectcode = ?",
						status, projectcode);				
				return true;
			}catch (Exception e) {
				throw new RuntimeException(e.getMessage());
			}
	}
	
	
	/**
	 * 根据字符串，去重复
	 * 
	 * @param list
	 * @return
	 */
	public List<String> toRepeat(List<String> list) {
		int len = list.size();
		for (int i = 0; i < len - 1; i++) {
			String si = list.get(i);
			if (si != null) {
				for (int j = i + 1; j < len; j++) {
					if (list.get(i).equals(list.get(j))) {
						list.remove(j);
						j--;
						len--;
					}
				}
			} else {
				for (int j = i + 1; j < len; j++) {
					if (list.get(j) == null) {
						list.remove(j);
						j--;
						len--;
					}
				}
			}
		}
		return list;
	}
	
}