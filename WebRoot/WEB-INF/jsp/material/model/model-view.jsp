<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ include file="/common/taglibs.jsp" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    
    <title>物品信息详情</title>
    
	<link rel="stylesheet" href="${ctx}/themes/default/easyui.css" type="text/css" />
		<link rel="stylesheet" type="text/css" href="${ctx}/themes/icon.css">
		<script type="text/javascript" src="${ctx}/js/jquery-1.7.2.min.js"></script>
		<script type="text/javascript" src="${ctx}/js/jquery.easyui.min.js"></script>
		<script type="text/javascript" src="${ctx}/js/easyui-lang-zh_CN.js"></script>
  </head>
  
  <body>
  <form action="" id="materialsForm" method="post">
  <input type="hidden"  name="materialid"  class="TextBox"   value="${materials.materialid}" style="width: 150px; height: 20px;" />
			<table width="100%" border="1" align="center" class="grid">
				<tr>
					<td align="left" class="Main_Tab_Style_title"
						style="width: 150px; height: 20px;">
						物品名称：
					</td>
					<td align="left" class="Main_Tab_Style_Content" width="170px">
					<input type="text"  name="materials.materialname"  class="TextBox"   value="${materials.materialname}" style="width: 150px; height: 20px;" disabled="disabled"/>
					</td>
				</tr>
					<tr>
						<td align="left" class="Main_Tab_Style_title"
						style="width: 150px; height: 20px;">
						规格型号：
					</td>
					<td align="left" class="Main_Tab_Style_Content" width="170px">
					<input type="text"  name="modelname"  class="TextBox"   value="${modelname}" style="width: 150px; height: 20px;" disabled="disabled"/>
					</td></tr>
					<tr>
					<td align="left" class="Main_Tab_Style_title"
						style="width: 150px; height: 20px;">
					物品类型：
					</td>
						<td align="left" class="Main_Tab_Style_Content" width="170px">
						<select   disabled="disabled" class="TextBox"    name="materials.materialstype.materialtypeid" 
						 style="width: 150px;height:20px">
						 <option value="">---请选择---</option>
							<c:forEach  var="materialslist1"  items="${materialslist}">
								<option value="${materialslist1.materialtypeid}" 
								<c:if test="${materialslist1.materialtypeid==materials.materialstype.materialtypeid}">selected="selected"</c:if>
								>${materialslist1.meaterialname}</option>
							</c:forEach>
						</select>
					</td>
				</tr>
				<tr>
				<td align="left" class="Main_Tab_Style_title" style="width: 150px; height: 20px;">
						计量单位：
				</td>
				<td align="left" class="Main_Tab_Style_Content" width="170px">
				<input type="text"  name="modelname"  class="TextBox"   value="${materials.unit.unitname}" style="width: 150px; height: 20px;" disabled="disabled"/>
				</td>
				</tr>
				<td align="left" class="Main_Tab_Style_title" style="width: 150px; height: 20px;">
						剩余数量：
				</td>
				<td align="left" class="Main_Tab_Style_Content" width="170px">
				<input type="text"  name="remainingnum"  class="TextBox"   value="${remainingnum}" style="width: 150px; height: 20px;" disabled="disabled"/>
				</td>
				</tr>
				<tr>
				<td align="left" class="Main_Tab_Style_title" style="width: 150px; height: 20px;">
					物品性质：
				</td>
				<td align="left" class="Main_Tab_Style_Content" width="170px">
				<input type="text"  name="materialproperty"  class="TextBox"    value="${materialproperty.materialpropertyname}" disabled="disabled" style="width: 150px; height: 20px;" />
				</td>
				</tr> 
				</table></form>
  </body>
</html>
