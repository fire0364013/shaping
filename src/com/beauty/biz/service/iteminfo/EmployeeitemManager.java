package com.beauty.biz.service.iteminfo;

import java.util.LinkedHashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.beauty.biz.dao.iteminfo.EmployeeitemDao;
import com.beauty.biz.entity.beautyinfo.Employeeitem;
import com.beauty.common.page.QueryResult;

@Service
@Transactional
public class EmployeeitemManager {

	@Autowired
	private EmployeeitemDao employeeitemDao;
	
	/**
	 * 去往list页面 和条件查询
	 */
	public QueryResult<Employeeitem> getQueryResult(int startIndex,
			int maxResult, String whereJPQL, Object[] params,
			LinkedHashMap<String, String> orderby) throws Exception {
		return employeeitemDao.getScrollData(startIndex, maxResult, whereJPQL,params, orderby);
	}

	/**
	 * 
	 * 
	 * @throws Exception
	 */
	public Employeeitem getById(String id) {
		return employeeitemDao.get(id);
	}
	
	 /**
	  * 保存
	  */
	public void save(Employeeitem employeeitem){
		employeeitemDao.save(employeeitem);
	}
	
	public String getId(){
		return employeeitemDao.getId();
	}
	
	/**
	 * 查询功能
	 */
	public boolean ishaveitemByuse(String itemid,String employee){
		List<Employeeitem> list = employeeitemDao.createQuery(" from Employeeitem e where e.employeeid.employeeinfoid = ? and e.itemid.itemid = ? and validstatus = '1' ", employee,itemid).list();
		boolean flag = true;
		if(list.size()>0){
			flag = false;
		}else{
			flag = true;
		}
		return flag;
	}
}
