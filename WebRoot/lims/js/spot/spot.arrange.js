	//初始化采样安排任务列表
	function initTaskDataGrid(){
			$('#taskdatagrid').datagrid({
				singleSelect:false,
				width:'370',
				height:'400',
				nowrap: false,
				striped: true,
				collapsible:true,
				url:rootPath + '/spot/spotarrange/spotarrange!arrangeTaskList.action',
				sortName: 'projectcode',
				sortOrder: 'desc',
				fit:true,
				border:true,
				fitColumns:false,
				scrollbarSize:0,
				idField:'projectcode',	
				frozenColumns : [[
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
					{field:'monitortype',title:'业务类型',width:100,align : 'center'},
					{field:'completedate',title:'要求完成日期',width:80,align : 'center'}
				]],
				pagination:true,
				rownumbers:false,
				pageSize:20,
				pageList:[20,30,40,50],
				onClickRow:function(rowIndex, rowData){			
					$("#taskdatagrid").datagrid("clearSelections");
					$('#taskdatagrid').datagrid('selectRow',parseInt(rowIndex));
					$('#BasicInfoFrame').attr("src","");
					$('#MonitorEntFrame').attr("src","");
					$('#QCRequiredFrame').attr("src","");
					$('#AppraiseOpinionFrame').attr("src","");
					$('#TaskListFrame').attr("src","");
					$('#SamplingFrame').attr("src","");
					
					selectView('采样安排');
				},
//				onRowContextMenu:function(e,row,rowData){
//					$("#taskdatagrid").datagrid("clearSelections");
//					$('#taskdatagrid').datagrid('selectRow',parseInt(row));
//					$("#taskContextMenu").menu("show", {left: e.pageX,top: e.pageY});
//					e.preventDefault();
//				},
				onSelect:function(rowIndex,rowData){
					$("#projectcode").val(rowData.projectcode);
					$("#monitortype").val(rowData.monitortypecode);
					//$($("input[type=radio]")[rowIndex]).attr("checked", true);
				}
			});
			$(window).resize(function(){
				$("#taskdatagrid").datagrid('resize');
			});
			$("#renwu").resize(function(){
				$("#taskdatagrid").datagrid('resize');
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
				}else if(title == '任务计划单'){
					if($('#projectcode').val()!=''){
						//if($('#TaskListFrame').attr('src')==undefined||$('#TaskListFrame').attr('src')==""){
						if($("#monitortype").val()=='100'){
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
											$("#TaskListFrame").attr("src",rootPath + "/common/report!toReportPage.action?raq="+encodeURI(encodeURI("检测任务通知单.raq"))+"&projectcode="+$('#projectcode').val());	
										}else if (data == '2'){
											$("#TaskListFrame").attr("src",rootPath + "/common/report!toReportPage.action?raq="+encodeURI(encodeURI("来样送检通知单.raq"))+"&projectcode="+$('#projectcode').val());
										}else{
											alert(data);
										}
									}
							});
						}else
						{
							$("#TaskListFrame").attr("src",rootPath + "/common/report!toReportPage.action?raq="+encodeURI(encodeURI("任务计划单.raq"))+"&projectcode="+$('#projectcode').val());
						}

							
							
							//$("#TaskListFrame").attr("src",rootPath + "/common/report!toReportPage.action?raq="+encodeURI(encodeURI("任务计划单.raq"))+"&projectcode="+$('#projectcode').val());
							
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
							$("#QCRequiredFrame").attr("src",rootPath +"/projects/qcrequired/qcrequired!view.action?id="+$('#projectcode').val());
						}
					}
				}else if(title == '采样安排'){
					if($('#projectcode').val()!=''){
						if($('#SamplingFrame').attr('src')==undefined||$('#SamplingFrame').attr('src')==""){
							$("#SamplingFrame").attr("src",rootPath +"/spot/spotarrange/spotarrange!toArrangePage.action?projectcode="+$('#projectcode').val());
						}
					}
				}
				else if(title == '流转记录'){
					if($('#projectcode').val()!=''){
						if($('#AppraiseOpinionFrame').attr('src')==undefined||$('#AppraiseOpinionFrame').attr('src')==""){
							$("#AppraiseOpinionFrame").attr("src",rootPath + "/projects/opinion/opinion!list.action?id="+$('#projectcode').val());
						}
					}
				}else if(title == '附件'){
					if($('#projectid').val()!=''){
						if($('#fjFrame').attr('src')==undefined||$('#fjFrame').attr('src')==""){
							$("#fjFrame").attr("src",rootPath+"/projects/attachment/projectattachment!noadd.action?projectid="+$('#projectcode').val());	
						}
					}
				}else if(title == '流程图'){
					if($('#projectid').val()!=''){
						if($('#lctFrame').attr('src')==undefined||$('#lctFrame').attr('src')==""){
							$("#lctFrame").attr("src",rootPath+"/projects/flowchart/flowchart!toFlowChartPage.action?entityid="+$('#projectcode').val());
						}
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
					content:'<iframe id="TaskNoticeListFrame" width="100%" height="568"	frameborder="0" scrolling="no" src=""></iframe>'
				});
		$('#tt').tabs('add',{
					title:'委托协议',
					content:'<iframe id="WeituoFrame" width="100%" height="568"	frameborder="0" scrolling="no" src=""></iframe>'
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
					content:'<iframe id="TaskListFrame" width="100%" height="568"	frameborder="0" scrolling="no" src=""></iframe>'
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
					content:'<iframe id="TaskListFrame" width="100%" height="568"	frameborder="0" scrolling="no" src=""></iframe>'
				});
	}
	selectView('采样安排');
}
	//初始化任务人员安排列表
	function initArrangeDataGrid(){
			$('#persondatagrid').datagrid({
//				width:800,
//				height:600,
				nowrap: false,
				striped: true,
				collapsible:true,
				url:rootPath + '/spot/spotarrange/spotarrange!initSamplingPersonList.action?projectcode='+projectcode,
				sortName: 'spersonid',
				//sortOrder: 'desc',
				fit:true,
				fitColumns:true,
				scrollbarSize:0,
//				idField:'spersonid',	
				frozenColumns : [[
					{field:'spersonid',checkbox:true,align : 'center'}
				]],
				columns:[[									
					{field:'group',title:'采样组',width:60,align : 'center'},
			        {field:'usrname',title:'采样人',width:300,align : 'center'},	
			        {field:'startdate',title:'采样开始日期',width:80,align : 'center'},	
			        {field:'enddate',title:'采样结束日期',width:80,align : 'center'},
					{field:'operate',title:'操作',width:50,align : 'center',
						formatter:function(value,rowData,rowIndex){
							return '<img src="'+rootPath+'/themes/default/images/bianjiimage.png" alt="编辑" onclick="editmanyuser(\''+rowData.spersonid+'\')"/> &nbsp;' +
							'<img src="'+rootPath+'/themes/default/images/deleteimage.png" alt="删除" onclick="deleteByOne(\''+rowData.spersonid+'\')"/>&nbsp; ' ;
							
						}
					}					
				]],
				pagination:true,
				rownumbers:false,
				pageSize:20,
				pageList:[20,30,40,50]				
			});
			$(window).resize(function(){
				$("#persondatagrid").datagrid('resize');
			});
	}
	
	//初始化任务人员安排列表
	function initViewArrangeDataGrid1(){
			$('#persondatagrid22').datagrid({
//				width:800,
//				height:600,
				nowrap: false,
				striped: true,
				collapsible:true,
				url:rootPath + '/spot/spotarrange/spotarrange!initSamplingPersonList.action?projectcode='+projectcode,
				sortName: 'spersonid',
				//sortOrder: 'desc',
				fit:true,
				fitColumns:true,
				scrollbarSize:0,
//				idField:'spersonid',	
				frozenColumns : [[
					{field:'spersonid',checkbox:true,align : 'center'}
				]],
				columns:[[									
					{field:'group',title:'采样组',width:60,align : 'center'},
			        {field:'usrname',title:'采样人',width:300,align : 'center'},	
			        {field:'startdate',title:'采样开始日期',width:80,align : 'center'},	
			        {field:'enddate',title:'采样结束日期',width:80,align : 'center'}
				]],
				pagination:true,
				rownumbers:false,
				pageSize:20,
				pageList:[20,30,40,50]				
			});
			$(window).resize(function(){
				$("#persondatagrid").datagrid('resize');
			})
	}
	
	//新增、修改采样人员
	function editSamplingperson()
	{	
		var url = rootPath + "/spot/spotarrange/spotarrange!input.action?projectcode="+projectcode;
//		if(id!=""){
//			url = url + "?ids="+id;
//		}
		var _dialog =  window.top.$('<div id ="samplingperson-dlg" style="padding:0px;"><iframe id="samplingpersonFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
		_dialog.dialog({
		title:'新增采样人员信息',
		autoOpen:false,
		modal:true,
		closed:true,
		width:'400',
		height:'200',
		buttons:[{
			text:'保存',
			iconCls:'icon-save',
			handler:function(){
				 $("#samplingpersonFrame",top.document.body).contents().find("#samplingpersonForm").form('submit',
					{
						url:rootPath + '/spot/spotarrange/spotarrange!saveSamplingPerson.action',
						onSubmit:function(){
							var objs = $("#samplingpersonFrame",top.document.body).contents().find(".grkj-validate");							
							if(!saveCheck(objs)){
								$("#samplingpersonFrame",top.document.body).contents().find(":input").focus();
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
								_dialog.dialog('close');
								alert('保存成功！');
								$("#persondatagrid").datagrid('reload');
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
	
	}
	
		//做多用户测试用的
	function manyuser(){
		var url =  rootPath +"/spot/spotarrange/spotarrange!toManyUser.action?projectcode="+projectcode;
		var _dialog =  window.top.$('<div id ="role-dlg" style="padding:0px;"><iframe id="manyUserFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
		_dialog.dialog({
			title:'采样安排',
			autoOpen:false,
			modal:true,
			closed:true,
			width:'600',
			height:'500',
			buttons:[{
				text:'确定',
				iconCls:'icon-save',
				handler:function(){
					var useridVal=$("#manyUserFrame",top.document.body).contents().find("#selectedUserid").val();
					var startdate = $("#manyUserFrame",top.document.body).contents().find("#startdate").val();
					var enddate = $("#manyUserFrame",top.document.body).contents().find("#enddate").val();
					if(useridVal==""){
						alert("请选择人员！");
						return false;
					}
					var objs = $("#manyUserFrame",window.top.document).contents().find(".grkj-validate");
					if(!saveCheck(objs)){
						$("#manyUserFrame",window.top.document).contents().find(".grkj-validate").focus();
						alert("数据输入不符合格式，请查看红色边框的输入框的输入提示！");
						return false;
					}
					$.post(
						rootPath + "/spot/spotarrange/spotarrange!saveSamplingPerson.action",
						{persons:useridVal,projectcode:projectcode,startdate:startdate,enddate:enddate},
						function(data){
							if (data == 'success') {
								_dialog.dialog('close');
								$("#persondatagrid").datagrid('reload');
							}else{
								alert("保存失败！");
							}
						}
					);
					
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
	
	
	//修改已选用户
	function editmanyuser(ids){
		var url =  rootPath +"/spot/spotarrange/spotarrange!toEditPage.action?projectcode="+projectcode+"&ids="+ids;
		var _dialog =  window.top.$('<div id ="role-dlg" style="padding:0px;"><iframe id="manyUserFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
		_dialog.dialog({
			title:'选择人员',
			autoOpen:false,
			modal:true,
			closed:true,
			width:'600',
			height:'500',
			buttons:[{
				text:'确定',
				iconCls:'icon-save',
				handler:function(){
					//var usernameVal=$("#manyUserFrame",top.document.body).contents().find("#selectedUser").val();
					var useridVal=$("#manyUserFrame",top.document.body).contents().find("#selectedUserid").val();
					var startdate = $("#manyUserFrame",top.document.body).contents().find("#startdate").val();
					var enddate = $("#manyUserFrame",top.document.body).contents().find("#enddate").val();
					if(useridVal==""){
						alert("请选择人员！");
						return false;
					}
					var objs = $("#manyUserFrame",window.top.document).contents().find(".grkj-validate");
					if(!saveCheck(objs)){
						$("#manyUserFrame",window.top.document).contents().find(".grkj-validate").focus();
						alert("数据输入不符合格式，请查看红色边框的输入框的输入提示！");
						return false;
					}
					$.post(
						rootPath + "/spot/spotarrange/spotarrange!updateSamplingPerson.action",
						{ids:ids,persons:useridVal,startdate:startdate,enddate:enddate},
						function(data){
							if (data == 'success') {
								_dialog.dialog('close');
								$("#persondatagrid").datagrid('reload');
							}else{
								alert("保存失败！");
							}
						}
					);
					
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
	
	//批量删除
	function deleteByAll(){
		var rows = $('#persondatagrid').datagrid('getSelections');
		if (rows!=null && rows!="") { 		
	 		if(window.confirm('是否删除？'))
	 		{
				var arr = "";
				for(var i=0;i<rows.length;i++){
					if(arr!=null&&arr!="")
						arr += ",";
					arr += rows[i].spersonid;
				}
				$.post(
					rootPath + "/spot/spotarrange/spotarrange!deleteByAll.action",
					{ids:arr,projectcode:projectcode},
					function(msg){
							if(msg=='success'){
								$('#persondatagrid').datagrid('clearSelections');
								alert("删除成功！");
								$("#persondatagrid").datagrid('reload');
							}
						}
				);
			}
		} else {
			alert('请至少选择一条记录！');
			return;
		}
	}
	
		//批量删除
	function deleteByOne(id){
 		if(window.confirm('是否删除？'))
 		{
			$.post(
				rootPath + "/spot/spotarrange/spotarrange!deleteByAll.action",
				{ids:id,projectcode:projectcode},
				function(msg){
						if(msg=='success'){
							$('#persondatagrid').datagrid('clearSelections');
							alert("删除成功！");
							$("#persondatagrid").datagrid('reload');
						}
					}
			);
		}
	}
	
//	//提交
//	function submitDialog(action,taskid,message){
//		var rows = $("#taskdatagrid").datagrid('getSelections');
//		if(rows==null || rows.length< 1){
//			alert('请至少选择一条记录！');
//			return;
//		}
//		if(action=="提交"){
//			var arr="";
//			for(var i=0;i<rows.length;i++){
//				if(arr!=null&&arr!="")
//					arr += ",";
//				arr += rows[i].projectcode;
//			}
//			
//			$.ajax({
//				type:'POST',
//				url:rootPath + "/spot/spotarrange/spotarrange!isArrangePerson.action",
//				data:'projectcode='+ arr,
//				success:function(msg){
//					if(msg=="ArrangeUser"){
//						alert("请安排采样人员！");
//						return;
//					}else{
//						if(window.confirm("是否提交")){
//							$.post(rootPath +"/spot/spotarrange/spotarrange!submitStatus.action",{ids:arr,message:message,status:action,taskid:taskid},function(del){
//								if(del=='success'){
//									alert('成功');
//									$("#taskdatagrid").datagrid('reload');					
//								}else{
//									alert("失败");
//								}
//							});
//						}
//					}
//				}
//			});
//		}
//	}
	
	
	
	//进入查询页面
function toSearchObj(){
	var url = rootPath + "/spot/spotarrange/spotarrange!toSearchPage.action";
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
				
				$('#taskdatagrid').datagrid({
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


//进入评审意见页面
function checkFuntion(action){	
	var rows = $("#taskdatagrid").datagrid('getSelections');
		if(rows==null || rows.length< 1){
			alert('请至少选择一条记录！');
			return;
		}
			var arr="";
			for(var i=0;i<rows.length;i++){
				if(arr!=null&&arr!="")
					arr += ",";
				arr += rows[i].projectcode;
			}
			
			$.ajax({
				type:'POST',
				url:rootPath + "/spot/spotarrange/spotarrange!isArrangePerson.action",
				data:'projectcode='+ arr,
				success:function(msg){
					if(msg=="ArrangeUser"){
						alert("请安排采样人员！");
						return;
					}else{
//						if(window.confirm("是否提交")){
							var url = rootPath + "/projects/appraiseopinion/appraiseopinion!opinionlhNew.action?showName="+encodeURI(encodeURI(action+"意见"))+"&projectcode="+$("#projectcode").val()+"&scode="+$('#stepcode').val();
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
									var opinion = $("#dlgFrame",window.top.document).contents().find("#opinion").val();
						//			operate(action,taskid,userid,opinion);
//									submitDialog(action,taskid,opinion);
									$.post(rootPath +"/spot/spotarrange/spotarrange!submitStatus.action",{ids:arr,message:opinion,status:action,taskid:taskid},function(del){
										if(del=='success'){
											alert('成功');
											$("#taskdatagrid").datagrid('reload');					
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
							
//						}
					}
				}
			});
	
}



//function modifyWorkflow(){
//	var _dialog = window.top.$('<div onkeydown="PreventBSK()" id="blg" style="left:100px;top:180px;">'
//							+'<select id="nextWorkflow" name="nextWorkflow" style="width:100%;height:20px;">'
//							+'</select>'
//							+'</div>').appendTo(window.top.document.body);
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
//				submitDialog("提交",taskid);
//				_dialog.dialog('close');
//			}
//		},{
//			text:'取消',
//			iconCls:'icon-cancel',
//			handler:function(){
//			_dialog.dialog('close');
//			}
//		}],
//		onClose:function(){
//			_dialog.dialog("destroy");
//		}
//		
//	});
//	_dialog.dialog('open');
//}

function initWorkflow(){
	if(window.confirm('是否提交？')){

	$.ajax({
		type:'POST',
		url:rootPath+'/workflow/workflow!workflowStepList.action?time='+new Date().getTime(),
		data:'status=SamplingSet&workflowcode=JC_PROJECT',
		success:function(data){
			var vData = eval("("+data+")");
			var List ="";
			jQuery.each(vData,function(i,n){
				List +="<option value='"+n.code+"'>"+n.value+"</option>"
			});
//			alert(List);
			//$(window.top.document).find("#nextWorkflow").html(List);	
			$('#dlgFrame',window.top.document).contents().find("#nextWorkflow").html(List);
		}
	});
	}
}