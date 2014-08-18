//wjy~~

$(function(){
	var documentWidth=document.body.clientWidth;
	$('#selectmethod').datagrid({
		radio:true,
		singleSelect:true,
		nowrap: false,
		striped: true,
		collapsible:true,
		url:rootPath+'/method/method!methodList.action',
		fit:true,
		fitColumns:true,
		scrollbarSize:0,
		remoteSort: false,
		idField:'methodid',
		pageSize:10,
		pageList:[10,20,30,40],
		frozenColumns:[[
			{	field : 'methodid',
				title : '&nbsp;',
				width : 30,
				align : 'center',
				formatter : function(value){
					return "<input type='radio' name='radio' value=''/>";
				}
			}
					]],
		columns:[[
				{field:'methodname',title:'方法名称',width:140,align:"center"}	,
				{field:'methoddesc',title:'方法描述',width:140,align:"center"}	,
				{field:'methodcategoryid',title:'方法类型',width:140,align:"center"}	
		]],
		onClickRow:function(){
			var selected=$("#selectmethod").datagrid('getSelected');
			checkRadio();
			$("#selectedmethodname").val(selected['methodname']);
			$("#selectedmethodid").val(selected['methodid']);
		},
		pagination:true,
		rownumbers:true
		
		
	});	
	
	$('#selectanalyse').datagrid({
		radio:true,
		singleSelect:true,
		nowrap: false,
		striped: true,
		collapsible:true,
		url:rootPath+'/method/method!methodList.action?methodtype=2',
		fit:true,
		fitColumns:true,
		scrollbarSize:0,
		remoteSort: false,
		idField:'methodid',
		pageSize:10,
		pageList:[10,20,30,40],
		frozenColumns:[[
			{	field : 'methodid',
				title : '&nbsp;',
				width : 30,
				align : 'center',
				formatter : function(value){
					return "<input type='radio' name='radio' value=''/>";
				}
			}
					]],
		columns:[[
				{field:'methodname',title:'方法名称',width:140,align:"center"}	,
				{field:'methoddesc',title:'方法描述',width:140,align:"center"}	,
				{field:'methodcategoryid',title:'方法类别',width:140,align:"center"}	
		]],
		onClickRow:function(){
			var selected=$("#selectanalyse").datagrid('getSelected');
			checkRadioanalyse();
			$("#selectedanalysename").val(selected['methodname']);
			$("#selectedanalyseid").val(selected['methodid']);
		},
		pagination:true,
		rownumbers:true
		
		
	});
});	

	function checkRadioanalyse(){
	var row = $('#selectanalyse').datagrid('getSelected');
	var rowNum = 0;
	var rows = $('#selectanalyse').datagrid('getRows');
	for ( var i = 0; i < rows.length; i++) {
		if (row == rows[i]) {
			rowNum = i;
			break;
		}
	}
	var radios = $("input[type=radio]");
	$(radios[rowNum]).attr("checked", true);
	}	


	function checkRadio(){
		var row = $('#selectmethod').datagrid('getSelected');
		var rowNum = 0;
		var rows = $('#selectmethod').datagrid('getRows');
		for ( var i = 0; i < rows.length; i++) {
			if (row == rows[i]) {
				rowNum = i;
				break;
			}
		}
		var radios = $("input[type=radio]");
		$(radios[rowNum]).attr("checked", true);
	}	
	
	
	function queryanalyse() {

		var methodname = $("#methodname").val();//方法名称
		var methoddesc = $("#methoddesc").val();//所属类别：国标，地标，行标
		var methodcategoryid = $("#methodcategoryid").val();//方法类型：分析方法，采样方法
		
		$('#selectanalyse').datagrid( {
			queryParams : {
				methodname : methodname,
				methoddesc : methoddesc,
				methodcategoryid : methodcategoryid
			},
			pageNumber : 1  //查询后指定页码为1
		});
	}
	
	function querysamp() {

		var methodname = $("#methodname").val();//方法名称
		var methoddesc = $("#methoddesc").val();//所属类别：国标，地标，行标
		var methodcategoryid = $("#methodcategoryid").val();//方法类型：分析方法，采样方法
		
		$('#selectmethod').datagrid( {
			queryParams : {
				methodname : methodname,
				methoddesc : methoddesc,
				methodcategoryid : methodcategoryid
			},
			pageNumber : 1  //查询后指定页码为1
		});
	}
	
		