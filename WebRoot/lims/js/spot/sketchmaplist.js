var idfild=[];	
$(function(){
		$('#datagrid1').datagrid({
					height:655,
					nowrap: false,
					striped: true,
					collapsible:true,
					url:rootPath +'/spot/sketchmap/projectpointsketchmap!getSkectmapData.action?projectcode='+projectcode, 
					fit:true,
					fitColumns : true,
					scrollbarSize:0,
					remoteSort: false,
					idField:'sketchid',
					singleSelect:false,
					pageSize:20,
					pageList:[20,30,40,50],
					frozenColumns:[[
							{field:'sketchid',checkbox:true,align:"center"}
						]],
					columns:[[
							{field:'entname',title:'企业',width:425,align:"center"},	
							{field:'typename',title:'类型',width:425,align:"center"},
							{field:'pointname',title:'监测点名称',width:425,align:"center"},
							{field:'pointsketchmapname',title:'示意图文件',width:420,align:"center",
								formatter:function(value,rec,rowIndex){
									if(rec.flag!=""){
										return "<a style='color: blue; cursor: pointer;font-size:13px' onclick=downLoad('"+rec.pointsketchmap+"')  >"+value+"</a>" ;
									}
								}
							},
							{field:'operate',title:'操作',width:120,align:"center",
								formatter:function(value,rec,rowIndex){
//									if(rec.flag!=""){
//										var links="<img src='"+rootPath+"/themes/default/images/bianjiimage.png' alt='编辑'  id='btnshows' onclick='editWin(\""+ rec.id +"\",\""+rec.monitorpointid+"\")'/>&nbsp;&nbsp;";
										var links = "<img src='"+rootPath+"/themes/default/images/deleteimage.png'   alt='删除' id='btnshow' onclick='del("+ rec.sketchid +","+rowIndex+")'/>";
										return links;
//									}
								}
							}						
					]],
					pagination:true,
					rownumbers:true,
					onLoadSuccess:function(){
						
					}
				});
				$(window).resize(function() {
					$("#datagrid1").datagrid('resize');
				});
	});
		//修改
		function editWin(id,monitorpointid){
			$('#datagrid1').datagrid('clearSelections');
			var url = rootPath +'/monitorproject/sketchmap/projectpointsketchmap!input.action?projectcode='+projectcode+'&id='+id;
			if(monitorpointid==""){
				url+="&buttonFunc=type";
			}else{
				url+="&buttonFunc=ponit";
			}
			var _dialog =  window.top.$('	<div id ="role-dlg" style="padding:0px;"><iframe id="sketchmapeditFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
			_dialog.dialog({
				title:'修改示意图',
				autoOpen:false,
				modal:true,
				closed:true,
				width:'600',
				height:'500',
				buttons:[{
					text:'保存',
					iconCls:'icon-save',
					handler:function(){
						$("#sketchmapeditFrame",top.document.body).contents().find("#sketchmapform").form('submit',{
							url:rootPath +'/monitorproject/sketchmap/projectpointsketchmap!save.action',
							onSubmit:function(){
								var filename=$("#sketchmapeditFrame",top.document.body).contents().find("#filec").val();
								if(filename!=null && filename!=""){
									if(!window.confirm("是否放弃上传图片")){
										return false;
									}
								}
								var filePath=$("#sketchmapeditFrame",top.document.body).contents().find("#filePath").val();
								if(filePath==null||filePath==""){
									alert("请选择一个图片！");
									return false;
								}
							},
							success:function(data){
								_dialog.dialog('close');
								$("#datagrid1").datagrid('reload'); 
								alert('成功');
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
		//添加
		function addWin(){
			$('#datagrid1').datagrid('clearSelections');
			var url = rootPath +'/spot/sketchmap/projectpointsketchmap!toAdd.action?projectcode='+projectcode;
			var _dialog =  window.top.$('	<div id ="role-dlg" style="padding:0px;"><iframe id="sketchmapFrame2" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'>77</iframe>		</div>').appendTo(window.top.document.body);
			_dialog.dialog({
				title:'添加示意图',
				autoOpen:false,
				modal:true,
				closed:true,
				width:'600',
				height:'500',
				buttons:[{
					text:'保存',
					iconCls:'icon-save',
					handler:function(){
						$("#sketchmapFrame2",top.document.body).contents().find("#sketchmapform").form('submit',{
							url:rootPath +'/spot/sketchmap/projectpointsketchmap!saveProjectPointSketch.action',
							onSubmit:function(){
//								//验证图片格式
//								var filename=$("#sketchmapFrame2",top.document.body).contents().find("#filec").val();
//								if(filename!=null && filename!=""){
//									if(!window.confirm("是否放弃上传图片")){
//										return false;
//									}
//								} //class="grkj-validate" 
//								//验证红色星号是否全部填写
//								var saveWay=$("#sketchmapFrame2",top.document.body).contents().find("#monitoridSaveWay").val();
//								if(saveWay=="2"){
//									$("#sketchmapFrame2",top.document.body).contents().find("#monitorponitid").addClass("grkj-validate");
//								}else if(saveWay=="1"){
//									$("#sketchmapFrame2",top.document.body).contents().find("#monitorponitid").removeClass();
//								}
//								var objs = $("#sketchmapFrame2",top.document.body).contents().find(".grkj-validate");
//								if(!saveCheck(objs)){
//									$("#sketchmapFrame2",top.document.body).contents().find("#ponitType").focus();
//									$("#sketchmapFrame2",top.document.body).contents().find("#monitoridSaveWay").focus();
//									if(saveWay=="2"){
//										$("#sketchmapFrame2",top.document.body).contents().find("#monitorponitid").focus();
//									}
//									alert("请查看带有红色星号的是否全部填写！");
//									return false;
//								}
//								//检查是否选择了图片
//								var filePath=$("#sketchmapFrame2",top.document.body).contents().find("#filePath").val();
//								if(filePath==null||filePath==""){
//									alert("请选择一个图片！");
//									return false;
//								}
							},
							success:function(data){
								_dialog.dialog('close');
								$("#datagrid1").datagrid('reload'); 
								alert('成功');
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
		
		//下载
		function downLoad(filename){
			/* var name=encodeURIComponent(encodeURIComponent(filename.toString()));
			$.ajax({
				type: "POST",
				url: rootPath +"/monitorproject/sketchmap/projectpointsketchmap!downLoadY.action",
				data: "path="+name+"&flg=0",
				processData :false,
				success:function(data){
					if(data=="fail"){
						alert("文件不存在！");
					}else{
						var urlParmDown=rootPath +"/monitorproject/sketchmap/projectpointsketchmap!downLoadY.action?path="+name+"&flg=1";
						$("#methoddownload").attr("action",urlParmDown);
						$("#path").val(name);
						$("#methoddownload").submit();
					}
				},
				error:function(data){
					alert("服务器正在维修，请稍后！");
				}
			});*/
			var url = rootPath +'/lims/reportFiles/pointSketchMapFiles/'+filename;
			//var url=rootPath+'/monitorproject/sketchmap/projectpointsketchmap!showPicture.action?filename='+filename;
			//var url=rootPath+'/monitorproject/sketchmap/projectpointsketchmap!showPicture.action?filename='+encodeURIComponent(encodeURIComponent(filename));
			var _dialog =  window.top.$('<div id ="role-dlg" style="padding:0px;"><iframe id="filnameFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
			_dialog.dialog({
				title:'示意图',
				autoOpen:false,
				modal:true,
				closed:true,
				width:'700',
				height:'600',
				onClose:function(){
					_dialog.dialog("destroy");
				}
			});
			_dialog.dialog('open');
		}
		
		//单条删除
		function del(uid,rowIndex){
			$('#datagrid1').datagrid('clearSelections');
				if(window.confirm('是否删除？')){
					$.post(rootPath +"/spot/sketchmap/projectpointsketchmap!deleteOnlyOne.action",{id:uid},function(del){
						if(del=='success'){
							$('#datagrid1').datagrid('clearSelections');
							$("#datagrid1").datagrid('reload');
							alert('成功');
						}
						
					});
				}
		}
		
		//批量删除	
		function delAll(){
			var selected=$("#datagrid1").datagrid('getSelections');
			alert(selected.length);
			if(selected==null || selected.length< 1){
				
				alert('请至少选择一条记录！');
			}
			else{
				if(window.confirm('是否删除？')){
					var cc=[];
					for ( var i = 0; i < selected.length; i++) {
						if(selected[i].flag!=""){
						if(cc==""){
								cc+=selected[i]['sketchid'];
						}
						else{
							cc+=","+selected[i]['sketchid'];
							}
						}
					}
					$.post(rootPath +"/spot/sketchmap/projectpointsketchmap!deleteAll.action",{id:cc},function(del){
						if(del=='success'){
							$('#datagrid1').datagrid('clearSelections');
							$("#datagrid1").datagrid('reload');
							alert('成功');
						}
					});
					
				 }
			}
		}
		
		