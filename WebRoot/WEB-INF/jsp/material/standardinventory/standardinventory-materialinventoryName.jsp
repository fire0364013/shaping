<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="/common/taglibs.jsp"%>


<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<title>标准物品库存选择管理</title>
		
		<link rel="stylesheet" href="${ctx}/themes/default/easyui.css"type="text/css" />
		<link rel="stylesheet" type="text/css" href="${ctx}/themes/icon.css">
		<script type="text/javascript" src="${ctx}/js/jquery-1.7.2.min.js"></script>
		<script type="text/javascript" src="${ctx}/js/jquery.easyui.min.js"></script>
		<script type="text/javascript" src="${ctx}/js/jquery.MultiFile.js"></script>
		<script type="text/javascript" src="${ctx}/validate/input.validate.js"></script>
		
		<script type="text/javascript">
			var rootPath = "${ctx}";
			var flagItemname="${flagName}";  
		</script>
		<script type="text/javascript" src="${ctx}/lims/js/material/standardinventory/standinventory-selName.js"></script>
	</head>
	<body onkeydown="PreventBSK();">
		<div  style="height: 30px; margin: 0 0px 0px 0; size: 100px">
			<input type="hidden" name="materialid" id="materialid" value="${materialid }" />
			<input type="hidden" name="comsistence" id="comsistence" value="${comsistence }" /><!-- 浓度 -->
			<input type="hidden" name="materialname" id="materialname" />					
				<table class="Main_Tab_Style" style="width: 100%; height: 22px">
					<tr>
						<td align="left" class="Main_Tab_Style_title"
							style="width: 100px; text-align: left">
							标准物质名称：
						</td>
						<td align="left" width="40px" class="Main_Tab_Style_Content">
							<input type="text" name="materialnames" id="materialnames" class="TextBox"
							 value="${flagName }"	style="width: 120px; height: 20px;" />
						</td>
						<td align="left" class="Main_Tab_Style_title"
							style="width: 80px; text-align: left">
							批号：
						</td>
						<td align="left" width="40px" class="Main_Tab_Style_Content">
							<input type="text" name="batchno" id="batchno" class="TextBox"
							 value="${batchno }"	style="width: 120px; height: 20px;" />
						</td>
						<td class="Main_Tab_Style_Content"
							style="width: 100px text-align :   left;">
							<input type="button" class="Button_out" value="查询"
								onclick="query('')" />														
						</td>
						
					</tr>
				</table>
		</div>
		
		<div  style="height: 400px; margin: 0 2px 2px 0">
			<table id="checknamegrid"></table>
		</div>
	</body>
</html>
