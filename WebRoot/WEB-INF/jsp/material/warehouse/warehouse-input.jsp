<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="/common/taglibs.jsp"%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<title>仓库管理</title>
	
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
				$('#warehousename').focus();
			});
		</script>
		</head>
	<body onkeydown="PreventBSK();">
	<form id="certificateinfoform" method="post">
			<input type="hidden" name="warehouseid" id="warehouseid"value="${warehouseid }" />
				<table border="1"  align="center" class="grid">
					<tr>
						
						<td align="left" class="Main_Tab_Style_title"
							style="width: 100px; height: 20px;">
							仓库名称：
						</td>
						<td align="left" class="Main_Tab_Style_Content">
							<input type="text" name="warehousename" id="warehousename"
								class="TextBox grkj-validate"
						validateParam="{type:'String',maxLength:'80',required:'true',message:'请输入仓库名称，长度不超过80个字符！'}"  value="${warehousename}"
								style="width: 230px; height: 20px;" /><font color="red" size="4px"> *</font>
						</td>
						
					</tr>
					<tr>
						<td align="left" class="Main_Tab_Style_title"
							style="width: 100px; height: 20px;">
							仓库地址：
						</td>
						<td align="left" class="Main_Tab_Style_Content">
							<input type="text" name="warehouseaddress" id="warehouseaddress"
								 class="TextBox  grkj-validate" 	validateParam="{type:'string',maxLength:'40',required:'false',message:'长度不超过40个字符！'}"
								   value="${warehouseaddress }"
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
 								class="TextBox  grkj-validate" 	validateParam="{type:'string',maxLength:'20',required:'false',message:'长度不超过20个字符！'}"								
  								value="${linkman }"
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
								 class="TextBox  grkj-validate" 	validateParam="{type:'string',maxLength:'128',required:'false',message:'长度不超过128个字符！'}"  value="${linkphone }"
								style="width: 250px; height: 20px;" />
						</td>
						</tr>
				</table>
		</form>
	</body>
</html>
