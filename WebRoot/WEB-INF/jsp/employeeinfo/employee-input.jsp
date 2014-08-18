<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="/common/taglibs.jsp"%>


<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<title>人员管理</title>
	<script type="text/javascript">
			var rootPath = "${ctx}";
			
		</script>
		<link rel="stylesheet" href="${ctx}/themes/default/easyui.css"type="text/css" />
		<link rel="stylesheet" href="${ctx}/js/DatePicker/skin/WdatePicker.css" type="text/css" />
		<link rel="stylesheet" type="text/css" href="${ctx}/themes/icon.css">
		<link rel="stylesheet" type="text/css" href="${ctx}/validate/validate.css">
		<script type="text/javascript" src="${ctx}/js/jquery-1.7.2.min.js"></script>
		<script type="text/javascript" src="${ctx}/js/jquery.easyui.min.js"></script>
		<script type="text/javascript" src="${ctx}/js/easyui-lang-zh_CN.js"></script>
		<script type="text/javascript" src="${ctx}/validate/input.validate.js"></script>
		<script type="text/javascript" src="${ctx}/lims/js/employeeinfo.js"></script>
 		<script type="text/javascript" src="${ctx}/js/DatePicker/WdatePicker.js"></script>
  </head>
  
  <body>
  	<div id="dlg-buttons">
	<form id="employeeinfoForm" action="" method="post">
	<input type="hidden" name="employeeinfoid" id="employeeinfoid" value="${employeeinfoid }"/>
	<input type="hidden" name="entid" id="entid" value="${entid }"/>
	  <table  border="1" align="center" class="grid">
				<tr>
					<td align="left" class="Main_Tab_Style_title" style="width: 150px; height: 20px;">
						姓名：
					</td>
					<td align="left" class="Main_Tab_Style_Content">
						<input type="text" name="employeeinfoname" class="TextBox grkj-validate" 
						value="${employeeinfoname}" style="width: 150px; height: 20px;" />
						<font color="red" size="4px">*</font>
					</td>
					<td align="left" class="Main_Tab_Style_title" style="width: 150px; height: 20px;">
						民族：
					</td>
					<td align="left" class="Main_Tab_Style_Content">
						<input type="text" name="nation" id="nation" class="TextBox " validateParam="{type:'string',maxLength:'50',required:'false',message:'长度不超过50个字符！'}"	   
							value="${nation }" style="width: 150px; height: 20px;" />
					</td>
				</tr>
				<tr>
					<td align="left" class="Main_Tab_Style_title" style="width: 150px; height: 20px;">
						联系电话：
					</td>
					<td align="left" class="Main_Tab_Style_Content">
						<input type="text" name="mobilephone" id="mobilephone" class="TextBox grkj-validate"   
							value="${mobilephone }" style="width: 150px; height: 20px;" />
						<font color="red" size="4px">*</font>	
					</td>	
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
					<td align="left" class="Main_Tab_Style_title" style="width: 150px; height: 20px;">
						籍贯：
					</td>
					<td align="left" class="Main_Tab_Style_Content">
						<input type="text" name="nativeplace" id="nativeplace" class="TextBox " validateParam="{type:'string',maxLength:'100',required:'false',message:'长度不超过100个字符！'}"	   
							value="${nativeplace }" style="width: 150px; height: 20px;" />
					</td>	
			
					<td align="left" class="Main_Tab_Style_title" style="width: 150px; height: 20px;">
						出生日期：
					</td>
					<td align="left" class="Main_Tab_Style_Content">
					<input type="text" name="birthday" class="Wdate"  value="${birthday }" onClick="showDataTimeDailog('yyyy-MM-dd')"
							style="width: 150px; height: 20px;" />
					</td>
				</tr>
				<tr>
					<td align="left" class="Main_Tab_Style_title" style="width: 150px; height: 20px;">
						身份证号：
					</td>
					<td align="left" class="Main_Tab_Style_Content">
						<input type="text" name="carId" id="carId" class="TextBox grkj-validate" 
						validateParam="{type:'card',required:'flase',message:'请输入15位或18位的身份证号！'}"	
							value="${carId }" style="width: 150px; height: 20px;" />
						<font color="red" size="4px">*</font>	
					</td>	
					<td align="left" class="Main_Tab_Style_title" style="width: 150px; height: 20px;">
						政治面貌：
					</td>
					<td align="left" class="Main_Tab_Style_Content">
						<input type="text" name="political" id="political" class="TextBox " validateParam="{type:'string',maxLength:'10',required:'false',message:'长度不超过10个字符！'}"	   
							value="${political }" style="width: 150px; height: 20px;" />
					</td>
				</tr>
				<tr>
					<td align="left" class="Main_Tab_Style_title" style="width: 150px; height: 20px;">
						毕业院校：
					</td>
					<td align="left" class="Main_Tab_Style_Content">
						<input type="text" name="graduationschool" id="graduationschool" class="TextBox " validateParam="{type:'string',maxLength:'100',required:'false',message:'长度不超过100个字符！'}"	   
							value="${graduationschool }" style="width: 150px; height: 20px;" />
					</td>
				
					<td align="left" class="Main_Tab_Style_title" style="width: 150px; height: 20px;">
						毕业时间：
					</td>
					<td align="left" class="Main_Tab_Style_Content">
					<input type="text" name="graduationdate" class="Wdate"
							value="${graduationdate }" onClick="showDataTimeDailog('yyyy-MM-dd')"
							style="width: 150px; height: 20px;" />
						</td>
				</tr>
				<tr>
					<td align="left" class="Main_Tab_Style_title" style="width: 150px; height: 20px;">
						最高学历：
					</td>
					<td align="left" class="Main_Tab_Style_Content">
						<input type="text" name="educationlevel" id="educationlevel" class="TextBox " validateParam="{type:'string',maxLength:'30',required:'false',message:'长度不超过30个字符！'}"	   
							value="${educationlevel }" style="width: 150px; height: 20px;" />
					</td>
				
					<td align="left" class="Main_Tab_Style_title" style="width: 150px; height: 20px;">
						所学专业：
					</td>
					<td align="left" class="Main_Tab_Style_Content">
						<input type="text" name="major" id="major"  class="TextBox " validateParam="{type:'string',maxLength:'100',required:'false',message:'长度不超过100个字符！'}"	   
							value="${major }" style="width: 150px; height: 20px;" />
					</td>
				</tr>
				<tr>
					<td align="left" class="Main_Tab_Style_title" style="width: 150px; height: 20px;">
						住址：
					</td>
					<td  align="left" class="Main_Tab_Style_Content">
						<input type="text" name="address" id="address"  class="TextBox grkj-validate" validateParam="{type:'string',maxLength:'200',required:'false',message:'长度不超过200个字符！'}"	   
							value="${address }" style="width: 150px; height: 20px;" />
						<font color="red" size="4px">*</font>	
					</td>
					<td align="left" class="Main_Tab_Style_title" style="width: 150px; height: 20px;">
						入职时间：
					</td>
					<td align="left" class="Main_Tab_Style_Content">
						<input type="text" name="entrytime" class="Wdate"
							value="${entrytime }" onClick="showDataTimeDailog('yyyy-MM-dd')"
							style="width: 150px; height: 20px;" />
						</td>
							</tr>
				<tr>		
					<td align="left" class="Main_Tab_Style_title" style="width: 150px; height: 20px;">
						职称级别：
					</td>
					<td align="left" class="Main_Tab_Style_Content">
						<input type="text" name="technicallevel"   id="technicallevel" class="TextBox" validateParam="{type:'string',maxLength:'50',required:'false',message:'长度不超过50个字符！'}"	   
							value="${technicallevel }" style="width: 150px; height: 20px;" />
					</td>
				
					<td align="left" class="Main_Tab_Style_title" style="width: 150px; height: 20px;">
						职务：
					</td>
					<td align="left" class="Main_Tab_Style_Content">
						<input type="text" name="post" id="post"  class="TextBox " validateParam="{type:'string',maxLength:'50',required:'false',message:'长度不超过50个字符！'}"	   
								 value="${post }"  style="width: 150px; height: 20px;" />
					</td>
					</tr>
				<tr>
					<td align="left" class="Main_Tab_Style_title" style="width: 150px; height: 20px;">
						职称：
					</td>
					<td align="left" class="Main_Tab_Style_Content">
					<select  class="TextBox"   name="technicalship" Style="width: 150px;height:20px">							
 							 <option value="中级技师" <c:if test="${technicalship=='中级技师'}">selected="selected"</c:if>>中级技师</option>
							<option value="高级技师" <c:if test="${technicalship=='高级技师'}">selected="selected"</c:if>>高级技师</option>			
							<option value="技术员" <c:if test="${technicalship=='技术员'}">selected="selected"</c:if>>技术员</option>
							 <option value="助理工程师" <c:if test="${technicalship=='助理工程师'}">selected="selected"</c:if>>助理工程师</option>
							<option value="工程师" <c:if test="${technicalship=='工程师'}">selected="selected"</c:if>>工程师	</option>	
							<option value="高级工程师" <c:if test="${technicalship=='高级工程师'}">selected="selected"</c:if>>高级工程师	</option>
							<option value="教授级高级工程师" <c:if test="${technicalship=='教授级高级工程师'}">selected="selected"</c:if>>教授级高级工程师</option>	
							<option value="其他" <c:if test="${technicalship=='其他'}">selected="selected"</c:if>>其他</option>			
						</select>	
					</td>	
					<td align="left" class="Main_Tab_Style_title" style="width: 150px; height: 20px;">
						状态：
					</td>
						<td align="left" class="Main_Tab_Style_Content">
						<select  class="TextBox"   name="status" Style="width: 150px;height:20px">							
 							 <option value="在岗" <c:if test="${status=='在岗'}">selected="selected"</c:if>>在岗</option>
							<option value="离职" <c:if test="${status=='离职'}">selected="selected"</c:if>>离职</option>			
							<option value="外聘" <c:if test="${status=='外聘'}">selected="selected"</c:if>>外聘</option>					
						</select>		
					</td>					
				</tr>
				<tr>
					<td align="left" class="Main_Tab_Style_title" style="width: 150px; height: 20px;">
						备注：
					</td>
					<td colspan="3" align="left" class="Main_Tab_Style_Content">
						<textarea class="TextBox"  
							validateParam="{type:'string',maxLength:'500',required:'false',message:'长度不超过500个字符！'}"   
								 style="width:99.5%;height:40px;" name="remark" id="remark">${remark }</textarea>
					</td>	
				</tr>
			</table>
   	
			</form>
		</div>
  </body>
</html>
