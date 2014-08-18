/*加载菜单*/
/**目录结构举例
 * <div id="menu">
 *     <ul>
 *         <li>
 *             <a href="">一级目录</a>
 *             <div>二级目录div</div>
 *         <li>
 *         <li>...<li>
 *     </ul>
 *</div>
 *修正提示:先去掉alert(menuObj.outerHTML);的注释来查看代码生成的HTML,减轻代码理解难度
 */
var mainFrameName = "main";//主面板名称
var currentLocationArray = new Array();//当前位置数组,当用户点击菜单时读取
var splitSign = " → ";//分级区分符
var currentLocationLabel = null;
var tagsUl = null;//选项卡
var currentClickLiId = null;//当前右击的LI的ID
var mainContent = null;
//var limitTabsCount = 0;
var scrollSize = 400;//选项卡滚动宽度
var tagsUlWidth = 28;//选项卡宽度
var topTagBackWard = null;//选项卡右移按钮
var topTagForward = null;//选项卡左移按钮
function initMenu(){
    var menuObj = document.getElementById("menu");
    currentLocationLabel = document.getElementById("current_location_label");
    tagsUl = document.getElementById("topTags").getElementsByTagName("ul")[0];
    topTagBackWard = document.getElementById("topTagBackWard");
    topTagForward = document.getElementById("topTagForward");
    mainContent = document.getElementById("mainContent");
    
    var jsonData = '';
    $.ajax({
    	url: "${ctx }/login!menu.action",  
        type: "post",  
        async: false,
        dataType: "json",
        success: function (json) {
        	jsonData = json.menus;
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
        	alert(textStatus+' = '+errorThrown);
        }
    });
    
    var ul = document.createElement("ul");
    //遍历节点数据,创建一级目录
    var panelId = 0;//二级目录ID计数
    $.each(jsonData,function(index,element){
    	var currLocStr = "";//用户当前位置
        var li  = document.createElement("li");
        var divId = "panel"+panelId;//二级目录div面板ID,用于使面板自适应
        
        var a = document.createElement("a");//创建一级目录链接
        a.className = "firstMenu";
        if(element.url == null || element.url == ""){//如果URL为空,则赋予#,防止点击跳转
            a.href = "#";
        }else{
        	a.href = "#";
            a.onclick = function(){
            	showCurrentLocation(element.moduleid);
            	addTab(element.moduleid,element.modulename,element.url);
            };
        }
        li.appendChild(a);
        a.innerHTML = element.modulename;//一级目录文本
        
        /*添加用户当前位置开始*/
        currLocStr += element.modulename;
        pushCurrentLocation(new Menu(element.moduleid,currLocStr));
        /*添加用户当前位置结束*/
        
        if(element.subNodeList != null && typeof(element.subNodeList) != "undefined"){//如果有二级目录
        	li.appendChild(createItemDiv(element.subNodeList,divId,currLocStr));//添加二级目录DIV
        	li.onmouseover = function(){adjustWindow(divId);};
        }
        panelId ++;
        ul.appendChild(li);
    });
    menuObj.appendChild(ul);//把一级目录加入到目录面板
   // alert(menuObj.innerHTML);//若想查看生成文档结构,把注释去掉即可(firefox中可复制弹出框文本,再格式化html)
}
/*
创建二级节点面板
function createItemDiv(element,divId,currLocStr){
    //二级目录面板定义    var itemPanel =  document.createElement("div");
    //设置ID,由传进参数决定    itemPanel.id = divId;
    itemPanel.className = "secondMenuPanel";
        //外层包裹一个div用于设置样式    var containerDiv = document.createElement("div");
    containerDiv.className = "containerDiv";
    
    containerDiv自动宽度,如果没有三级菜单,则设置为自动    var containerDivAutoWidth = true;
    二级菜单遍历    $.each(element,function(index,element){
    	var currLocStr2 = currLocStr;
    	var dl = document.createElement("dl");
    	var dt = document.createElement("dt");    	var dd = document.createElement("dd");
    	var a = document.createElement("a");
    	if(index == 0){
    		dl.className = "fore";
    	}
    	
    	a.innerHTML = element.modulename;
    	if(element.url == null || element.url == ""){如果URL为空,则赋予#,防止点击跳转            a.href = "#";
        }else{
        	a.href = "#";
            a.onclick = function(){
            	showCurrentLocation(element.moduleid);
            	addTab(element.moduleid,element.modulename,element.url);
            };
        }
    	if(typeof(element.subNodeList) != "undefined"         			&& element.subNodeList != null){    		         }else{        	var em = document.createElement("em");    		a.className = "linkItem";	        	if(count<length){	        		a.innerHTML = element.name + "&nbsp;&nbsp;&nbsp;&nbsp;|";	        	}else{	        		a.innerHTML = element.modulename;	        	}	        em.appendChild(a);	        	if(count<length){	        		var splitSpan = document.createElement("span");//分隔栏	            	splitSpan.className = "splitSpan";	        		em.appendChild(splitSpan);	        	}    	}    	dt.appendChild(a);
    	 添加用户当前位置开始
    	currLocStr2 += splitSign + element.modulename;
        pushCurrentLocation(new Menu(element.moduleid,currLocStr2));
        添加用户当前位置结束
    	
        
        如果存在子节点,则进行遍历,得到第三级目录        if(typeof(element.subNodeList) != "undefined" 
        			&& element.subNodeList != null){
        	var containerDivAutoWidth = false;
        	var length = element.subNodeList.length;
        	var count= 1 ;
        	$.each(element.subNodeList,function(index,element){
        		var currLocStr3= currLocStr2;三级目录菜单路径	        	var em = document.createElement("em");
	        	var a = document.createElement("a");
	        	if(element.url == null || element.url == ""){
	                a.href = "#";
	            }else{
	            	a.href = "#";
	                a.onclick = function(){
	                	showCurrentLocation(element.moduleid);
	                	addTab(element.id,element.modulename,element.url);
	                };
	            }
	        	a.className = "linkItem";
	        	if(count<length){
	        		a.innerHTML = element.name + "&nbsp;&nbsp;&nbsp;&nbsp;|";
	        	}else{
	        		a.innerHTML = element.modulename;
	        	}
	        	
	        	用户当前位置	        	currLocStr3 += splitSign + element.modulename;
	            pushCurrentLocation(new Menu(element.moduleid,currLocStr3));
	        	
	        	em.appendChild(a);
	        	if(count<length){
	        		var splitSpan = document.createElement("span");分隔栏	            	splitSpan.className = "splitSpan";
	        		em.appendChild(splitSpan);
	        	}
	        	
	        	dd.appendChild(em);
	        	count++;
        	});
        }else{
        	 没有三级目录二级目录不换行            dt.className = "nowrap";            dt.style["width"] = "auto";            dd.style["width"] = "auto";        	
        	
        }
        
        
        
        dl.appendChild(dt);        dl.appendChild(dd);
        containerDiv.appendChild(dl);
    });
    if(containerDivAutoWidth){
    	containerDiv.style["width"] = "auto";
    }
    
    
    二级菜单面板上面箭头DIV    var topArrowsDiv = document.createElement("div");
    topArrowsDiv.className = "top_arrows";
    topArrowsDiv.innerHTML = "&nbsp;&nbsp;";
    
    itemPanel.appendChild(topArrowsDiv);
    itemPanel.appendChild(containerDiv);
    
    return itemPanel;
}*/
/*创建二级节点面板*/
function createItemDiv(element,divId,currLocStr){
//    //二级目录面板定义
    var itemPanel =  document.createElement("div");
//    //设置ID,由传进参数决定
    itemPanel.id = divId;
    itemPanel.className = "secondMenuPanel";
//    
//    //外层包裹一个div用于设置样式
    var containerDiv = document.createElement("div");
    containerDiv.className = "containerDiv";
    
    //containerDiv自动宽度,如果没有三级菜单,则设置为自动
    var containerDivAutoWidth = false;
    var length = element.length;
    var count = 1;
   $.each(element,function(index,element){
        		var currLocStr3= currLocStr;//三级目录菜单路径
	        	var em = document.createElement("em");
	        	var a = document.createElement("a");
	        	//用户当前位置
	        	currLocStr3 += splitSign + element.modulename;
	        	
	        	if(element.url == null || element.url == ""){
	                a.href = "#";
	            }else{
	            	a.href = "#";
	                a.onclick = function(){
	                	addTab(element.moduleid,element.modulename,element.url);
	                };
	            }
	        	a.className = "linkItem";
	        	if(count<length){
	        		a.innerHTML = element.modulename + "&nbsp;&nbsp";
	        	}else{
	        		a.innerHTML = element.modulename;
	        	}
	        	
	        	
	        	
	        	em.appendChild(a);
	        	if(count<length){
	        		var splitSpan = document.createElement("span");//分隔栏
	            	splitSpan.className = "splitSpan";
	        		em.appendChild(splitSpan);
	        	}
	        	containerDiv.appendChild(em);
	        	count++;
        	});
	
    if(containerDivAutoWidth){
    	containerDiv.style["width"] = "auto";
    }
    
    
    //二级菜单面板上面箭头DIV
    var topArrowsDiv = document.createElement("div");
    topArrowsDiv.className = "top_arrows";
    topArrowsDiv.innerHTML = "&nbsp;&nbsp;";
    
    itemPanel.appendChild(topArrowsDiv);
    itemPanel.appendChild(containerDiv);
    
    return itemPanel;
}
/*面板自适应,如果超出浏览器右部,则调整与右部对齐*/
function adjustWindow(divId){
    var obj = document.getElementById(divId);
    var documentWidth = document.documentElement.clientWidth;
    obj.style.left = "-1px";
    var positionLeft = getObjPosition(obj)['x'];
    if(positionLeft + obj.offsetWidth > documentWidth){
        obj.style.left = (documentWidth - (positionLeft + obj.offsetWidth)-2)+"px";
    }
}
/*获取元素位置*/
function getObjPosition(obj){
    var pos = new Position(obj.offsetLeft,obj.offsetTop);
    var target = obj.offsetParent;
    while(target){
        pos.x += target.offsetLeft;
        pos.y += target.offsetTop;
        target = target.offsetParent;
    }
    return pos;
}
/*<用户当前位置>操作添加*/
function pushCurrentLocation(menu){
	currentLocationArray.push(menu);
}
/*添加菜单点击事件,更新用户当前位置*/
function showCurrentLocation(id){
	var str = "";
	for(var i=0 ; i<currentLocationArray.length ; i++){
		if(currentLocationArray[i].moduleid == id){
			str = currentLocationArray[i].currentLocationStr;
			break;
		}
	}
	current_location_label.innerHTML = str;
}
/*定位对象*/
function Position(x,y){
    this.x = x;
    this.y = y;
}
/*菜单对象*/
function Menu(id,currentLocationStr){
	this.id = id;
	this.currentLocationStr = currentLocationStr;
}
/*添加首页选项卡*/
function addIndexTab(){
	var indexFrameId = "indexFrame";
	var li = document.createElement("li");
	var link = document.createElement("a");
	li.id = indexFrameId;
	li.className = "tabOpen";
	link.className = "tabs_inner";
	link.style["padding"] = "0px 10px 0px 12px";
	link.onclick = function(){
		li.className = "tabOpen";
		showTab(indexFrameId);
	};
	link.innerHTML = "&nbsp;&nbsp;首页&nbsp;&nbsp;";
	
	li.appendChild(link);
	tagsUl.appendChild(li);
	//ul宽度增长计算
	tagsUlWidth += li.offsetWidth+23;
	//添加展示页iframe
	var iframe = document.createElement("iframe");
//	iframe.src = rootPath + "/pages/adbp/main.jsp";
	iframe.className = "mainFrame";
	iframe.frameBorder = 0;
	iframe.id = indexFrameId;
	iframe.name = "main";
	showTab(indexFrameId);
	mainContent.appendChild(iframe);
	pushCurrentLocation(new Menu(indexFrameId,"首页"));//添加用户当前位置
}
/*添加选项卡*/
function addTab(id,name,url){
	//判断是否在选项卡中
	var lis = tagsUl.getElementsByTagName("li");
	for(var i=0;i<lis.length;i++){
		if(id == lis[i].id){
			showTab(id);
			return;
		}
	}
//	if(limitTabsCount > limitTabs-1){//选项卡数限制
//		$.messager.confirm('提示', "页面同时打开数量不能超过  "+limitTabs+" 个,点击\"确定\"将替换第一个选项卡!", function(r){
//			if (r){
//				//移除选项卡
//				var lis = tagsUl.getElementsByTagName("li");
//				tagsUl.removeChild(lis[1]);
//				//移除iframe
//				var iframes = mainContent.getElementsByTagName("iframe");
//				mainContent.removeChild(iframes[1]);
//				limitTabsCount --;
//				addTabHandler(id,name,url);
//			}
//		});
//	}else{
		addTabHandler(id,name,url);
//	}
}
/*添加选项卡处理*/
function addTabHandler(id, name, url){
//	limitTabsCount ++;
	var li = document.createElement("li");
	var link = document.createElement("a");
	var closeBtn = document.createElement("img");
	li.id = id;
	li.className = "tabOpen";
	link.className = "tabs_inner";
	link.onclick = function(){
		li.className = "tabOpen";
		showTab(id);
	};
	link.innerHTML = name;
	closeBtn.src = "images/adbp/tabs_close.gif";
	closeBtn.onclick = function(){removeTab(id);};//点击关闭选项卡
	
	li.appendChild(link);
	li.appendChild(closeBtn);
	tagsUl.appendChild(li);
	//ul宽度增长计算
	tagsUlWidth += li.offsetWidth+23;
	//添加展示页iframe
	var iframe = document.createElement("iframe");
	iframe.src = rootPath +"/"+ url;
	iframe.className = "mainFrame";
	iframe.frameBorder = 0;
	iframe.id = id;
	showTab(id);
	mainContent.appendChild(iframe);
	
	//选项卡右键事件
	$("#"+id).contextmenu(function(e){
		$("#tabsContextMenu").menu("show", {left: e.pageX,top: e.pageY});
		e.preventDefault();
		currentClickLiId = id;
	});
}
/*删除相关tab页*/
function removeTab(id){
	//移除选项卡
	var lis = tagsUl.getElementsByTagName("li");
	for(var i=0;i<lis.length;i++){
		if(id == lis[i].id){
			tagsUlWidth -= lis[i].offsetWidth+23;
			tagsUl.removeChild(lis[i]);
			break;
		}
	}
//	limitTabsCount -- ;
//	limitTabsCount = limitTabsCount < 0 ? 0:limitTabsCount;
	//移除iframe
	var iframes = mainContent.getElementsByTagName("iframe");
	var flag = false;
	for(var i=0;i<iframes.length;i++){
		if(id == iframes[i].id){
			//如果关闭的选项卡不是已经打开的页面,则不需要切换
			if(iframes[i].style["display"] == "none")
				flag = true;
			mainContent.removeChild(iframes[i]);//移除元素后iframes数组会改变
			if(flag)
				break;
			if(i > 0){
				if( i <iframes.length )
					showTab(iframes[i].id);
				else
					showTab(iframes[i-1].id);
			}
			else
				showTab(iframes[0].id);
			break;
		}
	}
}
//显示id相关的iframe
function showTab(id){
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
/*标签页左右移动事件初始化*/
function initTagsAction(){
	var ul = $("#topTags ul");
	document.getElementById("topTagBackWard").onclick = function(){
		if(!ul.is(":animated") && ul.position().left != 0){
			if(ul.position().left+scrollSize >= 0 && ul.position().left<0){//如果右移步长大于预先定义
				ul.animate({left: "+="+(-ul.position().left)+"px"},300);
			}else{
				if(ul.position().left > 0){
					ul.css({"left":"0px"});
				}else{
					ul.animate({left: "+="+scrollSize+"px"},300);
				}
			}
		}
	};
	document.getElementById("topTagForward").onclick = function(){
		var footLength = tagsUlWidth + ul.position().left - getScreenWidth();
		if(footLength>0){
			if(footLength < scrollSize){//如果需要滚动的步长小于预先定义的scrollSize
				ul.animate({left: "-="+footLength+"px"},300);
			}else{
				ul.animate({left: "-="+scrollSize+"px"},300);
			}
		}
	};
}
/*屏幕宽度*/
function getScreenWidth(){
	return document.documentElement.clientWidth;
}
/*关闭其他选项卡*/
function closeOther(){
	//移除选项卡
	var lis = tagsUl.getElementsByTagName("li");
	for(var i=0;i<lis.length;){
		if(currentClickLiId != lis[i].id && lis[i].id !="indexFrame"){
			tagsUlWidth -= lis[i].offsetWidth+23;
			tagsUl.removeChild(lis[i]);
			continue;
		}
		i++;
	}
	//移除iframe
	var iframes = mainContent.getElementsByTagName("iframe");
	for(var i=0;i<iframes.length;){
		if(currentClickLiId != iframes[i].id && iframes[i].id !="indexFrame"){
			mainContent.removeChild(iframes[i]);
			continue;
		}
		i++;
	}
	showTab(currentClickLiId);
}
/*关闭所有*/
function closeAll(){
	//移除选项卡
	var lis = tagsUl.getElementsByTagName("li");
	for(var i=0;i<lis.length;){
		if(lis[i].id !="indexFrame"){
			tagsUlWidth = 28;
			tagsUl.removeChild(lis[i]);
			continue;
		}
		i++;
	}
	//移除iframe
	var iframes = mainContent.getElementsByTagName("iframe");
	for(var i=0;i<iframes.length;){
		if(iframes[i].id !="indexFrame"){
			mainContent.removeChild(iframes[i]);
			continue;
		}
		i++;
	}
	showTab("indexFrame");
}