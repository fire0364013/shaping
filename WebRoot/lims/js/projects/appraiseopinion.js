//评审意见列表对话框  
function openOpinionListDlg(entityid,workFlowName){
	$('#datagrid1').datagrid('clearSelections');
	var url =  rootPath +'/projects/appraiseopinion/appraiseopinion!list.action?entityid='+entityid+"&workFlowName="+workFlowName;
	var _dialog =  window.top.$('<div id ="dlg" style="padding:0px;"><iframe id="appraiseopinionFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
	_dialog.dialog({
	title:'审核记录',
	autoOpen:false,
	modal:true,
	closed:true,
	width:'650',
	height:'338',
	onClose:function(){
			_dialog.dialog("destroy");					
		}
	});
	_dialog.dialog('open');
}
////评审意见列表
//function opinionList(entityid,workFlowName){
//	$('#AppraiseopinionDatagrid').datagrid({
//		width:'650',
//		height:'500',
//		nowrap: false,
//		striped: true,
//		collapsible:true,
//		url:rootPath + '/projects/appraiseopinion/appraiseopinion!initOpinionList.action?entityid='+entityid+"&workFlowName="+workFlowName,
//		fit:true,
//		fitColumns:true,
//		scrollbarSize:0,
//		singleSelect:true,
//		idField:'entityid',
//		columns:[[
//			{field:'user',title:'审核人',width:100,align : 'center'},
//			{field:'nextstep',title:'审核状态',width:90,align : 'center'},
//			{field:'time',title:'审核时间',width:130,align : 'center'},					
//			{field:'opinion',title:'审核意见',width:350,align : 'center'}
//			
//		]],
//		pagination:true,
//		rownumbers:true,
//		pageSize:20,
//		pageList:[10,20,30,40]
//	});
//			
//	$(window).resize(function(){
//		$("#AppraiseopinionDatagrid").datagrid('resize');
//	})	;
//}

//评审意见列表
function opinionList(entityid,workFlowName,steptype){	
    $('#AppraiseopinionDatagrid').datagrid({
    	scrollbarSize:0,
    	rownumbers: true,
//    	animate:true,
    	collapsible:true,
    	fit:true,
		fitColumns : true,
    	url:rootPath + '/projects/appraiseopinion/appraiseopinion!initOpinionList.action?entityid='+entityid+"&workFlowName="+workFlowName+"&steptype="+steptype,
    	idField:'id',
    	treeField:'status',
    	columns:[[
    			
				{field:'user',title:'审核人',width:100,align:'center'},
				{field:'step',title:'审核状态',width:130,align:'center'},
				{field:'time',title:'审核时间',width:150,align:'center'},
				{field:'opinion',title:'审核意见',width:300,align:'center'}
		]],
		pagination:true,
		rownumbers:false,
		pageSize:20,
		pageList:[20,30,40,50]	
    });
	$(window).resize(function(){
		$("#AppraiseopinionDatagrid").datagrid('resize');
	});
}