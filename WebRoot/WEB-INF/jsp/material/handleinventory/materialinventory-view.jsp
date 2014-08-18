<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="/common/taglibs.jsp"%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<title>库存管理</title>
		<script type="text/javascript">
			var rootPath = "${ctx}";
		</script>
		<link rel="stylesheet" href="${ctx}/themes/default/easyui.css" type="text/css" />
		<link rel="stylesheet" type="text/css" href="${ctx}/themes/icon.css">
		<script type="text/javascript" src="${ctx}/js/jquery-1.7.2.min.js"></script>
		<script type="text/javascript" src="${ctx}/js/jquery.easyui.min.js"></script>
		<script type="text/javascript" src="${ctx}/js/easyui-lang-zh_CN.js"></script>
		</head>

	<body>
	<form id="certificateinfoform" method="post" >
		<div id="dlg-buttons">
			<input type="hidden" name="inventoryid" id="inventoryid"value="${inventoryid }" />
				<table border="1" align="center" class="grid">
					<tr>
						<td align="left" class="Main_Tab_Style_title"
							style="width: 100px; height: 20px;">
							物品名称：
						</td>
						<td align="left" class="Main_Tab_Style_Content">
							<input type="text" name="materialname" id="materialname" class="TextBox"
								disabled="disabled" value="${material.materialname }"
								style="width: 200px; height: 20px;" />
						</td>
						<td align="left" class="Main_Tab_Style_title"
							style="width: 100px; height: 20px;">
							供应商：
						</td>
						<td align="left" class="Main_Tab_Style_Content">
							<input type="text" name="providername" id="providername"
								class="TextBox" disabled="disabled" value="${providerid.providername }"
								style="width: 200px; height: 20px;" />
						</td>
						
					</tr>
					<tr>
						<td align="left" class="Main_Tab_Style_title"
							style="width: 100px; height: 20px;">
							批号：
						</td>
						<td align="left" class="Main_Tab_Style_Content">
							<input type="text" name="batchno" id="batchno"
								class="TextBox" disabled="disabled"
								value="${batchno }" style="width: 200px; height: 20px;" />
						</td>
						<td align="left" class="Main_Tab_Style_title"
							style="width: 100px; height: 20px;">
							失效日期：
						</td>
						<td align="left" class="Main_Tab_Style_Content">
							<input type="text" name="expirationdate" id="expirationdate" class="TextBox"
								disabled="disabled" value="${expirationdate }"
								style="width: 200px; height: 20px;" />
						</td>
					</tr>
					<tr>
						
						<td align="left" class="Main_Tab_Style_title"
							style="width: 100px; height: 20px;">
							存放位置：
						</td>
						<td align="left" class="Main_Tab_Style_Content">
							<input type="text" name="depositplace" id="depositplace" class="TextBox" disabled="disabled"
							value="${depositplace }" style="width: 200px; height: 20px;" />
						</td>
						<td align="left" class="Main_Tab_Style_title"
							style="width: 100px; height: 20px;">
							存放条件：
						</td>
						<td align="left" class="Main_Tab_Style_Content">
							<input type="text" name="depositcondition" id="depositcondition"
								class="TextBox" disabled="disabled" value="${depositcondition }"
								style="width: 200px; height: 20px;" />
						</td>
					</tr>
					<tr>
						<td align="left" class="Main_Tab_Style_title"
							style="width: 100px; height: 20px;">
							保管人：
						</td>
						<td align="left" class="Main_Tab_Style_Content">
							<input type="text" name="storeman" id="storeman"
								class="TextBox" disabled="disabled" value="${userinfo.realname }"
								style="width: 200px; height: 20px;" />
						</td>
							
						<td align="left" class="Main_Tab_Style_title"
							style="width: 100px; height: 20px;">
							库存数量：
						</td>
						<td align="left" class="Main_Tab_Style_Content">
							<input type="text" name="remainingnum" id="remainingnum"
								class="TextBox" disabled="disabled" value="${remainingnum }"
								style="width: 200px; height: 20px;" />
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
