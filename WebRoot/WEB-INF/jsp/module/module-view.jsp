<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ include file="/common/taglibs.jsp" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>   
    <title>模块详情</title>
		<link rel="stylesheet" href="${ctx}/themes/default/easyui.css" type="text/css" />
		<link rel="stylesheet" type="text/css" href="${ctx}/themes/icon.css">
		<script type="text/javascript" src="${ctx}/js/jquery-1.7.2.min.js"></script>
		<script type="text/javascript" src="${ctx}/js/jquery.easyui.min.js"></script>
		<script type="text/javascript">
		 	$(document).ready(function(){
		 		//判断模块类型
		 		if($('#moduletype').val()==1){
		 			$('#moduletype').val("系统模块");
		 		}else{
		 			$('#moduletype').val("用户模块");
		 		}
			});
		</script>
  </head>
  <body>
 		<s:form action="" id="modulForm" method="post" theme="simple">
			<div>
				<table width="100%" border="1" align="center" class="grid">
					<tr>
						<td align="left" class="Main_Tab_Style_title" style="width: 100px; height: 20px;">
							模块编号：
						</td>
						<td align="left" class="Main_Tab_Style_Content">
							<s:textfield name="moduleid" cssClass="TextBox" style="width:250px;" disabled="true"/>
						</td>
					</tr>
					<tr>
						<td align="left" class="Main_Tab_Style_title">
							模块名称：
						</td>
						<td align="left" class="Main_Tab_Style_Content">
							<s:textfield name="modulename" cssClass="TextBox" style="width:250px;" disabled="true"/>
						</td>
					</tr>
					<tr>
						<td align="left" class="Main_Tab_Style_title">
							父模块编号：
						</td>
						<td align="left" class="Main_Tab_Style_Content">
							<s:textfield name="parentmoduleid" cssClass="TextBox" style="width:250px;" disabled="true"/>
						</td>
					</tr>
					<tr>
						<td align="left" class="Main_Tab_Style_title">
							模块类型：
						</td>
						<td align="left" class="Main_Tab_Style_Content">
							<s:textfield name="moduletype" id="moduletype" cssClass="TextBox" style="width:250px;" disabled="true"/>
						</td>
					</tr>
					<tr>
						<td align="left" class="Main_Tab_Style_title">
							模块URL：
						</td>
						<td align="left" class="Main_Tab_Style_Content">
							<s:textfield name="url" cssClass="TextBox" style="width:250px;" disabled="true"/>
						</td>
					</tr>
				</table>
			</div>
		</s:form>     
  </body>
</html>
