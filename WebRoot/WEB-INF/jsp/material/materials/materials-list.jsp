<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ include file="/common/taglibs.jsp" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    
    <title>物品信息</title>
    
	<link rel="stylesheet" href="${ctx}/themes/default/easyui.css" type="text/css" />
		<link rel="stylesheet" href="${ctx}/validate/validate.css" type="text/css" />
		<link rel="stylesheet" type="text/css" href="${ctx}/themes/icon.css">
		<script type="text/javascript" src="${ctx}/js/jquery-1.7.2.min.js"></script>
		<script type="text/javascript" src="${ctx}/js/jquery.easyui.min.js"></script>
		<script type="text/javascript" src="${ctx}/js/easyui-lang-zh_CN.js"></script>
		<script type="text/javascript" src="${ctx}/js/CommonCheck.js"></script>
		<script type="text/javascript" src="${ctx}/validate/input.validate.js"></script>
		<script language="JavaScript" type="text/javascript">
			var rootPath="${ctx}";
   		</script>
    <script type="text/javascript" src="${ctx}/lims/js/material/materials.js"></script>
    <script language="JavaScript" type="text/javascript">
   	 		var isStandFlag="";
			$(document).ready(function(){
				bigTypeData();
				var deptidvalue = $("#dalei").val();//大类
				if(deptidvalue!=""){
					$("#materialtypeid").val('');
					$("#materialtypeid").html('');
					smallTypeData();
				}
					
				$("#dalei").change(function(){
					$("#materialtypeid").val('');
					$("#materialtypeid").html('');
	               	smallTypeData();
	            });
			});	
	    </script>
  </head>
  <body>
   <table class="Main_Tab_Style" style="width: 100%; height: 22px">
		<tr>
			<td class="Main_Tab_Style_title" style="width: 100px;">物品名称:</td>
			<td class="Main_Tab_Style_Content" style="width: 150px;">	
				<input type="text" name="materialname" id="materialname" class="TextBox" style="width:150px;"/>
			</td>	
			<td align="left" class="Main_Tab_Style_title"
				style="width: 100px; height: 20px;">
				物品大类：
			</td>
			<td align="left" class="Main_Tab_Style_Content" style="width: 150px;">
				<select  class="TextBox"  id="dalei"   style="width:150px;height:20px" >
				</select>
			</td>
			<td align="left" class="Main_Tab_Style_title"
				style="width: 100px; height: 20px;">
				物品小类：
			</td>
			<td align="left" class="Main_Tab_Style_Content" style="width: 150px;">
				<select  class="TextBox "  id="materialtypeid"  style="width: 150px;height:20px">
				<option value=''>---请选择---</option>
				</select> 
			</td>		
			<td>
				<input type="button" value="查询"  class="Button_out" onclick="searchObj()"/>
			</td>						
		</tr>
	</table>
	<div class="grid-headerSpace">
<%--		<input type="button" value="选择" class="Button_out" onClick="selMaterialsinfo()" />&nbsp;--%>
		<input type="button" value="添加" class="Button_out" onClick="addMaterialsinfo('')" />&nbsp;
		<input type="button" value="删除" class="Button_out" onClick="deleteAll()" />
	</div>

	<div style="width: 100%; height: 650px;">
		<table id="datagrid" width="100%"></table>
	</div>
  </body>
</html>
