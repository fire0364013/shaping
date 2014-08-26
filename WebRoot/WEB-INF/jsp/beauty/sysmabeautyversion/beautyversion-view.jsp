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
    	<script type="text/javascript" src="${ctx}/lims/js/beauty/sysmsbeautyversion.js"></script>
    	<script language="JavaScript" type="text/javascript">
    	</script>
	</head>
	<body onkeydown="PreventBSK();">
		<table width="100%" border="0" class="Main_Tab_Style">
				<tr>						
					<td align="left" class="Main_Tab_Style_title"  style="width: 120px ;height: 20px;">
						企业名称：
					</td>
					<td align="left" class="Main_Tab_Style_Content" >
						<input type="hidden" id="entid" name="entprise.entid" value="${entprise.entid}" />
						<input type="text" id="entname" name="entprise.entname" value="${entprise.entname}" style="width: 500px ;height: 25px;" onclick="selectEntinfo()"
						class="TextBoxPic easyui-validatebox"   style="width: 120px ;height: 20px;" disabled/>
					</td>
				</tr>
			    <tr>
					<td align="left" class="Main_Tab_Style_title" >
						版本说明：
					</td>
					<td align="left" class="Main_Tab_Style_Content">
						<textarea  name="versioninfo" class="TextBox grkj-validate"  style="width: 500px; height: 60px;" 
						disabled >${versioninfo}</textarea>
					</td>
				</tr>
				 <tr>
					<td align="left" class="Main_Tab_Style_title" >
						提交人：
					</td>
					<td align="left" class="Main_Tab_Style_Content">
						<input type="text" id="operator" name="operator" value="${operator}"  style="width: 500px ;height: 25px;"
						class="TextBox easyui-validatebox" disabled/>
				</tr>
				<tr>
					<td align="left" class="Main_Tab_Style_title" >
						提交日期：
					</td>
					<td align="left" class="Main_Tab_Style_Content">
						<input type="text" id="operatedate" name="operatedate" value="${operatedate}"  style="width: 500px ;height: 25px;"
						class="TextBox easyui-validatebox" disabled/>
				</tr>
				 <tr>
					<td align="left" class="Main_Tab_Style_title" >
						联系电话：
					</td>
					<td align="left" class="Main_Tab_Style_Content">
						<input type="text" id="mobilephone" name="mobilephone" value="${mobilephone }"  style="width: 500px ;height: 25px;"
						class="TextBox easyui-validatebox" disabled/>
					</td>
				</tr>
				 <tr>
					<td align="left" class="Main_Tab_Style_title" >
						备注：
					</td>
					<td>
						<textarea  name="remark" class="TextBox grkj-validate"  style="width: 500px; height: 60px;" disabled
							validateParam="{type:'string',required:'false',maxLength:'500',message:'备注不能超过100个汉字！'}">${remark}</textarea>
					</td>
				</tr>
			</table>
	</body>
</html>
