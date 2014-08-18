function initstandard(info){		//因为此处的标准物质入库自己使用单独的页面，所以info参数并未传进去，而是在后台自动匹配上了Affirm	
	$('#standarddata').datagrid({
				width:document.body.clientWidth,
				height:655,
				nowrap: false,
				striped: true,
				collapsible:true,
				url:rootPath +'/material/standardpurchase!toList.action', 
				fit:true,
				fitColumns : true,
				scrollbarSize:0,
				remoteSort: false,
				idField:'purid',
				singleSelect:false,
				pageSize:20,
				pageList:[20,30,40,50],
				frozenColumns:[[
					{field:'purid',hidden:true}
				]],
				columns:[[
						{field:'materialname',title:'物品名称',width:100,align:"center"},
						{field:'applynumber',title:'申请数量',width:100,align:"center"},
						{field:'purchasenumber',title:'已入库数量',width:70,align:"center"},
						{field:'unit',title:'单位',width:100,align:"center"},
						{field:'model',title:'规格型号',width:100,align:"center"},
						{field:'stepCode',title:'状态编码',hidden:true},
						{field:'status',title:'状态',width:100,align:"center"},
						{field:'applydate',title:'申请日期',width:100,align:"center"},
						{field:'dept',title:'申请部门',width:100,align:"center"},
						{field:'hopedate',title:'期望到货日期',width:100,align:"center"},
						{field:'operate',title:'操作',width:80,align:"center",
							formatter:function(value,rec){
							var str =  '<img class="img1" alt="详情" src="'+rootPath+'/themes/default/images/xiangxiimage.png" onclick="view('+rec.purid+')"/>&nbsp;&nbsp;' +
							'<img class="img2" alt="修改" src="'+rootPath+'/themes/default/images/bianjiimage.png" onclick="edit('+rec.purid+',\''+rec.stepCode+'\')"/><span class="span">&nbsp;&nbsp;</span>'+
							'<img class="img4" alt="审核记录" src="'+rootPath+'/themes/default/images/yijianimage.png" onclick="openOpinionListDlg('+rec.purid+')"/>&nbsp;&nbsp;';
								str +='<img class="img5" alt="入库" src="'+rootPath+'/themes/default/images/entry.png" onclick="toin('+rec.purid+',\''+rec.provider+'\',\''+rec.stepCode+'\')"/>';
							return str;
							}
						}						
				]],
				pagination:true,
				rownumbers:true,
				onLoadSuccess:function(data){
					if(info =="DepartmentAudit" ||info=="DispartLeadingAudit"||info=="LeadingApprove"||info=="ForStorage"||info=="Affirm") 
					{
						$(".img2").hide();
						$(".span").hide();
					}		
				}
				
				
			});
			$(window).resize(function() {
				$("#standarddata").datagrid('resize');
			});

}


	
//获取选中项目
function getSelectedRows(){
	var rows = $("#standarddata").datagrid("getSelections");
	if(rows==null || rows.length<1){
		alert('请至少选择一条记录！');
		return '';
	}else{
		var arr = [];
		for(var i=0;i<rows.length;i++){
			if(arr!="")
				arr = arr + ",";
			arr = arr + rows[i].purid;
		}
		return arr;
	}
}
//查看详情
function view(id){
	$('#standarddata').datagrid('clearSelections');
	var url = rootPath + "/material/materialpurchase!toView.action";
	if(id!=""){
		url = url + "?purid="+id+"&flagName=stand";
	}
	var _dialog =  window.top.$('	<div id ="dlg" style="padding:0px;"><iframe id="dlgFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
	_dialog.dialog({
	title:'物品采购详情',
	autoOpen:false,
	modal:true,
	closed:true,
	width:'520',
	height:'400',
	onClose:function(){
			_dialog.dialog("destroy");					
		}
	});
	_dialog.dialog('open');
}

//是否都是登记状态单据
function isRegister(){
	var rows = $("#standarddata").datagrid("getSelections");
	if(rows==null || rows.length<1){
		alert('请至少选择一条记录！');
		return false;
	}else{
		for(var i=0;i<rows.length;i++){
			if(rows[i].stepCode!='Register'){
				alert('存在已申请的单据,请去掉选择重新提交');
				return false;
			}
		}
		return true;
	}
}


//提交
function openDialog(action){
	var rows = $("#standarddata").datagrid("getSelections");
	if(rows==null || rows.length<1){
			alert('请至少选择一条记录！');
			return;
	}
		
	if(step=='Register'){	
		
		for(var i=0;i<rows.length;i++){
			if(rows[i].stepCode!='Register'){
				alert('存在已申请的单据,请去掉选择重新提交');
				return;
			}
		}
	} 
//	
//	if(step=='Affirm'){		
//		for(var i=0;i<rows.length;i++){
//			if(rows[i].stepCode=='ForStorage'){
//				alert('存在未入库的单据,请先入库再提交');
//				return;
//			}
//		}
//	}
	if(window.confirm('是否'+action+'选中行？')){
		
			var url = rootPath + "/material/materialpurchase!opinionDlg.action";
			var _dialog =  window.top.$('	<div id ="dlg" style="padding:0px;"><iframe id="dlgFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
			_dialog.dialog({
			title:'审核记录',
			autoOpen:false,
			modal:true,
			closed:true,
			width:'520',
			height:'220',
			buttons:[{
				text:'确定',
				iconCls:'icon-ok',
				handler:function(){
					var objs = $("#dlgFrame",top.document.body).contents().find(".grkj-validate");	
					var message = $("#dlgFrame",top.document.body).contents().find("#opinion").val();
					if(!saveCheck(objs)){
						$("#dlgFrame",top.document.body).contents().find(":input").focus();
						alert("数据输入不符合格式，请查看红色边框的输入框的输入提示！");
						return false;
					}
					operate(action,message);
					
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
		
}

//流程操作
function operate(action,message){
	var rows = $("#standarddata").datagrid("getSelections");
	if (rows!=null && rows!="") {
 		
			var str = "";
			for(var i=0;i<rows.length;i++){
					if(str!="")
						str = str + ",";
					str = str + "{'purid':'"+rows[i].purid+"','stepCode':'"+rows[i].stepCode+"'}";
			}
			str = "{'data':["+str+"]}";
			$.post(
				rootPath + "/material/materialpurchase!operate.action",
				{json:str,info:action,opinion:message},
				function(msg){
					if(msg=="success"){
						$('#standarddata').datagrid('clearSelections');
						alert("提交成功！");
						$("#standarddata").datagrid('reload');
					}else{
						alert("提交失败！");
					}
				}
			);
		
	} else {
		alert('请至少选择一条记录！');
		return;
	}
}
//入库
function toin(purid,provider,status){
	$('#standarddata').datagrid('clearSelections');
	var str="{data:[{'purid':'"+purid+"','stepCode':'"+status+"'}]}";
	var url =  rootPath +'/material/materialpurchase!toIn.action?purid='+purid+'&info='+provider+'&flagName=stand';
				var _dialog =  window.top.$('<div id="toinDialog"  style="padding:0px;"><iframe id="toinFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
				_dialog.dialog({
					title:'标准物品入库修改',
					autoOpen:false,
					modal:true,
					closed:true,
					width:'600',
					height:'620',
					buttons:[{
						text:'保存',
						iconCls:'icon-save',
						handler:function(){
							$("#toinFrame",top.document.body).contents().find("#json").val(str);
							$("#toinFrame",top.document.body).contents().find("#toinframe").form('submit',{
								url:rootPath +'/material/materialpurchase!inSave.action',
								onSubmit:function(){
									$("#toinFrame",top.document.body).contents().find("#mixids").click();
									var expirationdate = $("#toinFrame",top.document.body).contents().find("#expirationdate").val(); 
									var storagetime = $("#toinFrame",top.document.body).contents().find("#storagetime").val(); 
									if(expirationdate<storagetime){
										alert("标准物质已失效！");
										return false;
									}
									var objs = $("#toinFrame",top.document.body).contents().find(".grkj-validate");
									if(!saveCheck(objs)){	
										$("#toinFrame",top.document.body).contents().find(":input").focus();
										alert("数据输入不符合格式，请查看红色边框的输入框的输入提示！");
										return false;
									}
									
								},
								success:function(data){
									_dialog.dialog('close');
									$("#standarddata").datagrid('reload');
									alert('成功');
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
		
//	}else{
//		alert("本物品不属于待入库物品，不可以执行该操作！");
//	}
}

function edit(mid,status){
	$('#standarddata').datagrid('clearSelections');
		if(step=='Register'&&status!='Register'){
			alert('采购物品正在审核，不可修改!');
			return;
		}
		var url ="";
		if(status=="ForStock"||status=="Stocking"){
			url = rootPath +'/material/materialpurchase!tocgedit.action?purid='+mid;
		}else{
			url =  rootPath +'/material/materialpurchase!toEdit.action?purid='+mid;
		}			
			var _dialog =  window.top.$('<div id="materialDialog"  style="padding:0px;"><iframe id="materialFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
			_dialog.dialog({
				title:'修改页面',
				autoOpen:false,
				modal:true,
				closed:true,
				width:'560',
				height:'250',
				buttons:[{
					text:'保存',
					iconCls:'icon-save',
					handler:function(){
					
						$("#materialFrame",top.document.body).contents().find("#materialframe").form('submit',{
							url:rootPath +'/material/materialpurchase!save.action',
							onSubmit:function(){
								var objs = $("#materialFrame",top.document.body).contents().find(".grkj-validate");
								if(!saveCheck(objs)){
									$("#materialFrame",top.document.body).contents().find(":input").focus();
									alert("数据输入不符合格式，请查看红色边框的输入框的输入提示！");
									return false;
								}
								
							},
							success:function(data){
								_dialog.dialog('close');
								$("#standarddata").datagrid('reload');
								alert('成功');
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
//评审意见列表对话框
function openOpinionListDlg(id){	
	$('#standarddata').datagrid('clearSelections');
	var url =  rootPath +'/material/materialpurchase!toOpinionList.action?purid='+id;
	var _dialog =  window.top.$('	<div id ="dlg" style="padding:0px;"><iframe id="dlgFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
	_dialog.dialog({
	title:'审核记录',
	autoOpen:false,
	modal:true,
	closed:true,
	width:'650',
	height:'350',
	onClose:function(){
			_dialog.dialog("destroy");					
		}
	});
	_dialog.dialog('open');
}
//评审意见列表
function opinionList(id){
	$('#datagrid').datagrid({
		nowrap: false,
		striped: true,
		collapsible:true,
		url:rootPath + '/material/materialpurchase!opinionList.action?purid='+id,
		fit:true,
		fitColumns:true,
		scrollbarSize:0,
		singleSelect:true,
		idField:'purid',
		columns:[[
			{field:'user',title:'审核人',width:120,align : 'center'},
			{field:'time',title:'审核时间',width:150,align : 'center'},
			{field:'nextstep',title:'审核状态',width:120,align : 'center'},					
			{field:'opinion',title:'审核意见',width:280,align : 'center'}
			
		]],
		pagination:true,
		rownumbers:true,
		pageSize:10,
		pageList:[10,20,30]
	});
			
	$(window).resize(function(){
		$("#datagrid").datagrid('resize');
	})	;
}
//查询
function query() {
	var starttime = $("#starttime").val();//开始时间
	var endtime = $("#endtime").val();//结束时间
	var materialname= $("#materialname").val();//物品名
	var deptid = $("#depart").val();
	$('#standarddata').datagrid( {
		queryParams : {
		starttime : starttime,
		endtime:endtime,
		materialname:materialname,
		deptid:deptid
		},
		pageNumber : 1  //查询后指定页码为1
	});
}