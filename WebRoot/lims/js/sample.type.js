$(function() {
	var documentWidth = document.body.clientWidth;
	$('#datagrid1')
			.datagrid(
					{
						width : documentWidth,
						height : 655,
						nowrap : false,
						striped : true,
						collapsible : true,
						url : 'monitorpointtype!toList.action',
						fit : true,
						fitColumns : true,
						scrollbarSize : 0,
						remoteSort : false,
						idField : 'monitorpointtype',
						singleSelect : false,
						pageSize : 20,
						pageList : [ 20, 30, 40, 50 ],
						frozenColumns : [ [ {
							field : 'monitorpointtype',
							checkbox : true,
							align : "center"
						} ] ],
						columns : [ [
								{
									field : 'parentpointtype',
									title : '监测点大类型',
									width : 200,
									align : "center"
								},
								{
									field : 'monitorpointtypename',
									title : '监测点类型名称',
									width : 425,
									align : "center"
								},
								{
									field : 'monitorpointtypecode',
									title : '监测点类型编码',
									width : 425,
									align : "center"
								},
								{
									field : 'monitorpointtag',
									title : '监测点符号',
									width : 200,
									align : "center"
								},
								{
									field : 'reportgroup',
									title : '报告组',
									width : 200,
									align : "center"
								},
								{
									field : 'operate',
									title : '操作',
									width : 120,
									align : "center",
									formatter : function(value, rec, rowIndex) {
										var links = '<img src="'
												+ rootPath
												+ '/themes/default/images/xiangxiimage.png" id="btnshow"  alt="详细"  onclick="detail('
												+ rec.monitorpointtype
												+ ')"/>&nbsp;';
										links += '<img src="'
												+ rootPath
												+ '/themes/default/images/bianjiimage.png" id="btnshow"  alt="编辑"  onclick="addWin('
												+ rec.monitorpointtype
												+ ')"/>&nbsp;';
										links += '<img src="'
												+ rootPath
												+ '/themes/default/images/deleteimage.png" id="btnshow"  alt="删除"  onclick="del(\''
												+ rec.monitorpointtype
												+ '\',\'' + rowIndex
												+ '\')"/>&nbsp;';
										links += '<img src="'
												+ rootPath
												+ '/themes/icons/redo.png" id="btnshow"  alt="修改" onclick="update('
												+ rec.monitorpointtype + ')">';
										return links;
									}
								} ] ],
						pagination : true,
						rownumbers : true,
						onLoadSuccess : function() {
							$('#datagrid1').datagrid('clearSelections');
						}

					});
	$(window).resize(function() {
		$("#datagrid1").datagrid('resize', {
			width : function() {
				return documentWidth;
			},
			height : function() {
				return document.body.clientHeight;
			}
		});
	});
});
//添加
function addWin(id) {
	$('#datagrid1').datagrid('clearSelections');
	var url = rootPath + "/monitorpointtype/monitorpointtype!input.action";
	if (id != "") {
		url = url + "?id=" + id;
	}
	//$(window.top.document).find("#btnProjectInfo").click();
	var _dialog = window.top
			.$(
					'	<div id ="role-dlg" style="padding:0px;"><iframe id="trainplanFrame" width="100%" height="100%" frameborder="0" scrolling="no" src=' + url + '></iframe></div>')
			.appendTo(window.top.document.body);
	//window.top.document.body.appendChild(win);
	_dialog
			.dialog( {
				title : '监测点类型编辑',
				autoOpen : false,
				modal : true,
				closed : true,
				width : '300',
				height : '250',
				buttons : [
						{
							text : '保存',
							iconCls : 'icon-save',
							handler : function() {
								$("#trainplanFrame", top.document.body)
										.contents()
										.find("#trainForm")
										.form(
												'submit',
												{
													url : rootPath
															+ "/monitorpointtype/monitorpointtype!save.action",
													onSubmit : function() {
														var objs = $(
																"#trainplanFrame",
																top.document.body)
																.contents()
																.find(
																		".grkj-validate");
														if (!saveCheck(objs)) {
															$(
																	"#trainplanFrame",
																	top.document.body)
																	.contents()
																	.find(
																			":input")
																	.focus();
															alert("数据输入不符合格式，请查看红色边框的输入框的输入提示！");
															return false;
														}

													},
													success : function(data) {
														_dialog.dialog('close');
														$("#datagrid1")
																.datagrid(
																		'reload');
														alert('成功');
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
//关闭
function closeAddWin() {
	$('#addWin').window('close');
}

//详情
function detail(id) {
	$('#datagrid1').datagrid('clearSelections');
	var url = rootPath + "/monitorpointtype/monitorpointtype!view.action?id="
			+ id;
	//if(id!=""){
	//	url = url + "?id="+id;
	//}
	//$(window.top.document).find("#btnProjectInfo").click();
	var _dialog = window.top
			.$(
					'	<div id ="role-dlg" style="padding:0px;"><iframe id="trainplanViewFrame" width="100%" height="100%" frameborder="0" scrolling="no" src=' + url + '></iframe></div>')
			.appendTo(window.top.document.body);
	//window.top.document.body.appendChild(win);
	_dialog.dialog( {
		title : '监测点类型详情',
		autoOpen : false,
		modal : true,
		closed : true,
		width : '300',
		height : '250'
	});
	_dialog.dialog('open');
}

//参数信息
function toparam(typeid) {
	$('#datagrid1').datagrid('clearSelections');
	var url = rootPath
			+ "/monitorpointtype/monitorpointtype!toparam.action?typeid="
			+ typeid;

	var _dialog = window.top
			.$(
					'<div id ="role-dlg" style="padding:0px;"><iframe id="trainplanViewFrame" width="100%" height="100%" frameborder="0" scrolling="no" src=' + url + '></iframe></div>')
			.appendTo(window.top.document.body);
	_dialog.dialog( {
		title : '监测点类型详情',
		autoOpen : false,
		modal : true,
		closed : true,
		width : '600',
		height : '410'
	});
	_dialog.dialog('open');
}

//单条删除
function del(uid, row) {
	$('#datagrid1').datagrid('clearSelections');
	$('#datagrid1').datagrid('selectRow', row);
	if (window.confirm('是否删除？')) {
		$.post(rootPath
				+ "/monitorpointtype/monitorpointtype!deleteOnlyOne.action", {
			id : uid
		}, function(del) {
			if (del == 'success') {
				$('#datagrid1').datagrid('clearSelections');
				$("#datagrid1").datagrid('reload');
				alert('成功');
			}

		});
	}
}
//批量删除	
function delAll() {
	var selected = $("#datagrid1").datagrid('getSelections');
	//alert(selected.length);
	if (selected == null || selected.length < 1) {

		alert('请至少选择一条记录！');
	} else {
		if (window.confirm('是否删除？')) {
			var cc = [];
			for ( var i = 0; i < selected.length; i++) {
				if (cc == "") {
					cc += selected[i]['monitorpointtype'];
				} else {
					cc += "," + selected[i]['monitorpointtype'];
				}
			}
			$.post(rootPath
					+ "/monitorpointtype/monitorpointtype!deleteAll.action", {
				"ids" : cc
			}, function(del) {
				if (del == 'success') {
					$('#datagrid1').datagrid('clearSelections');
					$("#datagrid1").datagrid('reload');
					alert('成功');
				}
			});

		}
	}
}
function query() {
	$('#datagrid1').datagrid('clearSelections');
	var sapletypename = $("#sapletypename").val();
	var sampletypecode = $("#sampletypecode").val();
	//alert(traintype);alert(trainplanyear);
	$('#datagrid1').datagrid( {
		queryParams : {
			sapletypename : sapletypename,
			sampletypecode : sampletypecode
		},
		pageNumber : 1
	});
	//location.href = "departmentinfo.action?deptid=" + deptid+"&deptnames="+deptnames;

}
//修改
function update(id) {
	$("#datagrid1").datagrid('clearSelections');
	var url = rootPath
			+ '/monitorpointtype/monitorpointtype!modifysample.action?sampletypeid='
			+ id;
	var _dialog = window.top
			.$(
					'<div id ="role-dlg" style="padding:0px;"><iframe id="trainplanViewFrame" width="100%" height="100%" frameborder="0" scrolling="no" src=' + url + '></iframe></div>')
			.appendTo(window.top.document.body);
	_dialog.dialog( {
		title : '监测点类型修改',
		autoOpen : false,
		modal : true,
		closed : true,
		width : '800',
		height : '555',
		buttons : [ {
			text : '确定',
			iconCls : 'icon-save',
			handler : function() {
				_dialog.dialog('close');
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
//点击修改时，页面加载时执行---sampletypeid---
function initSampleTypeDataGrid(monitorpointtypeid) {
	$('#monitorpointitem')
			.datagrid(
					{
						nowrap : false,
						striped : true,
						collapsible : true,
						url : rootPath
								+ '/spot/samlingmethod/samlingmethod!samlingmethodList.action?monitorpointtypeid='
								+ monitorpointtypeid,
						sortName : 'id',
						sortOrder : 'asc',
						remoteSort : false,
						//idField : 'id',
						fit : true,
						fitColumns : true,
						scrollbarSize : 0,
						pageSize : 10,
						pageList : [ 10, 20, 30, 40, 50 ],
						frozenColumns : [ [ {
							field : 'ck',
							checkbox : true
						} ] ],
						columns : [ [
								{
									field : 'methodname',
									title : '方法名称',
									width : 200,
									align : 'center'
								},
								{
									field : 'methoddesc',
									title : '方法描述',
									width : 130,
									align : 'center'
								},
								{field:'methodcategoryid',title:'方法类型',width:50,align:"center"}	,
								{
									field : 'option',
									title : '操作',
									width : 30,
									align : 'center',
									formatter : function(value, rec) {
										var links = '<img src="'
												+ rootPath
												+ '/themes/default/images/deleteimage.png" id="btnshow" onclick="del(\''
												+ rec.samlingmethodid
												+ '\')" alt="删除"/>&nbsp;&nbsp;';
										return links;
									}
								} ] ],
						pagination : true,
						rownumbers : true,
						toolbar : "#tb"

					});
	$(window).resize(function() {
		$("#monitorpointitem").datagrid('resize');
	});
}




















