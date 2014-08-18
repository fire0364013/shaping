$(function(){
	var documentWidth=document.body.clientWidth;
			$('#selectdepardata').datagrid({
				//title:'用户信息列表',
				width:documentWidth,
				height:355,
				nowrap: false,
				striped: true,
				collapsible:true,
				url:rootPath +'/departmentinfo/departmentinfo!toList.action', 
				fit:true,
				fitColumns : true,
				scrollbarSize:0,
				remoteSort: false,
				idField:'deptid',
				singleSelect:false,
				pageSize:10,
				pageList:[10,20,30,40,50],
				frozenColumns:[[
					{field:'deptid',checkbox:true,align:"center"}
								]],
				columns:[[
						{field:'deptname',title:'部门名称',width:425,align:"center"}					
											
				]],
				pagination:true,
				rownumbers:true,
				onLoadSuccess:loadSucces,
				onSelect:onselect,
				onUnselect:unselect,
				onSelectAll:selectAll,
				onUnselectAll:unselectAll
			});
			$(window).resize(function() {
				$("#selectdepardata").datagrid('resize', {
					width : function() {
						return documentWidth;
					},
					height : function() {
						return document.body.clientHeight;
					}
				});
			});
});	
		function loadSucces(data){
			var value=$("#seletdeptnames").val();
			var valueids=$("#seletdeptid").val();
			var valueid=$("#seletdeptid").val().split(",");
			//alert(valueids);
			if(valueids!=null&&valueids!=""){
				for ( var i = 0; i < valueid.length; i++) {
					//alert(valueid[i]);
					var rows = $('#selectdepardata').datagrid('selectRecord',valueid[i]);
				}
				
			}
		}
		//选择一行数据
		function onselect(rowIndex,rowData){
			var cc=rowData['deptname'];
			var ss=rowData['deptid'];
			var value=$("#seletdeptnames").val();
			var valueid=$("#seletdeptid").val();
			if(value==""){
				$("#seletdeptnames").val(cc);
				$("#seletdeptid").val(ss);
				
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
					$("#seletdeptnames").val(value+","+cc);
					$("#seletdeptid").val(valueid+","+ss);
				}
			}
		}
		//取消选中一行数据
		function unselect(rowIndex,rowData){
			 var value=$("#seletdeptnames").val().split(",");
			 var valueid=$("#seletdeptid").val().split(",");
			 var acceptval=[];
			 var acceptvalid=[];
			 for ( var i = 0; i < value.length; i++) {
				if(rowData['deptid']==valueid[i]){
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
			 $("#seletdeptnames").val(acceptval);
			 $("#seletdeptid").val(acceptvalid);
		}
		//选中所有行
		function selectAll(){
			var value=$("#seletdeptnames").val().split(",");
			var valueid=$("#seletdeptid").val().split(",");
			var selected=$("#selectdepardata").datagrid('getSelections');
			for ( var j = 0; j < selected.length; j++) {
				var tt=0;
				for ( var i = 0; i < valueid.length; i++) {
					if(valueid[i]==selected[j]['deptid']){
						tt=1;
					}
				}
				if(tt==0){
					if(value==""){
						value+=selected[j]['deptname'];
					}else{
						value+=","+selected[j]['deptname'];
					}
					if(valueid==""){
						valueid+=selected[j]['deptid'];
					}else{
						valueid+=","+selected[j]['deptid'];
					}
				}
			}
			$("#seletdeptnames").val(value);
			$("#seletdeptid").val(valueid);
		}
		//取消选中所有行
		function unselectAll(){
			var rows = $('#selectdepardata').datagrid('getRows');
			var value=$("#seletdeptnames").val().split(",");
			var valueid=$("#seletdeptid").val().split(",");
			var receive=[];
			var receiveid=[];
			for ( var j = 0; j <valueid.length; j++) {
				var tt=0;
				for ( var i = 0; i < rows.length; i++) {
					
					if(valueid[j]==rows[i]['deptid']){
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
			$("#seletdeptnames").val(receive);
			$("#seletdeptid").val(receiveid);
		}
		
		function query(){
			var deptnames=$("#deptnames").val();
			$('#selectdepardata').datagrid( {
				queryParams : {
				deptnames : deptnames
				},
				pageNumber:1		
			});
			//location.href = "departmentinfo.action?deptid=" + deptid+"&deptnames="+deptnames;
			
		}