//初始化数据
function initDataGrid() {
	$('#samlingMethoddatagrid')
			.datagrid(
					{
						nowrap : false,
						striped : true,
						collapsible : true,
						url : rootPath + '/spot/samlingmethod/samlingmethod!getAllMethod.action',
						sortName : 'methodid',
						sortOrder : 'desc',
						fit : true,
						fitColumns : true,
						scrollbarSize : 0,
						idField : 'methodid',
						singleSelect : false,
						frozenColumns : [ [ {
							field : 'methodid',
							checkbox : true,
							align : "center"
						} ] ],
						columns : [ [
								{
									field : 'methodname',
									title : '方法名称',
									width : 400,
									align : 'center'
								},
								{
									field : 'methoddesc',
									title : '方法描述',
									width : 150,
									align : 'center'
								},
								{
									field : 'methodcategoryid',
									title : '方法类型',
									width : 100,
									align : 'center'
								}
								] ],
					pagination : true,
					rownumbers : true,
					pageSize : 10,
					pageList : [ 10, 20, 30, 30 ]
					});
}
//查询
function query(){
	var methodname = $("#methodname").val();
	var methoddesc = $('#methoddesc').val();
	var methodcategoryid = $('#methodcategoryid').val();
	$("#samlingMethoddatagrid").datagrid({
		queryParams : {
			methodname : methodname,
			methoddesc : methoddesc,
			methodcategoryid : methodcategoryid
		},
		pageNumber : 1
	});
}
//获取选中企业
function getSelectedEnt(){
	var datas = $("#samlingMethoddatagrid").datagrid("getSelections");
	var ents = "";
	for(var i=0;i<datas.length;i++){
		ents = ents + datas[i].methodid + ",";
	}
	$("#ents").val(ents.substring(0,ents.length-1));
}