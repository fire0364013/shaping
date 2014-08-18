
//===============此处开始时弹出的单选框   校准曲线标准物品的弹出窗口   此处弹出的是标准物品
$(function(){  
		var name=encodeURI(encodeURI($("#materialnames").val()));
		getchecknames(rootPath +"/material/standardinventory/standardinventory!standinventoryinfoList.action?flagItemname="+name);
 		
});

function getchecknames(myurl){
	$('#checknamegrid').datagrid({
		singleSelect:true,
		nowrap: false,
		striped: true,
		collapsible:true,
		url:myurl,
		fit:true,
		fitColumns:true,
		scrollbarSize:0,
		remoteSort: false,
		idField:'materialid',
		pageSize:10,
		pageList:[10,20,30,40],
		frozenColumns:[[
			{	field : 'mid',
				title : '&nbsp;',
				width : 30,
				align : 'center',
				formatter : function(value){
					return "<input type='radio' name='radio'/>";}
			}
			]],
			columns:[[
			        {field:'materialname',title:'标准物质名称',width:140,align:"center"}	,	
					{field:'batchno',title:'批号',width:140,align:"center"}, 
					{field:'comsistence',title:'浓度',width:140,align:"center"},
					{field:'dilutionmultiple',title:'稀释倍数',width:140,align:"center"},
					{field:'uncertainty',title:'不确定度',width:140,align:"center"}
			]],
		rowStyler:function(rowIndex,rowData){
			if(rowData.remainingnum!='0'){
				if(rowData.sta=='已过期'){
					return 'color:red';
				}							
			 }
		},
		onClickRow:function(){
			var selected=$("#checknamegrid").datagrid('getSelected');
			checkRadio();
			$("#materialid").val(selected['mid']);
			$("#materialname").val(selected['materialname']);
			$("#comsistence").val(selected['comsistence']);
		},
		pagination:true,
		rownumbers:true
	});			
	}
function checkRadio(){
	var row = $('#checknamegrid').datagrid('getSelected');
	var rowNum = 0;
	var rows = $('#checknamegrid').datagrid('getRows');
	for ( var i = 0; i < rows.length; i++) {
		if (row == rows[i]) {
			rowNum = i;
			break;
		}
	}
	var radios = $("input[type=radio]");
	$(radios[rowNum]).attr("checked", true);
}



function query() {
	var materialname = $("#materialnames").val();//物品名称
	var batchno= $("#batchno").val();//批号
	$('#checknamegrid').datagrid( {
		queryParams : {
		materialname : materialname,
		searchFlag:'1',
		batchno:batchno
		},
		pageNumber : 1  //查询后指定页码为1
	});
}
//================弹出的单选框结束
