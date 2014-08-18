package com.beauty.biz.service.workflow;

import java.util.Date;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.beauty.biz.dao.workflow.WorkflowDao;
import com.beauty.biz.dao.workflow.WorkflowEventDao;
import com.beauty.biz.dao.workflow.WorkflowRecordDao;
import com.beauty.biz.dao.workflow.WorkflowTaskDao;
import com.beauty.biz.entity.workflow.Workflow;
import com.beauty.biz.entity.workflow.WorkflowActionRecord;
import com.beauty.biz.entity.workflow.WorkflowEvent;
import com.beauty.biz.entity.workflow.WorkflowRecord;
import com.beauty.biz.entity.workflow.WorkflowTask;
import com.beauty.common.utils.SessionUser;
import com.beauty.common.utils.XmlUtils;


/**
 * @author beauty405
 * @param <WorkflowRecord>
 *
 */
@Service
@Transactional
public class WorkflowManage {

	@Autowired
	@Qualifier("workflowDao")
	protected WorkflowDao workflowDao;
	@Autowired
	@Qualifier("workflowTaskDao")
	protected WorkflowTaskDao workflowTaskDao;
	@Autowired
	@Qualifier("workflowEventDao")
	protected WorkflowEventDao workflowEventDao;
	@Autowired
	@Qualifier("workflowRecordDao")
	protected WorkflowRecordDao workflowRecordDao;
	
	//业务流程中审核状态操作模块
	/**
	 * 退回
	 * @param 
	 */
	public int backRecord(int entityId,String workflowCode,int taskId,String recordName,String description,int recordUserId){
		List<WorkflowRecord> workflowRecordList = workflowRecordDao.getWorkflowRecordList(entityId, workflowCode, taskId, 0);
		WorkflowRecord workflowRecord = null;
		int sourceTaskId = 0;
		if(workflowRecordList!=null && workflowRecordList.size()>0){
			workflowRecord = workflowRecordList.get(0);
			sourceTaskId = workflowRecord.getSourceTaskId();
		}
		workflowRecord = new WorkflowRecord();
		workflowRecord.setSourceTaskId(taskId);
		workflowRecord.setTargetTaskId(sourceTaskId);
		workflowRecord.setWorkflowCode(workflowCode);
		workflowRecord.setEntityId(entityId);
		workflowRecord.setRecordName(recordName);
		workflowRecord.setDescription(description);
		workflowRecord.setRecordUserId(recordUserId);
		workflowRecord.setRecordTime(new Date());
		workflowRecordDao.save(workflowRecord);
		return sourceTaskId;
	}
	
	/**
	 * 提交
	 * @param 
	 */
	public int commitRecord(int entityId,String workflowCode,int sourceTaskId,int targetTaskId,String recordName,String description,int recordUserId){
		WorkflowRecord workflowRecord = new WorkflowRecord();
		workflowRecord.setSourceTaskId(sourceTaskId);
		workflowRecord.setTargetTaskId(sourceTaskId);
		workflowRecord.setWorkflowCode(workflowCode);
		workflowRecord.setEntityId(entityId);
		workflowRecord.setRecordName(recordName);
		workflowRecord.setDescription(description);
		workflowRecord.setRecordUserId(recordUserId);
		workflowRecord.setRecordTime(new Date());
		workflowRecordDao.save(workflowRecord);
		return targetTaskId;
	}
	
	/**
	 * 根据任务编号获取任务节点信息
	 * @param entityId
	 */
	public WorkflowTask getWorkflowTask(int taskId){
		WorkflowTask workflowTask = workflowTaskDao.getWorkflowTask(taskId);
		return workflowTask;
	}
	
	/**
	 * 根据任务编号获取后续连接任务节点列表
	 * @param taskId
	 * @return
	 */
	public List<WorkflowTask> getNextWorkflowTask(int taskId){
		List<WorkflowTask> workflowTaskList = workflowTaskDao.getNextWorkflowTask(taskId);
		return workflowTaskList;
	}
	
	/**
	 * 根据任务编号获取后续所有任务节点列表
	 * @param taskId
	 * @return
	 */
	public List<WorkflowTask> getNextWorkflowTaskList(int taskId){
		List<WorkflowTask> workflowTaskList = workflowTaskDao.getNextWorkflowTaskList(taskId);
		return workflowTaskList;
	}
	/**
	 * 根据业务流程编号获取任务节点列表
	 * @param workflowCode
	 * @return
	 */
	public List<WorkflowTask> getWorkflowTaskList(String workflowCode){
		List<WorkflowTask> workflowTaskList = workflowTaskDao.getWorkflowTaskList(workflowCode);
		return workflowTaskList;
	}
	
	//业务流程中审核记录模块
	/**
	 * 获取审核记录
	 * @param entityId
	 * @param workflowCode
	 * @param recordUserId
	 * @return
	 */
	public List<WorkflowRecord> getWorkflowRecordList(int entityId,String workflowCode,int recordUserId){
		List<WorkflowRecord> workflowRecordList = workflowRecordDao.getWorkflowRecordList(entityId, workflowCode, 0, recordUserId);
		return workflowRecordList;
	}
	
	/**
	 * 插入审核记录日志
	 * @param workflowRecord
	 */
	public void addWorkflowRecord(WorkflowRecord workflowRecord){
		workflowRecordDao.save(workflowRecord);
	}
	
	//流程配置模块
	/**
	 * 获取流程配置信息
	 * @param workflowRecord
	 */
	public String getWorkflowGraph(String workflowCode){
		List<WorkflowTask> workflowTaskList = workflowTaskDao.getWorkflowTaskList(workflowCode);
		List<WorkflowEvent> workflowActionList = workflowEventDao.getWorkflowEventList(workflowCode);
		String xmlString = XmlUtils.createXml(workflowTaskList,workflowActionList);
		return xmlString;
	}
	
	/**
	 * 保存流程配置信息
	 * @param xmlString
	 * @param workflowCode
	 * @return
	 */
	public void saveWorkflowGraph(String xmlString,String workflowCode){
		int taskSequence = Integer.valueOf(workflowTaskDao.getSequence("SEQ_WORKFLOW_TASK"));
		int eventSequence = Integer.valueOf(workflowTaskDao.getSequence("SEQ_WORKFLOW_EVENT"));
		Map<String,List> xmlObject = XmlUtils.parserXml(xmlString,taskSequence,eventSequence);
		int count = workflowTaskDao.disableWorkflowTask(workflowCode);
		count = workflowEventDao.disableWorkflowEvent(workflowCode);
		List<WorkflowTask> workflowTaskList = xmlObject.get("mode");
		if(workflowTaskList!=null && workflowTaskList.size()> 0){
			for(WorkflowTask workflowTask : workflowTaskList){
				workflowTask.setWorkflowCode(workflowCode);
				workflowTaskDao.save(workflowTask);
			}
		}
		List<WorkflowEvent> workflowEventList = xmlObject.get("line");
		if(workflowEventList!=null && workflowEventList.size()> 0){
			for(WorkflowEvent workflowEvent : workflowEventList){
				workflowEvent.setWorkflowCode(workflowCode);
				workflowEventDao.save(workflowEvent);
			}
		}
	}
	
	/**
	 * 获取业务流程列表
	 * @return
	 */
	public List<Workflow> getWorkflowList(){
		List<Workflow> workflowList = workflowDao.getWorkflowList();
		return workflowList;
	}
	
	/**
	 * 新增业务流程数据
	 * @param workflow
	 */
	public void addWorkflow(Workflow workflow){
		int workflowId = Integer.valueOf(workflowDao.getSequence("SEQ_WORKFLOW"));
		workflow.setWorkflowId(workflowId);
		workflow.setWorkflowEnable(1);
		workflowDao.save(workflow);
	}
	
	/**
	 * 修改业务流程数据
	 * @param workflow
	 */
	public void modifyWorkflow(Workflow workflow){
		workflow.setWorkflowEnable(1);
		workflowDao.save(workflow);
	}
	
	/**
	 * 删除业务流程数据
	 * @param workflow
	 */
	public void deleteWorkflow(Workflow workflow){
		String workflowCode = workflow.getWorkflowCode();
		workflowTaskDao.disableWorkflowTask(workflowCode);
		workflowEventDao.disableWorkflowEvent(workflowCode);
		workflowDao.disableWorkflow(workflowCode);
	}
	
	/**
	 * 删除业务流程数据
	 * @param workflowCode
	 */
	public void deleteWorkflow(String workflowCode){
		workflowTaskDao.disableWorkflowTask(workflowCode);
		workflowEventDao.disableWorkflowEvent(workflowCode);
		workflowDao.disableWorkflow(workflowCode);
	}
	
	/**
	 * 删除业务流程数据
	 * @param workflowId
	 */
	public void deleteWorkflow(int workflowId){
		Workflow workflow = workflowDao.getWorkflow(workflowId);
		String workflowCode = workflow.getWorkflowCode();
		workflowTaskDao.disableWorkflowTask(workflowCode);
		workflowEventDao.disableWorkflowEvent(workflowCode);
		workflowDao.disableWorkflow(workflowId);
	}
	/**
	 * 发布评审意见
	 */
	public void releaseOpinion(String projectcode,WorkflowTask wft,String opinion, SessionUser user){
		WorkflowActionRecord war = new WorkflowActionRecord();
		war.setActionid(workflowDao.getSequence("SEQ_WORKFLOW_ACTIONRECORD"));
		war.setAuditattribute(opinion);
		war.setAudittime(new Date());
		war.setAudituserid(user.getUserid());
		war.setStepactioncode(String.valueOf((wft.getTaskId())));
		war.setStepcode(wft.getTaskCode());
		war.setWorkflowcode(wft.getWorkflowCode());
		war.setEntityid(projectcode);
		workflowDao.save(war);
	}
}
