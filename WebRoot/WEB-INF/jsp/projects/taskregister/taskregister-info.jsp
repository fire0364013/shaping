<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ include file="/common/taglibs.jsp"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
		<title>企业信息选择</title>
		<link rel="stylesheet" href="${ctx }/js/DatePicker/skin/WdatePicker.css" type="text/css" />
		<link rel="stylesheet" href="${ctx}/themes/default/easyui.css"	type="text/css"/>
		<link rel="stylesheet" type="text/css" href="${ctx}/themes/icon.css"/>
		<link rel="stylesheet" type="text/css"	href="${ctx}/validate/validate.css"/>
		<script type="text/javascript" src="${ctx}/js/jquery-1.7.2.min.js"></script>
		<script type="text/javascript" src="${ctx}/js/jquery.easyui.min.js"></script>
		<script type="text/javascript" src="${ctx}/js/easyui-lang-zh_CN.js"></script>
		<script type="text/javascript" src="${ctx}/validate/input.validate.js"></script>
		<script type="text/javascript" src="${ctx }/js/DatePicker/WdatePicker.js"></script>
		<script language="javascript" >
		var rootPath="${ctx}";
		$(document).ready(function(){
			$('#reportform').append('<option value="">---请选择---</option>');
			
			$("#monitortypeid").change(function() {
				var monitortypeid = $("#monitortypeid").val();
				if(monitortypeid!=''){
					getMonitornature(monitortypeid);
				}else{
					$("#monitornature").val('');
					$('#reportform').html('');
					$('#reportform').append('<option value="">---请选择---</option>');
				}			
            });
			
			var ym = new Date();
			var strYear = ym.getFullYear();
			var strMonth = ym.getMonth()+1;
			var strDate = ym.getDate();
			var temp = strYear+"-"+(strMonth<10? "0"+strMonth:strMonth)+"-"+(strDate<10? "0"+strDate:strDate);
					
			$("#entrustdate").val(temp);
			$("#completedate").val(thisDateNextMonth(ym));
			
			$("#selecttypeid").change(function(){
				var value = $("#selecttypeid").val();
				//alert(value);
				if(value=='1'){
					$("#completedate1").css('display','');
					$("#completedate2").css('display','none');
				}else if(value=='2'){
					$("#completedate1").css('display','none');
					$("#completedate2").css('display','');
				}
			});
			
		});
		
		//页面加载时，给完成日期赋值（在委托日期的基础上加3个月）
		function thisDateNextMonth(now){
			if(now!=null)
			{
		   		//now.setMonth(now.getMonth()+3);
		   		now.setDate(now.getDate()+7);
		    	return now.getFullYear()+"-"+(now.getMonth()+1)+"-"+now.getDate();
		    }
			return null;
		}
		//选择完委托日期后，将日期加3个月赋值给完成日期
		function editCompletedate(strDate){//alert(now.value);
		  
			var arr = strDate.split("-"); //strDate.value.split("-");
			var now = new Date(arr[0],arr[1],arr[2]);
			if(now!=null)
			{
		   		now.setMonth(now.getMonth()+3);
		   		var intmonth=now.getMonth();
		   		var intDate=now.getDate();
		    	return now.getFullYear()+"-"+(intmonth<10? "0"+intmonth.toString():intmonth.toString())+"-"+(intDate<10?"0"+intDate.toString():intDate.toString());
		    	//$("#completedate").val(now.getFullYear()+"-"+(intmonth<10? "0"+intmonth.toString():intmonth.toString())+"-"+(intDate<10?"0"+intDate.toString():intDate.toString()));
		    }
			return null;
		}
		</script>	
		<script type="text/javascript" src="${ctx}/lims/js/projects/task.register.js"></script>
	</head>
	<body onkeydown="PreventBSK();">
		<form id="MonitorForm" method="post" theme="simple">
			<table width="100%" border="1" align="center" class="grid">
					<tr>
						<td align="left" class="Main_Tab_Style_title" style="width: 120px ;height: 20px;">
							项目名称：
						</td>
						<td align="left" class="Main_Tab_Style_Content" colspan="3">
						<input type="text" id="projectname" name="project.projectname" class="TextBox grkj-validate" 
							validateParam="{type:'string',required:'true',maxLength:'200',message:'项目名称不能为空并且超过100个汉字！'}"							 
							style="width: 710px; height: 20px;" value="${jcEntprise.entname }" /><font color="red" size="4px"> *</font>
						</td>
					</tr>
					<tr>
						<td align="left" class="Main_Tab_Style_title" style="width: 120px ;height: 20px;">
							委托单位：
						</td>
						<td align="left" class="Main_Tab_Style_Content" >
							<input type="hidden"  id="entid" name="project.wtEntprise.entid"/>
							<input type="text"  id="entname" class="TextBoxPic  grkj-validate" 														 
							style="width: 250px; height: 20px;" value="${jcEntprise.entname }" onclick="selectEntinfo()"
							validateParam="{type:'string',required:'true',maxLength:'48',message:'委托单位不能为空！'}"/><font color="red" size="4px"> *</font>
						</td>
					
						<td align="left" class="Main_Tab_Style_title" style="width: 120px ;height: 20px;">
							委托单位地址：
						</td>
						<td align="left" class="Main_Tab_Style_Content">
							<input type="text" id="entaddress" class="TextBox grkj-validate" 
							validateParam="{type:'string',required:'false',maxLength:'48',message:'委托单位地址不能超过48个汉字！'}"							 
							style="width: 250px; height: 20px;" value="${jcEntprise.address }" />
						</td>
					</tr>
					<tr>
		                <td align="left" class="Main_Tab_Style_title" style="width: 120px ;height: 20px;">
		                   	业务类型：
		                </td>
		                <td align="left" class="Main_Tab_Style_Content" >
							<select class="TextBox grkj-validate" id="monitortypeid" name="project.monitortype.monitortypeid" validateParam="{type:'string',required:'true',message:'请选择业务类型！'}" 
							style="width: 250px;height:20px">
	               		 		<option value="">---请选择---</option>
								<c:forEach var="monitorType1" items="${monitorTypeList }">
								<option value="${monitorType1.monitortypeid}" >${monitorType1.monitortypename}</option>
								</c:forEach>
							</select> <font color="red" size="4px">*</font>
		                </td>
		                <td align="left" class="Main_Tab_Style_title" style="width: 120px ;height: 20px;">
								监测性质：
						</td>
						<td align="left" class="Main_Tab_Style_Content">
							<input type="text" id="monitornature" name="monitornature" class="TextBox  grkj-validate" 
							style="width: 250px;height:20px;color: gray" validateParam="{type:'string',required:'false',maxLength:'20'}"
							value="${monitornature}" readonly="readonly"/>
						</td>
	            	</tr>
            		<tr>
            			<td align="left" class="Main_Tab_Style_title"
								style="width: 120px ;height: 20px;">
							报告格式：
		                </td>
		                <td align="left" class="Main_Tab_Style_Content" >
	               		 	<select class="TextBox  grkj-validate" id="reportform" name="project.reportform" style="width: 250px;height:20px"
	               		 	validateParam="{type:'string',required:'true',message:'请选择报告格式！'}">
							</select> <font color="red" size="4px"> *</font>
		                </td>
	            		<td align="left" class="Main_Tab_Style_title" style="width: 120px ;height: 20px;">
							样品来源：
						</td>
						<td align="left" class="Main_Tab_Style_Content" >
							<select class="TextBox   grkj-validate" id="samplesourceid" name="project.samplesource.samplesourceid" style="width: 250px;height:20px"
							validateParam="{type:'string',required:'true',message:'请选择样品来源！'}">
							<!-- <option value="">---请选择---</option> -->
								<c:forEach var="sample" items="${sampleSourceList }">
								<option value="${sample.samplesourceid}">${sample.samplesourcename}</option>
								</c:forEach>
							</select><font color="red" size="4px"> *</font>
						</td>
            		</tr> 
 					<tr>
						<td align="left" class="Main_Tab_Style_title" style="width: 120px ;height: 20px;">
							委托日期：
						</td>
						<td align="left" class="Main_Tab_Style_Content" >
							<input type="text" id="entrustdate" name="project.entrustdate" class="Wdate" value="${entrustdate}"					 
							 onClick="WdatePicker({isShowWeek:true,onpicked:function()
							{$dp.$('completedate').value=editCompletedate($dp.cal.getNewDateStr());}})"  style="width: 250px; height: 20px;" />
							 <font color="red" size="4px"> *</font>
						</td>			
						<td align="left" class="Main_Tab_Style_title" style="width: 120px ;height: 20px;">
							要求完成日期：
						</td>
						<td align="left" class="Main_Tab_Style_Content">
							<select id="selecttypeid" style="width:100px;">
							<option value="1">现场采样完成后工作日内</option>
							<option value="2" selected>工作日前</option>
							</select>
<input type="text" id="completedate1"  class="TextBox grkj-validate" validateParam="{type:'int',maxLength:'999999999',required:'true',message:'请输入正整数!'}" name="completedate" value="${completedate}" style="width:140px;display:none;"/>
							<input type="text" id="completedate2" name="completedate" class="Wdate"	value="${completedate}"
							onClick="showDataTimeDailog('yyyy-MM-dd')"	style="width:140px;" />
						</td>
					</tr>
					<tr>
						<td align="left" class="Main_Tab_Style_title" style="width: 120px ;height: 20px;">
							是否分包：
						</td>
						<td align="left" class="Main_Tab_Style_Content" style="width: 250px; height: 20px;">
							<select id="issubpackage" name="project.issubpackage" style="width: 250px; height: 20px;">
							<option value="">---请选择---</option>
							<option value="1" <c:if test="${'1'== project.issubpackage}">selected</c:if>>是</option>
							<option value="0" <c:if test="${'0'== project.issubpackage}">selected</c:if>>否</option>
							</select>
						</td>					
						<td align="left" class="Main_Tab_Style_title" style="width: 120px ;height: 20px;">
							是否提供不确定度：
						</td>
						<td align="left" class="Main_Tab_Style_Content" style="width: 250px; height: 20px;">
							<select id="issure" name="project.issure" style="width: 250px; height: 20px;">
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
							<select id="iskeepsample" name="project.iskeepsample" style="width: 250px; height: 20px;">
							<option value="">---请选择---</option>
							<option value="1" <c:if test="${'1'== project.iskeepsample}">selected</c:if>>是</option>
							<option value="0" <c:if test="${'0'== project.iskeepsample}">selected</c:if>>否</option>
							</select>
						</td>					
						<td align="left" class="Main_Tab_Style_title" style="width: 120px ;height: 20px;">
							是否使用非标方法：
						</td>
						<td align="left" class="Main_Tab_Style_Content" style="width: 250px; height: 20px;">
							<select id="isunstandard" name="project.isunstandard" style="width: 250px; height: 20px;">
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
							<select id="iscontainer" name="project.iscontainer" style="width: 250px; height: 20px;">
							<option value="">---请选择---</option>
							<option value="1" <c:if test="${'1'== project.iscontainer}">selected</c:if>>是</option>
							<option value="0" <c:if test="${'0'== project.iscontainer}">selected</c:if>>否</option>
							</select>
						</td>					
						<td align="left" class="Main_Tab_Style_title" style="width: 120px ;height: 20px;">
							交付方式：
						</td>
						<td align="left" class="Main_Tab_Style_Content" style="width: 250px; height: 20px;">
							<select id="feepay" name="project.feepay" style="width: 250px; height: 20px;">
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
							<input type="text"  id="detectionfee" name="project.detectionfee" 	class="TextBox grkj-validate"												 
							style="width: 250px; height: 20px;" value="${project.detectionfee }" 
							validateParam="{type:'double',maxLength:'999999999',required:'true',message:'请输入数字!'}"/>
						</td>					
						<td align="left" class="Main_Tab_Style_title" style="width: 120px ;height: 20px;">
							付款方式：
						</td>
						<td align="left" class="Main_Tab_Style_Content" style="width: 250px; height: 20px;">
							<select id="paymenttype" name="project.paymenttype" style="width: 250px; height: 20px;">
							<option value="">---请选择---</option>
							<option value="现金" <c:if test="${'现金'==project.paymenttype}">selected</c:if>>现金</option>
							<option value="银行转账" <c:if test="${'银行转账'==project.paymenttyp}">selected</c:if>>银行转账</option>
							<option value="其他" <c:if test="${'其他'==project.paymenttype}">selected</c:if>>其他</option>					
							</select>
						</td>
					</tr>
					<tr>
						<td align="left" class="Main_Tab_Style_title" style="width: 120px ; ">
							监测月份：
						</td>
						<td align="left" class="Main_Tab_Style_Content" style="width: 290px; height: 20px;">
							<input type="text"  id="monitormonth" name="project.monitormonth" class="TextBoxPic  grkj-validate" 														 
							style="width: 250px; height: 20px;" value="${project.monitormonth }" onclick="batchSettingMonth()"/><font color="red" size="4px"> *</font>
						</td>
						<td align="left" class="Main_Tab_Style_title" style="width: 120px ; ">
							报告份数：
						</td>
						<td colspan="3" align="left" class="Main_Tab_Style_Content" >
							<input type="text"  id="reportnum" name="project.reportnum" 
							 class="TextBox grkj-validate" validateParam="{type:'int',maxLength:'999999999',required:'true',message:'请输入正整数!'}"														 
							style="width: 250px; height: 20px;" value="${project.reportnum }"/><font color="red" size="4px"> *</font>
						</td>
					</tr>
					<tr>
						<td align="left" class="Main_Tab_Style_title" style="width: 120px ; ">
							检测范围：
						</td>
						<td colspan="3" align="left" class="Main_Tab_Style_Content" >
						<input type="text" id="monitorpurpose" name="project.monitorpurpose" class="TextBox grkj-validate" 
							validateParam="{type:'string',required:'false',maxLength:'200',message:'检测范围不能超过100个汉字！'}"							 
							style="width: 710px; " value="${monitorpurpose }" />
						</td>
					</tr>
					<tr>
						<td align="left" class="Main_Tab_Style_title" style="width: 120px ; ">
							检测项目：
						</td>
						<td colspan="3" align="left" class="Main_Tab_Style_Content" >
							<input type="hidden" id="itemid" name="itemid" value="${itemid}"/>
							<textarea id="itemname" class="TextBox grkj-validate"  style="width: 95%; height: 60px;" onclick="selectItem()"
							validateParam="{type:'string',required:'true',message:'请选择检测项目！'}">${itemname}</textarea><font color="red" size="4px"> *</font>
						</td>
					</tr>
					<tr> 
						<td align="left" class="Main_Tab_Style_title" style="width: 120px ;height: 20px;">
							备注:
						</td>
						<td colspan="3" align="left" class="Main_Tab_Style_Content">
							<textarea  name="project.remark" class="TextBox grkj-validate"  style="width: 100%; height: 60px;" 
						validateParam="{type:'string',required:'false',maxLength:'500',message:'备注不能超过250个汉字！'}">${remark}</textarea>
						</td>
					</tr>
			</table>
			</form>
			
			
			
			<!-- 批量设置月份 -->
		<div id="settingMonthForm" style="display: none;width: 100%">
		<div class="line">
			区间快速选择：
			<input type="radio" name="monthRadio" value="1" onclick="setMonitorMonthByCycle('one')" />全年
			<input type="radio" name="monthRadio" value="2" onclick="setMonitorMonthByCycle('two')" />上半年
			<input type="radio" name="monthRadio" value="3" onclick="setMonitorMonthByCycle('three')" />下半年
			<input type="radio" name="monthRadio" value="4" onclick="setMonitorMonthByCycle('four')" />单月
			<input type="radio" name="monthRadio" value="5" onclick="setMonitorMonthByCycle('five')" />双月
		</div>
		<div class="line">
			<span class="item"><input type="checkbox" id="month1" name="month" value="1" />1月份</span>
			<span class="item"><input type="checkbox" id="month2"  name="month" value="2" />2月份</span>
			<span class="item"><input type="checkbox" id="month3" name="month" value="3" />3月份</span>
			<span class="item"><input type="checkbox" id="month4" name="month" value="4" />4月份</span>
			<span class="item"><input type="checkbox" id="month5" name="month" value="5" />5月份</span>
			<span class="item"><input type="checkbox" id="month6" name="month" value="6" />6月份</span>
		</div>
		<div class="line">
			<span class="item"><input type="checkbox" id="month7" name="month" value="7" />7月份</span>
			<span class="item"><input type="checkbox" id="month8" name="month" value="8" />8月份</span>
			<span class="item"><input type="checkbox" id="month9" name="month" value="9" />9月份</span>
			<span class="item"><input type="checkbox" id="month10" name="month" value="10" />10月份</span>
			<span class="item"><input type="checkbox" id="month11" name="month" value="11" />11月份</span>
			<span class="item"><input type="checkbox" id="month12" name="month" value="12" />12月份</span>
		</div>
	</div>
			
	</body>
</html>
