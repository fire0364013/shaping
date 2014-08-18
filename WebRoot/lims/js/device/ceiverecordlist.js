$(function(){
			$('#devicereceiverecord').datagrid({
				//title:'用户信息列表',
				height:355,
				nowrap: false,
				striped: true,
				collapsible:true,
				url:rootPath +'/device/ceiverecord/devicereceiverecord!toList.action?deviceid='+deviceid, 
				fit:true,
				fitColumns : true,
				scrollbarSize:0,
				remoteSort: false,
				idField:'id',
				singleSelect:false,
				pageSize:10,
				pageList:[10,20,30,40],
				frozenColumns:[[
					{field:'id',checkbox:true,align:"center"}
								]],
				columns:[[
						{field:'receiver',title:'领用人',width:425,align:"center"},
						{field:'receivedate',title:'领用时间',width:425,align:"center"},
						{field:'remark',title:'备注',width:420,align:"center"},
						{field:'operate',title:'操作',width:220,align:"center",
							formatter:function(value,rec,rowIndex){
								var links='<img src="'+rootPath+'/themes/default/images/xiangxiimage.png"   alt="详细"   id="btnshow" onclick="detail('+ rec.id +')"/>&nbsp;&nbsp;';
								links+='<img src="'+rootPath+'/themes/default/images/bianjiimage.png"    alt="编辑"   id="btnshow" onclick="addWin('+ rec.id +')"/>&nbsp;&nbsp;';
								links+='<img src="'+rootPath+'/themes/default/images/deleteimage.png"   alt="删除"   id="btnshow" onclick="del('+ rec.id +','+rowIndex+')"/>';
								return links;
							}
						}						
				]],
				pagination:true,
				rownumbers:true
				
				
			});
			$(window).resize(function() {
				$("#devicereceiverecord").datagrid('resize', {
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
			var url = rootPath +"/device/ceiverecord/devicereceiverecord!input.action?deviceid="+deviceid;
			if(id!=""){
				url = url + "&id="+id;
			}
			var _dialog =  window.top.$('	<div id ="role-dlg" style="padding:0px;"><iframe id="ceiverecordFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
			_dialog.dialog({
				title:'领用记录',
				autoOpen:false,
				modal:true,
				closed:true,
				width:'350',
				height:'250',
				buttons:[{
					text:'保存',
					iconCls:'icon-save',
					handler:function(){
						$("#ceiverecordFrame",top.document.body).contents().find("#ceiverecordform").form('submit',{
							url:rootPath +"/device/ceiverecord/devicereceiverecord!save.action",
							onSubmit:function(){
								var objs = $("#ceiverecordFrame",top.document.body).contents().find(".grkj-validate");
								if(!saveCheck(objs)){
									$("#ceiverecordFrame",top.document.body).contents().find(":input").focus();
									alert("请查看红色星号的是否全部填写！");
									return false;
								}
								
							},
							success:function(data){
								_dialog.dialog('close');
								$("#devicereceiverecord").datagrid('reload');
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
				var url = rootPath +"/device/ceiverecord/devicereceiverecord!view.action?id="+id+"&deviceid="+deviceid;
				var _dialog =  window.top.$('	<div id ="role-dlg" style="padding:0px;"><iframe id="departmentinfoFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
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
			$('#devicereceiverecord').datagrid('clearSelections');
			$('#devicereceiverecord').datagrid('selectRow',index);
				if(window.confirm('是否删除？')){
					$.post(rootPath +"/device/ceiverecord/devicereceiverecord!deleteOnlyOne.action",{id:uid},function(del){
						if(del=='success'){
							$('#devicereceiverecord').datagrid('clearSelections');
							$("#devicereceiverecord").datagrid('reload');
							alert('成功');
						}
						
					});
				}
		}
		//批量删除	
		function delAll(){
			var selected=$("#devicereceiverecord").datagrid('getSelections');
			//alert(selected.length);
			if(selected==null || selected.length< 1){
				
				alert('请至少选择一条记录！');
			}
			else{
				if(window.confirm('是否删除？')){
					var cc=[];
					for ( var i = 0; i < selected.length; i++) {
						if(cc==""){
								cc+=selected[i]['id'];
						}
						else{
							cc+=","+selected[i]['id'];
							}
					}
					
					$.post(rootPath +"/device/ceiverecord/devicereceiverecord!deleteAll.action",{id:cc},function(del){
						if(del=='success'){
							$('#devicereceiverecord').datagrid('clearSelections');
							$("#devicereceiverecord").datagrid('reload');
							alert('成功');
						}
					});
					
				 }
			}
		}
		function query(){
			var realname=$("#realname").val();
			$('#devicereceiverecord').datagrid( {
				queryParams : {
				realname : realname
				},
				pageNumber:1		
			});
		}