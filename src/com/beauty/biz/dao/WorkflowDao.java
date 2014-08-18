package com.beauty.biz.dao;

import java.util.Date;
import java.util.List;

import org.hibernate.Query;
import org.springframework.stereotype.Repository;

import com.beauty.biz.entity.workflow.WorkflowActionRecord;
import com.beauty.biz.entity.workflow.WorkflowRecordDetail;
import com.beauty.biz.entity.workflow.WorkflowStep;
import com.beauty.biz.entity.workflow.WorkflowStepAction;
import com.beauty.common.orm.hibernate3.HibernateDao;

@Repository(value="workflowDaoBak")
public class WorkflowDao extends HibernateDao<WorkflowActionRecord> {
	public void saveRecordDetail(WorkflowRecordDetail entity) {
		getSession().saveOrUpdate(entity);
	}

	/**
	 * 获取当前状态的上一状态的提交时间(时效性用到)
	 * 
	 * @param stepCode
	 *            步骤编码
	 * @param workflowCode
	 *            流程编码
	 * @return entityid 实体id
	 */
	public Date getLastStepAudittime(String stepCode, String workflowCode,
			String entityid) {
		// WorkflowStep ws = new WorkflowStep();
		Query query = createQuery(
				"select max(audittime) from WorkflowActionRecord war where war.entityid=? and war.stepcode in (select s.id.stepcode from WorkflowStepAction s where s.nextstepcode = ? and s.id.workflowcode = ? and s.actionname in('提交','提交1','提交2'))",
				entityid, stepCode, workflowCode);
		Date ws = (Date) query.uniqueResult();
		return ws;
	}

	/**
	 * 获取当前状态
	 * 
	 * @param stepCode
	 *            步骤编码
	 * @param workflowCode
	 *            流程编码
	 * @return WorkflowStep 工作流步骤
	 */
	public WorkflowStep getStep(String stepCode, String workflowCode) {
		// WorkflowStep ws = new WorkflowStep();
		Query query = createQuery(
				"from WorkflowStep s where s.id.stepcode = ? and s.id.workflowcode = ?",
				stepCode, workflowCode);
		WorkflowStep ws = (WorkflowStep) query.uniqueResult();
		// System.out.println(ws.getStepname());
		return ws;
	}

	/**
	 * 获取下一个步骤
	 * 
	 * @param stepCode
	 *            步骤编码
	 * @param workflowCode
	 *            流程编码
	 * @param action
	 *            操作名称
	 * @return
	 */
	public WorkflowStepAction getNextStepCode(String stepCode,
			String workflowCode, String action) {
		Query query = super.getSession(true).createQuery(
				"from WorkflowStepAction w where w.id.stepcode = '" + stepCode
						+ "' and w.id.workflowcode = '" + workflowCode
						+ "' and w.actionname = '" + action + "'");
		WorkflowStepAction sa = (WorkflowStepAction) query.uniqueResult();
		if (sa == null)
			return new WorkflowStepAction();
		else
			return sa;
	}

	/**
	 * 获取下一个步骤
	 * 
	 * @param stempCode
	 *            操作编码
	 * @param workflowCode
	 *            工作流编码
	 * @return
	 */
	public WorkflowStepAction getNextStepCode(String stempCode,
			String workflowCode) {
		Query query = createQuery(
				"from WorkflowStepAction w where w.id.stepactioncode = ? and w.id.workflowcode = ?",
				stempCode, workflowCode);
		WorkflowStepAction sa = (WorkflowStepAction) query.uniqueResult();
		return sa;
	}

	/**
	 * 获取动作全名
	 * 
	 * @param stempCode
	 *            操作编码
	 * @param workflowCode
	 *            工作流编码
	 * @return
	 */
	public WorkflowStepAction getActionfullname(String stepactioncode,
			String stempCode, String workflowCode) {
		Query query = createQuery(
				"from WorkflowStepAction w where w.id.stepactioncode = ? and w.id.stepcode = ?  and w.id.workflowcode = ?",
				stepactioncode, stempCode, workflowCode);
		WorkflowStepAction sa = (WorkflowStepAction) query.uniqueResult();
		return sa;
	}

	/**
	 * 获取所有状态
	 * 
	 * @param workflowCode
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public List<WorkflowStep> getStatus(String workflowCode) {
		Query query = createQuery(
				"from WorkflowStep w where w.id.workflowcode  = ? order by orderid asc",
				workflowCode);
		List<WorkflowStep> wslist = (List<WorkflowStep>) query.list();
		return wslist;
	}

	/**
	 * 获取某些状态的列表
	 * 
	 * @param workflowCode
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public List<WorkflowStep> getStepList(String hql, Object... values) {
		Query query = createQuery(hql, values);
		List<WorkflowStep> wslist = (List<WorkflowStep>) query.list();
		return wslist;
	}

	/**
	 * 获取某些状态的列表
	 * 
	 * @param workflowCode
	 * @return
	 */
	public WorkflowStepAction getWorkflowStepAction(String hql,
			Object... values) {
		Query query = createQuery(hql, values);
		WorkflowStepAction wslist = (WorkflowStepAction) query.uniqueResult();
		return wslist;
	}

	/**
	 * 获取某个工作流实体的所有流程记录
	 * 
	 * @param workflowCode
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public List<WorkflowActionRecord> getWorkflowActionRecordList(
			String entityid,String stepType) {
		Query query = createQuery(
				"from WorkflowActionRecord w where w.entityid  = ? and w.steptype=? order by audittime asc",
				entityid,stepType);
		List<WorkflowActionRecord> warList = query.list();
		return warList;
	}
	
	public WorkflowActionRecord getWorkflowNewStep(String entityid){
		Query query = createQuery(
				"select * from (select *,rownum from WorkflowActionRecord where entityid = ? order by audittime desc) where rownum = 1",
				entityid);
		WorkflowActionRecord step = (WorkflowActionRecord)query.uniqueResult();
		return step;
	}

	/**
	 * 获取某个工作流的步骤
	 * 
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public List<WorkflowStepAction> getAllWorkflowStepActionByWorkFlowFode(
			String workflowcode, String actionname) {
		Query query = createQuery(
				"from WorkflowStepAction w where w.id.workflowcode = ? and w.actionname in("
						+ actionname + ")", workflowcode);// like
															// '"+actionname+"%'"
															// ,workflowcode);
		List<WorkflowStepAction> list = query.list();
		return list;
	}


	/**
	 * 获取当前用户审核的projectcode
	 * 
	 * @param workflowCode
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public List<WorkflowActionRecord> getProjectcodeByNextAuditman(String userid) {
		Query query = createQuery(
			"from WorkflowActionRecord w where w.nextAuditPerson is not null and w.nextAuditPerson = ? order by audittime desc",
			userid);
		List<WorkflowActionRecord> warList = query.list();
		return warList;
	}

	
	/**
	 * 获取下一个步骤
	 * 
	 * @param stepCode
	 *            步骤编码
	 * @param workflowCode
	 *            流程编码
	 * @param action
	 *            操作名称
	 * @return
	 */
	public WorkflowStepAction getByStepCode(String stepCode,
			String workflowCode, String nextStepCode) {
		Query query = super.getSession(true).createQuery(
				"from WorkflowStepAction w where w.id.stepcode = '" + stepCode
						+ "' and w.id.workflowcode = '" + workflowCode
						+ "' and w.nextstepcode = '" + nextStepCode + "'");
		WorkflowStepAction sa = (WorkflowStepAction) query.uniqueResult();
		if (sa == null)
			return null;
		else
			return sa;
	}
}