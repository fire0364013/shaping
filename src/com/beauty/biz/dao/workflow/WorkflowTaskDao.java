package com.beauty.biz.dao.workflow;

import java.util.List;

import org.hibernate.Query;
import org.springframework.stereotype.Repository;

import com.beauty.biz.entity.workflow.WorkflowTask;
import com.beauty.common.orm.hibernate3.HibernateDao;

/**
 * @author beauty405
 *
 */
@Repository
public class WorkflowTaskDao extends HibernateDao<WorkflowTask> {
	
	public WorkflowTask getWorkflowTask(int taskId){
		String hql = "from WorkflowTask wt where wt.taskId=?";
		Query query = createQuery(hql,taskId);
		WorkflowTask workflowTask = (WorkflowTask) query.uniqueResult();
		return workflowTask;
	}
	
	@SuppressWarnings("unchecked")
	public List<WorkflowTask> getBackWorkflowTask(int taskId){
		String hql = "select wt from WorkflowRecord wr left join WorkflowTask wt on wr.sourceTaskId=wt.taskId and wr.targetTaskId=? order by wt.taskOrder";
		Query query = createQuery(hql,taskId);
		List<WorkflowTask> workflowTaskList = query.list();
		return workflowTaskList;
	}
	
	@SuppressWarnings("unchecked")
	public List<WorkflowTask> getNextWorkflowTask(int taskId){
		String hql = "select wt from WorkflowEvent we left join WorkflowTask wt on we.targetTaskId=wt.taskId and we.sourceTaskId=? order by wt.taskOrder";
		Query query = createQuery(hql,taskId);
		List<WorkflowTask> workflowTaskList = query.list();
		return workflowTaskList;
	}
	
	@SuppressWarnings("unchecked")
	public List<WorkflowTask> getNextWorkflowTaskList(int taskId){
		WorkflowTask workflowTask = getWorkflowTask(taskId);
		if(workflowTask==null)
			return null;
		String workflowCode = workflowTask.getWorkflowCode();
		int taskOrder = workflowTask.getTaskOrder();
		String hql = "from WorkflowTask wt where wt.workflowCode=? and wt.taskOrder>? order by wt.taskOrder";
		Query query = createQuery(hql,workflowCode,taskOrder);
		List<WorkflowTask> workflowTaskList = query.list();
		return workflowTaskList;
	}
	
	@SuppressWarnings("unchecked")
	public List<WorkflowTask> getWorkflowTaskList(String workflowCode){
		String hql = "from WorkflowTask wt where wt.taskEnable=1 and wt.workflowCode=? order by wt.taskOrder";
		Query query = createQuery(hql,workflowCode);
		List<WorkflowTask> workflowTaskList = query.list();
		return workflowTaskList;
	}
	
	public int disableWorkflowTask(String workflowCode){
		String hql = "update WorkflowTask wt set wt.taskEnable=0 where wt.workflowCode=?";
		Query query = createQuery(hql,workflowCode);
		int count = query.executeUpdate();
		return count;
	}
	
}