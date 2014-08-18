function reloadTree(){
	$("#pointtree").tree('reload');
}
function initTree(){
    $('#pointtree').tree({
    	checkbox:true,
        url: rootPath+'/monitorproject/monitorproject!getTree2.action?entid='+entid+'&projectid='+projectid,
        onClick: function(node) {
    		//如果不是第一级
    		if(!checkFirstMatch(node.id,"object")&&!checkFirstMatch(node.id,"point")){
				if(node.attributes.toString()!="undefined"&&node.attributes.url.toString()!="undefined"&&node.attributes.url.toString()!='' )
				{
					//alert("---"+node.attributes.url+"---");
					$("#pointFrame").attr("src",rootPath+node.attributes.url+"&timeStamp="+new Date().getTime());
				}
			}
//            		else{
//						$("#pointFrame").attr("src","");
//					}
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

		var targetNode=null;
		var nodeid = null;

		
	//添加	
	function addControll(id){
			var url =  rootPath +"/monitor/monitorpoint!toobject.action";
			var surl =  rootPath +"/monitor/monitorpoint!tosave.action";
			if(id!=""){
				url = url + "?controllid="+id;
				surl = surl + "?controllid="+id;
			}
			var _dialog =  window.top.$('	<div id="pointDialog"  style="padding:0px;"><iframe id="taskDetailFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
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
		//查看详情
		function detail(nodeid){
//			alert(node.parentNode);//$("#"+node.id).parent().val().toString());
//			alert(node.text.toString());
//			alert(node.id.toString());
			
			
			//"/monitor/monitorpoint!toview.action?viewid="+object.getObjectcode()+"_"+point.getMonitorid());
			var url =  rootPath +"/monitor/monitorpoint!toview2.action?viewid="+nodeid;
			var _dialog =  window.top.$('<div id="pointDialog"  style="padding:0px;"><iframe id="taskDetailFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
			_dialog.dialog({
				title:'详细页面',
				autoOpen:false,
				modal:true,
				closed:true,
				width:'550',
				height:'400',			
				onClose:function(){
					_dialog.dialog("destroy");
					
				}
			});
			_dialog.dialog('open');
		}
		//删除
		function del(did){
				if(getChildren()){
					if(window.confirm('存在关联的监测点，删除时将被删除，是否删除？')){
						$.post( rootPath +"/monitor/monitorpoint!todelete.action",{controllid:did},function(del){
							if(del=='success'){
								$("#pointtree").tree('reload');
								alert('成功');
							}
							if(del=='fail'){
								alert('失败');
							}
						});
				
					}
				}else{
					if(window.confirm('是否删除？')){
						$.post( rootPath +"/monitor/monitorpoint!todelete.action",{controllid:did},function(del){
							if(del=='success'){
								$("#pointtree").tree('reload');
								alert('成功');
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
				width:'550',
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
