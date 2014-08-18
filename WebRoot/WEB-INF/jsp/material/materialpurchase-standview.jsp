<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ include file="/common/taglibs.jsp"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
		<title>物品采购信息详情</title>

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
		<form id="toinframe">
			<table width="520px" border="1" align="center" class="grid">
				<tr>
					<td align="left" class="Main_Tab_Style_title" style="width: 80px; height: 20px;">
						物品名称：
					</td>
					<td align="left" class="Main_Tab_Style_Content">
						<input type="text" name="materialname" class="TextBox" value="${materials.materialname}" disabled="disabled" style="width: 170px; height: 20px;" />
					</td>
					<td align="left" class="Main_Tab_Style_title" style="width: 80px; height: 20px;">
						供应商：
					</td>
					<td align="left" class="Main_Tab_Style_Content">
					<input type="text" name="providername" class="TextBox" value="${providerid.providername}" disabled="disabled" style="width: 170px; height: 20px;" />
					</td>
				</tr>
				<tr>
					<td align="left" class="Main_Tab_Style_title" style="width: 80px; height: 20px;">
						批号：
					</td>
					<td align="left" class="Main_Tab_Style_Content">						
						<input type="text" name="batchno" class="TextBox" value="${batchno}" style="width: 170px; height: 20px;" />
					</td>
					<td align="left" class="Main_Tab_Style_title" style="width: 80px; height: 20px;">
						浓度：
					</td>
					<td align="left" class="Main_Tab_Style_Content">
						<input type="text" name="consistence" value="${consistence}" class="TextBox" disabled="disabled" style="width: 170px;"/>
					</td>
				</tr>
								<tr>
					<td align="left" class="Main_Tab_Style_title" style="width: 80px; height: 20px;">
						不确定度：
					</td>
					<td align="left" class="Main_Tab_Style_Content">
						<input type="text" name="uncertainty" value="${uncertainty}" class="TextBox" disabled="disabled"  style="width: 170px;"/>
					</td>
					<td align="left" class="Main_Tab_Style_title" style="width: 80px; height: 20px;">
						稀释倍数：
					</td>
					<td align="left" class="Main_Tab_Style_Content">
						<input type="text" name="dilutionmultiple" value="${dilutionmultiple}" class="TextBox" disabled="disabled"  style="width: 170px;"/>
					</td>
				</tr>
					<td align="left" class="Main_Tab_Style_title" style="width: 80px; height: 20px;">
						失效日期：
					</td>
					<td align="left" class="Main_Tab_Style_Content">
						<input type="text" name="expirationdate" class="Wdate"  value="${expirationdate}" style="width: 170px;"/>
					</td>
					<td align="left" class="Main_Tab_Style_title"
					style="width: 80px; height: 20px;">
					仓库：
				</td>
				 <td align="left" class="Main_Tab_Style_Content">
					 <input type="text" name="warehousename" class="TextBox" value="${warehouseid.warehousename}" disabled="disabled" style="width: 170px; height: 20px;" />
				 	</td>
				</tr>
				<tr>
					<td align="left" class="Main_Tab_Style_title" style="width: 80px; height: 20px;">
						存放位置：
					</td>
					<td align="left" class="Main_Tab_Style_Content">
					<input type="text" name="depositplace" class="TextBox " value="${depositplace}"  disabled="disabled" style="width: 170px; height: 20px;" />
					</td>
					<td align="left" class="Main_Tab_Style_title" style="width: 80px; height: 20px;">
						存放条件：
					</td>
					<td align="left" class="Main_Tab_Style_Content">
						<input type="text" name="depositcondition" class="TextBox" value="${depositcondition}"  disabled="disabled"  style="width: 170px; height: 20px;" />
					</td>
				</tr>
				<tr>
					<td align="left" class="Main_Tab_Style_title" style="width: 80px; height: 20px;">
						保管人：
					</td>
					<td align="left" class="Main_Tab_Style_Content">
						<input type="text" name="userinfo.realname" id="personname"  disabled="disabled"  class="TextBox" value="${userinfo.realname}" style="width: 170px;"/>
					</td>
					<td align="left" class="Main_Tab_Style_title" style="width: 80px; height: 20px;">
						入库数量：
					</td>
					<td align="left" class="Main_Tab_Style_Content">
						<input type="text" name="storagenum" id="storagenum" disabled="disabled"  value="${storagenum}" class="TextBox" style="width: 170px;"/>
					</td>
				</tr>
				<tr>
					<td align="left" class="Main_Tab_Style_title" style="width: 80px; height: 20px;">
						剩余数量：
					</td>
					<td align="left" class="Main_Tab_Style_Content">
						<input type="text" name="remainingnum" id="remsum" value="${remainingnum}" class="TextBox" style="width: 170px;"  disabled="disabled" />
					</td>
				<tr>
				
				</tr>
				<tr>
					<td align="left" class="Main_Tab_Style_title" style="width: 80px; height: 20px;">
						备注：
					</td>
					<td colspan="3" align="left" class="Main_Tab_Style_Content">
						<textarea class="TextBox" disabled="disabled"   style="width: 420px; height: 80px;" name="remark" value="${remark}"></textarea>
					</td>
				</tr>
				
			</table>
		</form>
	</body>
</html>
