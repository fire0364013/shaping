<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ include file="/common/taglibs.jsp"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
		<title>物品采购信息编辑</title>

			<link rel="stylesheet" href="${ctx}/themes/default/easyui.css" type="text/css" />
		<link rel="stylesheet" type="text/css" href="${ctx}/themes/icon.css">
		<script type="text/javascript" src="${ctx}/js/jquery-1.7.2.min.js"></script>
		<script type="text/javascript" src="${ctx}/js/jquery.easyui.min.js"></script>
		<script type="text/javascript" src="${ctx}/js/easyui-lang-zh_CN.js"></script>
		<script type="text/javascript" src="${ctx}/js/CommonCheck.js"></script>
		<script type="text/javascript" src="${ctx}/js/DatePicker/WdatePicker.js"></script>
		<link rel="stylesheet" href="${ctx}/js/DatePicker/skin/WdatePicker.css" type="text/css" />
		<link rel="stylesheet" href="${ctx}/validate/validate.css" type="text/css" />
		<script type="text/javascript" src="${ctx}/validate/input.validate.js"></script>
		<script type="text/javascript" src="${ctx}/js/jquery.MultiFile.js"></script>
		<script language="javascript" >
			var rootPath="${ctx}";	
			$(function(){
				$('#materialfocus').focus();
				$('#insum').change(function(){
					var value = $('#insum').val();
					$('#remsum').val(value);
				});
			})
			function batchnoChange(obj){
				
				var tt = $(obj).val();
				if(tt!=null&& tt!=""){
					var str = $(obj).find('option:selected').text();
					$("#batchnotext").val(str);
					$("#batchnotext").attr('readonly','readonly');
					$("#batchnotext").css("color","gray");
				}else{
					$("#batchnotext").val("");
					$("#batchnotext").removeAttr('readonly');
					$("#batchnotext").css("color","black");
				}
				var materialid = $("#materialid").val();
				var purcaseid = "${materialpurchase.purchasematerialid}";
				//$("#inner").html('');
				$.ajax({
				   type: "POST",
				   async:false,
				   url: rootPath + "/material/standardpurchase!getInventoryInfo.action?temp="+new Date().getTime(),
				   data: {materialid:materialid,bacthno:tt,purcaseid:purcaseid},
				   success: function(msg){
					   var data = eval('('+msg+')');
					   for(var key in data){
						 /*  if(tt=="" || tt==null){
							    $("#"+key).removeAttr("readonly");
							    $("#"+key).css("color","black");
						   }else{
							    $("#"+key).attr('readonly',true);
							    $("#"+key).css("color","gray");
						   }*/
						   $("#"+key).val(data[key]);
					   }
					//   alert(msg);
					 //alert(msg);
				    // $("#inner").html(msg);
				     //$('#providername').focus();
				     //initGrkjValidate();
				   }
				});
			}
			//姓名的弹出窗口使用selectedUserid
			function showName(){
				//url=rootPath +"/certificateinfo/certificateinfo!showname.action";//自己做部门下拉框的选择按钮
				var url =  rootPath +"/oamuser/oneandmanyuser!toOneUser.action";
				var _dialog =  window.top.$('<div id ="cert-dlg" style="padding:0px;"><iframe id="ItemFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
				_dialog.dialog({
					title:'姓名选择',
					autoOpen:false,
					modal:true,
					closed:true,
					width:'800',
					height:'500',
					buttons:[{
						text:'确定',
						iconCls:'icon-save',
						handler:function(){		
						var selectedUser=$("#ItemFrame",top.document.body).contents().find("#selectedUser").val();//保管人
						$("#personname").val(selectedUser);
						var selectedUserid=$("#ItemFrame",top.document.body).contents().find("#selectedUserid").val();//id
						$("#personid").val(selectedUserid);
						
			
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
		<form id="toinframe" method="post" enctype="multipart/form-data">
			<input type="hidden" id="materialid" name="materials.materialid" value="${materials.materialid}"/>
			<input type="hidden" name="materialmodel.materialmodelid" value="${materialmodel.materialmodelid}"/>
			<input type="hidden" name = "materialinventory.userinfo.userid" id="personid" value="${materialinventory.userinfo.userid}"/>
			<input type="hidden" id="json" name="json"/>			
			<table class="Main_Tab_Style_2" cellspacing="0" cellpadding="0"  style="width: 100%;">
				<tr>
					<td align="left" class="Main_Tab_Style_title" style="width: 80px; height: 20px;">
						物品名称：
					</td>
					<td align="left" class="Main_Tab_Style_Content" style="width: 160px; height: 20px;">
						<input type="text" name="materials.materialname" class="TextBox" value="${materials.materialname}" readonly="readonly" style="width: 160px; height: 20px;" />
					</td>
					<td align="left" class="Main_Tab_Style_title"
						style="width: 100px; height: 20px;">
						规格型号：
					</td>
					<td align="left" class="Main_Tab_Style_Content" style="width: 160px; height: 20px;">
					<input type="text"  name="modelname"  class="TextBox"   value="${materialmodel.modelname}" style="width: 160px; height: 20px;" readonly="readonly"/>
					</td>
				</tr>
				<tr>
					<td align="left" class="Main_Tab_Style_title" style="width: 80px; height: 20px;">
						批号：
					</td>
					<td align="left" class="Main_Tab_Style_Content" colspan="3">	
						<select  id="batchno" name="batchno" style="width: 160px;height:20px" class="TextBox" onchange="batchnoChange(this);">
							<option value="">---请选择---</option>
							<c:forEach var="batchno" items="${batchlist }">
							<option value="${batchno}"  >${batchno}</option>
							</c:forEach>
						</select>					
						<input type="text" id="batchnotext" name="materialinventory.batchno" validateParam="{type:'string',required:'true',message:'请填写批号'}" class="TextBox grkj-validate" value="${materialinventory.batchno}" style="width: 290px; height: 20px;" />
						<font color="red" size="4px">*</font>	
					</td>
				</tr>
					<tr>
					<td align="left" class="Main_Tab_Style_title" style="width: 80px; height: 20px;">
						浓度：
					</td>
					<td align="left" class="Main_Tab_Style_Content" colspan="3">
						<input type="text" id="consistence" name="materialinventory.consistence" value="${materialinventory.consistence}" class="TextBox grkj-validate" validateParam="{type:'string',required:'true',message:'请输入浓度！'}"  style="width: 450px;"/><font color="red" size="4px"> *</font>
					</td>
					</tr>
					<tr>
						<td align="left" class="Main_Tab_Style_title" style="width: 80px; height: 20px;">
							不确定度：
						</td>
						<td align="left" class="Main_Tab_Style_Content" colspan="3">
							<input type="text" id="uncertainty" name="materialinventory.uncertainty" value="${materialinventory.uncertainty}" class="TextBox"    style="width: 450px;"/>
						</td>
						</tr>
					<tr>
					<td align="left" class="Main_Tab_Style_title"
							style="width: 100px; height: 20px;">
							浓度单位：
						</td>
							<td align="left" class="Main_Tab_Style_Content">
						<select  id="unitname" name="unitname" style="width: 160px;height:20px" class="TextBox grkj-validate" 	validateParam="{type:'string',required:'true',message:'请选择浓度单位！'}" >
								<option value="">---请选择---</option>
								<c:forEach var="unitList1" items="${unitList }">
								<option value="${unitList1.unitname}"  >${unitList1.unitname}</option>
								</c:forEach>
							</select>
							<font color="red" size="4px">*</font>
						</td>
							<td align="left" class="Main_Tab_Style_title" style="width: 100px; height: 20px;">
							稀释倍数：
						</td>
						<td align="left" class="Main_Tab_Style_Content">
							<input type="text" id="dilutionmultiple" name="materialinventory.dilutionmultiple" value="10→50" class="TextBox" style="width: 160px;"/>
						</td>
						
					</tr>
				
					<tr>
						<td align="left" class="Main_Tab_Style_title" style="width: 80px; height: 20px;">
							失效日期：
						</td>
						<td align="left" class="Main_Tab_Style_Content">
							<input type="text" id="expirationdate" name="materialinventory.expirationdate" onClick="showDataTimeDailog('yyyy-MM-dd');" 
							class="Wdate grkj-validate"  value="${materialinventory.expirationdate}" style="width: 160px;" validateParam="{type:'string',required:'true',message:'请选择失效日期'}"/>
							<font color="red" size="4px">*</font>
						</td>
						<td align="left" class="Main_Tab_Style_title"
						style="width: 100px; height: 20px;">
						仓库：
					</td>
					 <td align="left" class="Main_Tab_Style_Content">
							<select class="TextBox grkj-validate" id="warehouse" name="materialinventory.warehouseid.warehouseid" 	validateParam="{type:'string',required:'true',message:'请选择仓库！'}" 
								style="width: 160px; height: 20px">
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
						<td align="left" class="Main_Tab_Style_title" style="width: 80px; height: 20px;">
							存放位置：
						</td>
						<td align="left" class="Main_Tab_Style_Content">
						<input type="text" id="depositplace" name="materialinventory.depositplace" class="TextBox " value="${materialinventory.depositplace}" style="width: 160px; height: 20px;" />
						</td>
						<td align="left" class="Main_Tab_Style_title" style="width: 100px; height: 20px;">
							存放条件：
						</td>
						<td align="left" class="Main_Tab_Style_Content">
							<input type="text" id="depositcondition" name="materialinventory.depositcondition" class="TextBox" value="${materialinventory.depositcondition}"  style="width: 160px; height: 20px;" />
						</td>
					</tr>
					<tr>
					<td align="left" class="Main_Tab_Style_title"
						style="width: 100px; height: 20px;">
						入库时间：
					</td>
					<td align="left" class="Main_Tab_Style_Content">
						<input type="text" id="storagetime" name="storagetime" validateParam="{type:'string',required:'true',message:'请选择入库时间'}"
							class="Wdate grkj-validate" onClick="showDataTimeDailog('yyyy-MM-dd HH:mm');"
								 style="width: 160px;" />
								 <font color="red" size="4px">*</font>
					</td>
				</tr>
					<tr>
					
						<td align="left" class="Main_Tab_Style_title" style="width: 80px; height: 20px;">
							入库数量：
						</td>
						<td align="left" class="Main_Tab_Style_Content">
							<input type="text" id="storagenum" name="materialinventory.storagenum" id="storagenum" validateParam="{type:'int',required:'true',message:'入库数量为数值'}" value="${materialinventory.storagenum}" class="TextBox grkj-validate" style="width: 160px;"/>
							<font color="red" size="4px">*</font>
						</td>
					
						<td align="left" class="Main_Tab_Style_title" style="width: 100px; height: 20px;">
							实际购买数量：
						</td>
						<td align="left" class="Main_Tab_Style_Content">
							<input type="text" name="materialpurchase.reallynumber" id="reallynumber" value="${materialpurchase.reallynumber}" class="TextBox" style="width: 160px; color:gray" readonly />
						</td>
						</tr>
					<tr>
						<td align="left" class="Main_Tab_Style_title" style="width: 80px; height: 20px;">
							已入库数量：
						</td>
						<td align="left" class="Main_Tab_Style_Content">
							<input type="text" name="materialpurchase.purchasenumber" id="purchasenumber" value="${materialpurchase.purchasenumber}" class="TextBox" style="width: 160px;color:gray" readonly/>
						</td>
							<td align="left" class="Main_Tab_Style_title" style="width: 100px; height: 20px;">
							保管人：
						</td>
						<td align="left" class="Main_Tab_Style_Content">
							<input type="text" name="materialinventory.userinfo.realname" id="personname" validateParam="{type:'string',required:'true',message:'请填写保管人'}" onclick="showName()" class="TextBoxPic grkj-validate" value="${materialinventory.userinfo.realname}" style="width: 160px;"/>
							<font color="red" size="4px">*</font>
						</td>
					</tr>	
					<tr>
					<td align="left" class="Main_Tab_Style_title" style="width: 80px; height: 20px;">
							供应商：
						</td>
						<td align="left" class="Main_Tab_Style_Content" colspan="3">
							<input type="text" name="providername" id="providername"
							class="TextBoxPic grkj-validate" validateParam="{type:'string',required:'true',message:'请选择供应商！'}" style="width: 450px; height: 20px;" onclick="selecTmaterialFocus()"/>
							<input type="hidden" name="materialinventory.providerid.providerid" id="providerid"
							class="TextBox"  /><font color="red" size="4px">*</font>
						</td>
					</tr>
					<tr>
						<td align="left" class="Main_Tab_Style_title" style="width: 80px; height: 20px;">
							备注：
						</td>
						<td colspan="3" align="left" class="Main_Tab_Style_Content">
							<textarea id="remark" class="TextBox grkj-validate"  
								validateParam="{type:'string',maxLength:'500',required:'false',message:'长度不超过500个字符！'}" style="width: 450px; height: 80px;" name="materialinventory.remark" value="${materialinventory.remark}"></textarea>
						</td>
					</tr>
				<tr>
					<td  align="left" class="Main_Tab_Style_title" width="80px">附件：</td>
					<td  align="left" class="Main_Tab_Style_Content" colspan="3">
						<s:file name="file" size="57" label="上传" theme="simple" cssClass="multi"></s:file>
					</td>
				</tr>
			</table>
		</form>
	</body>
</html>
