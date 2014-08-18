<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="/common/taglibs.jsp" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    
    <title>审核意见</title>
	<link rel="stylesheet" href="${ctx}/themes/default/easyui.css" type="text/css" />
	<link rel="stylesheet" type="text/css" href="${ctx}/themes/icon.css">

	<script type="text/javascript" src="${ctx}/js/jquery-1.7.2.min.js"></script>
	<script type="text/javascript" src="${ctx}/js/jquery.easyui.min.js"></script>
	<script type="text/javascript" src="${ctx}/js/easyui-lang-zh_CN.js"></script>
	<script type="text/javascript" src="${ctx}/js/CommonCheck.js"></script>
	<script type="text/javascript" src="${ctx}/validate/input.validate.js"></script>		
	<script type="text/javascript">	
		var rootPath="${ctx}";
		$(function(){
				$('#opinion').focus();
			})
	</script>

  </head>
  
  <body  onkeydown="PreventBSK();">
    <table width="100%" border="1" align="center" class="grid">
			<tr>
				<td align="left" class="Main_Tab_Style_title" style="width: 30%;">
					审核意见：
				</td>
				<td align="left" class="Main_Tab_Style_Content">
					<input type="hidden" id="projectcode" name="projectcode" value="${projectcode}">
					 <textarea class="TextBox grkj-validate" validateParam="{type:'string',required:'true',message:'请填写评审意见！'}" style="width:100%;height:100px;" name="opinion" id="opinion">同意</textarea>
					 
				</td>
			</tr>
		</table>
  </body>
</html>
