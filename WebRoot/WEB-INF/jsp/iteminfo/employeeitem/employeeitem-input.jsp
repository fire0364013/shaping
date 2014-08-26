<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ include file="/common/taglibs.jsp" %>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<title>员工项目管理</title>
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
    <script type="text/javascript" src="${ctx}/lims/js/item.info.js"></script>
    <script type="text/javascript" src="${ctx}/lims/js/employeeinfo.js"></script>
	</head>
<body onkeydown="PreventBSK();">
	<form id="addemployeeitemForm" method="post">
		<input type="hidden" id="employeeitemid" name="employeeitemid" value="${employeeitemid}">
		<input type="hidden" id="validstatus" name="validstatus" value="1">
			<table width="100%" border="0" class="Main_Tab_Style">
				<tr>						
					<td align="left" class="Main_Tab_Style_title"  style="width: 120px ;height: 20px;">
						员工名称：
					</td>
					<td align="left" class="Main_Tab_Style_Content" >
						<input type="hidden" id="userids" name="employeeid.employeeinfoid" value="${employeeid.employeeinfoid}" />
						<input type="text" id="username" name="employeeid.employeeinfoname" value="${employeeid.employeeinfoname}" style="width: 500px ;height: 25px;" onclick="showName()"
						class="TextBoxPic easyui-validatebox" required="true" missingMessage="员工名称不能为空！" /><font color="red" size="4px"> *</font>
					</td>
				</tr>
			    <tr>
					<td align="left" class="Main_Tab_Style_title" >
						项目：
					</td>
					<td align="left" class="Main_Tab_Style_Content" >
						<input type="hidden" id="itemid" name="itemids" value="${itemid.itemid}" />
						<input type="text" id="itemname" name="itemname" value="${itemid.itemname}" style="width: 500px ;height: 25px;"  onclick="showitem()"
						class="TextBoxPic easyui-validatebox" required="true" missingMessage="所选项目不能为空！" /><font color="red" size="4px"> *</font>
					</td>
				</tr>
				 <tr>
					<td align="left" class="Main_Tab_Style_title" >
						描述：
					</td>
					<td align="left" class="Main_Tab_Style_Content">
						<input type="text" id="bewrite" name="bewrite" value="${bewrite}"  style="width: 500px ;height: 25px;" />
				</tr>
				 <tr>
					<td align="left" class="Main_Tab_Style_title" >
						是否金牌项目：
					</td>
					<td align="left" class="Main_Tab_Style_Content">
						<input type="radio" id="isgoldmedal" name="isgoldmedal" value="1" checked="checked"/>是
						<input type="radio" id="isgoldmedal" name="isgoldmedal" value="0" />否
					</td>
				</tr>
				 <tr>
					<td align="left" class="Main_Tab_Style_title" >
						备注：
					</td>
					<td>
						<textarea  name="remark" class="TextBox grkj-validate"  style="width: 500px; height: 60px;"
							validateParam="{type:'string',required:'false',maxLength:'500',message:'备注不能超过100个汉字！'}">${remark}</textarea>
					</td>
				</tr>
			</table>
		</form>
	</body>
</html>
