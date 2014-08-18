	function initDataTree() {
		/**	$('#SampleTagFrametree').tree({
				url: rootPath+"/monitorproject/samperegister/samperegister!showSampleTagTree.action?projectid="+projectid,
				onClick:function(node){
					var myur=rootPath+"/monitorproject/samperegister/samperegister!sampleTagCodeList.action?projectcode="+projectcode+"&monitorpointtypeid="+node.id+"&projectid="+projectid;
					initDataGrid(myur);
				}打标签：sampleTagCodeList
				* 小标签：sampleTagCodeListTwo
				* 小标签都比打标签多一个后缀Two 但是所在文件的位置都是同一个
				* 项目名称取reportitemname.顿号隔开。wjy
			});*///
		var myur=rootPath+"/monitorproject/samperegister/samperegister!sampleTagCodeList.action?projectcode="+projectcode+"&projectid="+projectid+"&monitorpointtypeid="+monitorpointtypeid+"&monitorpointid="+monitorpointid;
		 initDataGrid(myur);
	}
	
	// 页面加载，数据的展示~~datagrid~~
	function initDataGrid(myurl) {
		var projectcode=$("#projectcode").val();
		var monitorpointtypeid=$("#monitorpointtypeid").val();
		$('#showSampleTagCode').datagrid(
						{
							nowrap : false,
							striped : true,
							collapsible : true,
							singleSelect:false,
							url : myurl,//'samperegister!sampleTagCodeList.action?projectcode='+projectcode+'&monitorpointtypeid='+monitorpointtypeid,
							sortName : 'samplescode',
							idField:'tagid',
							sortOrder : 'asc',
							remoteSort : false,
							fit : true,
							fitColumns : true,
							scrollbarSize : 0,	
							pageSize : 30,
							pageList : [ 30,40,50,60],
							frozenColumns : [ [ {
								field : 'ck',
								checkbox : true,align:"center"
							} ] ],
							columns : [ [
								{
										field : 'monitorpointtype',
										title : '监测点类型',
										width : 90,
										align : 'center'
									},
									{
										field : 'monitorpointtypecode',
										title : '监测点编码',
										width : 70,
										align : 'center'
									},
									{
										field : 'monitorpointtypename',
										title : '监测点名称',
										width : 120,
										align : 'center'
									},
									{
										field : 'samplescode',
										title : '样品编号',
										width : 80,
										align : 'center'
									},
									{
										field : 'qctypeid',
										title : '质控类型',
										width : 70,
										align : 'center'
									},
									{
										field : 'parentsamplecode',
										title : '关联样品编号',
										width : 80,
										align : 'center'
									},
									{
										field : 'timetag',
										title : '时间',
										width : 40,
										align : 'center'
									},
									{
										field : 'samplesavedose',
										title : '保存剂',
										width : 100,
										align : 'center'
									},
									{
										field : 'itemname',
										title : '监测项目',
										width : 200,
										align : 'center'
									}] ],
									pagination : true,
									rownumbers : true,
								 	onLoadSuccess:loadSucces,
									onSelect:onselect,
								 	onUnselect:unselect,
								 	onSelectAll:selectAll,
									onUnselectAll:unselectAll
						});
		$(window).resize(function() {
			$("#showSampleTagCode").datagrid('resize');
		});
	}

	function loadSucces(data){
		//一下是原来的部分
		//var value=$("#selectedSamplecode").val();
		var valueids=$("#selectedSamplecodeid").val();
		var valueid=$("#selectedSamplecodeid").val().split(",");
		if(valueids!=null&&valueids!=""){
			for ( var i = 0; i < valueid.length; i++) {
				var rows = $('#showSampleTagCode').datagrid('selectRecord',valueid[i]);
			}
		}
	}
	//选择一行数据
	function onselect(rowIndex,rowData){
		var cc=rowData['samplescode'];
		var ss=rowData['tagid'];
		var value=$("#selectedSamplecode").val();
		var valueid=$("#selectedSamplecodeid").val();
		if(value==""||value==null){
			$("#selectedSamplecode").val(cc);
			$("#selectedSamplecodeid").val(ss);
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
				$("#selectedSamplecode").val(value+","+cc);
				$("#selectedSamplecodeid").val(valueid+","+ss);
			}
		}
	}
	//取消选中一行数据
	function unselect(rowIndex,rowData){
		 var value=$("#selectedSamplecode").val().split(",");
		 var valueid=$("#selectedSamplecodeid").val().split(",");
		 var acceptval=[];
		 var acceptvalid=[];
		 for ( var i = 0; i < value.length; i++) {
			if(rowData['tagid']==valueid[i]){
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
		 $("#selectedSamplecode").val(acceptval);
		 $("#selectedSamplecodeid").val(acceptvalid);
	}
	//选中所有行
	function selectAll(){
		var value=$("#selectedSamplecode").val().split(",");
		var valueid=$("#selectedSamplecodeid").val().split(",");
		var selected=$("#showSampleTagCode").datagrid('getSelections');
		for ( var j = 0; j < selected.length; j++) {
			var tt=0;
			for ( var i = 0; i < valueid.length; i++) {
				if(valueid[i]==selected[j]['tagid']){
					tt=1;
				}
			}
			if(tt==0){
				if(value==""){
					value+=selected[j]['samplescode'];
				}else{
					value+=","+selected[j]['samplescode'];
				}
				if(valueid==""){
					valueid+=selected[j]['tagid'];
				}else{
					valueid+=","+selected[j]['tagid'];
				}
			}
		}
		$("#selectedSamplecode").val(value);
		$("#selectedSamplecodeid").val(valueid);
	}
	//取消选中所有行
	function unselectAll(){
		var rows = $('#showSampleTagCode').datagrid('getRows');
		var value=$("#selectedSamplecode").val().split(",");
		var valueid=$("#selectedSamplecodeid").val().split(",");
		var receive=[];
		var receiveid=[];
		for ( var j = 0; j <valueid.length; j++) {
			var tt=0;
			for ( var i = 0; i < rows.length; i++) {
				if(valueid[j]==rows[i]['tagid']){
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
		$("#selectedSamplecode").val(receive);
		$("#selectedSamplecodeid").val(receiveid);
	}
	