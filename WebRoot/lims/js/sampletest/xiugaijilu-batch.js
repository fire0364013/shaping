$(document).ready(function() {
	initSampleItemDatagrid();
});

// 页面加载，检测项目样品列表
function initSampleItemDatagrid() {
	$('#sampleItemDatagrid').datagrid(
		{
			nowrap : false,
			striped : true,
			collapsible : true,
			url : rootPath+'/sampletest/sampletestbybatch!updateRecordList.action?samplecode='+samplecode+'&itemid='+itemid+'&batchno='+batchno, 
			sortName : 'sampleitemtestid',
			sortOrder : 'asc',
			remoteSort : false,						
			fit : true,
			fitColumns : true,
			scrollbarSize : 0,
			singleSelect:true,
			idField:'sampleitemtestid',	
			columns : [ [
					{
						field : 'samplecode',
						title : '样品编号',
						width : 160,
						align : 'center'
					},
					{
						field : 'samplename',
						title : '样品名称',
						width : 100,
						align : 'center'
					},
					{
						field : 'qcsampletypename',
						title : '质控类型',
						width : 100,
						align : 'center'
					},
					{
						field : 'batchno',
						title : '标样批号',
						width : 100,
						align : 'center'
					}
			] ],
			onLoadSuccess:function(){
				//默认加载第一行的基本信息
				$('#sampleItemDatagrid').datagrid('selectRow',0);
				var rowData = $('#sampleItemDatagrid').datagrid('getSelected');
				if(rowData!=null){
//					sampleitemtestid=rowData.sampleitemtestid;
					initParameterDatagrid(rowData.sampleitemtestid);//给参数信息传参
				}else{
					initParameterDatagrid('');//给参数信息传参
				}
			},onClickRow:function(rowIndex, rowData){
				$('#sampleItemDatagrid').datagrid('selectRow',parseInt(rowIndex));
				var rowData = $('#sampleItemDatagrid').datagrid('getSelected');
//				sampleitemtestid=rowData.sampleitemtestid;
				initParameterDatagrid(rowData.sampleitemtestid);//给参数信息传参	
			}
		});
		$(window).resize(function() {
			$("#sampleItemDatagrid").datagrid('resize');
		});
//		$("#renwu").resize(function(){
//			$("#sampleItemDatagrid").datagrid('resize');
//		});
}

//参数列表
function initParameterDatagrid(sampleitemtestid) {
	$('#parameterDatagrid').datagrid(
		{
			nowrap : false,
			striped : true,
			collapsible : true,
			url : rootPath+'/sampletest/sampletestresult!sampletestresultList.action?sampleitemtestid='+sampleitemtestid, 
			sortName : 'testresultid',
			sortOrder : 'asc',
			remoteSort : false,						
			fit : true,
			fitColumns : true,
			scrollbarSize : 0,
			singleSelect:true,
			idField:'testresultid',	
			columns : [ [
				{
					field : 'paramname',
					title : '参数名称',
					width : 220,
					align : 'center'
				},
				{
					field : 'unitname',
					title : '计量单位',
					width : 120,
					align : 'center'
				},
				{
					field : 'analyseresult',
					title : '参数值',
					width : 120,
					align : 'center'
				}
			] ],
			onLoadSuccess:function(){
				//默认加载第一行的基本信息
				$('#parameterDatagrid').datagrid('selectRow',0);
				var rowData = $('#parameterDatagrid').datagrid('getSelected');
				if(rowData!=null){
					initUpdateRecordDatagrid(rowData.testresultid);//给参数信息传参
				}else{
					initUpdateRecordDatagrid('');//给参数信息传参
				}
			},onClickRow:function(rowIndex, rowData){
				$('#parameterDatagrid').datagrid('selectRow',parseInt(rowIndex));
				var rowData = $('#parameterDatagrid').datagrid('getSelected');
				initUpdateRecordDatagrid(rowData.testresultid);//给参数信息传参	
			}
			});
			$(window).resize(function() {
				$("#parameterDatagrid").datagrid('resize');
			});
//			$("#unsel").resize(function(){
//				$("#parameterDatagrid").datagrid('resize');
//			});
}

//修改记录
function initUpdateRecordDatagrid(testresultid) {
	if(testresultid!=''){
		testresultid = testresultid.split("#");
	}
	//alert(testresultid);
	$('#updateRecordDatagrid').datagrid(
		{
			nowrap : false,
			striped : true,
			collapsible : true,
			url : rootPath+'/sampletest/sampletestresultupdate!sampletestresultupdateList.action?testresultid='+encodeURI(testresultid), 
			sortName : 'sampletestresultupdateid',
			sortOrder : 'asc',
			remoteSort : false,						
			fit : true,
			fitColumns : true,
			scrollbarSize : 0,
			singleSelect:true,
			idField:'sampletestresultupdateid',	
			columns : [ [
				{
					field : 'updatebeforevalue',
					title : '修改前值',
					width : 120,
					align : 'center'
				},
				{
					field : 'updateaftervalue',
					title : '修改后值',
					width : 120,
					align : 'center'
				},
				{
					field : 'updateperson',
					title : '修改人',
					width : 120,
					align : 'center'
				},
				{
					field : 'updatedate',
					title : '修改日期',
					width : 120,
					align : 'center'
				},
				{
					field : 'updatecause',
					title : '修改原因',
					width : 120,
					align : 'center'
				}
			] ]
			});
			$(window).resize(function() {
				$("#updateRecordDatagrid").datagrid('resize');
			});
//			$("#unsel").resize(function(){
//				$("#updateRecordDatagrid").datagrid('resize');
//			});
}
