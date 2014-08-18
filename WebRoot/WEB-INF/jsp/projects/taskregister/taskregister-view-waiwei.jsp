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
		<script type="text/javascript" src="${ctx}/lims/js/projects/task.register.waiwei.js"></script>
	</head>
	
	<body onkeydown="PreventBSK();">
		<table style="width: 100%;" border="1" align="center" class="grid">
					<tr>
						<td align="left" class="Main_Tab_Style_title" style="width: 120px ;height: 20px;">
							任务流水号：
						</td>
						<td align="left" class="Main_Tab_Style_Content" >
						    <input type="text" id="projectcode" name = "project.projectcode" class="TextBox" disabled			 
							style="width: 150px; height: 20px;" value="${project.projectcode }" />
						</td>					
						<td align="left" class="Main_Tab_Style_title" style="width: 120px ;height: 20px;">
							任务名称：
						</td>
						<td align="left" class="Main_Tab_Style_Content" >
						<input type="text" id="projectname" name="project.projectname" class="TextBox grkj-validate" disabled
							validateParam="{type:'string',required:'true',maxLength:'200',message:'项目名称不能为空并且超过100个汉字！'}"							 
							style="width: 150px; height: 20px;" value="${project.projectname }" /><font color="red" size="4px"> *</font>
						</td>
					</tr>
					<tr>
						<td align="left" class="Main_Tab_Style_title" style="width: 120px ;height: 20px;">
							客户名称：
						</td>
						<td align="left" class="Main_Tab_Style_Content" >
							<input type="hidden"  id="customid" name="project.customid.customid"/>
							<input type="text"  id="customname" class="TextBoxPic  grkj-validate" 														 
							style="width: 150px; height: 20px;" value="${project.customid.customname }" disabled
							validateParam="{type:'string',required:'true',maxLength:'48',message:'客户不能为空！'}"/>
							<font color="red" size="4px"> *</font>
						</td>
					
						<td align="left" class="Main_Tab_Style_title" style="width: 120px ;height: 20px;">
							客户联系方式：
						</td>
						<td align="left" class="Main_Tab_Style_Content">
							<input type="text" id="customphome" class="TextBox grkj-validate" 	disabled					 
							style="width: 150px; height: 20px;" value="${project.customid.mobilephone }" />
						</td>
					</tr>
					<tr>
						<td align="left" class="Main_Tab_Style_title" style="width: 120px ;height: 20px;">
							代理人名称：
						</td>
						<td align="left" class="Main_Tab_Style_Content" >
							<input type="hidden"  id="employeeid" name="project.agentperson.employeeinfoid"/>
							<input type="text"  id="employeename" class="TextBoxPic  grkj-validate" 	disabled													 
							style="width: 150px; height: 20px;" value="${project.agentperson.employeeinfoname }"
							validateParam="{type:'string',required:'true',maxLength:'48',message:'客户不能为空！'}"/>
							<font color="red" size="4px"> *</font>
						</td>
					
						<td align="left" class="Main_Tab_Style_title" style="width: 120px ;height: 20px;">
							代理人联系方式：
						</td>
						<td align="left" class="Main_Tab_Style_Content">
							<input type="text" id="employeephone" class="TextBox grkj-validate" 	disabled					 
							style="width: 150px; height: 20px;" value="${project.agentperson.mobilephone }" />
						</td>
					</tr>					
					<tr>
						<td align="left" class="Main_Tab_Style_title" style="width: 120px ; ">
							提交单位：
						</td>
						<td align="left" class="Main_Tab_Style_Content" >
							<input type="hidden"  id="entid" name="project.monitorentid.entid" value="${project.monitorentid.entid }" />
							<input type="text"  id="entname" class="TextBoxPic  grkj-validate" 	 disabled													 
							style="width: 150px;  " value="${project.monitorentid.entname }" />
							<font color="red" size="4px"> *</font>
						</td>
					
						<td align="left" class="Main_Tab_Style_title" style="width: 120px ;height: 20px;">
							提交单位法人：
						</td>
						<td align="left" class="Main_Tab_Style_Content" style="width: 150px; height: 20px;">
							<input type="text" id="fictitiousman" class="TextBox grkj-validate" 	disabled					 
							style="width: 150px; height: 20px;" value="${project.monitorentid.fictitiousman }" />
						</td>
					</tr>					
					<tr>
						<td align="left" class="Main_Tab_Style_title" style="width: 120px ; ">
							意向项目：
						</td>
						<td colspan="3" align="left" class="Main_Tab_Style_Content">
						<textarea  name="project.intentioniteminfo" class="TextBox grkj-validate"  style="width: 570px; height: 60px;" disabled
						validateParam="{type:'string',required:'false',maxLength:'500',message:'备注不能超过250个汉字！'}">${project.intentioniteminfo}</textarea>						
						<!-- 
						<td colspan="3" align="left" class="Main_Tab_Style_Content" >
							<input type="hidden" id="itemid" name="itemid" value="${itemid}"/>
							<textarea id="itemname" class="TextBox grkj-validate"  style="width: 720px; height: 60px;" onclick="selectItem()"
							validateParam="{type:'string',required:'true',message:'请选择检测项目！'}">${itemname}</textarea><font color="red" size="4px"> *</font>
						</td>
						 -->
					</tr>
					<tr> 
						<td align="left" class="Main_Tab_Style_title" style="width: 120px ;height: 20px;">
							处理意见:
						</td>
						<td colspan="3" align="left" class="Main_Tab_Style_Content">
							<textarea  name="project.isreturn" class="TextBox "  style="width: 570px; height: 60px;" disabled
						validateParam="{type:'string',required:'false',maxLength:'500',message:'处理意见不能超过250个汉字！'}">${project.isreturn}</textarea>
						</td>
					</tr>					
					<tr> 
						<td align="left" class="Main_Tab_Style_title" style="width: 120px ;height: 20px;">
							备注:
						</td>
						<td colspan="3" align="left" class="Main_Tab_Style_Content">
							<textarea  name="project.remark" class="TextBox grkj-validate"  style="width: 570px; height: 60px;" disabled
						validateParam="{type:'string',required:'false',maxLength:'500',message:'备注不能超过250个汉字！'}">${project.remark}</textarea>
						</td>
					</tr>
		</table>
				<%--<div align="center"><input type="button" value="保存" class="Button_out" onClick="moditfyTask()" /></div>--%>
	</body>
</html>
