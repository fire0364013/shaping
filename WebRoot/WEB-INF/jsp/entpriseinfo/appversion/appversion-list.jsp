<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ include file="/common/taglibs.jsp" %>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<title>医美版本管理</title>
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
		var appinfoid = "${appinfoid}";
    </script>
    <script type="text/javascript" src="${ctx}/lims/js/appversion.js"></script>
    <script type="text/javascript">
    $(function(){
    	initDataGrid();
    })
    </script>
	</head>
	<body >
	<input type="hidden" id="dict">
		 <s:form method="post" theme="simple" cssStyle="padding:0px;margin:0px">
		<div  style="height: 30px; size: 12px">
			<div>
			
				<table class="Main_Tab_Style" style="width: 100%; height:22px">
					<tr>
						<td class="Main_Tab_Style_title"
							style="width:60px; text-align: left">
							版本名称：
						</td>
						<td class="Main_Tab_Style_Content" style="width: 130px;">
							<input type="text" id="appversionname" class="TextBox" name="appversionname"
								style="width: 130px; height: 20px;" /> 
						</td>
					  <td class="Main_Tab_Style_Content" style="text-align:left;">
							<input type="button" class="Button_out" value="查询" onclick="query()"/>
						</td>
				</tr>
				</table>
			</div>
		</div>
		</s:form>
		<table width="100%" class="grid" >
				<tr height="25" class="grid-header">
					<td colspan="6" style="text-align: left">
						<input type="button" value="添加" class="Button_out"
							onClick="addWin('')" />
						<input type="button" value="删除" class="Button_out"
							onClick="delAll('')" />
							
					</td>
				</tr>
		</table>
		<div  style="width: 100%;height: 400px" >
		<table id="appversiongrid"></table></div>
</body>
</html>
