//-----Au-----wjy~~

	$(document).ready(function() {
				initDataGrid();
			});

function initDataGrid() {
	$('#inventorygrid').datagrid(
					{
						nowrap : false,
						striped : true,
						collapsible : true,
						singleSelect:true,
						url:rootPath +'/material/inventory/materialinventory!inventoryList.action', 
//						sortName : 'sta',
//						sortOrder : 'asc',
						remoteSort : false,
						fit : true,
						fitColumns : true,
						scrollbarSize : 0,
						pageSize : 20,
						pageList : [ 20, 30, 40, 50 ],
						columns : [ [
								{
									field : 'materialname',
									title : '物品名称',
									width : 130,
									align : 'center'
								},
//								{
//									field : 'batchno',
//									title : '批号',
//									width : 50,
//									align : "center"
//								},
								{
									field : 'bigType',
									title : '物品大类',
									width : 60,
									align : 'center'
								},
								{
									field : 'materialtype',
									title : '物品小类',
									width : 120,
									align : 'center'
								},{
									field : 'model',
									title : '规格型号',
									width : 80,
									align : 'center'
								},{
									field : 'remainingnum',
									title : '剩余数量',
									width : 50,
									align : 'center'
								},{
									field : 'usenumall',
									title : '领用数量',
									width : 50,
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
									width : 50,
									align : "center",
									formatter:function(value,rowData){
									if(rowData.sta){
										if(rowData.sta!=null){
											var status = rowData.sta.substring(1,rowData.length);
											return status;
										}
									}
								}
								},{
									field : 'option',
									title : '操作',
									width : 80,
									align : 'center',
									formatter : function(value, rec) { 
									var links='<img class="img5" alt="入库" src="'+rootPath+'/themes/default/images/entry.png" onclick="putstortoin(\''+ rec.inventoryid +'\',\''+ rec.sta +'\')"/>&nbsp;&nbsp;';
										links+='<img src="'+rootPath+'/themes/default/images/xiangxiimage.png" alt="详细"  id="btnshow" onclick="detail(\''+ rec.inventoryid +'\')"/>&nbsp;&nbsp;';
										links+='<img src="'+rootPath+'/themes/default/images/bianjiimage.png"    alt="编辑"  id="btnshow" onclick="editStand(\''+ rec.inventoryid +'\')"/>&nbsp;&nbsp;';//防止转化为数字型
										links+='<img src="'+rootPath+'/themes/default/images/historyimage.png"   alt="领用记录" id="btnshow" onclick="useHistory(\''+ rec.inventoryid +'\',\''+ rec.sta +'\')"/>';
										return links;}
								} ] ],
						pagination : true,
						rownumbers : true,
						rowStyler:function(rowIndex,rowData){
							 if(rowData.remainingnum!='0'){
								if(rowData.sta=='1已过期'){
									return 'color:red';
								}
								if(rowData.sta=='2即将过期'){
									return "color:blue";		
								}
							 }
						}
				
					});		
	$(window).resize(function() {
		$("#inventorygrid").datagrid('resize');
	});
}


//查看详情
function detail(id) {
	var url = rootPath + "/material/inventory/materialinventory!view.action";
	if (id != "") {
		url = url + "?id=" + id;
	}
	var _dialog = window.top
			.$('<div id ="cert-dlg" style="padding:0px;"><iframe id="detailFrame" name="detailFrame" width="100%" height="100%" frameborder="0" scrolling="no" src=' + url + '></iframe></div>')
			.appendTo(window.top.document.body);
	_dialog.dialog( {
		title : '库存详情',
		autoOpen : false,
		modal : true,
		closed : true,
		width : '630',
		height : '300'
	});
	_dialog.dialog('open');
}


//查看当前人的领用记录
function useHistory(id,sta) { 
	var url = rootPath + "/material/inventory/materialinventory!history.action";
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
			.$('<div id ="cert-dlg" style="padding:0px;"><iframe id="detailFrame" name="inventoryFrame" width="100%" height="100%" frameborder="0" scrolling="no" src=' + url + '></iframe></div>')
			.appendTo(window.top.document.body);
	_dialog.dialog( {
		title : '领用记录',
		autoOpen : false,
		modal : true,
		closed : true,
		width : '630',
		height : '445',
		onClose : function() {
			_dialog.dialog("destroy");
			$("#inventorygrid").datagrid('reload');
		}
	});
	_dialog.dialog('open');
}

//查询
function query() {
	var materialname = $("#materialname").val();//物品名称
	var materialtype = $("#materialtypeid").val();//物品类型
	var dalei = $("#dalei").val(); //物品类型
	var batchno= $("#batchno").val();//批号
	var sta= $("#sta").val();//状态
	var starttime=$("#starttime").val();//开始日期
	var endtime=$("#endtime").val();//结束日期
	if((starttime==""&&endtime!="")||(endtime==""&&starttime!="")){
		alert("请将领用日期填写完整");
	}else{
		$('#inventorygrid').datagrid( {
			queryParams : {
			materialname : materialname,
			materialtype:materialtype,
			batchno:batchno,
			sta:sta,
			starttime:starttime,
			endtime:endtime,
			dalei:dalei
			},
			pageNumber : 1  //查询后指定页码为1
		});
	}
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
			title:'物品入库',
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


//入库的操作

function putstor(){
	
	var url = rootPath + "/material/inventory/materialinventory!putStorage.action";
	var _dialog =  window.top.$('<div id="toinDialog"  style="padding:0px;"><iframe id="putstorFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
	_dialog.dialog({
		title:'入库编辑页面',
		autoOpen:false,
		modal:true,
		closed:true,
		width:'570',
		height:'350',
		buttons:[{
			text:'保存',
			iconCls:'icon-save',
			handler:function(){
				$("#putstorFrame",top.document.body).contents().find("#putstorframe").form('submit',{
					url:rootPath +'/material/inventory/materialinventory!save.action',
					onSubmit:function(){
						var expirationdate = $("#putstorFrame",top.document.body).contents().find("#expirationdate").val(); 
						var storagetime = $("#putstorFrame",top.document.body).contents().find("#storagetime").val(); 
						if(expirationdate<storagetime){
							alert("物质已失效！");
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
						if(data=='success'){
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
//加载大类的下拉列表
function bigTypeData() {
	var bigType=$("#bigType").val();
	$.ajax( {
		type : 'GET',
		url : rootPath +'/material/materials/materials!getAllDaLeiJSON.action?timeStamp='+new Date().getTime(),//给该url一个时间戳~~这样就必须每次从服务器读取数据,
		async:false,//同步
		success : function(data) {
			var vData = eval("(" + data + ")");
			var lList = "<option value=''>---请选择---</option>";
			//遍历json数据  
			jQuery.each(vData.rowsData, function(i, n) {
				if(bigType!=''&&n.id==bigType){
					lList += "<option value=" + n.id + " selected>"+  n.category	+ "</option>";
				}else{
				lList += "<option value=" + n.id+ ">" +  n.category	+ "</option>";
				}
			});				
			//绑定数据到listLeft
			$('#dalei').append(lList);
		}
	});
}
//加载小类的下拉列表
function smallTypeData() {
	var str='';
	var smallType=$("#smallType").val();
	//查询时调用
	var dalei = $('#dalei').val();
	$.ajax( {
		type : 'GET',
		url : rootPath +'/material/materials/materials!getAllXiaoLeiJSON.action?timeStamp='+new Date().getTime(),//给该url一个时间戳~~这样就必须每次从服务器读取数据,
		data : {'bigTypeId' : dalei},
		async:false,//同步
		success : function(data) {
			var vData = eval("(" + data + ")");
			var lList = "<option value=''>---请选择---</option>";
			//遍历json数据  
			jQuery.each(vData.rowsData, function(i, n) {
				if(smallType!=''&&n.materialtypeid==smallType){
					lList += "<option value=" + n.materialtypeid + " selected>"+   n.meaterialname	+ "</option>";
				}else{
					lList += "<option value=" + n.materialtypeid + ">" + n.meaterialname	+ "</option>";
				}
			});				
			//绑定数据到listLeft
			$('#materialtypeid').append(lList);
		}
	});
}	
/**
 * 修改物品入库信息
 * @param {Object} id
 * @return {TypeName} 
 */
function editStand(id){  
	var url = rootPath + "/material/inventory/materialinventory!input.action?id="+id;
	var _dialog =  window.top.$('<div id="toinDialog"  style="padding:0px;"><iframe id="putstorFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
	_dialog.dialog({
		title:'物品信息',
		autoOpen:false,
		modal:true,
		closed:true,
		width:'570',
		height:'350',
		buttons:[{
			text:'保存',
			iconCls:'icon-save',
			handler:function(){
			$("#putstorFrame",top.document.body).contents().find("#putstorframe").form('submit',{
					url:rootPath +'/material/inventory/materialinventory!save.action',
					onSubmit:function(){
						var objs = $("#putstorFrame",top.document.body).contents().find(".grkj-validate");
						var storgetime = $("#putstorFrame",top.document.body).contents().find("#storgetime").val();
						//alert(storgetime);
						if(storgetime==null || storgetime==''){
							alert("入库时间不能为空！");
							return false;
						}
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

