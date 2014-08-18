//-----Au-----wjy~~
function initDictInfo() {
		$('#dictionaryinfo')
				.datagrid(
						{									
							nowrap : false,
							striped : true,						
							collapsible : true,
							url : rootPath +'/dictionary/dictionaryinfo!dictinfoList.action?dictCode='+$('#dictionarycode').val(),
							sortName : 'dinfoId',
							sortOrder : 'asc',
							remoteSort : false,
							fit:true,
							fitColumns:true,
							scrollbarSize:0,
							idField:'dinfoid',
							pageSize : 10,
							pageList : [10,20, 30, 40 ],
							frozenColumns : [ [ {
								field : 'dinfoid',
								checkbox : true,
								align:"center"
							} ] ],
							columns : [ [
									{
										field : 'dictionarycode',
										title : '字典编号',
										width : 200,
										align : 'center'
									},
									{
										field : 'dinfocode',
										title : '字典详情编号',
										width : 200,
										align : 'center'
									},
									{
										field : 'dinfoname',
										title : '字典详情名称',
										width : 360,
										align : "center"
									},
									{
										field : 'dorder',
										title : '序号',
										width : 60,
										align : "center"
									},
									{
										field : 'option',
										title : '操作',
										width : 60,
										align : 'center',
										formatter : function(value, rec) {
											var links = '<img src="'
													+ rootPath
											+ '/themes/default/images/bianjiimage.png" id="btnshow"  onclick="update(\''+ rec.dinfoid+ '\')" alt="编辑"/>&nbsp;&nbsp;';
								
											return links;
										}
									} ] ],
							pagination : true,
							rownumbers : true
						});
		$(window).resize(function(){
			$("#dictionaryinfo").datagrid('resize');
		});
	}
	//添加
		function add(){
			var id = $('#dictionarycode').val();
			$('#dictionaryinfo').datagrid('clearSelections');
			var url;
			if(id!=""){
			   url = rootPath +"/dictionary/dictionaryinfo!add.action?dictionarycode=" + id;
			}else{
				return ;
			}
			var _dialog =  window.top.$('<div id ="role-dlg" style="padding:0px;"><iframe id="dictinfoFrame" width="100%" height="100%" frameborder="0" scrolling="auto" src='+url+'></iframe></div>').appendTo(window.top.document.body);
			_dialog.dialog({
				title:'添加字典详情',
				autoOpen:false,
				modal:true,
				closed:true,
				width:'500',
				height:'400',
				buttons : [
					{
					text : '保存',
					iconCls : 'icon-save',
					handler : function() {
//					alert($('#dictionarycode').val());
					$("#dictinfoFrame",top.document.body).contents().find("#addDictinfoForm").form('submit',{
						url : rootPath + "/dictionary/dictionaryinfo!save.action?id="+id,
						onSubmit:function(){
//						var objs= $("#dictinfoFrame",top.document.body).contents().find(".grkj-validate");
//						if(!saveCheck(objs)){
//							$("#dictinfoFrame",top.document.body).contents().find(":input").focus();
//							alert("数据输入不符合格式，请查看红色边框的输入框的输入提示！");
//							return false;
//						}
						},
						success:function(data){
							if(data=='success'){
							_dialog.dialog('close');
							$("#dictionaryinfo").datagrid('reload');
							alert('保存成功');
							}else if(data=='fail')	{
								alert('保存失败');
								}
						},
						error:function(){
							alert("修改失败");
						}
					});	
				}
				}, {
					text : '取消',
					iconCls : 'icon-cancel',
					handler : function() {
						_dialog.dialog('close');
					}
				} ],
				onClose:function(){
					_dialog.dialog("destroy");
					
				}
			});
			_dialog.dialog('open');
		}

	//修改
		function update(dinfoid){
			var id = $('#dictionarycode').val();
			$('#dictionaryinfo').datagrid('clearSelections');
			var url = rootPath +"/dictionary/dictionaryinfo!input.action?dinfoid="+dinfoid;
//			if(dinfoid!="" || dinfoid == undefined){
//				url +="?dinfoid="+dinfoid;
//			}else{
//				if(id!=""){
//			   		url += "?dictionarycode=" + id;
//				}else{
//					return;
//				}
//			}
			
			
			var _dialog =  window.top.$('<div id ="role-dlg" style="padding:0px;"><iframe id="dictinfoFrame" width="100%" height="100%" frameborder="0" scrolling="auto" src='+url+'></iframe></div>').appendTo(window.top.document.body);
			_dialog.dialog({
				title:'字典详情编辑',
				autoOpen:false,
				modal:true,
				closed:true,
				width:'500',
				height:'400',
				buttons : [
					{
					text : '保存',
					iconCls : 'icon-save',
					handler : function() {
					alert($('#dictionarycode').val());
					$("#dictinfoFrame",top.document.body).contents().find("#addDictinfoForm").form('submit',{
						url : rootPath + "/dictionary/dictionaryinfo!save.action?dinfoid="+dinfoid,
						onSubmit:function(){
//						var objs= $("#dictinfoFrame",top.document.body).contents().find(".grkj-validate");
//						if(!saveCheck(objs)){
//							$("#dictinfoFrame",top.document.body).contents().find(":input").focus();
//							alert("数据输入不符合格式，请查看红色边框的输入框的输入提示！");
//							return false;
//						}
						},
						success:function(data){
							if(data=='success'){
							_dialog.dialog('close');
							$("#dictionaryinfo").datagrid('reload');
							alert('保存成功');
							}else if(data=='fail')	{
								alert('保存失败');
								}
						},
						error:function(){
							alert("修改失败");
						}
					});	
				}
				}, {
					text : '取消',
					iconCls : 'icon-cancel',
					handler : function() {
						_dialog.dialog('close');
					}
				} ],
				onClose:function(){
					_dialog.dialog("destroy");
					
				}
			});
			_dialog.dialog('open');
		}

function delAll(){
			var selected=$("#dictionaryinfo").datagrid('getSelections');
//			alert(selected.length);
			if(selected==null || selected.length< 1){
				
				alert('请至少选择一条记录！');
			}
			else{
				if(window.confirm('是否删除？')){
					var cc=[];
					for ( var i = 0; i < selected.length; i++) {
						if(cc==""){
								cc+=selected[i]['dinfoid'];
						}
						else{
							cc+=","+selected[i]['dinfoid'];
							}
					}
					
					$.post(rootPath +"/dictionary/dictionaryinfo!deleteAll.action",{"ids":cc},function(del){
						if(del=='success'){
							$('#dictionaryinfo').datagrid('clearSelections');
							$("#dictionaryinfo").datagrid('reload');
							alert('成功');
						}
					});
					
				 }
			}
		}

