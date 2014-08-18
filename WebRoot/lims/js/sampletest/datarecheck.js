$(document).ready(function() {
	initDataGrid();
//	seldatagrid();
});

var itemid="";
// 页面加载，待检测项目列表
function initDataGrid() {
	$('#datagrid').datagrid(
		{
			nowrap : false,
			striped : true,
			collapsible : true,
			url : 'sampletestbybatch!dataRecheckList.action', 
			sortName : 'itemid',
			sortOrder : 'asc',
			remoteSort : false,						
			fit : true,
			fitColumns : true,
			scrollbarSize : 0,
			singleSelect:true,
			idField:'itemid',	
			columns : [ [
				{
					field : 'itemname',
					title : '项目名称',
					width : 300,
					align : 'center'
				}
			] ],
			onLoadSuccess:function(){
				//默认加载第一行的基本信息
				/*$('#datagrid').datagrid('selectRow',0);
				var rowData = $('#datagrid').datagrid('getSelected');
				if(rowData!=null){
					itemid=rowData.itemid;
					initBatchDataGrid(itemid);//给批信息页面传参
				}else{
					initBatchDataGrid('');//给批信息页面传参
				}*/
				initBatchDataGrid('','');
				seldatagrid('','','')
			},onClickRow:function(rowIndex, rowData){
				$('#datagrid').datagrid('selectRow',parseInt(rowIndex));
				var rowData = $('#datagrid').datagrid('getSelected');
				itemid=rowData.itemid;
				initBatchDataGrid(itemid,'');//给批信息页面传参	
				selectTab("批样品信息");
			}
		});
		$(window).resize(function() {
			$("#datagrid").datagrid('resize');
		});
		$("#renwu").resize(function(){
			$("#datagrid").datagrid('resize');
		});
}
function selectTab(title){
	$('#tt').tabs({
		onSelect: function(title){
			if(title == '数据复核'){
				var batchno="";
				var itemid="";
				var methodid="";
				var batchrows = $("#batchdatagrid").datagrid("getSelections");
				if(batchrows!=''){
					batchno=batchrows[0].batchno;
					itemid=batchrows[0].itemid;
					methodid=batchrows[0].methodid;
				}
			//	alert(batchno);
				if(batchno!=""){	
					var url = rootPath + "/sampletest/sampletestbybatch!toDataRecheck.action";
					url = url + "?itemid="+itemid+"&batchno="+batchno+"&methodid="+methodid;
//							if($('#batchdataenterFrame').attr('src')==undefined||$('#batchdataenterFrame').attr('src')==""){
								$("#batchdataenterFrame").attr("src",url);
//							}else{
				}else{
					alert("请选择一个批号！");
				}
				}
			}
	});
}

//样品信息
function seldatagrid(itemid,batchno,flag) {
	var flagUrl;
	if(flag=='flag'){ //此处是加载的时候不查询后台，但是要把头儿展示出来。2012-04-11
		flagUrl="";
	}else{
		flagUrl=rootPath+'/sampletest/sampletestbybatch!selDataRecheckList.action?itemid='+itemid+"&batchno="+batchno;
	}
//	if(batchno!=''){
		$('#seldatagrid').datagrid(
		{
			nowrap : false,
			striped : true,
			collapsible : true,
			url : flagUrl, 
			sortName : '',
			sortOrder : '',
			remoteSort : false,						
			fit : true,
			fitColumns : true,
			scrollbarSize : 0,
			singleSelect:true,
			idField:'itemid',	
			columns : [ [
				{
					field : 'samplecode',
					title : '样品编号',
					width : 150,
					align : 'center'
				},
				/*{
					field : 'samplename',
					title : '样品名称',
					width : 150,
					align : 'center'
				},*/
				{
					field : 'status',
					title : '状态',
					width : 80,
					align : 'center'
				},
				{
					field : 'qcsampletypename',
					title : '质控样类型',
					width : 100,
					align : 'center'
				},
				{
					field : 'batchno',
					title : '标样批号',
					width : 120,
					align : 'center'
				},
				{
					field : 'samplingstartdate',
					title : '采样日期',
					width : 120,
					align : 'center'
				},
				{
					field : 'monitorpointtype',
					title : '监测点类型',
					width : 120,
					align : 'center'
				},
				{
					field : 'monitorcode',
					title : '监测点编码',
					width : 100,
					align : 'center'
				}/*,
				{
					field : 'itemname',
					title : '监测点名称',
					width : 120,
					align : 'center'
				}*/
			] ],
			/*onLoadSuccess:function(){
				//默认加载第一行的基本信息
				$('#seldatagrid').datagrid('selectRow',0);
			},*/
			onRowContextMenu:function(e,row,rowData){
				$("#seldatagrid").datagrid("clearSelections");
				$('#seldatagrid').datagrid('selectRow',parseInt(row));
				$("#backListMenu").menu("show", {left: e.pageX,top: e.pageY});
				e.preventDefault();
			}
		});
		$(window).resize(function() {
			$("#seldatagrid").datagrid('resize');
		});
		$("#jiance").resize(function(){
			$("#seldatagrid").datagrid('resize');
		});
//	}
}
//审核记录
function showSampleitemrecordDialog(){
	var batchrows = $("#seldatagrid").datagrid("getSelections");
	var itemid=batchrows[0].itemid;
	var samplecode=batchrows[0].samplecode;
	
	if(samplecode!=""){
		var url = rootPath + "/sampletest/itemtestbackrecord!toSampleitemrecordList.action?samplecode="+samplecode+"&itemid="+itemid;
		var _dialog =  window.top.$('	<div id ="ds-dlg" style="padding:0px;"><iframe id="dataSourceFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
		_dialog.dialog({
			title:'审核记录',
			autoOpen:false,
			position:'center',
			modal:true,
			closed:true,
			width:'800',
			height:'500',
			onClose:function(){
				_dialog.dialog("destroy");
			}
		});
		_dialog.dialog('open');	
	}else{
		alert("请选择一个样品！");
	}
}
