$(document).ready(function() {
	initDataGrid();
//	seldatagrid();
	
});

function selectTab(title){
	$('#tt').tabs({
		onSelect: function(title){
			if(title == '数据录入'){
				var tempVal = "";
				var batchno="";
				var itemid="";
				var methodid="";
				var deviceid="";
				var batchrows = $("#batchdatagrid").datagrid("getSelections");
				if(batchrows!=''){
					batchno=batchrows[0].batchno;
					itemid=batchrows[0].itemid;
					methodid=batchrows[0].methodid;
					deviceid=batchrows[0].deviceid;
				}
				
				if(batchno!=""){
					$.post(
						rootPath + "/sampletest/batch/batch!getSampleitemSizeByBatchno.action?batchno="+ batchno,
						function(msg){
						if(msg == 'success')
						{	
							var url = rootPath + "/sampletest/sampletestbybatch!toDataEntry.action";
							url = url + "?itemid="+itemid+"&batchno="+batchno+"&methodid="+methodid+"&deviceid="+deviceid;
//							if($('#batchdataenterFrame').attr('src')==undefined||$('#batchdataenterFrame').attr('src')==""){
								$("#batchdataenterFrame").attr("src",url);
//							}
						}else{
						alert("该批号没有与样品关联，不能录入数据！");
						selectTab("批样品录入");
						}
						});
					}else{
						alert("请选择一个批号！");
						selectTab("批样品录入");
					}
				}
			}
	});
}
var batchItemidVal="";//全局变量，添加批次用到
// 页面加载，待检测项目列表
function initDataGrid() {
	$('#datagrid').datagrid(
	{
			nowrap : false,
			striped : true,
			collapsible : true,
			url : 'sampletestbybatch!sampleitemList.action', 
			sortName : 'itemid',
			sortOrder : 'asc',
			remoteSort : false,						
			fit : true,
			fitColumns : true,
			scrollbarSize : 0,
			singleSelect:true,
			idField:'itemid',	
			columns : [ [
			{
				field : 'itemname',
				title : '项目名称',
				width : 300,
				align : 'center'
			}
			] ],
			onLoadSuccess:function(){
				/*$("#datagrid").datagrid("clearSelections");
				//默认加载第一行的基本信息
				$('#datagrid').datagrid('selectRow',0);
				var rowData = $('#datagrid').datagrid('getSelected');
				if(rowData!=null){					
					initBatchDataGrid(rowData.itemid);//给批信息页面传参
					unSeldatagrid(rowData.itemid);
					batchItemidVal=rowData.itemid;
				}else{
					initBatchDataGrid('');//给批信息页面传参
					unSeldatagrid('');
					batchItemidVal="";
				}*/
				initBatchDataGrid('','flag');//给批信息页面传参
				unSeldatagrid('','flag');
				seldatagrid('','','flag');
			},onClickRow:function(rowIndex, rowData){
//				$("#datagrid").datagrid("clearSelections");
//				$('#datagrid').datagrid('selectRow',parseInt(rowIndex));
//				var rowData = $('#datagrid').datagrid('getSelected');
				initBatchDataGrid(rowData.itemid,'');//给批信息页面传参
				unSeldatagrid(rowData.itemid,'');
				batchItemidVal=rowData.itemid;
				haveCalibrateparameter(rowData.itemid);
				$("#itemVal").val(rowData.itemid);
//				$("#batchdataenterFrame").attr('src','');
//				seldatagrid(itemid);
				selectTab("批样品录入");
			},rowStyler:function(rowIndex,rowData){
				if(rowData.issubmit!=null&&rowData.issubmit!=''){
					if(rowData.issubmit!='' && rowData.issubmit=='yes'){
						return "color:red;";//background-color:#FFFF00
					}
				}
			}
		});
		$(window).resize(function() {
			$("#datagrid").datagrid('resize');
		});
		$("#renwu").resize(function(){
			$("#datagrid").datagrid('resize');
		});
}
//是否有校准曲线
function haveCalibrateparameter(itemid){//alert(itemid);
	$.post(rootPath + "/sampletest/sampletestbybatch!getDevicecalibratecurve3.action?itemid="+itemid, 
	function(msg){
		if (msg == 'no') {
			//alert(msg);
			//alert("该项目不需要校准曲线！");
//			return false;
			$("#isDisplay").hide();
		}else{
			$("#isDisplay").show();
		}
	});
}

function unSeldatagrid(itemidVal,flag) {
	var flagUrl;
	if(flag=='flag'){ //此处是加载的时候不查询后台，但是要把头儿展示出来。2012-04-11
		flagUrl="";
	}else{
		flagUrl=rootPath+'/sampletest/sampletestbybatch!unSelSampleitemList.action?itemid='+itemidVal;
	}
	$('#unseldatagrid').datagrid(
		{
			nowrap : false,
			striped : true,
			collapsible : true,
			url :  flagUrl,
			sortName : 'itemid',
			sortOrder : 'asc',
			remoteSort : false,						
			fit : true,
//			fitColumns : true,
			scrollbarSize : 0,
			singleSelect:false,
			idField:'sampleitemtestid',	
			columns : [ [
				{
					field:'sampleitemtestid',
					checkbox:true,
					align : 'center'
				},/*{
					field : 'entname',
					title : '企业名称',
					width : 150,
					align : 'center'
				},*/
				{
					field : 'samplecode',
					title : '样品编号',
					width : 150,
					align : 'center'
				},
				/*{
					field : 'samplename',
					title : '样品名称',
					width : 120,
					align : 'center'
				},*/
				{
					field : 'samplingstartdate',
					title : '采样日期',
					width : 120,
					align : 'center'
				},
				{
					field : 'monitorpointtype',
					title : '监测点类型',
					width : 120,
					align : 'center'
				},
				{
					field : 'monitorcode',
					title : '监测点编码',
					width : 100,
					align : 'center'
				}/*,
				{
					field : 'itemname',
					title : '监测点名称',
					width : 120,
					align : 'center'
				}*/
			] ],
			onLoadSuccess:function(){
				$("#unseldatagrid").datagrid("clearSelections");
				
			},
			onClickRow:function(rowIndex, rowData){
				$("#unseldatagrid").datagrid("clearSelections");
				$('#unseldatagrid').datagrid('selectRow',parseInt(rowIndex));
			}//,
//			onSelect:function(rowIndex, rowData){
//				$("#unseldatagrid").datagrid("clearSelections");
//				$('#unseldatagrid').datagrid('selectRow',parseInt(rowIndex));
//			}
	//			pagination:true,
	//			rownumbers:false,
	//			pageSize:20,
	//			pageList:[20,30,40,50]
			});
			$(window).resize(function() {
				$("#unseldatagrid").datagrid('resize');
			});
			$("#unsel").resize(function(){
				$("#unseldatagrid").datagrid('resize');
			});
}
function seldatagrid(itemidVal,batchno,flag) {
	var flagUrl;
	if(flag=='flag'){ //此处是加载的时候不查询后台，但是要把头儿展示出来。2012-04-11
		flagUrl="";
	}else{
		flagUrl=rootPath+'/sampletest/sampletestbybatch!selSampleitemList.action?itemid='+itemidVal+"&batchno="+batchno;
	}
//	var batchrows = $("#batchdatagrid").datagrid("getSelections");
//	var batchno="";
//	if(batchno!=''){
//		batchno=batchrows[0].batchno;	
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
				{
					field:'sampleitemtestid',
					checkbox:true,
					align : 'center'
				},
				/*{
					field : 'entname',
					title : '企业名称',
					width : 190,
					align : 'center'
				},*/
				{
					field : 'samplecode',
					title : '样品编号',
					width : 190,
					align : 'center'
				},
				/*{
					field : 'samplename',
					title : '样品名称',
					width : 150,
					align : 'center'
				},*/
				{
					field : 'qcsampletypename',
					title : '质控样类型',
					width : 100,
					align : 'center'
				},
				{
					field : 'standardsampleno',
					title : '标样批号',
					width : 120,
					align : 'center'
				},
				{
					field : 'samplingstartdate',
					title : '采样日期',
					width : 120,
					align : 'center'
				},
				{
					field : 'monitorpointtype',
					title : '监测点类型',
					width : 120,
					align : 'center'
				},
				{
					field : 'monitorcode',
					title : '监测点编码',
					width : 100,
					align : 'center'
				}/*,
				{
					field : 'itemname',
					title : '监测点名称',
					width : 120,
					align : 'center'
				}*/
			] ],
			onLoadSuccess:function(){
				$("#seldatagrid").datagrid("clearSelections");
				//默认加载第一行的基本信息
				//$('#seldatagrid').datagrid('selectRow',0);
			},
			onClickRow:function(rowIndex, rowData){
				$("#seldatagrid").datagrid("clearSelections");
				$('#seldatagrid').datagrid('selectRow',parseInt(rowIndex));
//				if(rowData.qcsampletypename==''){
//					//原样品，左移按钮可用
//					$("#leftMove").removeAttr("disabled");
//				}else{
//					//非原样品，左移按钮不可用
//					$("#leftMove").attr("disabled","disabled");
//				}
//				$("#rightMove").attr("disabled","disabled");	
			},
			onRowContextMenu:function(e,row,rowData){
				$("#seldatagrid").datagrid("clearSelections");
				$('#seldatagrid').datagrid('selectRow',parseInt(row));
				$("#selectedsampleMane").menu("show", {left: e.pageX,top: e.pageY});
				var qctypeid = rowData.qctypeid;
				//点击某一行添加空白样，标准样，校准曲线检查样的任意一个，都可以添加其他两项（空白样，标准样，校准曲线检查样中两项），
				//点击添加平行样和加标样时，只能给原样品（非质控样）添加该两项，并且一个原样品只能添加一次（平行样和加标样），
				//QC开头的属于某个批次的样品，不属于某个任务的
				//if(psamcode==''){//父样品为空,有原样品，标准样，空白样，校准曲线样	
				if(qctypeid!=''){
				  /*4	空白样	2
					5	加标样	2
					6	平行样	2
					7	标准样	2
					8	校准曲线检查样	2*/
					if(qctypeid=='4'){
						//添加空白样
						//$('#addBlankSample').removeAttr("disabled");
						//$('#addBlankSample').removeClass("disable");
						//添加标准样
						$('#addstandard').removeAttr("disabled");
						$('#addstandard').removeClass("disable");
						//添加校准曲线样
						$('#addstandardcheck').removeAttr("disabled");
						$('#addstandardcheck').removeClass("disable");
						//添加平行样
						$('#addParallelSample').removeAttr("disabled");
						$('#addParallelSample').removeClass("disable");
						//添加加标样,不可操作
						$('#enterstandardw').attr({disabled:"disabled"});
						$('#enterstandardw').addClass("disable");
						//标准样品删除
						$('#deleteSample').removeAttr("disabled");
						$('#deleteSample').removeClass("disable");
					}if(qctypeid=='7' ||qctypeid=='8'){
						//添加空白样
						//$('#addBlankSample').removeAttr("disabled");
						//$('#addBlankSample').removeClass("disable");
						$('#addstandard').removeAttr("disabled");
						$('#addstandard').removeClass("disable");
						//添加校准曲线样
						$('#addstandardcheck').removeAttr("disabled");
						$('#addstandardcheck').removeClass("disable");
						if(qctypeid=='7'){
							//添加平行样,可操作
							$('#addParallelSample').removeAttr("disabled");
							$('#addParallelSample').removeClass("disable");
						}
						//添加加标样,不可操作
						$('#enterstandardw').attr({disabled:"disabled"});
						$('#enterstandardw').addClass("disable");
						//标准样品删除
						$('#deleteSample').removeAttr("disabled");
						$('#deleteSample').removeClass("disable");
					}else if(qctypeid=='5'){	
						//添加空白样,可操作
						//$('#addBlankSample').removeAttr("disabled");
						//$('#addBlankSample').removeClass("disable");
						//添加标准样
						$('#addstandard').removeAttr("disabled");
						$('#addstandard').removeClass("disable");
						//添加校准曲线样
						$('#addstandardcheck').removeAttr("disabled");
						$('#addstandardcheck').removeClass("disable");
						//添加平行样,不可操作
						$('#addParallelSample').attr({disabled:"disabled"});
						$('#addParallelSample').addClass("disable");
						//添加加标样,不可操作
						$('#enterstandardw').attr({disabled:"disabled"});
						$('#enterstandardw').addClass("disable");
						//标准样品删除
						$('#deleteSample').removeAttr("disabled");
						$('#deleteSample').removeClass("disable");
					}else if(qctypeid=='6'){
						//添加空白样,不可操作
						//$('#addBlankSample').removeAttr("disabled");
						//$('#addBlankSample').removeClass("disable");
						//添加标准样
						$('#addstandard').removeAttr("disabled");
						$('#addstandard').removeClass("disable");
						//添加校准曲线样
						$('#addstandardcheck').removeAttr("disabled");
						$('#addstandardcheck').removeClass("disable");
						//添加平行样,不可操作
						$('#addParallelSample').attr({disabled:"disabled"});
						$('#addParallelSample').addClass("disable");
						//添加加标样,不可操作
						$('#enterstandardw').attr({disabled:"disabled"});
						$('#enterstandardw').addClass("disable");
						
						//标准样品删除
						$('#deleteSample').removeAttr("disabled");
						$('#deleteSample').removeClass("disable");
					}
					//不是原样品，左移按钮不可用
					//$("#leftMove").attr("disabled","disabled");
				}else{																		
					//添加空白样
					//$('#addBlankSample').removeAttr("disabled");
					//$('#addBlankSample').removeClass("disable");
					//添加平行样
					$('#addParallelSample').removeAttr("disabled");
					$('#addParallelSample').removeClass("disable");
					//添加加标样
					$('#enterstandardw').removeAttr("disabled");
					$('#enterstandardw').removeClass("disable");
					//添加标准样
					$('#addstandard').removeAttr("disabled");
					$('#addstandard').removeClass("disable");
					//添加校准曲线样
					$('#addstandardcheck').removeAttr("disabled");
					$('#addstandardcheck').removeClass("disable");
					
					//原样品不允许删除,不可操作
					$('#deleteSample').attr({disabled:"disabled"});
					$('#deleteSample').addClass("disable");
					//原样品，左移按钮可用
					$("#leftMove").removeAttr("disabled");	
					$('#leftMove').removeClass("disable");
				}
				e.preventDefault();
			},rowStyler:function(rowIndex,rowData){
				if(rowData.issubmit!=null&&rowData.issubmit!=''){
					if(rowData.issubmit=='1'){
						return "color:red;";//background-color:#FFFF00
					}
				}
			}
//			pagination:true,
//			rownumbers:false,
//			pageSize:20,
//			pageList:[20,30,40,50]
		});
		$(window).resize(function() {
			$("#seldatagrid").datagrid('resize');
		});
		$("#sel").resize(function(){
			$("#seldatagrid").datagrid('resize');
		});
}


//将待选样品列表添加到已选样品列表
function addToRightList(){
	var batchno="";
	var batchrows = $("#batchdatagrid").datagrid("getSelections");
	if(batchrows!=''){
		batchno=batchrows[0].batchno;
	}
	
	var sampleitemtestids="";
	var unselrows = $("#unseldatagrid").datagrid("getSelections");
	
	for(var i=0;i<unselrows.length;i++)
	{
		sampleitemtestids = sampleitemtestids + unselrows[i].sampleitemtestid+",";
	}
	sampleitemtestids = sampleitemtestids.substring(0,sampleitemtestids.length-1);	
	if(batchno!=""&&batchno!=null){
//		/*if(sampleitemtestids!=""){
//			var url = "?batchno="+batchno+"&sampleitemtestid="+sampleitemtestids;
//			$.post(
//				rootPath + "/sampletest/sampletestbybatch!addBatchno.action"+ url, function(del){
//				if (del == 'success') {
//					alert("选择成功!");
//					$("#unseldatagrid").datagrid('reload');
//					$("#seldatagrid").datagrid('reload');
//					$("#unseldatagrid").datagrid("clearSelections");
//					$("#seldatagrid").datagrid("clearSelections");
//				}else{
//					alert("选择失败!");
//				}
//			});
//		}else{
//			alert("请至少选择一个待选样品！")
//		}*/
		var url = "?batchno="+batchno;
		$.post(
			rootPath + "/sampletest/sampletestbybatch!getDevicecalibratecurve.action"+ url, function(msg){
			if (msg == 'yes') {
				if(sampleitemtestids!=""){
					if(confirm("是否使用上次校准曲线？")){
						url = "?batchno="+batchno+"&sampleitemtestid="+sampleitemtestids;
						$.post(
							rootPath + "/sampletest/sampletestbybatch!addBatchno.action"+ url, function(msg){
							if (msg == 'success') {
								//alert("选择成功!");
								$("#unseldatagrid").datagrid('reload');
								$("#seldatagrid").datagrid('reload');
								$("#unseldatagrid").datagrid("clearSelections");
								$("#seldatagrid").datagrid("clearSelections");
							}else{
								alert("选择失败！");
							}
						});
					}else{
						$("#isDisplay").click();
					}
				}else{
					alert("请至少选择一个待选样品！");
				}
			}else if(msg == 'no'){
				alert("请给该批次仪器添加校准曲线！");
				return;
			}else if(msg =='noslope'){
				alert("请先计算最新校准曲线的斜率，截距和相关系数！");
				return;
			}else if(msg == 'no need curve'){
				url = "?batchno="+batchno+"&sampleitemtestid="+sampleitemtestids;
				$.post(
					rootPath + "/sampletest/sampletestbybatch!addBatchno.action"+ url, function(msg){
					if (msg == 'success') {
						//alert("选择成功!");
						$("#unseldatagrid").datagrid('reload');
						$("#seldatagrid").datagrid('reload');
						$("#unseldatagrid").datagrid("clearSelections");
						$("#seldatagrid").datagrid("clearSelections");
					}else{
						alert("选择失败！");
					}
				});
			}
		});
	}else{
		alert("请选择一个批号！");
	}
}
//将已选样品列表添加到待选样品列表
function addToLeftList(){
	var isTrue = false;
	var batchno="";
	var batchrows = $("#batchdatagrid").datagrid("getSelections");
	if(batchrows!=''){
		batchno=batchrows[0].batchno;
	}
	
	var sampleitemtestids="";
	var selrows = $("#seldatagrid").datagrid("getSelections");
	for(var i=0;i<selrows.length;i++)
	{
		var samplecode =  selrows[i].samplecode;
		var temp = samplecode.substring(samplecode.length-1,samplecode.length);
		
		if(samplecode.indexOf("P")>=0 || temp.indexOf("J")>=0 || samplecode.indexOf("QC")>=0){
			isTrue = true;
			break;
		}
		sampleitemtestids = sampleitemtestids + selrows[i].sampleitemtestid+",";
	}
	if(isTrue){
		alert("标准样不可以向左选！");
		return;
	}
	sampleitemtestids = sampleitemtestids.substring(0,sampleitemtestids.length-1);
		
	if(batchno!=""){
		if(sampleitemtestids!=""){
			var url = "?sampleitemtestid="+sampleitemtestids;
			$.post(
				rootPath + "/sampletest/sampletestbybatch!delBatchno.action"+ url, function(del){
				if (del == 'success') {
					//alert("选择成功!");
					$("#unseldatagrid").datagrid('reload');
					$("#seldatagrid").datagrid('reload');
					$("#unseldatagrid").datagrid("clearSelections");
					$("#seldatagrid").datagrid("clearSelections");
				}else{
					alert("选择失败！");
				}
			});
		}else{
			alert("请选择一个已选样品！")
		}
	}else{
		alert("请选择一个批号！");
	}
}

////设置重复样个数
//function addRep(){
//		var selrows = $("#seldatagrid").datagrid("getSelections");
//		var batchno=selrows[0].batchno;
////		alert(no);
//		var url = rootPath + "/sampletest/sampletestbybatch!toAddRep.action?batchno="+batchno;
//		
//		var _dialog =  window.top.$('<div id ="batch-dlg" style="padding:0px;"><iframe id="batchFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
//		_dialog.dialog({
//		title:"设置重复样数量",
//		autoOpen:false,
//		modal:true,
//		closed:true,
//		width:'300',
//		height:'100',
//		buttons:[{
//			text:'保存',
//			iconCls:'icon-save',
//			handler:function(){			
//				$("#batchFrame",top.document.body).contents().find("#repForm").form('submit',{
//						url:rootPath + '/sampletest/sampletestbybatch!addRep.action',
//						onSubmit:function(){
//							var objs = $("#batchFrame",top.document.body).contents().find(".grkj-validate");
//							
//							if(!saveCheck(objs)){
//								$("#batchFrame",top.document.body).contents().find(":input").focus();
////								$("#batchFrame",top.document.body).contents().find("select").focus();
//								alert("数据输入不符合格式，请查看红色边框的输入框的输入提示！");
//								return false;
//							}
//						},
//						success : function(data) {
//							if (data == 'fail') {
//								alert("设置失败！");
//								return;
//							}
//							if (data == 'success') {
//								_dialog.dialog('close');
//								$("#seldatagrid").datagrid('reload');
//								alert('设置成功！');
//							}
//						}
//					});	
//				}
//			},{
//			text:'取消',
//			iconCls:'icon-cancel',
//			handler:function(){
//				_dialog.dialog('close');
//				}
//			}],
//		onClose:function(){
//				_dialog.dialog("destroy");					
//			}
//		});
//		_dialog.dialog('open');
//}

							
//添加空白样
function addBlankSample(){
	if($("#addBlankSample").attr("disabled")=="disabled"){
		return false;
	}
	if($("#addstandard").attr("disabled")=="disabled"){
		return false;
	}
	if($("#addstandardcheck").attr("disabled")=="disabled"){
		return false;
	}
	
	var sampleitemtestid="";
	var selrows = $("#seldatagrid").datagrid("getSelections");
	if(selrows!=""){//
		sampleitemtestid=selrows[0].sampleitemtestid;
	}
	
	if(sampleitemtestid!=""){
		var url = "?flag=K&sampleitemtestid="+sampleitemtestid+"&qctypeid=4";
		
		$.post(
			rootPath + "/sampletest/sampletestbybatch!addQcSample.action"+ url, function(data) {
			if (data == 'success') {
				alert("添加成功！");
				$("#seldatagrid").datagrid('reload');
//				$("#seldatagrid").datagrid("clearSelections");
			}else{
				alert("添加失败！");
			}
		});
	}else{
		alert("请选择一个已选样品！")
	}
}
//添加平行样
function addParallelSample(){
	if($("#addParallelSample").attr("disabled")=="disabled"){
		return false;
	}
	//if($("#enterstandardw").attr("disabled")=="disabled"){
		//return false;
	//}
	var sampleitemtestid="";
	var selrows = $("#seldatagrid").datagrid("getSelections");
	if(selrows!=""){//
		sampleitemtestid=selrows[0].sampleitemtestid;
	}
	if(sampleitemtestid!=""){		
			//var url = "?sampleitemtestid="+sampleitemtestid+"&flag=P";
//			$.post(
//				rootPath + "/sampletest/sampletestbybatch!isParallelSample.action"+ url, function(data) {
//				if (data == 'yes') {
//					alert("该样品已添加平行样!");
//					$("#seldatagrid").datagrid('reload');
//					$("#seldatagrid").datagrid("clearSelections");
//				}else{
					var url = "?sampleitemtestid="+sampleitemtestid;
					$.post(
						rootPath + "/sampletest/sampletestbybatch!addParallelSample.action"+ url, function(data) {
						if (data == 'success') {
							alert("添加成功！");
							$("#seldatagrid").datagrid('reload');
//							$("#seldatagrid").datagrid("clearSelections");
						}else{
							alert("添加失败！");
						}
					});
//				}
//			});
	}else{
		alert("请选择一个已选样品！")
	}
}



/**
 * 批量添加平行
 */
function addParallel(){  
	var mselected = $("#seldatagrid").datagrid("getSelections"); 
	var	sampleitemtestids="";//样品编号编码   
	//var mselcheck = new Array(); 
	if (mselected != null && mselected != "") { 
		for ( var j = 0;j < mselected.length;j++) {    
			var tempSamid=mselected[j].sampleitemtestid;
			var qctypeid = mselected[j].qctypeid;
			//var k=mselected[j].sampleitemtestid.length;  
			//var temp = sampleitemid.substring(k-1,k);
//			if(temp.indexOf("P")>=0){ 
//				//如果有一个是以P结尾的。无论P的位置在哪里
//			}else{
//				mselcheck.push(sampleitemid);
//			}
			if(qctypeid==''||(qctypeid!='' && qctypeid=='4')){
				sampleitemtestids = sampleitemtestids + tempSamid + ",";
			}
		}
	} 
	//为数组去重复
//	var mres=[],mhash={};
//	for(var k=0,elem;(elem=mselcheck[k])!=null;k++){
//		if(!mhash[elem]){
//			mres.push(elem);
//			mhash[elem]=true;
//		}
//	} 
	//var	sampleitemtestids=mres;//样品编号编码  
	if(sampleitemtestids!=""){ 
		sampleitemtestids = sampleitemtestids.substring(0,sampleitemtestids.length-1);
	 	$.post(
			rootPath + "/sampletest/sampletestbybatch!addParallel.action?sampleitemtestids="+sampleitemtestids, function(data) {
			if (data == 'success') {
				alert("添加成功！");
				$("#seldatagrid").datagrid('reload'); 
			//}else if(data=='exitParallel'){
				//alert("存在已经添加平行样的数据!");
			}else{
				alert("添加失败！");
			}
		});  
	}else{
		alert("请选择一个普通样或空白样！")
	}
}


//添加加标样
function enterstandardw(){
	if($("#addParallelSample").attr("disabled")=="disabled"){
		return false;
	}
	if($("#enterstandardw").attr("disabled")=="disabled"){
		return false;
	}
	var sampleitemtestid="";
	var selrows = $("#seldatagrid").datagrid("getSelections");
	if(selrows!=""){//
		sampleitemtestid=selrows[0].sampleitemtestid;
	}
	var url = "?sampleitemtestid="+sampleitemtestid+"&flag=J";
	$.post(
		rootPath + "/sampletest/sampletestbybatch!isParallelSample.action"+ url, function(data) {
		if (data == 'yes') {
			alert("该样品已添加加标样！");
			$("#seldatagrid").datagrid('reload');
//			$("#seldatagrid").datagrid("clearSelections");
		}else{
			addSample3("添加加标样",sampleitemtestid,"5");
		}
	});
}
//添加标准样
function addstandard(){
	//if($("#addBlankSample").attr("disabled")=="disabled"){
	//	return false;
	//}
	if($("#addstandard").attr("disabled")=="disabled"){
		return false;
	}
	if($("#addstandardcheck").attr("disabled")=="disabled"){
		return false;
	}
	var sampleitemtestid="";
	var selrows = $("#seldatagrid").datagrid("getSelections");
	if(selrows!=""){//
		sampleitemtestid=selrows[0].sampleitemtestid;
	}
	
	addSample2("添加标准样",sampleitemtestid,"7");
	
	
}
//添加校准曲线样
function addstandardcheck(){
	//if($("#addBlankSample").attr("disabled")=="disabled"){
	//	return false;
	//}
	if($("#addstandard").attr("disabled")=="disabled"){
		return false;
	}
	if($("#addstandardcheck").attr("disabled")=="disabled"){
		return false;
	}
	var sampleitemtestid="";
	var selrows = $("#seldatagrid").datagrid("getSelections");
	if(selrows!=""){//
		sampleitemtestid=selrows[0].sampleitemtestid;
	}
	
	addSample("添加校准曲线检查样",sampleitemtestid,"8");
}
//删除样品
function deleteSample(){
	if(window.confirm('是否删除？')){
		if($("#deleteSample").attr("disabled")=="disabled"){
			return false;
		}
		var sampleitemtestid="";
		var selrows = $("#seldatagrid").datagrid("getSelections");
		if(selrows!=""){//
			sampleitemtestid=selrows[0].sampleitemtestid;
		}
		var url = "?sampleitemtestid="+sampleitemtestid;
		$.post(
			rootPath + "/sampletest/sampletestbybatch!deleteSample.action"+ url, function(data) {
			if (data == 'success') {
				alert("删除成功！");
				$("#seldatagrid").datagrid('reload');
	//			$("#seldatagrid").datagrid("clearSelections");
			}else{
				alert("删除失败！");
			}
		});
	}
}

//添加标准样
function addSample2(title,sampleitemtestid,qctypeid){
		var url = rootPath + "/sampletest/sampletestbybatch!toAddQcSample2.action";
		if(sampleitemtestid!=""){
			url = url + "?sampleitemtestid="+sampleitemtestid+"&qctypeid="+qctypeid;
		}
		var _dialog =  window.top.$('<div id ="batch-dlg" style="padding:0px;"><iframe id="batchFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
		_dialog.dialog({
		title:title,
		autoOpen:false,
		modal:true,
		closed:true,
		width:'400',
		height:'250',
		buttons:[{
			text:'保存',
			iconCls:'icon-save',
			handler:function(){			
				$("#batchFrame",top.document.body).contents().find("#qcsampleform").form('submit',{
						url:rootPath + '/sampletest/sampletestbybatch!addQcSample2.action',
						onSubmit:function(){
							var objs = $("#batchFrame",top.document.body).contents().find(".grkj-validate");
							
							if(!saveCheck(objs)){
								$("#batchFrame",top.document.body).contents().find(":input").focus();
//								$("#batchFrame",top.document.body).contents().find("select").focus();
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
								$("#seldatagrid").datagrid('reload');
								alert('添加成功！');
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

//，校准曲线样
function addSample(title,sampleitemtestid,qctypeid){
		var url = rootPath + "/sampletest/sampletestbybatch!toAddQcSample.action";
		if(sampleitemtestid!=""){
			url = url + "?sampleitemtestid="+sampleitemtestid+"&qctypeid="+qctypeid;
		}
		var _dialog =  window.top.$('<div id ="batch-dlg" style="padding:0px;"><iframe id="batchFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
		_dialog.dialog({
		title:title,
		autoOpen:false,
		modal:true,
		closed:true,
		width:'320',
		height:'230',
		buttons:[{
			text:'保存',
			iconCls:'icon-save',
			handler:function(){			
				$("#batchFrame",top.document.body).contents().find("#qcsampleform").form('submit',{
						url:rootPath + '/sampletest/sampletestbybatch!addQcSample.action',
						onSubmit:function(){
							var objs = $("#batchFrame",top.document.body).contents().find(".grkj-validate");
							
							if(!saveCheck(objs)){
								$("#batchFrame",top.document.body).contents().find(":input").focus();
//								$("#batchFrame",top.document.body).contents().find("select").focus();
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
								$("#seldatagrid").datagrid('reload');
								alert('添加成功！');
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


//添加加标样
function addSample3(title,sampleitemtestid,qctypeid){
		var url = rootPath + "/sampletest/sampletestbybatch!toAddQcSample3.action";
		if(sampleitemtestid!=""){
			url = url + "?sampleitemtestid="+sampleitemtestid+"&qctypeid="+qctypeid;
		}
		var _dialog =  window.top.$('<div id ="batch-dlg" style="padding:0px;"><iframe id="batchFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
		_dialog.dialog({
		title:title,
		autoOpen:false,
		modal:true,
		closed:true,
		width:'320',
		height:'230',
		buttons:[{
			text:'保存',
			iconCls:'icon-save',
			handler:function(){			
				$("#batchFrame",top.document.body).contents().find("#qcsampleform").form('submit',{
						url:rootPath + '/sampletest/sampletestbybatch!addQcSample.action',
						onSubmit:function(){
							var objs = $("#batchFrame",top.document.body).contents().find(".grkj-validate");
							
							if(!saveCheck(objs)){
								$("#batchFrame",top.document.body).contents().find(":input").focus();
//								$("#batchFrame",top.document.body).contents().find("select").focus();
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
								$("#seldatagrid").datagrid('reload');
								alert('添加成功！');
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
//审核记录
function showSampleitemrecordDialog(){
	var batchrows = $("#seldatagrid").datagrid("getSelections");
	var itemid=batchrows[0].itemid;
	var samplecode=batchrows[0].samplecode;
	
	if(samplecode!=""){
		var url = rootPath + "/sampletest/itemtestbackrecord!toSampleitemrecordList.action?samplecode="+samplecode+"&itemid="+itemid;
		var _dialog =  window.top.$('<div id ="ds-dlg" style="padding:0px;"><iframe id="dataSourceFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
		_dialog.dialog({
			title:'审核记录',
			autoOpen:false,
			position:'center',
			modal:true,
			closed:true,
			width:'800',
			height:'500',
			onClose:function(){
				_dialog.dialog("destroy");
			}
		});
		_dialog.dialog('open');	
	}else{
		alert("请选择一个样品！");
	}
}

//添加各种质控样
function addQcSample(){
	$("#selectedsampleMane").menu("show", {left: 1000,top: 200});
}
