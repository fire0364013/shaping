//初始化数据
function initDataGrid1(){
	$('#datagrid').datagrid({
		nowrap: false,
		striped: true,
		collapsible:true,
		url: rootPath + '/entpriseinfo/entpriseinfo!entpriseinfoList.action',
		queryParams : {
			sourcetype : '002'
		},
		sortName: 'entid',
		sortOrder: 'desc',
		fit:true,
		fitColumns:true,
		scrollbarSize:0,
		idField:'entid',	
		singleSelect:true,
		frozenColumns:[[
	       {field : 'entid',
				title : '&nbsp;',
				width : 30,
				align : 'center',
				formatter : function(value){
					return "<input type='radio' name='radio'/>";}
		 	}
		 ]],
		columns:[[
	        {field:'entname',title:'企业名称',width:300,align : 'center'},					
			{field:'region',title:'行政区',width:150,align : 'center'},
			{field:'pollutionsourcetype',title:'企业类型',width:150,align : 'center'},
//			{field:'industry',title:'行业类型',width:200,align : 'center'},
			{field:'operate',title:'操作',width:80,align : 'center',
				formatter:function(value,rowData,rowIndex){
					return '<span style="color:red"> ' +
					'<img src="'+rootPath+'/themes/default/images/bianjiimage.png" alt="编辑" onclick="editEntpriseinfo('+rowData.entid+')"/> '
					'</span>';
				}
			}
		]],
		onSelect:function(rowIndex, rowData){
			$($("input[type=radio]")[rowIndex]).attr("checked", true);
			$("#entid").val(rowData.entid);
			$("#name").val(rowData.entname);
			$("#address").val(rowData.address);
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

function initDataGrid2(){
	$('#datagrid').datagrid({
		nowrap: false,
		striped: true,
		collapsible:true,
		url: rootPath + '/projects/taskregister/projectdetail!entList.action?projectcode='+projectcode+'&monitortypeid='+monitortypeid,
		fit:true,
		fitColumns:true,
		scrollbarSize:0,
		idField:'entid',	
		columns:[[
			{field:'entid',checkbox:true,align : 'center'},
	        {field:'entname',title:'企业名称',width:300,align : 'center'},					
			{field:'region',title:'行政区',width:150,align : 'center'},
			{field:'pollutionsourcetype',title:'污染源类型',width:150,align : 'center'},
			{field:'industry',title:'行业类型',width:200,align : 'center'}
		]],
		onSelect:function(rowIndex, rowData){
		},
		onDblClickRow:function(rowIndex, rowData){

		},onLoadSuccess:function(data){
			
		},
		pagination:true,
		rownumbers:true,
		pageSize:16,
		pageList:[16,20,30,40]
		
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

//新增、修改企业
function editEntpriseinfo(id)
{	
	var entname=null;
	var url = rootPath + "/entpriseinfo/entpriseinfo!input.action";
	if(id!=""){
		url = url + "?id="+id;
	}
	var _dialog =  window.top.$('<div id ="entpriseinfo-dlg" style="padding:0px;"><iframe id="entpriseinfoFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
	_dialog.dialog({
	title:'新增企业信息',
	autoOpen:false,
	modal:true,
	closed:true,
	width:'800',
	height:'500',
	buttons:[{
		text:'保存',
		iconCls:'icon-save',
		handler:function(){
			 $("#entpriseinfoFrame",top.document.body).contents().find("#entpriseinfoForm").form('submit',
				{
					url:rootPath + '/entpriseinfo/entpriseinfo!save.action',
					onSubmit:function(){
						var objs = $("#entpriseinfoFrame",top.document.body).contents().find(".grkj-validate");
						
						if(!saveCheck(objs)){
							$("#entpriseinfoFrame",top.document.body).contents().find(":input").focus();
							alert("数据输入不符合格式，请查看红色边框的输入框的输入提示！");
							return false;
						}
						//加载行业类型，如果显示的文本框的为空，则隐藏的文本框也为空
//						var industry = $("#entpriseinfoFrame",top.document.body).contents().find("#industrytypename").val();
//						if(industry==''){
//							$("#entpriseinfoFrame",top.document.body).contents().find("#industrytypecode").val('');
//						}
						
						entname =  $("#entpriseinfoFrame",top.document.body).contents().find("#equalsName").val();
					},
					success : function(data) {
						if (data == 'fail') {
							alert("保存失败！");
							return;
						}
						if (data == 'success') {
							  $("#entname").val(entname);
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

//企业查询
function query(){
	var entname = $("#entname").val();
	var regioncode = $('#regioncode').val();
	var sourcetypecode = $('#sourcetypecode').val();
	$("#datagrid").datagrid({
		queryParams : {
			entname : entname,
			regioncode : regioncode,
			sourcetypecode : sourcetypecode
		},
		pageNumber : 1
	});
}

//获取选中企业
function getSelectedEnt(){
	var datas = $("#datagrid").datagrid("getSelections");
	var ents = "";
	var entnames = "";
	for(var i=0;i<datas.length;i++){
		ents = ents + datas[i].entid + ",";
		entnames = entnames + datas[i].entname + ",";
	}
	$("#ents").val(ents.substring(0,ents.length-1));
	$("#entnames").val(entnames.substring(0,entnames.length-1));
}
