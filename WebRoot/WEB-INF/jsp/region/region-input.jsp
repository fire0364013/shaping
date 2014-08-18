<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ include file="/common/taglibs.jsp"%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<title>行政区域管理</title>
		<link rel="stylesheet" href="${ctx}/themes/default/easyui.css" type="text/css" />
		<link rel="stylesheet" type="text/css" href="${ctx}/themes/icon.css">
		<link rel="stylesheet" type="text/css"	href="${ctx}/validate/validate.css">
		<script type="text/javascript" src="${ctx}/js/jquery-1.7.2.min.js"></script>
		<script type="text/javascript" src="${ctx}/js/jquery.easyui.min.js"></script>
		<script type="text/javascript" src="${ctx}/js/easyui-lang-zh_CN.js"></script>
		<script type="text/javascript" src="${ctx}/validate/input.validate.js"></script>
		<script language="JavaScript" type="text/javascript">
		var rootPath="${ctx}";
		$(document).ready(function(){
			$('#regioncode').focus();
			var regioncode="${regioncode}";
			if(regioncode!=""){
				$('#equalsName').attr("readonly","readonly");
			}else{
				$('#equalsName').removeAttr("readonly");
			}
		});
		</script>
	</head>
	<body>
			<form id="regionform"  method="post" >
				<input type="hidden" id="id" name="id" value="${id }"/>
				<input type="hidden" id="flagName" name="flagName" value="${regioncode }"/>
				<table width="100%" border="1" align="center" class="grid">
					<tr>					
						<td align="left" class="Main_Tab_Style_title"	style="width: 100px; height: 20px;">
							区域编号：
						</td>
						<td align="left" class="Main_Tab_Style_Content">
							<input id="equalsName" name=equalsName value="${regioncode}" class="TextBox grkj-validate" 
								validateParam="{type:'string',maxLength:'20',required:'true',message:'请输入准确的区域编号，长度不超过20个字符！'}"	
									Style="width: 200px;height:20px" /><font color="red" size="4px"> *</font>
						</td>
					</tr>
					<tr>
						<td align="left" class="Main_Tab_Style_title"	style="width: 100px; height: 20px;">
							区域名称：
						</td>
						<td align="left" class="Main_Tab_Style_Content">
							<input id="regionname" name="regionname" value="${regionname}" class="TextBox grkj-validate" 
									validateParam="{type:'string',maxLength:'50',required:'true',message:'请输入准确的区域名称，长度不超过50个字符！'}"	
									Style="width: 200px;height:20px" /><font color="red" size="4px"> *</font>
						</td>
					</tr>
					<tr>
						<td align="left" class="Main_Tab_Style_title"	style="width: 100px; height: 20px;">
							是否使用：
						</td>
						<td align="left" class="Main_Tab_Style_Content">
						<select  class="TextBox" name="isused" Style="width: 200px;height:20px">							
 							 <option value="1" <c:if test="${isused=='1'}">selected="selected"</c:if>>是</option>
							 <option value="0" <c:if test="${isused=='0'}">selected="selected"</c:if>>否</option>							
						</select>								
						</td>
				</tr>
				</table>
			</form>
	</body>
</html>
