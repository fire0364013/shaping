<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ include file="/common/taglibs.jsp" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<title>批量设置采样信息、检测项目</title>
		<link rel="stylesheet" href="${ctx}/themes/default/easyui.css" type="text/css" />
		<link rel="stylesheet" type="text/css" href="${ctx}/themes/icon.css">
		<script type="text/javascript" src="${ctx}/js/jquery-1.7.2.min.js"></script>
		<script type="text/javascript" src="${ctx}/js/jquery.easyui.min.js"></script>
		<script type="text/javascript" src="${ctx}/js/easyui-lang-zh_CN.js"></script>
		<script type="text/javascript" src="${ctx}/js/CommonCheck.js"></script>
		<link rel="stylesheet" href="${ctx}/validate/validate.css" type="text/css" />
		<script type="text/javascript" src="${ctx}/validate/input.validate.js"></script>
		<script language="JavaScript" type="text/javascript">
			var rootPath="${ctx}";	
			var monitortype="${monitortype}";
			var projectdetail="${str}";
			$(function(){
				$('#days').focus();
				initBatchIteminfo('');
			})
    	</script>
		<script type="text/javascript" src="${ctx}/lims/js/projects/project.monitorpoint.js"></script>
</head>
  
  <body onkeydown="PreventBSK();">
    <form id="batchForm">
      <input type="hidden" id="projectpointid" name="projectpointid" />
      <table class="Main_Tab_Style" style="width: 100%;">
            <tr>
                <td align="left" class="Main_Tab_Style_title" style="width: 80px;height:20px">
                  	 监测天数：
                </td>
                <td align="left" class="Main_Tab_Style_Content">
                    <input type="text" class="TextBox grkj-validate" id="days"  validateParam="{type:'int',required:'true',maxLength:'9999999'}"  style="width: 80px;height:20px" name="samplingset.monitordays" value="1" />
                </td>
            	<td align="left" class="Main_Tab_Style_title" style="width: 120px;height:20px">
                                                      监测频次（次/天）：
                </td>
                <td align="left" class="Main_Tab_Style_Content">
                    <input type="text" class="TextBox grkj-validate"  validateParam="{type:'int',required:'true',maxLength:'999999999'}" style="width:80px;height:20px" name="samplingset.monitorfrequency" value="1" />
                </td>
                 <td align="left" class="Main_Tab_Style_title" style="width: 80px;height:20px">
                                                      监测周期：
                </td>
                <td align="left" class="Main_Tab_Style_Content">
                    <select class="TextBox"  name="samplingset.cycle" style="width:80px;height:20px" >
                	<option value="8">8小时</option>
                	<option value="12">12小时</option>
                	<option value="16">16小时</option>
                	<option value="24">24小时</option>
                   	</select>
                </td>
             </tr>
        </table>
        
        <div class="panelheader" style="margin:0 0 0 0">监测项目</div>
		<div class="grid-headerSpace">	
		<input type="button" value="添加" class="Button_out" onClick="addItemByBatch();"/>
	    <input type="button" value="删除" class="Button_out" onClick="deleteItemByBatch();"/>
	    	<input type="hidden"  id="sampletypesign" value="${sampletypesign}" />
	    	<input type="hidden" id = "itemid" name="itemid" onclick="getAllRows();"/>
	    </div>
	    <div style="width: 100%; height: 350px;">
	 		<table id="batchitemlist"></table>
		</div>
    </form>
  </body>
</html>
