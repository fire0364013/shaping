
//仪器列表显示
function getdeviceList(){
	$('#deviceList').datagrid({
		nowrap: false,
		striped: true,
		collapsible:true,
		url:rootPath+'/device/info/deviceinfo!getCaptureDeviceList.action',
		fit:true,
		fitColumns: true,
		scrollbarSize:0,
		remoteSort: false,
		singleSelect:true,
		pageSize:20,
		pageList:[20,30,40,50],
		frozenColumns:[[
			{field:'deviceid',checkbox:true,align:"center"}
						]],
		columns:[[
				{field:'devicename',title:'仪器名称',width:40,align:"center"},
				{field:'devicecode',title:'仪器编码',width:40,align:"center"},
				//{field:'deviceType',title:'仪器类别',width:40,align:"center"},
				{field:'caputermathod',title:'解析方法',width:50,align:"center"},
				{
					field : 'option',
					title : '操作',
					width : 100,
					align : 'center',
					formatter : function(value, rec,
							rowIndex) {
					var	links = '<a  href="javascript:void(0)" class="edit_link" onclick="updateById(\''
							+ rec.deviceid
							+ '\''
							+ ','
							+ '\''
							+ rec.devicename
							+ '\''
							+ ','
							+ '\''
							+ rec.caputermathodid
							+ '\''
							+ ')" >解析方法</a>&nbsp;&nbsp;';
					links += '<a  href="javascript:void(0)" class="edit_link" onclick="updateCapturById(\''
						+ rec.deviceid
						+ '\''
						+ ')" >数据采集</a>&nbsp;&nbsp;';
					links += '<a  href="javascript:void(0)" class="edit_link" onclick="updateCurveById(\''
						+ rec.deviceid
						+ '\''
						+ ')" >校准曲线</a>&nbsp;&nbsp;';
						return links;
								
					}
				}
		]],
		pagination:true,
		rownumbers:true
//		toolbar:"#tb"
	});
	$(window).resize(function() {
		$("#deviceList").datagrid('resize');
	});
	
}

function search(){
	var devicename = $("#devicename").val();
	$('#deviceList').datagrid( {
		queryParams : {
			devicename:devicename
		},
		pageNumber : 1  //查询后指定页码为1
	});
}
function updateById(id,name,capid){	
	$('#deviceList').datagrid('clearSelections');
	var url = rootPath+'/device/capture/captureitemmap!toCapturemethodPage.action?deviceid='+id;
//	var url = rootPath+'/pages/lims/labanalysis/device/addDevice.jsp?deviceid='+id+'&devicename='+name+'&capid='+capid;
	
	var _dialog =  window.top.$('<div id ="cert-dlg" style="padding:0px;"><iframe id="deviceFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
	_dialog.dialog({
		title:'仪器解析方法编辑',
		autoOpen:false,
		modal:true,
		closed:true,
		width:'300',
		height:'150',
		buttons:[{
			text:'保存',
			iconCls:'icon-save',
			handler:function(){
 			var deviceid=$("#deviceFrame",top.document.body).contents().find("#deviceid").val();
			var capturemethodid=$("#deviceFrame",top.document.body).contents().find("#capturemethodid").val();
			if(deviceid==null){
				return;
			}

			$("#deviceFrame",top.document.body).contents().find("#device").form('submit',{
				url:rootPath +'/device/info/deviceinfo!saveCapturemethod.action?deviceid='+deviceid+'&capturemethodid='+capturemethodid,
				onSubmit:function(){
				},
				success:function(data){
					if(data=='success'){
						_dialog.dialog('close');
						$("#deviceList").datagrid('reload');
						alert("保存成功");
//						$.messager.show({title:'提示',msg:'保存成功!',timeout:5000,showType:'slide'});
					}else if(data=='fail'){
						alert("保存失败");
//						$.messager.show({title:'提示',msg:'保存失败!',timeout:5000,showType:'slide'});
					}
					},
				error:function(){
					alert("保存失败");
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

function updateCapturById(id){
	$('#deviceList').datagrid('clearSelections');
		var url = rootPath+'/device/capture/captureitemmap!tocaptureitemmapList.action?deviceid='+id;
		var _dialog =  window.top.$('<div id ="cert-dlg" style="padding:0px;"><iframe id="deviceFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
		_dialog.dialog({
			title:'数据采集编辑',
			autoOpen:false,
			modal:true,
			closed:true,
			width:'800',
			height:'600',
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

function updateCurveById(id){
	$('#deviceList').datagrid('clearSelections');
//  var url = path+'/pages/lims/labanalysis/device/capturecurvemap-list.jsp?deviceid='+id;
	var url = rootPath+'/device/capture/capturecurvemap!toCapturecurvemapList.action?deviceid='+id;
	var _dialog =  window.top.$('<div id ="cert-dlg" style="padding:0px;"><iframe id="deviceFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
	_dialog.dialog({
		title:'校准曲线编辑',
		autoOpen:false,
		modal:true,
		closed:true,
		width:'800',
		height:'600',
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
//得到下拉列表数据
function getSelectData(id, name, tables, wh) {
	var dataObj;
	$.ajax({
		url : path + "/monitoringInfo/getSelectData.do",
		data : {
			id : id,
			name : name,
			tables : tables,
			wh : wh
		},
		async : false,
		type : "post",
		dataType : "json",
		success : function(data) {
			dataObj = data;
		},
		error : function() {
			alert("加载下拉列表时出现未知错误！");
		}
	});
	// 返回select里面的option字符串
	var str = "";
	for ( var i = 0; i < dataObj.length; i++) {
		str += "<option value='" + dataObj[i].id + "'>" + dataObj[i].name
				+ "</option>";
	}
	return str;
}
