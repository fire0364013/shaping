package com.beauty.biz.service;

import java.util.LinkedHashMap;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.beauty.biz.dao.CertificateinfoDao;
import com.beauty.biz.dao.DepartmentinfoDao;
import com.beauty.biz.entity.Certificateinfo;
import com.beauty.biz.entity.Departmentinfo;
import com.beauty.common.page.QueryResult;

/**
 * 
 * @author wjy
 * 
 */
@Service
@Transactional
public class CertificateinfoManager {
	@Autowired
	private CertificateinfoDao certificateinfoDao;
	@Autowired
	private DepartmentinfoDao departmentinfoDao;

	public Certificateinfo getCertificateinfo(String hql) {
		return certificateinfoDao.getCertificateinfo(hql);
	}

	public List<Certificateinfo> getCertificateinfoList(String hql) {
		return certificateinfoDao.getCertificateinfoList(hql);
	}

	/*
	 * 单个实体查询
	 */
	public QueryResult<Certificateinfo> getQueryResult(int startIndex,
			int maxResult, String whereJPQL, Object[] params,
			LinkedHashMap<String, String> orderby) throws Exception {
		return certificateinfoDao.getScrollData(startIndex, maxResult,
				whereJPQL, params, orderby);
	}

	/**
	 * 获得部门信息
	 * 
	 * @return
	 */
	public List<Departmentinfo> getAll() {
		List<Departmentinfo> departList = departmentinfoDao.getAll();
		return departList;

	}

	/**
	 * 获得上岗证的数组
	 * 
	 * @return
	 */
	public List<Certificateinfo> getAllCert() {
		List<Certificateinfo> certList = certificateinfoDao.getAllList();
		return certList;
	}

	/**
	 * 人员上岗证
	 * 
	 * @param hql
	 * @param objects
	 * @return
	 */
	public List<Certificateinfo> getListByHQL(String hql, Object... objects) {
		List<Certificateinfo> certList = certificateinfoDao.getListByHQL(hql,
				objects);
		return certList;
	}

	/**
	 * 单条删除
	 */
	public void deleteOnlyOne(HttpServletRequest request) {
		String s = request.getParameter("id");
		certificateinfoDao.delete(s);
	}

	/**
	 * 批量删除的时候~
	 * 
	 * @param id
	 */
	public void batchDelete(String ids) {
		String[] certid = ids.split(",");
		for (int i = 0; i < certid.length; i++) {
			Certificateinfo cer = certificateinfoDao.get(certid[i]);
			// 根据逐渐去实体用来获得实体的itemid// methodid// userid
			// analysestaffinfoDao.deleteAnaly(cer.getUserinfo().getUserid(),
			// cer.getIteminfo().getItemid(), cer.getMethod().getMethodid());
			certificateinfoDao.delete(certid[i]);
		}
	}

	/**
	 * 保存实体的时候，保存当前上岗证的详细信息
	 * 
	 * @param cert
	 */
	public void saveUpdate(Certificateinfo cert) {
		certificateinfoDao.save(cert);
	}

	/**
	 * 获得上岗证人员id的序列
	 */
	public String getSeq(String sequenceName) {
		return certificateinfoDao.getSequence(sequenceName);
	}

	/**
	 * 批量删除的时候
	 * 
	 * @param ids
	 *            根据获得的主键值数组
	 */
	public void deleteAll(String ids) {
		String[] certid = ids.split(",");
		for (int i = 0; i < certid.length; i++) {
			certificateinfoDao.deletecert(certid[i]);
		}
	}

	/**
	 * 根据主键获得实体
	 * 
	 * @param 主键值
	 * @return
	 */
	public Certificateinfo getCert(String id) {
		Certificateinfo cert = certificateinfoDao.get(id);
		return cert;
	}

	/**
	 * 根据用户获得上岗证编号
	 * 
	 * @param userid
	 * @return
	 */
	public List<Certificateinfo> getCertByUserid(String userid) {
		return certificateinfoDao.getCertByUserid(userid);
	}

	/**
	 * 根据项目id获取实体
	 * 
	 * @param itemid
	 * @return
	 */
	public List<Certificateinfo> getListByItem(String itemid) {
		return certificateinfoDao.getListByItem(itemid);
	}

	/**
	 * 根据名字判断该实体是否存在
	 * 
	 * @param methodname
	 * @return
	 */
	public boolean getBooleanByName(String userid, String itemid,
			String methodid) {
		return certificateinfoDao.getBooleanByName(userid, itemid, methodid);

	}

	/**
	 * 根据名字判断该上岗证编号是否存在。
	 * 
	 * @param methodname
	 * @return
	 */
	public boolean getBooleanByStationno(String userids, String stationno) {
		return certificateinfoDao.getBooleanByStationno(userids, stationno);

	}

	/**
	 * 根据条件获取人员上岗证条数
	 * 
	 * @param hql
	 * @param values
	 * @return
	 */
	public int getCertificateinfoCount(String hql, Object... values) {
		return certificateinfoDao.getCertificateinfoCount(hql, values);
	}
}
