function initHistoryData(id) {
		$('#historygrid')
				.datagrid(
						{									
							nowrap : false,
							striped : true,						
							collapsible : true,
							url:rootPath +'/material/inventory/materialuserecord!inventoryhistoryList.action?inventoryid='+id, 
//							sortName : 'useid',
//							sortOrder : 'asc',
							remoteSort : false,
						//	idField : 'versionid',
							fit:true,
							fitColumns:true,
							scrollbarSize:0,
							pageSize : 10,
							pageList : [10,20,30,40 ],
							frozenColumns : [ [ {
								field : 'useid',
								checkbox : true,align:'center'
							} ] ],
							columns : [ [
									{
										field : 'useperson',
										title : '领用人',
										width : 70,
										align : 'center'
									},
									{
										field : 'usedate',
										title : '领用日期',
										width : 100,
										align : 'center'
									},

									{
										field : 'usenum',
										title : '领用数量',
										width : 50,
										align : "center"
									},

									{
										field : 'usepurpose',
										title : '备注',
										width : 150,
										align : "center"
									}] ],
							pagination : true,
							rownumbers : true
						});
		$(window).resize(function(){
			$("#historygrid").datagrid('resize');
		});
		
	}



//删除功能~批量

function delAll() {
	var selected = $('#historygrid').datagrid('getSelections');

	if (selected != null && selected != "") {
		if (window.confirm("是否删除？")) {
			var selcheck = new Array();
			for ( var i = 0; i < selected.length; i++) {
				selcheck[i] = selected[i].useid;
			}
			$.post(rootPath + "/material/inventory/materialuserecord!betchDeleteInvenHist.action?id="
					+ selcheck, function(del) {
				if (del == 'success') {
					alert("删除成功!");
					$("#historygrid").datagrid('reload');
				}else{
					alert("删除失败!");
					$("#historygrid").datagrid('reload');
				}
			});
		}
	} else {
		alert('请至少选择一条记录！');
		return;
	}
}



//增加
function addWin(inventoryid)  {
	var url = rootPath + "/material/inventory/materialuserecord!input.action";
	if (inventoryid!="") {
		url = url + "?inventoryid="+inventoryid;
	}
	var _dialog = window.top
			.$('<div id ="role-dlg" style="padding:0px;"><iframe id="intoryFrame" width="100%" height="100%" frameborder="0" scrolling="no" src=' + url + '></iframe></div>')
			.appendTo(window.top.document.body);
	_dialog.dialog( {
		title : '领用编辑',
		autoOpen : false,
		modal : true,
		closed : true,
		width : '530',
		height : '300',
		buttons : [
				{
					text : '保存',
					iconCls : 'icon-save',
					handler : function() {
						$("#intoryFrame",top.document.body).contents().find("#inventoryhistoryform").form('submit', {
							url : rootPath + "/material/inventory/materialuserecord!save.action?inventoryid="+inventoryid,
							onSubmit : function() {
							var useperson = $("#intoryFrame",top.document.body).contents().find("#useperson").val();
							var usenum = $("#intoryFrame",top.document.body).contents().find("#usenum").val();
							var usedate = $("#intoryFrame",top.document.body).contents().find("#usedate").val();
							
							if(usedate==""){
								$("#intoryFrame",top.document.body).contents().find("#usedate").focus();
								$("#intoryFrame",top.document.body).contents().find("#useperson").focus();
								$("#intoryFrame",top.document.body).contents().find("#usenum").focus();
								alert("数据输入不符合格式，请查看红色边框的输入框的输入提示！");
								return false;
							}else if(useperson==""||usenum==""){
								$("#intoryFrame",top.document.body).contents().find("#useperson").focus();
								$("#intoryFrame",top.document.body).contents().find("#usenum").focus();
								alert("数据输入不符合格式，请查看红色边框的输入框的输入提示！");
								return false;
							}
							/*
							
							var objs= $("#intoryFrame",top.document.body).contents().find(".grkj-validate");
							if(!saveCheck(objs)){
								$("#intoryFrame",top.document.body).contents().find(":input").focus();
								$("#intoryFrame",top.document.body).contents().find("#usedate").val();
								alert("数据输入不符合格式，请查看红色边框的输入框的输入提示！");
								return false;
							}*/
							},
							success : function(data) {	
								if(data=='success'){
									_dialog.dialog('close');
									alert("保存成功！");
									$("#historygrid").datagrid('reload');
								} else if(data=='zero'){
									alert("零个不用领！");
									return ;
								}
								else if(data.indexOf('over')!=-1){
									
										alert("库存不足，当前仅剩"+data.substring(4,data.length)+"个！");
										return ;
								}else{
									alert("当前不能领用，请稍后再试！");
									return ;
								}
							},
							error:function(data){
								if(data=='fail'){
									alert("保存失败！");
									return ;
								}
							}
						});
					}
				}, {
					text : '取消',
					iconCls : 'icon-cancel',
					handler : function() {
						_dialog.dialog('close');
					}
				} ],
		onClose : function() {
			_dialog.dialog("destroy");
		}
	});
	_dialog.dialog('open');
}



//姓名的弹出窗口使用selectedUserid
function showName(){
	//url=rootPath +"/certificateinfo/certificateinfo!showname.action";//自己做部门下拉框的选择按钮
	var url =  rootPath +"/oamuser/oneandmanyuser!toOneUser.action";
	var _dialog =  window.top.$('<div id ="cert-dlg" style="padding:0px;"><iframe id="ItemFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
	_dialog.dialog({
		title:'姓名选择',
		autoOpen:false,
		modal:true,
		closed:true,
		width:'800',
		height:'500',
		buttons:[{
			text:'确定',
			iconCls:'icon-save',
			handler:function(){
		/*	var selectedUser = $("#ItemFrame",top.document.body).contents().find('#selectedUser').val();
			var selecteddeparname = $("#ItemFrame",top.document.body).contents().find('#selecteddeparname').val();
			if(selectedUser==""||selectedUser==null||selecteddeparname==""||selecteddeparname==null){
				alert("请在选择人员之前先选择科室！");useperson
				return false;
			}*/
		
			var selectedUser=$("#ItemFrame",top.document.body).contents().find("#selectedUser").val();//领用人
			$("#useperson").val(selectedUser);
			var selectedUserid=$("#ItemFrame",top.document.body).contents().find("#selectedUserid").val();//部门
			$("#userid").val(selectedUserid);
			

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


//检索
function searchObj(){
	var entName;
	if(entnameVal==null){
		entName=$('#entname').val();
	}else{
		entName=entnameVal;
	}
	var realname = $('#realname').val();			//仪器编号
	var fromdate = $('#fromdate').val();
	var todate = $('#todate').val();
	if(fromdate!=""&&todate==""||fromdate==""&&todate!=""){
		alert("请输入完整的时间段查询");
		return false;
	}
	$('#historygrid').datagrid( {
		queryParams : {
		realname : realname,
			fromdate : fromdate,
			todate : todate
		},
		pageNumber:1
	});

}
