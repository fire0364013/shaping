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
		<title>样品容器列表</title>
		<link rel="stylesheet" href="${ctx}/themes/default/easyui.css" type="text/css" />
		<link rel="stylesheet" type="text/css" href="${ctx}/themes/icon.css">
		<script type="text/javascript" src="${ctx}/js/jquery-1.7.2.min.js"></script>
		<script type="text/javascript" src="${ctx}/js/jquery.easyui.min.js"></script>
		<script type="text/javascript" src="${ctx}/js/CommonCheck.js"></script>
		<link rel="stylesheet" href="${ctx}/validate/validate.css" type="text/css" />
		<script type="text/javascript" src="${ctx}/validate/input.validate.js"></script>
		<script language="JavaScript" type="text/javascript">
		var rootPath="${ctx}";
    	</script>
    <script type="text/javascript" src="${ctx}/lims/js/toSelOneContainer.js"></script>
	</head>


<body class="easyui-layout" width="100%" height="100%">
				<div region="north" title="" split="true" border="ture"
					style="height: 35px;">
						<table width="100%" border="1" align="left" class="grid">
						<tr>
							<td align="left" class="Main_Tab_Style_title" style="width: 80px; height: 20px;">
								已选容器：
							</td>
							<td align="left" class="Main_Tab_Style_Content">
								<input type="text" id="selectedUser" class="TextBox grkj-validate"  value="${realname}"  style="width:99.5%;height:20px;" disabled="disabled"/>
								<input type="hidden" id="selectedUserid" class="TextBox grkj-validate"  value="${userid}" style="width:100px;height:20px;"/>
								<input type="hidden" id="selecteddeparname" class="TextBox grkj-validate"  value=""style="width:99.5%;height:20px;"/>
								<input type="hidden" id="selecteddeparid" class="TextBox grkj-validate"  value=""  style="width:99.5%;height:20px;"/>
							</td>
						</tr>				
					</table>
				</div>
				<div region="center" border="ture" title="" split="true">
					<table id="datagrid1"></table>
				</div>
		
	</body>

</html>