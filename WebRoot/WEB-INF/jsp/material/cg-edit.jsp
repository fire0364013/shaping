<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ include file="/common/taglibs.jsp"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
		<title>物品采购信息编辑</title>

		<link rel="stylesheet" href="${ctx}/themes/default/easyui.css"	type="text/css" />
		<link rel="stylesheet" type="text/css" href="${ctx}/themes/icon.css"/>
		<link rel="stylesheet" type="text/css"	href="${ctx}/validate/validate.css"/>
		<script type="text/javascript" src="${ctx}/js/jquery-1.7.2.min.js"></script>
		<script type="text/javascript" src="${ctx}/js/jquery.easyui.min.js"></script>
		<script type="text/javascript" src="${ctx}/js/easyui-lang-zh_CN.js"></script>
		<script type="text/javascript" src="${ctx}/validate/input.validate.js"></script>
		<script type="text/javascript" src="${ctx}/js/DatePicker/WdatePicker.js"></script>
		<link rel="stylesheet" href="${ctx}/js/DatePicker/skin/WdatePicker.css" type="text/css" />
		  <script type="text/javascript" src="${ctx}/lims/js/material/selectMaterialName.js"></script>
		<script language="javascript" >
			var rootPath="${ctx}";	
			$(function(){
				$('#datefocus').focus();
			})
		</script>		
	</head>
	<body onkeydown="PreventBSK();">
		<form id="materialframe" method="post">
			<input type="hidden" name="id" value="${materialpurchase.purchasematerialid}"/>
		<input type="hidden" name="materials.materialid" id="materialid" value="${materials.materialid}"/>
			<input type="hidden" name="dept.deptid" value="${dept.deptid}"/>
			<input type="hidden" name="userinfo.userid" value="${userinfo.userid}"/>
			<input type="hidden" name="materialpurchase.status" value="${materialpurchase.status}"/>
			<table width="100%" border="1" align="center" class="grid">
				<tr>
					<td align="left" class="Main_Tab_Style_title" style="width: 150px; height: 20px;">
						物品名称：
					</td>
					<td align="left" class="Main_Tab_Style_Content">
						<input type="hidden" name="materials.materialname" value="${materialpurchase.materialid.materialname}"/>
						<input type="text" id="materialname" class="TextBoxPic" value="${materialpurchase.materialid.materialname}" style="width: 180px; height: 20px;"  disabled="true"/>
					</td>
					<td align="left" class="Main_Tab_Style_title" style="width: 150px; height: 20px;">
						规格：
					</td>
					<td align="left" class="Main_Tab_Style_Content">
					<select class="TextBox " name="materialmodelid"
							style="width: 180px; height: 20px">
							<option value="">
								---请选择---
							</option>
							<c:forEach var="pList" items="${materialmodels }">
								<option value="${pList.materialmodelid}" <c:if test="${pList.materialmodelid==materialpurchase.materialmodel.materialmodelid }">selected="selected"</c:if>>
									${pList.modelname}
								</option>
							</c:forEach>
						</select>
					</td>					
				</tr>
				<tr>
					<td align="left" class="Main_Tab_Style_title" style="width: 150px; height: 20px;">
						申请数量：
					</td>
					<td align="left" class="Main_Tab_Style_Content">
						<input type="hidden" name="materialpurchase.applynumber" value="${materialpurchase.applynumber}" />
						<input type="text" id="applynumber" class="TextBox grkj-validate" disabled="true" value="${materialpurchase.applynumber}" style="width: 180px; height: 20px;" />
					</td>
					<td align="left" class="Main_Tab_Style_title" style="width: 150px; height: 20px;">
						购买数量：
					</td>
					<td align="left" class="Main_Tab_Style_Content">
						<input type="text" name="materialpurchase.reallynumber" value="${materialpurchase.reallynumber}" class="TextBox grkj-validate" 	validateParam="{type:'double',required:'true',message:'请输入准确的购买数量！'}"	 style="width:150px;"/>
						<font color="red" size="4px"> *</font>
					</td> 
					<tr>
					<td align="left" class="Main_Tab_Style_title" style="width: 150px; height: 20px;">
						申请人：
					</td>
					<td align="left" class="Main_Tab_Style_Content">
						<input type="hidden" name="userinfo.realname" value="${userinfo.realname}" />
						<input type="text" class="TextBox" value="${userinfo.realname}"  disabled="true" style="width: 180px; height: 20px;" />
					</td>
					<td align="left" class="Main_Tab_Style_title" style="width: 150px; height: 20px;">
						申请科室：
					</td>
					<td align="left" class="Main_Tab_Style_Content">
					<input type="hidden" name="dept.deptname" value="${dept.deptname}" />
					<input type="text" class="TextBox" value="${dept.deptname}" disabled="true" style="width: 180px; height: 20px;" />
					</td>
					</tr>
					<td align="left" class="Main_Tab_Style_title" style="width: 150px; height: 20px;">
						申请时间：
					</td>
					<td align="left" class="Main_Tab_Style_Content">
						<input type="hidden" name="materialpurchase.applydate" value="${materialpurchase.applydate}"/>
						<input type="text" disabled="true" class="Wdate"  value="${materialpurchase.applydate}" style="width:180px;"/>
					</td>
				
					<td align="left" class="Main_Tab_Style_title" style="width: 150px; height: 20px;">
						期望到货时间：
					</td>
					<td align="left" class="Main_Tab_Style_Content">
						<input type="hidden" name="materialpurchase.hopedate" value="${materialpurchase.hopedate}" />
						<input type="text" value="${materialpurchase.hopedate}" class="Wdate" style="width:180px;"  disabled="true"/>
					</td>
					</tr>
				<tr>
					<td align="left" class="Main_Tab_Style_title" style="width: 150px; height: 20px;">
						到货时间：
					</td>
					<td align="left" class="Main_Tab_Style_Content">
						<input type="text" name="materialpurchase.reallydate" value="${materialpurchase.reallydate}" id="datefocus" onClick="showDataTimeDailog('yyyy-MM-dd');" class="Wdate" style="width:180px;"/>
					</td>
					<td align="left" class="Main_Tab_Style_title" style="width: 60px; height: 20px;">
						供应商：
					</td>
					<td align="left" class="Main_Tab_Style_Content">
							<select class="TextBox " name="materialpurchase.providerid.providerid" style="width: 150px;height:20px">
							<option value="">---请选择---</option>
								<c:forEach var="pList" items="${providerList }">
								<option value="${pList.providerid}" <c:if test="${materialpurchase.providerid.providerid==pList.providerid}">selected="selected"</c:if>>${pList.providername}</option>
								</c:forEach>
						</select>
						<font color="red" size="4px"> *</font>
					</td>
					</tr>
				<tr>
				
				</tr> 
				
			</table>
		</form>
	</body>
</html>
