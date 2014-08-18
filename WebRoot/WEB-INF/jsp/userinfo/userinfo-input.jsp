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
		<!-- 剪切图片所用用的脚本-->
		<link rel="stylesheet" type="text/css" href="${ctx}/themes/jquery.imagecropper.css" />
  		<script type="text/javascript" src="${ctx}/js/ui.core.js"></script>
  		<script type="text/javascript" src="${ctx}/js/ui.draggable.js"></script>
  	 	<script type="text/javascript" src="${ctx}/js/jquery.imagecropper.js"></script>
		<script language="JavaScript" type="text/javascript">
			var rootPath="${ctx}";
			$(document).ready(function(){
			})
    </script>
	<script type="text/javascript" src="${ctx}/lims/js/user.info.js"></script>
	</head>
	<body onkeydown="PreventBSK();">
		<div id="dlg-buttons">
	
		<!-- 添加，修改  onblur="validate()"  -->
		<form id="userinfofrom" method="post" enctype="multipart/form-data">
		<input type="hidden" value="${userid}" name="id"/>
		<!-- 
		<input type="hidden"  id="encodeDateJPGPic" name="encodeDateJPGPic"/>
		<input type="hidden"  id="encodeDateJPG" name="encodeDateJPG"/>
		<input type="hidden" value="${lenPic }" id="lenPic"/>
		<input type="hidden" value="0" id="flagPic"/><!-- 照片   此处是用来对照片是否进行了截图
		<input type="hidden" value="0" id="flagSin"/><!--电子签章  此处是用来对签章是否进行了截图 
		 <input type="button" class="Button_out" value="closeDlg" id="closeDlg"  onclick="closeWin()" style="display: none"/><!-- 此处用来关闭截图的dlg 
		<input type="button" value="test" id="reshPicid" onclick="reshPic()" style="display: none"/>
		<input type="button"  id="reshSinid" onclick="reshSin()" style="display: none"/>
		 -->
			<table width="" border="1" align="center" class="grid">
				<tr>
					<td align="left" class="Main_Tab_Style_title"
						style="width: 100px; height: 20px;" >
						用户登录名：
					</td> 
					<td  align="left" class="Main_Tab_Style_Content" width="170px">
					<input id="loginname" name="loginname" class="TextBox grkj-validate" style="width: 150px;height:20px"
					validateParam="{type:'string',required:'true',maxLength:'20'}" value="${loginname}"
					 ><font color="red" size="4px"> *</font>
					</td>
					<!-- 
					<td id="imghPicTd"   rowspan="6" width="150px" colspan="2">
 					 	<img id="imgh"  style="width: 160px;height:160px ;margin: 0px" src=""> 
 					 	<input name="photo"   class="TextBox" id="photo" type="hidden" value="${photo}"/>
					</td>
					 -->
					
			   </tr>
			   <tr>
					<td  align="left" class="Main_Tab_Style_title">用户密码：</td>
					<td  align="left" class="Main_Tab_Style_Content" width="170px" >
						<input type="password"  name="password" class="TextBox grkj-validate" style="width: 150px;height:20px" value="${password }"
						validateParam="{type:'string',required:'true',message:'请输入密码！'}"/> <font color="red" size="4px">*</font>
					</td>
			  </tr>
			  <!-- 
			  <tr>
			 		<td align="left" class="Main_Tab_Style_title"
						style="width: 100px; height: 20px;">
						部门：
					</td>
					<td align="left" class="Main_Tab_Style_Content" width="170px">
					<select  name="deptid" style="width: 150px">
						<option value="" >---请选择---</option>
							<c:forEach items="${listDepar}" var="itemtype">
								<option value="${itemtype.deptid }"  
									<c:if test="${itemtype.deptid==departmentinfo.deptid}">selected="selected"</c:if>>${itemtype.deptname }
								</option> 
							</c:forEach>
						</select> <font color="red" size="4px">*</font>
					</td>
					
				</tr>
				 -->
				<tr>
				 	<td align="left" class="Main_Tab_Style_title"
						style="width: 100px; height: 20px;">
						姓名：
					</td>
					<td align="left" class="Main_Tab_Style_Content" width="170px"> 
					<input  name="realname" class="TextBox grkj-validate" style="width: 150px;height:20px" value="${realname}"
					validateParam="{type:'string',required:'true',maxLength:'40',message:'请输入姓名，长度不能超过40个字符！'}">
						 <font color="red" size="4px">*</font>
					</td>
				 </tr>
				<tr>
					<td align="left" class="Main_Tab_Style_title"
						style="width: 100px; height: 20px;">
						性别：
					</td>
					<td align="left" class="Main_Tab_Style_Content" width="150px">
						<select name="sex" style="width: 150px">
							<option value="男" <c:if test="${sex=='男'}">selected="selected"</c:if>>男</option>
							<option value="女" <c:if test="${sex=='女'}">selected="selected"</c:if>>女</option>
						</select>
					</td>
				</tr>
				<tr>
				 	<td align="left" class="Main_Tab_Style_title"
						style="width: 100px; height: 20px;">
						EMAIL：
					</td>
					<td align="left" class="Main_Tab_Style_Content" width="150px">
					<input  name="email" class="TextBox " style="width: 150px;height:20px"  value="${email}"
					validateParam="{type:'email',message:'请正确输入email!',required:'false'}" >
						
					</td>
			  </tr>
				<tr>
					<td align="left" class="Main_Tab_Style_title"
						style="width: 100px; height: 20px;">
						电话：
					</td>
					<td align="left" class="Main_Tab_Style_Content"
						style="width: 150px; height: 20px;" width="150px">
						<input  name="linkphone" class="TextBox"style="width: 150px;height:20px"  value="${linkphone}">
						
					</td>
				</tr>
				<tr>
				 	<td align="left" class="Main_Tab_Style_title"
						style="width: 75px; height: 20px;">
						传真：
					</td>
					<td align="left" class="Main_Tab_Style_Content" width="70px">
					<input  name="fax" class="TextBox" style="width: 75px;height:20px" value="${fax}">
					</td>
			 </tr>
				<tr>
					<td align="left" class="Main_Tab_Style_title"
						style="width: 100px; height: 20px;" >
						手机：
					</td>
					<td align="left" class="Main_Tab_Style_Content"
						style="width: 150px; height: 20px;" width="150px">
						<input  name="mobilephone" class="TextBox" style="width: 150px;height:20px" value="${mobilephone}">
					</td>
				</tr>
				<tr>	
				 	<td align="left" class="Main_Tab_Style_title"
						style="width: 75px; height: 20px;">序号
					</td>
					<td align="left" class="Main_Tab_Style_Content" width="70px"> 
						<input  name="orderid" class="TextBox " style="width: 75px;height:20px" 
						validateParam="{type:'int',message:'只能输入正整数',required:'false'}" value="${orderid}">
						<input name="userstatus" class="TextBox" style="width: 75px;height:20px" type="hidden" value="${userstatus}">
					</td>
						
				 </tr>
				<tr>
						<td align="left" class="Main_Tab_Style_title" style="width: 120px ;height: 20px;">
							所属单位：
						</td>
						<td align="left" class="Main_Tab_Style_Content" >
							<input type="hidden"  id="entid" name="entid.entid" value = "${entid.entid }"/>
							<input type="text"  id="entname" class="TextBoxPic  grkj-validate" 														 
							style="width: 250px; height: 20px;" value="${entid.entname }"
							validateParam="{type:'string',required:'true',maxLength:'48',message:'所属单位不能为空！'}"/>
							<input type="button" value="选择" onclick="selectEntinfo()" style="width: 40px; height: 20px;">
							<font color="red" size="4px"> *</font>
						</td>
				</tr>	
				<!-- 	 
				 <tr>
					<td align="left" class="Main_Tab_Style_title"
						style="width: 100px; height: 20px;" >
						是否项目负责人：
					</td>
					<td align="left" class="Main_Tab_Style_Content"
						style="width: 150px; height: 20px;" width="150px">
						<select name="projectleader" style="width: 150px">
							<option value="0" <c:if test="${projectleader=='0'}">selected="selected"</c:if>>否</option>
							<option value="1" <c:if test="${projectleader=='1'}">selected="selected"</c:if>>是</option>
						</select>
					</td>
				 	<td align="left" class="Main_Tab_Style_title"
						style="width: 75px; height: 20px;">
							简称：
					</td>
					<td align="left" class="Main_Tab_Style_Content" width="70px"> 
					<input type="text" name="nickName" class="TextBox " 
					value="${nickName}" style="width: 150px; height: 20px;" />
					
					</td>
						
				 </tr>
				<tr>
					<td align="left" class="Main_Tab_Style_title"
						style="width: 75px; height: 20px;">分管部门</td>
						<td colspan="3" align="left" class="Main_Tab_Style_Content">
								<textarea   name="depname" id="depname"  class="TextBoxPic grkj-validate" onclick="selectdepar()" 
                              validateParam="{type:'string',required:'false',message:'请选择分管部门！'}"	style="width:99.5%;height:60px;" >${depatnames }</textarea>
                              <input name="depid" id="depid" class="TextBox" onclick="selectdepar()" type="hidden" value="${depid}"
								style="width: 340px; height: 20px;" />
						</td>	
				</tr>
					
				<tr>
					<td align="left" class="Main_Tab_Style_title"
						style="width: 100px; height: 20px;">
						照片：
					</td>
					<td colspan="2" align="left" class="Main_Tab_Style_Content">
						<s:file name="file" size="35" label="上传"  cssClass="TextBox" id="filec" theme="simple"></s:file>
						
					</td>
					<td><input type="button" class="Button_out" value="截图" onclick="uploadPic('')" /></td>
				</tr>
				<tr>
					<td align="left" class="Main_Tab_Style_title" 
						style="width: 100px; height: 20px;">
						电子签章：
					</td>
					<td colspan="2" align="left" class="Main_Tab_Style_Content">
						<s:file name="filevisa" size="35" label="上传"  cssClass="TextBox" id="filecSin" theme="simple"></s:file>
					</td>
					<td><input type="button" class="Button_out" value="截图" onclick="uploadSinPic()" /></td>
				</tr>
					<tr>
				<td align="left" class="Main_Tab_Style_title"
						style="width: 100px; height: 20px;">
					</td>
						<td width="32%" bgcolor="#FFFFFF" colspan="4">
						 <img alt="" src="${ctx}/themes/default/images/nophoto.jpg" id="signpicture" style="width: 80px;height:35px ;margin: 0px">
					</td>
					</tr>
								<tr>
					<td align="left" class="Main_Tab_Style_title"
						style="width: 100px; height: 20px;">
					</td>
					<td colspan="3" align="left" class="Main_Tab_Style_Content">
					<font color="red" size="3px">仅支持 jpg,jpeg,gif,png格式的图片</font>
					</td>
				</tr>
				 -->		
			</table>
			</form>
		</div>
		
	</body>
</html>
