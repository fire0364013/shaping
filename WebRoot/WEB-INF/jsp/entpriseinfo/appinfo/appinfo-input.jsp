<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ include file="/common/taglibs.jsp" %>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<title>App管理</title>
		<link rel="stylesheet" href="${ctx}/themes/default/easyui.css" type="text/css" />
		<link rel="stylesheet" href="${ctx}/validate/validate.css" type="text/css" />
		<link rel="stylesheet" type="text/css" href="${ctx}/themes/icon.css">
		<script type="text/javascript" src="${ctx}/js/jquery-1.7.2.min.js"></script>
		<script type="text/javascript" src="${ctx}/js/jquery.easyui.min.js"></script>
		<script type="text/javascript" src="${ctx}/js/easyui-lang-zh_CN.js"></script>
		<script type="text/javascript" src="${ctx}/js/CommonCheck.js"></script>
		<script type="text/javascript" src="${ctx}/validate/input.validate.js"></script>
		<script language="JavaScript" type="text/javascript">
		var rootPath="${ctx}";
    </script>
    <script type="text/javascript" src="${ctx}/lims/js/appinfo.js"></script>
	</head>
<body onkeydown="PreventBSK();">
	<form id="addappinfoForm" method="post">
		<input type="hidden" id="appinfoid" name="appinfoid" value="${appinfoid}">
			<table width="100%" border="0" class="Main_Tab_Style">
				<tr>						
					<td align="left" class="Main_Tab_Style_title"  style="width: 120px ;height: 20px;">
						应用名称：
					</td>
					<td align="left" class="Main_Tab_Style_Content" >
						<input type="text" id="appinfoname" name="appinfoname" value="${appinfoname}" style="width: 400px ;height: 25px;" 
						class="TextBox grkj-validate" validateParam="{type:'string',required:'true',message:'名字不能为空！'}" /><font color="red" size="4px"> *</font>
					</td>
				</tr>
				 <tr>
					<td align="left" class="Main_Tab_Style_title" >
						备注：
					</td>
					<td>
						<textarea  name="remark" class="TextBox grkj-validate"  style="width: 400px; height: 60px;"
							validateParam="{type:'string',required:'false',maxLength:'200',message:'备注不能超过100个汉字！'}">${remark}</textarea>
					</td>
				</tr>
			</table>
		</form>
	</body>
</html>
