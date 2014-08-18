		//打开监测点信息
		function openmonitor(id){
			$('#datagrid').datagrid('clearSelections');
			var url =  rootPath +"/monitor/monitorpoint!view.action";
			if(id!=""){
				url = url + "?entpriseid="+id;
			}
			var _dialog =  window.top.$('	<div id="pointDialog"  style="padding:0px;"><iframe id="taskDetailFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
			_dialog.dialog({
				title:'监测点选择',
				autoOpen:false,
				modal:true,
				closed:true,
				width:'900',
				height:'630'
			});
			_dialog.dialog('open');
		}
