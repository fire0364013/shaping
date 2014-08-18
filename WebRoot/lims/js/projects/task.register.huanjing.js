function initDataGrid(){
	$('#datagrid').datagrid({
		singleSelect:true,//文本框的多选 单选  因为判断比较麻烦，容易出问题，所以修改成单选
		nowrap: false,
		striped: true,
		collapsible:true,
		url:'taskregister!taskList.action',
		queryParams : {
			monitortype : 2
		},
		fit:true,
		border:true,
		fitColumns:false,
		scrollbarSize:0,
		idField:'projectcode',
		frozenColumns:[[
	       {field : ' ',
				title : '&nbsp;',
				width : 30,
				align : 'center',
				formatter : function(value){
					return "<input type='radio' name='radio'/>";}
		 	},
		 	{field:'projectcode',title:'流水号',width:50,align : 'center'},
       	    {field:'projectrealcode',title:'任务编号',width:80,align : 'center'}
		]],
		columns:[[
	        {field:'status',title:'任务状态',width:80,align : 'center'},
	        {field:'projectname',title:'任务名称',width:280,align : 'left'},
	        {field:'registdate',title:'登记日期',width:110,align : 'center'},	        
	        {field:'registby',title:'登记人',width:80,align : 'center'},
			{field:'wtentprise',title:'委托单位',width:280,align : 'left'},					
			{field:'monitortype',title:'业务类型',width:100,align : 'center'},
			{field:'completedate',title:'要求完成日期',width:80,align : 'center'}
		]],
		pagination:true,
		rownumbers:false,
		pageSize:20,
		pageList:[20,30,40,50],
		onRowContextMenu:function(e,rowIndex,rowData){
			$('#datagrid').datagrid("selectRow",rowIndex);
			$("#taskContextMenu").menu("show", {left: e.pageX,top: e.pageY});
			$('#delTask').removeAttr("disabled");
			$('#copyTask').removeAttr("disabled");
			$('#viewTask').removeAttr("disabled");
			
			e.preventDefault();
		},
		onSelect:function(rowIndex,rowData){
			$("#projectcode").val(rowData.projectcode);
			$("#stepcode").val(rowData.stepcode);
			$("#issubbackage").val(rowData.issubpackage);
			$($("input[type=radio]")[rowIndex]).attr("checked", true);
		},
		onClickRow:function(rowIndex, rowData){
			$('#BasicInfoFrame').attr("src","");
			$('#MonitorEntFrame').attr("src","");
			$('#AppraiseOpinionFrame').attr("src","");
			$('#WorkflowImgFrame').attr("src","");
			$('#AttachmentFrame').attr("src","");
			$('#TaskListFrame').attr("src","");
			$('#SubFrame').attr("src","");
			
			selectView('基本信息');
//			$(window.parent.document).find("#hdnButton").click();
		}
	});
	
	$('#taskDiv').resize(function(){
		$("#datagrid").datagrid('resize');
	});	
}

//点击某一行数据时默认选中基本信息标签
function selectView(title){
	$('#tt').tabs({
		onSelect: function(title){
			if(title == '流程图'){
				if($('#projectcode').val()!=''){
					if($('#WorkflowImgFrame').attr('src')==undefined||$('#WorkflowImgFrame').attr('src')==""){
						$("#WorkflowImgFrame").attr("src",rootPath+"/projects/flowchart/flowchart!toFlowChartPage.action?entityid="+$('#projectcode').val());
					}
				}
			}else if(title == '基本信息'){
				if($('#projectcode').val()!=''){
					if($('#BasicInfoFrame').attr('src')==undefined||$('#BasicInfoFrame').attr('src')==""){
						if($('#stepcode').val()!='Register'&& $('#stepcode').val()!='TaskApprove'){
							$("#BasicInfoFrame").attr("src",rootPath +"/projects/taskregister/taskregister!huanjingView.action?id="+$('#projectcode').val());
						}else{
							$("#BasicInfoFrame").attr("src",rootPath +"/projects/taskregister/taskregister!huanjingInput.action?id="+$('#projectcode').val()+"&timeStamp="+new Date().getTime()+"&monitortype=2");
						}
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
					if($('#WeituoFrame').attr('src')==undefined||$('#TaskListFrame').attr('src')==""){
						$("#WeituoFrame").attr("src",rootPath + "/common/report!toReportPage.action?raq="+encodeURI(encodeURI("通用委托监测协议.raq"))+"&projectcode="+$('#projectcode').val());
					}	
				}
			}
			else if(title == '监测点'){
				if($('#projectcode').val()!=''){
					if($('#MonitorEntFrame').attr('src')==undefined||$('#MonitorEntFrame').attr('src')==""){
						if($('#stepcode').val()!='Register'&&$('#stepcode').val()!='SampeRegister'){
							$("#MonitorEntFrame").attr("src",rootPath +"/projects/taskregister/projectdetail!view.action?id="+$('#projectcode').val());
						}else{
							$("#MonitorEntFrame").attr("src",rootPath +"/projects/taskregister/projectdetail!list.action?id="+$('#projectcode').val());
						}
						
					}	
				}
			}else if(title == '流转记录'){
				if($('#projectcode').val()!=''){
					if($('#AppraiseOpinionFrame').attr('src')==undefined||$('#AppraiseOpinionFrame').attr('src')==""){
						$("#AppraiseOpinionFrame").attr("src",rootPath + "/projects/opinion/opinion!list.action?id="+$('#projectcode').val());
					}
				}
			}else if(title == '附件'){
				if($('#projectcode').val()!=''){
					if($('#AttachmentFrame').attr('src')==undefined||$('#AttachmentFrame').attr('src')==""){
						$("#AttachmentFrame").attr("src",rootPath+"/projects/attachment/projectattachment!list.action?id="+$('#projectcode').val());	
					}
				}
			}
		}			
	});
}
		
//新建任务
function addTask()
{
	var url = rootPath + "/projects/taskregister/taskregister!toEntpriseListPage.action";
	var _dialog =  window.top.$('<div id ="entDlg" style="padding:0px;"><iframe id="entFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
	_dialog.dialog({
	title:'企业选择',
	autoOpen:false,
	modal:true,
	closed:true,
	width:'950',
	height:'700',
	buttons:[{
			text:'下一步',
			iconCls:'icon-next',
			handler:function(){
				var ent = $("#entFrame",top.document.body).contents().find('#entid').val();
				if(ent==''||ent==null){
					alert("请选择一个企业！");
					return ;
				}
				_dialog.dialog('close');
				
				toTaskBasicInfo(ent);
				
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

//跳转到任务基本信息页面
function toTaskBasicInfo(){
	var url = rootPath + "/projects/taskregister/taskregister!huanjingInfo.action?monitortype=2";
	var _dialog =  window.top.$('<div id ="infoDlg" style="padding:0px;"><iframe id="infoFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
	_dialog.dialog({
	title:'监测基本信息登记',
	autoOpen:false,
	modal:true,
	closed:true,
	width:'950',
	height:'400',
	buttons:[{
			text:'保存',
			iconCls:'icon-save',
			handler:function(){
				//alert("jj");
				$("#infoFrame",window.top.document).contents().find("#MonitorForm").form('submit',
					{
						url:rootPath + "/projects/taskregister/taskregister!add.action",
						onSubmit:function(){
							var objs = $("#infoFrame",window.top.document).contents().find(".grkj-validate");
							
							if(!saveCheck(objs)){
								$("#infoFrame",window.top.document).contents().find(":input").focus();
								alert("数据输入不符合格式，请查看红色边框的输入框的输入提示！");
								return false;
							}
						},
						success : function(data) {
							if (data == 'fail') {
								alert("保存失败！");
								return;
							}
							if (data == 'success') {
								alert('保存成功！');
								$('#datagrid').datagrid('reload');
							}
							_dialog.dialog('close');
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
}

//企业选择
function selectEntinfo(){
	var url = rootPath + "/projects/taskregister/taskregister!toEntpriseListPage.action?monitortypeid=2";
	var _dialog =  window.top.$('<div id ="plans-dlg" style="padding:0px;"><iframe id="entInfoFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
	_dialog.dialog({
		title:'选择企业',
		autoOpen:false,
		modal:true,
		closed:true,
		width:'950',
		height:'580',
		buttons:[{
			text:'确定',
			iconCls:'icon-save',
			handler:function(){
					
					var entId=$("#entInfoFrame",top.document.body).contents().find("#entid").val();				
					var entName=$("#entInfoFrame",top.document.body).contents().find("#name").val();
//					var address=$("#entInfoFrame",top.document.body).contents().find("#address").val();
					$("#entname").val(entName);
					$("#entid").val(entId);
//					$("#entaddress").val(address);
//					$("#projectname").val(entName);
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

function selectEntinfo2()
{
	var url = rootPath + "/projects/taskregister/taskregister!toEntpriseListPage2.action?monitortypeid=2";
	var _dialog =  window.top.$('<div id ="plans-dlg" style="padding:0px;"><iframe id="monitorentInfoFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
	_dialog.dialog({
		title:'选择企业',
		autoOpen:false,
		modal:true,
		closed:true,
		width:'950',
		height:'580',
		buttons:[{
			text:'确定',
			iconCls:'icon-save',
			handler:function(){
				$("#monitorentInfoFrame",top.document.body).contents().find("#ents").click();
				var ents = $("#monitorentInfoFrame",top.document.body).contents().find("#ents").val();
				var entnames = $("#monitorentInfoFrame",top.document.body).contents().find("#entnames").val();
//					var entId=$("#entInfoFrame",top.document.body).contents().find("#entid").val();				
//					var entName=$("#entInfoFrame",top.document.body).contents().find("#name").val();
//					var address=$("#entInfoFrame",top.document.body).contents().find("#address").val();
					$("#monitorentname").val(entnames);
					$("#monitorentid").val(ents);
//					$("#entaddress").val(address);
//					$("#projectname").val(ents);
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

//获取监测性质
function getMonitornature(monitortypeid,reportform){		
	 $.ajax( {
		type : 'GET',
		url : rootPath+'/projects/taskregister/taskregister!getMonitorTypeMonitornature.action?timeStamp='+new Date().getTime(),
		data : {'monitortypeid' : monitortypeid},
		success : function(data) {
			$("#monitornature").val('');
			$("#monitornature").val(data);
			
			var option;
			if(data=='委托监测'){
				option = '<option value="监测报告">监测报告</option>';
			}else if(data==''){
				option = '<option value="">---请选择---</option>';
			}else{
				option = '<option value="汇总表">汇总表</option>'+
					'<option value="监测报告">监测报告</option>';
			}
			$('#reportform').html('');
			$('#reportform').append(option);
		}
	});
}


/**
 * 保存
 * @return
 */
function moditfyTask(){
	$("#MonitorForm").form('submit',{
			type : 'POST',
			url :rootPath +'/projects/taskregister/taskregister!update.action',
			onSubmit:function(){
				var objs = 	$("#MonitorForm").find(".grkj-validate");
				if(!saveCheck(objs)){
					$("#MonitorForm").find(":input").focus();
					alert("数据输入不符合格式，请查看红色边框的输入框的输入提示！");
					return false;
				}
			},
			success : function(data) {
				if (data == 'fail') {
					alert("失败！");
					return;
				}else if (data == 'success') {
					$('#datagrid').datagrid('reload');
					alert('成功！');
				}
			}
	} );	
}

//删除任务
function removeTask(){
	if($("#stepcode").val()!='Register'){
		alert('该条记录已提交，不能进行删除操作！');
		$("#datagrid").datagrid("clearSelections");
		return;
	}else{
		var projectcode = $("#projectcode").val();
		//单个删除
	 	if(window.confirm('是否删除？'))
	 	{ 		
			 $.ajax( {
				type : 'POST',
				url :rootPath + "/projects/taskregister/taskregister!remove.action",
				data : {'projectcode' : projectcode},
				success : function(data) {
					if (data == 'fail') {
						alert("删除失败！");
						return;
					}else if (data == 'success'){
						alert('删除成功！');
						$("#datagrid").datagrid("clearSelections");
						
						$('#BasicInfoFrame').attr("src","");
						$('#MonitorEntFrame').attr("src","");
						$('#AppraiseOpinionFrame').attr("src","");
						$('#WorkflowImgFrame').attr("src","");
						$('#AttachmentFrame').attr("src","");
						
						$('#projectcode').val('');
						$('#datagrid').datagrid('reload');
					}
					
				}
			});
		}
 	}
}

//进入选择项目界面
function selectItem(){
	var url = rootPath +'/projects/taskregister/taskregister!toItemPage.action';
	var _dialog = window.top
			.$('<div id="item-dlg"  style="padding:0px;"><iframe id="itemFrame" width="100%" height="100%" frameborder="0" scrolling="yes" src=' + url + '></iframe></div>')
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
					$("#itemFrame",top.document.body).contents().find("#btnGetItem").click();						
					var itemid = $("#itemFrame",top.document.body).contents().find("#itemid").val();
					var itemname = $("#itemFrame",top.document.body).contents().find("#itemname").val();
					
					$('#itemid').val(itemid);
					$('#itemname').val(itemname);
					_dialog.dialog('close');
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

//复制任务
function copyTask(){
	var projectcode = $("#projectcode").val();
 	if(window.confirm('是否复制？'))
 	{ 		
		 $.ajax( {
			type : 'POST',
			url :rootPath + "/projects/taskregister/taskregister!copy.action",
			data : {'projectcode' : projectcode},
			success : function(data) {
				if (data == 'fail') {
					alert("复制失败！");
					return;
				}
				if (data == 'success') {
					alert('复制成功！');
					$('#datagrid').datagrid('reload');
					$('#BasicInfoFrame',parent.document).attr("src","");				
					$('#MonitorEntFrame',parent.document).attr("src","");
					$('#AppraiseOpinionFrame',parent.document).attr("src","");
					$('#WorkflowImgFrame',parent.document).attr("src","");
					$('#AttachmentFrame',parent.document).attr("src","");
					$('#projectcode').val('');
					
				}
			}
		});
	}
}

//查看任务单
function viewTaskList(){
	var projectcode = $("#projectcode").val();
	var reportname = encodeURI(encodeURI("例行监测任务计划单（环境空气质量监测）.raq"));
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
	var url = rootPath + "/projects/taskregister/taskregister!toSearchPage.action?monitortype=2";
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

//进入评审意见页面
function checkFuntion(action){	
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
}

//流程操作
function openDialog(action){
	var projectcode = $("#projectcode").val();
	if(projectcode==''){
		alert('请选择要提交的任务！');
		return;
	}else{
		if(action=='终止'){
			var isStop =  $("#taskFrame",window.parent.body).contents().find("#isStop").val();
			
			if(isStop=='true'){
				alert('该记录已经终止！');
				$("#taskFrame",window.parent.body).contents().find("#clearSelected").click();
				return;
			}else if(isStop=='stop'){
				checkFuntion(action);	
			}else{
				alert('该记录不能终止！')
				return;
			}
		}else if(action=='提交'){
			if($('#stepcode').val()=='Register'){
				//if(window.confirm('是否提交？')){
					checkFuntion(action);	
				//}
			}else{
				alert("任务已经提交，请重新选择");
			}
		}
	}
}

////以下操作为修改工作流
//function modifyWorkflow(){
//	var _dialog =  window.top.$('<div onkeydown="PreventBSK()" id ="dlg" style="left:100px;top:180px;">'
//			+'部门：<select id="deptid" name="deptid" style="width:35%;height:20px;">'
//			+'</select>'
//			+'人员：<select id="userid" name="userid" style="width:35%;height:20px;">'
//			+'</select>'
//			+'跳转节点:<select id="nextWorkflow" name="nextWorkflow" class="TextBox" style="width: 50%;height:20px;">'
//			+'</select>'
//			+'</div>').appendTo(window.top.document.body);
//	
//	initWorkflow();
//	initdept();
//	inituserList();
//	$("#deptid",window.top.document).change(function(){
//		var deptid = $(window.top.document).find("#deptid").val();
//		if(deptid!='')
//		{
//			inituser(deptid);
//		}
//		else{
//			inituserList();
//		}
//	});
//	_dialog.dialog({
//		title:'下一步操作',
//		autoOpen:false,
//		modal:true,
//		closed:true,
//		width:'300',
//		height:'120',
//		buttons:[{
//			text:'确定',
//			iconCls:'icon-save',
//			handler:function(){
//				var taskid=$(window.top.document).find("#nextWorkflow").val();
////				alert(taskid);
//				operate("提交",taskid,"");
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
//			
//		}
//	});
//	_dialog.dialog('open');
//}
function initWorkflow(){
	if(window.confirm('是否提交？')){
		var projectcode = $("#projectcode").val();
		$.ajax( {
			type : 'POST',
			url : rootPath +'/projects/taskregister/taskregister!initworkflow.action',
			data: "status=Register&workflowcode=JC_PROJECT&projectcode="+projectcode,
			success : function(data) {
				var vData = eval("(" + data + ")");
				var lList = "";
				jQuery.each(vData, function(i, n) {
					lList += "<option value=" + n.code + ">" + n.value	+ "</option>";
				});				
				$('#dlgFrame',window.top.document).contents().find("#nextWorkflow").html(lList);
			}
		});
	}
}
//流程操作
function operate(action,taskid,userid,message){
	var strjson = "[{'projectcode':'"+$("#projectcode").val()+"','stepcode':'"+$("#stepcode").val()+"'}]";
	$.post(
		rootPath + "/projects/taskregister/taskregister!operate.action",
		{json:strjson,info:action,taskid:taskid,userid:userid,opinion:message},
		function(msg){
			if(msg=="success"){
				alert("提交成功！");
				$('#datagrid').datagrid('clearSelections');
				$('#datagrid').datagrid('reload');
				
				$('#taskWtmonitorFrame').attr("src","");				
				$('#taskFuzerenFrame').attr("src","");
				$('#taskSchemeFrame').attr("src","");
				$('#appraiseopinionFrame').attr("src","");
				$('#taskFlowChartFrame').attr("src","");
				$('#attachmentFrame').attr("src","");
				
				$('#projectcode').val('');
				$('#stepcode').val('');
			}else{
				alert("提交失败！");
			}
		}
	);
}
//function checkAuditPerson(action){
//	var _dialog = window.top.$('<div onkeydown="PreventBSK()" id="blg" style="left:100px;top:180px;" >'
//								+'部门：<select id="deptid" name="deptid" style="width:35%;height:20px;">'
//								+'</select>'
//								+'人员：<select id="userid" name="userid" style="width:35%;height:20px;">'
//								+'</select>'
//								+'</div>').appendTo(window.top.document.body);
//	initdept();
//	inituserList();
//	$("#deptid",window.top.document).change(function(){
//		var deptid = $(window.top.document).find("#deptid").val();
//		if(deptid!='')
//		{
//			inituser(deptid);
//		}
//		else{
//			inituserList();
//		}
//	});
//	_dialog.dialog({
//		title:"选择审核人",
//		autoOpen:false,
//		modal:true,
//		closed:true,
//		width:'360',
//		height:'120',
//		buttons:[{
//			text:'提交',
//			iconCls:'icon-save',
//			handler:function(){
//				var userid = $(window.top.document).find("#userid").val();
//				operate(action,"0",userid,"");
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
//function initdept(){
//	$.ajax({
//		type:'post',
//		url:rootPath +'/departmentinfo/departmentinfo!getDeptAll.action?timeStamp='+new Date().getTime(),
//		success:function(data){
//			var vData = eval("("+data+")");
//			var List = "";
//			jQuery.each(vData,function(i,n){
//				List +="<option value='"+n.deptid+"'>"+n.deptname+"</option>"
//			});
//			$("#deptid",window.top.document).html(List);	
//		}
//	});
//}
//
//function inituser(deptid){
//	$.ajax({
//		type:'post',
//		url:rootPath +'/userinfo/userinfo!getUserBydept.action?timeStamp='+new Date().getTime(),
//		data:{deptid:deptid},
//		success:function(data){
//			var vData = eval("("+data+")");
//			var List = "";
//			jQuery.each(vData,function(i,n){
//				List +="<option value='"+n.userid+"'>"+n.realname+"</option>"
//			});
//			window.top.document.getElementById("userid").options.length=0;
//			$("#userid",window.top.document).html(List);	
//		}
//	});
//}
//
//function inituserList(){
//	$.ajax({
//		type:'post',
//		url:rootPath +'/userinfo/userinfo!getUser.action?timeStamp='+new Date().getTime(),
//		success:function(data){
//			var vData = eval("("+data+")");
//			var List = "";
//			jQuery.each(vData,function(i,n){
//				List +="<option value='"+n.userid+"'>"+n.realname+"</option>"
//			});
//			window.top.document.getElementById("userid").options.length=0;
//			$("#userid",window.top.document).html(List);	
//		}
//	});
//}

