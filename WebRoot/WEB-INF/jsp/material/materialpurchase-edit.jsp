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
		<script language="javascript" >
			var rootPath="${ctx}";	
				$(function(){
				$('#countfocus').focus();
			})
		</script>		
	</head>
	<body onkeydown="PreventBSK();">
		<form id="materialframe" method="post">
			<input type="hidden" name="id" value="${materialpurchase.purchasematerialid}"/>
			<input type="hidden" name="materials.materialid" value="${materials.materialid}"/>
			<input type="hidden" name="dept.deptid" value="${dept.deptid}"/>
			<input type="hidden" name="userinfo.userid" value="${userinfo.userid}"/>
			<input type="hidden" name="materialpurchase.status" value="${materialpurchase.status}"/>
			<table width="100%" border="1" align="center" class="grid">
				<tr>
					<td align="left" class="Main_Tab_Style_title" style="width: 150px; height: 20px;">
						物品名称：
					</td>
					<td align="left" class="Main_Tab_Style_Content">
						<input type="hidden" name="materials.materialname" value="${materialpurchase.materialid.materialname}" />
						<input type="text" class="TextBox" value="${materialpurchase.materialid.materialname}" disabled="true" style="width: 180px; height: 20px;" />
					</td>
					<td align="left" class="Main_Tab_Style_title" style="width: 150px; height: 20px;">
						规格型号：
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
						<input type="text" name="materialpurchase.applynumber" class="TextBox  grkj-validate"    validateParam="{type:'int',required:'false',message:'请输入准确的申请数量！'}"  id="countfocus" value="${materialpurchase.applynumber}" style="width: 180px; height: 20px;" />
					</td>
					
					<td align="left" class="Main_Tab_Style_title" style="width: 150px; height: 20px;">
						期望到货时间：
					</td>
					<td align="left" class="Main_Tab_Style_Content">
						<input type="text" name="materialpurchase.hopedate" value="${materialpurchase.hopedate}" onClick="showDataTimeDailog('yyyy-MM-dd');" class="Wdate" style="width:180px;"/>
					</td>
					
				</tr>
				<tr>
					<td align="left" class="Main_Tab_Style_title" style="width: 150px; height: 20px;">
						申请科室：
					</td>
					<td align="left" class="Main_Tab_Style_Content">
						<input type="hidden" name="dept.deptname" value="${dept.deptname}" />
						<input type="text" class="TextBox" value="${dept.deptname}" disabled="true" style="width: 180px; height: 20px;" />
					</td>
					
					<td align="left" class="Main_Tab_Style_title" style="width: 150px; height: 20px;">
						申请人：
					</td>
					<td align="left" class="Main_Tab_Style_Content">
						<input type="hidden" name="userinfo.realname" value="${userinfo.realname}"/>
						<input type="text" class="TextBox" value="${userinfo.realname}"  disabled="true" style="width: 180px; height: 20px;" />
					</td>
				</tr>
				<tr>
					<td align="left" class="Main_Tab_Style_title" style="width: 150px; height: 20px;">
						申请时间：
					</td>
					<td align="left" class="Main_Tab_Style_Content">
						<input type="hidden" name="applydate" value="${materialpurchase.applydate}"/>
						<input type="text" class="Wdate" disabled="true" value="${materialpurchase.applydate}" style="width:180px;"/>
					</td>
			
					<td align="left" class="Main_Tab_Style_title" style="width: 150px; height: 20px;">
					</td>
					<td align="left" class="Main_Tab_Style_Content">
						
					</td>
				</tr>
				<input type="hidden" name="materialpurchase.reallydate" value="${materialpurchase.reallydate}" />
				<input type="hidden" name="materialpurchase.reallynumber" value="${materialpurchase.reallynumber}" />
					
			</table>
		</form>
	</body>
</html>
