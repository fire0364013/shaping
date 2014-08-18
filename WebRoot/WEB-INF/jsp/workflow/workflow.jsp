<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ include file="/common/taglibs.jsp"%>

<html xmlns:v>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	
	<title>xjwGraphDemo</title>
	
	<link rel="stylesheet" type="text/css" href="${ctx}/themes/default/easyui.css" />
	<link rel="stylesheet" type="text/css" href="${ctx}/themes/flowPath.css"/>

	<STYLE>
		v\:*{behavior:url(#default#VML);}
	</STYLE>
</head>

<body class="easyui-layout bodySelectNone" id="body" onselectstart="return false">
	<input type="hidden" id="workflowCode" value="${workflowCode}"/>
	<div id="title" region="north" split="true" border="false" title="工具栏" class="titleTool">
		<div id="message" class="message"></div>
		<div id="baseLine1" style="position:absolute;left:10px;top:30px !important;top:10px">
			<div class="title">&nbsp;</div>
			<img id="backGroundImg" src="${ctx}/common/strawberry/images/line1.png" class="nodeStyle"/>
		</div>
		<div id="baseLine2" style="position:absolute;left:50px;top:30px !important;top:10px">
			<div class="title">&nbsp;</div>
			<img id="backGroundImg" src="${ctx}/common/strawberry/images/line2.png" class="nodeStyle"/>
		</div>
		<div id="baseLine3" style="position:absolute;left:90px;top:30px !important;top:10px">
			<div class="title">&nbsp;</div>
			<img id="backGroundImg" src="${ctx}/common/strawberry/images/line3.png" class="nodeStyle"/>
		</div>
		<div id="baseMode1" divType="mode" style="position:absolute;left:130px;top:30px !important;top:10px">
			<div class="title">&nbsp;</div>
			<img id="backGroundImg" src="${ctx}/common/strawberry/images/baseMode1.png" class="nodeStyle"/>
		</div>
		<div id="baseMode2" divType="mode" style="position:absolute;left:170px;top:30px !important;top:10px">
			<div class="title">&nbsp;</div>	
			<img id="backGroundImg" src="${ctx}/common/strawberry/images/baseMode2.png" class="nodeStyle"/>
		</div>
		<div id="baseMode3" divType="mode" style="position:absolute;left:210px;top:30px !important;top:10px">
			<div class="title">&nbsp;</div>
			<img id="backGroundImg" src="${ctx}/common/strawberry/images/baseMode3.png" class="nodeStyle"/>
		</div>
		<div id="baseMode4" divType="mode" style="position:absolute;left:250px;top:30px !important;top:10px">
			<div class="title">&nbsp;</div>
			<img id="backGroundImg" src="${ctx}/common/strawberry/images/baseMode4.png" class="nodeStyle"/>
		</div>
		<div id="baseMode5" divType="mode" style="position:absolute;left:290px;top:30px !important;top:10px">
			<div class="title">&nbsp;</div>
			<img id="backGroundImg" src="${ctx}/common/strawberry/images/baseMode5.png" class="nodeStyle"/>
		</div>
		<div id="baseMode6" divType="mode" style="position:absolute;left:330px;top:30px !important;top:10px">
			<div class="title">&nbsp;</div>
			<img id="backGroundImg" src="${ctx}/common/strawberry/images/baseMode6.png" class="nodeStyle"/>
		</div>
		<div id="baseMode7" divType="mode" style="position:absolute;left:370px;top:30px !important;top:10px">
			<div class="title">&nbsp;</div>
			<img id="backGroundImg" src="${ctx}/common/strawberry/images/baseMode7.png" class="nodeStyle"/>
		</div>
		<div id="baseMode8" divType="mode" style="position:absolute;left:410px;top:30px !important;top:10px">
			<div class="title">&nbsp;</div>
			<img id="backGroundImg" src="${ctx}/common/strawberry/images/baseMode8.png" class="nodeStyle"/>
		</div>
		<div id="baseMode9" divType="mode" style="position:absolute;left:450px;top:30px !important;top:10px">
			<div class="title">&nbsp;</div>
			<img id="backGroundImg" src="${ctx}/common/strawberry/images/baseMode9.png" class="nodeStyle"/>
		</div>
		<div id="baseMode10" divType="mode" style="position:absolute;left:490px;top:30px !important;top:10px">
			<div class="title">&nbsp;</div>
			<img id="backGroundImg" src="${ctx}/common/strawberry/images/baseMode10.png" class="nodeStyle"/>
		</div>
		<div id="baseMode11" divType="mode" style="position:absolute;left:530px;top:30px !important;top:10px">
			<div class="title">&nbsp;</div>
			<img id="backGroundImg" src="${ctx}/common/strawberry/images/baseMode11.png" class="nodeStyle"/>
		</div>
		<div id="baseMode12" divType="mode" style="position:absolute;left:570px;top:30px !important;top:10px">
			<div class="title">&nbsp;</div>
			<img id="backGroundImg" src="${ctx}/common/strawberry/images/baseMode12.png" class="nodeStyle"/>
		</div>
		<div id="baseMode13" divType="mode" style="position:absolute;left:610px;top:30px !important;top:10px">
			<div class="title">&nbsp;</div>
			<img id="backGroundImg" src="${ctx}/common/strawberry/images/baseMode13.png" class="nodeStyle"/>
		</div>
		<div id="baseMode14" divType="mode" style="position:absolute;left:650px;top:30px !important;top:10px">
			<div class="title">&nbsp;</div>
			<img id="backGroundImg" src="${ctx}/common/strawberry/images/baseMode14.png" class="nodeStyle"/>
		</div>
		<div id="baseMode15" divType="mode" style="position:absolute;left:690px;top:30px !important;top:10px">
			<div class="title">&nbsp;</div>
			<img id="backGroundImg" src="${ctx}/common/strawberry/images/baseMode15.png" class="nodeStyle"/>
		</div>
		<div id="copy" style="position:absolute;left:740px;top:30px !important;top:10px">
			<img alt="复制"	title="复制" src="${ctx}/common/strawberry/images/copy.png" onclick="graphUtils.copyNode();" class="buttonStyle"/>
		</div>
		<div id="delete" style="position:absolute;left:770px;top:30px !important;top:10px">
			<img alt="删除"	title="删除" src="${ctx}/common/strawberry/images/delete.png" onclick="graphUtils.removeNode();" class="buttonStyle"/>
		</div>
		<div id="undo" style="position:absolute;left:800px;top:30px !important;top:10px">
			<img alt="撤销"	title="撤销" src="${ctx}/common/strawberry/images/back.png" onclick="graphUtils.undo();" class="buttonStyle"/>
		</div>
		<div id="undo" style="position:absolute;left:830px;top:30px !important;top:10px">
			<img alt="重做"	title="重做" src="${ctx}/common/strawberry/images/next.png" onclick="graphUtils.redo();" class="buttonStyle"/>
		</div>	
	</div>
	
	<div region="center" title="绘图区" id="contextBody" class="mapContext" >
		<!-- Line右键菜单 -->
		<div id="lineRightMenu" class="modeRight">
			<div class="modeRightTop"></div>
			<div class="modeRightDel" onmousemove="this.style.backgroundColor='#c5e7f6'" onclick="graphUtils.removeNode();" onmouseout="this.style.backgroundColor=''"><span class="menuSpan">删 除</span></div>
			<div class="modeRightPro" onmousemove="this.style.backgroundColor='#c5e7f6'" onclick="graphUtils.showLinePro();" onmouseout="this.style.backgroundColor=''"><span class="menuSpan">属 性</span></div>
			<div class="modeRightButtom"></div>
		</div>
				
		<!-- Mode右键菜单 -->
		<div id="rightMenu" class="modeRight">
			<div class="modeRightTop"></div>
			<div class="modeRightCopy" onmousemove="this.style.backgroundColor='#c5e7f6'" onclick="graphUtils.copyNode();" onmouseout="this.style.backgroundColor=''"><span class="menuSpan">复 制</span></div>
			<div class="modeRightDel" onmousemove="this.style.backgroundColor='#c5e7f6'" onclick="graphUtils.removeNode();" onmouseout="this.style.backgroundColor=''"><span class="menuSpan">删 除</span></div>
			<div class="modeRightPro" onmousemove="this.style.backgroundColor='#c5e7f6'" onclick="graphUtils.showModePro();" onmouseout="this.style.backgroundColor=''"><span class="menuSpan">属 性</span></div>
			<div class="modeRightButtom"></div>
		</div>
		
		<!-- PathBody右键菜单 -->
		<div id="pathBodyRightMenu" class="modeRight">
			<div class="modeRightTop"></div>
			<div class="modeRightPixel" id="isPixel" onclick="global.baseTool.changStyle(this);" onmousemove="this.style.backgroundColor='#c5e7f6'" onmouseout="this.style.backgroundColor=''"><span class="menuSpan">Pixel</span></div>
			<div class="modeRightLeft" onclick="graphUtils.alignLeft();" onmousemove="this.style.backgroundColor='#c5e7f6'" onmouseout="this.style.backgroundColor=''"><span class="menuSpan">左对齐</span></div>
			<div class="modeRightCenter" onclick="graphUtils.verticalCenter();" onmousemove="this.style.backgroundColor='#c5e7f6'" onmouseout="this.style.backgroundColor=''"><span class="menuSpan">垂直居中</span></div>
			<div class="modeRightRight" onclick="graphUtils.alignRight();" onmousemove="this.style.backgroundColor='#c5e7f6'" onmouseout="this.style.backgroundColor=''"><span class="menuSpan">右对齐</span></div>
			<div class="modeRightHead" onclick="graphUtils.alignTop();" onmousemove="this.style.backgroundColor='#c5e7f6'" onmouseout="this.style.backgroundColor=''"><span class="menuSpan">顶部对齐</span></div>
			<div class="modeRightMiddle" onclick="graphUtils.horizontalCenter();" onmousemove="this.style.backgroundColor='#c5e7f6'" onmouseout="this.style.backgroundColor=''"><span class="menuSpan">水平居中</span></div>
			<div class="modeRightFoot" onclick="graphUtils.bottomAlignment();" onmousemove="this.style.backgroundColor='#c5e7f6'" onmouseout="this.style.backgroundColor=''"><span class="menuSpan">底端对齐</span></div>
			<div class="modeRightButtom"></div>
		</div>
		
	 	<div id="topCross"></div>
     	<div id="leftCross"></div>
    </div>
	<div region="south" split="true" title="辅助区" class="auxiliaryArea" >
		<!-- 小地图 -->	
		<div id="smallMap"></div> 
		
		<div id="mainControl">
			<table cellpadding="0" cellspacing="0">
				<tr>
					<td style="text-align:center;height:25px;">
						名称
					</td>
					<td>
						<input type="text" id="inputTitle" class="inputComm" style="width:220px;"/>
					</td>
				</tr>
				<tr>
					<td style="text-align:center;height:25px;">
						代码
					</td>									
					<td>
						<input type="text" id="inputCode" class="inputComm" style="width:220px;"/>
					</td>
				</tr>
				<tr>
					<td style="text-align:center;height:25px;">
						次序
					</td>									
					<td>
						<input type="text" id="inputOrder" class="inputComm" style="width:220px;"/>
					</td>
				</tr>
				<tr>
					<td colspan="2">
						<input type="hidden" id="inputTop" class="inputComm" style="width:50px;" />
						<input type="hidden" id="inputLeft" class="inputComm" style="width:50px;" />
						<input type="hidden" id="inputWidth" class="inputComm" style="width:50px;"/>
						<input type="hidden" id="inputHeight" class="inputComm" style="width:50px;" />
						<input type="hidden" id="inputImgSrc" class="inputComm" style="width:50px;" />
					</td>
				</tr>
				<tr>
					<td colspan="2" style="align:center;height:25px;">
						<input type="button" value="设置" class="Button_out" onclick="setting();" />
						<input type="button" value="保存" class="Button_out" onclick="save();" />
					</td>
				</tr>
			</table>
		</div>
	</div>
	
	<!-- 移动时的图象 -->
	<div id="moveBaseMode" class="moveBaseMode">
		<img id="moveBaseModeImg"  src="${ctx}/common/strawberry/images/Favourite.png" class="nodeStyle"/>
	</div>
	
	<div id="prop" style="visibility: hidden;">
			Dialog Content.  
	</div>
	
	</body>
	
	<script type="text/javascript" src="${ctx}/js/jquery-1.7.2.min.js"></script>
	<script type="text/javascript" src="${ctx}/js/jquery.easyui.min.js"></script>
	<script type="text/javascript" src="${ctx}/js/strawberry.min.js"></script>
	
	<script>
		var mainControl = $id("mainControl");
		mainControl.style.width = (document.body.offsetWidth - 220) + "px";
			
  		var bgImg = "url(${ctx}/common/strawberry/images/bg.gif)";
  		var backColor = "#e0ecff";
  		
  		function setting(){
  			var inputTitle = $('#inputTitle').val();
  			var inputCode = $('#inputCode').val();
  			var inputOrder = $('#inputOrder').val();
  			
  			if(inputTitle==null || inputTitle==""){
  				alert("名称不能为空");
  				return;
  			}
  			if(inputCode==null || inputCode==""){
  				alert("代码不能为空");
  				return;
  			}
  			if(inputOrder==null || inputOrder==""){
  				alert("次序不能为空");
  				return;
  			}
  			graphUtils.setModel();
  		}
  		function save(){
			$.ajax({
				type:'post',
				url:'workflow!saveGraph.action?workflowCode='+$('#workflowCode').val(),
				data:{'json':graphUtils.saveXml()},
				success:function(data){
					alert("保存成功");
				}
			});
		}
		jQuery(document).ready(function () {
			var global = com.xjwgraph.Global;
			graphUtils = com.xjwgraph.Utils.create({
				contextBody : 'contextBody',
				width : document.body.offsetWidth-220,
				height : document.body.offsetHeight-300,
				smallMap : 'smallMap',
				mainControl : 'mainControl',
				prop : 'prop'
			});
			
			graphUtils.nodeDrag($id("baseLine1"), true, 1);
			graphUtils.nodeDrag($id("baseLine2"), true, 2);
			graphUtils.nodeDrag($id("baseLine3"), true, 3);

			var modes = jQuery("[divType='mode']");
			var modeLength = modes.length;
			
			for (var i = 0; i < modeLength; i++) {
				graphUtils.nodeDrag(modes[i]);
			}
			document.onkeydown = KeyDown;
			graphUtils.loadTextXml('${json}');
		});
	</script>
</html>