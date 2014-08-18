<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ include file="/common/taglibs.jsp"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
		<title>物品采购信息</title>

		<link rel="stylesheet" href="${ctx}/themes/default/easyui.css"	type="text/css" />
		<link rel="stylesheet" type="text/css" href="${ctx}/themes/icon.css"/>
		<link rel="stylesheet" type="text/css"	href="${ctx}/validate/validate.css"/>
		<script type="text/javascript" src="${ctx}/js/jquery-1.7.2.min.js"></script>
		<script type="text/javascript" src="${ctx}/js/jquery.easyui.min.js"></script>
		<script type="text/javascript" src="${ctx}/js/easyui-lang-zh_CN.js"></script>
		<script type="text/javascript" src="${ctx}/validate/input.validate.js"></script>
		<script type="text/javascript" src="${ctx}/js/DatePicker/WdatePicker.js"></script>
		<link rel="stylesheet" href="${ctx}/js/DatePicker/skin/WdatePicker.css" type="text/css" />
		<script language="javascript" >
			var rootPath="${ctx}";	
		</script>		
	</head>
	<body  onkeydown="PreventBSK();">
		<form id="materialframe" method="post">
			
			<table width="100%" border="1" align="center" class="grid">
				<tr>
					<td align="left" class="Main_Tab_Style_title" style="width: 150px; height: 20px;">
						物品名称：
					</td>
					<td align="left" class="Main_Tab_Style_Content">
						<input type="text" name="materials.materialname" class="TextBox" value="${materialpurchase.materialid.materialname}" disabled="true" style="width: 180px; height: 20px;" />
					</td>
				
					<td align="left" class="Main_Tab_Style_title" style="width: 150px; height: 20px;">
						规格型号：
					</td>
					<td align="left" class="Main_Tab_Style_Content">
						<input type="text" name="materialmodel.modelname" class="TextBox" value="${materialpurchase.materialmodel.modelname} " disabled="disabled" style="width: 180px; height: 20px;" />
					</td>
				</tr>
				<tr>
					<td align="left" class="Main_Tab_Style_title" style="width: 150px; height: 20px;">
						申请数量：
					</td>
					<td align="left" class="Main_Tab_Style_Content">
						<input type="text" name="materialpurchase.applynumber" class="TextBox" value="${materialpurchase.applynumber}" disabled="true"  style="width: 180px; height: 20px;" />
					</td>
				
					<td align="left" class="Main_Tab_Style_title" style="width: 150px; height: 20px;">
						申请科室：
					</td>
					<td align="left" class="Main_Tab_Style_Content">
					<input type="text" name="dept.deptname" class="TextBox" value="${dept.deptname}" disabled="true" style="width: 180px; height: 20px;" />
					</td>
					</tr>
				<tr>
					<td align="left" class="Main_Tab_Style_title" style="width: 150px; height: 20px;">
						申请人：
					</td>
					<td align="left" class="Main_Tab_Style_Content">
						<input type="text" name="userinfo.realname" class="TextBox" value="${userinfo.realname}"  disabled="true" style="width: 180px; height: 20px;" />
					</td>
				
					<td align="left" class="Main_Tab_Style_title" style="width: 150px; height: 20px;">
						申请时间：
					</td>
					<td align="left" class="Main_Tab_Style_Content">
						<input type="text" name="materialpurchase.applydate" onClick="showDataTimeDailog('yyyy-MM-dd');" disabled="true"  class="Wdate" value="${materialpurchase.applydate}" style="width:180px;"/>
					</td>
					</tr>
				<tr>
					<td align="left" class="Main_Tab_Style_title" style="width: 150px; height: 20px;">
						期望到货时间：
					</td>
					<td align="left" class="Main_Tab_Style_Content">
						<input type="text" name="materialpurchase.hopedate" value="${materialpurchase.hopedate}" onClick="showDataTimeDailog('yyyy-MM-dd');" disabled="true"  class="Wdate" style="width:180px;"/>
					</td>
			
					<td align="left" class="Main_Tab_Style_title" style="width: 150px; height: 20px;">
						到货时间：
					</td>
					<td align="left" class="Main_Tab_Style_Content">
						<input type="text" name="materialpurchase.reallydate" value="${materialpurchase.reallydate}" onClick="showDataTimeDailog('yyyy-MM-dd');" disabled="true"  class="Wdate" style="width:180px;"/>
					</td>
						</tr>
				<tr>
					<td align="left" class="Main_Tab_Style_title" style="width: 150px; height: 20px;">
						购买数量：
					</td>
					<td align="left" class="Main_Tab_Style_Content">
						<input type="text" name="materialpurchase.reallynumber" value="${materialpurchase.reallynumber}" disabled="true"  class="TextBox" style="width:180px;"/>
					</td>
					<td align="left" class="Main_Tab_Style_title" style="width: 150px; height: 20px;">
					</td>
					<td align="left" class="Main_Tab_Style_Content">
					</td>
				</tr>
				
			</table>
		</form>
	</body>
</html>
