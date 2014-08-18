<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="/common/taglibs.jsp" %>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<title>行政区域管理</title>
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
		<input type="hidden" name="regioncode" id="regioncode" value="regioncode"/>
			<form id="regionform" theme="simple" method="post">
				<table width="100%" border="1" align="center" class="grid">
					<tr>					
						<td align="left" class="Main_Tab_Style_title"	style="width: 100px; height: 20px;">
							区域编号：
						</td>
						<td align="left" class="Main_Tab_Style_Content">
							<input id="regioncode" name="regioncode" value="${regioncode}" class="TextBox"  disabled="disabled"
									Style="width: 200px;height:20px" />
						</td>
					</tr>
					<tr>
						<td align="left" class="Main_Tab_Style_title"	style="width: 100px; height: 20px;">
							区域名称：
						</td>
						<td align="left" class="Main_Tab_Style_Content">
							<input id="regionname" name="regionname" value="${regionname}" class="TextBox"   disabled="disabled"
									Style="width: 200px;height:20px" />
						</td>
					</tr>
					<tr>
						<td align="left" class="Main_Tab_Style_title"	style="width: 100px; height: 20px;">
							是否使用：
						</td>
						<td align="left" class="Main_Tab_Style_Content">
						<select  class="TextBox" 	disabled="disabled" name="isreportshow" Style="width: 200px;height:20px">							
 							 <option value="1" <c:if test="${isreportshow=='1'}">selected="selected"</c:if>>是</option>
							 <option value="0" <c:if test="${isreportshow=='0'}">selected="selected"</c:if>>否</option>					
						</select>								
						</td>
				</tr>
				</table>
			</form>
		</div>
	</body>
</html>
