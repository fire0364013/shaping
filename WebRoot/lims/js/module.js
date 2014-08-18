//蔡璐2012.7.12
//var width;
//var height;
$(document).ready(function(){
//	width = document.body.clientWidth;
//	height = document.body.clientHeight;
	initDataGrid();
});

function relaod(){//重新装载数据
	$('#datagrid').datagrid('reload');
}

function initDataGrid(){
	//alert("wodth:"+width+";height:"+height);
			$('#datagrid').datagrid({
			//	width:800,
			//	height:400,
				nowrap: false,
				striped: true,
				collapsible:true,
				scrollbarSize:0,
				url:'module!moduleList.action',
				fit:true,
				fitColumns:true,
				idField:'id',
				columns:[[
					{field:'id',checkbox:true,align : 'center'},
			        {field:'moduleid',title:'模块编号',width:120,align : 'center'},					
					{field:'modulename',title:'模块名称',width:442,align : 'center'},
					{field:'moduletype',title:'模块类型',width:300,align : 'center',
						formatter:function(value,rowData,rowIndex){
							if(rowData.moduletype==1){
								return "系统模块";
							}else{
								return "用户模块";
							}
						}	
					},
					{field:'operate',title:'操作',width:120,align : 'center',
						formatter:function(value,rowData,rowIndex){
							return '<span style="color:red"><img src="'+rootPath+'/themes/default/images/xiangxiimage.png" onclick="viewModule(\''+rowData.id+'\')"/>&nbsp;&nbsp; ' +
							'<img src="'+rootPath+'/themes/default/images/bianjiimage.png" onclick="editModule(\''+rowData.id+'\','+rowData.moduletype+')"/>&nbsp;&nbsp; '+
							'<img src="'+rootPath+'/themes/default/images/deleteimage.png" onclick="deleteModule(\''+rowData.id+'\','+rowData.moduletype+','+rowIndex+')"/></span>';
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
	var name = $('#modulename').val();	//模块名称
	var type = $('#moduletype').val();  //模块类型
	$('#datagrid').datagrid( {
		queryParams : {
			modulename : name,
			moduletype : type
		},
		pageNumber:1             //查询后指定页码为1
	});

}

//打开详细页面
function viewModule(id){
	$('#datagrid').datagrid('clearSelections');
	var url = rootPath + "/module/module!view.action";
	if(id!=""){
		url = url + "?id="+id;
	}
	var _dialog =  window.top.$('	<div id ="role-dlg" style="padding:0px;"><iframe id="roleFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
	_dialog.dialog({
	title:'模块详情',
	autoOpen:false,
	modal:true,
	closed:true,
	width:'370',
	height:'280',
	onClose:function(){
			_dialog.dialog("destroy");					
		}
	});
	_dialog.dialog('open');

}


//添加和修改
function editModule(id,type)
{
	$('#datagrid').datagrid('clearSelections');
	$('#datagrid').datagrid('selectRecord',id);
	if(type==1){
		alert("系统模块不能修改！");
	}else{
		var url = rootPath + "/module/module!input.action";
		var saveUrl = rootPath + '/module/module!save.action';
		if(id!=""){
			url = url + "?id="+id;		//模块的ID
			saveUrl = saveUrl +"?operate=update";  //添加或修改的操作路径
		}
		
	
		var _dialog =  window.top.$('	<div id ="module-dlg" style="padding:0px;"><iframe id="moduleFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
		_dialog.dialog({
		title:'模块编辑',
		autoOpen:false,
		modal:true,
		closed:true,
		width:'370',
		height:'280',
		buttons:[{
			text:'保存',
			iconCls:'icon-save',
			handler:function(){
				//alert("模块添加");
				$("#moduleFrame",top.document.body).contents().find("#moduleForm").form('submit',
					{
						url:saveUrl,
						async:false,
						onSubmit:function(){
							var objs = $("#moduleFrame",top.document.body).contents().find(".grkj-validate");
							
							if(!saveCheck(objs)){
								$("#moduleFrame",top.document.body).contents().find(":input").focus();
								alert("数据输入不符合格式，请查看红色边框的输入框的输入提示！");
								return false;
							}
						},
						success:function(data, textStatus){
							if(data=='success'){
								alert("保存成功！");
								relaod();
							}else{
								alert("模块ID已经存在，请重新填写！")
							}
							
							_dialog.dialog('close');						
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

	
}


function deleteModule(id,type,rowIndex){
	$('#datagrid').datagrid('clearSelections');
	$('#datagrid').datagrid('selectRow',rowIndex);
	if(type==1){
		alert("系统模块不能删除！");
	}else{
	 	if(window.confirm('是否删除？'))
	 	{
			$.post(
				rootPath + "/module/module!deleteModule.action",
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
}