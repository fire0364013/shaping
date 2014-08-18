
	function inititems(items){
		var documentWidth=document.body.clientWidth;
			$('#selectitem').datagrid({
				width:documentWidth,
				height:355,
				nowrap: false,
				striped: true,
				collapsible:true,
				url:rootPath +'/iteminfo/iteminfo!toList.action', 
				fit:true,
				fitColumns : true,
				scrollbarSize:0,
				remoteSort: false,
				singleSelect:false,
				idField:'itemid',
				pageSize:10,
				pageList:[10,20,30,40],
				frozenColumns:[[
					{field:'ck',checkbox:true,align:"center"}
				]],
				columns:[[
					{field:'monitoritemtype',title:'监测类型',width:100,align:"center"}	,//monitoritemtype
					{field:'itemname',title:'监测项目',width:100,align:"center"}	//itemname
				]],
				pagination:true,//分页
				rownumbers:true,
				onLoadSuccess:loadSucces,
				onSelect:onselect,
				onUnselect:unselect,
				onSelectAll:selectAll,
				onUnselectAll:unselectAll
			});
			$(window).resize(function() {
				$("#selectitem").datagrid('resize', {
					width : function() {
						return documentWidth;
					},
					height : function() {
						return document.body.clientHeight;
					}
				});
			});
		}
		function loadSucces(data){
			var value=$("#selectedItemnames").val();
			var valueids=$("#selectedItemid").val();
			var valueid=$("#selectedItemid").val().split(",");
			//alert(valueids);
			if(valueids!=null&&valueids!=""){
				for ( var i = 0; i < valueid.length; i++) {
					//alert(valueid[i]);
					var rows = $('#selectitem').datagrid('selectRecord',valueid[i]);
				}
				
			}
		}
		//选择一行数据
		function onselect(rowIndex,rowData){
			var cc=rowData['itemname'];
			var ss=rowData['itemid'];
			var value=$("#selectedItemnames").val();
			var valueid=$("#selectedItemid").val();
			if(value==""){
				$("#selectedItemnames").val(cc);
				$("#selectedItemid").val(ss);
				
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
					$("#selectedItemnames").val(value+","+cc);
					$("#selectedItemid").val(valueid+","+ss);
				}
			}
		}
		//取消选中一行数据
		function unselect(rowIndex,rowData){
			 var value=$("#selectedItemnames").val().split(",");
			 var valueid=$("#selectedItemid").val().split(",");
			 var acceptval=[];
			 var acceptvalid=[];
			 for ( var i = 0; i < value.length; i++) {
				if(rowData['itemid']==valueid[i]){
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
			 $("#selectedItemnames").val(acceptval);
			 $("#selectedItemid").val(acceptvalid);
		}
		//选中所有行
		function selectAll(){
			var value=$("#selectedItemnames").val().split(",");
			var valueid=$("#selectedItemid").val().split(",");
			var selected=$("#selectitem").datagrid('getSelections');
			for ( var j = 0; j < selected.length; j++) {
				var tt=0;
				for ( var i = 0; i < valueid.length; i++) {
					if(valueid[i]==selected[j]['itemid']){
						tt=1;
					}
				}
				if(tt==0){
					if(value==""){
						value+=selected[j]['itemname'];
					}else{
						value+=","+selected[j]['itemname'];
					}
					if(valueid==""){
						valueid+=selected[j]['itemid'];
					}else{
						valueid+=","+selected[j]['itemid'];
					}
				}
			}
			$("#selectedItemnames").val(value);
			$("#selectedItemid").val(valueid);
		}
		//取消选中所有行
		function unselectAll(){
			var rows = $('#selectitem').datagrid('getRows');
			var value=$("#selectedItemnames").val().split(",");
			var valueid=$("#selectedItemid").val().split(",");
			var receive=[];
			var receiveid=[];
			for ( var j = 0; j <valueid.length; j++) {
				var tt=0;
				for ( var i = 0; i < rows.length; i++) {
					
					if(valueid[j]==rows[i]['itemid']){
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
			$("#selectedItemnames").val(receive);
			$("#selectedItemid").val(receiveid);
		}
		
		function query(){
			var itemname=$("#itemname").val();
			var itemtypeid=$("#itemtypeid").val();
			$('#selectitem').datagrid( {
				queryParams : {
				monitoritemtype : itemtypeid,
				itemname:itemname
				},
				pageNumber:1		
			});
		}