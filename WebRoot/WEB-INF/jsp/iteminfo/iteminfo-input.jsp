<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ include file="/common/taglibs.jsp" %>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<title>项目信息编辑</title>
		<link rel="stylesheet" href="${ctx}/themes/default/easyui.css" type="text/css" />
		<link rel="stylesheet" type="text/css" href="${ctx}/themes/icon.css">
		<script type="text/javascript" src="${ctx}/js/jquery-1.7.2.min.js"></script>
		<script type="text/javascript" src="${ctx}/js/jquery.easyui.min.js"></script>
		<script type="text/javascript" src="${ctx}/js/easyui-lang-zh_CN.js"></script>
		<script type="text/javascript" src="${ctx}/js/CommonCheck.js"></script>
		<link rel="stylesheet" href="${ctx}/validate/validate.css" type="text/css" />
		<script type="text/javascript" src="${ctx}/validate/input.validate.js"></script>

		<script language="JavaScript" type="text/javascript">
		var rootPath = "${ctx}";
		//var preFlag="${preFlag}";      
		//alert(preFlag);
		$(document).ready(function(){
			$('#itemname').focus();
			if($('#feemultiple').val()==null||$('#feemultiple').val()==""){
				$('#feemultiple').val(1);
			}
			//changeDailei();
			$("#itemtypeid").change(function(){
			   //changeDailei();
			});
		});

		
		function selectItem(){ 
			var url =  "${ctx}/iteminfo/iteminfo!itemGroupList.action?itemname=&itemid=&flag=iteminfo" ;
			var _dialog =  window.top.$('	<div id ="dlg" style="padding:0px;"><iframe id="dlgFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);

			_dialog.dialog({
			title:'选择项目',
			autoOpen:false,
			modal:true,
			closed:true,
			width:'650',
			height:'500',
			buttons:[{
				text:'确定',
				iconCls:'icon-save',
				handler:function(){
					var itemnames = $("#dlgFrame",top.document.body).contents().find("#selectitemname").val();
					var itemids=$("#dlgFrame",top.document.body).contents().find("#selectid").val();
					$("#preitemname").val(itemnames);
					$("#preitem").val(itemids);
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
    		
		 <script type="text/javascript" src="${ctx}/lims/js/item.info.js"></script>
		 <script type="text/javascript" src="${ctx}/lims/js/selOneuser.js"></script>
	</head>
	<body onkeydown="PreventBSK();">
	
	<form action="" method="post" id="itemform">
		<div id="dlg-buttons">
		<input name="itemid" type="hidden" value="${entity.itemid}"/>
		<input name="id" type="hidden" value="${entity.itemid}"/>
		<input type="hidden" id="flagName" name="flagName" value="${entity.itemname}"/>
			<table width="100%" border="1" align="center" class="grid">
				<tr>
				<td  align="left" class="Main_Tab_Style_title" width="100px">项目大类：</td>
				  <td>
						<select id="itemtypeid" name="itemtypeid" style="width:180px"  class="TextBox grkj-validate"
						 validateParam="{type:'string',required:'true',message:'请选择项目大类！'}">
						<option value="" >---请选择---</option>
							<c:forEach items="${itemType}" var="itemtype">
								<option value="${itemtype.itemtypeid }"  
									<c:if test="${itemtype.itemtypeid==entity.monitoritemtype.itemtypeid }">selected="selected"</c:if>
									>${itemtype.itemtypename }
								</option> 
							</c:forEach>
						</select>
						 <font color="red" size="4px">*</font>
					</td>
					<td  align="left" class="Main_Tab_Style_title" width="100px">项目名称：</td>
					<td  align="left" class="Main_Tab_Style_Content">
						<input  name="equalsName" class="TextBox grkj-validate" validateParam="{type:'string',maxLength:'100',required:'false',message:'长度不超过100个字符！'}"	   
								 style="width:180px;height:20px" value="${entity.itemname}"/>
								 <font color="red" size="4px">*</font>
					</td>					
				</tr>
				<tr>
					<td  align="left" class="Main_Tab_Style_title" width="100px">项目费用：</td>
					<td  align="left" class="Main_Tab_Style_Content">
						<input  name="standfee" class="TextBox grkj-validate" validateParam="{type:'string',maxLength:'100',required:'false',message:'长度不超过100个字符！'}"	   
								 style="width:180px;height:20px" value="${entity.standfee}"/>
								 <font color="red" size="4px">*</font>
					</td>
					<td  align="left" class="Main_Tab_Style_title" width="100px">序号</td>
					<td  align="left" class="Main_Tab_Style_Content">
						<input  name="orderid" class="TextBox grkj-validate" validateParam="{type:'int',maxLength:'100',required:'false',message:'只能输入数字'}"	   
								 style="width: 180px;height:20px" value="${orderid}"/>
								 <font color="red" size="4px">*</font>
					</td>						
				</tr>
				<tr>
					<td  align="left" class="Main_Tab_Style_title" width="100px">备注：</td>
					<td align="left" class="Main_Tab_Style_Content" colspan="3" style="height: 50px">
							<textarea rows="5" cols="3"  name="remark" id="remark" class="TextBox grkj-validate" validateParam="{type:'string',maxLength:'500',required:'false',message:'长度不超过500个字符！'}"	   
							style="width: 510px; height: 50px" >${remark }</textarea>
					</td>
				</tr>
			</table>
		</div>
		</form>
	</body>
</html>
