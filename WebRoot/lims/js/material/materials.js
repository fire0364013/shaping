//朱国英2012.7.18
$(document).ready(function(){
	initDataGrid();
	/*
	 * 	加载下拉
	 * 	1.chooseId: 下拉的ID
	 *	2.ctable: 数据表
	 *	3.cno: 数据表id字段
	 *	4.cname: 数据表text字段
	 *	5.dbwhere: 查询条件，默认为1=1
	 * 
	 */
	});

function relaod(){//重新装载数据
	$('#datagrid').datagrid('reload');
}

function initDataGrid(){

			$('#datagrid').datagrid({
				width:800,
				height:400,
				nowrap: false,
				striped: true,
				collapsible:true,
				url:rootPath +'/material/materials/materials!materialinfoList.action',
				sortName: 'materialid',
				sortOrder: 'desc',
				fit:true,
				fitColumns:true,
				scrollbarSize:0,
				idField:'materialid',				
				columns:[[
					{field:'materialid',checkbox:true,align : 'center'},
			        {field:'materialname',title:'物品名称',width:240,align : 'center'},					
					{field:'unitid',title:'计量单位',width:100,align:'center'},
					{field:'bigType',title:'物品大类',width:100,align : 'center'},
					{field:'materialstype',title:'物品小类',width:160,align : 'center'},
					
					{field:'operate',title:'操作',width:120,align : 'center',
						formatter:function(value,rowData,rowIndex){
							return '<span style="color:red"><img src="'+rootPath+'/themes/default/images/xiangxiimage.png" alt="详细" onclick="viewMaterialsinfo('+rowData.materialid+')"/>&nbsp;&nbsp; ' +
							'<img src="'+rootPath+'/themes/default/images/bianjiimage.png"  alt="编辑"  onclick="addMaterialsinfo('+rowData.materialid+')"/> &nbsp;&nbsp;' +
							'<img src="'+rootPath+'/themes/default/images/deleteimage.png"  alt="删除"  onclick="deleteMaterialsinfo(\''+rowData.materialid+ '\',\''+ rowIndex+'\')"/>&nbsp;&nbsp; ' 
						}
					}					
				]],
				pagination:true,
				rownumbers:true,
				pageSize:20,
				pageList:[20,30,40,50]
				
			});
			$(window).resize(function(){
			$("#datagrid").datagrid('resize');
		})	;
			
}

//检索
function searchObj(){
	
	var materialname = $('#materialname').val();
	var materialtypeid = $('#materialtypeid').val();
	var dalei = $('#dalei').val();
	$('#datagrid').datagrid( {
		queryParams : {
			materialname : materialname,
			materialtypeid:materialtypeid,
			dalei:dalei
		},
		pageNumber:1
	});

}



//详细页面
function viewMaterialsinfo(id){
	$('#datagrid').datagrid('clearSelections');
	var url = rootPath + "/material/materials/materials!view.action";
	if(id!=""){
		url = url + "?id="+id;
	}
	var _dialog =  window.top.$('<div id ="materialsinfo-dlg" style="padding:0px;"><iframe id="materialsinfoFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
	_dialog.dialog({
	title:'物品信息详情',
	autoOpen:false,
	modal:true,
	closed:true,
	width:'340',
	height:'300',
	onClose:function(){
			_dialog.dialog("destroy");					
		}
	});
	_dialog.dialog('open');

}
//添加和修改
function addMaterialsinfo(id)
{
	$('#datagrid').datagrid('clearSelections');
	var url =rootPath + "/material/materials/materials!input.action";
	if(id!=""){
		url = url + "?id="+id;
	}
	var _dialog =  window.top.$('<div id ="materialsinfo-dlg" style="padding:0px;"><iframe id="materialsinfoFrame" width="100%" height="350px;" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
	_dialog.dialog({
	title:'物品信息编辑',
	autoOpen:false,
	modal:true,
	closed:true,
	width:'340',
	height:'450',
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
						
						var stockupperlimit = $("#materialsinfoFrame",top.document.body).contents().find('#stockupperlimit').val();
						var stocklowerlimit = $("#materialsinfoFrame",top.document.body).contents().find('#stocklowerlimit').val();
						if(stockupperlimit != '' && stocklowerlimit != ''){
							if(stockupperlimit<stocklowerlimit){
								$('#stockupperlimit').focus();
								alert("库存下限高于库存上限,请准确录入相关数据！");
								return false;
							}
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
							$("#datagrid").datagrid('reload');
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

//批量删除
function deleteAll()
{
var selected=$("#datagrid").datagrid('getSelections');
			if(selected==null || selected.length< 1){
				window.alert('请至少选择一条记录！');
			}
			else{
				if(window.confirm("是否删除？")){
					var cc=[];
					for ( var i = 0; i < selected.length; i++) {
						if(cc==""){
								cc+=selected[i]['materialid'];
						}
						else{
							cc+=","+selected[i]['materialid'];
							}
					}
					$.post(rootPath + "/material/materials/materials!deleteAll.action",{"ids":cc},function(del){
						if(del=='success'){
							$('#datagrid').datagrid('clearSelections');
							$("#datagrid").datagrid('reload');
							alert('成功');
						}
					});
					
				 }
			}
 }

//单个删除
function deleteMaterialsinfo(materialid,row){
	$('#datagrid').datagrid('clearSelections');
	$('#datagrid').datagrid('selectRow',row);
				if(window.confirm('是否删除？')){
					$.post(rootPath + "/material/materials/materials!deleteOne.action",{id:materialid},function(del){
						if(del=='success'){
							$('#datagrid').datagrid('clearSelections');
							$("#datagrid").datagrid('reload');
							alert('成功');
						}
					});
				}
		}

//加载大类的下拉列表
function bigTypeData() {
	var bigType=$("#bigType").val();
	$.ajax( {
		type : 'GET',
		url : rootPath +'/material/materials/materials!getAllDaLeiJSON.action?timeStamp='+new Date().getTime()+'&isStandFlag='+isStandFlag,//给该url一个时间戳~~这样就必须每次从服务器读取数据,
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
		