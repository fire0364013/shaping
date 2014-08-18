package com.beauty.biz.dao.workflow;

import java.util.List;

import org.hibernate.Query;
import org.springframework.stereotype.Repository;

import com.beauty.biz.entity.workflow.Workflow;
import com.beauty.common.orm.hibernate3.HibernateDao;

/**
 * @author beauty405
 *
 */
@Repository
public class WorkflowDao extends HibernateDao<Workflow> {
	
	public Workflow getWorkflow(int workflowId){
		String hql = "from Workflow w where w.workflowId=?";
		Query query = createQuery(hql,workflowId);
		Workflow workflow = (Workflow) query.uniqueResult();
		return workflow;
	}
	
	public Workflow getWorkflow(String workflowCode){
		String hql = "from Workflow w where w.workflowCode=?";
		Query query = createQuery(hql,workflowCode);
		Workflow workflow = (Workflow) query.uniqueResult();
		return workflow;
	}
	
	@SuppressWarnings("unchecked")
	public List<Workflow> getWorkflowList(){
		String hql = "from Workflow w where w.workflowEnable=1";
		Query query = createQuery(hql);
		List<Workflow> workflowList = query.list();
		return workflowList;
	}
	
	public int disableWorkflow(String workflowCode){
		String hql = "update Workflow w set w.workflowEnable=0 where w.workflowCode=?";
		Query query = createQuery(hql,workflowCode);
		int count = query.executeUpdate();
		return count;
	}
	
	public int disableWorkflow(int workflowId){
		String hql = "update Workflow w set w.workflowEnable=0 where w.workflowId=?";
		Query query = createQuery(hql,workflowId);
		int count = query.executeUpdate();
		return count;
	}
	
}