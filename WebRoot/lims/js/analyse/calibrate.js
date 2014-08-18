
$(document).ready(function() {
	initDataGrid();
//只有增加、修改~初始化的时候需要传参~~methodid~itemid
});
var i = 0;
var j = 0;
// 页面加载，数据的展示~~datagrid~~analysissparamgrid
function initDataGrid() {
	i = 0;
	j = 0;
	var itemid=$("#itemid").val();
	var methodid=$("#methodid").val();
	$('#calibrategrid').datagrid(
					{
						nowrap : false,
						striped : true,
						collapsible : true,
						url : 'calibrateparameter!caliList.action?itemid='+itemid+'&methodid='+methodid, 
						sortName : 'calibrateparamid',
						sortOrder : 'asc',
						remoteSort : false,						
						fit : true,
						fitColumns : true,
						scrollbarSize : 0,
						singleSelect:true,
						columns : [ [
									{
										field : 'parametername',
										title : '校准曲线名称',
										width : 220,
										align : 'center'
									},
									{
										field : 'unitid',
										title : '计量单位',
										width : 60,
										align : "center"
									},
									{
										field : 'expression',
										title : '计算公式',

										width : 280,
										align : "left"
									},
									{
										field : 'conventionid',
										title : '修约规则',

										width : 100,
										align : "center"
									},
									{
										field : 'significantdigit',
										title : '有效数字',

										width : 60,
										align : "center"
									},
									{
										field : 'decimaldigit',
										title : '小数位数',

										width : 60,
										align : "center"
									},{
										field : 'isx',
										title : 'X',

										width : 40,
										align : "center",
										formatter : function(value){
										if(value=='1'){
											i++;
											return "是";
										}else{
											return "否";
										}}
									},
									{
										field : 'isy',
										title : 'Y',

										width : 40,
										align : "center",
										formatter : function(value){
										if(value=='1'){
											j++;
											return "是";
										}else{
											return "否";
										}}
									}] ],
					
						rownumbers : true,
						onRowContextMenu:function(e,row,rowData){
						var itemflag=$("#itemflag").val();
						//IE
							$('#editWin').removeAttr("disabled");
							$('#del').removeAttr("disabled");
							$('#detail').removeAttr("disabled");
							//火狐
							$('#editWin').removeClass("disable");
							$('#del').removeClass("disable");
							$('#detail').removeClass("disable");
							
						if(itemflag=='0'){
						$('#analysissparamgrid').datagrid('selectRow',parseInt(row));
						$("#method-menu").menu("show", {left: e.pageX,top: e.pageY});
						$("#savedata").val(rowData['calibrateparamid']);
						e.preventDefault();
						}
						},
						onHeaderContextMenu:function(e,field){
							var itemflag=$("#itemflag").val();
							//IE
								$('#editWin').attr({disabled:"true"});
								$('#del').attr({disabled:"true"});
								$('#detail').attr({disabled:"true"});
								//火狐
								$('#editWin').addClass("disable");
								$('#del').addClass("disable");
								$('#detail').addClass("disable");
							if(itemflag=='0'){
							$('#method-menu').menu('show', {
								left: e.pageX,
								top: e.pageY
						});
							e.preventDefault();
							}
						}
					});
	$(window).resize(function() {
		$("#calibrategrid").datagrid('resize');
	});
}


//单条删除
function del(id){
	if($("#del").attr("disabled")=="disabled"){
		return false;
	}
	var did='';
	if(id=='id'){
		did=$("#savedata").val();
	}
		if(window.confirm('是否删除？')){
			$.post(rootPath +"/analyse/calibrate/calibrateparameter!deleteOnlyOne.action",{id:did},function(del){
				if(del=='success'){
					$('#calibrategrid').datagrid('clearSelections');
					$("#calibrategrid").datagrid('reload');
					alert('删除成功');
					//重置 I J 。每次加载都让他从0开始。
					i=0;
					j= 0;
				}else{
					alert("删除失败");
				}
				
			});
		}
}

//详情
function detail(id){

	if($("#detail").attr("disabled")=="disabled"){
			return false;
		}
	var did='';
	if(id=='id'){
		did=$("#savedata").val();
	}
		var url = rootPath +"/analyse/calibrate/calibrateparameter!view.action?id="+did;
		var _dialog =  window.top.$('<div id ="role-dlg" style="padding:0px;"><iframe  width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
		_dialog.dialog({
			title:'校准曲线详情',
			autoOpen:false,
			modal:true,
			closed:true,
			width:'700',
			height:'400'
		});
		_dialog.dialog('open');
	}


//添加
function addWin(id){
	var itemid=$("#itemid").val();
	var methodiddata=$("#methodid").val();
	var did="";
	if(id=='id'){
		did=$("#savedata").val();
		if($("#editWin").attr("disabled")=="disabled"){
			return false;
}
	}
	var url = rootPath +"/analyse/calibrate/calibrateparameter!input.action";
	if(did!=""){
		url = url + "?id="+did+"&itemid="+itemid+"&methodid="+methodiddata;
	}else{
		url=url+"?itemid="+itemid+"&methodid="+methodiddata;
	}
	var _dialog =  window.top.$('	<div id ="role-dlg" style="padding:0px;"><iframe id="analysissparamFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
	_dialog.dialog({
		title:'校准曲线编辑',
		autoOpen:false,
		modal:true,
		closed:true,
		width:'700',
		height:'300',
		buttons:[{
			text:'保存',
			iconCls:'icon-save',
			handler:function(){
				$("#analysissparamFrame",top.document.body).contents().find("#analyseform").form('submit',{
				//	url:rootPath +'/analyse/calibrate/calibrateparameter!save.action?id='+did,  saveMySelf
					url:rootPath +'/analyse/calibrate/calibrateparameter!saveMySelf.action?id='+did,  
					onSubmit:function(){
					var objs= $("#analysissparamFrame",top.document.body).contents().find(".grkj-validate");
					if(!saveCheck(objs)){
						$("#analysissparamFrame",top.document.body).contents().find(":input").focus();
						alert("数据输入不符合格式，请查看红色边框的输入框的输入提示！");
						return false;
					}
					var isx= $("#analysissparamFrame",top.document.body).contents().find("#isx").val();
					var isy= $("#analysissparamFrame",top.document.body).contents().find("#isy").val();
						if(isx==1&&isy==1){
							alert("参数不能同时为X，Y");
							return false;
						}
						
					/*
						if(isx==1&&i==1){
							alert("X轴参数已经存在，请重新选择！");
							return false;
						}
						if(isy==1&&j==1){
							alert("Y轴参数已经存在，请重新选择！");
							return false;
						}*/
					},
					success:function(data){
						if(data=='success'){
							_dialog.dialog('close');
							$("#calibrategrid").datagrid('reload');
							alert('保存成功');
						}else if(data=='exist'){
							alert("该校准曲线参数已经存在，请确认输入！");
						}else if(data=='fail'){
							alert("保存失败");
						}
						//重置 I J 。每次加载都让他从0开始。
						i= 0;
						j= 0;
						},
					error:function(){
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