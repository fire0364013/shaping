function initDataGrid(){
				$('#employeeitemgrid').datagrid({
				nowrap: false,
				striped: true,
				collapsible:true,
				url : rootPath + '/iteminfo/employeeitem/employeeitem!toList.action',
				fit : true,
				fitColumns : true,
				scrollbarSize:0,
				idField:'employeeitemid',
				pageSize:20,
				pageList:[20,30,40,50],
				frozenColumns : [ [ {
							field : 'employeeitemid',
							checkbox : true,align:'center'
						} ] ],
				columns:[[
						{field:'employeeinfoname',title:'员工名称', width:160,align:"center"},					
						{field:'itemname',title:'项目', width:240,align:"center"},
						{field:'isgoldmedal',title:'是否为金牌项目', width:240,align:"center"},
						{field:'operate',title:'操作', width:120,align:"center",
							formatter:function(value,rec,rowIndex){
								var links='<img src="'+rootPath +'/themes/default/images/xiangxiimage.png" id="btnshow" onclick="detail(\''+rec.employeeitemid+ '\','+rowIndex+')" alt="详情"/>&nbsp;&nbsp;';
								links+='<img src="'+rootPath +'/themes/default/images/bianjiimage.png" id="btnshow" onclick="edit(\''+rec.employeeitemid+ '\','+rowIndex+')" alt="编辑"/>&nbsp;&nbsp;';
								links+='<img src="'+rootPath +'/themes/default/images/deleteimage.png"" id="btnshow" onclick="del(\''+rec.employeeitemid+ '\','+rowIndex+')" alt="删除"/>&nbsp;&nbsp;'; 
								return links;
							}
						}									
				]],
				pagination:true,
				rownumbers:true,
				onLoadSuccess:function(){
					$('#employeeitemgrid').datagrid('clearSelections');
				}
				
			
			});
			$(window).resize(function() {
				$("#employeeitemgrid").datagrid('resize', {

					width : function() {
						return documentWidth;
					},
					height : function() {
						return document.body.clientHeight;
					}
				});
			});
	}

		//添加
		function addWin(id){
			$('#employeeitemgrid').datagrid('clearSelections');
			var url;
			if(id!=""){
			   url = rootPath +"/iteminfo/employeeitem/employeeitem!input.action?id=" + id;
			}else{
			  url = rootPath +"/iteminfo/employeeitem/employeeitem!input.action";
			}
			var _dialog =  window.top.$('<div id ="role-dlg" style="padding:0px;"><iframe id="employeeitemFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
			_dialog.dialog({
				title:'员工项目编辑',
				autoOpen:false,
				modal:true,
				closed:true,
				width:'800',
				height:'300',
				buttons : [
				{
					text : '保存',
					iconCls : 'icon-save',
					handler : function() {
					$("#employeeitemFrame",top.document.body).contents().find("#addemployeeitemForm").form('submit',{
						url : rootPath + "/iteminfo/employeeitem/employeeitem!save.action",
						onSubmit:function(){
						var objs= $("#employeeitemFrame",top.document.body).contents().find(".grkj-validate");
						if(!saveCheck(objs)){
							$("#employeeitemFrame",top.document.body).contents().find(":input").focus();
							alert("数据输入不符合格式，请查看红色边框的输入框的输入提示！");
							return false;
						}
						},
						success:function(data){
							if(data=='success'){
							_dialog.dialog('close');
							$("#employeeitemgrid").datagrid('reload');
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
		function edit(id){
			$('#employeeitemgrid').datagrid('clearSelections');
			var url;
			if(id!=""){
			   url = rootPath +"/iteminfo/employeeitem/employeeitem!edit.action?id=" + id;
			}else{
			  url = rootPath +"/iteminfo/employeeitem/employeeitem!edit.action";
			}
			var _dialog =  window.top.$('<div id ="role-dlg" style="padding:0px;"><iframe id="employeeitemFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
			_dialog.dialog({
				title:'员工项目编辑',
				autoOpen:false,
				modal:true,
				closed:true,
				width:'800',
				height:'300',
				buttons : [
				{
					text : '保存',
					iconCls : 'icon-save',
					handler : function() {
					
					$("#employeeitemFrame",top.document.body).contents().find("#addemployeeitemForm").form('submit',{
						url : rootPath + "/iteminfo/employeeitem/employeeitem!save.action",
						onSubmit:function(){
						var objs= $("#employeeitemFrame",top.document.body).contents().find(".grkj-validate");
						if(!saveCheck(objs)){
							$("#employeeitemFrame",top.document.body).contents().find(":input").focus();
							alert("数据输入不符合格式，请查看红色边框的输入框的输入提示！");
							return false;
						}
						},
						success:function(data){
							if(data=='success'){
							_dialog.dialog('close');
							$("#employeeitemgrid").datagrid('reload');
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
		function del(id,rowIndex){
			$('#employeeitemgrid').datagrid('clearSelections');
			$('#employeeitemgrid').datagrid('selectRow',rowIndex);
			if(window.confirm('是否删除？'))
			{
				$.post( rootPath +"/iteminfo/employeeitem/employeeitem!delete.action",{id:id},function(del)
					{
						if(del=='success')
						{
							$('#employeeitemgrid').datagrid('clearSelections');
							$("#employeeitemgrid").datagrid('reload');
							alert('成功');
					}
				});
			
			}
		}

		//批量删除	
		function delAll(){
			var selected=$("#employeeitemgrid").datagrid('getSelections');
			//alert(selected.length);
			if(selected==null || selected.length< 1){
				
				alert('请至少选择一条记录！');
			}
			else{
				if(window.confirm('是否删除？')){
					var cc=[];
					for ( var i = 0; i < selected.length; i++) {
						if(cc==""){
								cc+=selected[i]['employeeitemid'];
						}
						else{
							cc+=","+selected[i]['employeeitemid'];
							}
					}
					
					$.post(rootPath +"/iteminfo/employeeitem/employeeitem!deleteMany.action",{"ids":cc},function(del){
						if(del=='success'){
							$('#employeeitemgrid').datagrid('clearSelections');
							$("#employeeitemgrid").datagrid('reload');
							alert('成功');
						}
					});
					
				 }
			}
		}
		//查询
		function query(){
			
			var employeeinfoname=$("#employeeinfoname").val();
			var itemname=$("#itemname").val();
			$('#employeeitemgrid').datagrid( {
				queryParams : {
				itemname : itemname,
				employeeinfoname : employeeinfoname
				},
				pageNumber:1		
			});
		}

		//详情  
		function detail(id,rowindex){
			$('#employeeitemgrid').datagrid('clearSelections');
			var url =  rootPath +"/iteminfo/employeeitem/employeeitem!view.action";
			if(id!=""){
				url = url + "?id="+id;
			}
			//$(window.top.document).find("#btnProjectInfo").click();
			var _dialog =  window.top.$('	<div id ="role-dlg" style="padding:0px;"><iframe id="dictionaryindexFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
			//window.top.document.body.appendChild(win);
			_dialog.dialog({
				title:'员工项目详情',
				autoOpen:false,
				modal:true,
				closed:true,
				width:'800',
				height:'450',
				buttons : [
				{
					text : '关闭',
					iconCls : 'icon-save',
					handler : function() {
						_dialog.dialog('close');
					}
				}]
			});
			_dialog.dialog('open');
		}
