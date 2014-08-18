<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="/common/taglibs.jsp"%>
<%@ page import="java.io.*"%>
<%@ page import="java.util.*"%>
<%@ page import="com.runqian.report4.usermodel.Context"%>
<%@taglib uri="/WEB-INF/reportConf/runqianReport4.tld" prefix="report" %>
<html>
  <head>
    <title>报表</title>
	    <link type="text/css" href="${ctx}/themes/style.css" rel="stylesheet"/>
	    <link rel="stylesheet" href="${ctx}/themes/default/easyui.css" type="text/css" />
		<link rel="stylesheet" type="text/css" href="${ctx}/themes/icon.css">

		<script type="text/javascript" src="${ctx}/js/jquery-1.7.2.min.js"></script>
		<script type="text/javascript" src="${ctx}/js/jquery.easyui.min.js"></script>
		<script type="text/javascript" src="${ctx}/js/easyui-lang-zh_CN.js"></script>
		<script type="text/javascript" src="${ctx}/js/CommonCheck.js"></script>
		<script type="text/javascript" src="${ctx}/validate/input.validate.js"></script>
		<script type="text/javascript">	
			var rootPath="${ctx}";
		</script>
  </head>
  
<body topmargin=0 leftmargin=0 rightmargin=0 bottomMargin=0>
<%
	request.setCharacterEncoding( "GBK" );
	String report = java.net.URLDecoder.decode(request.getParameter( "raq" ),"UTF-8");
	String reportFileHome=Context.getInitCtx().getMainDir();
	StringBuffer param=new StringBuffer();
	
	//保证报表名称的完整性
	int iTmp = 0;
	if( (iTmp = report.lastIndexOf(".raq")) <= 0 ){
		report = report + ".raq";
		iTmp = 0;
	}
	
	Enumeration paramNames = request.getParameterNames();
	if(paramNames!=null){
		while(paramNames.hasMoreElements()){
			String paramName = (String) paramNames.nextElement();
			String paramValue=request.getParameter(paramName);
			paramValue=java.net.URLDecoder.decode(paramValue,"UTF-8");
			//System.out.println(paramValue+"$$$$$$$$$$$YYYYYYYYYYYYYYY%%%%%%%%%%%%");
			if(paramValue!=null){
				//把参数拼成name=value;name2=value2;.....的形式
				param.append(paramName).append("=").append(paramValue).append(";");
			}
		}
	}

	//以下代码是检测这个报表是否有相应的参数模板
	String paramFile = report.substring(0,iTmp)+"_arg.raq";
	File f=new File(application.getRealPath(reportFileHome+ File.separator +paramFile));
	System.out.println(application.getRealPath(reportFileHome+ File.separator +paramFile+"***********测试打印出的路径*******************"));
%>
<jsp:include page="toolbar.jsp" flush="false" />
<div id="rpt" align="center">
<%	//如果参数模板存在，则显示参数模板
	if( f.exists() ) {
	%>
	<table id="param_tbl" width="100%" height="100%"><tr><td>
		<report:param name="form1" paramFileName="<%=paramFile%>"
			needSubmit="no"
			params="<%=param.toString()%>"
			
		/>
	</td>
	<td><a href="javascript:_submit( form1 )"><img src="../../../images/query.jpg" border=no style="vertical-align:middle"></a></td>
	</tr></table>	<% }%>
		
		<report:html name="report1" reportFileName="<%=report%>"
			funcBarLocation="false"
			needPageMark="yes"
			reportEnterUrl="/common/report!toReportPage.action"
			generateParamForm="no"
			params="<%=param.toString()%>"
			exceptionPage="/common/error.jsp"
			appletJarName="runqianReport4Applet.jar,dmGraphApplet.jar"
		/>
</div>

<script language="javascript">
	//设置分页显示值
	document.getElementById( "t_page_span" ).innerHTML=report1_getTotalPage();
	document.getElementById( "c_page_span" ).innerHTML=report1_getCurrPage();
	
	//去重复
	function repeatHandle(str){
		var arr = str.split(",");
		var res=[],hash={};
		for(var i=0,elem;(elem=arr[i])!=null;i++){
			if(!hash[elem]){
				res.push(elem);
				hash[elem]=true;
			}
		}
		alert(res);
	}
</script>
</body>
</html>
