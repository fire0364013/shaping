$(document).ready(function(){
	//后来修改的，根据chenxz的修改的___author wangjy
	initMonitorinfoTree(flag);
	//刚开始老朱用的没有写成chenxz模样的
	//initMonitorinfo();
});


var projectpointidVal = '';//项目监测点id
var indexrow;
var indexvalue;
var sampleid='';
function initMonitorinfoTree(flag) {
	var flagUrl;
	if(flag=='flag'){ //此处是加载的时候不查询后台，但是要把头儿展示出来。2012-04-11
		flagUrl="";
	}else{
		flagUrl=rootPath +"/sampletest/sample/sampletestbysample!toMonitorinfoSampleTestTree.action?projectid="+projectid;
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
				       // {field:'entname',title:'企业名称',width:300,align : 'center'} ,					
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

function viewProjectMonitor(projectdetail){
	var url = rootPath + "/projects/taskregister/projectmonitorpoint!view.action?str="+projectdetail;	
	var _dialog =  window.top.$('<div id ="monitorplans-dlg" style="padding:0px;"><iframe id="monitorinfoFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
	_dialog.dialog({
	title:'采样详情',
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

var projectcodeVal="";//项目编码
var monitorpointidVal="";//监测点id
var samplecodeVal="";//样品编号
//加载样品信息
function initSampleinfo(projectcode,monitorpointid,flag) {
	var flagUrl;
	if(flag=='flag'){ //此处是加载的时候不查询后台，但是要把头儿展示出来。2012-04-11
		flagUrl="";
		initIteminfo("","","","");
	}else{
		if(projectcode==''){
			projectcode = null;
		}
		if(monitorpointid==''){
			monitorpointid = null;
		}
		flagUrl=rootPath +'/sampletest/sample/sampletestbysample!toSampleTest.action?projectcode='+encodeURI(projectcode)+'&monitorpointid='+encodeURI(monitorpointid);
		initIteminfo("","","","");
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
			idField:"samplecode",
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
				//数据录入需要的参数
				projectcodeVal=projectcode;
				monitorpointidVal=monitorpointid;
				samplecodeVal=rowData.samplecode;
				sampleid = rowData.sampleid;
				//加载仪器类型
				getDeviceType(projectcode,monitorpointid,rowData.samplecode);
				$("#deviceid").html('');
				initIteminfo("","","","");
				$("#samplecodeid").val(samplecodeVal);
			},
			onLoadSuccess:function(data){
				$('#samplelist').datagrid('clearSelections');
				//默认加载第一行的基本信息
				var row = $('#samplelist').datagrid('selectRow',0);
				var rowData = $('#samplelist').datagrid('getSelected');
				
				if(rowData!=null&&rowData!=""){
					//数据录入需要的参数
					projectcodeVal=projectcode;
					monitorpointidVal=monitorpointid;
					samplecodeVal=rowData.samplecode;
					sampleid = rowData.sampleid;
					//加载仪器类型
					getDeviceType(rowData.projectcode,rowData.monitorpointid,rowData.samplecode);
					
					
				}else{
					projectcodeVal="";
					monitorpointidVal="";
					samplecodeVal="";
					sampleid = "";
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
//设置重复样个数
function setRepcount(){
	var batchrows = $("#itemlist").datagrid("getSelections");
	if(batchrows.length>0){
		var url = rootPath + "/sampletest/sampletestbybatch!toAddRep.action?paramid="+batchrows[0].paramid;
		
			var _dialog =  window.top.$('<div id ="batch-dlg" style="padding:0px;"><iframe id="batchFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
			_dialog.dialog({
			title:"设置重复样数量",
			autoOpen:false,
			modal:true,
			closed:true,
			width:'300',
			height:'100',
			buttons:[{
				text:'保存',
				iconCls:'icon-save',
				handler:function(){			
					$("#batchFrame",top.document.body).contents().find("#repForm").form('submit',{
							url:rootPath + '/sampletest/sampletestbybatch!addRep.action',
							onSubmit:function(){
								var objs = $("#batchFrame",top.document.body).contents().find(".grkj-validate");
								
								if(!saveCheck(objs)){
									$("#batchFrame",top.document.body).contents().find(":input").focus();
									alert("数据输入不符合格式，请查看红色边框的输入框的输入提示！");
									return false;
								}
							},
							success : function(data) {
								if (data == 'fail') {
									alert("设置失败！");
									return;
								}
								if (data == 'success') {
									_dialog.dialog('close');
									alert('设置成功！');
									$("#itemlist").datagrid('reload');
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
}

//加载项目信息
function initIteminfo(projectcode,monitorpointid,samplecode,deviceTypeId){
	var vUrl = rootPath +'/sampletest/sample/sampletestbysample!toItemfoParameterEntry.action?flag=1&deviceTypeId='+deviceTypeId+'&samplecode='+samplecode+'&projectcode='+projectcode+'&monitorpointid='+monitorpointid;
	$('#itemlist').datagrid({
		nowrap: false,
		striped: true,
		collapsible:true,
		url:vUrl,
		onLoadSuccess:function(data){
			//加载成功合并行 
			if(data.rows.length>0){
				$("#deviceid").val("");
				//用来显示默认的仪器
				if(data.rows[0].deviceid!=''){
					$("#deviceid").val(data.rows[0].deviceid);
				}
			}
		},
		fit:true,
		fitColumns : true,
		scrollbarSize:0,
		remoteSort: false,
		singleSelect:false,	
		rownumbers:false,
		iconCls:"icon-edit",
		idField:"sampleitemtestid",
		columns:[[
			{field : 'itemid',checkbox : true,align:"center"} ,
			{field:'itemname',title:'项目名称', width:100,align:"center"},
			{field:'methodname',title:'分析方法<img src="'+rootPath+'/themes/icons/mini_edit.png"/>', width:400,align:"center",
				formatter:function(value,rec,rowIndex){
					var str = "<div id=\"methodDiv"+rowIndex+"\">" + value + "</div>";
					return str;
				}
			}
		]],
		onDblClickCell:function(rowIndex, field, value){
				$('#itemlist').datagrid('clearSelections');
				$('#itemlist').datagrid('selectRow',rowIndex);
				
				var rows = $('#itemlist').datagrid('getSelections');				
				if(field =="methodname" && rows[0].itemid!=""){	
					if(indexrow!=null){
						var str = "<div id=\"methodDiv"+indexrow+"\">" +
								indexvalue +
								"</div>";
						$("#methodDiv"+indexrow).html(str);
					}
					$("#methodDiv"+rowIndex).html("");
					methodData(rows[0].itemid,rowIndex,rows[0].sampleitemtestid,rows[0].methodid);
					indexrow = rowIndex;
					indexvalue = value;
				}
		},
		onRowContextMenu:function(e,row,rowData){
			$("#itemlist").datagrid("clearSelections");
			$('#itemlist').datagrid('selectRow',parseInt(row));
			$("#backListMenu").menu("show", {left: e.pageX,top: e.pageY});
			e.preventDefault();
		}
	});
	$(window).resize(function() {
		$("#itemlist").datagrid('resize');
	});
}

//获取方法
function methodData(itemid,index,sampleitemtestid,methodid) {
	var strDeviceid = $("#deviceid").val();
	$.ajax( {
		type : 'GET',
		url : rootPath +'/monitorproject/monitorproject!getMethod.action?itemid='+itemid+'&timeStamp='+new Date().getTime(),//给该url一个时间戳~~这样就必须每次从服务器读取数据,
		//async:false,//同步
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
			$("#methodSel"+index).change(function(){
				var mid = $("#methodSel"+index).val();
				$.ajax( {
					type : 'GET',
					url : rootPath+'/task/sampleitem!updateSampleitem.action?timeStamp='+new Date().getTime(),//给该url一个时间戳~~这样就必须每次从服务器读取数据,
					data : {'itemid':itemid,'sampleitemtestid':sampleitemtestid,'methodid':mid,'deviceid':strDeviceid},
					success : function(data) {
						if(data=='success'){
							alert("修改成功！");
							$("#itemlist").datagrid('reload');
						}else if(data=="fail"){
							alert("请选择方法！");
						}else if(data=="error"){
							alert("修改失败！");
						}	
					}
				});
			});
		}
	});
}	
	
//查看校准曲线
function viewchart(){
	var batchrows = $("#itemlist").datagrid("getSelections");
	var deviceid=batchrows[0].deviceid;
	var itemid=batchrows[0].itemid;
	var	methodid=batchrows[0].methodid;
	var	sampleitemtestid=batchrows[0].sampleitemtestid;
		
	if(methodid!=''){
		$.post(
			rootPath + "/sampletest/sample/sampletestbysample!getCuveidBySampleitemtestid.action?sampleitemtestid="+ sampleitemtestid,
			function(data){
				var url = rootPath + "/curve/devicecalibratecurve!tobatchview.action?deviceid="+deviceid+"&curveid="+data+"&itemid="+itemid+"&methodid="+methodid;//"/curve/devicecalibratecurve!viewcurve.action?curveid="+data;		
				var _dialog = window.top.$('<div id ="dlg" style="padding:0px;"><iframe id="frame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
				_dialog.dialog({
					title:'校准曲线',
					autoOpen:false,
					modal:true,
					closed:true,
					maximizable:true,
					width:'980',
					height:'650',
					onClose:function(){
						_dialog.dialog("destroy");					
					}
				});
				_dialog.dialog('open');
			});	
	}else{
		alert("请给该检验项目添加分析方法！");
	}
}


//弹出附件列表
function addfile() {
	if(samplecodeVal!=""){
		var viewHeight = "462";
		var url = rootPath + "/sampletest/sample/sampletestbysample!toFileList.action?samplecode=" + samplecodeVal;
		var _dialog = window.top.$('<div id ="dlg" style="padding:0px;"><iframe id="frame" width="100%" height="100%" frameborder="0" scrolling="no" src=' + url + '></iframe></div>')
				.appendTo(window.top.document.body);
		_dialog.dialog( {
			title : '数据采集文件',
			autoOpen : false,
			modal : true,
			closed : true,
			width : '800',
			height : viewHeight,
			onClose : function() {
				_dialog.dialog("destroy");
			}
		});
		_dialog.dialog('open');
				
	}else{
		alert("请选择一个样品！");
	}
}
//数据录入
function dataenter(){
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
										
						var features="dialogWidth:"+(window.screen.availWidth-0).toString()+"px;dialogHeight:"+(window.screen.availHeight).toString()+"px;scroll:no;center:yes;resizable:no;status:no;location:no;minimize:yes;";
						
						var sReturn=window.showModalDialog(url,null,features);
						if (typeof(sReturn) != "undefined")
				       	{
							alert("提交成功！");
					        $("#samplelist").datagrid("reload");
						}
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
//环境参数录入
function editEnvParam(){
	var deviceid = $("#deviceid").val();
	if(deviceid!=null){
		var url = rootPath + "/sampletest/envparamvalue!toDataEntryBySample.action?deviceid="+ deviceid + "&samplecode="+samplecodeVal;
		var _dialog =  window.top.$('<div id ="dlg" style="padding:0px;"><iframe id="dataenterFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
		_dialog.dialog({
		title:'环境参数',
		autoOpen:false,
		modal:true,
		closed:true,
		width:'400',
		height:'300',
		buttons:[{
			text:'保存',
			iconCls:'icon-save',
			handler:function(){
				$("#dataenterFrame",top.document.body).contents().find("#form").form('submit',
				{
					url:rootPath + '/sampletest/envparamvalue!saveDataEntryBySample.action',
					onSubmit:function(){
						var objs = $("#dataenterFrame",top.document.body).contents().find(".grkj-validate");
						if(!saveCheck(objs)){
							$("#dataenterFrame",top.document.body).contents().find(":input").focus();
							alert("数据输入不符合格式，请查看红色边框的输入框的输入提示！");
							return false;
						}																			
					},
					success:function(data){
						if(data=='success'){
							alert("保存成功！");
							_dialog.dialog('close');
						}else{
							alert("保存失败！");
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
	}else{
		alert('请选择仪器！');
	}
}
//流程提交
function submitSample(){
	var selected=$("#samplelist").datagrid('getSelections');
	if(selected==null || selected.length< 1){
		alert('请至少选择一个样品！');
	}else{
		var flag=0;
		var samplecode=[];
		for ( var i = 0; i < selected.length; i++) {
			if(samplecode==""){
				samplecode+=selected[i]['samplecode'];
			}else{
				samplecode+=","+selected[i]['samplecode'];
			}
		}//for
//		alert(samplecode);
		$.post(
			rootPath + "/sampletest/sample/sampletestbysample!getSampleitemSizeBySamplecodes.action?samplecodes="+samplecode, 
			function(data) {
				if(data == 'yes')
				{
					alert("您所选的样品中存在未添加分析方法的项目，不能提交！");
					return;
		 		}else if(data == 'no'){
					$.post(
						rootPath + "/sampletest/sample/sampletestbysample!getSampletestresultSizeBySamplecodes.action?samplecodes="+samplecode,
						function(msg){
							if(msg == 'yes')
							{
								alert("您所选的样品中存在未录入数据的项目，不能提交！");
								return;
							}else if(msg == 'no'){
								if(window.confirm('是否提交？'))
						 		{
									//选择复核人
									selRecheckPerson(samplecode);
								}
							}
						}
					);	
				}
			}
		);
	}
}
//选择复核人
function selRecheckPerson(samplecode){
	var url =  rootPath +"/group/departmentgroup!toDeptGroupUser.action";
	var _dialog =  window.top.$('<div id ="role-dlg" style="padding:0px;"><iframe id="oneUserFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
	_dialog.dialog({
	   title:'人员列表',
		autoOpen:false,
		modal:true,
		closed:true,
		width:'400',
		height:'500',
		buttons:[{
			text:'保存',
			iconCls:'icon-save',
			handler:function(){
				var userid=$("#oneUserFrame",top.document.body).contents().find("#selectedUserid").val();
				if(userid!=null&&userid!=''){
					operate(samplecode,userid);	
				}else{
					alert("选择复核人失败！");	
				}				
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

//提交操作(样品编号，复核人)
function operate(samplecode,userid){
//	alert(projectpointidVal+"_"+samplecode+"_"+userid);
	if(window.confirm('是否提交样品?')){
		$.post(
			rootPath + "/sampletest/sample/sampletestbysample!setAllStatus.action",//+samplecode+"&userid="+userid+"&typeid=1",	
			{json:samplecode,userid:userid,projectcode:projectcodeVal,monitorpointid:monitorpointidVal,projectpointid:projectpointidVal},
			function(msg){
				if(msg=="sanmplesuccess"){
					alert('提交成功！');
					$("#samplelist").datagrid('reload');
				}
				else if(msg=="success"){
					alert('提交成功！');
					$(window.parent.document).find("#reloaddata").click();
					$("#monitorinfolist").datagrid('reload');
					$("#samplelist").datagrid('reload');
				}else if(msg=="montiesuccess"){
					alert('提交成功！');
					$("#monitorinfolist").datagrid('reload');
					$("#samplelist").datagrid('reload');
				}
			}
		);
	}
}

//加载仪器类型
function getDeviceType(projectcode,monitorpointid,samplecode){	
	$('#deviceTypeId').html('');
	$.ajax( {
		type : 'POST',
//		async:false,//异步
		url : rootPath+'/sampletest/sample/sampletestbysample!getDeviceTypesByProjectcodeMonitorpointidSamplecodeJson.action?timeStamp='+new Date().getTime(),//给该url一个时间戳~~这样就必须每次从服务器读取数据,
		data : {'projectcode':projectcode,'monitorpointid':monitorpointid,'samplecode':samplecode},
		success : function(data) {//alert(data);
			var vData = eval("(" + data + ")");
			var arr = new Array();
			var lList = "";
			//遍历json数据  
			jQuery.each(vData.rowsData, function(i, n) {
				var temp = n.devicetypename.toString()+"##"+n.devicetypeid.toString();
				arr.push(temp.toString());
			});	
			lList = sortList(arr);
			//绑定数据到仪器类型
			$('#deviceTypeId').append(lList);
		}
	});
}

//加载项目和分析仪器
function getDeviceListByItemidAndMethodJson(obj){
	$('#deviceid').html('');
	//仪器id
	var deviceTypeId = obj.value;	
	var tempDeviceid = "";
	
	//加载项目
	initIteminfo(projectcodeVal,monitorpointidVal,samplecodeVal,deviceTypeId);
	
	tempDeviceid = $("#deviceid").val();
//	alert(tempDeviceid);
	//加载仪器
	if(deviceTypeId!=""){
		$.ajax({
			type : 'POST',
//			async:true,//同步
			url : rootPath+'/sampletest/sample/sampletestbysample!getDeviceByTypeidJson.action?timeStamp='+new Date().getTime(),//给该url一个时间戳~~这样就必须每次从服务器读取数据,
			data : {'deviceTypeId':deviceTypeId},
			success : function(data) {
				var vData = eval("(" + data + ")");
//				var arr = new Array();
				var lList = "<option value=''>---请选择---</option>";
				//遍历json数据  
				jQuery.each(vData.rowsData, function(i, n) {
					if(tempDeviceid!='' && tempDeviceid==n.deviceid){
//						alert(tempDeviceid+"_____"+n.deviceid);
						lList += "<option value=" + n.deviceid + " selected>" + n.devicename	+ "</option>";	
					}else{
						lList += "<option value=" + n.deviceid + ">" + n.devicename	+ "</option>";	
					}
//					var temp = n.devicename.toString()+"##"+n.deviceid.toString();
//					arr.push(temp.toString());
				});		
//				lList = sortList(arr);
				//绑定数据到listLeft
				$('#deviceid').append(lList);
			}
		});
	}
}
	
//给样品项目添加方法，仪器和校准曲线
function updateItemMethod(obj,sampleitemtestid,itemid){
//	alert($("#deviceid").val());
	var strDeviceid = $("#deviceid").val();
	if(strDeviceid==''){
		alert("请选择一个分析仪器！");
		return ;
	}else{
		var methodidVal = obj.value;
		if(methodidVal!='' && sampleitemtestid!=''){
			$.ajax( {
				type : 'GET',
				url : rootPath+'/sampletest/sample/sampletestbysample!updateSampleitem.action?timeStamp='+new Date().getTime(),//给该url一个时间戳~~这样就必须每次从服务器读取数据,
				data : {'itemid':itemid,'sampleitemtestid':sampleitemtestid,'methodid':methodidVal,'deviceid':strDeviceid},
				success : function(data) {
					if(data=='success'){
						alert("保存成功！");
						$("#itemlist").datagrid('reload');
					}else{
						alert("保存失败！");
					}	
				}
			});
		}else{
			alert("分析方法不能为空！");
		}
	}
}

//给样品项目添加仪器和校准曲线
function updateItemDevice(obj){
	var rows = $("#itemlist").datagrid("getRows");
	alert(rows.length);
	var sampleitemtestids = "";
	if(rows!=''){
		for ( var i = 0; i < rows.length; i++) {
			sampleitemtestids = sampleitemtestids+rows[i].sampleitemtestid+",";
		}
	}
	alert(sampleitemtestids);
	var strDeviceid = obj.value;
	if(strDeviceid==''){
		alert("请选择一个分析仪器！");
		return ;
	}else{
		if(sampleitemtestids!=''){
			$.ajax( {
				type : 'GET',
				url : rootPath+'/sampletest/sample/sampletestbysample!updateSampleitems.action?timeStamp='+new Date().getTime(),//给该url一个时间戳~~这样就必须每次从服务器读取数据,
				data : {'sampleitemtestids':sampleitemtestids,'deviceid':strDeviceid},
				success : function(data) {
					if(data=='success'){
						alert("选择成功！");
						$("#itemlist").datagrid('reload');
					}else{
						alert("选择失败！");
					}	
				}
			});
		}else{
			alert("分析方法不能为空！");
		}
	}
}



function getFirstChar(s)
{
	if(s=="")return "";  
	return (s+"").substr(0,1);
}

function compare(str1,str2)
{
	var firstStr1=getGB2312Spell(getFirstChar(str1),"");
	var firstStr2=getGB2312Spell(getFirstChar(str2),"");

	if(firstStr1<firstStr2){
		return -1;
	}else if(firstStr1>firstStr2){
		return 1;
	}else{
		return 0;
	}
}
//对左右列表排序
function sortList(arr){
	var lList = "<option value=''>---请选择---</option>";
	arr.sort(compare);
	for(var i=0;i<arr.length;i++){
		var temp = arr[i].split("##");
		lList += "<option value=" + temp[1] + ">" + temp[0]	+ "</option>";
	}
	return lList;
}

