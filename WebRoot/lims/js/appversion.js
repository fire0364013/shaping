function initDataGrid(){
				$('#appversiongrid').datagrid({
				nowrap: false,
				striped: true,
				collapsible:true,
				url : rootPath + '/entpriseinfo/appversion/appversion!toList.action?appinfoid='+appinfoid,
				fit : true,
				fitColumns : true,
				scrollbarSize:0,
				idField:'appversionid',
				pageSize:10,
				pageList:[10,15,20,25],
				frozenColumns : [ [ {
							field : 'appversionid',
							checkbox : true,align:'center'
						} ] ],
				columns:[[
						{field:'appversionname',title:'版本名称', width:160,align:"center"},					
						{field:'appversionnumber',title:'版本序号', width:240,align:"center"},
						{field:'appversionurl',title:'下载地址', width:240,align:"center"},
						{field:'releaser',title:'发布人', width:240,align:"center"},
						{field:'releasedate',title:'发布日期', width:240,align:"center"},
						{field:'operate',title:'操作', width:120,align:"center",
							formatter:function(value,rec,rowIndex){
								var links='<img src="'+rootPath +'/themes/default/images/xiangxiimage.png" id="btnshow" onclick="detail(\''+rec.appversionid+ '\','+rowIndex+')" alt="详情"/>&nbsp;&nbsp;';
								links+='<img src="'+rootPath +'/themes/default/images/bianjiimage.png" id="btnshow" onclick="addWin(\''+rec.appversionid+ '\','+rowIndex+')" alt="编辑"/>&nbsp;&nbsp;';
								links+='<img src="'+rootPath +'/themes/default/images/deleteimage.png"" id="btnshow" onclick="del(\''+rec.appversionid+ '\','+rowIndex+')" alt="删除"/>&nbsp;&nbsp;'; 
								//links += '<img src="'+ rootPath + '/themes/default/images/historyimage.png" id="btnshow" onclick="detailbeautyinfo(\''+ rec.beautyversionid+ '\','+rowIndex+')" alt="医美图片"/>';
								return links;
							}
						}									
				]],
				pagination:true,
				rownumbers:true,
				onLoadSuccess:function(){
					$('#appversiongrid').datagrid('clearSelections');
				}
				
			
			});
			$(window).resize(function() {
				$("#appversiongrid").datagrid('resize', {

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
			$('#appversiongrid').datagrid('clearSelections');
			var url;
			if(id!=""){
			   url = rootPath +"/entpriseinfo/appversion/appversion!input.action?id=" + id+"&appinfoid="+appinfoid;
			}else{
			  url = rootPath +"/entpriseinfo/appversion/appversion!input.action?appinfoid="+appinfoid;
			}
			var _dialog =  window.top.$('<div id ="role-dlg" style="padding:0px;"><iframe id="appversionFrame" width="100%" height="100%" frameborder="0" scrolling="auto" src='+url+'></iframe></div>').appendTo(window.top.document.body);
			_dialog.dialog({
				title:'医美版本编辑',
				autoOpen:false,
				modal:true,
				closed:true,
				width:'800',
				height:'450',
		buttons : [
				{
					text : '保存',
					iconCls : 'icon-save',
					handler : function() {
					
					$("#appversionFrame",top.document.body).contents().find("#addappversionForm").form('submit',{
						url : rootPath + "/entpriseinfo/appversion/appversion!save.action",
						onSubmit:function(){
						var objs= $("#appversionFrame",top.document.body).contents().find(".grkj-validate");
						if(!saveCheck(objs)){
							$("#appversionFrame",top.document.body).contents().find(":input").focus();
							alert("数据输入不符合格式，请查看红色边框的输入框的输入提示！");
							return false;
						}
						},
						success:function(data){
							if(data=='success'){
							_dialog.dialog('close');
							$("#appversiongrid").datagrid('reload');
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
			$('#appversiongrid').datagrid('clearSelections');
			$('#appversiongrid').datagrid('selectRow',rowIndex);
			if(window.confirm('是否删除？'))
			{
				$.post( rootPath +"/entpriseinfo/appversion/appversion!delete.action",{id:id},function(del)
					{
						if(del=='success')
						{
							$('#appversiongrid').datagrid('clearSelections');
							$("#appversiongrid").datagrid('reload');
							alert('成功');
					}
				});
			
			}
		}

		//批量删除	
		function delAll(){
			var selected=$("#appversiongrid").datagrid('getSelections');
			//alert(selected.length);
			if(selected==null || selected.length< 1){
				
				alert('请至少选择一条记录！');
			}
			else{
				if(window.confirm('是否删除？')){
					var cc=[];
					for ( var i = 0; i < selected.length; i++) {
						if(cc==""){
								cc+=selected[i]['appversionid'];
						}
						else{
							cc+=","+selected[i]['appversionid'];
							}
					}
					
					$.post(rootPath +"/entpriseinfo/appversion/appversion!deleteMany.action",{"ids":cc},function(del){
						if(del=='success'){
							$('#appversiongrid').datagrid('clearSelections');
							$("#appversiongrid").datagrid('reload');
							alert('成功');
						}
					});
					
				 }
			}
		}
		//查询
		function query(){
			
			var appversionname=$("#appversionname").val();

			$('#appversiongrid').datagrid( {
				queryParams : {
				appversionname : appversionname
				},
				pageNumber:1		
			});
		}

		//详情  
		function detail(id,rowindex){
			$('#appversiongrid').datagrid('clearSelections');
			var url =  rootPath +"/entpriseinfo/appversion/appversion!view.action";
			if(id!=""){
				url = url + "?id="+id;
			}
			//$(window.top.document).find("#btnProjectInfo").click();
			var _dialog =  window.top.$('	<div id ="role-dlg" style="padding:0px;"><iframe id="dictionaryindexFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
			//window.top.document.body.appendChild(win);
			_dialog.dialog({
				title:'医美版本详情',
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
		
