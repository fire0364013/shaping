<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ include file="/common/taglibs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" >
<html>
	<head>
		<title>分包信息列表</title>
		<link rel="stylesheet" href="${ctx}/themes/default/easyui.css" type="text/css" />
		<link rel="stylesheet" type="text/css" href="${ctx}/themes/icon.css" />
		<script type="text/javascript" src="${ctx}/js/jquery-1.7.2.min.js"></script>
		<script type="text/javascript" src="${ctx}/js/jquery.easyui.min.js"></script>
		<script type="text/javascript" src="${ctx}/js/CommonCheck.js"></script>
		<script type="text/javascript" src="${ctx}/js/jquery.json-2.3.js"></script>
		<script type="text/javascript" src="${ctx}/js/jquery.json-2.3.min.js"></script>
		<script type="text/javascript" src="${ctx}/validate/input.validate.js"></script>
		<script type="text/javascript">
		var rootPath = "${ctx}";
		var projectcode = "${projectcode}";
		$(document).ready(function(){
			initDataGrid();
		});
		
		function initDataGrid(){
			$('#datagrid').datagrid({
				nowrap: false,
				striped: true,
				collapsible:true,
				url: rootPath + "/projects/taskregister/taskregister!subList.action?projectcode="+projectcode,
				fit:true,
				fitColumns:true,
				scrollbarSize:0,
			//	pagination:true,
			//	pageSize:20,
			//	pageList:[20,30,40,50],
				frozenColumns:[[
							{field:'subcontractid',checkbox:true,align:"center"}
					]],
				columns:[[
			        {field:'subName',title:'分包单位名称',width:200,align:'center'},
			        {field:'subAddr',title:'分包单位地址',width :200,align:"center"},
					{field:'subLinkman',title:'联系人',width:150,align : 'center'},
					{field:'subPhone',title:'联系电话',width:200,align : 'center'},
					{field:'subitems',title:'分包项目',width:300,align : 'center'},
					{field:'subreason',title:'分包原因',width:150,align : 'center'},
					{field:'subremark',title:'备注',width:150,align : 'center'},
					{field:'operate',title:'修改',width:150,align : 'center',
						formatter:function(value,rowData,rowIndex){
							links = '<img src="'+rootPath+'/themes/default/images/bianjiimage.png" alt="编辑" id="btnshow" onclick="add('+ rowData.subcontractid +')"/>&nbsp;&nbsp;';
							links+='<img src="'+rootPath+'/themes/default/images/deleteimage.png" alt="删除" id="btnshow" onclick="del(\''+rowData.subcontractid + '\',\''+ rowIndex+'\')"/>';
							return links;
						}
					}
				]]
			});
		}
		
		function add(id){
			$('#datagrid').datagrid('clearSelections');
			var url = rootPath +"/projects/taskregister/taskregister!toSubPage.action?projectcode="+projectcode;
			if(id!=""){
				url = url + "&id="+id;
			}
			var _dialog =  window.top.$('<div id ="role-dlg" style="padding:0px;"><iframe id="subcFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
			_dialog.dialog({
				title:'分包信息编辑',
				autoOpen:false,
				modal:true,
				closed:true,
				width:'700',
				height:'400',
				buttons:[{
					text:'保存',
					iconCls:'icon-save',
					handler:function(){
					
						$("#subcFrame",top.document.body).contents().find("#subForm").form('submit',{
							url:rootPath +'/projects/taskregister/taskregister!addSub.action',
							onSubmit:function(){
								var objs = $("#subcFrame",top.document.body).contents().find(".grkj-validate");
								if(!saveCheck(objs)){
									$("#subcFrame",top.document.body).contents().find(":input").focus();
									alert("数据输入不符合格式，请查看红色边框的输入框的输入提示！");
									return false;
								}
							},
							success : function(data) {
								if (data == 'fail') {
									alert("失败！");
									return;
								}else if(data == 'success') {
									alert('成功！');
									$("#datagrid").datagrid('reload');
								}
								_dialog.dialog('close');
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
		
		//单条删除
		function del(uid,row){
			$('#datagrid').datagrid('clearSelections');
			$('#datagrid').datagrid('selectRow',row);
				if(window.confirm('是否删除？')){
					$.post(rootPath +"/projects/taskregister/taskregister!delsub.action",{ids:uid},function(del){
						if(del=='success'){
							$('#datagrid').datagrid('clearSelections');
							$("#datagrid").datagrid('reload');
							alert('删除成功');
						}else{
							alert('删除失败');
						}
					});
				}
		}
		//多条删除
		function delAll(){
			var selected=$("#datagrid").datagrid('getSelections');
			if(selected==null || selected.length< 1){
				alert('请至少选择一条记录！');
			}
			else{
				if(window.confirm('是否删除？')){
					var cc=[];
					for ( var i = 0; i < selected.length; i++) {
						if(cc==""){
								cc+=selected[i]['subcontractid'];
						}
						else{
							cc+=","+selected[i]['subcontractid'];
							}
					}
					$.post(rootPath +"/projects/taskregister/taskregister!delsub.action",{"ids":cc},function(del){
						if(del=='success'){
							$('#datagrid').datagrid('clearSelections');
							$("#datagrid").datagrid('reload');
							alert('删除成功！');
						}else{
							alert('删除失败！');
						}
					});
				 }
			}
		}
		</script>
	</head>

	<body onkeydown="PreventBSK()">	
	    <div class="grid-headerSpace" >
	   		<input type="button" value="添加" class="Button_out" onclick="add('')"/>
	   		<input type="button" value="删除" class="Button_out" onclick="delAll()"/>
	    </div>
		<table id="datagrid"></table>
	</body>
</html>
