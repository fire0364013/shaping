//单条删除
function del(samlingmethodid) {
	$('#monitorpointitem').datagrid('clearSelections');
	if (window.confirm('是否删除？')) {
		$.post(rootPath + "/spot/samlingmethod/samlingmethod!deleteOne.action",
				{
					id : samlingmethodid
				}, function(del) {
					if (del == 'success') {
						$('#monitorpointitem').datagrid('clearSelections');
						$("#monitorpointitem").datagrid('reload');
						alert('成功');
					}

				});
	}
}
//批量删除	
function delSamlingmethodAll() {
	var selected = $("#monitorpointitem").datagrid('getSelections');
	if (selected == null || selected.length < 1) {
		alert('请至少选择一条记录！');
	} else {
		if (window.confirm('是否删除？')) {
			var cc = [];
			for ( var i = 0; i < selected.length; i++) {
				if (cc == "") {
					cc += selected[i]['samlingmethodid'];
				} else {
					cc += "," + selected[i]['samlingmethodid'];
				}
			}
			$.post(rootPath
					+ "/spot/samlingmethod/samlingmethod!deleteAll.action", {
				"ids" : cc
			}, function(del) {
				if (del == 'success') {
					$('#monitorpointitem').datagrid('clearSelections');
					$("#monitorpointitem").datagrid('reload');
					alert('成功');
				}
			});
		}
	}
}
//添加
function addSamlingmethodWin(id) {
	var url = rootPath + "/spot/samlingmethod/samlingmethod!selectMethod.action?monitorpointtypeid="+id;
	var _dialog = window.top
			.$('<div id ="samlingmethod-dlg" style="padding:0px;"><iframe id="trainplanFrame" width="100%" height="100%" frameborder="0" scrolling="no" src=' + url + '></iframe></div>')
			.appendTo(window.top.document.body);
	_dialog.dialog( {
				title : '采样方法添加',
				autoOpen : false,
				modal : true,
				closed : true,
				width : '900',
				height : '555',
				buttons : [
						{
							text : '保存',
							iconCls : 'icon-save',
							handler : function() {
							$("#trainplanFrame",top.document.body).contents().find("#ents").click();
							var ents = $("#trainplanFrame",top.document.body).contents().find("#ents").val();
							dataCommit(id,ents);
							_dialog.dialog('close');
							$("#monitorpointitem").datagrid('reload');
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
//提交数据
function dataCommit(samlingmethodid,methodids){
	$.ajax({
		type:'POST',
		url:rootPath + '/spot/samlingmethod/samlingmethod!save.action',//?samlingmethodid='+samlingmethodid+'&methodids='+methodids
		data:'samlingmethodid='+samlingmethodid+'&methodids='+methodids,
		success:function(msg){
		 	if(msg=='success'){
		 		return true;
		 	}else{
				return false;
		 	}
		}
	});
}
