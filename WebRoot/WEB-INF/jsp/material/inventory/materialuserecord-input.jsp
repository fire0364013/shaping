<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="/common/taglibs.jsp"%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<title>库存管理</title>
		
		<link rel="stylesheet" href="${ctx}/themes/default/easyui.css"type="text/css" />
		<link rel="stylesheet" type="text/css" href="${ctx}/themes/icon.css">
		<link rel="stylesheet" type="text/css"href="${ctx}/validate/validate.css">
		<script type="text/javascript" src="${ctx}/js/jquery-1.7.2.min.js"></script>
		<script type="text/javascript" src="${ctx}/js/jquery.easyui.min.js"></script>
		<script type="text/javascript" src="${ctx}/js/easyui-lang-zh_CN.js"></script>
		<script type="text/javascript" src="${ctx}/js/jquery.MultiFile.js"></script>
		<script type="text/javascript" src="${ctx}/js/DatePicker/WdatePicker.js"></script>
		<script type="text/javascript" src="${ctx}/validate/input.validate.js"></script>
		<script type="text/javascript" src="${ctx}/lims/js/material/inventory-history.js"></script>
		<script type="text/javascript">
			var rootPath = "${ctx}";
			var userid = "${userid}";
			$(document).ready(function() {
				var entrustdateVal = $("#usedate").val();
				if(entrustdateVal==""){
					var ym = new Date();
					var strYear = ym.getFullYear();
					var strMonth = ym.getMonth()+1;
					var strDate = ym.getDate();
					var temp = strYear+"-"+(strMonth<10? "0"+strMonth:strMonth)+"-"+(strDate<10? "0"+strDate:strDate);
				
					$("#usedate").val(temp);
				}
			});
			
		</script>
		</head>

	<body onkeydown="PreventBSK();">
	<form id="inventoryhistoryform" method="post" enctype="multipart/form-data">
		<div id="dlg-buttons">
			<input type="hidden" name="useid" id="useid"value="${useid }" />
				<table border="1" align="center" class="grid">
					<tr>
						<td align="left" class="Main_Tab_Style_title"
							style="width: 100px; height: 20px;">
							领用人：
						</td>
						<td align="left" class="Main_Tab_Style_Content">
							<input type="text" name="useperson" id="useperson" class="TextBoxPic grkj-validate" onclick="showName()"
                              validateParam="{type:'string',required:'true',message:'请选择领用人！'}" 
								 value="${realname}" style="width: 130px; height: 20px;" /><font color="red" size="4px"> *</font>
						<input type="hidden" name="userid" id="userid" class="TextBox"
								 value="${userid}" style="width: 130px; height: 20px;" />
						</td>
						<td align="left" class="Main_Tab_Style_title"
							style="width: 100px; height: 20px;">
							领用日期：
						</td>
						<td align="left" class="Main_Tab_Style_Content">
						<input type="text" name="usedate" id="usedate" onClick="showDataTimeDailog('yyyy-MM-dd');" 
						class="Wdate grkj-validate" validateParam="{type:'date',required:'true',message:'请输入领用日期！'}"
						 value="${usedate}" style="width:150px;"/>
						</td>
						
					</tr>
					<tr>
						
						<td align="left" class="Main_Tab_Style_title"
							style="width: 100px; height: 20px;">
							领用数量：
						</td>
						<td align="left" class="Main_Tab_Style_Content">
							<input type="text" name="usenum" id="usenum" 
								 value="${usenum }" class="TextBox grkj-validate"
						validateParam="{type:'int',required:'true',message:'领用数量必须为数字且不能为空！'}"
								style="width: 130px; height: 20px;" /> <font color="red" size="4px"> *</font>
						</td>
					</tr>
					<tr>
					<td align="left" class="Main_Tab_Style_title"
							style="width: 100px; height: 80px;">
							备注：
						</td>
							<td colspan="3" align="left" class="Main_Tab_Style_Content">
							<textarea rows="5" cols="3"  name="usepurpose" id="usepurpose" class="TextBox grkj-validate" validateParam="{type:'string',maxLength:'50',required:'false',message:'长度不超过50个汉字！'}"	   
							style="width: 400px; height: 80px" >${usepurpose }</textarea>
					</td>
					</tr>
				</table>
			
		</div>
		</form>
	</body>
</html>
