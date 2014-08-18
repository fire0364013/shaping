<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ include file="/common/taglibs.jsp"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
		<title>企业信息选择</title>
		<link rel="stylesheet" href="${ctx }/js/DatePicker/skin/WdatePicker.css" type="text/css" />
		<link rel="stylesheet" href="${ctx}/themes/default/easyui.css"	type="text/css" />
		<link rel="stylesheet" type="text/css"	href="${ctx}/validate/validate.css"/>
		<link rel="stylesheet" type="text/css" href="${ctx}/themes/icon.css">
		<script type="text/javascript" src="${ctx}/js/jquery-1.7.2.min.js"></script>
		<script type="text/javascript" src="${ctx}/js/jquery.easyui.min.js"></script>
		<script type="text/javascript" src="${ctx}/validate/input.validate.js"></script>
	 	<script type="text/javascript" src="${ctx }/js/DatePicker/WdatePicker.js"></script>
		<script language="javascript" >
			var rootPath="${ctx}";
			var projectcode = "${projectcode}";
			$(document).ready(function(){
				
			});
			
			/*function saveSub(){
				$("#subForm").form('submit',{
						type : 'POST',
						url :rootPath +'/projects/taskregister/taskregister!addSub.action?projectcode='+projectcode,
						onSubmit:function(){
							
						},
						success : function(data) {
							if (data == 'fail') {
								alert("失败！");
								return;
							}else if (data == 'success') {
								alert('成功！');
								$("#datagrid").treegrid('reload');
							}
						}
				} );	
}*/
//进入分包选择项目界面
function selectItem1(){
	var url = rootPath +'/projects/taskregister/taskregister!toItemPage3.action?projectcode='+projectcode;
	var _dialog = window.top
			.$('<div id="item-dlg"  style="padding:0px;"><iframe id="itemFrame" width="100%" height="100%" frameborder="0" scrolling="yes" src=' + url + '></iframe></div>')
			.appendTo(window.top.document.body);
	_dialog.dialog( {
		title : '项目管理',
		autoOpen : false,
		modal : true,
		closed : true,
		width : '500',
		height : '500',
		maximizable:true,
		buttons : [ {
			text : '确定',
			iconCls : 'icon-save',
			handler : function() {
					$("#itemFrame",top.document.body).contents().find("#btnGetItem").click();						
					var itemid = $("#itemFrame",top.document.body).contents().find("#itemid").val();
					var itemname = $("#itemFrame",top.document.body).contents().find("#itemname").val();
					$('#items').val(itemname);
					_dialog.dialog('close');
			}
		}, {
			text : '取消',
			iconCls : 'icon-cancel',
			handler : function() {
				_dialog.dialog('close');
			}
		} ],
		onClose : function() {
			_dialog.dialog("destroy");

		}
	});
	_dialog.dialog('open');
}

		</script>	
	</head>
	<body onkeydown="PreventBSK();">
		<div id="subbackage" style="width: 100%">
		<form id="subForm" method="post" theme="simple">
		<input type="hidden" name="subcontract.subcontractid" value="${id}">
		<input type="hidden" name="subcontract.projectcode" value="${projectcode}">
		<table class="Main_Tab_Style" style="width: 100%; height: 60px">
				<tr>
					<td class="Main_Tab_Style_title"
						style="width: 100px; text-align: left">
						分包单位名称：
					</td>
					<td class="Main_Tab_Style_Content">
						<input type="text" id="name" name="subcontract.subName" value="${subcontract.subName}" class="TextBox" style="width: 150px" />
					</td>
					<td class="Main_Tab_Style_title"
						style="width: 100px; text-align: left">
						分包单位地址：
					</td>
					<td class="Main_Tab_Style_Content">
						<input type="text" id="addr" name="subcontract.subAddr" value="${subcontract.subAddr}" class="TextBox" style="width: 150px" />
					</td>
				</tr>
				<tr>
					<td class="Main_Tab_Style_title"
						style="width: 100px; text-align: left">
						分包联系人：
					</td>
					<td class="Main_Tab_Style_Content">
						<input type="text" id="linkman" name="subcontract.subLinkman" value="${subcontract.subLinkman}" class="TextBox" style="width: 150px" />
					</td>
					<td class="Main_Tab_Style_title"
						style="width: 100px; text-align: left">
						分包联系电话：
					</td>
					<td class="Main_Tab_Style_Content">
						<input type="text" id="phone" name="subcontract.subPhone" value="${subcontract.subPhone}" class="TextBox" style="width: 150px" />
					</td>
				</tr>
				<tr>
					<td class="Main_Tab_Style_title"
						style="width: 100px; text-align: left">
						分包项目：
					</td>
					<td colspan="3" class="Main_Tab_Style_Content">
						<input type="hidden" id="subitemid" name="subitemid" value="${subitemid}"/>
							<textarea id="items" name="subcontract.subitems" class="TextBox grkj-validate"  style="width: 94%;" ondblclick="selectItem1()">${subcontract.subitems}</textarea><font color="red" size="4px"> *</font>
					</td>
				</tr>
				<tr>
					<td class="Main_Tab_Style_title"
						style="width: 100px; text-align: left">
						分包原因：
					</td>
					<td colspan="3" class="Main_Tab_Style_Content">
						<textarea id="reason" name="subcontract.subreason" class="TextBox" style="width: 100%">${subcontract.subreason}</textarea>
					</td>
				</tr>
				<tr>
					<td class="Main_Tab_Style_title"
						style="width: 70px; text-align: left">
						分包备注：
					</td>
					<td colspan="3" class="Main_Tab_Style_Content">
						<textarea id="remark" name="subcontract.subremark" class="TextBox" style="width: 100%">${subcontract.subremark}</textarea>
					</td>
				</tr>
			</table>
				<!--<div align="center"><input type="button" value="保存" class="Button_out" onClick="saveSub()" /></div>
			--></form>
			</div>	
	</body>
</html>
