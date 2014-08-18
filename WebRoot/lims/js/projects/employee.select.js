//初始化数据
function initDataGrid1(){
	$('#datagrid').datagrid({
		nowrap: false,
		striped: true,
		collapsible:true,
		url: rootPath + '/employeeinfo/employeeinfo!employeeList.action',
		sortName: 'employeeinfoid',
		sortOrder: 'desc',
		fit:true,
		fitColumns:true,
		scrollbarSize:0,
		idField:'employeeinfoid',	
		singleSelect:true,
		frozenColumns:[[
	       {field : 'employeeinfoid',
				title : '&nbsp;',
				width : 30,
				align : 'center',
				formatter : function(value){
					return "<input type='radio' name='radio'/>";}
		 	}
		 ]],
		columns:[[
	        {field:'employeeinfoname',title:'代理人名称',width:300,align : 'center'},					
			{field:'sex',title:'性别',width:150,align : 'center'},
			{field:'mobilephone',title:'联系电话',width:150,align : 'center'},
			{field:'operate',title:'操作',width:80,align : 'center',
				formatter:function(value,rowData,rowIndex){
					return '<span style="color:red"> ' +
					'<img src="'+rootPath+'/themes/default/images/bianjiimage.png" alt="编辑" onclick="editEmployeeinfo('+rowData.employeeinfoid+')"/> '
					'</span>';
				}
			}
		]],
		onSelect:function(rowIndex, rowData){
			$($("input[type=radio]")[rowIndex]).attr("checked", true);
			$("#employeeid").val(rowData.employeeinfoid);
			$("#name").val(rowData.employeeinfoname);
			$("#phone").val(rowData.mobilephone);
		},
		onDblClickRow:function(rowIndex, rowData){
			//双击时不需要点下一步按钮
			$(".l-btn-text.icon-next",window.top.document).click();
		},onLoadSuccess:function(data){
			if(entid==null||entid==""){
				$('#datagrid').datagrid('selectRow',0);
			}else{
				$('#datagrid').datagrid('selectRecord',entid);
			}
			
//			var entname = $("#selEntpriseinfoFrame",top.document.body).contents().find('#entname').val();
//			if(entname!=null&&entname!=""){
//				$('#datagrid').datagrid('selectRow',0);
//			}
		},
		pagination:true,
		rownumbers:true,
		pageSize:16,
		pageList:[16,20,30,30]
		
	});
}


//加载污染源类型下拉列表
function getPollutionSourceType(){
	$.ajax( {
		type : 'GET',
		url : rootPath + '/projects/taskregister/taskregister!getPollutionSourceType.action?timeStamp='+new Date().getTime()+'&monitortypeid='+monitortypeid,
		success : function(data) {
			var vData = eval("(" + data + ")");
			var lList = "<option value=''>---请选择---</option>";
			//遍历json数据  
			jQuery.each(vData.rowsData, function(i, n) {
				lList += "<option value=" + n.sourceid + ">" + n.sourcename	+ "</option>";
			});				
			//绑定数据到listLeft
			$('#sourcetypecode').append(lList);
		}
	});
}


//加载行政区的下拉列表
function regionData() {
	$.ajax( {
		type : 'GET',
		url : rootPath + '/projects/taskregister/taskregister!getCityOrRegion.action?timeStamp='+new Date().getTime(),
		success : function(data) {
			var lList = "<option value=''>---请选择---</option>";
			var vData = eval("(" + data + ")");
			
			jQuery.each(vData.rowsData, function(i, n) {
				lList += "<option value=" + n.regioncode + ">" + n.regionname	+ "</option>";
			});				
			
			$('#regioncode').append(lList);
		}
	});
}

//新增、修改代理人
function editEmployeeinfo(id)
{	
	var employeename=null;
	var url = rootPath + "/employeeinfo/employeeinfo!input.action";
	if(id!=""){
		url = url + "?id="+id;
	}
	var _dialog =  window.top.$('<div id ="custominfo-dlg" style="padding:0px;"><iframe id="employeeinfoFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
	_dialog.dialog({
	title:'代理人信息',
	autoOpen:false,
	modal:true,
	closed:true,
	width:'800',
	height:'400',
	buttons:[{
		text:'保存',
		iconCls:'icon-save',
		handler:function(){
			 $("#employeeinfoFrame",top.document.body).contents().find("#employeeinfoForm").form('submit',
				{
					url:rootPath + '/employeeinfo/employeeinfo!save.action',
					onSubmit:function(){
						var objs = $("#employeeinfoForm",top.document.body).contents().find(".grkj-validate");
						
						if(!saveCheck(objs)){
							$("#employeeinfoForm",top.document.body).contents().find(":input").focus();
							alert("数据输入不符合格式，请查看红色边框的输入框的输入提示！");
							return false;
						}
						//加载行业类型，如果显示的文本框的为空，则隐藏的文本框也为空
//						var industry = $("#entpriseinfoFrame",top.document.body).contents().find("#industrytypename").val();
//						if(industry==''){
//							$("#entpriseinfoFrame",top.document.body).contents().find("#industrytypecode").val('');
//						}
						
						employeename =  $("#employeeinfoForm",top.document.body).contents().find("#employeeinfoname").val();
					},
					success : function(data) {
						if (data == 'fail') {
							alert("保存失败！");
							return;
						}
						if (data == 'success') {
							  $("#employeename").val(employeename);
							  query();
							  
							_dialog.dialog('close');
							alert('保存成功！');
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

//客户查询
function query(){
	var employeeinfoname = $("#employeeinfoname").val();
//	var phone = $('#phone').val();
//	var address = $('#address').val();
	$("#datagrid").datagrid({
		queryParams : {
			employeeinfoname : employeeinfoname
//			phone : phone,
//			address : address
		},
		pageNumber : 1
	});
}

//获取选中客户
function getSelectedCus(){
	var datas = $("#datagrid").datagrid("getSelections");
	var customs = "";
	var customnames = "";
	for(var i=0;i<datas.length;i++){
		customs = customs + datas[i].customid + ",";
		customnames = customnames + datas[i].customname + ",";
	}
	$("#customs").val(ents.substring(0,ents.length-1));
	$("#customnames").val(entnames.substring(0,entnames.length-1));
}
