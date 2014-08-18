		//打开监测点信息
		function openmonitor(id){
			$('#datagrid').datagrid('clearSelections');
			var url =  rootPath +"/monitor/monitorpoint!gotoMontorP.action";
			if(id!=""){
				url = url + "?entid="+id;
			}
			var _dialog =  window.top.$('	<div id="pointDialog"  style="padding:0px;"><iframe id="taskDetailFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
			_dialog.dialog({
				title:'监测点选择',
				autoOpen:false,
				modal:true,
				closed:true,
				width:'900',
				height:'630',
				buttons:[{
				text:'保存',
				iconCls:'icon-save',
				handler:function(){
					
					}		
				},{
					text:'取消',
					iconCls:'icon-cancel',
					handler:function(){
					 _dialog.dialog('close');	
					}
				}]
			});
			_dialog.dialog('open');
		}
