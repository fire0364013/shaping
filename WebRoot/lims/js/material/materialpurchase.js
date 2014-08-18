function initDataGrid(info){	
	$('#materialdata').datagrid({
				width:document.body.clientWidth,
				nowrap: false,
				striped: true,
				collapsible:true,
				url:rootPath +'/material/materialpurchase!toList.action?info='+info, 
				fit:true,
				fitColumns : true,
				scrollbarSize:0,
				remoteSort: false,
				idField:'purid',
				singleSelect:false,
				pageSize:20,
				pageList:[20,30,40,50],
				frozenColumns : [ [ {
							field : 'ck',
							checkbox : true,align:'center'
						} ] ],
				columns:[[
						{field:'materialname',title:'物品名称',width:150,align:"center"},
						{field:'applynumber',title:'申请数量',width:70,align:"center"},
						{field:'inventnum',title:'库存数量',hidden:true,width:100,align:"center"},
						{field:'unit',title:'单位',width:70,align:"center"},
						{field:'model',title:'规格型号',width:100,align:"center"},
						{field:'stepCode',title:'状态编码',hidden:true},
						{field:'status',title:'状态',width:100,align:"center"},
						{field:'applydate',title:'申请日期',width:100,align:"center"},
						{field:'dept',title:'申请部门',hidden:true,width:100,align:"center"},
						{field:'hopedate',title:'期望到货日期',width:100,align:"center"},
						{field:'operate',title:'操作',width:80,align:"center",
							formatter:function(value,rec){
							var str =  '<img class="img1" alt="详情" src="'+rootPath+'/themes/default/images/xiangxiimage.png" onclick="view('+rec.purid+')"/>&nbsp;&nbsp;' +
							'<img class="img2" alt="修改" src="'+rootPath+'/themes/default/images/bianjiimage.png" onclick="edit('+rec.purid+',\''+rec.stepCode+'\')"/><span class="span">&nbsp;&nbsp;</span>'+
							'<img class="img4" alt="审核记录" src="'+rootPath+'/themes/default/images/yijianimage.png" onclick="openOpinionListDlg('+rec.purid+')"/><span class="span1">&nbsp;&nbsp;</span>';
								str +='<img class="img5" alt="入库" src="'+rootPath+'/themes/default/images/entry.png" onclick="toin('+rec.purid+',\''+rec.provider+'\',\''+rec.stepCode+'\')"/>';
							return str;
							}
						}						
				]],
				pagination:true,
				rownumbers:true,
				onLoadSuccess:function(data){
					if(info=="Register"){
						$(".img5").hide();
						$(".span1").hide();
					}else if(info =="DepartmentAudit" ||info=="DispartLeadingAudit"||info=="LeadingApprove") 
					{
						$(".img2").hide();
						$(".img5").hide();
						$(".span").hide();
						$(".span1").hide();
					}else if(info=='ForStock'){
						//$(".img2").hide();
						$(".img5").hide();
						//$(".span").hide();
						$(".span1").hide();
						setTimeout("showColumn(\"materialdata\",\"inventnum\")",10);//在办公室的时候，要将库存数量进行展示
						setTimeout("hideColumn(\"materialdata\",\"unit\")",10);//当时办公室的时候，要将unit进行隐藏
					}else if(info=='Affirm' ||info=='ForCheck' ){
						$(".img2").hide();
						$(".span").hide();
						setTimeout("showColumn(\"materialdata\",\"dept\")",10);//在办公室的时候，要将库存数量进行展示
					}
					
				}
			});
			$(window).resize(function() {
				$("#materialdata").datagrid('resize', {
					width : function() {
						return documentWidth;
					},
					height : function() {
						return document.body.clientHeight;
					}
				});
			});
}


//显示列
function showColumn(tableID,colList){
    var ColArray = colList.split(",");
    var tTable = $('#'+tableID);
    if(ColArray!=null&&ColArray!=""){
    	for(var i=0;i<ColArray.length;i++){
    		tTable.datagrid('showColumn',ColArray[i]);
    	}
    }
}

//隐藏列
function hideColumn(tableID,colList){
    var ColArray = colList.split(",");
    var tTable = $('#'+tableID);
    if(ColArray!=null&&ColArray!=""){
    	for(var i=0;i<ColArray.length;i++){
    		tTable.datagrid('hideColumn',ColArray[i]);
    	}
    }
}


function createColumnMenu(inventnum){ 
				$('#materialdata').datagrid('showColumn', inventnum.text);
}
//添加	
	function addWin(){
			var url =  rootPath +'/material/materials!toList.action';
			var _dialog =  window.top.$('<div id="materialDialog"  style="padding:0px;"><iframe id="materialFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
			_dialog.dialog({
				title:'物品选择',
				autoOpen:false,
				modal:true,
				closed:true,
				width:'750',
				height:'410',
				buttons:[{
					text:'保存',
					iconCls:'icon-save',
					handler:function(){
//						var objs = $("#materialFrame",top.document.body).contents().find(".grkj-validate");
//						
//						if(!saveCheck(objs)){
//							$("#materialFrame",top.document.body).contents().find("input[name='number']").focus();
//							alert("数据输入不符合格式，请查看红色边框的输入框的输入提示！");
//							return false;
//						}
//						
						//$("#materialFrame",top.document.body).contents().find("#ids").click();
						//获取ID
						var idsStr = $("#materialFrame",top.document.body).contents().find("#ids").val();
						//获取数量
						var numbersStr = $("#materialFrame",top.document.body).contents().find("#numbers").val();
						
//						alert(idsStr);
//						alert(numbersStr);
						var jsonArrStr = "";
						
						if(idsStr==null||idsStr==""){
							alert("请至少选择一条记录！");
							return false;
						}else{
							var arrIds = idsStr.split(",");
							var arrNums = numbersStr.split(",");
							
							
							for(var i=0;i<arrIds.length;i++){
								var isHavaValue = false;
								for(var j=0;j<arrNums.length;j++){
									var kv = arrNums[j].split("=");
									//判断选中物品ID和输入物品数量NUMBER是否相等
									if("number"+arrIds[i] == kv[0]){
										if(jsonArrStr!="") jsonArrStr = jsonArrStr + ",";
										jsonArrStr = jsonArrStr + "{'id':'"+arrIds[i]+"','number':'"+kv[1]+"'}";
										isHavaValue=true;
										break;
									}
								}
								if(isHavaValue==false)
								{
									alert("请输入申请数量！");
									return false;
								}
							}
						}
						
						$.post( rootPath +"/material/materialpurchase!addAll.action",{ids:"["+jsonArrStr+"]"},function(add){
							if(add=='success'){
								$('#materialdata').datagrid('clearSelections');
								$("#materialdata").datagrid('reload');
								_dialog.dialog('close');
								alert('成功');
							}else{
								alert('失败');
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
	
//获取选中项目
function getSelectedRows(){
	var rows = $("#materialdata").datagrid("getSelections");
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
	$('#materialdata').datagrid('clearSelections');
	var url = rootPath + "/material/materialpurchase!toView.action";
	if(id!=""){
		url = url + "?purid="+id;
	}
	var _dialog =  window.top.$('	<div id ="dlg" style="padding:0px;"><iframe id="dlgFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
	_dialog.dialog({
	title:'物品采购详情',
	autoOpen:false,
	modal:true,
	closed:true,
	width:'520',
	height:'301',
	onClose:function(){
			_dialog.dialog("destroy");					
		}
	});
	_dialog.dialog('open');
}

//是否都是登记状态单据
function isRegister(){
	var rows = $("#materialdata").datagrid("getSelections");
	if(rows==null || rows.length<1){
		alert('请至少选择一条记录！');
		return false;
	}else{
		for(var i=0;i<rows.length;i++){
			if(rows[i].stepCode!='Register'){
				alert('选项中存在已提交的记录，请重新选择登记状态的记录！');
				return false;
			}
		}
		return true;
	}
}

//批量删除
function deteleAll(){
	var rows = $("#materialdata").datagrid("getSelections");
	if(rows==null || rows.length<1){
			alert('请至少选择一条记录！');
			return;
	}
	for(var i=0;i<rows.length;i++){
			if(rows[i].stepCode!='Register'){
				alert('选项中存在已提交的记录，请重新选择登记状态的记录！');
				return;
			}
	}
	if(window.confirm('是否删除选中行？'))
 	{
		var idsVal = getSelectedRows();
		if(idsVal!=''&&idsVal!=null){
			$.post(rootPath +"/material/materialpurchase!deleteAll.action",{ids:idsVal},function(del){
				if(del=='success'){
					$('#materialdata').datagrid('clearSelections');
					$("#materialdata").datagrid('reload');
					alert('成功');
				}else{
					alert('失败');
				}
			});
		}
	}
}
//提交
function openDialog(action){
	var rows = $("#materialdata").datagrid("getSelections");
	if(rows==null || rows.length<1){
		alert('请至少选择一条记录！');
		return;
	}
	if(step=='Register'){				
		for(var i=0;i<rows.length;i++){
			if(rows[i].stepCode!='Register'){
				alert('选项中存在已提交的记录，请重新选择登记状态的记录！');
				return;
			}
			
			if(rows[i].stepCode=='Register'&&rows[i].applynumber==0){
				alert('存在申请数量为零的数据，请修改申请数量再次提交！');
				return;
			}
		}	
		if(window.confirm('是否提交选中行？')){	
			operate(action,"");			
		}
		return;
	} 
	
		if(action=='提交'){
			if(window.confirm('是否提交选中行？')){	
					operate(action,"");
				}
		}else{	
			if(window.confirm('是否退回选中行？')){	
				submit(action);
				}	
		}
	
}

function submit(action){
	var url = rootPath + "/projects/appraiseopinion/appraiseopinion!opinionDlg.action?moduleid='10'";//物品流程的退回
			var _dialog =  window.top.$('	<div id ="dlg" style="padding:0px;"><iframe id="dlgFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
			_dialog.dialog({
			title:'退回意见',
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

//流程操作
function operate(action,message){
	var rows = $("#materialdata").datagrid("getSelections");
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
						$('#materialdata').datagrid('clearSelections');
						alert("成功！");
						$("#materialdata").datagrid('reload');
					}else{
						alert("失败！");
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
	$('#materialdata').datagrid('clearSelections');
	var str="{data:[{'purid':'"+purid+"','stepCode':'"+status+"'}]}";
	//if(status=='ForStorage'){
		var url =  rootPath +'/material/materialpurchase!toIn.action?purid='+purid+'&info='+provider;
				var _dialog =  window.top.$('<div id="toinDialog"  style="padding:0px;"><iframe id="toinFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
				_dialog.dialog({
					title:'物品入库修改',
					autoOpen:false,
					modal:true,
					closed:true,
					width:'600',
					height:'350',
					buttons:[{
						text:'保存',
						iconCls:'icon-save',
						handler:function(){
							$("#toinFrame",top.document.body).contents().find("#json").val(str);
							$("#toinFrame",top.document.body).contents().find("#toinframe").form('submit',{
								url:rootPath +'/material/materialpurchase!inSave.action',
								onSubmit:function(){
									var expirationdate = $("#toinFrame",top.document.body).contents().find("#expirationdate").val(); 
									var storagetime = $("#toinFrame",top.document.body).contents().find("#storagetime").val(); 
									if(expirationdate<storagetime){
										alert("物品已失效！");
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
									$("#materialdata").datagrid('reload');
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
//		
//	}else{
//		alert("本物品不属于待入库物品，不可以执行该操作！");
//	}
}

function edit(mid,status){
	$('#materialdata').datagrid('clearSelections');
		if(step=='Register'&&status=='Over'){
			alert('采购物品已完成，不可修改!');
			return;
		}
		if(step=='Register'&&status!='Register'){
			alert('物品采购正在进行中，不可修改!');
			return;
		}
		var url ="";
		if(status=="ForStock"||status=="Stocking"){//ForStock  物品采购申请 （办公室）
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
								var countfocus= $("#materialFrame",top.document.body).contents().find("#countfocus").val();
								if(countfocus==0){
									alert("申请数量不能为零");
									return false;
								}
								var objs = $("#materialFrame",top.document.body).contents().find(".grkj-validate");
								if(!saveCheck(objs)){
									$("#materialFrame",top.document.body).contents().find(":input").focus();
									alert("数据输入不符合格式，请查看红色边框的输入框的输入提示！");
									return false;
								}
							},
							success:function(data){
								_dialog.dialog('close');
								$("#materialdata").datagrid('reload');
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
	$('#materialdata').datagrid('clearSelections');
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
	var status = $("#stepStatus").val();//状态
	var deptid = $("#depart").val();
	$('#materialdata').datagrid( {
		queryParams : {
		starttime : starttime,
		endtime:endtime,
		materialname:materialname,
		status:status,
		deptid:deptid
		},
		pageNumber : 1  //查询后指定页码为1
	});
}
