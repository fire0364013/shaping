<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ include file="/common/taglibs.jsp" %>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<title>用户管理</title>
		<link rel="stylesheet" href="<%=path %>/themes/default/easyui.css" type="text/css" />
		<link rel="stylesheet" type="text/css" href="<%=path %>/themes/icon.css">
		<script type="text/javascript" src="<%=path %>/js/jquery-1.7.2.min.js"></script>
		<script type="text/javascript" src="<%=path %>/js/jquery.easyui.min.js"></script>
		<script type="text/javascript" src="<%=path %>/js/easyui-lang-zh_CN.js"></script>
		<script type="text/javascript" src="<%=path %>/js/CommonCheck.js"></script>
		<script language="JavaScript" type="text/javascript">
	
    </script>
	</head>
	<body onkeydown="PreventBSK();">
		<div id="dlg-buttons">
		<!-- 添加，修改 -->
			<table width="100%" border="1" align="center" class="grid">
				<tr>
					<td  align="left" class="Main_Tab_Style_title" width="100px">操作人员：</td>
					<td  align="left" class="Main_Tab_Style_Content" width="170px">
						<input  name="operationuser" class="TextBox" style="width: 150px;height:20px" disabled="disabled" value="${operationuser.loginname}">
					</td>
				</tr>
				<tr>
					<td  align="left" class="Main_Tab_Style_title" width="100px">操作时间：</td>
					<td  align="left" class="Main_Tab_Style_Content"width="170px">
						<input  name="operatetime" class="TextBox" style="width: 150px;height:20px" disabled="disabled" value="${operatetime}">
					</td>
					
				</tr>
				<tr>
					<td  align="left" class="Main_Tab_Style_title" width="100px">操作模块：</td>
					<td  align="left" class="Main_Tab_Style_Content"width="170px">
						<input  name="moduleid" class="TextBox" style="width: 150px;height:20px" disabled="disabled" value="${moduleid.modulename}">
					</td>
					
				</tr>
				<tr>
					<td  align="left" class="Main_Tab_Style_title" width="100px">操作说明：</td>
					<td  align="left" class="Main_Tab_Style_Content"width="170px">
						<textarea  name="operatecontent" class="TextBox" style="width: 150px;height: 80px" disabled="disabled">${operatecontent}</textarea>
					</td>
					
				</tr>
			</table>
		</div>
		
	</body>
</html>
