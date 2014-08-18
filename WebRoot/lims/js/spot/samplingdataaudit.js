var idfild=[];
var departid="";
var groupid="";
var monitortypeid = '';
var projectcode ="";
function initDataGrid(){
	$('#datagrid').datagrid({
		singleSelect:true,
		width:'400',
		height:'400',
		nowrap: false,
		striped: true,
		collapsible:true,
		url:rootPath + '/spot/samplingdataaudit/samplingdataaudit!taskList.action?stauts='+$("#taskStatus").val(),
		fit:true,
		border:true,
		fitColumns:false,
		scrollbarSize:0,
		idField:'projectcode',	
		frozenColumns : [[
			{field:'checkbox',checkbox:true,align : 'center'},
	        {field:'projectcode',title:'流水号',width:40,align : 'center'},
	        {field:'projectrealcode',title:'项目编号',width:100,align : 'center'}
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
			$("#datagrid").datagrid("clearSelections");
			$('#datagrid').datagrid('selectRow',parseInt(row));
			$("#taskContextMenu").menu("show", {left: e.pageX,top: e.pageY});
			rowProjectidVal = rowData.projectid;
			parenttype= rowData.parenttype;
			e.preventDefault();
		},
		onSelect:function(rowIndex,rowData){
			projectcode = rowData.projectcode;
			if(rowData.spotFlag=="true"){
				$("#data").show();	
			}else{
				$("#data").hide();
			}
			if(rowData.envFlag=="true"){
				$("#env").show();	
			}else{
				$("#env").hide();
			}
			if(rowData.deviceFlag=="true"){
				$("#device").show();	
			}else{
				$("#device").hide();
			}
			$("#projectcode").val(rowData.projectcode);
			initMonitorinfo(rowData.projectcode,rowData.entid);
		}
	});
	$(window).resize(function(){
		$("#datagrid").datagrid('resize');
	});
	$("#renwu").resize(function(){
		$("#datagrid").datagrid('resize');
	});
}


//项目监测企业
function initMonitorinfo(){	
	$('#monitorinfolist').datagrid({
		singleSelect:true,
		nowrap: false,
		striped: true,
		collapsible:true,
		url: rootPath + "/spot/samplingdataaudit/samplingdataaudit!detailList.action?projectcode="+projectcode,
		fit:true,
		fitColumns:true,
		scrollbarSize:0,
		idField:'projectdetail',	
		columns:[[
			{field:'projectdetail',checkbox:true,align : 'center'} ,	
	        {field:'entname',title:'企业名称',width:200,align : 'center'} ,					
			{field:'monitortypename',title:'监测点类型',width:120,align : 'center'},
			{field:'monitorname',title:'监测点',width:150,align : 'center'},
//			{field:'itemname',title:'检测项目',width:200,align : 'center'},
			{field:'methodname',title:'采样方法', width:80,align:"center"},
			{field:'operate',title:'采样仪器',width:70,align : 'center',
				formatter:function(value,rowData,rowIndex){
					return '<img src="'+rootPath+'/images/globe.gif" onclick="diviceRecord(\''+rowData.monitorpointid+'\');"/> ';
				}
			}
		]],onLoadSuccess:function(data){
			if(data.rows.length>0){
				setTimeout("mergeCellsByField(\"monitorinfolist\",\"entname\")",10);
			}
			var header = $("#monitorinfolist").parent(".datagrid-view").find("div.datagrid-header");
			var fields = header.find("td:has(div.datagrid-cell)");
			$(fields).unbind('click');//先取消绑定
			for(var i=0;i<fields.length;i++){
				var field = $(fields[i]).attr('field');
				if(field=='methodname'){//采样方法
					$(fields[i]).bind('click',function(e){
						samplingmethod();
					});
				}
			}
		},
		onClickRow:function(rowIndex, rowData){		
			$("#monitorinfolist").datagrid("clearSelections");
			$('#monitorinfolist').datagrid('selectRow',parseInt(rowIndex));
			initSamplsData(rowData.projectcode,rowData.monitorpointid,rowData.entid);
		}
		
	});
	$(window).resize(function(){
		$("#monitorinfolist").datagrid('resize');
	});
}

function initSamplsData(projectcode,monitorpointid,entid){
	$('#sampleslist').datagrid({
		nowrap: false,
		striped: true,
		collapsible:true,
		url:rootPath +'/spot/samplingdataaudit/samplingdataaudit!initSamplesList.action?projectcode='+encodeURI(projectcode)+'&monitorpointid='+encodeURI(monitorpointid)
		+'&entid='+entid, 
		fit : true,
		scrollbarSize : 0,
		remoteSort:false,
		singleSelect:false,
		idField:"sampleid",
		rownumbers:true,
		frozenColumns:[[
				{field:'sampleid',checkbox:true,align:"center"},
			{field:'samplecode',title:'样品编号', width:70,align:"center"},
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
			{field:'endtime',title:'结束时间 <img src="'+rootPath+'/themes/icons/mini_edit.png"/>', width:70,align:"center"}
					
			]],
			onLoadSuccess:function(data){
				var header = $("#sampleslist").parent(".datagrid-view").find("div.datagrid-header");
				var fields = header.find("td:has(div.datagrid-cell)");
				$(fields).unbind('click');//先取消绑定
				
				for(var i=0;i<fields.length;i++){
					if($(fields[i]).attr('field') =='samplename'){
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
			}
	});
	
	$(window).resize(function() {
		$("#sampleslist").datagrid('resize');
	});
		
}

//进入查询页面
function toSearchObj(){
	var url = rootPath + "/spot/samplingdata/samplingdata!toSearchPage.action";
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
		$('#datagrid').datagrid( {
			queryParams : {
				projectcode : projectcode,//监测项目编码
				registby : registby,//登记人
				monitortype : monitortype,//任务类型
				jcentprise : wtentprise,//委托单位
				registdate1 : registdateFirst,//登记日期1
				registdate2 : registdateSecond//登记日期2
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
function devices(monitorpointid){
	var url = rootPath + "/monitorproject/deviceuserecord/samplingdeviceuserecord!toJsButtonList.action?projectcode="+projectcode+"&monitorpointid="+monitorpointid;
		var _dialog =  window.top.$('	<div id ="dlg" style="padding:0px;"><iframe id="dlgFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
			_dialog.dialog({
			title:'采样仪器使用记录',
			autoOpen:false,
			modal:true,
			closed:true,
			width:'1000',
			height:'600',
			buttons:[{
				text:'确定',
				iconCls:'icon-save',
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
 * 现场监测记录
 */
function dataEntry(){
	var selected=$("#monitorinfolist").datagrid("getSelections");
	if(selected==null||selected==""){
		alert("请选择监测点！");
	}
	var projectpointid=selected[0].projectpointid;
	var url = rootPath + "/spot/spotrecord/spotrecord!toSpotrecordReadOnly.action?projectpointid="+projectpointid;
	var _dialog =  window.top.$('	<div id ="dlg" style="padding:0px;"><iframe id="dlgFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
	_dialog.dialog({
		title:'现场监测记录',
		autoOpen:false,
		modal:true,
		closed:true,
		width:'1000',
		height:'500',
		onClose:function(){
			_dialog.dialog("destroy");					
		}
	});
	_dialog.dialog('open');
}



/**
 * 现场环境录入
 */
function envEntry(){
	var url = rootPath+"/spot/externalenvparam/externalenvparamdata!list.action?projectid="+projectcode+"&projectcode="+projectcode+"&type=1";
	var _dialog =  window.top.$('	<div id ="dlg" style="padding:0px;"><iframe id="dlgFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
	_dialog.dialog({
		title:'现场环境记录',
		autoOpen:false,
		modal:true,
		closed:true,
		maximizable:true,
		width:'1000',
		height:'500',
		onClose:function(){
			_dialog.dialog("destroy");					
		}
	});
	_dialog.dialog('open');
}


/**
 * 示意图
 */
function sketchmap(){
	var url =rootPath +"/spot/sketchmap/projectpointsketchmap!toSketchmapList.action?projectcode="+projectcode+"&type=1";
	var _dialog =  window.top.$('	<div id ="role-dlg" style="padding:0px;"><iframe id="samplingBillFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
	_dialog.dialog({
		title:'测点示意图',
		maximizable:true,
		autoOpen:false,
		modal:true,
		closed:true,
		width:'830',
		height:'530',
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
						$.post(rootPath +"/spot/sampling/sampling!updateSampleInfo.action",{fieldname:fieldname,value:samplevalue,sampleids:sampleids},function(data){
							if(data=='success'){
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
					persons+=",";
				persons += rows[i].userid;
			}
			$("#samplingpersons").val(persons);
		},onSelect:function(rowIndex,rowData){
			
		}
	});
	$(window).resize(function(){
		$("#samplingpersonlist").datagrid('resize');
	});
}

//批量修改采样方法
Array.prototype.toRepeat = function() { 
	var a = {}, c = [], l = this.length; 
	for (var i = 0; i < l; i++) { 
		var b = this[i]; 
		var d = (typeof b) + b; 
		if (a[d] === undefined) { 
		c.push(b); 
		a[d] = 1; 
		} 
	} 
	return c; 
} 

function samplingmethod(){
	var monitorpointtypeid=[];
	var cc="";
	var selected=$("#monitorinfolist").datagrid('getSelections');
	if(selected==null || selected.length< 1){		
		alert('请至少选择一条记录！');
		return;
	}else{	
		for ( var i = 0; i < selected.length; i++) {
			monitorpointtypeid.push(selected[i]['monitorpointtypeid']);
			if(selected[i]['projectpointid']!=null && selected[i]['projectpointid']!="" && selected[i]['projectpointid']!='undefined'){
				cc+=selected[i]['projectpointid']+",";
			}
		}
	}
	
	cc = cc.substring(0,cc.length-1);
	var tmp = monitorpointtypeid.toRepeat();
	if(tmp.length>1){
		alert("请选择同一监测点类型下的点位！");
		return false;
	}
	$.post(rootPath + "/spot/samlingmethod/samlingmethod!getSamlingmethodSize.action?monitorpointtypeid="+tmp, 
	function(msg){
		if (msg == 'no') {
			$("#method").attr("disabled",true);
			alert("该监测类型没有采样方法！");
			return false;
		}else if(msg=='fail'){
			alert("该监测类型没有采样方法！");
			return false;
		}else{
			var url = rootPath + "/spot/samlingmethod/samlingmethod!toInput.action?monitorpointtypeid="+tmp+"&projectpointid="+cc;
		var _dialog = window.top
				.$('<div id="monitorDialog1"  style="padding:0px;overflow:hidden">' +
				'<iframe id="samlingmethodFrame1" width="100%" height="100%" frameborder="0" scrolling="no" src=' + url + '></iframe></div>')
				.appendTo(window.top.document.body);
		_dialog.dialog({
			title:'采样方法',
			autoOpen:false,
			modal:true,
			closed:true,
			width:'800',
			height:'300',
			buttons:[{
				text:'确定',
				iconCls:'icon-save',
				handler:function(){
					$("#samlingmethodFrame1",top.document.body).contents().find("#samlingmethodForm1").form('submit',{
					url:rootPath +'/spot/samlingmethod/samlingmethod!saveSamlingmethod.action',
//					onSubmit:function(){
//						var len = $("#samlingmethodFrame1",top.document.body).contents().find("input[type=checkbox][name=methodids][checked]").length;
//						if(len<1){
//							$("#samlingmethodFrame1",top.document.body).contents().find(":input").focus();
//							alert("请至少选择一项！");
//							return false;
//						}
//					},
					success:function(data){
					  	if(data=='success'){
					  		_dialog.dialog('close');	
					  		$("#monitorinfolist").treegrid('clearSelections');
							$("#monitorinfolist").treegrid('reload');
						}else{
							alert('失败');
						}
					 }
					});
				}//function
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
	});
}

/**
 * 修改监测点信息
 * @return
 */
function editMoinponit(){
	var selected=$('#monitorinfolist').datagrid("getSelections");
	if(selected!=null){
		if(selected.projectpointid!=""){
			var id=selected[0].monitorpointid;
			var url =  rootPath +"/monitor/monitorpoint!toEditMonitorPage.action";
			var surl =  rootPath +"/monitor/monitorpoint!update.action";
			if(id!=""){
				url = url + "?id="+id;
			}
			var _dialog =  window.top.$('	<div id="pointDialog"  style="padding:0px;"><iframe id="taskDetailSampFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
			_dialog.dialog({
				title:'编辑监测点',
				autoOpen:false,
				modal:true,
				closed:true,
				width:'600',
				height:'400',
				onClose:function(){
					_dialog.dialog("destroy");
					
				}
			});
			_dialog.dialog('open');
		}else{
			alert("选择了无效的监测点！");
		}
	}else{
		alert("请选择监测点！");
	}
}


/**
 * 仪器使用记录
 */
function diviceRecord(pointid){
	var monitorpointid = "";
	var monitorTypeCount = 0;
	var monitortype ="";
	if(pointid!=null && pointid!=""){
		monitorpointid = pointid;
	}else{
		var rows = $("#monitorinfolist").datagrid("getSelections");
		for(var i=0;i<rows.length;i++){
		if(monitorpointid!="")
			monitorpointid = monitorpointid + ",";
			monitorpointid = monitorpointid + rows[i].monitorpointid;
		if(i!=0 && rows[i].monitortypeid!=monitortype){
			monitorTypeCount++;
		}
		monitortype = rows[i].monitortypeid;
	}
	if(monitorTypeCount>1){
		alert("请选择相同类型下的监测点！");
		return;
	}
	}
	

	
	if(monitorpointid==null||monitorpointid==""){
		alert("请至少选择一条记录！");
		return;
	}
		var url = rootPath + "/monitorproject/deviceuserecord/samplingdeviceuserecord!list.action?projectcode="+projectcode+"&monitorpointid="+monitorpointid+"&type=1";
		var _dialog =  window.top.$('	<div id ="dlg" style="padding:0px;"><iframe id="dlgFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
			_dialog.dialog({
			title:'采样仪器使用记录',
			autoOpen:false,
			modal:true,
			closed:true,
			width:'1000',
			height:'600',
			buttons:[{
				text:'确定',
				iconCls:'icon-save',
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
 * 原始数据录入
 * @return
 */
function entryoriginal(){
	var selected=$('#datagrid').datagrid("getSelections");
	if(selected!=null){
		if(selected.projectcode!=""){
			var id=selected[0].projectcode;
			var url =  rootPath +"/spot/samplingdataaudit/originaent!toSampletestbybatchList.action";
			var surl =  rootPath +"/monitor/monitorpoint!update.action";
			if(id!=""){
				url = url + "?id="+id;
			}
			var _dialog =  window.top.$('	<div id="pointDialog"  style="padding:0px;"><iframe id="taskDetailSampFrame" width="1200px" height="700px" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
			_dialog.dialog({
				title:'原始数据录入',
				autoOpen:false,
				modal:true,
				closed:true,
				width:'1200',
				height:'600',
				buttons:[{
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
			alert("选择了无效的任务！");
		}
	}else{
		alert("请选择任务！");
	}
}
////以下操作为修改工作流
//function modifyWorkflow(){
//	var rows=$("#sampleslist").datagrid('getSelections');
//	var projectcode = $("#projectcode").val();
//	if(rows==""){
//		alert("请至少选择一条记录！");
//		return;
//	}
//	var _dialog =  window.top.$('<div onkeydown="PreventBSK()" id ="dlg" style="left:100px;top:180px;">'
//			+'部门：<select id="deptid" name="deptid" style="width:35%;height:20px;">'
//			+'</select>'
//			+'人员：<select id="userid" name="userid" style="width:35%;height:20px;">'
//			+'</select></br>'
//			+'跳转节点:<select id="nextWorkflow" name="nextWorkflow" class="TextBox" style="width: 50%;height:20px;">'
//			+'</select>'
//			+'</div>').appendTo(window.top.document.body);
//	
//	initWorkflow();
//	initdept();
//	inituserList();
//	$("#deptid",window.top.document).change(function(){
//		var deptid = $(window.top.document).find("#deptid").val();
//		if(deptid!='')
//		{
//			inituser(deptid);
//		}
//		else{
//			inituserList();
//		}
//	});
//	_dialog.dialog({
//		title:'下一步操作',
//		autoOpen:false,
//		modal:true,
//		closed:true,
//		width:'300',
//		height:'320',
//		buttons:[{
//			text:'确定',
//			iconCls:'icon-save',
//			handler:function(){
//				var taskid=$(window.top.document).find("#nextWorkflow").val();
//				var auditperson=$(window.top.document).find("#userid").val();
////				alert(taskid);
//				dataCommit(projectcode,'LocalDataAudit',"提交",taskid,auditperson,'');
//				_dialog.dialog('close');
//			}
//		},{
//			text:'取消',
//			iconCls:'icon-cancel',
//			handler:function(){
//				_dialog.dialog('close');
//			}
//		}],
//		onClose:function(){
//			_dialog.dialog("destroy");
//			
//		}
//	});
//	_dialog.dialog('open');
//}
//进入评审意见页面
function checkFuntion(action){	
	var rows=$("#sampleslist").datagrid('getSelections');
	if(rows==""){
		alert("请至少选择一条记录！");
		return;
	}
	var url = rootPath + "/projects/appraiseopinion/appraiseopinion!opinionNew.action?showName="+encodeURI(encodeURI(action+"意见"))+"&projectcode="+$("#projectcode").val();
	var _dialog =  window.top.$('	<div id ="dlg" style="padding:0px;"><iframe id="dlgFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
//	initWorkflow();
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
//						var objs= $("#dlgFrame",top.document.body).contents().find(".grkj-validate");
//						if(!saveCheck(objs)){
//							$("#dlgFrame",window.parent.body).contents().find(":input").focus();
//							alert("数据输入不符合格式，请查看红色边框的输入框的输入提示！");
//							return false;
//						}
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
			var userid = $("#dlgFrame",window.top.document).contents().find("#userid").val();
			var opinion = $("#dlgFrame",window.top.document).contents().find("#opinion").val();
//			dataCommit('LocalDataTest',"提交",taskid,userid,opinion);
			dataCommit(projectcode,'LocalDataAudit',action,taskid,userid,opinion);
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
			initWorkflow();
		},
		onClose:function(){
			_dialog.dialog("destroy");					
		}
	});
	_dialog.dialog('open');
}
function initWorkflow(){
	if(window.confirm('是否提交？')){
	$.ajax( {
		type : 'POST',
		url : rootPath +'/workflow/workflow!workflowStepList.action',
		data: "status=LocalDataAudit&workflowcode=JC_PROJECT",
		success : function(data) {
			var vData = eval("(" + data + ")");
			var lList = "";
			jQuery.each(vData, function(i, n) {
				lList += "<option value=" + n.code + ">" + n.value	+ "</option>";
			});				
//			$('#nextWorkflow',window.top.document).html(lList);
			$('#dlgFrame',window.top.document).contents().find("#nextWorkflow").html(lList);
		}
	});
	}
}

//function initRecheckPerson(){
//	$.ajax( {
//		type : 'POST',
//		url : rootPath +'/spot/samplingdata/samplingdata!operatePersonList.action',
//		success : function(data) {
//			var vData = eval("(" + data + ")");
//			var lList = "";
//			jQuery.each(vData, function(i, n) {
//				lList += "<option value=" + n.code + ">" + n.value	+ "</option>";
//			});				
//			$('#samplingrecheck',window.top.document).html(lList);
//		}
//	});
//}
//点击提交按钮
//function auditOperate(action){
//	var rows=$("#sampleslist").datagrid('getSelections');
//	var projectcode = $("#projectcode").val();
//	if(rows==""){
//		alert("请至少选择一条记录！");
//		return;
//	}
//	var _dialog =  window.top.$('<div onkeydown="PreventBSK()" id ="dlg" style="left:100px;top:180px;">'
//			+'部门：<select id="deptid" name="deptid" style="width:35%;height:20px;">'
//			+'</select>'
//			+'人员：<select id="userid" name="userid" style="width:35%;height:20px;">'
//			+'</select></br>'
//			+'</div>').appendTo(window.top.document.body);
//	
//	initdept();
//	inituserList();
//	$("#deptid",window.top.document).change(function(){
//		var deptid = $(window.top.document).find("#deptid").val();
//		if(deptid!='')
//		{
//			inituser(deptid);
//		}
//		else{
//			inituserList();
//		}
//	});
//	_dialog.dialog({
//		title:'下一步操作',
//		autoOpen:false,
//		modal:true,
//		closed:true,
//		width:'300',
//		height:'320',
//		buttons:[{
//			text:'确定',
//			iconCls:'icon-save',
//			handler:function(){
//				var auditperson=$(window.top.document).find("#userid").val();
////				alert(taskid);
//				dataCommit(projectcode,'LocalDataAudit',"提交",'',auditperson,'');
//				_dialog.dialog('close');
//			}
//		},{
//			text:'取消',
//			iconCls:'icon-cancel',
//			handler:function(){
//				_dialog.dialog('close');
//			}
//		}],
//		onClose:function(){
//			_dialog.dialog("destroy");
//			
//		}
//	});
//	_dialog.dialog('open');
//}


function dataCommit(projectcode,stepcode,action,taskid,auditperson,message){
//	var projectcode = $("#projectcode").val();
	var rows=$("#sampleslist").datagrid('getSelections');
	var sampleid = '';
	for(var i=0;i<rows.length;i++){
		if(sampleid!='') sampleid = sampleid + ',';
		sampleid = sampleid + rows[i].sampleid;
	}
	var json = "{'projectcode':'"+projectcode+"','targetstepcode':'"+taskid+"','stepcode':'"+stepcode+"','message':'"+message+"','auditperson':'"+auditperson+"','samples':'"+sampleid+"'}";
	$(window.top.document.body).block({ 
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
	
	$.ajax({
		type:'POST',
		url:rootPath + '/spot/samplingdata/samplingdata!operate.action',
		data:'json='+json+'&info='+action,
		success:function(msg){
			$(window.top.document.body).unblock(); 
		 	if(msg=='success'){
		 		alert('成功！');
		 		$('#datagrid').datagrid('reload');
//		 		$('#samplelist').datagrid('clearSelections');
		 	}else{
		 		alert('失败！');
		 	}
		}
	});
}
//退回
function tuiHui(){
	var rows = $('#sampleslist').datagrid('getSelections');
	var projectcode = $("#projectcode").val();
	if(rows!=null && rows.length>0){
		var sampleid="";
		for(var i=0;i<rows.length;i++){
			//这个if else 是为了构造  a,b,c,d,e,f  这样的结构
			if(sampleid==""){
				sampleid = rows[i].sampleid;
			}else{
				sampleid = sampleid+","+rows[i].sampleid;
			}
		}
		checkFuntion(projectcode,sampleid);
	}else{
		alert('请至少选择一个样品！');
	}	
}
////进入评审意见页面(公用的，并不是按批的专用页面，只是放BatchAction类里)
//function checkFuntion(projectcode,temp){	//原始数据签发（按任务签发）
//	//var url = rootPath + "/sampletest/batch/batch!opinionDlg.action";
//	
//var str =encodeURI(encodeURI("原始数据按任务签发退回意见"));
//	var url = rootPath + "/projects/appraiseopinion/appraiseopinion!opinionDlg.action?moduleid="+str;
//	var _dialog =  window.top.$('<div id ="dlg" style="padding:0px;"><iframe id="dlgFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
//	_dialog.dialog({
//	title:'审核意见',
//	autoOpen:false,
//	modal:true,
//	closed:true,
//	width:'520',
//	height:'220',
//	buttons:[{
//		text:'确定',
//		iconCls:'icon-ok',
//		handler:function(){
//			var objs = $("#dlgFrame",window.top.document).contents().find(".grkj-validate");	
//			var message = $("#dlgFrame",window.top.document).contents().find("#opinion").val();
//			var userid = $("#dlgFrame",window.top.document).contents().find("#userid option:selected").val();
//			if(!saveCheck(objs)){
//				$("#dlgFrame",window.top.document).contents().find(":input").focus();
//				alert("数据输入不符合格式，请查看红色边框的输入框的输入提示！");
//				return false;
//			}
//			dataCommit(projectcode,'LocalDataAudit','退回','',userid,message);
//			
//			_dialog.dialog('close');
//			}
//		},{
//		text:'取消',
//		iconCls:'icon-cancel',
//		handler:function(){
//			_dialog.dialog('close');
//			}
//		}],
//		onClose:function(){
//			_dialog.dialog("destroy");					
//		}
//	});
//	_dialog.dialog('open');
//}		
//
//function initdept(){
//	$.ajax({
//		type:'post',
//		url:rootPath +'/departmentinfo/departmentinfo!getDeptAll.action?timeStamp='+new Date().getTime(),
//		success:function(data){
//			var vData = eval("("+data+")");
//			var List = "";
//			jQuery.each(vData,function(i,n){
//				List +="<option value='"+n.deptid+"'>"+n.deptname+"</option>"
//			});
//			$("#deptid",window.top.document).html(List);	
//		}
//	});
//}
//
//function inituser(deptid){
//	$.ajax({
//		type:'post',
//		url:rootPath +'/userinfo/userinfo!getUserBydept.action?timeStamp='+new Date().getTime(),
//		data:{deptid:deptid},
//		success:function(data){
//			var vData = eval("("+data+")");
//			var List = "";
//			jQuery.each(vData,function(i,n){
//				List +="<option value='"+n.userid+"'>"+n.realname+"</option>"
//			});
//			window.top.document.getElementById("userid").options.length=0;
//			$("#userid",window.top.document).html(List);	
//		}
//	});
//}
//
//function inituserList(){
//	$.ajax({
//		type:'post',
//		url:rootPath +'/userinfo/userinfo!getUser.action?timeStamp='+new Date().getTime(),
//		success:function(data){
//			var vData = eval("("+data+")");
//			var List = "";
//			jQuery.each(vData,function(i,n){
//				List +="<option value='"+n.userid+"'>"+n.realname+"</option>"
//			});
//			window.top.document.getElementById("userid").options.length=0;
//			$("#userid",window.top.document).html(List);	
//		}
//	});
//}