<%@ page contentType="text/html;charset=UTF-8" %>
<%@ include file="/common/taglibs.jsp" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>后台管理系统</title>
<script type="text/javascript" src="${ctx }/js/jquery-1.7.2.min.js"></script>
<style type="text/css">
<style type="text/css">
body {
	margin: 0px;
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
.remind_div {
	position: absolute;
	z-index: 99;
	width: 230px;
	height:600px;/*设置整个待办事件窗口的高度*/
	float: right;
	top: 10px;
	right: 5px;
}
.remind_top {
	width:230px;
	height: 35px;
	background: url(images/remind_top.png) no-repeat;
}
.remind_main{
	width:230px;
	height:542px;/*设置整个待办事件列表背景的高度，这个div的存在是用于当列表数量不够出现滚动条时用于补齐背景的，这个高度是整个remind_div的高度减去remind_top和remind_bottom的高度得到的*/
	background:url(images/remind_bg.png) repeat-y;
}
#pending{
	position:absolute;
	top:35px;
	bottom:23px;
	width:228px;
	overflow-x: hidden;
	overflow-y: auto;
}
.remind_child_out {
	width: 230px;
	height: 35px;
	line-height: 35px;
	background: url(images/remind_child_out.png) no-repeat;
}
.remind_child_over {
	width: 230px;
	height: 35px;
	line-height: 35px;
	background: url(images/remind_child_over.png) no-repeat;
}
.remind_bottom {
	position:absolute;
	bottom:0px;
	width: 230px;
	height: 23px;
	background: url(images/remind_bottom.png) no-repeat;
}
.remind_num {
	font-size: 12px;
	color: #F00;
	width: 20px;
	padding-left: 5px;
}
.bg_img {
	height: 100%;
}
#container-bg {
	position: absolute;
	top: 0;
	left: 0;
	z-index: 98;
}
.img_lc{
	position:absolute;
	left:-20px;
	right:0;
	top:50px;
	z-index:99;
}
</style>

	<script language="JavaScript" type="text/javascript">
		var rootPath="${ctx}";
		$(function(){
			//pending();		
		});
		//查询待办
		function pending(){
			//待办任务
			$.ajax({
				   type: "get",
				   url: rootPath +'/pending!getPendings.action?'+'timeStamp='+new Date().getTime(),
				   success: function(msg){
				     $("#pending").html(msg);	
				   }
			});			
       	}		
		//点击待办转向页面
		 function showContentPage(url,subModuleName,parModeleName) {
        	
        	var navigateString="<ul id='nav'><li><a href=\"${ctx }/login!login.action\">首页</a></li><li><table border='0' cellspacing='0' cellpadding='0'><tr>"+
        	"<td width='34'><img src='images/nva_past.png' height='30' width='34' /></td><td><a id='parModule' class='past'>"+parModeleName.toString()+"</a></td></tr></table></li>"+
        	" <li><table  border='0' cellspacing='0' cellpadding='0'><tr><td width='40'><img src='images/nva_nowing_l.png' height='30' width='40' /></td>"+
        	"<td><a id='subModule' class='nowing'>"+subModuleName.toString()+"</a></td><td><img src='images/nva_nowing_r.png' height='30' width='36' /></td>"+
        	"</tr></table></li></ul>";
  
        	$(window.top.document).find("#navigation").html(navigateString);
            $(window.top.document).find("#contentFrame").attr("src", url.toString());
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
    </style>
</head>
<body>
<div class="img_lc"><img src="images/main2.png"/></div>
<!--<div class="remind_div">
  <div class="remind_top"></div>
  <div class="remind_main"> -->
  <!--待办列表开始----------------------------------------------->
	<!-- <div id="pending">  

      </div>        -->
  <!--待办列表结束----------------------------------------------->
  <!--  </div>  
  <div class="remind_bottom"></div>
</div>  -->
<div class="bg_img"> <img id="container-bg" src="./themes/login_images/main2.png" height="100%" width="100%" /> </div>
</body>
</html>