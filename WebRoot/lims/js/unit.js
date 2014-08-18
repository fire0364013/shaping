//蔡璐2012.7.12
$(document).ready(function(){
	initDataGrid();
});

function relaod(){//重新装载数据
	$('#datagrid').datagrid('reload');
}

function initDataGrid(){
			$('#datagrid').datagrid({
				width:800,
				height:400,
				nowrap: false,
				striped: true,
				collapsible:true,
				url:'unit!unitList.action',
				sortName: 'roleid',
				sortOrder: 'asc',
				scrollbarSize:0,
				fit:true,
				fitColumns:true,
				idField:'id',
				columns:[[
					{field:'id',checkbox:true,align : 'center'},
			  //      {field:'unitid',title:'计量单位编号',width:120,align : 'center'},					
					{field:'unitname',title:'计量单位名称',width:222,align : 'center'},
					{field:'descript',title:'计量单位描述',width:500,align : 'center'},
					{field:'operate',title:'操作',width:80,align : 'center',
						formatter:function(value,rowData,rowIndex){
							return '<span style="color:red"><img src="'+rootPath+'/themes/default/images/xiangxiimage.png"   alt="详细"   onclick="viewUnit('+rowData.unitid+')"/>&nbsp;&nbsp; ' +
							'<img src="'+rootPath+'/themes/default/images/bianjiimage.png"   alt="编辑"   onclick="editUnit('+rowData.unitid+')"/> &nbsp;&nbsp;' +
							'<img src="'+rootPath+'/themes/default/images/deleteimage.png"   alt="删除"    onclick="deleteUnit(\''+rowData.unitid+ '\','+rowIndex+')"/></span>';
						}
					}					
				]],
				pagination:true,
				rownumbers:true,
				pageSize:20,
				pageList:[20,30,40]
				
			});
		$(window).resize(function(){
			$("#datagrid").datagrid('resize');
		})	;
}

//检索
function searchObj(){
	$('#datagrid').datagrid('clearSelections');
	//计量单位名称
	var unitname = $('#unitName').val();
	$('#datagrid').datagrid( {
		queryParams : {
			unitName : unitname
		},
		pageNumber:1
	});

}

//打开详细页面
function viewUnit(id){
	$('#datagrid').datagrid('clearSelections');
	var url = rootPath + "/unit/unit!view.action";
	if(id!=""){
		url = url + "?id="+id;
	}

	var _dialog =  window.top.$('	<div id ="unit-dlg" style="padding:0px;"><iframe id="unitFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
	_dialog.dialog({
	title:'计量单位详情',
	autoOpen:false,
	modal:true,
	closed:true,
	width:'360',
	height:'260',
	onClose:function(){
			_dialog.dialog("destroy");					
		}
	});
	_dialog.dialog('open');

}
//添加和修改
function editUnit(id)
{$('#datagrid').datagrid('clearSelections');
	var url = rootPath + "/unit/unit!input.action";
	if(id!=""){
		url = url + "?id="+id;
	}
	var _dialog =  window.top.$('	<div id ="unit-dlg" style="padding:0px;"><iframe id="unitFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);

	_dialog.dialog({
	title:'计量单位编辑',
	autoOpen:false,
	modal:true,
	closed:true,
	width:'345',
	height:'260',
	buttons:[{
		text:'保存',
		iconCls:'icon-save',
		handler:function(){
			$("#unitFrame",top.document.body).contents().find("#unitForm").form('submit',
				{
					url:rootPath + '/unit/unit!save.action',
					onSubmit:function(){
						
						var objs = $("#unitFrame",top.document.body).contents().find(".grkj-validate");
						
						if(!saveCheck(objs)){
							$("#unitFrame",top.document.body).contents().find(":input").focus();
							alert("数据输入不符合格式，请查看红色边框的输入框的输入提示！");
							return false;
						}																			
					},
					success:function(data){
						if(data=='success'){
							alert("保存成功！");
							_dialog.dialog('close');
							relaod();
						}else{
							alert("保存失败！");
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
//批量删除
function deleteUnits()
{
	var rows = $('#datagrid').datagrid('getSelections');
	if (rows!=null && rows!="") {
 		if(window.confirm('是否删除？'))
 		{
//			var arr = new Array();
 			var arr = [];
			for(var i=0;i<rows.length;i++){
				if(arr!=""){
					arr = arr + ",";
				}
				arr = arr + rows[i].id;
				//arr.push(rows[i].id);			
			}
//			alert(arr);
//			var jsonStr={unitid:arr};
//			var jsonObj=$.toJSON(jsonStr);
			$.post(
				rootPath + "/unit/unit!deleteUnit.action",
				{"json":arr},
				function(msg){
						if(msg=='success'){
							$('#datagrid').datagrid('clearSelections');
							alert("删除成功！");
							relaod();
						}else{
							alert("删除失败！");
						}
					}
				);
		}
	} else {
		alert('请至少选择一条记录！');
		return;
	}
 }

//单个删除
function deleteUnit(id,rowIndex){
	$('#datagrid').datagrid('clearSelections');
	$('#datagrid').datagrid('selectRow',rowIndex);
 	if(window.confirm('是否删除？'))
 	{
// 		var jsonStr={unitid:"'"+id+"'"};
//		var jsonObj=$.toJSON(jsonStr);
		$.post(
			rootPath + "/unit/unit!deleteUnit.action",
			{"json":id},
			function(msg){
				if(msg=='success'){
					$('#datagrid').datagrid('clearSelections');//清除选中记录，否则第二次删除时，此记录同样存在
					alert("删除成功！");
					relaod();
				}else{
					alert("删除失败！");
				}
			}
		);
	}
}
//function deleteUnit(id){
// 	if(window.confirm('是否删除？'))
// 	{
//// 		var jsonStr={unitid:"'"+id+"'"};
////		var jsonObj=$.toJSON(jsonStr);
//		$.ajax({
//			url:rootPath + "/unit/unit!deleteUnit.action",
//			data:"id="+id,
//			success:function(data){
//				if(msg=='success'){
//					alert("删除成功！");
//					relaod();
//				}else{
//					alert("删除失败！");
//				}
//			}
//		});
//	}
//	
//}