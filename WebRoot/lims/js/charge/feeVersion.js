function initDataGrid(){
			$('#feeVersiongrid').datagrid({
	
				nowrap: false,
				striped: true,
				collapsible:true,
				url:rootPath +'/charge/feeversion!toList.action',
				fit : false,
				fitColumns : true,
				scrollbarSize:0,
				remoteSort: false,
				idField:'version',
				pageSize:20,
				pageList:[20,30,40,50],
				frozenColumns:[[
					{field:'versionid',checkbox:true,align:"center"}
								]],
				columns:[[
						{field:'version',title:'版本号', width:160,align:"center"},					
						{field:'versionName',title:'版本名称', width:240,align:"center"},
						{field:'effectDate',title:'生效时间', width:140,align:"center"},
						{field:'deadline',title:'截止时间', width:140,align:"center"},
				{field:"state",title:"版本状态",width:40,align:"center",
						formatter:function(value,rowData,rowIndex){
							if(value=="1"){
								return "已发布";
							}else{
								return "已停用";	
							}
					  	}
					},
						
						{field:'operate',title:'操作', width:120,align:"center",
							formatter:function(value,rec,rowIndex){
								var links='<img src="'+rootPath +'/themes/default/images/xiangxiimage.png" id="btnshow" onclick="detail('+ rec.version +')" alt="详情"/>&nbsp;&nbsp;';
								links+='<img src="'+rootPath +'/themes/default/images/bianjiimage.png" id="btnshow" onclick="addWin('+ rec.version +')" alt="编辑"/>&nbsp;&nbsp;';
								links+='<img src="'+rootPath +'/themes/default/images/deleteimage.png"" id="btnshow" onclick="del(\''+rec.version+ '\','+rowIndex+')" alt="删除"/>&nbsp;&nbsp;'; 
								links+='<img src="'+ rootPath+'/themes/default/images/stop.png" id="btnshow" onclick="stop(\''+rec.version+ '\','+rowIndex+')" alt="停用"/>&nbsp;&nbsp;';
								return links;
							}
						}						
				]],
				pagination:true,
				rownumbers:true,
	   onRowContextMenu:function(e,rowIndex,rowData){
			$('#feeVersiongrid').datagrid("selectRow",rowIndex);
			$("#versionContextMenu").menu("show", {left: e.pageX,top: e.pageY});
			$('#copyVersion').removeAttr("disabled");
			$('#version').val(rowData.version);
			e.preventDefault();
		},
				onLoadSuccess:function(){
					$('#feeVersiongrid').datagrid('clearSelections');
				}
				
				
			});
			$(window).resize(function() {
				$("#feeVersiongrid").datagrid('resize', {

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
			$('#feeVersiongrid').datagrid('clearSelections');
			var url;
			if(id!=""){
			   url = rootPath +"/charge/feeversion!view.action?id=" + id;
			}else{
			  url = rootPath +"/charge/feeversion!input.action";
			}
			var _dialog =  window.top.$('<div id ="role-dlg" style="padding:0px;"><iframe id="feeVersionFrame" width="100%" height="100%" frameborder="0" scrolling="auto" src='+url+'></iframe></div>').appendTo(window.top.document.body);
			_dialog.dialog({
				title:'版本信息编辑',
				autoOpen:false,
				modal:true,
				closed:true,
				width:'650',
				height:'580',
		buttons : [
				{
					text : '保存',
					iconCls : 'icon-save',
					handler : function() {
					
					$("#feeVersionFrame",top.document.body).contents().find("#addSubstanceApplyForm").form('submit',{
						url : rootPath + "/charge/feeversion!save.action",
						onSubmit:function(){
						var objs= $("#feeVersionFrame",top.document.body).contents().find(".grkj-validate");
						if(!saveCheck(objs)){
							$("#feeVersionFrame",top.document.body).contents().find(":input").focus();
							alert("数据输入不符合格式，请查看红色边框的输入框的输入提示！");
							return false;
						}
						},
						success:function(data){
							if(data=='success'){
							_dialog.dialog('close');
							$("#feeVersiongrid").datagrid('reload');
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
		function del(version,rowIndex){
			$('#feeVersiongrid').datagrid('clearSelections');
			$('#feeVersiongrid').datagrid('selectRow',rowIndex);
			if(window.confirm('是否删除？'))
			{
				$.post( rootPath +"/charge/feeversion!deleteOnlyOne.action",{id:version},function(del)
					{
						if(del=='success')
						{
							$('#feeVersiongrid').datagrid('clearSelections');
							$("#feeVersiongrid").datagrid('reload');
							alert('成功');
					}
				});
			
			}
		}

		//批量删除	
		function delAll(){
			var selected=$("#feeVersiongrid").datagrid('getSelections');
			//alert(selected.length);
			if(selected==null || selected.length< 1){
				
				alert('请至少选择一条记录！');
			}
			else{
				if(window.confirm('是否删除？')){
					var cc=[];
					for ( var i = 0; i < selected.length; i++) {
						if(cc==""){
								cc+=selected[i]['version'];
						}
						else{
							cc+=","+selected[i]['version'];
							}
					}
					
					$.post(rootPath +"/charge/feeversion!deleteAll.action",{"ids":cc},function(del){
						if(del=='success'){
							$('#feeVersiongrid').datagrid('clearSelections');
							$("#feeVersiongrid").datagrid('reload');
							alert('成功');
						}
					});
					
				 }
			}
		}
		//查询
		function query(){
			
			var feeVersionnamequery=$("#feeVersionnamequery").val();

			$('#feeVersiongrid').datagrid( {
				queryParams : {
				versionName : feeVersionnamequery
				},
				pageNumber:1		
			});
		}
	
//停用
function stop(version,rowIndex){
		   $('#feeVersiongrid').datagrid('clearSelections');
			$('#feeVersiongrid').datagrid('selectRow',rowIndex);
			if(window.confirm('是否停用？'))
			{
				$.post( rootPath +"/charge/feeversion!stopVersion.action",{version:version},function(del)
					{
						if(del=='success')
						{
							$('#feeVersiongrid').datagrid('clearSelections');
							$("#feeVersiongrid").datagrid('reload');
							alert('成功');
					}
				});
			
			}
}

		//详情
		function detail(id){
			$('#feeVersiongrid').datagrid('clearSelections');
			var url =  rootPath +"/charge/feeversion!toview.action";
			if(id!=""){
				url = url + "?id="+id;
			}
			//$(window.top.document).find("#btnProjectInfo").click();
			var _dialog =  window.top.$('	<div id ="role-dlg" style="padding:0px;"><iframe id="feeVersionFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
			//window.top.document.body.appendChild(win);
			_dialog.dialog({
				title:'收费详情',
				autoOpen:false,
				modal:true,
				closed:true,
				width:'900',
				height:'600'
			});
			_dialog.dialog('open');
		}

//复制任务
function copyVersion(){
	var version = $('#version').val();
 	if(window.confirm('是否复制？'))
 	{ 		
		 $.ajax( {
			type : 'POST',
			url :rootPath + "/charge/feeversion!copy.action",
			data : {'version' : version},
			success : function(data) {
				if (data == 'fail') {
					alert("复制失败！");
					return;
				}
				if (data == 'success') {
					alert('复制成功！');
					$('#feeVersiongrid').datagrid('reload');
					$('#version').val('');
					
				}
			}
		});
	}
}


		


		

