	$(function(){
			$('#datagrid1').datagrid({
				checkbox:true,
				nowrap: false,
				striped: true,
				collapsible:true,
				url:rootPath+"/message/messagegroup!toOneAndManyList.action?groupid="+groupid,
				fit:true,
				fitColumns:true,
				remoteSort: false,
				idField:'userid',
				pageSize:10,
				scrollbarSize:0,
				pageList:[10,20,30,40],
				
				columns:[[
						{field:'userid',checkbox:true,align:"center"},
						{field:'realname',title:'姓名',width:60,align:"center"}	,
						{field:'rel',title:'电话',width:80,align:"center"}
				]],
				
				pagination:true,
				rownumbers:true,
				onLoadSuccess:loadSucces,
				onSelect:onselect,
				onUnselect:unselect,
				onSelectAll:selectAll,
				onUnselectAll:unselectAll
			});
			
		});
		
		function loadSucces(data){
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
		//选择一行数据
		function onselect(rowIndex,rowData){
			//alert(0);
			var cc=rowData['realname'];
			var ss=rowData['userid'];
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
				if(rowData['userid']==valueid[i]){
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
			var selected=$("#datagrid1").datagrid('getSelections');
			for ( var j = 0; j < selected.length; j++) {
				var tt=0;
				for ( var i = 0; i < valueid.length; i++) {
					if(valueid[i]==selected[j]['userid']){
						tt=1;
					}
				}
				if(tt==0){
					if(value==""){
						value+=selected[j]['realname'];
					}else{
						value+=","+selected[j]['realname'];
					}
					if(valueid==""){
						valueid+=selected[j]['userid'];
					}else{
						valueid+=","+selected[j]['userid'];
					}
				}
			}
			$("#selectedUser").val(value);
			$("#selectedUserid").val(valueid);
		}
		//取消选中所有行
		function unselectAll(){
			var rows = $('#datagrid1').datagrid('getRows');
			var value=$("#selectedUser").val().split(",");
			var valueid=$("#selectedUserid").val().split(",");
			var receive=[];
			var receiveid=[];
			for ( var j = 0; j <valueid.length; j++) {
				var tt=0;
				for ( var i = 0; i < rows.length; i++) {
					
					if(valueid[j]==rows[i]['userid']){
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