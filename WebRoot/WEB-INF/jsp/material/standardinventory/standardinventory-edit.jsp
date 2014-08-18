<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ include file="/common/taglibs.jsp"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
		<title>物品入库编辑</title>

		<link rel="stylesheet" href="${ctx}/themes/default/easyui.css"
			type="text/css" />
		<link rel="stylesheet" type="text/css" href="${ctx}/themes/icon.css" />
		<link rel="stylesheet" type="text/css" href="${ctx}/validate/validate.css" />
		<script type="text/javascript" src="${ctx}/js/jquery-1.7.2.min.js"></script>
		<script type="text/javascript" src="${ctx}/js/jquery.easyui.min.js"></script>
		<script type="text/javascript" src="${ctx}/js/easyui-lang-zh_CN.js"></script>
		<script type="text/javascript" src="${ctx}/validate/input.validate.js"></script>
		<script type="text/javascript"src="${ctx}/js/DatePicker/WdatePicker.js"></script>
		<link rel="stylesheet"	href="${ctx}/js/DatePicker/skin/WdatePicker.css" type="text/css" />
		<script type="text/javascript" src="${ctx}/js/jquery.MultiFile.js"></script>
		<script type="text/javascript"src="${ctx}/lims/js/material/standardinventory/inventory-selmatname.js"></script>
		<script type="text/javascript"src="${ctx}/lims/js/material/standardinventory/standinventory-edit.js"></script>
		<script language="javascript">
			var rootPath="${ctx}";	
		</script>
	</head>
	<body onkeydown="PreventBSK();">
		<form id="putstorframe" method="post" enctype="multipart/form-data">
			<table width="100%" border="1" align="center" class="grid">
				<tr>
					<td align="left" class="Main_Tab_Style_title"
						style="width: 100px; height: 20px;">
						标准物质名称：
					</td>
					<td align="left" class="Main_Tab_Style_Content" style="width: 200px; height: 20px;">
						<input type="text" name="materialname" id="materialname"
						readonly="readonly"	class="TextBox" 
						value="${material.materialname}"  style="width: 180px; height: 20px;" />
						<input type="hidden" name="materialid" id="materialid"value="${material.materialid}"/>
						<input type="hidden" name="id" id="id" value="${inventoryid}"/>
						<input type="hidden" name="inventoryid" id="inventoryid"value="${inventoryid}"/>
					</td>
					<td align="left" class="Main_Tab_Style_title"
						style="width: 100px; height: 20px;">
						规格型号：
					</td>
					<td align="left" class="Main_Tab_Style_Content" width="200px;">
					<input type="text"  name="modelname"  class="TextBox"   value="${materialmodel.modelname}" style="width: 180px; height: 20px;" readonly="readonly"/>
					</td>
				</tr>
				<tr>
					<td align="left" class="Main_Tab_Style_title"
						style="width: 100px; height: 20px;">
						批号：
					</td>
					<td align="left" class="Main_Tab_Style_Content">
						<input type="text" name="batchno"
								class="TextBox grkj-validate" validateParam="{type:'string',maxLength:'40',required:'false',message:'长度不超过40个字符！'}"	   
							value="${batchno}"
							style="width: 180px; height: 20px;" />
					</td>
					<td align="left" class="Main_Tab_Style_title"
						style="width: 100px; height: 20px;">
						稀释倍数：
					</td>
					<td align="left" class="Main_Tab_Style_Content">
						<input type="text" name="dilutionmultiple"
							value="${dilutionmultiple}" class="TextBox grkj-validate" validateParam="{type:'string',maxLength:'40',required:'false',message:'长度不超过40个字符！'}"	
							style="width: 180px;" />
					</td>
					
				</tr>
				<tr>
					<td align="left" class="Main_Tab_Style_title"
						style="width: 100px; height: 20px;">
						浓度：
					</td>
					<td align="left" class="Main_Tab_Style_Content"  colspan="3">
						<input type="text" name="consistence"
							value="${consistence}"
							class="TextBox grkj-validate" validateParam="{type:'string',maxLength:'200',required:'true',message:'请输入准确的浓度，长度不超过200个字符！'}"	 style="width: 487px;" /> 
							<font color="red" size="4px">*</font>
					</td>
				</tr>
				<tr>
					<td align="left" class="Main_Tab_Style_title"
						style="width: 100px; height: 20px;">
						不确定度：
					</td>
					<td align="left" class="Main_Tab_Style_Content"   colspan="3" >
						<input type="text" name="uncertainty"
							value="${uncertainty}" class="TextBox grkj-validate" validateParam="{type:'string',maxLength:'200',required:'false',message:'请输入准确的不确定度，长度不超过200个字符！'}"	
							style="width: 487px;" />
					</td>
					</tr>
					<tr>
				<td align="left" class="Main_Tab_Style_title"
							style="width: 100px; height: 20px;">
							浓度单位：
						</td>
							<td align="left" class="Main_Tab_Style_Content">
							<select  id="unitname" name="unitname" style="width: 180px;height:20px" class="TextBox grkj-validate" 	validateParam="{type:'string',required:'true',message:'请选择浓度单位！'}" >
								<option value="">	---请选择---	</option>
								<c:forEach var="unitList1" items="${unitList }">
								<option value="${unitList1.unitname}" 
								<c:if test="${unitList1.unitname==unitname}">selected="selected"</c:if>>${unitList1.unitname}</option>
								</c:forEach>
							</select>
							<font color="red" size="4px">*</font>
						</td> 
						<td align="left" class="Main_Tab_Style_title"
						style="width: 100px; height: 20px;">
						保管人：
					</td>
					<td align="left" class="Main_Tab_Style_Content">
								<input type="text" name="useperson" id="useperson" class="TextBoxPic" onclick="showName()" value="${userinfo.realname }"
	                            onclick="showName()" 	 value="${useperson}" style="width: 180px; height: 20px;" />
							<input type="hidden" name="userid" id="userid" class="TextBox"
									 value="${userid}" style="width: 180px; height: 20px;" />
					</td>
				</tr>
				<tr>
					<td align="left" class="Main_Tab_Style_title"
						style="width: 100px; height: 20px;">
						失效日期：
					</td>
					<td align="left" class="Main_Tab_Style_Content">
						<input type="text" name="expirationdate"
							onClick="showDataTimeDailog('yyyy-MM-dd');"
							class="Wdate"
							value="${expirationdate}" style="width: 180px;" />
					</td>
					<td align="left" class="Main_Tab_Style_title"
							style="width: 100px; height: 20px;">
							仓库：
						</td>
					 <td align="left" class="Main_Tab_Style_Content">
							<select class="TextBox grkj-validate" name="materialinventory.warehouseid.warehouseid" 	validateParam="{type:'string',required:'true',message:'请选择仓库！'}" 
								style="width: 180px; height: 20px">
								<option value="">
									---请选择---
								</option>
								<c:forEach var="pList" items="${warehouseList }">
									<option value="${pList.warehouseid}" <c:if test="${pList.warehouseid==warehouseid.warehouseid}">selected="selected"</c:if>>
										${pList.warehousename}
									</option>
								</c:forEach>
							</select>
							<font color="red" size="4px">*</font>
				 	</td>
				</tr>
				<tr>
				<td align="left" class="Main_Tab_Style_title"
						style="width: 100px; height: 20px;">
						入库数量：
					</td>
					<td align="left" class="Main_Tab_Style_Content">
						<input type="text" name="storagenum"
							value="${storagenum}"	class="TextBox" readonly="readonly"
								 style="width: 180px;" /> 
					</td>
					<td align="left" class="Main_Tab_Style_title"
						style="width: 100px; height: 20px;">
						入库时间：
					</td>
					<td align="left" class="Main_Tab_Style_Content">
						<input type="text" name="isten"
							value="${storageTime}"	class="Wdate" onClick="showDataTimeDailog('yyyy-MM-dd HH:mm');"
						validateParam="{type:'string',required:'true',message:'入库时间不能为空！'}"
								 style="width: 180px;" />
								 <font color="red" size="4px">*</font>
					</td>
				</tr>
				<tr>
					<td align="left" class="Main_Tab_Style_title"
						style="width: 100px; height: 20px;">
						剩余数量：
					</td>
					<td align="left" class="Main_Tab_Style_Content" style="width: 200px; height: 20px;" >
						<input type="text" name="remainingnum" id="remainingnum" validateParam="{type:'int',required:'true',message:'入库数量必须为数字且不能为空！'}"
						class="TextBox grkj-validate"  style="width: 180px; height: 20px;"  value="${remainingnum}"/>
					<font color="red" size="4px">*</font>
						
					</td>
				</tr>
				<tr>
					<td align="left" class="Main_Tab_Style_title"
						style="width: 100px; height: 20px;">
						存放位置：
					</td>
					<td align="left" class="Main_Tab_Style_Content">
						<input type="text" name="depositplace"
								class="TextBox grkj-validate" validateParam="{type:'string',maxLength:'40',required:'false',message:'长度不超过40个字符！'}"	   
							value="${depositplace}"
							style="width: 180px; height: 20px;" />
					</td>
					<td align="left" class="Main_Tab_Style_title"
						style="width: 100px; height: 20px;">
						存放条件：
					</td>
					<td align="left" class="Main_Tab_Style_Content">
						<input type="text" name="depositcondition"
							class="TextBox grkj-validate" validateParam="{type:'string',maxLength:'100',required:'false',message:'长度不超过100个字符！'}"
							value="${depositcondition}"
							style="width: 180px; height: 20px;" />
					</td>
				</tr>
				<tr>
					<td align="left" class="Main_Tab_Style_title"
						style="width: 100px; height: 20px;">
						供应商：
					</td>
					<td align="left" class="Main_Tab_Style_Content" style="width: 500px; height: 20px;" colspan="3">
						<input type="text" name="providername" id="providername"
						class="TextBoxPic"  style="width: 487px; height: 20px;" onclick="selecTmaterialFocus()" value="${providerid.providername}"/>
						<input type="hidden" name="materialinventory.providerid.providerid" id="providerid"
						class="TextBox"  value="${providerid.providerid}"/>
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
							style="width:487px; height: 60px;"name="remark">${remark}</textarea>
					</td>
				</tr>
				<tr>
					<td  align="left" class="Main_Tab_Style_title" width="100px">附件：</td>
					<td  align="left" class="Main_Tab_Style_Content" colspan="3">
						<s:file name="file" size="63" label="上传" theme="simple" cssClass="multi"></s:file>
						<input name="attanchment" value="${attanchment }" type="hidden" id="attanchment">
					</td>
				</tr>
				<tr>
				<td  align="left" class="Main_Tab_Style_title" width="100px">已上传附件：</td>
					<td align="left" class="Main_Tab_Style_Content" style="" colspan="3">
						<div >
							<table style="width: 100%;height: 100%; size: 12px">
							<c:forEach items="${listname}" var="trainperson" varStatus="count" > 
								<tr id="wenjian${count.count}">
								<td align="left" style="color:#1281bb;cursor:pointer;font-size:13px;">
								<a onclick="download('${trainperson.certificateno }','${count.count}')">${trainperson.trainresult }</a></td>
								 <td align="right"><input type="button" onclick="delefujian('${trainperson.certificateno }','${count.count}')" name="delbutton" value="删除"  class="Button_out" /></td>
								 </tr>
								</c:forEach>
							</table>
						</div>
					</td>
				</tr> 
			</table>
		</form>
		<form id="methoddownload" method="post" action ="${ctx}/trainplan/trainrecord/trainrecord!downLoad.action">
		<input type="hidden" value="1" name="flg"/>
		<input type="hidden" value="" name="path" id="path"/>
	</form>
		
	</body>
</html>
