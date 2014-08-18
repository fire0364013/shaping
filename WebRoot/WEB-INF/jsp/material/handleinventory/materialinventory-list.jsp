<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="/common/taglibs.jsp"%>


<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<title>库存管理</title>
		
		<link rel="stylesheet" href="${ctx}/themes/default/easyui.css"type="text/css" />
		<link rel="stylesheet" type="text/css" href="${ctx}/themes/icon.css">
		<script type="text/javascript" src="${ctx}/js/jquery-1.7.2.min.js"></script>
		<script type="text/javascript" src="${ctx}/js/jquery.easyui.min.js"></script>
		<script type="text/javascript" src="${ctx}/js/easyui-lang-zh_CN.js"></script>
		<script type="text/javascript" src="${ctx}/js/jquery.MultiFile.js"></script>
		<script type="text/javascript" src="${ctx}/validate/input.validate.js"></script>
		<script type="text/javascript" src="${ctx}/lims/js/material/handleinventory/handleinventory.js"></script>
		<script type="text/javascript">
			var rootPath = "${ctx}";
		
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
							物品名称：
						</td>
						<td align="left" width="40px" class="Main_Tab_Style_Content">
							<input type="text" name="materialname" id="materialname" class="TextBox"
								style="width: 120px; height: 20px;" />
						</td>
						<td align="left" class="Main_Tab_Style_title"
							style="width: 60px; height: 20px;">
							物品类型：
						</td>
						<td align="left" width="20px">
							<select class="TextBox " id=materialtype name="materialtype"
								style="width: 120px; height: 20px">
								<option value="">
									---请选择---
								</option>
								<c:forEach var="materialstypeList1" items="${materialstypeList }">
									<option value="${materialstypeList1.materialtypeid}">
										${materialstypeList1.meaterialname}
									</option>
								</c:forEach>
							</select>
						</td>
							
						<td align="left" class="Main_Tab_Style_title"
							style="width: 60px; text-align: left">
							批号：
						</td>
						<td align="left" width="40px" class="Main_Tab_Style_Content">
							<input type="text" name="batchno" id="batchno" class="TextBox"
								style="width: 120px; height: 20px;" />
						</td>
						
						<td class="Main_Tab_Style_Content"
							style="width: 100px text-align :   left;">
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
					<input type="button" value="处理" class="Button_out"
						onClick="handelAll('')" />
				</td>
			</tr>
		</table>
		<div  style="height: 645px; margin: 0 2px 2px 0">
			<table id="inventorygrid"></table>
		</div>
	</body>
</html>
