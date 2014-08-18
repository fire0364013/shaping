<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ include file="/common/taglibs.jsp" %>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<title>数据导出</title>
		
		
		<link rel="stylesheet" href="${ctx}/themes/default/easyui.css" type="text/css" />
		<link rel="stylesheet" href="${ctx}/validate/validate.css" type="text/css" />
		<link rel="stylesheet" type="text/css" href="${ctx}/themes/icon.css">
		<link rel="stylesheet" href="${ctx}/js/DatePicker/skin/WdatePicker.css" type="text/css" />
		<link rel="stylesheet" type="text/css" href="${ctx}/themes/icon.css">
		<script type="text/javascript" src="${ctx}/js/jquery-1.7.2.min.js"></script>
		<script type="text/javascript" src="${ctx}/js/jquery.easyui.min.js"></script>
		<script type="text/javascript" src="${ctx}/js/easyui-lang-zh_CN.js"></script>
		<script type="text/javascript" src="${ctx}/js/jquery.MultiFile.js"></script>
		<script type="text/javascript" src="${ctx}/js/DatePicker/WdatePicker.js"></script>
		<script type="text/javascript" src="${ctx}/js/CommonCheck.js"></script>
		<script language="JavaScript" type="text/javascript">
		var rootPath="${ctx}";
/**
 * 选择监测点类型使用的方法
 * @param 
 * @return
 */
function searchtype(){	
	var monitorpointtypeid=$('#mptid').val();
	var urlParm=rootPath +"/surwaterstatistic/statisticdata!getAllDaLeiJSON.action?monitorpointtypeid="+monitorpointtypeid;
	$.ajax({
		type:"POST",
		url:urlParm,
		success:function(data){
			var vData = eval("(" + data + ")");
			var lList = "";
			//遍历json数据  
			jQuery.each(vData.rowsData, function(i, n) {
					lList += "<option value=" + n.id + ">" + n.statisticstypename	+ "</option>";
			});	
			$('#itemtypeid').append(lList);
		},
		error:function(data){
			alert("服务器正在维修，请稍后！");
		}
	}
	);	
}
function query(){
	var monitorpointtypeid=$('#mptid').val();
	var itemtypeid=$('#itemtypeid').val();
	var starttime=$('#starttime').val();
	var endtime=$('#endtime').val();
	var ids = itemtypeid.split("-");
	alert(ids[0]+ids[1]);
	$("#billFrame").attr("src",rootPath + "/common/report!toReportPage.action?raq=MonitorReport/"+encodeURI(encodeURI(ids[1]))+"&monitorpointtypeid="+monitorpointtypeid+"&itemtype="+ids[0]+"&startdate="+starttime+"&enddate="+endtime+"&timeStamp="+new Date().getTime());
}
		
</script>
	</head>
	<body >
		 <s:form method="post" id="exportExcel" theme="simple" cssStyle="padding:0px;margin:0px">
		<div  style="height: 30px; size: 12px">
			<div>
			
				<table class="Main_Tab_Style" style="width: 100%; height:22px">
					<tr>
						<td class="Main_Tab_Style_title"
							style="width:80px; text-align: left">
							监测点类型：
						</td>
						<td class="Main_Tab_Style_Content" style="width: 150px;">
							<s:select list="mptlis" listKey="%{monitorpointtypeid}" listValue="%{monitorpointtypename}"  headerValue="---请选择---" headerKey=""
							cssClass="TextBox"  id="mptid" name="mptid" cssStyle="width:150px;"  onchange="searchtype()">
							</s:select>
						</td>
                        <td class="Main_Tab_Style_title"
							style="width:80px; text-align: left">
							统计类型：
						</td>
							<td align="left" class="Main_Tab_Style_Content" style="width: 150px;">
								<select  class="TextBox "  id="itemtypeid"  style="width: 150px;height:20px">
								<option value=''>---请选择---</option>
								</select> 
							</td>		
						<td align="left" class="Main_Tab_Style_title"
							style="width: 60px; height: 20px;">查询时间：</td>
						<td class="Main_Tab_Style_Content" style="width: 100px;">
							<input type="text" id="starttime" onClick="showDataTimeDailog('yyyy-MM-dd');" class="Wdate"
								style="width: 100px; height: 20px;" />
						</td>
						<td class="Main_Tab_Style_title"
							style="width: 20px; text-align: left">
							至：
						</td>
						<td class="Main_Tab_Style_Content" style="width: 100px;">
							<input type="text" id="endtime" onClick="showDataTimeDailog('yyyy-MM-dd');" class="Wdate"
								style="width: 100px; height: 20px;" />
						</td>
					  <td class="Main_Tab_Style_Content" style="text-align:left;">
							<input type="button" class="Button_out" value="查询" onclick="query()"/>
							<!--<input type="button" class="Button_out" value="导出"
								onclick="ExportExcel()"/>	
						--></td>
				</tr>
				</table>
			</div>
		</div>
		</s:form>
		<div  style="width: 100%;height: 655px;margin: 2px 2px 2px 0px" >
			<iframe id="billFrame" width="100%" height="100%" frameborder="0" scrolling="yes"></iframe>
			</table>
		</div>
	</body>
</html>
