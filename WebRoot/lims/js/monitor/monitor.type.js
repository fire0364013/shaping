$(function(){
	var documentWidth=document.body.clientWidth;
			$('#monitordata').datagrid({
				//title:'用户信息列表',
				width:documentWidth,
				height:655,
				nowrap: false,
				striped: true,
				collapsible:true,
				url:rootPath +'/sampletype/monitortype/monitortype!toList.action', 
				fit:true,
				fitColumns : true,
				scrollbarSize:0,
				remoteSort: false,
				idField:'monitortypeid',
				singleSelect:false,
				pageSize:20,
				pageList:[20,30,40,50],
				frozenColumns:[[
					{field:'monitortypeid',checkbox:true,align:"center"}
								]],
				columns:[[
						{field:'monitortypename',title:'业务类型名称',width:350,align:"center"},		
						{field:'monitortypecode',title:'业务类型编码',width:120,align:"center"},	
						{field:'monitornature',title:'监测性质',width:250,align:"center"},	
						{field:'parenttype',title:'父业务类型名称',width:350,align:"center"},
						{field:'operate',title:'操作',width:120,align:"center",
							formatter:function(value,rec,rowIndex){
								var links='<img src="'+rootPath+'/themes/default/images/xiangxiimage.png"  alt="详细"  id="btnshow" onclick="detail('+ rec.monitortypeid +')"/>&nbsp;&nbsp;';
								links+='<img src="'+rootPath+'/themes/default/images/bianjiimage.png"  alt="编辑"  id="btnshow" onclick="addWin('+ rec.monitortypeid +')"/>&nbsp;&nbsp;';
								links+='<img src="'+rootPath+'/themes/default/images/deleteimage.png"  alt="删除"  id="btnshow" onclick="del(\''+rec.monitortypeid+ '\',\''+ rowIndex+'\')"/>';
								return links;
							}
						}						
				]],
				pagination:true,
				rownumbers:true,
				onLoadSuccess:function(){
					$('#monitordata').datagrid('clearSelections');
				}
				
				
			});
			$(window).resize(function() {
				$("#monitordata").datagrid('resize', {
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
			$('#monitordata').datagrid('clearSelections');
			var url = rootPath +"/sampletype/monitortype/monitortype!input.action";
			if(id!=""){
				url = url + "?id="+id;
			}
			//$(window.top.document).find("#btnProjectInfo").click();
			var _dialog =  window.top.$('	<div id ="role-dlg" style="padding:0px;"><iframe id="monitorAddFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
			//window.top.document.body.appendChild(win);
			_dialog.dialog({
				title:'监测类型编辑',
				autoOpen:false,
				modal:true,
				closed:true,
				width:'600',
				height:'200',
				buttons:[{
					text:'保存',
					iconCls:'icon-save',
					handler:function(){
					
							$("#monitorAddFrame",top.document.body).contents().find("#monitorForm").form('submit',{
							url:rootPath +"/sampletype/monitortype/monitortype!save.action",
							onSubmit:function(){
								var objs = $("#monitorAddFrame",top.document.body).contents().find(".grkj-validate");
								if(!saveCheck(objs)){
									$("#monitorAddFrame",top.document.body).contents().find(":input").focus();
									$("#monitorAddFrame",top.document.body).contents().find("#selectpar").focus();
									alert("数据输入不符合格式，请查看红色边框的输入框的输入提示！");
									return false;
								}
								
							},
							success:function(data){
								_dialog.dialog('close');
								$("#monitordata").datagrid('reload');
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
			$('#monitordata').datagrid('clearSelections');
				var url = rootPath +"/sampletype/monitortype/monitortype!view.action?id="+id;
				//if(id!=""){
				//	url = url + "?id="+id;
				//}
				//$(window.top.document).find("#btnProjectInfo").click();
				var _dialog =  window.top.$('	<div id ="role-dlg" style="padding:0px;"><iframe id="monitorViewFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
				//window.top.document.body.appendChild(win);
				_dialog.dialog({
					title:'监测类型详情',
					autoOpen:false,
					modal:true,
					closed:true,
					width:'600',
					height:'180'
				});
				_dialog.dialog('open');
			}
		//单条删除
		function del(uid,row){
			$('#monitordata').datagrid('clearSelections');
			$('#monitordata').datagrid('selectRow',row);
				if(window.confirm('是否删除？')){
					$.post(rootPath +"/sampletype/monitortype/monitortype!deleteOnlyOne.action",{id:uid},function(del){
						if(del=='success'){
							$('#monitordata').datagrid('clearSelections');
							$("#monitordata").datagrid('reload');
							alert('成功');
						}
						
					});
				}
		}
		//批量删除	
		function delAll(){
			var selected=$("#monitordata").datagrid('getSelections');
			//alert(selected.length);
			if(selected==null || selected.length< 1){
				
				alert('请至少选择一条记录！');
			}
			else{
				if(window.confirm('是否删除？')){
					var cc=[];
					for ( var i = 0; i < selected.length; i++) {
						if(cc==""){
								cc+=selected[i]['monitortypeid'];
						}
						else{
							cc+=","+selected[i]['monitortypeid'];
							}
					}
					$.post(rootPath +"/sampletype/monitortype/monitortype!deleteAll.action",{"ids":cc},function(del){
						if(del=='success'){
							$('#monitordata').datagrid('clearSelections');
							$("#monitordata").datagrid('reload');
							alert('成功');
						}
					});
					
				 }
			}
		}
		function query(){
			$('#monitordata').datagrid('clearSelections');
			var monitortypename=$("#monitortypename").val();
			var monitortypecode=$("#monitortypecode").val();
			//alert(traintype);alert(trainplanyear);
			$('#monitordata').datagrid( {
				queryParams : {
				monitortypename : monitortypename,
				monitortypecode : monitortypecode
				},
				pageNumber:1		
			});
			//location.href = "departmentinfo.action?deptid=" + deptid+"&deptnames="+deptnames;
			
		}