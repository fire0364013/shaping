
//物品名称的弹出窗口使用
function showmaterialName(){
	var url = rootPath + "/material/inventory/materialinventory!toMaterialName.action";//链接选择物品的页面~~
	var _dialog =  window.top.$('<div id ="cert-dlg" style="padding:0px;"><iframe id="ItemFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
	_dialog.dialog({
		title:'选择物品',
		autoOpen:false,
		modal:true,
		closed:true,
		width:'700',
		height:'500',
		buttons:[{
			text:'确定',
			iconCls:'icon-save',
			handler:function(){
			var materialname=$("#ItemFrame",top.document.body).contents().find("#materialname").val();
			$("#materialname").val(materialname);
			var materialid=$("#ItemFrame",top.document.body).contents().find("#materialid").val();
			$("#materialid").val(materialid);	
			var modelname=$("#ItemFrame",top.document.body).contents().find("#modelname").val();
			var modelid=$("#ItemFrame",top.document.body).contents().find("#modelid").val();
			$("#modelname").val(modelname);	
			$("#modelid").val(modelid);
			_dialog.dialog('close');
				$.ajax({
					type:'POST',
					url:rootPath +'/material/standardinventory/standardinventory!getBacthnoByMaterial.action',
					data:'materialid='+$("#materialid").val()+'&modelid='+$("#modelid").val(),
					success:function(msg){
						var arr = msg.split(",");
						var lList = "<option value=''>---请选择---</option>";
						if(msg!=""){
							for(var i=0;i<arr.length;i++){
								lList = lList + "<option value='"+arr[i]+"'>"+arr[i]+"</option>";
							}
						}
						$("#batchno").html(lList);	
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
//===============此处开始时弹出的单选框
$(function(){
//	getchecknames(rootPath+"/material/materials/materials!materialinfoList.action");//此处是原先的规格型号方法
		getchecknames(rootPath +"/material/materials!noMidMaterialinfoList.action?flagName=notstand");
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
			{	field : 'mid',
				title : '&nbsp;',
				width : 30,
				align : 'center',
				formatter : function(value){
					return "<input type='radio' name='radio'/>";}
			}
			]],
			columns:[[
			        {field:'materialname',title:'物品名称',width:280,align:"center"}	,	
					{field:'typename',title:'物品类型',width:160,align:"center"}	,
					{field:'model',title:'规格型号',width:100,align:"center"},
					{field:'materialproperty',title:'性质',width:80,align:"center"}	
			]],
	
		onClickRow:function(){
			var selected=$("#checknamegrid").datagrid('getSelected');
			checkRadio();
			$("#materialid").val(selected['mid']);
			$("#materialname").val(selected['materialname']);
			$("#modelname").val(selected['model']);
			$("#modelid").val(selected['id']);
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
function queryMater() {
	var materialname = $("#materialnames").val();//物品名称
	var materialtypeid = $("#materialtypeid").val();//物品小类
	var dalei = $("#dalei").val();//物品大类
	$('#checknamegrid').datagrid( {
		queryParams : {
		materialname : materialname,
		materialtypeid : materialtypeid,
		dalei:dalei
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
//增加按钮
function addMaterial(){
	$('#datagrid').datagrid('clearSelections');
	var url =rootPath + "/material/standardinventory/standardinventory!toAddMaterials.action?isStandFlag=no";
	var _dialog =  window.top.$('<div id ="materialsinfo-dlg" style="padding:0px;"><iframe id="materialsinfoFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
	_dialog.dialog({
	title:'物品信息编辑',
	autoOpen:false,
	modal:true,
	closed:true,
	width:'360',
	height:'400',
	buttons:[{
		text:'保存',
		iconCls:'icon-save',
		handler:function(){
			$("#materialsinfoFrame",top.document.body).contents().find("#materialsForm").form('submit',{
					url:rootPath + "/material/materials/materials!save.action",
					onSubmit:function(){
						var objs = $("#materialsinfoFrame",top.document.body).contents().find(".grkj-validate");
						
						if(!saveCheck(objs)){
							$("#materialsinfoFrame",top.document.body).contents().find(":input").focus();
							$("#materialsinfoFrame",top.document.body).contents().find("select").focus();
							alert("数据输入不符合格式，请查看红色边框的输入框的输入提示！");
							return false;
						}
						var tempVal = $("#materialsinfoFrame",top.document.body).contents().find("#industrytypename").val();
						if(tempVal==''){
							$("#materialsinfoFrame",top.document.body).contents().find("#industrytypecode").val('');
						}
					},
					success : function(data) {
						if (data == 'fail') {
							alert("添加失败！");
							return;
						}
						if (data == 'success') {
							_dialog.dialog('close');
							$("#checknamegrid").datagrid('reload');
							alert('保存成功！');
						}
						if(data=='exist'){
							alert("该物品信息已经存在，请确认输入！");
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

function batchnoChange(){
	var materialid = $("#materialid").val();
	var batchno = $("#batchno").val();
	$("#batchnotext").val(batchno);
	$.ajax({
	   type: "POST",
	   async:false,
	   url: rootPath + "/material/materialpurchase!getInventoryInfo.action?temp="+new Date().getTime(),
	   data: {materialid:materialid,bacthno:batchno},
	   success: function(msg){
		   var data = eval('('+msg+')');
		   for(var key in data){
			   $("#"+key).val(data[key]);
		   }
	   }
	});
}
