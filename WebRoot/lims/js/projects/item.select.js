function initItemTree(){
	$('#tree').tree({
		checkbox: true,
//		animate: true,
		url: rootPath + '/iteminfo/iteminfo!tree.action?itemtype=0',
		onBeforeExpand:function(node,param){
			$('#tree').tree('options').url = rootPath + '/iteminfo/iteminfo!tree.action?itemtype='+node.id;
		}
	});
}

function getSelectedItem(){
	var nodes = $('#tree').tree('getChecked');
	var itemid = "";
	var itemname = "";
	for(var i=0;i<nodes.length;i++){
		if(nodes[i].attributes.flag=="item"){
			itemid = itemid + nodes[i].id + ",";
			itemname = itemname + nodes[i].text + ",";
		}
	}
	$('#itemid').val(itemid.substring(0,itemid.length-1));
	$('#itemname').val(itemname.substring(0,itemname.length-1));
}

//初始化树
function initProjectMonitorItemTree(){	
	var sampletypesigncode = encodeURI(encodeURI(sampletypesign));
	$('#tree').tree({
		checkbox: true,
//		animate: true,
		url: rootPath+'/projects/taskregister/projectmonitorpoint!projectMonitorItemTree.action?str='+projectdetail+'&itemtype=0&projectpointid='+projectpointid+"&sampletypesign="+sampletypesigncode,
		onBeforeExpand:function(node,param){
			$('#tree').tree('options').url = 
				rootPath+'/projects/taskregister/projectmonitorpoint!projectMonitorItemTree.action?str='+projectdetail+'&itemtype='+node.id+'&projectpointid='+projectpointid+"&sampletypesign="+sampletypesigncode;
		}
	});
}

function initProjectMonitorItemTree2(){	
	var sampletypesigncode = encodeURI(encodeURI(sampletypesign));
	$('#tree').tree({
		checkbox: true,
//		animate: true,
		url: rootPath+'/projects/taskregister/projectmonitorpoint!projectMonitorItemTree2.action?str='+projectdetail+'&itemtype=0&projectpointid='+projectpointid+"&sampletypesign="+sampletypesigncode,
		onBeforeExpand:function(node,param){
			$('#tree').tree('options').url = 
				rootPath+'/projects/taskregister/projectmonitorpoint!projectMonitorItemTree2.action?str='+projectdetail+'&itemtype='+node.id+'&projectpointid='+projectpointid+"&sampletypesign="+sampletypesigncode;
		},
		onLoadSuccess:onSuccess
	});
}

function onSuccess(){
	if(items != ""){
		var valueid=items.split(",");
		for ( var i = 0; i < valueid.length; i++) {
			var node = $('#tree').tree('find', valueid[i]);
			$('#tree').tree('check', node.target);
		}
	}
}