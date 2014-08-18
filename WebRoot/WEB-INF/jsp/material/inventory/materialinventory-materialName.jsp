<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="/common/taglibs.jsp"%>


<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<title>库存管理</title>
		
		<link rel="stylesheet" href="${ctx}/themes/default/easyui.css"type="text/css" />
		<link rel="stylesheet" type="text/css" href="${ctx}/themes/icon.css">
		<script type="text/javascript" src="${ctx}/js/jquery-1.7.2.min.js"></script>
		<script type="text/javascript" src="${ctx}/js/jquery.easyui.min.js"></script>
		<script type="text/javascript" src="${ctx}/js/jquery.MultiFile.js"></script>
		<script type="text/javascript" src="${ctx}/validate/input.validate.js"></script>
		<script type="text/javascript" src="${ctx}/lims/js/material/inventory-selmatname.js"></script>
		<script type="text/javascript" src="${ctx}/lims/js/material/inventory.js"></script>
		<script type="text/javascript">
			var rootPath = "${ctx}";
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
	<body onkeydown="PreventBSK();">
		<div  style="height: 30px; margin: 0 0px 0px 0; size: 100px">
			<input type="hidden" name="materialid" id="materialid" value="${materialid }" />
			<input type="hidden" name="materialname" id="materialname" class="TextBox" style="width: 120px; height: 20px;" />	
			<input type="hidden" id="modelname" class="TextBox" style="width: 120px; height: 20px;" />	
			<input type="hidden" id="modelid" class="TextBox" style="width: 120px; height: 20px;" />	
			<div>
				<table class="Main_Tab_Style" style="width: 100%; height: 22px">
					<tr>
						<td align="left" class="Main_Tab_Style_title"
							style="width: 60px; text-align: left">
							物品名称：
						</td>
						<td align="left" width="40px" class="Main_Tab_Style_Content">
							<input type="text" name="materialnames" id="materialnames" class="TextBox"
							 value="${materialname }"	style="width: 110px; height: 20px;" />
						</td>
						<td align="left" class="Main_Tab_Style_title"
							style="width: 60px; height: 20px;">
							物品大类：
						</td>
						<td align="left" class="Main_Tab_Style_Content" style="width: 60px;">
							<select  class="TextBox"  id="dalei"   style="width:110px;height:20px" >
							</select>
						</td>
						<td align="left" class="Main_Tab_Style_title"
							style="width: 60px; height: 20px;">
							物品小类：
						</td>
						<td align="left" class="Main_Tab_Style_Content" style="width: 60px;">
							<select  class="TextBox "  id="materialtypeid"  style="width: 120px;height:20px">
							<option value=''>---请选择---</option>
							</select> 
						</td>	
						<td class="Main_Tab_Style_Content"
							style="width: 100px text-align :   left;">
							<input type="button" class="Button_out" value="查询" onclick="queryMater('')" /> <input type="button" class="Button_out" value="增加" onclick="addMaterial('')" />														
						</td>
						
					</tr>
				</table>
			</div>
		</div>
		
		<div  style="height: 400px; margin: 0 2px 2px 0">
			<table id="checknamegrid"></table>
		</div>
	</body>
</html>
