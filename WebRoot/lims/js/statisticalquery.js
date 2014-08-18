//-----Au-----wjy~~

// 页面加载，数据的展示~~datagrid~~
function initCustomDataGrid() {
	$('#customgrid')
			.datagrid(
					{
						nowrap : false,
						striped : true,
						collapsible : true,
						singleSelect:true,
						url : 'statisticalquery!customList.action',
						sortName : 'customid',
						sortOrder : 'asc',
						remoteSort : false,
						//idField : 'methodid',
						fit : true,
						fitColumns : true,
						scrollbarSize : 0,
						pageSize : 20,
						pageList : [ 20, 30, 40, 50 ],
						columns : [ [
								{
									field : 'entname',
									title : '所属单位',
									width : 180,
									align : 'center'
								},
								{
									field : 'customname',
									title : '姓名',
									width : 180,
									align : 'center'
								},

								{
									field : 'sex',
									title : '性别',

									width : 120,
									align : "center"
								},

								{
									field : 'mobilephone',
									title : '联系电话',

									width : 120,
									align : "center"
								},
								{
									field : 'status',
									title : '状态',

									width : 100,
									align : "center"
								},
								{
									field : 'option',
									title : '操作',
									width : 100,
									align : 'center',
									formatter : function(value, rec) {
										var links = '<img src="'
												+ rootPath
												+ '/themes/default/images/xiangxiimage.png" id="btnshow" onclick="customdetail(\''
												+ rec.customid
												+ '\')" alt="查看"/>&nbsp;&nbsp;';
										return links;
									}
								} ] ],
						pagination : true,
						rownumbers : true

					});
	$(window).resize(function() {
		$("#customgrid").datagrid('resize');
	});
}


// 页面加载，数据的展示~~datagrid~~
function initEmployeeDataGrid() {
	$('#employeegrid')
			.datagrid(
					{
						nowrap : false,
						striped : true,
						collapsible : true,
						singleSelect:true,
						url : 'statisticalquery!employeeList.action',
						sortName : 'employeeinfoid',
						sortOrder : 'asc',
						remoteSort : false,
						//idField : 'methodid',
						fit : true,
						fitColumns : true,
						scrollbarSize : 0,
						pageSize : 20,
						pageList : [ 20, 30, 40, 50 ],
						columns : [ [
								{
									field : 'entname',
									title : '所属企业',
									width : 180,
									align : 'center'
								},
								{
									field : 'employeeinfoname',
									title : '姓名',
									width : 180,
									align : 'center'
								},
								{
									field : 'sex',
									title : '性别',
									width : 120,
									align : "center"
								},
								{
									field : 'mobilephone',
									title : '联系电话',
									width : 120,
									align : "center"
								},
								{
									field : 'option',
									title : '操作',
									width : 100,
									align : 'center',
									formatter : function(value, rec) {
										var links = '<img src="'
												+ rootPath
												+ '/themes/default/images/xiangxiimage.png" id="btnshow" onclick="employeedetail(\''
												+ rec.employeeinfoid
												+ '\')" alt="查看"/>&nbsp;&nbsp;';
										return links;
									}
								} ] ],
						pagination : true,
						rownumbers : true

					});
	$(window).resize(function() {
		$("#employeegrid").datagrid('resize');
	});
}

function initProjectDataGrid(){
	$('#datagrid').treegrid({
		singleSelect:true,//文本框的多选 单选  因为判断比较麻烦，容易出问题，所以修改成单选
		nowrap: false,
		striped: true,
		collapsible:true,
		url:'statisticalquery!taskList.action',
		queryParams : {
			monitortype : 7
		},
		fit:true,
		border:true,
		fitColumns:false,
		scrollbarSize:0,
		checkOnSelect:true,
		idField:'projectitemid',
		treeField:'projectitemid',
		frozenColumns:[[
//	       {field : ' ',
//				title : '&nbsp;',
//				width : 30,
//				align : 'center',
//				formatter : function(value){
//					return "<input type='radio' name='radio'/>";}
//		 	},
		 	{field:'customid',title:'任务流水号',width:50,align : 'center'},
       	    {field:'customname',title:'名字',width:80,align : 'center'}
		]],
		columns:[[
			{field:'wtentprise',title:'提单美容院',width:180,align : 'center'},
			{field:'monitorentname',title:'手术医院',width:180,align : 'center'},
	        {field:'mobilephone',title:'电话',width:100,align : 'center'},	        
	        {field:'sex',title:'性别',width:80,align : 'center'},
	        {field:'age',title:'年龄',width:60,align : 'center'},
	        {field:'itemname',title:'项目',width:180,align : 'center'},
	        {field:'standfee',title:'费用',width:80,align : 'center'},	        
			{field:'dealdate',title:'时间',width:100,align : 'center'}					
//			{field:'monitortype',title:'业务类型',width:100,align : 'center'},
//			{field:'completedate',title:'要求完成时间',width:80,align : 'center'}
		]],
		pagination:true,
		rownumbers:false,
		pageSize:20,
		pageList:[20,30,40,50],
		onLoadSuccess:function(data){
			if(data.rows.length>0){
				setTimeout("mergeCellsByField(\"datagrid\",\"monitorentid,customid\")",10)
			}
		},
		onContextMenu:function(e,node){
//			$('#datagrid').tree("select",node.target);
			$("#projectcode").val(node.projectcode);
//			$("#stepcode").val(node.stepcode);
//			$("#issubbackage").val(node.issubpackage);
//			$("#taskContextMenu").menu("show", {left: e.pageX,top: e.pageY});
//			$('#delTask').removeAttr("disabled");
//			$('#copyTask').removeAttr("disabled");
//			$('#viewTask').removeAttr("disabled");
			
			e.preventDefault();
		},
		onSelect:function(node){
			$("#projectcode").val(node.projectcode);
//			$("#stepcode").val(node.stepcode);
//			alert(node.issubpackage+"ll");
//			$("#issubbackage").val(node.issubpackage);
			
//			$($("input[type=radio]")[rowIndex]).attr("checked", true);
		},
		onClickRow:function(node){
//			$('#BasicInfoFrame').attr("src","");
//			$('#MonitorEntFrame').attr("src","");
//			$('#AppraiseOpinionFrame').attr("src","");
//			$('#WorkflowImgFrame').attr("src","");
//			$('#AttachmentFrame').attr("src","");
//			$('#TaskListFrame').attr("src","");
//			$('#WeituoFrame').attr("src","");
//			$('#ChargeFrame').attr("src","");
//			$('#SubFrame').attr("src","");
			
//			addtabs(node.projectcode);
//			selectView('基本信息');
//			$(window.parent.document).find("#hdnButton").click();
		}
	});
	
	$(window).resize(function(){
		$("#datagrid").treegrid('resize');
	});	
}

//详情
function customdetail(id,userid) {
	$('#customgrid').datagrid('clearSelections');
	var url = rootPath + "/custom/custom!view.action";
	if (id != ""&&id!=null) {
		url = url + "?id=" + id+"&userids="+userid;
	}else{
		url = url + "?userids="+userid;
	}
	var _dialog = window.top
			.$('<div id ="role-dlg" style="padding:0px;"><iframe id="detailFrame" width="100%" height="100%" frameborder="0" scrolling="no" src=' + url + '></iframe></div>')
			.appendTo(window.top.document.body);
	_dialog.dialog( {
		title : '客户详情',
		autoOpen : false,
		modal : true,
		closed : true,
		width : '800',
		height : '400'
	});
	_dialog.dialog('open');
}


//详情
function employeedetail(id,userid) {
	$('#employeegrid').datagrid('clearSelections');
	var url = rootPath + "/employeeinfo/employeeinfo!view.action";
	if (id != ""&&id!=null) {
		url = url + "?id=" + id+"&userids="+userid;
	}else{
		url = url + "?userids="+userid;
	}
	var _dialog = window.top
			.$('<div id ="role-dlg" style="padding:0px;"><iframe id="detailFrame" width="100%" height="100%" frameborder="0" scrolling="no" src=' + url + '></iframe></div>')
			.appendTo(window.top.document.body);
	_dialog.dialog( {
		title : '人员详情',
		autoOpen : false,
		modal : true,
		closed : true,
		width : '630',
		height : '340'
	});
	_dialog.dialog('open');
}



//查询
function querycustom() {
	var customname = $("#customname").val();//展示的名字~是用用户id去用户表查询的realname
	var sex = $("#sex").val();//性别
	var entname = $("#entname").val();//企业名称
//	var deptidnames= $("#deptidnames").val();//用户获取部门信息
	$('#customgrid').datagrid( {
		queryParams : {
		customname : customname,
		entname:entname,
		sex:sex
		},
		pageNumber : 1  //查询后指定页码为1
	});
}

//查询
function queryemployee() {
	var employeeinfoname = $("#employeeinfoname").val();//展示的名字~是用用户id去用户表查询的realname
	var entname = $("#entname").val();//企业名称
//	var post = $("#post").val();//职务
//	var deptidnames= $("#deptidnames").val();//用户获取部门信息
	$('#employeegrid').datagrid( {
		queryParams : {
		employeeinfoname : employeeinfoname,
//		post:post,
		entname:entname
		},
		pageNumber : 1  //查询后指定页码为1
	});
}


//查询
function queryproject() {
	var mtentprise = $("#mtentprise").val();
	var wtentprise = $("#wtentprise").val();//展示的名字~是用用户id去用户表查询的realname
	var registdate1 = $("#registdateFirst").val();//职务
	var registdate2 = $("#registdateSecond").val();//职务
//	var deptidnames= $("#deptidnames").val();//用户获取部门信息
	$('#datagrid').treegrid( {
		queryParams : {
		wtentprise : wtentprise,
		mtentprise : mtentprise,
		registdate1:registdate1,
		registdate2:registdate2
		},
		pageNumber : 1  //查询后指定页码为1
	});
}


//导出
function ExportExcel() {
		//poi导出
			var urlParmDown=rootPath +"/custom/custom!exportInfo.action";
			$("#exportExcel").attr("action",urlParmDown);
			$("#exportExcel").submit();	
}


