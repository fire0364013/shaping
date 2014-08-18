var idfild=[];//选中的监测点id
	function initMonitorinfo(){		
		$('#monitorinfolist').treegrid({
				nowrap: false,
				striped: true,
				fit:true,
				fitColumns : true,
				animate:false,
				collapsible:true,
				singleSelect:true,
				scrollbarSize:0,
				url:rootPath +'/monitorproject/monitorproject!toMonitorinfoList.action?projectid='+projectid+'&entid='+entid,
				idField:'projectid',
				treeField:'attributetype',
				frozenColumns:[[
					{field:'projectid',width:40,checkbox:true,align:"center"},
	                {title:'监测点编码',field:'attributetype',width:140}
				]],
				columns:[[
//					{field:'attributetype',title:'监测点编码',width:140},
//					{field:'pointcode',title:'监测点编码', width:50,align:"center",rowspan:3},
					{field:'pointname',title:'监测点名称<img src="'+rootPath+'/themes/icons/mini_edit.png"/>', width:120,align:"center",rowspan:3},
					{field:'object',title:'监测对象', width:120,align:"center"},
					{field:'departid',title:'采样科室', width:70,align:"center",rowspan:3,
						formatter:function(value,rec){
							for(var i=0; i<departjson.length; i++){
							if (departjson[i].departid == value) 
								return departjson[i].departname;
							}
							return value;
						}
					}
				]],
//				onClickRow:function(node){
//					//点击一行 加载采样设置信息
//					pmonitorid = node.projectid;
//					initSampleinfo(node.projectid,node.pointtype);
//				},
				onClickRow:function(node){
					if(node.projectid.indexOf("node")>=0){
						$('#monitorinfolist').treegrid('clearSelections');
						$("#monitorinfolist").treegrid('select',node.projectid);
					}else{
						$('#monitorinfolist').treegrid('clearSelections');
						$("#monitorinfolist").treegrid('select',node.projectid);
					}
					$("#parentpointtype").val(node.parentpointtype);				
					//点击一行 加载采样设置信息
					pmonitorid = node.projectid;
					initSampleinfo(node.projectid,node.pointtype);
				},onLoadSuccess:function(data){
					for(var i=0;i<idfild.length;i++){
						$('#monitorinfolist').treegrid('select',idfild[i]);
						var nodes = $('#monitorinfolist').treegrid('getParent',idfild[i]);
						if(nodes!=null){
							$('#monitorinfolist').treegrid('expand',nodes.projectid);
						}
					}
					initSampleinfo('','');
				},onSelect:function(rowData){
					var flag=0;
					if(idfild.length>0){
						for(var i=0;i<idfild.length;i++){
							if(idfild[i]==rowData.projectid){
								flag=1;
								break;
							}
						}
						if(flag==0){
							idfild.push(rowData.projectid);
						}
					}else{
						idfild.push(rowData.projectid);
					}
					if(rowData.projectid.indexOf("node")>=0){
						var nodes = $('#monitorinfolist').treegrid('getChildren', rowData.projectid);
						for ( var i = 0; i < nodes.length; i++) {
							$('#monitorinfolist').treegrid('select', nodes[i].projectid);
						}
					}
					//initSampleinfo(rowData.projectid,rowData.pointtype);
				},onUnselect:function(rowData){
					
					if(idfild.length>0){
						for(var i=0;i<idfild.length;i++){
							if(idfild[i]==rowData.projectid){
								idfild.splice(i,1);
							}
						}
					}
					if(rowData.projectid.indexOf("node")>=0){
						var nodes = $('#monitorinfolist').treegrid('getChildren', rowData.projectid);
						for ( var i = 0; i < nodes.length; i++) {
							$('#monitorinfolist').treegrid('unselect', nodes[i].projectid);
						}
					}
				},onSelectAll:function(rows){
					idfild=[];
					var getSelections=$('#monitorinfolist').treegrid('getSelections');
						for(var i=0;i<getSelections.length;i++){
							idfild.push(getSelections[i].projectid);
						}
						
				},onUnselectAll:function(){
					idfild=[];
				},onHeaderContextMenu:function(e,field){
					if(field=='pointname'){//监测点名称
						$('#monitor-menu').menu('show', {left: e.pageX,top: e.pageY});
						e.preventDefault();
					}
				}
//				,onLoadSuccess:function(data){
//					//默认加载第一行的基本信息
//					var children =  $('#monitorinfolist').treegrid('getChildren','node0');
//					if(children!=null&&children!=""){					
//						//alert(children[0]);
//						$('#monitorinfolist').treegrid('select',children[0].projectid);
//					}					
//					
//					var node = $('#monitorinfolist').treegrid('getSelected');
//					if(node!=null&&node!=""){						
//						pmonitorid = node.projectid;
//						initSampleinfo(node.projectid,node.pointtype);
//					}else{
//						initSampleinfo('','');
//					}
//				}
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
			columns:[[
						{field:'monitordays',title:'监测天数', width:50,align:"center"},
						{field:'monitorfrequency',title:'监测频次(次/天)', width:60,align:"center"},
						{field:'samplingcount',title:'每次采样数量', width:50,align:"center"},
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
	
	//修改监测点信息
	function editMonitorInfo(){
		var nodes = $('#monitorinfolist').treegrid('getSelected');
		if(nodes==null){
			alert("请至少选择一项！");
			return;
		}else{
			if(nodes.pointid=='pointid'){
				alert("请选择监测点!");
				return;
			}else{
				var url = rootPath + "/monitorproject/monitorproject!toMonitorName.action";
				var _dialog = window.top
						.$('<div id="monitorinfoDialog"  style="padding:0px;"><iframe id="monitorinfoFrame" width="100%" height="100%" frameborder="0" scrolling="no" src=' + url + '></iframe></div>')
						.appendTo(window.top.document.body);
				_dialog.dialog( {
					title:'修改监测点名称',
					autoOpen : false,
					modal : true,
					closed : true,
					width : '300',
					height : '130',
					buttons : [ {
						text : '保存',
						iconCls : 'icon-save',
						handler : function() {				
							var objs = $("#monitorinfoFrame",top.document.body).contents().find(".grkj-validate");
							if(!saveCheck(objs)){
								$("#monitorinfoFrame",top.document.body).contents().find(":input").focus();
								$("#monitorinfoFrame",top.document.body).contents().find("select").focus();
								alert("数据输入不符合格式，请查看红色边框的输入框的输入提示！");
								return false;
							}				
							var monitorname = $("#monitorinfoFrame",top.document.body).contents().find("#monitorname").val();					
		
							$.post(rootPath + "/monitorproject/monitorproject!editMonitorInfo.action",{pids:nodes.pointid,monitorname:monitorname},function(edit){
								if(edit=='success'){
									_dialog.dialog('close');
									alert('成功');
									$("#monitorinfolist").treegrid('reload');
								}
								if(edit=='fail'){
									alert('失败');
								}
							});	
						}
					},{
						text : '取消',
						iconCls : 'icon-cancel',
						handler : function() {
							_dialog.dialog('close');
						}
					} ],
					onClose : function() {
						_dialog.dialog("destroy");
			
					}
				});
				_dialog.dialog('open');
			}
		}
	}