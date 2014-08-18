		//写下载
		function download(filename){
			var name=encodeURIComponent(encodeURIComponent(filename.toString()));
			$.ajax({
				type: "POST",
				url: rootPath +"/material/standardinventory/standardinventory!downLoad.action",
				data: "path="+name+"&flg=0",
				processData :false,
				success:function(data){
					if(data=="fail"){
						alert("文件不存在！");
					}else{
						var urlParmDown=rootPath +"/material/standardinventory/standardinventory!downLoad.action?path="+name+"&flg=1";
						/*$("#form").attr("action",urlParmDown);
						$("#form").submit();*/
						$("#methoddownload").attr("action",urlParmDown);
						$("#path").val(name);
						$("#methoddownload").submit();
					}
				},
				error:function(data){
					alert("服务器正在维修，请稍后！");
				}
			});
		}
			//弹出选择供应商 页面
			function selecTmaterialFocus(){
				var providername=encodeURIComponent(encodeURIComponent($("#providername").val()));
				var providerid=$("#providerid").val();
			var url =  rootPath +"/material/providerinfo/providerinfo!selectList.action?providername="+providername+"&providerid="+providerid;
			var _dialog =  window.top.$('<div id ="cert-dlg" style="padding:0px;"><iframe id="purchaseFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
			_dialog.dialog({
				title:'供应商',
				autoOpen:false,
				modal:true,
				closed:true,
				width:'800',
				height:'500',
				buttons:[{
					text:'确定',
					iconCls:'icon-save',
					handler:function(){		
					var selectedUser=$("#purchaseFrame",top.document.body).contents().find("#selectedUser").val();//保管人
					$("#providername").val(selectedUser);
					var selectedUserid=$("#purchaseFrame",top.document.body).contents().find("#selectedUserid").val();//id
					$("#providerid").val(selectedUserid);
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
			//删除附件
			function delefujian(filename,num){
				var inventoryid=$("#inventoryid").val();
				$.post( rootPath +"/material/standardinventory/standardinventory!deleteFuJian.action",{filename:filename,inventoryid:inventoryid},function(del){
					if(del=='success'){
						$("#wenjian"+num).hide();
						$.post(rootPath +"/material/standardinventory/standardinventory!selcetname.action",{inventoryid:inventoryid},function(del){
							$("#attanchment").val(del);
						});
					}
				});
			}
function initMixDataGrid2(id) {
	$('#mixdatalist').datagrid(
					{
						nowrap : false,
						striped : true,
						collapsible : true,
						singleSelect:true,
						url:rootPath +'/material/standardinventory/standardinventory!initMixDataList.action?inventoryid='+id, 
						remoteSort : false,
						idField : 'mixid',
						fit : true,
						fitColumns : true,
						scrollbarSize : 0,
						columns : [ [
								{
									field : 'mixname',
									title : '物质名称',
									width : 80,
									align : 'center'
								},
								{
									field : 'consistence',
									title : '浓度',
									width : 50,
									align : "center"
								},
								{
									field : 'uncertainty',
									title : '不确定度',
									width : 80,
									align : 'center'
								},{
									field : 'option',
									title : '操作',
									width : 50,
									align : 'center',
									formatter : function(value, rec,rowIndex) {
										var links='<img class="img5" alt="修改" src="'+rootPath+'/themes/default/images/bianjiimage.png" onclick="addMixData2(\''+rec.mixid+'\')"/>&nbsp;';
										links+='<img src="'+rootPath+'/themes/default/images/deleteimage.png" alt="删除"  id="btnshow" onclick="delMixData(\''+rec.mixid+'\')"/>&nbsp;';
										return links;
										}
								} ] ],
						rownumbers : true
					});		
	$(window).resize(function() {
		$("#mixdatalist").datagrid('resize');
	});
}


function addMixData2(id){
	var url ="";
	if(id!=null && id!=""){
		url = rootPath + "/material/standardinventory/standardinventory!tomixdata.action?mixid="+id+"&inventoryid="+inventoryid;
	}else{
		url = rootPath + "/material/standardinventory/standardinventory!tomixdata.action?inventoryid="+inventoryid;
	}
	var _dialog =  window.top.$('<div id ="materialsinfo-dlg" style="padding:0px;"><iframe id="mixdataFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
	_dialog.dialog({
	title:'混标信息编辑',
	autoOpen:false,
	modal:true,
	closed:true,
	width:'300',
	height:'200',
	buttons:[{
		text:'保存',
		iconCls:'icon-save',
		handler:function(){
			$("#mixdataFrame",top.document.body).contents().find("#mixdataForm").form('submit',
				{
					url:rootPath + "/material/standardinventory/standardinventory!saveMixdata.action",
					onSubmit:function(){
						var objs = $("#mixdataFrame",top.document.body).contents().find(".grkj-validate");
						
						if(!saveCheck(objs)){
							$("#mixdataFrame",top.document.body).contents().find(":input").focus();
							alert("数据输入不符合格式，请查看红色边框的输入框的输入提示！");
							return false;
						}
					},
					success : function(data) {
						if (data == 'success') {
							_dialog.dialog('close');
							$("#mixdatalist").datagrid('reload');
							alert('保存成功！');
						}else{
							alert("添加失败！");
							return;
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