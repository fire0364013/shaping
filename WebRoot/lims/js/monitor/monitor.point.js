function initMonitorTree(){
    $('#monitortree').tree({
    	checkbox:true,
        url: rootPath+'/projects/taskregister/projectmonitorpoint!monitorTree.action?str='+projectdetail,
        onClick: function(node) {
    		if(node.attributes.flag=='point'){
    			$("#pointFrame").attr("src",rootPath+node.attributes.url);
    		}
        },
		onContextMenu: function(e,node){
			e.preventDefault();
			$('#monitortree').tree('select', node.target);
			if(node.attributes.flag=='type'){
				$('#typeMenu').menu('show', {
					left: e.pageX,
					top: e.pageY
				});
			}else{
				$('#pointMenu').menu('show', {
					left: e.pageX,
					top: e.pageY
				});
			}
		}
 	});
}

function getSelectedMonitor(){
	var nodes = $('#monitortree').tree('getChecked');
	var monitors = "";
	for(var i=0;i<nodes.length;i++){
		if(nodes[i].attributes.flag=='point'){
			monitors = monitors + nodes[i].id + ",";
		}
	}
	monitors = monitors.substring(0,monitors.length-1);
	$("#monitors").val(monitors);
}

//添加页面的信息
function initMonitorAttr1(){
	$("#inner").html('');
	$.ajax({
	   type: "POST",
	   async:false,
	   url: rootPath + "/monitor/monitorpoint!initPointHtml1.action?temp="+new Date().getTime(),
	   data: "entid="+entid+"&typeid="+typeid,
	   success: function(msg){
	     $("#inner").html(msg);
	     initGrkjValidate();
	   }
	});
}

//查看页面的信息
function initMonitorAttr2(){
	$.ajax({
	   type: "POST",
	   url: rootPath +"/monitor/monitorpoint!initPointHtml2.action",
	   data: "id="+monitorpointid,
	   success: function(msg){
	     $("#inner").html(msg);
	   }
	});
}

//编辑页面信息
function initMonitorAttr3(){
	$.ajax({
	   type: "POST",
	   url: rootPath +"/monitor/monitorpoint!initPointHtml3.action",
	   data: "id="+monitorpointid,
	   success: function(msg){
	     $("#inner").html(msg);
	     initGrkjValidate();
	   }
	});
}

//加载对象信息
function initObjectHtml(objectcode){
	$("#objinner").html('');				
	$.ajax({
	   type: "POST",
	   async:false,
	   url: rootPath + "/monitor/monitorpoint!initObjectHtml.action?temp="+new Date().getTime(),
	   data: {objectcode:objectcode,typeid:typeid},
	   success: function(msg){
	     $("#objinner").html(msg);
	     initGrkjValidate();
	   }
	});
}
	
//添加监测点
function addMonitorPoint(){
	var node = $('#monitortree').tree('getSelected');
	var url =  rootPath +"/monitor/monitorpoint!input.action?entid="+entid+"&typeid="+node.id;
	var _dialog =  window.top.$('	<div id="pointDialog"  style="padding:0px;overflow:hidden"><iframe id="monitorFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
	_dialog.dialog({
		title:'添加页面',
		autoOpen:false,
		modal:true,
		closed:true,
		width:'580',
		height:'400',
		buttons:[{
			text:'保存',
			iconCls:'icon-save',
			handler:function(){
			$("#monitorFrame",top.document.body).contents().find("#monitorForm").form('submit',{
					url:rootPath +"/monitor/monitorpoint!add.action",
					onSubmit:function(){
						var objs = $("#monitorFrame",top.document.body).contents().find(".grkj-validate");
						if(!saveCheck(objs)){
							$("#monitorFrame",top.document.body).contents().find(":input").focus();
							alert("数据输入不符合格式，请查看红色边框的输入框的输入提示！");
							return false;
						}
					},
					success:function(data){								
						if(data=='success'){									
							$("#monitortree").tree('reload');
							_dialog.dialog('close');
							alert('成功');
						}else if(data=='fail'){
							alert('失败');
						}else if(data=='existpoint'){
							alert('存在相同名称的监测点');
						}else if(data=='existobject'){
							alert('监测对象已经存在');
						}
					}
				});
			}
		},{
			text:'继续添加',
			iconCls:'icon-next',
			handler:function(){
				$("#monitorFrame",top.document.body).contents().find("#monitorForm").form('submit',{
					url:rootPath +"/monitor/monitorpoint!add.action",
					onSubmit:function(){
						var objs = $("#monitorFrame",top.document.body).contents().find(".grkj-validate");
						if(!saveCheck(objs)){
							$("#monitorFrame",top.document.body).contents().find(":input").focus();
							alert("数据输入不符合格式，请查看红色边框的输入框的输入提示！");
							return false;
						}
					},
					success:function(data){								
						if(data=='success'){	
							$("#monitortree").tree('reload');
							//$("#monitorFrame",top.document.body).contents().find("#continue").click();
						}
						if(data=='fail'){
							alert('失败');
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

function editMonitorPoint(){
	var node = $('#monitortree').tree("getSelected");
	var url =  rootPath +"/monitor/monitorpoint!toEditMonitorPage.action?id="+node.id;
	var _dialog =  window.top.$('	<div id="pointDialog"  style="padding:0px;"><iframe id="monitorFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
	_dialog.dialog({
		title:'编辑页面',
		autoOpen:false,
		modal:true,
		closed:true,
		width:'580',
		height:'500',
		buttons:[{
			text:'保存',
			iconCls:'icon-save',
			handler:function(){
				$("#monitorFrame",top.document.body).contents().find("#monitorForm").form('submit',{
					url:rootPath +"/monitor/monitorpoint!update.action",
					onSubmit:function(){
						var objs = $("#monitorFrame",top.document.body).contents().find(".grkj-validate");
						if(!saveCheck(objs)){
							$("#monitorFrame",top.document.body).contents().find(":input").focus();
							alert("数据输入不符合格式，请查看红色边框的输入框的输入提示！");
							return false;
						}
					},
					success:function(data){								
						if(data=='success'){
							_dialog.dialog('close');
							alert('成功');
							$("#pointFrame").attr("src",rootPath + "/monitor/monitorpoint!view.action?id="+node.id);
						}else if(data=='existpoint'){
							alert('存在相同监测点');
						}else{
							alert('失败');
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

function delMonitor(){
	var node = $('#monitortree').tree("getSelected");
	if(window.confirm('是否删除？')){
		$.post( 
			rootPath +"/monitor/monitorpoint!remove.action",
			{id:node.id},
			function(msg){
			if(msg=='success'){
				$("#monitortree").tree('reload');
				alert('成功');
				$("#pointFrame").attr("src","");
			}else{
				alert('失败');
			}
		});
	}
}