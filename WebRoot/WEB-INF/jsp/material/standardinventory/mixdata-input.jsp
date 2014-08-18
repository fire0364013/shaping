<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="/common/taglibs.jsp"%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<title>混标管理</title>
	
		<link rel="stylesheet" href="${ctx}/themes/default/easyui.css"type="text/css" />
		<link rel="stylesheet" type="text/css"href="${ctx}/themes/icon.css">
		<link rel="stylesheet" type="text/css" href="${ctx}/validate/validate.css">
		<script type="text/javascript" src="${ctx}/js/jquery-1.7.2.min.js"></script>
		<script type="text/javascript" src="${ctx}/js/jquery.easyui.min.js"></script>
		<script type="text/javascript" src="${ctx}/js/easyui-lang-zh_CN.js"></script>
		<script type="text/javascript" src="${ctx}/lims/js/region.js"></script>
		<script type="text/javascript" src="${ctx}/validate/input.validate.js"></script>
			<script type="text/javascript">
			var rootPath="${ctx}";
			$(document).ready(function(){
				$('#mixname').focus();
			});
		</script>
		</head>
	<body onkeydown="PreventBSK();">
	<form id="mixdataForm" method="post">
			<input type="hidden" name="mixdata.mixid" value="${mixdata.mixid }" />
			<input type="hidden" name="mixdata.inventoryid" value="${inventoryid }" />
				<table border="1"  align="center" class="grid">
					<tr>						
						<td align="left" class="Main_Tab_Style_title"
							style="width: 100px; height: 20px;">
							物质名称：
						</td>
						<td align="left" class="Main_Tab_Style_Content">
							<input type="text" name="mixdata.materialname" id="mixname" value="${mixdata.materialname}"
								class="TextBox grkj-validate" validateParam="{type:'String',maxLength:'50',required:'true',message:'请输入物质名称，长度不超过25个字符！'}" 
								style="width: 160px; height: 20px;" /><font color="red" size="4px"> *</font>
						</td>
						
					</tr>		
					<tr>						
						<td align="left" class="Main_Tab_Style_title"
							style="width: 100px; height: 20px;">
							浓度：
						</td>
						<td align="left" class="Main_Tab_Style_Content">
							<input type="text" name="mixdata.consistence"  value="${mixdata.consistence}"
								class="TextBox grkj-validate" validateParam="{type:'String',maxLength:'50',required:'true',message:'请输入浓度，长度不超过25个字符！'}" 
								style="width: 160px; height: 20px;" /><font color="red" size="4px"> *</font>
						</td>
						
					</tr>	
					<tr>						
						<td align="left" class="Main_Tab_Style_title"
							style="width: 100px; height: 20px;">
							不确定度：
						</td>
						<td align="left" class="Main_Tab_Style_Content">
							<input type="text" name="mixdata.uncertainty"   value="${mixdata.uncertainty}"
								class="TextBox grkj-validate" validateParam="{type:'String',maxLength:'50',required:'false',message:'请输入不确定度，长度不超过25个字符！'}" 
								style="width: 160px; height: 20px;" />
						</td>
					</tr>
				</table>
		</form>
	</body>
</html>
