//lh 2012.7.18
$(document).ready(function(){
	$('#testdatagrid').datagrid({
		singleSelect:true,
		width:'400',
		height:'400',
		nowrap: false,
		striped: true,
		collapsible:true,
		url:rootPath + '/projects/reportsend/reportsendright!testReportSendList.action?projectid='+projectcode+'&entid='+entid,
		sortName: 'id',
		sortOrder: 'desc',
		fit:true,
		border:true,
		fitColumns:true,
		scrollbarSize:0,
		idField:'id',	
		/*frozenColumns:[[
	      {field:'id',checkbox:true,align : 'center'}
		]],*/
		columns:[[
		    {field:'entname',title:'企业',width:280,align : 'center'},
		    {field:'reportsender',title:'发放人',width:280,align : 'center'},
	        {field:'status',title:'状态',width:80,align : 'center'},
			{field:'reportrecipint',title:'领取人',width:280,align : 'center'},
			{field:'reportreceivetime',title:'领取时间',width:130,align : 'center'},
			{field:'operate',title:'操作',width:120,align:"center",
				formatter:function(value,rec){
					var links='<img src="'+rootPath+'/themes/default/images/xiangxiimage.png"  alt="编辑"  id="btnshow" onclick="gotosend(\''+rec.id+'\')"/>&nbsp;&nbsp;';//,\''+rec.projectid+'\',\''+rec.typeid+'\')"/>&nbsp;&nbsp;';
					links+='<img src="'+rootPath+'/themes/default/images/deleteimage.png"  alt="删除"  id="btnshow" onclick="del(\''+rec.id+'\')"/>&nbsp;&nbsp;';
					return links;
				}
			}	
			
		]],
		pagination:true,
		rownumbers:true,
		pageSize:20,
		pageList:[20,30,40,50]
		
	});
});

function relaod(){//重新装载数据
	$('#datagrid').datagrid('reload');
}


//查看任务单
function viewTaskList(){
	var idVal =$('#datagrid').datagrid('getSelected').projectid;
	var url = rootPath + "/common/report!toReportPage.action?raq=MonitorTask.raq&projectid="+idVal;
	
	var _dialog =  window.top.$('	<div id ="dlg" style="padding:0px;"><iframe id="frame" width="100%" height="100%" frameborder="0" scrolling="yes" src='+url+'></iframe></div>').appendTo(window.top.document.body);
	_dialog.dialog({
	title:'任务单',
	autoOpen:false,
	modal:true,
	closed:true,
	maximizable:true,
	width:'800',
	height:'600',
	onClose:function(){
			_dialog.dialog("destroy");					
		}
	});
	_dialog.dialog('open');
}
//查看报表
/* function detail(reportname,projectcode,typeid){
	//alert(reportname+"!!!!!"+projectcode+"******"+typeid);
		//var url = rootPath + "/common/report!toReportPdf.action?raq=/MonitorReport/"+reportname+"&projectcode="+projectcode+"&monitorpointtype="+typeid;
		var url = rootPath + "/common/report!toReportPage.action?raq=/MonitorReport/"+reportname+"&projectcode="+projectcode+"&monitorpointtype="+typeid;

		var _dialog =  window.top.$('<div id ="dlg" style="padding:0px;"><iframe id="frame" width="100%" height="100%" frameborder="0" scrolling="yes" src='+url+'></iframe></div>').appendTo(window.top.document.body);
		_dialog.dialog({
		title:'报告',
		autoOpen:false,
		modal:true,
		closed:true,
		maximizable:true,
		width:'800',
		height:'750',
		onClose:function(){
				_dialog.dialog("destroy");					
			}
		});
		_dialog.dialog('open');
}*/

/**
 * 下载的时候使用的方法
 * @param name
 * @return
 */
function detail(name){	
	var encodeParm=encodeURIComponent(encodeURIComponent(name.toString()));
	var urlParm=rootPath +"/projects/reportsend/reportsendright!downLoadOwn.action?path="+encodeParm+"&flg=0";
	$.ajax({
		type:"POST",
		url:urlParm,
		success:function(data){
			cache:false;
		if(data=="success"){
			var urlParmDown=rootPath +"/projects/reportsend/reportsendright!downLoadOwn.action?path="+encodeParm+"&flg=1";
			$("#testreportform").attr("action",urlParmDown);
			$("#testreportform").submit();
		}else{			
			alert("当前文件不存在");
			}
		},
		error:function(data){
			alert("服务器正在维修，请稍后！");
		}
	}
	);	
}

//检索
function searchObj(){
	var projectcode="${projectcode}";
	$('#testdatagrid').datagrid( {
		queryParams : {
			entids : $("#entids").val(),
			projectcode : projectcode
		},
		pageNumber:1
	});
}
//跳往报告发放添加修改
	function gotosend(id){
		entid = $("#entids").val();
		var url = rootPath+"/projects/reportsend/reportsendright!gotosendjsp.action";
		if(entid!=null && entid !=''){
			url += "?projectcode=" + projectcode+"&entids="+entid;
		}else if (id==null && id ==''){
			alert("请至少选择一条记录！");
				return;
		}else{
			url += "?id=" + id;
		}
		var _dialog =  window.top.$('<div id ="remark-dlg" style="padding:0px;"><iframe id="remarkFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
		_dialog.dialog({
		title:'报告发放',
		autoOpen:false,
		modal:true,
		closed:true,
		width:'500',
		height:'300',
		buttons:[{
		text:'保存',
		iconCls:'icon-save',
		handler:function(){
			$("#remarkFrame",top.document.body).contents().find("#reportarchiveform").form('submit',
				{
					url:rootPath + '/projects/reportsend/reportsendright!save.action',
					onSubmit:function(){
						var objs = $("#remarkFrame",top.document.body).contents().find(".grkj-validate");
						
						if(!saveCheck(objs)){
							$("#remarkFrame",top.document.body).contents().find(":input").focus();
							$("#remarkFrame",top.document.body).contents().find("select").focus();
							alert("数据输入不符合格式，请查看红色边框的输入框的输入提示！");
							return false;
						}
					},
					success : function(data) {
						if (data == 'fail') {
							alert("添加失败！");
							return;
						}
						if (data == 'success') {
							_dialog.dialog('close');
							$("#testdatagrid").datagrid('reload');
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
		//单条删除
		function del(id){
				if(window.confirm('是否删除？')){
					$.post(rootPath +"/projects/reportsend/reportsendright!dell.action",{id:id},function(del){
							$('#testdatagrid').datagrid('clearSelections');
							$("#testdatagrid").datagrid('reload');
							alert('成功');
						
					});
				}
		}
	
function reView(){//重新装载数据
		$('#testdatagrid1').datagrid({
		singleSelect:true,
		width:'400',
		height:'400',
		nowrap: false,
		striped: true,
		collapsible:true,
		url:rootPath + '/projects/reportsend/reportsendright!testReportSendList.action?projectid='+projectcode+'&entid='+entid,
		sortName: 'id',
		sortOrder: 'desc',
		fit:true,
		border:true,
		fitColumns:true,
		scrollbarSize:0,
		idField:'id',	
		/*frozenColumns:[[
	      {field:'id',checkbox:true,align : 'center'}
		]],*/
		columns:[[
		    {field:'entname',title:'企业',width:280,align : 'center'},
		    {field:'reportsender',title:'发放人',width:280,align : 'center'},
	        {field:'status',title:'状态',width:80,align : 'center'},
			{field:'reportrecipint',title:'领取人',width:280,align : 'center'},
			{field:'reportreceivetime',title:'领取时间',width:130,align : 'center'}
		]],
		pagination:true,
		rownumbers:true,
		pageSize:20,
		pageList:[20,30,40,50]
		
	});
}
