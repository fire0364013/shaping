<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ include file="/common/taglibs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" >
<html>
	<head>
		<title>分包信息列表</title>
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
		var projectcode = "${projectcode}";
		$(document).ready(function(){
			initDataGrid();
		});
		
		function initDataGrid(){
			$('#datagrid').datagrid({
				nowrap: false,
				striped: true,
				collapsible:true,
				url: rootPath + "/projects/taskregister/taskregister!subList.action?projectcode="+projectcode,
				fit:true,
				fitColumns:true,
				scrollbarSize:0,
				frozenColumns:[[
							{field:'subcontractid',checkbox:true,align:"center"}
					]],
				columns:[[
			        {field:'subName',title:'分包单位名称',width:200,align:'center'},
			        {field:'subAddr',title:'分包单位地址',width :200,align:"center"},
					{field:'subLinkman',title:'联系人',width:150,align : 'center'},
					{field:'subPhone',title:'联系电话',width:200,align : 'center'},
					{field:'subitems',title:'分包项目',width:300,align : 'center'},
					{field:'subreason',title:'分包原因',width:150,align : 'center'},
					{field:'subremark',title:'备注',width:150,align : 'center'}
				]]
			});
		}
		</script>
	</head>

	<body onkeydown="PreventBSK()">	
		<table id="datagrid"></table>
	</body>
</html>
