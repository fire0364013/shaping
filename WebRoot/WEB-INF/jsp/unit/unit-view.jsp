<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ include file="/common/taglibs.jsp" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    
    <title>计量单位详情</title>
    
		<link rel="stylesheet" href="${ctx}/themes/default/easyui.css" type="text/css" />
		<link rel="stylesheet" type="text/css" href="${ctx}/themes/icon.css">
		<script type="text/javascript" src="${ctx}/js/jquery-1.7.2.min.js"></script>
		<script type="text/javascript" src="${ctx}/js/jquery.easyui.min.js"></script>
		<script type="text/javascript" src="${ctx}/js/easyui-lang-zh_CN.js"></script>
  </head>
  <body>
 		<s:form action="" id="unitForm" method="post" theme="simple">
			<div>
				<table width="100%" border="1" align="center" class="grid">
					<tr>
					<td align="left" class="Main_Tab_Style_title" style="width: 150px; height: 20px;">
						计量单位编号：
					</td>
					<td align="left" class="Main_Tab_Style_Content">
						<s:textfield name="unitid" cssClass="TextBox" style="width: 200px;" disabled="true"/>
					</td>
					</tr>
					<tr>
					<td align="left" class="Main_Tab_Style_title">
						计量单位名称：
					</td>
					<td align="left" class="Main_Tab_Style_Content">
						<s:textfield name="unitname" cssClass="TextBox" style="width: 200px;" disabled="true"/>
					</td>
					</tr>
					<tr>
					<td align="left" class="Main_Tab_Style_title" style="width: 100px; height: 20px;">
						计量单位描述：
					</td>
					<td align="left" class="Main_Tab_Style_Content">
						<s:textarea name="description"  cssClass='TextBox' style="width: 200px; height:100px;" disabled="true"></s:textarea>
					</td>
					</tr>
				</table>
			</div>
		</s:form>     
  </body>
</html>
