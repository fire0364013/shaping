<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ include file="/common/taglibs.jsp" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
		<title>项目列表_分析任务接收</title>
		<link rel="stylesheet" href="${ctx}/themes/default/easyui.css" type="text/css" />
		<link rel="stylesheet" type="text/css" href="${ctx}/themes/icon.css">
		<script type="text/javascript" src="${ctx}/js/jquery-1.7.2.min.js"></script>
		<script type="text/javascript" src="${ctx}/js/jquery.easyui.min.js"></script>
		<script type="text/javascript" src="${ctx}/js/CommonCheck.js"></script>
		<link rel="stylesheet" href="${ctx}/validate/validate.css" type="text/css" />
		<script type="text/javascript" src="${ctx}/validate/input.validate.js"></script>
		<script type="text/javascript" src="${ctx}/lims/js/iteminfo/task.incept.itemselect.js"></script>
		<script language="JavaScript" type="text/javascript">
			var rootPath="${ctx}";
    	</script>
	</head>
<body onkeydown="PreventBSK();">
	<table class="Main_Tab_Style" style="width: 590px; height: 22px">
	<tr>
		<td align="left" class="Main_Tab_Style_title" style="width: 120px; height: 20px;">
			已选监测项目：
		</td>
		<td colspan="4" align="left" class="Main_Tab_Style_Content"  style="width:420px;height:20px;">
			<input type="text" id="selectedItemnames" value="${selectedItemnames}" class="TextBox" style="width:95%;height:20px;" disabled="disabled"/>
			<input type="hidden" id="selectedItemid" value="${selectedItemid}" class="TextBox" style="width:100px;height:20px;"/>
		</td>
	</tr>		
		<tr>
			<td class="Main_Tab_Style_title" style="width: 120px; height: 20px;">监测类型:</td>
			<td class="Main_Tab_Style_Content" style="width: 15%;">	
			<select class="TextBox " id="itemtypeid" name="itemtypeid"style="width:150px; height: 20px">
				<option value="">---请选择---</option>
					<c:forEach var="itemTypeList1" items="${itemTypeList }">
						<option value="${itemTypeList1.itemtypeid}">${itemTypeList1.itemtypename}</option>
					</c:forEach>
			</select>
				
			</td>	
			<td class="Main_Tab_Style_title" style="width: 20%;">项目名称:</td>
			<td class="Main_Tab_Style_Content" style="width: 15%;">	
				<input type="text" name="itemname" id="itemname" class="TextBox" style="width:150px;"/>
			</td>				
			<td>
				<input type="button" value="查询"  class="Button_out" onclick="query()"/>
			</td>						
		</tr>
	</table>
		<input type="hidden" id="itemid" class="TextBox" style="width:99.5%;height:20px;" />
		<input type="hidden" id="itemtypeid" class="TextBox" style="width:99.5%;height:20px;" />
		<div style="width: 100%; height: 350px; margin: 0 2px 2px 0">
		<table id="selectitem"></table>
	</div>
  </body>
</html>