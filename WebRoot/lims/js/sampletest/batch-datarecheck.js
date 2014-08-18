function initBatchDataGrid(itemid,flag) {
	var flagUrl;
	if(flag=='flag'){ //此处是加载的时候不查询后台，但是要把头儿展示出来。2012-04-11
		flagUrl="";
	}else{
		flagUrl=rootPath+'/sampletest/batch/batch!batchDataRecheckList.action?itemid='+itemid;
	}
	$('#batchdatagrid').datagrid(
		{
			nowrap : false,
			striped : true,
			collapsible : true,
			url : flagUrl, 
			sortName : 'batchno',
			sortOrder : 'asc',
			remoteSort : false,						
			fit : true,
			fitColumns : true,
			scrollbarSize : 0,
			singleSelect:true,
			idField:'batchno',	
			frozenColumns:[[
				{	field : 'id',
					title : '&nbsp;',
					width : 30,
					align : 'center',
					formatter : function(value){
						return "<input type='radio' name='radio'/>";
					}
				}
			]],
			columns : [ [
//				{
//					field:'batchno2',
//					checkbox:true,
//					align : 'center'
//				},
				{
					field : 'batchno',
					title : '批号',
					width : 50,
					align : 'center'
				},
				{
					field : 'status',
					title : '状态',
					width : 50,
					align : 'center'
				},
				{
					field : 'methodname',
					title : '分析方法',
					width : 250,
					align : 'center'
				},
				{
					field : 'devicename',
					title : '分析仪器',
					width : 150,
					align : 'center'
				},
				{
					field : 'anlysetime',
					title : '分析时间',
					width : 80,
					align : 'center'
				}/*,
				{
					field : 'anlyseperson',
					title : '分析人',
					width : 50,
					align : 'center'
				},
				{
					field : 'temp',
					title : '超标情况',
					width : 50,
					align : 'center',
					formatter:function(value,rowData,rowIndex){
						var temp="";
						if(value!=''){
							if(value=='0'){
								temp = '正常';
							}else if(value=='1'){
								temp = '<span style="color:red">超标</span>';
							}else if(value=='2'){
								temp = '<span style="color:#006600">未检出</span>';
							}
						}
						return temp;
					}
				}*/
			] ],
			onLoadSuccess:function(){
				$("#batchdatagrid").datagrid("clearSelections");
				//默认加载第一行的基本信息
				$('#batchdatagrid').datagrid('selectRow',0);
				var rowData = $('#batchdatagrid').datagrid('getSelected');
				if(rowData!=null){
					seldatagrid(itemid,rowData.batchno,'');
				}else{
					seldatagrid('','','');
				}
			},onClickRow:function(rowIndex, rowData){
//				$("#batchdatagrid").datagrid("clearSelections");
//				$('#batchdatagrid').datagrid('selectRow',parseInt(rowIndex));
//				var rowData = $('#batchdatagrid').datagrid('getSelected');
//				if(rowData!=null){
					seldatagrid(itemid,rowData.batchno);
//				}
			},onSelect:function(){
				checkRadio();
			}/*,onRowContextMenu:function(e,row,rowData){
				$("#batchdatagrid").datagrid("clearSelections");
				$('#batchdatagrid').datagrid('selectRow',parseInt(row));
				$("#batchinfoMenu").menu("show", {left: e.pageX,top: e.pageY});
				e.preventDefault();
			}*/			
		});
		$(window).resize(function() {
			$("#batchdatagrid").datagrid('resize');
		});
		$("#jiance").resize(function(){
			$("#batchdatagrid").datagrid('resize');
		});
}

//单选按钮
function checkRadio(){
		var row = $('#batchdatagrid').datagrid('getSelected');
		var rowNum = 0;
		var rows = $('#batchdatagrid').datagrid('getRows');
		for ( var i = 0; i < rows.length; i++) {
			if (row == rows[i]) {
				rowNum = i;
				break;
			}
		}
		var radios = $("input[type=radio]");
		$(radios[rowNum]).attr("checked", true);
}
	
//数据复核
function batchdataenter(){
	var batchno="";
	var itemid="";
	var methodid="";
	var batchrows = $("#batchdatagrid").datagrid("getSelections");
	if(batchrows!=''){
		batchno=batchrows[0].batchno;
		itemid=batchrows[0].itemid;
		methodid=batchrows[0].methodid;
	}
//	alert(batchno);
	if(batchno!=""){	
		var url = rootPath + "/sampletest/sampletestbybatch!toDataRecheck.action";
		url = url + "?itemid="+itemid+"&batchno="+batchno+"&methodid="+methodid;
		////maximize:yes;最大化   minimize:yes  最小化
		var features="dialogWidth:"+(window.screen.availWidth-0).toString()+"px;dialogHeight:"+(window.screen.availHeight).toString()+"px;scroll:no;center:yes;resizable:no;status:no;location:no;minimize:yes;";
		//alert(window.screen.availHeight+"     "+document.body.clientHeight);
		var sReturn=window.showModalDialog(url,null,features);
		if (typeof(sReturn) != "undefined")
       	{
	       if(sReturn=="1")
	       {
	        	alert("提交成功！");	
	        	var batchrows2 = $("#batchdatagrid").datagrid("getSelections");
				$("#datagrid").datagrid('reload');
				initBatchDataGrid(batchrows2[0].itemid,'');
	       }else if(sReturn=="2"){
	    	   alert("退回成功！");	
	        	var batchrows2 = $("#batchdatagrid").datagrid("getSelections");
				$("#datagrid").datagrid('reload');
				initBatchDataGrid(batchrows2[0].itemid,'');
	       }
		}
//		var url = rootPath + "/sampletest/sampletestbybatch!toDataRecheck.action";
//		url = url + "?itemid="+itemid+"&batchno="+batchno+"&methodid="+methodid;
//		
//		var _dialog =  window.top.$('<div id ="dlg" style="padding:0px;"><iframe id="dataenterFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
//		_dialog.dialog({
//		title:'数据复核',
//		autoOpen:false,
//		modal:true,
//		closed:true,
//		width:'1100',
//		height:'600',
//		buttons:[{
//			text:'保存',
//			iconCls:'icon-save',
//			handler:function(){
//			
//			}
//		},{
//			text:'取消',
//			iconCls:'icon-cancel',
//			handler:function(){
//				_dialog.dialog('close');
//				}
//		}],
		//onClose:function(){
		//		_dialog.dialog("destroy");
//				$("#datagrid").datagrid('reload');
//				initBatchDataGrid(itemid);
			//}
//		});
//		_dialog.dialog('open');
		
	}else{
		alert("请选择一个批号！");
	}
}
////提交
//function submitDialog(){
//	var rows = $('#batchdatagrid').datagrid('getSelections');
//	if (rows!=null && rows!="") { 		
// 		if(window.confirm('是否提交？'))
// 		{
//			var strBatchno =""; 
//			for(var i=0;i<rows.length;i++){
//				strBatchno=strBatchno+rows[i].batchno2+",";	
//			}
//			strBatchno = strBatchno.substring(0,strBatchno.length-1);
////			alert(strBatchno);
//			$.post(
//				rootPath + "/sampletest/batch/batch!setAllStatus.action?json="+strBatchno,				
//				function(msg){
//						if(msg=='success'){
//							alert("提交成功！");
//							$('#batchdatagrid').datagrid('clearSelections');
//							$("#batchdatagrid").datagrid('reload');
//						}else{
//							alert("提交失败！");
//							$('#batchdatagrid').datagrid('clearSelections');
//						}
//					}
//			);
//		}
//	} else {
//		alert('请至少选择一条记录！');
//		return;
//	}
//}

//审核记录
function showSampleitemrecordDialog(){
	var batchrows = $("#seldatagrid").datagrid("getSelections");
	var itemid=batchrows[0].itemid;
	var samplecode=batchrows[0].samplecode;
	
	if(samplecode!=""){
		var url = rootPath + "/sampletest/itemtestbackrecord!toSampleitemrecordList.action?samplecode="+samplecode+"&itemid="+itemid;
		var _dialog =  window.top.$('	<div id ="ds-dlg" style="padding:0px;"><iframe id="dataSourceFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
		_dialog.dialog({
			title:'审核记录',
			autoOpen:false,
			position:'center',
			modal:true,
			closed:true,
			width:'800',
			height:'500',
			onClose:function(){
				_dialog.dialog("destroy");
			}
		});
		_dialog.dialog('open');	
	}else{
		alert("请选择一个样品！");
	}
}