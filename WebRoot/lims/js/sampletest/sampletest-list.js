$(document).ready(function(){
	initProjectDatagrid();
});

function initProjectDatagrid(){
		$('#projectDatagrid').datagrid({
			singleSelect:true,
			width:'400',
			height:'400',
			nowrap: false,
			striped: true,
			collapsible:true,
			url:'sampletestbysample!sampleTestList.action',
			sortName: 'projectcode',
			sortOrder: 'desc',
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
				$("#batchdatagrid").datagrid("clearSelections");
				$('#batchdatagrid').datagrid('selectRow',parseInt(row));
				$("#zhuiSuMenu").menu("show", {left: e.pageX,top: e.pageY});
				e.preventDefault();
			},
			onLoadSuccess:function(){
				$('#projectDatagrid').datagrid('selectRow',0);
				var rowData = $('#projectDatagrid').datagrid('getSelected');
				if(rowData!=null&&rowData!=""){
					projectid = rowData.projectcode;
					flag='noflag';
					initMonitorinfoTree(flag);
//					$('#taskSchemeFrame').attr("src",rootPath+"/sampletest/sample/sampletestbysample!toMonitorPointTest.action?flag=flag&projectid="+rowData.projectcode);
				}/*else{
					$('#taskSchemeFrame').attr("src",rootPath+"/sampletest/sample/sampletestbysample!toMonitorPointTest.action?flag='noflag'&projectid=''&entid=''");
				}*/
			},
			onClickRow:function(rowIndex, rowData){	
				selectTab("待检信息");
				projectid = rowData.projectcode;
				flag='noflag';
//				$('#taskSchemeFrame').attr("src",rootPath+"/sampletest/sample/sampletestbysample!toMonitorPointTest.action?flag=noflag&projectid="+rowData.projectcode);
				initMonitorinfoTree(flag);
			},
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
			$("#projectDatagrid").datagrid('resize');
		});
}
function selectTab(title){
	$('#tt').tabs({
		onSelect: function(title){
			if(title == '数据录入'){
				var deviceid = $("#deviceid").val();
					if(samplecodeVal!=""){
						var rows = $('#itemlist').datagrid('getSelections');
						var itemids = "";
						var sampleitemtestids = "";
						if(rows.length<=0){
							alert('请至少选择一个项目！');
							return;
						}else{
							for(var i=0;i<rows.length;i++){
								if(itemids!=null&&""!=itemids){	
									itemids+=",";				
								}
								if(sampleitemtestids!=null&&""!=sampleitemtestids){
									sampleitemtestids +=",";
								}
								sampleitemtestids +=rows[i].sampleitemtestid;
								itemids += rows[i].itemid;
							}
						}
						$.post(rootPath + '/sampletest/sample/sampletestbysample!getDevicecalibratecurve.action?samplecode='+samplecodeVal+'&projectcode='+projectcodeVal+'&monitorpointid='+monitorpointidVal+'&deviceid='+deviceid+"&itemids="+itemids,
						function(data){
						if (data == 'yes'){
								$.post(rootPath + '/sampletest/sample/sampletestbysample!getHasPreitemParamVal.action?samplecode='+samplecodeVal+'&projectcode='+projectcodeVal+'&monitorpointid='+monitorpointidVal+'&deviceid='+deviceid+"&itemids="+itemids,
									function(msg){
									if(msg=='nodata'){//有前置项目，但无数据
										alert("当前项目的前置项目未录入数据，\n请先录入前置项目的数据后，\n再录入该项目的数据！");
										return;
									}else if(msg=='data'||msg=='nopreitem'){//有前置项目有数据或无前置项目
										
										var url = rootPath + '/sampletest/sample/sampletestbysample!toDataEntry.action?sampleid='+sampleid+'&samplecode='+samplecodeVal+'&projectcode='+projectcodeVal+'&monitorpointid='+monitorpointidVal+"&deviceid="+deviceid+"&sampleitemtestids="+sampleitemtestids+"&itemids="+itemids+"&timeStamp="+new Date().getTime();
									$("#batchdataenterFrame").attr("src",url);
									}
							});
						}else{
								alert("请给项目("+data+")添加校准曲线！");
								return;
							}
							});
						}else{
							alert("请选择一个样品！");
						}
				}
			}
	});
}
//进入查询页面
function toSearchObj(){
	var url = rootPath + "/sampletest/sample/sampletestbysample!toSearchPage.action";
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
				var registby = $("#searchFrame",window.parent.document).contents().find("#registby").val();
				var monitortype = $("#searchFrame",window.parent.document).contents().find("#monitortype").val();
				var wtentprise = $("#searchFrame",window.parent.document).contents().find("#wtentprise").val();
				var registdateFirst = $("#searchFrame",window.parent.document).contents().find("#registdateFirst").val();
				var registdateSecond = $("#searchFrame",window.parent.document).contents().find("#registdateSecond").val();
				var contractno = $("#searchFrame",window.parent.document).contents().find('#contractno').val();
				var samplecode = $("#searchFrame",window.parent.document).contents().find('#samplecode').val();
				$('#projectDatagrid').datagrid( {
					queryParams : {
						projectcode : projectcode,//监测项目编码
						registby : registby,//登记人
						monitortype : monitortype,//任务类型
						jcentprise : wtentprise,//委托单位
						registdate1 : registdateFirst,//登记日期1
						registdate2 : registdateSecond,//登记日期2
						contractno : contractno,//合同编号
						samplecode :samplecode//报告编号
					},
					pageNumber:1		
				});
				_dialog.dialog('close');
			}
		},
		{
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

//刷新列表
function reloadProjectDatagrid(){
	$("#projectDatagrid").datagrid('reload');
}