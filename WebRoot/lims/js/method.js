//-----Au-----wjy~~

$(document).ready(function() {
	initDataGrid();

});

// 页面加载，数据的展示~~datagrid~~
function initDataGrid() {
	$('#methodgrid')
			.datagrid(
					{
						nowrap : false,
						striped : true,
						collapsible : true,
						url : 'method!methodList.action',
						sortName : 'methodname',
						sortOrder : 'asc',
						remoteSort : false,
						//idField : 'methodid',
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
									field : 'methodname',
									title : '方法名称',
									width : 380,
									align : 'left'
								},
								{
									field : 'methodcategoryid',
									title : '方法类别',
									width : 70,
									align : 'center'
								},

								{
									field : 'methodtype',
									title : '方法类型',

									width : 70,
									align : "center"
								},
								{
									field : 'remark',
									title : '备注',

									width : 70,
									align : "center"
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
												+ rec.methodid
												+ '\')" alt="查看"/>&nbsp;&nbsp;';
										links += '<img src="'
												+ rootPath
												+ '/themes/default/images/bianjiimage.png" id="btnshow" onclick="addWin(\''
												+ rec.methodid
												+ '\')" alt="编辑"/>&nbsp;&nbsp;';
										links += '<img src="'
												+ rootPath
												+ '/themes/default/images/deleteimage.png" id="btnshow" onclick="del(\''
												+ rec.methodid+ '\',\''+ rowIndex
												+ '\')" alt="删除"/>&nbsp;&nbsp;';
										links += '<img src="'
												+ rootPath
												+ '/themes/default/images/historyimage.png" id="btnshow" onclick="detailHistory(\''
												+ rec.methodid
												+ '\')" alt="历史版本"/>';
										return links;
									}
								} ] ],
						pagination : true,
						rownumbers : true

					});
	$(window).resize(function() {
		$("#methodgrid").datagrid('resize');
	});

}

// 详情
function detail(id) {
	$('#methodgrid').datagrid('clearSelections');
	var url = rootPath + "/method/method!view.action";
	if (id != "") {
		url = url + "?id=" + id;
	}
	var _dialog = window.top
			.$('<div id ="role-dlg" style="padding:0px;"><iframe id="detailFrame" width="100%" height="100%" frameborder="0" scrolling="no" src=' + url + '></iframe></div>')
			.appendTo(window.top.document.body);
	_dialog.dialog( {
		title : '方法详情',
		autoOpen : false,
		modal : true,
		closed : true,
		width : '400',
		height : '250'
	});
	_dialog.dialog('open');
}

// 单条删除
function del(uid,row) {
	$('#methodgrid').datagrid('clearSelections');
	$('#methodgrid').datagrid('selectRow',row);
	if (window.confirm('是否删除？')) {

		$.post("method!deleteOnlyOne.action", {
			id : uid
		}, function(del) {

			if (del == 'success') {
				alert("删除成功！");
				$("#methodgrid").datagrid('reload');
			}else{
				alert("删除失败！");
			}
		});
	}
}
//获得历史版本信息
function detailHistory(id) {
	$('#methodgrid').datagrid('clearSelections');
	var url = rootPath + "/method/method!history.action";
	if (id != "") {
		url = url + "?methodid=" + id;
	}
	var _dialog = window.top
			.$('	<div id ="role-dlg" style="padding:0px;"><iframe id="methodFrame" width="100%" height="100%" frameborder="0" scrolling="no" src=' + url + '></iframe></div>')
			.appendTo(window.top.document.body);
	_dialog.dialog( {
		title : '历史版本',
		autoOpen : false,
		modal : true,
		closed : true,
		width : '700',
		height : '500',
		onClose : function() {
			_dialog.dialog("destroy");
		}
	});
	_dialog.dialog('open');

}

// 修改
function addWin(id) {
	$('#methodgrid').datagrid('clearSelections');
	var url = rootPath + "/method/method!input.action";
	if (id != "") {
		url = url + "?id=" + id;
	}
	var _dialog = window.top.$('<div id ="role-dlg" style="padding:0px;"><iframe id="methodFrame" width="100%" height="100%" frameborder="0" scrolling="no" src=' + url + '></iframe></div>')
			.appendTo(window.top.document.body);

	_dialog.dialog( {
		title : '方法编辑',
		autoOpen : false,
		modal : true,
		closed : true,
		width : '440',
		height : '400',
		buttons : [
				{
					text : '保存',
					iconCls : 'icon-save',
					handler : function() {
						$("#methodFrame",top.document.body).contents().find("#methodform").form('submit', {
							url : rootPath + "/method/method!save.action?id="+id,
							onSubmit : function() {
									var objs= $("#methodFrame",top.document.body).contents().find(".grkj-validate");
									if(!saveCheck(objs)){
										$("#methodFrame",top.document.body).contents().find(":input").focus();
										$("#methodFrame",top.document.body).contents().find("#methodcategoryid").focus();
										$("#methodFrame",top.document.body).contents().find("#methodtype").focus();
										alert("数据输入不符合格式，请查看红色边框的输入框的输入提示！");
										return false;
									}
							},
							success : function(data) {
								if (data == 'success') {
									_dialog.dialog('close');
									alert("保存成功！");
									$("#methodgrid").datagrid('reload');
								} else if(data == 'faild'){
									alert("保存失败");
								}else if(data == 'exist'){
									alert("该方法已经存在，请重新填写！");
								}
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


// 查询
function query() {

	var methodname = $("#methodname").val();//方法名称
	var methodcategoryid = $("#methodcategoryid").val();//所属类别：国标，地标，行标
	var methodtype = $("#methodtype").val();//方法类型：分析方法，采样方法
	
	$('#methodgrid').datagrid( {
		queryParams : {
			methodname : methodname,
			methodcategoryid : methodcategoryid,
			methodtype : methodtype
		},
		pageNumber : 1  //查询后指定页码为1
	});
}

//删除功能~批量
function delAll() {
	var selected = $('#methodgrid').datagrid('getSelections');

	if (selected != null && selected != "") {
		if (window.confirm("是否删除？")) {
			var selcheck = new Array();
			for ( var i = 0; i < selected.length; i++) {
				selcheck[i] = selected[i].methodid;
			}

			$.post(rootPath + "/method/method!betchDeleteMethod.action?id="
					+ selcheck, function(del) {

				if (del == 'success') {
					alert("删除成功!");
					$("#methodgrid").datagrid('reload');
				}else{
					alert("删除失败!");
					$("#methodgrid").datagrid('reload');
				}
			});

		}
	} else {

		alert('请至少选择一条记录！');
		return;
	}

}

