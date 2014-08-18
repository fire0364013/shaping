$(function(){
	var documentWidth=document.body.clientWidth;
	var itemid=$("#itemid").val();
			$('#itemmethoddata').datagrid({
				title:'分析方法',
				nowrap: false,
				striped: true,
				collapsible:true,
				url:rootPath +'/analyse/method/itemmethod!toList.action?itemid='+itemid, 
				fit:true,
				fitColumns : true,   
				remoteSort: false,
				idField:'itemmethodid',
				singleSelect:true,
				rownumbers:true,
				scrollbarSize:0,
				columns:[[
				          {field:'analysemethodid',hidden:true},
						{field:'analysemethodname',title:'分析方法',width:500,align:"left"},
						{field:'remark',title:'备注',width:100,align:"center"}, 
						{field:'isdefault',title:'是否默认',width:75,align:"center",
							formatter : function(value) {
							if(value=="Y"){
								return "是";
							}else if(value=="N"){
								return "否";
							}}}
				]],
				onRowContextMenu:function(e,row,rowData){
				var itemflag=$("#itemflag").val();
				//IE
				$('#editWin').removeAttr("disabled");
				$('#del').removeAttr("disabled");
				//火狐
				$('#editWin').removeClass("disable");
				$('#del').removeClass("disable");
				if(itemflag=='0'){
				$('#itemmethoddata').datagrid('selectRow',parseInt(row));
				$("#method-menu").menu("show", {left: e.pageX,top: e.pageY});
				$("#savedata").val(rowData['itemmethodid']);
				$("#analysemethodid").val(rowData['analysemethodid']);//分析方法
				e.preventDefault();
				}
				},
				onHeaderContextMenu:function(e,field){
					var itemflag=$("#itemflag").val();
					//IE
					$('#editWin').attr({disabled:"disable"});
					$('#del').attr({disabled:"disable"});
					//火狐
					$('#editWin').addClass("disable");
					$('#del').addClass("disable");
					
					if(itemflag=='0'){
					$('#method-menu').menu('show', {left: e.pageX,top: e.pageY});
					e.preventDefault();
					}
				},onSelect:function(rowIndex, rowData){
					var itemid=$("#itemid").val();
					var itemflag=$("#itemflag").val();
					$("#otherFrame",window.parent.document).contents().find("#analyment").attr("src", "");
					$("#otherFrame",window.parent.document).contents().find("#enveronmentparameter").attr("src", "");
					$("#otherFrame",window.parent.document).contents().find("#analyseparameter").attr("src", ""); 
					$("#otherFrame",window.parent.document).contents().find("#calibrateparameter").attr("src", "");		
					$("#otherFrame",window.parent.document).contents().find("#itemid").val(itemid);	
					$("#otherFrame",window.parent.document).contents().find("#itemflag").val(itemflag);		
					$("#otherFrame",window.parent.document).contents().find("#methodids").val(rowData.analysemethodid);
 					if(rowData!=null){
 						$("#otherFrame",window.parent.document).contents().find("#analyseperson").attr("src", "");
 						$("#otherFrame",window.parent.document).contents().find("#analyseperson").attr("src",
 							rootPath +"/analyse/analyseset/analyseset!list.action?itemid="+itemid+"&methodid="+rowData.analysemethodid+"&itemflag="+itemflag);
 					} 
 				 	$("#otherFrame",window.parent.document).contents().find("#hdnButton").click();
				},onLoadSuccess:function(){
 				//默认加载第一行的基本信息
					var itemid=$("#itemid").val();
					var itemflag=$("#itemflag").val();
 					$('#itemmethoddata').datagrid('selectRow',0);
 					var rowData = $('#itemmethoddata').datagrid('getSelected');
 					$("#otherFrame",window.parent.document).contents().find("#itemid").val(itemid);	
					$("#otherFrame",window.parent.document).contents().find("#itemflag").val(itemflag);		
					
 					if(rowData!=null){
 						$("#otherFrame",window.parent.document).contents().find("#methodids").val(rowData.analysemethodid);
 						$("#otherFrame",window.parent.document).contents().find("#analyseperson").attr("src",
 							rootPath +"/analyse/analyseset/analyseset!list.action?itemid="+itemid+"&methodid="+rowData.analysemethodid+"&itemflag="+itemflag);
 					}
 					$("#otherFrame",window.parent.document).contents().find("#hdnButton").click();
 			}
			});
			$(window).resize(function() {
				$("#itemmethoddata").datagrid('resize');
			});
			
	});	
		//添加
		function addWin(id){
			var did="";
			if(id=='id'){
				did=$("#savedata").val();
				if($("#editWin").attr("disabled")=="disabled"){
					return false;
				}
			}
			var itemid=$("#itemid").val();
			var url = rootPath +"/analyse/method/itemmethod!input.action?itemid="+itemid;
			if(did!=""){
				url = url + "&id="+did;
			}
			var _dialog =  window.top.$('	<div id ="role-dlg" style="padding:0px;"><iframe id="itemmethodFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
			_dialog.dialog({
				title:'分析方法编辑',
				autoOpen:false,
				modal:true,
				closed:true,
				width:'370',
				height:'250',
				buttons:[{
					text:'保存',
					iconCls:'icon-save',
					handler:function(){
						$("#itemmethodFrame",top.document.body).contents().find("#menthodform").form('submit',{
							url:rootPath +'/analyse/method/itemmethod!save.action',
							onSubmit:function(){
								var objs = $("#itemmethodFrame",top.document.body).contents().find(".grkj-validate");
								if(!saveCheck(objs)){
									$("#itemmethodFrame",top.document.body).contents().find("#danalysename").focus();
									$("#itemmethodFrame",top.document.body).contents().find("#samplingmename").focus();
									alert("数据输入不符合格式，请查看红色边框的输入框的输入提示！");
									return false;
								}
							},
							success:function(data){	
								if(data=='success'){
									_dialog.dialog('close');
									$("#itemmethoddata").datagrid('reload');
									alert('保存成功');
								}else if(data=='exist'){
									alert("该分析方法已经存在，请确认输入！");
								}else if(data=='fail'){
									alert("保存失败");
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
			if($("#detail").attr("disabled")=="disabled"){
				return false;
			}
			var did='';
			if(id=='id'){
				did=$("#savedata").val();
			}
				var url = rootPath +"/analyse/method/itemmethod!view.action?id="+did;
				var _dialog =  window.top.$('	<div id ="role-dlg" style="padding:0px;"><iframe  width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
				_dialog.dialog({
					title:'分析方法详情',
					autoOpen:false,
					modal:true,
					closed:true,
					width:'600',
					height:'200'
				});
				_dialog.dialog('open');
			}
		//单条删除
		function del(id){
			if($("#del").attr("disabled")=="disabled"){
				return false;
			}
			var did='';
			var itemid='';
			var analysemethodid='';
			if(id=='id'){
				did=$("#savedata").val();
				itemid=$("#itemid").val();
				methodid=$("#analysemethodid").val();
			}
				if(window.confirm('是否删除？')){
					$.post(rootPath +"/analyse/method/itemmethod!deleteOnlyOne.action?id="+did+"&itemid="+itemid+"&methodid="+methodid,function(del){
						if(del=='success'){
							$('#itemmethoddata').datagrid('clearSelections');
							$("#itemmethoddata").datagrid('reload');
							alert('删除成功');
						}
						if(del=='error'){
							alert("删除失败");
						}
					});
				}
		}
		//显示选择分析方法框
		function showanalyse(flag){
			url=rootPath +"/analyse/method/itemmethod!showsampling.action?flag="+flag;
			var _dialog =  window.top.$('	<div id ="role-dlg" style="padding:0px;"><iframe id="analyseFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
				_dialog.dialog({
					title:'选择分析方法',
					autoOpen:false,
					modal:true,
					closed:true,
					width:'800',
					height:'500',
					buttons:[{
						text:'确定',
						iconCls:'icon-save',
						handler:function(){
						var selectedanalysename=$("#analyseFrame",top.document.body).contents().find("#selectedanalysename").val();
						var selectedanalyseid=$("#analyseFrame",top.document.body).contents().find("#selectedanalyseid").val();
						$("#danalysename").val(selectedanalysename);
						$("#danalysenid").val(selectedanalyseid);
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
		
		//显示采样方法框
		function showsampling(flag){
			url=rootPath +"/analyse/method/itemmethod!showsampling.action?flag="+flag;
			var _dialog =  window.top.$('	<div id ="role-dlg" style="padding:0px;"><iframe id="samplingFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
			_dialog.dialog({
				title:'选择采样方法',
				autoOpen:false,
				modal:true,
				closed:true,
				width:'800',
				height:'500',
				buttons:[{
					text:'确定',
					iconCls:'icon-save',
					handler:function(){
					var selectedanalysename=$("#samplingFrame",top.document.body).contents().find("#selectedmethodname").val();
					var selectedanalyseid=$("#samplingFrame",top.document.body).contents().find("#selectedmethodid").val();
					$("#samplingmename").val(selectedanalysename);
					$("#samplingmeid").val(selectedanalyseid);
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
		
		
		
		//显示采样方法框~用在人员上岗里面
		function showmethod(flag){
			url=rootPath +"/analyse/method/itemmethod!showsampling.action?flag="+flag;
			var _dialog =  window.top.$('	<div id ="role-dlg" style="padding:0px;"><iframe id="samplingFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
			_dialog.dialog({
				title:'选择采样方法',
				autoOpen:false,
				modal:true,
				closed:true,
				width:'700',
				height:'500',
				buttons:[{
					text:'确定',
					iconCls:'icon-save',
					handler:function(){
					var selectedanalysename=$("#samplingFrame",top.document.body).contents().find("#selectedmethodname").val();
					var selectedanalyseid=$("#samplingFrame",top.document.body).contents().find("#selectedmethodid").val();
					$("#methodidname").val(selectedanalysename);
					$("#methodids").val(selectedanalyseid);
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