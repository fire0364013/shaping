var original = "";
var methodid = "";

//原始记录单左侧任务列表
function taskList(){
	$("#taskInfoList").datagrid({
		url:rootPath + "/sampletest/batch/batch!taskList.action?batchno="+batchno,
		scrollbarSize:0,
		singleSelect:true,
		fit:true,
		fitColumns:true,
		nowrap: false,
		striped: true,
		collapsible:true,
		frozenColumns:[[
			 {field : 'projectid',
						title : '&nbsp;',
						width : 30,
						align : 'center',
						formatter : function(value){
							return "<input type='radio' name='radio'/>";}
				 }
		]],
		columns:[[
			{field:'projectrealcode',title:'项目编号',width:120,align : 'center'}
//			,
//			{field:'projectname',title:'项目名称',width:300,align : 'left'}
		]],
		rownumbers:false,
		onSelect:function(rowIndex,rowData){
			$($("input[type=radio]")[rowIndex]).attr("checked",true);
			if(original!=''){
				$("#originalFrame").attr("src",rootPath + "/common/report!toReportPage.action?" +
			"raq=OriginalList/"+encodeURI(encodeURI(original))+"&projectcode="+rowData.projectcode+"&itemid="+itemid+"&methodid="+methodid+"&originallistno="+rowData.groupno);
			}else{
				alert('没有原始记录单！');
			}
			
		},
		onLoadSuccess:function(data){
			original = data.original;//原始记录单
			methodid = data.methodid;//分析方法
		}
	});
}

function initBatchDataGrid(itemid,flag) {
	var flagUrl;
	if(flag=='flag'){ //此处是加载的时候不查询后台，但是要把头儿展示出来。2012-04-11
		flagUrl="";
	}else{
		flagUrl=rootPath+'/sampletest/batch/batch!batchList.action?itemid='+itemid;
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
//			singleSelect:false,
			singleSelect:true,
			idField:'batchno',	
			columns : [ [
				{field : 'batchno2',
						title : '&nbsp;',
						width : 20,
						align : 'center',
						formatter : function(value){
							return "<input type='radio' name='radio'/>";}
				 },
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
					field : 'recheckperson',
					title : '复核人',
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
				}*/,
				{field:'operate',title:'操作',width:30,align : 'center',
				formatter:function(value,rowData,rowIndex){
					return '<span style="color:red"><img src="'+rootPath+'/themes/default/images/deleteimage.png"   alt="删除"  onclick="deleteBatch('+rowData.batchno+')"/></span>';
				}}
			] ],
			onSelect:function(rowIndex,rowData){
				$($("input[type=radio]")[rowIndex]).attr("checked",true);
			},
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
				$("#batchdatagrid").datagrid("clearSelections");
				$('#batchdatagrid').datagrid('selectRow',parseInt(rowIndex));
				var rowData = $('#batchdatagrid').datagrid('getSelected');
				if(rowData!=null){
					seldatagrid(itemid,rowData.batchno,'');
				}
			},
			onRowContextMenu:function(e,row,rowData){
				$("#batchdatagrid").datagrid("clearSelections");
				$('#batchdatagrid').datagrid('selectRow',parseInt(row));
				$("#batchinfoMenu").menu("show", {left: e.pageX,top: e.pageY});
				e.preventDefault();
			}			
		});
		$(window).resize(function() {
			$("#batchdatagrid").datagrid('resize');
		});
		$("#jiance").resize(function(){
			$("#batchdatagrid").datagrid('resize');
		});
}
//删除批信息
function deleteBatch(batchno){
	//单个删除
 	if(window.confirm('是否删除？'))
 	{ 
		$.post(
			rootPath + "/sampletest/batch/batch!getSampleitemSizeByBatchno.action?batchno="+batchno, 
			function(data) {
			if (data == 'fail')
			{			
				$.post(
					rootPath + "/sampletest/batch/batch!getSampletestresultSize.action?batchno="+ batchno,
					function(msg){
					if (msg == 'fail')//没有对应的录入的数据
					{
						$.post(
							rootPath + "/sampletest/batch/batch!deleteBatch.action?batchno="+ batchno,
							function(msg2){
							if (msg2 == 'success')
							{
								alert("删除成功！");
								$("#batchdatagrid").datagrid('reload');
								return;
							}else{
								alert("删除失败！");
								return;
							}
						});
					}else if(msg == 'success'){
						alert("该批次已录入数据，不能删除！");
						return;
					}
				});
			}else if (data == 'success'){
				alert("该批号已关联样品，不能删除！");
				return;
			}
		});
	}
}
//添加批信息
function addBatchInfo(){
		var url = rootPath + "/sampletest/batch/batch!input.action";
		if(batchItemidVal!=""){
			url = url + "?itemid="+batchItemidVal;
		}else{
			alert("请选择一个项目！");
			return;
		}
		var _dialog =  window.top.$('<div id ="batch-dlg" style="padding:0px;"><iframe id="batchFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
		_dialog.dialog({
		title:'检验批次编辑',
		autoOpen:false,
		modal:true,
		closed:true,
		width:'620',
		height:'330',
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


//选择批次提交，并选择复核人
function submitDialog(){
	var rows = $('#batchdatagrid').datagrid('getSelections');
	if (rows!=null && rows!="") { 		
		var strBno='';
		for(var i=0;i<rows.length;i++)
		{
			strBno = strBno + rows[i].batchno2+",";
		}
		strBno = strBno.substring(0,strBno.length-1);
//		alert(strBno);
		$.post(
			rootPath + "/sampletest/batch/batch!getSampleitemSizeByBatchnos.action?batchno="+strBno, 
			function(data) {
				if(data == 'fail')
				{
					alert("该批次没有关联样品，不能提交！");
					return;
		 		}else if(data == 'success'){
		 			$.post(
						rootPath + "/sampletest/batch/batch!getSampletestresultSizeByBatchnos.action?batchno="+strBno,
						function(msg){
							if(msg == 'yes')
							{
								alert("您所选的批次中存在未录入数据的批次，不能提交！");
								return;
							}else if(msg == 'no'){
								if(window.confirm('是否提交？'))
						 		{
									var strBatchno11 =""; 
									for(var i=0;i<rows.length;i++){
										strBatchno11=strBatchno11+rows[i].batchno2+",";	
									}
									strBatchno11 = strBatchno11.substring(0,strBatchno11.length-1);
									
									//选择复核人
									selRecheckPerson(strBatchno11);
								}
							}
						}
					);
		 		}
			}
		);		
	} else {
		alert('请至少选择一个批次！');
		return;
	}
}

//选择复核人
function selRecheckPerson(strBatchno){
	var url =  rootPath +"/group/departmentgroup!toDeptGroupUser.action";
	var _dialog =  window.top.$('<div id ="role-dlg" style="padding:0px;"><iframe id="oneUserFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
	_dialog.dialog({
	   title:'人员列表',
		autoOpen:false,
		modal:true,
		closed:true,
		width:'400',
		height:'500',
		buttons:[{
			text:'保存',
			iconCls:'icon-save',
			handler:function(){
				var userid=$("#oneUserFrame",top.document.body).contents().find("#selectedUserid").val();
				if(userid!=null&&userid!=''){
					operate(strBatchno,userid);	
				}else{
					alert("选择复核人失败！");	
				}				
				_dialog.dialog('close');
				
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

//提交操作(批号，复核人)
function operate(strBatchno,userid){
	$.post(
		rootPath + "/sampletest/batch/batch!setAllStatus.action?json="+strBatchno+"&userid="+userid+"&typeid=1",				
		function(msg){
				if(msg=='success'){
					alert("提交成功！");
					$('#batchdatagrid').datagrid('clearSelections');
					$("#batchdatagrid").datagrid('reload');
					$("#seldatagrid").datagrid('reload');
					$("#datagrid").datagrid('reload');
				}else{
					alert("提交失败！");
					$('#batchdatagrid').datagrid('clearSelections');
				}
			}
	);
}
//加载分析方法
function getItemMethodListByItemidJson() {
	var itemid = $("#batchFrame",top.document.body).contents().find('#itemid').val();
	var methodid = "";
	$.ajax( {
		type : 'GET',
		url : rootPath+'/sampletest/batch/batch!getItemMethodListByItemidJson.action?timeStamp='+new Date().getTime(),//给该url一个时间戳~~这样就必须每次从服务器读取数据,
		data : {'itemid':itemid},
		async:false,//同步
		success : function(data) {
			var vData = eval("(" + data + ")");
			var lList = "";//<option value=''>---请选择---</option>";			
			//遍历json数据  
			jQuery.each(vData.rowsData, function(i, n) {//alert( n.isdefault);
				if(n.isdefault=='Y'){
					methodid = n.methodid;
					lList += "<option value=" + n.methodid + " selected>" + n.methodname	+ "</option>";					
				}else{
					lList += "<option value=" + n.methodid + ">" + n.methodname	+ "</option>";
				}				
			});		//alert( lList);
			//绑定数据到listLeft
			$("#batchFrame",top.document.body).contents().find('#methodid').append(lList);
			getDeviceListByItemidAndMethodJson(methodid);
			getAssistDeviceJson(methodid);
		}
	});
}
//加载辅助仪器
function getAssistDeviceJson(methodidVal){
	var methodid = "";
	//查询时调用
	if(methodidVal==""){
		methodid = $('#methodid').val();
	}else{
		methodid = methodidVal;
	}
	var itemid = $('#itemid').val();
	$.ajax({
		type : 'GET',
		async:false,//同步
		url : rootPath+'/sampletest/batch/batch!getAssistDeviceByItemMethod.action?timeStamp='+new Date().getTime(),//给该url一个时间戳~~这样就必须每次从服务器读取数据,
		data : {'itemid':itemid,'methodid' : methodid},
		success : function(data) {
			if(data!=''){
				if(data=="fail"){
					alert("辅助仪器加载失败！");
				}else{
					 $("#tdDate").html('');
				     $("#tdDate").html(data);
				}
			}else{
				$("#trData").hide(); 
			}
		}
	});
}
//加载分析仪器
function getDeviceListByItemidAndMethodJson(methodidVal) {
	var methodid = "";
	//查询时调用
	if(methodidVal==""){
		methodid = $("#batchFrame",top.document.body).contents().find('#methodid').val();
	}else{
		methodid = methodidVal;
	}
	var itemid = $("#batchFrame",top.document.body).contents().find('#itemid').val();
	
	$.ajax( {
		type : 'GET',
		async:false,//同步
		url : rootPath+'/sampletest/batch/batch!getDeviceidByItemMethod.action?timeStamp='+new Date().getTime(),//给该url一个时间戳~~这样就必须每次从服务器读取数据,
		data : {'itemid':itemid,'methodid' : methodid},
		success : function(data) {
			$("#tempDeviceid").val("");
			$("#tempDeviceid").val(data);
		}
	});
//	alert($("#tempDeviceid").val());
	$.ajax( {
		type : 'GET',
		url : rootPath+'/sampletest/batch/batch!getDeviceListByItemidAndMethodJson.action?timeStamp='+new Date().getTime(),//给该url一个时间戳~~这样就必须每次从服务器读取数据,
		data : {'itemid':itemid,'methodid' : methodid},
		//async:false,//同步
		success : function(data) {
			var vData = eval("(" + data + ")");
			var arr = new Array();
			var lList = "";//"<option value=''>---请选择---</option>";
			//遍历json数据  
			jQuery.each(vData.rowsData, function(i, n) {
//				lList += "<option value=" + n.deviceid + ">" + n.devicename	+ "</option>";
				var temp = n.devicename.toString()+"##"+n.deviceid.toString();
				arr.push(temp.toString());
			});		
			lList =  sortList(arr);
			
			//绑定数据到listLeft
			$("#batchFrame",top.document.body).contents().find('#deviceid').append(lList);
		}
	});
}

function getFirstChar(s)
{
	if(s=="")return "";  
	return (s+"").substr(0,1);
}

function compare(str1,str2)
{
	var firstStr1=getGB2312Spell(getFirstChar(str1),"");
	var firstStr2=getGB2312Spell(getFirstChar(str2),"");
	if(firstStr1<firstStr2){
		return -1;
	}else if(firstStr1>firstStr2){
		return 1;
	}else{
		return 0;
	}
}

//对仪器排序
function sortList(arr){
	var tempDeviceid = $("#tempDeviceid").val();
	var lList = "<option value=''>---请选择---</option>";
	arr.sort(compare);
	for(var i=0;i<arr.length;i++){
		var temp = arr[i].split("##");
		if(tempDeviceid!=''&& tempDeviceid==temp[1]){
			lList += "<option value=" + temp[1] + " selected>" + temp[0] + "</option>";
		}else{
			lList += "<option value=" + temp[1] + ">" + temp[0]	+ "</option>";
		}
	}
	return lList;
}			
////查看校准曲线
//function viewchart(){
//	var batchrows = $("#batchdatagrid").datagrid("getSelections");
//	var deviceid=batchrows[0].deviceid;
//	var itemid=batchrows[0].itemid;
//	var	methodid=batchrows[0].methodid;
////	alert(deviceid+"-"+itemid+"-"+methodid);
//	if(deviceid!=""){
//		var url = rootPath + "/curve/devicecalibratecurve!viewcurve.action?deviceid="+deviceid+"&itemid="+itemid+"&methodid="+methodid;		
//		var _dialog =  window.top.$('<div id ="dlg" style="padding:0px;"><iframe id="frame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
//		_dialog.dialog({
//			title:'校准曲线',
//			autoOpen:false,
//			modal:true,
//			closed:true,
//			maximizable:true,
//			width:'800',
//			height:'500',
//			onClose:function(){
//				_dialog.dialog("destroy");					
//			}
//		});
//		_dialog.dialog('open');
//	}else{
//		alert("请选择一个批号！");
//	}
//}

//查看校准曲线
function viewchart(){
	var batchrows = $("#batchdatagrid").datagrid("getSelections");
	if(batchrows!=''){
		var deviceid=batchrows[0].deviceid;
		var itemid=batchrows[0].itemid;
		var	methodid=batchrows[0].methodid;
		var batchno = batchrows[0].batchno;
		//alert(deviceid+"___"+batchno);
		
		//if(deviceid!="" && itemid!='' && methodid!=''){
		$.post(rootPath + "/sampletest/sampletestbybatch!getDevicecalibratecurve2.action?batchno="+batchno, function(msg){
			if (msg == 'no') {
				alert("该项目不需要校准曲线！");
				return false;
			}else{
				$.post(rootPath + "/sampletest/batch/batch!getCuveidByBatchno.action?batchno="+ batchno,
				function(data){
//				if(data!='no'){				
					var url = rootPath + "/curve/devicecalibratecurve!tobatchview.action?deviceid="+deviceid+"&curveid="+data+"&itemid="+itemid+"&methodid="+methodid;//"/curve/devicecalibratecurve!viewcurve.action?curveid="+data;		
					var _dialog = window.top.$('<div id ="dlg" style="padding:0px;"><iframe id="frame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
					_dialog.dialog({
						title:'校准曲线',
						autoOpen:false,
						modal:true,
						closed:true,
						maximizable:true,
						width:'980',
						height:'600',
						buttons:[{
								text:'确定',
								iconCls:'icon-ok',
								handler:function(){
									_dialog.dialog('close');
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
//					}
				});	
			}
		});
	}else{
		alert("请选择一个批号！");
	}
}


//数据录入
function batchdataenter(){
	var tempVal = "";
//	var isTrue=false;
	var batchno="";
	var itemid="";
	var methodid="";
	var deviceid="";
	var batchrows = $("#batchdatagrid").datagrid("getSelections");
	if(batchrows!=''){
		batchno=batchrows[0].batchno;
		itemid=batchrows[0].itemid;
		methodid=batchrows[0].methodid;
		deviceid=batchrows[0].deviceid;
	}
	//alert(batchno);
	if(batchno!=""){
		$.post(rootPath + "/sampletest/batch/batch!getSampleitemSizeByBatchno.action?batchno="+ batchno,
			function(msg){
			if(msg == 'success')
			{	
//				$.post(rootPath + "/sampletest/batch/batch!getHasPreitemParamVal.action?batchno="+ batchno,
//				function(msg){
//					if(msg=='nodata'){//有前置项目，但无数据
//						alert("当前项目的前置项目未录入数据，\n请先录入前置项目的数据后，\n再录入该项目的数据！");
//						return;
//					}else if(msg=='data'||msg=='nopreitem'){//有前置项目有数据或无前置项目//maximize:yes;最大化   minimize:yes  最小化
						var url = rootPath + "/sampletest/sampletestbybatch!toDataEntry.action";
						url = url + "?itemid="+itemid+"&batchno="+batchno+"&methodid="+methodid+"&deviceid="+deviceid+"&timeStamp="+new Date().getTime();
						var features="dialogWidth:"+(window.screen.availWidth-0).toString()+"px;dialogHeight:"+(window.screen.availHeight).toString()+"px;scroll:no;center:yes;resizable:no;status:no;location:no;minimize:yes;";
						//alert(window.screen.availHeight+"     "+document.body.clientHeight);
						var sReturn=window.showModalDialog(url,null,features);
						if (typeof(sReturn) != "undefined")
				       	{
					       if (sReturn=="1")
					       {
					        	alert("提交成功！");	
					        	$('#datagrid').datagrid('reload');
					        	$('#batchdatagrid').datagrid('loadData', { total: 0, rows: [] });
						 		$('#seldatagrid').datagrid('loadData', { total: 0, rows: [] });
						 		$('#unseldatagrid').datagrid('loadData', { total: 0, rows: [] });
					       }
						}
//					}
			//	});
			}else{
				alert("该批号没有与样品关联，不能录入数据！");
				return;
			}
		});
	}else{
		alert("请选择一个批号！");
		return;
	}
}
//数据录入
function batchdataenter2(){
	var tempVal = "";
//	var isTrue=false;
	var batchno="";
	var itemid="";
	var methodid="";
	var deviceid="";
	var batchrows = $("#batchdatagrid").datagrid("getSelections");
	if(batchrows!=''){
		batchno=batchrows[0].batchno;
		itemid=batchrows[0].itemid;
		methodid=batchrows[0].methodid;
		deviceid=batchrows[0].deviceid;
	}
	
	if(batchno!=""){
		$.post(
			rootPath + "/sampletest/batch/batch!getSampleitemSizeByBatchno.action?batchno="+ batchno,
			function(msg){
			if(msg == 'success')
			{	
//				$.post(rootPath + "/sampletest/batch/batch!getHasPreitemParamVal.action?batchno="+ batchno,
//				function(msg){
////				alert(msg);
//				if(msg=='nodata'){//有前置项目，但无数据
//					alert("当前项目的前置项目未录入数据，\n请先录入前置项目的数据后，\n再录入该项目的数据！");
//					return;
//				}else if(msg=='data'||msg=='nopreitem'){//有前置项目有数据或无前置项目
					var url = rootPath + "/sampletest/sampletestbybatch!toDataEntry.action";
					url = url + "?itemid="+itemid+"&batchno="+batchno+"&methodid="+methodid+"&deviceid="+deviceid;
					
					var _dialog =  window.top.$('<div id ="dlg" style="padding:0px;"><iframe id="dataenterFrame" width="100%" height="100%" frameborder="0" scrolling="yes" src='+url+'></iframe></div>').appendTo(window.top.document.body);
					_dialog.dialog({
					title:'数据录入',
					autoOpen:false,
					modal:true,
	//				maximizable:true,
					closed:true,
					//maximized:true,
					width:'1200',
					height:'550',
					buttons:[
						{
							text:'数据录入暂存',
							iconCls:'icon-save',
							handler:function(){
							var tempObj = $("#dataenterFrame",top.document.body).contents().find("#envform").find("#param").val();
//							alert("---"+tempObj+"---");
							if(tempObj!=null && tempObj!=''){
//								alert("aaaaaaaaa");
								$("#dataenterFrame",top.document.body).contents().find("#envform").form('submit',
								{	
									url:rootPath + '/sampletest/envparamvalue!saveDataEntry.action',
									onSubmit:function(){
//										var objs = $("#dataenterFrame",top.document.body).contents().find("#envform").contents().find(".grkj-validate");
//										if(!saveCheck(objs)){
//											$("#dataenterFrame",top.document.body).contents().find("#envform").contents().find(":input").focus();
//											$("#dataenterFrame",top.document.body).contents().find("#envform").contents().find(":select").focus();
//											alert("数据输入不符合格式，请查看红色边框的输入框的输入提示！");
//											return false;
//										}
									},
									success:function(data){
									}
								});
							}
								$("#dataenterFrame",top.document.body).contents().find("#originaldataFrame").contents().find("#form1").form('submit',
								{	
									url:rootPath + '/sampletest/sampletestbybatch!temporaryStorage.action',
									onSubmit:function(){
	//									var objs = $("#dataenterFrame",top.document.body).contents().find("#originaldataFrame").contents().find(".grkj-validate");
	//									if(!saveCheck(objs)){
	//										$("#dataenterFrame",top.document.body).contents().find("#originaldataFrame").contents().find(":input").focus();
	//										alert("数据输入不符合格式，请查看红色边框的输入框的输入提示！");
	//										return false;
	//									}
									},
									success:function(data){
										if(data=='success'){
											alert("暂存成功！");
											$("#dataenterFrame",top.document.body).contents().find("#refreshCurrent").click();
											//$("#dataenterFrame",top.document.body).contents().find("#originaldataFrame").contents().find("#refreshHtml").click();
											//$("#batchdatagrid").datagrid('reload');
										}else{
											alert("暂存失败！");
										}
									}
								});	
							}
						},
						{
							text:'结果计算',
							iconCls:'icon-save',
							handler:function(){
							//alert($("#dataenterFrame",top.document.body).contents().find("#openBlock").val());
							//弹出遮盖层
//							$("#dataenterFrame",top.document.body).contents().find("#openBlock").click();				
							
							var tempObj = $("#dataenterFrame",top.document.body).contents().find("#envform").find("#param").val();
//							alert("---"+tempObj+"---");
							if(tempObj!=null && tempObj!=''){
//								alert("aaaaaaaaa");
								$("#dataenterFrame",top.document.body).contents().find("#envform").form('submit',
								{	
									url:rootPath + '/sampletest/envparamvalue!saveDataEntry.action',
									onSubmit:function(){
										var objs = $("#dataenterFrame",top.document.body).contents().find("#envform").contents().find(".grkj-validate");
										if(!saveCheck(objs)){
											$("#dataenterFrame",top.document.body).contents().find("#envform").contents().find(":input").focus();
											$("#dataenterFrame",top.document.body).contents().find("#envform").contents().find(":select").focus();
											alert("数据输入不符合格式，请查看红色边框的输入框的输入提示！");
											return false;
										}
									},
									success:function(data){
										if(data=='success'){
											alert("数据计算成功！");
	//										$("#dataenterFrame",top.document.body).contents().find("#originaldataFrame").contents().find("#refreshHtml").click();
											//_dialog.dialog('close');
											//$("#batchdatagrid").datagrid('reload');
										}else{
											alert("环境数据保存失败！");
										}
									}
								});
							}
							
							$("#dataenterFrame",top.document.body).contents().find("#originaldataFrame").contents().find("#form1").form('submit',
							{	
								url:rootPath + '/sampletest/sampletestbybatch!saveDataEntry.action',
								onSubmit:function(){
									var objs = $("#dataenterFrame",top.document.body).contents().find("#originaldataFrame").contents().find(".grkj-validate");
									if(!saveCheck(objs)){
										$("#dataenterFrame",top.document.body).contents().find("#originaldataFrame").contents().find(":input").focus();
										alert("数据输入不符合格式，请查看红色边框的输入框的输入提示！");
										return false;
									}
									$("#dataenterFrame",top.document.body).contents().find("#openBlock").click();		
								},
								success:function(data){
									if(data=='success'){
										alert("保存成功！");
										$("#dataenterFrame",top.document.body).contents().find("#unLockBlock").click();
										//$("#dataenterFrame",top.document.body).contents().find("#originaldataFrame").contents().find("#refreshHtml").click();
										$("#dataenterFrame",top.document.body).contents().find("#refreshCurrent").click();
										//_dialog.dialog('close');
										//$("#batchdatagrid").datagrid('reload');
									}else{
										alert("保存失败！");
										$("#dataenterFrame",top.document.body).contents().find("#unLockBlock").click();
									}
								}
							});	
							}
						},
						{
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
//					}
//				});
		}else{
				alert("该批号没有与样品关联，不能录入数据！");
				return;
			}
		});
	}else{
		alert("请选择一个批号！");
		return;
	}
}

//修改原因
function xiugaiyuanyin(tempVal){
	var url = rootPath + "/sampletest/batch/batch!opinionDlg.action";
	var _dialog =  window.top.$('<div id ="dlg" style="padding:0px;"><iframe id="tempFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
	_dialog.dialog({
	title:'修改原因',
	autoOpen:false,
	modal:true,
	closed:true,
	width:'520',
	height:'220',
	buttons:[{
		text:'确定',
		iconCls:'icon-ok',
		handler:function(){
			var objs = $("#tempFrame",window.top.document).contents().find(".grkj-validate");	
			var message = $("#tempFrame",window.top.document).contents().find("#opinion").val();
			if(!saveCheck(objs)){
				$("#tempFrame",window.top.document).contents().find(":input").focus();
				alert("请填写修改原因且不超过200个汉字！");
				return false;
			}else{
				tempVal = message;
				_dialog.dialog('close');
			}
			
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
//环境参数
function editEnvParam(){
	var batchno="";
	var itemid="";
	var methodid="";
	var batchrows = $("#batchdatagrid").datagrid("getSelections");
	if(batchrows!=''){
		batchno=batchrows[0].batchno;
		itemid=batchrows[0].itemid;
		methodid=batchrows[0].methodid;
	}
	
	if(batchno!=""){
		$.post(
			rootPath + "/sampletest/batch/batch!getSampleitemSizeByBatchno.action?batchno="+ batchno,
			function(msg){
			if(msg == 'success')
			{				
				var url = rootPath + "/sampletest/envparamvalue!toDataEntry.action";
				url = url + "?itemid="+itemid+"&batchno="+batchno+"&methodid="+methodid;
				var _dialog =  window.top.$('<div id ="dlg" style="padding:0px;"><iframe id="dataenterFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
				_dialog.dialog({
				title:'环境参数',
				autoOpen:false,
				modal:true,
				closed:true,
				width:'400',
				height:'300',
				buttons:[{
					text:'保存',
					iconCls:'icon-save',
					handler:function(){
						$("#dataenterFrame",top.document.body).contents().find("#form").form('submit',
							{
								url:rootPath + '/sampletest/envparamvalue!saveDataEntry.action',
								onSubmit:function(){
									var objs = $("#dataenterFrame",top.document.body).contents().find(".grkj-validate");
									if(!saveCheck(objs)){
										$("#dataenterFrame",top.document.body).contents().find(":input").focus();
										alert("数据输入不符合格式，请查看红色边框的输入框的输入提示！");
										return false;
									}																			
								},
								success:function(data){
									if(data=='success'){
										alert("保存成功！");
										_dialog.dialog('close');
										$("#batchdatagrid").datagrid('reload');
									}else{
										alert("保存失败！");
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
		}else{
				alert("该批号没有与样品关联，不能录入数据！");
				return;
			}
		});
	}else{
		alert("请选择一个批号！");
	}
}


//仪器使用记录
function yiqishiyongjilu(){	
	var batchrows = $("#batchdatagrid").datagrid("getSelections");
	var deviceid=batchrows[0].deviceid;
	var batchno=batchrows[0].batchno;
	
	if(deviceid!=""){
		var url = rootPath + "/device/deviceuserecord/deviceuserecord!toDeviceuserecord.action?batchno="+batchno;//+"&deviceid="+deviceid;		
		var _dialog =  window.top.$('<div id ="dlg" style="padding:0px;"><iframe id="frame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
		_dialog.dialog({
			title:'仪器使用记录',
			autoOpen:false,
			modal:true,
			closed:true,
			maximizable:true,
			width:'800',
			height:'600',
			onClose:function(){
				_dialog.dialog("destroy");					
			}
		});
		_dialog.dialog('open');
	}else{
		alert("无仪器使用记录！");
	}
}

//数据追溯
function showDataSourceDialog(){
	var batchrows = $("#batchdatagrid").datagrid("getSelections");
	var deviceid=batchrows[0].deviceid;
	var batchno=batchrows[0].batchno;
	var itemid=batchrows[0].itemid;
	
	if(deviceid!=""){
		var url = rootPath+"/sampletest/batch/batch!toShuJuZhuiSuList.action?batchno="+batchno+"&itemid="+itemid;//&deviceid="+deviceid+"
		var _dialog =  window.top.$('<div id ="ds-dlg" style="padding:0px;"><iframe id="dataSourceFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
		_dialog.dialog({
			title:'数据追溯',
			autoOpen:false,
			position:'center',
			modal:true,
			closed:true,
			width:'895',
			height:'600',
			onClose:function(){
				_dialog.dialog("destroy");
			}
		});
		_dialog.dialog('open');	
	}else{
		alert("无仪器使用记录！");
	}
}

//弹出附件列表
function addfile() {
	var batchrows = $("#batchdatagrid").datagrid("getSelections");
	var batchno=batchrows[0].batchno;
	$.post(
		rootPath + "/sampletest/batch/batch!getSampleitemSizeByBatchnos.action?batchno="+batchno, 
		function(data) {
			if(data == 'fail')
			{
				alert("该批次没有关联样品，不能上传附件！");
				return;
	 		}else if(data == 'success'){
				var viewHeight = "462";
				var url = rootPath + "/sampletest/batch/batch!toFileList.action";
				if (batchno != "") {
					url = url + "?batchno=" + batchno;
				}
			
				var _dialog = window.top.$('<div id ="dlg" style="padding:0px;"><iframe id="frame" width="100%" height="100%" frameborder="0" scrolling="no" src=' + url + '></iframe></div>')
						.appendTo(window.top.document.body);
				_dialog.dialog( {
					title : '数据采集文件',
					autoOpen : false,
					modal : true,
					closed : true,
					width : '800',
					height : viewHeight,
					onClose : function() {
						_dialog.dialog("destroy");
					}
				});
				_dialog.dialog('open');
			}
		}
	);
}

//附件
function addfileu(){
	
}