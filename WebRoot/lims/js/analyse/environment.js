//-----Au-----wjy~~
$(document).ready(function() {
	initDataGrid();
	//只有增加、修改~初始化的时候需要传参~~methodid~itemid
});

// 页面加载，数据的展示~~datagrid~~
function initDataGrid() {
	var itemid=$("#itemid").val();
	var methodid=$("#methodid").val();
	
	$('#environmentgrid')
			.datagrid(
					{
						nowrap : false,
						striped : true,
						collapsible : true,
						url : 'enveronmentparameter!environmentList.action?itemid='+itemid+'&methodid='+methodid, 
						
						remoteSort : false,						
						fit : true,
						fitColumns : true,
						scrollbarSize : 0,
						pageSize : 10,
						singleSelect:false,
						singleSelect:true,
						//frozenColumns : [ [ {field : 'envparamid',checkbox : true} ] ],
						columns : [ [
								{
									field : 'envparamid',
									hidden : true
								},{
									field : 'paramname',
									title : '参数名称',
									width : 298,
									align : 'center'
								},
								{
									field : 'unitid',
									title : '计量单位',
									width : 298,
									align : 'center'
								},

								{
									field : 'idacquiscent',
									title : '默认值',

									width : 243,
									align : "center"
								}, 
								{
									field : 'orderid',
									title : '排序', 
									width : 100,
									align : "center"
								}] ],
						
						rownumbers : true,
						onRowContextMenu:function(e,row,rowData){
						var itemflag=$("#itemflag").val();
					
						$('#editWin').removeAttr("disabled");
						$('#del').removeAttr("disabled");
						$('#detail').removeAttr("disabled");
						
						//火狐
						$('#editWin').removeClass("disable");
						$('#del').removeClass("disable");
						$('#detail').removeClass("disable");
						
						if(itemflag=='0'){
						$('#environmentgrid').datagrid('selectRow',parseInt(row));
						$("#method-menu").menu("show", {left: e.pageX,top: e.pageY});
						$("#savedata").val(rowData['envparamid']);
						e.preventDefault();
						}
						},
						onHeaderContextMenu:function(e,field){
							var itemflag=$("#itemflag").val();
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
		$("#environmentgrid").datagrid('resize');
	});
}

//修改
function editWin(id){
	if($("#editWin").attr("disabled")=="disabled"){
		return false;
	}
	var itemid=$("#itemid").val();
	var methodiddata=$("#methodid").val();
	var did="";
	if(id=='id'){
		did=$("#savedata").val();
	}
	var envparamid=$("#envparamid").val();

	var url = rootPath +"/analyse/envparam/enveronmentparameter!input.action?itemid="+itemid+"&methodid="+methodiddata;
	if(did!=""){
		url = url + "&id="+did;
	}
	var _dialog =  window.top.$('	<div id ="role-dlg" style="padding:0px;"><iframe id="environmentFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
	_dialog.dialog({
		title:'环境参数编辑',
		autoOpen:false,
		modal:true,
		closed:true,
		width:'300',
		height:'220',
		buttons:[{
			text:'保存',
			iconCls:'icon-save',
			handler:function(){
			
				$("#environmentFrame",top.document.body).contents().find("#enveronmentform").form('submit',{
					url:rootPath +'/analyse/envparam/enveronmentparameter!save.action?id='+did,
					onSubmit:function(){
					var objs= $("#environmentFrame",top.document.body).contents().find(".grkj-validate");
					if(!saveCheck(objs)){
						$("#environmentFrame",top.document.body).contents().find(":input").focus();
						alert("数据输入不符合格式，请查看红色边框的输入框的输入提示！");
						return false;
					}
					},
					success:function(data){
						if(data=='success'){
							_dialog.dialog('close');
							$("#environmentgrid").datagrid('reload');
							alert('保存成功');
						}else if(data=='exist'){
							alert("该环境参数已经存在，请确认输入！");
						}else if(data=='fail'){
							alert('保存失败');
						}
						},
					error:function(){
						alert("失败");
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


//添加
function addWin(id){
	var itemid=$("#itemid").val();
	var methodiddata=$("#methodid").val();
	var did="";
	if(id=='id'){
		did=$("#savedata").val();
	}
	var envparamid=$("#envparamid").val();
	var url = rootPath +"/analyse/envparam/enveronmentparameter!input.action?itemid="+itemid+"&methodid="+methodiddata;
	if(did!=""){
		url = url + "&id="+did;
	}
	var _dialog =  window.top.$('	<div id ="role-dlg" style="padding:0px;"><iframe id="environmentFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
	_dialog.dialog({
		title:'环境参数编辑',
		autoOpen:false,
		modal:true,
		closed:true,
		width:'300',
		height:'220',
		buttons:[{
			text:'保存',
			iconCls:'icon-save',
			handler:function(){
				$("#environmentFrame",top.document.body).contents().find("#enveronmentform").form('submit',{
					url:rootPath +'/analyse/envparam/enveronmentparameter!save.action',
					onSubmit:function(){
					var objs= $("#environmentFrame",top.document.body).contents().find(".grkj-validate");
					
					if(!saveCheck(objs)){
					
						$("#environmentFrame",top.document.body).contents().find(":input").focus();
						alert("数据输入不符合格式，请查看红色边框的输入框的输入提示！");
						return false;
					}
					},
					success:function(data){
						if(data=='success'){
							_dialog.dialog('close');
							$("#environmentgrid").datagrid('reload');
							alert('保存成功');
						}else if(data=='exist'){
							alert("该环境参数已经存在，请确认输入！");
						}else if(data=='fail'){
							alert('保存失败');
						}
						},
					error:function(){
						alert("添加失败");
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

//详情
function detail(id){
	if($("#detail").attr("disabled")=="disabled"){
		return false;
	}
	var did='';
	if(id=='id'){
		did=$("#savedata").val();
	}
		var url = rootPath +"/analyse/envparam/enveronmentparameter!view.action?id="+did;
		var _dialog =  window.top.$('<div id ="role-dlg" style="padding:0px;"><iframe  width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
		_dialog.dialog({
			title:'环境参数详情',
			autoOpen:false,
			modal:true,
			closed:true,
			width:'300',
			height:'200'
		});
		_dialog.dialog('open');
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
			$.post(rootPath +"/analyse/envparam/enveronmentparameter!deleteOnlyOne.action",{id:did},function(del){
				if(del=='success'){
					$('#environmentgrid').datagrid('clearSelections');
					$("#environmentgrid").datagrid('reload');
					alert('删除成功');
				}else{
					alert("删除失败");
				}
			});
		}
}
