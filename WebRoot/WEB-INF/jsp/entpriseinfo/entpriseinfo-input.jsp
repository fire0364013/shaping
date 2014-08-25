<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ include file="/common/taglibs.jsp"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
		<title>企业信息编辑</title>

		<link rel="stylesheet" href="${ctx}/themes/default/easyui.css"	type="text/css" />
		<link rel="stylesheet" type="text/css" href="${ctx}/themes/icon.css"/>
		<link rel="stylesheet" type="text/css"	href="${ctx}/validate/validate.css"/>
		<script type="text/javascript" src="${ctx}/js/DatePicker/WdatePicker.js"></script>
		<script type="text/javascript" src="${ctx}/js/jquery-1.7.2.min.js"></script>
		<script type="text/javascript" src="${ctx}/js/jquery.easyui.min.js"></script>
		<script type="text/javascript" src="${ctx}/js/easyui-lang-zh_CN.js"></script>
		<script type="text/javascript" src="${ctx}/validate/input.validate.js"></script>
		
		<script language="javascript" >
		var rootPath="${ctx}";
	  
		$(document).ready(function(){
				$('#equalsName').focus();
				provinceData();	
				if($("#provincecode").val()!=''){
					$("#provinceVal").val($("#provincecode").val());
					//alert($("#provincecode").val());
	               	cityData();
	               	regionData();
				}
				//////////////修改时用到//////////////
				var entidVal = $("#entid").val();
				if(entidVal!=""){
					cityData();
					regionData();
				}
				//////////////修改时用到//////////////
				$("#provincecode").change(function(){
					$("#citycode").html('');
					$("#regioncode").html('');
					if($("#provincecode").val()!=''){
						$("#provinceVal").val($("#provincecode").val());
					//alert($("#provincecode").val());
	               	cityData();
	               	regionData();
					}
	            });
				$("#citycode").change(function(){	
				   $("#regioncode").html('');
				   $("#cityVal").val($("#citycode").val());
				   //alert($("#citycode").val());
	               regionData();
	            });
				//点击加载行业类型
				$("#industrytypename").click(function(){	
				   loadIndustryData();
	            });
		});			
		</script>	
		<script type="text/javascript" src="${ctx}/lims/js/entpriseinfo.js"></script>
		<script type="text/javascript" src="${ctx}/lims/js/entpriseinfo/selOneuser.js"></script>
	</head>
	<body onkeydown="PreventBSK();">
		<s:form action="entpriseinfo!save" id="entpriseinfoForm" method="post" theme="simple">
			<s:hidden name="entid" id="entid"/>
				<input type="hidden" id="flagName" name="flagName" value="${entname }"/>
			<table width="100%" border="1" align="center" class="grid">
				<tr>
					<td align="left" class="Main_Tab_Style_title"
						style="width: 147px; height: 20px;">
						企业名称：
					</td>
					<td align="left" class="Main_Tab_Style_Content" width="230px" width="230px">
						<input name="equalsName" id="equalsName" class="TextBox grkj-validate"
							style="width: 227px;height:20px" value="${entname}" 
							validateParam="{type:'string',maxLength:'80',required:'true',message:'企业名称不能为空，长度不超过80个字符！'}"
							/><font color="red" size="2px">*</font>
					</td>
					<td align="left" class="Main_Tab_Style_title"
						style="width: 147px; height: 20px;">
						省份：
					</td>
					<td align="left" class="Main_Tab_Style_Content" width="230px">
						<input type="hidden" id="provinceVal" name="provinceVal" value="${province.regioncode}">
						<select class="TextBox grkj-validate"  id="provincecode" name="province.regioncode"  Style="width: 227px;height:20px"
								validateParam="{type:'mulSelect',required:'true',message:'请选择省份！'}">
						</select><font color="red" size="2px">*</font>
					</td>		
				</tr>
				<tr>
					<td align="left" class="Main_Tab_Style_title"
						style="width: 147px; height: 20px;">
						城市：
					</td>
					<td align="left" class="Main_Tab_Style_Content" width="230px">
						<input type="hidden" id="cityVal" name="cityVal" value="${city.regioncode}">
						<select class="TextBox grkj-validate"  id="citycode" name="city.regioncode"  Style="width: 227px;height:20px"
						validateParam="{type:'mulSelect',required:'true',message:'请选择城市！'}">
						</select><font color="red" size="2px">*</font>
					</td>
					<td align="left" class="Main_Tab_Style_title"
						style="width: 147px; height: 20px;">
						行政区：
					</td>
					<td align="left" class="Main_Tab_Style_Content" width="230px">
						<input type="hidden" id="regionVal" name="regionVal" value="${region.regioncode}">					
						<select class="TextBox grkj-validate"  id="regioncode" name="region.regioncode"  Style="width: 227px;height:20px"
						validateParam="{type:'mulSelect',required:'true',message:'请选择行政区！'}">
						</select><font color="red" size="2px">*</font>
					</td>
				</tr>
				<tr>
					<td align="left" class="Main_Tab_Style_title"
						style="width: 147px; height: 20px;">
						联系人：
					</td><!--
					<td align="left" class="Main_Tab_Style_Content" width="230px">
							<input type="text" name="username" id="username" readonly="readonly" class="TextBoxPic grkj-validate" onclick="showName()" value="${userinfo.realname }"
                              validateParam="{type:'string',required:'true',message:'请选择姓名！'}"	style="width: 220px; height: 20px;" /><font color="red" size="4px"> *</font>
							<input name="userids" id="userids" class="TextBox" onclick="showName()" type="hidden" value="${userinfo.userid }"
								style="width: 227px; height: 20px;" />
					</td>-->
					<td align="left" class="Main_Tab_Style_Content" width="230px">
						<s:textfield name="linkman" cssClass="TextBox grkj-validate"
						validateParam="{type:'string',maxLength:'40',required:'true',message:'长度不超过40个字符！'}"
							cssStyle="width: 227px;height:20px" theme="simple"></s:textfield><font color="red" size="2px">*</font>
					</td>
					
					<td align="left" class="Main_Tab_Style_title"
						style="width: 147px; height: 20px;">
						联系电话：
					</td>
					<td align="left" class="Main_Tab_Style_Content" width="230px"	 >
						<s:textfield name="telphone" cssClass="TextBox grkj-validate"
						validateParam="{type:'string',maxLength:'20',required:'true',message:'长度不超过20个字符！'}"
							cssStyle="width: 227px;height:20px" theme="simple"></s:textfield><font color="red" size="2px">*</font>
					</td>
				</tr>
				<tr>
					<td align="left" class="Main_Tab_Style_title"
						style="width: 147px; height: 20px;">
						组织机构代码：
					</td>
					<td align="left" class="Main_Tab_Style_Content" width="230px">
						<s:textfield name="organizationcode" cssClass="TextBox grkj-validate" 
							cssStyle="width: 225px;height:20px"
							validateParam="{type:'string',maxLength:'40',required:'false',message:'长度不超过40个字符！'}"
							theme="simple"></s:textfield>
						<font color="red" size="2px">*</font>	
					</td>
					<td align="left" class="Main_Tab_Style_title"
						style="width: 147px; height: 20px;">
						法人：
					</td>
					<td align="left" class="Main_Tab_Style_Content" width="230px">
						<s:textfield name="fictitiousman" cssClass="TextBox grkj-validate"
							validateParam="{type:'string',maxLength:'40',required:'false',message:'长度不超过40个字符！'}"
							cssStyle="width: 227px;height:20px" theme="simple"></s:textfield>
						<font color="red" size="2px">*</font>	

					</td>
				</tr>
				<tr>
					<!-- <td align="left" class="Main_Tab_Style_title"
						style="width: 147px; height: 20px;">
						手机：
					</td>
					<td align="left" class="Main_Tab_Style_Content" width="230px">
						<s:textfield name="mobilephone" cssClass="TextBox  grkj-validate"
						validateParam="{type:'string',maxLength:'30',required:'false',message:'长度不超过30个字符！'}"
							cssStyle="width: 227px;height:20px" theme="simple"></s:textfield>

					</td>
			 -->
			 		<td align="left" class="Main_Tab_Style_title"
						style="width: 147px; height: 20px;">
						邮箱：
					</td>
					<td align="left" class="Main_Tab_Style_Content" width="230px">
						<s:textfield name="email" cssClass="TextBox" 
						validateParam="{type:'string',maxLength:'40',required:'false',message:'长度不超过40个字符！'}"
							cssStyle="width: 227px;height:20px" theme="simple"></s:textfield>

					</td>
					<td align="left" class="Main_Tab_Style_title"
						style="width: 147px; height: 20px;">
						传真：
					</td>
					<td align="left" class="Main_Tab_Style_Content" width="230px">
						<s:textfield name="fax" cssClass="TextBox  "
							validateParam="{type:'string',maxLength:'20',required:'false',message:'长度不超过20个字符！'}"
							cssStyle="width: 227px;height:20px" theme="simple"></s:textfield>
					</td>
						</tr>
				<tr>
					<td align="left" class="Main_Tab_Style_title"
						style="width: 147px; height: 20px;">
						详细地址：
					</td>
					<td align="left" class="Main_Tab_Style_Content" width="230px">
						<s:textfield name="address" cssClass="TextBox  grkj-validate"
						validateParam="{type:'string',required:'true',maxLength:'75'}"
							cssStyle="width: 227px;height:20px" theme="simple"></s:textfield><font color="red" size="2px">*</font>

					</td>
					<td align="left" class="Main_Tab_Style_title"
						style="width: 147px; height: 20px;">
						邮编：
					</td>
					<td align="left" class="Main_Tab_Style_Content" width="230px">
						<s:textfield name="postalcode" cssClass="TextBox  "
						validateParam="{type:'int',required:'false',maxLength:'999999'}"
							cssStyle="width: 227px;height:20px" theme="simple"></s:textfield>
					</td>
					</tr>
				<tr>
					<td align="left" class="Main_Tab_Style_title"
						style="width: 147px; height: 20px;">
						企业类型：
					</td>
					<td align="left" class="Main_Tab_Style_Content" width="230px">						
						<s:select list="pollutionsourcetypeList" listKey="%{sourcetypecode}" listValue="%{sourcetypename}" 
						 cssClass="TextBox "   name="pollutionsourcetype.sourcetypecode"  theme="simple" cssStyle="width: 227px;height:20px">
						</s:select>
					</td>
					<td align="left" class="Main_Tab_Style_title"
						style="width: 147px; height: 20px;">
						企业规模：
					</td>
					<td align="left" class="Main_Tab_Style_Content" width="230px">
						<s:select list="scaleList" listKey="%{scalecode}" listValue="%{scalename}" 
						 cssClass="TextBox "  name="scale.scalecode"  theme="simple" cssStyle="width: 227px;height:20px">
						</s:select>
					</td>					
					</tr>
					<tr>
					<td align="left" class="Main_Tab_Style_title"
						style="width: 147px; height: 20px;">
						经度：
					</td>
					<td align="left" class="Main_Tab_Style_Content" width="230px">
						<s:textfield name="longitude" cssClass="TextBox  grkj-validate"
						validateParam="{type:'double',required:'false',maxLength:'999999'}"
							cssStyle="width: 227px;height:20px" theme="simple"></s:textfield>
					</td>
					<td align="left" class="Main_Tab_Style_title"
						style="width: 147px; height: 20px;">
						纬度：
					</td>
			
					<td align="left" class="Main_Tab_Style_Content" width="230px">
						<s:textfield name="latitude" cssClass="TextBox  grkj-validate"
						validateParam="{type:'double',required:'false',maxLength:'999999'}"
							cssStyle="width: 227px;height:20px" theme="simple"></s:textfield>

					</td>
				</tr>			
					<!-- 
				<tr>
					<td align="left" class="Main_Tab_Style_title"
						style="width: 147px; height: 20px;">
						行业类型：
					</td>
					<td align="left" class="Main_Tab_Style_Content" width="230px">
						<input type="hidden" id="industrytypecode" name="industry.industrytypecode" value="${industry.industrytypecode}">
						<input type="text" id="industrytypename" name="industry.industrytypename" class="TextBoxPic  grkj-validate"
						validateParam="{type:'string',required:'false',maxLength:'120'}"   Style="width: 227px;height:20px"
						value="${industry.industrytypename}">
					</td>
					<td align="left" class="Main_Tab_Style_title"
						style="width: 147px; height: 20px;">
						登记注册类型：
					</td>
					<td align="left" class="Main_Tab_Style_Content" width="230px">
						<s:select list="registertypeList" listKey="%{registertypecode}" listValue="%{registertypename}" 
						 cssClass="TextBox "  name="registertype.registertypecode"  theme="simple" cssStyle="width: 227px;height:20px">
						</s:select>
					</td>			

						</tr>
							
				<tr>
					<td align="left" class="Main_Tab_Style_title"
						style="width: 147px; height: 20px;">
						废水口排放数量：
					</td>
					<td align="left" class="Main_Tab_Style_Content" width="230px">
						<s:textfield name="wastewaterletnum" cssClass="TextBox  grkj-validate"
						validateParam="{type:'int',required:'false',maxLength:'999999999'}"
							cssStyle="width: 227px;height:20px" theme="simple"></s:textfield>
					</td>
				
					<td align="left" class="Main_Tab_Style_title"
						style="width: 147px; height: 20px;">
						废气口排放数量：
					</td>
					<td align="left" class="Main_Tab_Style_Content" width="230px" 220px>
						<s:textfield name="gasletnum" cssClass="TextBox  grkj-validate"
						validateParam="{type:'int',required:'false',maxLength:'999999999'}"
							cssStyle="width: 227px;height:20px" theme="simple"></s:textfield>
					</td>
					</tr>
				<tr>
					<td align="left" class="Main_Tab_Style_title"
						style="width: 147px; height: 20px;">
						无组织排放点数量：
					</td>
					<td align="left" class="Main_Tab_Style_Content" width="230px">
						<s:textfield name="noorganizationletnum" cssClass="TextBox  grkj-validate"
						validateParam="{type:'int',required:'false',maxLength:'999999999'}"
							cssStyle="width: 227px;height:20px" theme="simple"></s:textfield>
					</td>
					<td align="left" class="Main_Tab_Style_title"
						style="width: 147px; height: 20px;">
						工艺处理描述：
					</td>
					<td align="left" class="Main_Tab_Style_Content" width="230px">
						<s:textfield name="fabricationprocess" cssClass="TextBox   grkj-validate"
						validateParam="{type:'string',required:'false',maxLength:'120'}"
							cssStyle="width: 227px;height:20px" theme="simple"></s:textfield>

					</td>
				</tr>
				<tr>
					<td align="left" class="Main_Tab_Style_title"
						style="width: 150px; height: 20px;">
						是否污水处理厂：
					</td>
					<td align="left" class="Main_Tab_Style_Content" width="270px">
						<select class="TextBox  grkj-validate" id="issewageplant" name="issewageplant" style="width: 227px;height:20px"
	               		 	validateParam="{type:'string',required:'true',message:'请选择是否污水处理厂！'}">
	               		 		<!-- <option value="">---请选择---</option> 
	               		 		<option value="0" <c:if test="${issewageplant=='0' }">selected="selected"</c:if>>否</option>
								<option value="1" <c:if test="${issewageplant=='1' }">selected="selected"</c:if>>是</option>
						</select>
					</td>
					<td align="left" class="Main_Tab_Style_title"
						style="width: 147px; height: 20px;">
						开业时间：
					</td>
					<td align="left" class="Main_Tab_Style_Content" width="230px">
						<s:textfield name="practicedate" cssClass="Wdate grkj-validate"
						validateParam="{type:'date',required:'false',maxLength:'200'}"
							cssStyle="width: 227px;height:20px" theme="simple">
							<s:param name="value">
							<s:date name="practicedate" format="yyyy-MM-dd"/>
							</s:param>
							</s:textfield>
					</td>
				</tr>
					<tr>
					<td align="left" class="Main_Tab_Style_title"
						style="width: 147px; height: 20px;">
						关注程度：
					</td>
					<td align="left" class="Main_Tab_Style_Content" width="230px">
						<s:select list="dictionaryinfoList" listKey="%{dinfoid}" listValue="%{dinfoname}" 
						 cssClass="TextBox "  name="attention.dinfoid"  theme="simple" cssStyle="width: 227px;height:20px">
						</s:select>
					</td>
					</tr> -->
				<tr>
					<td align="left" class="Main_Tab_Style_title"
						style="width: 147px; height: 20px;">
						备注：
					</td>
					<td colspan="3" >
							<textarea rows="5" cols="3"  name="remark" id="remark" class="TextBox "  
							validateParam="{type:'string',maxLength:'500',required:'false',message:'长度不超过500个字符！'}"
							style="width: 635px; height: 80px" >${remark }</textarea>
					</td>
				</tr>
				</table>
			</s:form>
	</body>
</html>
