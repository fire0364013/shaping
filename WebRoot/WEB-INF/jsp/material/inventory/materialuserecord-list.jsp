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
		<script type="text/javascript" src="${ctx}/lims/js/material/materialusercord.js"></script>
			<script type="text/javascript" src="${ctx }/js/DatePicker/WdatePicker.js"></script>
		<script type="text/javascript">
		var rootPath = "${ctx}";
		$(document).ready(function() {
			initHistoryData('${flagName}');
		});
		</script>
	</head>
	<body>
		<form id="exportExcel"></form>
		<div  style="height: 30px; margin: 0 0px 0px 0; size: 100px">
			
			<table class="Main_Tab_Style" style="width: 100%; height:22px">
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
							
						<td class="Main_Tab_Style_title"
							style="width: 80px; text-align: left">
							领用人：
						</td>
						<td class="Main_Tab_Style_Content" style="width: 100px;">
							<input type="text" id="realname"  class="TextBox"  
								style="width: 100px; height: 20px;" />
						</td>	
						<td class="Main_Tab_Style_title"
							style="width: 80px; text-align: left">
							领用日期：
						</td>
						<td class="Main_Tab_Style_Content" style="width: 100px;">
							<input type="text" id="fromdate" onClick="showDataTimeDailog('yyyy-MM-dd');" class="Wdate"
								style="width: 100px; height: 20px;" />
						</td>
						<td class="Main_Tab_Style_title"
							style="width: 20px; text-align: left">
							至：
						</td>
						<td class="Main_Tab_Style_Content" style="width: 100px;">
							<input type="text" id="todate" onClick="showDataTimeDailog('yyyy-MM-dd');" class="Wdate"
								style="width: 100px; height: 20px;" value="${endtime}"/>
						</td>
					  <td class="Main_Tab_Style_Content" style="text-align:left;">
								<input type="submit" value="查询"  class="Button_out" onclick="searchObj()"/>		
						<input type="button" class="Button_out" value="导出" onclick="ExportExcel('${flagName}')"/>	
						</td>
					</tr>
				</table>
		</div>
		<table width="100%" class="grid">
			<tr height="25" class="grid-header">
				<td colspan="6" style="text-align: left">
					<input type="button" value="删除" class="Button_out"
						onClick="delAll('')" />
				</td>
			</tr>
		</table>
	<div  style="width: 100%;height: 655px" >
			<table id="historygrid"></table>
		</div>
	</body>
</html>
