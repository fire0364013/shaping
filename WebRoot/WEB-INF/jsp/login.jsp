<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ include file="/common/taglibs.jsp" %>
<%
	String context = request.getContextPath();
	request.setAttribute("context", context);
%>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>管理系统</title>
    <link rel="stylesheet" type="text/css"  href="${ctx}/css/login/login.css">
    <script type="text/javascript" src="${ctx }/js/jquery-1.7.2.min.js"></script>
	<script type="text/javascript" src="${ctx }/js/jquery.easyui.min.js"></script>
	<script type="text/javascript" src="${ctx }/js/easyui-lang-zh_CN.js"></script>
	<script type="text/javascript" src="${ctx }/js/CommonCheck.js"></script>
	<script type="text/javascript" src="${ctx }/js/jquery.json-2.3.js"></script>
	<script type="text/javascript" src="${ctx }/js/jquery.json-2.3.min.js"></script>
    <script type="text/javascript">
    	var path="${ctx}";
		if(top.location != self.location){
			top.location = self.location;  
		}
		
		function login(){
		var loginname1 = $("#loginname").val();
		var password1 = $("#password").val();
		if(loginname1==""){
			alert("请输入用户名！");
			$("#loginname").focus();
		}else if(password1==""){
			alert("请输入密码！");
			$("#password").focus();
		}else{
			var jsonUser={loginname:loginname1,	password:password1};//json对象
			var strUser=$.toJSON(jsonUser);//jsonUser.stringify(jsonUser);//json对象转换成json格式的字符串
			$.post(path+"/login!valid.action",{json:strUser},callback,"text");
			function callback(strVal){
				//	var json = $.evalJSON(strVal);		
					var json=eval('('+strVal+')');			
				if(json.success==1){//登录成功
					window.location.href="login!login.action"; //?json="+strUser;
				}else if(json.success=="-1"){//该用户已注销
					 alert(json.msg);
					$('#loginname').focus();
				}else if(json.success==0){//密码错误
					 alert(json.msg);
					$("#password").focus();
				}else if(json.success==2){//数据库连接异常,请与系统管理员联系!
					alert(json.msg);
					$("#loginname").focus();
				}else if(json.success==3){//用户名不存在
					alert(json.msg);
					$("#loginname").focus();
				}
			}
		}
	}
</script>
</head>
<body>
<div id="top">
    <img src="${ctx}/images/login/logo.png" id="logo" alt="">
</div>
<div id="split_bar"></div>
<div id="main">
    <table id="main_tab">
        <tr>
            <td ><img src="${ctx}/images/login/main_left.png" width="426" height="349" class="main_left"/></td>
            <td>
                <div id="login">
                    <div id="title"></div>
                  <div id="login_form">
                        
                            
                            <div class="input-row">
                            	<label for="j_username">用户名:</label>
                            	<span class="ctrl">
                                	<input name="loginname" type="text" class="textinput" id="loginname" autocomplete="on" value="admin">
                                </span>
                            </div>
                            <div class="input-row">
                            	<label for="j_password">口令:</label>
                            	<span class="ctrl">
                                	<input name="password" type="password" class="textinput" id="password" autocomplete="on" value="admin">
                                </span>
                          </div>
                            <div class="button-row">
                              <input class="formButton" type="submit" onclick="login()" value='登  录'>
                            </div>
                       
                    </div>
                </div>
            </td>
        </tr>
    </table>
</div>
<div id="footer">
    版权所有&nbsp;&nbsp;&copy;&nbsp;2013 &nbsp;&nbsp;
</div>
</body>
</html>
