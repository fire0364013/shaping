<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="/common/taglibs.jsp" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    
    <title>评审意见</title>
	<link rel="stylesheet" href="${ctx}/themes/default/easyui.css" type="text/css" />
	<link rel="stylesheet" type="text/css" href="${ctx}/themes/icon.css">
	<link rel="stylesheet" href="${ctx}/validate/validate.css" type="text/css" />
	<script type="text/javascript" src="${ctx}/js/jquery-1.7.2.min.js"></script>
	<script type="text/javascript" src="${ctx}/js/jquery.easyui.min.js"></script>
	<script type="text/javascript" src="${ctx}/js/CommonCheck.js"></script>
	<script type="text/javascript" src="${ctx}/validate/input.validate.js"></script>		
	<script type="text/javascript">	
		var rootPath="${ctx}";
		var moduleid="${moduleid}";
		$(function(){
			opinionList();
		});
		
		function opinionList(){
			$('#datagrid').datagrid({
				nowrap: false,
				striped: true,
				collapsible:true,
				url: rootPath + '/normalauditrecord/normalauditrecord!opinionList.action?moduleid='+encodeURI(encodeURI(moduleid)),
				fit:true,
				fitColumns:true,
				scrollbarSize:0,
				columns:[[
			        {field:'id',checkbox:true,width:300,align : 'center'},					
					{field:'content',title:'常用意见',width:150,align : 'center'}
				]],
				pagination:true,
				rownumbers:true,
				pageSize:10,
				pageList:[10,20]
			});
		}
		
		function getOpinion(){
			var rows = $('#datagrid').datagrid('getSelections');
			var content = '';
			for(var i=0;i<rows.length;i++){
				if(content!='') content = content + ';\n';
				content = content + rows[i].content;
			}
			$('#opinion').val(content);
		}
	</script>
  </head>
  
  <body onkeydown="PreventBSK();">
  	<input type="hidden" id="opinion" value="获取选择意见" onclick="getOpinion()"/>
    <table id="datagrid"></table>	
  </body>
</html>
