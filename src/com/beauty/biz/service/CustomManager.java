package com.beauty.biz.service;

import java.util.LinkedHashMap;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.beauty.biz.dao.CustomDao;
import com.beauty.biz.dao.DepartmentinfoDao;
import com.beauty.biz.dao.EmployeeinfoDao;
import com.beauty.biz.dao.SystemlogDao;
import com.beauty.biz.entity.Custom;
import com.beauty.biz.entity.Departmentinfo;
import com.beauty.biz.entity.Employeeinfo;
import com.beauty.common.page.QueryResult;
import com.beauty.common.utils.SessionUser;

@Service
@Transactional
public class CustomManager {
	@Autowired
	private CustomDao customDao;

	@Autowired
	private DepartmentinfoDao departmentinfoDao;
	
	@Autowired
	private SystemlogDao systemlogDao;

	/*
	 * left join 做链接查询
	 */
	public QueryResult<Object[]> getScrollDateByHQL(int startIndex,
			int maxResult, String searchField, String fromSQL, String whereSQL,
			Object[] params, LinkedHashMap<String, String> orderby)
			throws Exception {
		return customDao.getScrollDataByHQL(startIndex, maxResult,
				searchField, fromSQL, whereSQL, params, orderby);
	}

	/*
	 * 单个实体查询
	 */
	public QueryResult<Custom> getQueryResult(int startIndex,
			int maxResult, String whereJPQL, Object[] params,
			LinkedHashMap<String, String> orderby) throws Exception {
		return customDao.getScrollData(startIndex, maxResult, whereJPQL,
				params, orderby);
	}

	/**
	 * 获得部门信息 排序 根据排序字段 排序
	 * 
	 * @return
	 */
	public List<Departmentinfo> getAll() {
		List<Departmentinfo> departList = departmentinfoDao.getAllOrderBy();
		return departList;

	}

	/**
	 * 获得部门信息
	 * 
	 * @return
	 */
	public List<Object[]> getEmpleList() {
		List<Object[]> departList = customDao.getAllById();
		return departList;

	}

	/**
	 * 单条删除
	 */
	public void deleteOnlyOne(HttpServletRequest request) {
		String s = request.getParameter("id");
		Custom cs = customDao.get(s);
		if(cs!=null)
		{
			cs.setStatus("0");
			customDao.save(cs);
		}
//		customDao.delete(s);
	}

	/**
	 * 批量删除的时候~
	 * 
	 * @param id
	 */
	public void batchDelete(HttpServletRequest request) {
		String str = request.getParameter("id");
		String[] arrId = str.split(",");
		for (String s : arrId) {
			try {
				customDao.delete(s);
			} catch (Exception e) {
				e.printStackTrace();
			}
		}

	}

	/**
	 * 这个方法是被userinfo里面的批量删除使用 与数据库的连接方法是自己写的，因为不是按主键删除
	 * 
	 * @param ids
	 *            批量删除
	 */
	public void deleteAll(String ids) {
		String[] usersid = ids.split(",");
		for (int i = 0; i < usersid.length; i++) {
			customDao.deleteuser(usersid[i]);
		}
	}

	/**
	 * 保存人员信息
	 */
	public void saveUpdate(Custom entity) {
		customDao.save(entity);
	}

	/**
	 * 获得分析参数编号的序列
	 */
	public String getSeq(String sequenceName) {
		return customDao.getSequence(sequenceName);
	}
	
	public void addLog(String customid, SessionUser sessionUser,
			String operate) {
		String operatecontent = operate + "了客户编码为" + customid + "的记录";
		systemlogDao.addSystemLog(sessionUser.getModule(), sessionUser
				.getUserid(), operatecontent);
	}	

}
