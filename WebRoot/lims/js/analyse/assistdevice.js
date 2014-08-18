$(document).ready(function() {
	initDataGrid();
//只有增加、修改~初始化的时候需要传参~~methodid~itemid
});

// 页面加载，数据的展示~~datagrid~~analysissparamgrid
function initDataGrid() {
	var itemid=$("#itemid").val();
	var methodid=$("#methodid").val();
	$('#itemassistdevice').datagrid({
		nowrap : false,
		striped : true,
		collapsible : true,
		url : 'itemassistdevice!itemassistdeviceList.action?itemid='+itemid+'&methodid='+methodid, 
		remoteSort : false,						
		fit : true,
		fitColumns : true,
		scrollbarSize : 0,
		idField:'assistid',	
		singleSelect:true,
		columns : [ [
			{field:'devicetype',title:'仪器设备类型', width:140,align:"center"},
			//{field:'devicenum',title:'仪器编号', width:160,align:"center"},					
			{field:'devicename',title:'仪器名称', width:240,align:"center"},
			{field:'spectype',title:'规格型号', width:140,align:"center"},
			{field:'leavefactorynum',title:'出厂编号', width:140,align:"center"},
//			{field:'buydate',title:'购置日期', width:120,align:"center"},
			{field:'deptid',title:'使用科室', width:120,align:"center"}
//			{field:'devicestatus',title:'仪器状态 ', width:120,align:"center"}
		] ],	
		rownumbers : true,
		onRowContextMenu:function(e,row,rowData){
//			var itemflag=$("#itemflag").val();
			$('#editWin').removeAttr("disabled");
			$('#del').removeAttr("disabled");
			$('#detail').removeAttr("disabled");
			//火狐
			$('#editWin').removeClass("disable");
			$('#del').removeClass("disable");
			$('#detail').removeClass("disable");
//			if(itemflag=='0'){
			$('#itemassistdevice').datagrid('selectRow',parseInt(row));
			$("#method-menu").menu("show", {left: e.pageX,top: e.pageY});
			$("#savedata").val(rowData['assistid']);
			//alert(rowData['assistid']);
			e.preventDefault();
//			}
		},
		onHeaderContextMenu:function(e,field){
//			var itemflag=$("#itemflag").val();
				$('#editWin').attr({disabled:"true"});
				$('#del').attr({disabled:"true"});
				$('#detail').attr({disabled:"true"});
				//火狐
				$('#editWin').addClass("disable");
				$('#del').addClass("disable");
				$('#detail').addClass("disable");
			
			$('#method-menu').menu('show', {
				left: e.pageX,
				top: e.pageY
			});
			e.preventDefault();
		}
	});
	$(window).resize(function() {
		$("#itemassistdevice").datagrid('resize');
	});
}


//单条删除
function del(){
	if($("#del").attr("disabled")=="disabled"){
		return false;
	}
	var did='';
	did=$("#savedata").val();
	if(did==''){
		alert("请选择一条记录！");
		return;
	}
	if(window.confirm('是否删除？')){
		$.post(rootPath +"/analyse/itemassistdevice/itemassistdevice!deleteOnlyOne.action?assistid="+did,
//			{assistid:did},
			function(del){
			if(del=='success'){
				$('#itemassistdevice').datagrid('clearSelections');
				$("#itemassistdevice").datagrid('reload');
				alert('删除成功');
			}else{
				alert("删除失败");
			}
		});
	}
}


//详情
function detail(){
	if($("#detail").attr("disabled")=="disabled"){
		return false;
	}
	var did='';
	did=$("#savedata").val();
	if(did==''){
		alert("请选择一条记录！");
		return;
	}
		var url = rootPath +"/analyse/itemassistdevice/itemassistdevice!view.action?assistid="+did;
		var _dialog =  window.top.$('<div id ="role-dlg" style="padding:0px;"><iframe  width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
		_dialog.dialog({
			title:'辅助仪器详情',
			autoOpen:false,
			modal:true,
			closed:true,
			width:'340',
			height:'200'
		});
		_dialog.dialog('open');
}
function addWin(){
var itemid=$("#itemid").val();
var methodiddata=$("#methodid").val();
var url =  rootPath+"/analyse/itemassistdevice/itemassistdevice!selectdevice.action?itemid="+itemid+"&methodid="+methodiddata;
var _dialog =  window.top.$('<div id ="role-dlg" style="padding:0px;"><iframe id="manyUserFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
_dialog.dialog({
	title:'选择仪器 ',
	autoOpen:false,
	modal:true,
	closed:true,
	width:'1000',
	height:'500',
	buttons:[{
		text:'确定',
		iconCls:'icon-save',
		handler:function(){
//			var devicenameVal=$("#manyUserFrame",top.document.body).contents().find("#selectedDevice").val();//$("#manyUserFrame",top.document.body).contents().find("#selectedUser").val();
//			document.getElementById(devicenames).value = devicenameVal;
			var deviceidVal=$("#manyUserFrame",top.document.body).contents().find("#selectedDeviceid").val();//$("#manyUserFrame",top.document.body).contents().find("#selecteddeviceid").val();
			if(deviceidVal==''||deviceidVal==null){
				alert("请至少选择一个仪器！");
				return;
			}
			//alert(deviceidVal);return;
//			document.getElementById(deviceids).value = deviceidVal;
//			document.getElementById(devicenames).value = devicenameVal;
			$.post(rootPath +'/analyse/itemassistdevice/itemassistdevice!saveData.action',
			{deviceid:deviceidVal,itemid:itemid,methodid:methodiddata},
			function(data){
				if(data=='success'){
					alert('保存成功');
					_dialog.dialog('close');
					$("#itemassistdevice").datagrid('reload');
				}else if(data=='fail'){
					alert("保存失败");
				}
			});
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
////添加
//function addWin(){
//	var itemid=$("#itemid").val();
//	var methodiddata=$("#methodid").val();
//	var did=$("#savedata").val();
//	
//	var url = rootPath +"/analyse/itemassistdevice/itemassistdevice!input.action?itemid="+itemid+"&methodid="+methodiddata+"&assistid="+did;
//	alert(url);
//	var _dialog =  window.top.$('<div id ="role-dlg" style="padding:0px;"><iframe id="analysissparamFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
//	_dialog.dialog({
//		title:'辅助仪器编辑',
//		autoOpen:false,
//		modal:true,
//		closed:true,
//		width:'360',
//		height:'240',
//		buttons:[{
//			text:'保存',
//			iconCls:'icon-save',
//			handler:function(){			
//				$("#analysissparamFrame",top.document.body).contents().find("#analyseform").form('submit',{
//					url:rootPath +'/analyse/itemassistdevice/itemassistdevice!save.action',
//					onSubmit:function(){
//						var objs= $("#analysissparamFrame",top.document.body).contents().find(".grkj-validate");
//						if(!saveCheck(objs)){
//							$("#analysissparamFrame",top.document.body).contents().find(":input").focus();
//							alert("数据输入不符合格式，请查看红色边框的输入框的输入提示！");
//							return false;
//						}
//					},
//					success:function(data){
//						if(data=='success'){
//							_dialog.dialog('close');
//							$("#itemassistdevice").datagrid('reload');
//							alert('保存成功');
//						}else if(data=='fail'){
//							alert("保存失败");
//						}
//					},
//					error:function(){
//						alert("保存失败");
//					}
//				});	
//			}
//		},{
//			text:'取消',
//			iconCls:'icon-cancel',
//			handler:function(){
//				_dialog.dialog('close');
//			}
//		}],
//		onClose:function(){
//			_dialog.dialog("destroy");
//			
//		}
//	});
//	_dialog.dialog('open');
//}
