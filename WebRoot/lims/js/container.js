//-----Au-----wjy~~2012-07-13 17:03
$(document).ready(function() {
	initDataGrid();
});
// 页面加载，数据的展示~~datagrid~~
function initDataGrid() {
	$('#containergrid').datagrid(
					{
						nowrap : false,
						striped : true,
						collapsible : true,
						singleSelect:false,
						url : 'container!toList.action',
						sortName : 'containerid',
						sortOrder : 'asc',
						remoteSort : false,
						fit : true,
						fitColumns : true,
						scrollbarSize : 0,
						pageSize : 20,
						pageList : [ 20, 30, 40, 50 ],
						frozenColumns : [ [ {
							field : 'ck',
							checkbox : true,align:'center'
						} ] ],
						columns : [ [
								{
									field : 'containername',
									title : '容器名称',
									width : 120,
									align : 'center'
								},
								{
									field : 'tag',
									title : '容器标识符',
									width : 100,
									align : 'center'
								},
								{
									field : 'itemname',
									title : '监测项目',
									width : 280,
									align : 'left'
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
												+ rec.containerid
												+ '\')" alt="查看"/>&nbsp;&nbsp;';
										links += '<img src="'
												+ rootPath
												+ '/themes/default/images/bianjiimage.png" id="btnshow" onclick="addWin(\''
												+ rec.containerid
												+ '\')" alt="编辑"/>&nbsp;&nbsp;';
										links += '<img src="'
												+ rootPath
												+ '/themes/default/images/deleteimage.png" id="btnshow" onclick="del(\''
												+ rec.containerid+ '\',\''+ rowIndex
												+ '\')" alt="删除"/>';
										return links;
									
									}
								} ] ],
						pagination : true,
						rownumbers : true
					});
	$(window).resize(function() {
		$("#containergrid").datagrid('resize');
	});
}

// 修改
function addWin(id) {
	$('#containergrid').datagrid('clearSelections');
	var url = rootPath + "/container/container!input.action";
	if (id != "") {
		url = url + "?id=" + id;
	}
	var _dialog = window.top.$('<div id ="role-dlg" style="padding:0px;"><iframe id="regionFrame" width="100%" height="100%" frameborder="0" scrolling="no" src=' + url + '></iframe></div>').appendTo(window.top.document.body);
	_dialog.dialog( {
		title : '容器编辑',
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
					
					$("#regionFrame",top.document.body).contents().find("#containerForm").form('submit',{
						url : rootPath + "/container/container!save.action",
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
							$("#containergrid").datagrid('reload');
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
	$('#containergrid').datagrid('clearSelections');
	var url = rootPath + "/container/container!view.action";
	if (id != "") {
		url = url + "?id=" + id;
	}
	var _dialog = window.top.$('<div id ="role-dlg" style="padding:0px;"><iframe id="regionFrame" width="100%" height="100%" frameborder="0" scrolling="no" src=' + url + '></iframe></div>').appendTo(window.top.document.body);
	_dialog.dialog( {
		title : '容器详情',
		autoOpen : false,
		modal : true,
		closed : true,
		width : '400',
		height : '350'
	});
	_dialog.dialog('open');
	
}

// 单条注销
function del(uid,row) {
	$('#containergrid').datagrid('clearSelections');
	$('#containergrid').datagrid('selectRow',row);
	if (window.confirm('是否删除？')) {
		$.post("container!deleteOnlyOne.action", {
			id : uid
		}, function(del) {
			if (del == 'success') {
				alert("删除成功!");
				$("#containergrid").datagrid('reload');
			} else {
				alert("删除失败!");
			}
		});
	}
}

// 删除功能~批量
function delAll() {
	var selected = $('#containergrid').datagrid('getSelections');
	if (selected != null && selected != "") {
		if (window.confirm("是否删除？")) {
			var selcheck = new Array();
			for ( var i = 0; i < selected.length; i++) {
				selcheck[i] = selected[i].containerid;
			}
			$.post(rootPath + "/container/container!deleteContainer.action?id="
					+ selcheck, function(del) {
				if (del == 'success') {
					alert("删除成功!");
					$("#containergrid").datagrid('reload');
				}
			});
		}
	} else {
		alert('请至少选择一条记录！');
		return;
	}
}

// 查询
function query() {
	var containername = $("#containername").val();
	$('#containergrid').datagrid( {
		queryParams : {
		containername : containername
		},
		pageNumber : 1
	});
}

	