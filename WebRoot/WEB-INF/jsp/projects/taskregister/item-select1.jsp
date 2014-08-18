<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="/common/taglibs.jsp"%><!-- 这句话引进去是相对路径可以使用的~~ -->
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
		<title>检测项目</title>
		<link rel="stylesheet" type="text/css" href="${ctx}/themes/default/easyui.css">
		<link rel="stylesheet" type="text/css" href="${ctx}/themes/icon.css">
		<link rel="stylesheet" type="text/css" href="${ctx}/validate/validate.css">
		<script type="text/javascript" src="${ctx}/js/jquery-1.7.2.min.js"></script>
		<script type="text/javascript" src="${ctx}/js/jquery.easyui.min.js"></script>
		<script type="text/javascript" src="${ctx}/js/CommonCheck.js"></script>
		<script type="text/javascript" src="${ctx}/js/jquery.jstree.js"></script>
		<script type="text/javascript" src="${ctx}/validate/input.validate.js"></script>
		<script type="text/javascript">
			var rootPath="${ctx}";
			var items = "${itemid}";
			$(function () { 
				initItemTree();
			});
			
			function initItemTree(){
				$('#tree').tree({
					checkbox: true,
			//		animate: true,
					url: rootPath + '/iteminfo/iteminfo!tree.action?itemtype=0',
					onBeforeExpand:function(node,param){
						$('#tree').tree('options').url = rootPath + '/iteminfo/iteminfo!tree.action?itemtype='+node.id;
					},
					onLoadSuccess:function(){
						if(items != ""){
							var valueid=items.split(",");
							for ( var i = 0; i < valueid.length; i++) {
								var node = $('#tree').tree('find', valueid[i]);
								$('#tree').tree('check', node.target);
							}
						}
					}
					
				});
			}
			function getSelectedItem(){
				var nodes = $('#tree').tree('getChecked');
				var itemid = "";
				var itemname = "";
				for(var i=0;i<nodes.length;i++){
					if(nodes[i].attributes.flag=="item"){
						itemid = itemid + nodes[i].id + ",";
						itemname = itemname + nodes[i].text + ",";
					}
				}
				$('#itemid').val(itemid.substring(0,itemid.length-1));
				$('#itemname').val(itemname.substring(0,itemname.length-1));
			}
			
		</script>
		<%--<script type="text/javascript" src="${ctx}/lims/js/projects/item.select.js"></script>
	--%></head>
	<body>	
		<input type="hidden" id="btnGetItem" onclick="getSelectedItem();"/>
		<input type="hidden" id="itemid"/>
		<input type="hidden" id="itemname"/>
		<ul id="tree"></ul>
	</body>
</html>
