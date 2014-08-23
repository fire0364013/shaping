<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="/common/taglibs.jsp"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<title>项目附件</title>
		<script type="text/javascript">
			var rootPath = "${ctx}";
			var beautyversionid = "{beautyversionid}";
		</script>
		<link rel="stylesheet" href="${ctx}/themes/default/easyui.css"type="text/css" />
		<link rel="stylesheet"	href="${ctx}/js/DatePicker/skin/WdatePicker.css" type="text/css" />
		<link rel="stylesheet" type="text/css" href="${ctx}/themes/icon.css">
		<link rel="stylesheet" type="text/css"href="${ctx}/validate/validate.css">
		<script type="text/javascript" src="${ctx}/js/jquery-1.7.2.min.js"></script>
		<script type="text/javascript" src="${ctx}/js/jquery.easyui.min.js"></script>
		<script type="text/javascript" src="${ctx}/js/easyui-lang-zh_CN.js"></script>
		<script type="text/javascript" src="${ctx}/js/jquery.MultiFile.js"></script>
			<script type="text/javascript"src="${ctx}/js/DatePicker/WdatePicker.js"></script>
		<script type="text/javascript" src="${ctx}/validate/input.validate.js"></script>
		<script type="text/javascript" src="${ctx}/lims/js/projects/attachment.js"></script> 
	</head>
	<body onkeydown="PreventBSK()">
		<div id="dlg-buttons">
			<form id="attform" action="" method="post" enctype="multipart/form-data">
				<input type="hidden" name="beautyversionid" value="${beautyversionid}"/>
				<input type="hidden" name="validStatus" value="1"/>
				<table width="100%" border="1" align="center" class="grid">
					<tr>
						<td align="left" class="Main_Tab_Style_title"
							style="width: 150px; height: 20px;">
							标题：
						</td>
						<td align="left" class="Main_Tab_Style_Content">
							<input type="text" id="infotitle" name="infotitle" id="infotitle"  class="TextBox grkj-validate" value="${attachmentname }"
                              validateParam="{type:'string',maxLength:'50',required:'true',message:'请正确输入标题名称，长度不超过50个字符！'}"	style="width: 340px; height: 20px;" />
						</td>	
						<td><font color="red" size="4px"> *</font></td>				
				</tr>
					<tr>
						<td align="left" class="Main_Tab_Style_title">
							图片：
						</td>
						<td colspan="3" align="left" class="Main_Tab_Style_Content">
							<s:file name="file" size="40" label="上传" theme="simple" cssClass="TextBox" id="filec"></s:file>
						</td>
					</tr>
				<tr>
						<td align="left"  rowspan="5" class="Main_Tab_Style_title" style="width: 150px; height: 20px;">
						备注：
					</td>
					<td colspan="3" rowspan="5" align="left" class="Main_Tab_Style_Content">
						<textarea class="TextBox grkj-validate" style="width: 340px; height: 180px" validateParam="{type:'string',maxLength:'500',required:'false',message:'长度不超过120个字符！'}" style="width:99.5%;height:100px;" name="remark" id="remark">${remark }</textarea>
					</td>	
					</tr>
				</table>
			</form>
		</div>
	</body>
</html>
