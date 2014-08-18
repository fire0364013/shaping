var typeid = '';
function relaod(){//重新装载数据
	$('#datagrid').datagrid('reload');
}

function initDataGrid(id){
	typeid = id;
			$('#datagrid').datagrid({
				nowrap: false,
				striped: true,
				collapsible:true,
				url:'file!fileList.action?id='+id,
				fit:true,
				fitColumns:true,
				scrollbarSize:0,
				columns:[[
					{field:'id',checkbox:true,align : 'center'},
			        {field:'filename',title:'文件名称',width:250,align : 'center'},					
					{field:'filenum',title:'文件号',width:150,align : 'center'},
					{field:'filetype',title:'文件类型',width:120,align : 'center'},
				//	{field:'person',title:'登记人',width:260,align : 'center'},
					{field:'operate',title:'操作',width:110,align : 'center',
						formatter:function(value,rowData,rowIndex){
							return '<img src="'+rootPath+'/themes/default/images/xiangxiimage.png" alt="详情" onclick="view('+rowData.id+')"/>&nbsp;&nbsp;' +
							'<img class="img1" src="'+rootPath+'/themes/default/images/bianjiimage.png" alt="修改" onclick="edit('+rowData.id+')"/>&nbsp;&nbsp;' +
							'<img class="img1" src="'+rootPath+'/themes/default/images/deleteimage.png" alt="删除" onclick="deleteFile('+rowData.id+','+rowIndex+')"/>&nbsp;&nbsp;' + 
							'<img src="'+rootPath+'/themes/default/images/historyimage.png" alt="历史版本" onclick="viewHistory('+rowData.id+')"/>';
						}
					}					
				]],
				pagination:true,
				rownumbers:true,
				pageSize:20,
				pageList:[20,30,40,50],
				onLoadSuccess:function(data){
					if($("#info").val()=="query"){
						setTimeout("hiddenColumn(\"datagrid\",\"id\")",10);
						$(".img1").hide();
						//$(":input[type='checkbox']").parent().parent().remove();
						$("#gridiv").attr("style","width: 100%; height: 655px;");
//						$("#datagrid").datagrid('resize');
					}
				}
				
			});
			
		$("#gridiv").resize(function(){
			$("#datagrid").datagrid('resize');
		})	;
}
//隐藏列
function hiddenColumn(tableID,colList){
    var ColArray = colList.split(",");
    var tTable = $('#'+tableID);
    if(ColArray!=null&&ColArray!=""){
    	for(var i=0;i<ColArray.length;i++){
    		tTable.datagrid('hideColumn',ColArray[i]);
    	}
    }
}
//检索
function searchObj(){
	var filenum = $('#filenum').val();
	var filename = $('#filename').val();
	$('#datagrid').datagrid( {
		queryParams : {
			filenum : filenum,
			filename : filename
		},
		pageNumber:1
	});

}

//打开详细页面
function view(id){
	$('#datagrid').datagrid('clearSelections');
	$('#datagrid').datagrid('selectRecord',id);
	var url = rootPath + "/file/file!view.action";
	if(id!=""){
		url = url + "?id="+id;
	}
	var _dialog =  window.top.$('	<div id ="dlg" style="padding:0px;"><iframe id="frame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
	_dialog.dialog({
	title:'文件详情',
	autoOpen:false,
	modal:true,
	closed:true,
	width:'560',
	height:'280',
	onClose:function(){
			_dialog.dialog("destroy");					
		}
	});
	_dialog.dialog('open');

}
//添加和修改
function edit(id)
{
	$('#datagrid').datagrid('clearSelections');
	$('#datagrid').datagrid('selectRecord',id);
	var url = rootPath + "/file/file!input.action?json="+typeid;
	var number = '320';
	if(id!=""){
		url = url + "&id="+id;
		number = '180';
	}
	var _dialog =  window.top.$('	<div id ="dlg" style="padding:0px;"><iframe id="frame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
	_dialog.dialog({
	title:'文件编辑',
	autoOpen:false,
	modal:true,
	closed:true,
	width:'400',
	height:number,
	buttons:[{
		text:'保存',
		iconCls:'icon-save',
		handler:function(){
			
			$("#frame",top.document.body).contents().find("#form").form('submit',
				{
					url:rootPath + '/file/file!save.action',
					onSubmit:function(){
						var objs = $("#frame",top.document.body).contents().find(".grkj-validate");
						
						if(!saveCheck(objs)){
							$("#frame",top.document.body).contents().find(":input").focus();
							alert("数据输入不符合格式，请查看红色边框的输入框的输入提示！");
							return false;
						}																			
					},
					success:function(data){
						if(data=='success'){
							_dialog.dialog('close');
							alert("保存成功！");
							relaod();
						}else{
							alert("保存失败！");
						}
					},
					error:function(){
						alert("保存失败！");
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
function deleteFiles()
{
	var rows = $('#datagrid').datagrid('getSelections');
	if (rows!=null && rows!="") {
 		if(window.confirm('是否删除？'))
 		{
 			var arr = [];
			for(var i=0;i<rows.length;i++){
				if(arr!=""){
					arr = arr + ",";
				}
				arr = arr + rows[i].id;
			}
			$.post(
				rootPath + "/file/file!delete.action",
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
function deleteFile(id,rowIndex){
	$('#datagrid').datagrid('clearSelections');
	$('#datagrid').datagrid('selectRow',rowIndex);
 	if(window.confirm('是否删除？'))
 	{
		$.post(
			rootPath + "/file/file!delete.action",
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
////文件名称转义
//function URLencode(sStr) 
//{
//    return encodeURI(sStr).replace(/\+/g, '%2B').replace(/\"/g,'%22').replace(/\'/g, '%27').replace(/\//g,'%2F');
//}
////文件下载
//function download(filename){
//	var name=URLencode(filename.toString());
//	$.ajax({
//		type: "POST",
//		url: rootPath +"/file/file!downLoad.action",
//		data: "path="+name+"&flg=0",
//		processData :false,
//		success:function(data){
//			if(data=="fail"){
//				alert("下载失败,该文件不存在！");
//			}else{
//				var urlParmDown=rootPath +"/file/file!downLoad.action?path="+encodeURI(name)+"&flg=1";
//				$("#form").attr("action",urlParmDown);
//				$("#form").submit();
//			}
//		}
//	});
//}

//历史版本
function viewHistory(id) {
	$('#datagrid').datagrid('clearSelections');
	$('#datagrid').datagrid('selectRecord',id);
	var viewHeight = "";
	if($('#info').val()=="query"){
		viewHeight = "435";
	}else{
		viewHeight = "462";
	}
	var url = rootPath + "/file/file!version.action?info="+$("#info").val();
	if (id != "") {
		url = url + "&id=" + id;
	}

	var _dialog = window.top
			.$(
					'	<div id ="dlg" style="padding:0px;"><iframe id="frame" width="100%" height="100%" frameborder="0" scrolling="no" src=' + url + '></iframe></div>')
			.appendTo(window.top.document.body);

	_dialog.dialog( {
		title : '历史版本',
		autoOpen : false,
		modal : true,
		closed : true,
		width : '800',
		height : viewHeight,
		onClose : function() {
			_dialog.dialog("destroy");
		//		$("#datagrid").datagrid('reload');
		}
	});
	_dialog.dialog('open');

}