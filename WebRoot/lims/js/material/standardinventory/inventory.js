//-----Au-----wjy~~

function initDataGrid() {
	var sta = $("#sta").val();
	$('#inventorygrid').datagrid(
					{
						nowrap : false,
						striped : true,
						collapsible : true,
						singleSelect:true,
						url:rootPath +'/material/standardinventory/standardinventory!inventoryList.action?sta='+sta, 
//						sortName : 'sta',
//						sortOrder : 'asc',
						remoteSort : false,
					//	idField : 'inventoryid',
						fit : true,
						fitColumns : true,
						scrollbarSize : 0,
						pageSize : 20,
						pageList : [ 20, 30, 40, 50 ],
					
						columns : [ [
								{
									field : 'materialname',
									title : '标准物质名称',
									width : 80,
									align : 'center'
								},
								{
									field : 'batchno',
									title : '批号',
									width : 50,
									align : "center"
								}/*,
								{
									field : 'model',
									title : '规格型号',
									width : 80,
									align : 'center'
								} */ ,
								{
									field : 'consistence',
									title : '浓度',
									width : 60,
									align : 'center'
								},
								{
									field : 'uncertainty',
									title : '不确定度',
									width : 80,
									align : 'center'
								},{
									field : 'unitname',
									title : '浓度单位',
									width : 40,
									align : 'center'
								},
								{
									field : 'dilutionmultiple',
									title : '稀释倍数',
									width : 50,
									align : "center"
								},
								{
									field : 'remainingnum',
									title : '剩余数量',
									width : 40,
									align : 'center'
								},
								{
									field : 'usenumall',
									title : '领用数量',
									width : 40,
									align : 'center'
								},
								{
									field : 'expirationdate',
									title : '失效日期',
									width : 60,
									align : 'center'
								},{
									field : 'storageperson',
									title : '入库人',
									width : 50,
									align : 'center'
								},{
									field : 'storagetime',
									title : '入库时间',
									width : 80,
									align : 'center'
								},{
									field : 'sta',
									title : '状态',
									width : 30,
									align : "center",
									formatter:function(value,rowData){
									if(rowData.sta){
										if(rowData.sta!=null){
											var status = rowData.sta.substring(1,rowData.length);
											return status;
										}
									}else{
										return "";
									}
								}								
								},{
									field : 'option',
									title : '操作',
									width : 70,
									align : 'center',
									formatter : function(value, rec,rowIndex) {
										var links='<img class="img5" alt="入库" src="'+rootPath+'/themes/default/images/entry.png" onclick="putstortoin(\''+ rec.inventoryid +'\',\''+ rec.sta +'\')"/>&nbsp;';
										links+='<img src="'+rootPath+'/themes/default/images/xiangxiimage.png" alt="详细"  id="btnshow" onclick="detail(\''+ rec.inventoryid +'\')"/>&nbsp;';
										links+='<img src="'+rootPath+'/themes/default/images/bianjiimage.png"    alt="编辑"  id="btnshow" onclick="editStand(\''+ rec.inventoryid +'\')"/>&nbsp;';
										links+='<img src="'+rootPath+'/themes/default/images/historyimage.png"   alt="领用记录" id="btnshow" onclick="useHistory(\''+ rec.inventoryid +'\',\''+ rec.sta +'\')"/>&nbsp;';
										//links+='<img src="'+rootPath+'/themes/default/images/deleteimage.png"    alt="删除"  id="btnshow" onclick="delte(\''+ rec.inventoryid + '\',\''+rowIndex+'\')"/>';
										return links;}
								} ] ],
						pagination : true,
						rownumbers : true,
						rowStyler:function(rowIndex,rowData){
							if(rowData.sta=='1已过期'){
								return 'color:red';
							}else if(rowData.sta=='2即将过期'){
								return "color:blue";
							}else{
								if(rowData.isten=='StoreNotice'){
									return 'color:green';
								}
							}
						}
				
					});		
	$(window).resize(function() {
		$("#inventorygrid").datagrid('resize');
	});
}

function delte(uid,rowIndex){
	//单条删除
	$('#inventorygrid').datagrid('clearSelections');
	$('#inventorygrid').datagrid('selectRow',rowIndex);
		if(window.confirm('是否删除？')){
			$.post(rootPath +"/material/standardinventory/standardinventory!deleteOnlyOne.action",{id:uid},function(del){
				if(del=='success'){
					alert('成功');
					$("#inventorygrid").datagrid('reload');
				}
			});
		}
}
//查看详情
function detail(id) {
	var url = rootPath + "/material/standardinventory/standardinventory!view.action";
	if (id != "") {
		url = url + "?id=" + id;
	}
	var _dialog = window.top
			.$('<div id ="cert-dlg" style="padding:0px;"><iframe id="detailFrame" name="detailFrame" width="100%" height="100%" frameborder="0" scrolling="yes" src=' + url + '></iframe></div>')
			.appendTo(window.top.document.body);
	_dialog.dialog( {
		title : '库存详情',
		autoOpen : false,
		modal : true,
		closed : true,
		width : '630',
		height : '620'
	});
	_dialog.dialog('open');
}


//查看当前人的领用记录
function useHistory(id,sta) {
	var url = rootPath + "/material/standardinventory/standardinventory!history.action";
	if (id != "") {
		url = url + "?inventoryid=" + id;
		if(sta=="1已过期"){
			url = url+"&sta=2";
		}
		if(sta=="4已处理"){
			url = url+"&sta=4";
		}
	}

	var _dialog = window.top
			.$('<div id ="cert-dlg"><iframe id="detailFrame" name="inventoryFrame" width="100%" height="100%" frameborder="0" scrolling="no" src=' + url + '></iframe></div>')
			.appendTo(window.top.document.body);
	_dialog.dialog( {
		title : '领用记录',
		autoOpen : false,
		modal : true,
		closed : true,
		width : '750',
		height : '480',
		onClose : function() {
			_dialog.dialog("destroy");
//			$("#inventorygrid").datagrid('reload');
		}
	});
	_dialog.dialog('open');
}

//查询
function query() {
	var materialname = $("#materialname").val();//物品名称
	var materialtype = $("#materialtype").val();//物品类型
	var batchno= $("#batchno").val();//批号
	var sta= $("#sta").val();//状态
	var isten= $("#isten").val();//库存数量
	var starttime=$("#starttime").val();//开始日期
	var endtime=$("#endtime").val();//结束日期
	var storageman = $("#storageman").val();
	if((starttime==""&&endtime!="")||(endtime==""&&starttime!="")){
		alert("请将领用日期填写完整");
	}else{
		$('#inventorygrid').datagrid( {
			queryParams : {
			storageman : storageman,
			materialname : materialname,
			materialtype:materialtype,
			batchno:batchno,
			sta:sta,
			isten:isten,
			starttime:starttime,
			endtime:endtime
			},
			url:rootPath +'/material/standardinventory/standardinventory!inventoryList.action',
			pageNumber : 1  //查询后指定页码为1
		});
	}
}




//入库的操作
function putstor(){
	var url = rootPath + "/material/standardinventory/standardinventory!putStorage.action";
	var _dialog =  window.top.$('<div id="toinDialog"  style="padding:0px;"><iframe id="putstorFrame" width="100%" height="100%" frameborder="0" scrolling="yes" src='+url+'></iframe></div>').appendTo(window.top.document.body);
	_dialog.dialog({
		title:'物品信息',
		autoOpen:false,
		modal:true,
		closed:true,
		width:'630',
		height:'620',
		buttons:[{
			text:'保存',
			iconCls:'icon-save',
			handler:function(){
			$("#putstorFrame",top.document.body).contents().find("#putstorframe").form('submit',{
					url:rootPath +'/material/standardinventory/standardinventory!save.action?jsflag=update',
					onSubmit:function(){
						$("#putstorFrame",top.document.body).contents().find("#mixids").click();
						var expirationdate = $("#putstorFrame",top.document.body).contents().find("#expirationdate").val(); 
						var storagetime = $("#putstorFrame",top.document.body).contents().find("#storagetime").val(); 
						if(expirationdate<storagetime){
							alert("标准物质已失效！");
							return false;
						}
						var objs = $("#putstorFrame",top.document.body).contents().find(".grkj-validate");
						if(!saveCheck(objs)){									
							$("#putstorFrame",top.document.body).contents().find(":input").focus();
							alert("数据输入不符合格式，请查看红色边框的输入框的输入提示！");
							return false;
						}
					},
					success:function(data){
						if(data=="success"){
							_dialog.dialog('close');
							alert("成功");
							$("#inventorygrid").datagrid('reload');
						}else{
							alert("失败");	
							return false;
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

	//单独数量入库的操作
	function putstortoin(id,status){
		if(null!=status && status!=''  && status=='1已过期'){
			alert("该物品已过期，不能入库！");
			return false;
		}
		if(null!=status && status!=''  && status=='4已处理'){
			alert("该物品已过期，不能入库！");
			return false;
		}
		var url = rootPath + "/material/standardinventory/standardinventory!toin.action?inventoryid="+id;
		var _dialog =  window.top.$('<div id="toinDialog"  style="padding:0px;"><iframe id="toinFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
		_dialog.dialog({
			title:'标准物质入库',
			autoOpen:false,
			modal:true,
			closed:true,
			width:'300',
			height:'120',
			buttons:[{
				text:'保存',
				iconCls:'icon-save',
				handler:function(){
				$("#toinFrame",top.document.body).contents().find("#inventoryForm").form('submit',{
						url:rootPath +'/material/standardinventory/standardinventory!toinsave.action',
						onSubmit:function(){
							var objs = $("#toinFrame",top.document.body).contents().find(".grkj-validate");
							if(!saveCheck(objs)){									
								$("#toinFrame",top.document.body).contents().find(":input").focus();
								alert("数据输入不符合格式，请查看红色边框的输入框的输入提示！");
								return false;
							}
						},
						success:function(data){
							if(data=="success"){
								_dialog.dialog('close');
								alert("成功");
								$("#inventorygrid").datagrid('reload');
							}else{
								alert("失败");	
								return false;
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

/**
 * 修改标准物品入库信息
 * @param {Object} id
 * @return {TypeName} 
 */
function editStand(id){
	var url = rootPath + "/material/standardinventory/standardinventory!input.action?id="+id;
	var _dialog =  window.top.$('<div id="toinDialog"  style="padding:0px;"><iframe id="putstorsFrame" width="100%" height="100%" frameborder="0" scrolling="yes" src='+url+'></iframe></div>').appendTo(window.top.document.body);
	_dialog.dialog({
		title:'物品信息',
		autoOpen:false,
		modal:true,
		closed:true,
		width:'630',
		height:'620',
		buttons:[{
			text:'保存',
			iconCls:'icon-save',
			handler:function(){
				$("#putstorsFrame",top.document.body).contents().find("#putstorframe").form('submit',{
					url:rootPath +'/material/standardinventory/standardinventory!save.action',
					onSubmit:function(){
						$("#putstorFrame",top.document.body).contents().find("#mixids").click();
						var objs = $("#putstorsFrame",top.document.body).contents().find(".grkj-validate");
						if(!saveCheck(objs)){									
							$("#putstorsFrame",top.document.body).contents().find(":input").focus();
							alert("数据输入不符合格式，请查看红色边框的输入框的输入提示！");
							return false;
						}
					},
					success:function(data){
						if(data=="success"){
							_dialog.dialog('close');
							alert("成功");
							$("#inventorygrid").datagrid('reload');
						}else{
							alert("失败");	
							return false;
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
