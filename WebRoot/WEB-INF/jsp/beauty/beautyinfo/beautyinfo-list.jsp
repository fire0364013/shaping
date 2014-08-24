<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="/common/taglibs.jsp"%>


<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<title>医美图片管理</title>
		
		<link rel="stylesheet" href="${ctx}/themes/default/easyui.css"type="text/css" />
		<link rel="stylesheet" type="text/css"href="${ctx}/validate/validate.css">
		<link rel="stylesheet" type="text/css" href="${ctx}/themes/icon.css">
		<script type="text/javascript" src="${ctx}/js/jquery-1.7.2.min.js"></script>
		<script type="text/javascript" src="${ctx}/js/jquery.easyui.min.js"></script>
		<script type="text/javascript" src="${ctx}/js/easyui-lang-zh_CN.js"></script>
		<script type="text/javascript" src="${ctx}/js/jquery.MultiFile.js"></script>
		<script type="text/javascript" src="${ctx}/validate/input.validate.js"></script>
		<script type="text/javascript">
			var rootPath = "${ctx}";
			var beautyversionid="${beautyversionid}";
			$(document).ready(function() {
					initDataGrid();
			});
		</script>
		<script type="text/javascript" src="${ctx}/lims/js/beauty/beautyinfo.js"></script> 
	</head>
	<body  onkeydown="PreventBSK()" style="padding: 0px">
		<div  style="height: 30px; margin: 0 0px 0px 0; size: 100px">
			<input type="hidden" id="projectid" name="projectid" value="${projectid }" />
				<table class="Main_Tab_Style" style="width: 100%; height: 22px">
					<tr>
						<td align="left" class="Main_Tab_Style_title"
							style="width: 60px; text-align: left">
							标题：
						</td>
						<td align="left" width="40px" class="Main_Tab_Style_Content">
							<input type="text" name="infotitle" id="infotitle" class="TextBox"
								style="width: 120px; height: 20px;" />
						</td>
						<td class="Main_Tab_Style_Content"
							style="width: 100px text-align :   left;">
							<input type="button" class="Button_out" value="查询"
								onclick="query()" />														
						</td>
						
					</tr>
				</table>
		</div>
	 	<table width="100%" class="grid">
			<tr height="25" class="grid-header">
				<td colspan="6" style="text-align: left">
					<input type="button" value="添加" class="Button_out" onClick="addWin('${beautyversionid}')" />
					 <input type="button" value="删除" class="Button_out" onClick="delAll('');" />
				</td>
			</tr>
		</table>
		<div style="height: 620px;">
			<table id="beautyinfogrid"></table>
		</div>
		<form id="methoddownload" method="post" >
			<input type="hidden" value="1" name="flg"/>
			<input type="hidden" value="" name="path" id="path"/>
		</form>
	</body>
</html>
