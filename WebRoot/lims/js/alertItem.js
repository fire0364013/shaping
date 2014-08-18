

//做项目弹出窗口使用___容器使用
function showitemforcon(items,jcxm){
	var encodestr= encodeURI(encodeURI(items));
	var url = rootPath + "/container/container!showitemforcontainer.action?jcxm="+jcxm+"&jcxmname="+encodestr;
	var _dialog =  window.top.$('<div id ="cert-dlg" style="padding:0px;"><iframe id="ItemFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
	_dialog.dialog({
		title:'项目选择',
		autoOpen:false,
		modal:true,
		closed:true,
		width:'650',
		height:'480',
		buttons:[{
			text:'确定',
			iconCls:'icon-save',
			handler:function(){
 			var itemname=$("#ItemFrame",top.document.body).contents().find("#selectedItemnames").val();
			var itemid=$("#ItemFrame",top.document.body).contents().find("#selectedItemid").val();
			$("#jcxmname").val(itemname);
			$("#jcxm").val(itemid);
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