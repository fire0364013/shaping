function diveceJsButtonData(){
	$('#diveceJsButtonData').datagrid({
		nowrap: false,
		striped: true,
		collapsible:true,
		url:rootPath +"/monitorproject/deviceuserecord/samplingdeviceuserecord!getListData.action?projectcode="+projectcode+"&monitorpointid="+monitorpointid,
		fit:true,
		fitColumns : true,
		scrollbarSize:0,
		remoteSort: false,
		singleSelect:false,
		pageSize : 15,
		pageList : [15, 30, 45, 60 ],
		rownumbers:false,
		idField:'userecordid',
		columns:[[
				{field:'userecordid',checkbox:true,align:"center"},
//				{field:'devicenum',title:'设备编号',width:150,align:"center"},	
				{field:'usedate',title:'使用日期',width:100,align:"center"},	
				{field:'devicename',title:'设备名称',width:100,align:"center"},
				{field:'leavefactorynum',title:'出厂编号',width:80,align:"center"},
				{field:'spectypeid',title:'规格型号',width:80,align:"center"},
//				{field:'deviceTypeid',title:'仪器类型',width:150,align:"center"},
				{field:'useperson',title:'使用人',width:60,align:"center"},	
				{field:'beforestatus',title:'使用前状态',width:80,align:"center"},	
				{field:'afterstatus',title:'使用后状态',width:80,align:"center"},	
				{field:'monitoritem',title:'监测项目',width:150,align:"center"}
//				,	
//				{field:'operate',title:'操作',width:70,align:"center",
//					formatter:function(value,rec,rowIndex){
//						var links='<img src="'+rootPath+'/themes/default/images/xiangxiimage.png"   alt="详细"   id="btnshow" onclick="detail('+ rec.userecordid +')"/>&nbsp;&nbsp;';
//						links+='<img src="'+rootPath+'/themes/default/images/bianjiimage.png"    alt="编辑"   id="btnshow" onclick="editJsButtonWin('+rec.deviceid+','+ rec.userecordid +')"/>&nbsp;&nbsp;';
//						links+='<img src="'+rootPath+'/themes/default/images/deleteimage.png"   alt="删除"   id="btnshow" onclick="delOne('+ rec.userecordid +','+rowIndex+')"/>';
//						return links;
//					}
//				}						
		]],
		pagination:true,
		rownumbers:true
	});
}
//增加
function addJsButtonWin(){
	$('#diveceJsButtonData').datagrid('clearSelections');
	var url =  rootPath +"/monitorproject/deviceuserecord/samplingdeviceuserecord!toAddDevice.action?monitorpointid="+monitorpointid+"&projectcode="+projectcode;
	var _dialog =  window.top.$('<div id ="role-dlg" style="padding:0px;"><iframe id="deviceAddFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
	_dialog.dialog({
		title:'仪器选择',
		autoOpen:false,
		modal:true,
		closed:true,
		width:'900',
		height:'710',
		buttons:[{
			text:'保存',
			iconCls:'icon-save',
			handler:function(){
			$("#deviceAddFrame",top.document.body).contents().find("#btnGetItem").click();//获取选择项目
			$("#deviceAddFrame",top.document.body).contents().find("#jsButtonForm").form('submit',{
							url:rootPath +"/monitorproject/deviceuserecord/samplingdeviceuserecord!saveEntity.action",
							onSubmit:function(){
								var objs = $("#deviceAddFrame",top.document.body).contents().find(".grkj-validate");
								if(!saveCheck(objs)){
									$("#deviceAddFrame",top.document.body).contents().find(":input").focus();
									alert("请选择仪器使用时间！");
									return false;
								}
								var deviceId=$("#deviceAddFrame",top.document.body).contents().find("#deviceId").val();
								//alert(deviceId);
								if(deviceId==undefined ||deviceId==""){
									alert("请至少选择一台仪器！");
									return false;
								}
							},
							success:function(data){
								if(data=="success"){
								_dialog.dialog('close');
								$("#diveceJsButtonData").datagrid('reload');
								alert('成功');
								}else if(data=="exit"){
									alert("采样仪器已经存在，请重新选择！");
								}
							}
						});	
				
			}
		},{
			text:'继续添加',
			iconCls:'icon-next',
			handler:function(){
			$("#deviceAddFrame",top.document.body).contents().find("#btnGetItem").click();//获取选择项目
			$("#deviceAddFrame",top.document.body).contents().find("#jsButtonForm").form('submit',{
							url:rootPath +"/monitorproject/deviceuserecord/samplingdeviceuserecord!saveEntity.action",
							onSubmit:function(){
								var objs = $("#deviceAddFrame",top.document.body).contents().find(".grkj-validate");
								if(!saveCheck(objs)){
									$("#deviceAddFrame",top.document.body).contents().find(":input").focus();
									alert("请选择仪器使用时间！");
									return false;
								}
								var deviceId=$("#deviceAddFrame",top.document.body).contents().find("#deviceId").val();
								//alert(deviceId);
								if(deviceId==undefined ||deviceId==""){
									alert("请至少选择一台仪器！");
									return false;
								}
							},
							success:function(data){
								if(data=="success"){
//								_dialog.dialog('close');
								$("#diveceJsButtonData").datagrid('reload');
//								alert('成功');
								$("#deviceAddFrame",top.document.body).contents().find("#refresh").click()
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
//修改
function editJsButtonWin(deviceid,id){
	$('#diveceJsButtonData').datagrid('clearSelections');
	var a=encodeURIComponent(encodeURIComponent(deviceid));
	var url =  rootPath +"/monitorproject/deviceuserecord/samplingdeviceuserecord!toEditDevice.action?deviceid="+a
	+"&monitorpointid="+monitorpointid+"&projectcode="+projectcode+"&id="+id;
	var _dialog =  window.top.$('<div id ="role-dlg" style="padding:0px;"><iframe id="deviceJsFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
	_dialog.dialog({
		title:'仪器列表',
		autoOpen:false,
		modal:true,
		closed:true,
		width:'900',
		height:'710',
		buttons:[{
			text:'保存',
			iconCls:'icon-save',
			handler:function(){
				$("#deviceJsFrame",top.document.body).contents().find("#btnGetItem").click();//获取选择项目
						$("#deviceJsFrame",top.document.body).contents().find("#jsButtonForm").form('submit',{
							url:rootPath +"/monitorproject/deviceuserecord/samplingdeviceuserecord!saveEntity.action",
							onSubmit:function(){
								var objs = $("#deviceJsFrame",top.document.body).contents().find(".grkj-validate");
								if(!saveCheck(objs)){
									$("#deviceJsFrame",top.document.body).contents().find(":input").focus();
									alert("数据输入不符合格式，请查看红色边框的输入框的输入提示！");
									return false;
								}
								var deviceId=$("#deviceJsFrame",top.document.body).contents().find("#deviceId").val();
								if(deviceId==undefined ||deviceId==""){
									alert("请选择项目！");
									return false;
								}
							},
							success:function(data){
								if(data=="success"){
								_dialog.dialog('close');
								$("#diveceJsButtonData").datagrid('reload');
								alert('成功');
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
//查询
function searchJsButton(){
	var devicenum=$("#devicenum").val();
	var deviceNnames=$("#deviceNnames").val();
	var leavenum=$("#leavenum").val();
	var spectypeid=$("#spectypeid").val();

	$('#diveceJsButtonData').datagrid( {
		queryParams : {
		devicenum:devicenum,
		deviceNnames:deviceNnames,
		leavenum:leavenum,
		spectypeid:spectypeid
		},
		pageNumber:1		
	});
}

//批量添加采样仪器，仪器使用记录列表
function diveceRecordData(){
	$('#diveceJsButtonData').datagrid({
		nowrap: false,
		striped: true,
		collapsible:true,
		url:rootPath +"/monitorproject/deviceuserecord/samplingdeviceuserecord!getListData1.action?projectcode="+projectcode+"&monitorpointid="+monitorpointid,
		fit:true,
//		fitColumns : true,
		scrollbarSize:0,
		remoteSort: false,
		singleSelect:false,
		pageSize : 15,
		pageList : [15, 30, 45, 60 ],
		rownumbers:false,
		columns:[[
				{field:'userecordid',checkbox:true,align:"center"},
				{field:'usedate',title:'使用日期',width:120,align:"center"},
//				{field:'devicenum',title:'设备编号',width:80,align:"center"},	
				{field:'devicename',title:'设备名称',width:120,align:"center"},	
				{field:'leavefactorynum',title:'出厂编号',width:80,align:"center"},
				{field:'spectypeid',title:'仪器型号',width:80,align:"center"},
				{field:'monitor',title:'监测点',width:200,align:"center"},
//				{field:'monitorpointtypename',title:'监测点类型',width:80,align:"center"},
//				{field:'monitorcode',title:'监测点编号',width:80,align:"center"},	
//				{field:'monitorpointname',title:'监测点名称',width:100,align:"center"},
				{field:'useperson',title:'使用人',width:60,align:"center"},	
				{field:'beforestatus',title:'使用前状态',width:70,align:"center"},	
				{field:'afterstatus',title:'使用后状态',width:70,align:"center"},	
				{field:'monitoritem',title:'监测项目',width:150,align:"center"}
//				,	
//				{field:'operate',title:'操作',width:80,align:"center",
//					formatter:function(value,rec,rowIndex){
//						var links='<img src="'+rootPath+'/themes/default/images/xiangxiimage.png"   alt="详细"   id="btnshow" onclick="detail('+ rec.userecordid +')"/>&nbsp;&nbsp;';
//						links+='<img src="'+rootPath+'/themes/default/images/bianjiimage.png"    alt="编辑"   id="btnshow" onclick="editJsButtonWin('+rec.deviceid+','+ rec.userecordid +')"/>&nbsp;&nbsp;';
//						links+='<img src="'+rootPath+'/themes/default/images/deleteimage.png"   alt="删除"   id="btnshow" onclick="delOne('+ rec.userecordid +','+rowIndex+')"/>';
//						return links;
//					}
//				}						
		]],
//		onLoadSuccess:function(data){
//			if(data.rows.length>0){
//				setTimeout("mergeCellsByField(\"diveceJsButtonData\",\"monitorpointtypename,monitorcode,monitorpointname\")",10)
//			}
//		},
		pagination:true,
		rownumbers:true
	});
};

function mergeCellsByField(tableID,colList){
    var ColArray = colList.split(",");
    var tTable = $('#'+tableID);
    var TableRowCnts=tTable.datagrid("getRows").length;
    var tmpA;
    var tmpB;
    var PerTxt = "";
    var CurTxt = "";
    var alertStr = "";
    //for (j=0;j<=ColArray.length-1 ;j++ )
    for (j=ColArray.length-1;j>=0 ;j-- )
    {
        //当循环至某新的列时，变量复位。
        PerTxt="";
        tmpA=1;
        tmpB=0;
        
        //从第一行（表头为第0行）开始循环，循环至行尾(溢出一位)
        for (i=0;i<=TableRowCnts ;i++ )
        {
            if (i==TableRowCnts)
            {
                CurTxt="";
            }
            else
            {
                CurTxt=tTable.datagrid("getRows")[i][ColArray[j]];
            }
            if (PerTxt==CurTxt)
            {
                tmpA+=1;
            }
            else
            {
                tmpB+=tmpA;
                tTable.datagrid('mergeCells',{
                    index:i-tmpA,
                    field:ColArray[j],
                    rowspan:tmpA,
                    colspan:null
                });
                tmpA=1;
            }
            PerTxt=CurTxt;
        }
    }
}

	//增加
	function addWin(){
		$('#diveceRecordData').datagrid('clearSelections');
			var url = rootPath +"/monitorproject/deviceuserecord/samplingdeviceuserecord!toAdd.action?projectid="+projectid+"&projectcode="+projectcode;
			var _dialog =  window.top.$('	<div id ="role-dlg" style="padding:0px;"><iframe id="componentFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
			_dialog.dialog({
				title:'仪器使用记录编辑',
				autoOpen:false,
				modal:true,
				closed:true,
				width:'850',
				height:'450',
				buttons:[{
					text:'保存',
					iconCls:'icon-save',
					handler:function(){
						$("#componentFrame",top.document.body).contents().find("#componentform").form('submit',{
							url:rootPath +"/monitorproject/deviceuserecord/samplingdeviceuserecord!save.action",
							onSubmit:function(){
								var objs = $("#componentFrame",top.document.body).contents().find(".grkj-validate");
								if(!saveCheck(objs)){
									$("#componentFrame",top.document.body).contents().find(":input").focus();
									alert("数据输入不符合格式，请查看红色边框的输入框的输入提示！");
									return false;
								}
								var pointId=$("#componentFrame",top.document.body).contents().find("#selectedUserid").val();
								if(pointId==""){
									alert("请至少选择一个监测点");
									return false;
								}
							},
							success:function(data){
								if(data=="success"){
								_dialog.dialog('close');
								$("#diveceRecordData").datagrid('reload');
								alert('成功');
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
	
	//修改
	function enditWin(id){
		$('#diveceRecordData').datagrid('clearSelections');
			var url = rootPath +"/monitorproject/deviceuserecord/samplingdeviceuserecord!input.action?projectid="+projectid+"&projectcode="+projectcode;
			if(id!=""){
				url = url + "&id="+id;
			}
			var _dialog =  window.top.$('	<div id ="role-dlg" style="padding:0px;"><iframe id="componentsFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
			_dialog.dialog({
				title:'仪器使用记录编辑',
				autoOpen:false,
				modal:true,
				closed:true,
				width:'350',
				height:'250',
				buttons:[{
					text:'保存',
					iconCls:'icon-save',
					handler:function(){
						$("#componentsFrame",top.document.body).contents().find("#componentform").form('submit',{
							url:rootPath +"/monitorproject/deviceuserecord/samplingdeviceuserecord!save.action",
							onSubmit:function(){
								var objs = $("#componentsFrame",top.document.body).contents().find(".grkj-validate");
								if(!saveCheck(objs)){
									$("#componentsFrame",top.document.body).contents().find(":input").focus();
									alert("数据输入不符合格式，请查看红色边框的输入框的输入提示！");
									return false;
								}
								
							},
							success:function(data){
								if(data=="success"){
								_dialog.dialog('close');
								$("#diveceRecordData").datagrid('reload');
								alert('成功');
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
		//详情
		function detail(id){
				//$('#diveceRecordData').datagrid('clearSelections');
				$('#diveceJsButtonData').datagrid('clearSelections');
			var deviceids=$("#deviceids").val();
				var url = rootPath +"/monitorproject/deviceuserecord/samplingdeviceuserecord!view.action?id="+id;
				//if(id!=""){
				//	url = url + "?id="+id;
				//}
				//$(window.top.document).find("#btnProjectInfo").click();
				var _dialog =  window.top.$('	<div id ="role-dlg" style="padding:0px;"><iframe id="departmentinfoFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
				//window.top.document.body.appendChild(win);
				_dialog.dialog({
					title:'仪器配件详情',
					autoOpen:false,
					modal:true,
					closed:true,
					width:'300',
					height:'200'
				});
				_dialog.dialog('open');
			}
		//单条删除
		function delOne(uid,index){
			$('#diveceJsButtonData').datagrid('clearSelections');
			$('#diveceJsButtonData').datagrid('selectRow',index);
				if(window.confirm('是否删除？')){
					$.post(rootPath +"/monitorproject/deviceuserecord/samplingdeviceuserecord!deleteOnlyOne.action",{id:uid},function(del){
						if(del=='success'){
							$('#diveceJsButtonData').datagrid('clearSelections');
							$("#diveceJsButtonData").datagrid('reload');
							alert('成功');
						}
						
					});
				}
		}
		//批量删除	删除和批量删除原是    页面上的仪器使用记录按钮所用到的js    后被改成js里面写的那个仪器的按钮的删除方式了)
		function delAll(){
			var selected=$("#diveceJsButtonData").datagrid('getSelections');
			if(selected==null || selected.length< 1){
				
				alert('请至少选择一条记录！');
			}
			else{
				if(window.confirm('是否删除？')){
					var cc = "";
					for ( var i = 0; i < selected.length; i++) {
						if(cc==""){
								cc+=selected[i].deviceid+"#"+selected[i].usedate;
						}
						else{
							cc+=","+selected[i].deviceid+"#"+selected[i].usedate;
							}
					}
					
					$.post(rootPath +"/monitorproject/deviceuserecord/samplingdeviceuserecord!deleteAll.action",{id:cc},function(del){
						if(del=='success'){
							$('#diveceJsButtonData').datagrid('clearSelections');
							$("#diveceJsButtonData").datagrid('reload');
							alert('成功');
						}
					});
					
				 }
			}
		}
		//查询
		function query(){
			var deviceName=$("#deviceName").val();
			var monitorname=$("#monitorname").val();
			$('#diveceRecordData').datagrid( {
				queryParams : {
				monitorname : monitorname,
				deviceName:deviceName
				},
				pageNumber:1		
			});
			//location.href = "departmentinfo.action?deptid=" + deptid+"&deptnames="+deptnames;
			
		}
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		