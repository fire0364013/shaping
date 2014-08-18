package com.beauty.biz.dao.projects;

import java.util.List;

import org.hibernate.Query;
import org.springframework.stereotype.Repository;

import com.beauty.common.orm.hibernate3.HibernateDao;
import com.beauty.biz.entity.projects.Projects;

@Repository
public class ProjectsDao extends HibernateDao<Projects> {

	/**
	 * 根据projecrcode获取实体
	 * 
	 * @param projecrcode
	 * @return
	 */
	public Projects getProjectByProjectcode(String projectcode) {
		Query query = createQuery("from Projects p where p.projectcode = ? ",
				projectcode);
		return (Projects) query.uniqueResult();
	}

	public void updateProjects(Projects p) {
		getSession().update(p);
	}

	/**
	 * 获得序列值
	 * 
	 * @param sequenceName
	 *            :序列名称 :"SEQ_PROJECTS"
	 * 
	 */
	public String getSequence(String sequenceName) {
		return super.getSequence(sequenceName);
	}

	/**
	 * 通过任务编码的开始字符查询最大的编码
	 * 
	 */
	@SuppressWarnings("unchecked")
	public List<String> getProjectsByContractno(String startCode) {
		Query query = createQuery(
				"select p.contractno from Projects p where p.contractno like ? order by p.contractno desc",
				"" + startCode + "%");
		List<String> proList = (List<String>) query.list();
		return proList;
	}

	/**
	 * 通过任务编码的开始字符查询最大的编码
	 * 
	 */
	@SuppressWarnings("unchecked")
	public List<String> getProjectsByCode(String startCode) {
		Query query = createQuery(
				"select p.projectrealcode from Projects p where p.projectrealcode like ? order by p.projectrealcode desc",
				"" + startCode + "%");
		List<String> proList = (List<String>) query.list();
		return proList;
	}

	/**
	 * 查询企业的监测月份是否重复
	 */
	// @SuppressWarnings("unchecked")
	public boolean monitormonthIsRepeat(String monitoryear,
			String monitormonth, String entid, String monitortypeid,
			String projectcode) {
		Query query = createQuery(
				"select count(p) from Projects p where  p.monitoryear=? and p.monitormonth=? and p.jcEntprise.entid=? and p.monitortype.monitortypeid =? and p.projectcode like ?",
				new Integer(monitoryear), new Integer(monitormonth), entid,
				monitortypeid, "%" + projectcode + "%");
		// List<Object> proList = (List<Object>)query.list();
		Long l = (Long) query.uniqueResult();
		if (l == 0) {// proList.size()==0) {
			return false;
		} else {
			return true;
		}
	}

	/**
	 * 根据code获取实体
	 * 
	 * @param startCode
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public List<Projects> getProjectByCode(String startCode) {
		Query query = createQuery(
				"from Projects p where p.projectcode = ? order by projectcode asc",
				startCode);
		List<Projects> proList = (List<Projects>) query.list();
		return proList;
	}
	
	/**
	 * 根据主任务编号获取实体列表
	 * 
	 * @param parentProjectCode
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public List<Projects> getProjectByParentCode(String parentProjectCode) {
		Query query = createQuery(
				"from Projects p where p.parentprojectcode = ? order by to_number(monitormonth) asc",
				parentProjectCode);
		List<Projects> proList = (List<Projects>) query.list();
		return proList;
	}	

}
