<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ include file="/common/taglibs.jsp" %>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
		<title>短信提醒用户列表</title>
		<link rel="stylesheet" href="${ctx}/themes/default/easyui.css" type="text/css" />
		<link rel="stylesheet" type="text/css" href="${ctx}/themes/icon.css">
		<script type="text/javascript" src="${ctx}/js/jquery-1.7.2.min.js"></script>
		<script type="text/javascript" src="${ctx}/js/jquery.easyui.min.js"></script>
		<script type="text/javascript" src="${ctx}/js/CommonCheck.js"></script>
		<link rel="stylesheet" href="${ctx}/validate/validate.css" type="text/css" />
		<script type="text/javascript" src="${ctx}/validate/input.validate.js"></script>
		<script language="JavaScript" type="text/javascript">
		var rootPath="${ctx}";
		$(function(){
			$('#workflowstep').tree({
				checkbox:true,
				url: rootPath+"/message/messagegroup!toWorkflowStep.action?workflowcode=JC_PROJECT",
				 onLoadSuccess:function(){
				 	$('#groupFrame').attr("src","");
				 },
				 onClick: function(node) {
				 selectView('分组信息');
				 	$('#groupFrame').attr("src","");
					var workcode = node.id;
				 	if(workcode != ''){
				 		messageworkgroup(workcode);
				 	}
				},onContextMenu:flowcontextMenu
			});
		 selectView();
	});
	function flowcontextMenu(e,node){
			$('#workflowstep').tree('select',node.target);
			$("#workflowcode").val(node.id);
			$("#workflowstep-menu").menu("show", {left: e.pageX,top: e.pageY});
			e.preventDefault();
		}
	function selectView(title){
			$('#tt').tabs({
				onSelect: function(title){
					if(title == '分组基本管理'){
						if($('#groupFrame').attr('src')==undefined||$('#groupFrame').attr('src')==""){
							$("#groupFrame").attr("src",rootPath+"/message/messagegroup!toGroupPage.action");
						}
					}
				}
			});	
		}
		
		function test(){
			$.post(rootPath +"/message/messagegroup!testsend.action",
			function(data){
						});
		}
    	</script>
    	 <script type="text/javascript" src="${ctx}/lims/js/message/messagegroup-list.js"></script>
	</head>


	<body class="easyui-layout" width="100%" height="100%;">
	
		<input id="workflowcode" type="hidden">
		<input id="messageworkgroupid" type="hidden"/>
	
		<div region="west" title="工作流" split="true" border="ture" 
			style=" width: 250px; font-family:helvetica,tahoma,verdana,sans-serif; padding:5px; font-size:13px; margin:0;">
		 	<ul id="workflowstep"></ul>
		</div>
		
		
		<div region="center" border="ture" title="" split="true" id="workgroups">
			<div id="tt" class="easyui-tabs" fit="true">
				<div title="分组信息" style="display: block;">
					<!--<div class="panelheader" style="margin:0px 0 0 0">分组信息</div>-->
					<div  style="width: 100%;height: 22px;" >
						<input type="button" class="Button_out" value="批量删除" onclick="delmanygroup();"/>
							<input id="jj" type="button" class="Button7_out"  value="测试短信接口" onclick="test();">
					</div>
					<div  style="width: 100%;height: 182px;" >
						<!--<table id="messagegroupdatagrid" ></table>
					-->
					<ul id="workgrouptree"></ul>
					</div>
					<div class="panelheader" style="margin:0px 0 0 0">人员信息</div>
					<div style="width: 100%; height: 230px;">  
						<div  style="width: 100%;height: 222px;" >
							<table id="userdatagrid1" ></table>
						</div>
					</div>
				</div>
				<div title="分组基本管理" style="display: block;">
					<iframe id="groupFrame" width="100%" height="100%" frameborder="0" style="overflow-x:hidden;overflow-y:auto" src=""></iframe>
				</div>
			</div>
		</div>
			<div id="grouptree-menu" class="easyui-menu" style="width:120px;">		
				<div id="deletegroup" onClick="delworkGroup()">删除分组</div>
			</div>	
			<div id="workflowstep-menu" class="easyui-menu" style="width:120px;">		
				<div id="addgroup" onClick="addworkGroup()">添加分组</div>
			</div>	
		
	</body>
</html>