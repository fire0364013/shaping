function initDataGrid(){
				$('#appinfogrid').datagrid({
				nowrap: false,
				striped: true,
				collapsible:true,
				url : rootPath + '/entpriseinfo/appinfo/appinfo!toList.action',
				fit : true,
				fitColumns : true,
				scrollbarSize:0,
				idField:'appinfoid',
				pageSize:10,
				pageList:[10,15,20,25],
//				frozenColumns : [ [ {
//							field : 'appinfoid',
//							checkbox : true,align:'center'
//						} ] ],
				columns:[[
						{field:'appinfoname',title:'应用名称', width:300,align:"center"},					
						{field:'remark',title:'备注', width:240,align:"center"},
						{field:'operate',title:'操作', width:120,align:"center",
							formatter:function(value,rec,rowIndex){
								var links='<img src="'+rootPath +'/themes/default/images/xiangxiimage.png" id="btnshow" onclick="detail(\''+rec.appinfoid+ '\','+rowIndex+')" alt="详情"/>&nbsp;&nbsp;';
								links+='<img src="'+rootPath +'/themes/default/images/bianjiimage.png" id="btnshow" onclick="addWin(\''+rec.appinfoid+ '\','+rowIndex+')" alt="编辑"/>&nbsp;&nbsp;';
								//links += '<img src="'+ rootPath + '/themes/default/images/historyimage.png" id="btnshow" onclick="detailbeautyinfo(\''+ rec.beautyversionid+ '\','+rowIndex+')" alt="医美图片"/>';
								return links;
							}
						}									
				]],
				pagination:true,
				rownumbers:true,
				onLoadSuccess:function(){
					$('#appinfogrid').datagrid('clearSelections');
				}
				
			
			});
			$(window).resize(function() {
				$("#appinfogrid").datagrid('resize', {

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
			$('#appinfogrid').datagrid('clearSelections');
			var url;
			if(id!=""){
			   url = rootPath +"/entpriseinfo/appinfo/appinfo!input.action?id=" + id;
			}else{
			  url = rootPath +"/entpriseinfo/appinfo/appinfo!input.action";
			}
			var _dialog =  window.top.$('<div id ="role-dlg" style="padding:0px;"><iframe id="appinfoFrame" width="100%" height="100%" frameborder="0" scrolling="no"  src='+url+'></iframe></div>').appendTo(window.top.document.body);
			_dialog.dialog({
				title:'App版本编辑',
				autoOpen:false,
				modal:true,
				closed:true,
				width:'650',
				height:'250',
		buttons : [
				{
					text : '保存',
					iconCls : 'icon-save',
					handler : function() {
					
					$("#appinfoFrame",top.document.body).contents().find("#addappinfoForm").form('submit',{
						url : rootPath + "/entpriseinfo/appinfo/appinfo!save.action",
						onSubmit:function(){
						var objs= $("#appinfoFrame",top.document.body).contents().find(".grkj-validate");
						if(!saveCheck(objs)){
							$("#appinfoFrame",top.document.body).contents().find(":input").focus();
							alert("数据输入不符合格式，请查看红色边框的输入框的输入提示！");
							return false;
						}
						},
						success:function(data){
							if(data=='success'){
							_dialog.dialog('close');
							$("#appinfogrid").datagrid('reload');
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

		
		//查询
		function query(){
			
			var appinfoname=$("#appinfoname").val();

			$('#appinfogrid').datagrid( {
				queryParams : {
				appinfoname : appinfoname
				},
				pageNumber:1		
			});
		}

		//详情  
		function detail(id,rowindex){
			$('#appinfogrid').datagrid('clearSelections');
			var url =  rootPath +"/entpriseinfo/appinfo/appinfo!view.action";
			if(id!=""){
				url = url + "?id="+id;
			}
			//$(window.top.document).find("#btnProjectInfo").click();
			var _dialog =  window.top.$('	<div id ="role-dlg" style="padding:0px;"><iframe id="appinfoFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
			//window.top.document.body.appendChild(win);
			_dialog.dialog({
				title:'App版本详情',
				autoOpen:false,
				modal:true,
				closed:true,
				width:'650',
				height:'250',
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
		
