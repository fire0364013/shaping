package com.beauty.biz.dao.workflow;

import java.util.List;

import org.hibernate.Query;
import org.springframework.stereotype.Repository;

import com.beauty.biz.entity.workflow.WorkflowEvent;
import com.beauty.common.orm.hibernate3.HibernateDao;

/**
 * @author beauty405
 *
 */
@Repository
public class WorkflowEventDao extends HibernateDao<WorkflowEvent> {
	
	public WorkflowEvent getWorkflowEvent(int eventId){
		String hql = "from WorkflowEvent we where we.eventId=?";
		Query query = createQuery(hql,eventId);
		WorkflowEvent workflowEvent = (WorkflowEvent) query.uniqueResult();
		return workflowEvent;
	}
	
	public WorkflowEvent getWorkflowEvent(int sourceTaskId,int targetTaskId,String workflowCode){
		String hql = "from WorkflowEvent we where we.sourceTaskId=? and we.targetTaskId=? and we.workflowCode=?";
		Query query = createQuery(hql,sourceTaskId,targetTaskId,workflowCode);
		WorkflowEvent workflowEvent = (WorkflowEvent) query.uniqueResult();
		return workflowEvent;
	}
	
	@SuppressWarnings("unchecked")
	public List<WorkflowEvent> getWorkflowEventList(String workflowCode){
		String hql = "from WorkflowEvent we where we.eventEnable=1 and we.workflowCode=? order by we.eventId desc";
		Query query = createQuery(hql,workflowCode);
		List<WorkflowEvent> workflowEventList = query.list();
		return workflowEventList;
	}
	
	@SuppressWarnings("unchecked")
	public List<WorkflowEvent> getWorkflowEventList(int sourceTaskId,int targetTaskId,String workflowCode){
		StringBuffer hqlBuffer = new StringBuffer("from WorkflowEvent we where we.workflowCode=?");
		if(sourceTaskId>0)
			hqlBuffer.append(" and we.sourceTaskId="+sourceTaskId);
		if(targetTaskId>0)
			hqlBuffer.append(" and we.targetTaskId="+targetTaskId);
		String hql = hqlBuffer.toString();
		Query query = createQuery(hql,workflowCode);
		List<WorkflowEvent> workflowEventList = query.list();
		return workflowEventList;
	}
	
	@SuppressWarnings("unchecked")
	public List<WorkflowEvent> getWorkflowEventListBySource(int sourceTaskId,String workflowCode){
		String hql = "from WorkflowEvent we where we.sourceTaskId=? and we.workflowCode=?";
		Query query = createQuery(hql,sourceTaskId,workflowCode);
		List<WorkflowEvent> workflowEventList = query.list();
		return workflowEventList;
	}
	
	@SuppressWarnings("unchecked")
	public List<WorkflowEvent> getWorkflowEventListByTarget(int targetTaskId,String workflowCode){
		String hql = "from WorkflowEvent we where we.targetTaskId=? and we.workflowCode=?";
		Query query = createQuery(hql,targetTaskId,workflowCode);
		List<WorkflowEvent> workflowEventList = query.list();
		return workflowEventList;
	}
	
	public int disableWorkflowEvent(String workflowCode){
		String hql = "update WorkflowEvent we set we.eventEnable=0 where we.workflowCode=?";
		Query query = createQuery(hql,workflowCode);
		int count = query.executeUpdate();
		return count;
	}
	
}