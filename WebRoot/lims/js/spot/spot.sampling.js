//初始化采样任务列表
function initTaskDataGrid(){
	$('#taskdatagrid').datagrid({
		singleSelect:true,
		width:'370',
		height:'400',
		nowrap: false,
		striped: true,
		collapsible:true,
		url:rootPath + '/spot/sampling/sampling!samplingTaskList.action',
		sortName: 'projectcode',
		sortOrder: 'desc',
		fit:true,
		border:true,
		fitColumns:false,
		scrollbarSize:0,
		idField:'projectcode',	
		frozenColumns : [[
			{field : ' ',
				title : '&nbsp;',
				width : 30,
				align : 'center',
				formatter : function(value){
					return "<input type='radio' name='radio'/>";}
		 	},
	 		{field:'projectcode',title:'流水号',width:40,align : 'center'},
   	    	{field:'projectrealcode',title:'项目编号',width:80,align : 'center'}							      
		]],
		columns:[[
	         {field:'status',title:'项目状态',width:60,align : 'center'},
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
			$('#samplingapFrame').attr("src","");
			$('#samplingFrame').attr("src","");
			$('#TaskListFrame').attr("src","");
			
			selectView('采样');
		},
//		onRowContextMenu:function(e,row,rowData){
//			$("#taskdatagrid").datagrid("clearSelections");
//			$('#taskdatagrid').datagrid('selectRow',parseInt(row));
//			$("#taskContextMenu").menu("show", {left: e.pageX,top: e.pageY});
//			e.preventDefault();
//		},
		onSelect:function(rowIndex,rowData){
			$($("input[type=radio]")[rowIndex]).attr("checked", true);
			$("#projectcode").val(rowData.projectcode);
			$("#monitortype").val(rowData.monitortypecode);
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
						$("#MonitorEntFrame").attr("src",rootPath +"/projects/taskregister/projectdetail!list.action?id="+$('#projectcode').val());
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
					if($('#samplingapFrame').attr('src')==undefined||$('#samplingapFrame').attr('src')==""){
						$("#samplingapFrame").attr("src",rootPath +"/spot/spotarrange/spotarrange!view.action?projectcode="+$('#projectcode').val());
					}
				}
			}else if(title == '采样'){
				if($('#projectcode').val()!=''){
					if($('#samplingFrame').attr('src')==undefined||$('#samplingFrame').attr('src')==""){
						$("#samplingFrame").attr("src",rootPath +"/spot/sampling/sampling!toRightPage.action?projectcode="+$('#projectcode').val());
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
						if($('#projectid').val()!=''){
							if($('#lctFrame').attr('src')==undefined||$('#lctFrame').attr('src')==""){
								$("#lctFrame").attr("src",rootPath+"/projects/flowchart/flowchart!toFlowChartPage.action?entityid="+$('#projectcode').val());
							}
						}
			}else if(title == '附件'){
				if($('#projectid').val()!=''){
					if($('#fjFrame').attr('src')==undefined||$('#fjFrame').attr('src')==""){
						$("#fjFrame").attr("src",rootPath+"/projects/attachment/projectattachment!noadd.action?projectid="+$('#projectcode').val());	
					}
				}
			}
		}			
	});
}
	
	
//进入查询页面
function toSearchObj(){
	var url = rootPath + "/spot/samplingdata/samplingdata!toSearchPage.action";
//	var url = rootPath + "/spot/sampling/sampling!toSearchPage.action";
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
//项目监测企业
function initDataGridByHuangj(){
	$('#entiprisedatagrid').datagrid({
		nowrap: false,
		striped: true,
		collapsible:true,
		url: rootPath + "/spot/sampling/sampling!detailList.action?projectcode="+projectcode,
		fit:true,
		fitColumns:true,
		scrollbarSize:0,
		singleSelect:true,
		idField:'monitorpointid',	
		columns:[[
			{field:'projectdetail',checkbox:true,align : 'center'} ,	
	       // {field:'entname',title:'企业名称',width:300,align : 'center'} ,					
			{field:'monitortypename',title:'监测点类型',width:150,align : 'center'},
			{field:'monitorname',title:'监测点',width:150,align : 'center'},
			{field:'itemname',title:'检测项目',width:200,align : 'center'},
			{field:'ismonitor',title:'是否监控 ', width:80,align:"center"},
			{field:'operate',title:'操作',width:100,align : 'center',
				formatter:function(value,rowData,rowIndex){
					return '<img src="'+rootPath+'/themes/icons/redo.png" alt="监测点" onclick="operateProjectMonitor('+rowData.projectdetail+')"/> '
					+'<img src="'+rootPath+'/themes/icons/pencil.png" alt="监测点" onclick="isRight('+rowData.projectpointid+')"/> ';
				}
			}
		]],onLoadSuccess:function(data){
			if(data.rows.length>0){
				setTimeout("mergeCellsByField(\"entiprisedatagrid\",\"monitortypename\")",10)
			}
			var header = $("#entiprisedatagrid").parent(".datagrid-view").find("div.datagrid-header");
		},
		onClickRow:function(rowIndex, rowData){		
//			alert("jj");
			$("#entiprisedatagrid").datagrid("clearSelections");
			$('#entiprisedatagrid').datagrid('selectRow',parseInt(rowIndex));
			
//			alert(rowData.projectcode+","+rowData.monitorpointid+","+rowData.entid+","+rowData.monitortypeid);
			initSamplsData(rowData.projectcode,rowData.monitorpointid,rowData.entid,rowData.monitortypeid);
		}
		
	});
	$(window).resize(function(){
		$("#entiprisedatagrid").datagrid('resize');
	});
	$("#renwu").resize(function(){
		$("#entiprisedatagrid").datagrid('resize');
	});
}
//项目监测企业
function initDataGrid(){
	$('#entiprisedatagrid').datagrid({
		nowrap: false,
		striped: true,
		collapsible:true,
		url: rootPath + "/spot/sampling/sampling!detailList.action?projectcode="+projectcode,
		fit:true,
		fitColumns:true,
		scrollbarSize:0,
		singleSelect:true,
		idField:'monitorpointid',	
		columns:[[
			{field:'projectdetail',checkbox:true,align : 'center'} ,	
	        {field:'entname',title:'企业名称',width:300,align : 'center'} ,					
			{field:'monitortypename',title:'监测点类型',width:150,align : 'center'},
			{field:'monitorname',title:'监测点',width:150,align : 'center'},
			{field:'itemname',title:'检测项目',width:200,align : 'center'},
			{field:'ismonitor',title:'是否监控 ', width:80,align:"center"},
			{field:'operate',title:'操作',width:100,align : 'center',
				formatter:function(value,rowData,rowIndex){
					return '<img src="'+rootPath+'/themes/icons/redo.png" alt="监测点" onclick="operateProjectMonitor('+rowData.projectdetail+')"/> '
					+'<img src="'+rootPath+'/themes/icons/pencil.png" alt="监测点" onclick="isRight('+rowData.projectpointid+')"/> ';
				}
			}
		]],onLoadSuccess:function(data){
			if(data.rows.length>0){
				setTimeout("mergeCellsByField(\"entiprisedatagrid\",\"entname\")",10)
			}
			var header = $("#entiprisedatagrid").parent(".datagrid-view").find("div.datagrid-header");
		},
		onClickRow:function(rowIndex, rowData){		
//			alert("jj");
			$("#entiprisedatagrid").datagrid("clearSelections");
			$('#entiprisedatagrid').datagrid('selectRow',parseInt(rowIndex));
			
//			alert(rowData.projectcode+","+rowData.monitorpointid+","+rowData.entid+","+rowData.monitortypeid);
			initSamplsData(rowData.projectcode,rowData.monitorpointid,rowData.entid,rowData.monitortypeid);
		}
		
	});
	$(window).resize(function(){
		$("#entiprisedatagrid").datagrid('resize');
	});
	$("#renwu").resize(function(){
		$("#entiprisedatagrid").datagrid('resize');
	});
}
//是否可监测
function isRight(pmonitorid){
	var url = rootPath + "/spot/sampling/sampling!toismonitor.action?pmonitorid="+pmonitorid;
	var _dialog =  window.top.$('<div onkeydown="PreventBSK()" id ="dlg-dlg" style="padding:0px;"><iframe id="monitorinfoFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
	_dialog.dialog({
		title:'是否可监测',
		autoOpen:false,
		modal:true,
		closed:true,
		width:'330',
		height:'180',
		buttons:[{
			text:'确定',
			iconCls:'icon-save',
			handler:function(){
				var isRight=$("#monitorinfoFrame",top.document.body).contents().find("input[name=ismonitor]:checked").val();
				var remark=$("#monitorinfoFrame",top.document.body).contents().find("#remark").val();
				var json = "{'ismonitor':'"+isRight+"','data':[";
					json = json + "{'projectpointid':'"+pmonitorid+"'},";
				json =json.substring(0,json.length-1);
				json = json +"]}";

				$.ajax({
					type:'POST',
					url:rootPath + '/spot/sampling/sampling!updatePMP.action',
					data:{json:json,remark:remark},
					success:function(data){
						if(data=='success'){
							alert('修改成功！');
							$('#entiprisedatagrid').datagrid('reload');
						}else{
							alert('修改失败！');
						}
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
function operateProjectMonitor(projectdetail){
	var url = rootPath + "/spot/sampling/sampling!toPoint.action?ids="+projectdetail+"&projectcode="+projectcode;
	var _dialog =  window.top.$('<div id ="monitorplans-dlg" style="padding:0px;"><iframe id="monitorinfoFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
	_dialog.dialog({
	title:'监测方案',
	autoOpen:false,
	modal:true,
	closed:true,
	maximizable:true,
	resizable:true,
	width:'900',
	height:'550',
	buttons:[{
		text:'确定',
		iconCls:'icon-save',
		handler:function(){
			_dialog.dialog("close");
			$('#entiprisedatagrid').datagrid("reload");
		}
	}],
	onClose:function(){
			_dialog.dialog("destroy");					
		}
	});
	_dialog.dialog('open');

}

function mergeCellsByField(tableID,colList){
    var ColArray = colList.split(",");
    var tTable = $('#'+tableID);
    var TableRowCnts=tTable.datagrid("getRows").length;
    var tmpA;
    var tmpB;
    var PerTxt = "";
    var CurTxt = "";
    var alertStr = "";
    //for (j=0;j<=ColArray.length-1 ;j++ )
    for (j=ColArray.length-1;j>=0 ;j-- )
    {
        //当循环至某新的列时，变量复位。
        PerTxt="";
        tmpA=1;
        tmpB=0;
        
        //从第一行（表头为第0行）开始循环，循环至行尾(溢出一位)
        for (i=0;i<=TableRowCnts ;i++ )
        {
            if (i==TableRowCnts)
            {
                CurTxt="";
            }
            else
            {
                CurTxt=tTable.datagrid("getRows")[i][ColArray[j]];
            }
            if (PerTxt==CurTxt)
            {
                tmpA+=1;
            }
            else
            {
                tmpB+=tmpA;
                tTable.datagrid('mergeCells',{
                    index:i-tmpA,
                    field:ColArray[j],
                    rowspan:tmpA,
                    colspan:null
                });
                tmpA=1;
            }
            PerTxt=CurTxt;
        }
    }
}

//加载样品信息
function initSamplsData(projectcode,pmonitorid,entid,monitortype){
	$('#sampleslist').datagrid({
		tableName:'sampleslist',
		singleSelect:false,
		nowrap: false,
		striped: true,
		collapsible:true,
		url:rootPath + "/spot/sampling/sampling!initSamplesList.action?projectcode="+projectcode+"&entid="+entid+"&monitortype="+monitortype+"&pmonitorid="+pmonitorid+"&timeStamp="+new Date().getTime(),
		fit:true,
		border:true,
		fitColumns:false,
		idField:'sampleid',
		checkOnSelect:true,
		selectOnCheck:true,
		scrollbarSize:0,
		frozenColumns:[[
			{field:'sampleid',checkbox:true,align:"center"},
			{field:'samplecode',title:'样品编号<img src="'+rootPath+'/themes/icons/mini_edit.png"/>', width:70,align:"center"},
			{field:'samplename',title:'样品名称<img src="'+rootPath+'/themes/icons/mini_edit.png"/>', width:70,align:"center"},
			{field:'qctypename',title:'质控类型', width:70,align:"center"}
			]],
		columns:[[
			
			{field:'startdate',title:'开始日期 <img src="'+rootPath+'/themes/icons/mini_edit.png"/>', width:80,align:"center"},
			{field:'starttime',title:'开始时间 <img src="'+rootPath+'/themes/icons/mini_edit.png"/>', width:70,align:"center"},
			{field:'cyperson',title:'采样人<img src="'+rootPath+'/themes/icons/mini_edit.png"/>', width:180,align:"center"},
			{field:'container',title:'采样容器 <img src="'+rootPath+'/themes/icons/mini_edit.png"/>', width:80,align:"center"},
			{field:'volume',title:'采样体积 <img src="'+rootPath+'/themes/icons/mini_edit.png"/>', width:70,align:"center"},
			{field:'savedose',title:'样品保存剂 <img src="'+rootPath+'/themes/icons/mini_edit.png"/>', width:80,align:"center"},
			{field:'jcitem',title:'监测项目', width:280,align:"center"},
			{field:'enddate',title:'结束日期 <img src="'+rootPath+'/themes/icons/mini_edit.png"/> ', width:80,align:"center"},
			{field:'endtime',title:'结束时间 <img src="'+rootPath+'/themes/icons/mini_edit.png"/>', width:70,align:"center"},
			{field:'ismonitor',title:'是否可监测 <img src="'+rootPath+'/themes/icons/mini_edit.png"/>', width:70,align:"center"}
			]],
		pagination:true,
		rownumbers:false,
		pageSize:15,
		pageList:[15,25,35,50],
		onLoadSuccess:function(data){
			var header = $("#sampleslist").parent(".datagrid-view").find("div.datagrid-header");
			var fields = header.find("td:has(div.datagrid-cell)");
			$(fields).unbind('click');//先取消绑定
			
			for(var i=0;i<fields.length;i++){
				if($(fields[i]).attr('field') =='samplename'){
					$(fields[i]).bind('click',function(e){
						ajaxSamplenInfo($(this).attr('field'));
					});
				}else if($(fields[i]).attr('field') =='samplecode'){
					$(fields[i]).bind('click',function(e){
						ajaxSamplenInfo($(this).attr('field'));
					});
				}else if($(fields[i]).attr('field') =='cyperson'){
					$(fields[i]).bind('click',function(e){
						ajaxSamplpingperson(projectcode,$(this).attr('field'));
					});
				}else if($(fields[i]).attr('field') =='startdate'){
					$(fields[i]).bind('click',function(e){
						ajaxSamplesDate($(this).attr('field'));
					});
				}else if($(fields[i]).attr('field') =='starttime'){
					$(fields[i]).bind('click',function(e){
						ajaxSamplesTime($(this).attr('field'));
					});
				}else if($(fields[i]).attr('field') =='enddate'){
					$(fields[i]).bind('click',function(e){
						ajaxSamplesDate($(this).attr('field'));
					});
				}else if($(fields[i]).attr('field') =='endtime'){
					$(fields[i]).bind('click',function(e){
						ajaxSamplesTime($(this).attr('field'));
					});
				}else if($(fields[i]).attr('field') =='container'){
					$(fields[i]).bind('click',function(e){
						ajaxSampleinfoBySelect($(this).attr('field'));
					});
				}else if($(fields[i]).attr('field') =='volume'){
					$(fields[i]).bind('click',function(e){
						ajaxSamplenInfo($(this).attr('field'));
					});
				}else if($(fields[i]).attr('field') =='savedose'){
					$(fields[i]).bind('click',function(e){
						ajaxSamplenInfo($(this).attr('field'));
					});
				}
			}
		},onRowContextMenu:function(e,rowIndex,rowData){
			$("#sampleslist").datagrid("clearSelections");
			$('#sampleslist').datagrid("selectRow",rowIndex);
			if(rowData.ishaveqcsample=='Y'){
				if(rowData.qctype==""){
					$("#kongbai-menu").menu('show',{left:e.pageX,top:e.pageY});
				}else{
					$("#zhikong-menu").menu('show',{left:e.pageX,top:e.pageY});
				}
			}
			e.preventDefault();
		},onClickRow:function(rowIndex, rowData){
			
		}
	});
	$("#sampleslist").datagrid('clearSelections');
	$(window).resize(function(){
		$("#sampleslist").datagrid('resize');
	});
}

/**
 * 生成样品
 */
function createSamples(){
	var rows = $("#entiprisedatagrid").datagrid("getSelections");
	if(rows.length>0){
		var id = "";
		var monitorpointid = "";
		for(var i=0;i<rows.length;i++){
			if(id!=""){
			 id = id + ",";
			}
			if(rows[i].projectpointid!=null && rows[i].projectpointid!=""){
			id = id + rows[i].projectpointid;
			}
			monitorpointid = monitorpointid +",'" +rows[i].monitorpointid+"'";
		}
		if(id.split(",").length <rows.length){
			alert("请设置采样点，检测项目！");
			return;
		}else{
			$.ajax({
				type:'post',
				url:rootPath + '/spot/sampling/sampling!productSamplingBefore.action',
				data:'pmonitorid='+id,
				success:function(msg){
					if(msg=="NoItem"){
						alert("请设置检测项目！");
						return;
					}else{
						$.post( 
							rootPath +"/spot/sampling/sampling!createSamples.action",
							{projectcode:projectcode,pmids:id,monitorpointid:monitorpointid},
							function(data){
								if(data=='success'){
									alert('生成成功');
								 	$("#sampleslist").datagrid('reload');
								}else{
									alert('生成样品失败！');
								}
						});
					}
				}
					
			})
		}
	}else{
		alert("请至少选择一项");
	}
}

	
/**
 * 批量删除样品
 */
function deleteSamplesByBatch(){
	var rows = $("#sampleslist").datagrid("getSelections");
	if(rows.length>0){
		if(confirm("是否删除选中行？")){
			var id = "";
			for(var i=0;i<rows.length;i++){
				if(id!="") id = id + ",";
				id = id + rows[i].sampleid;
			}
			$.post( rootPath +"/spot/sampling/sampling!deleteSamplesByBatch.action",
				{ids:id},
				function(data){
					if(data=='success'){
						alert('成功');
					 	$("#sampleslist").datagrid('reload');
					 	$("#sampleslist").datagrid("clearSelections");
					}else{
						alert('失败');
					}
			});
		}
	}else{
		alert("请至少选择一项");
	}
}

/**
 * 修改样品信息
 */
function ajaxSamplenInfo(fieldname){
	var rows = $("#sampleslist").datagrid('getSelections');
	if(rows==null || rows.length< 1){		
		alert('请至少选择一条记录！');
	}else{
		var sampleids="";
		for ( var i = 0; i < rows.length; i++) {
			if(sampleids==""){
					sampleids+=rows[i]['sampleid'];
			}
			else{
				sampleids+=","+rows[i]['sampleid'];
			}
		}
		var sampleinfo = "";
		if(fieldname=="samplename"){
			sampleinfo = "样品名称";
		}
		if(fieldname=="volume"){
			sampleinfo = "采样体积";
		}
		if(fieldname=="savedose"){
			sampleinfo = "样品保存剂";
		}
		if(fieldname=="samplecode"){
			sampleinfo = "样品编号";
		}
		var _dialog =  window.top.$('<div id ="role-dlg" style="padding:0px;">'
				+'<table width="100%" border="1" align="center" class="grid">'
				+'<tr>'
				+'<td  align="left" class="Main_Tab_Style_title" width="100px">'+sampleinfo+':</td>'
				+'<td  align="left" class="Main_Tab_Style_Content" width="150px">'
				+'<input id="sampleinfo" class="TextBox grkj-validate" style="width: 150px;height:20px"'
				+'</td>'
				+'</tr>'
				+'</table>'
				+'</div>').appendTo(window.top.document.body);
		_dialog.dialog({
			title:'样品信息',
			autoOpen:false,
			modal:true,
			closed:true,
			width:'300',
			height:'100',
			buttons:[{
				text:'确定',
				iconCls:'icon-save',
				handler:function(){
				var samplevalue=$(window.top.document).find("#sampleinfo").val();
				$.post(rootPath +"/spot/sampling/sampling!updateSampleInfo.action",{fieldname:fieldname,value:samplevalue,sampleids:sampleids},function(data){
					if(data=='success'){
						$("#sampleslist").datagrid('reload');
						_dialog.dialog('close');
					}else if(data == 'have'){
						alert("此样品编号已存在");
					}else{
						alert('失败');
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
}
	
	/**
	 * 修改样品信息
	 */
	function ajaxSamplenInfoByDynamic(paramname,fieldname){
		//批量修改采样名字
		var rows = $("#sampleslist").datagrid('getSelections');
		if(rows==null || rows.length< 1){		
			alert('请至少选择一条记录！');
		}else{
			var sampleids="";
			for ( var i = 0; i < rows.length; i++) {
				if(sampleids==""){
						sampleids+=rows[i]['sampleid'];
				}
				else{
					sampleids+=","+rows[i]['sampleid'];
				}
			}
			var _dialog =  window.top.$('<div id ="role-dlg" style="padding:0px;">'
					+'<table width="100%" border="1" align="center" class="grid">'
					+'<tr>'
					
					+'<td  align="left" class="Main_Tab_Style_title" width="100px">'+paramname+':</td>'
					+'<td  align="left" class="Main_Tab_Style_Content" width="150px">'
					+'<input id="sampleinfo" class="TextBox grkj-validate" style="width: 150px;height:20px"'// grkj-validate
					//+' validateParam="{type:"'+validatetype+'",required:"true",message:"请输入'+sampleinfo+'！"}"/>'//
					+'</td>'
					+'</tr>'
					+'</table>'
					+'</div>').appendTo(window.top.document.body);
			_dialog.dialog({
				title:'样品信息',
				autoOpen:false,
				modal:true,
				closed:true,
				width:'300',
				height:'100',
				buttons:[{
					text:'确定',
					iconCls:'icon-save',
					handler:function(){
					var samplevalue=$(window.top.document).find("#sampleinfo").val();
					if(samplevalue==null){
						samplevalue="";
					}
					/*var objs = $(window.top.document).find(".grkj-validate");
					if(!saveCheck(objs)){
						$(window.top.document).find(":input").focus();
						alert("数据输入不符合格式，请查看红色边框的输入框的输入提示！");
						return false;
					}else{*/
						$.post(rootPath +"/spot/sampling/sampling!updateSampleInfoByDynamic.action",{fieldname:fieldname,value:samplevalue,sampleids:sampleids},function(data){
							if(data=='success'){
								$("#sampleslist").datagrid('reload');
								//$("#sampleslist").datagrid("clearSelections");
							}else{
								alert('失败');
							}
						});
						_dialog.dialog('close');
						//}
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
	
	/**
	 * 样品信息下拉框
	 * @param {Object} fieldname
	 */
	function ajaxSampleinfoBySelect(fieldname){
		var rows = $("#sampleslist").datagrid('getSelections');
		if(rows==null || rows.length< 1){		
			alert('请至少选择一条记录！');
		}else{
			var sampleids=[];
			for ( var i = 0; i < rows.length; i++) {
				if(sampleids==""){
						sampleids+=rows[i]['sampleid'];
				}
				else{
					sampleids+=","+rows[i]['sampleid'];
				}
			}
			
			var _dialog =  window.top.$('<div id ="dlg" style="padding:0px;">'
			+'<table width="100%"border="1" align="center" class="grid">'
			+'<tr>'
			+'<td  align="left" class="Main_Tab_Style_Content">'
			+'<select id="sampleselectinfo" class="TextBox" style="width: 100%;"/>'
			+'</td>'
			+'</tr>'
			+'</table>'
			+'</div>').appendTo(window.top.document.body);
			//加载下拉列表信息
			getSampleSelectInfo(fieldname);
			
			_dialog.dialog({
				title:'样品信息',
				autoOpen:false,
				modal:true,
				closed:true,
				width:'300',
				height:'100',
				buttons:[{
					text:'确定',
					iconCls:'icon-save',
					handler:function(){
						var samplevalue=$(window.top.document).find("#sampleselectinfo").val();
						$.post(rootPath +"/spot/sampling/sampling!updateSampleInfo.action",{fieldname:fieldname,value:samplevalue,sampleids:sampleids},function(data){
							if(data=='success'){
								$("#sampleslist").datagrid('reload');
							}else{
								alert('失败');
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
	
	function container(){
		var _dialog =  window.top.$('<div id ="dlg" style="padding:0px;">'
			+'<table width="100%"border="1" align="center" class="grid">'
			+'<tr>'
			+'<td  align="left" class="Main_Tab_Style_Content">'
			+'<select id="sampleselectinfo" class="TextBox" style="width: 100%;"/>'
			+'</td>'
			+'</tr>'
			+'</table>'
			+'</div>').appendTo(window.top.document.body);
			//加载下拉列表信息
			getSampleSelectInfo("container");
			
			_dialog.dialog({
				title:'样品信息',
				autoOpen:false,
				modal:true,
				closed:true,
				width:'300',
				height:'100',
				buttons:[{
					text:'确定',
					iconCls:'icon-save',
					handler:function(){
						var samplevalue=$(window.top.document).find("#sampleselectinfo").val();
						var samplevaluename=$(window.top.document).find("#sampleselectinfo").find("option:selected").text();
						$("#samlingcontainer").val(samplevalue);
						$("#samlingcontainername").val(samplevaluename);
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
	/**
	 * 样品信息下拉框
	 * @param {Object} fieldname
	 */
	function ajaxSampleinfoByDynamicSelect(paramid){
		var rows = $("#sampleslist").datagrid('getSelections');
		if(rows==null || rows.length< 1){		
			alert('请至少选择一条记录！');
		}else{
			var sampleids=[];
			for ( var i = 0; i < rows.length; i++) {
				if(sampleids==""){
						sampleids+=rows[i]['sampleid'];
				}
				else{
					sampleids+=","+rows[i]['sampleid'];
				}
			}
			
			var _dialog =  window.top.$('<div id ="dlg" style="padding:0px;">'
			+'<table width="100%"border="1" align="center" class="grid">'
			+'<tr>'
			+'<td  align="left" class="Main_Tab_Style_Content">'
			+'<select id="sampleselectinfo" class="TextBox" style="width: 100%;"/>'
			+'</td>'
			+'</tr>'
			+'</table>'
			+'</div>').appendTo(window.top.document.body);
			//加载下拉列表信息
			getSampleDynamicSelectInfo(paramid);
			
			_dialog.dialog({
				title:'样品信息',
				autoOpen:false,
				modal:true,
				closed:true,
				width:'300',
				height:'100',
				buttons:[{
					text:'确定',
					iconCls:'icon-save',
					handler:function(){
					var samplevalue=$(window.top.document).find("#sampleselectinfo").val();
					if(samplevalue==null){
						samplevalue="";
					}
					/*var objs = $(window.top.document).find(".grkj-validate");
					if(!saveCheck(objs)){
						$(window.top.document).find(":input").focus();
						alert("数据输入不符合格式，请查看红色边框的输入框的输入提示！");
						return false;
					}else{*/
						$.post(rootPath +"/spot/sampling/sampling!updateSampleInfoByDynamic.action",{fieldname:paramid,value:samplevalue,sampleids:sampleids},function(data){
							if(data=='success'){
								$("#sampleslist").datagrid('reload');
								//$("#sampleslist").datagrid("clearSelections");
							}else{
								alert('失败');
							}
						});
						_dialog.dialog('close');
						//}
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
	
	
	/**
	 * 获取下拉框内容
	 * @param {Object} fieldname
	 */
	function getSampleSelectInfo(fieldname){
		$.ajax( {
			type : 'post',
			url : rootPath +'/spot/sampling/sampling!getSampleSelectInfo.action',//给该url一个时间戳~~这样就必须每次从服务器读取数据,
			data: "fieldname="+fieldname,
			success : function(data) {
				var vData = eval("(" + data + ")");
				var lList = "<option value=''>---请选择---</option>";
				//遍历json数据  
				jQuery.each(vData, function(i, n) {
					lList += "<option value=" + n.code + ">" + n.value	+ "</option>";
				});				
				//绑定数据到select中
				$('#sampleselectinfo',window.top.document).append(lList);
			}
		});
	}
	
	/**
	 * 获取下拉框内容
	 * @param {Object} fieldname
	 */
	function getSampleDynamicSelectInfo(paramid){
		$.ajax( {
			type : 'post',
			url : rootPath +'/spot/sampling/sampling!getSampleDynamicSelectInfo.action',//给该url一个时间戳~~这样就必须每次从服务器读取数据,
			data: "fieldname="+paramid,
			success : function(data) {
				var vData = eval("(" + data + ")");
				var lList = "<option value=''>---请选择---</option>";
				//遍历json数据  
				jQuery.each(vData, function(i, n) {
					lList += "<option value=" + n.code + ">" + n.value	+ "</option>";
				});				
				//绑定数据到select中
				$('#sampleselectinfo',window.top.document).append(lList);
			}
		});
	}
	
	
	//采样日期
	function ajaxSamplesDate(fieldname){
		var rows = $("#sampleslist").datagrid('getSelections');
		if(rows==null || rows.length< 1){		
			alert('请至少选择一条记录！');
		}else{
			
			var sampleids=[];
			for ( var i = 0; i < rows.length; i++) {
				if(sampleids==""){
						sampleids+=rows[i]['sampleid'];
				}
				else{
					sampleids+=","+rows[i]['sampleid'];
				}
			}
			
			var url = rootPath + "/spot/sampling/sampling!toDate.action";
			var _dialog = window.top
						.$('<div id="monitorDialog"  style="padding:0px;"><iframe id="monitoringFrame" width="100%" height="100%" frameborder="0" scrolling="no" src=' + url + '></iframe></div>')
						.appendTo(window.top.document.body);
			_dialog.dialog({
				title:'采样日期',
				autoOpen:false,
				modal:true,
				closed:true,
				width:'300',
				height:'100',
				buttons:[{
					text:'确定',
					iconCls:'icon-save',
					handler:function(){
					 var objs = $("#monitoringFrame",top.document.body).contents().find(".grkj-validate");
							if(!saveCheck(objs)){
								$("#monitoringFrame",top.document.body).contents().find(":input").focus();
								alert("数据输入不符合格式，请查看红色边框的输入框的输入提示！");
								return false;
							}				
						var samplevalue = $("#monitoringFrame",top.document.body).contents().find("#sampingdata").val();					
						$.post(rootPath +"/spot/sampling/sampling!updateSampleInfo.action",{fieldname:fieldname,value:samplevalue,sampleids:sampleids},function(data){
							if(data=='success'){
								$("#sampleslist").datagrid('reload');
							}else{
								alert('失败');
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
	
	//时间
	function ajaxSamplesTime(fieldname){
		var rows=$("#sampleslist").datagrid('getSelections');
		if(rows==null || rows.length< 1){			
			alert('请至少选择一条记录！');
		}else{
			var sampleids=[];
			for ( var i = 0; i < rows.length; i++) {
				if(sampleids==""){
						sampleids+=rows[i]['sampleid'];
				}
				else{
					sampleids+=","+rows[i]['sampleid'];
				}
			}
			
			var url = rootPath + "/spot/sampling/sampling!toTime.action";
			var _dialog = window.top
						.$('<div id="monitorDialog"  style="padding:0px;"><iframe id="samplingTimeFrame" width="100%" height="100%" frameborder="0" scrolling="no" src=' + url + '></iframe></div>')
						.appendTo(window.top.document.body);
			_dialog.dialog({
				title:'采样日期',
				autoOpen:false,
				modal:true,
				closed:true,
				width:'300',
				height:'150',
				buttons:[{
					text:'确定',
					iconCls:'icon-save',
					handler:function(){
						 var objs = $("#samplingTimeFrame",top.document.body).contents().find(".grkj-validate");
						if(!saveCheck(objs)){
							$("#samplingTimeFrame",top.document.body).contents().find(":input").focus();
							alert("数据输入不符合格式，请查看红色边框的输入框的输入提示！");
							return false;
						}				
						var samplevalue = $("#samplingTimeFrame",top.document.body).contents().find("#sampingtime").val();	
						var spacetime = $("#samplingTimeFrame",top.document.body).contents().find("#spacetime").val();	
						$.post(rootPath +"/spot/sampling/sampling!updateSampleInfo.action",{fieldname:fieldname,value:samplevalue,sampleids:sampleids,spacetime:spacetime},function(data){
							if(data=='success'){
								$("#sampleslist").datagrid('reload');
							}else{
								alert('失败');
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

	//采样人
	function ajaxSamplpingperson(projectcode,fieldname){
		var rows=$("#sampleslist").datagrid('getSelections');
		if(rows==null || rows.length< 1){			
			alert('请至少选择一条记录！');
		}else{
			var sampleids=[];
			for ( var i = 0; i < rows.length; i++) {
				if(sampleids==""){
						sampleids+=rows[i]['sampleid'];
				}
				else{
					sampleids+=","+rows[i]['sampleid'];
				}
			}
			var url = rootPath + "/spot/sampling/sampling!toSamplingperson.action?projectcode="+projectcode;
			var _dialog = window.top
						.$('<div id="monitorDialog"  style="padding:0px;"><iframe id="samplingpersonFrame" width="100%" height="100%" frameborder="0" scrolling="no" src=' + url + '></iframe></div>')
						.appendTo(window.top.document.body);
			_dialog.dialog({
				title:'采样人',
				autoOpen:false,
				modal:true,
				closed:true,
				width:'260',
				height:'350',
				buttons:[{
					text:'确定',
					iconCls:'icon-save',
					handler:function(){						 			
						var samplevalue = $("#samplingpersonFrame",top.document.body).contents().find("#samplingpersons").val();
						//alert(samplevalue);
						$.post(rootPath +"/spot/sampling/sampling!updateSampleInfo.action",{fieldname:fieldname,value:samplevalue,sampleids:sampleids},function(data){
							if(data=='success'){
								//alert();
								$("#sampleslist").datagrid('reload');
								//$("#sampleslist").datagrid("clearSelections");
							}else{
								alert('失败');
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
	
	
	function samplpingperson(){
		var url = rootPath + "/spot/sampling/sampling!toSamplingperson.action?projectcode="+$("#projectcode").val();
			var _dialog = window.top
						.$('<div id="monitorDialog"  style="padding:0px;"><iframe id="samplingpersonFrame" width="100%" height="100%" frameborder="0" scrolling="no" src=' + url + '></iframe></div>')
						.appendTo(window.top.document.body);
			_dialog.dialog({
				title:'采样人',
				autoOpen:false,
				modal:true,
				closed:true,
				width:'260',
				height:'350',
				buttons:[{
					text:'确定',
					iconCls:'icon-save',
					handler:function(){						 			
						var samplevalue = $("#samplingpersonFrame",top.document.body).contents().find("#samplingpersons").val();
						var samplevaluename = $("#samplingpersonFrame",top.document.body).contents().find("#samplingpersonnames").val();
						$("#samplingperson").val(samplevalue);
						$("#samplingpersonname").val(samplevaluename);
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
	
//初始化采样人列表
function initSamplingPersonDataGrid(){
	$('#samplingpersonlist').datagrid({
		singleSelect:false,
		nowrap: false,
		striped: true,
		collapsible:true,
		url:rootPath + '/spot/sampling/sampling!initSamplingpersons.action?projectcode='+projectcode,
		sortName: 'userid',
		sortOrder: 'desc',
		fit:true,
		border:true,
		fitColumns:false,
		scrollbarSize:0,
		idField:'userid',	
		frozenColumns : [[
			{field:'checkbox',checkbox:true,align : 'center'}						      
		]],
		columns:[[
			 {field:'group',title:'采样组',width:64,align : 'center'},
	         {field:'username',title:'采样人',width:150,align : 'center'}
		]],
		pagination:false,
		rownumbers:false,
		onClickRow:function(rowIndex, rowData){
			var rows=$("#samplingpersonlist").datagrid('getSelections');
			var persons = "";
			for(var i=0;i<rows.length;i++){
				if(persons!=null && persons!="")
					persons+="	,";
				persons += rows[i].userid;
			}
			//alert(persons);
			$("#samplingpersons").val(persons);
			
			var personnames = "";
			for(var i=0;i<rows.length;i++){
				if(personnames!=null && personnames!="")
					personnames+="	,";
				personnames += rows[i].username;
			}
			$("#samplingpersonnames").val(personnames);
		}
	});
	$(window).resize(function(){
		$("#samplingpersonlist").datagrid('resize');
	});
}
	
	
	/**
	 * 批量提交
	 */
	function ajaxSubmitByBath(action){
		var rows = $("#entiprisedatagrid").datagrid("getSelections");
		if(rows.length>0){
			var id = "";
			for(var i=0;i<rows.length;i++){
				if(id!="" && rows[i].monitorpointid!=null && rows[i].monitorpointid!="") id = id + ",";
				id = id + rows[i].monitorpointid;
			}
			var url = rootPath + "/projects/appraiseopinion/appraiseopinion!opinionNocode.action?showName="+encodeURI(encodeURI(action+"意见"))+"&projectcode="+projectcode;
							var _dialog =  window.top.$('	<div id ="dlg" style="padding:0px;"><iframe id="dlgFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
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
									var opinion = $("#dlgFrame",window.top.document).contents().find("#opinion").val();
									$.post( rootPath +"/spot/sampling/sampling!updateStatusByBatch.action",
										{projectcode:projectcode,pmids:id,opinion:opinion},
										function(data){
											if(data=='success'){
												alert('成功');
												$("#entiprisedatagrid").datagrid("clearSelections");
												$("#entiprisedatagrid").datagrid('reload');
											 	$("#sampleslist").datagrid('reload');
											}else if(data=='user'){
												alert('请在样品中添加采样人！');
											}else if(data=='date'){
												alert('请在样品中添加开始日期！');
											}else if(data=='cf'){
												alert('在同一监测点下多个样品的采样人和开始日期时间相同！');
											}else if(data=='nullcode'){
												alert('部分样品未填写样品编号！');
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
								onBeforeOpen:function(){
								},
								onClose:function(){
									_dialog.dialog("destroy");					
								}
							});
							_dialog.dialog('open');
			
			
			
			
			
		}else{
			alert("请至少选择一项");
		}
	}
	
	/**
	 * 批量退回
	 */
	function ajaxblackByBath(){
		var rows = $("#entiprisedatagrid").datagrid("getSelections");
		if(rows.length>0){
			var id = "";
			var ppid = "";
			for(var i=0;i<rows.length;i++){
				if(id!="" && rows[i].monitorpointid!=null && rows[i].monitorpointid!="") id = id + ",";
				id = id + rows[i].monitorpointid;
				if(ppid!="" && rows[i].projectpointid!=null && rows[i].projectpointid!="") ppid = ppid + ",";
				ppid = ppid + rows[i].projectpointid;
			}
			$.post( rootPath +"/spot/sampling/sampling!updateBlackStatusByBatch.action",
					{projectcode:projectcode,pmids:id,ppids:ppid},
					function(data){
						if(data=='success'){
							alert('成功');
							$("#entiprisedatagrid").datagrid("clearSelections");
							$("#entiprisedatagrid").datagrid('reload');
						 	$("#sampleslist").datagrid('reload');
						}else{
							alert('失败');
						}
					});
		}else{
			alert("请至少选择一项");
		}
	}
//***************************************增加质控样***************************************//
//添加平行样    明码 密码
function pingxing(qctype){
	var selected=$("#sampleslist").datagrid("getSelected");
	var sampleid=selected.sampleid;
	var _dialog =  window.top.$('	<div id ="role-dlg" style="padding:0px;"><table id="SampleItemTab"></table></div>').appendTo(window.top.document.body);
	_dialog.dialog({
		title:'增加质控样品',
		autoOpen:false,
		modal:true,
		closed:true,
		width:'600',
		height:'400',
		buttons:[{
			text:'确定',
			iconCls:'icon-save',
			handler:function(){
				var selection=$(window.top.document).find("#SampleItemTab").datagrid("getSelections");
				var itemid=[];
				if(selection.length<=0||selection==null){
					alert("至少选择一个监测项目！");
				}else{
					for ( var i = 0; i < selection.length; i++) {
						if(itemid==""){
							itemid=selection[i]['itemid'];
						}else{
							itemid+=","+selection[i]['itemid'];
						}
					}
					$.post(
						rootPath +"/spot/sampling/sampling!saveQualitySample.action",
						{id:sampleid,itemid:itemid,qctype:qctype},
						function(data){
						if(data=='success'){
							alert('成功');
							$("#sampleslist").datagrid('reload');
						}else{
							alert('失败');
						}
					});
					_dialog.dialog('close');
				}
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
	var myurl=rootPath +'/spot/sampling/sampling!initSampleItemList.action?id ='+sampleid;
	initSampleItemList(myurl);
		
}
//显示添加质控样品的项目信息列表
function initSampleItemList(myurl){
	$(window.top.document).find("#SampleItemTab").datagrid({
		nowrap: false,
		striped: true,
		collapsible:true,
		url:myurl, 
		fit:true,
		fitColumns : true,
		scrollbarSize:0,
		remoteSort: false,
		iconCls:"icon-edit",
		idField:"itemid",
		rownumbers:true,
		columns:[[
				{field:'itemname',title:'监测项目', width:200,align:"center"},
				{field:'itemid',width:100,align:"center",title:'是否测试',
					formatter:function(value,rowData,rowIndex){
						return "<input type='checkbox' name='ceshi'/>"
					}
				},	
				{field:'isnowtest',title:'现场监测', width:100,align:"center",
					formatter:function(value,rec){
							var str ="";
							if(value=='Y'){
								str = "<input type='checkbox' checked='checked' disabled='disabled'/>";
							}
							if(value=='N'){
								str = "<input type='checkbox' disabled='disabled'/>";
							}
							return str;
						}
				
			}
		]],
		onLoadSuccess:function(){
			$(window.top.document).find("#SampleItemTab").datagrid('selectAll');
		},
		onSelect:function(rowIndex,rowData){
			var radios = $(window.top.document).find("input[name=ceshi]");
			$(radios[rowIndex]).attr("checked", true);
		},
		onUnselect:function(rowIndex,rowData){
			var radios = $(window.top.document).find("input[name=ceshi]");
			$(radios[rowIndex]).removeAttr("checked");
		}
	});
}


//添加空白样  全程空白样
function kongbai(qctype){
	var selected=$("#entiprisedatagrid").datagrid("getSelected");
	var projectpointid=selected.projectpointid;
	var _dialog =  window.top.$('	<div id ="role-dlg" style="padding:0px;"><table id="SampleItemTab"></table></div>').appendTo(window.top.document.body);
	_dialog.dialog({
		title:'增加质控样品',
		autoOpen:false,
		modal:true,
		closed:true,
		width:'600',
		height:'400',
		buttons:[{
			text:'确定',
			iconCls:'icon-save',
			handler:function(){
				var selection=$(window.top.document).find("#SampleItemTab").datagrid("getSelections");
				var itemid=[];
				if(selection.length<=0||selection==null){
					alert("至少选择一个监测项目！");
				}else{
					for ( var i = 0; i < selection.length; i++) {
						if(itemid==""){
							itemid=selection[i]['itemid'];
						}else{
							itemid+=","+selection[i]['itemid'];
						}
					}
					$.post(
						rootPath +"/spot/sampling/sampling!saveKongSample.action",
						{itemid:itemid,pmonitorid:projectpointid,qctype:qctype},
						function(data){
						if(data=='success'){
							alert('成功');
							$("#sampleslist").datagrid('reload');
						}else{
							alert('失败');
						}
					});
					_dialog.dialog('close');
				}
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
	var myurl=rootPath +'/spot/sampling/sampling!initSampleItemList.action?pmonitorid='+ projectpointid;
	initSampleItemList(myurl);
}

//修改质控样监测项目
function updateQcSampleItem(){
	var selected=$("#sampleslist").datagrid("getSelected");
	var sampleid = selected.sampleid;
	var _dialog =  window.top.$('<div id ="role-dlg" style="padding:0px;"><table id="SampleItemTab"></table></div>').appendTo(window.top.document.body);
	_dialog.dialog({
		title:'监测项目编辑',
		autoOpen:false,
		modal:true,
		closed:true,
		width:'600',
		height:'400',
		buttons:[{
			text:'确定',
			iconCls:'icon-save',
			handler:function(){
				var selection=$(window.top.document).find("#SampleItemTab").datagrid("getSelections");
				var itemid=[];
				if(selection.length<=0||selection==null){
					alert("至少选择一个监测项目！");
				}else{
					for ( var i = 0; i < selection.length; i++) {
						if(itemid==""){
							itemid=selection[i]['itemid'];
						}else{
							itemid+=","+selection[i]['itemid'];
						}
					}
					$.post(
						rootPath +"/spot/sampling/sampling!updateQCSampleItem.action",
						{id:sampleid,itemid:itemid},
						function(data){
						if(data=='success'){
							alert('成功');
							$("#sampleslist").datagrid('reload');
						}else{
							alert('失败');
						}
					});
					_dialog.dialog('close');
				}
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
	var myurl=rootPath +'/spot/sampling/sampling!initSampleItemList.action?id ='+sampleid;
	initSampleItemList(myurl);
}

//删除质控样
function delzhikong(){
	var row=$("#sampleslist").datagrid("getSelected");
	if(window.confirm('是否删除？')){
		$.post(
			rootPath+"/spot/sampling/sampling!deleteSamplesByBatch.action",
			{ids:row.sampleid},
			function(data){
			if(data=="success"){
				alert("成功！");
				$("#sampleslist").datagrid("reload");
				
			}
		});
	}
}
//***************************************增加质控样***************************************//

//////////////////////以下是流程操作///////////////////////////
//提交
function openDialog(action){
	var rows = $("#entiprisedatagrid").datagrid("getSelections");
	if(rows==''){
		alert('请选择一条记录！');
		return;
	}else{		
		if(action=='退回')
		{	
			var url = rootPath + "/projects/opinion/opinion!input.action?moduleid="+encodeURI(encodeURI('采样退回意见'))+"&showName="+encodeURIComponent(encodeURIComponent(action+'意见'));
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
		}else if(action=='提交'){
			if(window.confirm('是否提交？'))
 			{
				operate(action,"");		
			}
		}
	}
}

//流程操作
function operate(action,message){
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
	var rows = $("#entiprisedatagrid").datagrid("getSelections");
	var id = "";
	var ids = "";
	for(var i=0;i<rows.length;i++){
		if(id!="" && rows[i].monitorpointid!=null && rows[i].monitorpointid!="") id = id + ",";
		id = id + rows[i].monitorpointid;
		if(ids!="") ids = ids + ",";
		ids = ids + rows[i].projectdetail;
	}
	$.post( rootPath +"/spot/sampling/sampling!backByBatch.action",
			{projectcode:projectcode,pmids:id,opinion:message,action:action,ids:ids},
			function(data){
				if(data=='success'){
					jQuery.unblockUI();
					alert('成功');
					$("#entiprisedatagrid").datagrid("clearSelections");
					$("#entiprisedatagrid").datagrid('reload');
				 	$("#sampleslist").datagrid('reload');
				}else{
					jQuery.unblockUI();
					alert('失败');
				}
	});
}
//项目监测企业
function initViewDataGridByHuangj(){
	$('#entiprisedatagrid').datagrid({
		nowrap: false,
		striped: true,
		collapsible:true,
		url: rootPath + "/spot/sampling/sampling!detailList.action?projectcode="+projectcode,
		fit:true,
		fitColumns:true,
		scrollbarSize:0,
		idField:'projectdetail',	
		columns:[[
			{field:'projectdetail',checkbox:true,align : 'center'} ,	
	        //{field:'entname',title:'企业名称',width:300,align : 'center'} ,					
			{field:'monitortypename',title:'监测点类型',width:150,align : 'center'},
			{field:'monitorname',title:'监测点',width:150,align : 'center'},
			{field:'itemname',title:'检测项目',width:200,align : 'center'},
			{field:'ismonitor',title:'是否监控 ', width:80,align:"center"}
			
		]],onLoadSuccess:function(data){
			if(data.rows.length>0){
				setTimeout("mergeCellsByField(\"entiprisedatagrid\",\"monitortypename\")",10)
			}
			var header = $("#entiprisedatagrid").parent(".datagrid-view").find("div.datagrid-header");
		},
		onClickRow:function(rowIndex, rowData){		
			$("#entiprisedatagrid").datagrid("clearSelections");
			$('#entiprisedatagrid').datagrid('selectRow',parseInt(rowIndex));
			initviewSamplsData(rowData.projectcode,rowData.monitorpointid,rowData.entid,rowData.monitortypeid);
		}
		
	});
	$(window).resize(function(){
		$("#entiprisedatagrid").datagrid('resize');
	});
	$("#renwu").resize(function(){
		$("#entiprisedatagrid").datagrid('resize');
	});
}
//项目监测企业
function initViewDataGrid(){
	$('#entiprisedatagrid').datagrid({
		nowrap: false,
		striped: true,
		collapsible:true,
		url: rootPath + "/spot/sampling/sampling!detailList.action?projectcode="+projectcode,
		fit:true,
		fitColumns:true,
		scrollbarSize:0,
		idField:'projectdetail',	
		columns:[[
			{field:'projectdetail',checkbox:true,align : 'center'} ,	
	        {field:'entname',title:'企业名称',width:300,align : 'center'} ,					
			{field:'monitortypename',title:'监测点类型',width:150,align : 'center'},
			{field:'monitorname',title:'监测点',width:150,align : 'center'},
			{field:'itemname',title:'检测项目',width:200,align : 'center'},
			{field:'ismonitor',title:'是否监控 ', width:80,align:"center"}
			
		]],onLoadSuccess:function(data){
			if(data.rows.length>0){
				setTimeout("mergeCellsByField(\"entiprisedatagrid\",\"entname\")",10)
			}
			var header = $("#entiprisedatagrid").parent(".datagrid-view").find("div.datagrid-header");
		},
		onClickRow:function(rowIndex, rowData){		
			$("#entiprisedatagrid").datagrid("clearSelections");
			$('#entiprisedatagrid').datagrid('selectRow',parseInt(rowIndex));
			initviewSamplsData(rowData.projectcode,rowData.monitorpointid,rowData.entid,rowData.monitortypeid);
		}
		
	});
	$(window).resize(function(){
		$("#entiprisedatagrid").datagrid('resize');
	});
	$("#renwu").resize(function(){
		$("#entiprisedatagrid").datagrid('resize');
	});
}
//加载样品信息
function initviewSamplsData(projectcode,pmonitorid,entid,monitortype){
	$('#sampleslist').datagrid({
		tableName:'sampleslist',
		singleSelect:false,
		nowrap: false,
		striped: true,
		collapsible:true,
		url:rootPath + "/spot/sampling/sampling!initSamplesList.action?projectcode="+projectcode+"&entid="+entid+"&monitortype="+monitortype+"&pmonitorid="+pmonitorid+"&timeStamp="+new Date().getTime(),
		fit:true,
		border:true,
		fitColumns:false,
		idField:'sampleid',
		scrollbarSize:0,
		frozenColumns:[[
			{field:'sampleid',checkbox:true,align:"center"},
			{field:'samplecode',title:'样品编号', width:70,align:"center"},
			{field:'samplename',title:'样品名称<img src="'+rootPath+'/themes/icons/mini_edit.png"/>', width:70,align:"center"},
			{field:'qctypename',title:'质控类型', width:70,align:"center"}
			]],
		columns:[[
			
			{field:'startdate',title:'开始日期 ', width:80,align:"center"},
			{field:'starttime',title:'开始时间 ', width:70,align:"center"},
			{field:'cyperson',title:'采样人', width:180,align:"center"},
			{field:'container',title:'采样容器 ', width:80,align:"center"},
			{field:'volume',title:'采样体积 ', width:70,align:"center"},
			{field:'savedose',title:'样品保存剂 ', width:80,align:"center"},
			{field:'jcitem',title:'监测项目', width:280,align:"center"},
			{field:'enddate',title:'结束日期  ', width:80,align:"center"},
			{field:'endtime',title:'结束时间 ', width:70,align:"center"}
			]],
		pagination:true,
		rownumbers:false,
		pageSize:15,
		pageList:[15,25,35,50],
		onRowContextMenu:function(e,rowIndex,rowData){
			$("#sampleslist").datagrid("clearSelections");
			$('#sampleslist').datagrid("selectRow",rowIndex);
			if(rowData.ishaveqcsample=='Y'){
				if(rowData.qctype==""){
					$("#kongbai-menu").menu('show',{left:e.pageX,top:e.pageY});
				}else{
					$("#zhikong-menu").menu('show',{left:e.pageX,top:e.pageY});
				}
			}
			e.preventDefault();
		}
	});
	$(window).resize(function(){
		$("#sampleslist").datagrid('resize');
	});
}
//采样单
function showReportList(){
	var url= rootPath + "/spot/samplingdata/samplingdata!toSamplingListPage.action?projectcode="+projectcode;
   	var _dialog =  window.top.$('	<div id="pointDialog"  style="padding:0px;"><iframe id="samplingReportFrame" width="100%" height="100%" frameborder="0" scrolling="yes" src='+url+'></iframe></div>').appendTo(window.top.document.body);
	
	_dialog.dialog({
		title:'采样原始记录单',
		autoOpen:false,
		modal:true,
		closed:true,
		width:'1100',
		height:'600',
		onClose:function(){
			_dialog.dialog("destroy");
			
		}
	});
	_dialog.dialog('open');
}

function addsamples(){
	var rows = $("#entiprisedatagrid").datagrid("getSelections");
	if(rows.length>0){
		var id = "";
		var monitorpointid = "";
		for(var i=0;i<rows.length;i++){
			if(id!=""){
			 id = id + ",";
			}
			if(rows[i].projectpointid!=null && rows[i].projectpointid!=""){
			id = id + rows[i].projectpointid;
			}
			monitorpointid = monitorpointid +",'" +rows[i].monitorpointid+"'";
		}
		if(id.split(",").length <rows.length){
			alert("请设置采样点，检测项目！");
			return;
		}else{
			$.ajax({
				type:'post',
				url:rootPath + '/spot/sampling/sampling!productSamplingBefore.action',
				data:'pmonitorid='+id,
				success:function(msg){
					if(msg=="NoItem"){
						alert("请设置检测项目！");
						return;
					}else{
						var url= rootPath + "/spot/sampling/sampling!toAddSample.action?projectcode="+projectcode+"&pmids="+id+"&monitorpointid="+monitorpointid;
					   	var _dialog =  window.top.$('	<div id="pointDialog"  style="padding:0px;"><iframe id="samplingReportFrame" width="100%" height="100%" frameborder="0" scrolling="yes" src='+url+'></iframe></div>').appendTo(window.top.document.body);
						_dialog.dialog({
							title:'采样原始记录单',
							autoOpen:false,
							modal:true,
							closed:true,
							width:'800',
							height:'300',
							buttons:[{
								text:'保存',
								iconCls:'icon-save',
								handler:function(){
									$("#samplingReportFrame",window.top.document).contents().find("#sampleform").form('submit',
									{
										url:rootPath + "/spot/sampling/sampling!saveSample.action",
										onSubmit:function(){
											var objs = $("#samplingReportFrame",window.top.document).contents().find(".grkj-validate");
											
											if(!saveCheck(objs)){
												$("#samplingReportFrame",window.top.document).contents().find(":input").focus();
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
												$('#sampleslist').datagrid('reload');
											}
											_dialog.dialog('close');
										}
									});		
								}
							},{
								text:'取消',
								iconCls:'icon-cancel',
								handler:function(){
									_dialog.dialog("close");
								}
							}],
							onClose:function(){
								_dialog.dialog("destroy");
								
							}
						});
						_dialog.dialog('open');
						
						
					}
				}
					
			})
		}
	}else{
		alert("请先选择采样点信息！");
	}
	
	
	
	
}