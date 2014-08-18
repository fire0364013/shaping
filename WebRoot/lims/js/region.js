//-----Au-----wjy~~2012-07-13 17:03
$(document).ready(function() {
	initDataGrid();
});
// 页面加载，数据的展示~~datagrid~~
function initDataGrid() {
	$('#regiongrid').datagrid(
					{
						nowrap : false,
						striped : true,
						collapsible : true,
						singleSelect:false,
						url : 'region!regionList.action',
						sortName : 'regioncode',
						sortOrder : 'asc',
						remoteSort : false,
						//idField : 'regioncode',
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
									field : 'regioncode',
									title : '区域编号',
									width : 298,
									align : 'center'
								},
								{
									field : 'regionname',
									title : '区域名称',
									width : 298,
									align : 'center'
								},
								{
									field : 'isused',
									title : '是否使用',

									width : 243,
									align : "center",
										formatter:function(value,rowData){
										if(rowData.isused=='0'){
											return '否';}
										else if(rowData.isused=='1'){
											return '是';}
									}	
								},
								{
									field : 'option',
									title : '操作',
									width : 80,
									align : 'center',
									
									formatter : function(value, rec,rowIndex) {
										var links = '<img src="'
												+ rootPath
												+ '/themes/default/images/xiangxiimage.png" id="btnshow" onclick="detail(\''
												+ rec.regioncode
												+ '\')" alt="查看"/>&nbsp;&nbsp;';
										links += '<img src="'
												+ rootPath
												+ '/themes/default/images/bianjiimage.png" id="btnshow" onclick="addWin(\''
												+ rec.regioncode
												+ '\')" alt="编辑"/>&nbsp;&nbsp;';
										links += '<img src="'
												+ rootPath
												+ '/themes/default/images/zhuxiaoimage.png" id="btnshow" onclick="del(\''
												+ rec.regioncode+ '\',\''+ rowIndex
												+ '\')" alt="注销"/>';
										return links;
									
									}
								} ] ],
						pagination : true,
						rownumbers : true
					});
	$(window).resize(function() {
		$("#regiongrid").datagrid('resize');
	});
}

// 修改
function addWin(id) {
	$('#regiongrid').datagrid('clearSelections');
	var url = rootPath + "/region/region!input.action";
	if (id != "") {
		url = url + "?id=" + id;
	}
	var _dialog = window.top.$('<div id ="role-dlg" style="padding:0px;"><iframe id="regionFrame" width="100%" height="100%" frameborder="0" scrolling="no" src=' + url + '></iframe></div>').appendTo(window.top.document.body);
	_dialog.dialog( {
		title : '区域编辑',
		autoOpen : false,
		modal : true,
		closed : true,
		width : '360',
		height : '200',
		buttons : [
				{
					text : '保存',
					iconCls : 'icon-save',
					handler : function() {
					$("#regionFrame",top.document.body).contents().find("#regionform").form('submit',{
						url : rootPath + "/region/region!save.action",
						onSubmit : function() {
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
								$("#regiongrid").datagrid('reload');
								alert('保存成功');
							}else if(data=='fail')	{
								alert('保存失败');
							}else if(data=='exist'){
								alert('该区域编号已经存在，请重新输入');
								$("#regionFrame",top.document.body).contents().find("#regioncode").focus();
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

// 详情
function detail(id) {
	$('#regiongrid').datagrid('clearSelections');
	var url = rootPath + "/region/region!view.action";
	if (id != "") {
		url = url + "?id=" + id;
	}
	var _dialog = window.top.$('<div id ="role-dlg" style="padding:0px;"><iframe id="regionFrame" width="100%" height="100%" frameborder="0" scrolling="no" src=' + url + '></iframe></div>').appendTo(window.top.document.body);
	_dialog.dialog( {
		title : '区域详情',
		autoOpen : false,
		modal : true,
		closed : true,
		width : '310',
		height : '150'
	});
	_dialog.dialog('open');
	
}

// 单条注销
function del(uid,row) {
	$('#regiongrid').datagrid('clearSelections');
	$('#regiongrid').datagrid('selectRow',row);
	if (window.confirm('您确定要注销该区域吗？')) {
		$.post("region!deleteOnlyOne.action", {
			id : uid
		}, function(del) {
			if (del == 'success') {
				alert("注销成功！");
				$("#regiongrid").datagrid('reload');
			} else {
				alert("该区域已经被注销,请勿重复注销!");
			}
		});
	}
}

// 删除功能~批量
function delAll() {
	var selected = $('#regiongrid').datagrid('getSelections');
	if (selected != null && selected != "") {
		if (window.confirm("是否删除？")) {
			var selcheck = new Array();
			for ( var i = 0; i < selected.length; i++) {
				selcheck[i] = selected[i].regioncode;
			}
			$.post(rootPath + "/region/region!deleteRegion.action?id="
					+ selcheck, function(del) {
				if (del == 'success') {
					alert("删除成功!");
					$("#regiongrid").datagrid('reload');
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
	var regioncode = $("#regioncode").val();
	var regionnames = $("#regionnames").val();
	$('#regiongrid').datagrid( {
		queryParams : {
		regioncode : regioncode,
			regionName : regionnames
		},
		pageNumber : 1
	});
}