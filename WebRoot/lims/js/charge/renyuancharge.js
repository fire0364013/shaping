$(function(){
	var documentWidth=document.body.clientWidth;
	var versionid = $('#versionid').val();
	var type = $('#type').val();
			$('#renyuanchargedata').datagrid({
				width:documentWidth,
				height:655,
				nowrap: false,
				striped: true,
				collapsible:true,
				url:rootPath +'/charge/renyuan/technicalpositions!torenyuanList.action?versionid='+versionid+"&type="+type, 
				fit:true,
				fitColumns : true,
				scrollbarSize:0,
				singleSelect:false,
				pageSize:20,
				pageList:[20,30,40,50],
				frozenColumns:[[
					{field:'id',checkbox:true,align:"center"}
						]],
				columns:[[
						{field:'name',title:'职称',width:300,align:"center"},
						{field:'price',title:'收费标准（元/人/天）',width:200,align:"center"},
						{field:'operate',title:'操作',width:150,align:"center",
							formatter:function(value,rec,rowIndex){
								var links='<img src="'+rootPath+'/themes/default/images/xiangxiimage.png" alt="详细" id="btnshow" onclick="detail('+ rec.id+')"/>&nbsp;&nbsp;';
								links+='<img src="'+rootPath+'/themes/default/images/bianjiimage.png" alt="编辑" id="btnshow" onclick="addWin('+ rec.id +')"/>&nbsp;&nbsp;';
								links+='<img src="'+rootPath+'/themes/default/images/deleteimage.png" alt="删除" id="btnshow" onclick="del(\''+rec.id+ '\',\''+ rowIndex+'\')"/>';
								return links;
							}
						}						
				]],
				pagination:true,
				rownumbers:true,
				onLoadSuccess:function(){
					$('#renyuanchargedata').datagrid('clearSelections');
				}
			});
			$(window).resize(function() {
				$("#renyuanchargedata").datagrid('resize', {
					width : function() {
						return documentWidth;
					},
					height : function() {
						return document.body.clientHeight;
					}
				});
			});
	});	
		//单条删除
		function del(uid,row){
			$('#renyuanchargedata').datagrid('clearSelections');
			$('#renyuanchargedata').datagrid('selectRow',row);
				if(window.confirm('是否删除？')){
					$.post(rootPath +"/charge/renyuan/technicalpositions!deleteOnlyOne.action",{id:uid},function(del){
						if(del=='success'){
							$('#renyuanchargedata').datagrid('clearSelections');
							$("#renyuanchargedata").datagrid('reload');
							alert('成功');
						}else{
							alert('失败');
						}
					});
				}
		}
		//添加
		function addWin(id){
			var versionid = $('#versionid').val();
		    var type = $('#type').val();
			$('#renyuanchargedata').datagrid('clearSelections');
			var url = rootPath +"/charge/renyuan/technicalpositions!renyuaninput.action?versionid="+versionid+"&type="+type;
			if(id!=""){
				url = url + "&id="+id;
			}
			var _dialog =  window.top.$('	<div id ="role-dlg" style="padding:0px;"><iframe id="renyuanChargeFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
			_dialog.dialog({
				title:'人员外检收费标准编辑',
				autoOpen:false,
				modal:true,
				closed:true,
				width:'700',
				height:'400',
				buttons:[{
					text:'保存',
					iconCls:'icon-save',
					handler:function(){
					
						$("#renyuanChargeFrame",top.document.body).contents().find("#renyuanChargeForm").form('submit',{
							url:rootPath +'/charge/renyuan/technicalpositions!save.action',
							onSubmit:function(){
								var objs = $("#itemChargeFrame",top.document.body).contents().find(".grkj-validate");
								if(!saveCheck(objs)){
									$("#renyuanChargeForm",top.document.body).contents().find(":input").focus();
									alert("数据输入不符合格式，请查看红色边框的输入框的输入提示！");
									return false;
								}
							},
							success:function(data){
								if(data=='success'){
								_dialog.dialog('close');
								$("#renyuanchargedata").datagrid('reload');
								alert('成功');
								}else{
									alert("失败");
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
		//关闭
		function closeAddWin(){
			$('#addWin').window('close');
		}
		//详情
		function detail(id){
			$('#renyuanchargedata').datagrid('clearSelections');
				var url = rootPath +"/charge/renyuan/technicalpositions!renyuanview.action?id="+ id;
				var _dialog =  window.top.$('<div id ="role-dlg" style="padding:0px;"><iframe id="renyuanChargeFrame" width="100%" height="560px;" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
				_dialog.dialog({
					title:'人员外检收费标准详情',
					autoOpen:false,
					maximizable:true,
					modal:true,
					closed:true,
					width:'500',
					height:'400'
				});
				_dialog.dialog('open');
			}
		
		//批量删除	
		function delAll(){
			var selected=$("#renyuanchargedata").datagrid('getSelections');
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
					$.post(rootPath +"/charge/renyuan/technicalpositions!deleteAll.action",{"ids":cc},function(del){
						if(del=='success'){
							$('#renyuanchargedata').datagrid('clearSelections');
							$("#renyuanchargedata").datagrid('reload');
							alert('成功');
						}
					});
				 }
			}
		}

	
