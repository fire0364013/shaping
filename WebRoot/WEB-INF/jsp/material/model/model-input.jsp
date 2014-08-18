<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ include file="/common/taglibs.jsp" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>物品信息</title>
	<link rel="stylesheet" href="${ctx}/themes/default/easyui.css" type="text/css" />
		<link rel="stylesheet" href="${ctx}/validate/validate.css" type="text/css" />
		<link rel="stylesheet" type="text/css" href="${ctx}/themes/icon.css">
		<script type="text/javascript" src="${ctx}/js/jquery-1.7.2.min.js"></script>
		<script type="text/javascript" src="${ctx}/js/jquery.easyui.min.js"></script>
		<script type="text/javascript" src="${ctx}/js/easyui-lang-zh_CN.js"></script>
		<script type="text/javascript" src="${ctx}/js/CommonCheck.js"></script>
		<script type="text/javascript" src="${ctx}/validate/input.validate.js"></script>
		<script language="JavaScript" type="text/javascript">
		var rootPath="${ctx}";
    </script>
    <script type="text/javascript" src="${ctx}/lims/js/materials.js"></script>
    <script type="text/javascript"src="${ctx}/lims/js/material/inventory-selmatname.js"></script>
        <script type="text/javascript"src="${ctx}/lims/js/material/model-selmatname.js"></script>
  </head>
	<body onkeydown="PreventBSK();">
		<form action="" id="materialsForm" method="post" theme="simple">
		<input type="hidden"  name="id" value="${materialmodelid}"/>
		<input type="hidden" id="flagName" name="flagName" value="${materials.materialid}"/>
		 <input type="hidden" id="flagModel" name="flagModel" value="${modelname}"/> 
		  <input type="hidden" id="flagModel" name="flagRropertype" value="${materialproperty.materialpropertyid}"/> 
			<table width="100%" border="1" align="center" class="grid">
				<tr>
					<td align="left" class="Main_Tab_Style_title"
						style="width: 150px; height: 20px;">
						物品名称：
					</td>
					<td align="left" class="Main_Tab_Style_Content">
						<input type="text" name="materialname" id="materialname"
						readonly="readonly" 	class="TextBoxPic grkj-validate" validateParam="{type:'String',required:'true',message:'物品名称不能为空！'}" 
							value="${materials.materialname}" onclick="showmaterialName()" style="width: 150px; height: 20px;" />
						<font color="red" size="4px"> *</font><input type="hidden" name="equalsName" id="materialid"
							class="TextBox" value="${materials.materialid}"
							onclick="showmaterialName()" style="width: 150px; height: 20px;" />
					</td>
				</tr>
					<tr>
						<td align="left" class="Main_Tab_Style_title"
						style="width: 150px; height: 20px;">
						规格型号：
					</td>
					<td align="left" class="Main_Tab_Style_Content" width="170px">
					<input type="text"  name="modelCurrent"  class="TextBox grkj-validate"  validateParam="{type:'string',required:'true',message:'请输入规格型号'}"    value="${modelname}" style="width: 150px; height: 20px;" /><font color="red" size="4px"> *</font>
					</td>
					</tr> 
					<tr>
						<td align="left" class="Main_Tab_Style_title"
						style="width: 150px; height: 20px;">
						物品性质：
						</td>
					<td align="left" class="Main_Tab_Style_Content" width="170px">
					<select  class="TextBox" id="materialpropertypeid"   name="materialpropertypeid"   style="width: 150px;height:20px">
						 <option value="">---请选择---</option>
							<c:forEach  var="materialslist1"  items="${materialpropertyList}">
								<option value="${materialslist1.materialpropertyid}" 
								<c:if test="${materialslist1.materialpropertyid==materialproperty.materialpropertyid}">selected="selected"</c:if>
								>${materialslist1.materialpropertyname}</option>
							</c:forEach>
						</select>
					</td>
					</tr> 
			</table>
		</form>

	</body>
</html>
