$(function(){
			$('#datagrid2').datagrid({				
				nowrap: false,
				striped: true,
				collapsible:true,
				url:rootPath +'/device/calibreate/calibreate!toviewList.action?callid='+$("#callid").val(),
				fit : true,
				fitColumns : true,
				remoteSort : false,
				scrollbarSize:0,
				remoteSort: false,
				idField:'callid',
				pageSize:20,
				pageList:[20,30,40,50],
				frozenColumns:[[
					{field:'callid',checkbox:true,align:"center"}
								]],
				columns:[[
						{field:'username',title:'检定/校准人', width:130,align:"center"},
						{field:'date',title:'检定/校准时间', width:130,align:"center"},
						{field:'type',title:'证书类型', width:125,align:"center"},
						{field:'num',title:'证书编号', width:130,align:"center"},
						{field:'operate',title:'操作', width:120,align:"center",
							formatter:function(value,rec){
							var links ='<img src="'+rootPath +'/themes/default/images/xiangxiimage.png" onclick="viewCallbrateDetail('+ rec.callid +')" alt="详情"/>&nbsp;&nbsp;'+
							'<img src="'+rootPath +'/themes/default/images/bianjiimage.png" onclick="editWin('+ rec.callid+')" alt="编辑"/>&nbsp;&nbsp;'+	
							'<img src="'+rootPath +'/themes/default/images/deleteimage.png"" id="btnshow" onclick="del('+ rec.callid+')" alt="删除"/>';
								return links;
							}
						}						
				]],
				pagination:true,
				rownumbers:true
				
				
			});

		});	

//查看仪器设备校准/检定记录详情
function viewCallbrateDetail(id){
	$('#datagrid2').datagrid('clearSelections');
	var url =  rootPath +"/device/calibreate/calibreate!callbreate.action";
	if(id!=""){
		url = url + "?id="+id;
	}
	var _dialog =  window.top.$('	<div id ="dlg" style="padding:0px;"><iframe id="dlgFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
	_dialog.dialog({
		title:'检定/校准记录详情',
		autoOpen:false,
		modal:true,
		closed:true,
		width:'550',
		height:'276'
	});
	_dialog.dialog('open');
}
//添加
		function addWin(id){
			
			var url = rootPath +"/device/calibreate/calibreate!input.action";	
			var surl = rootPath +'/device/calibreate/calibreate!save.action';
			if(id!=""){
				url = url + "?id=" + id;
				surl = surl + "?id=" + id;
			}
			
			var _dialog =  window.top.$('<div id ="callbreate-dlg" style="padding:0px;"><iframe id="callbreateFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
			_dialog.dialog({
				title:'仪器检定/校验信息编辑',
				autoOpen:false,
				modal:true,
				closed:true,
				width:'600',
				height:'400',
				buttons:[{
					text:'保存',
					iconCls:'icon-save',
					handler:function(){
					$("#callbreateFrame",top.document.body).contents().find("#callbreateform5").form('submit',{
							url:surl,
							onSubmit:function(){
								var objs = $("#callbreateFrame",top.document.body).contents().find(".grkj-validate");
								if(!saveCheck(objs)){
									$("#callbreateFrame",top.document.body).contents().find(":input").focus();
//									$("#callbreateFrame",top.document.body).contents().find("select").focus();
									alert("数据输入不符合格式，请查看红色边框的输入框的输入提示！");
									return false;
								}
								var date = $("#callbreateFrame",top.document.body).contents().find("#datefocus").val();
								if(date==""){
									alert('日期不能为空!');
									return false;
								}
							},
							success:function(data){
								_dialog.dialog('close');
								$("#datagrid2").datagrid('reload');
								if(data=='success'){
									alert('成功');
								}
								if(data=='fail'){
									alert('失败');                                                    
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
		
		function editWin(callid){
			var url = rootPath +"/device/calibreate/calibreate!edit.action";	
			if(callid!=""){
				url = url + "?callid=" + callid;
			}
			var _dialog =  window.top.$('<div id ="callbreate-dlg" style="padding:0px;"><iframe id="callbreateEditFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
			_dialog.dialog({
				title:'仪器检定/校验信息编辑',
				autoOpen:false,
				modal:true,
				closed:true,
				width:'600',
				height:'400',
				buttons:[{
					text:'保存',
					iconCls:'icon-save',
					handler:function(){
					$("#callbreateEditFrame",top.document.body).contents().find("#callbreateForm").form('submit',{
							url:rootPath +'/device/calibreate/calibreate!updateCalibrate.action',
							onSubmit:function(){
								var objs = $("#callbreateEditFrame",top.document.body).contents().find(".grkj-validate");
								if(!saveCheck(objs)){
									$("#callbreateEditFrame",top.document.body).contents().find(".grkj-validate").focus();
									alert("数据输入不符合格式，请查看红色边框的输入框的输入提示！");
									return false;
								}
							},
							success:function(data){
								if(data=='success'){
									_dialog.dialog('close');
									$("#datagrid2").datagrid('reload');
									alert('成功');
								}else{
									alert('失败');                                                    
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
		
		//单条删除
		function del(did){
			$('#datagrid2').datagrid('clearSelections');
				if(window.confirm('是否删除？')){
					$.post( rootPath +"/device/calibreate/calibreate!deleteOnlyOne.action",{callid:did},function(del){
						if(del=='success'){
							$('#datagrid2').datagrid('clearSelections');
							$("#datagrid2").datagrid('reload');
							alert('成功');
						}
					});
			
				}
		}

		//批量删除	
		function delAll(){
			var selected=$("#datagrid2").datagrid('getSelections');
			if(selected==null || selected.length< 1){
				
				window.confirm('请至少选择一条记录！');
			}
			else{
				if(window.confirm('是否删除？')){
					var cc=[];  
					for ( var i = 0; i < selected.length; i++) {
						if(cc==""){
								cc+=selected[i]['callid'];
						}
						else{
							cc+=","+selected[i]['callid'];
							}
					}
					
					$.post(rootPath +"/device/calibreate/calibreate!deleteAll.action",{"ids":cc},function(del){
						if(del=='success'){
							$('#datagrid2').datagrid('clearSelections');
							$("#datagrid2").datagrid('reload');
							alert('成功');
						}
					});
					
				 }
			}
		}
		
			
			//关闭
		function closeAddWin(){
			$('#addWin').window('close');
		}

