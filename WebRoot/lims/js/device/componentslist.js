$(function(){
	var deviceid=$("#deviceids").val();
			$('#componentdata').datagrid({
				//title:'用户信息列表',
				height:355,
				nowrap: false,
				striped: true,
				collapsible:true,
				url:rootPath +'/device/components/devicecomponents!toList.action?deviceid='+deviceid, 
				fit:true,
				fitColumns : true,
				scrollbarSize:0,
				remoteSort: false,
				idField:'componentsid',
				singleSelect:false,
				pageSize:10,
				pageList:[10,20,30,40],
				frozenColumns:[[
					{field:'componentsid',checkbox:true,align:"center"}
								]],
				columns:[[
						{field:'componentsname',title:'配件名称',width:425,align:"center"},					
						{field:'remark',title:'备注',width:420,align:"center"},
						{field:'operate',title:'操作',width:220,align:"center",
							formatter:function(value,rec,rowIndex){
								var links='<img src="'+rootPath+'/themes/default/images/xiangxiimage.png"   alt="详细"   id="btnshow" onclick="detail('+ rec.componentsid +')"/>&nbsp;&nbsp;';
								links+='<img src="'+rootPath+'/themes/default/images/bianjiimage.png"    alt="编辑"   id="btnshow" onclick="addWin('+ rec.componentsid +')"/>&nbsp;&nbsp;';
								links+='<img src="'+rootPath+'/themes/default/images/deleteimage.png"   alt="删除"   id="btnshow" onclick="del('+ rec.componentsid +','+rowIndex+')"/>';
								return links;
							}
						}						
				]],
				pagination:true,
				rownumbers:true
				
				
			});
			$(window).resize(function() {
				$("#componentdata").datagrid('resize', {
					width : function() {
						return documentWidth;
					},
					height : function() {
						return document.body.clientHeight;
					}
				});
			});
});	
		
		//添加
		function addWin(id){
			var deviceids=$("#deviceids").val();
			var url = rootPath +"/device/components/devicecomponents!input.action?deviceid="+deviceids;
			if(id!=""){
				url = url + "&id="+id;
			}
			
			//$(window.top.document).find("#btnProjectInfo").click();
			var _dialog =  window.top.$('	<div id ="role-dlg" style="padding:0px;"><iframe id="componentFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
			//window.top.document.body.appendChild(win);
			_dialog.dialog({
				title:'仪器配件编辑',
				autoOpen:false,
				modal:true,
				closed:true,
				width:'300',
				height:'200',
				buttons:[{
					text:'保存',
					iconCls:'icon-save',
					handler:function(){
						//_dialog.dialog('close');
						//location.reload();
					
						$("#componentFrame",top.document.body).contents().find("#componentform").form('submit',{
							url:rootPath +"/device/components/devicecomponents!save.action",
							onSubmit:function(){
								var objs = $("#componentFrame",top.document.body).contents().find(".grkj-validate");
								if(!saveCheck(objs)){
									$("#componentFrame",top.document.body).contents().find(":input").focus();
									alert("数据输入不符合格式，请查看红色边框的输入框的输入提示！");
									return false;
								}
								
							},
							success:function(data){
								_dialog.dialog('close');
								$("#componentdata").datagrid('reload');
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
		//关闭
		function closeAddWin(){
			$('#addWin').window('close');
		}
	
		
		//详情
		function detail(id){
			var deviceids=$("#deviceids").val();
				var url = rootPath +"/device/components/devicecomponents!view.action?id="+id+"&deviceid="+deviceids;
				//if(id!=""){
				//	url = url + "?id="+id;
				//}
				//$(window.top.document).find("#btnProjectInfo").click();
				var _dialog =  window.top.$('	<div id ="role-dlg" style="padding:0px;"><iframe id="departmentinfoFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
				//window.top.document.body.appendChild(win);
				_dialog.dialog({
					title:'仪器配件详情',
					autoOpen:false,
					modal:true,
					closed:true,
					width:'300',
					height:'200'
				});
				_dialog.dialog('open');
			}
		//单条删除
		function del(uid,index){
			$('#componentdata').datagrid('clearSelections');
			$('#componentdata').datagrid('selectRow',index);
				if(window.confirm('是否删除？')){
					$.post(rootPath +"/device/components/devicecomponents!deleteOnlyOne.action",{id:uid},function(del){
						if(del=='success'){
							$('#componentdata').datagrid('clearSelections');
							$("#componentdata").datagrid('reload');
							alert('成功');
						}
						
					});
				}
		}
		//批量删除	
		function delAll(){
			var selected=$("#componentdata").datagrid('getSelections');
			//alert(selected.length);
			if(selected==null || selected.length< 1){
				
				alert('请至少选择一条记录！');
			}
			else{
				if(window.confirm('是否删除？')){
					var cc=[];
					for ( var i = 0; i < selected.length; i++) {
						if(cc==""){
								cc+=selected[i]['componentsid'];
						}
						else{
							cc+=","+selected[i]['componentsid'];
							}
					}
					
					$.post(rootPath +"/device/components/devicecomponents!deleteAll.action",{"ids":cc},function(del){
						if(del=='success'){
							$('#componentdata').datagrid('clearSelections');
							$("#componentdata").datagrid('reload');
							alert('成功');
						}
					});
					
				 }
			}
		}
		function query(){
			var componentsname=$("#componentsname").val();
			$('#componentdata').datagrid( {
				queryParams : {
				componentsname : componentsname
				},
				pageNumber:1		
			});
			//location.href = "departmentinfo.action?deptid=" + deptid+"&deptnames="+deptnames;
			
		}