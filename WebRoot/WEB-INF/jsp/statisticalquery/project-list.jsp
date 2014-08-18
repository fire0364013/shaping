<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ include file="/common/taglibs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<title>委托监测任务登记</title>
		<link rel="stylesheet" href="${ctx}/themes/default/easyui.css" type="text/css" />
		<link rel="stylesheet" type="text/css" href="${ctx}/themes/icon.css" />
		<script type="text/javascript" src="${ctx}/js/jquery-1.7.2.min.js"></script>
		<script type="text/javascript" src="${ctx}/js/jquery.easyui.min.js"></script>
		<script type="text/javascript" src="${ctx}/js/CommonCheck.js"></script>
		<script type="text/javascript" src="${ctx}/js/jquery.json-2.3.js"></script>
		<script type="text/javascript" src="${ctx}/js/jquery.json-2.3.min.js"></script>
		<script type="text/javascript" src="${ctx}/validate/input.validate.js"></script>
		<script type="text/javascript" src="${ctx }/js/DatePicker/WdatePicker.js"></script>
		<script type="text/javascript">
		var rootPath = "${ctx}";
		$(document).ready(function(){
			initProjectDataGrid();
		});
	
		</script>
		<script type="text/javascript" src="${ctx}/lims/js/statisticalquery.js"></script>
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
							提单美容院：
						</td>
						<td align="left"  width="40px"  class="Main_Tab_Style_Content">
						<input type="text" name="wtentprise" id="wtentprise" class="TextBox" style="width: 150px; height: 20px;" />
					
						</td>					
						<td align="left" class="Main_Tab_Style_title"
							style="width: 80px; text-align: left">
							手术医院：
						</td>
						<td align="left"  width="40px"  class="Main_Tab_Style_Content">
						<input type="text" name="mtentprise" id="mtentprise" class="TextBox" style="width: 150px; height: 20px;" />
					
						</td>
						
						<td align="left" class="Main_Tab_Style_title"
							style="width: 80px; text-align: left">
							处理日期：
						</td>
						<td align="left"  width="40px"  class="Main_Tab_Style_Content">
						<table>
							<tr>
								<td>
									<input type="text" id="registdateFirst" name="registdateFirst" class="Wdate" 
									onFocus="showDataTimeDailog('yyyy-MM-dd')" style="width: 150px; height: 20px;" />
								</td>
								<td style="width: 40px; text-align: center">
									<font style="font-size: 12px;color:#1281bb;">至</font>
								</td>
								<td>
									<input type="text" id="registdateSecond" name="registdateSecond" class="Wdate" 
									onFocus="showDataTimeDailog('yyyy-MM-dd')"style="width: 150px; height: 20px;" />
								</td>
							</tr>
						</table>
						</td>
						<td class="Main_Tab_Style_Content"
							style="width: 100px text-align: left;">
							<input type="button" class="Button_out" value="查询"
								onclick="queryproject()" />
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
		</table>		 -->	
		<div style="height: 675px;">
	
			<table id="datagrid"></table>
		</div> 
</form>
	<form id="exportExcel"></form>
  </body>
</html>
