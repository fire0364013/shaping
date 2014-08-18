<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ include file="/common/taglibs.jsp" %>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
		<title>人员列表</title>
		<link rel="stylesheet" href="${ctx}/themes/default/easyui.css" type="text/css" />
		<link rel="stylesheet" type="text/css" href="${ctx}/themes/icon.css">
		<script type="text/javascript" src="${ctx}/js/jquery-1.7.2.min.js"></script>
		<script type="text/javascript" src="${ctx}/js/jquery.easyui.min.js"></script>
		<script type="text/javascript" src="${ctx}/js/CommonCheck.js"></script>
		<link rel="stylesheet" href="${ctx}/validate/validate.css" type="text/css" />
		<script type="text/javascript" src="${ctx}/validate/input.validate.js"></script>
		<script language="JavaScript" type="text/javascript">
		var rootPath="${ctx}";
		var itemid="${itemid}";
		var methodid="${methodid}";
		$(function(){
			certificateUser();
		});
    	</script>
    	 <script type="text/javascript" src="${ctx}/lims/js/userinfo-manyuser.js"></script>
	</head>


	<body width="100%" height="100%">
		<input type="hidden" id="selectedUser" value="${realname}" class="TextBox" style="width:99.5%;height:20px;"/>
		<input type="hidden" id="selectedUserid" value="${userid}" class="TextBox" style="width:45%;height:20px;"/>
		<table id="datagrid1"></table>
	</body>

</html>