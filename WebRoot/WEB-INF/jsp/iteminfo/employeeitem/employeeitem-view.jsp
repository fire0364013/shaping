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
		<title>医美版本管理</title>
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
    	<script language="JavaScript" type="text/javascript">
    	</script>
	</head>
	<body onkeydown="PreventBSK();">
		<table width="100%" border="0" class="Main_Tab_Style">
				<tr>						
					<td align="left" class="Main_Tab_Style_title"  style="width: 120px ;height: 20px;">
						员工名称：
					</td>
					<td align="left" class="Main_Tab_Style_Content" >
						<input type="hidden" id="employeeinfoid" name="employeeid.employeeinfoid" value="${employeeid.employeeinfoid}" />
						<input type="text" id="employeeinfoname" name="employeeid.employeeinfoname" value="${employeeid.employeeinfoname}" style="width: 500px ;height: 25px;" onclick="selectEntinfo()"
						class="TextBoxPic easyui-validatebox" required="true" missingMessage="员工名称不能为空！" disabled /><font color="red" size="4px"> *</font>
					</td>
				</tr>
			    <tr>
					<td align="left" class="Main_Tab_Style_title" >
						项目：
					</td>
					<td align="left" class="Main_Tab_Style_Content" >
						<input type="hidden" id="itemid" name="itemid.itemid" value="${itemid.itemid}" />
						<input type="text" id="itemname" name="itemid.itemname" value="${itemid.itemname}" style="width: 500px ;height: 25px;" onclick="selectEntinfo()"
						class="TextBoxPic easyui-validatebox" required="true" missingMessage="所选项目不能为空！" disabled /><font color="red" size="4px"> *</font>
					
						<input type="text" id="jcxmname" name="jcxmname"
							   	value="${jcxmname }" readonly="readonly" class="TextBoxPic"
								style="width: 250px; height: 20px;" onclick="showitem()" />
						<input id="jcxm" name="jcxm" value="${jcxm }"
								class="TextBox " style="width: 100px; height: 20px"
								type="hidden"  />
					
					
					</td>
				</tr>
				 <tr>
					<td align="left" class="Main_Tab_Style_title" >
						描述：
					</td>
					<td align="left" class="Main_Tab_Style_Content">
						<input type="text" id="bewrite" name="bewrite" value="${bewrite}" disabled style="width: 500px ;height: 25px;" />
				</tr>
				 <tr>
					<td align="left" class="Main_Tab_Style_title" >
						是否金牌项目：
					</td>
					<td align="left" class="Main_Tab_Style_Content">
						<input type="radio" id="isgoldmedal" name="isgoldmedal" value="${isgoldmedal}" />是
						<input type="radio" id="isgoldmedal" name="isgoldmedal" value="${isgoldmedal}" />否
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
	</body>
</html>
