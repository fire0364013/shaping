<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="/common/taglibs.jsp"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<title>授权签字人管理</title>
		<link rel="stylesheet" href="${ctx}/themes/default/easyui.css"
			type="text/css" />
		<link rel="stylesheet"
			href="${ctx}/js/DatePicker/skin/WdatePicker.css" type="text/css" />
		<link rel="stylesheet" type="text/css" href="${ctx}/themes/icon.css">
		<link rel="stylesheet" type="text/css"href="${ctx}/validate/validate.css">
		<script type="text/javascript" src="${ctx}/js/jquery-1.7.2.min.js"></script>
		<script type="text/javascript" src="${ctx}/js/jquery.easyui.min.js"></script>
		<script type="text/javascript" src="${ctx}/validate/input.validate.js"></script>
		<script type="text/javascript" src="${ctx}/lims/js/author.js"></script><!-- 多用户的弹出窗 -->
		<script type="text/javascript">
			var rootPath = "${ctx}";
		</script>
	</head>
	<body>
			<form id="authorframe" action="" method="post">
				<input type="hidden" id="flagName" name="flagName" value="${userinfo.userid }"/>
				<table border="1" align="center" class="grid">
					<tr>
					   <td  align="left" class="Main_Tab_Style_title" width="70px">签字人：</td>
				<td  align="left" class="Main_Tab_Style_Content">
				<input   id="username" name="username" class="TextBoxPic grkj-validate" style="width: 240px;height:20px" 
					 onclick="selectUser()" readonly="readonly" value="${realnames}"
						validateParam="{type:'string',required:'true',message:'请选择签字人！'}" />
						<font color="red" size="4px">*</font>
						<input name="signatureuser" id="userid" type="hidden" value="${userid}" />
					</td>
					<tr>
					</tr>
				</table>
			</form>
	</body>
</html>
