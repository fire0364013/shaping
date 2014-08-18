<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ include file="/common/taglibs.jsp" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<title>监测方案</title>
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
			var monitortypeid="${monitortypeid}";
			$(function(){
				if($('#days').val()==null||$('#days').val()==""){
					$('#days').val("1");
				}
				if($('#frequency').val()==null||$('#frequency').val()==""){
					$('#frequency').val("1");
				}
			})
    	</script>
		<script type="text/javascript" src="${ctx}/lims/js/monitorproject/monitorproject.js"></script>
</head>
  
  <body  onkeydown="PreventBSK();">
    <div style="width:100%; height:80px">
    <form id="samplingForm">
    <input type="hidden" name="detailid" value="${detailid}"/>
    <input type="hidden" name="monitorpointid" value="${monitorpointid}"/>
    <input type="hidden" name="samplingset.projectpointid.projectpointid"" value="${samplingset.projectpointid.projectpointid}"/>
    <input type="hidden" name="samplingset.samplingsetid" value="${samplingset.samplingsetid}"/>
    <input type="hidden" id="samplingcount" name="samplingset.samplingcount" value="1" />
      <table class="Main_Tab_Style" style="width: 100%; height: 80px">
            <tr>
                <td align="left" class="Main_Tab_Style_title" style="width: 130px;height:20px">
                  	 监测天数：
                </td>
                <td align="left" class="Main_Tab_Style_Content">
                    <input type="text" class="TextBox grkj-validate" id="days" validateParam="{type:'int',required:'true',maxLength:'9999999'}"  style="width: 250px;height:20px" name="samplingset.monitordays" value="${samplingset.monitordays}" />
                </td>                
            </tr>   
            <tr>
           		 <td align="left" class="Main_Tab_Style_title" style="width: 120px;height:20px">
                                                      监测频次（次/天）：
                </td>
                <td align="left" class="Main_Tab_Style_Content">
                    <input type="text" class="TextBox grkj-validate" id="frequency"  validateParam="{type:'int',required:'true',maxLength:'999999999'}" style="width: 250px;height:20px" name="samplingset.monitorfrequency" value="${samplingset.monitorfrequency}" />
                </td>
            </tr>   
              <tr>
           		 <td align="left" class="Main_Tab_Style_title" style="width: 120px;height:20px">
                                                      监测周期：
                </td>
                <td align="left" class="Main_Tab_Style_Content">
                    <select class="TextBox"  name="samplingset.cycle" style="width:250px;height:20px">
                	<option value="8" <c:if test="${samplingset.cycle==8 }">selected="selected"</c:if>>8小时</option>
                	<option value="12" <c:if test="${samplingset.cycle==12 }">selected="selected"</c:if>>12小时</option>
                	<option value="16" <c:if test="${samplingset.cycle==16 }">selected="selected"</c:if>>16小时</option>
                	<option value="24" <c:if test="${samplingset.cycle==24 }">selected="selected"</c:if>>24小时</option>
                   	</select>
                </td>
            </tr>
            
        </table>
    </form>
   </div>

  </body>
</html>
