<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ include file="/common/taglibs.jsp" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>物品信息</title>
	<link rel="stylesheet" href="${ctx}/themes/default/easyui.css" type="text/css" />
		<link rel="stylesheet" href="${ctx}/validate/validate.css" type="text/css" />
		<link rel="stylesheet" type="text/css" href="${ctx}/themes/icon.css">
		<script type="text/javascript" src="${ctx}/js/jquery-1.7.2.min.js"></script>
		<script type="text/javascript" src="${ctx}/js/jquery.easyui.min.js"></script>
		<script type="text/javascript" src="${ctx}/js/easyui-lang-zh_CN.js"></script>
		<script type="text/javascript" src="${ctx}/js/CommonCheck.js"></script>
		<script type="text/javascript" src="${ctx}/validate/input.validate.js"></script>
		<script language="JavaScript" type="text/javascript">
		var rootPath="${ctx}";
		var isStandFlag="${isStandFlag}";
   		 </script>
	    <script type="text/javascript" src="${ctx}/lims/js/material/materials.js"></script>
	    <script language="JavaScript" type="text/javascript">
			$(document).ready(function(){
				bigTypeData();
				var deptidvalue = $("#dalei").val();//大类
				if(deptidvalue!=""){
					$("#materialtypeid").val('');
					$("#materialtypeid").html('');
					smallTypeData();
				}
					
				$("#dalei").change(function(){
					$("#materialtypeid").val('');
					$("#materialtypeid").html('');
	               	smallTypeData();
	            });
			});	
	    </script>
  </head>
	<body onkeydown="PreventBSK();">
		<form action="" id="materialsForm" method="post" >
		<input type="hidden"  name="materials.materialid" value="${materials.materialid}"/>
		<input type="hidden" id="flagName" name="flagName" value="${materials.materialname}"/>
		<input type="hidden" id="bigType" name="" value="${meaterialcategoryid.id}"/>
		<input type="hidden" id="smallType" name="" value="${materialstype.materialtypeid}"/>
			<table width="100%" border="1" align="center" class="grid">
				<tr>
					<td align="left" class="Main_Tab_Style_title"
						style="width: 100px; height: 20px;">
						物品名称：
					</td>
					<td align="left" class="Main_Tab_Style_Content" width="220px">
					<input type="text"  name="equalsName"  class="TextBox grkj-validate" validateParam="{type:'string',maxLength:'100',required:'true',message:'请输入物品名称，长度不超过100个字符！'}"	   
					  value="${materials.materialname}" style="width:200px; height: 20px;" /> <font color="red" size="4px">*</font>
					</td>
				</tr>
				<tr>
						<td align="left" class="Main_Tab_Style_title"
						style="width: 100px; height: 20px;">
							计量单位：
						</td>
								<td align="left" class="Main_Tab_Style_Content" width="220px">
							<select class="TextBox " id="unitid" name="unitid" style="width: 200px;height:20px">
								<option value="">	---请选择---	</option>
								<c:forEach var="unitList1" items="${unitList }">
								<option value="${unitList1.unitid}" 
								<c:if test="${unitList1.unitid==unit.unitid}">selected="selected"</c:if>>${unitList1.unitname}</option>
								</c:forEach>
							</select>
						</td>
				</tr>
				<tr>
					<td align="left" class="Main_Tab_Style_title"
						style="width: 100px; height: 20px;">
						物品大类：
					</td>
					<td align="left" class="Main_Tab_Style_Content">
						<select  class="TextBox grkj-validate"  id="dalei" name="materials.meaterialcategoryid.id"  style="width:200px;height:20px" 
						validateParam="{type:'string',required:'true',message:'请选择物品大类！'}" >
						</select> <font color="red" size="4px">*</font>
					</td>
				</tr>
				<tr>
					<td align="left" class="Main_Tab_Style_title"
						style="width: 100px; height: 20px;">
						物品小类：
					</td>
					<td align="left" class="Main_Tab_Style_Content" >
						<select  class="TextBox grkj-validate"  id="materialtypeid" name="materials.materialstype.materialtypeid"  
						style="width: 200px;height:20px"validateParam="{type:'string',required:'true',message:'请选择物品小类！'}" 
						>
						<option value=''>---请选择---</option>
						</select> <font color="red" size="4px">*</font>
					</td>
				</tr>	
				<tr>
						<td align="left" class="Main_Tab_Style_title"	style="width: 100px; height: 20px;">
							库存上限：
						</td>
						<td align="left" class="Main_Tab_Style_Content">
							<input id="stocklowerlimit" name="stocklowerlimit" value="${stocklowerlimit}"  class="TextBox grkj-validate"   validateParam="{type:'double',required:'false',message:'只能输入数字！'}"   	Style="width: 200px;height:20px" />
						</td>
				</tr>
				<tr>
						<td align="left" class="Main_Tab_Style_title"	style="width: 100px; height: 20px;">
							库存下限：
						</td>
						<td align="left" class="Main_Tab_Style_Content">
							<input id="stockupperlimit" name="stockupperlimit" value="${stockupperlimit}"  class="TextBox grkj-validate"   validateParam="{type:'double',required:'false',message:'只能输入数字！'}"  Style="width: 200px;height:20px" />
						</td>
				</tr>
				<tr>
						<td align="left" class="Main_Tab_Style_title"	style="width: 100px; height: 20px;">
							过期提前<br>提醒天数：
						</td>
						<td align="left" class="Main_Tab_Style_Content">
							<input id="duoreminddays" name="duoreminddays" value="${duoreminddays}"  class="TextBox grkj-validate"   validateParam="{type:'int',required:'false',message:'只能输入整数！'}"   Style="width: 200px;height:20px" />
						</td>
				</tr>
				<tr>
						<td align="left" class="Main_Tab_Style_title"	style="width: 100px; height: 20px;">
							序号：
						</td>
						<td align="left" class="Main_Tab_Style_Content">
							<input id="orderid" name="materials.orderid" value="${materials.orderid}"  class="TextBox grkj-validate"   validateParam="{type:'int',required:'false',message:'只能输入整数！'}"   Style="width: 200px;height:20px" />
						</td>
				</tr>
				<tr>
					<td align="left" class="Main_Tab_Style_title"
						style="width: 100px; height: 20px;">
						备注：
					</td>
					<td colspan="3" align="left" class="Main_Tab_Style_Content">
					<textarea class="TextBox grkj-validate"  
							validateParam="{type:'string',maxLength:'500',required:'false',message:'长度不超过500个字符！'}" 
								 style="width: 200px;height:80px"  name="materials.remark" >${materials.remark}</textarea>
					</td>
				</tr>
			</table>
		</form>

	</body>
</html>
