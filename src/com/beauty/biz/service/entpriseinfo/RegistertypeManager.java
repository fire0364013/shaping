package com.beauty.biz.service.entpriseinfo;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.beauty.biz.dao.entpriseinfo.RegistertypeDao;
import com.beauty.biz.entity.entpriseinfo.Registertype;

@Service
@Transactional
public class RegistertypeManager {
	@Autowired
	private RegistertypeDao registertypeDao;

	/**
	 * 获得所有登记注册类型实体
	 * */
	public List<Registertype> getAllRegistertype() {
		String hql = "select o from Registertype o order by registertypecode";
		List<Registertype> list = registertypeDao.createQuery(hql).list();
		return list;
	}

	/**
	 * 获得登记注册类型实体
	 * 
	 * @param registertypecode
	 *            登记注册类型编号
	 */
	public Registertype getRegistertypeByRegistertypecode(
			String registertypecode) {
		return registertypeDao.get(registertypecode);
	}

}
