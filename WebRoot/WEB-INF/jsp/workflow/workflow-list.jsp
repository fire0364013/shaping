<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ include file="/common/taglibs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <title>工作程序配置</title>

	<link rel="stylesheet" href="${ctx}/themes/default/easyui.css" type="text/css" />
	<link rel="stylesheet" type="text/css" href="${ctx}/themes/icon.css" />
	<script type="text/javascript" src="${ctx}/js/jquery-1.7.2.min.js"></script>
	<script type="text/javascript" src="${ctx}/js/jquery.easyui.min.js"></script>
	<script type="text/javascript" src="${ctx}/js/CommonCheck.js"></script>
	<script type="text/javascript" src="${ctx}/js/jquery.json-2.3.js"></script>
	<script type="text/javascript" src="${ctx}/js/jquery.json-2.3.min.js"></script>
	<script type="text/javascript" src="${ctx}/validate/input.validate.js"></script>
	<script type="text/javascript" src="${ctx}/lims/js/workflow/workflow-list.js"></script>
	
	<script type="text/javascript">
		var rootPath = "${ctx}";
		$(document).ready(function(){
			initDataGrid();
		});
	</script>
  </head>
  
  <body onkeydown="PreventBSK()" class="easyui-layout">
  	<input type="hidden" id="workflowCode" />
  	
  	<!-- 工作程序列表  -->
  	<!-- 任务列表 -->
	<div region="west" split="true" title="工作任务信息" style="width:380px;">
		<div class="grid-headerSpace" style="height:23px;">
			<input type="button" value="添加" class="Button_out" onclick="addWorkflow();" />
			<input type="button" value="删除" class="Button_out" onclick="removeWorkflow();" />
		</div>
		<div id="workflowDiv" style="height:660px;">
			<table id="datagrid"></table>
		</div>
		
	</div>
	
	<!-- 任务相关信息 -->
	<div region="center" title="">
		<div id="tab" class="easyui-tabs" fit="true">
			<div title="业务流程图" style="display: block;">
				<iframe id="WorkflowGraph" width="100%" height="100%" frameborder="0" scrolling="no" src=""></iframe>
			</div>
		</div>
	</div>
  </body>
</html>
