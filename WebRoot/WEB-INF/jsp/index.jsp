<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="/common/taglibs.jsp" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    
    <title>美容院信息管理系统</title>
    
	<link rel="stylesheet" href="${ctx }/themes/default/easyui.css" type="text/css" />
    <link rel="stylesheet" href="${ctx }/themes/icon.css" type="text/css" />
    <link rel="stylesheet" href="${ctx}/js/DatePicker/skin/WdatePicker.css" type="text/css" />    
 	<link rel="stylesheet" href="${ctx }/themes/default/menu_style.css" type="text/css" />	
	<link rel="stylesheet" href="${ctx}/validate/validate.css" type="text/css" />
    <script type="text/javascript" src="${ctx }/js/jquery-1.7.2.min.js"></script>
    <script type="text/javascript" src="${ctx }/js/jquery.easyui.min.js"></script>
    <script type="text/javascript" src="${ctx }/js/jquery.json-2.3.js"></script>
	<script type="text/javascript" src="${ctx }/js/jquery.json-2.3.min.js"></script>
	<script type="text/javascript" src="${ctx }/js/CommonCheck.js"></script>
	<script type="text/javascript" src="${ctx}/js/DatePicker/WdatePicker.js"></script>
	<script type="text/javascript" src="${ctx}/validate/input.validate.js"></script>
    <script type="text/javascript">
        $(document).ready(function() {
            //设置当前时间t
            var now, year, month, date, day, hours, minutes, seconds, timeValue;
            function showCurrentTime() {
                var dayname = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六");
                var monthname = new Array("1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月");
                now = new Date();
                day = now.getDay();
                year = now.getFullYear();
                month = now.getMonth();
                date = now.getDate();
                hours = now.getHours();
                minutes = now.getMinutes();
                seconds = now.getSeconds();
                timeValue = year + "年";
                timeValue = timeValue + monthname[month];
                timeValue = timeValue + date + "日";
                timeValue = timeValue + " " + hours + "点";
                timeValue = timeValue + ((minutes < 10) ? "0" : "") + minutes + "分";
                timeValue = timeValue + ((seconds < 10) ? "0" : "") + seconds + "秒";
                $("#divCurrentTime").html(timeValue + " " + dayname[day]);
                setTimeout(showCurrentTime, 100);
            }
            showCurrentTime();
            //设置按钮滑动效果
            $("span").hover(function() {
                var oldClass = $(this).attr("class");
                if (checkLastMatch(oldClass, '_over')) {
                    var newClass = oldClass.replace("_over", "_out");
                    $(this).attr("class", newClass);
                }
            },
             function() {
                 var oldClass = $(this).attr("class");
                 if (checkLastMatch(oldClass, '_out')) {
                     var newClass = oldClass.replace("_out", "_over");
                     $(this).attr("class", newClass);
                 }
             });
            //按皮提交复核tijiaofuhe
            $("#tijiaofuhe").click(function(){
				 $("#contentFrame").contents().find("#tijiaofuhe").click();
			 });
            //按批审核，按批复核提交刷新时调用该方法
             $("#closeDialog").click(function(){
				 $(".panel.window").remove();
				 $(".window-shadow").remove();
				 $(".window-mask").remove();
				 $("#contentFrame").contents().find("#closeDialog").click();
			 });
           //closeSampleitemDialog,closeSampleDialog,closeMonitorpointDialog,closeProjectDialog
            $("#closeSampleitemDialog").click(function(){
				 $(".panel.window").remove();
				 $(".window-shadow").remove();
				 $(".window-mask").remove();
				 $("#contentFrame").contents().find("#closeSampleitemDialog").click();
			 });
            $("#closeSampleDialog").click(function(){
				 $(".panel.window").remove();
				 $(".window-shadow").remove();
				 $(".window-mask").remove();
				 $("#contentFrame").contents().find("#closeSampleDialog").click();
			 });
             $("#closeMonitorpointDialog").click(function(){
				 $(".panel.window").remove();
				 $(".window-shadow").remove();
				 $(".window-mask").remove();
				 $("#contentFrame").contents().find("#closeMonitorpointDialog").click();
			 });
              $("#closeProjectDialog").click(function(){
				 $(".panel.window").remove();
				 $(".window-shadow").remove();
				 $(".window-mask").remove();
				 $("#contentFrame").contents().find("#closeProjectDialog").click();
			 });
              /*
            $("#ctlMenutd").click(function() {
                var displayFlag = $("#leftMenuFrame").is(":hidden");
                if (displayFlag) {
                    $("#leftMenuFrame").show();
                    $("#ctlMenu").removeClass("menucontrol_over");
                    $("#ctlMenu").addClass("menucontrol_out");
                }
                else {
                    $("#leftMenuFrame").hide();
                    $("#ctlMenu").removeClass("menucontrol_out");
                    $("#ctlMenu").addClass("menucontrol_over");
                }
            });

			$("#showmenu").hover(function(){
				$("#menu").animate({left:0},"fast");
				$("#showmenu").css("display","block");
				
			},function(){
				$("#menu").animate({left:0},"fast");
				$("#showmenu").css("display","none");
				
			});
			
			//zcd 修改注释
			$("#menu").mouseleave(function(){
				$("#menu").animate({left:-220},"fast");
				$("#showmenu").css("display","block");
			
			});
			
			$("#hidmenu").click(function(){
				$("#menu").animate({left:-220},"fast");
				$("#showmenu").css("display","block");
			});*/
			/*$("#showmenu").click(function(){
				$("#menu").animate({left:0},"fast");
				$("#showmenu").css("display","none");
			});*/
		
		
        });
		//修改密码
		function showEditDialog(id){
				var url = "${ctx }/login!editPassword.action";
				var _dialog =  window.top.$('	<div id ="role-dlg" style="padding:0px;"><iframe id="passwordFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
				_dialog.dialog({
					title:'修改密码',
					autoOpen:false,
					modal:true,
					closed:true,
					width:'280',
					height:'180',
					buttons:[{
						text:'保存',
						iconCls:'icon-save',
						handler:function(){
						var password1=$("#passwordFrame",top.document.body).contents().find('#password1').val();
						var password =$("#passwordFrame",top.document.body).contents().find('#password').val();
						var password2=$("#passwordFrame",top.document.body).contents().find('#password2').val();
						
						if(password1==""){
							alert("请输入原密码！");
							$("#passwordFrame",top.document.body).contents().find('#password').focus();
							 return false;
						}else if(password==""){
							alert("请输入新密码！");
							$("#passwordFrame",top.document.body).contents().find('#password').focus();
							 return false;
						}else if(password2==""){
							alert("请输入确认密码！");
							$("#passwordFrame",top.document.body).contents().find('#password2').focus();
							 return false;
						}else if(password!=password2){
						   alert("新密码输入不一致！");
					       $("#passwordFrame",top.document.body).contents().find('#password2').focus();
					       return false;
					     }else{
							var jsonPassword={password:password,password1:password1};//json对象
							var strPassword=$.toJSON(jsonPassword);//json对象转换成json格式的字符串
							$.post("login!savePassword.action",{json:strPassword},callback,"text");
							function callback(strVal){
								//var json = $.evalJSON(strVal);
								var json = eval('('+strVal+')');		
								if(json.success==1){
									alert(json.msg);
									_dialog.dialog('close');
								}else if(json.success==0){
									alert(json.msg);
								}
							}
					     }
						}
					},{
						text:'取消',
						iconCls:'icon-cancel',
						handler:function(){
							_dialog.dialog('close');
						}
					}],
					onClose:function(){
						_dialog.dialog("destroy");
						
					}
				});
				_dialog.dialog('open');
			}

		
	/**
	 * 下载帮助文档的时候的方法
	 * @param name
	 * @return
	 */
	function showHelpWord(){
		var urlParm="${ctx }/login!showHelpWord.action?flg=0";
		$.ajax({
			type:"POST",
			url:urlParm,
			success:function(data){
				cache:false;
			if(data=="success"){
				var urlParmDown="${ctx }/login!showHelpWord.action?flg=1";
				$("#helpWordForm").attr("action",urlParmDown);
				$("#helpWordForm").submit();
			}else{			
				alert("尚未上传帮助文档，请与管理员联系！");
				}
			},
			error:function(data){
				alert("服务器正在维修，请稍后！");
			}
		}
	);	
	}
		

		 function logout(){
		       if( window.confirm("是否退出？")){
			       $("#aLoginOut").attr("href","${ctx }/login!logout.action")
			      }
		      }
		 
		
		 function closeDialog(){
			alert($(".panel.window").html());
		}
		 
		 //动态获取被引用的页面的高度 
		function resetIframe(){     
			var iframe = document.getElementById("contentFrame");    
			try{     
				var bHeight = document.body.offsetHeight ;  
				alert(bHeight+"滚动条：");   
				iframe.height =  bHeight;     
			}catch (ex){}     
		}   

//zcd 修改
		function menumousedown(){
			$("#menu").animate({left:-220},"fast");
			$("#showmenu").css("display","block");
		}
		
		//window.setInterval("resetIframe()", 9000);
		 
    </script>

     <!--<style type="text/css">
		ul, li {list-style-type:none;padding:0;margin:0;}  
		#nav {height:30px; background:#a9d7ff; font-size:12px; letter-spacing:5px; width:100%;}  
		#nav li {float:left;line-height:30px;color:#20639e;padding-left:10px;}  
		#nav li a {display:block;}  
		#nav li a:link,#nav li a:visited {color:#20639e;text-decoration:none;}
		html {
			overflow:hidden;
		}
	</style>-->
	 <style type="text/css"> 
		ul, li {list-style-type:none;padding:0;margin:0;}  
		#nav {height:30px; background:url(images/nva_bg.png); font-size:12px; letter-spacing:5px;width:100%;}  
		#nav li {float:left;line-height:30px;;color:#ffffff;padding-left:10px;}  
		#nav li a {display:block;}  
		#nav li a:link,#nav li a:visited {color:#ffffff;text-decoration:none;}  
		.nowing{color:#ffffff; background:url(images/nva_nowing.png); width:100%; line-height:30px; display:block;}
		.past{color:#ffffff; width:100%; line-height:30px; display:block; padding-left:7px;}
	
	</style>
	
	
  </head>
  
  <body><!-- //closeSampleitemDialog,closeSampleDialog,closeMonitorpointDialog,closeProjectDialog -->
   <input type="hidden" id="closeSampleitemDialog" value="关闭窗口" /><!-- 原始数据按样品提交复核关闭窗口用到 -->
   <input type="hidden" id="closeSampleDialog" value="关闭窗口" /><!-- 原始数据按样品提交复核关闭窗口用到 -->
   <input type="hidden" id="closeMonitorpointDialog" value="关闭窗口" /><!-- 原始数据按样品提交复核关闭窗口用到 -->
   <input type="hidden" id="closeProjectDialog" value="关闭窗口" /><!-- 原始数据按样品提交复核关闭窗口用到 -->
  	<input type="hidden" id="closeDialog" value="关闭窗口" /><!-- 原始数据按皮复核和签发关闭窗口用到 -->
  	<input type="hidden" id="tijiaofuhe" value="关闭窗口" /><!-- 原始数据按皮提交符合关闭窗口用到 -->
  <form id="helpWordForm" method="post"></form>
   	<table width="100%" height="51" border="0" cellspacing="0" cellpadding="0" background="images/top_bg.gif">
        <tr background="images/top_bg.gif">
            <td>
                <img src="images/top_sys_name.gif" width="332" height="51"/>
            </td>
            <td>
                <img src="images/top_right_img.gif" width="667" height="51"/>
            </td>
        </tr>
    </table>
    <table style="width: 100%; height: 31px;" border="0" cellspacing="0" cellpadding="0">
        <tr>
            <td style="width: 12; height: 31;">
                <img src="images/tab_bar_left-1.png" width="12" height="31" /></td>
            <td style="width: 100%; height: 31px; text-align: left" background="images/tab_bar_bg.gif">
                <table style="width: 100%;" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                        <td style="width: 300px;">
                            <div  style="color:#158cce">${sessionUser.realname}，欢迎您登陆美容院信息管理系统！</div>
                        </td>
                        <td style="width: 16px;">
                            <img src="images/icon_clock.gif" width="16" height="16" alt=""/>
                        </td>
                        <td style="width:300px; height: 31;">
                           <div id="divCurrentTime" style="width:191; height: 31; color:#158cce">2014-3-15 12:00:00 星期六</div>
                        </td>
                         <td>&nbsp;&nbsp;&nbsp;
                        </td>
                        <!-- <td width="20px">
                            <img src="themes/default/images/icon_help.png" width="16" height="16" alt="" />
                        </td>
                        
                        <td width="70px" align="left">
                            <a id="showHelp" onclick="showHelpWord()" href="#" style="color:#158cce; text-decoration:none;cursor:pointer">帮助文档</a>
                        </td> -->
                        <td width="20px">
                            <img src="themes/default/images/icon_xgmm.gif" width="16" height="16" alt="" />
                        </td>
                        <td width="70px" align="left">
                            <a id="aModifyPwd" onclick="showEditDialog('')" href="#" style="color:#158cce; text-decoration:none;cursor:pointer">修改密码</a>
                        </td>
                        <td width="20">
                            <img src="themes/default/images/icon_zhuxiao.gif" width="16" height="16" alt="" />
                        </td>
                        <td width="35px" align="left">
                            <a id="aLoginOut" style="color:#158cce; text-decoration:none;cursor:pointer" onclick="logout()">退出</a>
                        </td>
                    </tr>
                </table>
            </td>
            <td style="width: 12; height: 31;">
                <img src="images/tab_bar_right.png" width="12" height="31" /></td>
        </tr>
    </table>
    <table style="width: 100%; height:100%" align="right" border="0" cellspacing="0" cellpadding="0">
    	<tr>
    	    <td >
			    <table style="width: 15%; height:100%;"  align="left" border="0" cellspacing="0" cellpadding="0">
			    	<tr>
			    		<td>
						  	<div id="menu" style="height:100%;position: absolute; top:90px;left:-1px;" >
						   		<div style="width:100%; height:39px; background: url(${ctx }/images/menubar_top.png)">
						   		</div>
								<iframe id="leftMenuFrame" width="100%" style="overflow-x:auto;overflow-y:auto;" height="100%" frameborder="0" allowTransparency="true" scrolling="no" src="${ctx }/login!leftMenu.action">
								</iframe>
						    </div>
			    		</td>
			    	</tr>
			    </table>    	    
    	    </td>
    	    
    	    <td >
				 <table style="width: 85%; height:100%" align="right" border="0" cellspacing="0" cellpadding="0">
					<tr>
					    <td height="100%" style="background-color: #158cce;">
					    </td>
					    <td style="width:99%; height: 100%; vertical-align: top;">
					        <table style="width: 100%;height: 100%" border="0" cellspacing="0" cellpadding="0">
					            <tr>
					            	<td style="width:15px;"></td>
					                <td style="width:100%; height:100%; vertical-align:top">
					                	<!--导航  -->
							           	<div id="navigation" width="100%" height="0" ></div>
							           	<input type="hidden"  id="moduleName" name="moduleName"/>
							           	<!-- 主窗口 -->
					               		<iframe id="contentFrame" width="100%" height="760" frameborder="0" scrolling="no" src="${ctx }/login!background.action">
					                    </iframe>
					               </td>
					            </tr>
					        </table>
					    </td>
					    <td width="6" height="100%" style="background-color: #158cce;">
					    </td>
					</tr>
				</table>    	    
    	    </td>
    	</tr>
    </table>

    <table width="100%" height="28px" border="0" cellspacing="0" cellpadding="0">
        <td class="copyright_Main">
            技术支持：东莞火龙果网络科技有限公司
        </td>
    </table>	    
  </body>
</html>