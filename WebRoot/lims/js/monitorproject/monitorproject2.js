
	function initMonitorinfo(){		
		$('#monitorinfolist').treegrid({
				iconCls:'icon-save',
				nowrap: false,
				rownumbers: false,
				fit:true,
				fitColumns : true,
				animate:false,
				collapsible:true,
				url:rootPath +'/monitorproject/monitorproject!toMonitorinfoList.action?projectid='+projectid+'&entid='+entid,
				idField:'projectid',
				treeField:'attributetype',
				scrollbarSize:0,
				frozenColumns:[[
					{field:'number',width:20},
	                {title:'监测点编码',field:'attributetype',width:140}
				]],
				columns:[[
//					{field:'pointcode',title:'监测点编码', width:50,align:"center",rowspan:3},
					{field:'pointname',title:'监测点名称 ', width:170,align:"center",rowspan:3},
					{field:'object',title:'监测对象', width:120,align:"center"},
					{field:'departid',title:'采样科室', width:70,align:"center",rowspan:3,
						formatter:function(value,rec){
								for(var i=0; i<departjson.length; i++){
								if (departjson[i].departid == value) 
									return departjson[i].departname;
								}
								return value;
						}
					},
					{field:'itemcount',title:'监测项目数', width:40,align:"center"}
				]],
				onClickRow:function(node){
					//点击一行 加载采样设置信息
					pmonitorid = node.projectid;
					initSampleinfo(node.projectid,node.pointtype);
				},onLoadSuccess:function(data){
					//默认加载第一行的基本信息
					var children =  $('#monitorinfolist').treegrid('getChildren','node0');
					if(children!=null&&children!=""){					
						//alert(children[0]);
						$('#monitorinfolist').treegrid('select',children[0].projectid);
					}					
					
					var node = $('#monitorinfolist').treegrid('getSelected');
					if(node!=null&&node!=""){						
						pmonitorid = node.projectid;
						initSampleinfo(node.projectid,node.pointtype);
					}else{
						initSampleinfo('','');
					}
				}
		});
		$(window).resize(function() {
			$("#monitorinfolist").treegrid('resize');
		});
	}
	//加载采样设置信息
	function initSampleinfo(pmonitorid,ppointtype){	
		$('#samplelist').datagrid({
			nowrap: false,
			striped: true,
			collapsible:true,
			url:rootPath +'/monitorproject/monitorproject!toSampleinfoList.action?pmonitorid='+pmonitorid, 
			fit:true,
			fitColumns : true,
			scrollbarSize:0,
			remoteSort: false,
			singleSelect:true,
			idField:"sampleid",
			rownumbers:true,
			columns:[[
						{field:'monitordays',title:'监测天数', width:50,align:"center"},
						{field:'monitorfrequency',title:'监测频次(次/天)', width:60,align:"center"},
						//{field:'samplingcount',title:'每次采样数量', width:50,align:"center"},
						{field:'stand',title:'评价标准 ', width:200,align:"center"}												
				]],
			onClickRow:function(rowIndex, rowData){
			
					pointtype=ppointtype;
				//点击一行加载项目信息
				psampleid = rowData.sampleid;
				initIteminfo(rowData.sampleid);
			},
			onRowContextMenu:function(e,row,rowData){	
				$("#samplelist").datagrid("clearSelections");
				$('#samplelist').datagrid('selectRow',parseInt(row));
				e.preventDefault();
				psampleid = rowData.sampleid;
				pointtype = ppointtype;
			},
			onHeaderContextMenu:function(e,field){			
				e.preventDefault();
				pointtype=ppointtype;

			},onLoadSuccess:function(data){
				$('#samplelist').datagrid('clearSelections');
				//默认加载第一行的基本信息
				var row = $('#samplelist').datagrid('selectRow',0);
				var rowData = $('#samplelist').datagrid('getSelected');
				pointtype = ppointtype;
				if(rowData!=null&&rowData!=""){
					psampleid = rowData.sampleid;
					initIteminfo(rowData.sampleid);
				}else{
					initIteminfo("");
				}
			}
		});
		
		$(window).resize(function() {
			$("#samplelist").datagrid('resize');
		});
	
	}
	//加载项目信息
	function initIteminfo(psampleid){
		$('#itemlist').datagrid({
			nowrap: false,
			striped: true,
			collapsible:true,
			url:rootPath +'/monitorproject/monitorproject!toItemfoList.action?psampleid='+psampleid, 
			fit:true,
			fitColumns : true,
			scrollbarSize:0,
			remoteSort: false,
			iconCls:"icon-edit",
			idField:"sampleitemid",
			rownumbers:true,
			columns:[[
				{field:'itemname',title:'监测项目', width:100,align:"center"},
//				{field:'samplenum',title:'采样量', width:60,align:"center"},	
//				{field:'samplecontainer',title:'采样容器', width:80,align:"center"},
				{field:'itemmethod',title:'分析方法', width:120,align:"center"},
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