<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="/common/taglibs.jsp"%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<title>容器</title>
			<link rel="stylesheet" href="${ctx}/themes/default/easyui.css"
			type="text/css" />
		<link rel="stylesheet" type="text/css" href="${ctx}/themes/icon.css">
		<script type="text/javascript" src="${ctx}/js/jquery-1.7.2.min.js"></script>
		<script type="text/javascript" src="${ctx}/js/jquery.easyui.min.js"></script>
		<script type="text/javascript" src="${ctx}/js/easyui-lang-zh_CN.js"></script>
		<script type="text/javascript" src="${ctx}/validate/input.validate.js"></script>
		<!-- 本jsp的脚本引用__wjy -->
		<script type="text/javascript">	
			var rootPath="${ctx}";
		</script>
		<script type="text/javascript" src="${ctx}/lims/js/container.js"></script>
	</head>
	<body>
		<div  style="height: 30px; size: 12px">
			<div>
				<table class="Main_Tab_Style" style="width: 100%; height: 22px">
					<tr>
						<td class="Main_Tab_Style_title"	style="width: 10%; text-align: left;">
							容器名称：
						</td>
						<td class="Main_Tab_Style_Content" style="width: 15%;">
							<input type="text" name="containername" id="containername" class="TextBox"	style="width: 100%;"  />
						</td>
						<td class="Main_Tab_Style_Content"	style="width: 50%; text-align: left;">
							<input type="button" class="Button_out" value="查询" 	onclick="query()" />
						</td>
					</tr>
				</table>
			</div>
		</div>
		<table width="100%" class="grid">
			<tr height="25" class="grid-header">
				<td colspan="6" style="text-align: left">
					<input type="button" value="添加" class="Button_out" onClick="addWin('')" />
					<input type="button" value="删除" class="Button_out" 	onClick="delAll('')" />
				</td>
			</tr>
		</table>
		<div style="height: 645px;">
			<table id="containergrid"></table>
		</div>
	</body>
</html>
