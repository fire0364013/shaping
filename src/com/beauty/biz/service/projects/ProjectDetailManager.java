package com.beauty.biz.service.projects;

import java.util.HashSet;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Set;

import javax.management.RuntimeErrorException;

import org.hibernate.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.beauty.common.page.QueryResult;
import com.runqian.report4.model.expression.operator.In;
import com.beauty.biz.dao.entpriseinfo.EntpriseInfoDao;
import com.beauty.biz.dao.projects.ProjectDetailDao;
import com.beauty.biz.dao.projects.ProjectsDao;
import com.beauty.biz.dao.projects.ProjectsamplefeeDao;
import com.beauty.biz.dao.projects.ProjectsampleitemDao;
import com.beauty.biz.entity.entpriseinfo.EntpriseInfo;
import com.beauty.biz.entity.projects.Projectdetail;
import com.beauty.biz.entity.projects.Projects;
import com.beauty.biz.entity.projects.Projectsamplefee;
import com.beauty.biz.entity.projects.Projectsampleitem;

@Service
@Transactional
public class ProjectDetailManager {
	@Autowired
	private ProjectsDao projectDao;
	@Autowired
	private ProjectDetailDao detailDao;
	@Autowired
	private EntpriseInfoDao entDao;
	@Autowired
	private ProjectsamplefeeDao projectsamplefeeDao;
	@Autowired
	private ProjectsampleitemDao projectsampleitemDao;
	@Autowired
	private ProjectsDao projectsDao;
	
	
	
	

	public QueryResult<Projectdetail> getQueryResult(int startIndex,
			int maxResult, String whereJPQL, Object[] params,
			LinkedHashMap<String, String> orderby) throws Exception {
		return detailDao.getScrollData(startIndex, maxResult, whereJPQL,
				params, orderby);
	}

	public QueryResult<EntpriseInfo> getQueryEntResult(int startIndex,
			int maxResult, String whereJPQL, Object[] params,
			LinkedHashMap<String, String> orderby) throws Exception {
		return entDao.getScrollData(startIndex, maxResult, whereJPQL, params,
				orderby);
	}

	public QueryResult<Object[]> getScrollDateByHQL(int startIndex,
			int maxResult, String searchField, String fromSQL, String whereSQL,
			Object[] params, LinkedHashMap<String, String> orderby)
			throws Exception {
		return detailDao.getScrollDataByHQL(startIndex, maxResult, searchField,
				fromSQL, whereSQL, params, orderby);
	}

	public boolean save(String projectcode, String ents) {
		try {
			String[] arr = ents.split(",");
			Projects project = projectDao.get(projectcode);
			for (String s : arr) {
				EntpriseInfo ent = entDao.get(s);
				Projectdetail detail = new Projectdetail();
				String seq = detailDao.getSequence("SEQ_PROJECTDETAIL");
				detail.setProjectdetailid(seq);
				detail.setProjectcode(projectcode);
				detail.setEnt(ent);
				detail.setStatus(project.getStatus());	
				detailDao.save(detail);
			}
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}

	}
	
	public void update(String projectcode , String ents){
		Object[] obj = {projectcode};
		List<Projectdetail> details = detailDao.getProjectdetailList("from Projectdetail detail where detail.projectcode = ?", obj);
		if(details.size()>0){
			for(Projectdetail detail:details){
					detailDao.delete(detail.getProjectdetailid());
				}
		}
		save(projectcode , ents);
	}

	public void remove(String id) throws RuntimeException {
		try {
			String[] arr = id.split(",");
			for (String s : arr) {
				detailDao.delete(s);
			}
		} catch (Exception e) {
			throw new RuntimeException(e.getMessage());
		}
	}

	public Projectdetail get(String id) {
		return detailDao.get(id);
	}

	public Query createQuery(String hql, Object... values) {
		return detailDao.createQuery(hql, values);
	}

	@SuppressWarnings("unchecked")
	public Float accountSampleFee(String projectcode) {
		Float sampleFee = 0.00f;
		List<Projectdetail> projectdetails = detailDao.createQuery("from Projectdetail p where p.projectcode = ?",projectcode).list();
		for(Projectdetail projectdetail : projectdetails){	
			List<Projectsamplefee> projectsamplefees =  projectsamplefeeDao.createQuery
			("from Projectsamplefee p where p.projectdetail.projectdetailid = ?",projectdetail.getProjectdetailid())
			.list();
			for(Projectsamplefee projectsamplefee : projectsamplefees){
				Float price = Float.valueOf(projectsamplefee.getPrice());
				Integer ammount = Integer.valueOf(projectsamplefee.getAmount());
				Float sampleFee1 = price * ammount;
				sampleFee += sampleFee1; 
			}
			projectdetail.setSamplefee(sampleFee.toString());	
			detailDao.save(projectdetail);
		}
		
		return sampleFee;
	}


	public Float updateFee(String projectcode,Float feepay) {
		Float total =0.00f;
		Projects projects = projectsDao.get(projectcode);
//		if (projects.getMonitormonth().indexOf(",") >= 0){
//			Integer monthcount =  projects.getMonitormonth().split(",").length;	
//			total = feepay*monthcount;
//		}else{
			total = feepay;
//		}
			projects.setDetectionfee(total.toString());
			projectsDao.save(projects);

		return total;	
	}

	@SuppressWarnings("unchecked")
	public List<Projectdetail> getByprojectcode(String projectcode){
		Query query = detailDao.createQuery("from Projectdetail detail where detail.projectcode = ? ", projectcode);
		List<Projectdetail> details = query.list();
		return details;
	}
	
}
