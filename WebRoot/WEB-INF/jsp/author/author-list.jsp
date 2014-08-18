<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="/common/taglibs.jsp"%>


<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<title>授权签字人管理</title>
		<link rel="stylesheet" href="${ctx}/themes/default/easyui.css"
			type="text/css" />
		<link rel="stylesheet" type="text/css" href="${ctx}/themes/icon.css">
		<script type="text/javascript" src="${ctx}/js/jquery-1.7.2.min.js"></script>
		<script type="text/javascript" src="${ctx}/js/jquery.easyui.min.js"></script>
		<script type="text/javascript" src="${ctx}/js/easyui-lang-zh_CN.js"></script>
		<script type="text/javascript" src="${ctx}/js/jquery.MultiFile.js"></script>
		<script type="text/javascript" src="${ctx}/lims/js/author.js"></script>	
		<script type="text/javascript" src="${ctx}/validate/input.validate.js"></script>
		<script type="text/javascript" src="${ctx}/lims/js/author.js"></script>
		<script type="text/javascript">
			var rootPath = "${ctx}";
		</script>
	</head>
	<body>
		<div  style="height: 30px; margin: 0 0px 0px 0; size: 100px">
			<div><table class="Main_Tab_Style" style="width: 100%; height: 22px">
					<tr>
						<td align="left" class="Main_Tab_Style_title"
							style="width: 120px; text-align: left">
							监测业务类型：
						</td>
					 
						<td align="left"  width="40px"  class="Main_Tab_Style_Content">
						<select class="TextBox "  id="monitortypename" name="monitortypename" style="width: 150px">
							<option value="">	---请选择---	</option>
							<c:forEach var="dList" items="${listMonitorType }">
								<option value="${dList.monitortypename}" >${dList.monitortypename}</option>
							</c:forEach>
						</select>
						</td>
						<td class="Main_Tab_Style_Content"
							style="width: 100px text-align : left;">
							<input type="button" class="Button_out" value="查询"
								onclick="query('')" />
						</td>
					</tr>
				</table>
			</div>
		</div>
		<div  style="height: 675px; margin: 0 2px 2px 0">
			<table id="authorgrid"></table>
		</div>
	</body>
</html>
