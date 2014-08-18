<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="/common/taglibs.jsp"%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<title>人员管理</title>

		<link rel="stylesheet" href="${ctx}/themes/default/easyui.css"type="text/css" />
		<link rel="stylesheet" type="text/css" href="${ctx}/themes/icon.css">
		<link rel="stylesheet" type="text/css" href="${ctx}/validate/validate.css">
		<script type="text/javascript" src="${ctx}/js/jquery-1.7.2.min.js"></script>
		<script type="text/javascript" src="${ctx}/js/jquery.easyui.min.js"></script>
		<script type="text/javascript" src="${ctx}/js/easyui-lang-zh_CN.js"></script>
		
		<script type="text/javascript">
			var rootPath = "${ctx}";
		</script> 
  </head>
  
  <body>
  	<div id="dlg-buttons">
		<input type="hidden" name="envparamid" id="envparamid" value="${envparamid }"/>
		<input type="hidden" name="itemid" id="itemid" value="${itemid }"/>
		<input type="hidden" name="methodid" id="methodid" value="${methodid }"/>
	<form id="employeeinfoform" action="" method="post" theme="simple">
   <table  border="1" align="center" class="grid">
				<tr>
					<td align="left" class="Main_Tab_Style_title" style="width: 150px; height: 20px;">
						姓名：
					</td>
						<td align="left" class="Main_Tab_Style_Content">
						<input type="text" name="employeeinfoname" class="TextBox " 
						disabled	value="${employeeinfoname}" style="width: 150px; height: 20px;" />
					</td>
					<td align="left" class="Main_Tab_Style_title" style="width: 150px; height: 20px;">
						民族：
					</td>					
					<td align="left" class="Main_Tab_Style_Content">
						<input type="text" name="nation" id="nation" class="TextBox " disabled validateParam="{type:'string',maxLength:'50',required:'false',message:'长度不超过50个字符！'}"	   
							value="${nation }" style="width: 150px; height: 20px;" />
					</td>	
						</tr>
						
				<tr>
					<td align="left" class="Main_Tab_Style_title" style="width: 150px; height: 20px;">
						联系电话：
					</td>
					<td align="left" class="Main_Tab_Style_Content">
						<input type="text" name="mobilephone" id="mobilephone" class="TextBox grkj-validate"  disabled 
							value="${mobilephone }" style="width: 150px; height: 20px;" />
					</td>				
					<td align="left" class="Main_Tab_Style_title" style="width: 150px; height: 20px;">
						性别：
					</td>
					<td align="left" class="Main_Tab_Style_Content">
					<input type="text" name="sex" id="sex" class="TextBox"
					disabled="disabled"		value="${sex }" style="width: 150px; height: 20px;" />
						
					</td>	
				<tr>
					<td align="left" class="Main_Tab_Style_title" style="width: 150px; height: 20px;">
						籍贯：
					</td>
					<td align="left" class="Main_Tab_Style_Content">
						<input type="text" name="nativeplace" id="nativeplace" class="TextBox"
					disabled="disabled"		value="${nativeplace }" style="width: 150px; height: 20px;" />
					</td>	
				
					<td align="left" class="Main_Tab_Style_title" style="width: 150px; height: 20px;">
						出生日期：
					</td>
					<td align="left" class="Main_Tab_Style_Content">
					<input type="text" name="birthday" id="birthday" class="TextBox"
					disabled="disabled"		value="${birthday }" style="width: 150px; height: 20px;" />
						</td>
						</tr>
					
				<tr>
					<td align="left" class="Main_Tab_Style_title" style="width: 150px; height: 20px;">
						身份证号：
					</td>
					<td align="left" class="Main_Tab_Style_Content">
						<input type="text" name="carId" id="carId" class="TextBox"
					disabled="disabled"		value="${carId }" style="width: 150px; height: 20px;" />
					</td>	
					
				
					<td align="left" class="Main_Tab_Style_title" style="width: 150px; height: 20px;">
						政治面貌：
					</td>
					<td align="left" class="Main_Tab_Style_Content">
						<input type="text" name="political" id="political" class="TextBox"
					disabled="disabled"		value="${political }" style="width: 150px; height: 20px;" />
					</td>
						</tr>
				<tr>
					<td align="left" class="Main_Tab_Style_title" style="width: 150px; height: 20px;">
						毕业院校：
					</td>
					<td align="left" class="Main_Tab_Style_Content">
						<input type="text" name="graduationschool" id="graduationschool" class="TextBox"
					disabled="disabled"		value="${graduationschool }" style="width: 150px; height: 20px;" />
					</td>
				
					<td align="left" class="Main_Tab_Style_title" style="width: 150px; height: 20px;">
						毕业时间：
					</td>
					<td align="left" class="Main_Tab_Style_Content">
						
								<input type="text" name="graduationdate" id="graduationdate" class="TextBox"
					disabled="disabled"		value="${graduationdate }" style="width: 150px; height: 20px;" />
				
						</td>
					</tr>
				<tr>
					<td align="left" class="Main_Tab_Style_title" style="width: 150px; height: 20px;">
						最高学历：
					</td>
					<td align="left" class="Main_Tab_Style_Content">
						<input type="text" name="educationlevel" id="educationlevel" class="TextBox"
						disabled="disabled"	value="${educationlevel }" style="width: 150px; height: 20px;" />
					</td>
				
					<td align="left" class="Main_Tab_Style_title" style="width: 150px; height: 20px;">
						所学专业：
					</td>
					<td align="left" class="Main_Tab_Style_Content">
						<input type="text" name="major" id="major" class="TextBox"
					disabled="disabled"		value="${major }" style="width: 150px; height: 20px;" />
					</td>
						</tr>
				<tr>
					<td align="left" class="Main_Tab_Style_title" style="width: 150px; height: 20px;">
						住址：
					</td>
					<td  align="left" class="Main_Tab_Style_Content">
						<input type="text" name="address" id="address" class="TextBox"
					disabled="disabled"		value="${address }" style="width: 150px; height: 20px;" />
					
					</td>
				
				<td align="left" class="Main_Tab_Style_title" style="width: 150px; height: 20px;">
						入职时间：
					</td>
					<td align="left" class="Main_Tab_Style_Content">
								<input type="text" name="entrytime" id="entrytime" class="TextBox" disabled="disabled"
							value="${entrytime }" style="width: 150px; height: 20px;" />
						</td>	
				</tr>
				<tr>
					<td align="left" class="Main_Tab_Style_title" style="width: 150px; height: 20px;">
						职称级别：
					</td>
					<td align="left" class="Main_Tab_Style_Content">
						<input type="text" name="technicallevel" class="TextBox" id="technicallevel"
						disabled="disabled"	value="${technicallevel }" style="width: 150px; height: 20px;" />
					</td>
					
					<td align="left" class="Main_Tab_Style_title" style="width: 150px; height: 20px;">
						职务：
					</td>
					<td align="left" class="Main_Tab_Style_Content">
						<input type="text" name="post" id="post" class="TextBox" value="${post }"
						disabled="disabled"	value="" style="width: 150px; height: 20px;" />
					</td>
					</tr>
				<tr>
					<td align="left" class="Main_Tab_Style_title" style="width: 150px; height: 20px;">
						职称：
					</td>
					<td align="left" class="Main_Tab_Style_Content">
						<input type="text" name="technicalship" class="TextBox" id="technicalship"
						disabled="disabled"	value="${technicalship }" style="width: 150px; height: 20px;" />
					</td>	
				
			
					<td align="left" class="Main_Tab_Style_title" style="width: 150px; height: 20px;">
						状态：
					</td>
					<td align="left" class="Main_Tab_Style_Content">
							<input type="text" name="status" class="TextBox" id="status"
						disabled="disabled"	value="${status }" style="width: 150px; height: 20px;" />
					</td>				
				</tr>
				<tr>
					<td align="left" class="Main_Tab_Style_title" style="width: 150px; height: 20px;">
						备注：
					</td>
					<td colspan="3" align="left" class="Main_Tab_Style_Content">
						<textarea disabled="disabled" class="TextBox" style="width:99.5%;height:40px;" name="remark" id="remark">${remark }</textarea>
					</td>	
				</tr>
			</table>
			</form>
		</div>
  </body>
</html>
