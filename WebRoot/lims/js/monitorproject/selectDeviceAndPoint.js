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
			{field:'devicenum',title:'仪器编号',width:200,align : 'center'},
			{field:'devicename',title:'仪器名称',width:281,align : 'center'}	,
			{field:'leavefactorynum',title:'出厂编号',width:200,align : 'center'}	,
			{field:'spectype',title:'规格型号',width:200,align : 'center'}
		]],
		pagination:true,
		rownumbers:true,
		pageSize:10,
		pageList:[10,20,30],
		onSelect:function(){
			checkRadio();
			var row = $("#datagrid").datagrid("getSelected");
			$("#deviceId").val(row.deviceid);
			$("#deviceName").val(row.devicename);
			$("#deviceNum").val(row.devicenum);
		},
		onLoadSuccess:function(){
			var valueids=$("#deviceId").val();
			$('#datagrid').datagrid('selectRecord',valueids);
		}
	});
	$(window).resize(function(){
		$("#datagrid").datagrid('resize');
	})	;
};
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

//仪器查询
function searchDevice(){
	var deviceNnames = $('#deviceNnames').val();			//仪器名称
	var devicenum = $('#devicenum').val();  		//仪器编号
	var leavenum = $('#leavenum').val(); //出厂编号
	var spectypeid = $('#spectypeid').val();//规格型号 
	$('#datagrid').datagrid( {
		queryParams : {
			deviceNnames : deviceNnames,
			devicenum : devicenum,
			spectypeid:spectypeid,
			leavenum:leavenum
		},
		pageNumber:1
	});
}




/* function ponitList(){
	$('#dataPonit').treegrid({
	nowrap: false,
		striped: true,
		collapsible:true,
		url:rootPath +"/monitorproject/samperegister/samperegister!toMonitorinfoList.action?projectid="+projectid, 
		fit:true,
		fitColumns : true,
		scrollbarSize:0,
		remoteSort: false,
		singleSelect:false,
		rownumbers:false, 
		idField:'id',
		treeField:'monitorpointtypename',
		frozenColumns:[[
		                {field:'id',width:40,checkbox:true,align:"center"}
					]],
		columns:[[
					{field:'monitorpointtypename',title:'监测点编码', width:120,align:"left"},
					{field:'pointname',title:'监测点名称', width:140,align:"center"},
			]],
		onClickRow:function(rowData){
			//点击一行 加载采样设置信息
			if(rowData.projectpointid!=""){
				departid=rowData.departid;
				groupid=rowData.deptgroupid;
				$('#monitorinfolist').treegrid('clearSelections');
				$("#monitorinfolist").treegrid('select',rowData.id);
			}
		},onSelect:function(rowData){
			if(rowData.projectpointid=="");{
				var nodes = $('#monitorinfolist').treegrid('getChildren', rowData.id);
				for ( var i = 0; i < nodes.length; i++) {
					$('#monitorinfolist').treegrid('select', nodes[i].id);
				}
			}
		},onUnselect:function(rowData){
			if(rowData.projectpointid=="");{
				var nodes = $('#monitorinfolist').treegrid('getChildren', rowData.id);
				for ( var i = 0; i < nodes.length; i++) {
					$('#monitorinfolist').treegrid('unselect', nodes[i].id);
				}
			}
		},onSelectAll:function(rows){
		},onUnselectAll:function(rows){
		}
	});
	$(window).resize(function() {
		$("#monitorinfolist").treegrid('resize');
	});
	
};
	function loadSucces(data){
			//一下是原来的部分
			var value=$("#selectedUser").val();
			var valueids=$("#selectedUserid").val();
			var valueid=$("#selectedUserid").val().split(",");
			
			//alert(valueids);
			if(valueids!=null&&valueids!=""){
				for ( var i = 0; i < valueid.length; i++) {
					//alert(valueid[i]);
					var rows = $('#datagrid1').datagrid('selectRecord',valueid[i]);
				}
				
			}
		}
 */		
/**
 * 选择监测点列表
 * 
 * 
 */
function ponitList(){
	$('#dataPonit').datagrid({
			//title:'人员列表',
				checkbox:true,
				nowrap: false,
				striped: true,
				collapsible:true,
				url:rootPath +"/monitorproject/deviceuserecord/samplingdeviceuserecord!getMoinPonitData.action?projectcode="+projectcode,
				fit:true,
				fitColumns:true,
				remoteSort: false,
				scrollbarSize:0,
				idField:'projectpointid',
				pageSize:10,
				pageList:[10,20,30,40],
				
				columns:[[
						{field:'projectpointid',checkbox:true},
						{field:'monitorpointtypename',title:'监测点类型',width:140,align:"center"}	,
						{field:'monitorpointname',title:'监测点名称',width:140,align:"center"}	,
						{field:'monitorpointcode',title:'监测点编码',width:140,align:"center"}					
				]],
				
				pagination:true,
				rownumbers:true,
				onLoadSuccess:loadSucces,
				onSelect:onselect,
				onUnselect:unselect,
				onSelectAll:selectAll,
				onUnselectAll:unselectAll
	});
	$(window).resize(function(){
		$("#dataPonit").datagrid('resize');
	})	;
}
function loadSucces(data){
			//一下是原来的部分
			var value=$("#selectedUser").val();
			var valueids=$("#selectedUserid").val();
			var valueid=$("#selectedUserid").val().split(",");
			
			//alert(valueids);
			if(valueids!=null&&valueids!=""){
				for ( var i = 0; i < valueid.length; i++) {
					//alert(valueid[i]);
					var rows = $('#dataPonit').datagrid('selectRecord',valueid[i]);
				}
				
			}
		}
		//选择一行数据
		function onselect(rowIndex,rowData){
			//alert(0);
			var cc=rowData['monitorpointname'];
			var ss=rowData['monitorpointid'];
			var value=$("#selectedUser").val();
			var valueid=$("#selectedUserid").val();
			if(value==""||value==null){
				$("#selectedUser").val(cc);
				$("#selectedUserid").val(ss);
				
			}else{
				var valuesplit=value.split(",");
				var valueidsplit=valueid.split(",");
				var flag=0;
				for ( var i = 0; i < valueidsplit.length; i++) {
					if(valueidsplit[i]==ss){
						flag=1;
						return;
					}
				}
				if(flag==0){
					$("#selectedUser").val(value+","+cc);
					$("#selectedUserid").val(valueid+","+ss);
				}
			}
		}
		//取消选中一行数据
		function unselect(rowIndex,rowData){
			 var value=$("#selectedUser").val().split(",");
			 var valueid=$("#selectedUserid").val().split(",");
			 var acceptval=[];
			 var acceptvalid=[];
			 for ( var i = 0; i < value.length; i++) {
				if(rowData['monitorpointid']==valueid[i]){
					continue;
				}
				if(acceptval==""){
					acceptval+=value[i];
				}else{
					acceptval+=","+value[i];
				}
				if(acceptvalid==""){
					acceptvalid+=valueid[i];
				}else{
					acceptvalid+=","+valueid[i];
				}
				
			}
			 $("#selectedUser").val(acceptval);
			 $("#selectedUserid").val(acceptvalid);
		}
		//选中所有行
		function selectAll(){
			var value=$("#selectedUser").val().split(",");
			var valueid=$("#selectedUserid").val().split(",");
			var selected=$("#dataPonit").datagrid('getSelections');
			for ( var j = 0; j < selected.length; j++) {
				var tt=0;
				for ( var i = 0; i < valueid.length; i++) {
					if(valueid[i]==selected[j]['monitorpointid']){
						tt=1;
					}
				}
				if(tt==0){
					if(value==""){
						value+=selected[j]['monitorpointname'];
					}else{
						value+=","+selected[j]['monitorpointname'];
					}
					if(valueid==""){
						valueid+=selected[j]['monitorpointid'];
					}else{
						valueid+=","+selected[j]['monitorpointid'];
					}
				}
			}
			$("#selectedUser").val(value);
			$("#selectedUserid").val(valueid);
		}
		//取消选中所有行
		function unselectAll(){
			var rows = $('#dataPonit').datagrid('getRows');
			var value=$("#selectedUser").val().split(",");
			var valueid=$("#selectedUserid").val().split(",");
			var receive=[];
			var receiveid=[];
			for ( var j = 0; j <valueid.length; j++) {
				var tt=0;
				for ( var i = 0; i < rows.length; i++) {
					
					if(valueid[j]==rows[i]['monitorpointid']){
						tt=1;
						continue;
					}
				}
				if(tt==0){
					if(receive==""){
						receive+=value[j];
					}else{
						receive+=","+value[j];
					}
					if(receiveid==""){
						receiveid+=valueid[j];
					}else{
						receiveid+=","+valueid[j];
					}
				}
			}
			$("#selectedUser").val(receive);
			$("#selectedUserid").val(receiveid);
		}
		
		