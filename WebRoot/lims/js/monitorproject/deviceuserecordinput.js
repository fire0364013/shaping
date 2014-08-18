//页面加载成功的后    给使用日期加上默认的时间    默认今天
function defalutTime() {
			var entrustdateVal = $("#usedate").val();
			if(entrustdateVal==""||entrustdateVal=="undefined"){
				var ym = new Date();
				var strYear = ym.getFullYear();
				var strMonth = ym.getMonth()+1;
				var strDate = ym.getDate();
				var temp = strYear+"-"+(strMonth<10? "0"+strMonth:strMonth)+"-"+(strDate<10? "0"+strDate:strDate);
				$("#usedate").val(temp);
			}
}
//选择仪器
function selectDevice(){
	var a=encodeURIComponent(encodeURIComponent($("#deviceid").val()));
	var b=encodeURIComponent(encodeURIComponent($("#deviceName").val()));
	var c=encodeURIComponent(encodeURIComponent($("#devicenum").val()));
	var url =  rootPath +"/monitorproject/deviceuserecord/samplingdeviceuserecord!toSelectDevice.action?deviceid="+a+"&deviceName="+b+"&devicenum="+c;
	var _dialog =  window.top.$('<div id ="role-dlg" style="padding:0px;"><iframe id="deviceFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
	_dialog.dialog({
		title:'仪器列表',
		autoOpen:false,
		modal:true,
		closed:true,
		width:'800',
		height:'400',
		buttons:[{
			text:'保存',
			iconCls:'icon-save',
			handler:function(){
			var deviceId=$("#deviceFrame",top.document.body).contents().find("#deviceId").val();
			var deviceNum=$("#deviceFrame",top.document.body).contents().find("#deviceNum").val();
			var deviceName=$("#deviceFrame",top.document.body).contents().find("#deviceName").val();
			$("#deviceid").val(deviceId);
			$("#deviceName").val(deviceName);
			$("#devicenum").val(deviceNum);
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
//选择监测点
function selectMoinPoint(){
	var a=encodeURIComponent(encodeURIComponent($("#deviceid").val()));
	var b=encodeURIComponent(encodeURIComponent($("#deviceName").val()));
	var c=encodeURIComponent(encodeURIComponent($("#devicenum").val()));
	var url =  rootPath +"/monitorproject/deviceuserecord/samplingdeviceuserecord!toSelectMoinPonit.action?projectcode="+projectcode;
	var _dialog =  window.top.$('<div id ="role-dlg" style="padding:0px;"><iframe id="pointFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
	_dialog.dialog({
		title:'监测点列表',
		autoOpen:false,
		modal:true,
		closed:true,
		width:'800',
		height:'400',
		buttons:[{
			text:'保存',
			iconCls:'icon-save',
			handler:function(){
			var ponitname=$("#pointFrame",top.document.body).contents().find("#selectedUser").val();
			var ponitid=$("#pointFrame",top.document.body).contents().find("#selectedUserid").val();
			$("#monitorPointId").val(ponitid);
			$("#monitorPointName").val(ponitname);
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