//朱国英2012.7.18
$(document).ready(function() {
	initDataGrid();
});

function relaod() {//重新装载数据
	$('#materialstypeDatagrid').datagrid('reload');
}

function initDataGrid() {
	var documentWidth=document.body.clientWidth;
	$('#materialstypeDatagrid').datagrid( {
				width:documentWidth,
				height:655,
				nowrap: false,
				striped: true,
				collapsible:true,
				url:rootPath +'/material/materials/materialstype!toList.action', 
				fit:true,
				fitColumns : true,
				scrollbarSize:0,
				remoteSort: false,
				idField:'materialtypeid',
				singleSelect:false,
				pageSize:20,
				pageList:[20,30,40,50],
				frozenColumns:[[
					{field:'materialtypeid',checkbox:true,align:"center"}
								]],
				columns:[[
						{field:'meaterialcategoryname',title:'物品大类',width:300,align:"center"},
						{field:'meaterialname',title:'物品小类',width:300,align:"center"},
						{field:'operate',title:'操作',width:120,align:"center",
							formatter:function(value,rec,rowIndex){
								var links='<img src="'+rootPath+'/themes/default/images/xiangxiimage.png"  alt="详细"  id="btnshow" onclick="detail(\''+ rec.materialtypeid+'\')"/>&nbsp;&nbsp;';
								links+='<img src="'+rootPath+'/themes/default/images/bianjiimage.png"  alt="编辑"  id="btnshow" onclick="addWin(\''+ rec.materialtypeid +'\','+rec.isstandardmaterial+')"/>&nbsp;&nbsp;';
								links+='<img src="'+rootPath+'/themes/default/images/deleteimage.png"  alt="删除"  id="btnshow" onclick="delOne(\''+ rec.materialtypeid +'\',\''+rec.isstandardmaterial+ '\',\''+ rowIndex+'\')"/>';
								return links;
							}
						}
				]],
				pagination:true,
				rownumbers:true
				
	});

}
//批量删除
function deleteAll(){
	var selected=$("#materialstypeDatagrid").datagrid('getSelections');
			if(selected==null || selected.length< 1){
				window.alert('请至少选择一条记录！');
				return false;
			}
			for(var i=0;i<selected.length;i++){
				if(selected[i].isstandardmaterial==1){
					alert('选中物品中存在标准物质，请重新选择！');
					return false;
				}
			}
				if(window.confirm('是否删除？')){
					var cc=[];
					for ( var i = 0; i < selected.length; i++) {
						if(cc==""){
								cc+=selected[i]['materialtypeid'];
						}
						else{
							cc+=","+selected[i]['materialtypeid'];
							}
					}
					$.post(rootPath +"/material/materials/materialstype!deleteAll.action",{"ids":cc},function(del){
						if(del=='success'){
							$('#materialstypeDatagrid').datagrid('clearSelections');
							$("#materialstypeDatagrid").datagrid('reload');
							alert('成功');
						}
					});
				 }
			
 }

//单个删除

		function delOne(did,isstandardmaterial,row){
			if(isstandardmaterial==1){
				alert("标准物质类型不可以删除");
				return false;
			}
			$('#materialstypeDatagrid').datagrid('clearSelections');
			$('#materialstypeDatagrid').datagrid('selectRow',row);
				if(window.confirm('是否删除？')){
					$.post( rootPath +"/material/materials/materialstype!deleteOne.action",{id:did},function(del){
						if(del=='success'){
							$('#materialstypeDatagrid').datagrid('clearSelections');
							$("#materialstypeDatagrid").datagrid('reload');
							alert('成功');
						}
					});
			
				}
		}
		//条件查询
 		function query(){
		
			var meaterialname=$("#meaterialname").val();
			var bigTypeName=$("#bigTypeName").val();
			$('#materialstypeDatagrid').datagrid( {
				queryParams : {
				meaterialname : meaterialname,
				bigTypeName:bigTypeName
				},
				pageNumber:1		
			});
		}
 		
		//添加
		function addWin(id,isstandardmaterial){
			$('#materialstypeDatagrid').datagrid('clearSelections');
			if(isstandardmaterial==1){
				alert("标准物质类型不可以修改");
				return false;
			}
			var url = rootPath +"/material/materials/materialstype!input.action";
			if(id!=""){
				url = url + "?id="+id;
			}
			var _dialog =  window.top.$('<div id ="role-dlg" style="padding:0px;">' +
			'<iframe id="materialstypeFrame" width="100%" height="100%" frameborder="0" scrolling="auto" src='+url+'></iframe>	' +
			'	</div>').appendTo(window.top.document.body);
			//window.top.document.body.appendChild(win);
			_dialog.dialog({
				title:'物品类别管理',
				autoOpen:false,
				modal:true,
				closed:true,
				width:'300',
				height:'150',
				buttons:[{
					text:'保存',
					iconCls:'icon-save',
					handler:function(){
					$("#materialstypeFrame",top.document.body).contents().find("#materialstypeForm").form('submit',{
							url:rootPath +'/material/materials/materialstype!save.action',
							onSubmit:function(){
								var objs = $("#materialstypeFrame",top.document.body).contents().find(".grkj-validate");
								//alert(!saveCheck(objs));
								if(!saveCheck(objs)){
									$("#materialstypeFrame",top.document.body).contents().find(":input").focus();
									alert("数据输入不符合格式，请查看红色边框的输入框的输入提示！");
									return false;
								}
							},
							success:function(data){
								if(data=='fail'){
									alert("失败！");
									return;
								}
								if(data=='success'){
									_dialog.dialog('close');
									$("#materialstypeDatagrid").datagrid('reload');
									alert('成功');
								}
								if(data=='exist'){
									alert("该物品类型已经存在，请确认输入！");
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
		//关闭
		function closeAddWin(){
			$('#addWin').window('close');
		}

		//查看详情
		//详情
		function detail(id){
			$('#materialstypeDatagrid').datagrid('clearSelections');
			var url =  rootPath +"/material/materials/materialstype!view.action";
			if(id!=""){
				url = url + "?id="+id;
			}
			var _dialog =  window.top.$('	<div id ="role-dlg" style="padding:0px;"><iframe id="materialstypeFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
			_dialog.dialog({
				title:'物品类别详情',
				autoOpen:false,
				modal:true,
				closed:true,
				width:'320	',
				height:'120'
			});
			_dialog.dialog('open');
		}

	

		
