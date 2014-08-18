<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ include file="/common/taglibs.jsp" %>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<title>数据字典管理</title>
		<link rel="stylesheet" href="${ctx}/themes/default/easyui.css" type="text/css" />
		<link rel="stylesheet" type="text/css" href="${ctx}/themes/icon.css">
		<script type="text/javascript" src="${ctx}/js/jquery-1.7.2.min.js"></script>
		<script type="text/javascript" src="${ctx}/js/jquery.easyui.min.js"></script>
		<script type="text/javascript" src="${ctx}/js/easyui-lang-zh_CN.js"></script>
		<script type="text/javascript" src="${ctx}/js/CommonCheck.js"></script>
		<script type="text/javascript" src="${ctx}/js/jquery.MultiFile.js"></script>
		<link rel="stylesheet" href="${ctx}/validate/validate.css" type="text/css" />
		<script type="text/javascript" src="${ctx}/validate/input.validate.js"></script>
		<script type="text/javascript" src="${ctx}/js/DatePicker/WdatePicker.js"></script>
		<link rel="stylesheet" href="${ctx}/js/DatePicker/skin/WdatePicker.css" type="text/css" />
		<script language="JavaScript" type="text/javascript">
			var rootPath="${ctx}";
    	</script>
    	<script type="text/javascript" src="${ctx}/lims/js/dictionary/dictIndex.js"></script>
    	<script language="JavaScript" type="text/javascript">
    	</script>
	</head>
	<body onkeydown="PreventBSK();">
	 <div id="ledgerDetail">
		<form id="addSubstanceApplyForm" method="post">
			<table width="100%" border="0" class="Main_Tab_Style">
				<tr>						
					<td align="left" class="Main_Tab_Style_title" style="width:80px;">
						字典编号：
					</td>
					<td align="left" class="Main_Tab_Style_Content">
						<input type="text" id="dictionarycode" name="dictionarycode" value="${dictionarycode}" class="easyui-validatebox" required="true" missingMessage="字典编号不能为空！"/>
					</td>
				</tr>
			    <tr>
					<td align="left" class="Main_Tab_Style_title" style="width:80px;">
						字典名称：
					</td>
					<td align="left" class="Main_Tab_Style_Content">
						<input type="text" id="dictionaryname" name="dictionaryname" value="${dictionaryname}"  class="easyui-validatebox" />
					</td>
				</tr>
			</table>
		</form>
	</div>
	</body>
</html>
