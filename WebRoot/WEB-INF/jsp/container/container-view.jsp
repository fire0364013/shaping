<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="/common/taglibs.jsp" %>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<title>容器详情</title>
		<link rel="stylesheet" href="${ctx}/themes/default/easyui.css" type="text/css" />
		<link rel="stylesheet" type="text/css" href="${ctx}/themes/icon.css">
		<script type="text/javascript" src="${ctx}/js/jquery-1.7.2.min.js"></script>
		<script type="text/javascript" src="${ctx}/js/jquery.easyui.min.js"></script>
		<script type="text/javascript" src="${ctx}/js/easyui-lang-zh_CN.js"></script>

		<script language="JavaScript" type="text/javascript">
		var rootPath="${ctx}";
    </script>
  </head>
  <body>
		<div id="dlg-buttons">
		<input type="hidden" name="containerid" id="containerid" value="${containerid}"/>
			<form id="regionform"  method="post">
				<table width="100%" border="1" align="center" class="grid">
					<tr>					
						<td align="left" class="Main_Tab_Style_title"	style="width: 100px; height: 20px;">
							容器名称：
						</td>
						<td align="left" class="Main_Tab_Style_Content">
							<input id="containername" name="containername" value="${containername}" class="TextBox"  disabled="disabled"
									Style="width: 280px;height:20px" />
						</td>
					</tr>
					<tr>
						<td align="left" class="Main_Tab_Style_title"	style="width: 100px; height: 20px;">
							容器标识符：
						</td>
						<td align="left" class="Main_Tab_Style_Content">
							<input id="tag" name="tag" value="${tag}" class="TextBox"  disabled="disabled"
									Style="width: 280px;height:20px" />
						</td>
					</tr>
					<tr>
					<td class="Main_Tab_Style_title"
							style="text-align: left;width:60px;">
							监测项目：
						</td>
						<td class="Main_Tab_Style_Content">
							<textarea type="text" id="jcxmname" name="jcxmname" disabled="disabled" class="TextBox" style="width: 280px; height: 80px;" >${jcxmname }</textarea>
						</td>	</tr>
				<tr>
						<td align="left" class="Main_Tab_Style_title"
							style="width: 100px; height: 80px;">
							备注：
						</td>
						<td colspan="3" >
							<textarea rows="5" cols="3"  name="remark" id="remark" class="TextBox"  disabled="disabled"
							style="width: 100%; height: 80px" >${remark }</textarea>
				</td>
					</tr>
				</table>
			</form>
		</div>
	</body>
</html>
