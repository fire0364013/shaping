<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ include file="/common/taglibs.jsp" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
		<title>任务计划单</title>
		<link rel="stylesheet" href="${ctx}/themes/default/easyui.css" type="text/css" />
		<link rel="stylesheet" type="text/css" href="${ctx}/themes/icon.css">
		<script type="text/javascript" src="${ctx}/js/jquery-1.7.2.min.js"></script>
		<script type="text/javascript" src="${ctx}/js/jquery.easyui.min.js"></script>
		<script type="text/javascript" src="${ctx}/js/CommonCheck.js"></script>
		<link rel="stylesheet" href="${ctx}/validate/validate.css" type="text/css" />
		<script type="text/javascript" src="${ctx}/validate/input.validate.js"></script>
		<script language="JavaScript" type="text/javascript">
			var rootPath="${ctx}";
			var projectcode="${projectcode}";
			$(function(){
				initSamplingList();
				$("#:radio").click(function(){
					initSamplingReport(this);
				});
			});
			
			//初始化样品流转单
			function initSamplingList(){
				$.ajax({
					type:'POST',
					url:rootPath+'/projects/taskregister/taskregister!initMonitortypeList.action',
					data:'projectcode='+projectcode,
					async:false,
					success:function(msg){
						var vData = eval('('+ msg +')');
						var lList = "测点类型： ";
						jQuery.each(vData, function(i, n) {
							var flag = n.attributes.flag;
							var value = n.attributes.url+"-"+n.id;//报表名-类型ID
							if(i==0){
								lList += "<input type='radio' name='"+n.projectcode+"' value='"+value+"' checked/>"+n.text;
							}else{
								lList += "<input type='radio' name='"+n.projectcode+"' value='"+value+"'/>"+n.text;
							}
						});	
						$('#samplingListDiv').html(lList);
						var cb = $("input[type=radio]:checked");
						initSamplingReport(cb);
					}
				});
			}
			
			function initSamplingReport(elem){
				var value = $(elem).val();
				var reportUrl = encodeURI(encodeURI(value.split("-")[0]));
				var sampleType = value.split("-")[1];
				if($(elem).attr("checked")=="checked"){
					$("#samplingReportFrame").attr("src",rootPath + "/common/report!toReportPage.action?raq=flowList/"+reportUrl
						+"&projectcode="+projectcode+"&monitortypeid="+sampleType);
				}else{						
					$("#samplingReportFrame").attr("src",rootPath + "/common/report!toReportPage.action?raq=flowList/"+reportUrl);
					}
				
			}
			
	   	</script>
	</head>
	
	
	<body>
		<div class="grid-headerSpace" id="samplingListDiv" style="height: 30px;"></div>
		<iframe id=samplingReportFrame width="100%" height="630" frameborder="0"></iframe>
	</body>

</html>