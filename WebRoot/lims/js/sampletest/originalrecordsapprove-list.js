function initProjectDatagrid(){
		$('#projectDatagrid').datagrid({
//			singleSelect:true,
			width:'400',
			height:'400',
			nowrap: false,
			striped: true,
			collapsible:true,
			url:'originalrecordsapprove!sampleAuditList.action',
			sortName: 'projectcode',
			sortOrder: 'desc',
			fit:true,
			border:true,
			fitColumns:false,
			scrollbarSize:0,
			idField:'projectid',
			frozenColumns:[[
				{field:'projectid',checkbox:true,align : 'center'},
		      	{field:'projectcode',title:'流水号',width:60,align : 'center'},
	       	  	{field:'projectrealcode',title:'项目编号',width:70,align : 'center'}
			]],
			columns:[[
		        {field:'status',title:'项目状态',width:80,align : 'center'},
//		        {field:'projectname',title:'项目名称',width:280,align : 'center'},
//				{field:'jcentprise',title:'被测单位',width:280,align : 'center'},					
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
//			onRowContextMenu:function(e,row,rowData){
//				$("#batchdatagrid").datagrid("clearSelections");
//				$('#batchdatagrid').datagrid('selectRow',parseInt(row));
//				$("#zhuiSuMenu").menu("show", {left: e.pageX,top: e.pageY});
//				e.preventDefault();
//			},
			onLoadSuccess:function(){
				/*$("#projectDatagrid").datagrid("clearSelections");
				$('#projectDatagrid').datagrid('selectRow',0);
				var rowData = $('#projectDatagrid').datagrid('getSelected');
				if(rowData!=null&&rowData!=""){
					$('#taskSchemeFrame').attr("src",rootPath+"/sampletest/originalrecordsapprove/originalrecordsapprove!toMonitorPointAudit.action?projectid="+rowData.projectid+"&entid="+rowData.entid);
				}else{
					$('#taskSchemeFrame').attr("src",rootPath+"/sampletest/originalrecordsapprove/originalrecordsapprove!toMonitorPointAudit.action?projectid=''&entid=''");
				}*/
				$('#taskSchemeFrame').attr("src",rootPath+"/sampletest/originalrecordsapprove/originalrecordsapprove!toMonitorPointAudit.action?flag=flag&projectid=''&entid=''");
			},
			onClickRow:function(rowIndex, rowData){	
				$("#projectDatagrid").datagrid('clearSelections');
				$("#projectDatagrid").datagrid('selectRow',rowIndex);
				$('#taskSchemeFrame').attr("src","");
				$('#originalRecordFrame').attr("src","");
				
				$('#taskSchemeFrame').attr("src",rootPath+"/sampletest/originalrecordsapprove/originalrecordsapprove!toMonitorPointAudit.action?flag=noflag&projectid="+rowData.projectid+"&entid="+rowData.entid);
				$('#originalRecordFrame').attr("src",rootPath + "/testreports/testreports!toOriginalReports.action?projectcode="+rowData.projectcode+"&info=DataAudit");
			},
			rowStyler:function(rowIndex,rowData){
				var flag = rowData.flag;
				if (flag=='过期'){
					return 'color:red;';
				}else if(flag=='即将到期'){
					return 'color:#FF9900';
				}
			}
//			,
//			onSelect:function(){
//				checkRadio();
//			}
		});
		$(window).resize(function(){
			$("#projectDatagrid").datagrid('resize');
		});
}

//进入查询页面
function toSearchObj(){
	var url = rootPath + "/sampletest/originalrecordsapprove/originalrecordsapprove!toSearchPage.action";
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
				var projectcode = $("#searchFrame",top.document.body).contents().find("#projectcode").val();
				var registby = $("#searchFrame",top.document.body).contents().find("#registby").val();
				var monitortype = $("#searchFrame",top.document.body).contents().find("#monitortype").val();
				var wtentprise = $("#searchFrame",top.document.body).contents().find("#wtentprise").val();
				var registdateFirst = $("#searchFrame",top.document.body).contents().find("#registdateFirst").val();
				var registdateSecond = $("#searchFrame",top.document.body).contents().find("#registdateSecond").val();
				var contractno = $("#searchFrame",top.document.body).contents().find('#contractno').val();
				var samplecode = $("#searchFrame",top.document.body).contents().find('#samplecode').val();
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


function checkRadio(){
	var row = $('#projectDatagrid').datagrid('getSelected');
	var rowNum = 0;
	var rows = $('#projectDatagrid').datagrid('getRows');
	for ( var i = 0; i < rows.length; i++) {
		if (row == rows[i]) {
			rowNum = i;
			break;
		}
	}
	var radios = $("input[type=radio]");
	$(radios[rowNum]).attr("checked", true);
}
//提交
function openDialog(){
	var rows = $("#projectDatagrid").datagrid("getSelections");
	var str="";
	if (rows!=null && rows!=""){	
		if(window.confirm('是否提交？'))
 		{
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
			for(var i=0;i<rows.length;i++){
				str = str+rows[i].projectcode+",";
			}
			str=str.substring(0,str.length-1);
			 $.ajax( {
				type : 'POST',
				url :rootPath + "/sampletest/originalrecordsapprove/originalrecordsapprove!setAllStatusByAudit.action",
				data : {'projectids' : str},
				success : function(data) {
					if (data == 'success') {
						alert("提交成功！");
						$(window.top.document.body).unblock(); 
						$("#projectDatagrid").datagrid('reload');
					}
					if (data == 'fail') {
						alert('提交失败！');
						$(window.top.document.body).unblock(); 
					}
					
				}
			});
	   }
	}else{
		alert('请至少选择一条记录！');
	}
}