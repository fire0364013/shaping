function initTree(){
            $('#pointtree').tree({
            	checkbox:true,
                url: rootPath+'/monitorproject/monitorproject!getTree.action?entid='+entid+'&projectid='+projectid,
                onClick: function(node) {
            		//如果不是第一级
            		if(!checkFirstMatch(node.id,"object")&&!checkFirstMatch(node.id,"point")){
						if(node.attributes.toString()!="undefined"&&node.attributes.url.toString()!="undefined")
						{
							$("#pointFrame").attr("src",rootPath+node.attributes.url);
						}
					}
                },
				onContextMenu: function(e,node){
					e.preventDefault();
					$('#pointtree').tree('select', node.target);
					targetNode=node;
					if(checkFirstMatch(node.id,"object"))
					{			
						nodeid = node.id;						
						$('#treeMenuObject').menu('show', {
							left: e.pageX,
							top: e.pageY
						});
					}
					if(checkFirstMatch(node.id,"point"))
					{
						nodeid = node.id;
						$('#treeMenuPoint').menu('show', {
							left: e.pageX,
							top: e.pageY
						});
					}
					if(!checkFirstMatch(node.id,"object")&&!checkFirstMatch(node.id,"point")){
						nodeid = node.id;
						$('#delpoint').menu('show', {
							left: e.pageX,
							top: e.pageY
						});
					}
				}
         });
  }


//获取选中的值
function getChecked(){
			var nodes = $('#pointtree').tree('getChecked');
			var s = '';
			for(var i=0; i<nodes.length; i++){
				if (s != '') s += ',';
				s += nodes[i].id;
			}
			$("#ids").val(s);
}


		//是否存在子节点
function getChildren(){
			var node = $('#pointtree').tree('getSelected');
			if (node){
				var children = $('#pointtree').tree('getChildren', node.target);
			} else {
				var children = $('#pointtree').tree('getChildren');
			}
			if(children.length>0){
				return true;
			}
			return false;
}
	//添加监测点
	function addMonitorPoint(id){
		var url =  rootPath +"/monitor/monitorpoint!toPoint.action";
			var surl =  rootPath +"/monitor/monitorpoint!addPointData.action";
			if(id!=""){
				url = url + "?controllid="+id;
				surl = surl + "?controllid="+id;
			}
			var _dialog =  window.top.$('	<div id="pointDialog"  style="padding:0px;overflow:hidden"><iframe id="taskDetailFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
			_dialog.dialog({
				title:'添加页面',
				autoOpen:false,
				modal:true,
				closed:true,
				width:'580',
				height:'600',
				buttons:[{
					text:'保存',
					iconCls:'icon-save',
					handler:function(){
					$("#taskDetailFrame",top.document.body).contents().find("#taskDetailframe").form('submit',{
							url:surl,
							onSubmit:function(){
								var objs = $("#taskDetailFrame",top.document.body).contents().find(".grkj-validate");
								if(!saveCheck(objs)){
									$("#taskDetailFrame",top.document.body).contents().find(":input").focus();
									$("#taskDetailFrame",top.document.body).contents().find("select").focus();
									alert("数据输入不符合格式，请查看红色边框的输入框的输入提示！");
									return false;
								}
							},
							success:function(data){								
								if(data=='success'){									
									$("#pointtree").tree('reload');
									_dialog.dialog('close');
									alert('成功');
								}
								if(data=='fail'){
									alert('失败');
								}
								if(data=='isext'){
									alert('存在相同编码,请修改编码!');
								}		
								if(data=='isoexit'){
									alert('已存在此对象，请修改名称！');
								}
							}
						});
					}
				},{
					text:'继续添加',
					iconCls:'icon-next',
					handler:function(){
					$("#taskDetailFrame",top.document.body).contents().find("#taskDetailframe").form('submit',{
							url:surl,
							onSubmit:function(){
								var objs = $("#taskDetailFrame",top.document.body).contents().find(".grkj-validate");
								if(!saveCheck(objs)){
									$("#taskDetailFrame",top.document.body).contents().find(":input").focus();
									$("#taskDetailFrame",top.document.body).contents().find("select").focus();
									alert("数据输入不符合格式，请查看红色边框的输入框的输入提示！");
									return false;
								}
							},
							success:function(data){								
								if(data=='success'){									
									//$("#pointtree").tree('reload');
									//_dialog.dialog('close');
									//alert('成功');
									//刷新当前页面继续添加
									$("#taskDetailFrame",top.document.body).contents().find("#jxadd").click();
								}
								if(data=='fail'){
									alert('失败');
								}
								if(data=='isext'){
									alert('存在相同编码,请修改编码!');
								}	
								if(data=='isoexit'){
									alert('已存在此对象，请修改名称！');
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

		var targetNode=null;
		var nodeid = null;
	//批量设置方案
	function batchsetplan(id,projectid){
		var url =  rootPath +"/routineproject/routineproject!toMenu.action";
			if(id!=""){
				url = url + "?controllid="+id;
			}
			var _dialog =  window.top.$('	<div id="batchDialog"  style="padding:0px;overflow:hidden"><iframe id="batchsetFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
			_dialog.dialog({
				title:'批量设置方案',
				autoOpen:false,
				modal:true,
				closed:true,
				width:'900',
				height:'620',
				buttons:[{
					text:'保存',
					iconCls:'icon-save',
					handler:function(){
						$("#batchsetFrame",top.document.body).contents().find("#ids").click();
						var idsVal = $("#batchsetFrame",top.document.body).contents().find("#ids").val();
						var deptid = $("#batchsetFrame",top.document.body).contents().find("#deptid").val();
						var flag = $("#batchsetFrame",top.document.body).contents().find("#typeid").val();
						var devicename = "";
						if(flag=="1"){
							$("#batchsetFrame",top.document.body).contents().find("input[name='devicename']").each(
								function(){
									if(devicename!=null && devicename!="")
										devicename += ",";
									devicename += $(this).val();
								}
							);
						}
						var objs = $("#batchsetFrame",top.document.body).contents().find(".grkj-validate");
						if(!saveCheck(objs)){		
							if(flag=="1"){
								$("#batchsetFrame",top.document.body).contents().find(":input").focus();
							}else{
								$("#batchsetFrame",top.document.body).contents().find("#deptid").focus();
							}
							
							alert("数据输入不符合格式，请查看红色边框的输入框的输入提示！");
							return false;
						}
						
						$.ajax( {
							type : 'post',
							url : rootPath +'/routineproject/routineproject!addRoutePoint.action?rids='+idsVal+'&projectid='+projectid+'&deptid='+deptid+'&devicename='+encodeURI(encodeURI(devicename))+'&timeStamp='+new Date().getTime(),//给该url一个时间戳~~这样就必须每次从服务器读取数据,
							async:false,//同步
							success : function(data) {
							if(data=="success"){
								//alert("成功！");
								_dialog.dialog('close');
								$("#pointtree").tree('reload');
//								//更新选中的点
//								$.post( rootPath +"/monitorproject/monitorproject!getOldSelect.action",{projectid:projectid},function(data){
//					  				$("#oldselect").val(data);
//								});
								updateOldSelect(projectid);
							}else if(data=="noSubmit"){
								alert("请选择监测点信息！");
							}
							else{
								alert("失败！");
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
	
		//更新选中的点
	function updateOldSelect(projectid){
		$.post( rootPath +"/monitorproject/monitorproject!getOldSelect.action",{projectid:projectid},function(data){	
			$("#oldselect").val(data);
		});
	}
	
	//添加	
	function addControll(id){
			var url =  rootPath +"/monitor/monitorpoint!toobject.action";
			var surl =  rootPath +"/monitor/monitorpoint!tosave.action";
			if(id!=""){
				url = url + "?controllid="+id;
				surl = surl + "?controllid="+id;
			}
			var _dialog =  window.top.$('	<div id="pointDialog"  style="padding:0px;overflow:hidden"><iframe id="taskDetailFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
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
					$("#taskDetailFrame",top.document.body).contents().find("#taskDetailframe").form('submit',{
							url:surl,
							onSubmit:function(){
								var objs = $("#taskDetailFrame",top.document.body).contents().find(".grkj-validate");
								if(!saveCheck(objs)){
									$("#taskDetailFrame",top.document.body).contents().find(":input").focus();
									$("#taskDetailFrame",top.document.body).contents().find("select").focus();
									alert("数据输入不符合格式，请查看红色边框的输入框的输入提示！");
									return false;
								}
							},
							success:function(data){								
								if(data=='success'){									
									$("#pointtree").tree('reload');
									_dialog.dialog('close');
									alert('成功');
								}
								if(data=='fail'){
									alert('失败');
								}
								if(data=='isext'){
									alert('存在相同编码,请修改编码!');
								}									
							}
						});
					}
				},{
					text:'继续添加',
					iconCls:'icon-next',
					handler:function(){
					$("#taskDetailFrame",top.document.body).contents().find("#taskDetailframe").form('submit',{
							url:surl,
							onSubmit:function(){
								var objs = $("#taskDetailFrame",top.document.body).contents().find(".grkj-validate");
								if(!saveCheck(objs)){
									$("#taskDetailFrame",top.document.body).contents().find(":input").focus();
									$("#taskDetailFrame",top.document.body).contents().find("select").focus();
									alert("数据输入不符合格式，请查看红色边框的输入框的输入提示！");
									return false;
								}
							},
							success:function(data){								
								if(data=='success'){									
									$("#taskDetailFrame",top.document.body).contents().find("#jxadd").click();
								}
								if(data=='fail'){
									alert('失败');
								}
								if(data=='isext'){
									alert('存在相同编码,请修改编码!');
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
	
		//删除
		function del(did,projectid){
				if(getChildren()){
					if(window.confirm('存在关联的监测点，删除时将被删除，是否删除？')){
						$.post( rootPath +"/monitor/monitorpoint!toRutinedelete.action",{controllid:did,projectid:projectid},function(del){
							if(del=='success'){
								$("#pointtree").tree('reload');
								alert('成功');
								$("#pointFrame").attr("src","");
							}
							if(del=='fail'){
								alert('失败');
							}
						});
				
					}
				}else{
					if(window.confirm('是否删除？')){
						$.post( rootPath +"/monitor/monitorpoint!toRutinedelete.action",{controllid:did,projectid:projectid},function(del){
							if(del=='success'){
								$("#pointtree").tree('reload');
								alert('成功');
								$("#pointFrame").attr("src","");
							}
							if(del=='fail'){
								alert('失败');
							}
						});
				
					}
				}
		}
		
		//修改	
	function editControll(id){
			var url =  rootPath +"/monitor/monitorpoint!toeditcontroll.action";
			var surl =  rootPath +"/monitor/monitorpoint!toedit.action";
			if(id!=""){
				url = url + "?editid="+id;
				surl = surl + "?editid="+id;
			}
			var _dialog =  window.top.$('	<div id="pointDialog"  style="padding:0px;"><iframe id="taskDetailFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
			_dialog.dialog({
				title:'编辑页面',
				autoOpen:false,
				modal:true,
				closed:true,
				width:'610',
				height:'400',
				buttons:[{
					text:'保存',
					iconCls:'icon-save',
					handler:function(){
					$("#taskDetailFrame",top.document.body).contents().find("#taskDetailframe").form('submit',{
							url:surl,
							onSubmit:function(){
								var objs = $("#taskDetailFrame",top.document.body).contents().find(".grkj-validate");
								if(!saveCheck(objs)){
									$("#taskDetailFrame",top.document.body).contents().find(":input").focus();
									$("#taskDetailFrame",top.document.body).contents().find("select").focus();
									alert("数据输入不符合格式，请查看红色边框的输入框的输入提示！");
									return false;
								}
							},
							success:function(data){								
								if(data=='success'){
								_dialog.dialog('close');
								$("#pointtree").tree('reload');
									alert('成功');
								}
								if(data=='fail'){
									alert('失败');
								}
								if(data=='isext'){
									alert('存在相同编码,请修改编码!');
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
