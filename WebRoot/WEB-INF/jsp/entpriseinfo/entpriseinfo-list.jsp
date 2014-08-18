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
		<script type="text/javascript" src="${ctx}/js/CommonCheck.js"></script>
		<script type="text/javascript" src="${ctx}/js/jquery.json-2.3.js"></script>
		<script type="text/javascript" src="${ctx}/js/jquery.json-2.3.min.js"></script>
		<script type="text/javascript" src="${ctx}/validate/input.validate.js"></script>		
		<script type="text/javascript">	
			var rootPath="${ctx}";
		</script>
		<script type="text/javascript" src="${ctx}/lims/js/entpriseinfo.js"></script>
		<script type="text/javascript" src="${ctx}/lims/js/monitorobject.js"></script>
		<!-- <script type="text/javascript" src="${ctx}/lims/js/entpriseinfo/selOneuser.js.js"></script> -->

  </head>
  
  <body>
	<table class="Main_Tab_Style" style="width: 100%; height: 22px">
		<tr>
			<td class="Main_Tab_Style_title" style="width: 10%;">企业名称:</td>
			<td class="Main_Tab_Style_Content" style="width: 15%;">	
				<input type="text" name="entname" id="entname" class="TextBox" style="width:150px;"/>
			</td>	
			<!-- <td class="Main_Tab_Style_title" style="width: 10%;">行政区:</td>
			<td class="Main_Tab_Style_Content" style="width: 15%;">	
				<input type="text" name="region" id="region" class="TextBox" style="width:150px;"/>
			</td>	 -->			
			<td>
				<input type="button" value="查询"  class="Button_out" onclick="searchObj()"/>
			</td>						
		</tr>
	</table>
	<div class="grid-headerSpace">
		<!-- <input type="button" value="选择" class="Button_out" onClick="selEntpriseinfo()" />&nbsp; -->
		<input type="button" value="添加" class="Button_out" onClick="editEntpriseinfo('')" />&nbsp;
		<input type="button" value="删除" class="Button_out" onClick="deleteEntpriseinfos()" />
	</div>

	<div style="width: 100%; height: 650px;">
		<table id="datagrid" width="100%"></table>
	</div>
  </body>
</html>
