<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ include file="/common/taglibs.jsp" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<title>监测点信息</title>
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
			var projectdetail = "${str}"
			var entid="${entid}";
			$(function(){				
  				initMonitorTree();
			});
    	</script>
		<script type="text/javascript" src="${ctx}/lims/js/monitor/monitor.point.js"></script>
  </head>
<body class="easyui-layout" fit="true"  onkeydown="PreventBSK();">	
	<input type="hidden" id="monitors" onclick="getSelectedMonitor()"/>
    <div region="west" split="true" title="" style="width:225px;height:100%; padding: 0px 0px 0 0px;">
        <ul id="monitortree"></ul>
    </div>
    <div region="center" title="" style="width:100%; height:600px; padding: 0px 0px 0 0px;">
        <iframe id="pointFrame" width="100%" height="100%" frameborder="0" scrolling="no"></iframe>
    </div>
    
    <div id="typeMenu" class="easyui-menu" style="width:120px;">
		<div onclick="javascript:addMonitorPoint();">添加监测点</div>
	</div>
	
	<div id="pointMenu" class="easyui-menu" style="width:120px;">	
		<div onclick="javascript:editMonitorPoint()">修改监测点</div>
        <div onclick="javascript:delMonitor();">删除监测点</div>
	</div>
</body>
</html>
