$(document).ready(function() {
	initDataGridtree();
});
var batchItemidVal="";//全局变量，添加批次用到
// 页面加载，待检测项目列表
function initDataGridtree (){
		var pid = $("#projectcode").val();
		$('#datagrid').tree({
			url: rootPath+"/spot/samplingdatarecheck/originaent!sampleitemListnew.action?projectcode="+pid,
			onClick:function(node){
			$("#del").show();
				var deviceUrl="";
				var myurl="";
				var itemstr="";
				var flagUrl="";
				var entid="";
				var lxid="";
				var rq="";
				var dnode=$('#datagrid').tree('getNode',node.target);
				if(dnode!=null){
						itemstr=encodeURI(node.attributes);
						if(itemstr=='entid'){
							entid = node.id;
							flagUrl=rootPath+'/spot/samplingdatarecheck/originaent!sampleitemListMethod.action?projectcode='+pid+'&entid='+entid;
						}else if(itemstr=='lx'){
							lxid = node.id;
							var parentnode=$('#grouptree').tree('getParent',node.target);
							entid =parentnode.id;
							flagUrl=rootPath+'/spot/samplingdatarecheck/originaent!sampleitemListMethod.action?projectcode='+pid+'&entid='+entid+'&lx='+lxid;
						}else if(itemstr=='rq'){
							var parentnode=$('#grouptree').tree('getParent',node.target);
							lxid =parentnode.id;
							var parentnode1=$('#grouptree').tree('getParent',parentnode.target);
							entid =parentnode1.id;
							rq=node.id;
							flagUrl=rootPath+'/spot/samplingdatarecheck/originaent!sampleitemListMethod.action?projectcode='+pid+'&entid='+entid+'&lx='+lxid+'&cydate='+rq;
						}
						initxmDataGrid(flagUrl);
						initDataGridtree1 ();
						toentydata(pid,entid,lxid,rq);
				}
				$("#itemtable").show();$("#usertable").show();
				$("#itemtypeid").val("");$("#itemname").val("");$("#realname").val("");
			}
		});
		//clicknode(rootPath+"/group/departmentgroup!showUserGroup.action);
	};	
function initDataGridtree1 (){
	$('#day_health').datagrid({
               // url:  rootPath+"/spot/samplingdata/originaent!getStr.action",
                pagination: false,
                total: 2000,
                pageSize: 10,
                pageList: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
                rownumbers: true,
                fit: true,        //自动大小
                fitColumns: false, //自适应列宽
                //singleSelect: true,  //是否单选
                idField: 'sampid',
                frozenColumns:[[
			      {field:'sampid',align : 'center',width : 30,hidden:true},
	        	  {field:'mpid',title:'监测点编码',width:80,align : 'center'},
				  {field:'mpname',title:'监测点名称',width:80,align : 'center'},
				  {field:'samplecode',title:'样品编号',width:60,align : 'center'},
				  {field:'cydate',title:'采样日期',width:80,align : 'center'},
				  {field:'cytime',title:'采样时间',width:60,align : 'center'},
				  {field:'samplename',title:'样品名称',width:80,align : 'center'},
				  {field:'qctype',title:'质控类型',width:80,align : 'center'},
				  {field:'sampitemtestid',align : 'center',width : 30,hidden:true}
				]]
//				,onClickRow:function(rowIndex, rowData){
//				$("#day_health").datagrid("beginEdit",rowIndex);
//				}
            });
			$(window).resize(function() {
				$("#day_health").datagrid('resize');
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
		flagUrl=rootPath+'/spot/samplingdatarecheck/originaent!unSelSampleitemList.action?itemid='+itemidVal;
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
			fitColumns : true,
			scrollbarSize : 0,
			singleSelect:false,
			idField:'sampleitemtestid',	
			columns : [ [
				{
					field:'sampleitemtestid',
					checkbox:true,
					align : 'center'
				},
				{
					field : 'samplecode',
					title : '样品编号',
					width : 150,
					align : 'center'
				},
				{
					field : 'samplename',
					title : '样品名称',
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
				},
				{
					field : 'itemname',
					title : '监测点名称',
					width : 120,
					align : 'center'
				}
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
function seldatagrid(itemidVal,batchno,flag,star) {
	var flagUrl;
	if(flag=='flag'){ //此处是加载的时候不查询后台，但是要把头儿展示出来。2012-04-11
		flagUrl="";
	}else{
		flagUrl=rootPath+'/spot/samplingdatarecheck/originaent!selSampleitemList.action?itemid='+star+"&batchno="+batchno;
	}
		$('#seldatagrid').datagrid(
		{
			nowrap : false,
			striped : true,
			collapsible : true,
			url : flagUrl, 
			sortName : '',//'samplecode',
			sortOrder : '',
			remoteSort : false,						
			fit : true,
			fitColumns : true,
			scrollbarSize : 0,
			singleSelect:false,
			//idField:'sampleitemtestid',	
			columns : [ [
				{
					field:'sampleitemtestid',
					checkbox:true,
					align : 'center'
				},
				{
					field : 'samplecode',
					title : '样品编号',
					width : 190,
					align : 'center'
				},
				{
					field : 'samplename',
					title : '样品名称',
					width : 150,
					align : 'center'
				},
				{
					field : 'qcsampletypename',
					title : '质控类型',
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
				},
				{
					field : 'itemname',
					title : '监测点名称',
					width : 120,
					align : 'center'
				}
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
				//点击某一行添加空白样，质控样，校准曲线检查样的任意一个，都可以添加其他两项（空白样，质控样，校准曲线检查样中两项），
				//点击添加平行样和加标样时，只能给原样品（非质控样）添加该两项，并且一个原样品只能添加一次（平行样和加标样），
				//QC开头的属于某个批次的样品，不属于某个任务的
				//if(psamcode==''){//父样品为空,有原样品，质控样，空白样，校准曲线样	
				if(qctypeid!=''){
				  /*4	空白样	2
					5	加标样	2
					6	平行样	2
					7	质控样	2
					8	校准曲线检查样	2*/
					if(qctypeid=='4'){
						//添加空白样
						//$('#addBlankSample').removeAttr("disabled");
						//$('#addBlankSample').removeClass("disable");
						//添加质控样
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
						//质控样品删除
						$('#deleteSample').removeAttr("disabled");
						$('#deleteSample').removeClass("disable");
					}if(qctypeid=='7' ||qctypeid=='8'){
						//添加空白样
						//$('#addBlankSample').removeAttr("disabled");
						//$('#addBlankSample').removeClass("disable");
						//添加质控样
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
						//质控样品删除
						$('#deleteSample').removeAttr("disabled");
						$('#deleteSample').removeClass("disable");
					}else if(qctypeid=='5'){	
						//添加空白样,可操作
						//$('#addBlankSample').removeAttr("disabled");
						//$('#addBlankSample').removeClass("disable");
						//添加质控样
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
						//质控样品删除
						$('#deleteSample').removeAttr("disabled");
						$('#deleteSample').removeClass("disable");
					}else if(qctypeid=='6'){
						//添加空白样,不可操作
						//$('#addBlankSample').removeAttr("disabled");
						//$('#addBlankSample').removeClass("disable");
						//添加质控样
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
						
						//质控样品删除
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
					//添加质控样
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
						rootPath + "/spot/samplingdatarecheck/originaent!addParallelSample.action"+ url, function(data) {
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
//添加质控样
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
	
	addSample2("添加质控样",sampleitemtestid,"7");
	
	
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

//添加质控样
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


function initxmDataGrid(flagUrl) {
	$('#batchdatagrid').datagrid(
		{
			nowrap : false,
			striped : true,
			collapsible : true,
			url : flagUrl,
			sortName : 'item',
			sortOrder : 'asc',
			remoteSort : false,						
			fit : true,
			fitColumns : true,
			scrollbarSize : 0,
			singleSelect:false,
			singleSelect:true,
			idField:'item',	
			columns : [ [
				{field : 'pid',
						title : '&nbsp;',
						width : 15,
						align : 'center',
						checkbox:true
				 },
//				{
//					field:'batchno2',
//					checkbox:true,
//					align : 'center'
//				},
				{
					field : 'entname',
					title : '企业',
					width : 50,
					align : 'center'
				},
				{
					field : 'mpname',
					title : '监测点',
					width : 50,
					align : 'center'
				},
				{
					field : 'mptname',
					title : '类型',
					width : 50,
					align : 'center'
				},
				{
					field : 'itemname',
					title : '项目',
					width : 50,
					align : 'center'
				},	
				{field:'itemmethod',title:'分析方法<img src="'+rootPath+'/themes/icons/mini_edit.png"/>', width:120,align:"center",
					formatter:function(value,rec,rowIndex){
						var str = "<div id=\"methodDiv"+rowIndex+"\">" +
								value +
								"</div>";
						return str;
					}
				},
				{field:'feename',title:'分析仪器 <img src="'+rootPath+'/themes/icons/mini_edit.png"/>', width:70,align:"center",
					formatter:function(value,rec,rowIndex){
						var str = "<div id=\"feeDiv"+rowIndex+"\">" +
								value +
								"</div>";
						return str;
					}},
				{
					field : 'cydate',
					title : '采样日期',
					width : 80,
					align : 'center',
					hidden:true
				},
				{
					field : 'mpid',
					title : '监测点id',
					width : 50,
					align : 'center',
					hidden:true
				},
				{
					field : 'mptid',
					title : '监测点类型id',
					width : 50,
					align : 'center',
					hidden:true
				},{
					field : 'itemid',
					title : '项目id',
					width : 50,
					align : 'center',
					hidden:true
				},{
					field : 'methodid',
					title : '方法id',
					width : 50,
					align : 'center',
					hidden:true
				},{
					field : 'devid',
					title : '仪器id',
					width : 50,
					align : 'center',
					hidden:true
				}
			] ]
		});
		$(window).resize(function() {
			$("#batchdatagrid").datagrid('resize');
		});
		$("#jiance").resize(function(){
			$("#batchdatagrid").datagrid('resize');
		});
}
function samplingFeeData(itemid,index,pid,methodid,feename,mpid,mptid,cydate,entid) {
		$.ajax( {
			type : 'GET',
			url : rootPath +'/spot/samplingdata/originaent!getDev.action?itemid='+itemid+'&methodid='+methodid+'&timeStamp='+new Date().getTime(),//给该url一个时间戳~~这样就必须每次从服务器读取数据,
			async:false,//同步
			success : function(data) {
				var vData = eval("(" + data + ")");
				var lList = "<select id=\"feeSel"+index+"\" style=\"width:100%\">";
					lList += "<option value=''>---请选择---</option>";
				//遍历json数据  
				jQuery.each(vData.rowsData, function(i, n) {
					if(n.feename == feename){
						lList += "<option value=" + n.feevalue + " selected>" + n.feename	+ "</option>";
					}else{
						lList += "<option value=" + n.feevalue + ">" + n.feename	+ "</option>";
					}
				});			
				lList += "</select>";
				//绑定数据到listLeft
				$("#feeDiv"+index).append(lList);
				//绑定改变事件
				$("#feeDiv"+index).change(function(){
					var feevalue = $("#feeSel"+index).val();
					var feename = '';
					if(feevalue!=''){
						feename = $("#feeSel"+index+" option:selected").text();
					}
					$.ajax( {
						type : 'GET',
						url : rootPath +'/spot/samplingdata/originaent!updateDev.action?feevalue='+feevalue+'&itemids='+itemid+'&methodid='+methodid+'&pid='+pid+'&mpid='+mpid+'&mptid='+mptid+'&cydate='+cydate+'&entid='+entid+'&timeStamp='+new Date().getTime(),//给该url一个时间戳~~这样就必须每次从服务器读取数据,
						async:false,//同步
						success : function(data) {
							if(data=="success"){
//								alert("修改成功！");
								$("#batchdatagrid").datagrid('reload');
							}else if(data=="fail"){
								alert("请选择方法！");
							}else{
								alert("修改失败！");
							}
						}
					});
				});
				$("#feeSel"+index).blur(function(){
					$("#selectDiv").remove();
					$("#feeDiv"+index).html(feename);
				});
			}
		});
	}
	
	//获取方法
function methodData(itemid,index,pid,methodid,cellvalue,mpid,mptid,cydate,entid) {
		$.ajax( {
			type : 'GET',
			url : rootPath+'/spot/samplingdatarecheck/originaent!getMethod.action?itemids='+itemid+'&timeStamp='+new Date().getTime(),//给该url一个时间戳~~这样就必须每次从服务器读取数据,
			async:false,//同步
			success : function(data) {
				var vData = eval("(" + data + ")");
				var lList = "<select id=\"methodSel"+index+"\" style=\"width:100%\">";
					//lList += "<option value=''>---请选择---</option>";
				//遍历json数据  
				jQuery.each(vData.rowsData, function(i, n) {
					if(n.methodid==methodid){
						lList += "<option value=" + n.methodid + " selected>" + n.methodname	+ "</option>";
					}else{
						lList += "<option value=" + n.methodid + ">" + n.methodname	+ "</option>";
					}
				});			
				lList += "</select>"
				//绑定数据到listLeft
				$("#methodDiv"+index).append(lList);
				//绑定改变事件
				//updateMethod(index,sampleitemid);
				$("#methodSel"+index).change(function(){
					var mid = $("#methodSel"+index).val();
					$.ajax( {
						type : 'GET',
						url :rootPath+'/spot/samplingdatarecheck/originaent!updateMethod.action?itemids='+itemid+'&methodid='+mid+'&pid='+pid+'&mpid='+mpid+'&mptid='+mptid+'&cydate='+cydate+'&entid='+entid+'&timeStamp='+new Date().getTime(),//给该url一个时间戳~~这样就必须每次从服务器读取数据,
						async:false,//同步
						success : function(data) {
							if(data=="success"){
//								alert("修改成功！");
								$("#batchdatagrid").datagrid('reload');
							}
							if(data=="fail"){
								alert("请选择方法！");
							}
							if(data=="error"){
								alert("修改失败！");
							}
						}
					});
				});
				
				$("#methodSel"+index).blur(function(){
					$("#selectDiv").remove();
					$("#methodDiv"+index).html(cellvalue);
				});
			}
		});
	}
	
	
function toentydata(pid,entid,lxid,rq){   
    $.ajax( {
		type : 'POST',
		url : rootPath+"/spot/samplingdatarecheck/originaent!getStr.action?pid="+pid+"&entid="+entid+"&lxid="+lxid+"&rq="+rq,
		async:false,//同步
		success : function(data) { 
	    	var vData = eval("(" + data + ")");
	        var options = $("#day_health").datagrid("options");   //取出当前datagrid的配置      
	        options.columns = vData.columns;                      //添加服务器端返回的columns配置信息    
	        $("#day_health").datagrid(options);
	        $("#day_health").datagrid('loadData',vData.rows);           
	        $("#day_health").datagrid("load") ;                 //获取当前页信息
	        $("#canitem").val(vData.canitem);
    }});   
}   
	
function savedata(){

	var can = $("#canitem").val();
	var updatestr = '';
	var rows = $('#day_health').datagrid('acceptChanges');
	var data = $('#day_health').datagrid('getRows');
	var jsons = JSON.stringify(data);
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
	$.post(rootPath+"/spot/samplingdatarecheck/originaent!getSavedata.action",
		{jsonstr:jsons,can:can},
		function(data) { 
			jQuery.unblockUI();
	    	alert('完成'); 
	    	location.reload();
    });
}

function totj(){
	var rows = $('#batchdatagrid').datagrid('getSelections');
	var pid = "";
	var mpid="";
	var entid = "";
	if(rows.length>0){
		pid = rows[0].pid;
		entid = rows[0].entid;
		for(var i=0;i<rows.length;i++){
			mpid =mpid+","+rows[i].mpid;
		}
	$.post(rootPath+"/spot/samplingdatarecheck/originaent!getSampletestresultSize.action",{pid:pid,mpid:mpid},
						function(msg){
							if(msg == 'yes')
							{
								alert("当前批次中存在未录入数据的样品，不能提交！");
								return;
							}else if(msg == 'no'){
									 operate(pid,mpid,entid,'','提交');
							}
						}
					);
	}else{
		alert('没有可提交的数据');
	}
}

function toth(){
	var rows = $('#batchdatagrid').datagrid('getSelections');
	var pid = "";
	var mpid="";
	var entid = "";
	if(rows.length>0){
		pid = rows[0].pid;
		entid = rows[0].entid;
		for(var i=0;i<rows.length;i++){
			mpid =mpid+","+rows[i].mpid;
		}
	operate(pid,mpid,entid,'','退回');
	}
}

//提交操作(批号，复核人)
function operate(pid,mpid,entid,userid,actionname){
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
	$.post(rootPath+"/spot/samplingdatarecheck/originaent!setAllStatus.action",{pid:pid,mpid:mpid,userid:userid,entid:entid,actionname:actionname},				
		function(msg){
			if(msg=='success'){
				jQuery.unblockUI();
				alert("提交成功！");
				location.reload();
			}else{
				jQuery.unblockUI();
				alert("提交失败！");
				location.reload();
			}
		}
	);
}
	

