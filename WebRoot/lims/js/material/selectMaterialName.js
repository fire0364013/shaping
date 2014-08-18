$(document).ready(function() {
	initDataGrid();
});

function initDataGrid() {
			$('#addmaterialdata').datagrid({
				nowrap : false,
				striped : true,
				collapsible : true,//	var url =  rootPath +'/material/materials!toList.action';
				singleSelect:true,
				url:rootPath +'/material/materials!addList.action', 
				remoteSort : false,
				singleSelect:true,
				fit : true,
				fitColumns : true,
				scrollbarSize : 0,
				frozenColumns:[[
				{	field : 'id',
					title : '&nbsp;',
					width : 30,
					align : 'center',
					formatter : function(value){
						return "<input type='radio' name='radio'/>";}
				}]],
				columns:[[
						{field:'materialname',title:'物品名称',width:250,align:"center"},
						{field:'model',title:'规格型号',width:250,align:"center"},
						{field:'remark',title:'备注',width:250,align:"center"},
						{field:'typename',title:'物品类型',width:250,align:"center"}
				]],
	onSelect:function(){
		var selected=$("#addmaterialdata").datagrid('getSelected');
		checkRadio();
		$("#materialnameSel").val(selected['materialname']);
		$("#materialidSel").val(selected['mid']);
		$("#batchnoSel").val(selected['model']);
	}
	});		
	$(window).resize(function() {
		$("#addmaterialdata").datagrid('resize');
	});
}

 
		//查询
function searchObj() {
	var materialname = $("#materialname").val();//物品名称
	var batchno= $("#batchno").val();//批号
	
	$('#materialinventorygrid').datagrid( {
		queryParams : {
		materialname : materialname,
		batchno:batchno
		}
	});
}
		
function checkRadio(){
	var row = $('#addmaterialdata').datagrid('getSelected');
	var rowNum = 0;
	var rows = $('#addmaterialdata').datagrid('getRows');
	for ( var i = 0; i < rows.length; i++) {
		if (row == rows[i]) {
			rowNum = i;
			break;
		}
	}
	var radios = $("input[type=radio]");
	$(radios[rowNum]).attr("checked", true);
}



//添加	物品名字的弹出窗
	function showName(){
			var url =  rootPath +'/material/materialpurchase!toListForMaterial.action';
			var _dialog =  window.top.$('<div id="materialDialog"  style="padding:0px;"><iframe id="materialFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
			_dialog.dialog({
				title:'物品选择',
				autoOpen:false,
				modal:true,
				closed:true,
				width:'750',
				height:'400',
				buttons:[{
					text:'确定',
					iconCls:'icon-save',
					handler:function(){
					var val=$("#materialFrame",top.document.body).contents().find("#materialnameSel").val();
					$("#materialname").val(val);
					var materialids=$("#materialFrame",top.document.body).contents().find("#materialidSel").val();
					$("#materialid").val(materialids);	
					var batchnoSel=$("#materialFrame",top.document.body).contents().find("#batchnoSel").val();
					$("#batchno").val(batchnoSel);	
					_dialog.dialog('close');	
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
	
