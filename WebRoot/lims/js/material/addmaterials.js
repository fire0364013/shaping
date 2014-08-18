Array.prototype.indexOf = function (val) {  
    for (var i = 0; i < this.length; i++) {  
        if (this[i] == val) {  
            return i;  
        }  
    }  
    return -1;  
};  
Array.prototype.remove = function (val) {  
    var index = this.indexOf(val);  
    if (index > -1) {  
        this.splice(index, 1);  
    }  
}; 
var numberArr = new Array();

$(function(){
	initGrkjValidate();
	var documentWidth=document.body.clientWidth;
			$('#addmaterialdata').datagrid({
//				title:'物品信息列表',
				width:documentWidth,
				height:655,
				nowrap: false,
				striped: true,
				collapsible:true,
				//url:rootPath +'/material/materials!addList.action', //运用 了左连接
				url:rootPath +'/material/materials!materialinfoList.action', //没有进行左连接，当没有物品规格的不予以列出
				fit:true,
				fitColumns : true,
				scrollbarSize:0,
				remoteSort: false,
				idField:'id',
				singleSelect:false,
				pageSize:11,
				pageList:[10,20],
				frozenColumns:[[
					{field:'id',checkbox:true,align:"center"}
								]],
				columns:[[
						{field:'materialname',title:'物品名称',width:150,align:"center"},
						{field:'model',title:'规格型号',width:70,align:"center"},
						{field:'bigType',title:'物品大类',width:60,align:"center"},
						{field:'typename',title:'物品小类',width:130,align:"center"},
						{field:'materialnum',title:'申请数量',width:50,align:'center',
							formatter:function(value,rowData,rowIndex){
								return '<input type="text" id="number'+rowData.id+'" onchange="getMaterialNum('+rowData.id+')" class="TextBox grkj-validate" validateParam="{type:\'int\',required:\'true\',message:\'请输入申请数量！\'}" style="width: 100%;text-align: center" name="number">';
							}}
				]],
				pagination:true,
				rownumbers:true,
				onLoadSuccess:function(data){
					for(var i=0;i<numberArr.length;i++){
						var inputValue = numberArr[i].split("=");
						$("#"+inputValue[0]).val(inputValue[1]);
					}
				},
				onSelect:onselect,
				onUnselect:unselect
			});
			$(window).resize(function() {
				$("#addmaterialdata").datagrid('resize', {
					width : function() {
						return documentWidth;
					},
					height : function() {
						return document.body.clientHeight;
					}
				});
			});
});

//选择一行数据
function onselect(rowIndex,rowData){
	var ids = $("#ids").val();
	
	if(ids==""){
		$("#ids").val(rowData.id);
	}else{
		var arr=ids.split(",");;
		var flag=0;
		for ( var i = 0; i < arr.length; i++) {
			if(arr[i]==rowData.id){
				flag=1;
				return;
			}
		}
		if(flag==0){
			$("#ids").val(ids+","+rowData.id);
		}
	}
}

//取消选中一行数据
function unselect(rowIndex,rowData){
	 var arr=$("#ids").val().split(",");
	 var newArr="";
	 for ( var i = 0; i < arr.length; i++) {
		if(rowData.id == arr[i]){
			continue;
		}
		if(newArr==""){
			newArr+=arr[i];
		}else{
			newArr+=","+arr[i];
		}
	}
	 $("#ids").val(newArr);
}

//控制分页时，输入框的值不清空
function getMaterialNum(inputId){
//	alert(inputId);
	for(var i=0;i<numberArr.length;i++){
		var inputValue = numberArr[i].split("=");
		if(inputValue[0]=="number"+inputId){
			numberArr.remove(numberArr[i]);
		}
	}
	numberArr.push("number"+inputId+"="+$("#number"+inputId).val());
	$("#numbers").val(numberArr);
	//alert(numberArr);
}

//获取选中项目
//function getSelectedRowsData(){
//	var rows = $("#addmaterialdata").datagrid("getSelections");
//	if(rows==null || rows.length<1){
//		alert('请至少选择一条记录！');
//		$("#ids").val('');
//	}else{
//		var flag = true;
//		var arr = "[";
//		for(var i=0;i<rows.length;i++){
//			if(arr!="["){
//				arr = arr + ",";
//			}
//			if($("#number"+rows[i].id).val()==null||$("#number"+rows[i].id).val()==""){
//				$("#number"+rows[i].id).focus();
//				if(flag) flag = false;
//			}
//			arr = arr + "{'id':'"+rows[i].mid+"','number':'"+$("#number"+rows[i].id).val()+"'}";
//		}
//		arr = arr + "]";
//		alert(arr);
//		$("#ids").val(arr);
//		$("#flag").val(flag);
//	}
//}

//查询
function queryMaterials() {	
	var materialname= $("#materialname").val();//物品名
	var dalei = $("#dalei").val();//物品分类
	var materialtypeid = $("#materialtypeid").val();//物品分类
	$('#addmaterialdata').datagrid( {
		queryParams : {
			materialname:materialname,
			materialtypeid:materialtypeid,
			dalei:dalei
		},
		pageNumber : 1  //查询后指定页码为1
	});
}



//添加和修改
function addMaterialsinfo(id){
	$('#datagrid').datagrid('clearSelections');
	var url =rootPath + "/material/materials/materials!input.action";
	if(id!=""){
		url = url + "?id="+id;
	}
	var _dialog =  window.top.$('<div id ="materialsinfo-dlg" style="padding:0px;"><iframe id="materialsinfoFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
	_dialog.dialog({
	title:'物品信息编辑',
	autoOpen:false,
	modal:true,
	closed:true,
	width:'340',
	height:'250',
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
							$("#addmaterialdata").datagrid('reload');
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
		

