//朱国英2012.7.18
$(document).ready(function(){
	initDataGrid();
	/*
	 * 	加载下拉
	 * 	1.chooseId: 下拉的ID
	 *	2.ctable: 数据表
	 *	3.cno: 数据表id字段
	 *	4.cname: 数据表text字段
	 *	5.dbwhere: 查询条件，默认为1=1
	 * 
	 */
	});

function relaod(){//重新装载数据
	$('#sampleitemrecord').datagrid('reload');
}

function initDataGrid(){
			$('#sampleitemrecordGrid').datagrid({
				nowrap: false,
				striped: true,
				collapsible:true,
				url:rootPath+'/sampletest/itemtestbackrecord!sampleitemrecordList.action?itemid='+itemid+'&samplecode='+samplecode,
				sortName: 'backdate',
				sortOrder: 'desc',
				fit:true,
				fitColumns:true,
				scrollbarSize:0,
				idField:'recordid',				
				columns:[[
					{field:'samplecode',title:'样品编号',width:120,align : 'center'},
			        {field:'itemname',title:'项目名称',width:120,align : 'center'},					
					{field:'backperson',title:'退回人',width:120,align : 'center'},
					{field:'backreason',title:'退回原因',width:170,align : 'center'},
					{field:'backdate',title:'退回时间',width:120,align : 'center'}
				]],
				pagination:true,
				rownumbers:true,
				pageSize:10,
				pageList:[20,30,40,50]
				
			});
			$(window).resize(function(){
				$("#sampleitemrecordGrid").datagrid('resize');
			});
}