//-----Au-----wjy~~
$(document).ready(function() {
	initDataGrid();
//	if(document.getElementById('iframe_'))
//	{
//		var analysissparamid = $('#analysissparamid').val();
//		document.getElementById('iframe_').style.display = "none";
//		document.getElementById('iframe_').src = "";
//		if(analysissparamid != '')
//		{
//			document.getElementById('iframe_').style.display = "";
//			document.getElementById('iframe_').src = rootPath +"/analyse/analyseparam/qualitycontrolset!list.action?" +//tlmQualityControlsetList
//			"analysissparamid=" + $('#analysissparamid').val() +"&iframeType="+$('#iframeType').val();
//		}
//	}
//只有增加、修改~初始化的时候需要传参~~methodid~itemid
});

// 页面加载，数据的展示~~datagrid~~analysissparamgrid
function initDataGrid() {
	var itemid=$("#itemid").val();
	var methodid=$("#methodid").val();
	$('#analysissparamgrid').datagrid(
					{
						nowrap : false,
						striped : true,
						collapsible : true,
						url : 'analyseparameter!analyseList.action?itemid='+itemid+'&methodid='+methodid, 
						remoteSort : false,						
						fit : true,
						fitColumns : true,
						scrollbarSize : 0,
						singleSelect:true,
						columns : [ [
								{
									field : 'paramname',
									title : '参数名称',
									width : 90,
									align : 'left'
								},
								{
									field : 'expression',
									title : '计算公式',
									width : 170,
									align : 'left'
								},
								{
									field : 'limit',
									title : '最低检出限',
									width : 60,
									align : 'center'
								},
								{
									field : 'unitid',
									title : '计量单位',
									width : 60,
									align : 'center'
								},
								{
									field : 'datatype',
									title : '数据类型',

									width : 80,
									align : "center"
								},
								{
									field : 'significantdigit',
									title : '有效数<br>字位数',

									width : 35,
									align : "center"
								},
								{
									field : 'decimaldigit',
									title : '小数<br>位数',

									width : 25,
									align : "center"
								},
								{
									field : 'isresult',
									title : '是否结<br>果参数',
									width : 35,
									align : "center",
									formatter : function(value){
									if(value=='Y'){
									return "<input type='checkbox' name='checkbox' disabled='disabled' checked='checked'/>";
									}else{
										return "<input type='checkbox' name='checkbox' disabled='disabled'/>";
									}}
							
								},
								{
									field : 'isreportshow',
									title : '是否在报<br>告中显示',
									width : 45,
									align : "center",
									formatter : function(value){
									if(value=='Y'){
									return "<input type='checkbox' name='checkbox' disabled='disabled' checked='checked'/>";
									}else{
										return "<input type='checkbox' name='checkbox' disabled='disabled'/>";
									}}
							
								},
								{
									field : 'orderid',
									title : '排序',

									width : 35,
									align : "center"
								}] ],
					
						rownumbers : true,
						onRowContextMenu:function(e,row,rowData){
						var itemflag=$("#itemflag").val();
							$('#editWin').removeAttr("disabled");
							$('#del').removeAttr("disabled");
							$('#detail').removeAttr("disabled");
							//火狐
							$('#editWin').removeClass("disable");
							$('#del').removeClass("disable");
							$('#detail').removeClass("disable");
						if(itemflag=='0'){
						$('#analysissparamgrid').datagrid('selectRow',parseInt(row));
						$("#method-menu").menu("show", {left: e.pageX,top: e.pageY});
						$("#savedata").val(rowData['analysissparamid']);
						e.preventDefault();
						}
						},
						onHeaderContextMenu:function(e,field){
							var itemflag=$("#itemflag").val();
								$('#editWin').attr({disabled:"true"});
								$('#del').attr({disabled:"true"});
								$('#detail').attr({disabled:"true"});
								//火狐
								$('#editWin').addClass("disable");
								$('#del').addClass("disable");
								$('#detail').addClass("disable");
							if(itemflag=='0'){
							$('#method-menu').menu('show', {
								left: e.pageX,
								top: e.pageY
						});
							e.preventDefault();
							}
						}
					});
	$(window).resize(function() {
		$("#analysissparamgrid").datagrid('resize');
	});
}


//单条删除
function del(id){
	if($("#del").attr("disabled")=="disabled"){
		return false;
	}
	var did='';
	if(id=='id'){
		did=$("#savedata").val();
	}
		if(window.confirm('是否删除？')){
			$.post(rootPath +"/analyse/analyseparam/analyseparameter!deleteOnlyOne.action",{id:did},function(del){
				if(del=='success'){
					$('#analysissparamgrid').datagrid('clearSelections');
					$("#analysissparamgrid").datagrid('reload');
					alert('删除成功');
				}else{
					alert("删除失败");
				}
				
			});
		}
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
		var url = rootPath +"/analyse/analyseparam/analyseparameter!view.action?id="+did;
		var _dialog =  window.top.$('<div id ="role-dlg" style="padding:0px;"><iframe  width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
		_dialog.dialog({
			title:'分析参数详情',
			autoOpen:false,
			modal:true,
			closed:true,
			width:'700',
			height:'400'
		});
		_dialog.dialog('open');
	}

//添加
function addWin(id){
	var itemid=$("#itemid").val();
	var methodiddata=$("#methodid").val();
	var did="";
	if(id=='id'){
		did=$("#savedata").val();
	}
	var envparamid=$("#envparamid").val();

	var url = rootPath +"/analyse/analyseparam/analyseparameter!input.action?itemid="+itemid+"&methodid="+methodiddata;
	if(did!=""){
		url = url + "?id="+did;
	}

	var _dialog =  window.top.$('	<div id ="role-dlg" style="padding:0px;"><iframe id="analysissparamFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);

	_dialog.dialog({
		title:'分析参数编辑',
		autoOpen:false,
		modal:true,
		closed:true,
		width:'700',
		height:'450',
		buttons:[{
			text:'保存',
			iconCls:'icon-save',
			handler:function(){
			
				$("#analysissparamFrame",top.document.body).contents().find("#analyseform").form('submit',{
					url:rootPath +'/analyse/analyseparam/analyseparameter!save.action',
					onSubmit:function(){
					var objs= $("#analysissparamFrame",top.document.body).contents().find(".grkj-validate");
					if(!saveCheck(objs)){
						$("#analysissparamFrame",top.document.body).contents().find(":input").focus();
						alert("数据输入不符合格式，请查看红色边框的输入框的输入提示！");
						return false;
					}
						var zzs=/\d+(\.\d)?\d*/;//实数
					var defaultvalue=$("#analysissparamFrame",top.document.body).contents().find("#defaultvalue").val();//默认值
					var datatype=$("#analysissparamFrame",top.document.body).contents().find("#datatype").val();//数据类型
					if(defaultvalue==""||defaultvalue=="\\"){
						
					}else{
						if(datatype=="数字型"){
							if(zzs.test(defaultvalue)){
								
							}else{
								$("#analysissparamFrame",top.document.body).contents().find("#defaultvalue")[0].focus();
								// $("#defaultvalue").css("border","1px solid #A6C9E2");
								//$("#defaultvalue").addClass("grkj-validate-border");
							//	$("#defaultvalue")..attr("isshow","true");
								alert("默认值应为数字类型，请重新填写！");
								return false;
							}
						} 
					}
					},
					success:function(data){
						if(data=='success'){
							_dialog.dialog('close');
							$("#analysissparamgrid").datagrid('reload');
							alert('保存成功');
						}else if(data=='exist'){
							alert("该分析参数已经存在，请确认输入！");
						}else if(data=='fail'){
							alert("保存失败");
						}
						},
					error:function(){
						alert("保存失败");
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



//修改
function editWin(id){
	if($("#editWin").attr("disabled")=="disabled"){
		return false;
	}
	var itemid=$("#itemid").val();
	var methodiddata=$("#methodid").val();
	var did="";
	if(id=='id'){
		did=$("#savedata").val();
	}
	var envparamid=$("#envparamid").val();

	var url = rootPath +"/analyse/analyseparam/analyseparameter!input.action?itemid="+itemid+"&methodid="+methodiddata;
	if(did!=""){
		url = url + "&id="+did;
	}
	var _dialog =  window.top.$('<div id ="role-dlg" style="padding:0px;"><iframe id="analysissparamFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
	_dialog.dialog({
		title:'分析参数编辑',
		autoOpen:false,
		modal:true,
		closed:true,
		width:'1100',
		height:'600',
		buttons:[{
			text:'保存',
			iconCls:'icon-save',
			handler:function(){
				$("#analysissparamFrame",top.document.body).contents().find("#analyseform").form('submit',{
					url:rootPath +'/analyse/analyseparam/analyseparameter!save.action?id='+did,
					onSubmit:function(){
					var objs= $("#analysissparamFrame",top.document.body).contents().find(".grkj-validate");
					if(!saveCheck(objs)){
						$("#analysissparamFrame",top.document.body).contents().find(":input").focus();
						alert("数据输入不符合格式，请查看红色边框的输入框的输入提示！");
						return false;
					}
					
					
					//var zzs =  /^[0-9]*[0-9][0-9]*$/;　　//正整数 
					
					var zzs=/\d+(\.\d)?\d*/;//实数
					var defaultvalue=$("#analysissparamFrame",top.document.body).contents().find("#defaultvalue").val();//默认值
					var datatype=$("#analysissparamFrame",top.document.body).contents().find("#datatype").val();//数据类型
					if(defaultvalue==""||defaultvalue=="\\\\"){
						
					}else{
						if(datatype=="数字型"){
							if(zzs.test(defaultvalue)){
								
							}else{
								$("#analysissparamFrame",top.document.body).contents().find("#defaultvalue")[0].focus();
								// $("#defaultvalue").css("border","1px solid #A6C9E2");
								//$("#defaultvalue").addClass("grkj-validate-border");
							//	$("#defaultvalue")..attr("isshow","true");
								alert("请输入数字型的默认值！");
								return false;
							}
						} 
					}
					},
					success:function(data){
						if(data=='success'){
							_dialog.dialog('close');
							$("#analysissparamgrid").datagrid('reload');
							alert('保存成功');
						}else if(data=='exist'){
							alert("该分析参数已经存在，请确认输入！");
						}else if(data=='fail'){
							alert("保存失败");
						}
					},
					error:function(){
						alert("修改失败");
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
