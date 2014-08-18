<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="/common/taglibs.jsp"%>


<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<title>领用人管理</title>
		
		<link rel="stylesheet" href="${ctx}/themes/default/easyui.css"type="text/css" />
		<link rel="stylesheet" type="text/css" href="${ctx}/themes/icon.css">
		<script type="text/javascript" src="${ctx}/js/jquery-1.7.2.min.js"></script>
		<script type="text/javascript" src="${ctx}/js/jquery.easyui.min.js"></script>
		<script type="text/javascript" src="${ctx}/js/easyui-lang-zh_CN.js"></script>
		<script type="text/javascript" src="${ctx}/js/jquery.MultiFile.js"></script>
		<script type="text/javascript" src="${ctx}/validate/input.validate.js"></script>
		<script type="text/javascript" src="${ctx}/lims/js/material/inventory-history.js"></script>
			<script type="text/javascript" src="${ctx }/js/DatePicker/WdatePicker.js"></script>
		<script type="text/javascript">
		var rootPath = "${ctx}";
		$(document).ready(function() { 
			initHistoryData("${inventoryid}");
		});
		</script>
	</head>
	<body>
		<div 
			style="height: 30px; margin: 0 0px 0px 0; size: 100px">
			<input type="hidden" name="inventoryid" value="${inventoryid }" />
			<div>
				<table class="Main_Tab_Style" style="width: 100%; height: 22px">
					<tr>
						<td align="left" class="Main_Tab_Style_title"
							style="width: 60px; text-align: left">
							领用人：
						</td>
						<td align="left" width="40px" class="Main_Tab_Style_Content">
							<input type="text" name="realname" id="realname" class="TextBox"
								style="width: 120px; height: 20px;" />
						</td>
					<td class="Main_Tab_Style_title">领用日期：</td>
			<td class="Main_Tab_Style_Content">
				<input id="fromdate" class="Wdate" onFocus="showDataTimeDailog('yyyy-MM-dd')" style="width:100px;"/>
				<font style="font-size: 12px;color:#1281bb;">至</font>
				<input id="todate" class="Wdate" onFocus="showDataTimeDailog('yyyy-MM-dd')" style="width:100px;"/>
			</td>
			<td style="width:13%;">
				<input type="submit" value="查询"  class="Button_out" onclick="searchObj()"/>							
			</td>
				</tr>
				</table>
			</div>
		</div>
	<input type="hidden" name="useid" id="useid"value="${useid }" />
		<table width="100%" class="grid">
			<tr height="25" class="grid-header">
				<td colspan="6" style="text-align: left">
					<input type="button" value="添加" class="Button_out"
						onClick="addWin('${inventoryid}')" />					
					<input type="button" value="删除" class="Button_out"
						onClick="delAll('')" />
				</td>
			</tr>
		</table>

		<div  style="height: 350px; margin: 0 2px 2px 0">
			<table id="historygrid"></table>

		</div>
	</body>

</html>
