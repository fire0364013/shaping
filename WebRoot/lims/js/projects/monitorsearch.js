//朱国英2012.7.18

function relaod(){//重新装载数据
	$('#datagrid').datagrid('reload');
}

var stepCode='';//获取当前步骤
function initDataGrid(info){
	var url = "";
	if(info!=""){
		url = "monitorsearch!monitorsearchList.action?info="+info;
	}else{
		url = "monitorsearch!monitorsearchList.action";
	}
			$('#datagrid').datagrid({
				width:'400',
				height:'400',
				nowrap: false,
				striped: true,
				collapsible:true,
				url:url,
				sortName: 'projectcode',
				sortOrder: 'desc',
				fit:true,
				border:true,
				fitColumns:false,
				scrollbarSize:0,
				singleSelect:true,
				idField:'projectid',
				frozenColumns:[[
			      //{field:'projectid',checkbox:true,align : 'center'},
			      {field:'projectcode',title:'流水号',width:40,align : 'center'},
			      {field:'projectrealcode',title:'项目编号',width:90,align : 'center'}
				]],
				columns:[[
			        {field:'status',title:'项目状态',width:80,align : 'center'},
			        {field:'projectname',title:'项目名称',width:280,align : 'left'},
			        {field:'registdate',title:'登记日期',width:110,align : 'center'},			        
			        {field:'registby',title:'登记人',width:80,align : 'center'},
					{field:'jcentprise',title:'被测单位',width:280,align : 'left'},					
					{field:'monitortype',title:'业务类型',width:130,align : 'center'},
//					{field:'completedate',title:'要求完成日期',width:80,align : 'center'},
					{field:'contractno',title:'合同编号',width:120,align : 'center'},
					{field:'reportnum',title:'报告编号',width:120,align : 'center'}
				]],
				pagination:true,
				rownumbers:false,
				pageSize:20,
				pageList:[20,30,40,50],
				onRowContextMenu:function(e,row,rowData){
					if(info=='intervention'){
						$("#taskInterventionMenu").menu("show", {left: e.pageX,top: e.pageY});
					}else{
						$("#taskContextMenu").menu("show", {left: e.pageX,top: e.pageY});
					}
					
					$("#rowProjectidVal").val(rowData['projectid']);
					stepCode = rowData.stepcode;
					e.preventDefault();
				},
				onSelect:function(rowIndex, rowData){
					$('#sampeReceiveFrame',window.parent.document).attr("src","");
					$('#sampleFrame',window.parent.document).attr("src","");
					$('#samplinfFrame',window.parent.document).attr("src","");
					$('#taskFlowChartFrame',window.parent.document).attr("src","");
					$('#taskWtmonitorFrame',window.parent.document).attr("src","");
					$('#taskSchemeFrame',window.parent.document).attr("src","");
					$('#taskFuzerenFrame',window.parent.document).attr("src","");
					$('#appraiseopinionFrame',window.parent.document).attr("src","");
					$('#feiyongFrame',window.parent.document).attr("src","");
					$('#localecheckFrame',window.parent.document).attr("src","");
					$('#attachmentFrame',window.parent.document).attr("src","");
					$('#hetongFrame',window.parent.document).attr("src","");
					$('#originalFrame',window.parent.document).attr("src","");
					$('#testreportsFrame',window.parent.document).attr("src","");//当加上新的页签的时候，需要加上此句。清空src
					$('#zhreportsFrame',window.parent.document).attr("src","");
					
					$("#projectid",window.parent.document).val(rowData.projectid);
					$("#entid",window.parent.document).val(rowData.entid);					
					$("#parenttype",window.parent.document).val(rowData.parenttype);
					$("#wtsts",window.parent.document).val(rowData.workflowcode);//业务类型：委托三同时的判断
					$("#projectcode",window.parent.document).val(rowData.projectcode);
					$("#info",window.parent.document).val(rowData.stepcode);	
					$("#monitortype",window.parent.document).val(rowData.monitortypecode);
					$(window.parent.document).find("#hdnButton").click();
				}
//				,onLoadSuccess:function(data){
//					if(data.rows.length>0){
//						$('#datagrid').datagrid('selectRow',0);
//					}
//				}
				,
				rowStyler:function(rowIndex,rowData){
					var flag = rowData.flag;
						if (flag=='过期'){
							return 'color:red;';
						}else if(flag=='即将到期'){
							return 'color:#FF9900';
					}
				}
			});
			$(window).resize(function(){
				$("#datagrid").datagrid('resize');
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
	var idVal = $("#rowProjectidVal").val();
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

//进入查询页面
function toSearchObj(){
	var url = rootPath + "/projects/monitorsearch/monitorsearch!toSearchPage.action";
	var _dialog =  window.top.$('<div id ="monitorsearch-dlg" style="padding:0px;"><iframe id="searchFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
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
		var projectcode = $("#searchFrame",top.document.body).contents().find("#projectcode").val();
		var registby = $("#searchFrame",top.document.body).contents().find("#registby").val();
		var monitortype = $("#searchFrame",top.document.body).contents().find("#monitortype").val();
		var jcEntprise = $("#searchFrame",top.document.body).contents().find("#jcEntprise").val();
		var registdateFirst = $("#searchFrame",top.document.body).contents().find("#registdateFirst").val();
		var registdateSecond = $("#searchFrame",top.document.body).contents().find("#registdateSecond").val();
		var contractno = $("#searchFrame",top.document.body).contents().find('#contractno').val();
		var reportnum = $("#searchFrame",top.document.body).contents().find('#reportnum').val();
		var gqstatus = $("#searchFrame",top.document.body).contents().find('#gqstatus').val();
		var projectrealcode = $("#searchFrame",top.document.body).contents().find("#projectrealcode").val();
		var projectname = $("#searchFrame",top.document.body).contents().find("#projectname").val();
		
		
		$("#taskFrame",window.parent.body).contents().find("#projectcode").val(projectcode);
		$("#taskFrame",window.parent.body).contents().find("#projectrealcode").val(projectrealcode);
		$("#taskFrame",window.parent.body).contents().find("#registby").val(registby);
		$("#taskFrame",window.parent.body).contents().find("#monitortype").val(monitortype);
		$("#taskFrame",window.parent.body).contents().find("#jcEntprise").val(jcEntprise);
		$("#taskFrame",window.parent.body).contents().find("#registdateFirst").val(registdateFirst);
		$("#taskFrame",window.parent.body).contents().find("#registdateSecond").val(registdateSecond);
		$("#taskFrame",window.parent.body).contents().find("#contractno").val(contractno);
		$("#taskFrame",window.parent.body).contents().find("#reportnum").val(reportnum);
		$("#taskFrame",window.parent.body).contents().find("#gqstatus").val(gqstatus);
		$("#taskFrame",window.parent.body).contents().find("#projectname").val(projectname);
		//点击子列表页面的查询按钮
		$("#taskFrame",window.parent.body).contents().find("#hdnButton").click();
		
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
		url : 'monitorsearch!getAllMonitorTypeByParentTypeJson.action?timeStamp='+new Date().getTime(),//给该url一个时间戳~~这样就必须每次从服务器读取数据,
		data:{'parenttype': encodestr},
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

//删除项目
function removeTask(){
	var projectid = $("#rowProjectidVal").val();
//	alert(projectid);
	if(confirm("是否确定删除？")){
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
			
		$.post(
		rootPath +"/projects/workflowintervention/workflowintervention!deleteProject.action",
		{projectid:projectid},
		function(msg){
			if(msg=="success"){
				alert("删除成功！");
				$('#datagrid').datagrid('reload');
				$('#taskSchemeFrame',window.parent.document).contents().find('#btnRefreshMonitor').click();
				$(window.top.document.body).unblock(); 
			}else{
				alert("删除失败！");
			}
		});
	}

}