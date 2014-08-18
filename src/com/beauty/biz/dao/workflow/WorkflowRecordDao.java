package com.beauty.biz.dao.workflow;

import java.util.List;

import org.hibernate.Query;
import org.springframework.stereotype.Repository;

import com.beauty.biz.entity.workflow.WorkflowRecord;
import com.beauty.common.orm.hibernate3.HibernateDao;

/**
 * @author beauty405
 *
 */
@Repository
public class WorkflowRecordDao extends HibernateDao<WorkflowRecord> {
	
	public WorkflowRecord getWorkflowRecord(int recordId){
		String hql = "from WorkflowRecord wr where wr.recordId=?";
		Query query = createQuery(hql,recordId);
		WorkflowRecord workflowRecord = (WorkflowRecord) query.uniqueResult();
		return workflowRecord;
	}
	
	@SuppressWarnings("unchecked")
	public List<WorkflowRecord> getWorkflowRecordList(int entityId,String workflowCode){
		String hql = "from WorkflowRecord wr where wr.entityId=? and workflowCode=? order by wr.recordTime";
		Query query = createQuery(hql,entityId,workflowCode);
		List<WorkflowRecord> workflowRecordList = query.list();
		return workflowRecordList;
	}
	
	@SuppressWarnings("unchecked")
	public List<WorkflowRecord> getWorkflowRecordList(int entityId,String workflowCode,int taskId,int recordUserId){
		StringBuffer hqlBuffer = new StringBuffer("from WorkflowRecord wr where wr.entityId=? and workflowCode=?");
		if(taskId>0)
			hqlBuffer.append(" and wr.taskId="+recordUserId);
		if(recordUserId>0)
			hqlBuffer.append(" and wr.recordUserId="+recordUserId);
		hqlBuffer.append(" order by wr.recordTime desc");
		String hql = hqlBuffer.toString();
		Query query = createQuery(hql,entityId,workflowCode);
		List<WorkflowRecord> workflowRecordList = query.list();
		return workflowRecordList;
	}
	
	@SuppressWarnings("unchecked")
	public List<Integer> getEntityIdList(int recordUserId,String startTime,String endTime){
		StringBuffer hqlBuffer = new StringBuffer("select distinct wr.entityId from WorkflowRecord wr where 1=1");
		if(recordUserId>=0)
			hqlBuffer.append(" and wr.recordUserId="+recordUserId);
		if(startTime!=null && !"".equals(startTime))
			hqlBuffer.append(" and wr.recordTime>=to_date('"+startTime+"','yyyy-mm-dd hh24:mi:ss'");
		if(endTime!=null && !"".equals(endTime))
			hqlBuffer.append(" and wr.recordTime<=to_date('"+endTime+"','yyyy-mm-dd hh24:mi:ss'");
		String hql = hqlBuffer.toString();
		Query query = createQuery(hql);
		List<Integer> entityIdList = query.list();
		return entityIdList;
	}
	
}