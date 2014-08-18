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
		<script type="text/javascript"src="${ctx}/lims/js/material/inventory-selmatname.js"></script>
		<script language="javascript">
			var rootPath="${ctx}";	
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
		<form id="putstorframe" method="post">
			<table width="100%" border="1" align="center" class="grid">
				<tr>
					<td align="left" class="Main_Tab_Style_title"
						style="width: 100px; height: 20px;">
						物品名称：
					</td>
					<td align="left" class="Main_Tab_Style_Content" style="width: 170px; height: 20px;">
						<input type="text" name="materialname" id="materialname"
						readonly="readonly" 	class="TextBoxPic grkj-validate" validateParam="{type:'String',required:'true',message:'物品名称不能为空！'}" 
							value="${materialname}" onclick="showmaterialName()" style="width: 150px; height: 20px;" /><font color="red" size="4px"> *</font>
							<input type="hidden" name="materialid" id="materialid"
							class="TextBox" value="${materialid}"
							onclick="showmaterialName()" style="width: 150px; height: 20px;" />
					</td>
						<td align="left" class="Main_Tab_Style_title"
						style="width: 100px; height: 20px;">
						规格型号
					</td>
					<td align="left" class="Main_Tab_Style_Content">
					<input type="text" id="modelname"   class="TextBox"   style="width: 150px; height: 20px;" readonly="readonly" />
					<input type="hidden" id="modelid"  name="modelid"  class="TextBox"   style="width: 150px; height: 20px;"/>
					</td>
					
				</tr>
				<%--<tr>
					<td align="left" class="Main_Tab_Style_title"
						style="width: 100px; height: 20px;">
						批号：
					</td>
					<td align="left" class="Main_Tab_Style_Content" colspan="3">
						<select id="batchno" class="TextBox" style="width: 150px; height: 20px;" onchange="batchnoChange();">
						<option value="">---请选择---</option>
						</select>
						<input type="text" id="batchnotext" name="batchno" validateParam="{type:'string',required:'true',message:'请填写批号'}" class="TextBox grkj-validate" value="${materialinventory.batchno}" style="width: 160px; height: 20px;" />
						<font color="red" size="4px">*</font>
					</td>
					</tr>--%>
					<tr>
					<td align="left" class="Main_Tab_Style_title"
						style="width: 100px; height: 20px;">
						失效日期：
					</td>
					<td align="left" class="Main_Tab_Style_Content">
						<input type="text" name="expirationdate" id="expirationdate"
							onClick="showDataTimeDailog('yyyy-MM-dd');"
							class="Wdate"
							value="${expirationdate}" style="width: 150px;" />
					</td>
					<td align="left" class="Main_Tab_Style_title"
						style="width: 100px; height: 20px;">
						入库时间：
					</td>
					<td align="left" class="Main_Tab_Style_Content">
						<input type="text" name="storgetime"
							class="Wdate grkj-validate" onClick="showDataTimeDailog('yyyy-MM-dd HH:mm');"
						validateParam="{type:'string',required:'true',message:'入库时间不能为空！'}"
								 style="width: 150px;" />
								 <font color="red" size="4px">*</font>
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
							style="width: 150px; height: 20px;" />
					</td>
					<td align="left" class="Main_Tab_Style_title"
						style="width: 100px; height: 20px;">
						存放条件：
					</td>
					<td align="left" class="Main_Tab_Style_Content">
						<input type="text" name="depositcondition" id="depositcondition"
							class="TextBox grkj-validate" validateParam="{type:'string',maxLength:'100',required:'false',message:'长度不超过100个字符！'}"	   
							value="${depositcondition}"
							style="width: 150px; height: 20px;" />
					</td>
				</tr>
				<tr>
					<td align="left" class="Main_Tab_Style_title"
						style="width: 100px; height: 20px;">
						保管人：
					</td>
				 <td align="left" class="Main_Tab_Style_Content">
							<input type="text" name="useperson" id="useperson" class="TextBoxPic" onclick="showName()" value="${userinfo.realname }"
                            onclick="showName()" 	 value="${useperson}" style="width: 150px; height: 20px;" />
						<input type="hidden" name="userid" id="userid" class="TextBox"
								 value="${userid}" style="width: 150px; height: 20px;" />
						</td>
						<td align="left" class="Main_Tab_Style_title"
					style="width: 100px; height: 20px;">
					仓库：
				</td>
				 <td align="left" class="Main_Tab_Style_Content">
						<select id="warehouse" class="TextBox grkj-validate" name="materialinventory.warehouseid.warehouseid" 	validateParam="{type:'string',required:'true',message:'请选择仓库！'}" 
							style="width: 150px; height: 20px">
							<option value="">
								---请选择---
							</option>
							<c:forEach var="pList" items="${warehouseList }">
								<option value="${pList.warehouseid}"<c:if test="${pList.warehouseid==materialinventory.warehouseid.warehouseid }">selected="selected"</c:if>>
									${pList.warehousename}
								</option>
							</c:forEach>
						</select><font color="red" size="4px"> *</font>
				 	</td>
				</tr>
				<tr>
				
				 	<td align="left" class="Main_Tab_Style_title"
						style="width: 100px; height: 20px;">
						入库数量：
					</td>
					<td align="left" class="Main_Tab_Style_Content">
						<input id="storagenum" type="text" name="storagenum" value="${storagenum}"	class="TextBox grkj-validate"
						validateParam="{type:'int',required:'true',message:'入库数量必须为数字且不能为空！'}" style="width: 150px;" /><font color="red" size="4px"> *</font>
					</td> 
				</tr>
				<tr>
				
					<td align="left" class="Main_Tab_Style_title"
						style="width: 80px; height: 20px;">
						供应商：
					</td>
					<td align="left" class="Main_Tab_Style_Content" colspan="3" style="width: 447px; height: 20px;">
						 
						<input type="text" name="providername" id="providername"
						class="TextBoxPic"  style="width: 427px; height: 20px;" onclick="selecTmaterialFocus()"/>
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
						<textarea class="TextBox grkj-validate"  id="remark"
							validateParam="{type:'string',maxLength:'500',required:'false',message:'长度不超过500个字符！'}"   
								 style="width: 425px; height: 80px;" name="remark" value="${remark}"></textarea>
					</td>
				</tr>

			</table>
		</form>
	</body>
</html>
