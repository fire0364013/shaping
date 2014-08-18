function initDataGrid(){
	$('#datagrid').datagrid({
		singleSelect:false,
		width:'400',
		height:'400',
		nowrap: false,
		striped: true,
		collapsible:true,
		url:'qcrequired!taskList.action',
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
	        {field:'registdate',title:'登记日期',width:110,align : 'center'},
	        {field:'projectname',title:'项目名称',width:280,align : 'left'},
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
			$("#datagrid").datagrid("clearSelections");
			$('#datagrid').datagrid('selectRow',parseInt(rowIndex));
			
			$('#BasicInfoFrame').attr("src","");
			$('#MonitorEntFrame').attr("src","");
			$('#QCRequiredFrame').attr("src","");
			$('#AppraiseOpinionFrame').attr("src","");
//			$('#WorkflowImgFrame').attr("src","");
//			$('#AttachmentFrame').attr("src","");
			selectView('质控要求');
		},
		onSelect:function(rowIndex,rowData){
			$("#projectcode").val(rowData.projectcode);
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
					if($('#BasicInfoFrame').attr('src')==undefined||$('#BasicInfoFrame').attr('src')==""){
						$("#BasicInfoFrame").attr("src",rootPath +"/projects/taskregister/taskregister!view.action?id="+$('#projectcode').val());
					}
				}
			}else if(title == '监测企业'){
				if($('#projectcode').val()!=''){
					if($('#MonitorEntFrame').attr('src')==undefined||$('#MonitorEntFrame').attr('src')==""){							
						$("#MonitorEntFrame").attr("src",rootPath +"/projects/taskregister/projectdetail!view.action?id="+$('#projectcode').val());
					}
				}
			}else if(title == '质控要求'){
				if($('#projectcode').val()!=''){
					if($('#QCRequiredFrame').attr('src')==undefined||$('#QCRequiredFrame').attr('src')==""){							
						$("#QCRequiredFrame").attr("src",rootPath +"/projects/qcrequired/qcrequired!input.action?id="+$('#projectcode').val());
					}
				}
			}
			else if(title == '审核记录'){
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
						if($('#projectid').val()!=''){
							if($('#fjFrame').attr('src')==undefined||$('#fjFrame').attr('src')==""){
								$("#fjFrame").attr("src",rootPath+"/projects/attachment/projectattachment!noadd.action?projectid="+$('#projectid').val());	
							}
						}
					}
		}			
	});
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
	var url = rootPath + "/projects/qcrequired/qcrequired!toTaskSearchPage.action";
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

function save(){
	$("#qcForm").form('submit',{
			type : 'POST',
			url :rootPath +'/projects/qcrequired/qcrequired!save.action',
			onSubmit:function(){
				var objs = 	$("#qcForm").find(".grkj-validate");
				if(!saveCheck(objs)){
					$("#qcForm").find(":input").focus();
					alert("数据输入不符合格式，请查看红色边框的输入框的输入提示！");
					return false;
				}
			},
			success : function(data) {
				if (data == 'success') {
					location.reload();
					alert('成功！');
				}else{
					alert('失败！');
				}
			}
	} );	
}

function selectOpinion(moduleid,qcid){
	var url = rootPath + "/projects/opinion/opinion!select.action?moduleid="+encodeURI(encodeURI(moduleid));
	var _dialog =  window.top.$('	<div id ="dlg" style="padding:0px;"><iframe id="dlgFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
	_dialog.dialog({
	title:'评审意见',
	autoOpen:false,
	modal:true,
	closed:true,
	width:'520',
	height:'500',
	buttons:[{
		text:'确定',
		iconCls:'icon-ok',
		handler:function(){
			$("#dlgFrame",top.document.body).contents().find("#opinion").click();	
			var message = $("#dlgFrame",top.document.body).contents().find("#opinion").val();
			//var oldValue = $("#"+qcid).val();
			$("#"+qcid).val(message);
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
function operate(taskid){
	var rows = $("#datagrid").datagrid("getSelections");
	if(rows==''){
		alert('请选择一条记录！');
		return;
	}else{		
		if(window.confirm('是否提交？')){
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
			
			var strJson = "";
			for(var i=0;i<rows.length;i++){	
				if(strJson!=""){
					strJson = strJson + ",";
				}
				strJson = strJson + "{'projectcode':'"+rows[i].projectcode+"','stepcode':'"+rows[i].stepcode+"'}";
			}
			strJson = "{'data':["+strJson+"]}";
			
			$.post(
				rootPath + "/projects/qcrequired/qcrequired!operate.action",
				{json:strJson,taskid:taskid,info:"提交"},
				function(msg){
					if(msg=="success"){
						jQuery.unblockUI();
						alert("成功！");
						$('#datagrid').datagrid('reload');
						$('#BasicInfoFrame').attr("src","");
						$('#QCRequiredFrame').attr("src","");
						$('#MonitorEntFrame').attr("src","");
						$('#AppraiseOpinionFrame').attr("src","");
						$('#projectcode').val('');
					}else{
						jQuery.unblockUI();
						alert("失败！");
					}
				}
			);	
		}
	}
}

function modifyWorkflow(){
	var _dialog = window.top.$('<div onkeydown="PreventBSK()" id="blg" style="left:100px;top:180px;">'
							+'<select id="nextWorkflow" name="nextWorkflow" style="width:100%;height:20px;">'
							+'</select>'
							+'</div>').appendTo(window.top.document.body);
	initWorkflow();
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
				operate(taskid);
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
	$.ajax({
		type:'POST',
		url:rootPath+'/workflow/workflow!workflowTaskList.action?time='+new Date().getTime(),
		data:'taskid=80',
		success:function(data){
			var vData = eval("("+data+")");
			var List ="";
			jQuery.each(vData,function(i,n){
				List +="<option value='"+n.code+"'>"+n.value+"</option>"
			});
//			alert(List);
			$(window.top.document).find("#nextWorkflow").html(List);	
		}
	});
}