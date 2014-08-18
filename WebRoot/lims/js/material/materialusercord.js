function initHistoryData(flagName) {
		$('#historygrid')
				.datagrid(
						{									
							nowrap : false,
							striped : true,						
							collapsible : true,
							url:rootPath +'/material/inventory/materialuserecord!userecordList.action?flagName='+flagName, 
							sortName : 'useid',
							sortOrder : 'asc',
							remoteSort : false,
							fit:true,
							fitColumns:true,
							scrollbarSize:0,
							frozenColumns : [ [ {
								field : 'useid',
								checkbox : true,align : 'center'
							} ] ],
							pageSize : 10,
							pageList : [10,20, 30, 40 ],
							columns : [ [
//								{
//										field : 'inventoryid',
//										title : '库存id',
//										width : 120,
//										hidden : true
//									},
								{
										field : 'materialname',
										title : '物品名称',
										width : 120,
										align : 'center'
									},
									{
										field : 'model',
										title : '规格型号',
										width : 100,
										align : 'center'
									},
									{
										field : 'unit',
										title : '计量单位',
										width : 80,
										align : 'center'
									},
									{
										field : 'materialstype',
										title : '物品类型',
										width : 100,
										align : 'center'
									},
									{
										field : 'useperson',
										title : '领用人',
										width : 80,
										align : 'center'
									},
									{
										field : 'usedept',
										title : '领用科室',
										width : 80,
										align : 'center'
									},
									{
										field : 'usedate',
										title : '领用日期',
										width : 80,
										align : 'center'
									},
									{
										field : 'usenum',
										title : '领用数量',

										width : 60,
										align : "center"
									},{field:'operate',title:'操作',width:120,align : 'center',
									formatter:function(value,rowData,rowIndex){
									return '<img src="'+rootPath+'/themes/default/images/bianjiimage.png"  alt="编辑"  onclick="addWin(\''+rowData.useid+ '\',\''+ rowData.inventoryid+'\')"/> &nbsp;&nbsp;' +
									 '<img src="'+rootPath+'/themes/default/images/deleteimage.png"  alt="删除"  onclick="delone(\''+rowData.useid+ '\')"/>&nbsp;&nbsp; ' 
						}
					}] ],
							pagination : true,
							rownumbers : true
						});
		$(window).resize(function(){
			$("#historygrid").datagrid('resize');
		});
	}

//检索
function searchObj(){
	var materialname = $("#materialname").val();//物品名称
	var materialtype = $("#materialtype").val();//物品类型
	var realname = $('#realname').val();	 
	var fromdate = $('#fromdate').val();
	var todate = $('#todate').val();
	if(fromdate!=""&&todate==""||fromdate==""&&todate!=""){
		alert("请输入完整的时间段查询");
		return false;
	}
	$('#historygrid').datagrid( {
		queryParams : {
			materialname : materialname,
			materialtype:materialtype,
			realname : realname,
			fromdate : fromdate,
			todate : todate
		},
		pageNumber:1
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

//删除功能~批量

function delone(usid) {

		if (window.confirm("是否删除？")) {
			$.post(rootPath + "/material/inventory/materialuserecord!betchDeleteInvenHist.action?id="
					+ usid, function(del) {
				if (del == 'success') {
					alert("删除成功!");
					$("#historygrid").datagrid('reload');
				}else{
					alert("删除失败!");
					$("#historygrid").datagrid('reload');
				}
			});
		}
}
//增加
function addWin(useid,inventoryid)  {
	var url = rootPath + "/material/inventory/materialuserecord!update.action";
	if (useid!="") {
		url = url + "?useid="+useid;
	}
	var _dialog = window.top.$('<div id ="role-dlg" style="padding:0px;"><iframe id="intoryFrame" width="100%" height="100%" frameborder="0" scrolling="no" src=' + url + '></iframe></div>')
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
							url : rootPath + "/material/inventory/materialuserecord!save.action?inventoryid="+inventoryid+"&useid="+useid,
							onSubmit : function() {
							var useperson = $("#intoryFrame",top.document.body).contents().find("#useperson").val();
							var usenum = $("#intoryFrame",top.document.body).contents().find("#usenum").val();
							var usedate = $("#intoryFrame",top.document.body).contents().find("#usedate").val();
							
							if(useperson==""||usenum==""){
								$("#intoryFrame",top.document.body).contents().find("#useperson").focus();
								$("#intoryFrame",top.document.body).contents().find("#usenum").focus();
								$("#intoryFrame",top.document.body).contents().find("#remark").focus();
								alert("数据输入不符合格式，请查看红色边框的输入框的输入提示！");
								return false;
							}else if(usedate==""){
								alert("领用日期不能为空！");
								return false;
							}
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
									alert("当前不能领用，请稍后再试，或者与系统管理员联系！");
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

//导出  用的是employeeinfo里面的写法
function ExportExcel(flagName) {
		//poi导出
	if(flagName=="notstand"){
			var urlParmDown=rootPath +"/material/inventory/materialuserecord!exportNotStandInfo.action";
	}else if(flagName="stand"){
			var urlParmDown=rootPath +"/material/inventory/materialuserecord!exportStandInfo.action";
	}
		
			$("#exportExcel").attr("action",urlParmDown);
			$("#exportExcel").submit();	
}