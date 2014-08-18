//加载任务安排页面
function initDataGrid(){			
	$('#samplelist').datagrid({
		nowrap: false,
		striped: true,
		collapsible:true,
		url:'taskarrange!initListData.action?items='+items, 
		fit:true,
		fitColumns : true,
		scrollbarSize:0,
		remoteSort: false,
		//idField:'testid',
		singleSelect:false,
		pageSize:20,
		pageList:[20,40,50,60,70],
		frozenColumns:[[
			{field:'testid',checkbox:true,align:"center"}
						]],
		columns:[[
				{field:'samplecode',title:'样品编号',width:40,align:"center"},
				{field:'samplename',title:'样品名称',width:40,align:"center"},
				{field:'itemname',title:'监测项目',width:150,align:"center"},
				{field:'samplecondition',title:'样品状况',width:40,align:"center"},
				{field:'defaultperson',title:'默认分析人',width:50,align:"center"},
				{field:'anlyseperson',title:'分析人',width:40,align:"center"},
				{field:'monitortype',title:'监测点类型',width:80,align:"center"},
				{field:'pointcode',title:'监测点编码',width:40,align:"center"},
				{field:'pointname',title:'监测点名称',width:80,align:"center"},
				{field:'sampletime',title:'采样日期',width:40,align:"center"},
				{field:'status',title:'状态',width:40,align:"center",
					formatter:function(value,rowData,rowIndex){
						if(value=="SampeGrant"){
							return "样品发放";
						}
						if(value=="SampeTest"){
							return "样品分析";
						}
					}
				}	
		]],
		pagination:true,
		rownumbers:false
		
	});
	$(window).resize(function() {
		$("#samplelist").datagrid('resize');
	});

}

//查询
function querySamples() {
	$("#samplelist").datagrid("clearSelections");
	var jcxm = $("#jcxm").val();//项目id
	var ypbm = $('#ypbm').val();
	var status = $("#status").val();//状态
	var typeid= $("#typeid").val();//监测点类型
	var startdate= $("#startdate").val();//开始日期
	var enddate= $("#enddate").val();//结束日期
	$('#samplelist').datagrid( {
		queryParams : {
		jcxm:jcxm,
		ypbm:ypbm,
		status:status,
		typeid:typeid,
		startdate:startdate,
		enddate:enddate
		},
		pageNumber : 1  //查询后指定页码为1
	});
}


//做项目弹出窗口使用
function showitem(){
	url=rootPath +"/projects/taskarrange/taskarrange!toListPage.action?items="+items;
	var _dialog =  window.top.$('<div id ="cert-dlg" style="padding:0px;"><iframe id="ItemFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
	_dialog.dialog({
		title:'项目选择',
		autoOpen:false,
		modal:true,
		closed:true,
		width:'600',
		height:'480',
		buttons:[{
			text:'确定',
			iconCls:'icon-save',
			handler:function(){
 			var itemname=$("#ItemFrame",top.document.body).contents().find("#selectedItemnames").val();
			var itemid=$("#ItemFrame",top.document.body).contents().find("#selectedItemid").val();
			$("#jcxmname").val(itemname);
			$("#jcxm").val(itemid);
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

function initItemData(){
	$('#itemlist').datagrid({
		nowrap: false,
		striped: true,
		collapsible:true,
	 	url:rootPath +"/projects/taskarrange/taskarrange!initItemList.action?items="+items+"&status="+status,
		fit:true,
		fitColumns : true,
		scrollbarSize:0,
		remoteSort: false,
		singleSelect:false,
		frozenColumns:[[
			{field:'ck',checkbox:true,align:"center"}
		]],
		columns:[[
			{field:'itemtypename',title:'监测类型',width:100,align:"center"}	,
			{field:'itemname',title:'监测项目',width:100,align:"center"}	
		]],
		rownumbers:true,
		onLoadSuccess:function(data){
			var value=$("#selectedItemnames").val();
			var valueids=$("#selectedItemid").val();
			var valueid=$("#selectedItemid").val().split(",");
			if(valueids!=null&&valueids!=""){
				for ( var i = 0; i < valueid.length; i++) {
					var rows = $('#itemlist').datagrid('selectRecord',valueid[i]);
				}
				
			}
		},
		onSelect:onSelectItem,
		onUnselect:unSelectItem,
		onSelectAll:selectAllItem,
		onUnselectAll:unSelectAllItem
	});
	$(window).resize(function() {
		$("#itemlist").datagrid('resize');
	});
}

function onSelectItem(rowIndex,rowData){
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
function unSelectItem(rowIndex,rowData){
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
function selectAllItem(){
	var value=$("#selectedItemnames").val().split(",");
	var valueid=$("#selectedItemid").val().split(",");
	var selected=$("#itemlist").datagrid('getSelections');
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
function unSelectAllItem(){
	var rows = $('#itemlist').datagrid('getRows');
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
		
function queryItem(){
	var itemname=$("#itemname").val();
	var itemtypeid=$("#itemtypeid").val();
	$('#itemlist').datagrid( {
		queryParams : {
		itemtypeid : itemtypeid,
		itemname:itemname
		},
		pageNumber:1		
	});
}


function operate(){
	var rows = $("#samplelist").datagrid("getSelections");
	var itemid;
	if (rows!=null && rows!="") {
		var str = "";
		for(var i=0;i<rows.length;i++){
				if(str!="")
					str = str + ",";
				str = str + rows[i].testid;
				itemid = rows[i].itemid;
				if(i>=1){			
					if(rows[i-1].itemid==rows[i].itemid){						
					}else{
						alert("只能批量设置相同的项目，请先通过条件过滤!");
						return;
					}
				}
		}
		var url =  rootPath +'/projects/taskarrange/taskarrange!toUserPage.action?itemid='+itemid;
		var _dialog =  window.top.$('<div id ="role-dlg" style="padding:0px;"><iframe id="oneUserFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
		_dialog.dialog({
			title:'选择分析人',
			autoOpen:false,
			modal:true,
			closed:true,
			width:'500',
			height:'400',
			buttons:[{
				text:'保存',
				iconCls:'icon-save',
				handler:function(){
					var testid=$("#oneUserFrame",top.document.body).contents().find("#selectedUserid").val();
					
					$.post(
						rootPath + "/projects/taskarrange/taskarrange!operate.action",
						{ids:str,userid:testid,itemid:itemid},
						function(msg){
							if(msg=="success"){
								_dialog.dialog('close'); 
								$('#samplelist').datagrid('clearSelections');
								alert("设置成功！");
								$("#samplelist").datagrid('reload');
							}else{
								alert("设置失败！");
							}
						}
					);
				
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
	} else {
		alert('请至少选择一条记录！');
		return;
	}
}


function initUserData(){
	$('#userlist').datagrid({
		singleSelect:true,
		nowrap: false,
		striped: true,
		collapsible:true,
		url:rootPath+'/projects/taskarrange/taskarrange!initUserList.action?itemid='+itemid,
		fit:true,
		fitColumns:true,
		scrollbarSize:0,
		remoteSort: false,
		idField:'userid',
		pageSize:10,
		pageList:[10,20,30,40],
		frozenColumns:[[
			{	field : 'userid',
				title : '&nbsp;',
				width : 30,
				align : 'center',
				formatter : function(value){
					return "<input type='radio' name='radio'/>";}
			}
					]],
		columns:[[
				{field:'realname',title:'姓名',width:100,align:"center"}	,
				{field:'departname',title:'部门',width:140,align:"center"},
				{field:'groupname',title:'组',width:140,align:"center"}
		]],
		onSelect:function(rowIndex,rowData){
			$($("input[type=radio]")[rowIndex]).attr("checked", true);
			$("#selectedUserid").val(rowData.userid);
			
		},
		pagination:true,
		rownumbers:false
	});			
}