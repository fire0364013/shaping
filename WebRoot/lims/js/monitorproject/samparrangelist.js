var idfild=[];//用来存放监测点id, 作用：就是当刷新页面后还能记录以前选中的行
//var parentfild=[];//用于存放父节点的id  作用：在刷新页面后还能记住哪些是展开的节点
//加载监测点信息
function initMonitorinfo(myurl){
	$('#monitorinfolist').treegrid({
		nowrap: false,
		striped: true,
		collapsible:true,
		url:myurl, 
		fit:true,
		fitColumns : true,
		scrollbarSize:0,
		remoteSort: false,
		singleSelect:false,
		rownumbers:false,
		idField:'id',
		treeField:'monitorpointtypename',
		frozenColumns:[[
		                {field:'id',width:40,checkbox:true,align:"center"}
					]],
		columns:[[
					{field:'monitorpointtypename',title:'监测点编码', width:120,align:"left"},
					{field:'pointname',title:'监测点名称', width:140,align:"center"},
					{field:'status',title:'状态', width:60,align:"center"},
					//{field:'pointcode',title:'监测点编码', width:70,align:"center"},
					{field:'departid',title:'采样科室', width:60,align:"center",
						formatter:function(value,rec){
								for(var i=0; i<departjson.length; i++){
								if (departjson[i].departid == value) 
									return departjson[i].departname;
								}
								return value;
						}
					},
					//{field:'status',title:'状态 ', width:70,align:"center"},
					{field:'deptgroupname',title:'采样组<img src="'+rootPath+'/themes/icons/mini_edit.png"/>', width:90,align:"center"},
					{field:'samplingprincipal',title:'采样负责人<img src="'+rootPath+'/themes/icons/mini_edit.png"/>', width:75,align:"center"},
					{field:'samplingperson',title:'采样人<img src="'+rootPath+'/themes/icons/mini_edit.png"/>', width:140,align:"center"},
					{field:'plansamplingdate',title:'计划采样开始日期 <img src="'+rootPath+'/themes/icons/mini_edit.png"/>', width:82,align:"center"}
				]],
		onClickRow:function(rowData){
			//点击一行 加载采样设置信息
			if(rowData.projectpointid!=""){
				$('#monitorinfolist').treegrid('clearSelections');
				$("#monitorinfolist").treegrid('select',rowData.id);
				pmonitorid = rowData.projectid;
				initSampleinfo(rowData.projectpointid);
			}
		},onLoadSuccess:function(data){
			//jQuery.unblockUI();
			for(var i=0;i<idfild.length;i++){
				$('#monitorinfolist').treegrid('select',idfild[i]);
				var nodes = $('#monitorinfolist').treegrid('getParent',idfild[i]);
					if(nodes!=null){
					$('#monitorinfolist').treegrid('expand',nodes.id);
				}
			} 
			var header = $("#monitorinfolist").parent(".datagrid-view").find("div.datagrid-header");
			var fields = header.find("td:has(div.datagrid-cell)");
			$(fields).unbind('click');//先取消绑定
			
			for(var i=0;i<fields.length;i++){
				if($(fields[i]).attr('field') == 'deptgroupname'){
				//采样组
					$(fields[i]).bind("click",function(e){
						selectGroupAll();
//						$('#group-menu').menu('show', {
//							left: e.pageX,
//							top: e.pageY
//						});
//						e.preventDefault();
					})
				}else if($(fields[i]).attr('field')=='samplingprincipal'){
				//批量修改现场负责人
					$(fields[i]).bind("click",function(e){
						selectSamprincipalAll();
//						$('#samprincipal-menu').menu('show', {
//							left: e.pageX,
//							top: e.pageY
//						});
//						e.preventDefault();
					})
				}else if($(fields[i]).attr('field')=='plansamplingdate'){
					//采样时间
					$(fields[i]).bind("click",function(e){
						selectSampTimeAll()
//						$('#method-menu').menu('show', {
//							left: e.pageX,
//							top: e.pageY
//						});
//						e.preventDefault();
					})
				}else if($(fields[i]).attr('field')=='samplingperson'){
					//批量修改采样人
					$(fields[i]).bind("click",function(e){
						selectSamperAll();
//						$('#samper-menu').menu('show', {
//							left: e.pageX,
//							top: e.pageY
//						});
//						e.preventDefault();
					})
				}																
			}
		}/*,onDblClickCell:function(rowIndex,field,value){
			$('#monitorinfolist').datagrid('clearSelections');
			$("#monitorinfolist").datagrid('selectRow',rowIndex);
			var selected=$("#monitorinfolist").datagrid('getSelected');
			if(field=='samplingprincipal'){
				//现场负责人
				principaluser(value,selected['samplinguserid'],selected['projectpointid']);
				//行索引，行值，现场负责人id，项目检测点id
			}
			if(field=='samplingperson'){
				//采样人
				selectSampUser(value,selected['samplingpersonid'],selected['projectpointid'],selected['projectcode'],selected['monitorpointid']);
			}
			if(field=='plansamplingdate'){
				//采样时间
				selectSampTime(value,selected['projectpointid'],selected['projectcode'],selected['monitorpointid']);
			}
		},onHeaderContextMenu:function(e,field){
			//alert($('#monitorinfolist').find(".datagrid-header").html());
			if(field=='deptgroupname'){
				//采样组
				$('#group-menu').menu('show', {
					left: e.pageX,
					top: e.pageY
				});
				e.preventDefault();
				
			}else if(field=='samplingprincipal'){
				//批量修改现场负责人
				$('#samprincipal-menu').menu('show', {
					left: e.pageX,
					top: e.pageY
				});
				e.preventDefault();
			}else if(field=='plansamplingdate'){
				//采样时间
				$('#method-menu').menu('show', {
					left: e.pageX,
					top: e.pageY
				});
				e.preventDefault();
				
			}else if(field=='samplingperson'){
				//批量修改采样人
				$('#samper-menu').menu('show', {
					left: e.pageX,
					top: e.pageY
				});
				e.preventDefault();
			}
	}*/,onSelect:function(rowData){
		if(rowData!=null){
			var flag=0;
			if(idfild.length>0){
				for(var i=0;i<idfild.length;i++){
					if(idfild[i]==rowData.id){
						flag=1;
						break;
					}
				}
				if(flag==0){
					idfild.push(rowData.id);
				}
			}else{
				idfild.push(rowData.id);
			}
			if(rowData.projectpointid==""){
				var nodes = $('#monitorinfolist').treegrid('getChildren', rowData.id);
				for ( var i = 0; i < nodes.length; i++) {
					$('#monitorinfolist').treegrid('select', nodes[i].id);
				}
			}
		}
	},onUnselect:function(rowData){
		if(idfild.length>0){
			for(var i=0;i<idfild.length;i++){
				if(idfild[i]==rowData.id){
					idfild.splice(i,1);
				}
			}
		}
		
		if(rowData.projectpointid==""){
			var nodes = $('#monitorinfolist').treegrid('getChildren', rowData.id);
			for ( var i = 0; i < nodes.length; i++) {
				$('#monitorinfolist').treegrid('unselect', nodes[i].id);
			}
		}
	},onSelectAll:function(rows){
		idfild=[];
		var getSelections=$('#monitorinfolist').treegrid('getSelections');
			for(var i=0;i<getSelections.length;i++){
				idfild.push(getSelections[i].id);
			}
			
	},onUnselectAll:function(rows){
		idfild=[];
	}/*,onExpand:function(row){
		parentfild.push(row.id);
	},onCollapse:function(row){
		if(parentfild.length>0){
			for(var i=0;i<parentfild.length;i++){
				if(parentfild[i]==row.id){
					parentfild.splice(i,1);
				}
			}
		}
	}*/
	
});
	$(window).resize(function() {
		$("#monitorinfolist").treegrid('resize');
	});
//	$(cyz).bind('click',function(e){
//		$('#group-menu').menu('show', {
//			left: e.pageX,
//			top: e.pageY
//		});
//		e.preventDefault();
//	});
}



/**
 * 是否能设置采样组和采样人信息（只有在部门一样的情况下才能设置）
 * 被修改采样组和采样人的地方调用
 * @param selected
 * @return
 */
function isOneDept(selected){
	var deptids=[];
	//去掉部门id为空的数据
	for ( var i = 0; i < selected.length; i++) {
		var deptId=selected[i]['departid'];
		if(deptId!=""){
			if(deptids==""){
				deptids+=deptId;
			}
			else{
				deptids+=","+deptId;
			}
		}
	}//for
	//判断是否只有一个部门
	if(deptids!=""&&deptids!=null){
		var deptid=deptids.split(",");
		var deptOneId=deptid[0];
		for ( var i = 0; i < deptid.length; i++) {
			var deptIdEver=deptid[i];
			if(deptIdEver!=deptOneId){
				return false;
			}
		}//for
	}
	return true;
}
	//判断是否换将质量地表水的修改采样组操作   还是常规普通的修改采样组操作
	function selectGroupAll(){
		var selected=$("#monitorinfolist").treegrid('getSelections');
		if(selected==null || selected.length< 1){
			alert('请至少选择一条记录！');
		}else{
			//判断是否是地表水是地表水执行一个操作不是地表水执行另外一个操作
//			if(yeWuLeiXing=='2'){
//				if(selected[0].typename=="地表水"){
//					var ids="";
//					for ( var i = 0; i < selected.length; i++) {
//						var projectpointid=selected[i]['projectpointid'];
//						if(projectpointid!=""){
//							if(ids==""){
//								ids=projectpointid
//							}else{
//								ids+=","+projectpointid;
//							}
//						}
//					}//for
//					//环境质量地表水操作
//					specialGroup(ids);
//				}else{
//					convention(selected);
//				}
//			}else{
				convention(selected);
//			}//else
		}//else
	}
	
	//常规操作   只要不是环境质量监测的地表水以外的常规操作
	function convention(selected){
			if(isOneDept(selected)){
						var id=[];
						var deptids=[];
						var flag=0;
						//判断是否有不为空的数据
						for ( var i = 0; i < selected.length; i++) {
							var projectpointid=selected[i]['projectpointid'];
							if(projectpointid!=""){
								flag=1;
								continue;
							}
						}//for
						//有id不为空的数据才能执行以下操作
						if(flag==1){
							for ( var t = 0; t < selected.length; t++) {
								var projectpointid=selected[t]['projectpointid'];
								var dept=selected[t]['departid'];
									if(projectpointid!=""){
										if(id==""){
											id+=projectpointid;
											deptids+=dept;
										}
										else{
											id+=","+projectpointid;
											deptids+=","+dept;
										}
									}//if(projectpointid!=""){
							}//for
							//为数组去重复
							var arr = deptids.split(",");
							var res=[],hash={};
							for(var i=0,elem;(elem=arr[i])!=null;i++){
								if(!hash[elem]){
									res.push(elem);
									hash[elem]=true;
								}
							}
							selectGroup(id,res);
						}//if
						else{
							alert("请至少选择一个有监测点信息的数据！");
						}
				}else{
					alert("只能批量设置一个部门的数据！");
				}//else
			
	}
	//环境质量监测地表水的选择组的弹出框
	function specialGroup(ids){
		var url =rootPath +"/monitorproject/samparrange/samparrange!toSelectGroup.action";
		var _dialog =  window.top.$('	<div id ="role-dlg" style="padding:0px;"><iframe id="selectDepart" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
		_dialog.dialog({
			title:'采样组',
			autoOpen:false,
			modal:true,
			closed:true,
			width:'600',
			height:'500',
			buttons:[{
				text:'确定',
				iconCls:'icon-save',
				handler:function(){
					var groupname=$("#selectDepart",top.document.body).contents().find("#selecteddeparname").val();
					var groupid=$("#selectDepart",top.document.body).contents().find("#selecteddeparid").val();
					var explorer = window.navigator.userAgent ;
					if(groupid!=""&&groupid!=null){
						if (explorer.indexOf("MSIE") >= 0) {
							$(window.top.document.body).block({ 
							//jQuery.blockUI({ 
								message: "正在加载数据,请稍候...", 
						 		css: {
									color:'#000', 
									padding: '15px', 
									border:'2px solid #90dbfe',
									backgroundColor:'#fafafa'
								},
								overlayCSS: {
									opacity:'0.1' 
								}
							});
						}else{
							//$(window.top.document.body).block({ 
							jQuery.blockUI({ 
								message: "正在加载数据,请稍候...", 
						 		css: {
									color:'#000', 
									padding: '15px', 
									border:'2px solid #90dbfe',
									backgroundColor:'#fafafa'
								},
								overlayCSS: {
									opacity:'0.1' 
								}
							});
						}//else
					$.post(rootPath +"/monitorproject/samparrange/samparrange!saveMonitorinfo.action",{groupid:groupid,projectpointid:ids},function(data){
						if(data=='success'){
							//var explorer = window.navigator.userAgent ;
							if (explorer.indexOf("MSIE") >= 0) {
								$(window.top.document.body).unblock(); 
							}else{
								jQuery.unblockUI();
							}
							//alert('成功');
							$("#monitorinfolist").treegrid("reload");
							//$("#samplelist").datagrid('reload');
						}else{
							alert('失败');
							//var explorer = window.navigator.userAgent ;
							if (explorer.indexOf("MSIE") >= 0) {
								$(window.top.document.body).unblock(); 
							}else{
								jQuery.unblockUI();
							}
						}
					})
					_dialog.dialog('close');
					}else{
						alert("选择的采样组不能为空！");
					}
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
//常规（非环境质量监测地表水）修改采样组  弹出的框，被selectGroupAll()调用  
function selectGroup(ids,res){
	var _dialog =  window.top.$('<div id ="dlg" style="padding:0px;">'
			+'<table style="width: 100%;" border="1" align="center" class="Main_Tab_Style">'
			+'<tr>'
			//+'<td align="left" class="Main_Tab_Style_title" style="width: 100px;height:30px">采样组：</td>'
			+'<td  align="left" class="Main_Tab_Style_Content" style="height:21px" >'
			+'<select id="samplegroup" name="samplegroup" style="width:100%;height:20px"></select>'
			+'</td>'
			+'</tr>'
			+'</table>'
			+'</div>').appendTo(window.top.document.body);
	getGroupData(res);//加载数据
	_dialog.dialog({
		title:'采样组',
		autoOpen:false,
		modal:true,
		closed:true,
		width:'230',
		height:'105',
		buttons:[{
			text:'确定',
			iconCls:'icon-save',
			handler:function(){
					var groupid=$(window.top.document).find("#samplegroup").val();
					var explorer = window.navigator.userAgent ;
					if (explorer.indexOf("MSIE") >= 0) {
							$(window.top.document.body).block({ 
							//jQuery.blockUI({ 
								message: "正在加载数据,请稍候...", 
						 		css: {
									color:'#000', 
									padding: '15px', 
									border:'2px solid #90dbfe',
									backgroundColor:'#fafafa'
								},
								overlayCSS: {
									opacity:'0.1' 
								}
							});
						}else{
							//$(window.top.document.body).block({ 
							jQuery.blockUI({ 
								message: "正在加载数据,请稍候...", 
						 		css: {
									color:'#000', 
									padding: '15px', 
									border:'2px solid #90dbfe',
									backgroundColor:'#fafafa'
								},
								overlayCSS: {
									opacity:'0.1' 
								}
							});
						}//else
			$.post(rootPath +"/monitorproject/samparrange/samparrange!saveMonitorinfo.action",{groupid:groupid,projectpointid:ids},function(data){
				if(data=='success'){
					if (explorer.indexOf("MSIE") >= 0) {
						$(window.top.document.body).unblock(); 
					}else{
						jQuery.unblockUI();
					}
					//alert('成功');
					$("#monitorinfolist").treegrid('reload');
				}else{
					alert('失败');
					if (explorer.indexOf("MSIE") >= 0) {
						$(window.top.document.body).unblock(); 
					}else{
						jQuery.unblockUI();
					}
				}
			});//post
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
/**
 * 加载部门组的json
 * @return
 */
function getGroupData(departid){
	$.ajax( {
		type : 'post',
		url : rootPath +'/monitorproject/samparrange/samparrange!getGroupData.action',//给该url一个时间戳~~这样就必须每次从服务器读取数据,
		data: "departid="+departid,
		success : function(data) {
			var vData = eval("(" + data + ")");
			var lList = "<option value=''>---请选择---</option>";
			//遍历json数据  
			jQuery.each(vData, function(i, n) {
				lList += "<option value=" + n.groupid + ">" + n.groupname	+ "</option>";
			});	
			//绑定数据到select中
			$('#samplegroup',window.top.document).append(lList);
		}
	});
}
/**
 * 是否能设置现场采样人和负责人
 * @param selected
 * @return
 */
function isOneGroup(selected){
	var groupids=[];
	for ( var i = 0; i < selected.length; i++) {
		var groupId=selected[i]['deptgroupid'];
		if(groupId!=""){
			if(groupids==""){
				groupids+=groupId;
			}
			else{
				groupids+=","+groupId; 
			}
		}
	}//for
	if(groupids!=""&&groupids!=null){
		var groupid=groupids.split(",");
		var groupOneId=groupid[0]; 
		for ( var i = 0; i < groupid.length; i++) {
			var groupIdEver=groupid[i];
			if(groupIdEver!=groupOneId){
				return false;
			}
		}//for
	}
	return true;
}
//批量修改现场负责人
function selectSamprincipalAll(){
	var selected=$("#monitorinfolist").treegrid('getSelections');
	if(selected==null || selected.length< 1){
		alert('请至少选择一条记录！');
	}else{
			//判断是否是地表水是地表水执行一个操作不是地表水执行另外一个操作
			if(yeWuLeiXing=='2'){
				if(selected[0].typename=="地表水"){
					var ids="";
					for ( var i = 0; i < selected.length; i++) {
						var projectpointid=selected[i]['projectpointid'];
						if(projectpointid!=""){
							if(ids==""){
								ids=projectpointid
							}else{
								ids+=","+projectpointid;
							}
						}
					}//for
					//环境质量地表水操作
					specialSamprincipal(ids)
				
				}else{
					conventionSamprincipal(selected);
				}
			}else{
				conventionSamprincipal(selected);
			}//else
	 }
}
//常规的现场负责人
function conventionSamprincipal(selected){
	if(isOneGroup(selected)){
			var id=[];
			var flag=0;
			var deptids=[];
			var groupids=[];
				for ( var i = 0; i < selected.length; i++) {
					var projectpointid=selected[i]['projectpointid'];
					if(projectpointid!=""){
						flag=1;
						continue;
					}
				}//for
				if(flag==1){
					for ( var t = 0; t < selected.length; t++) {
						var projectpointid=selected[t]['projectpointid'];
						var dept=selected[t]['departid'];
						var dgroupid=selected[t]['deptgroupid'];
							if(projectpointid!=""){
								if(id==""){
									id+=projectpointid;
									deptids+=dept;
									groupids+=dgroupid;
								}
								else{
									id+=","+projectpointid;
									deptids+=","+dept;
									groupids+=","+dgroupid;
								}
							}//if(projectpointid!=""){
					}//for
					//为数组去重复
					var arr = deptids.split(",");
					var res=[],hash={};
					for(var i=0,elem;(elem=arr[i])!=null;i++){
						if(!hash[elem]){
							res.push(elem);
							hash[elem]=true;
						}
					}
					//
					var arrgroup = groupids.split(",");
					var resgroup=[],hashgroup={};
					for(var i=0,elem;(elem=arrgroup[i])!=null;i++){
						if(!hashgroup[elem]){
							resgroup.push(elem);
							hashgroup[elem]=true;
						}
					}
					principaluser("","",id,res,resgroup);
				}//if
				else{
					alert("请至少选择一个有监测点信息的数据");
				}
			}else{
				alert("只能批量设置一个组的数据！");
			}
}
//环境质量地表水现场负责人
function specialSamprincipal(id){
	var url =rootPath +"/oamuser/oneandmanyuser!toOneUser.action";
	var _dialog =  window.top.$('	<div id ="role-dlg" style="padding:0px;"><iframe id="oneUserFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
	_dialog.dialog({
		title:'现场负责人',
		autoOpen:false,
		modal:true,
		closed:true,
		width:'600',
		height:'500',
		buttons:[{
			text:'确定',
			iconCls:'icon-save',
			handler:function(){
				var username=$("#oneUserFrame",top.document.body).contents().find("#selectedUser").val();
				var userid=$("#oneUserFrame",top.document.body).contents().find("#selectedUserid").val();
				var explorer = window.navigator.userAgent ;
				if(userid!=""&&userid!=null){
					if (explorer.indexOf("MSIE") >= 0) {
							$(window.top.document.body).block({ 
							//jQuery.blockUI({ 
								message: "正在加载数据,请稍候...", 
						 		css: {
									color:'#000', 
									padding: '15px', 
									border:'2px solid #90dbfe',
									backgroundColor:'#fafafa'
								},
								overlayCSS: {
									opacity:'0.1' 
								}
							});
						}else{
							//$(window.top.document.body).block({ 
							jQuery.blockUI({ 
								message: "正在加载数据,请稍候...", 
						 		css: {
									color:'#000', 
									padding: '15px', 
									border:'2px solid #90dbfe',
									backgroundColor:'#fafafa'
								},
								overlayCSS: {
									opacity:'0.1' 
								}
							});
						}//else
				$.post(rootPath +"/monitorproject/samparrange/samparrange!saveMonitorinfo.action",{userid:userid,projectpointid:id},function(data){
					if(data=='success'){
						if (explorer.indexOf("MSIE") >= 0) {
								$(window.top.document.body).unblock(); 
							}else{
								jQuery.unblockUI();
						}
						//alert('成功');
						$("#monitorinfolist").treegrid("reload");
						//$("#samplelist").datagrid('reload');
					}else{
						if (explorer.indexOf("MSIE") >= 0) {
								$(window.top.document.body).unblock(); 
							}else{
								jQuery.unblockUI();
						}
						alert('失败');
					}
				})
				_dialog.dialog('close');
				}else{
					alert("选择的采样人不能为空！");
				}
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
//常规选择现场负责人
function principaluser(value,samplinguserid,id,res,resgroup){
	//此处的realname   和userid   传自己的文本款的值即可
	var _dialog =  window.top.$('<div id ="dlg" style="padding:0px;">'
			+'<table width="100%"border="1" align="center" class="grid">'
			+'<tr>'
		//	+'<td  align="left" class="Main_Tab_Style_title" width="100px">：</td>'
			+'<td  align="left" class="Main_Tab_Style_Content">'
			+'<select id="principaluser" name="principaluser" class="TextBox" style="width: 100%;"></select>'
			+'</td>'
			+'</tr>'
			+'</table>'
			+'</div>').appendTo(window.top.document.body);
	getPrincipalUserData(res,resgroup);//加载数据
	_dialog.dialog({
		title:'现场负责人',
		autoOpen:false,
		modal:true,
		closed:true,
		width:'230',
		height:'100',
		buttons:[{
			text:'保存',
			iconCls:'icon-save',
			handler:function(){
					var explorer = window.navigator.userAgent ;
					if (explorer.indexOf("MSIE") >= 0) {
							$(window.top.document.body).block({ 
							//jQuery.blockUI({ 
								message: "正在加载数据,请稍候...", 
						 		css: {
									color:'#000', 
									padding: '15px', 
									border:'2px solid #90dbfe',
									backgroundColor:'#fafafa'
								},
								overlayCSS: {
									opacity:'0.1' 
								}
							});
						}else{
							//$(window.top.document.body).block({ 
							jQuery.blockUI({ 
								message: "正在加载数据,请稍候...", 
						 		css: {
									color:'#000', 
									padding: '15px', 
									border:'2px solid #90dbfe',
									backgroundColor:'#fafafa'
								},
								overlayCSS: {
									opacity:'0.1' 
								}
							});
						}//else
			var userid=$(window.top.document).find("#principaluser").val();
			//var username=$("#oneUserFrame",top.document.body).contents().find("#selectedUser").val();
			//var userid=$("#oneUserFrame",top.document.body).contents().find("#selectedUserid").val();
			$.post(rootPath +"/monitorproject/samparrange/samparrange!saveMonitorinfo.action",{userid:userid,projectpointid:id},function(data){
				if(data=='success'){
					//alert('成功');
					if (explorer.indexOf("MSIE") >= 0) {
								$(window.top.document.body).unblock(); 
							}else{
								jQuery.unblockUI();
						}
					$("#monitorinfolist").treegrid("reload");
				}else{
					if (explorer.indexOf("MSIE") >= 0) {
						$(window.top.document.body).unblock(); 
					}else{
						jQuery.unblockUI();
					}
					alert('失败');
				}
			})
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
//获取现场负责人的信息json
function getPrincipalUserData(departid,groupid){
	$.ajax( {
		type : 'post',
		url : rootPath +'/monitorproject/samparrange/samparrange!getPrincipalUserData.action',//给该url一个时间戳~~这样就必须每次从服务器读取数据,
		data: "departid="+departid+"&groupid="+groupid,
		success : function(data) {
			var vData = eval("(" + data + ")");
			var lList = "<option value=''>---请选择---</option>";
			//遍历json数据  
			jQuery.each(vData, function(i, n) {
				lList += "<option value=" + n.userid + ">" + n.username	+ "</option>";
			});				
			//绑定数据到select中
			$('#principaluser',window.top.document).append(lList);
		}
	});
}
//批量修改采样人
function selectSamperAll(){
	var selected=$("#monitorinfolist").treegrid('getSelections');
	if(selected==null || selected.length< 1){
		alert('请至少选择一条记录！');
	}else{
			if(yeWuLeiXing=='2'){
				if(selected[0].typename=="地表水"){
					var ids="";
					for ( var i = 0; i < selected.length; i++) {
						var projectpointid=selected[i]['projectpointid'];
						if(projectpointid!=""){
							if(ids==""){
								ids=projectpointid
							}else{
								ids+=","+projectpointid;
							}
						}
					}//for
					//环境质量地表水操作
					var url =rootPath +"/oamuser/oneandmanyuser!toManyUser.action";
					selectSampUserRang(ids,"","",url)
				
				}else{
					conventionSamperAll(selected);
				}
			}else{
				conventionSamperAll(selected);
			}//else
	}
}

//常规的选择采样人
function conventionSamperAll(selected){
	if(isOneDept(selected)){
			var id=[];
			var flag=0;
			var deptids=[];
			var groupids=[];
				for ( var i = 0; i < selected.length; i++) {
					var projectpointid=selected[i]['projectpointid'];
					if(projectpointid!=""){
						flag=1;
						continue;
					}
				}//for
				if(flag==1){
					for ( var t = 0; t < selected.length; t++) {
						var projectpointid=selected[t]['projectpointid'];
						var dept=selected[t]['departid'];
						var dgroupid=selected[t]['deptgroupid'];
							if(projectpointid!=""){
								if(id==""){
									id+=projectpointid;
									deptids+=dept;
									groupids+=dgroupid;
								}
								else{
									id+=","+projectpointid;
									deptids+=","+dept;
									groupids+=","+dgroupid;
								}
							}//if(projectpointid!=""){
					}//for
					//为部门编号数组去重复
					var arr = deptids.split(",");
					var res=[],hash={};
					for(var i=0,elem;(elem=arr[i])!=null;i++){
						if(!hash[elem]){
							res.push(elem);
							hash[elem]=true;
						}
					}
					//组编号
					var arrgroup = groupids.split(",");
					var resgroup=[],hashgroup={};
					for(var i=0,elem;(elem=arrgroup[i])!=null;i++){
						if(!hashgroup[elem]){
							resgroup.push(elem);
							hashgroup[elem]=true;
						}
					}
					var url =rootPath +"/monitorproject/samparrange/samparrange!toSampleUser.action?departid="+res+"&groupid="+resgroup;
					selectSampUserRang(id,res,resgroup,url);
				}//if
				else{
					alert("请至少选择一个有监测点信息的数据");
				}
			}else{
				alert("只能批量设置一个部门的数据！");
			}
}
//选择采样人，被两种情况下调用
function selectSampUserRang(id,res,resgroup,url){
	//var userid=$("#userid").val();
	//var username=$("#username").val();
	//var url ="${ctx}/oamuser/oneandmanyuser!toManyUser.action?userid="+userid+"&realname="+username;
	var _dialog =  window.top.$('	<div id ="role-dlg" style="padding:0px;"><iframe id="selectFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
	_dialog.dialog({
		title:'采样人',
		autoOpen:false,
		modal:true,
		closed:true,
		width:'600',
		height:'500',
		buttons:[{
			text:'确定',
			iconCls:'icon-save',
			handler:function(){
				var value=$("#selectFrame",top.document.body).contents().find("#selectedUser").val();
				var valueid=$("#selectFrame",top.document.body).contents().find("#selectedUserid").val();
				var explorer = window.navigator.userAgent ;
				if(valueid!=""&&valueid!=null){
					if (explorer.indexOf("MSIE") >= 0) {
							$(window.top.document.body).block({ 
							//jQuery.blockUI({ 
								message: "正在加载数据,请稍候...", 
						 		css: {
									color:'#000', 
									padding: '15px', 
									border:'2px solid #90dbfe',
									backgroundColor:'#fafafa'
								},
								overlayCSS: {
									opacity:'0.1' 
								}
							});
						}else{
							//$(window.top.document.body).block({ 
							jQuery.blockUI({ 
								message: "正在加载数据,请稍候...", 
						 		css: {
									color:'#000', 
									padding: '15px', 
									border:'2px solid #90dbfe',
									backgroundColor:'#fafafa'
								},
								overlayCSS: {
									opacity:'0.1' 
								}
							});
						}//else
				$.post(rootPath +"/monitorproject/samparrange/samparrange!saveMonitorinfo.action",{username:valueid,projectpointid:id},function(data){
					if(data=='success'){
						if (explorer.indexOf("MSIE") >= 0) {
								$(window.top.document.body).unblock(); 
							}else{
								jQuery.unblockUI();
						}
						//alert('成功');
						//jQuery.unblockUI();
						$("#monitorinfolist").treegrid('reload');
						//$("#samplelist").datagrid('reload');
					}else{
						if (explorer.indexOf("MSIE") >= 0) {
								$(window.top.document.body).unblock(); 
							}else{
								jQuery.unblockUI();
						}
						alert('失败');
					}
				})
				_dialog.dialog('close');
				}else{
					alert("选择的采样人不能为空！");
				}
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



//批量修改采样日期
function selectSampTimeAll(){
	var selected=$("#monitorinfolist").treegrid('getSelections');
	if(selected==null || selected.length< 1){
		
		alert('请至少选择一条记录！');
	}else{
		var cc=[];
		var flag=0;
			for ( var i = 0; i < selected.length; i++) {
				var projectpointid=selected[i]['projectpointid'];
				if(projectpointid!=""){
					flag=1;
					continue;
				}
			}//for
			if(flag==1){
				for ( var t = 0; t < selected.length; t++) {
					var projectpointid=selected[t]['projectpointid'];
						if(projectpointid!=""){
							if(cc==""){
									cc+=projectpointid;;
							}
							else{
								cc+=","+projectpointid;;
							}
						}//if(projectpointid!=""){
				}//for
				selectSampTime("",cc);
			}//if
			else{
				alert("请至少选择一个有监测点信息的数据");
			}
		}
}
//采样日期
function selectSampTime(value,id){
	if(value==null){
		value="";
	}
	//   var _dialog =  window.top.$('<div id ="role-dlg" style="padding:0px;">'
	//		+'<table width="100%" border="1" align="center" class="grid">'
	//		+'<tr>'
	//		+'<td  align="left" class="Main_Tab_Style_title" width="100px">计划采样开始日期:</td>'
	////		+'<td  align="left" class="Main_Tab_Style_Content" width="150px">'
	//		+'<input id="scenetime" name="scenetime" class="Wdate" onclick="showDataTimeDailog(\'yyyy-MM-dd\')" style="width: 150px" value="'+value+'"/>'
	//		+'</td>'
	//		+'</tr>'
	//		+'</table>'
	//		+'</div>').appendTo(window.top.document.body);
	var url = rootPath + "/monitorproject/samparrange/samparrange!toMeditime.action";
	var _dialog = window.top
				.$('<div id="monitorDialog"  style="padding:0px;"><iframe id="monitorFrame" width="100%" height="100%" frameborder="0" scrolling="no" src=' + url + '></iframe></div>')
				.appendTo(window.top.document.body);
	_dialog.dialog({
		title:'采样日期',
		autoOpen:false,
		modal:true,
		closed:true,
		width:'300',
		height:'100',
		buttons:[{
			text:'确定',
			iconCls:'icon-save',
			handler:function(){
				var objs = $("#monitorFrame",top.document.body).contents().find(".grkj-validate");
					if(!saveCheck(objs)){
						$("#monitorFrame",top.document.body).contents().find(":input").focus();
						alert("数据输入不符合格式，请查看红色边框的输入框的输入提示！");
						return false;
					}				
				var scenetime = $("#monitorFrame",top.document.body).contents().find("#scenetime").val();
				var explorer = window.navigator.userAgent ;
					if (explorer.indexOf("MSIE") >= 0) {
							$(window.top.document.body).block({ 
							//jQuery.blockUI({ 
								message: "正在加载数据,请稍候...", 
						 		css: {
									color:'#000', 
									padding: '15px', 
									border:'2px solid #90dbfe',
									backgroundColor:'#fafafa'
								},
								overlayCSS: {
									opacity:'0.1' 
								}
							});
						}else{
							//$(window.top.document.body).block({ 
							jQuery.blockUI({ 
								message: "正在加载数据,请稍候...", 
						 		css: {
									color:'#000', 
									padding: '15px', 
									border:'2px solid #90dbfe',
									backgroundColor:'#fafafa'
								},
								overlayCSS: {
									opacity:'0.1' 
								}
							});
						}//else
				$.post(rootPath +"/monitorproject/samparrange/samparrange!saveMonitorinfo.action",{plansamplingdate:scenetime,projectpointid:id},function(data){
					if(data=='success'){
						if (explorer.indexOf("MSIE") >= 0) {
								$(window.top.document.body).unblock(); 
							}else{
								jQuery.unblockUI();
						}
						//alert('成功');
						$(window.top.document.body).unblock(); 
						$(".blockUI",window.top.document).fadeOut("slow");
						$("#monitorinfolist").treegrid('reload');
						//$("#samplelist").datagrid('reload');
					}else{
						if (explorer.indexOf("MSIE") >= 0) {
								$(window.top.document.body).unblock(); 
							}else{
								jQuery.unblockUI();
						}
						alert('失败');
					}
				})
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
//加载样品信息
function initSampleinfo(projectpointid){
	$('#samplelist').datagrid({
		nowrap: false,
		striped: true,
		collapsible:true,
		url:rootPath +'/monitorproject/samparrange/samparrange!toSampingList.action?projectpointid='+encodeURI(projectpointid), 
		fit : true,
		fitColumns : true,
		scrollbarSize : 0,
		remoteSort:false,
		singleSelect:true,
		idField:"samplingsetid",
		columns:[[
		      	{field:'monitordays',title:'监测天数', width:50,align:"center"},
				{field:'monitorfrequency',title:'监测频次(次/天)', width:60,align:"center"},
				{field:'samplingcount',title:'每次采样数量', width:50,align:"center"},
				{field:'stand',title:'评价标准 ', width:200,align:"center"}		
			]],
		onClickRow:function(rowIndex, rowData){
			//点击一行加载项目信息
			//psampleid = rowData.sampleid;
			initIteminfo(rowData.samplingsetid);
		},
		onLoadSuccess:function(data){
			$('#samplelist').datagrid('clearSelections');
			//默认加载第一行的基本信息
			var row = $('#samplelist').datagrid('selectRow',0);
			var rowData = $('#samplelist').datagrid('getSelected');
			
			if(rowData!=null&&rowData!=""){
				psampleid = rowData.sampleid;
				initIteminfo(rowData.samplingsetid);
			}else{
				initIteminfo("");
			}
		}
	});
	
	$(window).resize(function() {
		$("#samplelist").datagrid('resize');
	});
	$("#rightFrame").resize(function() {
		$("#samplelist").datagrid('resize');
	});
		
}

//加载项目信息
function initIteminfo(samplingsetid){
	$('#itemlist').datagrid({
		nowrap: false,
		striped: true,
		collapsible:true,
		url:rootPath +'/monitorproject/samparrange/samparrange!toItemfoList.action?samplingsetid='+encodeURI(samplingsetid), 
		fit:true,
		fitColumns : true,
		//scrollbarSize:0,
		remoteSort: false,
		iconCls:"icon-edit",
		idField:"sampleitemtestid",
		columns:[[
				{field:'itemname',title:'监测项目', width:100,align:"center"},
				{field:'itemmethod',title:'监测方法', width:200,align:"center"},
				//{field:'samplenum',title:'采样量', width:60,align:"center"},	
				//{field:'samplecontainer',title:'采样容器', width:80,align:"center"},
//				{field:'fixedadditive',title:'固定添加剂', width:80,align:"center"},
				{field:'unitname',title:'计量单位', width:60,align:"center"},
				{field:'standvalue',title:'标准值', width:60,align:"center"},
				{field:'isnowtest',title:'现场监测', width:50,align:"center",
					formatter:function(value,rec){
							var str ="";
							if(value=='Y'){
								str = "<input type='checkbox' checked='checked' disabled='disabled'/>";
							}
							if(value=='N'){
								str = "<input type='checkbox' disabled='disabled'/>";
							}
							return str;
						}
				}				
		]]
	});
	$(window).resize(function() {
		$("#itemlist").datagrid('resize');
	});
}

//获取选中的值
function getChecked(){
	var nodes = $('#itemtree').tree('getChecked');
	var s = '';
	for(var i=0; i<nodes.length; i++){
		if (s != '') s += ',';
		s += nodes[i].id+'_'+nodes[i].attributes.flag;
	}
	$("#ids").val(s);
}

//流程退回
function backObject(){
	var selected = $('#monitorinfolist').treegrid('getSelections');
		if(selected!=null&&selected.length>0){
			var cc=[];
			var flag=0;
				for ( var i = 0; i < selected.length; i++) {
					var projectpointid=selected[i]['projectpointid'];
					if(projectpointid!=""){
						flag=1;
						continue;
					}
				}//for
				if(flag==1){
					for ( var t = 0; t < selected.length; t++) {
						var projectpointid=selected[t]['projectpointid'];
							if(projectpointid!=""){
								if(cc==""){
										cc+=projectpointid;;
								}
								else{
									cc+=","+projectpointid;;
								}
							}//if(projectpointid!=""){
					}//for
					 submitpost(cc,projectid);
				}//if
				else{
					alert("请至少选择一个有监测点信息的数据");
				}
		}//if
		else{
			alert("请至少选择一条记录！");
		}
}
//填写退回意见
function submitpost(cc,parenttype){
	var str =encodeURI(encodeURI("采样安排退回意见"));
	var url = rootPath + "/projects/appraiseopinion/appraiseopinion!opinionDlg.action?moduleid="+str;
	var _dialog =  window.top.$('<div id ="dlg" style="padding:0px;"><iframe id="ssFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
	_dialog.dialog({
	title:'审核意见',
	autoOpen:false,
	modal:true,
	closed:true,
	width:'520',
	height:'220',
	buttons:[{
		text:'确定',
		iconCls:'icon-ok',
		handler:function(){
			var objs = $("#ssFrame",window.top.document).contents().find(".grkj-validate");	
			var message = $("#ssFrame",window.top.document).contents().find("#opinion").val();
			if(!saveCheck(objs)){
			$("#ssFrame",window.top.document).contents().find(":input").focus();
				alert("数据输入不符合格式，请查看红色边框的输入框的输入提示！");
				return false;
			}
			$.post(rootPath +'/monitorproject/samparrange/samparrange!backProjectMontor.action',{projectpointid:cc,projectid:parenttype,message:message},function(rex){
				if(rex=="success"){
					$(window.parent.document).find("#reloaddata").click();
					$("#monitorinfolist").treegrid('reload');
					idfild=[];
					$("#samplelist").datagrid('reload');
					$("#itemlist").datagrid('reload');
					//$("#rangeBody").html("");
					alert("成功！");
				}else{
					alert("失败");
				}
			});
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

//采样安排报表
function mimeograph(){
	var url =rootPath +"/common/report!toReportPage.action?raq=/SampingSet.raq&projectid="+projectid+"&samplingdept="+departid;
	var _dialog =  window.top.$('	<div id ="role-dlg" style="padding:0px;"><iframe id="samplingBillFrame" width="100%" height="100%" frameborder="0" style="overflow-x:hidden;overflow-y:auto" src='+url+'></iframe></div>').appendTo(window.top.document.body);
	_dialog.dialog({
		title:'采样安排',
		maximizable:true,
		autoOpen:false,
		modal:true,
		closed:true,
		width:'830',
		height:'700',
		buttons:[{
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
 