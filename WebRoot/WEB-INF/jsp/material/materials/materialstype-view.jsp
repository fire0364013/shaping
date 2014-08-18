<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ include file="/common/taglibs.jsp"%>


<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
   <link rel="stylesheet" href="${ctx}/themes/default/easyui.css"	type="text/css" />
		<link rel="stylesheet" type="text/css" href="${ctx}/themes/icon.css"/>
		<link rel="stylesheet" type="text/css"	href="${ctx}/validate/validate.css"/>
		<script type="text/javascript" src="${ctx}/js/jquery-1.7.2.min.js"></script>
		<script type="text/javascript" src="${ctx}/js/jquery.easyui.min.js"></script>
		<script type="text/javascript" src="${ctx}/js/easyui-lang-zh_CN.js"></script>
		<script type="text/javascript" src="${ctx}/validate/input.validate.js"></script>
		<script type="text/javascript" src="${ctx}/js/CommonCheck.js"></script>
		<script type="text/javascript" src="${ctx}/lims/js/materialstype.js"></script>
		

  </head>
  
  <body>
    	<form action="" id="materialstypeForm" method="post" >
			<input type="hidden"  name="materialtypeid" id="materialtypeid"/ value="${materialtypeid }">
				<input type="hidden" id="flagName" name="flagName" value="${meaterialname}"/>
			<table width="100%" border="1" align="center" class="grid">
				<tr>
					<td align="left" class="Main_Tab_Style_title"
						style="width: 80px; height: 20px;">
						物品大类：
					</td>
					<td align="left" class="Main_Tab_Style_Content" width="200px">
						<select style="width: 150px;height:20px" name="bigTypeName" disabled="disabled" >  
							<option value="">---请选择---</option>
							<c:forEach items="${materialstypeList}" var="typeList">
								<option value="${typeList.id}" <c:if test="${typeList.id==meaterialcategoryid.id}">selected="selected"</c:if>>${typeList.category}</option>
							</c:forEach>
						</select>
					</td>		
				</tr>	
				<tr>
					<td align="left" class="Main_Tab_Style_title"
						style="width: 80px; height: 20px;">
						物品小类：
					</td>
					<td align="left" class="Main_Tab_Style_Content" width="200px">
						<input name="equalsName" class="TextBox" disabled="disabled"
							style="width: 150px;height:20px"  value="${meaterialname}"/>
					</td>		
					
				</tr>
			</table></form>
  </body>
</html>
