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
		<link rel="stylesheet" href="<%=path %>/themes/default/easyui.css" type="text/css" />
		<link rel="stylesheet" type="text/css" href="<%=path %>/themes/icon.css">
		<script type="text/javascript" src="<%=path %>/js/jquery-1.7.2.min.js"></script>
		<script type="text/javascript" src="<%=path %>/js/jquery.easyui.min.js"></script>
		<script type="text/javascript" src="<%=path %>/js/easyui-lang-zh_CN.js"></script>
		<script type="text/javascript" src="<%=path %>/js/CommonCheck.js"></script>
		<link rel="stylesheet" href="${ctx}/validate/validate.css" type="text/css" />
		<script type="text/javascript" src="${ctx}/validate/input.validate.js"></script>
		<script language="JavaScript" type="text/javascript">
			$(document).ready(function(){
				initGrkjValidate();
				var path=$("#photo").val();
				if(path!=""){
					$("#imgh").attr("src","<%=basePath %>"+path);
				}
					//电子签章
				var lenPic=$("#lenPic").val();
				if(lenPic==1){
					$("#signpicture").attr("src","");
					$("#signpicture").attr("src","${ctx}/userinfo/userinfo!getBlobPic.action?id="+${userid}+"&t="+Math.random());
				
				}
			});
			
    </script>
    <script type="text/javascript">	
			var rootPath="${ctx}";
		</script>
		<script type="text/javascript" src="${ctx}/lims/js/user.info.js"></script>
	</head>
	<body onkeydown="PreventBSK();">
		<div id="dlg-buttons">
	

		<!-- 添加，修改 -->
		<s:form id="userinfofromview" action="" method="post" enctype="multipart/form-data">
		<s:hidden name="userid" />
		<input type="hidden" value="${lenPic }" id="lenPic"/>
			<table width="" border="1" align="center" class="grid">
				<tr>
					<td align="left" class="Main_Tab_Style_title"
						style="width: 100px; height: 20px;" >
						用户登录名：
					</td> 
					<td  align="left" class="Main_Tab_Style_Content" width="150px">
					<s:textfield id="loginname" name="loginname" cssClass="TextBox" cssStyle="width: 150px;height:20px" theme="simple" disabled="true"
					onblur="validate();"></s:textfield>
					</td>
					<!-- 
					<td rowspan="6" width="160px" colspan="2">
						<img alt="" src="${ctx}/themes/default/images/nophoto.jpg" id="imgh" style="width: 160px;height:160px ;margin: 0px">
						<s:hidden name="photo"  theme="simple" cssClass="TextBox" id="photo"></s:hidden>
					</td>
					 -->
					
			   </tr>
			   <tr>
					<td  align="left" class="Main_Tab_Style_title">用户密码：</td>
					<td  align="left" class="Main_Tab_Style_Content" width="150px">
						<input disabled="disabled" type="password"  name="password" class="TextBox grkj-validate" style="width: 150px;height:20px" value="${password }"
						validateParam="{type:'string',required:'true',message:'请输入密码！'}"/>
						</td>
			  </tr>
			  <!-- 
			  <tr>
			 		<td align="left" class="Main_Tab_Style_title"
						style="width: 100px; height: 20px;">
						部门：
					</td>
					<td align="left" class="Main_Tab_Style_Content" width="150px">
					<s:select list="listDepar" listKey="%{deptid}" listValue="%{deptname}"  headerValue="---请选择---" headerKey="0"
						 cssClass="TextBox"   name="departmentinfo.deptid"  theme="simple" cssStyle="width: 150px;height:20px" disabled="true">
					</s:select>
					</td>
					
				</tr>
				 -->
				<tr>
				 	<td align="left" class="Main_Tab_Style_title"
						style="width: 100px; height: 20px;">
						姓名：
					</td>
					<td align="left" class="Main_Tab_Style_Content" width="150px"> 
					<s:textfield  name="realname" cssClass="TextBox" cssStyle="width: 150px;height:20px" theme="simple" disabled="true"></s:textfield>
						
					</td>
				 </tr>
				
				<tr>
					<td align="left" class="Main_Tab_Style_title"
						style="width: 100px; height: 20px;">
						性别：
					</td>
					<td align="left" class="Main_Tab_Style_Content" width="150px">
					<s:select list="#{'男':'男','女':'女'}" listKey="key" listValue="value" name="sex"
						 cssClass="TextBox"  theme="simple" cssStyle="width: 150px;height:20px" disabled="true">
					</s:select>
					
					</td>
					
				</tr>
				<tr>
				 	<td align="left" class="Main_Tab_Style_title"
						style="width: 100px; height: 20px;">
						EMAIL：
					</td>
					<td align="left" class="Main_Tab_Style_Content" width="150px">
					<s:textfield  name="email" cssClass="TextBox" cssStyle="width: 150px;height:20px" theme="simple" disabled="true"></s:textfield>
						
					</td>
			  </tr>
				
				<tr>
					<td align="left" class="Main_Tab_Style_title"
						style="width: 100px; height: 20px;">
						电话：
					</td>
					<td align="left" class="Main_Tab_Style_Content"
						style="width: 150px; height: 20px;" width="150px">
						<s:textfield  name="linkphone" cssClass="TextBox" cssStyle="width: 150px;height:20px" theme="simple" disabled="true" ></s:textfield>
						
					</td>
					
				
				 	<td align="left" class="Main_Tab_Style_title"
						style="width: 75px; height: 20px;">
						传真：
					</td>
					<td align="left" class="Main_Tab_Style_Content" width="70px">
					<s:textfield  name="fax" cssClass="TextBox" cssStyle="width: 75px;height:20px" theme="simple" disabled="true"></s:textfield>
						
					</td>
			 </tr>
				
				<tr>
					<td align="left" class="Main_Tab_Style_title"
						style="width: 100px; height: 20px;" >
						手机：
					</td>
					<td align="left" class="Main_Tab_Style_Content"
						style="width: 150px; height: 20px;" width="150px">
						<s:textfield  name="mobilephone" cssClass="TextBox" cssStyle="width: 150px;height:20px" theme="simple" disabled="true"></s:textfield>
					
					</td>
					 
				
				 	<td align="left" class="Main_Tab_Style_title"
						style="width: 75px; height: 20px;">序号
					</td>
					<td align="left" class="Main_Tab_Style_Content" width="70px"> 
						<s:textfield  name="orderid" cssClass="TextBox" cssStyle="width: 75px;height:20px" theme="simple" disabled="true"></s:textfield>
					</td>
						<s:hidden name="userstatus" cssClass="TextBox" cssStyle="width: 75px;height:20px" theme="simple" disabled="true"></s:hidden>
				 </tr>
				 <!-- 
						<tr>
					<td align="left" class="Main_Tab_Style_title"
						style="width: 75px; height: 20px;">分管部门</td>
						<td  colspan="3" align="left" class="Main_Tab_Style_Content">
							<textarea  disabled="disabled" name="depname" id="depname"  class="TextBox grkj-validate" onclick="selectdepar()" 
                              validateParam="{type:'string',required:'false',message:'请选择分管部门！'}"	style="width:99.5%;height:60px;" >${depatnames }</textarea>
						</td>	
				</tr>
				 -->
						<tr>
					<td align="left" class="Main_Tab_Style_title"
						style="width: 75px; height: 20px;">所属单位</td>
						<td  colspan="3" align="left" class="Main_Tab_Style_Content">
							<textarea  disabled="disabled" name="entname" id="entname"  class="TextBox grkj-validate" style="width:99.5%;height:60px;" >${entname }</textarea>
						</td>	
				</tr>				 
				<tr>
				</tr>
				<!-- 
					<tr>
				<td align="left" class="Main_Tab_Style_title"
						style="width: 100px; height: 20px;">
					</td>
						<td width="32%" bgcolor="#FFFFFF" colspan="4">
						 <img alt="" src="${ctx}/themes/default/images/nophoto.jpg" id="signpicture" style="width: 80px;height:35px ;margin: 0px">
					</td>
					</tr>
				 -->
			</table>
			</s:form>
		</div>
		
	</body>
</html>
