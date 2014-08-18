$(function() {
	var documentWidth = document.body.clientWidth;
	$('#datagrid1')
			.datagrid(
					{
						// title:'用户信息列表',
						width : documentWidth,
						height : document.body.clientHeight,
						nowrap : false,
						striped : true,
						collapsible : true,
						url : rootPath + '/userinfo/userinfo!toList.action',
						fit : true,
						fitColumns : true,
						scrollbarSize:0,
						remoteSort : false,
						idField : 'userid',
						pageSize : 20,
						pageList : [ 20, 30, 40, 50 ],
						frozenColumns : [ [ {
							field : 'userid',
							checkbox : true,align:'center'
						} ] ],
						columns : [ [
								{
									field : 'realname',
									title : '姓名',
									width : 140,
									align : "center"
								},
								{
									field : 'loginname',
									title : '用户登录名',
									width : 140,
									align : "center"
								},
								{
									field : 'sex',
									title : '性别',
									width : 135,
									align : "center"
								},
								{
									field : 'entname',
									title : '所属单位',
									width : 135,
									align : "center"
								},
								{
									field : 'userstatus',
									title : '用户状态',
									width : 154,
									align : "center",
									formatter : function(value) {
										var sta = "";
										if (value == 1) {
											sta = "正常";
										}
										if (value == 0) {
											sta = "停用";
										}
										return sta;
									}
								},
								{
									field : 'operate',
									title : '操作',
									width : 140,
									align : "center",
									formatter : function(value, rec,rowIndex) {

										var links = '<img src="'
												+ rootPath
												+ '/themes/default/images/xiangxiimage.png" id="btnshow" onclick="detail('
												+ rec.userid
												+ ')" alt="详情"/>&nbsp;&nbsp;';
										links += '<img src="'
												+ rootPath
												+ '/themes/default/images/bianjiimage.png" id="btnshow" onclick="addWin('
												+ rec.userid
												+ ')" alt="编辑"/>&nbsp;&nbsp;';
										if(rec.loginname!='admin')
										{
											links += '<img src="'
													+ rootPath
													+ '/themes/default/images/stop.png" id="btnshow" onclick="del('
													+ rec.userid + ','+rowIndex+')" alt="停用"/>&nbsp;&nbsp;';
										}
										links += '<img src="'
												+ rootPath
												+ '/themes/default/images/shouquanimage.png" id="btnshow" onclick="addRole(\''
												+ rec.userid
												+ '\')" alt="授权"/>';
										return links;
									}
								} ] ],
						pagination : true,
						rownumbers : true,
						onLoadSuccess:function(){
							$('#datagrid1').datagrid('clearSelections');
						}

					});
	$(window).resize(function() {
			$("#datagrid1").datagrid('resize', {

				width : function() {
					return documentWidth;
				},
				height : function() {
					return document.body.clientHeight;
				}
			});
		});

});

//验证用户登录名不重复	
function validate(){
	var loginn = $('#loginname').val();
	var userid=$("#userid").val();
	if(userid==null||userid==""){
		if (loginn != ""&& loginn!=null) {
			$.post(rootPath +"/userinfo/userinfo!validateLoginName.action",{"loginname":loginn},function(del) {
				if (del == 'success') {
					alert("此登录名已经存在，请确认输入！");
				}
			});
		}
	}			
}
	//添加
	function addWin(id){
		$('#datagrid1').datagrid('clearSelections');
		var url =  rootPath +"/userinfo/userinfo!input.action";
		if(id!=""){
			url = url + "?id="+id;
		}
		//$(window.top.document).find("#btnProjectInfo").click();
		var _dialog =  window.top.$('<div id ="role-dlg" style="padding:0px;"><iframe id="userinfoFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
		//window.top.document.body.appendChild(win);
		_dialog.dialog({
			title:'用户编辑',
			autoOpen:false,
			modal:true,
			closed:true,
			width:'480',
			height:'480',
			buttons:[{
				text:'保存',
				iconCls:'icon-save',
				handler:function(){
				$("#userinfoFrame",top.document.body).contents().find("#userinfofrom").form('submit',{
						url:'userinfo!save.action',
						onSubmit:function(){
						var objs = $("#userinfoFrame",top.document.body).contents().find(".grkj-validate");
						if(!saveCheck(objs)){
							$("#userinfoFrame",top.document.body).contents().find(":input").focus();
							alert("数据输入不符合格式，请查看红色边框的输入框的输入提示！");
							return false;
							}
						},
						success:function(data){
							if(data=='fail'){
								alert("登录名已经存在，请确认输入！");
								return;
							}
							if(data=='success'){
								_dialog.dialog('close');
								alert('保存成功！');
								$("#datagrid1").datagrid('reload');
								
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
	

	//关闭
	function closeAddWin(){
		$('#addWin').window('close');
	}
	
	//详情
	function detail(id){
		$('#datagrid1').datagrid('clearSelections');
		//alert(id);
		var url =  rootPath +"/userinfo/userinfo!view.action";
		if(id!=""){
			url = url + "?id="+id;
		}
		//$(window.top.document).find("#btnProjectInfo").click();
		var _dialog =  window.top.$('	<div id ="role-dlg" style="padding:0px;"><iframe id="userinfoFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
		//window.top.document.body.appendChild(win);
		_dialog.dialog({
			title:'用户详情',
			autoOpen:false,
			modal:true,
			closed:true,
			width:'450',
			height:'400'
		});
		_dialog.dialog('open');
	}



	//批量删除	
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
							cc+=selected[i]['userid'];
					}
					else{
						cc+=","+selected[i]['userid'];
						}
				}
				
				$.post(rootPath +"/userinfo/userinfo!deleteAll.action",{"uids":cc},function(del){
					if(del=='success'){
						$('#datagrid1').datagrid('clearSelections');
						$("#datagrid1").datagrid('reload');
						alert('删除成功！');
					}
				});
				
			 }
		}
	}
	//单条删除
	function del(uid,rowIndex){
		$('#datagrid1').datagrid('clearSelections');
		$('#datagrid1').datagrid('selectRow',rowIndex);
			if(window.confirm('是否停用？')){
				$.post( rootPath +"/userinfo/userinfo!deleteOnlyOne.action",{id:uid},function(del){
					if(del=='success'){
						$('#datagrid1').datagrid('clearSelections');
						$("#datagrid1").datagrid('reload');
						alert('停用成功！');
					}
				});
				}
	}
	//查询
	function query(){
		var realname=$("#realname").val();
		var userstatus=$("#userstatus").val();
		var depatnames=$("#depatnames").val();
		$('#datagrid1').datagrid( {
			queryParams : {
			realname : realname,
			userstatus : userstatus	,
			depatnames:depatnames
			},
			pageNumber:1		
		});
	}







//做单用户测试用的
function oneuser(){
	//此处的realname   和userid   传自己的文本款的值即可
	var url =  rootPath +"/oamuser/oneandmanyuser!toOneUser.action?realname=朱大昕&userid=34";
	
	var _dialog =  window.top.$('<div id ="role-dlg" style="padding:0px;"><iframe id="oneUserFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
	_dialog.dialog({
		title:'测试',
		autoOpen:false,
		modal:true,
		closed:true,
		width:'800',
		height:'500',
		buttons:[{
			text:'保存',
			iconCls:'icon-save',
			handler:function(){
			var val=$("#oneUserFrame",top.document.body).contents().find("#selectedUser").val();
			$("#testid").val($("#oneUserFrame",top.document.body).contents().find("#selectedUserid").val());
			$("#test").val(val);//将此处的test  和    testid   换成自己的名字文本框的id   和    隐藏的id的文本框的    id值即可
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
//做多用户测试用的
function manyuser(){
	//此处的realname   和userid   传自己的文本款的值即可
	var url =  rootPath +"/oamuser/oneandmanyuser!toManyUser.action?realname=朱大昕,陈斯科&userid=34,35";
	var _dialog =  window.top.$('<div id ="role-dlg" style="padding:0px;"><iframe id="manyUserFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
	_dialog.dialog({
		title:'测试',
		autoOpen:false,
		modal:true,
		closed:true,
		width:'800',
		height:'500',
		buttons:[{
			text:'保存',
			iconCls:'icon-save',
			handler:function(){
			var val=$("#manyUserFrame",top.document.body).contents().find("#selectedUser").val();
			$("#test").val(val);
			$("#testid").val($("#manyUserFrame",top.document.body).contents().find("#selectedUserid").val());
			//将此处的test  和    testid   换成自己的名字文本框的id   和    隐藏的id的文本框的    id值即可
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



//选择弹出框
function selectdepar(){
	var depid=$("#depid").val();
	var depname=$("#depname").val();
	var url =rootPath+"/departmentinfo/departmentinfo!selectlist.action?deptnameid="+depid+"&depnames="+depname;
	var _dialog =  window.top.$('	<div id ="role-dlg" style="padding:0px;"><iframe id="selectFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
	_dialog.dialog({
		title:'分管部门',
		autoOpen:false,
		modal:true,
		closed:true,
		width:'630',
		height:'530',
		buttons:[{
			text:'确定',
			iconCls:'icon-save',
			handler:function(){
				var value=$("#selectFrame",top.document.body).contents().find("#seletdeptnames").val();
				var valueid=$("#selectFrame",top.document.body).contents().find("#seletdeptid").val();
				$("#depname").val(value);
				$("#depid").val(valueid);
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
//所属企业选择
function selectEntinfo(){
	var url = rootPath + "/userinfo/userinfo!toEntpriseListPage.action";
	var _dialog =  window.top.$('<div id ="plans-dlg" style="padding:0px;"><iframe id="entInfoFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
	_dialog.dialog({
		title:'选择企业',
		autoOpen:false,
		modal:true,
		closed:true,
		width:'950',
		height:'580',
		buttons:[{
			text:'确定',
			iconCls:'icon-save',
			handler:function(){
					
					var entId=$("#entInfoFrame",top.document.body).contents().find("#entid").val();				
					var entName=$("#entInfoFrame",top.document.body).contents().find("#name").val();
//					var address=$("#entInfoFrame",top.document.body).contents().find("#address").val();
					$("#entname").val(entName);
					$("#entid").val(entId);
//					$("#entaddress").val(address);
//					$("#projectname").val(entName);
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

		