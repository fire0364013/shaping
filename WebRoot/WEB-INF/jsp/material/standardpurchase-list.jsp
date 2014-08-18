<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ include file="/common/taglibs.jsp" %>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<title>物品标准入库管理</title>		
		<link rel="stylesheet" href="${ctx}/themes/default/easyui.css" type="text/css" />
		<link rel="stylesheet" href="${ctx}/validate/validate.css" type="text/css" />
		<link rel="stylesheet" type="text/css" href="${ctx}/themes/icon.css">
		<script type="text/javascript" src="${ctx}/js/jquery-1.7.2.min.js"></script>
		<script type="text/javascript" src="${ctx}/js/jquery.easyui.min.js"></script>
		<script type="text/javascript" src="${ctx}/js/easyui-lang-zh_CN.js"></script>
		<script type="text/javascript" src="${ctx}/js/DatePicker/WdatePicker.js"></script>
		<link rel="stylesheet" href="${ctx}/js/DatePicker/skin/WdatePicker.css" type="text/css" />
		<script type="text/javascript" src="${ctx}/js/CommonCheck.js"></script>
		<script type="text/javascript" src="${ctx}/validate/input.validate.js"></script>
		<script language="JavaScript" type="text/javascript">
			var rootPath="${ctx}";			
			var step = "${info}"
			$(document).ready(function(){					
				initstandard(step);
			});
    	</script>
    	<script type="text/javascript" src="${ctx}/lims/js/material/standardpurchase.js"></script>
    	<script type="text/javascript" src="${ctx}/lims/js/material/addmaterials.js"></script>
	</head>
	<body >
		<div  style="height: 30px; size: 12px">
			<div>
			
				<table class="Main_Tab_Style" style="width: 100%; height:22px">
					<tr>
						<td class="Main_Tab_Style_title"
							style="width:100px; text-align: left">
							标准物品名称：
						</td>
						<td class="Main_Tab_Style_Content" style="width: 100px;">
							<input type="text" id="materialname"  class="TextBox" value="${materialname}"
								style="width: 100px; height: 20px;" />
						</td>	
						<td class="Main_Tab_Style_title"
							style="width: 80px; text-align: left">
							申请时间：
						</td>
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
                        
						<td class="Main_Tab_Style_title"
							style="width:80px; text-align: left" id="departtitle">
							申请部门：
						</td>
						<td class="Main_Tab_Style_Content" style="width: 100px;" id="departcontent">
						<select  class="TextBox"  style="width: 100px" id="depart">
						<option value="" >---请选择---</option>
							<c:forEach items="${departList}" var="departlist" >
								<option value="${departlist.deptid}">${departlist.deptname}</option> 
							</c:forEach>
						</select>
						</td>
					  <td class="Main_Tab_Style_Content" style="text-align:left;">
							<input type="button" class="Button_out" value="查询" onclick="query()"/>
						</td>
				</tr>
				</table>
			</div>
		</div>
		<div  style="width: 100%;height: 675px" >
		<table id="standarddata"></table></div>
	</body>
</html>
