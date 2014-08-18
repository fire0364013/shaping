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
		<title>部门管理</title>
		
		</style>
		<link rel="stylesheet" href="${ctx}/themes/default/easyui.css" type="text/css" />
		<link rel="stylesheet" type="text/css" href="${ctx}themes/icon.css">
		<script type="text/javascript" src="${ctx}/js/jquery-1.7.2.min.js"></script>
		<script type="text/javascript" src="${ctx}/js/jquery.easyui.min.js"></script>
		<script type="text/javascript" src="${ctx}/js/easyui-lang-zh_CN.js"></script>
		<script type="text/javascript" src="${ctx}/js/CommonCheck.js"></script>
		<link rel="stylesheet" href="${ctx}/validate/validate.css" type="text/css" />
		<script type="text/javascript" src="${ctx}/validate/input.validate.js"></script>
		<script language="JavaScript" type="text/javascript">
		var rootPath="${ctx}";
	</script>
	<script type="text/javascript" src="${ctx}/lims/js/department.select.js"></script>
    </script>
	</head>
	<body>
		<div  style="height: 57px; size: 12px">
				<table class="Main_Tab_Style" style="width: 100%; height: 22px">
					<tr>
						<td class="Main_Tab_Style_title"
							style="width: 15%; text-align: left">
							部门名称：
						</td>
						<td class="Main_Tab_Style_Content" style="width: 20%;">
							<input type="text" id="deptnames" class="TextBox"
								style="width: 100%; "/>
						</td>

						<td class="Main_Tab_Style_Content"
							style="width: 55%; text-align: left;">
							&nbsp;<input type="button" class="Button_out" value="查询" onclick="query()"/>
						</td>
					</tr>
					<tr>
						<td class="Main_Tab_Style_title"
							style="width: 15%; text-align: left">
							已选择部门：
						</td>
						<td class="Main_Tab_Style_Content" style="width: 20%;" colspan="2">
							<input type="text" id="seletdeptnames" class="TextBox" disabled="disabled"
								style="width: 100%; " value="${deptnames}"/>
						</td>

						
					</tr>
				</table>
				
		</div>
		<input type="hidden" id="seletdeptid" style="width: 100%" value="${deptnameid}"/>
		<div  style="width: 100%;height: 400px" >
			<table id="selectdepardata"></table>
		</div>
		
		
		
	</body>
</html>
