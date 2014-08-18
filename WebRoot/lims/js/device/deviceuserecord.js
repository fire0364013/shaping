$(document).ready(function() {
	initDataGrid();
});

function initDataGrid(){
		$('#deviceuserecordDatagrid').datagrid({			
			width:800,
			height:600,
			nowrap: false,
			striped: true,
			collapsible:true,
			url:rootPath +'/device/deviceuserecord/deviceuserecord!deviceuserecordList.action?sampleitemtestid='+sampleitemtestid+'&batchno='+batchno+'&deviceid='+deviceid,	
			fit : true,
			fitColumns : true,
			scrollbarSize:0,
			remoteSort: false,
			idField:'userecordid',
			pageSize:20,
			pageList:[10,20,30,40,50],
//			frozenColumns:[[
//				{field:'userecordid',checkbox:true}
//			]],
			columns:[[
					{field:'devicetype',title:'仪器类型', width:100,align:"center"},					
					{field:'devicename',title:'仪器名称', width:100,align:"center"},
					{field:'spectype',title:'规格型号', width:100,align:"center"},
					{field:'leavefactorynum',title:'出厂编号', width:100,align:"center"},
//					{field:'devicenum',title:'仪器编号', width:100,align:"center"},
					{field:'usedate',title:'使用日期', width:100,align:"center"},					
					{field:'startingupperson',title:'使用人', width:100,align:"center"},
//					{field:'startinguptime',title:'使用日期', width:100,align:"center"},
					//{field:'runstatus',title:'运行状态', width:100,align:"center"},
					{field:'initialtemperature',title:'温度', width:60,align:"center"},
					{field:'initialhumidity',title:'湿度 ', width:60,align:"center"},
					{field:'operate',title:'操作',width:60,align : 'center',
						formatter:function(value,rowData,rowIndex){
							return '<span style="color:red"><img src="'+rootPath+'/themes/default/images/bianjiimage.png" alt="编辑" onclick="addWin('+rowData.userecordid+')"/></span>';
						}
					}
//					{field:'controltemperature',title:'控制温度', width:100,align:"center"}
					//{field:'controlhumidity',title:'控制湿度', width:100,align:"center"},
					//{field:'shutdownperson',title:'关机人', width:100,align:"center"},
					//{field:'shutdowntime',title:'关机时间', width:100,align:"center"}//,
//					{field:'operate',title:'操作', width:120,align:"center",
//						formatter:function(value,rec){
//							var links='<img src="'+rootPath +'/themes/default/images/xiangxiimage.png" id="btnshow" onclick="detail('+ rec.deviceid +')" alt="详情"/>&nbsp;&nbsp;';
//							links+='<img src="'+rootPath +'/themes/default/images/bianjiimage.png" id="btnshow" onclick="addWin('+ rec.deviceid +')" alt="编辑"/>&nbsp;&nbsp;';
//							links+='<img src="'+rootPath +'/themes/default/images/deleteimage.png"" id="btnshow" onclick="del('+ rec.deviceid +')" alt="注销"/>';
//							return links;
//						}
//					}						
			]],
			pagination:true,
			rownumbers:true,
				onLoadSuccess:function(){
					$('#deviceuserecordDatagrid').datagrid('clearSelections');
				}
			
			
		});
		$(window).resize(function() {
			$("#deviceuserecordDatagrid").datagrid('resize', {
				width : function() {
					return documentWidth;
				},
				height : function() {
					return document.body.clientHeight;
				}
			});
		});
}

//添加
function addWin(userecordid){
	$('#deviceuserecordDatagrid').datagrid('clearSelections');
	var url = rootPath +"/device/deviceuserecord/deviceuserecord!input.action";
	if(userecordid!=""){
		url = url + '?userecordid='+userecordid+'&sampleitemtestid='+sampleitemtestid+'&batchno='+batchno;
	}
	var _dialog =  window.top.$('<div id ="role-dlg" style="padding:0px;"><iframe id="deviceuserecordFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
	_dialog.dialog({
		title:'仪器信息编辑',
		autoOpen:false,
		modal:true,
		closed:true,
		width:'500',
		height:'200',
		buttons:[{
			text:'保存',
			iconCls:'icon-save',
			handler:function(){
			
				$("#deviceuserecordFrame",top.document.body).contents().find("#deviceuserecordForm").form('submit',{
					url:rootPath +'/device/deviceuserecord/deviceuserecord!saveEntity.action',
					onSubmit:function(){
						var objs = $("#deviceuserecordFrame",top.document.body).contents().find(".grkj-validate");
						if(!saveCheck(objs)){
							$("#deviceuserecordFrame",top.document.body).contents().find(":input").focus();
							alert("数据输入不符合格式，请查看红色边框的输入框的输入提示！");
							return false;
						}
					},
					success:function(data){
						if(data=='success'){
							alert('编辑成功');
							_dialog.dialog('close');
							$("#deviceuserecordDatagrid").datagrid('reload');
						}else{
							alert("编辑失败");
							_dialog.dialog('close');
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
		