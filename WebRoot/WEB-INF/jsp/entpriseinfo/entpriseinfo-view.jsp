<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ include file="/common/taglibs.jsp"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
		<title>企业信息编辑</title>

		<link rel="stylesheet" href="${ctx}/themes/default/easyui.css"	type="text/css" />
		<link rel="stylesheet" type="text/css" href="${ctx}/themes/icon.css">
		<link rel="stylesheet" type="text/css"	href="${ctx}/validate/validate.css">
		<script type="text/javascript" src="${ctx}/js/jquery-1.7.2.min.js"></script>
		<script type="text/javascript" src="${ctx}/js/jquery.easyui.min.js"></script>
		<script type="text/javascript" src="${ctx}/js/easyui-lang-zh_CN.js"></script>
		<script type="text/javascript" src="${ctx}/validate/input.validate.js"></script>
		<script language="javascript" >
		var rootPath="${ctx}";
		$(document).ready(function(){
				provinceData();		
				var entidVal = $("#entid").val();
				if(entidVal!=""){
					cityData();
					regionData();
				}
				$("#provincecode").change(function(){
					$("#citycode").html('');
					$("#regioncode").html('');
					$("#provinceVal").val($("#provincecode").val());
					//alert($("#provincecode").val());
	               	cityData();
	            });
				$("#citycode").change(function(){	
				   $("#regioncode").html('');
				   $("#cityVal").val($("#citycode").val());
				   //alert($("#citycode").val());
	               regionData();
	            });
				
				$("input").attr("disabled","true");
				$("select").attr("disabled","true");
				$("textarea").attr("disabled","true");
		});		
		</script>	
		<script type="text/javascript" src="${ctx}/lims/js/entpriseinfo.js"></script>
		
	</head>
	<body onkeydown="PreventBSK();">
		<form action="" id="entpriseinfoForm" method="post" >
			<table width="100%" border="1" align="center" class="grid">
				<tr>
					<td align="left" class="Main_Tab_Style_title"
						style="width: 150px; height: 20px;">
						企业名称：
					</td>
					<td align="left" class="Main_Tab_Style_Content" width="270px">
						<s:textfield name="entname" cssClass="TextBox "
							cssStyle="width: 240px;height:20px"
							theme="simple"></s:textfield> 
					</td>
					<td align="left" class="Main_Tab_Style_title"
						style="width: 150px; height: 20px;">
						省份：
					</td>
					<td align="left" class="Main_Tab_Style_Content" width="270px">
						<input type="hidden" id="provinceVal" name="provinceVal" value="${province.regioncode}">
						<select class="TextBox "  id="provincecode" name="province.regioncode"  Style="width: 240px;height:20px"></select>
						
					</td>		
				</tr>
				<tr>
					<td align="left" class="Main_Tab_Style_title"
						style="width: 150px; height: 20px;">
						城市：
					</td>
					<td align="left" class="Main_Tab_Style_Content" width="270px">
						<input type="hidden" id="cityVal" name="cityVal" value="${city.regioncode}">
						<select class="TextBox "  id="citycode" name="city.regioncode"  Style="width: 240px;height:20px">
						</select>
						
					</td>
					<td align="left" class="Main_Tab_Style_title"
						style="width: 150px; height: 20px;">
						行政区：
					</td>
					<td align="left" class="Main_Tab_Style_Content" width="270px">
						<input type="hidden" id="regionVal" name="regionVal" value="${region.regioncode}">					
						<select class="TextBox "  id="regioncode" name="region.regioncode"  Style="width: 240px;height:20px">
						</select>
					</td>
				</tr>
				<tr>
					<td align="left" class="Main_Tab_Style_title"
					style="width: 150px; height: 20px;">
						联系人：
					</td>
					<td align="left" class="Main_Tab_Style_Content">
						<input type="text" name="userinfo" id="userinfo" class="TextBox"
							disabled="disabled" value="${linkman }"
							style="width: 240px; height: 20px;" />
					</td>
					<td align="left" class="Main_Tab_Style_title"
						style="width: 150px; height: 20px;">
						电话：
					</td>
					<td align="left" class="Main_Tab_Style_Content"	width="270px" >
						<s:textfield name="telphone" cssClass="TextBox"
							cssStyle="width: 240px;height:20px" theme="simple"></s:textfield>
					</td>
				</tr>
				<tr>
					<td align="left" class="Main_Tab_Style_title"
						style="width: 150px; height: 20px;">
						组织机构代码：
					</td>
					<td align="left" class="Main_Tab_Style_Content" width="270px">
						<s:textfield name="organizationcode" cssClass="TextBox " 
							cssStyle="width: 240px;height:20px"
							theme="simple"></s:textfield>
					</td>
					<td align="left" class="Main_Tab_Style_title"
						style="width: 150px; height: 20px;">
						法人：
					</td>
					<td align="left" class="Main_Tab_Style_Content" width="270px">
						<s:textfield name="fictitiousman" cssClass="TextBox "
							cssStyle="width: 240px;height:20px" theme="simple"></s:textfield>

					</td>
				</tr>
				<tr>
					<!-- <td align="left" class="Main_Tab_Style_title"
						style="width: 150px; height: 20px;">
						手机：
					</td>
					<td align="left" class="Main_Tab_Style_Content" width="270px">
						<s:textfield name="mobilephone" cssClass="TextBox"
							cssStyle="width: 240px;height:20px" theme="simple"></s:textfield>

					</td>
				 -->
				 	<td align="left" class="Main_Tab_Style_title"
						style="width: 150px; height: 20px;">
						邮箱：
					</td>
					<td align="left" class="Main_Tab_Style_Content" width="270px">
						<s:textfield name="email" cssClass="TextBox " 
							cssStyle="width: 240px;height:20px" theme="simple"></s:textfield>

					</td>
					<td align="left" class="Main_Tab_Style_title"
						style="width: 150px; height: 20px;">
						传真：
					</td>
					<td align="left" class="Main_Tab_Style_Content" width="270px">
						<s:textfield name="fax" cssClass="TextBox"
							cssStyle="width: 240px;height:20px" theme="simple"></s:textfield>
					</td>
					</tr>
				<tr>
					<td align="left" class="Main_Tab_Style_title"
						style="width: 150px; height: 20px;">
						详细地址：
					</td>
					<td align="left" class="Main_Tab_Style_Content" width="270px">
						<s:textfield name="address" cssClass="TextBox"
							cssStyle="width: 240px;height:20px" theme="simple"></s:textfield>

					</td>
			
					<td align="left" class="Main_Tab_Style_title"
						style="width: 150px; height: 20px;">
						邮编：
					</td>
					<td align="left" class="Main_Tab_Style_Content" width="270px">
						<s:textfield name="postalcode" cssClass="TextBox"
							cssStyle="width: 240px;height:20px" theme="simple"></s:textfield>
					</td>
				</tr>
				<tr>
					<td align="left" class="Main_Tab_Style_title"
						style="width: 150px; height: 20px;">
						企业类型：
					</td>
					<td align="left" class="Main_Tab_Style_Content" width="270px">						
						<s:select list="pollutionsourcetypeList" listKey="%{sourcetypecode}" listValue="%{sourcetypename}" 
						 cssClass="TextBox "   name="pollutionsourcetype.sourcetypecode"  theme="simple" cssStyle="width: 240px;height:20px">
						</s:select>
					</td>
					<td align="left" class="Main_Tab_Style_title"
						style="width: 150px; height: 20px;">
						企业规模：
					</td>
					<td align="left" class="Main_Tab_Style_Content" width="270px">
						<s:select list="scaleList" listKey="%{scalecode}" listValue="%{scalename}" 
						 cssClass="TextBox "  name="scale.scalecode"  theme="simple" cssStyle="width: 240px;height:20px">
						</s:select>
					</td>					
				</tr>
				
				<tr>
					<td align="left" class="Main_Tab_Style_title"
						style="width: 150px; height: 20px;">
						经度：
					</td>
					<td align="left" class="Main_Tab_Style_Content" width="270px">
						<s:textfield name="longitude" cssClass="TextBox"
							cssStyle="width: 240px;height:20px" theme="simple"></s:textfield>
					</td>
					<td align="left" class="Main_Tab_Style_title"
						style="width: 150px; height: 20px;">
						纬度：
					</td>
					<td align="left" class="Main_Tab_Style_Content" width="270px">
						<s:textfield name="latitude" cssClass="TextBox"
							cssStyle="width: 240px;height:20px" theme="simple"></s:textfield>
					</td>
				</tr>	
				<tr>
					<td align="left" class="Main_Tab_Style_title"
						style="width: 150px; height: 20px;">
						App 应用：
					</td>
					<td align="left" class="Main_Tab_Style_Content" width="270px">
						<select id="itemtypeid" name="itemtypeid" style="width:180px"  class="TextBox grkj-validate"
						 validateParam="{type:'string',required:'true',message:'请选择项目大类！'}">
						<option value="" >---请选择---</option>
							<c:forEach items="${appList}" var="app">
								<option value="${app.appinfoid }"  
									<c:if test="${app.appinfoid==entity.appinfo.appinfoid }">selected="selected"</c:if>
									>${app.appinfoname }
								</option> 
							</c:forEach>
						</select>
					</td>
					<td align="left" class="Main_Tab_Style_title"
						style="width: 147px; height: 20px;">
					</td>
					<td align="left" class="Main_Tab_Style_Content" width="230px">
					</td>
				</tr>	
				<!-- 		
				<tr>
					<td align="left" class="Main_Tab_Style_title"
						style="width: 150px; height: 20px;">
						行业类型：
					</td>
					<td align="left" class="Main_Tab_Style_Content" width="270px">
						<input type="hidden" id="industrytypecode" name="industry.industrytypecode" value="${industry.industrytypecode}">
						<input type="text" id="industrytypename" name="industry.industrytypename" class="TextBox"
						   Style="width: 240px;height:20px" 	value="${industry.industrytypename}">
					</td>				
					<td align="left" class="Main_Tab_Style_title"
						style="width: 150px; height: 20px;">
						登记注册类型：
					</td>
					<td align="left" class="Main_Tab_Style_Content" width="270px">
						<s:select list="registertypeList" listKey="%{registertypecode}" listValue="%{registertypename}" 
						 cssClass="TextBox "  name="registertype.registertypecode"  theme="simple" cssStyle="width: 240px;height:20px">
						</s:select>
					</td>
				</tr>
				<tr>
					<td align="left" class="Main_Tab_Style_title"
						style="width: 150px; height: 20px;">
						废水口排放数量：
					</td>
					<td align="left" class="Main_Tab_Style_Content" width="270px">
						<s:textfield name="wastewaterletnum" cssClass="TextBox"
							cssStyle="width: 240px;height:20px" theme="simple"></s:textfield>
					</td>	
					<td align="left" class="Main_Tab_Style_title"
						style="width: 150px; height: 20px;">
						废气口排放数量：
					</td>
					<td align="left" class="Main_Tab_Style_Content" width="270px">
						<s:textfield name="gasletnum" cssClass="TextBox"
							cssStyle="width: 240px;height:20px" theme="simple"></s:textfield>
					</td>
				</tr>
				<tr>
					<td align="left" class="Main_Tab_Style_title"
						style="width: 150px; height: 20px;">
						无组织排放点数量：
					</td>
					<td align="left" class="Main_Tab_Style_Content" width="270px">
						<s:textfield name="noorganizationletnum" cssClass="TextBox"
							cssStyle="width: 240px;height:20px" theme="simple"></s:textfield>
					</td>
					<td align="left" class="Main_Tab_Style_title"
						style="width: 150px; height: 20px;">
						工艺处理描述：
					</td>
					<td align="left" class="Main_Tab_Style_Content" width="270px">
						<s:textfield name="fabricationprocess" cssClass="TextBox"
							cssStyle="width: 240px;height:20px" theme="simple"></s:textfield>

					</td>
				</tr>
				<tr>
				<td align="left" class="Main_Tab_Style_title"
						style="width: 150px; height: 20px;">
						是否污水处理厂：
					</td>
					<td align="left" class="Main_Tab_Style_Content" width="270px">
						<select class="TextBox  grkj-validate" id="issewageplant" name="issewageplant" style="width: 240px;height:20px"
	               		 	validateParam="{type:'string',required:'true',message:'请选择是否污水处理厂！'}">
	               		 		<option value=""></option>
	               		 		<option value="0" <c:if test="${issewageplant=='0' }">selected="selected"</c:if>>否</option>
								<option value="1" <c:if test="${issewageplant=='1' }">selected="selected"</c:if>>是</option>
						</select>
					</td>
					<td align="left" class="Main_Tab_Style_title"
						style="width: 150px; height: 20px;">
						开业时间：
					</td>
					<td align="left" class="Main_Tab_Style_Content" width="270px">
						<s:textfield name="practicedate" cssClass="TextBox"
							cssStyle="width: 240px;height:20px" theme="simple" disabled="true">
							<s:param name="value">
							<s:date name="practicedate" format="yyyy-MM-dd"/>
							</s:param>
							</s:textfield>
					</td>
				</tr>
					<tr>
					<td align="left" class="Main_Tab_Style_title"
						style="width: 150px; height: 20px;">
						关注类型：
					</td>
					<td align="left" class="Main_Tab_Style_Content" width="270px">
						<s:select list="dictionaryinfoList" listKey="%{dinfoid}" listValue="%{dinfoname}" 
						 cssClass="TextBox "  name="attention.dinfoid"  theme="simple" cssStyle="width: 240px;height:20px">
						</s:select>
					</td>
				</tr>
				 -->
				<tr> 
					<td align="left" class="Main_Tab_Style_title"
						style="width: 150px; height: 20px;">
						备注：
					</td>
					<td colspan="3" align="left" class="Main_Tab_Style_Content">
					<textarea rows="5" cols="3"  name="remark" id="remark" class="TextBox"  disabled="disabled"
							style="width: 96%; height: 80px" >${remark }</textarea>
					</td>
				</tr>
			</table>				
			</form>
	</body>
</html>
