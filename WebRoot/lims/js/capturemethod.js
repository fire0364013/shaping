//-----Au-----wjy~~2012-07-13 17:03
$(document).ready(function() {
	initDataGrid();
});
// 页面加载，数据的展示~~datagrid~~
function initDataGrid() {
	$('#capturegrid').datagrid(
					{
						nowrap : false,
						striped : true,
						collapsible : true,
						singleSelect:false,
						url : rootPath + '/capturemethod/capturemethod!toList.action',
						sortName : 'capturemethid',
						sortOrder : 'asc',
						remoteSort : false,
						fit : true,
						fitColumns : true,
						scrollbarSize : 0,
						idField:'capturemethodid',
						pageSize : 20,
						pageList : [ 20, 30, 40, 50 ],
						frozenColumns : [ [ {
							field : 'capturemethodid',
							checkbox : true,align:'center'
						} ] ],
						columns : [ [
								{
									field : 'capturemethodname',
									title : '仪器解析名称',
									width : 100,
									align : 'center'
								},
								{
									field : 'capturemethod',
									title : '仪器解析编号',
									width : 120,
									align : 'center'
								},
								{
									field : 'option',
									title : '操作',
									width : 70,
									align : 'center',
									
									formatter : function(value, rec,rowIndex) {
										var links = '<img src="'
												+ rootPath
												+ '/themes/default/images/xiangxiimage.png" id="btnshow" onclick="detail(\''
												+ rec.capturemethodid
												+ '\')" alt="查看"/>&nbsp;&nbsp;';
										links += '<img src="'
												+ rootPath
												+ '/themes/default/images/bianjiimage.png" id="btnshow" onclick="addWin(\''
												+ rec.capturemethodid
												+ '\')" alt="编辑"/>&nbsp;&nbsp;';
										links += '<img src="'
												+ rootPath
												+ '/themes/default/images/deleteimage.png" id="btnshow" onclick="del(\''
												+ rec.capturemethodid+ '\',\''+ rowIndex
												+ '\')" alt="删除"/>';
										return links;
									
									}
								} ] ],
						pagination : true,
						rownumbers : true
					});
	$(window).resize(function() {
		$("#capturegrid").datagrid('resize');
	});
}

// 修改
function addWin(id) {
//	alert(id);
	$('#capturegrid').datagrid('clearSelections');
	var url = rootPath + "/capturemethod/capturemethod!input.action";
	if (id != "") {
		url = url + "?id=" + id;
	}
	var _dialog = window.top.$('<div id ="role-dlg" style="padding:0px;"><iframe id="regionFrame" width="100%" height="100%" frameborder="0" scrolling="no" src=' + url + '></iframe></div>').appendTo(window.top.document.body);
	_dialog.dialog( {
		title : '仪器解析编辑',
		autoOpen : false,
		modal : true,
		closed : true,
		width : '400',
		height : '350',
		buttons : [
				{
					text : '保存',
					iconCls : 'icon-save',
					handler : function() {
					
					$("#regionFrame",top.document.body).contents().find("#capturemethodForm").form('submit',{
						url : rootPath + "/capturemethod/capturemethod!save.action",
						onSubmit:function(){
						var objs= $("#regionFrame",top.document.body).contents().find(".grkj-validate");
						if(!saveCheck(objs)){
							$("#regionFrame",top.document.body).contents().find(":input").focus();
							alert("数据输入不符合格式，请查看红色边框的输入框的输入提示！");
							return false;
						}
						},
						success:function(data){
							if(data=='success'){
							_dialog.dialog('close');
							$("#capturegrid").datagrid('reload');
							alert('保存成功');
							}else if(data=='fail')	{
								alert('保存失败');
							}else if(data=='exist'){
								alert('该容器名称已经存在，请重新输入');
								$("#regionFrame",top.document.body).contents().find("#regioncode").focus();
							}
						},
						error:function(){
							alert("修改失败");
						}
					});	
				}
				}, {
					text : '取消',
					iconCls : 'icon-cancel',
					handler : function() {
						_dialog.dialog('close');
					}
				} ],
		onClose : function() {
			_dialog.dialog("destroy");
		}
	});
	_dialog.dialog('open');
}

// 详情
function detail(id) {
	$('#capturegrid').datagrid('clearSelections');
	var url = rootPath + "/capturemethod/capturemethod!view.action";
	if (id != "") {
		url = url + "?id=" + id;
	}
	var _dialog = window.top.$('<div id ="role-dlg" style="padding:0px;"><iframe id="regionFrame" width="100%" height="100%" frameborder="0" scrolling="no" src=' + url + '></iframe></div>').appendTo(window.top.document.body);
	_dialog.dialog( {
		title : '仪器解析详情',
		autoOpen : false,
		modal : true,
		closed : true,
		width : '400',
		height : '350'
	});
	_dialog.dialog('open');
	
}
		//单条删除
		function del(capturemethodid,rowIndex){
			$('#capturegrid').datagrid('clearSelections');
			$('#capturegrid').datagrid('selectRow',rowIndex);
			if(window.confirm('是否删除？'))
			{
				$.post(rootPath +"/capturemethod/capturemethod!deleteOnlyOne.action",{id:capturemethodid},function(del){
						if(del=='success')
						{
							$('#capturegrid').datagrid('clearSelections');
							$("#capturegrid").datagrid('reload');
							alert('成功');
						}
					});
			
			}
		}
	
		//批量删除	
		function delAll(){
			var selected=$("#capturegrid").datagrid('getSelections');
			if(selected==null || selected.length< 1){
				
				alert('请至少选择一条记录！');
			}
			else{
				if(window.confirm('是否删除？')){
					var cc=[];
					for ( var i = 0; i < selected.length; i++) {
						if(cc==""){
								cc+=selected[i]['capturemethodid'];
						}
						else{
							cc+=","+selected[i]['capturemethodid'];
							}
					}
					
					$.post(rootPath +"/capturemethod/capturemethod!deleteAll.action",{"ids":cc},function(del){
						if(del=='success'){
							$('#capturegrid').datagrid('clearSelections');
							$("#capturegrid").datagrid('reload');
							alert('成功');
						}
					});
					
				 }
			}
		}

		//查询
		function query(){
			
			var capturemethodname=$("#capturemethodname").val();

			$('#capturegrid').datagrid( {
				queryParams : {
				capturemethodname : capturemethodname
				},
				pageNumber:1		
			});
		}
		
