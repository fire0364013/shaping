<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ include file="/common/taglibs.jsp"%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<title>容器管理</title>
		<link rel="stylesheet" href="${ctx}/themes/default/easyui.css"type="text/css" />
		<link rel="stylesheet" type="text/css"href="${ctx}/themes/icon.css">
		<link rel="stylesheet" type="text/css" href="${ctx}/validate/validate.css">
		<script type="text/javascript" src="${ctx}/js/jquery-1.7.2.min.js"></script>
		<script type="text/javascript" src="${ctx}/js/jquery.easyui.min.js"></script>
		<script type="text/javascript" src="${ctx}/js/easyui-lang-zh_CN.js"></script>
		<script type="text/javascript" src="${ctx}/validate/input.validate.js"></script>
		<script type="text/javascript" src="${ctx}/lims/js/alertItem.js"></script>
		<script language="JavaScript" type="text/javascript">
		var rootPath="${ctx}";
		var items = "${jcxmname}";
		var itemid="${jcxm}";
		$(document).ready(function(){
			$('#containername').focus();
		});
		</script>
	</head>
<body>
		<div id="dlg-buttons">
			<form id="containerForm"  method="post">
			<input type="hidden" name="containerid" id="containerid" value="${containerid}"/>
			<input type="hidden" id="flagName" name="flagName" value="${containername }"/>
				<table width="100%" border="1" align="center" class="grid">
					<tr>					
						<td align="left" class="Main_Tab_Style_title"	style="width: 100px; height: 20px;">
							容器名称：
						</td>
						<td align="left" class="Main_Tab_Style_Content">
							<input id="equalsName" name="equalsName" value="${containername}" class="TextBox grkj-validate" 
									validateParam="{type:'string',maxLength:'40',required:'true',message:'请输入准确的容器名称，长度不超过40个字符！'}"	
									Style="width: 250px;height:20px" /><font color="red" size="4px"> *</font>
						</td>
					</tr>
					<tr>
						<td align="left" class="Main_Tab_Style_title"	style="width: 100px; height: 20px;">
							容器标识符：
						</td>
						<td align="left" class="Main_Tab_Style_Content">
							<input id="tag" name="tag" value="${tag}" class="TextBox  grkj-validate"
								validateParam="{type:'string',maxLength:'20',required:'false',message:'长度不超过20个字符！'}"
									Style="width: 280px;height:20px" />
						</td>
					</tr>
					<tr>
					<td class="Main_Tab_Style_title"
							style="text-align: left;width:60px;">
							监测项目：
						</td>
						<td class="Main_Tab_Style_Content">
							<textarea type="text" id="jcxmname" name="jcxmname"   readonly="readonly" class="TextBoxPic"
								style="width: 280px; height: 80px;" onclick="showitemforcon(items,itemid)" >${jcxmname }</textarea>
							<input 	type="hidden"  id="jcxm" name="jcxm" value="${jcxm }"	class="TextBox " style="width: 100px; height: 20px" />
						</td>	</tr>
				<tr>
						<td align="left" class="Main_Tab_Style_title"
							style="width: 100px; height: 80px;">
							备注：
						</td>
						<td colspan="3" >
							<textarea rows="5" cols="3"  name="remark" id="remark" class="TextBox grkj-validate"  
							validateParam="{type:'string',maxLength:'500',required:'false',message:'长度不超过500个字符！'}"
							style="width: 100%; height: 80px" >${remark }</textarea>
				</td>
					</tr>
				</table>
			</form>
		</div>
	</body>
</html>
