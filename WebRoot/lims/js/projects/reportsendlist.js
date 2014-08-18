//lh 2012.7.18
$(document).ready(function(){
	initDataGrid();
});

function relaod(){//重新装载数据
	$('#datagrid').datagrid('reload');
}
var flag="";
//var stepCode='';//获取当前步骤
var parenttype="";//获取选中行的监测父类型
var rowProjectidVal = "";
function initDataGrid(){
			$('#datagrid').datagrid({
				singleSelect:true,
				width:'400',
				height:'400',
				nowrap: false,
				striped: true,
				collapsible:true,
				url:rootPath + '/projects/reportsend/reportsend!reportsendList.action',
				sortName: 'projectcode',
				sortOrder: 'desc',
				fit:true,
				border:true,
				fitColumns:false,
				scrollbarSize:0,
				idField:'projectid',	
				frozenColumns:[[
			      {field:'projectid',align : 'center',width : 30,
						formatter : function(value){
							return "<input type='radio' name='radio'/>";}},
	        	  {field:'projectcode',title:'流水号',width:60,align : 'center'},
				  {field:'projectrealcode',title:'项目编号',width:80,align : 'center'}
				]],
				columns:[[
			        {field:'status',title:'项目状态',width:80,align : 'center'},
			        {field:'projectname',title:'项目名称',width:280,align : 'left'},
					{field:'jcentprise',title:'被测单位',width:280,align : 'left'},
					{field:'monitornature',title:'业务类型',width:130,align : 'center'},
					{field:'registdate',title:'登记日期',width:80,align : 'center'},
					{field:'registby',title:'登记人',width:80,align : 'center'},
//					{field:'completedate',title:'要求完成日期',width:80,align : 'center'},
					{field:'contractno',title:'合同编号',width:120,align : 'center'},
					{field:'reportnum',title:'报告编号',width:120,align : 'center'}
				]],
				pagination:true,
				rownumbers:true,
				pageSize:20,
				pageList:[20,30,40,50],
				onLoadSuccess:function(){
					$("#tt").tabs("select","踏勘记录");
				},
				onClickRow:function(rowIndex, rowData){
					flag="";
					checkRadio();
					$('#taskFlowChartFrame').attr("src","");//流程图
					$('#taskAssignFrame').attr("src","");//监测方案
					$('#taskSchemeFrame').attr("src","");//基本信息
					//$('#taskFuzerenFrame').attr("src","");//taskFuzerenFrame
					$('#appraiseopinionFrame').attr("src","");//审核记录
					$('#feiyongFrame').attr("src","");//监测费用
					$('#hetongFrame').attr("src","");//监测协议
					$('#reportsendFrame').attr("src","");//踏勘记录
					$('#attachmentFrame').attr("src","");//附件
					$('#originalFrame').attr("src","");
					$('#stepcode').val(rowData.stepcode);
					addTabs(rowData.monitortypecode,rowData.projectcode);
					},
					onRowContextMenu:function(e,row,rowData){
						$("#datagrid").datagrid("clearSelections");
						$('#datagrid').datagrid('selectRow',parseInt(row));
						$("#taskContextMenu").menu("show", {left: e.pageX,top: e.pageY});
						rowProjectidVal = rowData.projectid;
						parenttype= rowData.parenttype;
						e.preventDefault();
					},
					onSelect:function(rowIndex,rowData){
						flag="";
						checkRadio();
						$('#taskFlowChartFrame').attr("src","");//流程图
						$('#taskAssignFrame').attr("src","");//监测方案
						$('#taskSchemeFrame').attr("src","");//基本信息
						//$('#taskFuzerenFrame').attr("src","");//taskFuzerenFrame
						$('#appraiseopinionFrame').attr("src","");//审核记录
						$('#feiyongFrame').attr("src","");//监测费用
						$('#hetongFrame').attr("src","");//监测协议
						$('#reportsendFrame').attr("src","");//踏勘记录
						$('#attachmentFrame').attr("src","");//附件
						$('#originalFrame').attr("src","");
						$('#stepcode').val(rowData.stepcode);
						addTabs(rowData.monitortypecode,rowData.projectcode);
					}
//					,
//					rowStyler:function(rowIndex,rowData){
//						if(rowData.completedate!=null&&rowData.completedate!=''){
//							var flag = notice(rowData.completedate);
//							if(flag=='过期'){
//								return "color:#FF3300";
//							}
//						}
//					}
			});
			$(window).resize(function(){
				$("#datagrid").datagrid('resize');
			});
}
//新增tab
function addTabs(monitortype,projectcode){
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
		data : {'projectcode' : projectcode},
		success : function(data) {
			if(data=="1"){
				$('#tt').tabs('add',{
					title:'分包信息',
					content:'<iframe id="SubFrame" width="100%" height="568"	frameborder="0" scrolling="no" src=""></iframe>'
				});
				selectView('基本信息',projectcode,monitortype);
			}
		}
	  });
	}else if(monitortype=='004'){
		$('#tt').tabs('add',{
					title:'任务计划单',
					content:'<iframe id="taskSchemeFrame" width="100%" height="668"	frameborder="0" src=""></iframe>'
				});
		$.ajax( {
		type : 'GET',
		url : rootPath+'/projects/taskregister/taskregister!getSubInfo.action?timeStamp='+new Date().getTime(),
		data : {'projectcode' : projectcode},
		success : function(data) {
			if(data=="1"){
				$('#tt').tabs('add',{
					title:'分包信息',
					content:'<iframe id="SubFrame" width="100%" height="568"	frameborder="0" scrolling="no" src=""></iframe>'
				});
				selectView('基本信息',projectcode,monitortype);
			}
		}
	  });
	}else{
		$('#tt').tabs('add',{
					title:'任务计划单',
					content:'<iframe id="taskSchemeFrame" width="100%" height="668"	frameborder="0" src=""></iframe>'
				});
	}
	selectView('基本信息',projectcode,monitortype);
}
function selectView(title,projectcode,monitortypecode){
	$("#tt").tabs({
						onSelect:function(title){
						if(flag==""){
						
						if(title=="基本信息"){
//							if($('#taskAssignFrame').attr('src')==undefined||$('#taskAssignFrame').attr('src')==""){
//								$("#taskAssignFrame").attr("src",rootPath +"/projects/taskregister/taskregister!view.action?id="+rowData.projectcode);
//							}
							
							if(monitortypecode=='100'){//委托
									if($('#taskAssignFrame').attr('src')==undefined||$('#taskAssignFrame').attr('src')==""){
										$("#taskAssignFrame").attr("src",rootPath +"/projects/taskregister/taskregister!waiweiView.action?id="+projectcode);
									}
								}else if(monitortypecode=='001'){//环境质量
									if($('#taskAssignFrame').attr('src')==undefined||$('#taskAssignFrame').attr('src')==""){
										$("#taskAssignFrame").attr("src",rootPath +"/projects/taskregister/taskregister!huanjingView.action?id="+projectcode);
									}
								}else if(monitortypecode=='003'){//临时
									if($('#taskAssignFrame').attr('src')==undefined||$('#taskAssignFrame').attr('src')==""){
										$("#taskAssignFrame").attr("src",rootPath +"/projects/taskregister/taskregister!linshiView.action?id="+projectcode);
									}
								}else if(monitortypecode=='004'){//比对
									if($('#taskAssignFrame').attr('src')==undefined||$('#taskAssignFrame').attr('src')==""){
										$("#taskAssignFrame").attr("src",rootPath +"/projects/taskregister/taskregister!biduiView.action?id="+projectcode);
									}
								}else if(monitortypecode=='002'){//污染源
									if($('#taskAssignFrame').attr('src')==undefined||$('#taskAssignFrame').attr('src')==""){
										$("#taskAssignFrame").attr("src",rootPath +"/projects/taskregister/taskregister!wuranyuanView.action?id="+projectcode);
									}
								}
						}else if(title=="任务计划单"){
//								if($('#taskSchemeFrame').attr('src')==undefined||$('#taskSchemeFrame').attr('src')==""){
//									$("#taskSchemeFrame").attr("src",rootPath + "/common/report!toReportPage.action?raq="+encodeURI(encodeURI("任务计划单-现场室.raq"))+"&projectcode="+rowData.projectcode);
//								}
							$.ajax( {
									type : 'POST',
									url :rootPath + "/projects/taskregister/taskregister!matchingsamplesource.action",
									data : {'projectcode' : projectcode},
									success : function(data) {
										if (data == 'fail') {
											alert("加载失败！");
											return;
										}else if (data == '1' || data== '3'){
											$("#taskSchemeFrame").attr("src",rootPath + "/common/report!toReportPage.action?raq="+encodeURI(encodeURI("例行监测任务计划单（环境空气质量监测）.raq"))+"&projectcode="+projectcode);
										}else if (data == '2'){
											$("#taskSchemeFrame").attr("src",rootPath + "/common/report!toReportPage.action?raq="+encodeURI(encodeURI("例行监测任务计划单（悬浮物中重金属）.raq"))+"&projectcode="+projectcode);
										}else{
											alert(data);
										}
						
										}
								});
						}else if(title == '报告发放'){
								if($('#reportsendFrame').attr('src')==undefined||$('#reportsendFrame').attr('src')==""){
										$('#reportsendFrame').attr("src",rootPath+"/projects/reportsend/reportsendright!testReportList.action?projectcode="+projectcode+"&projectid="+projectcode);
								}
							}else if(title == '监测企业'){
								if($('#originalFrame').attr('src')==undefined||$('#originalFrame').attr('src')==""){
									$("#originalFrame").attr("src",rootPath +"/projects/taskregister/projectdetail!view.action?id="+projectcode);
								}
							}
							else if(title == '质控要求'){
									if($('#zhreportsFrame').attr('src')==undefined||$('#zhreportsFrame').attr('src')==""){
										$("#zhreportsFrame").attr("src",rootPath +"/projects/qcrequired/qcrequired!view.action?id="+projectcode);
									}
							}
							else if(title == '测试报告'){
								if($('#testreportsFrame').attr('src')==undefined||$('#testreportsFrame').attr('src')==""){
								$("#testreportsFrame").attr("src",rootPath + "/testreports/testreports!toReports.action?projectcode="+projectcode+"&info="+$("#stepcode").val()+"&projectid="+projectcode);
								}
							} 
							else if(title=="流转记录"){
								if($('#appraiseopinionFrame').attr('src')==undefined||$('#appraiseopinionFrame').attr('src')==""){
									$("#appraiseopinionFrame").attr("src",rootPath + "/projects/opinion/opinion!list.action?id="+projectcode);
									}
							}else if(title == '流程图'){
									if($('#lctFrame').attr('src')==undefined||$('#lctFrame').attr('src')==""){
										$("#lctFrame").attr("src",rootPath+"/projects/flowchart/flowchart!toFlowChartPage.action?entityid="+projectcode);
								}
							}else if(title == '附件'){
									if($('#fjFrame').attr('src')==undefined||$('#fjFrame').attr('src')==""){
										$("#fjFrame").attr("src",rootPath+"/projects/attachment/projectattachment!noadd.action?projectid="+projectcode);	
								}
							}else if(title == '委托协议'){
										$.ajax( {
												type : 'POST',
												url :rootPath + "/projects/taskregister/taskregister!matchingsamplesource.action?timeStamp="+new Date().getTime(),
												data : {'projectcode' : projectcode},
												success : function(data) {
													
													if (data == 'fail') {
														alert("加载失败！");
														return;
													}else if (data == '1' || data== '3'){
														$("#WeituoFrame").attr("src",rootPath + "/common/report!toReportPage.action?raq="+encodeURI(encodeURI("通用委托监测协议.raq"))+"&projectcode="+projectcode);
													}else if (data == '2'){
														$("#WeituoFrame").attr("src",rootPath + "/common/report!toReportPage.action?raq="+encodeURI(encodeURI("样品送检委托协议.raq"))+"&projectcode="+projectcode);
													}else{
														alert(data);
													}
									
													}
										});
										
										//$("#WeituoFrame").attr("src",rootPath + "/common/report!toReportPage.action?raq="+encodeURI(encodeURI("通用委托监测协议.raq"))+"&projectcode="+$('#projectcode').val());
										
								
						}else if(title == '费用明细'){
								$('#ChargeFrame').attr('src','');
								if($('#ChargeFrame').attr('src')==undefined||$('#ChargeFrame').attr('src')==""){
										$("#ChargeFrame").attr("src",rootPath +"/projects/taskregister/chargedetail!view.action?id="+projectcode+"&timeStamp="+new Date().getTime());
							}
						}else if(title == '分包信息'){
							$('#SubFrame').attr("src","");				
								if($('#SubFrame').attr('src')==undefined||$('#SubFrame').attr('src')==""){
										$("#SubFrame").attr("src",rootPath +"/projects/taskregister/taskregister!toSubPageView.action?projectcode="+projectcode+"&timeStamp="+new Date().getTime());
								
							}
						}else if(title == '任务通知单'){
									$.ajax( {
											type : 'POST',
											url :rootPath + "/projects/taskregister/taskregister!matchingsamplesource.action?timeStamp="+new Date().getTime(),
											data : {'projectcode' : projectcode},
											success : function(data) {
												if (data == 'fail') {
													alert("加载失败！");
													return;
												}else if (data == '1' || data== '3'){
													$("#TaskNoticeListFrame").attr("src",rootPath + "/common/report!toReportPage.action?raq="+encodeURI(encodeURI("检测任务通知单.raq"))+"&projectcode="+projectcode);
												}else if (data == '2'){
													$("#TaskNoticeListFrame").attr("src",rootPath + "/common/report!toReportPage.action?raq="+encodeURI(encodeURI("来样送检通知单.raq"))+"&projectcode="+projectcode);
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
//选中单选框事件
	function checkRadio(){
			var row = $('#datagrid').datagrid('getSelected');
			var rowNum = 0;
			var rows = $('#datagrid').datagrid('getRows');
			for ( var i = 0; i < rows.length; i++) {
				if (row == rows[i]) {
					rowNum = i;
					break;
				}
			}
			var radios = $("input[type=radio]");
			$(radios[rowNum]).attr("checked", true);
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
//进入查询页面
function toSearchObj(){
	var url = rootPath + "/testreports/testreports!toSearchPage.action";
	var _dialog =  window.top.$('<div id ="wtmonitor-dlg" style="padding:0px;"><iframe id="searchFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
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
		var projectcode = $("#searchFrame",window.parent.document).contents().find("#projectcode").val();
		var projectrealcode = $("#searchFrame",window.parent.document).contents().find("#projectrealcode").val();
		var registby = $("#searchFrame",window.parent.document).contents().find("#registby").val();
		var monitortype = $("#searchFrame",window.parent.document).contents().find("#monitortype").val();
		var wtentprise = $("#searchFrame",window.parent.document).contents().find("#wtentprise").val();
		var registdateFirst = $("#searchFrame",window.parent.document).contents().find("#registdateFirst").val();
		var registdateSecond = $("#searchFrame",window.parent.document).contents().find("#registdateSecond").val();
		var contractno = $("#searchFrame",window.parent.document).contents().find('#contractno').val();
		var reportnum = $("#searchFrame",window.parent.document).contents().find('#reportnum').val();
		var projectname = $("#searchFrame",top.document.body).contents().find("#projectname").val();
		$('#datagrid').datagrid( {
			queryParams : {
				projectname:projectname,
				projectcode : projectcode,//监测项目编码
				projectrealcode:projectrealcode,
				registby : registby,//登记人
				monitortype : monitortype,//任务类型
				jcentprise : wtentprise,//委托单位
				registdate1 : registdateFirst,//登记日期1
				registdate2 : registdateSecond,//登记日期2
				contractno : contractno,//合同编号
				reportnum :reportnum//报告编号
			},
			pageNumber:1		
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

//加载委托检测的业务类型的下拉列表
function loadMonitortypeData() {
	var encodestr= encodeURI("委托监测,三同时监测,环境质量监测,污染源监测");
	$.ajax( {
		type : 'GET',
		url : rootPath +'/projects/localecheck/localecheck!getAllMonitorTypeByParentTypesJson.action?timeStamp='+new Date().getTime(),//给该url一个时间戳~~这样就必须每次从服务器读取数据,
		data:{'parenttype':encodestr},
		success : function(data) {
			var vData = eval("(" + data + ")");
			var lList = "<option value=''>---请选择---</option>";
			//遍历json数据  
			jQuery.each(vData.rowsData, function(i, n) {
				lList += "<option value=" + n.monitortypeid + ">" + n.monitortypename	+ "</option>";
			});				
			//绑定数据到select中
			$('#monitortype').append(lList);
		}
	});
}


//查看任务单
function viewTaskList(){
	var idVal =$('#datagrid').datagrid('getSelected').projectid;
	var url = rootPath + "/common/report!toReportPage.action?raq=MonitorTask.raq&projectid="+idVal;
	
	var _dialog =  window.top.$('	<div id ="dlg" style="padding:0px;"><iframe id="frame" width="100%" height="100%" frameborder="0" scrolling="yes" src='+url+'></iframe></div>').appendTo(window.top.document.body);
	_dialog.dialog({
	title:'任务单',
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
//提交
function openDialog(action){
	var selected=$("#datagrid").datagrid('getSelected');
	if(selected==null || selected.length< 1){
		alert('请至少选择一条记录！');
	}else{
				var url = rootPath + "/projects/reportsend/reportsendright!input.action?projectid="+selected.projectcode;
				var _dialog =  window.top.$('<div id ="dlg" style="padding:0px;"><iframe id="dlgFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
				_dialog.dialog({
				title:'发放信息',
				autoOpen:false,
				modal:true,
				closed:true,
				width:'320',
				height:'220',
				buttons:[{
					text:'确定',
					iconCls:'icon-ok',
					handler:function(){
						$("#dlgFrame",top.document.body).contents().find("#reportarchiveform").form('submit',{
							url:rootPath + "/projects/reportsend/reportsendright!save.action",
							onSubmit:function(){
								var objs = $("#dlgFrame",top.document.body).contents().find(".grkj-validate");
								if(!saveCheck(objs)){
									$("#dlgFrame",top.document.body).contents().find(":input").focus();
									alert("数据输入不符合格式，请查看红色边框的输入框的输入提示！");
									return false;
								}
							},success:function(data){
								if(data=='success'){
									_dialog.dialog('close');
									$("#datagrid").datagrid('reload');
									$("#reportsendFrame",document).contents().find("#sendBody").html("");
									$('#taskAssignFrame').attr("src","");//基本信息
									$('#taskSchemeFrame').attr("src","");//监测方案
									$('#reportsendFrame').attr("src","");//报告发放
									$('#originalFrame').attr("src","");//原始记录
									$('#testreportsFrame').attr("src","");//测试报告
									$('#zhreportsFrame').attr("src","");//综合报告
									$('#appraiseopinionFrame').attr("src","");//审核记录
									$('#taskFlowChartFrame').attr("src","");//流程图
									$('#attachmentFrame').attr("src","");//附件
									flag="flag"
									alert('成功！');
									$('#datagrid').datagrid('clearSelections');
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
				});//_dialog.dialog
				_dialog.dialog('open');		
				
		}//else
}
//退回
function backSumbit(){
	var selected=$("#datagrid").datagrid('getSelected');
	if(selected==null || selected.length< 1){
		alert('请至少选择一条记录！');
	}else{
		var showName="退回原因";
		var url=rootPath +"/projects/appraiseopinion/appraiseopinion!opinionDlgLh.action?moduleid='05'&showName="+encodeURIComponent(encodeURIComponent(showName));
		var title="退回原因";
		var _dialog =  window.top.$('<div id ="dlg" style="padding:0px;"><iframe id="dlgFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
			_dialog.dialog({
			title:title,
			autoOpen:false,
			modal:true,
			closed:true,
			width:'520',
			height:'220',
			buttons:[{
				text:'确定',
				iconCls:'icon-ok',
				handler:function(){
					var objs = $("#dlgFrame",window.parent.document).contents().find(".grkj-validate");	
					var message = $("#dlgFrame",window.parent.document).contents().find("#opinion").val();
					if(!saveCheck(objs)){
					$("#dlgFrame",window.parent.document).contents().find(":input").focus();
						alert("数据输入不符合格式，请查看红色边框的输入框的输入提示！");
						return false;
					}
					var projectid=selected.projectid;
						$.post(rootPath +"/projects/reportsend/reportsend!backFlow.action",{message:message,projectid:projectid},function(del){
							if(del=='success'){
								$("#datagrid").datagrid('reload');
								$("#reportsendFrame",document).contents().find("#sendBody").html("");
								$('#taskAssignFrame').attr("src","");//基本信息
								$('#taskSchemeFrame').attr("src","");//监测方案
								$('#reportsendFrame').attr("src","");//报告发放
								$('#originalFrame').attr("src","");//原始记录
								$('#testreportsFrame').attr("src","");//测试报告
								$('#zhreportsFrame').attr("src","");//综合报告
								$('#appraiseopinionFrame').attr("src","");//审核记录
								$('#taskFlowChartFrame').attr("src","");//流程图
								$('#attachmentFrame').attr("src","");//附件
									flag="flag";
								alert('成功');
								$('#datagrid').datagrid('clearSelections');
								
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
}