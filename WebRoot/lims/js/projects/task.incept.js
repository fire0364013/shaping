//加载任务接收页面
function initInceptDataGrid(items){			
	$('#inceptlist').datagrid({
				//title:'用户信息列表',
				nowrap: false,
				striped: true,
				collapsible:true,
				url:rootPath +'/projects/taskincept/taskincept!initIncept.action?items='+items, 
				fit:true,
				fitColumns : true,
				scrollbarSize:0,
				remoteSort: false,
				//idField:'testid',
				singleSelect:false,
				pageSize:20,
				pageList:[20,30,40,50],
				frozenColumns:[[
					{field:'testid',checkbox:true,align:"center"}
								]],
				columns:[[
						{field:'samplecode',title:'样品编号',width:40,align:"center"},
						{field:'samplename',title:'样品名称',width:40,align:"center"},
						{field:'itemname',title:'监测项目',width:150,align:"center"},
						{field:'charaderistic',title:'样品特征',width:40,align:"center"},
						{field:'monitortype',title:'监测点类型',width:40,align:"center"},
						{field:'pointcode',title:'监测点编码',width:40,align:"center"},
						{field:'pointname',title:'监测点名称',width:80,align:"center"},
						{field:'sampletime',title:'采样日期',width:40,align:"center"},
						{field:'status',title:'状态',width:40,align:"center",
							formatter:function(value,rowData,rowIndex){
								if(value=="SampeGrant"){
									return "样品发放";
								}
							}
						}						
				]],
				pagination:true,
				rownumbers:true
				
			});
			$(window).resize(function() {
				$("#inceptlist").datagrid('resize');
			});

}

//查询
function queryincept() {
	$("#inceptlist").datagrid("clearSelections");
	var jcxm = $("#jcxm").val();//项目id
	var ypbm = $("#ypbm").val();//样品编码
	var typeid= $("#typeid").val();//监测点类型
	var startdate= $("#startdate").val();//开始日期
	var enddate= $("#enddate").val();//结束日期
	$('#inceptlist').datagrid( {
		queryParams : {
		jcxm:jcxm,
		ypbm:ypbm,
		typeid:typeid,
		startdate:startdate,
		enddate:enddate
		},
		pageNumber : 1  //查询后指定页码为1
	});
}


function dataEntry(){
	var url = rootPath + "/sampletest/sampletestbybatch!toSampletestbybatchList.action";
	var navigateString="<ul id='nav'><li><a href='"+rootPath+"/login!login.action'>首页</a></li><li><table border='0' cellspacing='0' cellpadding='0'><tr>"+
	"<td width='34'><img src='images/nva_past.png' height='30' width='34' /></td><td><a id='parModule' class='past'>样品检验管理</a></td></tr></table></li>"+
	" <li><table  border='0' cellspacing='0' cellpadding='0'><tr><td width='40'><img src='images/nva_nowing_l.png' height='30' width='40' /></td>"+
	"<td><a id='subModule' class='nowing'>原始数据录入（按批检验）</a></td><td><img src='images/nva_nowing_r.png' height='30' width='36' /></td>"+
	"</tr></table></li></ul>";
  
	$(window.top.document).find("#navigation").html(navigateString);
 	$(window.top.document).find("#contentFrame").attr("src", url.toString());
}
//流程操作
function operate(){
	var rows = $("#inceptlist").datagrid("getSelections");
	if (rows!=null && rows!="") { 		
			var str = "";
			for(var i=0;i<rows.length;i++){
					if(str!="")
						str = str + ",";
					str = str + rows[i].testid;				
			}
			if(confirm("是否提交选中行?")){
				 jQuery.blockUI({ 
					message: "正在加载数据,请稍候...", 
			 		css: {
						color:'#000', 
						padding: '15px', 
						border:'2px solid #90dbfe',
						backgroundColor:'#fafafa'
					},
					overlayCSS: {
						opacity:'0.1' 
					}
				});
				$.post(rootPath + "/projects/taskincept/taskincept!setstatusByrecive.action",
					{ids:str},
					function(msg){
						if(msg=="success"){
							jQuery.unblockUI();//刷新的窗口关闭
							$('#inceptlist').datagrid('clearSelections');
							$("#inceptlist").datagrid('reload');
						}else{
							alert("失败！");
						}
					}
				);
			}
	} else {
		alert('请至少选择一条记录！');
		return;
	}
}


//做项目弹出窗口使用
function showitem(){
	url=rootPath +"/projects/taskincept/taskincept!showitem.action";
	var _dialog =  window.top.$('<div id ="cert-dlg" style="padding:0px;"><iframe id="ItemFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
	_dialog.dialog({
		title:'项目选择',
		autoOpen:false,
		modal:true,
		closed:true,
		width:'600',
		height:'480',
		buttons:[{
			text:'确定',
			iconCls:'icon-save',
			handler:function(){
 			var itemname=$("#ItemFrame",top.document.body).contents().find("#selectedItemnames").val();
			var itemid=$("#ItemFrame",top.document.body).contents().find("#selectedItemid").val();
			$("#jcxmname").val(itemname);
			$("#jcxm").val(itemid);
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