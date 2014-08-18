<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="/common/taglibs.jsp" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <title>美容院信息管理系统</title>
    <meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7"/>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <link rel="stylesheet" href="${ctx }/themes/default/style.css" type="text/css" />
    <link rel="stylesheet" href="${ctx }/themes/icon.css" type="text/css" />
    <script type="text/javascript" src="${ctx }/js/jquery-1.7.2.min.js"></script>
    <script type="text/javascript" src="${ctx }/js/jquery.easyui.min.js"></script>
    <script type="text/javascript">
        function showContentPage(url,moduleid,subModuleName,parModeleName) {
        	setModule(moduleid);
        	//var navigateString="<ul id='nav'><li><a>首页></a></li><li><a id='parModule'>"+parModeleName.toString()+"></a></li> <li><a id='subModule'>"+subModuleName.toString()+"</a></li></ul>";
        	var navigateString="<ul id='nav'><li><a href=\"${ctx }/login!login.action\">首页</a></li><li><table border='0' cellspacing='0' cellpadding='0'><tr>"+
        	"<td width='34'><img src='images/nva_past.png' height='30' width='34' /></td><td><a id='parModule' class='past'>"+parModeleName.toString()+"</a></td></tr></table></li>"+
        	" <li><table  border='0' cellspacing='0' cellpadding='0'><tr><td width='40'><img src='images/nva_nowing_l.png' height='30' width='40' /></td>"+
        	"<td><a id='subModule' class='nowing'>"+subModuleName.toString()+"</a></td><td><img src='images/nva_nowing_r.png' height='30' width='36' /></td>"+
        	"</tr></table></li></ul>";
        	
        	$(window.top.document).find("#navigation").html(navigateString);
        	$(window.parent.document).find("#contentFrame").attr("height", "715");
            $(window.top.document).find("#contentFrame").attr("src", url.toString());
             $(window.top.document).find("#moduleName").val("");
            $(window.top.document).find("#moduleName").val(moduleid);
        }
        function setModule(moduleid){
        	$.ajax({
				type: "post",
				url: "${ctx }/login!setModuleToSession.action?moduleid="+moduleid,
				success: function(msg){					
				}
			});
        }
		
    </script>
    	<!-- 滚动条设置 -->
        <style type="text/css">
    	body{
    		overflow-x:hidden;
    		SCROLLBAR-FACE-COLOR:#dbebfe;
    		SCROLLBAR-SHADOW-COLOR:#b8d6fa;
    		scrollbar-highlight-color:#ffffff;
    		scrollbar-3dlight-color:#dbebfe;
    		SCROLLBAR-ARROW-COLOR:#458ce4;
    		SCROLLBAR-DARKSHADOW-COLOR:#dbebfe;
    		scrollbar-base-color:#dbebfe;
    		scrollbar-track-color:#efffff;
    	}
    	A {
			font-size: 12px;
			color: #009be3;
			text-decoration: none;
			padding-left: 20px;
			cursor: pointer;
		}
		A:link {
			TEXT-DECORATION: none;
			Color: #009be3;
			cursor: pointer;
		}
		A:visited {
			TEXT-DECORATION: none;
			Color: #009be3;
			cursor: pointer;
		}
		A:hover {
			COLOR: #ed8d2e;
			TEXT-DECORATION: none;
			cursor: pointer;
		}
		A:active {
			TEXT-DECORATION: none;
			Color: #ed8d2e;
			cursor: pointer;
		}
    	html { overflow-x: hidden; overflow-y: auto; } 
    </style>
</head>
<body style="background-color: transparent" >
    <div id="leftmenu" style="width:209px;">
        <div id="menu" class="easyui-accordion" style="width: 209px; vertical-align: top;border: 0">
       <c:if test="${not empty list}">
			<c:forEach items="${list}" var="menu" varStatus="s">
				<div title="<div class='menu1'>${menu['modulename']}</div>">
					<c:if test="${not empty menu.subNodeList}">
						<c:forEach items="${menu.subNodeList}" var="menu_child" varStatus="s_child">
						<div style="width: 209px; height: 35px; line-height: 35px; background: url(images/menu_child_mouse_out.png);"
				            onclick="javascript:showContentPage('${menu_child['url']}','${menu_child['moduleid']}','${menu_child['modulename']}','${menu['modulename']}');"
				            onmousemove="this.style.background='url(images/menu_child_mouse_over.png)'" onmouseout="this.style.background='url(images/menu_child_mouse_out.png)'">
				            <a style="padding-left: 34px;">${menu_child['modulename']}</a>
				            </div>
				        </c:forEach>				     
					</c:if>
				</div>
			</c:forEach>
		</c:if>
		</div>
        <div style="width:209px;height:36px; background: url(${ctx }/images/menubar_bottom.png)"></div>
    </div>
    
</body>
</html>
