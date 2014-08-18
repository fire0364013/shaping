<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ include file="/common/taglibs.jsp" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    
    <title>物品类型管理</title>
    
	<link rel="stylesheet" href="${ctx}/themes/default/easyui.css" type="text/css" />
		<link rel="stylesheet" href="${ctx}/validate/validate.css" type="text/css" />
		<link rel="stylesheet" type="text/css" href="${ctx}/themes/icon.css">
		<script type="text/javascript" src="${ctx}/js/jquery-1.7.2.min.js"></script>
		<script type="text/javascript" src="${ctx}/js/jquery.easyui.min.js"></script>
		<script type="text/javascript" src="${ctx}/js/easyui-lang-zh_CN.js"></script>
		<script type="text/javascript" src="${ctx}/js/CommonCheck.js"></script>
		<script type="text/javascript" src="${ctx}/validate/input.validate.js"></script>
   		 <script type="text/javascript" src="${ctx}/lims/js/material/materialstype.js"></script>
  		 <script language="JavaScript" type="text/javascript">
 		var rootPath="${ctx}";
        function showContentPage(url,subModuleName,parModeleName) {
        	var navigateString="<ul id='nav'><li><a>首页></a></li><li><a id='parModule'>"+parModeleName.toString()+"></a></li> <li><a id='subModule'>"+subModuleName.toString()+"</a></li></ul>";
        	$(window.top.document).find("#navigation").html(navigateString);
            $(window.top.document).find("#contentFrame").attr("src", url.toString());
        }	
    </script>
  </head>
  <body>
		<div  style="height: 30px; size: 12px">
				<table class="Main_Tab_Style" style="width: 100%; height:22px">
					<tr>
					<td class="Main_Tab_Style_title"
							style="width: 80px; text-align: left">
							物品大类：
						</td>
						<td class="Main_Tab_Style_Content" style="width: 150px;">
							<select style="width: 150px;height:20px" id="bigTypeName" >  
								<option value="">---请选择---</option>
								<c:forEach items="${materialstypeList}" var="typeList">
									<option value="${typeList.id}">${typeList.category}</option>
								</c:forEach>
							</select>
						</td>
						<td class="Main_Tab_Style_title"
							style="width: 80px; text-align: left">
							物品类型：
						</td>
						<td class="Main_Tab_Style_Content" style="width: 150px;">
							<input type="text" id="meaterialname" class="TextBox"
								style="width: 150px; height: 20px;" value="${meaterialname }"/>
						</td>
					  <td class="Main_Tab_Style_Content" style="text-align:left;">
							<input type="button" class="Button_out" value="查询" onclick="query()"/>
						</td>
				</tr>
				</table>
			</div>
		<table width="100%" class="grid" >
				<tr height="25" class="grid-header">
					<td colspan="6" style="text-align: left">
						<input type="button" id="add"  value="添加" class="Button_out"
							onClick="addWin('','');" />
						<input type="button" id="delettAll" value="删除" class="Button_out"
							onClick="deleteAll();" />
					</td>
				</tr>
		</table>
		<div  style="width: 100%;height: 655px" >
		<table id="materialstypeDatagrid"></table></div>
	</body>
</html>

