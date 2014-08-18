<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ include file="/common/taglibs.jsp" %>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
		<title>用户组列表</title>
		<link rel="stylesheet" href="${ctx}/themes/default/easyui.css" type="text/css" />
		<link rel="stylesheet" type="text/css" href="${ctx}/themes/icon.css">
		<script type="text/javascript" src="${ctx}/js/jquery-1.7.2.min.js"></script>
		<script type="text/javascript" src="${ctx}/js/jquery.easyui.min.js"></script>
		<script type="text/javascript" src="${ctx}/js/CommonCheck.js"></script>
		<link rel="stylesheet" href="${ctx}/validate/validate.css" type="text/css" />
		<script type="text/javascript" src="${ctx}/validate/input.validate.js"></script>
		<script language="JavaScript" type="text/javascript">
		var rootPath="${ctx}";
		$(function(){
			messagegroup();
		});
		function getgroupids(){
			$("#groupids").val('');
			var groups = $("#grouptree").tree("getChecked");
			var groupids = '';
			for(var i = 0 ; i < groups.length ; i ++){
				if(groupids != ""){
					groupids += ","+groups[i].id;
				}else{
					groupids += groups[i].id;
				}
				
			}
			$("#groupids").val(groupids);
		}
    	</script>
    	 <script type="text/javascript" src="${ctx}/lims/js/message/messagegroup-list.js"></script>
	</head>


	<body class="easyui-layout" width="100%" height="100%">
		<!-- 任务流右键 -->
		<div region="center" border="ture"  title="" split="true" id="groups">
			<div class="panelheader" style="margin:0px 0 0 0">分组信息</div>
			<div  style="width: 100%;height: 282px;" >
			<input id="groupids" type="hidden" onclick="getgroupids();">
			<ul id="grouptree"></ul>
			</div>
			<div class="panelheader" style="margin:0px 0 0 0">人员信息</div>
			<div style="width: 100%; height: 300px;">  
				<div>
					<table class="Main_Tab_Style" style="width: 100%; height: 22px;display: none" id="usertable">
						<tr>
							<td class="Main_Tab_Style_title"
								style="width: 80px; text-align: left">
								  姓名：                                                                                              
							</td>
							<td class="Main_Tab_Style_Content" style="width: 150px; text-align: left" >
							<%--<s:textfield name="loginname" cssClass="TextBox" cssStyle="width: 100%; height: 20px;"/>--%>
								<input  id="realname" Class="TextBox" name="realname" style="width: 150px"/>	
							</td>
							
							<td class="Main_Tab_Style_Content"
								style="width:750px; text-align: left">
								<input type="button" class="Button_out" value="查询"  onclick="query()" align="middle"/>
								<input type="button" value="删除" class="Button_out" onClick="delAll('')" />
							</td>
						</tr>
					</table>
				</div>
				<div  style="width: 100%;height: 282px;" >
					<table id="datagrid1" ></table>
				</div>
			</div>
		</div>

		<div id="grouptree-menu" class="easyui-menu" style="width:120px;">		
			<div id="addgroup" onClick="addGroup('')">添加分组</div>
			<div id="updategroup" onClick="addGroup('edit')">修改分组</div>
			<div id="deletegroup" onClick="delGroup()">删除分组</div>
			<div id="addusergroup" onClick="addUserGroup()">添加人员</div>
		</div>	
		
	</body>
</html>