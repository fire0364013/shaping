<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ include file="/common/taglibs.jsp"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
		<title>企业信息选择</title>
		<link rel="stylesheet" href="${ctx }/js/DatePicker/skin/WdatePicker.css" type="text/css" />
		<link rel="stylesheet" href="${ctx}/themes/default/easyui.css"	type="text/css" />
		<link rel="stylesheet" type="text/css"	href="${ctx}/validate/validate.css"/>
		<link rel="stylesheet" type="text/css" href="${ctx}/themes/icon.css">
		<script type="text/javascript" src="${ctx}/js/jquery-1.7.2.min.js"></script>
		<script type="text/javascript" src="${ctx}/js/jquery.easyui.min.js"></script>
		<script type="text/javascript" src="${ctx}/validate/input.validate.js"></script>
	 	<script type="text/javascript" src="${ctx }/js/DatePicker/WdatePicker.js"></script>
		<script language="javascript" >
			var rootPath="${ctx}";
			var entid = "${id}";
			$(document).ready(function(){
				initDataGrid1();
				//getPollutionSourceType();
			//	regionData();
			});		
		</script>	
		<script type="text/javascript" src="${ctx}/lims/js/projects/entprise.select.js"></script>
	</head>
	<body onkeydown="PreventBSK();">
			<table width="100%" border="1" align="center" class="grid">
				<tr>
					<td align="left" class="Main_Tab_Style_title"
						style="width: 100px; height: 20px;">
						企业名称：
					</td>
					<td align="left" class="Main_Tab_Style_Content" width="150px">
						<input type="text" id="entname" class="TextBox"	style="width: 100%;">
					</td>
					<td align=center class="Main_Tab_Style_Content">
						<input type="button" value="查询"  class="Button_out" onclick="query()"/>
						<!-- 
						<input type="button" value="新增企业" class="Button_out" onClick="editEntpriseinfo()" />
						 -->
					</td>
				</tr>
			</table>
		<div  style="width: 100%;height: 480px; top-align:top;" >
			<input type="hidden" id="entid"/>
			<input type="hidden" id="name"/>
			<input type="hidden" id="address"/>
		 	<table id="datagrid"></table>
		</div>
	</body>
</html>
