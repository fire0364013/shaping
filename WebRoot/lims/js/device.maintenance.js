function relaod(){//重新装载数据
	$('#datagrid').datagrid('reload');
}

function initDataGrid(){
			$('#datagrid').datagrid({
				nowrap: false,
				striped: true,
				collapsible:true,
				url:'maintenance!maintnList.action',
				fit:true,
				fitColumns:true,
				scrollbarSize:0,
//				idField:'id',
				columns:[[
					{field:'id',checkbox:true,align : 'center'},
			        {field:'devicenum',title:'仪器编号',width:200,align : 'center'},					
					{field:'devicename',title:'仪器名称',width:281,align : 'center'},
					{field:'office',title:'使用科室',width:150,align : 'center'},
					{field:'cycle',title:'核定周期',width:120,align : 'center'},
					{field:'date',title:'上次核定日期',width:200,align : 'center'},
					{field:'days',title:'提醒',hidden:true,width:100,align : 'center'},
					{field:'operate',title:'操作',width:80,align : 'center',
						formatter:function(value,rowData,rowIndex){
							return '<span style="color:red"><img src="'+rootPath+'/themes/default/images/xiangxiimage.png"  alt="详细"   onclick="view('+rowData.id+')"/></span>' ;
		//					'<img src="'+rootPath+'/themes/default/images/bianjiimage.png" onclick="edit('+rowData.id+')"/> &nbsp;&nbsp;' +
		//					'<img src="'+rootPath+'/themes/default/images/deleteimage.png" onclick="deleteRole('+rowData.id+')"/></span>';
						}
					}					
				]],
				rowStyler:function(index,row,css){
					var flag = row.flag;
						if (flag=='过期'){
							return 'color:red;';
						}else if(flag=='即将到期'){
							return 'color:#FF9900';
					}
				},
				pagination:true,
				rownumbers:true,
				pageSize:20,
				pageList:[20,30,40]
				
			});
			
		$(window).resize(function(){
			$("#datagrid").datagrid('resize');
		})	;
}


//检索
function searchObj(){
	var devicenum = $('#devicenum').val();			//仪器编号
	var devicename = $('#devicename').val();  		//仪器名称
	var office = $('#office').val(); 		//使用科室
	//alert(devicenum+devicename+office);
	$('#datagrid').datagrid( {
		queryParams : {
			devicenum : devicenum,
			devicename : devicename,
			office : office
		},
		pageNumber:1
	});

}

//打开详细页面
function view(id){
	$('#datagrid').datagrid('clearSelections');
	$('#datagrid').datagrid('selectRecord',id);
	var url = rootPath + "/device/maintenance/maintenance!toview.action";
	if(id!=""){
		url = url + "?id="+id;
	}

	var _dialog =  window.top.$('	<div id ="dlg" style="padding:0px;"><iframe id="dlgFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
	_dialog.dialog({
	title:'仪器核查记录详情',
	autoOpen:false,
	modal:true,
	closed:true,
	width:'750',
	height:'456',
	onClose:function(){
			_dialog.dialog("destroy");					
		}
	});
	_dialog.dialog('open');

}

//仪器选择列表
function initDeviceList(){
	$('#devicelist').datagrid({
				nowrap: false,
				striped: true,
				collapsible:true,
				url:'maintenance!getMaintenceDevice.action',
				fit:true,
				fitColumns:true,
				scrollbarSize:0,
				singleSelect:true,
				idField:'deviceid',
				frozenColumns:[[
					{	field : 'deviceid',
						title : '&nbsp;',
						width : 30,
						align : 'center',
						formatter : function(value){
							return "<input type='radio' name='radio'/>";}
					}
				]],
				columns:[[
					{field:'devicetype',title:'仪器类型',width:200,align : 'center'},	
			        {field:'devicenum',title:'仪器编号',width:200,align : 'center'},					
					{field:'devicename',title:'仪器名称',width:281,align : 'center'}				
				]],
				pagination:true,
				rownumbers:true,
				pageSize:10,
				pageList:[10,20],
				onSelect:function(rowIndex,rowData){
					checkRadio();
					$("#deviceid").val(rowData.deviceid);
					$("#devicename").val(rowData.devicename);
				}
				
			});
}

//单选控制
function checkRadio(){
	var row = $('#devicelist').datagrid('getSelected');
	var rowNum = 0;
	var rows = $('#devicelist').datagrid('getRows');
	for ( var i = 0; i < rows.length; i++) {
		if (row == rows[i]) {
			rowNum = i;
			break;
		}
	}
	var radios = $("input[type=radio]");
	$(radios[rowNum]).attr("checked", true);
}

//仪器查询
function searchDevice(){
	var devicetype = $('#devicetype').val();			//仪器类型
	var devicenum = $('#devicenum').val();  		//仪器名称
	$('#devicelist').datagrid( {
		queryParams : {
			devicetype : devicetype,
			devicenum : devicenum
		},
		pageNumber:1
	});
}

//添加弹出窗
function add(){
	var url = rootPath + "/device/maintenance/maintenance!input.action";
	var _dialog =  window.top.$('	<div id ="maintenance-dlg" style="padding:0px;"><iframe id="maintenanceFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
	//window.top.document.body.appendChild(win);
	_dialog.dialog({
	title:'仪器核查编辑',
	autoOpen:false,
	modal:true,
	closed:true,
	width:'360',
	height:'297',
	buttons:[{
		text:'保存',
		iconCls:'icon-save',
		handler:function(){
			$("#maintenanceFrame",top.document.body).contents().find("#maintenanceForm").form('submit',
				{
					url:rootPath + '/device/maintenance/maintenance!save.action',
					onSubmit:function(){
						var objs = $("#maintenanceFrame",top.document.body).contents().find(".grkj-validate");
						
						if(!saveCheck(objs)){
							$("#maintenanceFrame",top.document.body).contents().find(":input").focus();
							alert("数据输入不符合格式，请查看红色边框的输入框的输入提示！");
							return false;
						}																			
					},
					success:function(data){
							if(data=='sucess'){
								_dialog.dialog('close');
								alert("保存成功！");
								relaod();
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
}

//选择仪器列表
function selectDevice(){
	var url = rootPath + "/device/maintenance/maintenance!deviceList.action";
	var _dialog =  window.top.$('	<div id ="device-dlg" style="padding:0px;"><iframe id="deviceFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
	//window.top.document.body.appendChild(win);
	_dialog.dialog({
	title:'仪器选择',
	autoOpen:false,
	modal:true,
	closed:true,
	width:'650',
	height:'410',
	buttons:[{
		text:'确定',
		iconCls:'icon-ok',
		handler:function(){
			$("#deviceid").val($("#deviceFrame",top.document.body).contents().find("#deviceid").val());
			$("#devicename").val($("#deviceFrame",top.document.body).contents().find("#devicename").val());
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
			$("#devicename").focus();
			_dialog.dialog("destroy");					
		}
	});
	_dialog.dialog('open');
}

//删除仪器维护记录
function remove(){
	var rows = $('#datagrid').datagrid('getSelections');
	if (rows!=null && rows!="") {
 		if(window.confirm('是否删除？'))
 		{
//			var arr = new Array();
 			var arr = "";
			for(var i=0;i<rows.length;i++){
				if(arr!=""){
					arr = arr + ",";
				}
				arr = arr + rows[i].id;
			}

			$.ajax({
				type:'POST',
				url:rootPath + '/device/maintenance/maintenance!remove.action',
				data:'json='+arr,
				success:function(data){
					if(data=='success'){
						alert('删除成功！');
						relaod();
					}else{
						aler('删除失败！');
					}
				}
			});
		}
	} else {
		alert('请至少选择一条记录！');
	}
	
}

//获取仪器维护详情列表
function initMaintenanceDetaiList(){
	$('#mDetailList').datagrid({
				nowrap: false,
				striped: true,
				collapsible:true,
				url:rootPath + '/device/maintenance/maintenance!getMaintenanceDetail.action?id='+maintenanceId,
				fit:true,
				fitColumns:true,
				scrollbarSize:0,
				singleSelect:true,
				columns:[[
					{field:'id',checkbox:true,align : 'center'},
			        {field:'devicenum',title:'仪器编号',width:150,align : 'center'},					
					{field:'devicename',title:'仪器名称',width:181,align : 'center'},
			        {field:'mperson',title:'核查人',width:100,align : 'center'},					
					{field:'mdate',title:'核查日期',width:150,align : 'center'},
					{field:'serviceresult',title:'核查结果',width:200,align : 'center'},
					{field:'operate',title:'操作',width:180,align : 'center',
						formatter:function(value,rowData,rowIndex){
							var links='<img src="'+rootPath +'/themes/default/images/xiangxiimage.png" id="btnshow" onclick="detail('+ rowData.id +')" alt="编辑"/>&nbsp;&nbsp;';
								links+='<img src="'+rootPath +'/themes/default/images/bianjiimage.png" id="btnshow" onclick="detail2('+ rowData.id+')" alt="删除"/>&nbsp;&nbsp;';
								return links;
						}
					}
				]],
				pagination:true,
				rownumbers:true,
				pageSize:10,
				pageList:[10,20]
				
			});
}

//到期提醒:date上次维护日期、cycle维护周期、day维护提醒天数
function notice(date,cycle,day){
//默认10天提醒
	if(day==""||day==null){
		day = 10;
	}
//当前日期
	var now = new Date();
	var nowDate = new Date(now.getFullYear(),now.getMonth()+1,now.getDate());

//下一次维护日期
	var arrs;
	var times;
	var num="";
	if(date!=""){
		arrs=date.split("-");
		var cyclename = cycle.substring(cycle.length-1,cycle.length);
		if(cyclename=='日'){
			arrs[2] = parseInt(cycle.substring(0,cycle.length-1))+parseInt(arrs[2],10);
		}else if(cyclename =='月'){
			arrs[1] = parseInt(cycle.substring(0,cycle.length-1))+parseInt(arrs[1],10);
			
		}else{
			arrs[0] = parseInt(cycle.substring(0,cycle.length-1))+parseInt(arrs[0],10);
		}
		times = new Date(arrs[0],arrs[1],arrs[2]);
		//alert("times="+arrs[0]+"-"+arrs[1]+"-"+arrs[2]+"nowDate:"+now.getYear()+"-"+(now.getMonth())+1+"-"+now.getDate());
		//判断
		//如果下次维护日期小于当前日期，则”过期“提醒；
		//如果下次维护日期与当前日期相隔时间小于维护提醒天数，则”即将到期“提醒
		if(times.getTime()-nowDate.getTime()<0){
			num = "过期";
		}else{
			num = parseInt(Math.floor(times-nowDate)/(1000*60*60*24))<parseInt(day)?"即将到期":""//离下次提醒日期间隔天数
		}
	}
	return num;

}