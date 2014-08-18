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
			<s:hidden name="materials.materialid"/>
			<table width="100%" border="1" align="center" class="grid">
				<tr>
					<td align="left" class="Main_Tab_Style_title"
						style="width: 100px; height: 20px;">
						物品名称：
					</td>
					<td align="left" class="Main_Tab_Style_Content" width="210px">
					<input type="text"  name="materials.materialname"  class="TextBox"   value="${materials.materialname}" style="width: 200px; height: 20px;" disabled="disabled""/>
					</td>
				</tr>
					<tr>
						<td align="left" class="Main_Tab_Style_title"
						style="width: 100px; height: 20px;">
							计量单位：
					</td>
					<td align="left" class="Main_Tab_Style_Content" width="210px">
					<input type="text"  name="materials.unit.unitid"  class="TextBox"   value="${materials.unit.unitname}" style="width: 200px; height: 20px;" disabled="disabled""/>
					</td></tr>
					<tr>
					<td align="left" class="Main_Tab_Style_title"
						style="width: 100px; height: 20px;">
						物品大类：
					</td>
					<td align="left" class="Main_Tab_Style_Content">
						<input  class="TextBox" value="${meaterialcategoryid.category}" style="width:200px;height:20px" disabled="disabled"/>
					</td>
				</tr>
				<tr>
					<td align="left" class="Main_Tab_Style_title"
						style="width: 100px; height: 20px;">
						物品小类：
					</td>
					<td align="left" class="Main_Tab_Style_Content" >
						<input  class="TextBox" value="${materialstype.meaterialname}" style="width:200px;height:20px" disabled="disabled"/>
					</td>
				</tr>	
					<tr>
						<td align="left" class="Main_Tab_Style_title"	style="width: 100px; height: 20px;">
							库存上限：
						</td>
						<td align="left" class="Main_Tab_Style_Content">
							<input id="stocklowerlimit" name="stocklowerlimit" value="${stocklowerlimit}"  class="TextBox" disabled="disabled" Style="width: 200px;height:20px" />
						</td>
					</tr>
							<tr>
						<td align="left" class="Main_Tab_Style_title"	style="width: 100px; height: 20px;">
							库存下限：
						</td>
						<td align="left" class="Main_Tab_Style_Content">
							<input id="stockupperlimit" name="stockupperlimit" value="${stockupperlimit}"  class="TextBox"   disabled="disabled"  Style="width: 200px;height:20px" />
						</td>
					</tr>
							<tr>
						<td align="left" class="Main_Tab_Style_title"	style="width: 100px; height: 20px;">
							过期提前<br>提醒天数：
						</td>
						<td align="left" class="Main_Tab_Style_Content">
							<input id="duoreminddays" name="duoreminddays" value="${duoreminddays}"  class="TextBox"   disabled="disabled"  Style="width: 200px;height:20px" />
						</td>
					</tr>
					<tr><td align="left" class="Main_Tab_Style_title"
						style="width: 100px; height: 20px;">
					备注：
					</td>
				<td colspan="3" align="left" class="Main_Tab_Style_Content">
			<textarea  class="TextBox " style="width: 200px;height:80px"  name="materials.remark"  disabled="disabled">${materials.remark}</textarea>
  			</td></tr>
				</table></form>
				
  </body>
</html>
