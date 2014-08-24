function initDataGrid(){
			$('#deviceinfogrid').datagrid({
				//width:documentWidth,
				//height:655,
				nowrap: false,
				striped: true,
				collapsible:true,
				url:rootPath +'/device/info/deviceinfo!toList.action',
				fit : false,
				fitColumns : true,
				scrollbarSize:0,
				remoteSort: false,
				idField:'deviceid',
				pageSize:20,
				pageList:[20,30,40,50],
				frozenColumns:[[
					{field:'deviceid',checkbox:true,align:"center"}
								]],
				columns:[[
						{field:'devicenum',title:'仪器编号', width:160,align:"center"},					
						{field:'devicename',title:'仪器名称', width:240,align:"center"},
						{field:'devicetype',title:'仪器设备类型', width:140,align:"center"},
						{field:'spectype',title:'规格型号', width:140,align:"center"},
						{field:'leavefactorynum',title:'出厂编号', width:140,align:"center"},
						{field:'buydate',title:'购置日期', width:120,align:"center"},
						{field:'deptid',title:'使用科室', width:120,align:"center"},
						{field:'devicestatus',title:'仪器状态 ', width:120,align:"center"},
						{field:'operate',title:'操作', width:120,align:"center",
							formatter:function(value,rec,rowIndex){
								var links='<img src="'+rootPath +'/themes/default/images/xiangxiimage.png" id="btnshow" onclick="detail('+ rec.deviceid +')" alt="详情"/>&nbsp;&nbsp;';
								links+='<img src="'+rootPath +'/themes/default/images/bianjiimage.png" id="btnshow" onclick="addWin('+ rec.deviceid +')" alt="编辑"/>&nbsp;&nbsp;';
								links+='<img src="'+rootPath +'/themes/default/images/deleteimage.png" id="btnshow" onclick="del(\''+rec.deviceid+ '\','+rowIndex+')" alt="删除"/>'; 
								
								return links;
							}
						}						
				]],
				pagination:true,
				rownumbers:true,
				onLoadSuccess:function(){
					$('#deviceinfogrid').datagrid('clearSelections');
				}
				
				
			});
			$(window).resize(function() {
				$("#deviceinfogrid").datagrid('resize', {

					width : function() {
						return documentWidth;
					},
					height : function() {
						return document.body.clientHeight;
					}
				});
			});
	}

		//添加
		function addWin(id){
			$('#deviceinfogrid').datagrid('clearSelections');
			var url = rootPath +"/device/info/deviceinfo!input.action";
			if(id!=""){
				url = url + "?id="+id;
			}
			var _dialog =  window.top.$('<div id ="role-dlg" style="padding:0px;"><iframe id="deviceinfoFrame" width="100%" height="100%" frameborder="0" scrolling="auto" src='+url+'></iframe></div>').appendTo(window.top.document.body);
			//window.top.document.body.appendChild(win);
			_dialog.dialog({
				title:'仪器基本信息编辑',
				autoOpen:false,
				modal:true,
				closed:true,
				width:'650',
				height:'580',
				buttons:[{
					text:'保存',
					iconCls:'icon-save',
					handler:function(){
					$("#deviceinfoFrame",top.document.body).contents().find("#deviceinfoform").form('submit',{
							url:rootPath +'/device/info/deviceinfo!save.action',
							onSubmit:function(){
								var objs = $("#deviceinfoFrame",top.document.body).contents().find(".grkj-validate");
								//alert(!saveCheck(objs));
								if(!saveCheck(objs)){
									$("#deviceinfoFrame",top.document.body).contents().find("#devicenum").focus();
									$("#deviceinfoFrame",top.document.body).contents().find("#devicename").focus();
									$("#deviceinfoFrame",top.document.body).contents().find("#deptid").focus();
									$("#deviceinfoFrame",top.document.body).contents().find("#userid").focus();
									alert("数据输入不符合格式，请查看红色边框的输入框的输入提示！");
									return false;
								}
							},
							success:function(data){
								if(data=='fail'){
									alert("仪器编号已经存在，请确认输入！");
									return;
								}
								if(data=='success'){
									_dialog.dialog('close');
									$("#deviceinfogrid").datagrid('reload');
									alert('成功');
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
		//关闭
		function closeAddWin(){
			$('#addWin').window('close');
		}
		//验证仪器编号不重复	
		function validate(){
			var devicenum = $('#devicenum').val();
			var deviceid=$("#deviceid").val();
			if(deviceid==null||deviceid==""){
				if (devicenum != ""&& devicenum!=null) {
					$.post(rootPath +"/device/info/deviceinfo!validateLoginName.action",{"devicenum":devicenum},function(del) {
						if (del == 'success') {
							alert("此仪器编号已经存在，请确认输入！");
						}
					});
					
				}
			}			
		}
		//详情
		function detail(id){
			$('#deviceinfogrid').datagrid('clearSelections');
			var url =  rootPath +"/device/info/deviceinfo!toview.action";
			if(id!=""){
				url = url + "?id="+id;
			}
			//$(window.top.document).find("#btnProjectInfo").click();
			var _dialog =  window.top.$('	<div id ="role-dlg" style="padding:0px;"><iframe id="deviceinfoFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
			//window.top.document.body.appendChild(win);
			_dialog.dialog({
				title:'仪器基本信息详情',
				autoOpen:false,
				modal:true,
				closed:true,
				width:'900',
				height:'600'
			});
			_dialog.dialog('open');
		}

		
		//单条删除
		function del(did,rowIndex){
			$('#deviceinfogrid').datagrid('clearSelections');
			$('#deviceinfogrid').datagrid('selectRow',rowIndex);
			if(window.confirm('是否删除？'))
			{
				$.post( rootPath +"/device/info/deviceinfo!deleteOnlyOne.action",{id:did},function(del)
					{
						if(del=='success')
						{
							$('#deviceinfogrid').datagrid('clearSelections');
							$("#deviceinfogrid").datagrid('reload');
							alert('成功');
					}
				});
			
			}
		}

		//批量删除	
		function delAll(){
			var selected=$("#deviceinfogrid").datagrid('getSelections');
			//alert(selected.length);
			if(selected==null || selected.length< 1){
				
				alert('请至少选择一条记录！');
			}
			else{
				if(window.confirm('是否删除？')){
					var cc=[];
					for ( var i = 0; i < selected.length; i++) {
						if(cc==""){
								cc+=selected[i]['deviceid'];
						}
						else{
							cc+=","+selected[i]['deviceid'];
							}
					}
					
					$.post(rootPath +"/device/info/deviceinfo!deleteAll.action",{"ids":cc},function(del){
						if(del=='success'){
							$('#deviceinfogrid').datagrid('clearSelections');
							$("#deviceinfogrid").datagrid('reload');
							alert('成功');
						}
					});
					
				 }
			}
		}
		//查询
		function query(){
			
			var devicenumquery=$("#devicenumquery").val();
			var devicenamequery=$("#devicenamequery").val();
			var divicestatus=$("#divicestatus").val();
			//var depar=$("#depar").combobox('getValue');
			var depar=$("#depar").val();
			var divicetype=$("#divicetype").val();
			var spectype = $("#spectype").val();
			$('#deviceinfogrid').datagrid( {
				queryParams : {
				devicenum : devicenumquery,
				devicename : devicenamequery,
				deptid : depar,
				devicetypeid:divicetype,
				divicestatus:divicestatus,
				spectype:spectype
				},
				pageNumber:1		
			});
		}
	
//仪器维修记录列表		
function maintenanceList(){
	$('#datagrid').datagrid({
		nowrap: false,
		striped: true,
		url:rootPath +'/device/maintenance/maintenance!getMaintenceRecord.action?deviceid='+$("#deviceid").val(),
		fit : true,
		fitColumns : true,
		scrollbarSize:0,
		remoteSort: false,
		idField:'deviceidid',
		pageSize:10,
		pageList:[10,20,30],
		singleSelect:true,
		columns:[[
			{field:'id',hidden:true},
			{field:'person',title:'维护人', width:100,align:"center"},					
			{field:'date',title:'维护日期', width:100,align:"center"},
			{field:'content',title:'维护内容', width:180,align:"center"}
//			{field:'operate',title:'操作', width:50,align:"center",
//				formatter:function(value,rowData,rowIndex){
//					return '<img src="'+rootPath +'/themes/default/images/xiangxiimage.png" onclick="viewMaintenanceDetail('+ rowData.id +')"/>';
//				}
//			}
		]],
		pagination:true,
		rownumbers:true
	});
	$(window).resize(function(){
			$("#datagrid").datagrid('resize');
	});
}	

//仪器检定校准记录列表
function callbrateList(){
$('#calibratedatagrid').datagrid({
	nowrap: false,
	striped: true,
	collapsible:true,
	url:rootPath +'/device/calibreate/calibreate!callbreateList.action?deviceid='+$("#deviceid").val(),
	fit : true,
	fitColumns : true,
	scrollbarSize:0,
	pageSize:10,
	pageList:[10,20,30],
	frozenColumns:[[
				{field:'id',checkbox:true,align:"center"}
				]],
	columns:[[
//		{field:'id',hidden:true},
		{field:'person',title:'检定/校准人', width:80,align:"center"},
		{field:'date',title:'检定/校准日期', width:105,align:"center"},
		{field:'unit',title:'检定单位', width:105,align:"center"},
		{field:'booktype',title:'证书类型', width:105,align:"center"},
		{field:'booknum',title:'证书编号', width:105,align:"center"},
		{field:'operate',title:'操作', width:50,align:"center",
			formatter:function(value,rowData,rowIndex){
				return '<img src="'+rootPath +'/themes/default/images/xiangxiimage.png" onclick="viewCallbrateDetail('+ rowData.id +')"/>';
			}
		}
		]],
		pagination:true,
		rownumbers:true
	});
	$(window).resize(function(){
			$("#datagrid").datagrid('resize');
	});
}

//查看仪器设备校准/检定记录详情
function viewCallbrateDetail(id){
	$('#calibratedatagrid').datagrid('clearSelections');
	var url =  rootPath +"/device/calibreate/calibreate!callbreate.action";
	if(id!=""){
		url = url + "?id="+id;
	}
	var _dialog =  window.top.$('	<div id ="dlg" style="padding:0px;"><iframe id="dlgFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
	_dialog.dialog({
		title:'检定/校准记录详情',
		autoOpen:false,
		modal:true,
		closed:true,
		width:'550',
		height:'276'
	});
	_dialog.dialog('open');
}

//查看仪器设备维护记录详情
function viewMaintenanceDetail(id){
	var url =  rootPath +"/device/maintenance/maintenance!maintenance.action";
	if(id!=""){
		url = url + "?id="+id;
	}
	var _dialog =  window.top.$('	<div id ="dlg" style="padding:0px;"><iframe id="dlgFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
	_dialog.dialog({
		title:'核查记录详情',
		autoOpen:false,
		modal:true,
		closed:true,
		width:'550',
		height:'306'
	});
	_dialog.dialog('open');
}

//文件下载
function download(filename){
	var name=encodeURIComponent(encodeURIComponent(filename.toString()));
	//alert(encodeURIComponent(encodeURIComponent(filename.toString())));
	$.ajax({
		type: "POST",
		url: rootPath +"/device/info/deviceinfo!downLoad.action",
		data: "path="+name+"&flg=0",
		processData :false,
		success:function(data){
			if(data=="fail"){
				alert("文件不存在！");
			}else{
				var urlParmDown=rootPath +"/device/info/deviceinfo!downLoad.action?path="+name+"&flg=1";
				/*$("#form").attr("action",urlParmDown);
				$("#form").submit();*/
				$("#methoddownload").attr("action",urlParmDown);
				$("#path").val(name);
				$("#methoddownload").submit();
			}
		},
		error:function(data){
			alert("服务器正在维修，请稍后！");
		}
	});
}


	//导出
	function ExportExcel() {
			//poi导出
			var devicenumquery=$("#devicenumquery").val();//仪器编号
			var devicenamequery=encodeURIComponent(encodeURIComponent($("#devicenamequery").val()));//仪器名称
			var depar=$("#depar").val();//部门
			var divicetype=$("#divicetype").val();//仪器
			/* var urlParmDown=rootPath +"/device/info/deviceinfo!exportSalChangeInfo.action?devicenum="+devicenumquery+
			"&devicename="+devicenamequery+"&deptid="+depar+"&devicetypeid="+divicetype;*/
			var urlParmDown=rootPath +"/device/info/deviceinfo!exportSalChangeInfo.action";
			$("#exportExcel").attr("action",urlParmDown);
			$("#exportExcel").submit();	
			//devicenum    devicename   deviceType.devicetypeid   departmentinfo.deptid
		
	}


//加载部门的下拉列表
function provinceData() {
	var deptidvalue=$("#deptidvalue").val();
//	alert(deptidvalue);
	$.ajax( {
		type : 'GET',
		url : rootPath +'/device/info/deviceinfo!getAllDepartJSON.action?timeStamp='+new Date().getTime(),//给该url一个时间戳~~这样就必须每次从服务器读取数据,
		async:false,//同步
		success : function(data) {
		var vData = eval("(" + data + ")");
		var lList = "<option value=''>---请选择---</option>";
			//遍历json数据  
		jQuery.each(vData.rowsData, function(i, n) {
//				alert("hh");
				if(deptidvalue!=''&& n.deptid==deptidvalue){
					lList += "<option value=" + n.deptid + " selected>"+  n.deptname	+ "</option>";
				}else{
				    lList += "<option value=" + n.deptid+ ">" +  n.deptname	+ "</option>";
				}
			});				
			//绑定数据到listLeft
			$('#deptid').append(lList);
			
		}
	});
}
//加载用户别的下拉列表
function cityData() {
	var str='';
	var useridvalue=$("#useridvalue").val();
	//查询时调用
	var deptid = $('#deptid').val();
	$.ajax( {
		type : 'post',
		url : rootPath +'/device/info/deviceinfo!getAllGroupByDepartJSON.action?timeStamp='+new Date().getTime(),//给该url一个时间戳~~这样就必须每次从服务器读取数据,
		data : {'deptid' : deptid},
		async:false,//同步
		success : function(data) {
			var vData = eval("(" + data + ")");
			var lList = "<option value=''>---请选择---</option>";
			//遍历json数据  
			jQuery.each(vData.rowsData, function(i, n) {
				if(useridvalue!=''&&n.userid==useridvalue){
					lList += "<option value=" + n.userid + " selected>"+   n.realname	+ "</option>";
				}else{
					
				lList += "<option value=" + n.userid + ">" + n.realname	+ "</option>";
				}
			});				
			//绑定数据到listLeft
			$('#userid').append(lList);
			
			
		}
	});
}	
		

function addCalibreate(deviceid){
			var url = rootPath +"/device/calibreate/calibreate!input.action";	
			var surl = rootPath +'/device/calibreate/calibreate!save.action';
			if(deviceid!=""){
				url = url + "?deviceid=" + deviceid;
				surl = surl + "?deviceid=" + deviceid;
			}
			
			var _dialog =  window.top.$('<div id ="callbreate-dlg" style="padding:0px;"><iframe id="callbreateFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
			_dialog.dialog({
				title:'仪器检定/校验信息编辑',
				autoOpen:false,
				modal:true,
				closed:true,
				width:'600',
				height:'400',
				buttons:[{
					text:'保存',
					iconCls:'icon-save',
					handler:function(){
					$("#callbreateFrame",top.document.body).contents().find("#callbreateform5").form('submit',{
							url:surl,
							onSubmit:function(){
								var objs = $("#callbreateFrame",top.document.body).contents().find(".grkj-validate");
								if(!saveCheck(objs)){
									$("#callbreateFrame",top.document.body).contents().find(":input").focus();
									$("#callbreateFrame",top.document.body).contents().find("select").focus();
									alert("数据输入不符合格式，请查看红色边框的输入框的输入提示！");
									return false;
								}
								var date = $("#callbreateFrame",top.document.body).contents().find("#datefocus").val();
								if(date==""){
									alert('日期不能为空!');
									return false;
								}
							},
							success:function(data){
								_dialog.dialog('close');
								$("#calibratedatagrid").datagrid('reload');
								if(data=='success'){
									alert('成功');
								}
								if(data=='fail'){
									alert('失败');                                                    
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

//批量删除	
		function delAllByCalibreate(){
			var selected=$("#calibratedatagrid").datagrid('getSelections');
			if(selected==null || selected.length< 1){
				
				window.confirm('请至少选择一条记录！');
			}
			else{
				if(window.confirm('是否删除？')){
					var cc=[];  
					for ( var i = 0; i < selected.length; i++) {
						if(cc==""){
								cc+=selected[i]['id'];
						}
						else{
							cc+=","+selected[i]['id'];
							}
					}
					
					$.post(rootPath +"/device/calibreate/calibreate!deleteAll.action",{"ids":cc},function(del){
						if(del=='success'){
							$('#calibratedatagrid').datagrid('clearSelections');
							$("#calibratedatagrid").datagrid('reload');
							alert('成功');
						}
					});
					
				 }
			} 
		}
		
		
		
//devices 仪器使用记录
function devices(deviceid){  
	var url = rootPath + "/monitorproject/deviceuserecord/samplingdeviceuserecord!deviceUsed.action?deviceid="+deviceid;
		var _dialog =  window.top.$('	<div id ="dlg" style="padding:0px;"><iframe id="dlgFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
			_dialog.dialog({
			title:'仪器使用记录',
			autoOpen:false,
			modal:true,
			closed:true,
			width:'1000',
			height:'600',
			onClose:function(){
					_dialog.dialog("destroy");					
				}
			});
			_dialog.dialog('open');
}