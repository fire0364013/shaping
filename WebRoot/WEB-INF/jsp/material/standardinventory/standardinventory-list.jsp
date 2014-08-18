<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="/common/taglibs.jsp"%>


<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<title>库存管理</title>
		
		<link rel="stylesheet" href="${ctx}/themes/default/easyui.css"type="text/css" />
			<link rel="stylesheet" href="${ctx}/js/DatePicker/skin/WdatePicker.css" type="text/css" />
		<link rel="stylesheet" type="text/css" href="${ctx}/themes/icon.css">
		<script type="text/javascript" src="${ctx}/js/jquery-1.7.2.min.js"></script>
		<script type="text/javascript" src="${ctx}/js/jquery.easyui.min.js"></script>
		<script type="text/javascript" src="${ctx}/js/easyui-lang-zh_CN.js"></script>
			<script type="text/javascript" src="${ctx}/js/DatePicker/WdatePicker.js"></script>
		<script type="text/javascript" src="${ctx}/js/jquery.MultiFile.js"></script>
		<script type="text/javascript" src="${ctx}/validate/input.validate.js"></script>
		
		<script type="text/javascript">
			var rootPath = "${ctx}"; 
			$(document).ready(function() {
				initDataGrid();
			});
		</script>
		<script type="text/javascript" src="${ctx}/lims/js/material/standardinventory/inventory.js"></script>
	</head>
	<body>
		<div 
			style="height:30px; margin: 0 0px 0px 0; size: 100px">
			<input type="hidden" name="inventoryid" value="${inventoryid }" />
			<div>
				<table class="Main_Tab_Style" style="width: 100%; height: 22px">
					<tr>
						<td align="left" class="Main_Tab_Style_title"
							style="width: 100px; text-align: left">
							标准物质名称：
						</td>
						<td align="left" width="40px" class="Main_Tab_Style_Content">
							<input type="text" name="materialname" id="materialname" class="TextBox"
								style="width: 100px; height: 20px;" />
						</td>			

						<td align="left" class="Main_Tab_Style_title"
							style="width: 60px; text-align: left">
							批号：
						</td>
						<td align="left" width="40px" class="Main_Tab_Style_Content">
							<input type="text" name="batchno" id="batchno" class="TextBox"
								style="width: 80px; height: 20px;" />
						</td>
							<td align="left" class="Main_Tab_Style_title"
							style="width: 60px; height: 20px;">
							状态：
						</td>
						<td align="left" width="20px">
							<select  class="TextBox"  style="width: 100px" id="sta">
								<option  id="sta" value="" >请选择</option>
								<option  id="sta" value="0">正常</option>
								<option  id="sta" value="1">已处理</option>
								<option  id="sta" value="2">已过期</option>
								<option  id="sta" value="3">即将过期</option>
							</select>
						</td>
						<td align="left" class="Main_Tab_Style_title"
							style="width: 60px; height: 20px;">
							库存数量：
						</td>
						<td align="left" width="20px">
							<select  class="TextBox"  style="width: 100px" id="isten">
								<option  id="isten" value="" >请选择</option>
								<option  id="isten" value="0"><10</option>
								<option  id="isten" value="1">>=10</option>
							</select>
						</td>
							<td align="left" class="Main_Tab_Style_title"
							style="width: 60px; height: 20px;">领用日期：</td>
						<td class="Main_Tab_Style_Content" style="width: 100px;">
							<input type="text" id="starttime" onClick="showDataTimeDailog('yyyy-MM-dd');" class="Wdate"
								style="width: 100px; height: 20px;" value="${starttime}"/>
						</td>
						<td class="Main_Tab_Style_title"
							style="width: 20px; text-align: left">
							至：
						</td>
						<td class="Main_Tab_Style_Content" style="width: 100px;">
							<input type="text" id="endtime" onClick="showDataTimeDailog('yyyy-MM-dd');" class="Wdate"
								style="width: 100px; height: 20px;" value="${endtime}"/>
						</td>
						<td align="left" class="Main_Tab_Style_title"
							style="width: 60px; height: 20px;">
							入库人：
						</td>
						<td align="left" width="20px">
							<input type="text" id="storageman" class="TextBox" style="width: 100px; height: 20px;" />
						</td>
						<td class="Main_Tab_Style_Content"
							style="width: 80px text-align :   left;">
							<input type="button" class="Button_out" value="查询"
								onclick="query('')" />														
						</td>
						
					</tr>
				</table>
			</div>
		</div>
		<table width="100%" class="grid">
			<tr height="25" class="grid-header">
				<td colspan="6" style="text-align: left">
					<input type="button" value="入库" class="Button_out"
						onClick="putstor('')" />
				</td>
			</tr>
		</table>
		<div style="height:645px;">
			<table id="inventorygrid"></table>
		</div>
	</body>
</html>
