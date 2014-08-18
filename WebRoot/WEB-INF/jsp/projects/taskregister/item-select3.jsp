<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ include file="/common/taglibs.jsp" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<title>监测项目信息</title>
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
			var projectcode='${projectcode}';
			$(function(){	
		  		initProjectItemTree();
  			});
			//初始化树
			function initProjectItemTree(){	
				$('#tree').tree({
					checkbox: true,
					url: rootPath+'/iteminfo/iteminfo!subItemTree.action?projectcode='+projectcode+'&itemtype=0',
					onBeforeExpand:function(node,param){
						$('#tree').tree('options').url = 
							rootPath+'/iteminfo/iteminfo!subItemTree.action?projectcode='+projectcode+'&itemtype='+node.id;
					}
				});
			}
		</script>
		<script type="text/javascript" src="${ctx}/lims/js/projects/item.select.js"></script>
	</head>
	<body onkeydown="PreventBSK();">		
		<input type="hidden" id="btnGetItem" onclick="getSelectedItem()"/>
		<input type="hidden" id="itemid" onclick="getSelectedItem()">
		<input type="hidden" id="itemname"/>
		<ul id="tree"></ul>		
	</body>
</html>
