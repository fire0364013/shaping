
	
	
$(document).ready(function() { 
	
	var flagName=$("#reportitemname").val(); 
	var flagEncodeName="";  
	if(flagName==""){//当没有选择项目就选择物质的时候，
		//alert("请先选择项目");
		//return false;
	}else{
		flagEncodeName=encodeURI(encodeURI(flagName));
	}
	initDataGrid(flagEncodeName);
});

function initDataGrid() {
	$('#materialinventorygrid').datagrid(
	{
		nowrap : false,
		striped : true,
		collapsible : true,
		singleSelect:true,
		url:rootPath +"/material/standardinventory/standardinventory!inventoryList.action?flag=nopage&flagItemname="+flagEncodeName,
		sortName : 'materialname',
		sortOrder : 'asc',
		remoteSort : false,
		singleSelect:true,
		fit : true,
		fitColumns : true,
		scrollbarSize : 0,
		frozenColumns:[[
		{	field : 'inventoryid',
			title : '&nbsp;',
			width : 30,
			align : 'center',
			formatter : function(value){
				return "<input type='radio' name='radio'/>";}
		}]],
		columns : [ [
				{
					field : 'materialname',
					title : '标准物质名称',
					width : 120,
					align : 'center'
				},
				{
					field : 'batchno',
					title : '批号',
					width : 50,
					align : "center"
				},
				{
					field : 'consistence',
					title : '浓度',
					width : 50,
					align : 'center'
				},
				{
					field : 'dilutionmultiple',
					title : '稀释倍数',
					width : 50,
					align : 'center'
				},
				{
					field : 'uncertainty',
					title : '不确定度',
					width : 50,
					align : 'center'
				}] ],
		rowStyler:function(rowIndex,rowData){
		if(rowData.remainingnum!='0'){
			if(rowData.sta=='1已过期'){
				return 'color:red';
			}							
		 }
		},
	onSelect:function(){
		var selected=$("#materialinventorygrid").datagrid('getSelected');
		checkRadio();
		$("#materialnameSel").val(selected['materialname']);
		$("#inventoryidSel").val(selected['inventoryid']);
		$("#batchnoSel").val(selected['batchno']);
		$("#consistenceSel").val(selected['consistence']);    
		$("#uncertaintySel").val(selected['uncertainty']);
	},/*,
	onLoadSuccess:function(){
		var value=$("#selectedUser").val();
		var valueids=$("#selectedUserid").val();
		var valueid=$("#selectedUserid").val().split(",");
		
		alert(valueids);					if(valueids!=null&&valueids!=""){
			for ( var i = 0; i < valueid.length; i++) {
				alert(valueid[i]);							var rows = $('#datagrid1').datagrid('selectRecord',valueid[i]);
			}
			
		}
	}*/
		pagination:true,
		rownumbers:false,
		pageSize:10,
		pageList:[10,20,30,40,50]
	});		
	$(window).resize(function() {
		$("#materialinventorygrid").datagrid('resize');
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
	var row = $('#materialinventorygrid').datagrid('getSelected');
	var rowNum = 0;
	var rows = $('#materialinventorygrid').datagrid('getRows');
	for ( var i = 0; i < rows.length; i++) {
		if (row == rows[i]) {
			rowNum = i;
			break;
		}
	}
	var radios = $("input[type=radio]");
	$(radios[rowNum]).attr("checked", true);
}


//标准样品的弹出窗口使用selectedUserid
function showName(){
	var name=$("#reportitemname").val(); 
	var encodeName="";  
	if(name==""){//当没有选择项目就选择物质的时候，
		//alert("请先选择项目");
		//return false;
	}else{
		encodeName=encodeURI(encodeURI(name));
	}
	var url =  rootPath +"/sampletest/sampletestbybatch!toShowName2.action?flagItemname="+encodeName;
	var _dialog =  window.top.$('<div id ="cert-dlg" style="padding:0px;"><iframe id="ItemFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
	_dialog.dialog({
		title:'标准物质选择',
		autoOpen:false,
		modal:true,
		closed:true,
		width:'900',
		height:'550',
		buttons:[{
			text:'确定',
			iconCls:'icon-save',
			handler:function(){
				var val=$("#ItemFrame",top.document.body).contents().find("#materialnameSel").val();
				$("#materialname").val(val);
				var userids=$("#ItemFrame",top.document.body).contents().find("#inventoryidSel").val();
				$("#inventoryid").val(userids);	
				var batchnoSel=$("#ItemFrame",top.document.body).contents().find("#batchnoSel").val();
				$("#batchno").val(batchnoSel);	
				//$("#consistenceSel").val(selected['consistence']);    
				//$("#uncertaintySel").val(selected['uncertainty']);
				var consistenceSel=$("#ItemFrame",top.document.body).contents().find("#consistenceSel").val();
				$("#consistence").val(consistenceSel);	
				var uncertaintySel=$("#ItemFrame",top.document.body).contents().find("#uncertaintySel").val();
				$("#uncertainty").val(uncertaintySel);	
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


