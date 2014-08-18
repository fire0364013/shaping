<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ include file="/common/taglibs.jsp" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <title>项目列表</title>
		<link rel="stylesheet" href="${ctx}/themes/default/easyui.css" type="text/css" />
		<link rel="stylesheet" type="text/css" href="${ctx}/themes/icon.css">

		<script type="text/javascript" src="${ctx}/js/jquery-1.7.2.min.js"></script>
		<script type="text/javascript" src="${ctx}/js/jquery.easyui.min.js"></script>
		<script type="text/javascript" src="${ctx}/js/easyui-lang-zh_CN.js"></script>
		<script type="text/javascript" src="${ctx}/js/CommonCheck.js"></script>
		<script type="text/javascript" src="${ctx}/validate/input.validate.js"></script>		
		<script type="text/javascript">	
			var rootPath="${ctx}";
			var deptid="${deptid}";
			var groupid="${groupid}"
		</script>
		<script type="text/javascript" src="${ctx}/lims/js/group/selectgroupitem.js"></script>
	
  </head>
  
  <body onkeydown="PreventBSK();">
	<table class="Main_Tab_Style" style="width: 100%; height: 22px">
		<tr>
			<td class="Main_Tab_Style_title" style="width: 20%;">项目名称:</td>
			<td class="Main_Tab_Style_Content" style="width: 15%;">	
				<input type="text" name="itemname" id="itemname" class="TextBox" style="width:150px;"/>
			</td>		
			<td class="Main_Tab_Style_title" style="width: 20%;">项目类型:</td>
			<td class="Main_Tab_Style_Content" style="width: 15%;">	
				<select name="itemtypeid" id="itemtypeid" style="width:150px;">
				<option value="">---请选择---</option>
				<c:forEach items="${itemTypeList}" var="itemtype">
					<option value="${itemtype.itemtypeid}">${itemtype.itemtypename}</option>
				</c:forEach>
				</select>
			</td>	
					
			<td>
				<input type="button" value="查询"  class="Button_out" onclick="searchObj()"/>
			</td>						
		</tr>
		<tr>
			<td class="Main_Tab_Style_title" style="width: 13%;">已选项目:</td>
			<td class="Main_Tab_Style_Content" style="width: 80%;" colspan="4">	
				<textarea type="text" name="selectitemname" id="selectitemname"
				readonly="readonly" class="TextBox" style="width:100%;height: 60px"></textarea>
				<input type="hidden" name="selectid" id="selectid" class="TextBox" style="width:150px;"/>	
				<input type="hidden" name="selectdivice" id="selectdivice" class="TextBox" style="width:150px;"/>	
			</td>
						
		</tr>
	</table>
	
	<div style="width: 100%; height: 320px;">
	<input type="hidden" id="selelctitems"><input type="hidden" id="selelctunit"><input type="hidden" id="selectitemid">
		<table id="datagrid"></table>
	</div>
	
  </body>
</html>
