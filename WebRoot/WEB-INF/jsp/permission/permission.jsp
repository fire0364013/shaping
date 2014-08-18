<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ include file="/common/taglibs.jsp" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    
    <title>权限树</title>
	<link rel="stylesheet" type="text/css" href="${ctx}/themes/default/easyui.css">
	<link rel="stylesheet" type="text/css" href="${ctx}/themes/icon.css">
	<script type="text/javascript" src="${ctx}/js/jquery-1.7.2.min.js"></script>
	<script type="text/javascript" src="${ctx}/js/jquery.easyui.min.js"></script>
	<script type="text/javascript" src="${ctx}/js/CommonCheck.js"></script>
	<script type="text/javascript" src="${ctx}/js/jquery.json-2.3.js"></script>
	<script type="text/javascript" src="${ctx}/js/jquery.json-2.3.min.js"></script>
	<script type="text/javascript">
		var roleId;
		function getRoleId(id){
			roleId = id;
			var url = "${ctx}/module/module!moduleTree.action";
			url = url + "?id="+id;
			$('#moduleFrame').attr('src',url);
		}
		
		function save(){
			var count = 0;//iframe加上name属性，就可以兼容IE 火狐
			 var obj = window.frames["moduleFrame"].document.all.permission;
			 if(obj==null||obj==""){
			 	alert("请先选择角色！");
			 	return;
			 }
			var moduleIds = new Array();
			for(i=0;i<obj.length;i++){
				if(obj[i].checked){	
					moduleIds.push(obj[i].value);
					count ++;				
				}
			}
			var jsonStr = {roleid:roleId, moduleid:moduleIds};
			var jsonObj=$.toJSON(jsonStr);
			$.post("${ctx}/permission/permission!grantRight.action",{json:jsonObj},callback,"text");
			function callback(strVal){
				
			//	var json = $.evalJSON(strVal);	
				var json = eval('('+strVal+')');	
				if(json.success=='0'){
					 alert("授权成功！");
					 //$('#moduleFrame').reload();
				}
			}
		}
	</script>
  </head>
  
  <body class="easyui-layout">
	    <div region="west" split="true" title="角色" style="width:200px; height: 700px; padding: 0px 0px 0 0px;">
            <div style="height: 670; margin: 0 0 10px 0">
                <table id="attachmentlist" class="grid" style="width:100%">
                    <tr class="grid-header">
                        <td width="280" style="text-align: center"> 角色名称 </td>
                    </tr>
               		<s:iterator value="roleList">
					<tr class="grid-body">
						<td style="text-align: center" onclick="getRoleId('${roleid}')">${rolename}</td>
					</tr>
				</s:iterator>
                </table>
            </div>
		</div>
		<div region="center" title="权限">
			<div class="grid-headerSpace">
				<input type="button" value="保存" class="Button_out" onclick="save()"/>
			</div>
			
			<iframe id="moduleFrame" name="moduleFrame" width="100%" height="90%" frameborder="0" scrolling="yes" ></iframe>
		</div>
  </body>
</html>
