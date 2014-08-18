<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ include file="/common/taglibs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<title>任务签发</title>
		<link rel="stylesheet" href="${ctx}/themes/default/easyui.css" type="text/css" />
		<link rel="stylesheet" type="text/css" href="${ctx}/themes/icon.css" />
		<script type="text/javascript" src="${ctx}/js/jquery-1.7.2.min.js"></script>
		<script type="text/javascript" src="${ctx}/js/jquery.easyui.min.js"></script>
		<script type="text/javascript" src="${ctx}/js/CommonCheck.js"></script>
		<script type="text/javascript" src="${ctx}/js/jquery.json-2.3.js"></script>
		<script type="text/javascript" src="${ctx}/js/jquery.json-2.3.min.js"></script>
		<script type="text/javascript" src="${ctx}/validate/input.validate.js"></script>
		<script type="text/javascript" src="${ctx}/js/jquery.blockUI.js"></script>
		<script type="text/javascript">
		var rootPath = "${ctx}";
		$(document).ready(function(){
			initDataGrid();
			addTabs('');
		});
		
		</script>
		<script type="text/javascript" src="${ctx}/lims/js/projects/task.approve.js"></script>

	</head>

	<body class="easyui-layout">
		<input type="hidden" id="projectcode"/>
		<input type="hidden" id="stepcode" name="stepcode"/>
		<input type="hidden" id="monitortype"/>
		<div id="taskContextMenu" class="easyui-menu" style="width:120px;">		
	        <div id="viewTask" iconCls="icon-search" onclick="javascript:viewTaskList();">查看任务单</div>
		</div>
		
		<div region="west" split="true" title="任务信息" style="width: 410px; height: 400;">
			<div class="grid-headerSpace" style="height: 23px;">
				<input type="button" value="签发1" class="Button_out" style="display:none;" onclick="openDialog('提交')" />
				<input type="button" value="签发"  class="Button_out" onclick="checkFuntion('提交');" />
				<input type="button" value="退回" class="Button_out" onclick="checkAuditPerson('退回');" />
				<!--<input type="button" value="修改流程" class="Button_out" onclick="modifyWorkflow();" />
				--><input type="button" value="检索" class="Button_out" onclick="toSearchObj()" />
			</div>
			<div id="taskDiv" style="height:660px;">
				<table id="datagrid"></table>
			</div>	
		</div>
		<div region="center" title="">
			<div id="tt" class="easyui-tabs" style="display:block;" fit="true">
				<div title="基本信息" style="padding: 0px 0 0 0px; display: block;">
					<iframe id="BasicInfoFrame" width="100%" height="668"
						frameborder="0" scrolling="no" src=""></iframe>
				</div>
				<div title="任务计划单" style="display: block;">
					<iframe id="TaskListFrame" width="100%" height="668"	
					frameborder="0" style="overflow-x:hidden;overflow-y:auto" 
					src=""></iframe>
				</div>
				<div title="任务通知单" style="display: block;">
					<iframe id="TaskNoticeListFrame" width="100%" height="668"	
					frameborder="0" style="overflow-x:hidden;overflow-y:auto" 
					src=""></iframe>
				</div>
				<div title="委托协议" style="display: block;">
					<iframe id="WeituoFrame" width="100%" height="668"	
					frameborder="0" style="overflow-x:hidden;overflow-y:auto" 
					src=""></iframe>
				</div>
				<div title="监测企业" style="padding: 0px 0 0 0px; display: block;">
					<iframe id="MonitorEntFrame" width="100%" height="668px;"
						frameborder="0" scrolling="no" src=""></iframe>
				</div>
				 <div title="费用明细" style="display: block;">
					<iframe id="ChargeFrame" width="100%" height="100%" frameborder="0" scrolling="no" src=""></iframe>
				</div>
				<div title="分包信息" style="display: block;">
					<iframe id="SubFrame" width="100%" height="100%" frameborder="0" scrolling="no" src=""></iframe>
				</div>
	            <div title="流转记录" style="padding: 0px 0 0 0px; display: block;">
					<iframe id="AppraiseOpinionFrame" width="100%" height="668px;"
						frameborder="0" scrolling="no" src=""></iframe>
				</div>
				<div title="流程图" style="display: block;">
					<iframe id="TaskFlowChartFrame" width="100%" height="668px;"	frameborder="0" scrolling="no" src=""></iframe>
				</div>
				<div title="附件" style="display: block;">
					<iframe id="fjFrame" width="100%" height="668px;"	frameborder="0" scrolling="no" src=""></iframe>
				</div>
				
			</div>
		</div>
	</body>
</html>
