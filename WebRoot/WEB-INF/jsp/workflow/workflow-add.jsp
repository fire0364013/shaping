<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ include file="/common/taglibs.jsp"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
		<title></title>
		<link rel="stylesheet" href="${ctx}/themes/default/easyui.css"	type="text/css"/>
		<link rel="stylesheet" type="text/css" href="${ctx}/themes/icon.css"/>
		<link rel="stylesheet" type="text/css"	href="${ctx}/validate/validate.css"/>
		
		<script type="text/javascript" src="${ctx}/js/jquery-1.7.2.min.js"></script>
		<script type="text/javascript" src="${ctx}/js/jquery.easyui.min.js"></script>
		<script type="text/javascript" src="${ctx}/js/easyui-lang-zh_CN.js"></script>
		<script type="text/javascript" src="${ctx}/validate/input.validate.js"></script>
		
		<script language="javascript">
		var rootPath="${ctx}";
		$(document).ready(function() {
			
		});
		</script>
	</head>
	
	<body onkeydown="PreventBSK();">
		<s:form id="WorkflowForm">
			<table style="width: 100%;" border="1" align="center" class="grid">
				<tr>
					<td align="left" class="Main_Tab_Style_title" style="width: 100px ; ">
						流程代码：
					</td>
					<td align="left" class="Main_Tab_Style_Content">
					<input type="text" id="workflowCode" name="workflowCode" class="TextBox grkj-validate" 
						validateParam="{type:'string',required:'true',maxLength:'100',message:'流程代码不能为空并且超过50个汉字！'}"							 
						style="width: 250px;  " value="${workflowCode}" /><font color="red" size="4px"> *</font>
					</td>
				</tr>
				<tr>
					<td align="left" class="Main_Tab_Style_title" style="width: 100px ; ">
						流程名称：
					</td>
					<td align="left" class="Main_Tab_Style_Content" >
					<input type="text" id="workflowName" name="workflowName" class="TextBox grkj-validate" 
						validateParam="{type:'string',required:'true',maxLength:'100',message:'流程名称不能为空并且超过50个汉字！'}"							 
						style="width: 250px;  " value="${workflowName}" /><font color="red" size="4px"> *</font>
					</td>
				</tr>
				<tr>
					<td align="left" class="Main_Tab_Style_title" style="width: 100px ; ">
						关联表名：
					</td>
					<td align="left" class="Main_Tab_Style_Content" >
					<input type="text" id="tableName" name="tableName" class="TextBox grkj-validate" 
						validateParam="{type:'string',required:'true',maxLength:'100',message:'关联表名不能为空并且超过50个汉字！'}"							 
						style="width: 250px;  " value="${tableName }" /><font color="red" size="4px"> *</font>
					</td>
				</tr>
				<tr>
					<td align="left" class="Main_Tab_Style_title" style="width: 100px ; ">
						关联字段：
					</td>
					<td align="left" class="Main_Tab_Style_Content" >
					<input type="text" id="tableFieldName" name="tableFieldName" class="TextBox grkj-validate" 
						validateParam="{type:'string',required:'true',maxLength:'100',message:'关联字段不能为空并且超过50个汉字！'}"							 
						style="width: 250px;  " value="${tableFieldName }" /><font color="red" size="4px"> *</font>
					</td>
				</tr>
			</table>
		</s:form>
	</body>
</html>