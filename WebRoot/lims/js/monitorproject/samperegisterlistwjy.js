var monitortypeid = '';//监测点类型
//加载监测点信息
function initMonitorinfo(){
	$('#monitorinfolist').treegrid({
		width:1024,
		nowrap: false,
		striped: true,
		collapsible:true,
		url:rootPath +"/monitorproject/samperegister/samperegister!toMonitorinfoView.action?projectid="+projectid+"&entid="+entid, 
		fit:true,
		fitColumns : true,
		scrollbarSize:0,
		remoteSort: false,
		singleSelect:false,
		rownumbers:false,
		idField:'id',
		treeField:'monitorpointtypename',
		/* frozenColumns:[[
		                {field:'id',width:40,checkbox:true}
					]],*/
		columns:[[
					{field:'monitorpointtypename',title:'监测点编码', width:150,align:"left"},
					{field:'objectcode',title:'监测对象', width:80,align:"center"},
					{field:'pointname',title:'监测点名称', width:100,align:"center"},
					{field:'status',title:'状态', width:70,align:"center"},
					//{field:'pointcode',title:'监测点编码', width:70,align:"center"},
					{field:'departid',title:'采样科室', width:90,align:"center",
						formatter:function(value,rec){
								for(var i=0; i<departjson.length; i++){
								if (departjson[i].departid == value) 
									return departjson[i].departname;
								}
								return value;
						}
					},
					{field:'samplingprincipal',title:'现场采样负责人', width:100,align:"center"},
					{field:'samplingperson',title:'采样人', width:170,align:"center"},
					{field:'plansamplingdate',title:'计划采样开始日期 ', width:90,align:"center"}
			]],
			onClickRow:function(rowData){
				//点击一行 加载采样设置信息
				if(rowData.projectpointid!=""){
					$('#monitorinfolist').treegrid('clearSelections');
					$("#monitorinfolist").treegrid('select',rowData.id);
					initSampleinfo(rowData.projectcode,rowData.monitorpointid,rowData.projectpointid);
					monitortypeid = rowData.monitorpointtypeid; //选择监测点，监测点类型变化
				}
			},onLoadSuccess:function(data){
			//默认加载第一行的基本信息
				var row = $("#monitorinfolist").treegrid('getChildren',"mtype0");
				if(row!=null&&''!=row){	
					$('#monitorinfolist').treegrid('select',row[0].id);
				}
				var rowData = $('#monitorinfolist').treegrid('getSelected');
				if(rowData!=null&&rowData!=""){
					monitortypeid = rowData.monitorpointtypeid; //选择监测点，监测点类型变化
					initSampleinfo(rowData.projectcode,rowData.monitorpointid,rowData.projectpointid);
				}else{
					initSampleinfo('','','');
				}
			
		}
		
	});
	$(window).resize(function() {
		$("#monitorinfolist").treegrid('resize');
	});
}

//加载样品信息

//样品编号（该列固定）、样品状态、样品类型、监测点编码、监测点名称、采样开始日期、采样开始时间、采样结束日期、采样结束时间、样品特征、接样人、接样日期）。
function initSampleinfo(projectcode,monitorpointid,projectpointid){
	$('#samplelist').datagrid({
		nowrap: false,
		striped: true,
		collapsible:true,
		url:rootPath +'/monitorproject/samperegister/samperegister!toSampingListwjy.action?projectcode='+encodeURI(projectcode)+'&monitorpointid='+encodeURI(monitorpointid), 
		fit : true,
		//fitColumns : true,
		scrollbarSize : 0,
		remoteSort:false,
		singleSelect:false,
		//idField:"samplecode",
		rownumbers:true,
		frozenColumns:[[
						{field:'samplecode',title:'样品编号', width:85,align:"center"}
					 ]],
		columns:[[
		          	
		          	{field:'samplename',title:'样品名称', width:90,align:"center"},
		          	{field:'status',title:'样品状态', width:60,align:"center"},
		          	{field:'qcSampleType',title:'质控类型', width:100,align:"center"},
					{field:'parentsampleid',title:'关联样品编号', width:90,align:"center"},
					//{field:'monitorpointtype',title:'样品类型', width:60,align:"center"},
					//{field:'monitorpointid',title:'监测点编码', width:70,align:"center"},
					//{field:'monitorpointname',title:'监测点名称', width:90,align:"center"},
					{field:'samplingperson',title:'采样人', width:150,align:"center"},
					{field:'samplingcount',title:'样品数量 ', width:70,align:"center",
						formatter:function(value,rowData,rowIndex){
							if(value==null){
								value="";
							}
							return '<div id="sampcount'+rowIndex+'">'+value+'</div>';
						}
					},	
					{field:'samplingstartdate',title:'开始日期 ', width:80,align:"center"},
					{field:'samplingstarttime',title:'开始时间 ', width:60,align:"center"},
					{field:'samplingenddate',title:'结束日期  ', width:80,align:"center"},
					{field:'samplingendtime',title:'结束时间 ', width:60,align:"center"},
					{field:'charaderistic',title:'样品特征 ', width:110,align:"center",
						formatter:function(value,rowData,rowIndex){
						if(value==null){
							value="";
						}
						return '<div id="sampristic'+rowIndex+'">'+value+'</div>';
					}},
					{field:'amplereceivername',title:'接样人', width:70,align:"center"},
					{field:'receivetime',title:'接样日期', width:90,align:"center"}
					
			]],
		onClickRow:function(rowIndex, rowData){
			//点击一行加载项目信息
			$("#samplelist").datagrid('clearSelections');
			$("#samplelist").datagrid('selectRow',rowIndex);
			//psampleid = rowData.sampleid;
			initIteminfo(rowData.projectcode,rowData.monitorpointid,rowData.samplecode);
		},
		onLoadSuccess:function(data){
			$('#samplelist').datagrid('clearSelections');
			//默认加载第一行的基本信息
			var row = $('#samplelist').datagrid('selectRow',0);
			var rowData = $('#samplelist').datagrid('getSelected');
			if(rowData!=null&&rowData!=""){
				psampleid = rowData.sampleid;
				initIteminfo(rowData.projectcode,rowData.monitorpointid,rowData.samplecode);
			}else{
				initIteminfo("","","");
			}
		},onRowContextMenu:function(e,rowIndex,rowData){
			$("#kongbai-menu").menu('show',{left:e.pageX,top:e.pageY});
			e.preventDefault();
			$("#samplelist").datagrid("clearSelections");
			$('#samplelist').datagrid("selectRow",rowIndex);
		}
	});
	
	$(window).resize(function() {
		$("#samplelist").datagrid('resize');
	});
	$("#rightFrame").resize(function() {
		$("#samplelist").datagrid('resize');
	});
		
}

//加载项目信息
function initIteminfo(projectcode,monitorpointid,samplecode){
	$('#itemlist').datagrid({
		nowrap: false,
		striped: true,
		collapsible:true,
		url:rootPath +'/monitorproject/samperegister/samperegister!toItemfoList.action?samplecode='+samplecode+'&projectcode='+projectcode+'&monitorpointid='+monitorpointid, 
		fit:true,
		fitColumns : true,
		scrollbarSize:0,
		remoteSort: false,
		iconCls:"icon-edit",
		idField:"sampleitemtestid",
		columns:[[
				{field:'itemname',title:'监测项目', width:100,align:"center"},
				{field:'status',title:'状态', width:60,align:"center"},
				{field:'itemmethod',title:'监测方法', width:200,align:"center"},
//				{field:'samplenum',title:'采样量', width:60,align:"center"},	
//				{field:'samplecontainer',title:'采样容器', width:80,align:"center"},
//				{field:'fixedadditive',title:'固定添加剂', width:80,align:"center"},
				{field:'unitname',title:'计量单位', width:60,align:"center"},
				{field:'standvalue',title:'标准值', width:60,align:"center"},
				{field:'isnowtest',title:'现场监测', width:50,align:"center",
					formatter:function(value,rec){
							var str ="";
							if(value=='Y'){
								str = "<input type='checkbox' checked='checked' disabled='disabled'/>";
							}
							if(value=='N'){
								str = "<input type='checkbox' disabled='disabled'/>";
							}
							return str;
						}
				}
		]]
	});
	$(window).resize(function() {
		$("#itemlist").datagrid('resize');
	});
}

//获取选中的值
function getChecked(){
	var nodes = $('#itemtree').tree('getChecked');
	var s = '';
	for(var i=0; i<nodes.length; i++){
		if (s != '') s += ',';
		s += nodes[i].id+'_'+nodes[i].attributes.flag;
	}
	$("#ids").val(s);
}
