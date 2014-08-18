<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="/common/taglibs.jsp"%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<title>库存管理</title>
		<link rel="stylesheet" href="${ctx}/themes/default/easyui.css" type="text/css" />
		<link rel="stylesheet" type="text/css" href="${ctx}/themes/icon.css">
		<script type="text/javascript" src="${ctx}/js/jquery-1.7.2.min.js"></script>
		<script type="text/javascript" src="${ctx}/js/jquery.easyui.min.js"></script>
		<script type="text/javascript" src="${ctx}/js/easyui-lang-zh_CN.js"></script>
		</head>

	<body>
	<form id="certificateinfoform">
		<div id="dlg-buttons">
			<input type="hidden" name="inventoryid" id="inventoryid"value="${inventoryid }" />
				<table border="1"  align="center" class="grid">
					<tr>
						
						<td align="left" class="Main_Tab_Style_title"
							style="width: 100px; height: 20px;">
							供应商：
						</td>
						<td align="left" class="Main_Tab_Style_Content">
							<input type="text" name="providername" id="providername"
								class="TextBox" disabled="disabled" value="${providername}"
								style="width: 250px; height: 20px;" />
						</td>
						
					</tr>
					<tr>
						<td align="left" class="Main_Tab_Style_title"
							style="width: 100px; height: 20px;">
							联系人：
						</td>
						<td align="left" class="Main_Tab_Style_Content">
							<input type="text" name="linkman" id="linkman"
								class="TextBox" disabled="disabled" value="${linkman }"
								style="width: 250px; height: 20px;" />
						</td>
						</tr>
					<tr>
						<td align="left" class="Main_Tab_Style_title"
							style="width: 100px; height: 20px;">
							联系电话：
						</td>
						<td align="left" class="Main_Tab_Style_Content">
							<input type="text" name="linkphone" id="linkphone"
								class="TextBox" disabled="disabled" value="${linkphone }"
								style="width: 250px; height: 20px;" />
						</td>
					</tr>
					<tr>
						
						<td align="left" class="Main_Tab_Style_title"
							style="width: 100px; height: 20px;">
							地址：
						</td>
						<td align="left" class="Main_Tab_Style_Content">
							<input type="text" name="address" id="address"
								class="TextBox" disabled="disabled" value="${address }"
								style="width: 250px; height: 20px;" />
						</td>
						</tr>
					<tr>
						<td align="left" class="Main_Tab_Style_title"
							style="width: 100px; height: 20px;">
							物品质量：
						</td>
						<td align="left" class="Main_Tab_Style_Content">
							<input type="text" name="resquality" id="resquality" class="TextBox"
								disabled="disabled" value="${resquality }"
								style="width: 250px; height: 20px;" />
						</td>
					</tr>
					
					<tr>
						<td align="left" class="Main_Tab_Style_title"
							style="width: 100px; height: 80px;">
							备注：
						</td>
						<td colspan="3" >
							<textarea rows="5" cols="3"  name="remark" id="remark" class="TextBox" disabled="disabled"
							style="width: 100%; height: 80px" >${remark }</textarea>
				</td>
					</tr>
				</table>
			
			
		</div>
		</form>
	</body>
</html>
