<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ include file="/common/taglibs.jsp"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
		<title>委托监测任务登记</title>
		<link rel="stylesheet" href="${ctx }/js/DatePicker/skin/WdatePicker.css" type="text/css" />
		<link rel="stylesheet" href="${ctx}/themes/default/easyui.css"	type="text/css"/>
		<link rel="stylesheet" type="text/css" href="${ctx}/themes/icon.css"/>
		<link rel="stylesheet" type="text/css"	href="${ctx}/validate/validate.css"/>
		<script type="text/javascript" src="${ctx}/js/jquery-1.7.2.min.js"></script>
		<script type="text/javascript" src="${ctx}/js/jquery.easyui.min.js"></script>
		<script type="text/javascript" src="${ctx}/js/easyui-lang-zh_CN.js"></script>
		<script type="text/javascript" src="${ctx}/validate/input.validate.js"></script>
		<script type="text/javascript" src="${ctx }/js/DatePicker/WdatePicker.js"></script>
		<script language="javascript">
		var rootPath="${ctx}";
		$(document).ready(function() {
			 //$("#projectname").focus();
			 //$("#registdate").val($("#registdate").val().substring(0,16));//登记时间显示到分
			
			 //委托日期为空时，默认当前日期
			/*var entrustdateVal = $("#entrustdate").val();
			if(entrustdateVal==""){
				var ym = new Date();
				var strYear = ym.getFullYear();
				var strMonth = ym.getMonth()+1;
				var strDate = ym.getDate();
				var temp = strYear+"-"+(strMonth<10? "0"+strMonth:strMonth)+"-"+(strDate<10? "0"+strDate:strDate);
				$("#entrustdate").val(temp);
			}*/
		});
		</script>
		<script type="text/javascript" src="${ctx}/lims/js/projects/task.register.js"></script>
	</head>
	
	<body onkeydown="PreventBSK();">
		<table style="width: 100%;" border="1" align="center" class="grid">
			<tr>
				<td align="left" class="Main_Tab_Style_title" style="width: 120px ; ">
					流水号：
				</td>
				<td align="left" class="Main_Tab_Style_Content">
					<input type="text" class="TextBox"  disabled style="width: 250px;" value="${projectcode}">
				</td>
			
				<td align="left" class="Main_Tab_Style_title" style="width: 120px ; ">
					项目名称：
				</td>
				<td align="left" class="Main_Tab_Style_Content" >
				<input type="text" disabled style="width: 250px;" id="projectname" class="TextBox" value="${projectname }" />
				</td>
			</tr>
			<tr>
				<td  align="left" class="Main_Tab_Style_title" style="width: 120px ; ">
					业务类型：
				</td>
				<td align="left" class="Main_Tab_Style_Content" >
					<input type="text" disabled style="width: 250px;" id="monitortypeid" class="TextBox" value="${monitortype.monitortypename }" />
                </td>
				<td align="left" class="Main_Tab_Style_title" style="width: 120px ; ">
					监测性质：
				</td>
				<td align="left" class="Main_Tab_Style_Content">
					<input disabled style="width: 250px;" type="text" id="monitornature" class="TextBox " value="${monitortype.monitornature}"/>
				</td>
			</tr>
			<tr>
				<td align="left" class="Main_Tab_Style_title" style="width: 120px ; ">
					委托单位：
				</td>
				<td align="left" class="Main_Tab_Style_Content" >
					<input disabled type="text"  id="entname" class="TextBox" style="width: 250px;  " value="${wtEntprise.entname }" />
				</td>
			
				<td align="left" class="Main_Tab_Style_title" style="width: 120px ; ">
					委托单位地址：
				</td>
				<td align="left" class="Main_Tab_Style_Content">
					<input disabled type="text" id="entrustentaddress" class="TextBox" style="width: 250px;  " value="${wtEntprise.address }" />
				</td>
			</tr>
			<tr>
				<td align="left" class="Main_Tab_Style_title" style="width: 120px ; ">
					样品来源：
				</td>
				<td align="left" class="Main_Tab_Style_Content" >
					<input disabled type="text" id="samplesource" class="TextBox" style="width: 250px;  " value="${samplesource.samplesourcename }" />
				</td>
				<td align="left" class="Main_Tab_Style_title" style="width: 120px ; ">
					委托日期：
				</td>
				<td align="left" class="Main_Tab_Style_Content" >
					<input disabled type="text" id="entrustdate" class="Wdate" value="${entrustdate}"	style="width: 250px;  " />
				</td>
			</tr>
			
			
			<tr>
				<td align="left" class="Main_Tab_Style_title" style="width: 120px ; ">
					要求完成日期：
				</td>
				<td align="left" class="Main_Tab_Style_Content">
					<input disabled type="text" id="completedate" class="Wdate"	value="${completedate}" style="width: 250px;  " />
				</td>
				<td align="left" class="Main_Tab_Style_title"
						style="width: 120px ; ">
					报告格式：
                </td>
                <td align="left" class="Main_Tab_Style_Content" >
                	<input disabled type="text" id="reportform" class="Wdate"	value="${reportform}" style="width: 250px;  " />
                </td>                                                                                             
            </tr>
			<tr>
				<td align="left" class="Main_Tab_Style_title" style="width: 120px ; ">
					登记人：
				</td>
				<td align="left" class="Main_Tab_Style_Content">
					<input type="text" id="realname" class="TextBox" value="${userinfo.realname}" style="width: 250px;" disabled>
				</td>
				<td align="left" class="Main_Tab_Style_title" style="width: 120px ; ">
					登记时间：
				</td>
				<td align="left" class="Main_Tab_Style_Content">
					<input type="text" id="registdate" class="Wdate" value="${registdate}" style="width: 250px;" disabled/>
				</td>
			</tr>
			<tr>
				<td align="left" class="Main_Tab_Style_title" style="width: 120px ; ">
					监测范围：
				</td>
				<td align="left" class="Main_Tab_Style_Content" >
				<input disabled type="text" id="monitorpurpose" class="TextBox" style="width: 250px;  " value="${monitorpurpose }" />
				</td>
				<td align="left" class="Main_Tab_Style_title"  style="width: 120px ; ">
					任务状态：
				</td>
				<td align="left" class="Main_Tab_Style_Content">
				<input type="text" name="status" class="TextBox" disabled style="width: 250px;" value="${json}"/>
				</td>
			</tr>
			<tr>
						<td align="left" class="Main_Tab_Style_title" style="width: 120px ;height: 20px;">
							是否分包：
						</td>
						<td align="left" class="Main_Tab_Style_Content" style="width: 250px; height: 20px;">
							<select id="issubpackage" name="project.issubpackage" disabled style="width: 250px; height: 20px;">
							<option value="">---请选择---</option>
							<option value="1" <c:if test="${'1'== project.issubpackage}">selected</c:if>>是</option>
							<option value="0" <c:if test="${'0'== project.issubpackage}">selected</c:if>>否</option>
							</select>
						</td>					
						<td align="left" class="Main_Tab_Style_title" style="width: 120px ;height: 20px;">
							是否提供不确定度：
						</td>
						<td align="left" class="Main_Tab_Style_Content" style="width: 250px; height: 20px;">
							<select id="issure" name="project.issure" disabled style="width: 250px; height: 20px;">
							<option value="">---请选择---</option>
							<option value="1" <c:if test="${'1'== project.issure}">selected</c:if>>是</option>
							<option value="0" <c:if test="${'0'== project.issure}">selected</c:if>>否</option>
							</select>
						</td>
					</tr>
					<tr>
						<td align="left" class="Main_Tab_Style_title" style="width: 120px ;height: 20px;">
							是否留样：
						</td>
						<td align="left" class="Main_Tab_Style_Content" style="width: 250px; height: 20px;">
							<select id="iskeepsample" name="project.iskeepsample" disabled style="width: 250px; height: 20px;">
							<option value="">---请选择---</option>
							<option value="1" <c:if test="${'1'== project.iskeepsample}">selected</c:if>>是</option>
							<option value="0" <c:if test="${'0'== project.iskeepsample}">selected</c:if>>否</option>
							</select>
						</td>					
						<td align="left" class="Main_Tab_Style_title" style="width: 120px ;height: 20px;">
							是否使用非标方法：
						</td>
						<td align="left" class="Main_Tab_Style_Content" style="width: 250px; height: 20px;">
							<select id="isunstandard" name="project.isunstandard" disabled style="width: 250px; height: 20px;">
							<option value="">---请选择---</option>
							<option value="1" <c:if test="${'1'== project.isunstandard}">selected</c:if>>是</option>
							<option value="0" <c:if test="${'0'== project.isunstandard}">selected</c:if>>否</option>
							</select>
						</td>
					</tr>
					<tr>
						<td align="left" class="Main_Tab_Style_title" style="width: 120px ;height: 20px;">
							是否返回容器：
						</td>
						<td align="left" class="Main_Tab_Style_Content" style="width: 250px; height: 20px;">
							<select id="iscontainer" name="project.iscontainer" disabled style="width: 250px; height: 20px;">
							<option value="">---请选择---</option>
							<option value="1" <c:if test="${'1'== project.iscontainer}">selected</c:if>>是</option>
							<option value="0" <c:if test="${'0'== project.iscontainer}">selected</c:if>>否</option>
							</select>
						</td>					
						<td align="left" class="Main_Tab_Style_title" style="width: 120px ;height: 20px;">
							交付方式：
						</td>
						<td align="left" class="Main_Tab_Style_Content" style="width: 250px; height: 20px;">
							<select id="feepay" name="project.feepay" disabled style="width: 250px; height: 20px;">
							<option value="">---请选择---</option>
							<option value="自取" <c:if test="${'自取'==project.feepay}">selected</c:if>>自取</option>
							<option value="传真" <c:if test="${'传真'==project.feepay}">selected</c:if>>传真</option>
							<option value="邮寄" <c:if test="${'邮寄'==project.feepay}">selected</c:if>>邮寄</option>
							<option value="电子邮件" <c:if test="${'电子邮件'==project.feepay}">selected</c:if>>电子邮件</option>
							<option value="电话" <c:if test="${'电话'==project.feepay}">selected</c:if>>电话</option>
							<option value="其他" <c:if test="${'其他'==project.feepay}">selected</c:if>>其他</option>							
							</select>
						</td>
					</tr>
					<tr>
						<td align="left" class="Main_Tab_Style_title" style="width: 120px ;height: 20px;">
							检测费用：
						</td>
						<td align="left" class="Main_Tab_Style_Content" style="width: 250px; height: 20px;">
							<input type="text"  id="detectionfee" name="project.detectionfee" 												 
							style="width: 250px; height: 20px;" disabled value="${project.detectionfee }" />
						</td>					
						<td align="left" class="Main_Tab_Style_title" style="width: 120px ;height: 20px;">
							付款方式：
						</td>
						<td align="left" class="Main_Tab_Style_Content" style="width: 250px; height: 20px;">
							<select id="paymenttype" name="project.paymenttype" disabled style="width: 250px; height: 20px;">
							<option value="">---请选择---</option>
							<option value="现金" <c:if test="${'现金'==project.paymenttype}">selected</c:if>>现金</option>
							<option value="银行转账" <c:if test="${'银行转账'==project.paymenttype}">selected</c:if>>银行转账</option>
							<option value="其他" <c:if test="${'其他'==project.paymenttype}">selected</c:if>>其他</option>					
							</select>
						</td>
					</tr>
					<tr>
						<td align="left" class="Main_Tab_Style_title" style="width: 120px ; ">
							监测月份：
						</td>
						<td align="left" class="Main_Tab_Style_Content" style="width: 290px; height: 20px;">
							<input type="text"  id="monitormonth" name="project.monitormonth" disabled class="TextBoxPic  grkj-validate" 														 
							style="width: 250px; height: 20px;" value="${project.monitormonth }" onclick="batchSettingMonth()"/><font color="red" size="4px"> *</font>
						</td>
						<td align="left" class="Main_Tab_Style_title" style="width: 120px ; ">
							报告份数：
						</td>
						<td colspan="3" align="left" class="Main_Tab_Style_Content" >
							<input type="text" disabled id="reportnum" name="project.reportnum" 														 
							style="width: 250px; height: 20px;" value="${project.reportnum }"/><font color="red" size="4px"> *</font>
						</td>
					</tr>
			<tr>
				<td align="left" class="Main_Tab_Style_title" style="width: 120px ; ">
					检测项目：
				</td>
				<td colspan="3" align="left" class="Main_Tab_Style_Content" >
					<textarea id="itemname" class="TextBox" disabled style="width: 100%; height: 60px;" >${itemname}</textarea>
				</td>
			</tr>
			<tr>
				<td align="left" class="Main_Tab_Style_title" style="width: 120px ; ">
					备注:
				</td>
				<td colspan="3" align="left" class="Main_Tab_Style_Content">
					<textarea  id="remark" class="TextBox"  style="width: 100%; height: 60px;">${remark}</textarea>
				</td>
			</tr>
		</table>
				<%--<div align="center"><input type="button" value="保存" class="Button_out" onClick="moditfyTask()" /></div>--%>
	</body>
</html>
