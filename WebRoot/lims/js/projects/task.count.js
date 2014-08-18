//加载任务接收页面
function initInceptDataGrid(items){			
	$('#countlist').datagrid({
				//title:'用户信息列表',
				nowrap: false,
				striped: true,
				collapsible:true,
				url:rootPath +'/projects/taskcount/taskcount!initCount.action?items='+items, 
				fit:true,
				fitColumns : true,
				scrollbarSize:0,
				remoteSort: false,
				//idField:'testid',
				singleSelect:false,
				pageSize:20,
				pageList:[20,30,40,50],
				frozenColumns:[[
					{field:'testid',checkbox:true,align:"center"}
								]],
				columns:[[
						{field:'samplecode',title:'样品编号',width:40,align:"center"},
						{field:'samplename',title:'样品名称',width:40,align:"center"},
						{field:'itemname',title:'监测项目',width:100,align:"center"},
						{field:'projectcode',title:'任务流水号',width:40,align:"center"},
						{field:'monitortype',title:'监测点类型',width:40,align:"center"},
						{field:'pointcode',title:'监测点编码',width:40,align:"center"},
						{field:'pointname',title:'监测点名称',width:80,align:"center"},
						{field:'sampletime',title:'采样日期',width:40,align:"center"},
						{field:'status',title:'状态',width:40,align:"center"}						
				]],
				pagination:true,
				rownumbers:true
				
			});
			$(window).resize(function() {
				$("#countlist").datagrid('resize');
			});

}

//查询
function queryincept(order) {
	$("#countlist").datagrid("clearSelections");
	var jcxm = $("#jcxm").val();//项目id
	var projectcode = $("#projectcode").val();//样品编码
	var typeid= $("#typeid").val();//监测点类型
//	var status = "";
//	if(order == '1'){
//		status ="'SampeReceive','SampeSure','SampeGrant','SampeTest'";
//	}else if(order == '2'){
//		status="'SampeRegister','LocalDataTest','LocalDataAudit','LocalDataRecheck'";
//	}
	var startdate= $("#startdate").val();//开始日期
	var enddate= $("#enddate").val();//结束日期
	
	$('#countlist').datagrid( {
		queryParams : {
		jcxm:jcxm,
		projectcode:projectcode,
		typeid:typeid,
//		status:status,
		startdate:startdate,
		enddate:enddate
		},
		pageNumber : 1  //查询后指定页码为1
	});
}


//做项目弹出窗口使用
function showitem(){
	url=rootPath +"/projects/taskincept/taskincept!showitem.action";
	var _dialog =  window.top.$('<div id ="cert-dlg" style="padding:0px;"><iframe id="ItemFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
	_dialog.dialog({
		title:'项目选择',
		autoOpen:false,
		modal:true,
		closed:true,
		width:'600',
		height:'480',
		buttons:[{
			text:'确定',
			iconCls:'icon-save',
			handler:function(){
 			var itemname=$("#ItemFrame",top.document.body).contents().find("#selectedItemnames").val();
			var itemid=$("#ItemFrame",top.document.body).contents().find("#selectedItemid").val();
			$("#jcxmname").val(itemname);
			$("#jcxm").val(itemid);
			_dialog.dialog('close');
			}
		},{
			text:'取消',
			iconCls:'icon-cancel',
			handler:function(){
				_dialog.dialog('close');
			}
		}],
		onClose:function(){
			_dialog.dialog("destroy");
			
		}
	});
	_dialog.dialog('open');
}