<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="/common/taglibs.jsp" %>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    
    <title>提交意见</title>
	<link rel="stylesheet" href="${ctx}/themes/default/easyui.css" type="text/css" />
	<link rel="stylesheet" type="text/css" href="${ctx}/themes/icon.css">
	<link rel="stylesheet" href="${ctx}/validate/validate.css" type="text/css" />
	<script type="text/javascript" src="${ctx}/js/jquery-1.7.2.min.js"></script>
	<script type="text/javascript" src="${ctx}/js/jquery.easyui.min.js"></script>
	<script type="text/javascript" src="${ctx}/js/easyui-lang-zh_CN.js"></script>
	<script type="text/javascript" src="${ctx}/js/CommonCheck.js"></script>
	<script type="text/javascript" src="${ctx}/validate/input.validate.js"></script>		
	<script type="text/javascript">	
		var rootPath="${ctx}";
		var projectcode="${projectcode}";
		$(function(){
		});
	</script>
  </head>
  
  <body onkeydown="PreventBSK();">
   <input type="hidden" id="projectcode" name="projectcode" value="${projectcode}">
   <input type="hidden" id="userPwd" name="userPwd" value="${userPwd}" />
   <form id="opinionform" method="post" enctype="multipart/form-data">
   <input type="hidden" id="attachmenttypeid" name="attachmenttypeid" value="1" />
    <table width="100%" border="1" align="center" class="grid">
			<tr>
				<td align="left" class="Main_Tab_Style_title" style="width: 30%;">
					提交意见：
				</td>
				<td align="left" class="Main_Tab_Style_Content">
					 <textarea class="TextBox grkj-validate" validateParam="{type:'string',required:'true',message:'请填写审核意见！'}" style="width:100%;height:60px;" name="opinion" id="opinion"></textarea>
				</td>
			</tr>
			<tr>
				<td align="left" class="Main_Tab_Style_title">
					附件：
				</td>
				<td colspan="3" align="left" class="Main_Tab_Style_Content">
					<s:file name="file" size="40" label="上传" theme="simple" cssClass="TextBox" id="filec"></s:file>
				</td>
			</tr>
			<tr>
				<td align="left" class="Main_Tab_Style_title" style="width: 30%;">
					密码：
				</td>
				<td align="left" class="Main_Tab_Style_Content">
					<input id="loginpwd" name="loginpwd" style="width: 100%" />
				</td>
			</tr>						
		</table>
		</form>
  </body>
</html>
