<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ include file="/common/taglibs.jsp" %>
<html>
<head>
<title>环境监测业务管理系统</title>
<link href="${ctx}/css/menu.css" rel="stylesheet" type="text/css" media="all"></link>
<link href="${ctx}/css/adbp.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" href="${ctx }/themes/default/easyui.css" type="text/css" />
<link rel="stylesheet" href="${ctx }/themes/icon.css" type="text/css" />
<link rel="stylesheet" href="${ctx}/js/DatePicker/skin/WdatePicker.css" type="text/css" />    
<link rel="stylesheet" href="${ctx}/validate/validate.css" type="text/css" />
<script type="text/javascript" src="${ctx }/js/jquery-1.7.2.min.js"></script>
<script type="text/javascript" src="${ctx }/js/jquery.easyui.min.js"></script>
<script type="text/javascript" src="${ctx }/js/jquery.json-2.3.js"></script>
<script type="text/javascript" src="${ctx }/js/jquery.json-2.3.min.js"></script>
<script type="text/javascript" src="${ctx }/js/CommonCheck.js"></script>
<script type="text/javascript" src="${ctx}/js/DatePicker/WdatePicker.js"></script>
<script type="text/javascript" src="${ctx}/validate/input.validate.js"></script>
<script type="text/javascript" src="${ctx}/js/adbp/menu/menu.js"></script>
<script type="text/javascript" src="${ctx}/js/adbp/adbp.js"></script>
<script type="text/javascript">
	var rootPath = '${ctx}';
	var limitTabs = 10;//限制选项卡数
	$(document).ready(function(){
		initMenu();
		adbpAppInit();
		//initAppsList();
		addIndexTab();
		initTagsAction();
	});
</script>
</head>
<body>
<table width="100%" height="100%" border="0" cellpadding="0" cellspacing="0">
	<tr valign="top">
		<td class="header" id="header">
			<div id="top_banner">
				<table border="0" width="100%" cellpadding="0" cellspacing="0">
					<tr>
						<td><div id="logo"><img src="images/adbp/logo.png"/></div></td>
						<td valign="middle" align="right" style="text-align: right;">
							<div id="top-info">
								<span>
									<img src="${ctx }/images/adbp/ico_admin.png" class="icon" align="bottom"/>
									<label class="welcome-info">
										欢迎&nbsp;&nbsp;${sessionUser.realname}
									</label>
								</span>
							</div>
							<div id="oprate_btn">
								<!--<div id="appsListContainer" tabindex="0">
									<span id="appsList"></span>
								</div>
								--><a href="#" class="btn" onclick="showIndexTab()" title="首页"><img src="${ctx }/images/adbp/ico_home.png"/></a>
								<a href="#" class="btn" onclick="chPwd()" title="修改密码"><img src="${ctx }/images/adbp/ico_password.png"/></a>
								<a href="#" class="btn" onclick="logoutConfirm();" title="注销"><img src="${ctx }/images/adbp/ico_exit.png" alt="注销"/></a>
							</div>
						</td>
					</tr>
				</table>
			</div>
			<div id="menu">
			</div>
			<div id="current_location">
				<img src="images/empty.gif"/><label id="current_location_label">首页</label>
			</div>
			<div id="topTags">
				<span id="topTagBackWard">
					<img src="images/adbp/tabs_leftarrow.png" alt="右移" title="右移"/>
				</span>
				<span id="topTagForward">
					<img src="images/adbp/tabs_rightarrow.png" alt="左移" title="左移"/>
				</span>
				<ul></ul>
			</div>
		</td>
	</tr>
	<tr valign="top" style="margin: 0px;padding: 0px;">
		<td id="mainContent" valign="top" align="center" height="100%" width="100%">
		</td>
	</tr>
	<tr height="18px">
		<td id="footer">
			<div class="footer"> &nbsp;&nbsp;</div>
		<td>
	</tr>
</table>
<div id="tabsContextMenu" class="easyui-menu" style="width:90px;display: none;">
		<div onclick="closeOther()">关闭其他</div>
		<div onclick="closeAll()">关闭所有</div>
</div>
<div id="pFormDiv" style="display: none;background-color:#d8f2fd;padding-top: 15px;">
	<form id="pForm" method="post">
		<table class="Main_Tab_Style_noBorder">
			<tr>
				<td class="Main_Tab_Style_title" width="100px">当前密码:</td>
				<td class="Main_Tab_Style_content">
					<input name="password1" type="password" data-options="required:true" class="easyui-validatebox"/>
					<span class="required">*</span>
				</td>
			</tr>
			<tr>
				<td class="Main_Tab_Style_title" width="100px">新密码:</td>
				<td class="Main_Tab_Style_content">
					<input name="password" type="password" data-options="required:true" class="easyui-validatebox"/>
					<span class="required">*</span>
				</td>
			</tr>
			<tr>
				<td class="Main_Tab_Style_title" width="100px">重复新密码:</td>
				<td class="Main_Tab_Style_content">
					<input name="password2" type="password" data-options="required:true" class="easyui-validatebox"/>
					<span class="required">*</span>
				</td>
			</tr>
		</table>
		<div id="msg_content" style="text-align: center;margin-top: 20px;"></div>
	</form>
</div>
</body>
</html>