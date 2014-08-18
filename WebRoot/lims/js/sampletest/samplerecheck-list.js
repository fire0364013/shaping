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
			url:'sampletestbysample!sampleRecheckList.action',
			sortName: 'projectcode',
			sortOrder: 'desc',
			fit:true,
			border:true,
			fitColumns:false,
			scrollbarSize:0,
			idField:'projectid',
			frozenColumns:[[
		      {field:'projectcode',title:'流水号',width:60,align : 'center'},
	       	  {field:'projectrealcode',title:'项目编号',width:70,align : 'center'}
			]],
			columns:[[
		        {field:'status',title:'项目状态',width:80,align : 'center'},
		        //{field:'projectname',title:'项目名称',width:280,align : 'center'},
				//{field:'jcentprise',title:'被测单位',width:280,align : 'center'},					
				{field:'monitortype',title:'业务类型',width:130,align : 'center'},
				{field:'registdate',title:'登记日期',width:80,align : 'center'},
				{field:'registby',title:'登记人',width:80,align : 'center'},
//				{field:'completedate',title:'要求完成日期',width:80,align : 'center'},
				{field:'contractno',title:'合同编号',width:120,align : 'center'},
				{field:'reportnum',title:'报告编号',width:120,align : 'center'}
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
//					$('#taskSchemeFrame').attr("src",rootPath+"/sampletest/sample/sampletestbysample!toMonitorPointRecheck.action?flag=flag&projectid="+rowData.projectid+"&entid="+rowData.entid);
					projectid = rowData.projectid;
					flag='noflag';
					entid=rowData.entid;
					initMonitorinfoTree(flag);
				}/*else{
					$('#taskSchemeFrame').attr("src",rootPath+"/sampletest/sample/sampletestbysample!toMonitorPointRecheck.action?flag=noflag&projectid=''&entid=''");
				}*/
			},
			onClickRow:function(rowIndex, rowData){		
				selectTab("待复核信息");
				projectid = rowData.projectid;
				flag='noflag';
				entid=rowData.entid;
				initMonitorinfoTree(flag);
//				$('#taskSchemeFrame').attr("src",rootPath+"/sampletest/sample/sampletestbysample!toMonitorPointRecheck.action?flag=noflag&projectid="+rowData.projectid+"&entid="+rowData.entid);
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
			if(title == '复核'){
				var rows = $('#itemlist').datagrid('getSelections');
				var itemids = "";
				var sampleitemtestids = "";
				var deviceid = "";
				var samplecodeVal2 = "";
				if(rows.length<=0){
					alert('请选择一个项目！');
					return;
				}else{
					for(var i=0;i<rows.length;i++){
						if(itemids!=null&&""!=itemids){	
							itemids+=",";				
						}
						if(deviceid==''){
							deviceid = rows[i].deviceid;
						}
						if(samplecodeVal2==''){
							samplecodeVal2 = rows[i].samplecode;
						}
						if(sampleitemtestids!=null&&""!=sampleitemtestids){
							sampleitemtestids +=",";
						}
						sampleitemtestids +=rows[i].sampleitemtestid;
					}
				}
				var url = rootPath + '/sampletest/sample/sampletestbysample!toDataEntry2.action?samplecode='+samplecodeVal2+'&deviceid='+deviceid+'&sampleitemtestids='+sampleitemtestids+'&timeStamp='+new Date().getTime();
				$("#batchdataenterFrame").attr("src",url);
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