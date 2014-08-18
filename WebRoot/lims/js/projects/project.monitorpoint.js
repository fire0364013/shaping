function initMonitorinfo(){		
	$('#monitorlist').treegrid({
			iconCls:'icon-save',
			nowrap: false,
			rownumbers: false,
			fit:true,
			fitColumns : true,
			animate:false,
			collapsible:true,
			singleSelect:false,
			scrollbarSize:0,
			url:rootPath +'/projects/taskregister/projectmonitorpoint!monitorList.action?str='+projectdetail,
			idField:'ppointid',
			treeField:'attributetype',
			frozenColumns:[[
                {field:'ppointid',width:40,checkbox:true,align:"center"}
			]],
			columns:[[
				{title:'监测点编码',field:'attributetype',width:120},
				{field:'pointname',title:'监测点名称', width:150,align:"center",rowspan:3},
				{field:'object',title:'监测对象', width:120,align:"center"},
				{field:'longitude',title:'监测点经度<img src="'+rootPath+'/themes/icons/mini_edit.png" />', width:40,align:"center",
					formatter:function(value,rec){
					var rowIndex = rec.ppointid;
					if(isNaN(rowIndex)){
						return ;
					}else{
						var str = "<div id=\"longitudeDiv"+rowIndex+"\">" + value +"</div>";
						return str;
					}
					}
				},
				{field:'latitude',title:'监测点纬度<img src="'+rootPath+'/themes/icons/mini_edit.png"/>', width:40,align:"center",
					formatter:function(value,rec){
					var rowIndex = rec.ppointid;
					if(isNaN(rowIndex)){
						return ;
					}else{
						var str = "<div id=\"latitudeDiv"+rowIndex+"\">" + value +"</div>";
						return str;
					}
					}
				}
			]],
			onClickRow:function(node){
				if(node.ppointid.indexOf("node")>=0){
					$('#monitorlist').treegrid('clearSelections');
					$("#monitorlist").treegrid('select',node.ppointid);
				}else{
					$('#monitorlist').treegrid('clearSelections');
					$("#monitorlist").treegrid('select',node.ppointid);
				}
//				$("#parentpointtype").val(node.parentpointtype);				
//				pmonitorid = node.ppointid;
				
				initSetinfo(node.ppointid);
			},onLoadSuccess:function(data){
//				if(monitors!=""){
//					for ( var i = 0; i < monitors.length; i++) {
//						$('#monitorinfolist').treegrid('select', monitors[i].ppointid);
//					}
//				}
			},onSelect:function(rowData){
					var nodes = $('#monitorlist').treegrid('getChildren', rowData.ppointid);
					for ( var i = 0; i < nodes.length; i++) {
						$('#monitorlist').treegrid('select', nodes[i].ppointid);
					}
			},onUnselect:function(rowData){
					var nodes = $('#monitorlist').treegrid('getChildren', rowData.ppointid);
					for ( var i = 0; i < nodes.length; i++) {
						$('#monitorlist').treegrid('unselect', nodes[i].ppointid);
					}
			},
			onDblClickCell:function(field,row){
				var rowIndex = row.ppointid;
				var row = $('#monitorlist').treegrid('getSelected');
				var index = $(this).treegrid("getRowIndex",row);
				if(field =="longitude" && row.ppointid!=""){
					var value = row.longitude;
					var str = "<div name=\"selectDiv\" id=\"selectDiv\">" 
					+"<input type=\"text\" class=\"TextBox\" " 
					+"id=\"longitude"+rowIndex+"\" " 
					+"name=\"longitude\" " 					
					+"style=\"width: 250px;height:20px\""
					+"value=" + value
					+">"																						
					+"</div>";
					$("#longitudeDiv"+rowIndex).html(str);
				}
			   if(field =="latitude" && row.ppointid!=""){	
				   var value = row.latitude;
					var str = "<div name=\"selectDiv1\" id=\"selectDiv1\">" 
					+"<input type=\"text\" class=\"TextBox\" " 
					+"id=\"latitude"+rowIndex+"\" "
					+"name=\"latitude\" " 					
					+"style=\"width: 250px;height:20px\""
					+"value=" + value
					+">"	
					+ "</div>";
					$("#latitudeDiv"+rowIndex).html(str);
				} 
			    	
			   	$("#longitude"+rowIndex).bind("change",{row: row},function(event){
                  var newLongitude =  $(this).val();
                  updatePoint(row.ppointid,newLongitude,row.latitude);
               });
			   $("#latitude"+rowIndex).bind("change",{row: row},function(event){
                 var newLatitude =  $(this).val();
                  updatePoint(row.ppointid,row.longitude,newLatitude);
               });
			}
	});
	$(window).resize(function() {
		$("#monitorlist").treegrid('resize');
	});
}

/**
 * 采样模块监测点展现（通过状态过滤）
 */
function iniSamplingtMonitorinfo(){	
	$('#monitorlist').treegrid({
			iconCls:'icon-save',
			nowrap: false,
			rownumbers: false,
			fit:true,
			fitColumns : true,
			animate:false,
			collapsible:true,
			singleSelect:false,
			scrollbarSize:0,
			url:rootPath +'/projects/taskregister/projectmonitorpoint!samplingMonitorList.action?str='+projectdetail,
			idField:'ppointid',
			treeField:'attributetype',
			frozenColumns:[[
                {field:'ppointid',width:40,checkbox:true,align:"center"}
			]],
			columns:[[
				{title:'监测点编码',field:'attributetype',width:120},
				{field:'pointname',title:'监测点名称', width:170,align:"center",rowspan:3},
				{field:'object',title:'监测对象', width:120,align:"center"},
				{field:'longitude',title:'监测点经度<img src="'+rootPath+'/themes/icons/mini_edit.png" />', width:40,align:"center",
					formatter:function(value,rec){
					var rowIndex = rec.ppointid;
					if(isNaN(rowIndex)){
						return ;
					}else{
						var str = "<div id=\"longitudeDiv"+rowIndex+"\">" + value +"</div>";
						return str;
					}
					}
				},
				{field:'latitude',title:'监测点纬度<img src="'+rootPath+'/themes/icons/mini_edit.png"/>', width:40,align:"center",
					formatter:function(value,rec){
					var rowIndex = rec.ppointid;
					if(isNaN(rowIndex)){
						return ;
					}else{
						var str = "<div id=\"latitudeDiv"+rowIndex+"\">" + value +"</div>";
						return str;
					}
					}
				}
			]],
			onClickRow:function(node){
				
				if(node.ppointid.indexOf("node")>=0){
					$('#monitorlist').treegrid('clearSelections');
					$("#monitorlist").treegrid('select',node.ppointid);
				}else{
					$('#monitorlist').treegrid('clearSelections');
					$("#monitorlist").treegrid('select',node.ppointid);
				}
//				$("#parentpointtype").val(node.parentpointtype);				
//				pmonitorid = node.ppointid;
				
				initSetinfo(node.ppointid);
			},onLoadSuccess:function(data){
//				if(monitors!=""){
//					for ( var i = 0; i < monitors.length; i++) {
//						$('#monitorinfolist').treegrid('select', monitors[i].ppointid);
//					}
//				}
			},onSelect:function(rowData){
					var nodes = $('#monitorlist').treegrid('getChildren', rowData.ppointid);
					for ( var i = 0; i < nodes.length; i++) {
						$('#monitorlist').treegrid('select', nodes[i].ppointid);
					}
			},onUnselect:function(rowData){
					var nodes = $('#monitorlist').treegrid('getChildren', rowData.ppointid);
					for ( var i = 0; i < nodes.length; i++) {
						$('#monitorlist').treegrid('unselect', nodes[i].ppointid);
					}
			},
			onDblClickCell:function(field,row){
				var rowIndex = row.ppointid;
				var row = $('#monitorlist').treegrid('getSelected');
				var index = $(this).treegrid("getRowIndex",row);
				if(field =="longitude" && row.ppointid!=""){
					var value = row.longitude;
					var str = "<div name=\"selectDiv\" id=\"selectDiv\">" 
					+"<input type=\"text\" class=\"TextBox\" " 
					+"id=\"longitude"+rowIndex+"\" " 
					+"name=\"longitude\" " 					
					+"style=\"width: 250px;height:20px\""
					+"value=" + value
					+">"																						
					+"</div>";
					$("#longitudeDiv"+rowIndex).html(str);
				}
			   if(field =="latitude" && row.ppointid!=""){	
				   var value = row.latitude;
					var str = "<div name=\"selectDiv1\" id=\"selectDiv1\">" 
					+"<input type=\"text\" class=\"TextBox\" " 
					+"id=\"latitude"+rowIndex+"\" "
					+"name=\"latitude\" " 					
					+"style=\"width: 250px;height:20px\""
					+"value=" + value
					+">"	
					+ "</div>";
					$("#latitudeDiv"+rowIndex).html(str);
				} 
			    	
			   	$("#longitude"+rowIndex).bind("change",{row: row},function(event){
                  var newLongitude =  $(this).val();
                  updatePoint(row.ppointid,newLongitude,row.latitude);
               });
			   $("#latitude"+rowIndex).bind("change",{row: row},function(event){
                 var newLatitude =  $(this).val();
                  updatePoint(row.ppointid,row.longitude,newLatitude);
               });
			}
	});
	$(window).resize(function() {
		$("#monitorlist").treegrid('resize');
	});
}

function updatePoint(ppointid,newLongitude,newLatitude){
		$.ajax( {
					type : 'GET',
					url : rootPath + '/projects/taskregister/projectmonitorpoint!updatePoint.action?id='+ppointid
					+'&newLongitude='+newLongitude	
					+'&newLatitude='+newLatitude
					+'&timeStamp='+new Date().getTime(),
					async:false,//同步
					success : function(data) {
						if(data=="success"){
							$("#monitorlist").treegrid('reload');
						}
						else if(data=="error"){
							alert("修改失败！");
						}
					}
				});
}

function initSetinfo(pmonitorid){	
	$('#setlist').datagrid({
		nowrap: false,
		striped: true,
		collapsible:true,
		url:rootPath +'/projects/taskregister/projectsamplingset!setList.action?str='+pmonitorid, 
		fit:true,
		fitColumns : true,
		scrollbarSize:0,
		remoteSort: false,
		singleSelect:true,
		idField:"samplesetid",
		frozenColumns:[[{
			field : 'samplesetid',
			title : '&nbsp;',
			width : 30,
			align : 'center',
			formatter : function(value){
				return "<input type='radio' name='radio'/>";}
		}]],
		columns:[[
					{field:'monitordays',title:'监测天数', width:50,align:"center"},
					{field:'monitorfrequency',title:'监测频次(次/天)', width:60,align:"center"},
					{field:'cycle',title:'监测周期', width:50,align:"center"}										
			]],
		onSelect:function(rowIndex, rowData){
			$($("input[type=radio]")[rowIndex]).attr("checked",true);
		},onClickRow:function(rowIndex, rowData){
			//点击一行加载项目信息
			
//			pointtype=ppointtype;
//			psampleid = rowData.sampleid;
			initIteminfo(rowData.samplesetid);
		},onLoadSuccess:function(data){
			$('#setlist').datagrid('clearSelections');
			//默认加载第一行的基本信息
			var row = $('#setlist').datagrid('selectRow',0);
			var rowData = $('#setlist').datagrid('getSelected');
			if(rowData!=null&&rowData!=""){
				initIteminfo(rowData.samplesetid);
			}else{
				initIteminfo("");
			}
		}
	});
	$(window).resize(function() {
		$("#setlist").datagrid('resize');
	});

}

//加载项目信息
function initIteminfo(ppoint){
	$('#itemlist').datagrid({
		nowrap: false,
		striped: true,
		collapsible:true,
		url:rootPath +'/projects/taskregister/projectsampleitem!itemList.action?str='+ppoint, 
		fit:true,
		fitColumns : true,
		scrollbarSize:0,
		remoteSort: false,
		idField:"sampleitemid",
		frozenColumns:[[
			{field:'sampleitemid',checkbox:true,align:"center"}
		]],
		columns:[[
			{field:'itemname',title:'监测项目', width:80,align:"center"},	
			{field:'itemmethod',title:'分析方法<img src="'+rootPath+'/themes/icons/mini_edit.png"/>', width:160,align:"center",
					formatter:function(value,rec,rowIndex){
					var str = "<div id=\"methodDiv"+rowIndex+"\">" +
							value +
							"</div>";
					return str;
				}
			},
			{field:'samplesavedose',title:'样品保存剂', width:60,align:"center"},
			{field:'unitname',title:'计量单位', width:50,align:"center"},
			
			{field:'analysisFee',title:'分析费<img src="'+rootPath+'/themes/icons/mini_edit.png"/>', width:40,align:"center",
					formatter:function(value,rec,rowIndex){
					var str = "<div id=\"analysisFeeDiv"+rowIndex+"\">" + value +"</div>";
					return str;
				}
			},
			{field:'beforeFee',title:'前处理费<img src="'+rootPath+'/themes/icons/mini_edit.png"/>', width:40,align:"center",
					formatter:function(value,rec,rowIndex){
					var str = "<div id=\"beforeFeeDiv"+rowIndex+"\">" +value +"</div>";
					return str;
				}
			},
			{field:'sampleFee',title:'样品采集费<img src="'+rootPath+'/themes/icons/mini_edit.png"/>', width:50,align:"center",
					formatter:function(value,rec,rowIndex){
					var str = "<div id=\"sampleFeeDiv"+rowIndex+"\">" +value +"</div>";
					return str;
				}
			},
			

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
		]],onDblClickCell:function(rowIndex, field, value){
				$('#itemlist').datagrid('clearSelections');	
				$('#itemlist').datagrid('selectRow',rowIndex);
				
				var rows = $('#itemlist').datagrid('getSelections');				
				$("#selectDiv").remove();//单击之前，先将其他的下拉框至为空
				$("#methodDiv"+rowIndex).html("");//删除单元格中的内容，下面将会用下拉框填充
				var row = $('#itemlist').datagrid('getSelected');	
				if(field =="itemmethod" && row.itemid!=""){	
					var str = "<div name=\"selectDiv\" id=\"selectDiv\">" +
								"</div>";
					$("#methodDiv"+rowIndex).html(str);
					getItemAnalysismethod(row.itemid,rowIndex,row.sampleitemid,row.methodid,value);
				}
				if(field =="analysisFee" && row.itemid!=""){	
					var str = "<div name=\"selectDiv1\" id=\"selectDiv1\">"
					+"<input type=\"text\" class=\"TextBox\" " 
					+"id=\"analysisFee"+rowIndex+"\" " 
					+"name=\"analysisFee\" " 					
					+"style=\"width: 200px;height:20px\""
					+"value=" + value
					+">"					
					+"</div>";				
					$("#analysisFeeDiv"+rowIndex).html(str);
				}
				if(field =="beforeFee" && row.itemid!=""){	
					var str = "<div name=\"selectDiv2\" id=\"selectDiv2\">" 
					+"<input type=\"text\" class=\"TextBox\" " 
					+"id=\"beforeFee"+rowIndex+"\" " 
					+"name=\"beforeFee\" " 					
					+"style=\"width: 200px;height:20px\""
					+"value=" + value
					+">"																						
					+"</div>";
					$("#beforeFeeDiv"+rowIndex).html(str);
				}
			   if(field =="sampleFee" && row.itemid!=""){	
					var str = "<div name=\"selectDiv3\" id=\"selectDiv3\">" 
					+"<input type=\"text\" class=\"TextBox\" " 
					+"id=\"sampleFee"+rowIndex+"\" " 
					+"name=\"sampleFee\" " 					
					+"style=\"width: 200px;height:20px\""
					+"value=" + value
					+">"	
					+ "</div>";
					$("#sampleFeeDiv"+rowIndex).html(str);
				} 
			    	
			   $("#analysisFee"+rowIndex).bind("change",{row: row},function(event){
                  var newAnalysisFee =  $(this).val();
                  updateFee(row.sampleitemid,newAnalysisFee,row.beforeFee,row.sampleFee);
               });
			   	$("#beforeFee"+rowIndex).bind("change",{row: row},function(event){
                  var newBeforeFee =  $(this).val();
                  updateFee(row.sampleitemid,row.analysisFee,newBeforeFee,row.sampleFee);
               });
			   $("#sampleFee"+rowIndex).bind("change",{row: row},function(event){
                 var newSampleFee =  $(this).val();
                  updateFee(row.sampleitemid,row.analysisFee,row.beforeFee,newSampleFee);
               });
			},onLoadSuccess:function(data){
			$('#itemlist').datagrid('clearSelections');
			//默认加载第一行的基本信息
			var rows= $('#itemlist').datagrid('selectRow',0);
		}
	});
	$(window).resize(function() {
		$("#itemlist").datagrid('resize');
	});
}
function updateFee(sampleitemid,newAnalysisFee,newBeforeFee,newSampleFee){
		$.ajax( {
					type : 'GET',
					url : rootPath + '/projects/taskregister/projectsampleitem!updateFee.action?id='+sampleitemid
					+'&newAnalysisFee='+newAnalysisFee	
					+'&newBeforeFee='+newBeforeFee	
					+'&newSampleFee='+newSampleFee	
					+'&timeStamp='+new Date().getTime(),
					async:false,//同步
					success : function(data) {
						if(data=="success"){
							$("#itemlist").datagrid('reload');
						}
						else if(data=="error"){
							alert("修改失败！");
						}
					}
				});
}

function getItemAnalysismethod(itemid,index,sampleitemid,methodid,cellvalue) {
	$.ajax( {
		type : 'GET',
		url : rootPath + '/projects/taskregister/projectsampleitem!getAnalysisMethod.action?str='+itemid+'&timeStamp='+new Date().getTime(),
		async:false,//同步
		success : function(data) {
			var vData = eval("(" + data + ")");
			var lList = "<select id=\"methodSel"+index+"\" style=\"width:100%\">";
			
			//遍历json数据  
			jQuery.each(vData.rowsData, function(i, n) {
				if(n.methodid==methodid){
					lList += "<option value=" + n.methodid + " selected>" + n.methodname	+ "</option>";
				}else{
					lList += "<option value=" + n.methodid + ">" + n.methodname	+ "</option>";
				}
			});			
			lList += "</select>"
			$("#selectDiv").append(lList);
			
			$("#methodSel"+index).change(function(){
				var methodid = $("#methodSel"+index).val();
				$.ajax( {
					type : 'GET',
					url : rootPath + '/projects/taskregister/projectsampleitem!updateAnalysisMethod.action?id='+sampleitemid+'&str='+methodid					
					+'&timeStamp='+new Date().getTime(),
					async:false,//同步
					success : function(data) {
						if(data=="success"){
							$("#itemlist").datagrid('reload');
						}else if(data=="fail"){
							alert("请选择方法！");
						}else if(data=="error"){
							alert("修改失败！");
						}
					}
				});
			});
			
			$("#methodSel"+index).blur(function(){
				$("#selectDiv").remove();
				$("#methodDiv"+index).html(cellvalue);
				});
			}
		});
}
function getItemAnalysismethod2(itemid,index,sampleitemid,methodid,cellvalue) {
	$.ajax( {
		type : 'GET',
		url : rootPath + '/projects/taskregister/projectsampleitem!getAnalysisMethod.action?str='+itemid+'&timeStamp='+new Date().getTime(),
		async:false,//同步
		success : function(data) {
			var vData = eval("(" + data + ")");
			var lList = "<select id=\"methodSel"+index+"\" style=\"width:100%\">";
			
			//遍历json数据  
			jQuery.each(vData.rowsData, function(i, n) {
				if(n.methodid==methodid){
					lList += "<option value=" + n.methodid + " selected>" + n.methodname	+ "</option>";
				}else{
					lList += "<option value=" + n.methodid + ">" + n.methodname	+ "</option>";
				}
			});			
			lList += "</select>"
			$("#selectDiv").append(lList);
			
			$("#methodSel"+index).change(function(){
				var methodid = $("#methodSel"+index).val();
//				$.ajax( {
//					type : 'GET',
//					url : rootPath + '/projects/taskregister/projectsampleitem!updateAnalysisMethod.action?id='+sampleitemid+'&str='+methodid					
//					+'&timeStamp='+new Date().getTime(),
//					async:false,//同步
//					success : function(data) {
//						if(data=="success"){
//							alert("修改成功！");
//							$("#itemlist").datagrid('reload');
//						}else if(data=="fail"){
//							alert("请选择方法！");
//						}else if(data=="error"){
//							alert("修改失败！");
//						}
//					}
//				});
			});
			
			$("#methodSel"+index).blur(function(){
				$("#selectDiv").remove();
				$("#methodDiv"+index).html(cellvalue);
				});
			}
		});
}

//添加监测点信息
function addMonitor() {
	var url = rootPath + "/projects/taskregister/projectmonitorpoint!toMonitorPage.action?str="+projectdetail;
	var _dialog = window.top
			.$('<div id="monitor-dlg"  style="padding:0px;"><iframe id="monitorFrame" width="100%" height="100%" frameborder="0" scrolling="no" src=' + url + '></iframe></div>')
			.appendTo(window.top.document.body);
	_dialog.dialog( {
		title : '监测点选择',
		autoOpen : false,
		modal : true,
		closed : true,
		width : '800',
		height : '600',
		buttons : [ {
			text : '保存',
			iconCls : 'icon-save',
			handler : function() {
				$("#monitorFrame",top.document.body).contents().find("#monitors").click();
				var monitors = $("#monitorFrame",top.document.body).contents().find("#monitors").val();
				if(monitors==""){
					alert("请选择监测点！");
					return false;
				}
				$.post( 
					rootPath +"/projects/taskregister/projectmonitorpoint!addMonitor.action",
					{id:monitors,str:projectdetail},
					function(add){
						if(add=='success'){
							_dialog.dialog('close');
							alert('成功');
							$("#monitorlist").treegrid('reload');
						}
						if(add=='fail'){
							alert('失败');
						}
				});
			}
		}, {
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

//删除监测点
function removeMonitor(){
	var nodes = $('#monitorlist').treegrid('getSelections');	
	var pids = "";
	if(nodes==""||nodes==null){
		alert("请至少选择一项！");
		return;
	}else{
		for ( var i = 0; i < nodes.length; i++) {
			if(nodes[i].flag=="monitor"){
				if(pids != ""){
					pids = pids + ",";
				}
				pids = pids + nodes[i].ppointid;
			}
		}
	}
	if(confirm("关联的采样信息和监测项目会同时删除，是否确认删除该记录？")){
		$.post( 
			rootPath +"/projects/taskregister/projectmonitorpoint!delMonitor.action",
			{str:pids},
			function(msg){
				if(msg=='success'){
					alert('成功');
					$("#monitorlist").treegrid('reload');
					$("#samplelist").datagrid('reload');
//					$("#itemlist").datagrid('reload');
				}else{
					alert('失败');
				}
			});
	}
}


//删除监测点
function removeSamplingMonitor(){
	var nodes = $('#monitorlist').treegrid('getSelections');	
	var pids = "";
	if(nodes==""||nodes==null){
		alert("请至少选择一项！");
		return;
	}else{
		for ( var i = 0; i < nodes.length; i++) {
			if(nodes[i].flag=="monitor"){
				if(pids != ""){
					pids = pids + ",";
				}
				pids = pids + nodes[i].ppointid;
			}
		}
	}
	if(confirm("关联的采样信息、监测项目和样品会同时删除，是否确认删除该记录？")){
		$.post( 
			rootPath +"/spot/sampling/sampling!deletePointByBatch.action?timeStamp="+new Date().getTime(),
			{projectcode:projectcode,ids:projectdetail,pmids:pids},
			function(msg){
				if(msg=='success'){
					alert('成功');
					$("#monitorlist").treegrid('reload');
					$("#samplelist").datagrid('reload');
//					$("#itemlist").datagrid('reload');
				}else{
					alert('失败');
				}
			});
	}
}

	
//批量设置监测点的采样信息和监测项目信息
function batchSetInfo(){
	monitors = "";
	var nodes = $('#monitorinfolist').treegrid('getSelections');	
	var pids = "";
	var pointtype = "";
	var parentpointtype = "";//选择监测点项目时，根据监测点大类型判断
	if(nodes==null||nodes==""){
		alert("请至少选择一项！");
		return;
	}else{
		//pids = node.ppointid;
		//var nodes = $('#monitorinfolist').treegrid('getChildren', node.ppointid);
		for ( var i = 0; i < nodes.length; i++) {
			//if(pmonitorid!="")pmonitorid = nodes[i].ppointid;
			if(parentpointtype==""){
				parentpointtype = nodes[i].parentpointtype;
			}else{
				if(parentpointtype!=nodes[i].parentpointtype){
					alert("请选择相同类型下的监测点！");
					return;
				}
			}
			
			if(pids != ""){
				pids = pids + ",";
			}
			pids = pids + nodes[i].ppointid;
			pointtype = nodes[i].pointtype;
		}
	}
	//判断所选监测点下的采样设置是否已经存在
	$.post(
		rootPath +"/plans/plans/planmonitorpoint!isSamplingSetExist.action",
		{ids:pids},
		function(msg){
			if(msg=='exist'){
				alert("已存在相关采样、监测项目信息，不能批量设置！");
			}else{
				samplingSet(pids,pointtype,parentpointtype);
			}
		});
	
	
}

//添加采样信息
function addSet(){
	var row = $('#monitorlist').treegrid('getSelected');
	if(row.flag=='type'){
		alert("请选择监测点！");
	}
	var monitorpointid = row.ppointid;//监测点编号
	var monitortypeid = row.pointtype;//监测点类型编号
	var url = rootPath + "/projects/taskregister/projectsamplingset!input.action?detailid="+projectdetail+"&monitorpointid="+monitorpointid+"&monitortypeid="+monitortypeid;
	var _dialog = window.top
				.$('<div id="pointDialog"  style="padding:0px;"><iframe id="samplingSetFrame" width="100%" height="100%" frameborder="0" scrolling="no" src=' + url + '></iframe></div>')
				.appendTo(window.top.document.body);
		_dialog.dialog( {
			title:'添加采样设置',
			autoOpen : false,
			modal : true,
			closed : true,
			width : '400',
			height : '300',
			buttons : [ {
				text : '保存',
				iconCls : 'icon-save',
				handler : function() {
					$("#samplingSetFrame",top.document.body).contents().find("#samplingForm").form('submit',{
						url:rootPath + "/projects/taskregister/projectsamplingset!addSamplingSet.action",
						onSubmit:function(){
							var objs = $("#samplingSetFrame",top.document.body).contents().find(".grkj-validate");
							if(!saveCheck(objs)){
								$("#samplingSetFrame",top.document.body).contents().find(":input").focus();
								$("#samplingSetFrame",top.document.body).contents().find(":select").focus();
								alert("数据输入不符合格式，请查看红色边框的输入框的输入提示！");
								return false;
							}
						},
						success:function(msg){						
							if(msg=='success'){
								_dialog.dialog('close');
								alert('添加成功！');
								$("#setlist").datagrid('reload');
							}else if(msg=='fail'){
								alert('添加失败！');
							}
						}
					});
				}
			}, {
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

function updateSet(){
	var row = $('#monitorlist').treegrid('getSelected');
	if(row.flag=='type'){
		alert("请选择监测点！");
	}
	var monitortypeid = row.pointtype;//监测点类型编号
	
	var samplingsetid = $('#setlist').datagrid('getSelected').samplesetid;
	var url = rootPath + "/projects/taskregister/projectsamplingset!input.action?id="+samplingsetid+"&monitortypeid="+monitortypeid;
	var _dialog = window.top
			.$('<div id="pointDialog"  style="padding:0px;"><iframe id="samplingFrame" width="100%" height="100%" frameborder="0" scrolling="no" src=' + url + '></iframe></div>')
			.appendTo(window.top.document.body);
	_dialog.dialog( {
		title:'修改采样设置',
		autoOpen : false,
		modal : true,
		closed : true,
		width : '400',
		height : '300',
		buttons : [ {
			text : '保存',
			iconCls : 'icon-save',
			handler : function() {
				$("#samplingFrame",top.document.body).contents().find("#samplingForm").form('submit',{
					url:rootPath + "/projects/taskregister/projectsamplingset!updateSamplingSet.action",
					onSubmit:function(){
						var objs = $("#samplingFrame",top.document.body).contents().find(".grkj-validate");
						if(!saveCheck(objs)){
							$("#samplingFrame",top.document.body).contents().find(":input").focus();
							$("#samplingFrame",top.document.body).contents().find(":select").focus();
							alert("数据输入不符合格式，请查看红色边框的输入框的输入提示！");
							return false;
						}
					},
					success:function(msg){						
						if(msg=='success'){
							_dialog.dialog('close');
							$("#setlist").datagrid('reload');
							alert('修改成功！');
						}else if(msg=='fail'){
							alert('修改失败！');
						}
					}
				});
			}
		}, {
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

//删除采样设置
function removeSet(){
	var samplingsetid = $('#setlist').datagrid('getSelected').samplesetid;
	if(confirm("删除采样信息将会删除关联的检测项目，是否确认删除？")){
		$.post( 
			rootPath +"/projects/taskregister/projectsamplingset!removeSamplingSet.action",
			{id:samplingsetid},
			function(msg){
				if(msg=="success"){
					alert("删除成功！");
					$("#setlist").datagrid('clearSelections');
					$("#setlist").datagrid('reload');
				}else{
					alert("删除失败！");
				}
		});
	}
}

//删除采样设置
function removeSamplingSet(){
	var samplingsetid = $('#setlist').datagrid('getSelected').samplesetid;
	if(confirm("删除采样信息将会删除关联的检测项目，是否确认删除？")){
		$.post( 
			rootPath +"/spot/sampling/sampling!deleteSetByBatcht.action",
			{ids:samplingsetid,projectcode:projectcode},
			function(msg){
				if(msg=="success"){
					alert("删除成功！");
					$("#setlist").datagrid('clearSelections');
					$("#setlist").datagrid('reload');
				}else{
					alert("删除失败！");
				}
		});
	}
}

//添加样品项目
function addItem() {
	var row = $('#monitorlist').treegrid('getSelected');
	var sampletypesign = encodeURI(encodeURI(row.sampletypesign));
	var projectpointid = row.ppointid;
	
	var setid = $('#setlist').datagrid('getSelected').samplesetid;
	var url = rootPath + "/projects/taskregister/projectmonitorpoint!toItemPage.action?str="+projectdetail+"&projectpointid="+projectpointid+"&sampletypesign="+sampletypesign;
	var _dialog = window.top
			.$('<div id="sample-dlg"  style="padding:0px;"><iframe id="samplingItemFrame" width="100%" height="100%" frameborder="0" scrolling="yes" src=' + url + '></iframe></div>')
			.appendTo(window.top.document.body);
	_dialog.dialog( {
		title : '添加项目管理',
		autoOpen : false,
		modal : true,
		closed : true,
		width : '500',
		height : '500',
		maximizable:true,
		buttons : [ {
			text : '保存',
			iconCls : 'icon-save',
			handler : function() {
					$("#samplingItemFrame",top.document.body).contents().find("#itemid").click();
					var items = $("#samplingItemFrame",top.document.body).contents().find("#itemid").val();
					$.post( 
						rootPath +"/projects/taskregister/projectsampleitem!addSampleItem.action",
						{setid:setid,str:items},
						function(msg){
							if(msg=='success'){	
								_dialog.dialog('close');
								alert('添加成功！');
								$("#itemlist").datagrid('reload');
							}else{
								alert('添加失败！');
							}
						});
				}
		}, {
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
//修改样品信息
function updateItem() {
	var rows=$("#itemlist").datagrid('getSelections');
	if(rows==null||rows==""||rows.length>1){
		alert("请必须只选择一个检测项目！");
		return false;
	}else{
		var sampleitemid =$('#itemlist').datagrid('getSelected').sampleitemid;
		var url = rootPath + "/projects/taskregister/projectmonitorpoint!toItemPage4.action?id="+sampleitemid;
		}
	var _dialog = window.top
			.$('<div id="sample-dlg"  style="padding:0px;"><iframe id="samplingItemFrame" width="100%" height="100%" frameborder="0" scrolling="yes" src=' + url + '></iframe></div>')
			.appendTo(window.top.document.body);
	_dialog.dialog( {
		title : '修改项目管理',
		autoOpen : false,
		modal : true,
		closed : true,
		width : '500',
		height : '500',
		maximizable:true,
		buttons : [ {
			text : '修改',
			iconCls : 'icon-save',
			handler : function() {
				$("#samplingItemFrame",top.document.body).contents().find("#itemid").form('submit',{
					url:rootPath + "/projects/taskregister/projectsampleitem!updateSampleItem.action",
					onSubmit:function(){
						var objs = $("#samplingItemFrame",top.document.body).contents().find(".grkj-validate");
						if(!saveCheck(objs)){
							$("#samplingItemFrame",top.document.body).contents().find(":input").focus();
							$("#samplingItemFrame",top.document.body).contents().find(":select").focus();
							alert("数据输入不符合格式，请查看红色边框的输入框的输入提示！");
							return false;
						}
					},
					success:function(msg){						
						if(msg=='success'){
							_dialog.dialog('close');
							$("#setlist").datagrid('reload');
							alert('修改成功！');
						}else if(msg=='fail'){
							alert('修改失败！');
						}
					}
				});
			}
		}, {
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
//删除检测项目	
function removeItem(){
	var rows=$("#itemlist").datagrid('getSelections');
	if(rows==null||rows==""){
		alert("请至少选择一条记录！");
		return;
	}else{
		if(window.confirm('是否删除？')){
			var samplingitems="";
			for ( var i = 0; i < rows.length; i++) {
				if(samplingitems!="")samplingitems = samplingitems + ",";
				samplingitems = samplingitems + rows[i].sampleitemid;
			}
			
			$.post(
				rootPath +"/projects/taskregister/projectsampleitem!removeSampleItem.action",
				{str:samplingitems},
				function(msg){
				if(msg=='success'){
					alert('删除成功！');
					$('#itemlist').datagrid('clearSelections');
					$("#itemlist").datagrid('reload');
				}else{
					alert('删除失败！');
				}
			});
			
		 }
	}
}

//批量设置采样信息，监测项目
function batchSet(){
	var rows = $('#monitorlist').treegrid('getSelections');
	var sampletypesign = "";
	var pointtype = "";
	var projectpointid = "";
	if(rows.length>0){
		for(var i=0;i<rows.length;i++){
			if(rows[i].flag=='monitor'){
				//样品类型
				if(sampletypesign==""){
						sampletypesign = rows[i].sampletypesign;
				}else{
					if(sampletypesign!=rows[i].sampletypesign){
						alert("请选择相同类型下的监测点！");
						return;
					}
				}
				//监测点类型
				if(pointtype==""){
					pointtype = rows[i].pointtype;
				}
				
				//监测点
				if(projectpointid!="")projectpointid = projectpointid + ",";
				projectpointid = projectpointid + rows[i].ppointid;
				
			}
		}
	}else{
		alert("请选择监测点！");
		return false;
	}
	
	//判断所选监测点下的采样设置是否已经存在
	$.post(
		rootPath +"/projects/taskregister/projectmonitorpoint!isSamplingSetExist.action",
		{projectpointid:projectpointid},
		function(msg){
			if(msg=='exist'){
				alert("已存在相关采样、监测项目信息，不能批量设置！");
			}else{
				var url = rootPath + "/projects/taskregister/projectmonitorpoint!toBatchSetPage.action?str="+projectdetail+"&monitortype="+pointtype;
				var _dialog = window.top
						.$('<div id="monitorDialog"  style="padding:0px;"><iframe id="batchFrame" width="100%" height="100%" frameborder="0" scrolling="no" src=' + url + '></iframe></div>')
						.appendTo(window.top.document.body);
				_dialog.dialog( {
					title:'批量设置采样、项目',
					autoOpen : false,
					modal : true,
					closed : true,
					width : '700',
					height : '512',
					buttons : [ {
						text : '保存',
						iconCls : 'icon-save',
						handler : function() {		
							$("#batchFrame",top.document.body).contents().find("#itemid").click();
							$("#batchFrame",top.document.body).contents().find("#projectpointid").val(projectpointid);
							
							$("#batchFrame",top.document.body).contents().find("#batchForm").form('submit',{
								url:rootPath +"/projects/taskregister/projectmonitorpoint!batchAddSamplingSet.action",
								onSubmit:function(){
									var objs = $("#batchFrame",top.document.body).contents().find(".grkj-validate");
									if(!saveCheck(objs)){
										$("#batchFrame",top.document.body).contents().find(":input").focus();
										$("#batchFrame",top.document.body).contents().find(":select").focus();
										alert("数据输入不符合格式，请查看红色边框的输入框的输入提示！");
										return false;
									}
								},
								success:function(data){						
									if(data=='success'){
										_dialog.dialog('close');								
										alert('成功');
										$("#setlist").datagrid('reload');
									}
									if(data=='fail'){
										alert('失败');
									}
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
		});
}

////加载批量设置项目信息
function initBatchIteminfo(items){
	$('#batchitemlist').datagrid({
		nowrap: false,
		striped: true,
		collapsible:true,
		url:rootPath +'/projects/taskregister/projectmonitorpoint!batchItemfoList.action?str='+items, 
		fit:true,
		fitColumns : true,
		scrollbarSize:0,
		remoteSort: false,
		iconCls:"icon-edit",
		idField:"itemid",
		frozenColumns:[[
			{field:'itemid',checkbox:true,align:"center"}
				]],
		columns:[[
			{field:'itemname',title:'监测项目', width:50,align:"center"},
//				{field:'samplenum',title:'采样量', width:60,align:"center"},	
//				{field:'samplecontainer',title:'采样容器', width:80,align:"center"},
//			{field:'itemmethod',title:'分析方法', width:180,align:"center"},
//				{field:'fixedadditive',title:'固定添加剂', width:60,align:"center"},			
			{field:'itemmethod',title:'分析方法<img src="'+rootPath+'/themes/icons/mini_edit.png"/>', width:160,align:"center",
					formatter:function(value,rec,rowIndex){
					var str = "<div id=\"methodDiv"+rowIndex+"\">" +
							value +
							"</div>";
					return str;
				}
			},
			//{field:'samplesavedose',title:'样品保存剂', width:60,align:"center"},
			{field:'unitname',title:'计量单位', width:50,align:"center"},
			
			{field:'analysisFee',title:'分析费<img src="'+rootPath+'/themes/icons/mini_edit.png"/>', width:40,align:"center",
					formatter:function(value,rec,rowIndex){
					var str = "<div name=\"selectDiv1\" id=\"selectDiv1\">"
					+"<input type=\"text\" class=\"TextBox\" " 
					+"id=\"analysisFee"+rowIndex+"\" " 
					+"name=\"analysisFee\" " 					
					+"style=\"width: 250px;height:20px\""
					+"value=" + value
					+">"					
					+"</div>";
					return str;
				}
			},
			{field:'beforeFee',title:'前处理费<img src="'+rootPath+'/themes/icons/mini_edit.png"/>', width:40,align:"center",
					formatter:function(value,rec,rowIndex){
					var str = "<div name=\"selectDiv2\" id=\"selectDiv2\">" 
					+"<input type=\"text\" class=\"TextBox\" " 
					+"id=\"beforeFee"+rowIndex+"\" " 
					+"name=\"beforeFee\" " 					
					+"style=\"width: 250px;height:20px\""
					+"value=" + value
					+">"																						
					+"</div>" ;
					return str;
				}
			},
			{field:'sampleFee',title:'样品采集费<img src="'+rootPath+'/themes/icons/mini_edit.png"/>', width:50,align:"center",
					formatter:function(value,rec,rowIndex){
					var str = "<div name=\"selectDiv3\" id=\"selectDiv3\">" 
					+"<input type=\"text\" class=\"TextBox\" " 
					+"id=\"sampleFee"+rowIndex+"\" " 
					+"name=\"sampleFee\" " 					
					+"style=\"width: 250px;height:20px\""
					+"value=" + value
					+">"	
					+ "</div>";			
					return str;
				}
			},			
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
		]],onDblClickCell:function(rowIndex, field, value){
				$('#batchitemlist').datagrid('clearSelections');	
				$('#batchitemlist').datagrid('selectRow',rowIndex);
				
				var rows = $('#batchitemlist').datagrid('getSelections');				
				$("#selectDiv").remove();//单击之前，先将其他的下拉框至为空
				$("#methodDiv"+rowIndex).html("");//删除单元格中的内容，下面将会用下拉框填充
				var row = $('#batchitemlist').datagrid('getSelected');	
				if(field =="itemmethod" && row.itemid!=""){	
					var str = "<div name=\"selectDiv\" id=\"selectDiv\">" +
								"</div>";
					$("#methodDiv"+rowIndex).html(str);
					getItemAnalysismethod2(row.itemid,rowIndex,row.sampleitemid,row.methodid,value);
				}
				if(field =="analysisFee" && row.itemid!=""){	
					var str = "<div name=\"selectDiv1\" id=\"selectDiv1\">"
					+"<input type=\"text\" class=\"TextBox\" " 
					+"id=\"analysisFee"+row.itemid+"\" " 
					+"name=\"analysisFee\" " 					
					+"style=\"width: 250px;height:20px\""
					+"value=" + value
					+">"					
					+"</div>";				
					$("#analysisFeeDiv"+rowIndex).html(str);
				}
				if(field =="beforeFee" && row.itemid!=""){	
					var str = "<div name=\"selectDiv2\" id=\"selectDiv2\">" 
					+"<input type=\"text\" class=\"TextBox\" " 
					+"id=\"beforeFee"+row.itemid+"\" " 
					+"name=\"beforeFee\" " 					
					+"style=\"width: 250px;height:20px\""
					+"value=" + value
					+">"																						
					+"</div>";
					$("#beforeFeeDiv"+rowIndex).html(str);
				}
			   if(field =="sampleFee" && row.itemid!=""){	
					var str = "<div name=\"selectDiv3\" id=\"selectDiv3\">" 
					+"<input type=\"text\" class=\"TextBox\" " 
					+"id=\"sampleFee"+row.itemid+"\" " 
					+"name=\"sampleFee\" " 					
					+"style=\"width: 250px;height:20px\""
					+"value=" + value
					+">"	
					+ "</div>";
					$("#sampleFeeDiv"+rowIndex).html(str);
				} 
			    	
			   $("#analysisFee"+row.itemid).bind("change",{row: row},function(event){
                  var newAnalysisFee =  $(this).val();
               });
			   	$("#beforeFee"+row.itemid).bind("change",{row: row},function(event){
                  var newBeforeFee =  $(this).val();
               });
			   $("#sampleFee"+row.itemid).bind("change",{row: row},function(event){
                 var newSampleFee =  $(this).val();
               });
			}
	});;
	$(window).resize(function() {
		$("#batchitemlist").datagrid('resize');
	});
}

function addItemByBatch() {
	var sampletypesign = encodeURI(encodeURI($("#sampletypesign").val()));
	var url = rootPath + "/projects/taskregister/projectmonitorpoint!toItemPage.action?str="+projectdetail+"&sampletypesign="+sampletypesign;
	var _dialog = window.top
			.$('<div id="sample-dlg"  style="padding:0px;"><iframe id="itemFrame" width="100%" height="100%" frameborder="0" scrolling="yes" src=' + url + '></iframe></div>')
			.appendTo(window.top.document.body);
	_dialog.dialog( {
		title : '项目管理',
		autoOpen : false,
		modal : true,
		closed : true,
		width : '500',
		height : '500',
		maximizable:true,
		buttons : [ {
			text : '确定',
			iconCls : 'icon-save',
			handler : function() {
					$("#itemFrame",top.document.body).contents().find("#itemid").click();						
					var items = $("#itemFrame",top.document.body).contents().find("#itemid").val();
					var rows = $("#batchitemlist").datagrid('getRows')
					for(var i=0;i<rows.length;i++){
						items = items + "," + rows[i].itemid;
					}
					_dialog.dialog('close');
					initBatchIteminfo(items);
			}
		}, {
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

//删除行
function deleteItemByBatch(){
	var rows = $("#batchitemlist").datagrid('getSelections');
	if(rows.length>0){
		var	rowindex=$('#batchitemlist').datagrid("getRowIndex",rows[0].itemid);
		$('#batchitemlist').datagrid("deleteRow",rowindex);
		deleteItemByBatch();
	}
}
	
//获取所有项目
function getAllRows(){
	var rows = $("#batchitemlist").datagrid('getRows');
	var str = "";
	for(var i=0;i<rows.length;i++){
			if(str!="")
				str = str + ",";
			str = str + rows[i].itemid+'_'+$('#itemmethod'+rows[i].itemid).val()+'_'+$('#analysisFee'+i).val()+'_'+$('#beforeFee'+i).val()+'_'+$('#sampleFee'+i).val();
	}
	
//	alert(str);
	$("#itemid").val(str);
}


function viewMonitorData(){
	$('#monitorlist').treegrid({
		nowrap: false,
		rownumbers: false,
		fit:true,
		fitColumns : true,
		animate:false,
		collapsible:true,
		singleSelect:false,
		scrollbarSize:0,
		idField:'ppointid',
		treeField:'attributetype',
		url:rootPath +'/projects/taskregister/projectmonitorpoint!monitorList.action?str='+projectdetail,
		columns:[[
			{title:'监测点编码',field:'attributetype',width:120},
			{field:'pointname',title:'监测点名称', width:170,align:"center",rowspan:3},
			{field:'object',title:'监测对象', width:120,align:"center"},
			{field:'longitude',title:'监测点经度<img src="'+rootPath+'/themes/icons/mini_edit.png"/>', width:40,align:"center",
					formatter:function(value,rec,rowIndex){
					var str = "<div id=\"longitudeDiv"+rowIndex+"\">" + value +"</div>";
					return str;
					}
			},
			{field:'latitude',title:'监测点纬度<img src="'+rootPath+'/themes/icons/mini_edit.png"/>', width:40,align:"center",
				formatter:function(value,rec,rowIndex){
				var str = "<div id=\"latitudeDiv"+rowIndex+"\">" + value +"</div>";
				return str;
				}
			}
		]],
		onLoadSuccess:function(data){
			var roots = $('#monitorlist').treegrid('getRoots');
			var childrens = $('#monitorlist').treegrid('getChildren',roots[0].ppointid);
			$('#monitorlist').treegrid('select',childrens[0].ppointid);
		},
		onSelect:function(node){
			if(node.flag=='monitor'){
				viewSetinfoData(node.ppointid);
			}
		}
	});
	$(window).resize(function() {
		$("#monitorlist").treegrid('resize');
	});
}

function viewSetinfoData(pmonitorid){	
	$('#setlist').datagrid({
		nowrap: false,
		striped: true,
		collapsible:true,
		url:rootPath +'/projects/taskregister/projectsamplingset!setList.action?str='+pmonitorid, 
		fit:true,
		fitColumns : true,
		scrollbarSize:0,
		remoteSort: false,
		singleSelect:true,
		idField:"samplesetid",
		columns:[[
				{field:'monitordays',title:'监测天数', width:50,align:"center"},
				{field:'monitorfrequency',title:'监测频次(次/天)', width:60,align:"center"},
				{field:'cycle',title:'监测周期', width:50,align:"center"}										
			]],
		onLoadSuccess:function(data){
			if(data.total>0){
				var row = $('#setlist').datagrid('selectRow',0);
			}
		},
		onSelect:function(rowIndex,rowData){
			viewIteminfoData(rowData.samplesetid);
		}
	});
	$(window).resize(function() {
		$("#setlist").datagrid('resize');
	});
}

function viewIteminfoData(samplesetid){
	$('#itemlist').datagrid({
		nowrap: false,
		striped: true,
		collapsible:true,
		url:rootPath +'/projects/taskregister/projectsampleitem!itemList.action?str='+samplesetid, 
		fit:true,
		fitColumns : true,
		scrollbarSize:0,
		remoteSort: false,
		idField:"sampleitemid",
		frozenColumns:[[
			{field:'sampleitemid',checkbox:true,align:"center"}
		]],
		columns:[[
			{field:'itemname',title:'监测项目', width:80,align:"center"},	
			{field:'itemmethod',title:'分析方法', width:160,align:"center"},
			{field:'samplesavedose',title:'样品保存剂', width:60,align:"center"},
			{field:'unitname',title:'计量单位', width:60,align:"center"},
			{field:'analysisFee',title:'分析费', width:40,align:"center"},
			{field:'beforeFee',title:'前处理费', width:40,align:"center"},
			{field:'sampleFee',title:'样品采集费', width:50,align:"center"},
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