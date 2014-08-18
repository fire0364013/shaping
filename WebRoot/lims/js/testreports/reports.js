
	//加载任务列表
	function initTaskData(){
			$('#taskgrid').datagrid({
				width:'400',
				height:'400',
				nowrap: false,
				striped: true,
				collapsible:true,
				url:'testreports!taskList.action?info='+info,
				sortName: 'projectcode',
				sortOrder: 'desc',
				fit:true,
				border:true,
				fitColumns:false,
				scrollbarSize:0,
				idField:'projectcode',
				singleSelect:true,
				frozenColumns:[[
			       {field : ' ',
						title : '&nbsp;',
						width : 30,
						align : 'center',
						formatter : function(value){
							return "<input type='radio' name='radio'/>";}
				 	},
				 	{field:'projectcode',title:'流水号',width:50,align : 'center'},
		       	    {field:'projectrealcode',title:'项目编号',width:80,align : 'center'}
				]],
				columns:[[
			        {field:'status',title:'项目状态',width:80,align : 'center'},
			        {field:'projectname',title:'项目名称',width:280,align : 'left'},
					{field:'wtentprise',title:'委托单位',width:280,align : 'left'},					
					{field:'monitortype',title:'业务类型',width:100,align : 'center'},
					{field:'registdate',title:'登记日期',width:80,align : 'center'},
					{field:'registby',title:'登记人',width:80,align : 'center'},
//					{field:'completedate',title:'要求完成日期',width:80,align : 'center'},
					{field:'contractno',title:'合同编号',width:120,align : 'center'},
					{field:'reportnum',title:'报告编号',width:120,align : 'center'}
				]],
				pagination:true,
				rownumbers:false,
				pageSize:20,
				pageList:[20,30,40,50],
				onRowContextMenu:function(e,row,rowData){
					$("#taskgrid").datagrid("clearSelections");
					$('#taskgrid').datagrid('selectRow',parseInt(row));
					$("#taskContextMenu").menu("show", {left: e.pageX,top: e.pageY});
					$('#createTask').attr({disabled:"true"});
					$('#editTask').attr({disabled:"true"});
					$('#delTask').attr({disabled:"true"});
					$('#copyTask').attr({disabled:"true"});
					$('#projectid').val(rowData.projectid);
//					$('#viewTask').removeAttr("disabled");
					
					e.preventDefault();
				},
				onClickRow:function(rowIndex, rowData){
					var taskUrl;
					var tasktype;
					$('#taskFuzerenFrame').attr('src','');
					$('#taskWtmonitorFrame').attr("src","");
					$('#taskSchemeFrame').attr("src","");
					$('#feiyongFrame').attr("src","");
					$('#localecheckFrame').attr("src","");
					$('#attachmentFrame').attr("src","");
					$("#testreportsFrame").attr("src","");
					$("#originalFrame").attr("src","");
					projectid = rowData.projectid;
					//当时三同时和委托的时候将踏勘记录展示，否则隐藏~wjy
					var parenttypeVal= rowData.parenttype;
					addTabs(rowData.monitortypecode,rowData.projectcode);
					
				},
				rowStyler:function(rowIndex,rowData){
				var flag = rowData.flag;
					if (flag=='过期'){
						return 'color:red;';
					}else if(flag=='即将到期'){
						return 'color:#FF9900';
					}
				},
				onSelect:function(rowIndex,rowData){	
					$($("input[type=radio]")[rowIndex]).attr("checked", true);
					checkRadio();
					
					$('#taskFuzerenFrame').attr('src','');
					$('#taskWtmonitorFrame').attr("src","");
					$('#taskSchemeFrame').attr("src","");
					$('#feiyongFrame').attr("src","");
					$('#localecheckFrame').attr("src","");
					$('#attachmentFrame').attr("src","");
					$("#testreportsFrame").attr("src","");
					$("#originalFrame").attr("src","");
					projectid = rowData.projectid;
					//当时三同时和委托的时候将踏勘记录展示，否则隐藏~wjy
					var parenttypeVal= rowData.parenttype;
					addTabs(rowData.monitortypecode,rowData.projectcode);
				}
			});
			
			$(window).resize(function(){
				$("#taskgrid").datagrid('resize');
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
					content:'<iframe id="taskFuzerenFrame" width="100%" height="668"	frameborder="0" src=""></iframe>'
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
					content:'<iframe id="taskFuzerenFrame" width="100%" height="668"	frameborder="0" src=""></iframe>'
				});
	}
	selectView('基本信息',projectcode,monitortype);
}

function selectView(title,projectcode,monitortypecode){
		$('#tt').tabs({
						onSelect: function(title){
							if(title == '基本信息'){
//								if($('#taskWtmonitorFrame').attr('src')==undefined||$('#taskWtmonitorFrame').attr('src')==""){	
//									$("#taskWtmonitorFrame").attr("src",rootPath +"/projects/taskregister/taskregister!view.action?id="+rowData.projectcode);
//								}
								if(monitortypecode=='100'){//委托
									if($('#taskWtmonitorFrame').attr('src')==undefined||$('#taskWtmonitorFrame').attr('src')==""){
										$("#taskWtmonitorFrame").attr("src",rootPath +"/projects/taskregister/taskregister!waiweiView.action?id="+projectcode);
									}
								}else if(monitortypecode=='001'){//环境质量
									if($('#taskWtmonitorFrame').attr('src')==undefined||$('#taskWtmonitorFrame').attr('src')==""){
										$("#taskWtmonitorFrame").attr("src",rootPath +"/projects/taskregister/taskregister!huanjingView.action?id="+projectcode);
									}
								}else if(monitortypecode=='003'){//临时
									if($('#taskWtmonitorFrame').attr('src')==undefined||$('#taskWtmonitorFrame').attr('src')==""){
										$("#taskWtmonitorFrame").attr("src",rootPath +"/projects/taskregister/taskregister!linshiView.action?id="+projectcode);
									}
								}else if(monitortypecode=='004'){//比对
									if($('#taskWtmonitorFrame').attr('src')==undefined||$('#taskWtmonitorFrame').attr('src')==""){
										$("#taskWtmonitorFrame").attr("src",rootPath +"/projects/taskregister/taskregister!biduiView.action?id="+projectcode);
									}
								}else if(monitortypecode=='002'){//污染源
									if($('#taskWtmonitorFrame').attr('src')==undefined||$('#taskWtmonitorFrame').attr('src')==""){
										$("#taskWtmonitorFrame").attr("src",rootPath +"/projects/taskregister/taskregister!wuranyuanView.action?id="+projectcode);
									}
								}
							}
							else if(title == '任务计划单'){
//								if($('#taskFuzerenFrame').attr('src')==undefined||$('#taskFuzerenFrame').attr('src')==""){
//									$("#taskFuzerenFrame").attr("src",rootPath + "/common/report!toReportPage.action?raq="+encodeURI(encodeURI("任务计划单-现场室.raq"))+"&projectcode="+rowData.projectcode);
//								}
								
								$.ajax( {
									type : 'POST',
									url :rootPath + "/projects/taskregister/taskregister!matchingsamplesource.action?timeStamp="+new Date().getTime(),
									data : {'projectcode' : projectcode},
									success : function(data) {
										if (data == 'fail') {
											alert("加载失败！");
											return;
										}else if (data == '1' || data== '3'){
											$("#taskFuzerenFrame").attr("src",rootPath + "/common/report!toReportPage.action?raq="+encodeURI(encodeURI("例行监测任务计划单（环境空气质量监测）.raq"))+"&projectcode="+projectcode);
										}else if (data == '2'){
											$("#taskFuzerenFrame").attr("src",rootPath + "/common/report!toReportPage.action?raq="+encodeURI(encodeURI("例行监测任务计划单（悬浮物中重金属）.raq"))+"&projectcode="+projectcode);
										}else{
											alert(data);
										}
						
										}
								});
							}
							else if(title == '监测企业'){
								if($('#localecheckFrame').attr('src')==undefined||$('#localecheckFrame').attr('src')==""){
									$("#localecheckFrame").attr("src",rootPath +"/projects/taskregister/projectdetail!view.action?id="+projectcode);
								}	
							}
							else if(title == '质控要求'){
								if($('#taskSchemeFrame').attr('src')==undefined||$('#taskSchemeFrame').attr('src')==""){
									$("#taskSchemeFrame").attr("src",rootPath +"/projects/qcrequired/qcrequired!view.action?id="+projectcode);
								}
							}	
							
							else if(title == '流转记录'){
								if($('#appraiseopinionFrame').attr('src')==undefined||$('#appraiseopinionFrame').attr('src')==""){
									$("#appraiseopinionFrame").attr("src",rootPath + "/projects/opinion/opinion!list.action?id="+projectcode);
								}
							}
							
//							else if(title == '原始记录'){
//								if($('#originalFrame').attr('src')==undefined||$('#originalFrame').attr('src')==""){
//									$("#originalFrame").attr("src",rootPath + "/sourcerecord/sourcerecord!toSource.action?projectid="+rowData.projectid+"&entid="+rowData.entid+"&projectcode="+rowData.projectcode+"&info="+info);
//								}
//							}
							else if(title == '测试报告'){
								if($('#testreportsFrame').attr('src')==undefined||$('#testreportsFrame').attr('src')==""){
									$("#testreportsFrame").attr("src",rootPath + "/testreports/testreports!toReports.action?projectcode="+projectcode+"&info="+info+"&projectid="+projectcode);	
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
		
			});
}
	//单选按钮
	function checkRadio(){
			var row = $('#taskgrid').datagrid('getSelected');
			var rowNum = 0;
			var rows = $('#taskgrid').datagrid('getRows');
			for ( var i = 0; i < rows.length; i++) {
				if (row == rows[i]) {
					rowNum = i;
					break;
				}
			}
			var radios = $("input[type=radio]");
			$(radios[rowNum]).attr("checked", true);
	}
		//单选按钮
	function checkRadio2(){
			var row = $('#testreport').datagrid('getSelected');
			var rowNum = 0;
			var rows = $('#testreport').datagrid('getRows');
			for ( var i = 0; i < rows.length; i++) {
				if (row == rows[i]) {
					rowNum = i;
					break;
				}
			}
			var radios = $("input[type=radio]");
			$(radios[rowNum]).attr("checked", true);
	}
		//单选按钮
	function checkRadio3(){
			var row = $('#reportinfodatagrid').datagrid('getSelected');
			var rowNum = 0;
			var rows = $('#reportinfodatagrid').datagrid('getRows');
			for ( var i = 0; i < rows.length; i++) {
				if (row == rows[i]) {
					rowNum = i;
					break;
				}
			}
			var radios = $("input[type=radio]");
			$(radios[rowNum]).attr("checked", true);
	}
		//刷新任务页面
	function reloadProjectDatagrid(){
		$("#taskgrid").datagrid('reload');
	}

	//加载报表列表
	function initReportData(){
			$('#testreport').datagrid({
				nowrap: false,
				striped: true,
				collapsible:true,
				url:'testreports!reportList.action?info='+info+'&projectcode='+projectcode+'&projectid='+projectcode,				
				fit:true,
				fitColumns:true,
				scrollbarSize:20,
				idField:'reportid',
				frozenColumns:[[
//					 {field:'checkbox',checkbox:true,align : 'center'},
					 {field : 'reportid',
						title : '&nbsp;',
						width : 30,
						align : 'center',
						checkbox:true,
				 	}
					]],
				columns:[[
					{field:'entname',title:'监测企业',width:250,align : 'center'},
			        {field:'sampletype',title:'监测类型',width:250,align : 'center'},
					{field:'statusname',title:'状态',width:100,align : 'center'},
					{field:'isoverproof',title:'是否超标',width:60,align : 'center',
						formatter : function(value,rowData, rec) {
							var str = "";
							if(value=="Y"){
								str = "<input type=\"checkbox\" checked=\"true\" onclick=\"isOverproof('"+rowData.reportid+"','N');\"/>";
							}else{
								str = "<input type=\"checkbox\" onclick=\"isOverproof('"+rowData.reportid+"','Y');\"/>";
							}
							return str;						
						}
					},
					{field:'option',title:'操作',width:80,align : 'center',
						formatter : function(value,rowData, rec) {
						var links = '';	
						if(rowData.status=='TestReportDrawUp'){
									links += '<img src="'
									+ rootPath
									+ '/themes/default/images/bianjiimage.png" onclick="editRemark(\''+rowData.reportid+'\');" alt="修改备注"/>';
								}
							return links;
						}
					}
					
				]],
				pagination:true,
				rownumbers:false,
				pageSize:20,
				pageList:[20,30,40,50],
//				onSelect:function(){					
//					checkRadio2();
//				},
				onClickRow:function(rowIndex, rowData){					
//					$("#testreport").datagrid("clearSelections");
//					$('#testreport').datagrid('selectRow',parseInt(rowIndex));
				},
				onLoadSuccess:function(data){
					if(info!='TestReportAudit'){
						hiddenColumn("testreport","isoverproof");
					}
				}
			});
			$(window).resize(function(){
				$("#testreport").datagrid('resize');
				$("#reportinfodatagrid").datagrid('resize');
			});
	}
	//加载报表列表
	function initReportData3(){
			$('#testreport').datagrid({
				nowrap: false,
				striped: true,
				collapsible:true,
				url:'testreports!reportList.action?info='+info+'&projectcode='+projectcode+'&projectid='+projectcode,				
				fit:true,
				fitColumns:true,
				scrollbarSize:0,
				idField:'reportid',
				frozenColumns:[[
					 {field : 'reportid',
						title : '&nbsp;',
						width : 30,
						align : 'center',
						formatter : function(value){
							return "<input type='radio' name='radio'/>";}
				 }
					]],
				columns:[[
			        {field:'sampletype',title:'监测类型',width:250,align : 'center'},
			        {field:'bzr',title:'编制人',width:80,align : 'center'},
			        {field:'bztime',title:'编制时间',width:120,align : 'center'},
					{field:'shr',title:'审核人',width:80,align : 'center'},					
					{field:'shtime',title:'审核时间',width:120,align : 'center'},
					//{field:'qfr',title:'签发人',width:80,align : 'center'},
					//{field:'qftime',title:'签发时间',width:120,align : 'center'},
					{field:'statusname',title:'状态',width:100,align : 'center'},
					{field:'isoverproof',title:'是否超标',width:60,align : 'center',
						formatter : function(value,rowData, rec) {
							var str = "";
							if(value=="Y"){
								str = "<input type=\"checkbox\" checked=\"true\" onclick=\"isOverproof('"+rowData.reportid+"','N');\"/>";
							}else{
								str = "<input type=\"checkbox\" onclick=\"isOverproof('"+rowData.reportid+"','Y');\"/>";
							}
							return str;						
						}
					},
					{field:'option',title:'操作',width:70,align : 'center',
						formatter : function(value,rowData, rec) {
							var links = '<img src="'
									+ rootPath
									+ '/themes/default/images/reportimage.png" onclick="viewpdf(\''+rowData.reportfile+'\');" alt="报表"/>';
								if(rowData.status=='TestReportDrawUp'){
										links += '<img src="'
										+ rootPath
										+ '/themes/default/images/bianjiimage.png" onclick="editRemark(\''+rowData.reportid+'\');" alt="修改备注"/>';
									}
							return links;
						}
					}
					
				]],
				pagination:true,
				rownumbers:false,
				pageSize:20,
				pageList:[20,30,40,50],
				onSelect:function(){					
//					checkRadio2();
				},
				onClickRow:function(rowIndex, rowData){					
					$("#testreport").datagrid("clearSelections");
					$('#testreport').datagrid('selectRow',parseInt(rowIndex));
				},onLoadSuccess:function(data){
					if(info!='TestReportAudit'){
						hiddenColumn("testreport","isoverproof");
					}
				}
			});
			$(window).resize(function(){
				$("#testreport").datagrid('resize');
			});

	}
	
	//隐藏列
	function hiddenColumn(tableID,colList){
	    var ColArray = colList.split(",");
	    var tTable = $('#'+tableID);
	    if(ColArray!=null&&ColArray!=""){
	    	for(var i=0;i<ColArray.length;i++){
	    		tTable.datagrid('hideColumn',ColArray[i]);
	    	}
	    }
	}
	
	//加载报表列表
	function initReportData2(){
			$('#testreport').datagrid({
				nowrap: false,
				striped: true,
				collapsible:true,
				url:'testreports!reportList2.action?info='+info+'&projectcode='+projectcode+'&projectid='+projectcode,				
				fit:true,
				fitColumns:true,
				scrollbarSize:0,
				idField:'reportid',
				frozenColumns:[[
					
					]],
				columns:[[
			        {field:'sampletype',title:'样品类型',width:100,align : 'center'},
			        {field:'bzr',title:'编制人',width:80,align : 'center'},
			        {field:'bztime',title:'编制时间',width:120,align : 'center'},
					{field:'shr',title:'审核人',width:80,align : 'center'},					
					{field:'shtime',title:'审核时间',width:120,align : 'center'},
					{field:'qfr',title:'签发人',width:80,align : 'center'},
					{field:'qftime',title:'签发时间',width:120,align : 'center'},
					{field:'statusname',title:'状态',width:100,align : 'center'},
					{field:'option',title:'操作',width:50,align : 'center',
						formatter : function(value,rowData, rec) {
							var links = '<img src="'
									+ rootPath
									+ '/themes/default/images/reportimage.png" onclick="viewpdf(\''+rowData.reportfile+'\');" alt="报表"/>';
							return links;
						}
					}
					
				]],
				pagination:true,
				rownumbers:false,
				pageSize:20,
				pageList:[20,30,40,50]
			});
			
			$(window).resize(function(){
				$("#testreport").datagrid('resize');
			});

	}
	
	
	//提交
	function openDialog(action){
		var rows = $("#reportinfodatagrid").datagrid("getSelections");
		
		if(rows==null || rows.length<1){
				alert('请至少选择一条记录！');
				return;
		}
		if(info=='TestReportDrawUp'){			
			for(var i=0;i<rows.length;i++){
				if(rows[i].status!='TestReportDrawUp'){
					alert('存在已编制的单据,请去掉选择重新提交');
					return;
				}
				if(rows[i].reportfile==null || rows[i].reportfile==''){
					alert("请先生成报告！");
					return false;
				}
			}
		}
		if(info=='TestReportAudit'){			
			for(var i=0;i<rows.length;i++){
				if(rows[i].status!='TestReportAudit'){
					alert('请选择报告审核状态的报告进行提交');
					return;
				}
			}
		} 
		if(info=='TestReportIssue'){			
			for(var i=0;i<rows.length;i++){
				if(rows[i].status!='TestReportIssue'){
					alert('请选择报告签发状态的报告进行提交');
					return;
				}
			}
		} 

		
		if(action=="提交"){
			if(window.confirm('是否'+action+'选中行？')){
				//operate("提交2","");
				checkFuntion2('提交2');
			}
		}else if(action=="审核"){
			if(window.confirm('是否'+action+'选中行？')){
//				operate("提交","");
				checkFuntion2('提交');
			}
		}else if(action=="签发"){
			if(window.confirm('是否'+action+'选中行？')){
//				operate("提交","");
				checkFuntion2('提交');
			}
		}
		else{
			var str =encodeURI(encodeURI("测试报告审核退回意见"));
			var url = rootPath + "/projects/appraiseopinion/appraiseopinion!opinionDlg.action?moduleid="+str;
			var _dialog =  window.top.$('	<div id ="dlg" style="padding:0px;"><iframe id="dlgFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
			_dialog.dialog({
			title:'退回意见',
			autoOpen:false,
			modal:true,
			closed:true,
			width:'520',
			height:'220',
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
					operate(action,message);
					
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

//zcd添加提交意见及fujian
function checkFuntion2(action){	
	var url = rootPath + "/projects/appraiseopinion/appraiseopinion!opinionNocode.action?showName="+encodeURI(encodeURI("提交意见"));
	var _dialog =  window.top.$('	<div id ="dlg" style="padding:0px;"><iframe id="dlgFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
	_dialog.dialog({
	title:'提交意见',
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
			var opinion = $("#dlgFrame",window.top.document).contents().find("#opinion").val();
			operate(action,opinion);
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
	function operate(action,message){
		var rows = $("#reportinfodatagrid").datagrid("getSelections");
		if (rows!=null && rows!="") {
	 		$(window.top.document.body).block({ 
				message: "正在提交数据,请稍候...", 
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
				var str = "";
				for(var i=0;i<rows.length;i++){
						if(str!="")
							str = str + ",";
						str = str + "{'projectcode':'"+rows[i].projectcode+"','stepCode':'"+rows[i].status+"','reportcode':'"+rows[i].reportcode+"'}";
				}
				str = "{'data':["+str+"]}";
				$.ajax({
					type:'post',
					url:rootPath + '/testreports/testreports!operate.action',
					data:'json='+str+'&info='+action+'&opinion='+message,
					success:function(msg){
						if(msg=="success"){
							$('#reportinfodatagrid').datagrid('clearSelections');
							alert("成功！");
							$(window.top.document.body).unblock(); 
							projectcode = "";
							$("#reportinfodatagrid").datagrid('reload');
						}else{
							alert("失败！");
							$(window.top.document.body).unblock(); 
						}
					}
				})
				
//				$.post(
//					rootPath + "/testreports/testreports!operate.action",
//					{json:str,info:action,opinion:message},
//					function(msg){
//						if(msg=="success"){
//							$('#testreport').datagrid('clearSelections');
//							alert("成功！");
//							$(window.top.document.body).unblock(); 
//							projectcode = "";
//							$(window.parent.document).find("#reloaddata").click();
//							$("#testreport").datagrid('reload');
//						}else{
//							alert("失败！");
//							$(window.top.document.body).unblock(); 
//						}
//					}
//				);
		} else {
			alert('请至少选择一条记录！');
			return;
		}
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
		var idVal = $("#projectid").val();
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
		var url = rootPath + "/testreports/testreports!toSearchPage.action";
		var _dialog =  window.top.$('<div id ="wtmonitor-dlg" style="padding:0px;"><iframe id="searchFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
		_dialog.dialog({
		title:'委托监测任务查询',
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
			var wtentprise = $("#searchFrame",top.document.body).contents().find("#wtentprise").val();
			var registdateFirst = $("#searchFrame",top.document.body).contents().find("#registdateFirst").val();
			var registdateSecond = $("#searchFrame",top.document.body).contents().find("#registdateSecond").val();
			var contractno = $("#searchFrame",top.document.body).contents().find('#contractno').val();
			var reportnum = $("#searchFrame",top.document.body).contents().find('#reportnum').val();
			
			$('#taskgrid').datagrid( {
				queryParams : {
					projectcode : projectcode,
					registby : registby,
					monitortype : monitortype,
					wtentprise : wtentprise,
					registdate1 : registdateFirst,
					registdate2 : registdateSecond,
					contractno : contractno,
					reportnum :reportnum
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

	//加载监测类型
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

	//生成报表
	function createReportPdf(){
		var rows = $("#testreport").datagrid("getSelections");
		 
		if(rows==null || rows.length<1){
				alert('请至少选择一条记录！');
				return;
		}					

		if(window.confirm('是否生成选中行？')){
		
			var str = "";
			var reportid = "";
			var typename = "";
			var typeid = "";
			var entid = "";
			var filename = 'lims/pdfReportFiles/';
			for(var i=0; i < rows.length; i++){
					if(reportid!="")
					{
						reportid = reportid + ",";
						typename = typename + ",";
						typeid = typeid +",";
						entid = entid +",";
					}
					reportid = reportid + rows[i].reportid;	
					projectcode = rows[i].projectcode;
					typename = typename + rows[i].sampletype;
					typeid = typeid + rows[i].sampletypeid;
					entid = entid + rows[i].entid;
//					filename += rows[i].projectcode +'_' + rows[i].sampletype + '.pdf';
			}
			str = str + "{'reportid':'"+reportid+"','projectcode':'"+projectcode+"','typename':'"+typename+"','typeid':'"+typeid+"','entid':'"+entid+"'}";
			str = "{'data':["+str+"]}"; 
			 $(window.parent.document.body).block({
			    	message:"正在加载数据,请稍候....",
			    	css: { 
			            border: '2px solid #90dbfe', 
			            padding: '15px', 
			            backgroundColor: '#fafafa',  
			            opacity: .5, 
			            color: '#000' 
	        		} 
		    	 });
			/*jQuery.blockUI({ 
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
				});*/
			$.ajax({
				type:"post",
				url:rootPath + "/testreports/testreports!createReportPdfNew.action",
				data:{json:str},
//				async: false,
				success:function(msg){
					$(window.parent.document.body).unblock(); 
					//jQuery.unblockUI();
					if(msg.indexOf("success")>=0){
//						$('#testreport').datagrid('clearSelections');
						alert("成功！");
						$("#testreport").datagrid('reload');
						$("#reportinfodatagrid").datagrid('reload');
						$("#filename").val(filename);
//						$("#viewReport").click();
//						viewpdf(filename);
						toreportview(projectcode,typeid,msg.replace("success",""));
					}else{
						alert("失败！");
					}					
				}
			});
		}
	}
	
	//查看pdf文件
	function viewpdf(filename){
		if(filename==''||filename==null){
			filename = $("#filename").val();
		}
		
//		alert(filename);
		if(filename!=''&&filename!=null&&"null"!=filename){
			var url = rootPath + "/testreports/testreports!openPdf.action?filename="+encodeURI(encodeURI(filename.toString()));
			window.open(url,'newwindow','fullscreen=0,scrollbars=0');
		}else{
			alert('请先生成报告!');
		}
	}
		/**
	 * 下载的时候使用的方法
	 * @param name
	 * @return
	 */
	function loadFile(name){	
		if(name!=null && ""!=name&&"null"!=name){
			var encodeParm=encodeURI(encodeURI(name.toString()));
			var urlParm=rootPath +"/testreports/testreports!downLoad.action?path="+encodeParm+"&flg=0";
			$.ajax({
				type:"POST",
				url:urlParm,
				success:function(data){
					cache:false;
				if(data=="success"){
					var urlParmDown=rootPath +"/testreports/testreports!downLoad.action?path="+encodeParm+"&flg=1";
					$("#testreportform").attr("action",urlParmDown);
					$("#testreportform").submit();
				}else{			
					alert("当前文件不存在");
					}
				},
				error:function(data){
					alert("服务器正在维修，请稍后！");
				}
			}
			);	
		}else{
			alert('请生成报告!');
		}
	}
	
	
	//添加和修改
function editEntpriseinfo(){
	var url = rootPath + "/entpriseinfo/entpriseinfo!input.action";
	var rows = $('#taskgrid').datagrid('getSelected');
	if(rows==null){
		alert("请至少选择一条记录！");
		return;
	}
	var id = rows.entid;
	if(id!=""){
		url = url + "?id="+id;
	}
	var entname=$('#entname').val;
	
	var _dialog =  window.top.$('<div id ="entpriseinfo-dlg" style="padding:0px;"><iframe id="entpriseinfoFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
	_dialog.dialog({
	title:'企业信息编辑',
	autoOpen:false,
	modal:true,
	closed:true,
	width:'800',
	height:'500',
	buttons:[{
		text:'保存',
		iconCls:'icon-save',
		handler:function(){
		
			$("#entpriseinfoFrame",top.document.body).contents().find("#entpriseinfoForm").form('submit',
				{
					url:rootPath + '/entpriseinfo/entpriseinfo!save.action',
					onSubmit:function(){
						var objs = $("#entpriseinfoFrame",top.document.body).contents().find(".grkj-validate");
						
						if(!saveCheck(objs)){
							$("#entpriseinfoFrame",top.document.body).contents().find(":input").focus();
							$("#entpriseinfoFrame",top.document.body).contents().find("select").focus();
							alert("数据输入不符合格式，请查看红色边框的输入框的输入提示！");
							return false;
						}
						//加载行业类型，如果显示的文本框的为空，则隐藏的文本框也为空
						var tempVal = $("#entpriseinfoFrame",top.document.body).contents().find("#industrytypename").val();
						if(tempVal==''){
							$("#entpriseinfoFrame",top.document.body).contents().find("#industrytypecode").val('');
						}
					},
					success : function(data) {
						if (data == 'fail') {
							alert("添加失败！");
							return;
						}
						if (data == 'success') {
							_dialog.dialog('close');
							$("#taskgrid").datagrid('reload');
							alert('保存成功！');
						}
						if(data=='exist'){
							alert("该企业名字已经存在，请重新填写");
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


	//添加和修改备注、工况信息
	function editRemark(reportid){
		var url = rootPath + "/testreports/testreports!toRemark.action";
		
		if(reportid!=null && reportid !=''){
			url += "?reportid=" + reportid;
		}else{
			var rows = $('#testreport').datagrid('getSelected');
			if(rows==null){
				alert("请至少选择一条记录！");
				return;
			}
			url += "?reportid=" + rows.reportid;
		}
		var _dialog =  window.top.$('<div id ="remark-dlg" style="padding:0px;"><iframe id="remarkFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
		_dialog.dialog({
		title:'备注、工况信息',
		autoOpen:false,
		modal:true,
		closed:true,
		width:'500',
		height:'300',
		buttons:[{
			text:'保存',
			iconCls:'icon-save',
			handler:function(){			
				$("#remarkFrame",top.document.body).contents().find("#remarkForm").form('submit',
					{
						url:rootPath + '/testreports/testreports!saveRemark.action',
						onSubmit:function(){
							var objs = $("#remarkFrame",top.document.body).contents().find(".grkj-validate");
							
							if(!saveCheck(objs)){
								$("#remarkFrame",top.document.body).contents().find(":input").focus();
								$("#remarkFrame",top.document.body).contents().find("select").focus();
								alert("数据输入不符合格式，请查看红色边框的输入框的输入提示！");
								return false;
							}
						
						},
						success : function(data) {
							if (data == 'fail') {
								alert("添加失败！");
								return;
							}
							if (data == 'success') {
								_dialog.dialog('close');
								$("#testreport").datagrid('reload');
								alert('保存成功！');
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
	//更新报表是否超标
	function isOverproof(reportid,overtype){
		$.post(
			rootPath + "/testreports/testreports!updateOverproof.action",
			{reportid:reportid,overtype:overtype},
			function(msg){
				if(msg=="success"){					
					alert("更新成功！");
					$("#testreport").datagrid('reload');					
				}else{
					alert("更新失败！");
				}
			}
		);
	}

function initReportInfoData() {
	var flagUrl;
	flagUrl='testreports!reportinfoList.action?projectcode='+projectcode;
	$('#reportinfodatagrid').datagrid(
		{
			nowrap : false,
			striped : true,
			collapsible : true,
			url : flagUrl,
			sortName : 'reportcode',
			sortOrder : 'asc',
			remoteSort : false,						
			fit : true,
			fitColumns : true,
			scrollbarSize : 0,
//			singleSelect:false,
			singleSelect:true,
			idField:'reportid',	
			frozenColumns:[[
				 {field : 'reportid',
					title : '&nbsp;',
					width : 30,
					align : 'center',
					formatter : function(value){
						return "<input type='radio' name='radio'/>";}
			 	}
				]],
			columns : [ [
				    {field:'reportcode',title:'报告编号',width:100,align : 'center'},
					{field:'entname',title:'监测企业',width:250,align : 'center'},
			        {field:'bzr',title:'编制人',width:80,align : 'center'},
			        {field:'bztime',title:'编制时间',width:100,align : 'center'},
					{field:'shr',title:'审核人',width:80,align : 'center'},					
					{field:'shtime',title:'审核时间',width:100,align : 'center'},
					{field:'qfr',title:'签发人',width:80,align : 'center'},
					{field:'qftime',title:'签发时间',width:100,align : 'center'},
					{field:'statusname',title:'状态',width:80,align : 'center'},
				{field:'operate',title:'操作',width:80,align : 'center',
				formatter:function(value,rowData,rowIndex){
					var links = '<img src="'
									+ rootPath
									+ '/themes/default/images/reportimage.png" onclick="toreportview(\''+rowData.projectcode+'\',\''+rowData.monitortypeid+'\',\''+rowData.reportcode+'\');" alt="报表"/>&nbsp;&nbsp;';
					if(rowData.status=='TestReportDrawUp'&&info=='TestReportDrawUp')
					{
						links +='<img src="'+rootPath+'/themes/default/images/deleteimage.png"   alt="删除"  onclick="deleteReport(\''+rowData.reportcode+'\')"/>';
					}
				   return links;
				}}
			] ],
			onSelect:function(rowIndex,rowData){
				checkRadio3();
			},
			onLoadSuccess:function(){
				$("#reportinfodatagrid").datagrid("clearSelections");
				//默认加载第一行的基本信息
				$('#reportinfodatagrid').datagrid('selectRow',0);
				var rowData = $('#reportinfodatagrid').datagrid('getSelected');
				if(rowData!=null){
					seldatagrid(rowData.projectcode,rowData.reportcode,'');
				}else{
					seldatagrid('','','flag');
				}
			},onClickRow:function(rowIndex, rowData){
				$("#reportinfodatagrid").datagrid("clearSelections");
				$('#reportinfodatagrid').datagrid('selectRow',parseInt(rowIndex));
				var rowData = $('#reportinfodatagrid').datagrid('getSelected');
				if(rowData!=null){
					seldatagrid(rowData.projectcode,rowData.reportcode,'');
				}
			},
			onRowContextMenu:function(e,row,rowData){
				$("#reportinfodatagrid").datagrid("clearSelections");
				$('#reportinfodatagrid').datagrid('selectRow',parseInt(row));
				$("#reportinfoMenu").menu("show", {left: e.pageX,top: e.pageY});
				e.preventDefault();
			}			
		});
		$(window).resize(function() {
			$("#reportinfodatagrid").datagrid('resize');
		});
		$("#jiance").resize(function(){
			$("#reportinfodatagrid").datagrid('resize');
		});
}
//删除批信息
function deleteReport(reportcode){
	//单个删除
 	if(window.confirm('是否删除？'))
 	{ 
		$.post(
			rootPath + "/testreports/testreports!deleteReport.action?reportcode="+reportcode, 
			function(data) {
			if (data == 'success')
			{
				alert("删除成功！");
				$("#reportinfodatagrid").datagrid('reload');
				$("#testreport").datagrid('reload');
				return;
			}else{
				alert("删除失败！");
				return;
			}
		});
	}
}

function seldatagrid(projectcode,reportcode,flag) {
	var flagUrl;
	if(flag=='flag'){ //此处是加载的时候不查询后台，但是要把头儿展示出来。2012-04-11
		flagUrl="";
	}else{
		flagUrl=rootPath+'/testreports/testreports!getreports.action?projectcode='+projectcode+"&reportcode="+reportcode;
	}
		$('#seldatagrid').datagrid(
		{
			nowrap : false,
			striped : true,
			collapsible : true,
			url : flagUrl, 
			remoteSort : false,						
			fit : true,
//			fitColumns : false,
			scrollbarSize : 0,
			border:true,
			singleSelect:false,
			//idField:'sampleitemtestid',	
			columns : [ [
					{field:'entname',title:'监测企业',width:250,align : 'center'},
			        {field:'sampletype',title:'监测类型',width:250,align : 'center'},
					{field:'isoverproof',title:'是否超标',width:60,align : 'center',
						formatter : function(value,rowData, rec) {
							var str = "";
							if(value=="Y"){
								str = "<input type=\"checkbox\" checked=\"true\" onclick=\"isOverproof('"+rowData.reportid+"','N');\"/>";
							}else{
								str = "<input type=\"checkbox\" onclick=\"isOverproof('"+rowData.reportid+"','Y');\"/>";
							}
							return str;						
						}
					},
					{field:'option',title:'操作',width:80,align : 'center',
						formatter : function(value,rowData, rec) {
						var links = '';		
						if(rowData.status=='TestReportDrawUp'){
										links += '<img src="'
										+ rootPath
										+ '/themes/default/images/bianjiimage.png" onclick="editRemark(\''+rowData.reportid+'\');" alt="修改备注"/>';
									}
							return links;
						}
					}
			] ],
			pagination:true,
			rownumbers:false,
			pageSize:20,
			pageList:[20,30,40,50]
		});
		$(window).resize(function() {
			$("#seldatagrid").datagrid('resize');
		});
}

//报告流转记录
function baogaojilu(){	
	var batchrows = $("#reportinfodatagrid").datagrid("getSelections");
	var reportcode=batchrows[0].reportcode;
	
	if(reportcode!=""){
		var url = rootPath + "/projects/opinion/opinion!list.action?id="+reportcode+"&workFlowName=JC_PROJECT&steptype=report";		
		var _dialog =  window.top.$('<div id ="dlg" style="padding:0px;"><iframe id="frame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
		_dialog.dialog({
			title:'报告流转记录',
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
	}else{
		alert("无报告流转记录！");
	}
}

function toreportview(projectcode,typeid,reportcode){
		var url = rootPath + "/common/report!toReportPage.action?raq=MonitorReport/"+encodeURI(encodeURI("ST-委托.raq"))+"&projectcode="+projectcode+"&monitortypeid="+typeid+"&reportcode="+reportcode;
		var _dialog =  window.top.$('	<div id ="dlg" style="padding:0px;"><iframe id="dlgFrame" width="100%" height="100%" frameborder="0" scrolling="yes" src='+url+'></iframe></div>').appendTo(window.top.document.body);
			_dialog.dialog({
			title:'测试报告',
			resizable:true,
			autoOpen:false,
			modal:true,
			closed:true,
			width:'820',
			height:'480',
			buttons:[{
				text:'确定',
				iconCls:'icon-ok',
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