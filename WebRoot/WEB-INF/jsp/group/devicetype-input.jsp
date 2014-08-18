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
		<title>仪器设备类型编辑</title>
		<link rel="stylesheet" href="${ctx}/themes/default/easyui.css" type="text/css" />
		<link rel="stylesheet" type="text/css" href="${ctx}/themes/icon.css">
		<script type="text/javascript" src="${ctx}/js/jquery-1.7.2.min.js"></script>
		<script type="text/javascript" src="${ctx}/js/jquery.easyui.min.js"></script>
		<script type="text/javascript" src="${ctx}/js/easyui-lang-zh_CN.js"></script>
		<script type="text/javascript" src="${ctx}/js/CommonCheck.js"></script>
		<link rel="stylesheet" href="${ctx}/validate/validate.css" type="text/css" />
		<script type="text/javascript" src="${ctx}/validate/input.validate.js"></script>
		<script language="JavaScript" type="text/javascript">
			var rootPath="${ctx}";
	    </script>
    <script type="text/javascript" src="${ctx}/lims/js/group/departmentgroup-list.js"></script>
	</head>
	<body onkeydown="PreventBSK();">
		<div id="dlg-buttons">
		<!-- 添加，修改 -->
		<form id="itemForm" action="" method="post" theme="simple">
			<table width="100%" border="1" align="center" class="grid">
				<tr>	
					<td  align="left" class="Main_Tab_Style_title" width="100px">项目名称：</td>
					<td align="left" class="Main_Tab_Style_Content">
						<input id="itemname" name="itemname" value="${itemname }" type="text" disabled="true"
						 style="width: 200px; height: 20px"/>	
					</td>
				</tr>
				<tr>	
					<td  align="left" class="Main_Tab_Style_title" width="100px">项目类型：</td>
					<td align="left" class="Main_Tab_Style_Content">
						<input id="itemtype" name="itemtype" value="${itemtype }" type="text" disabled="true"
						 style="width: 200px; height: 20px"/>		
					</td>
				</tr>
				<tr>	
					<td  align="left" class="Main_Tab_Style_title" width="100px">分析方法：</td>
					<td align="left" class="Main_Tab_Style_Content">
						<textarea id="methodname" name="methodname" disabled="true"
						 style="width: 200px; height: 80px">${methodname }</textarea>
					</td>
				</tr>
				<tr>	
					<td  align="left" class="Main_Tab_Style_title" width="100px">设备类型：</td>
					<td align="left" class="Main_Tab_Style_Content">
							<select class="TextBox   grkj-validate" id="deviceType" name="deviceType" style="width: 200px; height: 20px"
							validateParam="{type:'string',required:'true',message:'请选择设备类型！'}">
							<option value="">	---请选择---	</option>
							<c:forEach var="dList" items="${devicetypeList }">
								<option value="${dList.devicetypeid}" 
								<c:if test="${dList.devicetypeid==devicetypeid }">selected="selected"</c:if>>${dList.devicetypename}</option>
							</c:forEach>
						</select><font color="red" size="4px"> *</font>
					</td>
				</tr>
			</table>
			</form>
		</div>
		
	</body>
</html>
