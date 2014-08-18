$(function(){
	var documentWidth=document.body.clientWidth;
			$('#datagrid').datagrid({
				//title:'用户信息列表',
				width:documentWidth,
				height:355,
				nowrap: false,
				striped: true,
				collapsible:true,
				url:rootPath +'/monitorpointtype/monitorpointtype!toList.action', 
				fit:true,
				fitColumns : true,
				scrollbarSize:0,
				remoteSort: false,
				idField:'monitorpointtype',
				singleSelect:false,
				pageSize:15,
				pageList:[15,30,45,60],
				frozenColumns:[[
					{field:'monitorpointtype',checkbox:true,align:"center"}
								]],
				columns:[[
				          {field:'monitorpointtypename',title:'监测点类型名称',width:425,align:"center"}					
											
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
				$("#datagrid").datagrid('resize', {
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
			//一下是原来的部分
			var value=$("#seletnames").val();
			var valueids=$("#seletid").val();
			var valueid=$("#seletid").val().split(",");
			
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
			var cc=rowData['monitorpointtypename'];
			var ss=rowData['monitorpointtype'];
			var value=$("#seletnames").val();
			var valueid=$("#seletid").val();
			if(value==""){
				$("#seletnames").val(cc);
				$("#seletid").val(ss);
				
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
					$("#seletnames").val(value+","+cc);
					$("#seletid").val(valueid+","+ss);
				}
			}
		}
		//取消选中一行数据
		function unselect(rowIndex,rowData){
			 var value=$("#seletnames").val().split(",");
			 var valueid=$("#seletid").val().split(",");
			 var acceptval=[];
			 var acceptvalid=[];
			 for ( var i = 0; i < value.length; i++) {
				if(rowData['monitorpointtype']==valueid[i]){
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
			 $("#seletnames").val(acceptval);
			 $("#seletid").val(acceptvalid);
		}
		//选中所有行
		function selectAll(){
			var value=$("#seletnames").val().split(",");
			var valueid=$("#seletid").val().split(",");
			var selected=$("#datagrid").datagrid('getSelections');
			for ( var j = 0; j < selected.length; j++) {
				var tt=0;
				for ( var i = 0; i < valueid.length; i++) {
					if(valueid[i]==selected[j]['monitorpointtype']){
						tt=1;
					}
				}
				if(tt==0){
					if(value==""){
						value+=selected[j]['monitorpointtypename'];
					}else{
						value+=","+selected[j]['monitorpointtypename'];
					}
					if(valueid==""){
						valueid+=selected[j]['monitorpointtype'];
					}else{
						valueid+=","+selected[j]['monitorpointtype'];
					}
				}
			}
			$("#seletnames").val(value);
			$("#seletid").val(valueid);
		}
		//取消选中所有行
		function unselectAll(){
			var rows = $('#datagrid').datagrid('getRows');
			var value=$("#seletnames").val().split(",");
			var valueid=$("#seletid").val().split(",");
			var receive=[];
			var receiveid=[];
			for ( var j = 0; j <valueid.length; j++) {
				var tt=0;
				for ( var i = 0; i < rows.length; i++) {
					
					if(valueid[j]==rows[i]['monitorpointtype']){
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
			$("#seletnames").val(receive);
			$("#seletid").val(receiveid);
		}
		
		function query(){
			var sapletypename=$("#sapletypename").val();
			$('#datagrid').datagrid( {
				queryParams : {
				sapletypename : sapletypename
				},
				pageNumber:1		
			});
		}