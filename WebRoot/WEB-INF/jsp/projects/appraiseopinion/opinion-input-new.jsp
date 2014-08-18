<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="/common/taglibs.jsp" %>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    
    <title>提交意见</title>
	<link rel="stylesheet" href="${ctx}/themes/default/easyui.css" type="text/css" />
	<link rel="stylesheet" type="text/css" href="${ctx}/themes/icon.css">
	<link rel="stylesheet" href="${ctx}/validate/validate.css" type="text/css" />
	<script type="text/javascript" src="${ctx}/js/jquery-1.7.2.min.js"></script>
	<script type="text/javascript" src="${ctx}/js/jquery.easyui.min.js"></script>
	<script type="text/javascript" src="${ctx}/js/easyui-lang-zh_CN.js"></script>
	<script type="text/javascript" src="${ctx}/js/CommonCheck.js"></script>
	<script type="text/javascript" src="${ctx}/validate/input.validate.js"></script>		
	<script type="text/javascript">	
		var rootPath="${ctx}";
		var projectcode="${projectcode}";
		var deptid = "${deptid}";
		$(function(){
			initdept();
			inituser(deptid);
			$('#deptid').change(function(){
				var deptid = $("#deptid option:selected").attr("value");
				if(deptid!='')
				{
					inituser(deptid);
				}
				else{
					inituserList();
				}
			});			
			
		});
		
		function initdept(){
			$.ajax({
				type:'post',
				url:rootPath +'/departmentinfo/departmentinfo!getDeptAll.action?timeStamp='+new Date().getTime(),
				success:function(data){
					var vData = eval("("+data+")");
					var List = "<option value=''>--请选择--</option>";
					jQuery.each(vData,function(i,n){
						if(n.deptid == deptid){
							List +="<option value='"+n.deptid+"' selected>"+n.deptname+"</option>";
						}else{
							List +="<option value='"+n.deptid+"'>"+n.deptname+"</option>";
						}
					});
					$("#deptid").append(List);	
				}
			});
		}
		
		function inituser(deptid){
			$.ajax({
				type:'post',
				url:rootPath +'/userinfo/userinfo!getUserBydept.action?timeStamp='+new Date().getTime(),
				data:{deptid:deptid},
				success:function(data){
					var vData = eval("("+data+")");
					var List = "";
					jQuery.each(vData,function(i,n){
						List +="<option value='"+n.userid+"'>"+n.realname+"</option>"
					});
					$("#userid").empty();
					$("#userid").append(List);	
				}
			});
		}
		
		/*function inituserList(){
			$.ajax({
				type:'post',
				url:rootPath +'/userinfo/userinfo!getUser.action?timeStamp='+new Date().getTime(),
				success:function(data){
					var vData = eval("("+data+")");
					var List = "";
					jQuery.each(vData,function(i,n){
						List +="<option value='"+n.userid+"'>"+n.realname+"</option>"
					});
					$("#userid").empty();
					$("#userid").append(List);	
				}
			});
		}*/
	</script>
  </head>
  
  <body onkeydown="PreventBSK();">
   <input type="hidden" id="projectcode" name="projectcode" value="${projectcode}">
   <input type="hidden" id="userPwd" name="userPwd" value="${userPwd}" />
   <form id="opinionform" method="post" enctype="multipart/form-data">
   <input type="hidden" id="attachmenttypeid" name="attachmenttypeid" value="1" />
    <table width="100%" border="1" align="center" class="grid">
			<tr>
				<td align="left" class="Main_Tab_Style_title" style="width: 30%;">
					提交意见：
				</td>
				<td align="left" class="Main_Tab_Style_Content">
					 <textarea class="TextBox grkj-validate" validateParam="{type:'string',required:'true',message:'请填写审核意见！'}" style="width:100%;height:60px;" name="opinion" id="opinion"></textarea>
				</td>
			</tr>
			<tr>
				<td align="left" class="Main_Tab_Style_title" style="width: 30%;">
					跳转流程节点：
				</td>
				<td align="left" class="Main_Tab_Style_Content">
					<select id="nextWorkflow" name="nextWorkflow" style="width: 100%">
					<c:forEach var="workflowstep" items="${workflowSteps }">
						<option value="${workflowstep.id.stepcode}" >${workflowstep.stepname}</option>
					</c:forEach>
					</select>
				</td>
			</tr>
			<tr>
				<td align="left" class="Main_Tab_Style_title">
					附件：
				</td>
				<td colspan="3" align="left" class="Main_Tab_Style_Content">
					<s:file name="file" size="40" label="上传" theme="simple" cssClass="TextBox" id="filec"></s:file>
				</td>
			</tr>
			<tr>
				<td align="left" class="Main_Tab_Style_title" style="width: 30%;">
					部门：
				</td>
				<td align="left" class="Main_Tab_Style_Content">
					<select id="deptid" style="width: 100%"></select>
				</td>
			</tr>
			<tr>
				<td align="left" class="Main_Tab_Style_title" style="width: 30%;">
					人员：
				</td>
				<td align="left" class="Main_Tab_Style_Content">
					<select id="userid" style="width: 100%"></select>
				</td>
			</tr>
			<tr>
				<td align="left" class="Main_Tab_Style_title" style="width: 30%;">
					密码：
				</td>
				<td align="left" class="Main_Tab_Style_Content">
					<input id="loginpwd" name="loginpwd" style="width: 100%" />
				</td>
			</tr>						
		</table>
		</form>
  </body>
</html>
