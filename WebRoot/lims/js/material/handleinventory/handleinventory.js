//-----Au-----wjy~~

	$(document).ready(function() {
				initDataGrid();
			});

function initDataGrid() {
	$('#inventorygrid').datagrid(
					{
						nowrap : false,
						striped : true,
						collapsible : true,
						url:rootPath +'/material/handleinventory/handleinventory!inventoryList.action', 
						sortName : 'sta',
						sortOrder : 'asc',
						remoteSort : false,
					//	idField : 'inventoryid',
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
									field : 'materialname',
									title : '物品名称',
									width : 200,
									align : 'center'
								}, 
								{
									field : 'model',
									title : '规格型号',
									width : 150,
									align : "center"
								},
								{
									field : 'batchno',
									title : '批号',
									width : 150,
									align : "center"
								},
								{
									field : 'materialtype',
									title : '物品类型',
									width : 150,
									align : 'center'
								},	{
									field : 'remainingnum',
									title : '库存数量',
									width : 100,
									align : 'center'
								},{
									field : 'option',
									title : '操作',
									width : 100,
									align : 'center',
									formatter : function(value, rec) {
										var links = '<img src="'
												+ rootPath
												+ '/themes/default/images/xiangxiimage.png" id="btnshow" onclick="detail(\''
												+ rec.inventoryid
												+ '\')" alt="查看"/>&nbsp;&nbsp;';
										links += '<img src="'
												+ rootPath
												+ '/themes/default/images/remove.png" id="btnshow" onclick="handel(\''
												+ rec.inventoryid
												+ '\')"  alt="处理"/>&nbsp;&nbsp;';
										
										return links;
									}
								} ] ],
						pagination : true,
						rownumbers : true
						
				
					});		
	$(window).resize(function() {
		$("#inventorygrid").datagrid('resize');
	});
}

/**
 * 处理物品
 * @return
 */
function handel(uid){
	$('#inventorygrid').datagrid('clearSelections');
	$('#inventorygrid').datagrid('clearSelections');
	if (window.confirm('您确定处理该物品吗？')) {
		$.post("handleinventory!save.action", {
			id : uid
		}, function(del) {
			if (del == 'success') {
				alert("处理成功！");
				$("#inventorygrid").datagrid('reload');
			}else{
				alert("处理失败！");
			}
		});
	}
}




//批量处理
function handelAll() {
	var selected = $('#inventorygrid').datagrid('getSelections');

	if (selected != null && selected != "") {
		if (window.confirm("是否处理？")) {
			var selcheck = new Array();
			for ( var i = 0; i < selected.length; i++) {
				selcheck[i] = selected[i].inventoryid;
			}
			$.post("handleinventory!betchHandel.action?id="
					+ selcheck, function(del) {

				if (del == 'success') {
					alert("处理成功!");
					$("#inventorygrid").datagrid('reload');
				}else{
					alert("处理失败!");
				}
			});

		}
	} else {
		alert('请至少选择一条记录！');
		return;
	}

}



//查看详情
function detail(id) {
	$('#inventorygrid').datagrid('clearSelections');
	var url = rootPath + "/material/handleinventory/handleinventory!view.action";
	if (id != "") {
		url = url + "?id=" + id;
	}
	var _dialog = window.top
			.$('<div id ="cert-dlg" style="padding:0px;"><iframe id="detailFrame" name="detailFrame" width="100%" height="100%" frameborder="0" scrolling="no" src=' + url + '></iframe></div>')
			.appendTo(window.top.document.body);
	_dialog.dialog( {
		title : '库存详情',
		autoOpen : false,
		modal : true,
		closed : true,
		width : '630',
		height : '300'
	});
	_dialog.dialog('open');
}


//查询
function query() {
	var materialname = $("#materialname").val();//物品名称
	var materialtype = $("#materialtype").val();//物品类型
	var batchno= $("#batchno").val();//批号
	var sta= $("#sta").val();//批号
	
	$('#inventorygrid').datagrid( {
		queryParams : {
		materialname : materialname,
		materialtype:materialtype,
		batchno:batchno,
		sta:sta
		},
		pageNumber : 1  //查询后指定页码为1
	});
}


