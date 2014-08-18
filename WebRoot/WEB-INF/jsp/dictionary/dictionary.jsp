<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="/common/taglibs.jsp"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<title>数据字典详情</title>

		<link rel="stylesheet" href="${ctx}/themes/default/easyui.css"
			type="text/css" />
		<link rel="stylesheet" type="text/css" href="${ctx}/themes/icon.css">
		<script type="text/javascript" src="${ctx}/js/jquery-1.7.2.min.js"></script>
		<script type="text/javascript" src="${ctx}/js/jquery.easyui.min.js"></script>
		<script type="text/javascript" src="${ctx}/js/easyui-lang-zh_CN.js"></script>
		<script type="text/javascript" src="${ctx}/js/CommonCheck.js"></script>
		<script type="text/javascript" src="${ctx}/lims/js/dictionary/dictionary.js"></script>

		<script type="text/javascript">
	var rootPath = "${ctx}";
	$(document).ready(function() {
		initDictInfo();
	});
	</script>
	</head>
	<body>
<form id="methoddownload" method="post">
<input type="hidden" id="dinfoid" name="dinfoid" value="${dinfoid}"/>
<input type="hidden" id="dictionarycode" name="dictionarycode" value="${dictCode}"/>
		<table width="100%" class="grid">
			<tr height="25" class="grid-header">
				<td colspan="6" style="text-align: left">
					<input type="button" value="添加" class="Button_out"
						onClick="add()" />
					<input type="button" value="删除" class="Button_out"
						onClick="delAll()" />
				</td>
			</tr>
		</table>

		<div  style="width: 100%;height: 655px" >
			<table id="dictionaryinfo"></table>

		</div>

</form>
		<!-- 本jsp的脚本引用__wjy -->
	</body>

</html>
