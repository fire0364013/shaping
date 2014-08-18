<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ include file="/common/taglibs.jsp" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<title>监测项目信息</title>
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
			var projectdetail="${str}";
			$(function(){	
				
  			});
			
		</script>
		<script type="text/javascript" src="${ctx}/lims/js/projects/project.monitorpoint.js"></script>
	</head>
	<body onkeydown="PreventBSK();">		
		<div style="width:100%; height:80px">
    	<form id="itemid">
    	<input type="hidden" id="sampleitemid" name="sampleitem.sampleitemid" value="${sampleitem.sampleitemid}"/>
    	<input type="hidden" id="samplingsetid" name="sampleitem.samplingsetid.samplingsetid" value="${sampleitem.samplingsetid.samplingsetid}"/>
      	<input type="hidden" id="item" name="sampleitem.item.itemid" value="${sampleitem.item.itemid}"/>
      	<input type="hidden" id="itemtypeid" name="sampleitem.itemtypeid" value="${sampleitem.itemtypeid}"/>
      <table class="Main_Tab_Style" style="width: 100%; height: 80px">
            <tr>
                <td align="left" class="Main_Tab_Style_title" style="width: 130px;height:20px">
                  	分析方法：
                </td>
                <td align="left" class="Main_Tab_Style_Content">
                    <select class="TextBox" id="methodid" name="sampleitem.method.methodid" style="width: 250px;height:20px">
						<c:forEach var="methodid1" items="${itemmethods}">
						<option value="${methodid1.analysemethodid.methodid}" <c:if test="${sampleitem.method.methodid==methodid1.analysemethodid.methodid }">selected="selected"</c:if>>${methodid1.analysemethodid.methodname}</option>
						</c:forEach>
						</select>
                </td>                
            </tr>   
            <tr>
           		 <td align="left" class="Main_Tab_Style_title" style="width: 120px;height:20px">
                                                     分析费：
                </td>
                <td align="left" class="Main_Tab_Style_Content">
                    <input type="text" class="TextBox" id="analysisFee" 
                    style="width: 250px;height:20px" name="sampleitem.analysisFee" value="${sampleitem.analysisFee}" />
                </td>
            </tr>   
              <tr>
           		 <td align="left" class="Main_Tab_Style_title" style="width: 120px;height:20px">
                                                     前处理费：
                </td>
                <td align="left" class="Main_Tab_Style_Content">
                    <input type="text" class="TextBox" id="beforeFee" 
                    style="width: 250px;height:20px" name="sampleitem.beforeFee" value="${sampleitem.beforeFee}" />
                </td>
           	 </tr>
           	 <tr>
           		 <td align="left" class="Main_Tab_Style_title" style="width: 120px;height:20px">
                                                     样品采样费：
                </td>
                <td align="left" class="Main_Tab_Style_Content">
                    <input type="text" class="TextBox" id="sampleFee" 
                    style="width: 250px;height:20px" name="sampleitem.sampleFee" value="${sampleitem.sampleFee}" />
                </td>
           	 </tr>
            
        </table>
    </form>
   </div>
	
	</body>
</html>
