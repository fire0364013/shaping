function initDataGrid(){
	$('#datagrid').datagrid({
		singleSelect:true,
		width:'400',
		height:'400',
		nowrap: false,
		striped: true,
		collapsible:true,
		url:'samplereceive!taskList.action',
		fit:true,
		border:true,
		fitColumns:false,
		scrollbarSize:0,
		idField:'projectcode',	
		frozenColumns:[[
			{field : ' ',title : '&nbsp;',width : 30,align : 'center',
			  	formatter : function(value){
			 		return "<input type='radio' name='radio'/>";
			 	}
		 	},
	       {field:'projectcode',title:'流水号',width:40,align : 'center'},
	       {field:'projectrealcode',title:'项目编号',width:80,align : 'center'}
		]],
		columns:[[
	        {field:'status',title:'项目状态',width:80,align : 'center'},
	        {field:'projectname',title:'项目名称',width:280,align : 'left'},
	        {field:'registdate',title:'登记日期',width:110,align : 'center'},	        
	        {field:'registby',title:'登记人',width:80,align : 'center'},
			{field:'wtentprise',title:'委托单位',width:280,align : 'left'},	
			{field:'monitortype',title:'业务类型',width:120,align : 'center'},
			{field:'completedate',title:'要求完成日期',width:80,align : 'center'}
		]],
		pagination:true,
		rownumbers:false,
		pageSize:20,
		pageList:[20,30,40,50],
		onRowContextMenu:function(e,row,rowData){
			$("#datagrid").datagrid("clearSelections");
			$('#datagrid').datagrid('selectRow',parseInt(row));
			$("#taskContextMenu").menu("show", {left: e.pageX,top: e.pageY});
			e.preventDefault();
		},
		onClickRow:function(rowIndex,rowData){
			$('#samplingListFrame').attr("src","");
			$('#sampleFlowListFrame').attr("src","");
			selectTab('样品交接');
			initEntInfo();
		},
		onSelect:function(rowIndex,rowData){
			$("#projectcode").val(rowData.projectcode);
			$($("input[type=radio]")[rowIndex]).attr("checked", true);
		},
		onLoadSuccess:function(data){
			$('#datagrid').datagrid('selectRow',0);
			initEntInfo();
		}
	});
	$('#tasklist').resize(function(){
		$("#datagrid").datagrid('resize');
	});
}

function selectTab(title){
	$('#tab').tabs({
		onSelect: function(title){
			if(title == '交接记录单'){
				if($('#projectcode').val()!=''){
					if($('#samplingListFrame').attr('src')==undefined||$('#samplingListFrame').attr('src')==""){
						$("#samplingListFrame").attr("src",rootPath + "/projects/samplereceive/samplereceive!toSamplingListPage.action?projectcode="+$('#projectcode').val());
					}	
				}
			}
			else if(title == '样品流转单'){
				if($('#projectcode').val()!=''){
					if($('#sampleFlowListFrame').attr('src')==undefined||$('#sampleFlowListFrame').attr('src')==""){
						$("#sampleFlowListFrame").attr("src",rootPath +"/projects/samplereceive/samplereceive!toFlowListPage.action?projectcode="+$('#projectcode').val());
					}	
				}
			}else if(title == '样品交接单'){
				if($('#projectcode').val()!=''){
					$("#samplingReportFrame").attr("src",rootPath + "/common/report!toReportPage.action?raq="+encodeURI(encodeURI("样品交接单I.raq"))+"&projectcode="+$('#projectcode').val());
				}
			}
		}			
	});
}

//初始化样品交接记录单
function initSamplingList(){
	$('#tree').tree({
		url: rootPath+"/projects/samplereceive/samplereceive!initSamplingList.action?projectcode="+projectcode,
		onClick:function(node){
			var flag = $('#tree').tree('isLeaf',node.target);
			alert(node.text);
			if(flag){
				var url = rootPath + "/common/report!toReportPage.action?raq=/samplingList/";
				var arr = node.id.split("-");
				url = url + encodeURI(encodeURI(node.attributes.url))+"&projectcode="+projectcode+"&monitorpointtype="+arr[0];
				if(node.attributes.flag=='item'){
					url = url + "&itemid="+arr[1];
				}
				$("#samplingReportFrame").attr("src",url);
			}
		}
	});
}

function initSamplingReport(){
	var cb = $("input[type=checkbox]:checked");
	var value = cb.val();
	var reportType = value.split("-")[0];
	var reportUrl = encodeURI(encodeURI(value.split("-")[1]));
	$("#flowListFrame").attr("src",rootPath + "/common/report!toReportPage.action?raq=/flowList/"+reportUrl
		+"&projectcode="+projectcode+"&monitorpointtype="+reportType);
}

//查看任务单
function viewTaskList(){
	var projectcode = $("#projectcode").val();
	var reportname = encodeURI(encodeURI("任务计划单.raq"));
	var url = rootPath + "/common/report!toReportPage.action?raq="+reportname+"&projectcode="+projectcode;
	
	var _dialog =  window.top.$('	<div id ="dlg" style="padding:0px;"><iframe id="frame" width="100%" height="100%" frameborder="0" scrolling="yes" src='+url+'></iframe></div>').appendTo(window.top.document.body);
	_dialog.dialog({
	title:'任务计划单',
	autoOpen:false,
	modal:true,
	closed:true,
	maximizable:true,
	width:'800',
	height:'600',
	onClose:function(){
			_dialog.dialog("destroy");					
		}
	});
	_dialog.dialog('open');
}
//进入查询页面
function toSearchObj(){
	var url = rootPath + "/projects/samplereceive/samplereceive!toTaskSearchPage.action";
	var _dialog =  window.top.$('<div id ="tg-dlg" style="padding:0px;"><iframe id="searchFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
	_dialog.dialog({
	title:'监测任务查询',
	autoOpen:false,
	modal:true,
	closed:true,
	width:'500',
	height:'250',
	buttons:[{
		text:'确定',
		iconCls:'icon-save',
		handler:function(){
				//操作列表页面的查询按钮
				var registby = $("#searchFrame",top.document.body).contents().find("#registby").val();
				var monitortype = $("#searchFrame",top.document.body).contents().find("#monitortype").val();
				var entprise = $("#searchFrame",top.document.body).contents().find("#wtentprise").val();
				var registdate1 = $("#searchFrame",top.document.body).contents().find("#registdateFirst").val();
				var registdate2 = $("#searchFrame",top.document.body).contents().find("#registdateSecond").val();
				var projectrealcode = $("#searchFrame",top.document.body).contents().find("#projectrealcode").val();
				var projectname = $("#searchFrame",top.document.body).contents().find("#projectname").val();
				var projectcode = $("#searchFrame",top.document.body).contents().find("#projectcode").val();
				
				$('#datagrid').datagrid({
					queryParams : {
						projectcode : projectcode,
						projectrealcode : projectrealcode,
						projectname : projectname,
						registby : registby,
						monitortype : monitortype,
						entprise : entprise,
						registdate1 : registdate1,
						registdate2 : registdate2
					},
					pageNumber : 1
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

function initExternal(){
	var entid = $('#ent').val();
	var pointtype = $('#pointtype').val();
	var projectcode = $('#projectcode').val();
	$.ajax({
		type:'POST',
		url:rootPath + '/projects/samplereceive/samplereceive!externalInfo.action',
		data:'entprise='+entid+'&monitortypeid='+pointtype+'&projectcode='+projectcode,
		success:function(msg){
			$('#external').html(msg);
		}
	});	
}

//未接受样品列表
function iniSampleList(){
//	alert("hh");
	$('#samplelist').datagrid({	
		tableName:'sampleslist',
		singleSelect:false,
		nowrap: false,
		striped: true,
		collapsible:true,
		url:rootPath+'/projects/samplereceive/samplereceive!sampleReceiveList.action?projectcode='+$("#projectcode").val()+"&entprise="+$("#ent").val()+"&monitortypeid="+$("#pointtype").val(),
		fit:true,
		border:true,
		fitColumns:true,
		idField:'sampleid',
		checkOnSelect:true,
		selectOnCheck:true,
		scrollbarSize:0,
		frozenColumns:[[
						{field:'sampleid',checkbox:true,align:"center"}
									]],
					columns:[[
					        // {field:'taskcode',title:'任务编号',width:40,align:"center"},
					        // {field:'taskname',title:'任务名称',width:80,align:"center"},
							 {field:'samplecode',title:'样品编号',width:40,align:"center"},
							 {field:'samplename',title:'样品名称<img src=\"' + rootPath+ '/themes/icons/mini_edit.png\" />',width:40,align:"center"},
							 {field:'monitortype',title:'监测点类型',width:40,align:"center"},
							 {field:'pointcode',title:'监测点编码',width:40,align:"center"},
							 {field:'pointname',title:'监测点名称',width:40,align:"center"},
							 {field:'condition',title:'样品状况<img src=\"' + rootPath+ '/themes/icons/mini_edit.png\" />',width:40,align:"center"},
							 {field:'isright',title:'是否相符 <img src=\"' + rootPath+ '/themes/icons/mini_edit.png\" />',width:40,align:"center"},
							 {field:'color',title:'颜色<img src=\"' + rootPath + '/themes/icons/mini_edit.png\" />',width:40,align:"center"},
							 {field:'hunzhuo',title:'浑浊程度<img src=\"' + rootPath+ '/themes/icons/mini_edit.png\" />',width:40,align:"center"},
							 {field:'beizhu',title:'备注<img src=\"' + rootPath + '/themes/icons/mini_edit.png\" />',width:40,align:"center"},
							 {field:'sampletime',title:'采样日期',width:40,align:"center"},
							 {field:'status',title:'状态',width:40,align:"center"}						
					]],
		pagination:true,
		rownumbers:true,
		pageSize:15,
		pageList:[15,25,35,50],
		onLoadSuccess:function(data){
				var header = $("#samplelist").parent(".datagrid-view").find("div.datagrid-header");
				var fields = header.find("td:has(div.datagrid-cell)");
				$(fields).unbind('click');//先取消绑定
				
				for(var i=0;i<fields.length;i++){
					if($(fields[i]).attr('field') =='isright'){
						$(fields[i]).bind('click',function(e){
							isRight($(this).attr('field'));
						});
					}else if($(fields[i]).attr('field') =='condition'){
						$(fields[i]).bind('click',function(e){
							selectCondition();
						});
					}else if($(fields[i]).attr('field') =='color'){
						$(fields[i]).bind('click',function(e){
							selectColor();
						});
					}else if($(fields[i]).attr('field') =='hunzhuo'){
						$(fields[i]).bind('click',function(e){
							selecthunzhuo();
						});
					}else if($(fields[i]).attr('field') =='beizhu'||$(fields[i]).attr('field') =='samplename'){
						$(fields[i]).bind('click',function(e){
							selectBeizhu($(this).attr('field'));
						});
					}
				}
				
//				var view =  $("#samplelist").parent().find("div.datagrid-view2");
//				var header=view.find("div.datagrid-header");
//				var body=view.find("div.datagrid-body");
//				var checkbox=header.find("div.datagrid-header-check").find("input[type=checkbox]");
//				$(checkbox).click(function(){
//					if($(checkbox).attr("checked")){
//						$("#samplelist").datagrid("selectAll");
//					}else{
//						$("#samplelist").datagrid("unselectAll");
//					}
//				})
			},
			onRowContextMenu:function(e,rowIndex,rowData){
			$("#samplelist").datagrid("clearSelections");
			$('#samplelist').datagrid("selectRow",rowIndex);
			e.preventDefault();
		}
		});
		$('#contentlist').resize(function(){
			$("#samplelist").datagrid('resize');
		});
	
//$('#samplelist').datagrid({
//			tableName:'samplelist',
//			singleSelect:false,
//			nowrap: false,
//			striped: true,
//			collapsible:true,
//			url:'samplereceive!sampleList.action?projectcode='+$("#projectcode").val()+"&entprise="+$("#ent").val()+"&monitortypeid="+$("#pointtype").val(),
//			fit:true,
//			border:true,
//			fitColumns:false,
//			idField:'sampleid',
//			scrollbarSize:0,
//			columns:[[]],
//			pagination:true,
//			rownumbers:false,
//			pageSize:15,
//			pageList:[15,25,35,50],
//			onLoadSuccess:function(data){
//				var header = $("#samplelist").parent(".datagrid-view").find("div.datagrid-header");
//				var fields = header.find("td:has(div.datagrid-cell)");
//				$(fields).unbind('click');//先取消绑定
//				
//				for(var i=0;i<fields.length;i++){
//					if($(fields[i]).attr('field') =='isright'){
//						$(fields[i]).bind('click',function(e){
//							isRight();
//						});
//					}else if($(fields[i]).attr('field') =='condition'){
//						$(fields[i]).bind('click',function(e){
//							selectCondition();
//						});
//					}
//				}
//				
//				var view =  $("#samplelist").parent().find("div.datagrid-view2");
//				var header=view.find("div.datagrid-header");
//				var body=view.find("div.datagrid-body");
//				var checkbox=header.find("div.datagrid-header-check").find("input[type=checkbox]");
//				$(checkbox).click(function(){
//					if($(checkbox).attr("checked")){
//						$("#samplelist").datagrid("selectAll");
//					}else{
//						$("#samplelist").datagrid("unselectAll");
//					}
//				})
//			}
//		});
//		$('#contentlist').resize(function(){
//			$("#samplelist").datagrid('resize');
//		});
	
}
//样品颜色
function selectColor(fieldname){
	var rows = $('#samplelist').datagrid("getSelections");
	if(rows.length==0){
		alert("请至少选择一条记录！");
		return;
	}
	var _dialog =  window.top.$('<div onkeydown="PreventBSK()" id ="dlg">'
//			+'<table width="100%"border="1" align="center" class="grid">'
//			+'<tr>'
//			+'<td  align="left" class="Main_Tab_Style_Content">'
			+'<select id="sampleColor" name="sampleColor" class="TextBox" style="width: 100%;">'
			+'</select>'
//			+'</td>'
//			+'</tr>'
//			+'</table>'
			+'</div>').appendTo(window.top.document.body);
	
	initSampleColor(fieldname);
	_dialog.dialog({
		title:'样品颜色',
		autoOpen:false,
		modal:true,
		closed:true,
		width:'230',
		height:'100',
		buttons:[{
			text:'确定',
			iconCls:'icon-save',
			handler:function(){
				var feature=$(window.top.document).find("#sampleColor option:selected").text();
				
				var rows = $('#samplelist').datagrid("getSelections");
					var json = "{'feature':'"+feature+"','data':[";
					for(var i=0;i<rows.length;i++){
						json = json + "{'sampleid':'"+rows[i].sampleid+"'},";
					}
					json =json.substring(0,json.length-1);
					json = json +"]}";
					
					$.ajax({
						type:'POST',
						url:rootPath + '/projects/samplereceive/samplereceive!updateSample.action',
						data:'json='+json+'&info=color',
						success:function(data){
							if(data=='success'){
//								alert('修改成功！');
								$('#samplelist').datagrid('reload');
							}else{
								alert('修改失败！');
							}
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
function initSampleColor(fieldname){
	$.ajax( {
		type : 'POST',
		url : rootPath +'/projects/samplereceive/samplereceive!initSampleCondition.action',
		data: "info=YPYS",
		success : function(data) {
			var vData = eval("(" + data + ")");
			var lList = "";
			jQuery.each(vData, function(i, n) {
				lList += "<option value=" + n.code + ">" + n.value	+ "</option>";
			});				
			$('#sampleColor',window.top.document).html(lList);
		}
	});
}
//样品浑浊程度
function selecthunzhuo(){
	var rows = $('#samplelist').datagrid("getSelections");
	if(rows.length==0){
		alert("请至少选择一条记录！");
		return;
	}
	var _dialog =  window.top.$('<div onkeydown="PreventBSK()" id ="dlg">'
//			+'<table width="100%"border="1" align="center" class="grid">'
//			+'<tr>'
//			+'<td  align="left" class="Main_Tab_Style_Content">'
			+'<select id="sampleHunzhuo" name="sampleHunzhuo" class="TextBox" style="width: 100%;">'
			+'</select>'
//			+'</td>'
//			+'</tr>'
//			+'</table>'
			+'</div>').appendTo(window.top.document.body);
	
	initSampleHunzhuo();
	_dialog.dialog({
		title:'样品浑浊程度',
		autoOpen:false,
		modal:true,
		closed:true,
		width:'230',
		height:'100',
		buttons:[{
			text:'确定',
			iconCls:'icon-save',
			handler:function(){
				var feature=$(window.top.document).find("#sampleHunzhuo option:selected").text();
				var rows = $('#samplelist').datagrid("getSelections");
					var json = "{'feature':'"+feature+"','data':[";
					for(var i=0;i<rows.length;i++){
						json = json + "{'sampleid':'"+rows[i].sampleid+"'},";
					}
					json =json.substring(0,json.length-1);
					json = json +"]}";
					
					$.ajax({
						type:'POST',
						url:rootPath + '/projects/samplereceive/samplereceive!updateSample.action',
						data:'json='+json+'&info=hunzhuo',
						success:function(data){
							if(data=='success'){
//								alert('修改成功！');
								$('#samplelist').datagrid('reload');
							}else{
								alert('修改失败！');
							}
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
function initSampleHunzhuo(){
	$.ajax( {
		type : 'POST',
		url : rootPath +'/projects/samplereceive/samplereceive!initSampleCondition.action',
		data: "info=YPHZCD",
		success : function(data) {
			var vData = eval("(" + data + ")");
			var lList = "";
			jQuery.each(vData, function(i, n) {
				lList += "<option value=" + n.code + ">" + n.value	+ "</option>";
			});				
			$('#sampleHunzhuo',window.top.document).html(lList);
		}
	});
}
//样品备注
function selectBeizhu(field){
	var rows = $('#samplelist').datagrid("getSelections");
	if(rows.length==0){
		alert("请至少选择一条记录！");
		return;
	}
	var _dialog =  window.top.$('<div onkeydown="PreventBSK()" id ="dlg">'
//			+'<table width="100%"border="1" align="center" class="grid">'
//			+'<tr>'
//			+'<td  align="left" class="Main_Tab_Style_Content">'
			+'<textarea id="remark" name="remark" style="width: 100%; height: 60px;">'
			+'</textarea>'
//			+'</td>'
//			+'</tr>'
//			+'</table>'
			+'</div>').appendTo(window.top.document.body);
	_dialog.dialog({
		title:'样品信息',
		autoOpen:false,
		modal:true,
		closed:true,
		width:'230',
		height:'100',
		buttons:[{
			text:'确定',
			iconCls:'icon-save',
			handler:function(){
				var feature=$(window.top.document).find("#remark").val();
				var rows = $('#samplelist').datagrid("getSelections");
					var json = "{'feature':'"+feature+"','data':[";
					for(var i=0;i<rows.length;i++){
						json = json + "{'sampleid':'"+rows[i].sampleid+"'},";
					}
					json =json.substring(0,json.length-1);
					json = json +"]}";
					
					$.ajax({
						type:'POST',
						url:rootPath + '/projects/samplereceive/samplereceive!updateSample.action',
						data:'json='+json+'&info='+field,
						success:function(data){
							if(data=='success'){
//								alert('修改成功！');
								$('#samplelist').datagrid('reload');
							}else{
								alert('修改失败！');
							}
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
//企业选择
function selectEnt(){
	var url = rootPath + "/projects/samplereceive/samplereceive!toEntpriseListPage.action?projectcode="+$("#projectcode").val();
	var _dialog =  window.top.$('<div id ="ent-dlg"  style="padding:0px;"><iframe id="entFrame" width="100%" height="100%" ' +
	'frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
	
	_dialog.dialog({
	title:'选择企业',
	autoOpen:false,
	modal:true,
	closed:true,
	width:'800',
	height:'700',
	buttons:[{
		text:'确定',
		iconCls:'icon-save',
		handler:function(){
				var entid = $("#entFrame",top.document.body).contents().find("#entid").val();
				var entname = $("#entFrame",top.document.body).contents().find("#entname").val();
				$("#entid").val(entid);
				$("#entname").val(entname);
				if(entid==null || entid==''){
					return false;
				}else{
					initEntMonitorType();
				}
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

function initEntGrid(){
	$('#datagrid').datagrid({
		nowrap: false,
		striped: true,
		collapsible:true,
		url: rootPath + '/projects/samplereceive/samplereceive!initBcEnteprise.action?projectcode='+projectcode,
		fit:true,
		fitColumns:true,
		scrollbarSize:0,
		idField:'entid',
		singleSelect:true,
		columns:[[
			 {field : 'entid',title : '&nbsp;',width : 30,align : 'center',
			  	formatter : function(value){
			 		return "<input type='radio' name='radio'/>";
			 	}
		 	},
	        {field:'entname',title:'企业名称',width:300,align : 'center'},					
			{field:'pollution',title:'污染源类型',width:150,align : 'center'},
			{field:'industry',title:'行业类型',width:200,align : 'center'}
		]],
		onSelect:function(rowIndex,rowData){
			$($("input[type=radio]")[rowIndex]).attr("checked", true);
			$("#entid").val(rowData.entid);
			$("#entname").val(rowData.entname);
		},
		pagination:true,
		rownumbers:false,
		pageSize:20,
		pageList:[20,30,40,50]
		
	});	
}

function initEntInfo(){
	var projectcode = $("#projectcode").val();
	$.ajax( {
		type : 'POST',
		url : rootPath + '/projects/samplereceive/samplereceive!initBcEnteprise.action?timeStamp='+new Date().getTime(),
		data:'projectcode='+projectcode,
		success : function(data) {
			var vData = eval("(" + data + ")");
			var lList = "";
			jQuery.each(vData, function(i, n) {
				if(i==0){
					lList += "<option value=" + n.entid + " selected>" + n.entname	+ "</option>";
				}else{
					lList += "<option value=" + n.entid + ">" + n.entname	+ "</option>";
				}
				
			});		
			$('#ent').html(lList);
			initEntMonitorType();
		}
	});
}

function initEntMonitorType(){
	var projectcode = $("#projectcode").val();
	var entid = $("#ent").val();
	$.ajax( {
		type : 'POST',
		url : rootPath + '/projects/samplereceive/samplereceive!initEntMonitorType.action?timeStamp='+new Date().getTime(),
		data:'projectcode='+projectcode+'&entprise='+entid,
		success : function(data) {
			var vData = eval("(" + data + ")");
			var lList = "";
			jQuery.each(vData, function(i, n) {
				if(i==0){
					lList += "<option value=" + n.typeid + " selected>" + n.typename	+ "</option>";
				}else{
					lList += "<option value=" + n.typeid + ">" + n.typename	+ "</option>";
				}
				
			});	
			$('#pointtype').html(lList);
			initExternal();
			iniSampleList();
		}
	});
}

//是否与记录相符
function isRight(){
	var rows = $('#samplelist').datagrid("getSelections");	
	if(rows.length==0){
		alert("请至少选择一条记录！");
		return;
	}
	var _dialog =  window.top.$('<div onkeydown="PreventBSK()" id ="dlg" style="padding:0px;">'
			+'<input type="radio" name="isright" value="Y" checked="true"/>是'
			+'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'
			+'<input type="radio" name="isright" value="N"/>否'
			+'</div>').appendTo(window.top.document.body);
	_dialog.dialog({
		title:'是否与记录相符',
		autoOpen:false,
		modal:true,
		closed:true,
		width:'230',
		height:'100',
		buttons:[{
			text:'确定',
			iconCls:'icon-save',
			handler:function(){
				var isRight=$(window.top.document).find("input[name=isright]:checked").val();
				var json = "{'isRight':'"+isRight+"','data':[";
				for(var i=0;i<rows.length;i++){
					json = json + "{'sampleid':'"+rows[i].sampleid+"'},";
				}
				json =json.substring(0,json.length-1);
				json = json +"]}";

				$.ajax({
					type:'POST',
					url:rootPath + '/projects/samplereceive/samplereceive!updateSample.action',
					data:'json='+json+'&info=isright',
					success:function(data){
						if(data=='success'){
//							alert('修改成功！');
							$('#samplelist').datagrid('reload');
						}else{
							alert('修改失败！');
						}
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

//样品状况
function selectCondition(){
	var rows = $('#samplelist').datagrid("getSelections");
	if(rows.length==0){
		alert("请至少选择一条记录！");
		return;
	}
	var _dialog =  window.top.$('<div onkeydown="PreventBSK()" id ="dlg">'
//			+'<table width="100%"border="1" align="center" class="grid">'
//			+'<tr>'
//			+'<td  align="left" class="Main_Tab_Style_Content">'
			+'<select id="samplefeature" name="samplefeature" class="TextBox" style="width: 100%;">'
			+'</select>'
//			+'</td>'
//			+'</tr>'
//			+'</table>'
			+'</div>').appendTo(window.top.document.body);
	
	initSampleCondition();
	_dialog.dialog({
		title:'样品状况',
		autoOpen:false,
		modal:true,
		closed:true,
		width:'230',
		height:'100',
		buttons:[{
			text:'确定',
			iconCls:'icon-save',
			handler:function(){
				var feature=$(window.top.document).find("#samplefeature option:selected").text();
				var rows = $('#samplelist').datagrid("getSelections");
					var json = "{'feature':'"+feature+"','data':[";
					for(var i=0;i<rows.length;i++){
						json = json + "{'sampleid':'"+rows[i].sampleid+"'},";
					}
					json =json.substring(0,json.length-1);
					json = json +"]}";
					
					$.ajax({
						type:'POST',
						url:rootPath + '/projects/samplereceive/samplereceive!updateSample.action',
						data:'json='+json+'&info=condition',
						success:function(data){
							if(data=='success'){
//								alert('修改成功！');
								$('#samplelist').datagrid('reload');
							}else{
								alert('修改失败！');
							}
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

function initSampleCondition(){
	$.ajax( {
		type : 'POST',
		url : rootPath +'/projects/samplereceive/samplereceive!initSampleCondition.action',
		data: "info=YPZK",
		success : function(data) {
			var vData = eval("(" + data + ")");
			var lList = "";
			jQuery.each(vData, function(i, n) {
				lList += "<option value=" + n.code + ">" + n.value	+ "</option>";
			});				
			$('#samplefeature',window.top.document).html(lList);
		}
	});
}

function showReportList(){
	var projectcode = $("#projectcode").val();
//	var url = rootPath + "/projects/samplereceive/samplereceive!toReportListPage.action?projectcode="+projectcode;
	var url = rootPath + "/projects/samplereceive/samplereceive!toSamplingListPage.action?projectcode="+projectcode;
	
	var _dialog =  window.top.$('	<div id ="dlg" style="padding:0px;"><iframe id="frame" width="100%" height="100%" frameborder="0" scrolling="yes" src='+url+'></iframe></div>').appendTo(window.top.document.body);
	_dialog.dialog({
	title:'记录单',
	autoOpen:false,
	modal:true,
	closed:true,
	maximizable:true,
	width:'800',
	height:'600',
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

//点击提交或退回按钮
function sampleOperate(action){
	var rows = $('#samplelist').datagrid('getSelections');
	if(rows==""){
		alert("请至少选择一条记录！");
		return;
	}
		
	if(action=='退回'){
		var url = rootPath + "/projects/opinion/opinion!input.action?moduleid="+encodeURI(encodeURI('样品接收退回意见'))+"&showName="+encodeURIComponent(encodeURIComponent(action+'意见'));
		var _dialog =  window.top.$('	<div id ="dlg" style="padding:0px;"><iframe id="dlgFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
			_dialog.dialog({
				title:'审核意见',
				autoOpen:false,
				modal:true,
				closed:true,
				width:'500',
				height:'220',
				buttons:[{
					text:'确定',
					iconCls:'icon-save',
					handler:function(){
						var value = $("#dlgFrame",top.document.body).contents().find("#opinion").val();
						dataCommit(value,"0",action);
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
	}else{
		if(confirm("是否提交？")){
			dataCommit('','',action);
		}
	}
}

function dataCommit(message,taskid,action){
	var projectcode = $("#projectcode").val();
	var entid = $("#ent").val();
	var pointtype = $("#pointtype").val();
	var rows = $('#samplelist').datagrid('getSelections');
	var sampleid = '';
	for(var i=0;i<rows.length;i++){
		if(sampleid!='') sampleid = sampleid + ',';
		sampleid = sampleid + rows[i].sampleid;
	}
	var json = "{'projectcode':'"+projectcode+"','entid':'"+entid+"','pointtype':'"+pointtype+"','samples':'"+sampleid+"'}";
	$(window.top.document.body).block({ 
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
	
	$.ajax({
		type:'POST',
		url:rootPath + '/projects/samplereceive/samplereceive!operate.action',
		data:'json='+json+'&opinion='+message+'&info='+action+'&taskid='+taskid,
		success:function(msg){
			$(window.top.document.body).unblock(); 
		 	if(msg=='success'){
		 		alert('成功！');
		 		$('#datagrid').datagrid('reload');
//		 		$('#samplelist').datagrid('clearSelections');
		 	}else{
		 		alert('失败！');
		 	}
		}
	});
}
//function modifyWorkflow(){
//	var _dialog = window.top.$('<div onkeydown="PreventBSK()" id="blg" style="left:100px;top:180px;" >'
//								+'<select id="nextWorkflow" name="nextWorkflow" style="width:100%;height:20px;">'
//								+'</select>'
//								+'</div>').appendTo(window.top.document.body);
//	initWorkflow();
//	_dialog.dialog({
//		title:"下一步流程",
//		autoOpen:false,
//		modal:true,
//		closed:true,
//		width:'300',
//		height:'120',
//		buttons:[{
//			text:'确定',
//			iconCls:'icon-save',
//			handler:function(){
//				var taskid = $(window.top.document).find("#nextWorkflow").val();
//				dataCommit("",taskid,"提交");
//				_dialog.dialog('close');
//			}
//		},{
//			text:'取消',
//			iconCls:'icon-cancel',
//			handler:function(){
//				_dialog.dialog('close');
//			}
//		}],
//		onClose:function(){
//			_dialog.dialog("destroy");
//		}
//	});
//	_dialog.dialog('open');
//}

function checkFuntion(action){	
	var rows = $('#samplelist').datagrid('getSelections');
	if(rows==""){
		alert("请至少选择一条记录！");
		return;
	}
	var url = rootPath + "/projects/appraiseopinion/appraiseopinion!opinionlhNew.action?showName="+encodeURI(encodeURI(action+"意见"))+"&projectcode="+$("#projectcode").val();
	var _dialog =  window.top.$('	<div id ="dlg" style="padding:0px;"><iframe id="dlgFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
	initWorkflow();
	_dialog.dialog({
	title:action+'意见',
	autoOpen:false,
	modal:true,
	closed:true,
	width:'520',
	height:'320',
	buttons:[{
		text:'确定',
		iconCls:'icon-ok',
		handler:function(){
			var userPwd = $("#dlgFrame",window.top.document).contents().find("#userPwd").val();
			var loginpwd = $("#dlgFrame",window.top.document).contents().find("#loginpwd").val();
			if(userPwd != loginpwd){
				alert("密码输入错误，请重新输入！")
				return;
			}
			var projectcode = $("#dlgFrame",window.top.document).contents().find("#projectcode").val();
			$("#dlgFrame",top.document.body).contents().find("#opinionform").form('submit',{
					
					url:rootPath +'/projects/attachment/projectattachment!save.action?projectid='+projectcode,
					onSubmit:function(){
					},
					success:function(data){
						if(data=='success'){
						}else if(data=='fail'){
							alert('保存失败,请查看你上传的文件是否为空！');
						}			
					},
					error:function(data){
						alert("失误");
					}
				});	
			var taskid=$("#dlgFrame",window.top.document).contents().find("#nextWorkflow").val();
			var userid = $("#dlgFrame",window.top.document).contents().find("#userid").val();
			var opinion = $("#dlgFrame",window.top.document).contents().find("#opinion").val();
			dataCommit(opinion,taskid,action);
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

function initWorkflow(){
	if(window.confirm('是否提交？')){
	$.ajax({
		type:'post',
		url : rootPath +'/workflow/workflow!workflowStepList.action',
		data: "status=SampeReceive&workflowcode=JC_PROJECT",
		success:function(data){
			var vData = eval("("+data+")");
			var List = "";
			jQuery.each(vData,function(i,n){
				List +="<option value='"+n.code+"'>"+n.value+"</option>"
			});
//			$("#nextWorkflow",window.top.document).html(List);	
			$('#dlgFrame',window.top.document).contents().find("#nextWorkflow").html(List);
		}
	});
	}
}
