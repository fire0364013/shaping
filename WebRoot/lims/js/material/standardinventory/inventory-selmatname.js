//加载标准物质
function getMixdataJson(inventoryid){
	$.ajax( {
		type : 'GET',
		url : rootPath+'/material/standardinventory/standardinventory!getMixdataJson.action?timeStamp='+new Date().getTime(),//给该url一个时间戳~~这样就必须每次从服务器读取数据,
		data : {'inventoryid':inventoryid},
		async:false,//同步
		success : function(data) {
			var vData = eval("(" + data + ")");
			var lList = "";//"<option value=''>---请选择---</option>";
			var mixid = "";
			//遍历json数据  
			jQuery.each(vData.rowsData, function(i, n) {
				if(i==0){
					mixid = n.mixid;
				}
				lList += "<option value=" + n.mixid + ">" + n.materialname	+ "</option>";
			});
			$('#mixid').html('');
			$('#mixid').append(lList);
			if(mixid!='' && mixid!=null && mixid!=undefined){
				getConsistenceUncertainty('1',mixid);
			}
		}
	});
}
//加载浓度和不确定度
function getConsistenceUncertainty(flag,obj){
	var mixid='';
	if(flag=='1'){
		mixid = obj.toString();
	}else{
		mixid = obj.value;
	}
	$.ajax( {
		type : 'GET',
		url : rootPath+'/material/standardinventory/standardinventory!getConsistenceUncertainty.action?timeStamp='+new Date().getTime(),//给该url一个时间戳~~这样就必须每次从服务器读取数据,
		data : {'mixid':mixid},
		async:false,//同步
		success : function(data) {
			if(data=='nodata'){
				alert("该标准物质无浓度和不确定度！");
			}else{
				var str = data;
				var arr = str.split("@");
				//alert(arr[0]+"_____"+arr[1]);
				$("#solutionconcentration").val(arr[0]);	
				//$("#uncertainty").val(arr[1]);
			}
		}
	});
}

//物品名称的弹出窗口使用
function showmateriinventoryName(){
	var name=$("#reportitemname").val(); 
	var encodeName="";  
	if(name==""){//当没有选择项目就选择物质的时候，
		//alert("请先选择项目");
		//return false;
	}else{
		encodeName=encodeURI(encodeURI(name));
	}
	var url = rootPath + "/material/standardinventory/standardinventory!toMaterialinventoryName.action?flagItemname="+encodeName;//链接选择物品的页面~~
	var _dialog =  window.top.$('<div id ="cert-dlg" style="padding:0px;"><iframe id="ItemFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
	_dialog.dialog({
		title:'标准物质选择',
		autoOpen:false,
		modal:true,
		closed:true,
		width:'800',
		height:'500',
		buttons:[{
			text:'确定',
			iconCls:'icon-save',
			handler:function(){
			var materialname=$("#ItemFrame",top.document.body).contents().find("#materialname").val();
			$("#materialname").val(materialname);
			var materialid=$("#ItemFrame",top.document.body).contents().find("#materialid").val();
			$("#materialid").val(materialid);	
			//var comsistence=$("#ItemFrame",top.document.body).contents().find("#comsistence").val();//浓度
			$("#solutionconcentration").val('');//comsistence);	
			//$("#materialname").focus();
			//$("#constantvolume").focus();
			getMixdataJson(materialid);
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


//物品名称的弹出窗口使用
function showmaterialName(){
	var url = rootPath + "/material/standardinventory/standardinventory!toMaterialName.action";//链接选择物品的页面~~
	var _dialog =  window.top.$('<div id ="cert-dlg" style="padding:0px;"><iframe id="ItemFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
	_dialog.dialog({
		title:'选择物品',
		autoOpen:false,
		modal:true,
		closed:true,
		width:'500',
		height:'500',
		buttons:[{
			text:'确定',
			iconCls:'icon-save',
			handler:function(){
			var materialname=$("#ItemFrame",top.document.body).contents().find("#materialname").val();
			$("#materialname").val(materialname);
			var materialid=$("#ItemFrame",top.document.body).contents().find("#materialid").val();
			$("#materialid").val(materialid);	
			var modelname=$("#ItemFrame",top.document.body).contents().find("#modelname").val();
			var modelid=$("#ItemFrame",top.document.body).contents().find("#modelid").val();
			$("#modelname").val(modelname);	
			$("#modelid").val(modelid);
			_dialog.dialog('close');
					$.ajax({
						type:'POST',
						url:rootPath +'/material/standardinventory/standardinventory!getBacthnoByMaterial.action',
						data:'materialid='+$("#materialid").val()+'&modelid='+$("#modelid").val(),
						success:function(msg){
							var arr = msg.split(",");
							var lList = "<option value=''>---请选择---</option>";
							if(msg!=""){
								for(var i=0;i<arr.length;i++){
									lList = lList + "<option value='"+arr[i]+"'>"+arr[i]+"</option>";
								}
							}
							$("#batchno").html(lList);	
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
//===============此处开始时弹出的单选框
$(function(){
//	getchecknames(rootPath+"/material/materials/materials!materialinfoList.action");//此处是原先的规格型号方法
		getchecknames(rootPath +"/material/materials!noMidMaterialinfoList.action?flagName=stand");
});

function getchecknames(myurl){
	$('#checknamegrid').datagrid({
		title:'物品列表',
		singleSelect:true,
		nowrap: false,
		striped: true,
		collapsible:true,
		url:myurl,
		fit:true,
		fitColumns:true,
		scrollbarSize:0,
		remoteSort: false,
		idField:'materialid',
		pageSize:10,
		pageList:[10,20,30,40],
		frozenColumns:[[
			{	field : 'id',
				title : '&nbsp;',
				width : 30,
				align : 'center',
				formatter : function(value){
					return "<input type='radio' name='radio'/>";}
			}
			]],
			columns:[[
			        {field:'materialname',title:'物品名称',width:280,align:"center"}	,	
					{field:'model',title:'规格型号',width:100,align:"center"} ,	
					{field:'materialproperty',title:'性质',width:80,align:"center"} 
			]],
	
		onClickRow:function(){
			var selected=$("#checknamegrid").datagrid('getSelected');
			checkRadio();
			$("#materialid").val(selected['mid']);
			$("#materialname").val(selected['materialname']);
			$("#modelname").val(selected['model']);
			$("#modelid").val(selected['id']);
		},
		pagination:true,
		rownumbers:true
	});			
	}
function checkRadio(){
	var row = $('#checknamegrid').datagrid('getSelected');
	var rowNum = 0;
	var rows = $('#checknamegrid').datagrid('getRows');
	for ( var i = 0; i < rows.length; i++) {
		if (row == rows[i]) {
			rowNum = i;
			break;
		}
	}
	var radios = $("input[type=radio]");
	$(radios[rowNum]).attr("checked", true);
}



function query() {
	var materialname = $("#materialnames").val();//物品名称
	$('#checknamegrid').datagrid( {
		queryParams : {
		materialname : materialname
		},
		pageNumber : 1  //查询后指定页码为1
	});
}
//================弹出的单选框结束



//姓名的弹出窗口使用selectedUserid
function showName(){
	//url=rootPath +"/certificateinfo/certificateinfo!showname.action";//自己做部门下拉框的选择按钮
	var url =  rootPath +"/oamuser/oneandmanyuser!toOneUser.action";
	var _dialog =  window.top.$('<div id ="cert-dlg" style="padding:0px;"><iframe id="ItemFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
	_dialog.dialog({
		title:'姓名选择',
		autoOpen:false,
		modal:true,
		closed:true,
		width:'800',
		height:'500',
		buttons:[{
			text:'确定',
			iconCls:'icon-save',
			handler:function(){
		/*	var selectedUser = $("#ItemFrame",top.document.body).contents().find('#selectedUser').val();
			var selecteddeparname = $("#ItemFrame",top.document.body).contents().find('#selecteddeparname').val();
			if(selectedUser==""||selectedUser==null||selecteddeparname==""||selecteddeparname==null){
				alert("请在选择人员之前先选择科室！");useperson
				return false;
			}*/
		
			var selectedUser=$("#ItemFrame",top.document.body).contents().find("#selectedUser").val();//领用人
			$("#useperson").val(selectedUser);
			var selectedUserid=$("#ItemFrame",top.document.body).contents().find("#selectedUserid").val();//部门
			$("#userid").val(selectedUserid);
			

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
function addMaterial(){
	$('#datagrid').datagrid('clearSelections');
	var url =rootPath + "/material/standardinventory/standardinventory!toAddMaterials.action?isStandFlag=is";
	var _dialog =  window.top.$('<div id ="materialsinfo-dlg" style="padding:0px;"><iframe id="materialsinfoFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
	_dialog.dialog({
	title:'物品信息编辑',
	autoOpen:false,
	modal:true,
	closed:true,
	width:'360',
	height:'400',
	buttons:[{
		text:'保存',
		iconCls:'icon-save',
		handler:function(){
			$("#materialsinfoFrame",top.document.body).contents().find("#materialsForm").form('submit',
				{
					url:rootPath + "/material/materials/materials!save.action",
					onSubmit:function(){
						var objs = $("#materialsinfoFrame",top.document.body).contents().find(".grkj-validate");
						
						if(!saveCheck(objs)){
							$("#materialsinfoFrame",top.document.body).contents().find(":input").focus();
							$("#materialsinfoFrame",top.document.body).contents().find("select").focus();
							alert("数据输入不符合格式，请查看红色边框的输入框的输入提示！");
							return false;
						}
						var tempVal = $("#materialsinfoFrame",top.document.body).contents().find("#industrytypename").val();
						if(tempVal==''){
							$("#materialsinfoFrame",top.document.body).contents().find("#industrytypecode").val('');
						}
					},
					success : function(data) {
						if (data == 'fail') {
							alert("添加失败！");
							return;
						}
						if (data == 'success') {
							_dialog.dialog('close');
							$("#checknamegrid").datagrid('reload');
							alert('保存成功！');
						}
						if(data=='exist'){
							alert("该物品信息已经存在，请确认输入！");
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
var invenid = "";
function batchnoChange(){
	var materialid = $("#materialid").val();
	var batchno = $("#batchno").val();
	
	$("#batchnotext").val(batchno);
	$.ajax({
	   type: "POST",
	   async:false,
	   url: rootPath + "/material/standardpurchase!getInventoryInfo.action?temp="+new Date().getTime(),
	   data: {materialid:materialid,bacthno:batchno},
	   success: function(msg){
		   var data = eval('('+msg+')');
		   
		   for(var key in data){
			   if(key=="inventoryid"){
				   invenid =data[key];
			   }else{
			   	$("#"+key).val(data[key]);
			   }
		   }
	   }
	});
	
	initMixDataGrid(invenid);
}



function initMixDataGrid(id) {
	$('#mixdatalist').datagrid(
					{
						nowrap : false,
						striped : true,
						collapsible : true,
						singleSelect:true,
						url:rootPath +'/material/standardinventory/standardinventory!initMixDataList.action?inventoryid='+id, 
						remoteSort : false,
						idField : 'mixid',
						fit : true,
						fitColumns : true,
						scrollbarSize : 0,
						columns : [ [
								{
									field : 'mixname',
									title : '物质名称',
									width : 80,
									align : 'center'
								},
								{
									field : 'consistence',
									title : '浓度',
									width : 50,
									align : "center"
								},
								{
									field : 'uncertainty',
									title : '不确定度',
									width : 80,
									align : 'center'
								},{
									field : 'option',
									title : '操作',
									width : 50,
									align : 'center',
									formatter : function(value, rec,rowIndex) {
										var links='<img class="img5" alt="修改" src="'+rootPath+'/themes/default/images/bianjiimage.png" onclick="addMixData(\''+rec.mixid+'\')"/>&nbsp;';
										links+='<img src="'+rootPath+'/themes/default/images/deleteimage.png" alt="删除"  id="btnshow" onclick="delMixData(\''+rec.mixid+'\')"/>&nbsp;';
										return links;
										}
								} ] ],
						rownumbers : true
					});		
	$(window).resize(function() {
		$("#mixdatalist").datagrid('resize');
	});
}
function addMixData(id){
	alert(invenid);
	var url ="";
	if(id!=null && id!=""){
		url = rootPath + "/material/standardinventory/standardinventory!tomixdata.action?mixid="+id+"&inventoryid="+invenid;
	}else{
		url = rootPath + "/material/standardinventory/standardinventory!tomixdata.action?inventoryid="+invenid;
	}
	var _dialog =  window.top.$('<div id ="materialsinfo-dlg" style="padding:0px;"><iframe id="mixdataFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
	_dialog.dialog({
	title:'混标信息编辑',
	autoOpen:false,
	modal:true,
	closed:true,
	width:'300',
	height:'200',
	buttons:[{
		text:'保存',
		iconCls:'icon-save',
		handler:function(){
			$("#mixdataFrame",top.document.body).contents().find("#mixdataForm").form('submit',
				{
					url:rootPath + "/material/standardinventory/standardinventory!saveMixdata.action",
					onSubmit:function(){
						var objs = $("#mixdataFrame",top.document.body).contents().find(".grkj-validate");
						
						if(!saveCheck(objs)){
							$("#mixdataFrame",top.document.body).contents().find(":input").focus();
							alert("数据输入不符合格式，请查看红色边框的输入框的输入提示！");
							return false;
						}
					},
					success : function(data) {
						if (data == 'success') {
							_dialog.dialog('close');
							$("#mixdatalist").datagrid('reload');
							alert('保存成功！');
						}else{
							alert("添加失败！");
							return;
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


function delMixData(id){
	if(window.confirm('是否删除？')){
		$.ajax({
		   type: "POST",
		   async:false,
		   url: rootPath + "/material/standardinventory/standardinventory!delMixData.action",
		   data: {mixid:id},
		   success: function(msg){
			   if(msg == 'success') {
					$("#mixdatalist").datagrid('reload');
				}else{
					alert("失败！");
					return;
				}
		   }
		});
	}
}

function initmixids(){
	var rows = $("#mixdatalist").datagrid('getRows');
	var mixids ="";
	for(var i = 0;i<rows.length;i++){
		if(mixids!=""){
			mixids +=",";
		}
		mixids += rows[i].mixid;
	}
	$("#mixids").val(mixids);
}
