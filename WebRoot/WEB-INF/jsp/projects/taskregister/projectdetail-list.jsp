<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ include file="/common/taglibs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" >
<html>
	<head>
		<title>监测点列表</title>
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
		var projectcode = "${id}";
		$(document).ready(function(){
			$.post(rootPath + "/projects/taskregister/projectdetail!getMonitor.action",{"projectcode":projectcode},function(msg){
						if(msg=='001'){
							initDataGridByHuangj();
						}else{
							initDataGrid();
						}
					});
			
		});
		</script>
		<script type="text/javascript" src="${ctx}/lims/js/projects/project.detail.js"></script>
	</head>

	<body onkeydown="PreventBSK()">	
	    <div class="grid-headerSpace"  style="display:none;">
	   		<input type="button" value="添加" class="Button_out" onclick="addMonitorEnt()"/>
	   		<input type="button" value="删除" class="Button_out" onclick="deleteMonitorEnt()"/>
	    </div>
		<table id="datagrid"></table>
	</body>
</html>
