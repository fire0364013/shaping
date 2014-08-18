<%@ page language="java" import="java.util.*" import="java.sql.*" pageEncoding="utf-8"%>
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
		<script language="javascript">
			var rootPath="${ctx}";	
			$(function(){
				initMixDataGrid();
			})
			//弹出选择供应商 页面
			function selecTmaterialFocus(){
				var providername=encodeURIComponent(encodeURIComponent($("#providername").val()));
				var providerid=$("#providerid").val();
			var url =  rootPath +"/material/providerinfo/providerinfo!selectList.action?providername="+providername+"&providerid="+providerid;
			var _dialog =  window.top.$('<div id ="cert-dlg" style="padding:0px;"><iframe id="purchaseFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
			_dialog.dialog({
				title:'供应商',
				autoOpen:false,
				modal:true,
				closed:true,
				width:'800',
				height:'500',
				buttons:[{
					text:'确定',
					iconCls:'icon-save',
					handler:function(){		
					var selectedUser=$("#purchaseFrame",top.document.body).contents().find("#selectedUser").val();//保管人
					$("#providername").val(selectedUser);
					var selectedUserid=$("#purchaseFrame",top.document.body).contents().find("#selectedUserid").val();//id
					$("#providerid").val(selectedUserid);
					_dialog.dialog('close');
					}
				},{
					text:'取消',
					iconCls:'icon-cancel',
					handler:function(){
						_dialog.dialog('close');
					}
				}],
				onClose:function(){
					_dialog.dialog("destroy");
					
				}
			});
			_dialog.dialog('open');	
		}
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
						readonly="readonly" 	class="TextBoxPic grkj-validate" validateParam="{type:'String',required:'true',message:'物品名称不能为空！'}" 
							value="${materialname}" onclick="showmaterialName()" style="width: 180px; height: 20px;" />
						<font color="red" size="4px">*</font>
						<input type="hidden" name="materialid" id="materialid"
							class="TextBox" value="${materialid}"
							style="width: 180px; height: 20px;" />
					</td>
					
					<td align="left" class="Main_Tab_Style_title"
						style="width: 100px; height: 20px;">
						规格型号：
					</td>
					<td align="left" class="Main_Tab_Style_Content" width="150px">
					<input type="text" id="modelname"   class="TextBox"   value="${materialmodel.modelname}" style="width: 180px; height: 20px;" readonly="readonly"/>
					<input type="hidden" id="modelid" name="modelid"  class="TextBox"   style="width: 200px; height: 20px;"/>
					</td>
				</tr>
				<tr>
					<td align="left" class="Main_Tab_Style_title"
						style="width: 100px; height: 20px;">
						批号：
					</td>
					<td align="left" class="Main_Tab_Style_Content" colspan="3">
						<select id="batchno" class="TextBox" style="width: 180px; height: 20px;" onchange="batchnoChange();">
						<option value="">---请选择---</option>
						</select>
						<input type="text" id="batchnotext" name="batchno" validateParam="{type:'string',required:'true',message:'请填写批号'}" class="TextBox grkj-validate" value="${materialinventory.batchno}" style="width: 300px; height: 20px;" />
						<font color="red" size="4px">*</font>
					</td>
					</tr>
					<tr>
					<td align="left" class="Main_Tab_Style_title"
						style="width: 100px; height: 20px;">
						浓度：
					</td>
					<td align="left" class="Main_Tab_Style_Content" colspan="3">
						<input type="text" name="consistence"  id="consistence"
							value="${consistence}"
							class="TextBox grkj-validate" validateParam="{type:'string',maxLength:'200',required:'true',message:'请输入准确的浓度，长度不超过200个字符！'}"	 style="width: 487px;" /> 
							<font color="red" size="4px">*</font>
					</td>
					</tr>
					<tr>
					<td align="left" class="Main_Tab_Style_title"
						style="width: 100px; height: 20px;">
						稀释倍数：
					</td>
					<td align="left" class="Main_Tab_Style_Content" colspan="3">
						<input type="text" name="dilutionmultiple" id="dilutionmultiple"
							value="10→50" class="TextBox grkj-validate" validateParam="{type:'string',maxLength:'50',required:'false',message:'长度不超过40个字符！'}"	
							style="width: 487px;" />
					</td>
				</tr> 
				<tr>
					<td align="left" class="Main_Tab_Style_title"
						style="width: 100px; height: 20px;">
						不确定度：
					</td>
					<td align="left" class="Main_Tab_Style_Content" colspan="3">
						<input type="text" name="uncertainty" id="uncertainty"
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
								<c:if test="${unitList1.unitid==unit.unitid}">selected="selected"</c:if>>${unitList1.unitname}</option>
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
	                             value="${useperson}" style="width: 180px; height: 20px;" />
							<input type="hidden" name="userid" id="userid" class="TextBox"
									 value="${userid}" style="width: 200px; height: 20px;" />
					</td>
				</tr>
				<tr>
					<td align="left" class="Main_Tab_Style_title"
						style="width: 100px; height: 20px;">
						失效日期：
					</td>
					<td align="left" class="Main_Tab_Style_Content">
						<input type="text" name="expirationdate" id="expirationdate"
							onClick="showDataTimeDailog('yyyy-MM-dd');"
							class="Wdate grkj-validate"
							validateParam="{type:'string',required:'true',message:'失效日期不能为空！'}"
							value="${expirationdate}" style="width: 180px;" />
							<font color="red" size="4px">*</font>
					</td>
					<td align="left" class="Main_Tab_Style_title"
							style="width: 100px; height: 20px;">
							仓库：
						</td>
					 <td align="left" class="Main_Tab_Style_Content">
							<select id="warehouse" class="TextBox grkj-validate" name="materialinventory.warehouseid.warehouseid" 	validateParam="{type:'string',required:'true',message:'请选择仓库！'}" 
								style="width: 180px; height: 20px">
								<option value="">
									---请选择---
								</option>
								<c:forEach var="pList" items="${warehouseList }">
									<option value="${pList.warehouseid}">
										${pList.warehousename}
									</option>
								</c:forEach>
							</select> <font color="red" size="4px">*</font>
				 	</td>
				</tr>
				<tr>
					<td align="left" class="Main_Tab_Style_title"
						style="width: 100px; height: 20px;">
						存放位置：
					</td>
					<td align="left" class="Main_Tab_Style_Content">
						<input type="text" name="depositplace" id="depositplace"
								class="TextBox grkj-validate" validateParam="{type:'string',maxLength:'40',required:'false',message:'长度不超过40个字符！'}"	   
							value="${depositplace}"
							style="width: 180px; height: 20px;" />
					</td>
					<td align="left" class="Main_Tab_Style_title"
						style="width: 100px; height: 20px;">
						存放条件：
					</td>
					<td align="left" class="Main_Tab_Style_Content" style="width:200px;height:20px;"">
						<input type="text" name="depositcondition" class="TextBox"  id="depositcondition"
							value="${depositcondition}" style="width: 180px; height: 20px;" />
					</td>
				</tr>
				<tr>
					
					<td align="left" class="Main_Tab_Style_title"
						style="width: 100px; height: 20px;">
						入库数量：
					</td>
					<td align="left" class="Main_Tab_Style_Content">
						<input type="text" name="storagenum" id="storagenum"
							value="${storagenum}"	class="TextBox grkj-validate"
						validateParam="{type:'int',required:'true',message:'入库数量必须为数字且不能为空！'}"
								 style="width: 180px;" />
								 <font color="red" size="4px">*</font>
					</td>
					<td align="left" class="Main_Tab_Style_title"
						style="width: 100px; height: 20px;">
						入库时间：
					</td>
					<td align="left" class="Main_Tab_Style_Content">
						<input type="text" name="isten"
							class="Wdate grkj-validate" onClick="showDataTimeDailog('yyyy-MM-dd HH:mm');"
						validateParam="{type:'string',required:'true',message:'入库时间不能为空！'}"
								 style="width: 180px;" />
								 <font color="red" size="4px">*</font>
					</td>
					
				</tr>
				<tr>
					<td align="left" class="Main_Tab_Style_title"
						style="width: 100px; height: 20px;">
						供应商：
					</td>
					<td align="left" class="Main_Tab_Style_Content" style="width: 200px; height: 20px;" colspan="3">
						<%--<select class="TextBox " name="materialinventory.providerid.providerid"
							style="width: 180px; height: 20px">
							<option value="">
								---请选择---
							</option>
							<c:forEach var="pList" items="${providerList }">
								<option value="${pList.providerid}">
									${pList.providername}
								</option>
							</c:forEach>
						</select>
					--%>
						<input type="text" name="providername" id="providername"
						class="TextBoxPic"  style="width: 487px; height: 20px;" onclick="selecTmaterialFocus()"/>
						<input type="hidden" name="materialinventory.providerid.providerid" id="providerid"
						class="TextBox"  />
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
							style="width:487px; height: 80px;"
							name="remark" id="remark" >${remark}</textarea>
					</td>
				</tr>
				<tr>
					<td  align="left" class="Main_Tab_Style_title" width="100px">附件：</td>
					<td  align="left" class="Main_Tab_Style_Content" colspan="3">
						<s:file name="file" size="63" label="上传" theme="simple" cssClass="multi"></s:file>
					</td>
					
				</tr>
			</table>
			<input type="hidden" name="mixid" id="mixid" onclick="initmixids()"/>
			<table width="100%" class="grid">
				<tr height="25" class="grid-header">
					<td colspan="6" style="text-align: left">
						<input type="button" value="添加" class="Button_out" onClick="addMixData()">
					</td>
				</tr>
			</table>
 	
			<div style="height: 200px;">
				<table id="mixdatalist"></table>
			</div>
		</form>
	</body>
</html>
