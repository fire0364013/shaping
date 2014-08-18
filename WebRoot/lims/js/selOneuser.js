
//姓名的弹出窗口使用selectedUserid
function showName(){
	//url=rootPath +"/certificateinfo/certificateinfo!showname.action";//自己做部门下拉框的选择按钮
	var url =  rootPath +"/oamuser/oneandmanyuser!toOneUser.action";
	var _dialog =  window.top.$('<div id ="cert-dlg" style="padding:0px;"><iframe id="ItemFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
	_dialog.dialog({
		title:'姓名选择',
		autoOpen:false,
		modal:true,
		closed:true,
		width:'800',
		height:'500',
		buttons:[{
			text:'确定',
			iconCls:'icon-save',
			handler:function(){
			var val=$("#ItemFrame",top.document.body).contents().find("#selectedUser").val();
			$("#username").val(val);
			var userids=$("#ItemFrame",top.document.body).contents().find("#selectedUserid").val();
			$("#userids").val(userids);	
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



////样品容器的弹出窗
//function showNametoCont(){
//	var url =  rootPath +"/container/container!toSelOne.action";
//	var _dialog =  window.top.$('<div id ="cert-dlg" style="padding:0px;"><iframe id="ItemFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
//	_dialog.dialog({
//		title:'样品容器选择',
//		autoOpen:false,
//		modal:true,
//		closed:true,
//		width:'800',
//		height:'500',
//		buttons:[{
//			text:'确定',
//			iconCls:'icon-save',
//			handler:function(){
//			var val=$("#ItemFrame",top.document.body).contents().find("#selectedUser").val();
//			$("#containername").val(val);
//			var userids=$("#ItemFrame",top.document.body).contents().find("#selectedUserid").val();
//			$("#containerid").val(userids);	
//			_dialog.dialog('close');
//				
//			}
//		},{
//			text:'取消',
//			iconCls:'icon-cancel',
//			handler:function(){
//				_dialog.dialog('close');
//			}
//		}],
//		onClose:function(){
//			_dialog.dialog("destroy");
//			
//		}
//	});
//	_dialog.dialog('open');	
//}




////样品保存剂的弹出窗
//function showNametoSave(){
//	var url =  rootPath +"/savedose/savedose!toSelOneSavedose.action";
//	var _dialog =  window.top.$('<div id ="cert-dlg" style="padding:0px;"><iframe id="ItemFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
//	_dialog.dialog({
//		title:'样品容器选择',
//		autoOpen:false,
//		modal:true,
//		closed:true,
//		width:'800',
//		height:'500',
//		buttons:[{
//			text:'确定',
//			iconCls:'icon-save',
//			handler:function(){
//			var val=$("#ItemFrame",top.document.body).contents().find("#selectedUser").val();
//			$("#samplesavedose").val(val);
//			_dialog.dialog('close');
//				
//			}
//		},{
//			text:'取消',
//			iconCls:'icon-cancel',
//			handler:function(){
//				_dialog.dialog('close');
//			}
//		}],
//		onClose:function(){
//			_dialog.dialog("destroy");
//			
//		}
//	});
//	_dialog.dialog('open');	
//}
