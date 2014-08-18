<%@ page language="java" import="java.util.*,com.beauty.biz.entity.Module,com.beauty.biz.entity.ModuleRight" pageEncoding="utf-8"%>
<%@ include file="/common/taglibs.jsp" %>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>


<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>权限管理</title>
    <script type="text/javascript">
    	var rootPath = "${ctx}";
    </script>
	<link rel="StyleSheet" href="<%=basePath %>themes/default/dtree.css" type="text/css" />
	<script type="text/javascript" src="<%=basePath %>js/dtree.js"></script>
  </head>
  
  <body>

<div class="dtree">
	<script type="text/javascript">
		<!--
		d = new dTree('d');
		d.add(0,-1,'');
		<%
		List list= (List)request.getAttribute("list");
		List<ModuleRight> moduleList = (List<ModuleRight>)request.getAttribute("modulelist");

		for(int i=0;i<list.size();i++){
			boolean checked = false;
			Module module = (Module)list.get(i);
			//System.out.println(module.getModuleid()+"----"+module.getModulename()+"-----"+module.getParentmoduleid());
			for(ModuleRight mr:moduleList){
				if(module.getModuleid().equals(mr.getModuleid())){
					checked = true;
				}			
			}
//			if("".equals(module.getParentmoduleid())||module.getParentmoduleid()==null){
			if(checked == true){
				%>
				d.add(<%=module.getModuleid()%>,<%=module.getParentmoduleid()%>,'permission','<%=module.getModuleid()%>','<%=module.getModulename()%>',true);
				<%	
			}else{
				%>
				d.add(<%=module.getModuleid()%>,<%=module.getParentmoduleid()%>,'permission','<%=module.getModuleid()%>','<%=module.getModulename()%>');
				<%
					
			}
		}
		%>

		document.write(d);		
		d.openAll();
		//-->
	</script>

</div>
  </body>

</html>
