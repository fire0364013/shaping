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
		<title>用户管理</title>
		<link rel="stylesheet" href="${ctx}/themes/default/easyui.css" type="text/css" />
		<link rel="stylesheet" type="text/css" href="${ctx}/themes/icon.css">
		<script type="text/javascript" src="${ctx}/js/jquery-1.7.2.min.js"></script>
		<script type="text/javascript" src="${ctx}/js/jquery.easyui.min.js"></script>
		<script type="text/javascript" src="${ctx}/js/easyui-lang-zh_CN.js"></script>
		<script type="text/javascript" src="${ctx}/js/CommonCheck.js"></script>
		<link rel="stylesheet" href="${ctx}/validate/validate.css" type="text/css" />
		<script type="text/javascript" src="${ctx}/validate/input.validate.js"></script>
		<script language="JavaScript" type="text/javascript">
		$(document).ready(function(){
			$("#deptname").focus();
		});
    </script>
	</head>
	<body onkeydown="PreventBSK();">
		<div id="dlg-buttons">
	

		<!-- 添加，修改 -->
		<s:form id="departmentinfoform" action="" method="post" theme="simple">
		<s:hidden name="deptid" />
			<table width="100%" border="1" align="center" class="grid">
				<tr>
					<td  align="left" class="Main_Tab_Style_title" width="100px">部门名称：</td>
					<td  align="left" class="Main_Tab_Style_Content" width="170px">
						<s:textfield id="deptname" name="deptname" cssClass="TextBox grkj-validate" cssStyle="width: 150px;height:20px" 
						 validateParam="{type:'string',required:'true',maxLength:'100',message:'请输入部门名称，长度不超过100个字符！'}"></s:textfield> <font color="red" size="4px">*</font>
					</td>
					</tr>
					<tr>
					<td  align="left" class="Main_Tab_Style_title" width="100px">序号：</td>
					<td  align="left" class="Main_Tab_Style_Content" width="170px">
						<s:textfield  name="orderid" cssClass="TextBox grkj-validate" cssStyle="width: 150px;height:20px"
						validateParam="{type:'int',message:'只能输入正整数',required:'false'}"></s:textfield>
					</td>
					<s:hidden  name="parentdeptid" cssClass="TextBox" cssStyle="width: 150px;height:20px" value="0"></s:hidden>
					</tr>
				
				
			</table>
			</s:form>
		</div>
		
	</body>
</html>
