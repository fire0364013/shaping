<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="/common/taglibs.jsp"%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<title>人员信息</title>
		<link rel="stylesheet" href="${ctx}/themes/default/easyui.css"type="text/css" />
		<link rel="stylesheet" type="text/css" href="${ctx}/themes/icon.css">
		<link rel="stylesheet" type="text/css" href="${ctx}/validate/validate.css">
	<script type="text/javascript" src="${ctx}/js/jquery-1.7.2.min.js"></script>
		<script type="text/javascript" src="${ctx}/js/jquery.easyui.min.js"></script>
		<script type="text/javascript" src="${ctx}/js/easyui-lang-zh_CN.js"></script>
		<script type="text/javascript" src="${ctx}/validate/input.validate.js"></script>
		<script type="text/javascript" src="${ctx}/lims/js/statisticalquery.js"></script>
 	<script type="text/javascript" src="${ctx}/js/DatePicker/WdatePicker.js"></script>
		<!-- 本jsp的脚本引用__wjy -->
		<script type="text/javascript">	
			var rootPath="${ctx}";
			$(document).ready(function(){
				initCustomDataGrid();
			});			
		</script>
	</head>
  <body>
<form>
		<div  style="height: 30px; margin: 0 0px 0px 0;size: 100px">	
			<input type="hidden" name="customid" id="customid" value="${customid }"/>
		<input type="hidden" name="userids"  value="${userid.userid }"/>	
	<div><table class="Main_Tab_Style" style="width: 100%; height: 22px">
				
					<tr>
						<td align="left" class="Main_Tab_Style_title"
							style="width: 80px; text-align: left">
							所属单位：
						</td>
						<td align="left"  width="40px"  class="Main_Tab_Style_Content">
						<input type="text" name="entname" id="entname" class="TextBox" style="width: 150px; height: 20px;" />
					
						</td>					
						<td align="left" class="Main_Tab_Style_title"
							style="width: 80px; text-align: left">
							姓名：
						</td>
						<td align="left"  width="40px"  class="Main_Tab_Style_Content">
						<input type="text" name="customname" id="customname" class="TextBox" style="width: 150px; height: 20px;" />
					
						</td>
						
						<td align="left" class="Main_Tab_Style_title"
							style="width: 80px; text-align: left">
							性别：
						</td>
						<td align="left"  width="40px"  class="Main_Tab_Style_Content">
							<select name="sex" style="width: 150px">
								<option value="" <c:if test="${sex==null||sex==''}">selected="selected"</c:if>>--请选择--</option>
								<option value="男" <c:if test="${sex=='男'}">selected="selected"</c:if>>男</option>
								<option value="女" <c:if test="${sex=='女'}">selected="selected"</c:if>>女</option>
							</select>
						</td>
						<td class="Main_Tab_Style_Content"
							style="width: 100px text-align: left;">
							<input type="button" class="Button_out" value="查询"
								onclick="querycustom()" />
							<!-- 
							<input type="button" class="Button_out" value="导出"
							onclick="ExportExcel()"/>	
							 -->
						</td>
					</tr>
				</table>	
				</div>	
		</div>
		<!-- 
		<table width="100%" class="grid">
				<tr height="25" class="grid-header">
					<td colspan="6" style="text-align: left">
						<input type="button" value="添加" class="Button_out"
							onClick="addWin('','')" />
							
						<input type="button" value="删除" class="Button_out"
							onClick="delAll('')" /> 
					</td>
				</tr>
		</table>	-->		
		<div style="height: 675px;">
			<table id="customgrid"></table>
		</div> 
</form>
	<form id="exportExcel"></form>
  </body>
</html>
