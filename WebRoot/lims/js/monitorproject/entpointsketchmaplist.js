	$(function(){
		$('#datagrid1').datagrid({
					height:655,
					nowrap: false,
					striped: true,
					collapsible:true,
					url:rootPath +'/monitorproject/entpointsketchmap/entpointsketchmap!getListData.action?nodeid='+nodeid, 
					fit:true,
					fitColumns : true,
					scrollbarSize:0,
					remoteSort: false,
					idField:'sketchmap',
					singleSelect:false,
					pageSize:20,
					pageList:[20,30,40,50],
					frozenColumns:[[
							{field:'sketchmap',checkbox:true,align:"center"}]],
					columns:[[	
					        {field:'monitorpointname',title:'监测点名称',width:420,align:"center"},
							{field:'sketchmapname',title:'示意图文件',width:420,align:"center",
								formatter:function(value,rec,rowIndex){
									return "<a style='color: blue; cursor: pointer;font-size:13px' onclick=download('"+rec.pointsketchmap+"')  >"+value+"</a>" ;
								}
							},
							{field:'operate',title:'操作',width:120,align:"center",
								formatter:function(value,rec,rowIndex){
										var links="<img src='"+rootPath+"/themes/default/images/xiangxiimage.png' alt='编辑'  id='btnshows' onclick='detailPic(\""+rec.pointsketchmap+"\")'/>&nbsp;&nbsp;";
										links+="<img src='"+rootPath+"/themes/default/images/deleteimage.png'   alt='删除' id='btnshow' onclick='del("+ rec.sketchmap +","+rowIndex+")'/>";
										return links;
									
								}
							}						
					]],
					pagination:true,
					rownumbers:true,
					onLoadSuccess:function(){
						$('#datagrid1').datagrid('clearSelections');
					}
				});
				$(window).resize(function() {
					$("#datagrid1").datagrid('resize');
				});
	});
		//增加
		function addWin(){
			$('#datagrid1').datagrid('clearSelections');
			var url = rootPath +"/monitorproject/entpointsketchmap/entpointsketchmap!input.action?nodeid="+nodeid;
			var _dialog =  window.top.$('	<div id ="role-dlg" style="padding:0px;"><iframe id="entmapinputFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
			_dialog.dialog({
				title:'添加测点示意图',
				autoOpen:false,
				modal:true,
				closed:true,
				width:'400',
				height:'200',
				buttons:[{
					text:'保存',
					iconCls:'icon-save',
					handler:function(){
						$("#entmapinputFrame",top.document.body).contents().find("#entchmapform").form('submit',{
							url:rootPath +'/monitorproject/entpointsketchmap/entpointsketchmap!save.action',
							onSubmit:function(){
								var filename=$("#entmapinputFrame",top.document.body).contents().find("#filec").val();
								if(filename!=null && filename!=""){
									var filec=filename.substring(filename.lastIndexOf(".")).toLowerCase();
									if(filec!=".jpg"&&filec!=".jpeg"&&filec!=".gif"&&filec!=".png"&&filec!=".bmp"){
										alert("照片仅支持 jpg,jpeg,gif,png,bmp格式的图片");
										return false;
									}
								} 
							},
							success:function(data){
								if(data=="success"){
								_dialog.dialog('close');
								$("#datagrid1").datagrid('reload'); 
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
		
		
		//查看图片
		function detailPic(filename){
			var url = rootPath +'/lims/entMapFiles/'+filename;
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
		//文件下载
		function download(filename){
			
			var name=encodeURIComponent(encodeURIComponent(filename.toString()));
			$.ajax({
				type: "POST",
				url: rootPath +"/monitorproject/entpointsketchmap/entpointsketchmap!downLoadY.action",
				data: "path="+name+"&flg=0",
				processData :false,
				success:function(data){
					if(data=="fail"){
						alert("文件不存在！");
					}else{
						var urlParmDown=rootPath +"/monitorproject/entpointsketchmap/entpointsketchmap!downLoadY.action?path="+name+"&flg=1";
						$("#entchmapdownload").attr("action",urlParmDown);
						$("#path").val(name);
						$("#entchmapdownload").submit();
					}
				},
				error:function(data){
					alert("服务器正在维修，请稍后！");
				}
			});
		}
		//单条删除
		function del(uid,rowIndex){
			$('#datagrid1').datagrid('clearSelections');
			$('#datagrid1').datagrid('selectRow',rowIndex);
				if(window.confirm('是否删除？')){
					$.post(rootPath +"/monitorproject/entpointsketchmap/entpointsketchmap!deleteOnlyOne.action",{id:uid},function(del){
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
			//alert(selected.length);
			if(selected==null || selected.length< 1){
				alert('请至少选择一条记录！');
			}
			else{
				if(window.confirm('是否删除？')){
					var cc=[];
					for ( var i = 0; i < selected.length; i++) {
						if(selected[i].flag!=""){
						if(cc==""){
								cc+=selected[i]['sketchmap'];
						}
						else{
							cc+=","+selected[i]['sketchmap'];
							}
						}
					}
					$.post(rootPath +"/monitorproject/entpointsketchmap/entpointsketchmap!deleteAll.action",{id:cc},function(del){
						if(del=='success'){
							$('#datagrid1').datagrid('clearSelections');
							$("#datagrid1").datagrid('reload');
							alert('成功');
						}
					});
					
				 }
			}
		}
		
		