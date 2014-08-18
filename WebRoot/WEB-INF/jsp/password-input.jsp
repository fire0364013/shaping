<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="/common/taglibs.jsp" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <title>修改密码</title>
	<meta http-equiv="pragma" content="no-cache"></meta>
	<meta http-equiv="cache-control" content="no-cache"></meta>
	<meta http-equiv="expires" content="0"></meta>
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3"></meta>
	<meta http-equiv="description" content="This is my page"></meta>
	<link rel="stylesheet" href="${ctx }/themes/default/easyui.css" type="text/css" />
	<link rel="stylesheet" type="text/css" href="${ctx }/themes/icon.css"></link>
  </head>
  <body>
 		<!--<s:form action="login!savePassword.action" id="passwordForm" method="post" theme="simple">-->
			<div>
				<table width="100%" border="0" cellpadding="0" cellspacing="0" class="grid">
					<tr>
						<td style="width: 60px; height: 20px;" class="Main_Tab_Style_title">原密码：</td>
						<td style="width: 170px" class="Main_Tab_Style_Content">
						<s:password  id="password1" name="password1" cssClass="TextBox" style="width: 170px; height: 20px;"/></td>
					</tr>
					<tr>
						<td style="width:  60px; height: 20px;" class="Main_Tab_Style_title">新密码：</td>
						<td style="width: 170px" class="Main_Tab_Style_Content">
						<s:password  id="password" name="password" cssClass="TextBox" style="width: 170px; height: 20px;"/></td>
					</tr>
					<tr>
						<td style="width:  60px; height: 20px;" class="Main_Tab_Style_title">确认密码：</td>
						<td style="width: 170px" class="Main_Tab_Style_Content">
						<s:password  id="password2" name="password2" cssClass="TextBox" style="width: 170px; height: 20px;"/></td>
					</tr>
				</table>
			</div>
			<!-- div>
				<s:submit value="保存" cssClass="Button_out"/>
				<input type="button" class="Button_out" value="取消" onclick="javascript:window.top._"/>
			</div-->
		<!--</s:form>-->     
  </body>
</html>
