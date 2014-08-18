<%@ page language="java" import="java.util.*" autoFlush="false"  pageEncoding="utf-8"%>
<%@ include file="/common/taglibs.jsp"%>
<%
	request.setAttribute("decorator","none");
	response.setHeader("Cache-Control","no-cache");
	response.setHeader("Pragma","no-cache");
	response.setDateHeader("Expires",0);
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<title>授权管理</title>
		<link rel="stylesheet" href="${ctx}/themes/default/easyui.css"	type="text/css" />
		<link rel="stylesheet" type="text/css" href="${ctx}/themes/icon.css">
		<script type="text/javascript" src="${ctx}/js/jquery-1.7.2.min.js"></script>
		<script type="text/javascript" src="${ctx}/js/jquery.easyui.min.js"></script>
		<script language='javascript' type="text/javascript" src="${ctx}/lims/js/user.role.js"></script>
  <style >
	.sel{		
  		width:155px;
  		height:310px;
  		color:#2c0990;
  		}

 	.btn{
  		width:50px;
 		 font-weight:bold;
 		 font-size:14px;
  	 	}
  </style>
	</head>
	<body>
		<table  width="360" border="0" align="center" class="Main_Tab_Style_title"  border="0">
			<tr>
			<td align="left" style="width: 160px; height: 20px;">
			未选角色：
			</td>
			<td align="left" style="width: 50px; height: 20px;">
			</td>	
			<td align="left"	style="width: 160px; height: 20px;">
			已选角色：
			</td>									
			</tr>
			<tr>
				<td><select multiple  class="sel" id="sel_left" ></select></td>
				<td ><p><button   class="Button_out" id="btn_1">	&gt;&gt;	</button></p>
					<p><button  class="Button_out" id="btn_2">	&gt;</button></p>
					<p><button   class="Button_out" id="btn_3">	&lt;	</button></p>
					<p><button   class="Button_out" id="btn_4">	&lt;&lt;	</button>	</p>
				</td>
				<td>	<select multiple class="sel" id="sel_right"></select></td>
			</tr>
		</table>
	</body>
	<script language="javascript" >
	bindData(${id});
	//setTimeout(bindData(${id}), 1000);
	</script>
</html>
