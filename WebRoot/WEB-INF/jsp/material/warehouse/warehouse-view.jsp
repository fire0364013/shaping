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
			<input type="hidden" name="warehouseid" id="warehouseid"value="${warehouseid }" />
				<table border="1"  align="center" class="grid">
					<tr>
						
						<td align="left" class="Main_Tab_Style_title"
							style="width: 100px; height: 20px;">
							仓库名称：
						</td>
						<td align="left" class="Main_Tab_Style_Content">
							<input type="text" name="warehousename" id="warehousename"
								class="TextBox" disabled="disabled" value="${warehousename}"
								style="width: 250px; height: 20px;" />
						</td>
						
					</tr>
					<tr>
						<td align="left" class="Main_Tab_Style_title"
							style="width: 100px; height: 20px;">
						仓库地址：
						</td>
						<td align="left" class="Main_Tab_Style_Content">
							<input type="text" name="warehouseaddress" id="warehouseaddress"
								class="TextBox" disabled="disabled" value="${warehouseaddress }"
								style="width: 250px; height: 20px;" />
						</td>
						</tr>
					<tr>
						<td align="left" class="Main_Tab_Style_title"
							style="width: 100px; height: 20px;">
							仓库管理员：
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
				</table>
		</form>
	</body>
</html>
