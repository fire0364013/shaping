//仪器选择列表
function deviceList(){
	$('#datagrid').datagrid({
		nowrap: false,
		striped: true,
		collapsible:true,
		url:rootPath + '/monitorproject/deviceuserecord/samplingdeviceuserecord!deviceList.action',//此地址所连接的方法，不止此地方用到，所以如果需要修改里面的内容    请慎重
		fit:true,
		fitColumns:true,
		scrollbarSize:0,
		singleSelect:true,
		idField:'deviceid',
		columns:[[
			{field:'deviceid',width:30,align : 'center',
				formatter : function(value){
				return "<input type='radio' name='radio'/>";}
			},
//			{field:'devicenum',title:'仪器编号',width:200,align : 'center'},
			{field:'devicename',title:'仪器名称',width:281,align : 'center'}	,
			{field:'leavefactorynum',title:'出厂编号',width:200,align : 'center'}	,
			{field:'spectype',title:'规格型号',width:200,align : 'center'},
			{field:'devicetype',title:'规格类型',width:200,align : 'center'}
		]],
		pagination:true,
		rownumbers:true,
		pageSize:10,
		pageList:[10,20,30],
		onSelect:function(rowIndex, rowData){
			checkRadio();//单选按钮控制
			$("#deviceId").val(rowData.deviceid);//表单仪器编号赋值
			//$("#deviceName").val(row.devicename);
			//$("#deviceNum").val(row.devicenum);
		},
		onClickRow:function(rowIndex, rowData){
			$('#datagrid').datagrid('clearSelections');
			$('#datagrid').datagrid('selectRow',rowIndex);
			//仪器维护的项目控制
			$.ajax({
				type:'POST',
				url:rootPath + '/monitorproject/deviceuserecord/samplingdeviceuserecord!deviceMaintenanceItem.action?deviceid='+rowData.deviceid,
				success:function(msg){
					$("#DeviceItemTab").remove();
					$("#innerItem").append(msg);
					getDeviceJCItem(rowData.deviceid);
				}
			});
			//仪器监测项目控制

		},
		onLoadSuccess:function(){
			var valueids=$("#deviceId").val();
			$('#datagrid').datagrid('selectRecord',valueids);
			itemCheckBoxList();
		}
	});
	$(window).resize(function(){
		$("#datagrid").datagrid('resize');
	})	;
};

//获取仪器维护的项目
function getDeviceJCItem(deviceid){
	var checkObjs=$("input[name='itemname'][type='checkbox']");
	checkObjs.removeAttr("checked");
			$.post(
				rootPath + '/monitorproject/deviceuserecord/samplingdeviceuserecord!getDeviceJCItem.action',
				{projectcode:projectcode,monitorpointid:monitorpointid,deviceid:deviceid},
				function(msg){
					if(msg!=null){
						var items = msg.split(";");
						for(var i=0;i<items.length;i++){
							for(var j=0;j<=checkObjs.length;j++){
								if(items[i]==$(checkObjs).eq(j).val()){
									$(checkObjs).eq(j).attr("checked","true");
								}
							}
						}
					}
					
				})
}

//项目列表
function itemList(){
		$('#itemlist').datagrid({
		nowrap: false,
		striped: true,
		collapsible:true,
		url:rootPath + '/monitorproject/deviceuserecord/samplingdeviceuserecord!itemList.action?projectcode='+projectcode+'&monitorpointid='+monitorpointid,
		fit:true,
		fitColumns:true,
		scrollbarSize:0,
		singleSelect:false,
		idField:'itemid',
		columns:[[
			{field:'itemid',checkbox:true,align:"center"},
			{field:'itemname',title:'项目名称',width:200,align : 'center'}	,
			{field:'unit',title:'计量单位',width:100,align : 'center'},
//			{field:'fixedadditive',title:'固定添加剂',width:100,align : 'center'},
			{field:'isnowtest',title:'是否现场监测', width:100,align:"center",
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
		pagination:true,
		rownumbers:true,
		pageSize:5,
		pageList:[5,10,15],
		onLoadSuccess:function(){
			var items=$("#itemid").val();
			if(items!=null&&items!=""){
				var arr = items.split(",");
				for(var i=0;i<arr.length;i++){
					$('#itemlist').datagrid('selectRecord',arr[i]);
				}
			}
			
			
		}
	});
	$(window).resize(function(){
		$("#itemlist").datagrid('resize');
	})	;
}

//获取选择项目
function getSelectedItem(){
//	var rows = $("#itemlist").datagrid("getSelections");
//	var items = "";
//	for(var i=0;i<rows.length;i++){
//		if(items!="") items = items + ",";
//		items = items + rows[i].itemid;
//	}
	var items='';
	var checkObjs=$("input[name='itemname'][type='checkbox']");
	for(var i=0;i<=checkObjs.length;i++)
	{
		if($(checkObjs).eq(i).attr("checked")=="checked"||$(checkObjs).eq(i).attr("checked")=="true")
		{
			items += $(checkObjs).eq(i).val()+';';
		}
	}
	$("#itemid").val(items.substring(0,items.length-1));
}

//仪器查询
function searchDevice(){
	var deviceNnames = $('#deviceNnames').val();			//仪器名称
	var deviceTypeId = $('#deviceTypeId').val();  		//仪器编号
	var leavenum = $('#leavenum').val(); //出厂编号
	var spectypeid = $('#spectypeid').val();//规格型号 
	$('#datagrid').datagrid( {
		queryParams : {
			deviceNnames : deviceNnames,
			deviceTypeId : deviceTypeId,
			spectypeid:spectypeid,
			leavenum:leavenum
		},
		pageNumber:1
	});
}
//单选控制
function checkRadio(){
	var row = $('#datagrid').datagrid('getSelected');
	var rowNum = 0;
	var rows = $('#datagrid').datagrid('getRows');
	for ( var i = 0; i < rows.length; i++) {
		if (row == rows[i]) {
			rowNum = i;
			break;
		}
	}
	var radios = $("input[type=radio]");
	$(radios[rowNum]).attr("checked", true);
}

//任务监测项目复选框
function itemCheckBoxList(){
	var items='';
	if($("#itemid").val()!=null){
		items = $("#itemid").val().split(';');
	}
	$.ajax({
		type:'POST',
		url:rootPath + '/monitorproject/deviceuserecord/samplingdeviceuserecord!getItemCheckBoxList.action?projectcode='+projectcode+'&monitorpointid='+monitorpointid,
		success:function(msg){
			$("#innerItem").html(msg);
			if($("#deviceId").val()!=null&&$("#deviceId").val()!=""){
				$.ajax({
					type:'POST',
					url:rootPath + '/monitorproject/deviceuserecord/samplingdeviceuserecord!deviceMaintenanceItem.action?deviceid='+$("#deviceId").val(),
					success:function(msg){
						$("#innerItem").append(msg);
						var checkObjs=$("input[name='itemname'][type='checkbox']");
						
						for(var i=0;i<items.length;i++){
							for(var j=0;j<=checkObjs.length;j++){
								if(items[i]==$(checkObjs).eq(j).val()){
									$(checkObjs).eq(j).attr("checked","true");
								}
							}
						}
						
					}
				});
			}
		}
	});
}
