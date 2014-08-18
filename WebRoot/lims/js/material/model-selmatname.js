
//物品名称的弹出窗口使用
function showmaterialName(){
	var url = rootPath + "/material/inventory/materialinventory!toModelName.action";//链接选择物品的页面~~
	var _dialog =  window.top.$('<div id ="cert-dlg" style="padding:0px;"><iframe id="ItemFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
	_dialog.dialog({
		title:'选择物品',
		autoOpen:false,
		modal:true,
		closed:true,
		width:'500',
		height:'500',
		buttons:[{
			text:'确定',
			iconCls:'icon-save',
			handler:function(){
			var materialname=$("#ItemFrame",top.document.body).contents().find("#materialname").val();
			$("#materialname").val(materialname);
			var materialid=$("#ItemFrame",top.document.body).contents().find("#materialid").val();
			$("#materialid").val(materialid);	
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
//===============此处开始时弹出的单选框
$(function(){
	getchecknames(rootPath+"/material/materials/materials!materialinfoList.action");//此处是原先的规格型号方法
	//	getchecknames(rootPath +"/material/materials!materialinfoList.action");
});

function getchecknames(myurl){
	$('#checknamegrid').datagrid({
		title:'物品列表',
		singleSelect:true,
		nowrap: false,
		striped: true,
		collapsible:true,
		url:myurl,
		fit:true,
		fitColumns:true,
		scrollbarSize:0,
		remoteSort: false,
		idField:'materialid',
		pageSize:10,
		pageList:[10,20,30,40],
		frozenColumns:[[
			{	field : 'materialid',
				title : '&nbsp;',
				width : 30,
				align : 'center',
				formatter : function(value){
					return "<input type='radio' name='radio'/>";}
			}
			]],
			columns:[[
			        {field:'materialname',title:'物品名称',width:140,align:"center"}	,	
					//{field:'model',title:'规格型号',width:140,align:"center"}	,
					{field:'materialstype',title:'物品类型',width:140,align:"center"}	
			]],
	
		onClickRow:function(){
			var selected=$("#checknamegrid").datagrid('getSelected');
			checkRadio();
			$("#materialid").val(selected['materialid']);
			$("#materialname").val(selected['materialname']);
		},
		pagination:true,
		rownumbers:true
		
		
	});			
	}
function checkRadio(){
	var row = $('#checknamegrid').datagrid('getSelected');
	var rowNum = 0;
	var rows = $('#checknamegrid').datagrid('getRows');
	for ( var i = 0; i < rows.length; i++) {
		if (row == rows[i]) {
			rowNum = i;
			break;
		}
	}
	var radios = $("input[type=radio]");
	$(radios[rowNum]).attr("checked", true);
}



function query() {

	var materialname = $("#materialnames").val();//
	var materialtypeid = $("#materialtypeid").val();//

	$('#checknamegrid').datagrid( {
		queryParams : {
		materialname : materialname,
		materialtypeid : materialtypeid
		},
		pageNumber : 1  //查询后指定页码为1
	});
}

//================弹出的单选框结束




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


