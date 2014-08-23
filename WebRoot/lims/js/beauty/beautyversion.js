function initDataGrid(){
				$('#beautyversiongrid').datagrid({
				nowrap: false,
				striped: true,
				collapsible:true,
				url : rootPath + '/beauty/beautyversion/beautyversion!toList.action',
				fit : true,
				fitColumns : true,
				scrollbarSize:0,
				idField:'beautyversionid',
				pageSize:20,
				pageList:[20,30,40,50],
				frozenColumns : [ [ {
							field : 'beautyversionid',
							checkbox : true,align:'center'
						} ] ],
				columns:[[
						{field:'entname',title:'企业名称', width:160,align:"center"},					
						{field:'versioninfo',title:'版本说明', width:240,align:"center"},
						{field:'operator',title:'提交人', width:240,align:"center"},
						{field:'operatedate',title:'提交日期', width:240,align:"center"},
						{field:'mobilephone',title:'联系电话', width:240,align:"center"},
						{field:'operate',title:'操作', width:120,align:"center",
							formatter:function(value,rec,rowIndex){
								var links='<img src="'+rootPath +'/themes/default/images/xiangxiimage.png" id="btnshow" onclick="detail(\''+rec.beautyversionid+ '\','+rowIndex+')" alt="详情"/>&nbsp;&nbsp;';
								links+='<img src="'+rootPath +'/themes/default/images/bianjiimage.png" id="btnshow" onclick="addWin(\''+rec.beautyversionid+ '\','+rowIndex+')" alt="编辑"/>&nbsp;&nbsp;';
								links+='<img src="'+rootPath +'/themes/default/images/deleteimage.png"" id="btnshow" onclick="del(\''+rec.beautyversionid+ '\','+rowIndex+')" alt="删除"/>&nbsp;&nbsp;'; 
								links += '<img src="'+ rootPath + '/themes/default/images/historyimage.png" id="btnshow" onclick="detailbeautyinfo(\''+ rec.beautyversionid+ '\','+rowIndex+')" alt="医美图片"/>';
								return links;
							}
						}									
				]],
				pagination:true,
				rownumbers:true,
				onLoadSuccess:function(){
					$('#beautyversiongrid').datagrid('clearSelections');
				}
				
			
			});
			$(window).resize(function() {
				$("#beautyversiongrid").datagrid('resize', {

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
			$('#beautyversiongrid').datagrid('clearSelections');
			var url;
			if(id!=""){
			   url = rootPath +"/beauty/beautyversion/beautyversion!input.action?id=" + id;
			}else{
			  url = rootPath +"/beauty/beautyversion/beautyversion!input.action";
			}
			var _dialog =  window.top.$('<div id ="role-dlg" style="padding:0px;"><iframe id="beautyversionFrame" width="100%" height="100%" frameborder="0" scrolling="auto" src='+url+'></iframe></div>').appendTo(window.top.document.body);
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
					
					$("#beautyversionFrame",top.document.body).contents().find("#addbeautyversionForm").form('submit',{
						url : rootPath + "/beauty/beautyversion/beautyversion!save.action",
						onSubmit:function(){
						var objs= $("#beautyversionFrame",top.document.body).contents().find(".grkj-validate");
						if(!saveCheck(objs)){
							$("#beautyversionFrame",top.document.body).contents().find(":input").focus();
							alert("数据输入不符合格式，请查看红色边框的输入框的输入提示！");
							return false;
						}
						},
						success:function(data){
							if(data=='success'){
							_dialog.dialog('close');
							$("#beautyversiongrid").datagrid('reload');
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
			$('#beautyversiongrid').datagrid('clearSelections');
			$('#beautyversiongrid').datagrid('selectRow',rowIndex);
			if(window.confirm('是否删除？'))
			{
				$.post( rootPath +"/beauty/beautyversion/beautyversion!delete.action",{id:id},function(del)
					{
						if(del=='success')
						{
							$('#beautyversiongrid').datagrid('clearSelections');
							$("#beautyversiongrid").datagrid('reload');
							alert('成功');
					}
				});
			
			}
		}

		//批量删除	
		function delAll(){
			var selected=$("#beautyversiongrid").datagrid('getSelections');
			//alert(selected.length);
			if(selected==null || selected.length< 1){
				
				alert('请至少选择一条记录！');
			}
			else{
				if(window.confirm('是否删除？')){
					var cc=[];
					for ( var i = 0; i < selected.length; i++) {
						if(cc==""){
								cc+=selected[i]['beautyversionid'];
						}
						else{
							cc+=","+selected[i]['beautyversionid'];
							}
					}
					
					$.post(rootPath +"/beauty/beautyversion/beautyversion!deleteMany.action",{"ids":cc},function(del){
						if(del=='success'){
							$('#beautyversiongrid').datagrid('clearSelections');
							$("#beautyversiongrid").datagrid('reload');
							alert('成功');
						}
					});
					
				 }
			}
		}
		//查询
		function query(){
			
			var entname=$("#entname").val();

			$('#beautyversiongrid').datagrid( {
				queryParams : {
				entname : entname
				},
				pageNumber:1		
			});
		}

		//详情  
		function detail(id,rowindex){
			$('#beautyversiongrid').datagrid('clearSelections');
			var url =  rootPath +"/beauty/beautyversion/beautyversion!view.action";
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
		
//企业选择
function selectEntinfo(){
	var url = rootPath + "/projects/taskregister/taskregister!toEntpriseListPage.action";
	var _dialog =  window.top.$('<div id ="plans-dlg" style="padding:0px;"><iframe id="entInfoFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
	_dialog.dialog({
		title:'选择企业',
		autoOpen:false,
		modal:true,
		closed:true,
		width:'950',
		height:'580',
		buttons:[{
			text:'确定',
			iconCls:'icon-save',
			handler:function(){
					var entId=$("#entInfoFrame",top.document.body).contents().find("#entid").val();				
					var entName=$("#entInfoFrame",top.document.body).contents().find("#name").val();
					var address=$("#entInfoFrame",top.document.body).contents().find("#address").val();
					$("#entname").val(entName);
					$("#entid").val(entId);
					_dialog.dialog('close');
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

//跳转医美图片界面
function detailbeautyinfo(id) {
	$('#beautyversiongrid').datagrid('clearSelections');
	var url = rootPath + "/beauty/beautyinfo/beautyinfo!list.action";
	if (id != "") {
		url = url + "?beautyversionid=" + id;
	}
	var _dialog = window.top
			.$('	<div id ="role-dlg" style="padding:0px;"><iframe id="methodFrame" width="100%" height="100%" frameborder="0" scrolling="no" src=' + url + '></iframe></div>')
			.appendTo(window.top.document.body);
	_dialog.dialog( {
		title : '医美图片',
		autoOpen : false,
		modal : true,
		closed : true,
		width : '700',
		height : '500',
		buttions:[{
			text:'关闭',
			iconCls:'icon-cancel',
			handler:function(){
				_dialog.dialog('close');
			}
		}],
		onClose : function() {
			_dialog.dialog("destroy");
		}
	});
	_dialog.dialog('open');

}