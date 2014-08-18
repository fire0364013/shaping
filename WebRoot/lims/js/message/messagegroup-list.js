Array.prototype.indexOf = function (val) {  
    for (var i = 0; i < this.length; i++) {  
        if (this[i] == val) {  
            return i;  
        }  
    }  
    return -1;  
};  
Array.prototype.remove = function (val) {  
    var index = this.indexOf(val);  
    if (index > -1) {  
        this.splice(index, 1);  
    }  
}; 

function messageworkgroup(workcode){
		$('#workgrouptree').tree({
			checkbox:true,
			url: rootPath+"/message/messagegroup!viewgroup.action?id="+workcode,
			onClick:function(node){
			var myurl=rootPath+"/message/messagegroup!showUserGroup.action?messagegroupid="+node.id;
            clickworknode(myurl,node.id);
			},onContextMenu:workcontextMenu
		});
	}

function clickworknode(myurl,groupid){
			$('#userdatagrid1').datagrid({
				nowrap : false,
				striped : true,
				collapsible : true,
				url :myurl,
				fit : true,
				fitColumns : true,
				scrollbarSize:0,
				remoteSort : false,
				idField : 'usergroupid',
				pageSize : 9,
				pageList : [ 9, 18, 27,36 ],
				frozenColumns : [ [ {
					field : 'userid',
					checkbox : true,
					align:"center"
				} ] ],
				columns:[[
						{field:'realname',title:'姓名',width:200,align:"center"},
						{field:'tel',title:'电话',width:100,align:"center"}
				]],
				pagination:true,
				rownumbers:true
				
			});
			$("#workgrouptree").resize(function() {
			$("#userdatagrid1").datagrid('resize');
		});
		}

function workcontextMenu(e,node){
		
		$('#workgrouptree').tree('select',node.target);
		$('#messageworkgroupid').val(node.id);
		$("#grouptree-menu").menu("show", {left: e.pageX,top: e.pageY});
		e.preventDefault();
	}

	function messagegroup(){
		$('#grouptree').tree({
			checkbox:true,
			url: rootPath+"/message/messagegroup!toTrees.action",
			onClick:function(node){
			var myurl=rootPath+"/message/messagegroup!showUserGroup.action?groupid="+node.id;
       		$("#usertable").show();
			 $("#realname").val("");
            clicknode(myurl,node.id);
			},
//			onLoadSuccess:loadSucces,
			onContextMenu:contextMenu
//			onSelect:onselect,
//			onCheck:oncheck,
//			onUnselect:unselect,
//			onSelectAll:selectAll,
//			onUnselectAll:unselectAll
		});
	}
	
//	function loadSucces(data){
//			//一下是原来的部分
//			var valueids=$("#groupids").val();
//			var valueid=$("#groupids").val().split(",");
//			
//			//alert(valueids);
//			if(valueids!=null&&valueids!=""){
//				for ( var i = 0; i < valueid.length; i++) {
//					//alert(valueid[i]);
//					var rows = $('#grouptree').tree('selectRecord',valueid[i]);
//				}
//				
//			}
//		}
//		//选择一行数据
//		function onselect(node){
//			var ss=node.id;
//			var valueid=$("#groupids").val();
//			if(valueid==""||valueid==null){
//				$("#groupids").val(ss);
//			}else{
//				var valueidsplit=valueid.split(",");
//				var flag=0;
//				for ( var i = 0; i < valueidsplit.length; i++) {
//					if(valueidsplit[i]==ss){
//						flag=1;
//						return;
//					}
//				}
//				if(flag==0){
//					$("#groupids").val(valueid+","+ss);
//				}
//			}
//		}
//		
//		function oncheck(node,checked){
//			var ss=node.id;
//			var valueid=$("#groupids").val();
//			if(valueid==""||valueid==null){
//				$("#groupids").val(ss);
//			}else{
//				var valueidsplit=valueid.split(",");
//				var flag=0;
//				for ( var i = 0; i < valueidsplit.length; i++) {
//					if(valueidsplit[i]==ss){
//						flag=1;
//						return;
//					}
//				}
//				if(flag==0){
//					$("#groupids").val(valueid+","+ss);
//				}
//			}
//		}
//		//取消选中一行数据
//		function unselect(node){
//			 var valueid=$("#groupids").val().split(",");
//			 var acceptvalid=[];
//			 for ( var i = 0; i < valueid.length; i++) {
//				if(node.id==valueid[i]){
//					continue;
//				}
//				if(acceptvalid==""){
//					acceptvalid+=valueid[i];
//				}else{
//					acceptvalid+=","+valueid[i];
//				}
//				
//			}
//			 $("#groupids").val(acceptvalid);
//		}
//		//选中所有行
//		function selectAll(){
//			var valueid=$("#groupids").val().split(",");
//			var selected=$("#grouptree").tree('getSelections');
//			for ( var j = 0; j < selected.length; j++) {
//				var tt=0;
//				for ( var i = 0; i < valueid.length; i++) {
//					if(valueid[i]==selected[j]['id']){
//						tt=1;
//					}
//				}
//				if(tt==0){
//					if(valueid==""){
//						valueid+=selected[j]['id'];
//					}else{
//						valueid+=","+selected[j]['id'];
//					}
//				}
//			}
//			$("#groupids").val(valueid);
//		}
//		//取消选中所有行
//		function unselectAll(){
//			var rows = $('#grouptree').tree('getRoots');
//			var valueid=$("#groupids").val().split(",");
//			var receiveid=[];
//			for ( var j = 0; j <valueid.length; j++) {
//				var tt=0;
//				for ( var i = 0; i < rows.length; i++) {
//					if(valueid[j]==rows[i]['id']){
//						tt=1;
//						continue;
//					}
//				}
//				if(tt==0){
//					if(receiveid==""){
//						receiveid+=valueid[j];
//					}else{
//						receiveid+=","+valueid[j];
//					}
//				}
//			}
//			$("#groupids").val(receiveid);
//		}
	
	
	
	
	
	function contextMenu(e,node){
		
		$('#grouptree').tree('select',node.target);
		$('#addusergroup').addClass("disable");
		if(node.id!=""){
			$('#addusergroup').removeClass("disable");
		}
		$("#grouptree-menu").menu("show", {left: e.pageX,top: e.pageY});
		e.preventDefault();
	}
	//增加分组
	function addGroup(id){
	    var selecttree=$('#grouptree').tree('getSelected');
		var deptname="";
		var groupid="";
		if(id=="edit"){
			deptname=selecttree.text;
			groupid=selecttree.id; 
		}else{
			deptname="";
			groupid="";
		}
		editGroup(deptname,groupid);
	}
	function editGroup(value,groupid){
		var _dialog =  window.top.$('<div id ="role-dlg" style="padding:0px;">'
				+'<table width="100%" border="1" align="center" class="grid">'
				+'<tr>'
				+'<td  align="left" class="Main_Tab_Style_title" width="100px">组名称:</td>'
				+'<td  align="left" class="Main_Tab_Style_Content" width="150px">'
				+'<input id="groupname" name="groupname"  class="TextBox grkj-validate" style="width: 150px;height:20px"'
				+'validateParam="{type:\'String\',maxLength:\'40\',required:\'true\',message:\'请输入组名！\' }" value="'+value+'"/>'
				+'</td>'
				+'</tr>'
				+'</table>'
				+'</div>').appendTo(window.top.document.body);
		_dialog.dialog({
			title:'分组编辑',
			autoOpen:false,
			modal:true,
			closed:true,
			width:'300',
			height:'100',
			buttons:[{
				text:'确定',
				iconCls:'icon-save',
				handler:function(){
				var groupname=$(window.top.document).find("#groupname").val();
				var objs = $(window.top.document).find(".grkj-validate");
				if(!saveCheck(objs)){
					$(window.top.document).find(":input").focus();
					alert("请输入组名称,并且不能超过20个字！");
					return false;
				}else{
						$.post(rootPath +"/message/messagegroup!save.action",{groupname:groupname,id:groupid},function(data){
							if(data=='success'){
								alert('成功');
								$("#grouptree").tree('reload');
							}else{
								alert('失败');
							}
						});//post
						_dialog.dialog('close');
					}//else
				}//function
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

	//删除分组
	function delGroup(){
		var selecttree=$('#grouptree').tree('getSelected');
		if(window.confirm('是否删除分组及下面的人员？')){
			$.post(rootPath +"/message/messagegroup!deleteOne.action",{groupid:selecttree.id},function(data){
				if(data=='success'){
					alert('成功');
					$("#grouptree").tree('reload');
					$('#datagrid1').datagrid('reload');
					$('#itemlist').datagrid('reload');
				}else{
					alert('失败');
					$("#grouptree").tree('reload');
					$('#datagrid1').datagrid('reload');
					$('#itemlist').datagrid('reload');
				}
			});//post
		}
	}
	//加载人员列表
	function clicknode(myurl,groupid){
			$('#datagrid1').datagrid({
				nowrap : false,
				striped : true,
				collapsible : true,
				url :myurl,
				fit : true,
				fitColumns : true,
				scrollbarSize:0,
				remoteSort : false,
				idField : 'usergroupid',
				pageSize : 9,
				pageList : [ 9, 18, 27,36 ],
				frozenColumns : [ [ {
					field : 'userid',
					checkbox : true,
					align:"center"
				} ] ],
				columns:[[
						{field:'realname',title:'姓名',width:200,align:"center"},
						{field:'tel',title:'电话',width:100,align:"center"},
						{field:'operate',title:'操作',width:100,align:"center",
								formatter:function(value,rec,rowIndex){
									var links='<img src="'+rootPath+'/themes/default/images/deleteimage.png"   alt="删除" id="btnshow" onclick="delOne('+ rec.usergroupid +','+rowIndex+')"/>';
									return links;
								}
						}	
				]],
				pagination:true,
				rownumbers:true,
				onLoadSuccess:function(){
				$('#datagrid1').datagrid('clearSelections');
				}
			});
			$("#groups").resize(function() {
			$("#datagrid1").datagrid('resize');
		});
		}

	//查询人员
	function query(){
			var realname=$("#realname").val();
			var selecttree=$('#grouptree').tree('getSelected');
			var myurl;
			var groupid=selecttree.id;
			var selecttree=$('#grouptree').tree('getSelected');
            myurl=rootPath+"/message/messagegroup!showUserGroup.action?realname="+encodeURIComponent(encodeURIComponent(realname))+"&groupid="+groupid;
			$("#usertable").show();
			clicknode(myurl,groupid);
			
	}


	//增加人员
	function addUserGroup(){
		if($("#addusergroup").attr("disabled")=="disabled"){
			return false;
		}
		var selecttree=$('#grouptree').tree('getSelected');
		var groupid = selecttree.id;
		var url =  rootPath +"/message/messagegroup!toUserGroup.action?groupid="+selecttree.id;
		var _dialog =  window.top.$('<div id ="role-dlg" style="padding:0px;"><iframe id="manyUserFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
			_dialog.dialog({
			   title:'人员列表',
				autoOpen:false,
				modal:true,
				closed:true,
				width:'800',
				height:'500',
				buttons:[{
					text:'保存',
					iconCls:'icon-save',
					handler:function(){
					var userid=$("#manyUserFrame",top.document.body).contents().find("#selectedUserid").val();
						$.post(rootPath +"/message/messagegroup!saveUserGroup.action",{userid:userid,groupid:selecttree.id},function(data){
							if(data=='success'){
								alert('成功');
								var myurl = rootPath+ "/message/messagegroup!showUserGroup.action?groupid="+groupid;
                                $("#usertable").show();
								$("#realname").val("");
								clicknode(myurl,groupid);
							}else{
								alert('失败');
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
		//});
		
	}
	//批量删除人员	
	function delAll(){
		var selected=$("#datagrid1").datagrid('getSelections');
		//alert(selected.length);
		if(selected==null || selected.length< 1){
			alert('请至少选择一条记录！');
		}
		else{
			if(window.confirm('是否删除？')){
				var cc=[];
				for ( var i = 0; i < selected.length; i++) {
					if(cc==""){
							cc+=selected[i]['usergroupid'];
					}
					else{
						cc+=","+selected[i]['usergroupid'];
						}
				}
				$.post(rootPath +"/message/messagegroup!deleteAllUser.action",{"usergroupid":cc},function(del){
					if(del=='success'){
						$('#datagrid1').datagrid('clearSelections');
						$("#datagrid1").datagrid('reload');
						alert('删除成功！');
					}
				});
				
			 }
		}
	}	
	
	//删除一条人员
	function delOne(uid,rowIndex){
			$('#datagrid1').datagrid('clearSelections');
			$('#datagrid1').datagrid('selectRow',rowIndex);
				if(window.confirm('是否删除？')){
					$.post(rootPath +"/message/messagegroup!deleteOnlyOne.action",{id:uid},function(del){
						if(del=='success'){
							$('#datagrid1').datagrid('clearSelections');
							$("#datagrid1").datagrid('reload');
							alert('成功');
						}
						
					});
				}
	}
	
	
	function addworkGroup(){
		var url = rootPath + "/message/messagegroup!toGroupPage.action";
		var _dialog =  window.top.$('	<div id ="dlg" style="padding:0px;"><iframe id="groupFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
		_dialog.dialog({
			title : '分组管理',
			width : 890,
			height : 580,
			closed : false,
			cache : false,
			modal : true,
			buttons : [{
				text : '保存',
				iconCls:'icon-save',
				handler : function(){
					$("#groupFrame",window.top.document).contents().find("#groupids").click();
					var selecttree = $("#groupFrame",window.top.document).contents().find("#groupids").val();
					if(selecttree == ''){
						alert("请选择分组");
						return;
					}
					var workflowcode = $("#workflowcode").val();
					$.post(rootPath +"/message/messagegroup!ishavegroup.action",{workflowcode:workflowcode,groupids:selecttree},function(meg){
						if(meg!=''){
							alert(meg+"已经存在,请重新选择!");
							return;
						}else{
							$.post(rootPath +"/message/messagegroup!savemessagegroup.action",{workflowcode:workflowcode,groupids:selecttree},function(meg){
								if(meg=='success'){
									alert('成功');
									_dialog.dialog('close');
									$("#workgrouptree").tree('reload');
									
								}else{
									alert('失败');
									_dialog.dialog('close');
								}
							});
						}
					});
					
			    }
			},{
				text : '关闭',
				iconCls:'icon-cancel',
				handler : function() {
					_dialog.dialog('close');
				}
			}],
			onClose:function(){
				_dialog.dialog("destroy");					
				}
		});
	}
	
	function delworkGroup(){
		
		var id = $('#messageworkgroupid').val();
		$.post(rootPath +"/message/messagegroup!delmessagegroup.action",{id:id},function(meg){
						if(meg=='success'){
							alert('删除成功');
							$("#workgrouptree").tree('reload');
						}else{
							alert('删除失败');
						}
						
					});
	}
	
	function delmanygroup(){
		var groups = $("#workgrouptree").tree("getChecked");
		var groupids = "";
		for(var i = 0 ; i < groups.length ; i ++){
			if(groupids == ""){
				groupids += groups[i].id;
			}else{
				groupids += ","+groups[i].id;
			}
		}
		$.post(rootPath +"/message/messagegroup!delmessagegroup.action",{id:groupids},function(meg){
						if(meg=='success'){
							alert('删除成功');
							$("#workgrouptree").tree('reload');
						}else{
							alert('删除失败');
						}
						
					});
	}