<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ include file="/common/taglibs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" >
<html>
	<head>
		<title>费用明细</title>
		<link rel="stylesheet" href="${ctx}/themes/default/easyui.css" type="text/css" />
		<link rel="stylesheet" type="text/css" href="${ctx}/themes/icon.css" />
		<script type="text/javascript" src="${ctx}/js/jquery-1.7.2.min.js"></script>
		<script type="text/javascript" src="${ctx}/js/jquery.easyui.min.js"></script>
		<script type="text/javascript" src="${ctx}/js/CommonCheck.js"></script>
		<script type="text/javascript" src="${ctx}/js/jquery.json-2.3.js"></script>
		<script type="text/javascript" src="${ctx}/js/jquery.json-2.3.min.js"></script>
		<script type="text/javascript" src="${ctx}/validate/input.validate.js"></script>
		<script type="text/javascript">
		var rootPath = "${ctx}";
		var projectcode = "${id}";
		$(function(){
			initItemChargedatagrid();
			//initSamplefeeChargedatagrid();
		});
		</script>
		<script type="text/javascript" src="${ctx}/lims/js/projects/project.charge.detail.js"></script>
	</head>

	<body onkeydown="PreventBSK()">
	<input type="hidden" id="projectcode" value="${id}"/>
		<div class="grid-headerSpace">
	   		总费用：<input id="totalcost" disabled value="￥${totalCost}" style="width:100px;"/>
	    </div>
	    <div >手术项目费用  (双击费用列中单元格可修改费用)</div>  	 
			<div style="width: 100%; height: 600px;">   
          <table id="datagrid"></table>
		</div>
		<!-- 
		 <div class="panelheader">人员车辆费用</div>  	 
		<div style="width: 100%; height: 200px;">   
		<table id="datagrid1"></table>
		</div>
		 -->
	</body>
</html>
