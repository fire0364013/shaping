<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ include file="/common/taglibs.jsp" %>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <title>流转记录</title>
		<link rel="stylesheet" href="${ctx}/themes/default/easyui.css" type="text/css" />
		<link rel="stylesheet" type="text/css" href="${ctx}/themes/icon.css">
		<script type="text/javascript" src="${ctx}/js/jquery-1.7.2.min.js"></script>
		<script type="text/javascript" src="${ctx}/js/jquery.easyui.min.js"></script>
		<script type="text/javascript" src="${ctx}/js/easyui-lang-zh_CN.js"></script>
		<script type="text/javascript">	
			var rootPath="${ctx}";
		</script>
		<script type="text/javascript" src="${ctx}/lims/js/projects/appraiseopinion.js"></script>
  		<script type="text/javascript">
  		$(function(){
  			var entityid = "${id}";
  			var workFlowName = "${workFlowName}";
  			var steptype = "${steptype}";
  			opinionList(entityid,workFlowName,steptype);
  		});
  		//评审意见列表对话框  
function openOpinionListDlg(entityid,workFlowName){
	$('#datagrid1').datagrid('clearSelections');
	var url =  rootPath +'/projects/appraiseopinion/appraiseopinion!list.action?entityid='+entityid+"&workFlowName="+workFlowName;
	var _dialog =  window.top.$('<div id ="dlg" style="padding:0px;"><iframe id="appraiseopinionFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
	_dialog.dialog({
	title:'流转记录',
	autoOpen:false,
	modal:true,
	closed:true,
	width:'650',
	height:'338',
	onClose:function(){
			_dialog.dialog("destroy");					
		}
	});
	_dialog.dialog('open');
}
//评审意见列表
function opinionList(entityid,workFlowName,steptype){
    $('#AppraiseopinionDatagrid').datagrid({
    	scrollbarSize:0,
    	rownumbers: true,
//    	animate:true,
    	collapsible:true,
    	fit:true,
		fitColumns : true,
    	url:rootPath + '/projects/appraiseopinion/appraiseopinion!initOpinionList.action?entityid='+entityid+"&workFlowName="+workFlowName+"&steptype="+steptype,
    	idField:'id',
    	treeField:'status',
    	columns:[[
    			
				{field:'user',title:'审核人',width:100,align:'center'},
				{field:'step',title:'审核状态',width:150,align:'center'},
				{field:'time',title:'审核时间',width:130,align:'center'},					
				{field:'opinion',title:'审核意见',width:300,align:'center'}
		]],
		pagination:true,
		rownumbers:false,
		pageSize:20,
		pageList:[20,30,40,50]		
    });
	$(window).resize(function(){
		$("#AppraiseopinionDatagrid").datagrid('resize');
	});
}
		</script>
  </head>
  
  <body>
		<table id="AppraiseopinionDatagrid"></table>
  </body>
</html>
