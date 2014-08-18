<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="/common/taglibs.jsp"%><!-- 这句话引进去是相对路径可以使用的~~ -->
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
		<title>监测项目管理</title>
		<link rel="stylesheet" type="text/css" href="${ctx}/themes/default/easyui.css">
		<link rel="stylesheet" type="text/css" href="${ctx}/themes/icon.css">
		<link rel="stylesheet" type="text/css" href="${ctx}/validate/validate.css">
		<script type="text/javascript" src="${ctx}/js/jquery-1.7.2.min.js"></script>
		<script type="text/javascript" src="${ctx}/js/jquery.easyui.min.js"></script>
		<script type="text/javascript" src="${ctx}/js/CommonCheck.js"></script>
		<script type="text/javascript" src="${ctx}/js/jquery.jstree.js"></script>
		<script type="text/javascript" src="${ctx}/validate/input.validate.js"></script>
		<script type="text/javascript">
			var rootPath="${ctx}";
			$(function(){  
				var ispre="${ispreitem}";
				if(ispre=="Y"){
					$("#ispreitem").val('是');
				}else{
					$("#ispreitem").val('否');
				}
			})
		</script>
	<style type="text/css">
	td{font-size:12px;}
	</style>
	</head>
	<body onkeydown="PreventBSK();">	
		<form action="" method="post" id="itemform" >
		<input name="flag" id="flag" type="hidden" value="${flag}"/>
			<input name="itemid" id="itemid" type="hidden" value="${entity.itemid}"/>
			<table class="Main_Tab_Style" style="width: 100%;height: 110px;">
				<tr>
					<td  align="left" class="Main_Tab_Style_title" style="width: 12%">项目大类：</td>
					  <td style="width: 25%">
							<select id="itemtypeid" name="itemtypeid" style="width:100%"  class="TextBox grkj-validate" disabled
							 validateParam="{type:'string',required:'true',message:'请选择项目大类！'}">
							<option value="" >---请选择---</option>
								<c:forEach items="${itemType}" var="itemtype">
									<option value="${itemtype.itemtypeid }"  
										<c:if test="${itemtype.itemtypeid==entity.monitoritemtype.itemtypeid }">selected="selected"</c:if>
										>${itemtype.itemtypename }
									</option> 
								</c:forEach>
							</select>
					</td>
					<td align="left" class="Main_Tab_Style_title" style="width: 12%">
						项目名称：
					</td>
					<td align="left" class="Main_Tab_Style_Content" style="width: 20%">
						<input type="text" id="itemname" name="itemname" value="${entity.itemname}" disabled="disabled" class="TextBox" style="width: 100%" />
					</td>					
				</tr>
				<tr>
					<td align="left" class="Main_Tab_Style_title">
						项目费用：
					</td>
					<td align="left" class="Main_Tab_Style_Content">
						<input type="text" id="standfee" name="standfee" value="${entity.standfee}" disabled="disabled" class="TextBox" style="width: 100%"/>
					</td>				
					<td align="left" class="Main_Tab_Style_title">
						项目序号：
					</td>
					<td align="left" class="Main_Tab_Style_Content">
						<input type="text" id="orderid" name="orderid" class="TextBox" value="${entity.orderid}" disabled="disabled" style="width: 100%"/>
					</td>
				</tr>
				<tr>
					<td  align="left" class="Main_Tab_Style_title" width="100px">备注：</td>
					<td align="left" class="Main_Tab_Style_Content" colspan="3" style="height: 50px">
							<textarea rows="5" cols="3"  name="remark" id="remark" class="TextBox" disabled="disabled"    
							style="width: 510px; height: 50px" >${remark }</textarea>
					</td>
				</tr>				
			</table>
			</form>
	</body>
</html>
