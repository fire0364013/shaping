		function myDatas(){
			$('#datagrid1').datagrid({
				//title:'仪器列表',
				checkbox:true,
				nowrap: false,
				striped: true,
				collapsible:true,
				url:rootPath +'/device/info/deviceinfo!toList.action',
				fit:true,
				fitColumns:true,
				remoteSort: false,
				scrollbarSize:0,
				idField:'deviceid',
				pageSize:10,
				pageList:[10,20,30,40],
				frozenColumns:[[
					{field:'deviceid',checkbox:true,align:"center"}
				]],
				columns:[[
//						{field:'devicenum',title:'仪器编号', width:160,align:"center"},	
						{field:'devicetype',title:'仪器设备类型', width:140,align:"center"},
						{field:'devicename',title:'仪器名称', width:240,align:"center"},
						{field:'spectype',title:'规格型号', width:140,align:"center"},
						{field:'leavefactorynum',title:'出厂编号', width:140,align:"center"},
						//{field:'buydate',title:'购置日期', width:120,align:"center"},
						{field:'deptid',title:'使用科室', width:120,align:"center"}
						//{field:'devicestatus',title:'仪器状态 ', width:120,align:"center"},			
				]],
				
				pagination:true,
				rownumbers:true,
				onLoadSuccess:loadSucces,
				onSelect:onselect,
				onUnselect:unselect,
				onSelectAll:selectAll,
				onUnselectAll:unselectAll
			});
			
	}
		
		function loadSucces(data){
			//以下是原来的部分
//			var value=$("#selectedDevice").val();
			var valueids=$("#selectedDeviceid").val();
			var valueid=$("#selectedDeviceid").val().split(",");
			
//			alert(valueids);
			if(valueids!=null&&valueids!=""){// && valueid!=null&&valueid!=""){ 
				for ( var i = 0; i < valueid.length; i++) {
					//alert(valueid[i]);
					$('#datagrid1').datagrid('selectRecord',valueid[i]);
				}
				
			}
		}
		//选择一行数据
		function onselect(rowIndex,rowData){
			//alert(0);
//			var cc=rowData['devicename'];
			var ss=rowData['deviceid'];
//			var value=$("#selectedDevice").val();
			var valueids=$("#selectedDeviceid").val();
			if(valueids==""&&valueids==null){
//				$("#selectedDevice").val(cc);
				$("#selectedDeviceid").val(ss);				
			}else{			
				//var valuesplit=value.split(",");
				var valueidsplit=valueids.split(",");
				var flag=0;
				for ( var i = 0; i < valueidsplit.length; i++) {
					if(valueidsplit[i]==ss){
						flag=1;
						return;
					}
				}
				if(flag==0){
//					$("#selectedDevice").val(value+","+cc);
					if(valueids!=""){
						$("#selectedDeviceid").val(valueids+","+ss);
					}else{
						$("#selectedDeviceid").val(ss);
					}
					
				}
			}
		}
		//取消选中一行数据
		function unselect(rowIndex,rowData){
//			 var value=$("#selectedDevice").val().split(",");
			 var valueid=$("#selectedDeviceid").val().split(",");
			 var acceptval=[];
			 var acceptvalid=[];
			 for ( var i = 0; i < valueid.length; i++) {
				if(rowData['deviceid']==valueid[i]){
					continue;
				}
//				if(acceptval==""){
//					acceptval+=value[i];
//				}else{
//					acceptval+=","+value[i];
//				}
				if(acceptvalid==""){
					acceptvalid+=valueid[i];
				}else{
					acceptvalid+=","+valueid[i];
				}
				
			}
//			 $("#selectedDevice").val(acceptval);
			 $("#selectedDeviceid").val(acceptvalid);
		}
		//选中所有行
		function selectAll(){
//			var value=$("#selectedDevice").val().split(",");
			var valueid=$("#selectedDeviceid").val().split(",");
			var selected=$("#datagrid1").datagrid('getSelections');
			for ( var j = 0; j < selected.length; j++) {
				var tt=0;
				for ( var i = 0; i < valueid.length; i++) {
					if(valueid[i]==selected[j]['deviceid']){
						tt=1;
					}
				}
				if(tt==0){
//					if(value==""){
//						value+=selected[j]['devicename'];
//					}else{
//						value+=","+selected[j]['devicename'];
//					}
					if(valueid==""){
						valueid+=selected[j]['deviceid'];
					}else{
						valueid+=","+selected[j]['deviceid'];
					}
				}
			}
//			$("#selectedDevice").val(value);
			$("#selectedDeviceid").val(valueid);
		}
		//取消选中所有行
		function unselectAll(){
			var rows = $('#datagrid1').datagrid('getRows');
//			var value=$("#selectedDevice").val().split(",");
			var valueid=$("#selectedDeviceid").val().split(",");
			var receive=[];
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
//					if(receive==""){
//						receive+=value[j];
//					}else{
//						receive+=","+value[j];
//					}
					if(receiveid==""){
						receiveid+=valueid[j];
					}else{
						receiveid+=","+valueid[j];
					}
				}
			}
//			$("#selectedDevice").val(receive);
			$("#selectedDeviceid").val(receiveid);
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
			var leavefactorynum = $("#leavefactorynum").val();
			$('#datagrid1').datagrid( {
				queryParams : {
				devicenum : devicenumquery,
				devicename : devicenamequery,
				deptid : depar,
				devicetypeid:divicetype,
				divicestatus:divicestatus,
				spectype:spectype,
				leavefactorynum:leavefactorynum
				},
				pageNumber:1		
			});
		}
		
		//加载部门的下拉列表
function provinceData() {
	var deptidvalue=$("#deptidvalue").val();
	$.ajax( {
		type : 'GET',
		url : rootPath +'/device/info/deviceinfo!getAllDepartJSON.action?timeStamp='+new Date().getTime(),//给该url一个时间戳~~这样就必须每次从服务器读取数据,
		async:false,//同步
		success : function(data) {
			var vData = eval("(" + data + ")");
			var lList = "<option value=''>---请选择---</option>";
			//遍历json数据  
			jQuery.each(vData.rowsData, function(i, n) {
				if(deptidvalue!=''&&n.deptid==deptidvalue){
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
		
		
