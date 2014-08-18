package com.beauty.biz.dao.workflow;

import java.util.List;

import org.hibernate.Query;
import org.springframework.stereotype.Repository;

import com.beauty.biz.entity.workflow.WorkflowStep;
import com.beauty.common.orm.hibernate3.HibernateDao;

@Repository
public class WorkflowStepDao extends HibernateDao<WorkflowStep> {

	@SuppressWarnings("unchecked")
	public List<WorkflowStep> getWorkflowStep(String stepcode,String workflowcode){
		String hql = "from WorkflowStep wr where wr.id.workflowcode = ? and wr.orderid >(select wfs.orderid from WorkflowStep wfs where wfs.id.workflowcode=? and wfs.id.stepcode =?) order by wr.orderid ";
		Query query = createQuery(hql,workflowcode,workflowcode,stepcode);
		List<WorkflowStep> workflowStepList = query.list();
		return workflowStepList;
	}
	
	@SuppressWarnings("unchecked")
	public List<WorkflowStep> getWorkflowSteps(String stepcode,String workflowcode){
		String hql = "from WorkflowStep wr where wr.id.workflowcode = ? and  exists ( select 1 from WorkflowStep wrf where wr.id.workflowcode = wrf.id.workflowcode and   instr(wrf.targetstepcode,''''||wr.id.stepcode||'''')>0 and wrf.id.stepcode =?)";
		Query query = createQuery(hql,workflowcode,stepcode);
		List<WorkflowStep> workflowStepList = query.list();
		return workflowStepList;
	}
	
	@SuppressWarnings("unchecked")
	public WorkflowStep getWorkflowStepByid(String stepcode,String workflowcode){
		String hql = "from WorkflowStep wr where wr.id.workflowcode = ? and wr.id.stepcode =?";
		Query query = createQuery(hql,workflowcode,stepcode);
		List<WorkflowStep> workflowStepList = query.list();
		return workflowStepList.size()>0?workflowStepList.get(0):null;
	}	
}
