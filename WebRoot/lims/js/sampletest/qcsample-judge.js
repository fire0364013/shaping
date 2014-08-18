//原始记录单左侧任务列表
function taskList(){
	$("#qcsampledatagrid").datagrid({
		url:path + "/sampletest/batch/qcsample!qctypeList.action?batchno="+batchno,
		scrollbarSize:0,
		singleSelect:true,
		fit:true,
		fitColumns:true,
		nowrap: false,
		striped: true,
		collapsible:true,
		rownumbers:false,
		idField:'qctypeid',	
//		frozenColumns:[[
//		 {
//			 field : 'qctypeid',
//			 title : '&nbsp;',
//			 width : 30,
//			 align : 'center'
////			 formatter : function(value){
////				return "<input type='radio' name='radio'/>";
////			 }
//		 }
//		]],
		columns:[[
//			{field:'qctypeid',title:'项目编号',width:120,align : 'center'}
//			,
			{field:'qctypename',title:'质控样类型',width:300,align : 'center'}
		]],
		onClickRow:function(rowIndex,rowData){
			//$($("input[type=radio]")[rowIndex]).attr("checked",true);
			if(rowData.qctypeid!=''){
				$("#qcsampleFrame").attr("src", path +"/sampletest/batch/qcsample!toQcsampleReport.action?itemid="+itemid+"&batchno="+batchno+"&qctypeid="+rowData.qctypeid+"&flag="+flag);
			}else{
				alert('没有质控样！');
			}
			
		}//,
//		onLoadSuccess:function(data){
//			original = data.original;//原始记录单
//			methodid = data.methodid;//分析方法
//		}
	});
}