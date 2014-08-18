
/*调整窗体大小*/
window.onresize = adbpAppInit;
function adbpAppInit(){
	var documentHeight = document.documentElement.clientHeight;
	var main = document.getElementById("mainContent");
	var header = document.getElementById("header");
	var footer = document.getElementById("footer");
	main.style.height = (documentHeight - header.offsetHeight - footer.offsetHeight-4) +"px";
}
/*初始化APP列表*/
function initAppsList(){
	var appsList =  document.getElementById("appsList");
	var appListContainer = appsList.parentNode;
	var ul = document.createElement("ul");
	$.ajax({
		url: rootPath +"/login!getAppSyss.action",
		type: "post",
		async: true,
		dataType: "json",
		success : function(data){
			$.each(data,function(index,element){
				var li = document.createElement("li");
				li.id = element.id;
				li.innerHTML = element.name;
				if(appId == element.id){//选中与当前应用相匹配的应用
					li.style["background-color"] = "#2c8bd0";
					appsList.innerHTML = element.name;
				}
				li.onclick = function(){
					//应用跳转
					if(appId == li.id )
						return;
					if(element.menuType == "DataCenterMenu")
						location.href="adbp_dc.jsp?appId="+li.id;
					else
						location.href="adbp.jsp?appId="+li.id;
				};
				ul.appendChild(li);
			});
			appListContainer.appendChild(ul);
		},
		error: function (XMLHttpRequest, textStatus, errorThrown){
        	alert(textStatus+' = '+errorThrown);
        }
	});
	appListContainer.onclick = function(){
		appListContainer.focus();
		ul.style["display"] = "block";
	};
	appListContainer.onblur = function(){ul.style["display"] = "none";};
}
function logoutConfirm(){
	$.messager.confirm('登出', '您确定要注销吗？', function(r){
		if (r){
			top.location.href = rootPath+"/login.action";
		}
	});
}
function chPwd(){
	$("#pFormDiv").css('display','');
	document.getElementById('pForm').reset();
	$("#msg_content").html("");
	$('#pFormDiv').dialog({
		title : '修改密码',
		width : 370,
		height : 220,
		closed : false,
		cache : false,
		modal : true,
		buttons : [{
			text : '保存',
			handler : function(){
				$('#pForm').form({
				    url:rootPath+ "/login!savePassword.action",   
				    onSubmit: function(){
						if ($(this).form('validate')){
							if($("#pForm input[name='password']")[0].value != $("#pForm input[name='password2']")[0].value){
								alert("新密码与重复新密码不一致，请重新输入");
								return false;
							}
							return true;
						}
						return false;
				    },
				    success:function(data){
				    	var d = eval('(' + data + ')');
				    	if(d.success == true){
				    		$('#pFormDiv').dialog('close');
				    		alert("修改成功！");
						}else{
							alert(d.msg);
						}
				    }
				});
				$('#pForm').submit(); 
		    }
		},{
			text : '关闭',
			handler : function() {
				$('#pFormDiv').dialog('close');
			}
		}]
	});
}
function showIndexTab(){
	var id = "indexFrame";
	var lis = tagsUl.getElementsByTagName("li");
	for(var i=0;i<lis.length;i++){
		if(id != lis[i].id){
			lis[i].className = "tabClose";
		}else{
			lis[i].className = "tabOpen";
		}
	}
	
	var iframes = mainContent.getElementsByTagName("iframe");
	for(var i=0;i<iframes.length;i++){
		if(id != iframes[i].id){
			iframes[i].style["display"] = "none";
		}else{
			iframes[i].style["display"] = "block";
		}
	}
	showCurrentLocation(id);
}