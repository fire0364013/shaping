<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ include file="/common/taglibs.jsp" %>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<title>用户管理</title>
		<link rel="stylesheet" href="${ctx}/themes/default/easyui.css" type="text/css" />
		<link rel="stylesheet" type="text/css" href="${ctx}/themes/icon.css">
		<script type="text/javascript" src="${ctx}/js/jquery-1.7.2.min.js"></script>
		<script type="text/javascript" src="${ctx}/js/jquery.easyui.min.js"></script>
		<script type="text/javascript" src="${ctx}/js/easyui-lang-zh_CN.js"></script>
		<script type="text/javascript" src="${ctx}/js/CommonCheck.js"></script>
		<link rel="stylesheet" href="${ctx}/validate/validate.css" type="text/css" />
		<script type="text/javascript" src="${ctx}/validate/input.validate.js"></script>
		<script type="text/javascript">	
			var rootPath="${ctx}";
		</script>
				
		<script type="text/javascript" src="${ctx}/lims/js/user.info.js"></script><!-- 本datagridd脚本 -->
	<script type="text/javascript" src="${ctx}/lims/js/user.role.js"></script><!-- 授权的脚本 -->
	</head>
	<body>
		<div  style="height: 30px; margin: 0 0px 0px 0;size: 12px" >
			<div>
				<table class="Main_Tab_Style" style="width: 100%; height: 22px">
					<tr>
						<td class="Main_Tab_Style_title"
							style="width: 10%; text-align: left">
							  姓名：                                                                                              
						</td>
						<td class="Main_Tab_Style_Content" style="width: 10%; text-align: left" >
						<%--<s:textfield name="loginname" cssClass="TextBox" cssStyle="width: 100%; height: 20px;"/>--%>
							<input  id="realname" Class="TextBox" name="realname" />	
						</td>
						<td class="Main_Tab_Style_title"
							style="width: 80px; text-align: left">
							用户状态：
						</td>
						<td class="Main_Tab_Style_Content" style="width: 150px;">
						<s:select list="#{1:'正常',0:'停用'}" listKey="key" listValue="value"  id="userstatus" headerKey="" headerValue="---请选择---"
						   name="userstatus"  theme="simple" cssStyle="width: 130px; height: 20px;" >
						</s:select>
					
						</td>
						<td align="left" class="Main_Tab_Style_title" style="width: 70px; height: 20px;">
							  所属单位：                                                                                              
						</td>
						<td align="left" width="100px">
							<input  id="entname" Class="TextBox" name="entname" />	
						</td>						
						<!-- 
						<td align="left" class="Main_Tab_Style_title" style="width: 70px; height: 20px;">
							部门：
						</td>
						<td align="left" width="20px">
						<select class="TextBox " id="depatnames" name="depatnames"  style="width: 130px;height:20px">
								<option value="">---请选择---</option>	
								<c:forEach var="departmentList1" items="${listDepar }">
								<option value="${departmentList1.deptid}" >${departmentList1.deptname}</option>
								</c:forEach>
							</select>
						</td>-->
 						<td class="Main_Tab_Style_Content" style="width: 100px text-align: left;">
							<input type="button" class="Button_out" value="查询"  onclick="query()" align="middle"/>
						</td>
						 
					</tr>
				</table>
			</div>
		</div>
		<table width="100%" class="grid">
				<tr height="25" class="grid-header">
					<td colspan="6" style="text-align: left">
						<input type="button" value="添加" class="Button_out"
							onClick="addWin('')" />
						<!-- 
						<input type="button" value="删除" class="Button_out"
							onClick="delAll('')" /> -->	
					</td>
				</tr>
		</table>
		<div  style="width: 100%;height: 655px;" >
			<table id="datagrid1"></table>
		</div>
	
		
	</body>
</html>
