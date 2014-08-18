/**
 * @auther  wjy
 * @param {Object} info
 * @return {TypeName} 
 */
//物品入库用此方法~因为物品入库的地方时不需要左边的checkbox  以及页面的宽度是675 与别的流程里的650是不一样的，所以就这样拆出来一个新的方法
function initAffirmDataGrid(info){	
	$('#materialdataRuku').datagrid({
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
				columns:[[
						{field:'materialname',title:'物品名称',width:150,align:"center"},
						{field:'applynumber',title:'申请数量',width:70,align:"center"},
						{field:'inventnum',title:'库存数量',hidden:true,width:100,align:"center"},
						{field:'purchasenumber',title:'已入库数量',width:70,align:"center"},
						{field:'unit',title:'单位',width:70,align:"center"},
						{field:'model',title:'规格型号',width:100,align:"center"},
						{field:'stepCode',title:'状态编码',hidden:true},
						{field:'status',title:'状态',width:100,align:"center"},
						{field:'applydate',title:'申请日期',width:100,align:"center"},
						{field:'dept',title:'申请部门',width:100,align:"center"},
						{field:'hopedate',title:'期望到货日期',width:100,align:"center"},
						{field:'operate',title:'操作',width:80,align:"center",
							formatter:function(value,rec){
							var str =  '<img class="img1" alt="详情" src="'+rootPath+'/themes/default/images/xiangxiimage.png" onclick="view('+rec.purid+')"/>&nbsp;&nbsp;' +
								'<img class="img4" alt="评审意见" src="'+rootPath+'/themes/default/images/yijianimage.png" onclick="openOpinionListDlg('+rec.purid+')"/>&nbsp;&nbsp;';
								str +='<img class="img5" alt="入库" src="'+rootPath+'/themes/default/images/entry.png" onclick="toin('+rec.purid+',\''+rec.provider+'\',\''+rec.stepCode+'\')"/>';
							return str;
							}
						}						
				]],
				pagination:true,
				rownumbers:true
			}); 
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

//查看详情
function view(id){
	$('#materialdataRuku').datagrid('clearSelections');
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


function edit(mid,status){
	$('#materialdataRuku').datagrid('clearSelections');
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
								$("#materialdataRuku").datagrid('reload');
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

//入库
function toin(purid,provider,status){	
	$('#materialdataRuku').datagrid('clearSelections');
	var str="{data:[{'purid':'"+purid+"','stepCode':'"+status+"'}]}";
	//if(status=='ForStorage'){
		var url =  rootPath +'/material/materialpurchase!toIn.action?purid='+purid+'&info='+provider;
				var _dialog =  window.top.$('<div id="toinDialog"  style="padding:0px;"><iframe id="toinFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
				_dialog.dialog({
					title:'物品入库修改',
					autoOpen:false,
					modal:true,
					closed:true,
					width:'590',
					height:'400',
					buttons:[{
						text:'保存',
						iconCls:'icon-save',
						handler:function(){
							$("#toinFrame",top.document.body).contents().find("#json").val(str);
							$("#toinFrame",top.document.body).contents().find("#toinframe").form('submit',{
								url:rootPath +'/material/materialpurchase!inSave.action',
								onSubmit:function(){
									var objs = $("#toinFrame",top.document.body).contents().find(".grkj-validate");
									if(!saveCheck(objs)){									
										$("#toinFrame",top.document.body).contents().find(":input").focus();
										alert("数据输入不符合格式，请查看红色边框的输入框的输入提示！");
										return false;
									}
									
								},
								success:function(data){
									_dialog.dialog('close');
									$("#materialdataRuku").datagrid('reload');
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
 
//查询
function queryAffirm(){
	var starttime = $("#starttime").val();//开始时间
	var endtime = $("#endtime").val();//结束时间
	var materialname= $("#materialname").val();//物品名
	var deptid = $("#depart").val();
	$('#materialdataRuku').datagrid( {
		queryParams : {
		starttime : starttime,
		endtime:endtime,
		materialname:materialname,
		deptid:deptid
		},
		pageNumber : 1  //查询后指定页码为1
	});
}