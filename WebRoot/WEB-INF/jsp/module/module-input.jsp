<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ include file="/common/taglibs.jsp" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>  
    <title>模块编辑</title>
		<link rel="stylesheet" href="${ctx}/themes/default/easyui.css" type="text/css" />
		<link rel="stylesheet" type="text/css" href="${ctx}/themes/icon.css">
		<link rel="stylesheet" type="text/css" href="${ctx}/validate/validate.css">
		<script type="text/javascript" src="${ctx}/js/jquery-1.7.2.min.js"></script>
		<script type="text/javascript" src="${ctx}/js/jquery.easyui.min.js"></script>
		<script type="text/javascript" src="${ctx}/validate/input.validate.js"></script>
		<script type="text/javascript">
		 	$(document).ready(function(){
		 		//系统模块不能修改
		 		if($('#moduletype').val()==1){
		 			$(':input').attr("disabled","true");
		 		}
			//	if($('#moduleid').val()!=""&&$('#moduleid').val()){
			//		$('#moduleid').attr("disabled","true");
			//	}

			});
		</script>
  </head>
  <body>
 		<s:form action="" id="moduleForm" method="post" theme="simple">
 			<s:hidden name="moduletype" id="moduletype"/>
			<div>
				<table width="100%" border="1" class="grid">
					<tr>
						<td class="Main_Tab_Style_title" style="width: 100px; height: 20px;">模块编号：</td>
						<td class="Main_Tab_Style_Content">
							<s:textfield name="moduleid" id="moduleid" cssClass='TextBox grkj-validate' validateParam="{type:'string',maxLength:'30',required:'true',message:'请输入模块编号，长度不超过30个字符！'}" style="width:225px;"/>
							<font color="red" size="4px">*</font>
						</td>
					</tr>
					<tr>
						<td class="Main_Tab_Style_title">模块名称：</td>
						<td class="Main_Tab_Style_Content">
							<s:textfield name="modulename"  cssClass='TextBox grkj-validate' validateParam="{type:'string',maxLength:'100',required:'true',message:'请输入模块名称，长度不超过100个字符！'}" style="width:225px;"/>
							<font color="red" size="4px">*</font>
						</td>
					</tr>
					<tr>
						<td class="Main_Tab_Style_title">父模块编号：</td>
						<td class="Main_Tab_Style_Content">
							<s:textfield name="parentmoduleid"  cssClass='TextBox grkj-validate' validateParam="{type:'string',maxLength:'30',required:'true',message:'请输入父模块名称，长度不超过30个字符！'}" style="width:225px;"/>
							<font color="red" size="4px">*</font>
						</td>
					</tr>
					<!--  tr>
						<td class="Main_Tab_Style_title">模块类型：</td>
						<td class="Main_Tab_Style_Content">
							<s:textfield name="moduletype" cssClass="TextBox" style="width:225px;"/>
						</td>
					</tr-->
					<tr>
						<td class="Main_Tab_Style_title">模块URL：</td>
						<td class="Main_Tab_Style_Content">
							<s:textfield name="url" cssClass="TextBox grkj-validate" validateParam="{maxLength:'200',required:'false',message:'长度不超过200个字符！'}" style="width:225px; height:100px;"/>
						</td>
					</tr>
				</table>
			</div>
		</s:form>    
  </body>
</html>
