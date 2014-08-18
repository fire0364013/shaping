<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ include file="/common/taglibs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<title>委托监测任务登记</title>
		<link rel="stylesheet" href="${ctx}/themes/default/easyui.css" type="text/css" />
		<link rel="stylesheet" type="text/css" href="${ctx}/themes/icon.css" />
		<script type="text/javascript" src="${ctx}/js/jquery-1.7.2.min.js"></script>
		<script type="text/javascript" src="${ctx}/js/jquery.easyui.min.js"></script>
		<script type="text/javascript" src="${ctx}/js/CommonCheck.js"></script>
		<script type="text/javascript" src="${ctx}/js/jquery.json-2.3.js"></script>
		<script type="text/javascript" src="${ctx}/js/jquery.json-2.3.min.js"></script>
		<script type="text/javascript" src="${ctx}/validate/input.validate.js"></script>
		<script type="text/javascript">
		var rootPath = "${ctx}";
		$(document).ready(function(){
			initDataGrid();
		});
	
		</script>
		<script type="text/javascript" src="${ctx}/lims/js/projects/task.register.js"></script>
	</head>

	<body  onkeydown="PreventBSK()" class="easyui-layout">
		<input type="hidden" id="projectcode"/>
		<input type="hidden" id="stepcode" name="stepcode"/>
		
		<!--任务右键菜单-->		
		<div id="taskContextMenu" class="easyui-menu" style="width:120px;">		
	        <div id="delTask" iconCls="icon-remove" onclick="javascript:removeTask();">删除任务</div>
	        <div id="copyTask" iconCls="icon-copy" onclick="javascript:copyTask();">复制任务</div>
	        <%--<div id="viewTask" iconCls="icon-search" onclick="javascript:viewTaskList();">查看任务单</div>--%>
		</div>
		
		<!-- 任务列表 -->
		<div region="west" split="true" title="任务信息" style="width:410px;">
			<div class="grid-headerSpace" style="height:23px;">
				<input type="button" value="提交" class="Button_out" onclick="openDialog('提交')" />
				<%--<input type="button" value="终止" class="Button_out" onclick="openDialog('终止')" />--%>
				<input type="button" value="检索" class="Button_out" onclick="toSearchObj()" />
				<input type="button" value="添加" class="Button_out" onclick="toTaskBasicInfo()" />
			</div>
			<div id="taskDiv" style="height:660px;">
				<table id="datagrid"></table>
			</div>
			
		</div>
		
		<!-- 任务相关信息 -->
		<div region="center" title="">
			<div id="tt" class="easyui-tabs" fit="true">
				<div title="基本信息" style="display: block;">
					<iframe id="BasicInfoFrame" width="100%" height="568"	frameborder="0" scrolling="no" src=""></iframe>
				</div>
				<div title="任务计划单" style="display: block;">
					<iframe id="TaskListFrame" width="100%" height="668"	frameborder="0" style="overflow-x:hidden;overflow-y:auto" src=""></iframe>
				</div>
				<div title="监测企业" style="display:block;">
	               <iframe id="MonitorEntFrame" width="100%" height="99.7%" frameborder="0" scrolling="no" src=""></iframe>
	            </div>
	            <div title="审核记录" style="display: block;">
					<iframe id="AppraiseOpinionFrame" width="100%" height="99.7%"	frameborder="0" scrolling="no" src=""></iframe>
				</div>
				<div title="流程图" style="display: block;">
					<iframe id="WorkflowImgFrame" width="100%" height="668"	frameborder="0" scrolling="no" src=""></iframe>
				</div>
				 <div title="附件" style="display: block;">
					<iframe id="AttachmentFrame" width="100%" height="100%" frameborder="0" scrolling="no" src=""></iframe>
				</div>
			</div>
		</div>
	</body>
</html>
