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
		/*function test(){
			$.post(rootPath+"/sampletest/batch/batch!test.action",{},function(){
				
			});
		}*/
	</script>
	<script type="text/javascript" src="${ctx}/lims/js/department.js"></script>
	</head>
	<body onkeydown="PreventBSK();">
		<div  style="height: 30px; size: 12px">
			<div>
			
				<table class="Main_Tab_Style" style="width: 100%; height: 22px">
					<tr>
						<td class="Main_Tab_Style_title"
							style="width: 8%; text-align: left">
							部门名称：
						</td>
						<td class="Main_Tab_Style_Content" style="width: 10%;">
							<input type="text" id="deptnames" class="TextBox"
								style="width: 100%; "/>
						</td>

						<td class="Main_Tab_Style_Content"
							style="width: 55%; text-align: left;">
							&nbsp;<input type="button" class="Button_out" value="查询" onclick="query()"/>
							<%--<input type="button" class="Button_out" value="test" onclick="test()"/>
						--%></td>
					</tr>
				</table>
				
			</div>
		</div>
		<table width="100%" class="grid" >
				<tr height="25" class="grid-header">
					<td colspan="6" style="text-align: left">
						<input type="button" value="添加" class="Button_out"
							onClick="addWin('')" />
						<input type="button" value="删除" class="Button_out" 
							onClick="delAll('')" />
					</td>
				</tr>
		</table>
		<div  style="width: 100%;height: 655px" >
			<table id="datagrid1"></table>
		
		</div>
		
		
		
	</body>
</html>
