//蔡璐2012.7.12
$(document).ready(function(){
	initDataGrid();
});

function relaod(){//重新装载数据
	$('#datagrid').datagrid('reload');
}

function initDataGrid(){
			$('#datagrid').datagrid({
			//	width:document.body.clientWidth,
			//	height:document.body.clientHeight,
				nowrap: false,
				striped: true,
				collapsible:true,
				url:'role!roleList.action',
				sortName: 'roleid',
				sortOrder: 'asc',
				fit:true,
				fitColumns:true,
				scrollbarSize:0,
				idField:'id',
				columns:[[
					{field:'id',checkbox:true,align : 'center'},
			        {field:'roleid',title:'角色编号',width:120,align : 'center'},					
					{field:'rolename',title:'角色名称',width:281,align : 'center'},
					{field:'updateuser',title:'最后更新用户',width:180,align : 'center'},
					{field:'updatetime',title:'最后更新时间',width:260,align : 'center'},
					{field:'operate',title:'操作',width:120,align : 'center',
						formatter:function(value,rowData,rowIndex){
							return '<span style="color:red"><img src="'+rootPath+'/themes/default/images/xiangxiimage.png"  alt="详细"   onclick="viewRole(\''+rowData.roleid+'\')"/>&nbsp;&nbsp; ' +
							'<img src="'+rootPath+'/themes/default/images/bianjiimage.png"  alt="编辑"   onclick="editRole(\''+rowData.roleid+'\')"/> &nbsp;&nbsp;' +
							'<img src="'+rootPath+'/themes/default/images/deleteimage.png" alt="删除"   onclick="deleteRole(\''+rowData.id+'\','+rowIndex+')"/></span>';
						}
					}					
				]],
				pagination:true,
				rownumbers:true,
				pageSize:20,
				pageList:[20,30,40,50]
			});
			
		$(window).resize(function(){
			$("#datagrid").datagrid('resize');
		})	;
}

//检索
function searchObj(){
	//会议室名称
	var rolename = $('#rolename').val();
	$('#datagrid').datagrid( {
		queryParams : {
			rolename : rolename
		},
		pageNumber:1
	});

}

//打开详细页面
function viewRole(id){
	$('#datagrid').datagrid('clearSelections');
	$('#datagrid').datagrid('selectRecord',id);
	var url = rootPath + "/role/role!view.action";
	if(id!=""){
		url = url + "?id="+id;
	}
	//$(window.top.document).find("#btnProjectInfo").click();
	var _dialog =  window.top.$('	<div id ="role-dlg" style="padding:0px;"><iframe id="roleFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
	//window.top.document.body.appendChild(win);
	_dialog.dialog({
	title:'角色详情',
	autoOpen:false,
	modal:true,
	closed:true,
	width:'360',
	height:'240',
	onClose:function(){
			_dialog.dialog("destroy");					
		}
	});
	_dialog.dialog('open');

}
//添加和修改
function editRole(id)
{
	$('#datagrid').datagrid('clearSelections');
	$('#datagrid').datagrid('selectRecord',id);
	var url = rootPath + "/role/role!input.action";
	if(id!=""){
		url = url + "?id="+id;
	}
	//$(window.top.document).find("#btnProjectInfo").click();
	var _dialog =  window.top.$('	<div id ="role-dlg" style="padding:0px;"><iframe id="roleFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
	//window.top.document.body.appendChild(win);
	_dialog.dialog({
	title:'角色编辑',
	autoOpen:false,
	modal:true,
	closed:true,
	width:'345',
	height:'150',
	buttons:[{
		text:'保存',
		iconCls:'icon-save',
		handler:function(){
		
			$("#roleFrame",top.document.body).contents().find("#roleForm").form('submit',
				{
					url:rootPath + '/role/role!save.action',
					onSubmit:function(){
						
						var objs = $("#roleFrame",top.document.body).contents().find(".grkj-validate");
						
						if(!saveCheck(objs)){
							$("#roleFrame",top.document.body).contents().find(":input").focus();
							alert("数据输入不符合格式，请查看红色边框的输入框的输入提示！");
							return false;
						}																			
					},
					success:function(data){
						_dialog.dialog('close');
						alert("保存成功！");
						relaod();
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
function deleteRoles()
{
	var rows = $('#datagrid').datagrid('getSelections');
	if (rows!=null && rows!="") {
 		if(window.confirm('是否删除？'))
 		{
			var arr = new Array();
			for(var i=0;i<rows.length;i++){
				arr.push(rows[i].id);			
			}
			var jsonStr={roleid:arr};
			var jsonObj=$.toJSON(jsonStr);
			$.post(
				rootPath + "/role/role!deleteRole.action",
				{json:jsonObj},
				function(msg){
						if(msg=='success'){
							$('#datagrid').datagrid('clearSelections');
							alert("删除成功！");
							relaod();
						}
					}
				);
		}
	} else {
		// 清除所选的行
		//$('#dataTable').datagrid('clearSelections');
		alert('请至少选择一条记录！');
		return;
	}
 }

//单个删除
function deleteRole(id,rowIndex){
	$('#datagrid').datagrid('clearSelections');
	$('#datagrid').datagrid('selectRow',rowIndex);
 	if(window.confirm('是否删除？'))
 	{
 		var jsonStr={roleid:"'"+id+"'"};
		var jsonObj=$.toJSON(jsonStr);
		$.post(
			rootPath + "/role/role!deleteRole.action",
			{json:jsonObj},
			function(msg){
				if(msg=='success'){
					$('#datagrid').datagrid('clearSelections');
					alert("删除成功！");
					relaod();
				}
			}
		);
	}
	
}