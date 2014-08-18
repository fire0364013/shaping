var monitortypeid = '';//监测点类型
var departid="";
var groupid="";  //采样信息管理模块的监测点列表
var idfild=[];
//加载监测点信息   monitorpointtypeid
function initMonitorinfo(){
	$('#monitorinfolist').treegrid({
		nowrap: false,
		striped: true,
		collapsible:true,
		url:rootPath +"/monitorproject/samperegister/samperegister!toMonitorinfoList.action?projectid="+projectid+"&entid="+entid, 
		fit:true,
		fitColumns : true,
		scrollbarSize:0,
		remoteSort: false,
		singleSelect:false,
		rownumbers:false, 
		idField:'id',
		treeField:'monitorpointtypename',
		frozenColumns:[[
		                {field:'id',width:40,checkbox:true,align:"center"},// 退回用复选框
		                {field:'monitorpointtypename',title:'监测点编码', width:120,align:"left",	
						formatter:function(value,rowData,rowIndex){ 
								if(rowData.flagExdata=="true"){ 
									var links= '<font color="red">'+value+'</font>'; 
									return links;
								}else{
									return value;
								}
							}},
					{field:'objectcode',title:'监测对象', width:80,align:"center"},
					{field:'pointname',title:'监测点名称', width:140,align:"center"},
					{field:'status',title:'状态', width:40,align:"center"}
					]],
		columns:[[
					
					//{field:'pointcode',title:'监测点编码', width:70,align:"center"},
//					{field:'departid',title:'采样科室', width:60,align:"center",
//						formatter:function(value,rec){
//								for(var i=0; i<departjson.length; i++){
//								if (departjson[i].departid == value) 
//									return departjson[i].departname;
//								}
//								return value;
//						}
//					},
//					{field:'deptgroupname',title:'采样组', width:70,align:"center"},
					{field:'samplingprincipal',title:'采样负责人', width:110,align:"center"},
					{field:'samplingperson',title:'采样人', width:180,align:"center"},
					{field:'samplingmethodname',title:'采样方法<img src="'+rootPath+'/themes/icons/mini_edit.png"/>', width:150,align:"center"},
					{field:'plansamplingdate',title:'计划采样开始日期', width:170,align:"center"},
					{field:'operate',title:'采样仪器',width:120,align:"center",
							formatter:function(value,rowData,rowIndex){
								if(rowData.projectpointid!=""){
								var links='<img src="'+rootPath+'/images/globe.gif"   alt="仪器使用记录"  id="btnshow" onclick="devices('+ rowData.monitorpointid +')"/>&nbsp;&nbsp;';
								return links;
								}
							}
						}
			]],
		onClickRow:function(rowData){
			//点击一行 加载采样设置信息
			if(rowData.projectpointid!=""){
				departid=rowData.departid;
				groupid=rowData.deptgroupid;
				$('#monitorinfolist').treegrid('clearSelections');
				$("#monitorinfolist").treegrid('select',rowData.id);
				initSampleinfo(rowData.projectcode,rowData.monitorpointid,rowData.projectpointid);
				//initIteminfo();
				monitortypeid = rowData.monitorpointtypeid; //选择监测点，监测点类型变化
			}
			$("#monitorpointtypeid").val(rowData.monitorpointtypeid);	//监测点
			$('#samplelist').datagrid('clearSelections');
		},onLoadSuccess:function(row, data){
			//alert("idfild[i]="+idfild);
			for(var i=0;i<idfild.length;i++){
				$('#monitorinfolist').treegrid('select',idfild[i]);
				var nodes = $('#monitorinfolist').treegrid('getParent',idfild[i]);
					if(nodes!=null){
					$('#monitorinfolist').treegrid('expand',nodes.id);
				}
			} 
			//表头单击事件
			var header = $("#monitorinfolist").parent(".datagrid-view").find("div.datagrid-header");
			var fields = header.find("td:has(div.datagrid-cell)");
			$(fields).unbind('click');//先取消绑定
			
			for(var i=0;i<fields.length;i++){
				var field = $(fields[i]).attr('field');
				if(field=='samplingmethodname'){//采样方法
					$(fields[i]).bind('click',function(e){
						samplingmethodnameAll();
					});
				}
			}
			
			
			//右键单击事件
//			for(var i=0;i<data.length;i++){
//				var arr = data[i].children;
//				for(var j=0;j<arr.length;j++){
//					if(arr[j].flagExdata=="true"){
//						var rowid = arr[j].id;
//						var obj = $("tr[node-id='"+rowid+"']");
//						
//						var rowData = $(obj);
//						$(obj).unbind('contextmenu');
//						$(obj).bind('contextmenu',function(e,rowData){
////							alert(rowData);
////							$("#monitorinfolist").treegrid("clearSelections");
////							$("#monitorinfolist").treegrid('select',rowData.id);
//							$("#xianchang-menu").menu('show',{left:e.pageX,top:e.pageY});
//							e.preventDefault();
//						});
//					}
//				}
//				
//			}
		},onSelect:function(rowData){
			//alert(idfild);
			//alert(rowData.id+"标志");
			var flag=0;
			if(idfild.length>0){
				for(var i=0;i<idfild.length;i++){
					if(idfild[i]==rowData.id){
						flag=1;
						break;
					}
				}
				if(flag==0){
					idfild.push(rowData.id);
				}
			}else{
				idfild.push(rowData.id);
			}
			if(rowData.projectpointid=="");{
				var nodes = $('#monitorinfolist').treegrid('getChildren', rowData.id);
				for ( var i = 0; i < nodes.length; i++) {
					$('#monitorinfolist').treegrid('select', nodes[i].id);
				}
			}
		},onUnselect:function(rowData){
			if(idfild.length>0){
				for(var i=0;i<idfild.length;i++){
					if(idfild[i]==rowData.id){
						idfild.splice(i,1);
					}
				}
			}
			if(rowData.projectpointid=="");{
				var nodes = $('#monitorinfolist').treegrid('getChildren', rowData.id);
				for ( var i = 0; i < nodes.length; i++) {
					$('#monitorinfolist').treegrid('unselect', nodes[i].id);
				}
			}
		},onSelectAll:function(rows){
			idfild=[];
			var getSelections=$('#monitorinfolist').treegrid('getSelections');
			for(var i=0;i<getSelections.length;i++){
				idfild.push(getSelections[i].id);
			}
		},onUnselectAll:function(rows){
			idfild=[];
		},onContextMenu:function(e,rowData){
			if(rowData.id!=""){
				if(rowData.projectpointid!=""){//根节点不需要进行右键操作~
					$("#monitorinfolist").treegrid("clearSelections");
					$("#monitorinfolist").treegrid('select',rowData.id);
					if(rowData.iswritelocalrecord=="true"){
						$("#xianchang-menu").menu('show',{left:e.pageX,top:e.pageY});
					}
//					
				}
			}
			e.preventDefault();
		}
	});
	$(window).resize(function() {
		$("#monitorinfolist").treegrid('resize');
	});
}
Array.prototype.del = function() { 
	var a = {}, c = [], l = this.length; 
	for (var i = 0; i < l; i++) { 
		var b = this[i]; 
		var d = (typeof b) + b; 
		if (a[d] === undefined) { 
		c.push(b); 
		a[d] = 1; 
		} 
	} 
	return c; 
} 
//批量修改采样方法
function samplingmethodnameAll(){
	var monitorpointtypeid=[];
	//monitorpointtypeid.push(1,2);
	var cc="";
	var selected=$("#monitorinfolist").treegrid('getSelections');
	if(selected==null || selected.length< 1){		
		alert('请至少选择一条记录！');
		return;
	}else{	
		for ( var i = 0; i < selected.length; i++) {
			monitorpointtypeid.push(selected[i]['monitorpointtypeid']);
			/*if(cc==""){
				cc+=selected[i]['projectpointid'];
			}else */if(selected[i]['projectpointid']!=null && selected[i]['projectpointid']!="" && selected[i]['projectpointid']!='undefined'){
				cc+=selected[i]['projectpointid']+",";
			}
		}//for
	}
	
	cc = cc.substring(0,cc.length-1);
	var tmp = monitorpointtypeid.del();
	//alert(tmp);
	if(monitorpointtypeid.del().length>1){
		alert("请选择同一监测点类型下的点位！");
		return false;
	}
	$.post(rootPath + "/monitorproject/samlingmethod/samlingmethod!getSamlingmethodSize.action?monitorpointtypeid="+tmp, 
	function(msg){
		if (msg == 'no') {
			alert("该监测类型没有采样方法！");
			return false;
		}else if(msg=='fail'){
			alert("该监测类型没有采样方法！");
			return false;
		}else{
			var url = rootPath + "/monitorproject/samlingmethod/samlingmethod!toInput.action?monitorpointtypeid="+tmp+"&projectpointid="+cc;
		var _dialog = window.top
				.$('<div id="monitorDialog1"  style="padding:0px;overflow:hidden">' +
				'<iframe id="samlingmethodFrame1" width="100%" height="100%" frameborder="0" scrolling="no" src=' + url + '></iframe></div>')
				.appendTo(window.top.document.body);
		_dialog.dialog({
			title:'采样方法',
			autoOpen:false,
			modal:true,
			closed:true,
			width:'800',
			height:'300',
			buttons:[{
				text:'确定',
				iconCls:'icon-save',
				handler:function(){
					$("#samlingmethodFrame1",top.document.body).contents().find("#samlingmethodForm1").form('submit',{
					url:rootPath +'/monitorproject/samperegister/samperegister!saveSamlingmethod.action',
					onSubmit:function(){
						var len = $("#samlingmethodFrame1",top.document.body).contents().find("input[type=checkbox][name=methodids][checked]").length;
						//alert(len);
						if(len<1){
//							alert("请至少选择一项！");
//							return false;
							$("#samlingmethodFrame1",top.document.body).contents().find(":input").focus();
							alert("请至少选择一项！");
							return false;
						}
					},
					success:function(data){
					  	if(data=='success'){
					  		_dialog.dialog('close');	
					  		$("#monitorinfolist").treegrid('clearSelections');
							$("#monitorinfolist").treegrid('reload');
						}else{
							alert('失败');
						}
					 }
					});
				}//function
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
	});
}	
		
/*
 * 现场监测记录
 //*//*
function localeMonitor(){
	var selected=$("#monitorinfolist").treegrid("getSelected");
	var projectPointId=selected.projectpointid;
	var url = rootPath + "/monitorproject/spotrecord/spotrecord!toadd.action?projectPointId="+projectPointId;
	var _dialog = window.top
				.$('<div id="monitorDialog"  style="padding:0px;overflow:hidden">' +
				'<iframe id="spotrecordFrame" width="100%" height="100%" frameborder="0" scrolling="no" src=' + url + '></iframe></div>')
				.appendTo(window.top.document.body);
	_dialog.dialog({
		title:'现场监测参数管理',
		autoOpen:false,
		modal:true,
		closed:true,
		width:'480',
		height:'500',
		buttons:[{
			text:'保存',
			iconCls:'icon-save',
			handler:function(){
			var startDate=$(window.top.document).find("#startDate").val();
				$("#spotrecordFrame",top.document.body).contents().find("#spotrecordForm").form('submit',{
					url:rootPath +'/monitorproject/spotrecord/spotrecord!saveParmer.action',
					onSubmit:function(){
						var objs = $("#departmentinfoFrame",top.document.body).contents().find(".grkj-validate");
						if(!saveCheck(objs)){
							$("#departmentinfoFrame",top.document.body).contents().find(":input").focus();
							alert("数据输入不符合格式，请查看红色边框的输入框的输入提示！");
							return false;
						}
					$("#spotrecordFrame",top.document.body).contents().find("#openBlock").click();		
					},
					success:function(data){
					  	if(data=="success"){
							_dialog.dialog('close');							$("#datagrid1").datagrid('reload');							alert('成功');
							$("#spotrecordFrame",top.document.body).contents().find("#unLockBlock").click();
							$("#spotrecordFrame",top.document.body).contents().find("#refreshHtml").click();
					    }else{
					    	$("#spotrecordFrame",top.document.body).contents().find("#unLockBlock").click();
							alert('失败');
						}
					 }
				});	
			}
		},{
			text:'取消',
			iconCls:'icon-cancel',
			handler:function(){
				initMonitorinfo();刷新属性结构变红				_dialog.dialog('close');
			}
		}],
		onClose:function(){
			initMonitorinfo();刷新属性结构变红			_dialog.dialog("destroy");
			
		}
	});
	_dialog.dialog('open');
}*/

/**
 * 现场监测记录
 */
function localeMonitor(){
	var selected=$("#monitorinfolist").treegrid("getSelected");
	var projectpointid=selected.projectpointid;
	var url = rootPath + "/monitorproject/spotrecord/spotrecord!toSpotrecordView.action?projectpointid="+projectpointid;
	var _dialog =  window.top.$('	<div id ="dlg" style="padding:0px;"><iframe id="dlgFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
	_dialog.dialog({
		title:'现场监测记录',
		autoOpen:false,
		modal:true,
		closed:true,
		width:'1000',
		height:'600',
		onClose:function(){
			_dialog.dialog("destroy");					
		}
	});
	_dialog.dialog('open');
}
//devices 仪器使用记录
function devices(monitorpointid){
	//alert(monitorpointid);
	var url = rootPath + "/monitorproject/deviceuserecord/samplingdeviceuserecord!toJsButtonList.action?projectcode="+projectcode+"&monitorpointid="+monitorpointid;
		var _dialog =  window.top.$('	<div id ="dlg" style="padding:0px;"><iframe id="dlgFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
			_dialog.dialog({
			title:'采样仪器使用记录',
			autoOpen:false,
			modal:true,
			closed:true,
			width:'1000',
			height:'600',
			buttons:[{
				text:'确定',
				iconCls:'icon-save',
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

//加载样品信息
function initSampleinfo(projectcode,monitorpointid,projectpointid){
	$("#procode").val(projectcode);
	$("#monitorpid").val(monitorpointid);
	$("#propointid").val(projectpointid);
	$('#samplelist').datagrid({
		nowrap: false,
		striped: true,
		collapsible:true,
		url:rootPath +'/monitorproject/samperegister/samperegister!toSampingList.action?projectcode='+encodeURI(projectcode)+'&monitorpointid='+encodeURI(monitorpointid)
		+'&projectpointid='+encodeURI(projectpointid), 
		fit : true,
		//  : true,
		scrollbarSize : 0,
		remoteSort:false,
		singleSelect:false,
		idField:"samplecode",
		rownumbers:true,
		frozenColumns:[[
						{field:'sc',checkbox:true,align:"center"},
						{field:'samplecode',title:'样品编号', width:90,align:"center"},
						{field:'samplename',title:'样品名称<img src="'+rootPath+'/themes/icons/mini_edit.png"/>', width:70,align:"center"}
					 ]],
		columns:[[
					{field:'charaderistic',title:'样品特征 <img src="'+rootPath+'/themes/icons/mini_edit.png"/>', width:100,align:"center",
						formatter:function(value,rowData,rowIndex){
						if(value==null){
							value="";
						}
						return '<div id="sampristic'+rowIndex+'">'+value+'</div>';
					}},
					{field:'qcSampleType',title:'质控类型', width:70,align:"center"},
					{field:'samplingstartdate',title:'开始日期 <img src="'+rootPath+'/themes/icons/mini_edit.png"/>', width:80,align:"center"},
					{field:'samplingstarttime',title:'开始时间 <img src="'+rootPath+'/themes/icons/mini_edit.png"/>', width:70,align:"center"},
					{field:'samplingperson',title:'采样人<img src="'+rootPath+'/themes/icons/mini_edit.png"/>', width:180,align:"center"},
					{field:'items',title:'监测项目', width:280,align:"center"},
					{field:'samplingenddate',title:'结束日期 <img src="'+rootPath+'/themes/icons/mini_edit.png"/> ', width:80,align:"center"},
					{field:'samplingendtime',title:'结束时间 <img src="'+rootPath+'/themes/icons/mini_edit.png"/>', width:70,align:"center"},
					{field:'status',title:'状态', width:90,align:"center"},
					{field:'parentsampleid',title:'关联样品编号', width:90,align:"center"},//{field:'monitorfrequency',title:'监测频次', width:60,align:"center"},
					//{field:'monitordays',title:'监测天数', width:60,align:"center"}
					{field:'samplingcount',title:'样品数量  <img src="'+rootPath+'/themes/icons/mini_edit.png"/>', width:70,align:"center",
						formatter:function(value,rowData,rowIndex){
							if(value==null){
								value="";
							}
							return '<div id="sampcount'+rowIndex+'">'+value+'</div>';
						}
					},
//					{field:'samplingdepth',title:'采样深度<img src="'+rootPath+'/themes/icons/mini_edit.png"/>', width:180,align:"center"},
//					{field:'samplecolor',title:'样品颜色<img src="'+rootPath+'/themes/icons/mini_edit.png"/>', width:180,align:"center"},
//					{field:'samplehumidity',title:'样品湿度<img src="'+rootPath+'/themes/icons/mini_edit.png"/>', width:180,align:"center"},
//					{field:'samplegrain',title:'样品质地<img src="'+rootPath+'/themes/icons/mini_edit.png"/>', width:180,align:"center"},
//					{field:'welldepth',title:'井深<img src="'+rootPath+'/themes/icons/mini_edit.png"/>', width:180,align:"center"},
					{field:'description',title:'备注<img src="'+rootPath+'/themes/icons/mini_edit.png"/>', width:180,align:"center"}
					
			]],
		onClickRow:function(rowIndex, rowData){
			//点击一行加载项目信息
//			$("#samplelist").datagrid('clearSelections');
//			$("#samplelist").datagrid('selectRow',rowIndex);
			//psampleid = rowData.sampleid;
//			initIteminfo(rowData.projectcode,rowData.monitorpointid,rowData.samplecode);
		}/*,onDblClickCell:function(rowIndex,field,value){
			$("#samplelist").datagrid('clearSelections');
			$("#samplelist").datagrid('selectRow',rowIndex);
			var selected=$("#samplelist").datagrid('getSelected');
			if(field=='samplingcount'){//样品数量
				if(value==null){value="";}
				sampCount(rowIndex,value,selected['samplecode']);}
			if(field=='samplingstartdate'){//开始日期//行索引，值，样品编号,标题
				sampStartDate(value,selected['samplecode']);}
			if(field=='samplingstarttime'){//开始时间
				sampStartTime(value,selected['samplecode']);}
			if(field=='samplingenddate'){//结束日期
				sampEndDate(value,selected['samplecode']);}
			if(field=='samplingendtime'){//结束时间
				sampEndTime(value,selected['samplecode']);}
			if(field=='charaderistic'){//样品形状
				sampRistic(rowIndex,value,selected['samplecode']);}
			if(field=='samplingperson'){
				//采样人
				selectSampUser(value,selected['samplecode'],selected['samplingpersonid']);
			}
		},onHeaderContextMenu:function(e,field){
			if(field=='samplingcount'){//样品数量
				$('#samplingcount-menu').menu('show', {left: e.pageX,top: e.pageY});
				e.preventDefault();}
			else if(field=='samplingstartdate'){//开始日期
				$('#samplingstartdate-menu').menu('show', {left: e.pageX,top: e.pageY});
				e.preventDefault();}
			else if(field=='samplingstarttime'){//开始时间
				$('#starttime-menu').menu('show', {left: e.pageX,top: e.pageY});
				e.preventDefault();}
			else if(field=='samplingenddate'){//结束日期
				$('#enddate-menu').menu('show', {left: e.pageX,top: e.pageY});
				e.preventDefault();}
			else if(field=='samplingendtime'){//结束时间
				$('#endtime-menu').menu('show', {left: e.pageX,top: e.pageY});
				e.preventDefault();}
			else if(field=='charaderistic'){//样品形状
				$('#charaderistic-menu').menu('show', {left: e.pageX,top: e.pageY});
				e.preventDefault();}
			else if(field=='samplingperson'){
				//批量修改采样人
				$('#samper-menu').menu('show', {left: e.pageX,top: e.pageY});
				e.preventDefault();}
		   else if(field=='samplename'){
				//批量修改样品名称
				$('#samplename-menu').menu('show', {left: e.pageX,top: e.pageY});
				e.preventDefault();}
			else{
				//$("#kongbaiheader-menu").menu('show',{left:e.pageX,top:e.pageY});
				e.preventDefault();
				
			}
		}*/,
		onLoadSuccess:function(data){
			var header = $("#samplelist").parent(".datagrid-view").find("div.datagrid-header");
			var fields = header.find("td:has(div.datagrid-cell)");
			$(fields).unbind('click');//先取消绑定
			
			for(var i=0;i<fields.length;i++){
				var field = $(fields[i]).attr('field');
				if(field=='samplingcount'){//样品数量
					$(fields[i]).bind('click',function(e){
						SampCountAll();
//						$('#samplingcount-menu').menu('show', {
//							left: e.pageX,
//							top: e.pageY
//						});
//						e.preventDefault();
					});
				}else if(field=='samplingstartdate'){//开始日期
					$(fields[i]).bind('click',function(e){
						sampStartDateAll();
//						$('#samplingstartdate-menu').menu('show', {
//							left: e.pageX,
//							top: e.pageY
//						});
//						e.preventDefault();
					});
				}else if(field=='samplingstarttime'){//开始时间
					$(fields[i]).bind('click',function(e){
						sampStartTimeAll();
//						$('#starttime-menu').menu('show', {
//							left: e.pageX,
//							top: e.pageY
//						});
//						e.preventDefault();
					});
				}else if(field=='samplingenddate'){//结束日期
					$(fields[i]).bind('click',function(e){
						sampEndDateAll();
//						$('#enddate-menu').menu('show', {
//							left: e.pageX,
//							top: e.pageY
//						});
//						e.preventDefault();
					});
				}else if(field=='samplingendtime'){//结束时间
					$(fields[i]).bind('click',function(e){
						sampEndTimeAll();
//						$('#endtime-menu').menu('show', {
//							left: e.pageX,
//							top: e.pageY
//						});
//						e.preventDefault();
					});
				}else if(field=='charaderistic'){//样品形状
					$(fields[i]).bind('click',function(e){
						sampRisticAll();
//						$('#charaderistic-menu').menu('show', {
//							left: e.pageX,
//							top: e.pageY
//						});
//						e.preventDefault();
					});
				}else if(field=='samplingperson'){
					//批量修改采样人
					$(fields[i]).bind('click',function(e){
						selectSamperAll();
//						$('#samper-menu').menu('show', {
//							left: e.pageX,
//							top: e.pageY
//						});
//						e.preventDefault();
					});
				}else if(field=='samplename'){
					//批量修改样品名称
					$(fields[i]).bind('click',function(e){
						samplenameAll();
//						$('#samplename-menu').menu('show', {
//							left: e.pageX,
//							top: e.pageY
//						});
//						e.preventDefault();
					});
					////////////////////////////////
				}else if(field=='samplingdepth'){
					//批量修改样品名称
					$(fields[i]).bind('click',function(e){
						samplingdepthAll();
//						$('#samplename-menu').menu('show', {
//							left: e.pageX,
//							top: e.pageY
//						});
//						e.preventDefault();
					});
				}else if(field=='samplecolor'){
					//批量修改样品名称
					$(fields[i]).bind('click',function(e){
						samplecolorAll();
//						$('#samplename-menu').menu('show', {
//							left: e.pageX,
//							top: e.pageY
//						});
//						e.preventDefault();
					});
				}else if(field=='samplehumidity'){
					//批量修改样品名称
					$(fields[i]).bind('click',function(e){
						samplehumidityAll();
//						$('#samplename-menu').menu('show', {
//							left: e.pageX,
//							top: e.pageY
//						});
//						e.preventDefault();
					});
				}else if(field=='samplegrain'){
					$(fields[i]).bind('click',function(e){
						samplegrainAll();
//						$('#samplename-menu').menu('show', {
//							left: e.pageX,
//							top: e.pageY
//						});
//						e.preventDefault();
					});
				}else if(field=='welldepth'){
					$(fields[i]).bind('click',function(e){
						welldepthAll();
//						$('#samplename-menu').menu('show', {
//							left: e.pageX,
//							top: e.pageY
//						});
//						e.preventDefault();
					});
				}else if(field=='description'){
					$(fields[i]).bind('click',function(e){
						descriptionAll();
//						$('#samplename-menu').menu('show', {
//							left: e.pageX,
//							top: e.pageY
//						});
//						e.preventDefault();
					});
				}
			}
			/*$('#samplelist').datagrid('clearSelections');
			//默认加载第一行的基本信息
			var row = $('#samplelist').datagrid('selectRow',0);
			var rowData = $('#samplelist').datagrid('getSelected');
			
			if(rowData!=null&&rowData!=""){
				psampleid = rowData.sampleid;
				initIteminfo(rowData.projectcode,rowData.monitorpointid,rowData.samplecode);
			}else{
				initIteminfo("");
			}*/
		},onRowContextMenu:function(e,rowIndex,rowData){
			$("#samplelist").datagrid("clearSelections");
			$('#samplelist').datagrid("selectRow",rowIndex);
			if(rowData.ishaveqcsample=="Y"){
				if(rowData.qcSampleType==""){
					$("#kongbai-menu").menu('show',{left:e.pageX,top:e.pageY});
				}else{
					$("#zhikong-menu").menu('show',{left:e.pageX,top:e.pageY});
				}
			}
			e.preventDefault();
		}
	});
	
	$(window).resize(function() {
		$("#samplelist").datagrid('resize');
	});
	$("#rightFrame").resize(function() {
		$("#samplelist").datagrid('resize');
	});
		
}


//***************************************修改采样列表中的字段开始***************************************//
//批量修改采样数量
function SampCountAll(){
	var selected=$("#samplelist").datagrid('getSelections');
	if(selected==null || selected.length< 1){
		
		alert('请至少选择一条记录！');
	}else{
		var cc=[];
		for ( var i = 0; i < selected.length; i++) {
			if(cc==""){
					cc+=selected[i]['samplecode'];
			}
			else{
				cc+=","+selected[i]['samplecode'];
			}
		}//for
		var _dialog =  window.top.$('<div id ="role-dlg" style="padding:0px;">'
				+'<table width="100%" border="1" align="center" class="grid">'
				+'<tr>'
				+'<td  align="left" class="Main_Tab_Style_title" width="100px">采样数量:</td>'
				+'<td  align="left" class="Main_Tab_Style_Content" width="150px">'
				+'<input id="saplecount" name="saplecount"  class="TextBox grkj-validate" style="width: 150px;height:20px"'
				+'validateParam="{type:\'int\',required:\'true\',message:\'请输入数字！\'}"/>'
				+'</td>'
				+'</tr>'
				+'</table>'
				+'</div>').appendTo(window.top.document.body);
		_dialog.dialog({
			title:'采样数量',
			autoOpen:false,
			modal:true,
			closed:true,
			width:'300',
			height:'100',
			buttons:[{
				text:'确定',
				iconCls:'icon-save',
				handler:function(){
				// $("#searchFrame",top.document.body).contents().find
				var saplecount=$(window.top.document).find("#saplecount").val();
				var objs = $(window.top.document).find(".grkj-validate");
				if(!saveCheck(objs)){
					$(window.top.document).find(":input").focus();
					alert("数据输入不符合格式，请查看红色边框的输入框的输入提示！");
					return false;
				}else{
						$.post(rootPath +"/monitorproject/samperegister/samperegister!saveMonitorinfo.action",{samplingcount:saplecount,samplecode:cc},function(data){
							if(data=='success'){
								//alert('成功');
								$("#samplelist").datagrid('reload');
							}else{
								alert('失败');
							}
						});//post
						_dialog.dialog('close');
					}//else
				}//function
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
}
//批量修改采样名字
function samplenameAll(){
	var selected=$("#samplelist").datagrid('getSelections');
	if(selected==null || selected.length< 1){
		
		alert('请至少选择一条记录！');
	}else{
		var cc=[];
		for ( var i = 0; i < selected.length; i++) {
			if(cc==""){
					cc+=selected[i]['samplecode'];
			}
			else{
				cc+=","+selected[i]['samplecode'];
			}
		}//for
		var _dialog =  window.top.$('<div id ="role-dlg" style="padding:0px;">'
				+'<table width="100%" border="1" align="center" class="grid">'
				+'<tr>'
				+'<td  align="left" class="Main_Tab_Style_title" width="100px">样品名称:</td>'
				+'<td  align="left" class="Main_Tab_Style_Content" width="150px">'
				+'<input id="samplename" name="samplename"  class="TextBox" style="width: 150px;height:20px"'// grkj-validate
				+'"/>'//validateParam="{type:\'string\',required:\'true\',message:\'请输入样品名称！\'}
				+'</td>'
				+'</tr>'
				+'</table>'
				+'</div>').appendTo(window.top.document.body);
		_dialog.dialog({
			title:'样品名称',
			autoOpen:false,
			modal:true,
			closed:true,
			width:'300',
			height:'100',
			buttons:[{
				text:'确定',
				iconCls:'icon-save',
				handler:function(){
				// $("#searchFrame",top.document.body).contents().find
				var samplename=$(window.top.document).find("#samplename").val();
				if(samplename==null){
					samplename="";
				}
				/*var objs = $(window.top.document).find(".grkj-validate");
				if(!saveCheck(objs)){
					$(window.top.document).find(":input").focus();
					alert("数据输入不符合格式，请查看红色边框的输入框的输入提示！");
					return false;
				}else{*/
						$.post(rootPath +"/monitorproject/samperegister/samperegister!saveMonitorinfo.action",{samplename:samplename,samplecode:cc},function(data){
							if(data=='success'){
								//alert('成功');
								$("#samplelist").datagrid('reload');
							}else{
								alert('失败');
							}
						});//post
						_dialog.dialog('close');
				//}//else
				}//function
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
}
function samplingdepthAll(){
	var selected=$("#samplelist").datagrid('getSelections');
	if(selected==null || selected.length< 1){
		
		alert('请至少选择一条记录！');
	}else{
		var cc=[];
		for ( var i = 0; i < selected.length; i++) {
			if(cc==""){
					cc+=selected[i]['samplecode'];
			}
			else{
				cc+=","+selected[i]['samplecode'];
			}
		}//for
		var _dialog =  window.top.$('<div id ="role-dlg" style="padding:0px;">'
				+'<table width="100%" border="1" align="center" class="grid">'
				+'<tr>'
				+'<td  align="left" class="Main_Tab_Style_title" width="100px">采样深度:</td>'
				+'<td  align="left" class="Main_Tab_Style_Content" width="150px">'
				+'<input id="samplingdepth" name="samplingdepth"  class="TextBox" style="width: 150px;height:20px"'// grkj-validate
				+'"/>'//validateParam="{type:\'string\',required:\'true\',message:\'请输入样品名称！\'}
				+'</td>'
				+'</tr>'
				+'</table>'
				+'</div>').appendTo(window.top.document.body);
		_dialog.dialog({
			title:'采样深度',
			autoOpen:false,
			modal:true,
			closed:true,
			width:'300',
			height:'100',
			buttons:[{
				text:'确定',
				iconCls:'icon-save',
				handler:function(){
				// $("#searchFrame",top.document.body).contents().find
				var samplingdepth=$(window.top.document).find("#samplingdepth").val();
				if(samplingdepth==null){
					samplingdepth="";
				}
				/*var objs = $(window.top.document).find(".grkj-validate");
				if(!saveCheck(objs)){
					$(window.top.document).find(":input").focus();
					alert("数据输入不符合格式，请查看红色边框的输入框的输入提示！");
					return false;
				}else{*/
						$.post(rootPath +"/monitorproject/samperegister/samperegister!saveMonitorinfo.action",{samplingdepth:samplingdepth,samplecode:cc},function(data){
							if(data=='success'){
								//alert('成功');
								$("#samplelist").datagrid('reload');
							}else{
								alert('失败');
							}
						});//post
						_dialog.dialog('close');
				//}//else
				}//function
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
}

function samplecolorAll(){
	var selected=$("#samplelist").datagrid('getSelections');
	if(selected==null || selected.length< 1){
		
		alert('请至少选择一条记录！');
	}else{
		var cc=[];
		for ( var i = 0; i < selected.length; i++) {
			if(cc==""){
					cc+=selected[i]['samplecode'];
			}
			else{
				cc+=","+selected[i]['samplecode'];
			}
		}//for
		var _dialog =  window.top.$('<div id ="role-dlg" style="padding:0px;">'
				+'<table width="100%" border="1" align="center" class="grid">'
				+'<tr>'
				+'<td  align="left" class="Main_Tab_Style_title" width="100px">样品颜色:</td>'
				+'<td  align="left" class="Main_Tab_Style_Content" width="150px">'
				+'<input id="samplecolor" name="samplecolor"  class="TextBox" style="width: 150px;height:20px"'// grkj-validate
				+'"/>'//validateParam="{type:\'string\',required:\'true\',message:\'请输入样品名称！\'}
				+'</td>'
				+'</tr>'
				+'</table>'
				+'</div>').appendTo(window.top.document.body);
		_dialog.dialog({
			title:'样品颜色',
			autoOpen:false,
			modal:true,
			closed:true,
			width:'300',
			height:'100',
			buttons:[{
				text:'确定',
				iconCls:'icon-save',
				handler:function(){
				// $("#searchFrame",top.document.body).contents().find
				var samplecolor=$(window.top.document).find("#samplecolor").val();
				if(samplecolor==null){
					samplecolor="";
				}
				/*var objs = $(window.top.document).find(".grkj-validate");
				if(!saveCheck(objs)){
					$(window.top.document).find(":input").focus();
					alert("数据输入不符合格式，请查看红色边框的输入框的输入提示！");
					return false;
				}else{*/
						$.post(rootPath +"/monitorproject/samperegister/samperegister!saveMonitorinfo.action",{samplecolor:samplecolor,samplecode:cc},function(data){
							if(data=='success'){
								//alert('成功');
								$("#samplelist").datagrid('reload');
							}else{
								alert('失败');
							}
						});//post
						_dialog.dialog('close');
				//}//else
				}//function
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
}
function samplehumidityAll(){
	var selected=$("#samplelist").datagrid('getSelections');
	if(selected==null || selected.length< 1){
		
		alert('请至少选择一条记录！');
	}else{
		var cc=[];
		for ( var i = 0; i < selected.length; i++) {
			if(cc==""){
					cc+=selected[i]['samplecode'];
			}
			else{
				cc+=","+selected[i]['samplecode'];
			}
		}//for
		var _dialog =  window.top.$('<div id ="role-dlg" style="padding:0px;">'
				+'<table width="100%" border="1" align="center" class="grid">'
				+'<tr>'
				+'<td  align="left" class="Main_Tab_Style_title" width="100px">样品湿度:</td>'
				+'<td  align="left" class="Main_Tab_Style_Content" width="150px">'
				+'<input id="samplehumidity" name="samplehumidity"  class="TextBox" style="width: 150px;height:20px"'// grkj-validate
				+'"/>'//validateParam="{type:\'string\',required:\'true\',message:\'请输入样品名称！\'}
				+'</td>'
				+'</tr>'
				+'</table>'
				+'</div>').appendTo(window.top.document.body);
		_dialog.dialog({
			title:'样品湿度',
			autoOpen:false,
			modal:true,
			closed:true,
			width:'300',
			height:'100',
			buttons:[{
				text:'确定',
				iconCls:'icon-save',
				handler:function(){
				// $("#searchFrame",top.document.body).contents().find
				var samplehumidity=$(window.top.document).find("#samplehumidity").val();
				if(samplehumidity==null){
					samplehumidity="";
				}
				/*var objs = $(window.top.document).find(".grkj-validate");
				if(!saveCheck(objs)){
					$(window.top.document).find(":input").focus();
					alert("数据输入不符合格式，请查看红色边框的输入框的输入提示！");
					return false;
				}else{*/
						$.post(rootPath +"/monitorproject/samperegister/samperegister!saveMonitorinfo.action",{samplehumidity:samplehumidity,samplecode:cc},function(data){
							if(data=='success'){
								//alert('成功');
								$("#samplelist").datagrid('reload');
							}else{
								alert('失败');
							}
						});//post
						_dialog.dialog('close');
				//}//else
				}//function
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
}
function samplegrainAll(){
	var selected=$("#samplelist").datagrid('getSelections');
	if(selected==null || selected.length< 1){
		
		alert('请至少选择一条记录！');
	}else{
		var cc=[];
		for ( var i = 0; i < selected.length; i++) {
			if(cc==""){
					cc+=selected[i]['samplecode'];
			}
			else{
				cc+=","+selected[i]['samplecode'];
			}
		}//for
		var _dialog =  window.top.$('<div id ="role-dlg" style="padding:0px;">'
				+'<table width="100%" border="1" align="center" class="grid">'
				+'<tr>'
				+'<td  align="left" class="Main_Tab_Style_title" width="100px">样品质地:</td>'
				+'<td  align="left" class="Main_Tab_Style_Content" width="150px">'
				+'<input id="samplegrain" name="samplegrain"  class="TextBox" style="width: 150px;height:20px"'// grkj-validate
				+'"/>'//validateParam="{type:\'string\',required:\'true\',message:\'请输入样品名称！\'}
				+'</td>'
				+'</tr>'
				+'</table>'
				+'</div>').appendTo(window.top.document.body);
		_dialog.dialog({
			title:'样品质地',
			autoOpen:false,
			modal:true,
			closed:true,
			width:'300',
			height:'100',
			buttons:[{
				text:'确定',
				iconCls:'icon-save',
				handler:function(){
				// $("#searchFrame",top.document.body).contents().find
				var samplegrain=$(window.top.document).find("#samplegrain").val();
				if(samplegrain==null){
					samplegrain="";
				}
				/*var objs = $(window.top.document).find(".grkj-validate");
				if(!saveCheck(objs)){
					$(window.top.document).find(":input").focus();
					alert("数据输入不符合格式，请查看红色边框的输入框的输入提示！");
					return false;
				}else{*/
						$.post(rootPath +"/monitorproject/samperegister/samperegister!saveMonitorinfo.action",{samplegrain:samplegrain,samplecode:cc},function(data){
							if(data=='success'){
								//alert('成功');
								$("#samplelist").datagrid('reload');
							}else{
								alert('失败');
							}
						});//post
						_dialog.dialog('close');
				//}//else
				}//function
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
}
function welldepthAll(){
	var selected=$("#samplelist").datagrid('getSelections');
	if(selected==null || selected.length< 1){
		
		alert('请至少选择一条记录！');
	}else{
		var cc=[];
		for ( var i = 0; i < selected.length; i++) {
			if(cc==""){
					cc+=selected[i]['samplecode'];
			}
			else{
				cc+=","+selected[i]['samplecode'];
			}
		}//for
		var _dialog =  window.top.$('<div id ="role-dlg" style="padding:0px;">'
				+'<table width="100%" border="1" align="center" class="grid">'
				+'<tr>'
				+'<td  align="left" class="Main_Tab_Style_title" width="100px">井深:</td>'
				+'<td  align="left" class="Main_Tab_Style_Content" width="150px">'
				+'<input id="welldepth" name="welldepth"  class="TextBox" style="width: 150px;height:20px"'// grkj-validate
				+'"/>'//validateParam="{type:\'string\',required:\'true\',message:\'请输入样品名称！\'}
				+'</td>'
				+'</tr>'
				+'</table>'
				+'</div>').appendTo(window.top.document.body);
		_dialog.dialog({
			title:'井深',
			autoOpen:false,
			modal:true,
			closed:true,
			width:'300',
			height:'100',
			buttons:[{
				text:'确定',
				iconCls:'icon-save',
				handler:function(){
				// $("#searchFrame",top.document.body).contents().find
				var welldepth=$(window.top.document).find("#welldepth").val();
				if(welldepth==null){
					welldepth="";
				}
				/*var objs = $(window.top.document).find(".grkj-validate");
				if(!saveCheck(objs)){
					$(window.top.document).find(":input").focus();
					alert("数据输入不符合格式，请查看红色边框的输入框的输入提示！");
					return false;
				}else{*/
						$.post(rootPath +"/monitorproject/samperegister/samperegister!saveMonitorinfo.action",{welldepth:welldepth,samplecode:cc},function(data){
							if(data=='success'){
								//alert('成功');
								$("#samplelist").datagrid('reload');
							}else{
								alert('失败');
							}
						});//post
						_dialog.dialog('close');
				//}//else
				}//function
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
}
function descriptionAll(){
	var selected=$("#samplelist").datagrid('getSelections');
	if(selected==null || selected.length< 1){
		
		alert('请至少选择一条记录！');
	}else{
		var cc=[];
		for ( var i = 0; i < selected.length; i++) {
			if(cc==""){
					cc+=selected[i]['samplecode'];
			}
			else{
				cc+=","+selected[i]['samplecode'];
			}
		}//for
		var _dialog =  window.top.$('<div id ="role-dlg" style="padding:0px;">'
				+'<table width="100%" border="1" align="center" class="grid">'
				+'<tr>'
				+'<td  align="left" class="Main_Tab_Style_title" width="100px">备注:</td>'
				+'<td  align="left" class="Main_Tab_Style_Content" width="150px">'
				+'<input id="description" name="description"  class="TextBox" style="width: 150px;height:20px"'// grkj-validate
				+'"/>'//validateParam="{type:\'string\',required:\'true\',message:\'请输入样品名称！\'}
				+'</td>'
				+'</tr>'
				+'</table>'
				+'</div>').appendTo(window.top.document.body);
		_dialog.dialog({
			title:'备注',
			autoOpen:false,
			modal:true,
			closed:true,
			width:'300',
			height:'100',
			buttons:[{
				text:'确定',
				iconCls:'icon-save',
				handler:function(){
				// $("#searchFrame",top.document.body).contents().find
				var description=$(window.top.document).find("#description").val();
				if(description==null){
					description="";
				}
				/*var objs = $(window.top.document).find(".grkj-validate");
				if(!saveCheck(objs)){
					$(window.top.document).find(":input").focus();
					alert("数据输入不符合格式，请查看红色边框的输入框的输入提示！");
					return false;
				}else{*/
						$.post(rootPath +"/monitorproject/samperegister/samperegister!saveMonitorinfo.action",{description:description,samplecode:cc},function(data){
							if(data=='success'){
								//alert('成功');
								$("#samplelist").datagrid('reload');
							}else{
								alert('失败');
							}
						});//post
						_dialog.dialog('close');
				//}//else
				}//function
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
}
//样品数量
/*function sampCount(rowIndex,value,id){
	$("#sampcount"+rowIndex).html("<input id='sampct' type='text' value='"+value+
				"'class='TextBox' style='width:60px;' onkeyup='value=value.replace(/[^\\d\]/g,\"\")' onblur=\"sampCountOnBlur('"+id+"','"+value+"','"+rowIndex+"')\"/>");
	$("#sampct").focus();
}
//样品数量失焦事件
function sampCountOnBlur(id,value,rowIndex){
	var sampct=$("#sampct").val();
	if(value!=sampct&&sampct!=""){
	$.post(rootPath +"/monitorproject/samperegister/samperegister!saveMonitorinfo.action",{samplingcount:sampct,samplecode:id},function(data){
		if(data=='success'){
			//alert('成功');
			$("#samplelist").datagrid('reload');
		}else{
			alert('失败');
		}
	});
	}else{
		$("#sampcount"+rowIndex).html(value);
	}
}*/
//批量修改样品形状
function sampRisticAll(){
	var selected=$("#samplelist").datagrid('getSelections');
	if(selected==null || selected.length< 1){
		
		alert('请至少选择一条记录！');
	}else{
		var cc=[];
		for ( var i = 0; i < selected.length; i++) {
			if(cc==""){
					cc+=selected[i]['samplecode'];
			}
			else{
				cc+=","+selected[i]['samplecode'];
			}
		}//for
		sampRistic(cc);
	}
}

//样品特征
function sampRistic(id){
	var _dialog =  window.top.$('<div id ="dlg" style="padding:0px;">'
			+'<table width="100%"border="1" align="center" class="grid">'
			+'<tr>'
		//	+'<td  align="left" class="Main_Tab_Style_title" width="100px">：</td>'
			+'<td  align="left" class="Main_Tab_Style_Content">'
			+'<select id="samplefeature" name="samplefeature" class="TextBox" style="width: 100%;"/>'
			+'</td>'
			+'</tr>'
			+'</table>'
			+'</div>').appendTo(window.top.document.body);
	getSampleFeature();//加载数据
	_dialog.dialog({
		title:'样品特征',
		autoOpen:false,
		modal:true,
		closed:true,
		width:'230',
		height:'100',
		buttons:[{
			text:'确定',
			iconCls:'icon-save',
			handler:function(){
			var saplecapl=$(window.top.document).find("#samplefeature").val();
			$.post(rootPath +"/monitorproject/samperegister/samperegister!saveMonitorinfo.action",{charaderistic:saplecapl,samplecode:id},function(data){
				if(data=='success'){
					//alert('成功');
					$("#samplelist").datagrid('reload');
				}else{
					alert('失败');
				}
			});//post
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
//获取样品特征
function getSampleFeature(){
	$.ajax( {
		type : 'post',
		url : rootPath +'/samplereceive/samplereceive!getSampleFeature.action',//给该url一个时间戳~~这样就必须每次从服务器读取数据,
		data: "monitortypeid="+monitortypeid,
		success : function(data) {
			var vData = eval("(" + data + ")");
			var lList = "<option value=''>---请选择---</option>";
			//遍历json数据  
			jQuery.each(vData, function(i, n) {
				lList += "<option value=" + n.samplefeatureid + ">" + n.samplefeaturename	+ "</option>";
			});				
			//绑定数据到select中
			$('#samplefeature',window.top.document).append(lList);
		}
	});
}
//样品特征失焦事件
function sampRisticOnBlur(id,value,rowIndex){
	var samprc=$("#samprc").val();
	if(samprc!=value){
		$.post(rootPath +"/monitorproject/samperegister/samperegister!saveMonitorinfo.action",{charaderistic:samprc,samplecode:id},function(data){
			if(data=='success'){
				//alert('成功');
				$("#samplelist").datagrid('reload');
			}else{
				alert('失败');
			}
		});
		}else{
			$("#sampristic"+rowIndex).html(value);
		}
	
}
//批量采样开始日期
function sampStartDateAll(){
	var selected=$("#samplelist").datagrid('getSelections');
	if(selected==null || selected.length< 1){
		
		alert('请至少选择一条记录！');
	}else{
		var cc=[];
		for ( var i = 0; i < selected.length; i++) {
			if(cc==""){
					cc+=selected[i]['samplecode'];
			}
			else{
				cc+=","+selected[i]['samplecode'];
			}
		}//for
		sampStartDate("",cc);
	}
}

//采样开始日期
function sampStartDate(value,id){
	if(value==null){value="";}
	/* var _dialog =  window.top.$('<div id ="role-dlg" style="padding:0px;">'
			+'<table width="100%" border="1" align="center" class="grid">'
			+'<tr>'
			+'<td  align="left" class="Main_Tab_Style_title" width="100px">采样开始日期:</td>'
			+'<td  align="left" class="Main_Tab_Style_Content" width="150px">'
			+'<input id="startDate" name="startDate" class="Wdate" onFocus="showDataTimeDailog(\'yyyy-MM-dd\')" style="width: 150px" value="'+value+'"/>'
			+'</td>'
			+'</tr>'
			+'</table>'
			+'</div>').appendTo(window.top.document.body);*/
	var url = rootPath + "/monitorproject/samperegister/samperegister!toMediData.action";
	var _dialog = window.top
				.$('<div id="monitorDialog"  style="padding:0px;"><iframe id="monitoringFrame" width="100%" height="100%" frameborder="0" scrolling="no" src=' + url + '></iframe></div>')
				.appendTo(window.top.document.body);
	//loadNowStarTime();
	_dialog.dialog({
		title:'采样开始日期',
		autoOpen:false,
		modal:true,
		closed:true,
		width:'300',
		height:'100',
		buttons:[{
			text:'确定',
			iconCls:'icon-save',
			handler:function(){
			var startDate=$(window.top.document).find("#startDate").val();
			/* $.post(rootPath +"/monitorproject/samperegister/samperegister!saveMonitorinfo.action",{startDate:startDate,samplecode:id},function(data){
				if(data=='success'){
					alert('成功');
					$("#samplelist").datagrid('reload');
				}else{
					alert('失败');
				}
			})
				_dialog.dialog('close');
			*/
			 var objs = $("#monitoringFrame",top.document.body).contents().find(".grkj-validate");
					if(!saveCheck(objs)){
						$("#monitoringFrame",top.document.body).contents().find(":input").focus();
						alert("数据输入不符合格式，请查看红色边框的输入框的输入提示！");
						return false;
					}				
				var sampingdata = $("#monitoringFrame",top.document.body).contents().find("#sampingdata").val();					
				$.post(rootPath +"/monitorproject/samperegister/samperegister!saveMonitorinfo.action",{startDate:sampingdata,samplecode:id},function(data){
					if(data=='success'){
						//alert('成功');
						$("#samplelist").datagrid('reload');
						//$("#samplelist").datagrid('reload');
					}else{
						alert('失败');
					}
				});
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
//批量开始时间
function sampStartTimeAll(){
	var selected=$("#samplelist").datagrid('getSelections');
	if(selected==null || selected.length< 1){
		
		alert('请至少选择一条记录！');
	}else{
		var cc=[];
		for ( var i = 0; i < selected.length; i++) {
			if(cc==""){
					cc+=selected[i]['samplecode'];
			}
			else{
				cc+=","+selected[i]['samplecode'];
			}
		}//for
		sampStartTime("",cc);
	}
}
//采样开始时间

function sampStartTime(value,id){
	if(value==null){value="";}
	/* var _dialog =  window.top.$('<div id ="role-dlg" style="padding:0px;">'
			+'<table width="100%" border="1" align="center" class="grid">'
			+'<tr>'
			+'<td  align="left" class="Main_Tab_Style_title" width="100px">采样开始时间:</td>'
			+'<td  align="left" class="Main_Tab_Style_Content" width="150px">'
			+'<input id="startTime" name="startTime" class="Wdate" onFocus="showDataTimeDailog(\'HH:mm\')" style="width: 150px" value="'+value+'"/>'
			+'</td>'
			+'</tr>'
			+'</table>'
			+'</div>').appendTo(window.top.document.body);*/
	var url = rootPath + "/monitorproject/samperegister/samperegister!toMeditime.action";
	var _dialog = window.top
				.$('<div id="monitorDialog"  style="padding:0px;"><iframe id="samplingTimeFrame" width="100%" height="100%" frameborder="0" scrolling="no" src=' + url + '></iframe></div>')
				.appendTo(window.top.document.body);
	
	_dialog.dialog({
		title:'采样开始时间',
		autoOpen:false,
		modal:true,
		closed:true,
		width:'300',
		height:'150',
		buttons:[{
			text:'确定',
			iconCls:'icon-save',
			handler:function(){
			/* var startTime=$(window.top.document).find("#startTime").val();
			$.post(rootPath +"/monitorproject/samperegister/samperegister!saveMonitorinfo.action",{startTime:startTime,samplecode:id},function(data){
				if(data=='success'){
					alert('成功');
					$("#samplelist").datagrid('reload');
				}else{
					alert('失败');
				}
			})*/
			 var objs = $("#samplingTimeFrame",top.document.body).contents().find(".grkj-validate");
					if(!saveCheck(objs)){
						$("#samplingTimeFrame",top.document.body).contents().find(":input").focus();
						alert("数据输入不符合格式，请查看红色边框的输入框的输入提示！");
						return false;
					}				
				var sampingtime = $("#samplingTimeFrame",top.document.body).contents().find("#sampingtime").val();	
				var startspacetime = $("#samplingTimeFrame",top.document.body).contents().find("#spacetime").val();	
				$.post(rootPath +"/monitorproject/samperegister/samperegister!saveMonitorinfo.action",{startTime:sampingtime,samplecode:id,spacetime:startspacetime},function(data){
					if(data=='success'){
						//alert('成功');
						$("#samplelist").datagrid('reload');
						//$("#samplelist").datagrid('reload');
					}else{
						alert('失败');
					}
				});
			
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
//批量结束日期
/*function loadNowEndTime(){
	var entrustdateVal = $("#sampingEngDataFrame",top.document.body).contents().find("#sampingdata").val();
	if(entrustdateVal==""){
		var ym = new Date();
		var strYear = ym.getFullYear();
		var strMonth = ym.getMonth()+1;
		var strDate = ym.getDate();
		var temp = strYear+"-"+(strMonth<10? "0"+strMonth:strMonth)+"-"+(strDate<10? "0"+strDate:strDate);
	
		$("#sampingEngDataFrame",top.document.body).contents().find("#sampingdata").val(temp);
	}
}*/
function sampEndDateAll(){
	var selected=$("#samplelist").datagrid('getSelections');
	if(selected==null || selected.length< 1){
		alert('请至少选择一条记录！');
	}else{
		var cc=[];
		for ( var i = 0; i < selected.length; i++) {
			if(cc==""){
					cc+=selected[i]['samplecode'];
			}
			else{
				cc+=","+selected[i]['samplecode'];
			}
		}//for
		sampEndDate("",cc);
	}
}

//采样结束日期
function sampEndDate(value,id){
	if(value==null){value="";}
	/* var _dialog =  window.top.$('<div id ="role-dlg" style="padding:0px;">'
			+'<table width="100%" border="1" align="center" class="grid">'
			+'<tr>'
			+'<td  align="left" class="Main_Tab_Style_title" width="100px">采样结束日期:</td>'
			+'<td  align="left" class="Main_Tab_Style_Content" width="150px">'
			+'<input id="endDate" name="endDate" class="Wdate" onFocus="showDataTimeDailog(\'yyyy-MM-dd\')" style="width: 150px" value="'+value+'"/>'
			+'</td>'
			+'</tr>'
			+'</table>'
			+'</div>').appendTo(window.top.document.body);*/
	
	var url = rootPath + "/monitorproject/samperegister/samperegister!toMediData.action";
	var _dialog = window.top
				.$('<div id="monitorDialog"  style="padding:0px;"><iframe id="sampingEngDataFrame" width="100%" height="100%" frameborder="0" scrolling="no" src=' + url + '></iframe></div>')
				.appendTo(window.top.document.body);
	
	//loadNowEndTime();
	_dialog.dialog({
		title:'采样结束日期',
		autoOpen:false,
		modal:true,
		closed:true,
		width:'300',
		height:'100',
		buttons:[{
			text:'确定',
			iconCls:'icon-save',
			handler:function(){
			/* var endDate=$(window.top.document).find("#endDate").val();
				$.post(rootPath +"/monitorproject/samperegister/samperegister!saveMonitorinfo.action",{endDate:endDate,samplecode:id},function(data){
				if(data=='success'){
					alert('成功');
					$("#samplelist").datagrid('reload');
				}else{
					alert('失败');
				}
			});*/
			var objs = $("#sampingEngDataFrame",top.document.body).contents().find(".grkj-validate");
					if(!saveCheck(objs)){
						$("#sampingEngDataFrame",top.document.body).contents().find(":input").focus();
						alert("数据输入不符合格式，请查看红色边框的输入框的输入提示！");
						return false;
					}				
				var sampingdata = $("#sampingEngDataFrame",top.document.body).contents().find("#sampingdata").val();					
				$.post(rootPath +"/monitorproject/samperegister/samperegister!saveMonitorinfo.action",{endDate:sampingdata,samplecode:id},function(data){
					if(data=='success'){
						//alert('成功');
						$("#samplelist").datagrid('reload');
						//$("#samplelist").datagrid('reload');
					}else{
						alert('失败');
					}
				});
			
			
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
//批量结束时间
function sampEndTimeAll(){
	var selected=$("#samplelist").datagrid('getSelections');
	if(selected==null || selected.length< 1){
		
		alert('请至少选择一条记录！');
	}else{
		//samplingenddate
		for ( var i = 0; i < selected.length; i++) {
			if(selected[i]['samplingenddate']==''){
				alert("请先填写结束日期！");
				return false;
			}			
		}
		var cc=[];
		for ( var i = 0; i < selected.length; i++) {
			if(cc==""){
					cc+=selected[i]['samplecode'];
			}
			else{
				cc+=","+selected[i]['samplecode'];
			}
		}//for
		sampEndTime("",cc);
		
	}
}
//采样结束时间
function sampEndTime(value,id){//alert(value+"___"+id);
	if(value==null){value="";}
	/* var _dialog =  window.top.$('<div id ="role-dlg" style="padding:0px;">'
			+'<table width="100%" border="1" align="center" class="grid">'
			+'<tr>'
			+'<td  align="left" class="Main_Tab_Style_title" width="100px">采样结束时间:</td>'
			+'<td  align="left" class="Main_Tab_Style_Content" width="150px">'
			+'<input id="endTime" name="endTime" class="Wdate" onFocus="showDataTimeDailog(\'HH:mm\')" style="width: 150px" value="'+value+'"/>'
			+'</td>'
			+'</tr>'
			+'</table>'
			+'</div>').appendTo(window.top.document.body);*/
	var url = rootPath + "/monitorproject/samperegister/samperegister!toMeditime.action";
	var _dialog = window.top
				.$('<div id="monitorDialog"  style="padding:0px;"><iframe id="samplingendTimeFrame" width="100%" height="100%" frameborder="0" scrolling="no" src=' + url + '></iframe></div>')
				.appendTo(window.top.document.body);
	_dialog.dialog({
		title:'采样结束时间',
		autoOpen:false,
		modal:true,
		closed:true,
		width:'300',
		height:'150',
		buttons:[{
			text:'确定',
			iconCls:'icon-save',
			handler:function(){
			/* var endTime=$(window.top.document).find("#endTime").val();
				$.post(rootPath +"/monitorproject/samperegister/samperegister!saveMonitorinfo.action",{endTime:endTime,samplecode:id},function(data){
				if(data=='success'){
					alert('成功');
					$("#samplelist").datagrid('reload');
				}else{
					alert('失败');
				}
			})*/
			 var objs = $("#samplingendTimeFrame",top.document.body).contents().find(".grkj-validate");
					if(!saveCheck(objs)){
						$("#samplingendTimeFrame",top.document.body).contents().find(":input").focus();
						alert("数据输入不符合格式，请查看红色边框的输入框的输入提示！");
						return false;
					}				
				var sampingtime = $("#samplingendTimeFrame",top.document.body).contents().find("#sampingtime").val();
				var endspacetime = $("#samplingendTimeFrame",top.document.body).contents().find("#spacetime").val();	
				$.post(rootPath +"/monitorproject/samperegister/samperegister!saveMonitorinfo.action",{endTime:sampingtime,samplecode:id,spacetime:endspacetime },function(data){
					if(data=='success'){
						//alert('成功');
						$("#samplelist").datagrid('reload');
						//$("#samplelist").datagrid('reload');
					}else{
						alert('失败');
					}
				});
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

//加载项目信息
function initIteminfo(projectcode,monitorpointid,samplecode){
	$('#itemlist').datagrid({
		nowrap: false,
		striped: true,
		collapsible:true,
		url:rootPath +'/monitorproject/samperegister/samperegister!toItemfoList.action?samplecode='+samplecode+'&projectcode='+projectcode+'&monitorpointid='+monitorpointid, 
		fit:true,
		fitColumns : true,
		//scrollbarSize:0,
		remoteSort: false,
		singleSelect:true,	
		rownumbers:true,
		iconCls:"icon-edit",
		idField:"sampleitemtestid",
		columns:[[
				{field:'itemname',title:'监测项目', width:100,align:"center"},
				{field:'itemmethod',title:'监测方法', width:200,align:"center"},
				//{field:'samplenum',title:'采样量', width:60,align:"center"},	
				//{field:'samplecontainer',title:'采样容器', width:80,align:"center"},
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

//批量选择采样人
function selectSamperAll(){
	var selected=$("#samplelist").datagrid('getSelections');
	//alert(selected.length);
	if(selected==null || selected.length< 1){
		
		alert('请至少选择一条记录！');
	}else{
		var cc=[];
		for ( var i = 0; i < selected.length; i++) {
			if(cc==""){
					cc+=selected[i]['samplecode'];
			}
			else{
				cc+=","+selected[i]['samplecode'];
			}
		}
		selectSampUser(cc);
	}
}
//选择采样人
function selectSampUser(samplecode){
	//var userid=$("#userid").val();
	//var username=$("#username").val();
	var url =rootPath +"/monitorproject/samparrange/samparrange!toSampleUser.action?departid="+departid+"&groupid="+groupid;
	var _dialog =  window.top.$('	<div id ="role-dlg" style="padding:0px;"><iframe id="selectFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
	_dialog.dialog({
		title:'采样人',
		autoOpen:false,
		modal:true,
		closed:true,
		width:'630',
		height:'530',
		buttons:[{
			text:'确定',
			iconCls:'icon-save',
			handler:function(){
				var value=$("#selectFrame",top.document.body).contents().find("#selectedUser").val();
				var valueid=$("#selectFrame",top.document.body).contents().find("#selectedUserid").val();
				if(valueid!=""&&valueid!=null){
					$.post(rootPath +"/monitorproject/samperegister/samperegister!saveMonitorinfo.action",{samplingpersonid:valueid,samplecode:samplecode},function(data){
						if(data=='success'){
							alert('成功');
							$("#samplelist").datagrid('reload');
						}else{
							alert('失败');
						}
					});
					_dialog.dialog('close');
				}else{
					alert("采样人不能为空！");
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
//***************************************修改采样列表中的字段结束***************************************//




//***************************************增加质控样***************************************//
//添加平行样    明码 密码
function pingxing(type){
	var selected=$("#samplelist").datagrid("getSelected");
	var samplecode=selected.samplecode;
	var projectcode=selected.projectcode;
	var monitorpointid=selected.monitorpointid;
	//var url =rootPath +"/monitorproject/samperegister/samperegister!toS.action?samplecode="+samplecode+"&projectcode="+projectcode+"&monitorpointid="+monitorpointid;
	var _dialog =  window.top.$('	<div id ="role-dlg" style="padding:0px;"><table id="addsampletype"></table></div>').appendTo(window.top.document.body);
	//var _dialog =  window.top.$('<div id ="role-dlg" style="padding:0px;"><iframe id="selectFrames" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
	_dialog.dialog({
		title:'增加质控样品',
		autoOpen:false,
		modal:true,
		closed:true,
		width:'600',
		height:'400',
		buttons:[{
			text:'确定',
			iconCls:'icon-save',
			handler:function(){
				var selectsample=$("#samplelist").datagrid("getSelected");
				var selection=$(window.top.document).find("#addsampletype").datagrid("getSelections");
				var itemid=[];
				if(selection.length<=0||selection==null){
					alert("至少选择一个监测项目！");
				}else{
					for ( var i = 0; i < selection.length; i++) {
						if(itemid==""){
							itemid=selection[i]['itemid'];
						}else{
							itemid+=","+selection[i]['itemid'];
						}
					}
					$.post(rootPath +"/monitorproject/samperegister/samperegister!saveQualitySample.action",{projectid:projectid,itemid:itemid,samplecode:selectsample['samplecode'],type:type},function(data){
						if(data=='success'){
							alert('成功');
							//插入标签，是在此处进行 了保存后面，就执行插入标签的操作
							$("#samplelist").datagrid('reload');
						}else{
							alert('失败');
						}
					});
					_dialog.dialog('close');
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
	var myurl=rootPath +'/monitorproject/samperegister/samperegister!toItemfoList.action?samplecode='+samplecode+'&projectcode='+projectcode+'&monitorpointid='+monitorpointid;
	itemsmplediv(myurl);
		
}
//显示添加质控样品的项目信息列表
function itemsmplediv(myurl){
	$(window.top.document).find("#addsampletype").datagrid({
		nowrap: false,
		striped: true,
		collapsible:true,
		url:myurl, 
		fit:true,
		fitColumns : true,
		scrollbarSize:0,
		remoteSort: false,
		iconCls:"icon-edit",
		idField:"itemid",
		rownumbers:true,
		columns:[[
				{field:'itemname',title:'监测项目', width:200,align:"center"},
				{field:'sampleitemid',width:100,align:"center",title:'是否测试',
					formatter:function(value,rowData,rowIndex){
						return "<input type='checkbox' name='ceshi'/>"
					}
				},	
					{field:'isnowtest',title:'现场监测', width:100,align:"center",
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
		]],
		onSelect:function(rowIndex,rowData){
			var radios = $(window.top.document).find("input[name=ceshi]");
			$(radios[rowIndex]).attr("checked", true);
		},
		onUnselect:function(rowIndex,rowData){
			var radios = $(window.top.document).find("input[name=ceshi]");
			$(radios[rowIndex]).removeAttr("checked");
		}
	});
}


//添加空白样  全程空白样
function kongbai(type){
	var selected=$("#monitorinfolist").treegrid("getSelected");
	var projectcode=selected.projectcode;
	var projectpointid=selected.projectpointid;
	var monitorpointid=selected.monitorpointid;
	//var url =rootPath +"/monitorproject/samperegister/samperegister!toS.action?samplecode="+samplecode+"&projectcode="+projectcode+"&monitorpointid="+monitorpointid;
	var _dialog =  window.top.$('	<div id ="role-dlg" style="padding:0px;"><table id="addsampletype"></table></div>').appendTo(window.top.document.body);
	//var _dialog =  window.top.$('<div id ="role-dlg" style="padding:0px;"><iframe id="selectFrames" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
	_dialog.dialog({
		title:'增加质控样品',
		autoOpen:false,
		modal:true,
		closed:true,
		width:'600',
		height:'400',
		buttons:[{
			text:'确定',
			iconCls:'icon-save',
			handler:function(){
				var selectsample=$("#samplelist").datagrid("getSelected");
				var selection=$(window.top.document).find("#addsampletype").datagrid("getSelections");
				var itemid=[];
				if(selection.length<=0||selection==null){
					alert("至少选择一个监测项目！");
				}else{
					for ( var i = 0; i < selection.length; i++) {
						if(itemid==""){
							itemid=selection[i]['itemid'];
						}else{
							itemid+=","+selection[i]['itemid'];
						}
					}
					$.post(rootPath +"/monitorproject/samperegister/samperegister!saveKongSample.action",{projectid:projectid,itemid:itemid,projectpointid:projectpointid},function(data){
						if(data=='success'){
								//插入标签，是在此处进行 了保存后面，就执行插入标签的操作
							alert('成功');
							$("#samplelist").datagrid('reload');
						}else{
							alert('失败');
						}
					});
					_dialog.dialog('close');
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
	var myurl=rootPath +'/monitorproject/samperegister/samperegister!toItemfoMoniteList.action?projectcode='+projectcode+'&monitorpointid='+monitorpointid;
	itemsmplediv(myurl);
		
}
//删除质控样
function delzhikong(){
	var selectsample=$("#samplelist").datagrid("getSelected");
	if(window.confirm('是否删除？')){
		$.post(rootPath+"/monitorproject/samperegister/samperegister!delzhikong.action",{projectid:projectid,samplecode:selectsample.samplecode,qctypeid:selectsample.qcSampleTypeid},function(data){
			if(data=="success"){
				alert("成功！");
				$("#samplelist").datagrid("reload");
				
			}
		});
	}
}
//***************************************增加质控样***************************************//

//采样单
function samplebill(){
	var url =rootPath +"/monitorproject/samperegister/samperegister!showSamleBill.action?projectid="+projectid+"&isnowtest=true";
	var _dialog =  window.top.$('	<div id ="role-dlg" style="padding:0px;"><iframe id="samplingBillFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
	_dialog.dialog({
		title:'采样单',
		maximizable:true,
		autoOpen:false,
		modal:true,
		closed:true,
		width:'1000',
		height:'600',
		onClose:function(){
			_dialog.dialog("destroy");
			
		}
	});
	_dialog.dialog('open');
}
//示意图
function sketchmap(){
	var url =rootPath +"/monitorproject/sketchmap/projectpointsketchmap!toSketchmapList.action?projectcode="+projectcode;
	var _dialog =  window.top.$('	<div id ="role-dlg" style="padding:0px;"><iframe id="samplingBillFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
	_dialog.dialog({
		title:'测点示意图',
		maximizable:true,
		autoOpen:false,
		modal:true,
		closed:true,
		width:'830',
		height:'530',
		onClose:function(){
			_dialog.dialog("destroy");
			
		}
	});
	_dialog.dialog('open');
}



//*********************************流程中的提交开始*************************************//

//判断流程是否能够提交  能提交再调用submitpost方法
function submitSample(){
	var selected=$("#samplelist").datagrid('getSelections');
	if(selected==null || selected.length< 1){
		alert('请至少选择一条记录！');
	}else{
		var flag=0;
		var samplecode=[];
		for ( var i = 0; i < selected.length; i++) {
				if(samplecode==""){
					samplecode+=selected[i]['samplecode'];
				}else{
					samplecode+=","+selected[i]['samplecode'];
				}
				
		}//for
		if(flag==0){
			$.post(rootPath + "/monitorproject/samperegister/samperegister!getSampleSize.action",{samplecode:samplecode},function(data){
				if(data=="yes"){
						submitpost(samplecode);
				}else if(data=="sportecord"){
					alert("请填写所选类型的现场监测记录数据！");
				}else if(data=="no"){
					alert("请检查采样人，样品数量，开始日期，开始时间是否全部填写！");
				}else if(data=="envparamvalue"){
					alert("请填写所选类型的现场环境数据！");
				}else if(data=="starDistinct"){
					alert("同一点下采样时间不能一样！");
				}else {
					alert("提交失败！");
				}
			});
		}//if
	}
}
//流程单条提交post
function submitpost(samplecode){
	var projectcode=$("#procode").val();//项目编号
	var monitorpointid=$("#monitorpid").val();//监测点id
	var projectpointid=$("#propointid").val();//项目监测点id
		if(window.confirm('是否提交?')){
			$.post(rootPath +"/monitorproject/samperegister/samperegister!submitSampleFlow.action",{samplecode:samplecode,projectcode:projectcode,monitorpointid:monitorpointid,projectpointid:projectpointid},function(data){
				if(data=="sanmplesuccess"){
					alert('成功');
					$("#samplelist").datagrid('reload');
					$('#samplelist').datagrid('clearSelections');
					initIteminfo();
				}
				else if(data=="montiesuccess"){
					alert('成功');
					$(window.parent.document).find("#reloaddata").click();
					$("#monitorinfolist").treegrid('reload');
					idfild=[];
					$("#samplelist").datagrid('reload');
					$('#samplelist').datagrid('clearSelections');
					initIteminfo();
				}else if(data=="success"){
					alert('成功');
					$(window.parent.document).find("#reloaddata").click();
					$("#monitorinfolist").treegrid('reload');
					idfild=[];
					$("#samplelist").datagrid('reload');
					$('#samplelist').datagrid('clearSelections');
					initIteminfo();
				}else if(data=="noItem"){
					alert('存在没有监测点的样品 ');
				}else{
					alert("失败");
				}
			});
		}//if
}

//流程批量提交              判断流程是否能提交
function submitObjectAll(){
	var selected=$("#monitorinfolist").treegrid('getSelections');
	if(selected==null || selected.length< 1){
		alert('请至少选择一条记录！');
	}else{
		
		var flag=0;
		var projectponit=[];
		for ( var i = 0; i < selected.length; i++) {
				//判断此条数据是不是父节点
				if(selected[i]['projectpointid']!=""){
					if(projectponit==""){
							projectponit=selected[i]['projectpointid'];
					}
					else{
						projectponit+=","+selected[i]['projectpointid'];
					}
				}//if
		}
		
			//把监测类型赋予 id  monitorpointid~~begin
				//var selected = $('#monitorinfolist').treegrid('getSelections');
				var selcheck = new Array();
				if (selected != null && selected != "") {
						for ( var i = 0; i < selected.length; i++) {
							if(selected[i].projectpointid!=""){
								selcheck.push(selected[i].monitorpointtypeid);
							}
						}
					} 
					//为数组去重复
					var res=[],hash={};
					for(var i=0,elem;(elem=selcheck[i])!=null;i++){
						if(!hash[elem]){
							res.push(elem);
							hash[elem]=true;
						}
					}
			var	monitorpointtypeid=res;//监测点类型
			//把监测类型赋予 id  monitorpointid~~end
		if(flag==0){
		$.ajax( {
		type : 'POST',
		url :rootPath+"/monitorproject/samperegister/samperegister!getSubmitAllSampleSize.action?projectpointid="+projectponit+"&projectcode="+projectcode+"&monitorpointtypeid="+monitorpointtypeid+"&timeStamp="+new Date().getTime(),
		success : function(data) {  
				if(data=="yes"){
					submitPointSample(projectponit);
				}else if(data=="sportecord"){
					alert("请填写所选类型的现场监测记录数据！");
				}else if(data=="no"){
					alert("请检查采样人，样品数量，开始日期，开始时间是否全部填写！");
				}else if(data=="envparamvalue"){
					alert("请填写所选类型的现场环境数据！");
				}else if(data=="starDistinct"){
					alert("同一点下采样时间不能一样！");
				}else {
					alert("提交失败！");
				}
		},
		error:function(data){
			alert("失败");
		}
	});
		 /**
		$.post(rootPath + "/monitorproject/samperegister/samperegister!getSubmitAllSampleSize.action",{projectpointid:projectponit,projectcode:projectcode,monitorpointtypeid:monitorpointtypeid},function(msg){
			if(msg=="yes"){
				submitPointSample(projectponit);
			}else if(msg=="no"){
				alert("请检查采样人，样品数量，开始日期，开始时间是否全部填写！");
			}else {
				alert("存在没有监测项目的样品！");
			}
			
		});*/
		}//if
	}

}
//批量提交所调用的方法
function submitPointSample(projectponit){
		if(window.confirm('是否提交?')){
			var explorer = window.navigator.userAgent ;
					if (explorer.indexOf("MSIE") >= 0) {
							$(window.top.document.body).block({ 
							//jQuery.blockUI({ 
								message: "正在加载数据,请稍候...", 
						 		css: {
									color:'#000', 
									padding: '15px', 
									border:'2px solid #90dbfe',
									backgroundColor:'#fafafa'
								},
								overlayCSS: {
									opacity:'0.1' 
								}
							});
						}else{
							//$(window.top.document.body).block({ 
							jQuery.blockUI({ 
								message: "正在加载数据,请稍候...", 
						 		css: {
									color:'#000', 
									padding: '15px', 
									border:'2px solid #90dbfe',
									backgroundColor:'#fafafa'
								},
								overlayCSS: {
									opacity:'0.1' 
								} 
							});
						}//else
			$.post(rootPath +"/monitorproject/samperegister/samperegister!submitSampleFlowAll.action",{projectcode:projectcode,projectpointid:projectponit},function(data){
				//alert(data);
				if(data=="projectSucess"){
					alert('成功');
					var explorer = window.navigator.userAgent ;
							if (explorer.indexOf("MSIE") >= 0) {
								$(window.top.document.body).unblock(); 
							}else{
								jQuery.unblockUI();
							}
					$(window.parent.document).find("#reloaddata").click();
					$("#monitorinfolist").treegrid('reload');
					idfild=[];
					$("#samplelist").datagrid('reload');
					$('#samplelist').datagrid('clearSelections');
					initIteminfo();
				}else if(data=="monpointSucess"){
					alert('成功');
					var explorer = window.navigator.userAgent ;
					if (explorer.indexOf("MSIE") >= 0) {
						$(window.top.document.body).unblock(); 
					}else{
						jQuery.unblockUI();
					}
					$("#monitorinfolist").treegrid('reload');
					idfild=[];
					$("#samplelist").datagrid('reload');
					$('#samplelist').datagrid('clearSelections');
					initIteminfo();
				}else if(data=="noItem"){
					alert("存在没有监测项目的样品");
				}
			});
		}//if
}
//*********************************流程中的提交结束*************************************//



//*********************************流程中的退回*************************************//
//流程退回
function backObject(){
	var selected = $('#monitorinfolist').treegrid('getSelections');
	if(selected!=null&&selected.length>0){
		var cc=[];
		var flag=0;
		for ( var i = 0; i < selected.length; i++) {
			var projectpointid=selected[i]['projectpointid'];
			if(projectpointid!=""){
				flag=1;
			}
		}//for
		if(flag==1){
			for ( var t = 0; t < selected.length; t++) {
				var projectpointid=selected[t]['projectpointid'];
					if(projectpointid!=""){
						if(cc==""){
								cc+=projectpointid;;
						}
						else{
							cc+=","+projectpointid;;
						}
					}//if(projectpointid!=""){
			}//for
			$.post(rootPath +"/monitorproject/samperegister/samperegister!isBackProjectMontor.action",{projectpointid:projectpointid},function(data){
				if(data=="success"){
					backOpinionDialog(cc,projectid);
				}else if(data=="fail"){
					alert("存在已送样的样品不能退回");
				}
			});
		}//if
		else{
			alert("请至少选择一个有监测点信息的数据");
		}
	}//if
	else{
		alert("请至少选择一条记录！");
	}
}
//退回意见
function backOpinionDialog(cc,parenttype){
	var str =encodeURI(encodeURI("采样退回意见"));
	var url = rootPath + "/projects/appraiseopinion/appraiseopinion!opinionDlg.action?moduleid="+str;
	var _dialog =  window.top.$('<div id ="dlg" style="padding:0px;"><iframe id="ssFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
	_dialog.dialog({
	title:'审核意见',
	autoOpen:false,
	modal:true,
	closed:true,
	width:'520',
	height:'220',
	buttons:[{
		text:'确定',
		iconCls:'icon-ok',
		handler:function(){
			var objs = $("#ssFrame",window.top.document).contents().find(".grkj-validate");	
			var message = $("#ssFrame",window.top.document).contents().find("#opinion").val();
			if(!saveCheck(objs)){
			$("#ssFrame",window.top.document).contents().find(":input").focus();
				alert("数据输入不符合格式，请查看红色边框的输入框的输入提示！");
				return false;
			}
			$.post(rootPath +'/monitorproject/samperegister/samperegister!backProjectMontor.action',{projectpointid:cc,projectid:parenttype,message:message},function(rex){
				if(rex=="success"){
					$(window.parent.document).find("#reloaddata").click();
					$("#monitorinfolist").treegrid('reload');
					idfild=[];
					$("#samplelist").datagrid('reload');
					$("#itemlist").datagrid('reload');
					alert("成功！");
				}else{
					alert("失败");
				}
			});
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
//*********************************流程中的退回结束*************************************//

//监测项目中的编辑
function selectItem(){
	var selected=$("#samplelist").datagrid("getSelected");
	if(selected.qcSampleTypeid=="" || selected.qcSampleTypeid==null){
		alert("只能修改质控样！");
		return;
	}
	if(selected!=null){
	var samplecode=selected.samplecode;
	var projectcode=selected.projectcode;
	var monitorpointid=selected.monitorpointid;
	var _dialog =  window.top.$('<div id ="role-dlg" style="padding:0px;"><table id="selectItem"></table></div>').appendTo(window.top.document.body);
	_dialog.dialog({
		title:'监测项目编辑',
		autoOpen:false,
		modal:true,
		closed:true,
		width:'600',
		height:'400',
		buttons:[{
			text:'确定',
			iconCls:'icon-save',
			handler:function(){
				//var selectsample=$("#samplelist").datagrid("getSelected");
				var selection=$(window.top.document).find("#selectItem").datagrid("getSelections");
				var allRowData=$(window.top.document).find("#selectItem").datagrid("getRows");
				var itemid="";
				if(selection.length<=0||selection==null){
					alert("至少选择一个监测项目！");
				}else{
					for ( var i = 0; i < allRowData.length; i++) {
						var ss=0;
						for ( var j = 0; j < selection.length; j++) {
							//alert(allRowData[i]['sampleitemtestid']);
							if(allRowData[i]['sampleitemtestid']==selection[j]['sampleitemtestid']){
								ss=1;
								continue;
							}
						}
						if(ss==0){
							if(itemid==""){
								itemid=allRowData[i]['sampleitemtestid'];
							}else{
								itemid+=","+allRowData[i]['sampleitemtestid'];
							}
						}
						
					}
					//alert(itemid);
					$.post(rootPath +"/monitorproject/samperegister/samperegister!deleteItem.action",{itemid:itemid},function(data){
						if(data=='success'){
							alert('成功');
//							$("#itemlist").datagrid('reload');
							$("#samplelist").datagrid('reload');
						}else{
							alert('失败');
						}
					});
					_dialog.dialog('close');
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
	var myurl=rootPath +'/monitorproject/samperegister/samperegister!toItemfoList.action?samplecode='+samplecode+'&projectcode='+projectcode+'&monitorpointid='+monitorpointid;
	loadItemList(myurl);
	}else{
		alert("请选择一条样品记录！");
	}
}
//监测项目中点击编辑后的监测项目
function loadItemList(myurl){
	$(window.top.document).find("#selectItem").datagrid({
		nowrap: false,
		striped: true,
		collapsible:true,
		url:myurl, 
		fit:true,
		fitColumns : true,
		scrollbarSize:0,
		remoteSort: false,
		iconCls:"icon-edit",
		idField:"sampleitemtestid",
		pagination : true,
		rownumbers : true,
		columns:[[
				 {field:'ck',checkbox:true,align:"center"},
				 {field:'itemname',title:'监测项目', width:200,align:"center"},	
				 {field:'isnowtest',title:'现场监测', width:100,align:"center",
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
		]],onLoadSuccess:function(data){
			$(window.top.document).find("#selectItem").datagrid("selectAll");
		}
	});
}
//********************************************* 一下是标签 **********************************************************//
//标签~打印标签按钮弹出此窗口
function sampletagThree(){
	var monitors = $('#monitorinfolist').treegrid('getSelections');
	var monitorStr = '';
	for(var i=0;i<monitors.length;i++){
		if(monitorStr!='') monitorStr = monitorStr + ',';
		monitorStr = monitorStr + monitors[i].monitorpointid;
	}
	//alert(monitorStr);
	$("#showSampletag").attr("src",rootPath+"/common/report!toPrintReport.action?raq=SampleTagItemNumber.raq&projectid="+projectid+"&monitorpointid="+monitorStr+"&timeStamp="+new Date().getTime());
}

function sampletag(){
			//把监测类型赋予 id  monitorpointid~~begin
				var selected = $('#monitorinfolist').treegrid('getSelections');
				var selcheck = new Array();
				if (selected != null && selected != "") {
						for ( var i = 0; i < selected.length; i++) {
							if(selected[i].projectpointid!=""){
								selcheck.push(selected[i].monitorpointtypeid);
							}
						}
					}
					//为数组去重复
					var res=[],hash={};
					for(var i=0,elem;(elem=selcheck[i])!=null;i++){
						if(!hash[elem]){
							res.push(elem);
							hash[elem]=true;
						}
					}
			var	monitorpointtypeid=res;//监测点类型
			//把监测类型赋予 id  monitorpointid~~end
		
		//把监测点编码赋予 id  monitorpointid~~begin
					var mselected = $('#monitorinfolist').treegrid('getSelections');
					var mselcheck = new Array();
					if (mselected != null && mselected != "") {
						for ( var i = 0; i < mselected.length; i++) {
							if(mselected[i].monitorpointid!=""){
								mselcheck.push(mselected[i].monitorpointid);
							}
						}
					}
					//为数组去重复
					var mres=[],mhash={};
					for(var i=0,elem;(elem=mselcheck[i])!=null;i++){
						if(!mhash[elem]){
							mres.push(elem);
							mhash[elem]=true;
						}
					}
		var	monitorpointid=mres;//监测点编码
			//把监测点编码赋予 id  monitorpointid~~end
		
	var url =rootPath +"/monitorproject/samperegister/samperegister!showSampleTag.action?projectid="+projectid+"&monitorpointtypeid="+monitorpointtypeid+"&monitorpointid="+monitorpointid;
	var _dialog =  window.top.$('	<div id ="role-dlg" style="padding:0px;"><iframe id="samplingBillFrame" width="100%" height="100%" frameborder="0"  scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
	_dialog.dialog({
		title:'标签',
		maximizable:true,
		autoOpen:false,
		modal:true,
		closed:true,
		width:'1000',
		height:'650',
		buttons:[{
			text:'中心站打印',
			iconCls:'icon-print',
			handler:function(){
				var tagid=$("#samplingBillFrame",top.document.body).contents().find("#selectedSamplecodeid").val();
				if(tagid==null||tagid==""){
					alert("请先选择所要打印的样品！");
				}else{
					$("#samplingBillFrame",top.document.body).contents().find("#showSampletag").attr("src",rootPath+"/common/report!toPrintReport.action?raq=CenterStationSampleTag.raq&tagid="+tagid+"&timeStamp="+new Date().getTime());
				}
				$("#samplingBillFrame",top.document.body).contents().find("#clearSelectedBtn").click();
			}
		},{
			text:'打印',
			iconCls:'icon-print',
			handler:function(){
				var tagid=$("#samplingBillFrame",top.document.body).contents().find("#selectedSamplecodeid").val();
				if(tagid==null||tagid==""){
					alert("请先选择所要打印的样品！");
				}else{
					$("#samplingBillFrame",top.document.body).contents().find("#showSampletag").attr("src",rootPath+"/common/report!toPrintReport.action?raq=SampleTag.raq&tagid="+tagid+"&timeStamp="+new Date().getTime());
				}
				$("#samplingBillFrame",top.document.body).contents().find("#clearSelectedBtn").click();
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
//此处是重置 标签 即在任务签发的时候对标签进行了一下存储，现在如果在这个过程中对标签进行了修改，就要重新存进去。
//思路：
//	一：删除：根据当前任务的projectid 去smapletag表找到对应的List ,整个delete掉
//	二：增加：把当前的任务的信息再次放进sampletag表中，只是重复了一下任务签发的操作。
//	三：当这些操作完成，提示给用户一个提醒：标签已重置完成。
//	四：测试。可以用现场，非现场的项目进行测试，WT130028 土壤流程 id：130
function resettag(){ 
	if(window.confirm("你确定要重置当前任务的标签吗？")){
	var url =rootPath +"/monitorproject/samperegister/samperegister!restSampleTag.action?projectid="+projectid+"&projectcode="+projectcode+"&timeStamp="+new Date().getTime();//给一个时间戳
		var explorer = window.navigator.userAgent ;
		if (explorer.indexOf("MSIE") >= 0) {
				$(window.top.document.body).block({ 
				//jQuery.blockUI({ 
					message: "正在加载数据,请稍候...", 
			 		css: {
						color:'#000', 
						padding: '15px', 
						border:'2px solid #90dbfe',
						backgroundColor:'#fafafa'
					},
					overlayCSS: {
						opacity:'0.1' 
					}
				});
			}else{
				jQuery.blockUI({ 
					message: "正在加载数据,请稍候...", 
			 		css: {
						color:'#000', 
						padding: '15px', 
						border:'2px solid #90dbfe',
						backgroundColor:'#fafafa'
					},
					overlayCSS: {
						opacity:'0.1' 
					}
				});
			}//else
	$.ajax({
		type:"POST",
		url:url,
		success:function(data){ 
			if (data == 'success') {
				if (explorer.indexOf("MSIE") >= 0) {
					$(window.top.document.body).unblock(); 
				}else{
					jQuery.unblockUI();
				}
				alert("标签已经重置！");
			}else if (data == 'error') {
				alert("标签重置失败！");
				if (explorer.indexOf("MSIE") >= 0) {
						$(window.top.document.body).unblock(); 
					}else{
						jQuery.unblockUI();
					}
			}
		},
		error:function(data){
			alert("服务器正在维修，请稍后！");
		}
	});
	}
}


//标签的展示
function GasSampling(tagid) {
	var url = rootPath + "/common/report!toPrintReport.action?raq=SampleTag.raq&tagid="+tagid+"&timeStamp="+new Date().getTime();//给一个时间戳
		$.ajax({
		type:"POST",
		url:url,
		success:function(data){ 
		},
		error:function(data){
			alert("服务器正在维修，请稍后！");
		}
	}
	);
} 
//标签的展示 原来展示出来，点击打印~~
function GasSamplingNew(tagid) {
	var url = rootPath + "/common/report!toPrintReport.action?raq=SampleTag.raq&tagid="+tagid;
	var _dialog =  window.top.$('<div id ="dlg" style="padding:0px;"><iframe id="frame" width="100%" height="100%" frameborder="0" scrolling="yes" src='+url+'></iframe></div>').appendTo(window.top.document.body);
	_dialog.dialog({
		title:'标签',
		maximizable:true,
		autoOpen:false,
		modal:true,
		closed:true, 
		width:'450',
		height:'400',
		onClose:function(){
			_dialog.dialog("destroy");					
		}
	});
	_dialog.dialog('open');
} 


//打印空标签的展示~~~begin~~~
function samplenulltag(){
	var url =rootPath +"/monitorproject/samperegister/samperegister!showSamplenullTag.action";
	var _dialog =  window.top.$('	<div id ="role-dlg" style="padding:0px;"><iframe id="samplingBillFrame" width="100%" height="100%" frameborder="0"  scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
	_dialog.dialog({
		title:'标签',
		maximizable:true,
		autoOpen:false,
		modal:true,
		closed:true,
		width:'310',
		height:'100',
		buttons:[{
			text:'打印',
			iconCls:'icon-print',
			handler:function(){
			var zzs =  /^[0-9]*[1-9][0-9]*$/;　　//正整数 
			var sampleid=$("#samplingBillFrame",top.document.body).contents().find("#sampleid").val();
			if(sampleid==null||sampleid==""){
				alert("请填写打印报表个数！");
			}else{
				if(zzs.test(sampleid)){
					$("#samplingBillFrame",top.document.body).contents().find("#showNullSampletag").attr("src",rootPath+"/common/report!toPrintReport.action?raq=SampleTagNull.raq&number="+sampleid+"&timeStamp="+new Date().getTime());
				}else{
					alert("请输入正整数！");
					return false;
				}
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


function samplenullSampling(sampleid) {
	var url = rootPath + "/common/report!toReportPage.action?raq=SampleTagNull.raq&number="+sampleid;
	var _dialog =  window.top.$('<div id ="dlg" style="padding:0px;"><iframe id="frame" width="100%" height="100%" frameborder="0" scrolling="yes" src='+url+'></iframe></div>').appendTo(window.top.document.body);
	_dialog.dialog({
		title:'标签',
		maximizable:true,
		autoOpen:false,
		modal:true,
		closed:true, 
		width:'450',
		height:'400',
		onClose:function(){
			_dialog.dialog("destroy");					
		}
	});
	_dialog.dialog('open');
} 
//打印空标签的展示~~end~~

//标签二
function sampletagTwo(){
	//把监测类型赋予 id  monitorpointid~~begin
	var selected = $('#monitorinfolist').treegrid('getSelections');
	var selcheck = new Array();
	if (selected != null && selected != "") {
			for ( var i = 0; i < selected.length; i++) {
				if(selected[i].projectpointid!=""){
					selcheck.push(selected[i].monitorpointtypeid);
				}
			}
		}
		//为数组去重复
		var res=[],hash={};
		for(var i=0,elem;(elem=selcheck[i])!=null;i++){
			if(!hash[elem]){
				res.push(elem);
				hash[elem]=true;
			}
		}
	var	monitorpointtypeid=res;//监测点类型
	//把监测类型赋予 id  monitorpointid~~end

	//把监测点编码赋予 id  monitorpointid~~begin
	var mselected = $('#monitorinfolist').treegrid('getSelections');
	var mselcheck = new Array();
	if (mselected != null && mselected != "") {
		for ( var i = 0; i < mselected.length; i++) {
			if(mselected[i].monitorpointid!=""){
				mselcheck.push(mselected[i].monitorpointid);
			}
		}
	}
	//为数组去重复
	var mres=[],mhash={};
	for(var i=0,elem;(elem=mselcheck[i])!=null;i++){
		if(!mhash[elem]){
			mres.push(elem);
			mhash[elem]=true;
		}
	}
		var	monitorpointid=mres;//监测点编码
		//把监测点编码赋予 id  monitorpointid~~end
		
	var url =rootPath +"/monitorproject/samperegister/samperegister!showsampletagTwo.action?projectid="+projectid+"&monitorpointtypeid="+monitorpointtypeid+"&monitorpointid="+monitorpointid;
	var _dialog =  window.top.$('	<div id ="role-dlg" style="padding:0px;"><iframe id="samplingBillFrame" width="100%" height="100%" frameborder="0"  scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
	_dialog.dialog({
		title:'标签',
		maximizable:true,
		autoOpen:false,
		modal:true,
		closed:true,
		width:'900',
		height:'600',
		buttons:[{
			text:'打印',
			iconCls:'icon-print',
			handler:function(){
			var tagid=$("#samplingBillFrame",top.document.body).contents().find("#selectedSamplecodeid").val();
			if(tagid==null||tagid==""){
				alert("请先选择所要打印的样品！");
			}else{
				$("#samplingBillFrame",top.document.body).contents().find("#showSampletag").attr("src",rootPath+"/common/report!toPrintReport.action?raq=SampleTagL.raq&tagid="+tagid+"&timeStamp="+new Date().getTime());
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

//特殊样品
function sampletagSpecial(){
	
}

//****************************************************  标签结束   *************************************************//

//查看原始记录单
function viewOriginalRecord(){
	$.ajax({
		type:'POST',
		url:rootPath +"/monitorproject/samperegister/samperegister!hasNowTestItem.action?projectcode="+projectcode,
		success:function(msg){
			if(msg=='success'){
				getIsNowTestItem();
			}else if(msg=='fail'){
				alert('没有现场监测项目！');
			}else{
				alert('服务器正在维护，请稍后！');
			}
		}
	});
}
	function getIsNowTestItem(){
		var url = rootPath + "/testreports/testreports!toOriginalReports.action?projectcode="+projectcode+"&isNowTest=true";
		var _dialog =  window.top.$('	<div id ="dlg" style="padding:0px;"><iframe id="dlgFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
			_dialog.dialog({
			title:'原始记录单',
			autoOpen:false,
			maximizable:true,
			modal:true,
			closed:true,
			width:'1000',
			height:'700',
			buttons:[{
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
	
/**
 * 修改监测点信息
 * @return
 */
function editMoinponit(){
	var selected=$('#monitorinfolist').treegrid("getSelected");
	if(selected!=null){
		if(selected.projectpointid!=""){
			var id=selected.monitorpointid;
			var url =  rootPath +"/monitor/monitorpoint!toSampControll.action";
			var surl =  rootPath +"/monitor/monitorpoint!toEditSamp.action";
			if(id!=""){
				url = url + "?editid="+id;
				surl = surl + "?editid="+id;
			}
			var _dialog =  window.top.$('	<div id="pointDialog"  style="padding:0px;"><iframe id="taskDetailSampFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
			_dialog.dialog({
				title:'编辑监测点',
				autoOpen:false,
				modal:true,
				closed:true,
				width:'600',
				height:'400',
				buttons:[{
					text:'保存',
					iconCls:'icon-save',
					handler:function(){
						$("#taskDetailSampFrame",top.document.body).contents().find("#taskDetailframe").form('submit',{
							url:surl,
							onSubmit:function(){
								var objs = $("#taskDetailSampFrame",top.document.body).contents().find(".grkj-validate");
								if(!saveCheck(objs)){
									$("#taskDetailSampFrame",top.document.body).contents().find(":input").focus();
									$("#taskDetailSampFrame",top.document.body).contents().find("select").focus();
									alert("数据输入不符合格式，请查看红色边框的输入框的输入提示！");
									return false;
								}
							},
							success:function(data){
								if(data=='success'){
								_dialog.dialog('close');
								$('#monitorinfolist').treegrid('reload');
									alert('成功');
									//$("#pointFrame").attr("src","");
								}
								if(data=='fail'){
									alert('失败');
								}
								if(data=='isext'){
									alert('存在相同编码,请修改编码!');
								}
							}
						});
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
		}else{
			alert("选择了无效的监测点！");
		}
	}else{
		alert("请选择监测点！");
	}
}


//仪器使用记录(页面上呗屏蔽仪器使用记录按钮)
function diviceRecord(){
	var rows = $("#monitorinfolist").treegrid("getSelections");
	var monitorpointid = "";
	var monitorTypeCount = 0;
	for(var i=0;i<rows.length;i++){
		if(rows[i].flag=="monitorpoint"){
			if(monitorpointid!="")monitorpointid = monitorpointid + ",";
			monitorpointid = monitorpointid + rows[i].monitorpointid;
		}else{
			monitorTypeCount++;
		}
	}
	if(monitorTypeCount>1){
		alert("请选择相同类型下的监测点！");
		return;
	}
	if(monitorpointid==null||monitorpointid==""){
		alert("请至少选择一条记录！");
		return;
	}
//	alert(monitorpointid);
		var url = rootPath + "/monitorproject/deviceuserecord/samplingdeviceuserecord!list.action?projectcode="+projectcode+"&monitorpointid="+monitorpointid;
		var _dialog =  window.top.$('	<div id ="dlg" style="padding:0px;"><iframe id="dlgFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
			_dialog.dialog({
			title:'采样仪器使用记录',
			autoOpen:false,
			modal:true,
			closed:true,
			width:'1000',
			height:'600',
			buttons:[{
				text:'确定',
				iconCls:'icon-save',
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
