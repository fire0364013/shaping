<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ include file="/common/taglibs.jsp" %>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<title>物品入库管理</title>		
		<link rel="stylesheet" href="${ctx}/themes/default/easyui.css" type="text/css" />
		<link rel="stylesheet" href="${ctx}/validate/validate.css" type="text/css" />
		<link rel="stylesheet" type="text/css" href="${ctx}/themes/icon.css">
		<script type="text/javascript" src="${ctx}/js/jquery-1.7.2.min.js"></script>
		<script type="text/javascript" src="${ctx}/js/jquery.easyui.min.js"></script>
		<script type="text/javascript" src="${ctx}/js/easyui-lang-zh_CN.js"></script>
		<script type="text/javascript" src="${ctx}/js/DatePicker/WdatePicker.js"></script>
		<link rel="stylesheet" href="${ctx}/js/DatePicker/skin/WdatePicker.css" type="text/css" />
		<script type="text/javascript" src="${ctx}/js/CommonCheck.js"></script>
		<script type="text/javascript" src="${ctx}/validate/input.validate.js"></script>
		<script language="JavaScript" type="text/javascript">
			var rootPath="${ctx}";			
			var step = "${info}"
				$(document).ready(function(){
				//申请：不能退回；评审：不能增加、修改、删除
				if(step=="Register" ){//申请用户
				//	$("#materHight").height(650);//物品入库  因为此处与物品采购申请的流程用的是一个页面 一个需要650px 一个需要675px 故用此方式分别设置~wjy
					$("#btnback").hide();
					$("#departtitle").hide();
					$("#departcontent").hide();
					$("#openreturn").hide();
				}else if(step=="DepartmentAudit"){	//科室主任		
				//	$("#materHight").height(650);//物品入库  因为此处与物品采购申请的流程用的是一个页面 一个需要650px 一个需要675px 故用此方式分别设置~wjy
					$("#btnadd").hide();
					$("#btndel").hide();
					$("#departtitle").hide();
					$("#departcontent").hide();
					$("#titlestatus").hide();
					$("#contentstatus").hide();
					$("#openreturn").hide();
				}else if(step=="Affirm"){//入库
				//	$("#materHight").height(675);  现在物品入库自己单独的页面，所以此处所写的id 的高度 用不到了
					$("#btnTab").hide();
				}else if(step=="DispartLeadingAudit"){//分管站长
				//	$("#materHight").height(650);//物品入库  因为此处与物品采购申请的流程用的是一个页面 一个需要650px 一个需要675px 故用此方式分别设置~wjy
					$("#btnadd").hide();
					$("#btndel").hide();
					$("#registerstatus").hide();
					$("#titlestatus").hide();
					$("#contentstatus").hide();
					$("#openreturn").hide();
				}else if(step=="LeadingApprove"){//站长
					//$("#materHight").height(650);//物品入库  因为此处与物品采购申请的流程用的是一个页面 一个需要650px 一个需要675px 故用此方式分别设置~wjy
					$("#btnadd").hide();
					$("#btndel").hide();
					$("#registerstatus").hide();
					$("#titlestatus").hide();
					$("#contentstatus").hide();
					$("#openreturn").hide();
					}else{
					//	$("#materHight").height(650);//物品入库  因为此处与物品采购申请的流程用的是一个页面 一个需要650px 一个需要675px 故用此方式分别设置~wjy
						$("#btnadd").hide();
						$("#btndel").hide();
						$("#registerstatus").hide();
						$("#titlestatus").hide();
						$("#contentstatus").hide();
						$("#btnback").hide();
						}
					
				initDataGrid(step);
			});
    	</script>
    <script type="text/javascript" src="${ctx}/lims/js/material/materialpurchase.js"></script>
    <script type="text/javascript" src="${ctx}/lims/js/material/addmaterials.js"></script>
	</head>
	<body >
		<div  style="height: 30px; size: 12px">
				<table class="Main_Tab_Style" style="width: 100%; height:22px">
					<tr>
						<td class="Main_Tab_Style_title"
							style="width: 80px; text-align: left">
							物品名称：
						</td>
						<td class="Main_Tab_Style_Content" style="width: 100px;">
							<input type="text" id="materialname"  class="TextBox" value="${materialname}"
								style="width: 100px; height: 20px;" />
						</td>	
						<td class="Main_Tab_Style_title"
							style="width: 80px; text-align: left">
							申请时间：
						</td>
						<td class="Main_Tab_Style_Content" style="width: 100px;">
							<input type="text" id="starttime" onClick="showDataTimeDailog('yyyy-MM-dd');" class="Wdate"
								style="width: 100px; height: 20px;" value="${starttime}"/>
						</td>
						<td class="Main_Tab_Style_title"
							style="width: 20px; text-align: left">
							至：
						</td>
						<td class="Main_Tab_Style_Content" style="width: 100px;">
							<input type="text" id="endtime" onClick="showDataTimeDailog('yyyy-MM-dd');" class="Wdate"
								style="width: 100px; height: 20px;" value="${endtime}"/>
						</td>
                        <td class="Main_Tab_Style_title"
							style="width:80px; text-align: left" id="titlestatus">
							状态：
						</td>
						<td class="Main_Tab_Style_Content" style="width: 100px;" id="contentstatus">
						<select  class="TextBox"  style="width: 100px" id="stepStatus">
						<option value="" >---请选择---</option>
							<c:forEach items="${stepList}" var="status" >
								<option value="${status.id.stepcode}">${status.stepname}</option> 
							</c:forEach>
						</select>
						</td>
						<td class="Main_Tab_Style_title"
							style="width:80px; text-align: left" id="departtitle">
							申请部门：
						</td>
						<td class="Main_Tab_Style_Content" style="width: 120px;" id="departcontent">
						<select  class="TextBox"  style="width: 120px" id="depart">
						<option value="" >---请选择---</option>
							<c:forEach items="${departList}" var="departlist" >
								<option value="${departlist.deptid}">${departlist.deptname}</option> 
							</c:forEach>
						</select>
						</td>
					  <td class="Main_Tab_Style_Content" style="text-align:left;">
							<input type="button" class="Button_out" value="查询" onclick="query()"/>
						</td>
					</tr>
				</table>
		</div>
		<table width="100%" class="grid" id="btnTab">
				<tr height="25" class="grid-header">
					<td colspan="6" style="text-align: left">
						<input type="button" value="添加" id="btnadd" class="Button_out"
							onClick="addWin('')" />
						<input type="button" value="删除" id="btndel" class="Button_out"
							onClick="deteleAll()" />	
						<input type="button" value="提交" class="Button_out" id="btncommit"
							onClick="openDialog('提交')" />	
						<input type="button" value="退回" id="btnback" class="Button_out"
							onClick="openDialog('退回')" />	
					</td>
				</tr>
		</table>
		<div id="materHight" 	style="width: 100%;height: 650px;">
			<table id="materialdata"></table></div>
	</body>
</html>
