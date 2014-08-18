//-----Au-----wjy~~
function initHistoryData(id) {
		$('#historygrid')
				.datagrid(
						{									
							nowrap : false,
							striped : true,						
							collapsible : true,
							url : 'methodversion!methodversionList.action?methodid='+id,
							sortName : 'versionid',
							sortOrder : 'asc',
							remoteSort : false,
							fit:true,
							fitColumns:true,
							scrollbarSize:0,
							pageSize : 10,
							pageList : [10,20, 30, 40 ],
							frozenColumns : [ [ {
								field : 'ck',
								checkbox : true
							} ] ],
							columns : [ [
									{
										field : 'methoddesc',
										title : '方法描述',
										width : 360,
										align : 'center'
									},
									{
										field : 'versionid',
										title : '版本号',
										width : 60,
										align : 'center'
									},
									{
										field : 'path',
										title : '附件',
										width : 200,
										align : "center",
										formatter:function(value,rowData){
										if(rowData.path){
											if(rowData.path!=null){
											var str = rowData.path.split(',');
											var links = "";
											for(var i=0;i<str.length;i++){
												var name=str[i];
												links +='<a style="cursor:pointer"  onclick="return liebiaoloadFile(\''+name+'\');" alt="下载">'+name.substring(13)+'</a><br>';
											}
										return links;
											}
										}else{
											return "";
										}
									}
									},
									{
										field : 'publishdate',
										title : '发布时间',
										width : 100,
										align : "center"
									},
									{
										field : 'option',
										title : '操作',
										width : 60,
										align : 'center',
										formatter : function(value, rec) {
											var links = '<img src="'
													+ rootPath
											+ '/themes/default/images/bianjiimage.png" id="btnshow"  onclick="addVer(\''+rec.methodid+'\','+rec.versionid+')" alt="编辑"/>&nbsp;&nbsp;';
								
											return links;
										}
									} ] ],
							pagination : true,
							rownumbers : true
						});
		$(window).resize(function(){
			$("#historygrid").datagrid('resize');
		});
	}

//文件名称转义
function URLencode(sStr) 
{
    return encodeURI(sStr).replace(/\+/g, '%2B').replace(/\"/g,'%22').replace(/\'/g, '%27').replace(/\//g,'%2F');
}

/**
 * 下载的时候使用的方法~~
 * @param name
 * @return
 */
function liebiaoloadFile(name){
	//var encodeParm=URLencode(URLencode(name.toString()));
	var encodeParm=encodeURIComponent(encodeURIComponent(name.toString()));
	var urlParm=rootPath +'/method/methodversion!downLoad.action?path='+encodeParm+"&flg="+"0";
	$.ajax({
		type:"POST",
		url:urlParm,
		success:function(data){
			cache:false;
		if(data=="success"){
			var urlParmDown=rootPath +'/method/methodversion!downLoad.action?path='+encodeParm+"&flg="+"1";
			$("#methoddownload").attr("action",urlParmDown);
			$("#path").val(name);
			$("#methoddownload").submit();
		}else{			
			alert("当前文件不存在");
			}
		},
		error:function(data){
			alert("服务器正在维修，请稍后！");
		}
	}
);	
}

//修改
function addVer(methodid,versionid)  {
	var url = rootPath + "/method/methodversion!input.action";
	if (methodid != ""&&versionid!="") {
		url = url + "?methodid=" + methodid+"&versionid="+versionid;
	}
	var _dialog = window.top
			.$('<div id ="role-dlg" style="padding:0px;"><iframe id="methodFrame" width="100%" height="100%" frameborder="0" scrolling="no" src=' + url + '></iframe></div>')
			.appendTo(window.top.document.body);
	_dialog.dialog( {
		title : '版本编辑',
		autoOpen : false,
		modal : true,
		closed : true,
		width : '450',
		height : '400',
		buttons : [
				{
					text : '保存',
					iconCls : 'icon-save',
					handler : function() {
					var methoddesc = $("#methodFrame",top.document.body).contents().find('#methoddesc').val();
					if (methoddesc == "") {
						$("#methodFrame",top.document.body).contents().find('#methoddesc').focus();
						alert("数据输入不符合格式，请查看红色边框的输入框的输入提示！");
						return false;
					} else {
						$("#methodFrame",top.document.body).contents().find(
								"#methodversionform").form('submit', {
							url : rootPath + "/method/methodversion!save.action?methodid="+methodid+"&versionid="+versionid,
							onSubmit : function() {
							},
							success : function(data) {						
								if(data=='success'){
									_dialog.dialog('close');
									alert("保存成功！");
									$("#historygrid").datagrid('reload');
								}else{
										alert("保存失败！");
										return ;
								}
							},
							error:function(data){
								if(data=='fail'){
									alert("保存失败！");
									return ;
								}
							}
						});
					}
					}
				}, {
					text : '取消',
					iconCls : 'icon-cancel',
					handler : function() {
						_dialog.dialog('close');
					}
				} ],
		onClose : function() {
			_dialog.dialog("destroy");
		}
	});
	_dialog.dialog('open');
}



//删除功能~批量
function delAll(methodid) {
	var selected = $('#historygrid').datagrid('getSelections');
	if (selected != null && selected != "") {
		if (window.confirm("是否删除？")) {
			var selcheck = new Array();
			for ( var i = 0; i < selected.length; i++) {
				selcheck[i] = selected[i].versionid;
			}
			$.post(rootPath + "/method/methodversion!betchDeleteMethod.action?id="
					+ selcheck+"&methodid="+methodid, function(del) {
				if (del == 'success') {
					alert("删除成功!");
					$("#historygrid").datagrid('reload');
				}else{
					alert("删除失败!");
					$("#historygrid").datagrid('reload');
				}
			});

		}
	} else {
		alert('请至少选择一条记录！');
		return;
	}
}



	
/**
 * 下载的时候使用的方法~~
 * @param name
 * @return
 */
function loadFile(name){
	  var encodeParm=encodeURIComponent(encodeURIComponent(name.toString()));
	var urlParm=rootPath +"/method/methodversion!downLoad.action?path="+encodeParm+"&flg="+"0";
	$.ajax({
		type:"POST",
		url:urlParm,
		success:function(data){
			cache:false;
		if(data=="success"){
			var urlParmDown=rootPath +"/method/methodversion!downLoad.action?path="+encodeParm+"&flg="+"1";
			$("#methodversionform").attr("action",urlParmDown);
			$("#methodversionform").submit();
		}else{			
			alert("当前文件不存在");
			}
		},
		error:function(data){
			alert("服务器正在维修，请稍后！");
		}
	}
);	
}


/**
 * 删除附件的时候使用的方法
 * @param filename
 * @return
 */
function delefujian(filename,id,methodid,num){
	if (window.confirm("是否删除 " + filename.substring(13) + " ？")) {
	var encodeParm=encodeURI(encodeURI(filename.toString()));
	$.ajax( {
		type : 'GET',
		url : rootPath +'/method/methodversion!deleteFuJian.action?filname='+encodeParm+'&flagName='+id+"&methodid="+methodid,
		success : function(data) {
			alert("文件 "+filename.substring(13)+" 已经删除");
			$("#anjian"+num+",#wenjian"+num).hide();
		},
		error:function(data){
			alert("删除失败");
		}
	});
	}
}
	

