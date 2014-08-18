<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="/common/taglibs.jsp" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    
    <title>评审意见</title>
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
		var moduleid="${moduleid}";
		$(function(){
			getOpinion();
			initdept();
			inituserList();
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
			$('#opinionSelect').click(function(){
				$("#opinion").val($("#opinionSelect").val());
			});
			
		});
		
		//获取评审意见
		function getOpinion(){ 
			$.ajax({
				type:'GET',
				url:rootPath + '/normalauditrecord/normalauditrecord!getNormalAuditRecordOpinion.action',
				data:{'moduleid':moduleid},
				success:function(data){
					var vData = eval("(" + data + ")");
					var lList = "";
					
					//遍历json数据  
					if(data!='[{}]'){
						jQuery.each(vData, function(i, n) {
							lList += "<option value=" + n.content + ">" + n.content	+ "</option>";
						});	
					}
					
					//绑定数据到select中
					$('#opinionSelect').append(lList);
					$("#opinion").val($("#opinionSelect").val());
				}
			});
		}
		
		function initdept(){
			$.ajax({
				type:'post',
				url:rootPath +'/departmentinfo/departmentinfo!getDeptAll.action?timeStamp='+new Date().getTime(),
				success:function(data){
					var vData = eval("("+data+")");
					var List = "<option value=''>--请选择--</option>";
					jQuery.each(vData,function(i,n){
						List +="<option value='"+n.deptid+"'>"+n.deptname+"</option>"
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
		
		function inituserList(){
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
		}		
	</script>
  </head>
  
  <body onkeydown="PreventBSK();">
    <table width="100%" border="1" align="center" class="grid">
			<tr>
				<td align="left" class="Main_Tab_Style_title" style="width: 30%;">
					审核意见：
				</td>
				<td align="left" class="Main_Tab_Style_Content">
					<select id="opinionSelect" style="width: 100%"></select>
					 <textarea class="TextBox grkj-validate" validateParam="{type:'string',required:'true',message:'请填写审核意见！'}" style="width:100%;height:60px;" name="opinion" id="opinion"></textarea>
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
		</table>
  </body>
</html>
