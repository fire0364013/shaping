<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ include file="/common/taglibs.jsp" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    
    <title>角色详情</title>
    
		<link rel="stylesheet" href="${ctx}/themes/default/easyui.css" type="text/css" />
		<link rel="stylesheet" type="text/css" href="${ctx}/themes/icon.css">
		<script type="text/javascript" src="${ctx}/js/jquery-1.7.2.min.js"></script>
		<script type="text/javascript" src="${ctx}/js/jquery.easyui.min.js"></script>
		<script type="text/javascript" src="${ctx}/js/easyui-lang-zh_CN.js"></script>
  </head>
  <body>
 		<s:form action="" id="roleForm" method="post" theme="simple">
			<div>
				<table width="100%" border="1" align="center" class="grid">
					<tr>
					<td align="left" class="Main_Tab_Style_title" style="width: 150px; height: 20px;">
						角色编号：
					</td>
					<td align="left" class="Main_Tab_Style_Content">
						<s:textfield name="roleid" cssClass="TextBox" style="width: 200px;" disabled="true"/>
					</td>
					</tr>
					<tr>
					<td align="left" class="Main_Tab_Style_title">
						角色名称：
					</td>
					<td align="left" class="Main_Tab_Style_Content">
						<s:textfield name="rolename" cssClass="TextBox" style="width: 200px;" disabled="true"/>
					</td>
					</tr>
					
					<tr>
					<td align="left" class="Main_Tab_Style_title" style="width: 150px; height: 20px;">
						最后更新用户：
					</td>
					<td align="left" class="Main_Tab_Style_Content">
						<s:textfield name="updateuserid" cssClass="TextBox" style="width: 200px;" disabled="true"/>
					</td>
					</tr>
					<tr>
					<td align="left" class="Main_Tab_Style_title" style="width: 150px; height: 20px;">
						最后更新时间：
					</td>
					<td align="left" class="Main_Tab_Style_Content">
						<s:textfield name="updatetime" cssClass="TextBox" style="width: 200px;" disabled="true"/>
					</td>
					</tr>
					<!-- tr>
					<td align="left" class="Main_Tab_Style_title" style="width: 150px; height: 20px;">
						删除标记：
					</td>
					<td align="left" class="Main_Tab_Style_Content">
						<s:textfield name="deleteflag" cssClass="TextBox" style="width: 200px;"/>
					</td>
					</tr-->
				</table>
			</div>
			<!-- div>
				<s:submit value="保存" cssClass="Button_out"/>
				<input type="button" class="Button_out" value="取消" onclick="javascript:window.top._"/>
			</div-->
		</s:form>     
  </body>
</html>
