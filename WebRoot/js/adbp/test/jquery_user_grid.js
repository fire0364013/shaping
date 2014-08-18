$(function() {
	$("#user_grid")
			.datagrid(
					{
						nowrap : false,
						striped : true,
						collapsible : true,
						url : "/adbp-web/jqueryUserItem.html",
						sortName : 'username',
						sortOrder : 'asc',
						remoteSort : false,
						fit : true,
						//width : "400px",
						//height : "580px",
						pagination : "true",
						method:'get',
						queryParams:{}, //查询条件
						border : "true",
						idField:'id', //主键字段
						fitColumns : true,
						pagination:true, //显示分页
						rownumbers:true, //显示行号
						scrollbarSize : 0,
						pageSize : 20,
						pageList : [ 20, 30, 40, 50 ],
						frozenColumns : [ [ {
							field : 'ck',
							checkbox : true
						} ] ],
						columns : [ [
								{
									field : 'username',
									title : '用户名',
									width : 80,
									align : "center"
								},
								{
									field : 'email',
									title : '邮箱',
									width : 70,
									align : "center"
								},
								{
									field : 'age',
									title : '年龄',
									width : 80,
									align : "center"
								},
								{
									field : 'sex',
									title : '性别',
									width : 150,
									align : "center"
								},
								{
									field : 'country',
									title : '国家',
									width : 70,
									align : "center"
								},
								{
									field : 'province',
									title : '省份',
									width : 150,
									align : "center"
								},
								{
									field : 'city',
									title : '城市',
									width : 150,
									align : "center"
								},
								{
									field : 'town',
									title : '县城',
									width : 60,
									align : "center"
								},
								{
									field : 'address',
									title : '地址',
									width : 60,
									align : "center"
								},
								{
									field : 'postcode',
									title : '邮编',
									width : 80,
									align : "center"
								},
								{
									field : 'nation',
									title : '民族',
									width : 80,
									align : "center"
								},
								{
									field : 'option',
									title : '操作',
									width : 70,
									align : 'center',
									formatter : function(value, rec, rowIndex) {
										/*var links = '<a  href="javascript:void(0)"  onclick="updateById(\''
												+ rec.id
												+ '\')" >修改</a>&nbsp;&nbsp;&nbsp;&nbsp;';
										links += '<a  href="javascript:void(0)"  onclick="deleteById(\''+
												rec.id + '\')" >删除</a>';
										return links;*/
									}
								} ] ],
						rowStyler : function(rowIndex, rowData) {
							
						}
					});
	$(window).resize(function() {
		$("#user_grid").datagrid('resize');
	});
});

/*function updateById(id){

}

function deleteById(id){
	
}*/