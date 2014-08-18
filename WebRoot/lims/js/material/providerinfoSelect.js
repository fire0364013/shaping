//-----Au-----wjy~~

$(document).ready(function() {
	initDataGrid();
});

function initDataGrid() {
	$('#providergrid')
			.datagrid(
					{
						nowrap : false,
						striped : true,
						collapsible : true,
						url : rootPath + '/material/providerinfo/providerinfo!proList.action',
						remoteSort : false,
						idField : 'providerid',
						fit : true,
						fitColumns : true,
						singleSelect:true,
						scrollbarSize : 0,
						pageSize : 10,
						pageList : [ 10,20, 30, 40],
						frozenColumns : [ [ {
							field : 'providerid',
							title : '&nbsp;',
							width : 30,
							align : 'center',
							formatter : function(value){
								return "<input type='radio' name='radio'/>";
							}
						} ] ],
						columns : [ [
								{
									field : 'providername',
									title : '供应商',
									width : 200,
									align : 'center'
								},
								{
									field : 'linkman',
									title : '联系人',

									width : 150,
									align : "center"
								},{
									field : 'phone',
									title : '联系电话',

									width : 150,
									align : "center"
								},
								{
									field : 'address',
									title : '地址',
									width : 200,
									align : 'center'
								},
								{
									field : 'option',
									title : '操作',
									width : 100,
									align : 'center',
									formatter : function(value, rec,rowIndex) {
										var links = '<img src="'
												+ rootPath
												+ '/themes/default/images/xiangxiimage.png" id="btnshow" onclick="detail(\''
												+ rec.providerid
												+ '\')" alt="详细"/>&nbsp;&nbsp;';
										links += '<img src="'
												+ rootPath
												+ '/themes/default/images/bianjiimage.png" id="btnshow" onclick="addWin(\''
												+ rec.providerid
												+ '\')" alt="编辑"/>&nbsp;&nbsp;';
										links += '<img src="'
												+ rootPath
												+ '/themes/default/images/deleteimage.png"   alt="删除"   id="btnshow"  onclick="del(\''+rec.providerid+ '\',\''+ rowIndex+'\')"/>';

										return links;
									}
								} ] ],
								onSelect:function(){
									var selected=$("#providergrid").datagrid('getSelected');
									checkRadio();
									$("#selectedUser").val(selected['providername']);
									$("#selectedUserid").val(selected['providerid']);
								},
								onLoadSuccess:function(){
									var value=$("#selectedUser").val();
									var valueids=$("#selectedUserid").val();
									var valueid=$("#selectedUserid").val().split(",");
									
									//alert(valueids);
									if(valueids!=null&&valueids!=""){
										for ( var i = 0; i < valueid.length; i++) {
											//alert(valueid[i]);
											var rows = $('#providergrid').datagrid('selectRecord',valueid[i]);
										}
										
									}
								},
						pagination : true,
						rownumbers : true

					});
	$(window).resize(function() {
		$("#providergrid").datagrid('resize');
	});
}
	function checkRadio(){
			var row = $('#providergrid').datagrid('getSelected');
			var rowNum = 0;
			var rows = $('#providergrid').datagrid('getRows');
			for ( var i = 0; i < rows.length; i++) {
				if (row == rows[i]) {
					rowNum = i;
					break;
				}
			}
			var radios = $("input[type=radio]");
			$(radios[rowNum]).attr("checked", true);
		}
//单条删除
function del(uid,row) {
	$('#providergrid').datagrid('clearSelections');
	$('#providergrid').datagrid('selectRow',row);
	if (window.confirm('是否删除？')) {
		$.post("providerinfo!deleteOnlyOne.action", {
			proid : uid
		}, function(del) {
			if (del == 'success') {
				alert("删除成功！");
				$("#providergrid").datagrid('reload');
			}else{
				alert("删除失败！");
			}
		});
	}
}
//删除功能~批量
function delAll() {
	var selected = $('#providergrid').datagrid('getSelections');

	if (selected != null && selected != "") {
		if (window.confirm("是否删除？")) {
			var selcheck = new Array();
			for ( var i = 0; i < selected.length; i++) {
				selcheck[i] = selected[i].providerid;
			}
			$.post(rootPath + "/material/providerinfo/providerinfo!betchDelete.action?proid="
					+ selcheck, function(del) {
				if (del == 'success') {
					alert("删除成功!");
					$("#providergrid").datagrid('reload');
				}else{
					alert("删除失败!");
					$("#providergrid").datagrid('reload');
				}
			});
		}
	} else {
		alert('请至少选择一条记录！');
		return;
	}
}


//详情
function detail(id) {
	var url = rootPath + "/material/providerinfo/providerinfo!view.action";
	if (id != "") {
		url = url + "?id=" + id;
	}
	var _dialog = window.top
			.$('<div id ="cert-dlg" style="padding:0px;"><iframe id="detailFrame" name="detailFrame" width="100%" height="100%" frameborder="0" scrolling="no" src=' + url + '></iframe></div>')
			.appendTo(window.top.document.body);
	_dialog.dialog( {
		title : '供应商详情',
		autoOpen : false,
		modal : true,
		closed : true,
		width : '350',
		height : '300'
	});
	_dialog.dialog('open');
}

//添加
function addWin(id){
	var url = rootPath + "/material/providerinfo/providerinfo!input.action";
	if (id != "") {
		url = url + "?id=" + id;
	}
	var _dialog = window.top
			.$('<div id ="cert-dlg" style="padding:0px;"><iframe id="providerinfoFrame" width="100%" height="100%" frameborder="0" scrolling="no" src=' + url + '></iframe></div>')
			.appendTo(window.top.document.body);
	_dialog.dialog({
		title:'供应商编辑',
		autoOpen:false,
		modal:true,
		closed:true,
		width : '350',
		height : '300',
		buttons:[{
			text:'保存',
			iconCls:'icon-save',
			handler:function(){
				$("#providerinfoFrame",top.document.body).contents().find("#certificateinfoform").form('submit',{
					url:rootPath +'/material/providerinfo/providerinfo!save.action',
					onSubmit:function(){
					var objs= $("#providerinfoFrame",top.document.body).contents().find(".grkj-validate");
					if(!saveCheck(objs)){						
							$("#providerinfoFrame",top.document.body).contents().find(":input").focus();
							alert("数据输入不符合格式，请查看红色边框的输入框的输入提示！");
							return false;
						}
					},
					success:function(data){
						
						if(data=='success'){
							_dialog.dialog('close');
							$("#providergrid").datagrid('reload');
							alert('成功');
						}else{
							alert('保存失败');
						}					
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


// 查询
function query() {
	var providername = $("#providername").val();// 物品名称
	$('#providergrid').datagrid( {
		queryParams : {
		providername : providername
		},
		pageNumber : 1
	// 查询后指定页码为1
	});
}
