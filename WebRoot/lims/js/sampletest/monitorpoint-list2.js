//$(document).ready(function(){
////	initMonitorinfo();
////	initIteminfo();
////	initSampleinfo();
//	//后来修改的，根据chenxz的修改的___author wangjy
//	initMonitorinfoTree(flag);
//	//刚开始老朱用的没有写成chenxz模样的
//	//initMonitorinfo();
//});

function initMonitorinfoTree(flag) {
	var flagUrl;
	if(flag=='flag'){ //此处是加载的时候不查询后台，但是要把头儿展示出来。2012-04-11
		flagUrl="";
		initSampleinfo('','',flag);
		initIteminfo('','','',flag);
	}else{
		flagUrl=rootPath +"/sampletest/sample/sampletestbysample!toMonitorinfoDataRecheckTree.action?projectid="+projectid+"&entid="+entid;
	}		
	$('#monitorinfolist').datagrid({
			nowrap: false,
			rownumbers: false,
			fit:true,
			fitColumns : true,
			collapsible:true,
			scrollbarSize : 0,
			url:flagUrl, 
			idField:'projectpointid',
			singleSelect:true,
			columns:[[
						{field:'projectpointid',checkbox:true,align : 'center'} ,	
				        //{field:'entname',title:'企业名称',width:300,align : 'center'} ,					
						{field:'monitortypename',title:'监测点类型',width:120,align : 'center'},
						{field:'monitorpointid',title:'监测点编码',width:120,align : 'center'},
						{field:'itemname',title:'检测项目',width:200,align : 'center'},
						{field:'operate',title:'操作',width:40,align : 'center',
							formatter:function(value,rowData,rowIndex){
								return '<img src="'+rootPath+'/themes/icons/redo.png" alt="监测点" onclick="operateProjectMonitor('+rowData.projectdetail+')"/> ';
							}
						}
				]],
			onClickRow:function(rowIndex,rowData){
		
				//点击一行 加载采样设置信息
			    //$("#monitorinfolist").treegrid('clearSelections');
			    //给项目监测点id赋值
			    projectpointidVal = rowData.projectpointid;
			    if(rowData.projectpointid!=undefined && rowData.projectcode!=undefined){
					initSampleinfo(rowData.projectcode,rowData.monitorpointid,'');
				}else{
					initSampleinfo(null,null,'');
				}
				
			},onLoadSuccess:function(data){
				if(data!=null && data.rows.length>0){
					setTimeout("mergeCellsByField(\"monitorinfolist\",\"projectdetail,monitortypename\")",10)
				}
				if(flag=='flag'){
					initSampleinfo('','',flag);
				}else{
					$('#monitorinfolist').datagrid('clearSelections');
					//默认加载第一行的基本信息
					var row = $('#monitorinfolist').datagrid('selectRow',0);
					var rowData = $('#monitorinfolist').datagrid('getSelected');
					if(rowData!=null&&rowData!=""){
						//给项目监测点id赋值
					    projectpointidVal = rowData.projectpointid;
					    //加载样品列表
						initSampleinfo(rowData.projectcode,rowData.monitorpointid);
					}else{
						$("#parentpointtype").val('');		
						initSampleinfo('','');
					}
				}
			}
	});
	$(window).resize(function() {
		$("#monitorinfolist").datagrid('resize');
	});
}

function operateProjectMonitor(projectdetail){
	var url = rootPath + "/projects/taskregister/projectmonitorpoint!list.action?str="+projectdetail;	
	var _dialog =  window.top.$('<div id ="monitorplans-dlg" style="padding:0px;"><iframe id="monitorinfoFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
	_dialog.dialog({
	title:'监测方案',
	autoOpen:false,
	modal:true,
	closed:true,
	maximizable:true,
	resizable:true,
	width:'900',
	height:'580',
	buttons:[{
		text:'确定',
		iconCls:'icon-save',
		handler:function(){
			_dialog.dialog("close");
			$('#datagrid').datagrid("reload");
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

var projectcodeVal="";
var monitorpointidVal="";
var samplecodeVal="";			
//加载样品信息
function initSampleinfo(projectcode,monitorpointid,flag) {
	var flagUrl;
	if(flag=='flag'){ //此处是加载的时候不查询后台，但是要把头儿展示出来。2012-04-11
		flagUrl="";
	}else{
		if(projectcode==''){
			projectcode = null;
		}
		if(monitorpointid==''){
			monitorpointid = null;
		}
		flagUrl=rootPath +'/sampletest/sample/sampletestbysample!toSampleDataRecheck.action?projectcode='+encodeURI(projectcode)+'&monitorpointid='+encodeURI(monitorpointid);
	}
		
	$('#samplelist').datagrid({
		nowrap: false,
		striped: true,
		collapsible:true,
		url:flagUrl,
		fit : true,
		fitColumns : true,
		scrollbarSize : 0,
		remoteSort:false,
		singleSelect:true,
		//idField:"samplecode",
		rownumbers:false,
		frozenColumns:[[
						{field:'sc',hidden:true,align:"center"},
						{field:'samplecode',title:'样品编号', width:150,align:"center"}
					 ]],
		columns:[[
					//{field:'samplename',title:'样品名称', width:150,align:"center"},
					{field:'status',title:'状态', width:100,align:"center"},
					{field:'monitorfrequency',title:'监测频次', width:80,align:"center"},
					{field:'monitordays',title:'监测天数', width:80,align:"center"},
					//{field:'qcSampleType',title:'质控类型', width:100,align:"center"},
					//{field:'',title:'关联样品编号', width:60,align:"center"},					
					//{field:'samplingperson',title:'采样人', width:180,align:"center"},
					{field:'samplingcount',title:'样品数量', width:80,align:"center"},	
					{field:'samplingstartdate',title:'开始日期', width:100,align:"center"},
					{field:'samplingstarttime',title:'开始时间', width:100,align:"center"},
					//{field:'samplingenddate',title:'结束日期', width:80,align:"center"},
					//{field:'samplingendtime',title:'结束时间', width:80,align:"center"},
					{field:'charaderistic',title:'样品特征', width:120,align:"center"}
					
					
			]],
		onClickRow:function(rowIndex, rowData){
			//点击一行加载项目信息
			$("#samplelist").datagrid('clearSelections');
			$("#samplelist").datagrid('selectRow',rowIndex);
			//先清空
//			projectcode="";
//			monitorpointid="";
//			samplecode="";
			//数据录入需要的参数
			projectcodeVal=projectcode;
			monitorpointidVal=monitorpointid;
			samplecodeVal=rowData.samplecode;
			initIteminfo(rowData.projectcode,rowData.monitorpointid,rowData.samplecode,'');
		},
		onLoadSuccess:function(data){
			$('#samplelist').datagrid('clearSelections');
			//默认加载第一行的基本信息
			var row = $('#samplelist').datagrid('selectRow',0);
			var rowData = $('#samplelist').datagrid('getSelected');
			
			if(rowData!=null&&rowData!=""){
//				psampleid = rowData.sampleid;
				initIteminfo(rowData.projectcode,rowData.monitorpointid,rowData.samplecode,'');
				//数据录入需要的参数
				projectcodeVal=projectcode;
				monitorpointidVal=monitorpointid;
				samplecodeVal=rowData.samplecode;
//				alert(projectcode+"---"+monitorpointid+"---"+samplecode);
			}else{
				projectcodeVal="";
				monitorpointidVal="";
				samplecodeVal="";
				initIteminfo("","","",'');
			}
		},onRowContextMenu:function(e,row,rowData){
			$("#samplelist").datagrid("clearSelections");
			$('#samplelist').datagrid('selectRow',parseInt(row));
			$("#zhuiSuMenu").menu("show", {left: e.pageX,top: e.pageY});
			e.preventDefault();
		}
	});
	
	$(window).resize(function() {
		$("#samplelist").datagrid('resize');
	});
	$("#rightFrame").resize(function() {
		$("#samplelist").datagrid('resize');
	});
		
}

//数据追溯
function showDataSourceDialog(){
	var batchrows = $("#samplelist").datagrid("getSelections");
	var deviceid=batchrows[0].deviceid;
	var samplecode=batchrows[0].samplecode;
	
	if(deviceid!=""){
		var url = rootPath + "/sampletest/sample/sampletestbysample!toShuJuZhuiSuList.action?samplecode="+samplecode;//+"&deviceid="+deviceid;
		var _dialog =  window.top.$('<div id ="ds-dlg" style="padding:0px;"><iframe id="dataSourceFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
		_dialog.dialog({
			title:'数据追溯',
			autoOpen:false,
			position:'center',
			modal:true,
			closed:true,
			width:'895',
			height:'600',
			onClose:function(){
				_dialog.dialog("destroy");
			}
		});
		_dialog.dialog('open');	
	}else{
		alert("无仪器使用记录！");
	}
}

//审核记录
function showSampleitemrecordDialog(){
	var batchrows = $("#itemlist").datagrid("getSelections");
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
/*数据复核
function dataRecheck(){
	var batchrows = $("#samplelist").datagrid("getSelections");
	var samplecode = batchrows[0].samplecode;
	var projectcode = batchrows[0].projectcode;
	var monitorpointid = batchrows[0].monitorpointid;
	if(samplecode!=""){
		var url = rootPath + "/sampletest/sample/sampletestbysample!toDataRecheck.action";
		url = url + "?samplecode="+samplecode;
		
		var _dialog =  window.top.$('<div id ="dlg" style="padding:0px;"><iframe id="dataenterFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
		_dialog.dialog({
		title:'提交签发',
		autoOpen:false,
		maximizable:true,
		modal:true,
		closed:true,
		width:'900',
		height:'600',
//		buttons:[{
//			text:'保存',
//			iconCls:'icon-save',
//			handler:function(){
//			
//			}
//		},{
//			text:'取消',
//			iconCls:'icon-cancel',
//			handler:function(){
//				_dialog.dialog('close');
//				}
//		}],
		onClose:function(){
				_dialog.dialog("destroy");
				$("#samplelist").datagrid('reload');
				initMonitorinfo();//initSampleinfo(projectcode,monitorpointid);
			}
		});
		_dialog.dialog('open');
		
	}else{
		alert("请选择一个样品！");
	}
}*/
//加载项目信息
function initIteminfo(projectcode,monitorpointid,samplecode,flag) {
	var flagUrl;
	if(flag=='flag'){ //此处是加载的时候不查询后台，但是要把头儿展示出来。2012-04-11
		flagUrl="";
	}else{
		flagUrl=rootPath +'/sampletest/sample/sampletestbysample!toItemfoParameterRecheck.action?samplecode='+samplecode+'&projectcode='+projectcode+'&monitorpointid='+monitorpointid;
	}
//	alert(projectcode+"---"+monitorpointid+"---"+samplecode);
	$('#itemlist').datagrid({
		nowrap: false,
		striped: true,
		collapsible:true,
		url:flagUrl,
//		onLoadSuccess:function(data){
//			if(data.rows.length>0){
//				setTimeout("mergeCellsByField(\"itemlist\",\"sampleitemtestid,itemname,methodname\")",1)
//			}
//		},
		fit:true,
		fitColumns : true,
		scrollbarSize:0,
		remoteSort: false,
		singleSelect:true,	
		rownumbers:false,
		iconCls:"icon-edit",
//		idField:"sampleitemtestid",
		columns:[[
			{	
				field : 'sampleitemtestid',
				title : '&nbsp;',
				width : 30,
				align : 'center',
				formatter : function(value){
					return "<input type='radio' name='radio'/>";
				}
			},
			{field:'itemname',title:'项目名称', width:150,align:"center"},
			{field:'methodname',title:'方法名称', width:250,align:"center"}/*,
			{field:'paramname',title:'参数名称', width:120,align:"center"},	
			{field:'paramvalue',title:'参数值', width:80,align:"center"}*/
		]],
		onRowContextMenu:function(e,row,rowData){
			$("#itemlist").datagrid("clearSelections");
			$('#itemlist').datagrid('selectRow',parseInt(row));
			$("#backListMenu").menu("show", {left: e.pageX,top: e.pageY});
			e.preventDefault();
		},
		onSelect:function(rowIndex,rowData){
			$($("input[type=radio]")[rowIndex]).attr("checked",true);
		}
	});
	$(window).resize(function() {
		$("#itemlist").datagrid('resize');
	});
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

//流程提交
function fuHeYangPinTiJiao11111(){
	var rows = $('#itemlist').datagrid('getSelections');
	if(rows!=null && rows.length>0){
		var sampleitemtestid="";
		for(var i=0;i<rows.length;i++){
			//这个if else 是为了构造  a,b,c,d,e,f  这样的结构
			if(sampleitemtestid==""){
				sampleitemtestid = rows[i].sampleitemtestid;
			}else{
				sampleitemtestid = sampleitemtestid+","+rows[i].sampleitemtestid;
			}
		}
		$.post(
			rootPath + "/sampletest/sample/sampletestbysample!setAllStatusByRecheck.action",	
		 	{json:sampleitemtestid,typeid:1},		
			function(msg){
				if(msg=='success'){
					alert("提交成功！");
					//$("#itemlist").datagrid('reload');
					//$("#samplelist").datagrid('reload');
					//$("#monitorinfolist").datagrid('reload');
					//$(window.parent.initProjectDatagrid());
					$(window.parent.document).find("#reloaddata").click();
				}else{
					alert("提交失败！");
				}
			}
		);
	}else{
		alert('请至少选择一个项目！');
	}
}

//数据复核
function fuHeYangPinTiJiao(){
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
//			itemids += rows[i].itemid;
		}
	}
		//alert(samplecodeVal2);			
	var url = rootPath + '/sampletest/sample/sampletestbysample!toDataEntry2.action?samplecode='+samplecodeVal2+'&deviceid='+deviceid+'&sampleitemtestids='+sampleitemtestids+'&timeStamp='+new Date().getTime();
					
	var features="dialogWidth:"+(window.screen.availWidth-0).toString()+"px;dialogHeight:"+(window.screen.availHeight).toString()+"px;scroll:no;center:yes;resizable:no;status:no;location:no;minimize:yes;";
	
	var sReturn=window.showModalDialog(url,null,features);
	if (typeof(sReturn) != "undefined")
   	{//alert(sReturn);
		//sampleitemsuccess,samplesuccess,monitorpointsuccess,projectsuccess
       /*if(sReturn=="sampleitemsuccess"){
        	alert("提交成功！");
        	closeSampleitemDialog();
       }else if(sReturn=="samplesuccess"){
        	alert("提交成功！");
        	closeSampleDialog();
       }else if(sReturn=="monitorpointsuccess"){
        	alert("提交成功！");
        	closeMonitorpointDialog();
       }else if(sReturn=="projectsuccess"){*/
        	alert("成功！");
        	$("#samplelist").datagrid("reload");
        	//$(window.parent.closeProjectDialog());  
       //}
	}
}
//退回
function tuiHui(){
	var rows = $('#itemlist').datagrid('getSelections');
	if(rows!=null && rows.length>0){
		var sampleitemtestid="";
		for(var i=0;i<rows.length;i++){
			//这个if else 是为了构造  a,b,c,d,e,f  这样的结构
			if(sampleitemtestid==""){
				sampleitemtestid = rows[i].sampleitemtestid;
			}else{
				sampleitemtestid = sampleitemtestid+","+rows[i].sampleitemtestid;
			}
		}
		checkFuntion(sampleitemtestid);
	}else{
		alert('请至少选择一个项目！');
	}	
}
//进入评审意见页面(公用的，并不是按批的专用页面，只是放BatchAction类里)
function checkFuntion(temp){	
//	var url = rootPath + "/sampletest/batch/batch!opinionDlg.action";原始数据按批复核退回意见 
	var str =encodeURI(encodeURI("原始数据按样品复核退回意见"));
	var url = rootPath + "/projects/appraiseopinion/appraiseopinion!opinionDlg.action?moduleid="+str;
	var _dialog =  window.top.$('<div id ="dlg" style="padding:0px;"><iframe id="dlgFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
	_dialog.dialog({
	title:'复核退回',
	autoOpen:false,
	modal:true,
	closed:true,
	width:'520',
	height:'220',
	buttons:[{
		text:'确定',
		iconCls:'icon-ok',
		handler:function(){
			var objs = $("#dlgFrame",window.top.document).contents().find(".grkj-validate");	
			var message = $("#dlgFrame",window.top.document).contents().find("#opinion").val();
			if(!saveCheck(objs)){
				$("#dlgFrame",window.top.document).contents().find(":input").focus();
				alert("数据输入不符合格式，请查看红色边框的输入框的输入提示！");
				return false;
			}
			operate(temp,message);
			
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
function operate(temp,message){
	$.post(
		rootPath + "/sampletest/sample/sampletestbysample!setAllStatusByRecheck.action",	
        {json:temp,backperson:message,typeid:2},
		function(msg){
			if(msg=='success'){
				alert("退回成功！");
//				$("#itemlist").datagrid('reload');
//				$("#samplelist").datagrid('reload');
//				$("#monitorinfolist").datagrid('reload');
				$(window.parent.document).find("#reloaddata").click();
			}else{
				alert("退回失败！");
			}
		}
	);
}