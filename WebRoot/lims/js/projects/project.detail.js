//项目监测企业
function initDataGrid(){
	$('#datagrid').datagrid({
		nowrap: false,
		striped: true,
		collapsible:true,
		url: rootPath + "/projects/taskregister/projectdetail!detailList.action?projectcode="+projectcode,
		fit:true,
		fitColumns:true,
		scrollbarSize:0,
		idField:'projectdetail',
		singleSelect:false,
//		checkOnSelect:true,
		frozenColumns:[[
					{field:'projectdetail',checkbox:true,align:"center"}
			]],
		columns:[[
	       	{field:'entname',title:'企业名称',width:300,align:'center'},
			{field:'monitortypename',title:'监测点类型',width:150,align : 'center'},
			{field:'monitorname',title:'监测点',width:150,align : 'center'},
			{field:'itemname',title:'检测项目',width:200,align : 'center'},
						{field:'operate',title:'操作',width:80,align : 'center',
				formatter:function(value,rowData,rowIndex){
					return '<img src="'+rootPath+'/themes/icons/redo.png" alt="监测点" onclick="operateProjectMonitor('+rowData.projectdetail+')"/> ';
				}
			}
				
		]],
//		onSelect:function(rowIndex, rowData){
//		
//		},
		onLoadSuccess:function(data){
			if(data.rows.length>0){
				setTimeout("mergeCellsByField(\"datagrid\",\"projectdetail,entname\")",10)
			}
		},
		onRowContextMenu:function(e, rowIndex, rowData){
			$('#datagrid').datagrid("selectRow",rowIndex);
			$("#taskContextMenu").menu("show", {left: e.pageX,top: e.pageY});
			$('#addMonth').removeAttr("disabled");
			$('#addPinci').removeAttr("disabled");
			e.preventDefault();
		},
		pagination:true,
		pageSize:20,
		pageList:[20,30,40,50]
		
	});
}

function initDataGridByHuangj(){
	$('#datagrid').datagrid({
		nowrap: false,
		striped: true,
		collapsible:true,
		url: rootPath + "/projects/taskregister/projectdetail!detailList.action?projectcode="+projectcode,
		fit:true,
		fitColumns:true,
		scrollbarSize:0,
		idField:'projectdetail',
		singleSelect:false,
		frozenColumns:[[
					{field:'projectdetail',checkbox:true,align:"center"}
			]],
		columns:[[
	       	//{field:'entname',title:'企业名称',width:300,align:'center'},
			{field:'monitortypename',title:'监测点类型',width:150,align : 'center'},
			{field:'monitorname',title:'监测点',width:150,align : 'center'},
			{field:'itemname',title:'检测项目',width:200,align : 'center'},
						{field:'operate',title:'操作',width:80,align : 'center',
				formatter:function(value,rowData,rowIndex){
					return '<img src="'+rootPath+'/themes/icons/redo.png" alt="监测点" onclick="operateProjectMonitor('+rowData.projectdetail+')"/> ';
				}
			}
				
		]],
//		onSelect:function(rowIndex, rowData){
//		
//		},
		onLoadSuccess:function(data){
			if(data.rows.length>0){
				setTimeout("mergeCellsByField(\"datagrid\",\"projectdetail,monitortypename\")",10)
			}
		},
		onRowContextMenu:function(e, rowIndex, rowData){
			$('#datagrid').datagrid("selectRow",rowIndex);
			$("#taskContextMenu").menu("show", {left: e.pageX,top: e.pageY});
			$('#addMonth').removeAttr("disabled");
			$('#addPinci').removeAttr("disabled");
			e.preventDefault();
		},
		pagination:true,
		pageSize:20,
		pageList:[20,30,40,50]
		
	});
}

function initDataGridViewByHuangj(){
	$('#datagrid').datagrid({
		nowrap: false,
		striped: true,
		collapsible:true,
		url: rootPath + "/projects/taskregister/projectdetail!detailList.action?projectcode="+projectcode,
		fit:true,
		fitColumns:true,
		scrollbarSize:0,
		idField:'projectdetail',
		singleSelect:false,
		columns:[[
			{field:'projectdetail',hidden:true,align:"center"},
	       	//{field:'entname',title:'企业名称',width:300,align:'center'},
			{field:'monitortypename',title:'监测点类型',width:150,align : 'center'},
			{field:'monitorname',title:'监测点',width:150,align : 'center'},
			{field:'itemname',title:'检测项目',width:200,align : 'center'},
			{field:'operate',title:'详情',width:80,align : 'center',
				formatter:function(value,rowData,rowIndex){
					return '<img src="'+rootPath+'/themes/icons/redo.png" alt="监测点" onclick="viewProjectMonitor('+rowData.projectdetail+')"/> ';
					//return '<img src="'+rootPath+'/themes/icons/redo.png" alt="监测点" onclick="operateProjectMonitor('+rowData.projectdetail+')"/> ';
				}
			}		
		]],
//		onSelect:function(rowIndex, rowData){
//		
//		},
		onLoadSuccess:function(data){
			if(data.rows.length>0){
				setTimeout("mergeCellsByField(\"datagrid\",\"projectdetail,monitortypename\")",10)
			}
		},
		onRowContextMenu:function(e, rowIndex, rowData){
			$('#datagrid').datagrid("selectRow",rowIndex);
			$("#taskContextMenu").menu("show", {left: e.pageX,top: e.pageY});
			$('#addMonth').removeAttr("disabled");
			$('#addPinci').removeAttr("disabled");
			e.preventDefault();
		},
		pagination:true,
		pageSize:20,
		pageList:[20,30,40,50],
	});
}

function initDataGridView(){
	$('#datagrid').datagrid({
		nowrap: false,
		striped: true,
		collapsible:true,
		url: rootPath + "/projects/taskregister/projectdetail!detailList.action?projectcode="+projectcode,
		fit:true,
		fitColumns:true,
		scrollbarSize:0,
		idField:'projectdetail',
		singleSelect:false,
		columns:[[
			{field:'projectdetail',hidden:true,align:"center"},
	       	{field:'entname',title:'企业名称',width:300,align:'center'},
			{field:'monitortypename',title:'监测点类型',width:150,align : 'center'},
			{field:'monitorname',title:'监测点',width:150,align : 'center'},
			{field:'itemname',title:'检测项目',width:200,align : 'center'},
			{field:'operate',title:'详情',width:80,align : 'center',
				formatter:function(value,rowData,rowIndex){
					return '<img src="'+rootPath+'/themes/icons/redo.png" alt="监测点" onclick="viewProjectMonitor('+rowData.projectdetail+')"/> ';
					//return '<img src="'+rootPath+'/themes/icons/redo.png" alt="监测点" onclick="operateProjectMonitor('+rowData.projectdetail+')"/> ';
				}
			}		
		]],
//		onSelect:function(rowIndex, rowData){
//		
//		},
		onLoadSuccess:function(data){
			if(data.rows.length>0){
				setTimeout("mergeCellsByField(\"datagrid\",\"projectdetail,entname\")",10)
			}
		},
		onRowContextMenu:function(e, rowIndex, rowData){
			$('#datagrid').datagrid("selectRow",rowIndex);
			$("#taskContextMenu").menu("show", {left: e.pageX,top: e.pageY});
			$('#addMonth').removeAttr("disabled");
			$('#addPinci').removeAttr("disabled");
			e.preventDefault();
		},
		pagination:true,
		pageSize:20,
		pageList:[20,30,40,50],
	});
}

function mergeCellsByField(tableID,colList){
    var ColArray = colList.split(",");
    var tTable = $('#'+tableID);
    var TableRowCnts=tTable.datagrid("getRows").length;
    var tmpA;
    var tmpB;
    var PerTxt = "";
    var CurTxt = "";
    var alertStr = "";
    //for (j=0;j<=ColArray.length-1 ;j++ )
    for (j=ColArray.length-1;j>=0 ;j-- )
    {
        //当循环至某新的列时，变量复位。
        PerTxt="";
        tmpA=1;
        tmpB=0;
        
        //从第一行（表头为第0行）开始循环，循环至行尾(溢出一位)
        for (i=0;i<=TableRowCnts ;i++ )
        {
            if (i==TableRowCnts)
            {
                CurTxt="";
            }
            else
            {
                CurTxt=tTable.datagrid("getRows")[i][ColArray[j]];
            }
            if (PerTxt==CurTxt)
            {
                tmpA+=1;
            }
            else
            {
                tmpB+=tmpA;
                tTable.datagrid('mergeCells',{
                    index:i-tmpA,
                    field:ColArray[j],
                    rowspan:tmpA,
                    colspan:null
                });
                tmpA=1;
            }
            PerTxt=CurTxt;
        }
    }
}

function operateProjectMonitor(projectdetail){
	var url = rootPath + "/projects/taskregister/projectmonitorpoint!list.action?str="+projectdetail;	
	var _dialog =  window.top.$('<div id ="monitorplans-dlg" style="padding:0px;"><iframe id="monitorinfoFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
	_dialog.dialog({
	title:'监测方案',
	autoOpen:false,
	modal:true,
	closed:true,
	maximizable:true,
	resizable:true,
	width:'900',
	height:'580',
	buttons:[{
		text:'确定',
		iconCls:'icon-save',
		handler:function(){
			_dialog.dialog("close");
			$('#datagrid').datagrid("reload");
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

function viewProjectMonitor(projectdetail){
	var url = rootPath + "/projects/taskregister/projectmonitorpoint!view.action?str="+projectdetail;	
	var _dialog =  window.top.$('<div id ="monitorplans-dlg" style="padding:0px;"><iframe id="monitorinfoFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
	_dialog.dialog({
	title:'采样详情',
	autoOpen:false,
	modal:true,
	closed:true,
	maximizable:true,
	resizable:true,
	width:'900',
	height:'580',
	buttons:[{
		text:'确定',
		iconCls:'icon-save',
		handler:function(){
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

function addMonitorEnt()
{
	var url = rootPath + "/projects/taskregister/projectdetail!toEntpriseListPage.action?projectcode="+projectcode;
	var _dialog =  window.top.$('<div id ="ent-dlg"  style="padding:0px;"><iframe id="entFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
	_dialog.dialog({
	title:'选择企业',
//	autoOpen:false,
//	modal:true,
//	closed:true,
	width:'800',
	height:'580',
	buttons:[{
		text:'保存',
		iconCls:'icon-save',
		handler:function(){
				$("#entFrame",top.document.body).contents().find("#ents").click();
				var ents = $("#entFrame",top.document.body).contents().find("#ents").val();
				if(ents==null || ents=='undefined' || ents==''){
					return false;
				}else{
					$.post( rootPath +"/projects/taskregister/projectdetail!addProjectDetail.action",
					{projectcode:projectcode,ent:ents},
					function(data){
						if(data=='success'){
						 	$("#datagrid").datagrid('reload');
							_dialog.dialog('close');
							alert('保存成功');
						}else{
							alert('保存失败');
						}
					});
				}
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

function deleteMonitorEnt(){
	var rows = $("#datagrid").datagrid("getSelections");
	if(rows.length>0){
		if(confirm("是否删除？")){
			var id = "";
			for(var i=0;i<rows.length;i++){
				if(id!="") id = id + ",";
				id = id + rows[i].projectdetail;
			}
			$.ajax({
				type:'POST',
				data:'id='+id,
				url:rootPath + '/projects/taskregister/projectdetail!deleteProjectDetail.action',
				success:function(msg){
					if(msg=='success'){
						alert('删除成功');
						$("#datagrid").datagrid("clearSelections");
						$("#datagrid").datagrid("reload")
					}else{
						alert('删除失败');
					}
				}
			});
		}
	}else{
		alert("请至少选择一项");
	}
}
