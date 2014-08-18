<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ include file="/common/taglibs.jsp" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <title>角色编辑</title>
    
		<link rel="stylesheet" href="${ctx}/themes/default/easyui.css" type="text/css" />
		<link rel="stylesheet" type="text/css" href="${ctx}/themes/icon.css">
		<link rel="stylesheet" type="text/css" href="${ctx}/validate/validate.css">
		<script type="text/javascript" src="${ctx}/js/jquery-1.7.2.min.js"></script>
		<script type="text/javascript" src="${ctx}/js/jquery.easyui.min.js"></script>
		<script type="text/javascript" src="${ctx}/js/easyui-lang-zh_CN.js"></script>
		<script type="text/javascript" src="${ctx}/validate/input.validate.js"></script>

  </head>
  <body>
 		<s:form action="" id="roleForm" method="post" theme="simple">
			<s:hidden name="roleid" />
			<div>
				<table width="100%" border="1" align="center" class="grid">
					<tr>
					<td align="left" class="Main_Tab_Style_title" style="width: 100px; height: 20px;">
						角色名称：
					</td>
					<td align="left" class="Main_Tab_Style_Content">
						<s:textfield name="rolename"  cssClass='TextBox grkj-validate' validateParam="{type:'string',maxLength:'100',required:'true',message:'请输入角色名称，长度不超过100个字符！'}" style="width: 200px;" />
						<font color="red" size="4px">*</font>
					</td>
					</tr>
					<tr>
					
				</table>
			</div>		
		</s:form>    
  </body>
</html>
