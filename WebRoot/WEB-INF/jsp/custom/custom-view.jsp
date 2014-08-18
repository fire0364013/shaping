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
	<form id="custominfoform" action="" method="post" theme="simple">
	  <table  border="1" align="left" class="grid">
				<tr>
					<td align="left" class="Main_Tab_Style_title" style="width: 150px; height: 20px;">
						姓名：
					</td>
					<td align="left" class="Main_Tab_Style_Content">
						<input type="text" name="customname" class="TextBox " disabled
						value="${customname}" style="width: 150px; height: 20px;" />
					</td>
					<td align="left" class="Main_Tab_Style_title" 
						style="width: 150px; height: 20px;">
						性别：
					</td>
					<td align="left" class="Main_Tab_Style_Content" width="150px">
						<select name="sex" style="width: 150px" disabled>
							<option value="男" <c:if test="${sex=='男'}">selected="selected"</c:if>>男</option>
							<option value="女" <c:if test="${sex=='女'}">selected="selected"</c:if>>女</option>
						</select>
					</td>
				</tr>
				<tr>
					<td align="left" class="Main_Tab_Style_title" style="width: 150px; height: 20px;">
						联系电话：
					</td>
					<td align="left" class="Main_Tab_Style_Content">
						<input type="text" name="mobilephone" id="mobilephone" class="TextBox" disabled  
							value="${mobilephone }" style="width: 150px; height: 20px;" />
					</td>	
			
					<td align="left" class="Main_Tab_Style_title" style="width: 150px; height: 20px;">
						出生日期：
					</td>
					<td align="left" class="Main_Tab_Style_Content">
					<input type="text" name="birthday" class="Wdate" disabled  value="${birthday }" onClick="showDataTimeDailog('yyyy-MM-dd')"
							style="width: 150px; height: 20px;" />
					</td>
				</tr>				
				<tr>
					<td align="left" class="Main_Tab_Style_title" style="width: 150px; height: 20px;">
						住址：
					</td>
					<td  align="left" class="Main_Tab_Style_Content">
						<input type="text" name="address" id="address" disabled class="TextBox grkj-validate" validateParam="{type:'string',maxLength:'200',required:'false',message:'长度不超过200个字符！'}"	   
							value="${address }" style="width: 150px; height: 20px;" />
					</td>
					<td align="left" class="Main_Tab_Style_title" style="width: 150px; height: 20px;">
						婚史：
					</td>
					<td align="left" class="Main_Tab_Style_Content">
						<select name="marriage" style="width: 150px" disabled>
							<option value="已婚" <c:if test="${sex=='已婚'}">selected="selected"</c:if>>已婚</option>
							<option value="未婚" <c:if test="${sex=='未婚'}">selected="selected"</c:if>>未婚</option>
						</select>
					</td>
				</tr>
				<tr>
					<td align="left" class="Main_Tab_Style_title" style="width: 150px; height: 20px;">
						家庭背景：
					</td>
					<td  align="left" class="Main_Tab_Style_Content">
						<textarea class="TextBox grkj-validate"  
							validateParam="{type:'string',maxLength:'500',required:'false',message:'长度不超过500个字符！'}"   
							disabled	 style="width:99.5%;height:40px;" name="familybackgroud" id="familybackgroud">${familybackgroud }</textarea>
					</td>
					<td align="left" class="Main_Tab_Style_title" style="width: 150px; height: 20px;">
						消费级别：
					</td>
					<td align="left" class="Main_Tab_Style_Content">
						<select name="marriage" style="width: 150px" disabled>
							<option value="A" <c:if test="${sex=='A'}">selected="selected"</c:if>>A级</option>
							<option value="B" <c:if test="${sex=='B'}">selected="selected"</c:if>>B级</option>
							<option value="C" <c:if test="${sex=='C'}">selected="selected"</c:if>>C级</option>
						</select>
					</td>
				</tr>	
				<tr>
					<td  align="left" class="Main_Tab_Style_title" style="width: 120px ; ">
						顾客性格：
					</td>
					<td align="left" class="Main_Tab_Style_Content" style="width: 150px ; ">
						<select class="TextBox grkj-validate" id="character" name="character" disabled
						validateParam="{type:'string',required:'true',message:'请选择业务类型！'}" style="width: 150px;height:20px">
							<c:forEach var="character1" items="${characterList }">
							<option value="${character1.dinfocode}" <c:if test="${character==character1.dinfocode }">selected="selected"</c:if>>${character1.dinfoname}</option>
							</c:forEach>
						</select> <font color="red" size="4px">*</font>
	                </td>
					<td align="left" class="Main_Tab_Style_title" style="width: 120px ; ">
						顾客职业：
					</td>
					<td align="left" class="Main_Tab_Style_Content" style="width: 150px ; ">
						<select class="TextBox grkj-validate" id="occupation" name="occupation" disabled
						validateParam="{type:'string',required:'true',message:'请选择业务类型！'}" style="width: 150px;height:20px">
							<c:forEach var="occupation1" items="${occupationList }">
							<option value="${occupation1.dinfocode}" <c:if test="${occupation==occupation1.dinfocode }">selected="selected"</c:if>>${occupation1.dinfoname}</option>
							</c:forEach>
						</select> <font color="red" size="4px">*</font>
					</td>
				</tr>
				<tr>
					<td align="left" class="Main_Tab_Style_title" style="width: 150px; height: 20px;">
						以往整形史满意度：
					</td>
					<td  align="left" class="Main_Tab_Style_Content">
						<select name="satisfaction" style="width: 150px" disabled>
							<option value="无" <c:if test="${satisfaction=='无'}">selected="selected"</c:if>>无</option>
							<option value="满意" <c:if test="${satisfaction=='满意'}">selected="selected"</c:if>>满意</option>
							<option value="不满意" <c:if test="${satisfaction=='不满意'}">selected="selected"</c:if>>不满意</option>
						</select>
					</td>
					<td align="left" class="Main_Tab_Style_title" style="width: 150px; height: 20px;">
						可接受消费额度：
					</td>
					<td align="left" class="Main_Tab_Style_Content">
						<select name="consumptionquota" style="width: 150px" disabled>
							<option value="5K" <c:if test="${consumptionquota=='5K'}">selected="selected"</c:if>>5千</option>
							<option value="1W" <c:if test="${consumptionquota=='1W'}">selected="selected"</c:if>>1万</option>
							<option value="3W" <c:if test="${consumptionquota=='3W'}">selected="selected"</c:if>>3万</option>
							<option value="5W" <c:if test="${consumptionquota=='5W'}">selected="selected"</c:if>>5万</option>
							<option value="10W" <c:if test="${consumptionquota=='10W'}">selected="selected"</c:if>>10万</option>
							<option value="20W" <c:if test="${consumptionquota=='20W'}">selected="selected"</c:if>>20万</option>
							<option value="30W" <c:if test="${consumptionquota=='30W'}">selected="selected"</c:if>>30万</option>
							<option value="50W" <c:if test="${consumptionquota=='50W'}">selected="selected"</c:if>>50万以上</option>
						</select>
					</td>
				</tr>	
				<tr>
					<td align="left" class="Main_Tab_Style_title" style="width: 150px; height: 20px;">
						对自己面部、身体不满意的地方：
					</td>
					<td colspan="3" align="left" class="Main_Tab_Style_Content">
						<textarea class="TextBox grkj-validate"  disabled
							validateParam="{type:'string',maxLength:'500',required:'false',message:'长度不超过500个字符！'}"   
								 style="width:99.5%;height:40px;" name="dissatisfiedinfo" id="dissatisfiedinfo">${dissatisfiedinfo }</textarea>
					</td>	
				</tr>							
				<tr>
					<td align="left" class="Main_Tab_Style_title" style="width: 150px; height: 20px;">
						沟通中需注意事项：
					</td>
					<td colspan="3" align="left" class="Main_Tab_Style_Content">
						<textarea class="TextBox grkj-validate"  disabled
							validateParam="{type:'string',maxLength:'500',required:'false',message:'长度不超过500个字符！'}"   
								 style="width:99.5%;height:40px;" name="carfulinfo" id="carfulinfo">${carfulinfo }</textarea>
					</td>	
				</tr>											
				<tr>
					<td align="left" class="Main_Tab_Style_title" style="width: 150px; height: 20px;">
						备注：
					</td>
					<td colspan="3" align="left" class="Main_Tab_Style_Content">
						<textarea class="TextBox grkj-validate"  disabled
							validateParam="{type:'string',maxLength:'500',required:'false',message:'长度不超过500个字符！'}"   
								 style="width:99.5%;height:40px;" name="remark" id="remark">${remark }</textarea>
					</td>	
				</tr>
			</table>
			</form>
		</div>
  </body>
</html>
