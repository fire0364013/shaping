function initDataGrid(){
	$('#datagrid').datagrid({
		singleSelect:false,
		width:'400',
		height:'400',
		nowrap: false,
		striped: true,
		collapsible:true,
		url:'taskapprove!taskList.action',
		fit:true,
		border:true,
		fitColumns:false,
		scrollbarSize:0,
		idField:'projectcode',	
		frozenColumns:[[
	       {field:'checkbox',checkbox:true,align : 'center'},
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
			var taskUrl;
			$("#datagrid").datagrid("clearSelections");
			$('#datagrid').datagrid('selectRow',parseInt(rowIndex));			
			$('#BasicInfoFrame').attr("src","");
			$('#MonitorEntFrame').attr("src","");
			$('#AppraiseOpinionFrame').attr("src","");
			$('#WorkflowImgFrame').attr("src","");
			$('#AttachmentFrame').attr("src","");

			addTabs(rowData.monitortypecode);
//			selectView('基本信息');
		},
		onSelect:function(rowIndex,rowData){
			$("#projectcode").val(rowData.projectcode);
			$("#stepcode").val(rowData.stepcode);
			$("#monitortype").val(rowData.monitortypecode);
		}
	});
	$('#taskDiv').resize(function(){
		$("#datagrid").datagrid('resize');
	});
}

function selectView(title){
	$('#tt').tabs({
		onSelect: function(title){
			if(title == '基本信息'){
				if($('#projectcode').val()!=''){
					if($("#monitortype").val()=='100'){//委托
						if($('#BasicInfoFrame').attr('src')==undefined||$('#BasicInfoFrame').attr('src')==""){
							$("#BasicInfoFrame").attr("src",rootPath +"/projects/taskregister/taskregister!waiweiView.action?id="+$('#projectcode').val());
						}
					}else if($("#monitortype").val()=='001'){//环境质量
						if($('#BasicInfoFrame').attr('src')==undefined||$('#BasicInfoFrame').attr('src')==""){
							$("#BasicInfoFrame").attr("src",rootPath +"/projects/taskregister/taskregister!huanjingView.action?id="+$('#projectcode').val());
						}
					}else if($("#monitortype").val()=='003'){//临时
						if($('#BasicInfoFrame').attr('src')==undefined||$('#BasicInfoFrame').attr('src')==""){
							$("#BasicInfoFrame").attr("src",rootPath +"/projects/taskregister/taskregister!linshiView.action?id="+$('#projectcode').val());
						}
					}else if($("#monitortype").val()=='004'){//比对
						if($('#BasicInfoFrame').attr('src')==undefined||$('#BasicInfoFrame').attr('src')==""){
							$("#BasicInfoFrame").attr("src",rootPath +"/projects/taskregister/taskregister!biduiView.action?id="+$('#projectcode').val());
						}
					}else if($("#monitortype").val()=='002'){//污染源
						if($('#BasicInfoFrame').attr('src')==undefined||$('#BasicInfoFrame').attr('src')==""){
							$("#BasicInfoFrame").attr("src",rootPath +"/projects/taskregister/taskregister!wuranyuanView.action?id="+$('#projectcode').val());
						}
					}
					
				}
			}else if(title == '监测企业'){
				if($('#projectcode').val()!=''){
					$('#MonitorEntFrame').attr('src','');
					if($('#MonitorEntFrame').attr('src')==undefined||$('#MonitorEntFrame').attr('src')==""){							
						$("#MonitorEntFrame").attr("src",rootPath +"/projects/taskregister/projectdetail!view.action?id="+$('#projectcode').val());
					}
				}
			}
			else if(title == '流转记录'){
				if($('#projectcode').val()!=''){
					if($('#AppraiseOpinionFrame').attr('src')==undefined||$('#AppraiseOpinionFrame').attr('src')==""){
						$("#AppraiseOpinionFrame").attr("src",rootPath + "/projects/opinion/opinion!list.action?id="+$('#projectcode').val());
					}
				}
			}else if(title == '流程图'){
				if($('#projectcode').val()!=''){
					if($('#TaskFlowChartFrame').attr('src')==undefined||$('#TaskFlowChartFrame').attr('src')==""){
						$("#TaskFlowChartFrame").attr("src",rootPath+"/projects/flowchart/flowchart!toFlowChartPage.action?entityid="+$('#projectcode').val());
					}
				}
			}else if(title == '附件'){
				if($('#projectcode').val()!=''){
					if($('#fjFrame').attr('src')==undefined||$('#fjFrame').attr('src')==""){
						$("#fjFrame").attr("src",rootPath+"/projects/attachment/projectattachment!noadd.action?projectid="+$('#projectcode').val());	
					}
				}
			}else if(title == '任务计划单'){
				if($('#projectcode').val()!=''){
					if($('#TaskListFrame').attr('src')==undefined||$('#TaskListFrame').attr('src')==""){
//						$("#TaskListFrame").attr("src",rootPath + "/common/report!toReportPage.action?raq="+encodeURI(encodeURI("例行监测任务计划单（环境空气质量监测）.raq"))+"&projectcode="+$('#projectcode').val());
						$("#TaskListFrame").attr("src",rootPath + "/projects/taskregister/taskregister!toprojectplanPage.action?projectcode="+$('#projectcode').val());
					}	
				}
			}else if(title == '委托协议'){
				if($('#projectcode').val()!=''){
					//if($('#WeituoFrame').attr('src')==undefined||$('#TaskListFrame').attr('src')==""){
						var projectcode = $('#projectcode').val();
						$.ajax( {
								type : 'POST',
								url :rootPath + "/projects/taskregister/taskregister!matchingsamplesource.action",
								data : {'projectcode' : projectcode},
								success : function(data) {
									
									if (data == 'fail') {
										alert("加载失败！");
										return;
									}else if (data == '1' || data== '3'){
										$("#WeituoFrame").attr("src",rootPath + "/common/report!toReportPage.action?raq="+encodeURI(encodeURI("通用委托监测协议.raq"))+"&projectcode="+$('#projectcode').val());
									}else if (data == '2'){
										$("#WeituoFrame").attr("src",rootPath + "/common/report!toReportPage.action?raq="+encodeURI(encodeURI("样品送检委托协议.raq"))+"&projectcode="+$('#projectcode').val());
									}else{
										alert(data);
									}
					
									}
						});
						
						//$("#WeituoFrame").attr("src",rootPath + "/common/report!toReportPage.action?raq="+encodeURI(encodeURI("通用委托监测协议.raq"))+"&projectcode="+$('#projectcode').val());
						
				}
			}else if(title == '附件'){
				if($('#projectcode').val()!=''){
					if($('#fjFrame').attr('src')==undefined||$('#fjFrame').attr('src')==""){
						$("#fjFrame").attr("src",rootPath+"/projects/attachment/projectattachment!noadd.action?projectid="+$('#projectcode').val());	
					}
				}
			}else if(title == '费用明细'){
				
				if($('#projectcode').val()!=''){
					$('#ChargeFrame').attr('src','');
					if($('#ChargeFrame').attr('src')==undefined||$('#ChargeFrame').attr('src')==""){
						if($('#stepcode').val()!='Register'){
							$("#ChargeFrame").attr("src",rootPath +"/projects/taskregister/chargedetail!view.action?id="+$('#projectcode').val());
						}else{
							$("#ChargeFrame").attr("src",rootPath +"/projects/taskregister/chargedetail!list.action?id="+$('#projectcode').val());
						}
					}	
				}
			}else if(title == '分包信息'){
				$('#SubFrame').attr("src","");				
					if($('#projectcode').val()!=''){
					if($('#SubFrame').attr('src')==undefined||$('#SubFrame').attr('src')==""){
						if($('#stepcode').val()!='Register'&& $('#stepcode').val()!='TaskApprove'){
							$("#SubFrame").attr("src",rootPath +"/projects/taskregister/taskregister!toSubPageView.action?projectcode="+$('#projectcode').val()+"&timeStamp="+new Date().getTime());
						}else{
							$("#SubFrame").attr("src",rootPath +"/projects/taskregister/taskregister!toSubbackageList.action?projectcode="+$('#projectcode').val()+"&timeStamp="+new Date().getTime());
						}
						
					}
				}
			}else if(title == '任务通知单'){
				if($('#projectcode').val()!=''){
					//if($('#TaskListFrame').attr('src')==undefined||$('#TaskListFrame').attr('src')==""){
						var projectcode = $('#projectcode').val();
						$.ajax( {
								type : 'POST',
								url :rootPath + "/projects/taskregister/taskregister!matchingsamplesource.action",
								data : {'projectcode' : projectcode},
								success : function(data) {
									if (data == 'fail') {
										alert("加载失败！");
										return;
									}else if (data == '1' || data== '3'){
										$("#TaskNoticeListFrame").attr("src",rootPath + "/common/report!toReportPage.action?raq="+encodeURI(encodeURI("检测任务通知单.raq"))+"&projectcode="+$('#projectcode').val());
									}else if (data == '2'){
										$("#TaskNoticeListFrame").attr("src",rootPath + "/common/report!toReportPage.action?raq="+encodeURI(encodeURI("来样送检通知单.raq"))+"&projectcode="+$('#projectcode').val());
									}else{
										alert(data);
									}
					
									}
						});
						
						
						//$("#TaskListFrame").attr("src",rootPath + "/common/report!toReportPage.action?raq="+encodeURI(encodeURI("任务计划单.raq"))+"&projectcode="+$('#projectcode').val());
						
				}
			}
		}			
	});
}

//新增tab
function addTabs(monitortype){
	if($('#tt').tabs('exists','费用明细')){
		$('#tt').tabs('close','费用明细');
	}
	if($('#tt').tabs('exists','分包信息')){
		$('#tt').tabs('close','分包信息');
	}
	if($('#tt').tabs('exists','委托协议')){
		$('#tt').tabs('close','委托协议');
	}
	if($('#tt').tabs('exists','任务通知单')){
		$('#tt').tabs('close','任务通知单');
	}
	if($('#tt').tabs('exists','任务计划单')){
		$('#tt').tabs('close','任务计划单');
	}
	if(monitortype=='100'){
		$('#tt').tabs('add',{
					title:'任务通知单',
					content:'<iframe id="TaskNoticeListFrame" width="100%" height="668"	frameborder="0" src=""></iframe>'
				});
		$('#tt').tabs('add',{
					title:'委托协议',
					content:'<iframe id="WeituoFrame" width="100%" height="668"	frameborder="0" src=""></iframe>'
				});
		$('#tt').tabs('add',{
			title:'费用明细',
			content:'<iframe id="ChargeFrame" width="100%" height="100%" frameborder="0" scrolling="no" src=""></iframe>'
			
		});
		$.ajax( {
		type : 'GET',
		url : rootPath+'/projects/taskregister/taskregister!getSubInfo.action?timeStamp='+new Date().getTime(),
		data : {'projectcode' : $('#projectcode').val()},
		success : function(data) {
			if(data=="1"){
				$('#tt').tabs('add',{
					title:'分包信息',
					content:'<iframe id="SubFrame" width="100%" height="568"	frameborder="0" scrolling="no" src=""></iframe>'
				});
				
				selectView('基本信息');
			}
		}
	  });
	}else if(monitortype=='004'){
		$('#tt').tabs('add',{
					title:'任务计划单',
					content:'<iframe id="TaskListFrame" width="100%" height="668"	frameborder="0" src=""></iframe>'
				});
		$.ajax( {
		type : 'GET',
		url : rootPath+'/projects/taskregister/taskregister!getSubInfo.action?timeStamp='+new Date().getTime(),
		data : {'projectcode' : $('#projectcode').val()},
		success : function(data) {
			if(data=="1"){
				$('#tt').tabs('add',{
					title:'分包信息',
					content:'<iframe id="SubFrame" width="100%" height="568"	frameborder="0" scrolling="no" src=""></iframe>'
				});
				selectView('基本信息');
			}
		}
	  });
	}else{
		$('#tt').tabs('add',{
					title:'任务计划单',
					content:'<iframe id="TaskListFrame" width="100%" height="668"	frameborder="0" src=""></iframe>'
				});
	}
	selectView('基本信息');
}
//比较日期
function notice(date){
	//当前日期
	var now = new Date();
 	date+=" 00:00:00";
 	var createTime = new Date(Date.parse(date.replace(/-/g, '/')));
 	var num="";
	//如果系统当前日期大于要求完成日期，则该条任务过期
	if(now-createTime>0)	{
		num = "过期";
	}
	return num;
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
	var url = rootPath + "/projects/taskapprove/taskapprove!toSearchPage.action";
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
				var wtentprise = $("#searchFrame",top.document.body).contents().find("#wtentprise").val();
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
						wtentprise : wtentprise,
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

//////////////////////以下是流程操作///////////////////////////
//提交
function openDialog(action,userid){
	var rows = $("#datagrid").datagrid("getSelections");
	if(rows==''){
		alert('请选择一条记录！');
		return;
	}else{		
		if(action=='退回')
		{	
			var url = rootPath + "/projects/opinion/opinion!input.action?moduleid="+encodeURI(encodeURI('任务签发退回意见'))+"&showName="+encodeURIComponent(encodeURIComponent(action+'意见'));
			var _dialog =  window.top.$('	<div id ="dlg" style="padding:0px;"><iframe id="dlgFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
			_dialog.dialog({
			title:'评审意见',
			autoOpen:false,
			modal:true,
			closed:true,
			width:'520',
			height:'200',
			buttons:[{
				text:'确定',
				iconCls:'icon-ok',
				handler:function(){
					var objs = $("#dlgFrame",top.document.body).contents().find(".grkj-validate");	
					var message = $("#dlgFrame",top.document.body).contents().find("#opinion").val();
					if(!saveCheck(objs)){
						$("#dlgFrame",top.document.body).contents().find(":input").focus();
						alert("数据输入不符合格式，请查看红色边框的输入框的输入提示！");
						return false;
					}
					operate(action,"0",userid,message);
					
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
		}else if(action=='提交'){
			if(window.confirm('是否提交？'))
 			{
				checkFuntion(action);		
			}
		}
	}
}

//进入评审意见页面
function checkFuntion(action){	
	var rows = $("#datagrid").datagrid("getSelections");
	if(rows==''){
		alert('请选择一条记录！');
		return;
	}else{
//		if(window.confirm('是否提交？'))
// 			{
				var url = rootPath + "/projects/appraiseopinion/appraiseopinion!opinionNew.action?showName="+encodeURI(encodeURI(action+"意见"))+"&projectcode="+$("#projectcode").val()+"&scode="+$('#stepcode').val();
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
			//						var objs= $("#dlgFrame",top.document.body).contents().find(".grkj-validate");
			//						if(!saveCheck(objs)){
			//							$("#dlgFrame",window.parent.body).contents().find(":input").focus();
			//							alert("数据输入不符合格式，请查看红色边框的输入框的输入提示！");
			//							return false;
			//						}
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
						operate(action,taskid,userid,opinion);
						
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
//			}
	}
	
}

//流程操作
function operate(action,taskid,userid,message){
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
	
	var rows = $("#datagrid").datagrid("getSelections");
	var strJson = "";
	for(var i=0;i<rows.length;i++){	
		if(strJson!=""){
			strJson = strJson + ",";
		}
		strJson = strJson + "{'projectcode':'"+rows[i].projectcode+"','stepcode':'"+rows[i].stepcode+"'}";
	}
	strJson = "{'data':["+strJson+"]}";
	
	$.post(
		rootPath + "/projects/taskapprove/taskapprove!operate.action",
		{json:strJson,info:action,taskid:taskid,userid:userid,opinion:message},
		function(msg){
			if(msg=="success"){
				//此处是任务签发成功之后，往样品项目插入数据~~begin~~~
				//修改到这里是因为样品项目表得到项目的顺序变了
//				var strSampleTagJson = $("#taskFrame",window.parent.body).contents().find("#strJson").val();
//				$.post(
//					rootPath + "/projects/taskapprove/taskapprove!taskApproveSubmitEndSaveSampletagAction.action",
//					{json:strSampleTagJson,info:action,opinion:message}
//				);
				jQuery.unblockUI();
				alert("签发成功！");
				$('#datagrid').datagrid('reload');
				$('#BasicInfoFrame').attr("src","");
				$('#MonitorEntFrame').attr("src","");
				$('#AppraiseOpinionFrame').attr("src","");
				$('#projectcode').val('');
			}else{
				jQuery.unblockUI();
				alert("签发失败！");
			}
		}
	);
}


function modifyWorkflow(){
	if($('#stepcode').val().indexOf('TaskApprove')>=0)
//	if(true)
	{
		var _dialog = window.top.$('<div onkeydown="PreventBSK()" id="blg" style="left:100px;top:180px;" >'
							+'部门：<select id="deptid" name="deptid" style="width:35%;height:20px;">'
							+'</select>'
							+'人员:<select id="userid" name="userid" style="width:35%;height:20px;">'
							+'</select></br>'
							+'跳转节点:<select id="nextWorkflow" name="nextWorkflow" style="width:100%;height:20px;">'
							+'</select>'
							+'</div>').appendTo(window.top.document.body);
		initWorkflow();
		initdept();
		inituserList();
		$("#deptid",window.top.document).change(function(){
			var deptid = $(window.top.document).find("#deptid").val();
			inituser(deptid);
		});
		_dialog.dialog({
			title:"下一步流程",
			autoOpen:false,
			modal:true,
			closed:true,
			width:'300',
			height:'120',
			buttons:[{
				text:'确定',
				iconCls:'icon-save',
				handler:function(){
					var taskid = $(window.top.document).find("#nextWorkflow").val();
					var userid = $(window.top.document).find("#userid").val();
					operate("提交",taskid,userid,"");
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
		alert("任务已经提交，请重新选择");
		return;
	}

}

function checkAuditPerson(action){
	var _dialog = window.top.$('<div onkeydown="PreventBSK()" id="blg" style="left:100px;top:180px;" >'
								+'部门：<select id="deptid" name="deptid" style="width:35%;height:20px;">'
								+'</select>'
								+'人员：<select id="userid" name="userid" style="width:35%;height:20px;">'
								+'</select>'
								+'</div>').appendTo(window.top.document.body);
	initdept();
	inituserList();
	$("#deptid",window.top.document).change(function(){
		var deptid = $(window.top.document).find("#deptid").val();
		if(deptid!='')
		{
			inituser(deptid);
		}
		else{
			inituserList();
		}
	});
	_dialog.dialog({
		title:"选择审核人",
		autoOpen:false,
		modal:true,
		closed:true,
		width:'360',
		height:'120',
		buttons:[{
			text:'提交',
			iconCls:'icon-save',
			handler:function(){
				var userid = $(window.top.document).find("#userid").val();
				//operate(action,"0",userid,"");
				openDialog(action,userid);
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
	var projectcode = $("#projectcode").val();
	$.ajax({
		type:'post',
		url:rootPath +'/projects/taskapprove/taskapprove!initworkflow.action',
		data: "workflowcode=JC_PROJECT&projectcode="+projectcode,
		success:function(data){
			var vData = eval("("+data+")");
			var List = "";
			jQuery.each(vData,function(i,n){
				List +="<option value='"+n.code+"'>"+n.value+"</option>"
			});
			//$("#nextWorkflow",window.top.document).html(List);
			$('#dlgFrame',window.top.document).contents().find("#nextWorkflow").html(List);
		}
	});
	}
}

function initdept(){
	$.ajax({
		type:'post',
		url:rootPath +'/departmentinfo/departmentinfo!getDeptAll.action?timeStamp='+new Date().getTime(),
		success:function(data){
			var vData = eval("("+data+")");
			var List = "";
			jQuery.each(vData,function(i,n){
				List +="<option value='"+n.deptid+"'>"+n.deptname+"</option>"
			});
			$("#deptid",window.top.document).html(List);	
		}
	});
}

function inituser(deptid){
	$.ajax({
		type:'post',
		url:rootPath +'/userinfo/userinfo!getUserBydept.action?timeStamp='+new Date().getTime(),
		data:{deptid:deptid},
		success:function(data){
			var vData = eval("("+data+")");
			var List = "";
			jQuery.each(vData,function(i,n){
				List +="<option value='"+n.userid+"'>"+n.realname+"</option>"
			});
			window.top.document.getElementById("userid").options.length=0;
			$("#userid",window.top.document).html(List);	
		}
	});
}

function inituserList(){
	$.ajax({
		type:'post',
		url:rootPath +'/userinfo/userinfo!getUser.action?timeStamp='+new Date().getTime(),
		success:function(data){
			var vData = eval("("+data+")");
			var List = "";
			jQuery.each(vData,function(i,n){
				List +="<option value='"+n.userid+"'>"+n.realname+"</option>"
			});
			window.top.document.getElementById("userid").options.length=0;
			$("#userid",window.top.document).html(List);	
		}
	});
}