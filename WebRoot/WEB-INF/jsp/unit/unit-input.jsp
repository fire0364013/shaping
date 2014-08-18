<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ include file="/common/taglibs.jsp" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <title>计量单位编辑</title>
    
		<link rel="stylesheet" href="${ctx}/themes/default/easyui.css" type="text/css" />
		<link rel="stylesheet" type="text/css" href="${ctx}/themes/icon.css">
		<link rel="stylesheet" type="text/css" href="${ctx}/validate/validate.css">
		<script type="text/javascript" src="${ctx}/js/jquery-1.7.2.min.js"></script>
		<script type="text/javascript" src="${ctx}/js/jquery.easyui.min.js"></script>
		<script type="text/javascript" src="${ctx}/js/easyui-lang-zh_CN.js"></script>
		<script type="text/javascript" src="${ctx}/validate/input.validate.js"></script>

  </head>
  <body>
 		<s:form action="" id="unitForm" method="post" theme="simple">
			<s:hidden name="unitid" />
			<div>
				<table width="100%" border="1" align="center" class="grid">
					<tr>
					<td align="left" class="Main_Tab_Style_title" style="width: 100px; height: 20px;">
						计量单位名称：
					</td>
					<td align="left" class="Main_Tab_Style_Content">
						<s:textfield name="unitname"  cssClass='TextBox grkj-validate' validateParam="{type:'string',maxLength:'50',required:'true',message:'请输入计量单位名称，长度不超过50个字符！'}" style="width: 200px;" />
						<font color="red" size="4px">*</font>
					</td>
					</tr>
					<tr>
					<td align="left" class="Main_Tab_Style_title">
						计量单位描述：
					</td>
					<td align="left" class="Main_Tab_Style_Content">
						<s:textarea name="description"  cssClass='TextBox grkj-validate' validateParam="{maxLength:'500',required:'false',message:'长度不超过500个字符！'}" style="width: 200px; height:100px;"></s:textarea>
					</td>
					</tr>
				</table>
			</div>		
		</s:form>    
  </body>
</html>
