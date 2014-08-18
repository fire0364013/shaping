function initBatchDataGrid(itemid) {
	$('#batchdatagrid').datagrid(
		{
			nowrap : false,
			striped : true,
			collapsible : true,
			url : rootPath+'/sampletest/batch/batch!batchList.action?itemid='+itemid, 
			sortName : 'itemid',
			sortOrder : 'asc',
			remoteSort : false,						
			fit : true,
			fitColumns : true,
			scrollbarSize : 0,
			singleSelect:true,
			idField:'itemid',	
			columns : [ [
				{
					field : 'batchno',
					title : '批号',
					width : 80,
					align : 'center'
				},
				{
					field : 'status',
					title : '状态',
					width : 80,
					align : 'center'
				},
				{
					field : 'methodid',
					title : '分析方法',
					width : 200,
					align : 'center'
				},
				{
					field : 'deviceid',
					title : '分析仪器',
					width : 200,
					align : 'center'
				},
				{
					field : 'anlysetime',
					title : '分析时间',
					width : 120,
					align : 'center'
				},
				{
					field : 'anlyseperson',
					title : '分析人',
					width : 100,
					align : 'center'
				},
				{
					field : 'temp',
					title : '超标情况',
					width : 100,
					align : 'center'
				}
			] ],
			onLoadSuccess:function(){
				//默认加载第一行的基本信息
				$('#batchdatagrid').datagrid('selectRow',0);
				var rowData = $('#batchdatagrid').datagrid('getSelected');
				seldatagrid(itemid,rowData.batchno);
			},onClickRow:function(rowIndex, rowData){
				$('#batchdatagrid').datagrid('selectRow',parseInt(rowIndex));
				var rowData = $('#batchdatagrid').datagrid('getSelected');
				seldatagrid(itemid,rowData.batchno);
			},
			onRowContextMenu:function(e,row,rowData){
				$("#batchdatagrid").datagrid("clearSelections");
				$('#batchdatagrid').datagrid('selectRow',parseInt(row));
				$("#batchinfoMenu").menu("show", {left: e.pageX,top: e.pageY});
				e.preventDefault();
			}
			
			/*
			 * <div id="batchdataenter" onClick="batchdataenter();"> 数据录入</div>
	        <div id="viewchart" onClick="viewchart()">查看校准曲线</div>
	        <div id="addfileu" onClick="addfileu()">附件</div>
			<div id="showDataSourceDialog" onClick="showDataSourceDialog()">追溯</div>
			<div id="yiqishiyongjilu" onClick="yiqishiyongjilu()">仪器使用记录</div>
			 */
		});
		$(window).resize(function() {
			$("#batchdatagrid").datagrid('resize');
		});
		$("#jiance").resize(function(){
			$("#batchdatagrid").datagrid('resize');
		});
}
//添加批信息
function addBatchInfo(){
		var url = rootPath + "/sampletest/batch/batch!input.action";
		if(itemid!=""){
			url = url + "?itemid="+itemid;
		}
		var _dialog =  window.top.$('<div id ="batch-dlg" style="padding:0px;"><iframe id="batchFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
		_dialog.dialog({
		title:'检验批次编辑',
		autoOpen:false,
		modal:true,
		closed:true,
		width:'320',
		height:'230',
		buttons:[{
			text:'保存',
			iconCls:'icon-save',
			handler:function(){			
				$("#batchFrame",top.document.body).contents().find("#batchform").form('submit',{
						url:rootPath + '/sampletest/batch/batch!save.action',
						onSubmit:function(){
							var objs = $("#batchFrame",top.document.body).contents().find(".grkj-validate");
							
							if(!saveCheck(objs)){
//								$("#batchFrame",top.document.body).contents().find(":input").focus();
//								$("#batchFrame",top.document.body).contents().find("select").focus();
								alert("数据输入不符合格式，请查看红色边框的输入框的输入提示！");
								return false;
							}
						},
						success : function(data) {
							if (data == 'fail') {
								alert("修改失败！");
								return;
							}
							if (data == 'success') {
								_dialog.dialog('close');
								$("#batchdatagrid").datagrid('reload');
								alert('保存成功！');
							}
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

//加载分析方法
function getItemMethodListByItemidJson() {
	var itemid = $("#batchFrame",top.document.body).contents().find('#itemid').val();
	$.ajax( {
		type : 'GET',
		url : rootPath+'/sampletest/batch/batch!getItemMethodListByItemidJson.action?timeStamp='+new Date().getTime(),//给该url一个时间戳~~这样就必须每次从服务器读取数据,
		data : {'itemid':itemid},
		async:false,//同步
		success : function(data) {
			var vData = eval("(" + data + ")");
			var lList = "";//<option value=''>---请选择---</option>";			
			//遍历json数据  
			jQuery.each(vData.rowsData, function(i, n) {//alert( n.methodname);
				if(n.isdefault='Y'){
					lList += "<option value=" + n.methodid + " selected>" + n.methodname	+ "</option>";					
				}else{
					lList += "<option value=" + n.methodid + ">" + n.methodname	+ "</option>";
				}				
			});		
			//绑定数据到listLeft
			$("#batchFrame",top.document.body).contents().find('#methodid').append(lList);
		}
	});
}

//加载分析仪器
function getDeviceListByItemidAndMethodJson() {
	//查询时调用
	var methodid = $("#batchFrame",top.document.body).contents().find('#methodid').val();
	var itemid = $("#batchFrame",top.document.body).contents().find('#itemid').val();
	$.ajax( {
		type : 'GET',
		url : rootPath+'/sampletest/batch/batch!getDeviceListByItemidAndMethodJson.action?timeStamp='+new Date().getTime(),//给该url一个时间戳~~这样就必须每次从服务器读取数据,
		data : {'itemid':itemid,'methodid' : methodid},
		async:false,//同步
		success : function(data) {
			var vData = eval("(" + data + ")");
			var lList = "<option value=''>---请选择---</option>";
			//遍历json数据  
			jQuery.each(vData.rowsData, function(i, n) {
				lList += "<option value=" + n.deviceid + ">" + n.devicename	+ "</option>";
			});				
			//绑定数据到listLeft
			$("#batchFrame",top.document.body).contents().find('#deviceid').append(lList);
		}
	});
}