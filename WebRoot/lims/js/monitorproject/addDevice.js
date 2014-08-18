//仪器选择列表
function deviceList(){
	$('#datagrid').datagrid({
		nowrap: false,
		striped: true,
		collapsible:true,
		url:rootPath + '/monitorproject/deviceuserecord/samplingdeviceuserecord!deviceList.action',
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
			{field:'leavefactorynum',title:'出厂编号',width:200,align : 'center'},
			{field:'spectype',title:'规格型号',width:200,align : 'center'},
			{field:'devicetype',title:'仪器类型',width:200,align : 'center'}
		]],
		pagination:true,
		rownumbers:true,
		pageSize:10,
		pageList:[10,20,30],
		onLoadSuccess:loadSucces,
//		onSelect:onselect,
//		onUnselect:unselect,
//		onSelectAll:selectAll,
//		onUnselectAll:unselectAll,
		onSelect:function(rowIndex, rowData){
			$($("input[type=radio]")[rowIndex]).attr("checked", true);//单选按钮控制
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
				}
			});
		}
	});
	$(window).resize(function(){
		$("#datagrid").datagrid('resize');
	})	;
};

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
		pageList:[5,10,15]
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
function loadSucces(data){
			//一下是原来的部分
			//var value=$("#selectedUser").val();
			var valueids=$("#deviceId").val();
			var valueid=$("#deviceId").val().split(",");
			
			//alert(valueids);
			if(valueids!=null&&valueids!=""){
				for ( var i = 0; i < valueid.length; i++) {
					//alert(valueid[i]);
					var rows = $('#datagrid').datagrid('selectRecord',valueid[i]);
				}
				
			}
		}
//选择一行数据
		function onselect(rowIndex,rowData){
			//alert(0);
			//var cc=rowData['realname'];
			var ss=rowData['deviceid'];
			//var value=$("#selectedUser").val();
			var valueid=$("#deviceId").val();
			if(valueid==""||valueid==null){
				//$("#selectedUser").val(cc);
				$("#deviceId").val(ss);
				
			}else{
				//var valuesplit=value.split(",");
				var valueidsplit=valueid.split(",");
				var flag=0;
				for ( var i = 0; i < valueidsplit.length; i++) {
					if(valueidsplit[i]==ss){
						flag=1;
						return;
					}
				}
				if(flag==0){
					//$("#selectedUser").val(value+","+cc);
					$("#deviceId").val(valueid+","+ss);
				}
			}
		}
		//取消选中一行数据
		function unselect(rowIndex,rowData){
			// var value=$("#selectedUser").val().split(",");
			 var valueid=$("#deviceId").val().split(",");
			 //var acceptval=[];
			 var acceptvalid=[];
			 for ( var i = 0; i < valueid.length; i++) {
				if(rowData['deviceid']==valueid[i]){
					continue;
				}
				/*if(acceptval==""){
					acceptval+=value[i];
				}else{
					acceptval+=","+value[i];
				}*/
				if(acceptvalid==""){
					acceptvalid+=valueid[i];
				}else{
					acceptvalid+=","+valueid[i];
				}
				
			}
			// $("#selectedUser").val(acceptval);
			 $("#deviceId").val(acceptvalid);
		}
		//选中所有行
		function selectAll(){
			//var value=$("#selectedUser").val().split(",");
			var valueid=$("#deviceId").val().split(",");
			var selected=$("#datagrid").datagrid('getSelections');
			for ( var j = 0; j < selected.length; j++) {
				var tt=0;
				for ( var i = 0; i < valueid.length; i++) {
					if(valueid[i]==selected[j]['deviceid']){
						tt=1;
					}
				}
				if(tt==0){
					/*if(value==""){
						value+=selected[j]['realname'];
					}else{
						value+=","+selected[j]['realname'];
					}*/
					if(valueid==""){
						valueid+=selected[j]['deviceid'];
					}else{
						valueid+=","+selected[j]['deviceid'];
					}
				}
			}
			//$("#selectedUser").val(value);
			$("#deviceId").val(valueid);
		}
		//取消选中所有行
		function unselectAll(){
			var rows = $('#datagrid').datagrid('getRows');
			//var value=$("#selectedUser").val().split(",");
			var valueid=$("#deviceId").val().split(",");
			//var receive=[];
			var receiveid=[];
			for ( var j = 0; j <valueid.length; j++) {
				var tt=0;
				for ( var i = 0; i < rows.length; i++) {
					
					if(valueid[j]==rows[i]['deviceid']){
						tt=1;
						continue;
					}
				}
				if(tt==0){
					/* if(receive==""){
						receive+=value[j];
					}else{
						receive+=","+value[j];
					}*/
					if(receiveid==""){
						receiveid+=valueid[j];
					}else{
						receiveid+=","+valueid[j];
					}
				}
			}
			//$("#selectedUser").val(receive);
			$("#deviceId").val(receiveid);
		}

//任务监测项目复选框
function itemCheckBoxList(){
	$.ajax({
		type:'POST',
		url:rootPath + '/monitorproject/deviceuserecord/samplingdeviceuserecord!getItemCheckBoxList.action?projectcode='+projectcode+'&monitorpointid='+monitorpointid,
		success:function(msg){
			$("#innerItem").html(msg);
			
			$('#selectall').click(function(){
				var isChecked = $("#selectall").attr("checked");
				if(isChecked){
					$("input[type=checkbox][name=itemname]").attr("checked",true);
				}else{
					$("input[type=checkbox][name=itemname]").removeAttr("checked");
				}
			});
		}
	});
}

		