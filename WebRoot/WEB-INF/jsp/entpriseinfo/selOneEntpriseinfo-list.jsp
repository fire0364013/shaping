<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ include file="/common/taglibs.jsp" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <title>企业信息管理</title>
		<link rel="stylesheet" href="${ctx}/themes/default/easyui.css" type="text/css" />
		<link rel="stylesheet" type="text/css" href="${ctx}/themes/icon.css">
		<script type="text/javascript" src="${ctx}/js/jquery-1.7.2.min.js"></script>
		<script type="text/javascript" src="${ctx}/js/jquery.easyui.min.js"></script>
		<script type="text/javascript" src="${ctx}/js/easyui-lang-zh_CN.js"></script>
		<script type="text/javascript">	
			var rootPath="${ctx}";
		</script>
		<script type="text/javascript" src="${ctx}/lims/js/entpriseinfo/selOneEntpriseinfo.js"></script>
  </head>
  
 <body onkeydown="PreventBSK();">
	<table class="Main_Tab_Style" style="width: 100%; height: 22px">
		<tr>
			<td class="Main_Tab_Style_title" style="width: 150px; height: 20px;">企业名称：</td>
			<td class="Main_Tab_Style_Content" style="width: 160px; height: 20px;">	
				<input type="text" name="entname" id="entname" class="TextBox" style="width:160px;"/>
			</td>	
			<td>
				<input type="button" value="查询"  class="Button_out" onclick="searchObj()"/>
			</td>						
		</tr>
	</table>
	<table id="entDatagrid"></table>
	<input type="hidden" id="entId" />
	<input type="hidden" id="entName" />
	<input type="hidden" id="address" />
	<input type="hidden" id="linkman" />
	<input type="hidden" id="telphone" />
  </body>
</html>
