//wjy~~

$(function(){
	var documentWidth=document.body.clientWidth;
	$('#selectitem').datagrid({
		radio:true,
		singleSelect:true,
		nowrap: false,
		striped: true,
		collapsible:true,
		url:rootPath+"/itemgroup/itemgroup!getItemListForCer.action",
		fit:true,
		fitColumns:true,
		scrollbarSize:0,
		remoteSort: false,
		idField:'itemid',
		pageSize:10,
		pageList:[10,20,30,40],
		frozenColumns:[[
			{	field : 'id',
				title : '&nbsp;',
				width : 30,
				align : 'center',
				formatter : function(value){
					return "<input type='radio' name='radio' value=''/>";
				}
			}
		]],
		columns:[[
				{field:'itemtype',title:'类型',width:140,align:"center"}	,
				{field:'itemname',title:'项目',width:140,align:"center"}	
				
		]],
		onClickRow:function(rowIndex,rowData){
			var selected=$("#selectitem").datagrid('getSelected');
			$($("input[type=radio]")[rowIndex]).attr("checked", true);
//			checkRadio();
			$("#itemname").val(selected['itemname']);
			$("#itemid").val(selected['id']);
			$("#itemtypeid").val(selected['itemtype']);
		},
		pagination:true,
		rownumbers:true
		
		
	});			
});	

	function checkRadio(){
		alert(1111);
		var row = $('#selectitem').datagrid('getSelected');
		var rowNum = 0;
		var rows = $('#selectitem').datagrid('getRows');
		for ( var i = 0; i < rows.length; i++) {
			if (row == rows[i]) {
				rowNum = i;
				break;
			}
		}
		var radios = $("input[type=radio]");
		$(radios[rowNum]).attr("checked", true);
	}	
	
	
	function querysamp() {

		var itemtypeid = $("#itemtype").val();//方法id
		var itemname = $("#itemname").val();//方法类别
		$('#selectitem').datagrid( {
			queryParams : {
			itemtypeid : itemtypeid,
			itemname : itemname
			},
			pageNumber : 1  //查询后指定页码为1
		});
	}
	
		
