$(function(){
	var documentWidth=document.body.clientWidth;
			$('#inteminfodata').datagrid({
				//title:'用户信息列表',
				width:documentWidth,
				height:655,
				nowrap: false,
				striped: true,
				collapsible:true,
				url:rootPath +'/iteminfo/iteminfo!toList.action', 
				fit:true,
				fitColumns : true,
				scrollbarSize:0,
				singleSelect:false,
				pageSize:20,
				pageList:[20,30,40,50],
				frozenColumns:[[
					{field:'itemid',checkbox:true,align:"center"}
						]],
				columns:[[
						{field:'itemname',title:'项目名称',width:300,align:"center"},
						{field:'monitoritemtype',title:'项目大类',width:130,align:"center"},
						{field:'standfee',title:'费用标准',width:200,align:"center"},
						{field:'operate',title:'操作',width:100,align:"center",
							formatter:function(value,rec,rowIndex){
								var links='<img src="'+rootPath+'/themes/default/images/xiangxiimage.png" alt="详细" id="btnshow" onclick="detail('+ rec.itemid+')"/>&nbsp;&nbsp;';
								links+='<img src="'+rootPath+'/themes/default/images/bianjiimage.png" alt="编辑" id="btnshow" onclick="addWin('+ rec.itemid +')"/>&nbsp;&nbsp;';
								links += '<img src="'
										+ rootPath
										+ '/themes/default/images/deleteimage.png" id="btnshow" onclick="del(\''
										+ rec.itemid
										+ '\')" alt="删除"/>&nbsp;&nbsp;';
								return links;
							}
						}						
				]],
				pagination:true,
				rownumbers:true,
				onLoadSuccess:function(){
					$('#inteminfodata').datagrid('clearSelections');
				}
			});
			$(window).resize(function() {
				$("#inteminfodata").datagrid('resize', {
					width : function() {
						return documentWidth;
					},
					height : function() {
						return document.body.clientHeight;
					}
				});
			});
	});	
		//单条删除
		function del(uid){
			$('#inteminfodata').datagrid('clearSelections');
			$('#inteminfodata').datagrid('selectRow',row);
				if(window.confirm('是否删除？')){
					$.post(rootPath +"/iteminfo/iteminfo!deleteOnlyOne.action",{id:uid},function(del){
						if(del=='success'){
							$('#inteminfodata').datagrid('clearSelections');
							$("#inteminfodata").datagrid('reload');
							alert('成功');
						}else{
							alert('失败');
						}
					});
				}
		}
		//添加
		function addWin(id){
			$('#inteminfodata').datagrid('clearSelections');
			var url = rootPath +"/iteminfo/iteminfo!input.action";
			if(id!=""){
				url = url + "?id="+id;
			}
			var _dialog =  window.top.$('	<div id ="role-dlg" style="padding:0px;"><iframe id="iteminfoFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
			_dialog.dialog({
				title:'项目编辑',
				autoOpen:false,
				modal:true,
				closed:true,
				width:'700',
				height:'200',
				buttons:[{
					text:'保存',
					iconCls:'icon-save',
					handler:function(){
					
						$("#iteminfoFrame",top.document.body).contents().find("#itemform").form('submit',{
							url:rootPath +'/iteminfo/iteminfo!save.action',
							onSubmit:function(){
								var objs = $("#iteminfoFrame",top.document.body).contents().find(".grkj-validate");
								if(!saveCheck(objs)){
									$("#iteminfoFrame",top.document.body).contents().find(":input").focus();
									alert("数据输入不符合格式，请查看红色边框的输入框的输入提示！");
									return false;
								}
							},
							success:function(data){
								if(data=='success'){
								_dialog.dialog('close');
								$("#inteminfodata").datagrid('reload');
								alert('成功');
								}else if(data=='exist'){
									$("#iteminfoFrame",top.document.body).contents().find('#itemname').focus();
									var itemname=$("#iteminfoFrame",top.document.body).contents().find('#equalsName').val();
									alert("该项目名称已经存在，请确认！");
								}else{
									alert("失败");
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
		//详情
		function detail(id){
			$('#inteminfodata').datagrid('clearSelections');
				var url = rootPath +"/iteminfo/iteminfo!view.action?id="+id+"&itemflag=0";//请勿更改&itemflag=0；
				var _dialog =  window.top.$('<div id ="role-dlg" style="padding:0px;"><iframe id="departmentinfoFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
				_dialog.dialog({
					title:'项目详情',
					autoOpen:false,
					maximizable:true,
					modal:true,
					closed:true,
					width:'700',
					height:'200'
				});
				_dialog.dialog('open');
			}
		
		//批量删除	
		function delAll(){
			var selected=$("#inteminfodata").datagrid('getSelections');
			if(selected==null || selected.length< 1){
				alert('请至少选择一条记录！');
			}
			else{
				if(window.confirm('是否删除？')){
					var cc=[];
					for ( var i = 0; i < selected.length; i++) {
						if(cc==""){
								cc+=selected[i]['itemid'];
						}
						else{
							cc+=","+selected[i]['itemid'];
							}
					}
					$.post(rootPath +"/iteminfo/iteminfo!deleteAll.action",{"ids":cc},function(del){
						if(del=='success'){
							$('#inteminfodata').datagrid('clearSelections');
							$("#inteminfodata").datagrid('reload');
							alert('成功');
						}
					});
				 }
			}
		}
		function query(){
			$('#inteminfodata').datagrid('clearSelections');
			var itemname=$("#itemname").val();
			var itemtypeid=$("#itemtypeid").val();
			var monitorpointtypeid=$("#monitorpointtypeid").val();
			$('#inteminfodata').datagrid( {
				queryParams : {
				itemname : itemname,
				itemtypeid : itemtypeid,
				monitorpointtypeid:monitorpointtypeid
				},
				pageNumber:1		
			});
		}

		//显示采样方法框~
		function showmethod(flag){
			url=rootPath +"/analyse/method/itemmethod!showsampling.action?flag="+flag;
			var _dialog =  window.top.$('	<div id ="role-dlg" style="padding:0px;"><iframe id="analyseFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
				_dialog.dialog({
					title:'选择采样方法',
					autoOpen:false,
					modal:true,
					closed:true,
					width:'700',
					height:'500',
					buttons:[{
						text:'确定',
						iconCls:'icon-save',
						handler:function(){
						
						var selectedmethodname=$("#analyseFrame",top.document.body).contents().find("#selectedmethodname").val();
						var selectedmethodid=$("#analyseFrame",top.document.body).contents().find("#selectedmethodid").val();
						$("#samplemethod").val(selectedmethodname);
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
		
		
//所有的方法
		function showmethodAll(flag){
			url=rootPath +"/certificateinfo/certificateinfo!showsampling.action";
			var _dialog =  window.top.$('	<div id ="cert-dlg" style="padding:0px;"><iframe id="samplingFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
			_dialog.dialog({
				title:'选择方法',
				autoOpen:false,
				modal:true,
				closed:true,
				width:'700',
				height:'500',
				buttons:[{
					text:'确定',
					iconCls:'icon-save',
					handler:function(){
					
					var selectedanalysename=$("#samplingFrame",top.document.body).contents().find("#selectedmethodname").val();
					var selectedanalyseid=$("#samplingFrame",top.document.body).contents().find("#selectedmethodid").val();
					$("#samplemethod").val(selectedanalysename);
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

 //改变大类级联小类
function changeDailei(){
  $("#monitorpointtypeid").html("");//清空小类下拉框
  var bigitemtype = $("#itemtypeid").val();
  var monitorpointtypeid = $("#showmonitortypeid").val();
   $.ajax({
   type: "POST",
   url: rootPath +"/iteminfo/iteminfo!dalei.action",
   data: "itemtypeid="+bigitemtype,
   success: function(msg){
	   var vData = eval("(" + msg + ")");
			var lList = "<option value=''>---请选择---</option>";
			//遍历json数据  
			jQuery.each(vData.rowsData, function(i, n) {
				if(monitorpointtypeid!=''&&n.monitorpointtypeid==monitorpointtypeid){
					lList += "<option value=" + n.monitorpointtypeid + " selected>"+   n.monitorpointtypename	+ "</option>";
				}else{
					lList += "<option value=" + n.monitorpointtypeid + ">" + n.monitorpointtypename	+ "</option>";
				}
			});				
			//绑定数据到listLeft
			$('#monitorpointtypeid').append(lList);
   }
});	
}

//样品容器
		function showNametoCont(){
			url=rootPath +"/iteminfo/iteminfo!showContainer.action";
			var _dialog =  window.top.$('	<div id ="role-dlg" style="padding:0px;"><iframe id="containerFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
				_dialog.dialog({
					title:'选择样品容器',
					autoOpen:false,
					modal:true,
					closed:true,
					width:'700',
					height:'500',
					buttons:[{
						text:'确定',
						iconCls:'icon-save',
						handler:function(){
						
						var selectedmethodname=$("#containerFrame",top.document.body).contents().find("#selectedcontainername").val();
						var selectedmethodid=$("#containerFrame",top.document.body).contents().find("#selectedcontainerid").val();
						$("#containername").val(selectedmethodname);
						$("#containerid").val(selectedmethodid);
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
   
   //样品保存剂
		function showNametoSave(){
			url=rootPath +"/iteminfo/iteminfo!showsavedose.action";
			var _dialog =  window.top.$('	<div id ="role-dlg" style="padding:0px;"><iframe id="savedoseFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
				_dialog.dialog({
					title:'选择采样方法',
					autoOpen:false,
					modal:true,
					closed:true,
					width:'700',
					height:'500',
					buttons:[{
						text:'确定',
						iconCls:'icon-save',
						handler:function(){
						
						var selectedmethodname=$("#savedoseFrame",top.document.body).contents().find("#selectedsavedosename").val();
						var selectedmethodid=$("#savedoseFrame",top.document.body).contents().find("#selectedsavedoseid").val();
						$("#samplesavedose").val(selectedmethodname);
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

		
		//做项目弹出窗口使用
function showitem(){
	url=rootPath +"/iteminfo/iteminfo!toListPage.action";
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
			$("#itemname").val(itemname);
			$("#itemid").val(itemid);
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