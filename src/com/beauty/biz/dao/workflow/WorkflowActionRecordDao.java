package com.beauty.biz.dao.workflow;

import java.util.Date;
import java.util.List;

import org.hibernate.Query;
import org.springframework.stereotype.Repository;

import com.beauty.biz.entity.workflow.WorkflowActionRecord;
import com.beauty.biz.entity.workflow.WorkflowRecord;
import com.beauty.biz.entity.workflow.WorkflowStep;
import com.beauty.biz.entity.workflow.WorkflowStepAction;
import com.beauty.common.orm.hibernate3.HibernateDao;
import com.beauty.common.utils.SessionUser;

@Repository
public class WorkflowActionRecordDao extends HibernateDao<WorkflowActionRecord> {

	@SuppressWarnings("unchecked")
	public WorkflowActionRecord getBackWorkflowRecord(String entityid,String targetstepcode,String steptype){
		String hql = "from WorkflowActionRecord wr where wr.entityid=? and wr.targetstepcode = ? and  wr.steptype = ? and wr.targettype = '1'   order by actionid desc ";
		Query query = createQuery(hql,entityid,targetstepcode,steptype);
		List<WorkflowActionRecord> workflowActionRecordList = query.list();
		return workflowActionRecordList.size()>0?workflowActionRecordList.get(0):null;
	}
	@SuppressWarnings("unchecked")
	public List<WorkflowActionRecord> getWorkflowRecords(String entityid,String steptype){
		String hql = "from WorkflowActionRecord wr where wr.entityid=? and  wr.steptype = ? order by actionid ";
		Query query = createQuery(hql,entityid,steptype);
		List<WorkflowActionRecord> workflowActionRecordList = query.list();
		return workflowActionRecordList;
	}
	
	/**
	 * 发布样品，样品项目级别评审意见
	 * 
	 * @param id
	 * @param wsa
	 * @param opinion
	 * @param user
	 */
	public void releaseOpinionNew(String id, WorkflowStepAction wsa,String targetstepcode,
			String opinion, String userid,String steptype) {
		WorkflowActionRecord war = new WorkflowActionRecord();
		war.setActionid(this.getSequence("SEQ_WORKFLOW_ACTIONRECORD"));
		war.setAuditattribute(opinion);
		war.setAudittime(new Date());
		war.setAudituserid(userid);
		war.setStepactioncode(wsa.getId().getStepactioncode());
		war.setStepcode(wsa.getId().getStepcode());
		war.setWorkflowcode(wsa.getId().getWorkflowcode());
		war.setTargetstepcode(targetstepcode);
		if(wsa.getActionname().startsWith("提交"))
		{
			war.setTargettype("1");
		}else
		{
			war.setTargettype("2");
		}		
		war.setSteptype(steptype);
		war.setEntityid(id);
		this.save(war);
	}	
	
}
