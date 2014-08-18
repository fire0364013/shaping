function initDataGrid(){
				$('#dictIndexgrid').datagrid({
				nowrap: false,
				striped: true,
				collapsible:true,
				url : rootPath + '/itemtype/itemtype!toList.action',
				fit : false,
				fitColumns : true,
				scrollbarSize:0,
				remoteSort: false,
				idField:'dictCode',
				pageSize:20,
				pageList:[20,30,40,50],
				frozenColumns : [ [ {
							field : 'dictCode',
							checkbox : true,align:'center'
						} ] ],
				columns:[[
						{field:'dictCode',title:'类别编号', width:160,align:"center"},					
						{field:'dictName',title:'类别名称', width:240,align:"center"},
						{field:'operate',title:'操作', width:120,align:"center",
							formatter:function(value,rec,rowIndex){
								var links='<img src="'+rootPath +'/themes/default/images/xiangxiimage.png" id="btnshow" onclick="detail(\''+rec.dictCode+ '\','+rowIndex+')" alt="详情"/>&nbsp;&nbsp;';
								links+='<img src="'+rootPath +'/themes/default/images/bianjiimage.png" id="btnshow" onclick="addWin(\''+rec.dictCode+ '\','+rowIndex+')" alt="编辑"/>&nbsp;&nbsp;';
								links+='<img src="'+rootPath +'/themes/default/images/deleteimage.png"" id="btnshow" onclick="del(\''+rec.dictCode+ '\','+rowIndex+')" alt="删除"/>&nbsp;&nbsp;'; 
								return links;
							}
						}									
				]],
				pagination:true,
				rownumbers:true,
				onLoadSuccess:function(){
					$('#dictIndexgrid').datagrid('clearSelections');
				}
				
			
			});
			$(window).resize(function() {
				$("#dictIndexgrid").datagrid('resize', {

					width : function() {
						return documentWidth;
					},
					height : function() {
						return document.body.clientHeight;
					}
				});
			});
	}

		//添加或者修改
		function addWin(id){
			$('#dictIndexgrid').datagrid('clearSelections');
			var url;
			if(id!=""){
			   url = rootPath +"/itemtype/itemtype!input.action?id=" + id;
			}else{
			  url = rootPath +"/itemtype/itemtype!input.action";
			}
			var _dialog =  window.top.$('<div id ="role-dlg" style="padding:0px;"><iframe id="dictindexFrame" width="100%" height="100%" frameborder="0" scrolling="auto" src='+url+'></iframe></div>').appendTo(window.top.document.body);
			_dialog.dialog({
				title:'项目类别编辑',
				autoOpen:false,
				modal:true,
				closed:true,
				width:'400',
				height:'250',
		buttons : [
				{
					text : '保存',
					iconCls : 'icon-save',
					handler : function() {
					
					$("#dictindexFrame",top.document.body).contents().find("#addSubstanceApplyForm").form('submit',{
						url : rootPath + "/itemtype/itemtype!save.action",
						onSubmit:function(){
						var objs= $("#dictindexFrame",top.document.body).contents().find(".grkj-validate");
						if(!saveCheck(objs)){
							$("#dictindexFrame",top.document.body).contents().find(":input").focus();
							alert("数据输入不符合格式，请查看红色边框的输入框的输入提示！");
							return false;
						}
						},
						success:function(data){
							if(data=='success'){
							_dialog.dialog('close');
							$("#dictIndexgrid").datagrid('reload');
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
		//关闭
		function closeAddWin(){
			$('#addWin').window('close');
		}

		
		//单条删除
		function del(dictionarycode,rowIndex){
			$('#dictIndexgrid').datagrid('clearSelections');
			$('#dictIndexgrid').datagrid('selectRow',rowIndex);
			if(window.confirm('是否删除？'))
			{
				$.post( rootPath +"/itemtype/itemtype!deleteOnlyOne.action",{id:dictionarycode},function(del)
					{
						if(del=='success')
						{
							$('#dictIndexgrid').datagrid('clearSelections');
							$("#dictIndexgrid").datagrid('reload');
							alert('成功');
					}
				});
			
			}
		}

		//批量删除	
		function delAll(){
			var selected=$("#dictIndexgrid").datagrid('getSelections');
			//alert(selected.length);
			if(selected==null || selected.length< 1){
				
				alert('请至少选择一条记录！');
			}
			else{
				if(window.confirm('是否删除？')){
					var cc=[];
					for ( var i = 0; i < selected.length; i++) {
						if(cc==""){
								cc+=selected[i]['dictCode'];
						}
						else{
							cc+=","+selected[i]['dictCode'];
							}
					}
					
					$.post(rootPath +"/itemtype/itemtype!deleteAll.action",{"ids":cc},function(del){
						if(del=='success'){
							$('#dictIndexgrid').datagrid('clearSelections');
							$("#dictIndexgrid").datagrid('reload');
							alert('成功');
						}
					});
					
				 }
			}
		}
		//查询
		function query(){
			
			var itemtypename=$("#itemtypename").val();

			$('#dictIndexgrid').datagrid( {
				queryParams : {
				itemtypename : itemtypename
				},
				pageNumber:1		
			});
		}

		//详情  
		function detail(id){
			$('#dictIndexgrid').datagrid('clearSelections');
			var url =  rootPath +"/itemtype/itemtype!view.action";
			if(id!=""){
				url = url + "?id="+id;
			}
			//$(window.top.document).find("#btnProjectInfo").click();
			var _dialog =  window.top.$('	<div id ="role-dlg" style="padding:0px;"><iframe id="dictionaryindexFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
			//window.top.document.body.appendChild(win);
			_dialog.dialog({
				title:'项目类别详情',
				autoOpen:false,
				modal:true,
				closed:true,
				width:'400',
				height:'250'
			});
			_dialog.dialog('open');
		}
		

