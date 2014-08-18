package com.beauty.biz.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.LinkedHashMap;
import java.util.List;

import org.hibernate.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.beauty.biz.dao.WorkflowDao;
import com.beauty.biz.dao.workflow.WorkflowActionRecordDao;
import com.beauty.biz.dao.workflow.WorkflowStepDao;
import com.beauty.biz.entity.workflow.WorkflowActionRecord;
import com.beauty.biz.entity.workflow.WorkflowStep;
import com.beauty.biz.entity.workflow.WorkflowStepAction;
import com.beauty.common.page.QueryResult;
import com.beauty.common.utils.SessionUser;

@Service
@Transactional
public class WorkflowManager {
	@Autowired
	private WorkflowDao workflowDao;
	@Autowired
	private WorkflowStepDao workflowStepDao;
	@Autowired
	private WorkflowActionRecordDao workflowActionRecordDao;
	/**
	 * 发布评审意见
	 * 
	 * @param id
	 * @param wsa
	 * @param opinion
	 * @param user
	 */
//	public void releaseOpinion(String id, WorkflowStepAction wsa,
//			String opinion, SessionUser user) {
//		WorkflowActionRecord war = new WorkflowActionRecord();
//		war.setActionid(workflowDao.getSequence("SEQ_WORKFLOW_ACTIONRECORD"));
//		war.setAuditattribute(opinion);
//		war.setAudittime(new Date());
//		war.setAudituserid(user.getUserid());
//		war.setStepactioncode(wsa.getId().getStepactioncode());
//		war.setStepcode(wsa.getId().getStepcode());
//		war.setWorkflowcode(wsa.getId().getWorkflowcode());
//		war.setTargetstepcode(wsa.getNextstepcode());
//		if(wsa.getActionname().startsWith("提交"))
//		{
//			war.setTargettype("1");
//		}else
//		{
//			war.setTargettype("2");
//		}
//		WorkflowStep workflowStep = workflowStepDao.getWorkflowStepByid(wsa.getNextstepcode(), wsa.getId().getWorkflowcode());
//		if(workflowStep!=null)
//		{
//			war.setSteptype(workflowStep.getSteptype());
//		}
//		war.setEntityid(id);
//		workflowDao.save(war);
//	}
	/**
	 * 发布样品，样品项目级别评审意见
	 * 
	 * @param id
	 * @param wsa
	 * @param opinion
	 * @param user
	 */
	public void releaseOpinionNew(String id, WorkflowStepAction wsa,String targetstepcode,
			String opinion, SessionUser user) {
		WorkflowActionRecord war = new WorkflowActionRecord();
		war.setActionid(workflowDao.getSequence("SEQ_WORKFLOW_ACTIONRECORD"));
		war.setAuditattribute(opinion);
		war.setAudittime(new Date());
		war.setAudituserid(user.getUserid());
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
		WorkflowStep workflowStep = workflowStepDao.getWorkflowStepByid(targetstepcode, wsa.getId().getWorkflowcode());
		if(workflowStep!=null)
		{
			war.setSteptype(workflowStep.getSteptype());
		}		
		war.setEntityid(id);
		workflowDao.save(war);
	}
	
	/**
	 * 发布任务级别评审意见
	 * 在手选跳转流程时
	 * @param id
	 * @param wsa
	 * @param opinion
	 * @param user
	 */
	public void releaseOpinionPJ(String id, WorkflowStepAction wsa,String targetstepcode,
			String opinion, SessionUser user) {
		WorkflowActionRecord war = new WorkflowActionRecord();
		war.setActionid(workflowDao.getSequence("SEQ_WORKFLOW_ACTIONRECORD"));
		war.setAuditattribute(opinion);
		war.setAudittime(new Date());
		war.setAudituserid(user.getUserid());
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
		war.setSteptype("project");
		war.setEntityid(id);
		workflowDao.save(war);
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
		return workflowDao.getLastStepAudittime(stepCode, workflowCode,
				entityid);
	}

	/**
	 * 获得工作流步骤
	 * 
	 * @param stepCode
	 *            步骤编号
	 * @param workflowCode
	 *            工作流编号
	 * @return
	 */
	public WorkflowStep getStep(String stepCode, String workflowCode) {
		return workflowDao.getStep(stepCode, workflowCode);
	}

	/**
	 * 获取下一步骤
	 * 
	 * @param stepCode
	 *            步骤编号
	 * @param workflowCode
	 *            工作流编号
	 * @param action
	 *            操作名称
	 * @return
	 */
	public WorkflowStepAction getNextStepCode(String stepCode,
			String workflowCode, String action) {
		return workflowDao.getNextStepCode(stepCode, workflowCode, action);

	}

	/**
	 * 获取下一步骤
	 * 
	 * @param stempCode
	 *            操作编码
	 * @param workflowCode
	 *            工作流编码
	 * @return
	 */
	public WorkflowStepAction getNextStepCode(String stempCode,
			String workflowCode) {
		return workflowDao.getNextStepCode(stempCode, workflowCode);

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
		return workflowDao.getActionfullname(stepactioncode, stempCode,
				workflowCode);

	}

	/**
	 * 获取意见序列值 主键
	 * 
	 * @param seqName
	 *            序列名称
	 */
	public String getSequence(String seqName) {
		return workflowDao.getSequence(seqName);
	}

	/**
	 * 获取所有状态
	 * 
	 * @param workflowCode
	 * @return
	 */
	public List<WorkflowStep> getWorkflowStepList(String workflowCode) {
		return workflowDao.getStatus(workflowCode);
	}

	/**
	 * 获取某些状态的列表
	 * 
	 * @param workflowCode
	 * @return
	 */
	public List<WorkflowStep> getStepList(String hql, Object... values) {
		return workflowDao.getStepList(hql, values);
	}

	/**
	 * 保存意见
	 * 
	 * @param object
	 */
	public void save(Object object) {
		workflowDao.save(object);
	}

	/**
	 *分页查询
	 */
	public QueryResult<WorkflowActionRecord> getRecords(int startIndex,
			int maxResult, String whereJPQL, Object[] params,
			LinkedHashMap<String, String> orderby) throws Exception {
		return workflowDao.getScrollData(startIndex, maxResult, whereJPQL,
				params, orderby);
	}

	/**
	 *分页查询
	 */
	public QueryResult<WorkflowStep> getSteps(int startIndex, int maxResult,
			String whereJPQL, Object[] params,
			LinkedHashMap<String, String> orderby) throws Exception {
		return workflowStepDao.getScrollData(startIndex, maxResult, whereJPQL,
				params, orderby);
	}

	/**
	 * 获取某个工作流实体的所有流程记录
	 * 
	 * @param workflowCode
	 * @return
	 */
	public List<WorkflowActionRecord> getWorkflowActionRecordList(
			String entityid,String steptype) {
		return workflowDao.getWorkflowActionRecordList(entityid,steptype);
	}

	/**
	 * 获取某个工作流的步骤
	 * 
	 * @return
	 */
	public List<WorkflowStepAction> getAllWorkflowStepActionByWorkFlowFode(
			String workflowcode, String actionname) {
		return workflowDao.getAllWorkflowStepActionByWorkFlowFode(workflowcode,
				actionname);
	}

	/**
	 * 获取当前步骤的之前的步骤
	 * 
	 * @return
	 */
	public List<WorkflowStepAction> getAllPreviousWorkflowStepActionByCurrentStep(
			List<WorkflowActionRecord> recordList) {
		List<WorkflowStepAction> list1 = new ArrayList<WorkflowStepAction>();
		// 去除重复
		int len1 = recordList.size();
		for (int i = 0; i < len1 - 1; i++) {
			WorkflowActionRecord war = recordList.get(i);
			for (int j = i + 1; j < len1; j++) {
				if (war.getStepcode().equals(recordList.get(j).getStepcode())) {
					if (war.getAudittime().getTime() > recordList.get(j)
							.getAudittime().getTime()) {
						recordList.remove(j);
					} else {
						recordList.remove(i);
					}
					j--;
					len1--;
				}
			}
		}
		for (WorkflowActionRecord war : recordList) {
			String hql = "select o from WorkflowStepAction o where o.id.stepactioncode=? and o.id.stepcode=? and o.id.workflowcode=?";
			Object[] params = new Object[] { war.getStepactioncode(),
					war.getStepcode(), war.getWorkflowcode() };
			WorkflowStepAction ws = workflowDao.getWorkflowStepAction(hql,
					params);
			if (ws != null) {
				list1.add(ws);
			}
		}

		return list1;
	}

	/**
	 * 获取当前步骤的之前的步骤
	 * 
	 * @return
	 */
	public List<WorkflowStepAction> getAllPreviousWorkflowStepActionByCurrentStep(
			List<WorkflowActionRecord> recordList, String workflowcode,
			String currenStep, String actionname) {
		List<WorkflowStepAction> list1 = getAllWorkflowStepActionByWorkFlowFode(
				workflowcode, actionname);
		List<WorkflowStepAction> list2 = new ArrayList<WorkflowStepAction>();
		List<WorkflowStepAction> list3 = new ArrayList<WorkflowStepAction>();

		// 去除重复
		int len1 = recordList.size();
		for (int i = 0; i < len1 - 1; i++) {
			WorkflowActionRecord war = recordList.get(i);
			for (int j = i + 1; j < len1; j++) {
				if (war.getStepcode().equals(recordList.get(j).getStepcode())) {
					if (war.getAudittime().getTime() > recordList.get(j)
							.getAudittime().getTime()) {
						recordList.remove(j);
					} else {
						recordList.remove(i);
					}
					j--;
					len1--;
				}
			}
		}
		// for(WorkflowActionRecord war : recordList){
		// System.out.println(war.getStepcode()+"___"+war.getAudittime());
		// }
		if (null != list1 && list1.size() > 0) {
			// 递归遍历当前状态的所有之前的步骤
			list2 = workflowStepActionIterator(list1, list2, currenStep);
			// 遍历当前步骤的所有上一步的步骤是否在历史记录出现过
			back: for (WorkflowStepAction wsa : list2) {
				for (WorkflowActionRecord war : recordList) {
					if (war.getStepactioncode().equals(
							wsa.getId().getStepactioncode())) {
						list3.add(wsa);
						continue back;
					}
				}
			}
			// 将当前步骤也加进去
			for (WorkflowStepAction wsa : list1) {
				if (currenStep.equals(wsa.getId().getStepcode())) {
					list3.add(0, wsa);// .add(wsa);
					break;
				}
			}
		}
		// 去除重复
		int len2 = list3.size();
		for (int i = 0; i < len2 - 1; i++) {
			WorkflowStepAction wsa = list3.get(i);
			for (int j = i + 1; j < len2; j++) {
				if (wsa.getId().getStepactioncode().equals(
						list3.get(j).getId().getStepactioncode())) {
					list3.remove(j);
					j--;
					len2--;
				}
			}
		}

		return list3;
	}

	/**
	 * 递归遍历上一步步骤
	 */
	public List<WorkflowStepAction> workflowStepActionIterator(
			List<WorkflowStepAction> list1, List<WorkflowStepAction> list2,
			String currenStep) {
		for (WorkflowStepAction wsa : list1) {
			if (wsa.getNextstepcode().equals(currenStep)) {
				if (list2 != null && list2.size() > 0) {
					boolean isTrue = false;
					for (WorkflowStepAction wsa2 : list2) {
						if (wsa2.getActionname().equals(wsa.getActionname())
								&& wsa2.getId().getStepactioncode().equals(
										wsa.getId().getStepactioncode())
								&& wsa2.getId().getStepcode().equals(
										wsa.getId().getStepcode())
								&& wsa2.getActionfullname().equals(
										wsa.getActionfullname())) {
							isTrue = true;
						}
					}
					if (!isTrue) {
						list2.add(wsa);
					}
				} else {
					list2.add(wsa);
				}
				workflowStepActionIterator(list1, list2, wsa.getId()
						.getStepcode());
			}
		}
		return list2;
	}
	
	/**
	 * 获得回退前工作流步骤
	 * 
	 * @param stepCode
	 *            步骤编号
	 * @param workflowCode
	 *            工作流编号
	 * @return
	 */
	public WorkflowActionRecord getBackWorkflowRecord(String entityid,String targetstepcode,String steptype) {
		return workflowActionRecordDao.getBackWorkflowRecord(entityid, targetstepcode,steptype);
	}
	
	/**
	 * 获得当前状态的后续步骤
	 * 
	 * @param stepCode
	 *            步骤编号
	 * @param workflowCode
	 *            工作流编号
	 * @return
	 */
	public List<WorkflowStep> getWorkflowStep(String stepcode,String workflowcode) {
		return workflowStepDao.getWorkflowStep(stepcode, workflowcode);
	}	
	
	/**
	 * 获得当前状态的所允许跳转的后续步骤
	 * 
	 * @param stepCode
	 *            步骤编号
	 * @param workflowCode
	 *            工作流编号
	 * @return
	 */
	public List<WorkflowStep> getWorkflowSteps(String stepcode,String workflowcode) {
		return workflowStepDao.getWorkflowSteps(stepcode, workflowcode);
	}	
	
}
