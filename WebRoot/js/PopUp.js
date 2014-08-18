/*
 * Copyright (C) 2008-2009 SaiSky
 * Mail:SaiSky@live.cn
 * ClassName : Popup 
 * Example: var PopInHtml = "<div>";
            PopInHtml += "<div style=\"color:#666;font-size:12px;text-align:center;height:50px;line-height:50px;\">This is the container of content...</div></div>";
            PopInHtml += "<div style=\"clear:both;display:block;\"></div>";
            var mypanle = new PopUp("30%", "20%", { PopWidth: "420px", PopHeight: "300px", PopTitle: "测试标题", PopBody: PopInHtml, ImgPath: "images/popup/", AllowScroll: false });
	        mypanle.CreatePop();
 * Help Class : "Drag.js". If you want to drag the Popup in Scree,you need import this class!
 */



//辅助方法，获取项目根目录并加载Drag.js文件
//add at 2010-08-10 16:26
function ImportDragJSFile(){
    //获取根目录
    var strFullPath = window.document.location.href;
    var strPath = window.document.location.pathname;
    var pos = strFullPath.indexOf(strPath);
    var prePath = strFullPath.substring(0,pos);
    var postPath = strPath.substring(0,strPath.substr(1).indexOf('/') + 2);
    //引入Drag.js
    var AbsPath = "";
    if(postPath.toLowerCase().indexOf('monitor') != -1 || postPath.toLowerCase().indexOf('report') != -1 || postPath.toLowerCase().indexOf('pollutantsource') != -1){
        AbsPath = strPath.substring(1,strPath.length);
    }
    else{
        AbsPath = strFullPath.replace((prePath + postPath),"");
    }
    var CharCount = CountCharInString(AbsPath,"/");
    var DragScriptStr = "";
    for(var i = 0;i < CharCount; i++){
        DragScriptStr += "../";
    }
    DragScriptStr += "jscontrols/Drag/Drag.js";
    document.write("<script src=\"" + DragScriptStr + "\" type=\"text/javascript\"></script>");
} 

ImportDragJSFile();

document.writeln('<div id="maskDiv" class="mask" style="position: absolute;display: none; left:0; top:0;width: 100%;height: 100%; z-index: 900; background: #DFE0E1 ;filter: alpha(opacity=50);opacity: 0.5"></div>');
//document.writeln('<iframe id="__ifrMaskContainer__" src="javascript:false;" scrolling="no" frameborder="0" style="position:absolute;top:0px;left:0px;display:none;"></iframe>');

function CMaskDiv(maskDiv){
    this.oMaskDiv=false;
}
CMaskDiv.prototype.show=function(){
	this.body=document.body || document.documentElement;
	var _MxH=document.documentElement.scrollHeight>document.documentElement.clientHeight?document.documentElement.scrollHeight:document.documentElement.clientHeight;
    var _MxW=document.body.offsetWidth>document.documentElement.clientWidth?document.body.offsetWidth:document.documentElement.clientWidth;
    this.oMaskDiv=document.getElementById("maskDiv");
    this.oMaskDiv.style.width=_MxW+"px";
    this.oMaskDiv.style.height=_MxH+"px";
    this.oMaskDiv.style.display="block"; 
}
CMaskDiv.prototype.close=function(){
    this.oMaskDiv.style.display="none"; 
}
__MaskDiv__=new CMaskDiv('maskDiv');
 
 
var Pop_moveHandler=null;


function PopUp(_PositionX,_PositionY,_ConfigJson) {
		this._X = _PositionX;
		this._Y = _PositionY;
		var _Config = eval(_ConfigJson);
		this._Width = _Config.PopWidth;
		this._Height = _Config.PopHeight;
		this._PopTitle = _Config.PopTitle;
		this._PopBody = _Config.PopBody;
		this._IframeSrc = _Config.PopSrc;
		this._AllowScroll = _Config.AllowScroll;
		this._ImgPath = _Config.ImgPath;
		this._CallBackFun = _Config.CallBackFun;
		this._CallBackPars = _Config.CallBackPars;
}

PopUp.prototype.CreatePop = function() {
    if (!document.getElementById("__PopContainer__")) {
        var PopContaner = document.createElement("div");
        PopContaner.id = "__PopContainer__";
        //PopContaner.style.height = this._Height;
        PopContaner.style.width = this._Width;
        PopContaner.style.border = "1px solid #0099CC";
        PopContaner.style.height = "auto";
        PopContaner.style.overflow = "hidden";
        PopContaner.style.padding = "0px";
        PopContaner.style.margin = "0px";
        PopContaner.style.position = "absolute";
        PopContaner.style.zIndex = "998";
        PopContaner.style.top = this._Y;
        PopContaner.style.left = this._X;
        //filter: alpha(opacity=50);opacity: 0.5
        PopContaner.style.backgroundColor = "#fff";
        //PopContaner.onkeydown = function(e){this.KeyCode(e);};
        //oDiv.style.visibility = "hidden";
        
        /*
        //构造Iframe衬底
        var IfrMaskContainer = document.createElement("iframe");
        IfrMaskContainer.id = "__ifrMaskContainer__";
        IfrMaskContainer.scrolling = "no";
        IfrMaskContainer.width = this._Width;
        IfrMaskContainer.height = this._Height;
        IfrMaskContainer.frameBorder = "0";
        IfrMaskContainer.src = "javascript:false";
        IfrMaskContainer.style.position = "absolute";
        IfrMaskContainer.style.zIndex = "990";
        IfrMaskContainer.style.top = this._Y;
        IfrMaskContainer.style.left = this._X;
        PopContaner.appendChild(IfrMaskContainer);
        */
        
        //构造PopUp头部
        var _PopHeader = document.createElement("div");
        _PopHeader.id = "__PopHeader__";
        _PopHeader.style.height = "27px";
        _PopHeader.style.lineHeight = "27px";
        _PopHeader.style.width = "100%";
        _PopHeader.style.border = "0";
        _PopHeader.style.padding = "0px";
        _PopHeader.style.margin = "0px";
        var InHeaderHtml = "<div id=\"__PopTitle__\" style=\"width:100%;height:27px;line-height:27px;margin:0;padding:0;background:url(" + this._ImgPath + "popupbg.gif);border-bottom:1px #0099CC solid;\">";
        InHeaderHtml += "<span style=\"float:right;cursor:pointer;position:absolute;top:5px;right:5px;\" title=\"关闭\">";
        InHeaderHtml += "<img src=\"" + this._ImgPath + "popclose.gif\" style=\"width=17px;height:17px;\" onclick=\"PopUpClose();\">";
        InHeaderHtml += "</span>";
        InHeaderHtml += "<span style=\"color:#000000; font-size:12px; font-weight:bold;line-height:27px;padding-left:20px;\">" + this._PopTitle + "</span>";
        InHeaderHtml += "</div>";
        _PopHeader.innerHTML = InHeaderHtml;
        PopContaner.appendChild(_PopHeader);

        //判断是否构造Iframe
        if (typeof (this._IframeSrc) == "undefined") {
            var ContainerBody = document.createElement("div");
            ContainerBody.id = "__PopBody__";
            ContainerBody.style.cssText = "margin:0;border:0px solid #fafafa;padding:0;width:auto;";
            ContainerBody.style.width = "100%";
            ContainerBody.style.height = "100%";
            ContainerBody.style.border = "0px";
            ContainerBody.style.padding = "0px";
            ContainerBody.style.margin = "0px";
            "string" == typeof (this._PopBody) ? ContainerBody.innerHTML = this._PopBody : ContainerBody.appendChild(this._PopBody);
            PopContaner.appendChild(ContainerBody);
            document.body.appendChild(PopContaner);
        }
        else {
            var ContainerIFrame = document.createElement("iframe");
            ContainerIFrame.id = "__PopIframe__";
            ContainerIFrame.frameborder = "0";
            ContainerIFrame.scrolling = "no";
            ContainerIFrame.width = "100%";
            ContainerIFrame.height = "100%";
            ContainerIFrame.frameBorder = "0";
            ContainerIFrame.src = this._IframeSrc;
            PopContaner.appendChild(ContainerIFrame);
            document.body.appendChild(PopContaner);
        }
    }
    else {
        document.getElementById("__PopContainer__").style.display = "block";
    }
    
    /*
    //使用Iframe做衬底，兼容IE6不能遮盖Select、Iframe元素的问题
    try{
        var IfrMaskContainer = document.getElementById("__ifrMaskContainer__");
        IfrMaskContainer.style.width = PopContaner.offsetWidth;
        IfrMaskContainer.style.height = PopContaner.offsetHeight;
        IfrMaskContainer.style.top = this._Y;
        IfrMaskContainer.style.left = this._X;
        IfrMaskContainer.style.zIndex = "997";
        IfrMaskContainer.style.display = "";
    }
    catch(e){alert(e.description);}
    */
    //是否允许跟随滚动
    if (this._AllowScroll) {
        if (!Pop_moveHandler) Pop_moveHandler = function() {
            __MaskDiv__.show();
            var oDiv = document.getElementById("__PopContainer__");
            var min_clientHeight = Math.min(document.documentElement.clientHeight, document.body.clientHeight);
            var min_clientWidth = Math.min(document.documentElement.clientWidth, document.body.clientWidth);
            if (min_clientHeight == 0) min_clientHeight = document.documentElement.clientHeight + document.body.clientHeight;
            if (min_clientWidth == 0) min_clientWidth = document.documentElement.clientWidth + document.body.clientWidth;
            var o_top = Math.floor((document.body.scrollTop + document.documentElement.scrollTop) + (min_clientHeight - parseInt(oDiv.style.height)) * 0.5);
            var o_left = Math.floor((document.body.scrollLeft + document.documentElement.scrollLeft) + (min_clientWidth - parseInt(oDiv.style.width)) * 0.5);
            $(oDiv).attr("top", o_top);
            $(oDiv).attr("left", o_left);
            if ($(oDiv).attr("top") != o_top) $(oDiv).attr("top", o_top + "px");
            if ($(oDiv).attr("left") != o_left) $(oDiv).attr("left", o_left + "px");
            //oDiv.style.top = o_top;
            //oDiv.style.left = o_left;
            //if (oDiv.style.top != o_top) oDiv.style.top = o_top + "px";
            //if (oDiv.style.left != o_left) oDiv.style.left = o_left + "px";
        };
        Pop_moveHandler();
        if (document.addEventListener) {
            window.addEventListener("scroll", Pop_moveHandler, false);
            window.addEventListener("resize", Pop_moveHandler, false);
        } else if (document.attachEvent) {
            window.attachEvent('onscroll', Pop_moveHandler);
            window.attachEvent('onresize', Pop_moveHandler);
        }
    }
    else {
        __MaskDiv__.show();
    }
    
    //拖拽
    try{
        var drag = new Drag("__PopContainer__", { mxContainer: "", Handle: "__PopTitle__", Limit: true,Transparent:false,
            onStart: function(){ document.getElementById("__PopTitle__").style.cursor = "move"; },
	        onMove: function(){ },
	        onStop: function(){ document.getElementById("__PopTitle__").style.cursor = "normal";}
        });
        var min_clientWidth = Math.min(document.documentElement.clientWidth, document.body.clientWidth);
        //var min_clientHeight = Math.min(document.documentElement.clientHeight, document.body.clientHeight);
        drag.Limit = true;
        drag.mxLeft = drag.mxTop = 0;
        drag.mxRight = min_clientWidth;
        drag.mxBottom = document.documentElement.clientHeight;
        drag.LockX = drag.LockY = drag.Lock = false;
    }
    catch(e){ }
}


//控制Select embed

PopUp.prototype.DisplayTag = function(_Flag)
{
	var _SelectColl = document.getElementsByTagName("select");
	var _EmbedColl = document.getElementsByTagName("embed");
	alert(_SelectColl.length);
	for(var i=0;i<_SelectColl.length;i++)
	{
		_SelectColl[i].style.display = _Flag ? "" : "none";	
	}
	for(var j=0;j<_EmbedColl.length;j++)
	{
		_EmbedColl[j].style.display	 = _Flag ? "" : "none";
	}
}


function PopUpClose(_CallBackFun, _CallBackPars) {
    try { document.getElementById("__PopContainer__").removeChild(document.getElementById("__ifrMaskContainer__")); } catch (e) { } 
    try { document.getElementById("__PopContainer__").removeChild(document.getElementById("__PopBody__")); } catch (e) { }
    try { document.getElementById("__PopContainer__").removeChild(document.getElementById("__PopIframe__")); } catch (e) { }
    document.body.removeChild(document.getElementById("__PopContainer__"));
    __MaskDiv__.close();
    if (document.removeEventListener) {
        window.removeEventListener("scroll", Pop_moveHandler, false);
        window.removeEventListener("resize", Pop_moveHandler, false);
    } else if (document.detachEvent) {
        window.detachEvent('onscroll', Pop_moveHandler);
        window.detachEvent('onresize', Pop_moveHandler);
    }
    if (_CallBackFun && _CallBackPars) {
        if (_CallBackFun != "undefined" && this._CallBackPars != "undefined") _CallBackFun(this._CallBackPars);
    }
}

//获取字符在字符串中出现的次数
function CountCharInString(Str,SubChar){
    var count = 0;
    var offset = 0;
    do{
        offset = Str.indexOf(SubChar,offset);
        if(offset != -1){
            count++;
            offset += SubChar.length;
        }
    }
    while(offset != -1)
    return count;
}