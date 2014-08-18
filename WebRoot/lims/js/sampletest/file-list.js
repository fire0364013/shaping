function relaod(){//重新装载数据
	$('#datagrid').datagrid('reload');
}
//初始化表格数据
function initDataGrid(){
			$('#datagrid').datagrid({
				nowrap: false,
				striped: true,
				collapsible:true,
				url:'batch!fileList.action?batchno='+batchno,
				idField:'id',
				fit:true,
				fitColumns:true,
				scrollbarSize:0,
				singleSelect:true,
				columns:[[
					{field:'id',checkbox:true,align : 'center'},
//			        {field:'version',title:'版本号',width:60,align : 'center'},					
					{field:'filename',title:'附件',width:200,align : 'center',
			        	formatter:function(value,rowData,rowIndex){
			        		var files = '';
			        		if(value!=''){
//			        			var arr = value.split(",");
//				        		for(var i=0;i<arr.length;i++){
				        			files = "<a style='color: blue; cursor: pointer;font-size:13px' onclick='return download(\""+value+"\")' title ='"+value+"下载'>"+value+"</a><br/>"
//				        		}
			        		}
			        		
			        		return files;
			        	}
			        },
//					{field:'position',title:'存放位置',width:150,align : 'center'},
//					{field:'period',title:'保管期限',width:80,align : 'center'},
//					{field:'dossierno',title:'档案号',width:100,align : 'center'},
					{field:'operate',title:'操作',width:50,align : 'center',
						formatter:function(value,rowData,rowIndex){
							 //'<img src="'+rootPath+'/themes/default/images/bianjiimage.png" alt="修改" onclick="editVersion('+rowData.batchno+')"/> &nbsp;' +
							return '<img src="'+rootPath+'/themes/default/images/deleteimage.png" alt="删除" onclick="deleteVersion('+rowData.batchno+ ',\''+rowData.filename+'\')"/>';
						}
					}					
				]]
//				pagination:true,
//				rownumbers:true,
//				pageSize:10,
//				pageList:[10,20,30]
//				onLoadSuccess:function(data){
//				if($("#info").val()=="query"){
//					setTimeout("hiddenColumn(\"datagrid\",\"id,operate\")",10);
//				}
//					
//				}
			});
}

//隐藏列
function hiddenColumn(tableID,colList){
    var ColArray = colList.split(",");
    var tTable = $('#'+tableID);
    if(ColArray!=null&&ColArray!=""){
    	for(var i=0;i<ColArray.length;i++){
    		tTable.datagrid('hideColumn',ColArray[i]);
    	}
    }
}

//添加和修改
function editVersion(batchno){
//	$('#datagrid').datagrid('clearSelections');
//	var batchrows = $("#batchdatagrid").datagrid("getSelections");
	var url = rootPath + "/sampletest/batch/batch!toFileInput.action";
	if(batchno!=""){
		url = url + "?batchno="+batchno;
	}
	var _dialog =  window.top.$('<div id ="dlg" style="padding:0px;"><iframe id="fileFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);

	_dialog.dialog({
	title:'文件版本编辑',
	autoOpen:false,
	modal:true,
	closed:true,
	width:'400',
	height:'260',
	buttons:[{
		text:'保存',
		iconCls:'icon-save',
		handler:function(){
			$("#fileFrame",top.document.body).contents().find("#fileForm").form('submit',
				{
					url:rootPath + '/sampletest/batch/batch!saveFile.action?batchno='+batchno,
					onSubmit:function(){
						var objs = $("#fileFrame",top.document.body).contents().find(".grkj-validate");						
						if(!saveCheck(objs)){
							$("#fileFrame",top.document.body).contents().find(":input").focus();
							alert("数据输入不符合格式，请查看红色边框的输入框的输入提示！");
							return false;
						}																			
					},
					success:function(data){
						if(data=='success'){
							_dialog.dialog('close');
							alert("保存成功！");
							relaod();
						}else if(data=='fail'){
							alert("不能上传空文件！");
						}else if(data=='exit'){
							alert("文件已经存在，请勿重复上传！");
						}else{
							alert("保存失败！");
						}
					},
					error:function(){
						alert("保存失败！");
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
//删除
function deleteVersion(batchno,filename){
	if (batchno!=null && batchno!=""){
 		if(window.confirm('是否删除？'))
 		{
			$.post(
				rootPath + "/sampletest/batch/batch!deleteFileVersion.action",
				{"batchno":batchno,"filename":filename},
				function(msg){
					if(msg=='success'){
						$('#datagrid').datagrid('clearSelections');
						alert("删除成功！");
						relaod();
					}else{
						alert("删除失败！");
					}
				}
			);
		}
	}else{
		alert('请至少选择一条记录！');
		return;
	}
}

//js删除附件
function removeAttach(element){
	$(element).parent().remove();
	var value = $("tr:eq(3)").find("td[class='Main_Tab_Style_Content']").html();
	if(value==""||value==null){
		$("tr:eq(3)").remove();
	}
	var files = $(":input[class='upload-files']");
	var arr = new Array();
	for(var i=0;i<files.length;i++){
		arr.push($(files[i]).val());
	}
	$("#upload").val(arr);
}

//文件名称转义
function URLencode(sStr) 
{
    return encodeURI(sStr).replace(/\+/g, '%2B').replace(/\"/g,'%22').replace(/\'/g, '%27').replace(/\//g,'%2F');
}

//文件下载
function download(filename){
	var name=URLencode(filename.toString());
//	var name=encodeURI(filename.toString());
	$.ajax({
		type: "POST",
		url: rootPath +"/sampletest/batch/batch!downLoadImpl.action",
		data: "path="+name+"&flg=0",
		processData :false,
		success:function(data){
			if(data=="fail"){
				alert("下载失败,该文件不存在！");
			}else{
				var urlParmDown=rootPath +"/sampletest/batch/batch!downLoadImpl.action?path="+encodeURI(name)+"&flg=1";
				$("#form").attr("action",urlParmDown);
				$("#form").submit();
			}
		}
	});
}