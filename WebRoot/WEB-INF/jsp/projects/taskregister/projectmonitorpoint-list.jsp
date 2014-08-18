<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ include file="/common/taglibs.jsp" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<title>监测方案</title>
		<link rel="stylesheet" href="${ctx}/themes/default/easyui.css" type="text/css" />
		<link rel="stylesheet" type="text/css" href="${ctx}/themes/icon.css">
		<script type="text/javascript" src="${ctx}/js/jquery-1.7.2.min.js"></script>
		<script type="text/javascript" src="${ctx}/js/jquery.easyui.min.js"></script>
		<script type="text/javascript" src="${ctx}/js/easyui-lang-zh_CN.js"></script>
		<script type="text/javascript" src="${ctx}/js/CommonCheck.js"></script>
		<link rel="stylesheet" href="${ctx}/validate/validate.css" type="text/css" />
		<script type="text/javascript" src="${ctx}/validate/input.validate.js"></script>
		<script language="JavaScript" type="text/javascript">
			var rootPath="${ctx}";
			var projectdetail="${str}";
			$(function(){
				initMonitorinfo();
				initSetinfo();
				//initIteminfo();
			})
			
    	</script>
    	<script type="text/javascript" src="${ctx}/lims/js/projects/project.monitorpoint.js"></script>
</head>
<body onkeydown="PreventBSK();">
   <div class="panelheader">采样点</div>
	<div class="grid-headerSpace">
   		<input type="button" value="添加" class="Button_out" onclick="addMonitor();"/>
   		<input type="button" value="删除" class="Button_out" onclick="removeMonitor();"/>
   		<input type="button" value="批量设置采样信息" style="width:120px; height:25px; font-color;gray;" onclick="batchSet();"/>
   </div>
   <div style="width: 100%; height: 120px;"> 	    
   	    <table id="monitorlist" >
		</table>
	</div>

	<div class="panelheader" >采样信息</div>
  	<div class="grid-headerSpace">
   		<input type="button" value="添加" class="Button_out" onclick="addSet();"/>
   		<input type="button" value="修改" class="Button_out" onclick="updateSet();"/>
   		<input type="button" value="删除" class="Button_out" onclick="removeSet();"/>
   	</div>
    <div style="width: 100%; height: 80px;">  
		<table id="setlist"></table>
	</div>
	
    <div class="panelheader">检测项目</div>
   <div class="grid-headerSpace">
   		<input type="button" value="添加" class="Button_out" onClick="addItem();"/>
   		<input type="button" value="修改" class="Button_out" onclick="updateItem();"/>
    	<input type="button" value="删除" class="Button_out" onClick="removeItem();"/>
    </div>
    <div style="width: 100%; height: 185px;">
       	<table id="itemlist" style="height: 145px;"></table>
	</div>

</body>
</html>
