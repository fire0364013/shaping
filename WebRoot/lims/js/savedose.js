//-----Au-----wjy~~2012-07-13 17:03
$(document).ready(function() {
	initDataGrid();
});
// 页面加载，数据的展示~~datagrid~~
function initDataGrid() {
	$('#savedosegrid').datagrid(
					{
						nowrap : false,
						striped : true,
						collapsible : true,
						singleSelect:false,
						url : 'savedose!toList.action',
						sortName : 'savedoseid',
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
									field : 'savedosename',
									title : '保存剂名称',
									width : 280,
									align : 'center'
								},
								{
									field : 'itemname',
									title : '监测项目',
									width : 280,
									align : 'center'
								},
								{
									field : 'remark',
									title : '备注',
									width : 280,
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
												+ rec.savedoseid
												+ '\')" alt="查看"/>&nbsp;&nbsp;';
										links += '<img src="'
												+ rootPath
												+ '/themes/default/images/bianjiimage.png" id="btnshow" onclick="addWin(\''
												+ rec.savedoseid+ '\',\''+ rec.savedosename
												+ '\')" alt="编辑"/>&nbsp;&nbsp;';
										links += '<img src="'
												+ rootPath
												+ '/themes/default/images/deleteimage.png" id="btnshow" onclick="del(\''
												+ rec.savedoseid+ '\',\''+ rowIndex
												+ '\')" alt="删除"/>';
										return links;
									
									}
								} ] ],
						pagination : true,
						rownumbers : true
					});
	$(window).resize(function() {
		$("#savedosegrid").datagrid('resize');
	});
}

// 修改
function addWin(id,savedosename) {
	$('#savedosegrid').datagrid('clearSelections');
	
	var strEncode=encodeURI(encodeURI(savedosename));
	var url = rootPath + "/savedose/savedose!input.action";
	if (id != "") {
		url = url + "?id=" + id+"&savedosername="+strEncode;
	}
	var _dialog = window.top.$('<div id ="role-dlg" style="padding:0px;"><iframe id="savedoseForm" width="100%" height="100%" frameborder="0" scrolling="no" src=' + url + '></iframe></div>').appendTo(window.top.document.body);
	_dialog.dialog( {
		title : '保存剂编辑',
		autoOpen : false,
		modal : true,
		closed : true,
		width : '400',
		height : '300',
		buttons : [
				{
					text : '保存',
					iconCls : 'icon-save',
					handler : function() {
					
					$("#savedoseForm",top.document.body).contents().find("#savedoseinputform").form('submit',{
						url : rootPath + "/savedose/savedose!save.action",
						onSubmit:function(){
						var objs= $("#savedoseForm",top.document.body).contents().find(".grkj-validate");
						if(!saveCheck(objs)){
							$("#savedoseForm",top.document.body).contents().find(":input").focus();
							alert("数据输入不符合格式，请查看红色边框的输入框的输入提示！");
							return false;
						}
						},
						success:function(data){
							if(data=='success'){
							_dialog.dialog('close');
							$("#savedosegrid").datagrid('reload');
							alert('保存成功');
							}else if(data=='fail')	{
								alert('保存失败');
							}else if(data=='exist'){
								alert('该保存剂名称已经存在，请重新输入');
								$("#savedoseForm",top.document.body).contents().find("#regioncode").focus();
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
	$('#savedosegrid').datagrid('clearSelections');
	var url = rootPath + "/savedose/savedose!view.action";
	if (id != "") {
		url = url + "?id=" + id;
	}
	var _dialog = window.top.$('<div id ="role-dlg" style="padding:0px;"><iframe id="savedoseviewForm" width="100%" height="100%" frameborder="0" scrolling="no" src=' + url + '></iframe></div>').appendTo(window.top.document.body);
	_dialog.dialog( {
		title : '保存剂详情',
		autoOpen : false,
		modal : true,
		closed : true,
		width : '400',
		height : '300'
	});
	_dialog.dialog('open');
	
}

// 单条删除
function del(savedoseid,row) {
	$('#savedosegrid').datagrid('clearSelections');
	$('#savedosegrid').datagrid('selectRow',row);
	if (window.confirm('是否删除？')) {
		$.post("savedose!deleteOnlyOne.action", {
			id : savedoseid
		}, function(del) {
			if (del == 'success') {
				alert("删除成功!");
				$("#savedosegrid").datagrid('reload');
			} else {
				alert("删除失败!");
			}
		});
	}
}

// 删除功能~批量
function delAll() {
	var selected = $('#savedosegrid').datagrid('getSelections');
	if (selected != null && selected != "") {
		if (window.confirm("是否删除？")) {
			var selcheck = new Array();
			for ( var i = 0; i < selected.length; i++) {
				selcheck[i] = selected[i].savedoseid;
			}
			$.post(rootPath + "/savedose/savedose!deleteContainer.action?id="
					+ selcheck, function(del) {
				if (del == 'success') {
					alert("删除成功!");
					$("#savedosegrid").datagrid('reload');
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
	var savedosername = $("#savedosername").val();
	$('#savedosegrid').datagrid( {
		queryParams : {
		savedosername : savedosername
		},
		pageNumber : 1
	});
}

	