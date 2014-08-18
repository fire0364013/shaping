
$(document).ready(function(){ 
	initDataGrid();
});

function relaod(){//重新装载数据
	$('#datagrid').datagrid('reload');
}

function initDataGrid(){
	//alert("wodth:"+width+";height:"+height);
			$('#datagrid').datagrid({
			//	width:800,
			//	height:400,
				nowrap: false,
				striped: true,
				collapsible:true,
				scrollbarSize:0,
				url:rootPath+'/templet/templates!toList.action?yeWuLeiXing='+yeWuLeiXing+"&jianCeDianId="+jianCeDianId+"&templatetypeid="+templatetypeid,
				fit:true,
				fitColumns:true,
				idField:'templateid',
				columns:[[
					{field:'templateid',checkbox:true,align : 'center'},
			        {field:'templatename',title:'模板名称',width:300,align : 'center'},					
					{field:'isdefault',title:'是否主报表',width:300,align : 'center'},
					{field:'operate',title:'操作',width:120,align : 'center',
						formatter:function(value,rec,rowIndex){
						var links='<img src="'+rootPath+'/themes/default/images/xiangxiimage.png"   alt="详细"  id="btnshow" onclick="detail('+ rec.templateid +')"/>&nbsp;&nbsp;';
						//links+='<img src="'+rootPath+'/themes/default/images/bianjiimage.png"  alt="编辑"  id="btnshow" onclick="addTempte('+ rec.templateid +')"/>&nbsp;&nbsp;';
						links+='<img src="'+rootPath+'/themes/default/images/deleteimage.png"   alt="删除" id="btnshow" onclick="del(\''+ rec.templateid +'\',\''+rec.templatepath+'\')"/>&nbsp;&nbsp;';
						links += '<img src="'
							+ rootPath
							+ '/themes/default/images/indexhome.png" id="btnshow" onclick="parReport(\''
							+ rec.templateid +'\',\''+rec.templatetypeid +'\',\''+rec.id1 +'\',\''+rec.id2+'\',\''+rec.isdefault+'\',\''+rec.templatename
							+ '\')" alt="设置主报表"/>	';
						return links;
						}
					}					
				]],
				pagination:true,
				rownumbers:true,
				pageSize:10,
				pageList:[10,20,30,40]
				
			});
		$(window).resize(function(){
			$("#datagrid").datagrid('resize');
		})	;
			
}

//设置主报表的操作
function parReport(templateid,templatetypeid,id1,id2,isdefault,templatename){
	$('#datagrid').datagrid('clearSelections');
	var monitorpointid=""; 
	if(reportGroup='YES'){
		monitorpointid=jiancedianAll;
	}else{
		monitorpointid=jianCeDianId;
	}
	
	if(isdefault=='是'){
		alert("当前报表已经是主报表，请勿重复设置！");
		return false;
	}
	if (window.confirm('你确定要将此报表设置为主报表吗？')) {
		$.post(rootPath +'/templet/templates!saveMainReport.action', {
			templateid : templateid,
			templatetypeid : templatetypeid,
			yeWuLeiXing : id1,
			jianCeDianId : monitorpointid,
			flag:'0',//设置flag 是因为默认都保存为不是主报表。当执行此操作的时候，执行设置主报表操作 
			flagName:reportGroup,//设置flag 是因为默认都保存为不是主报表。当执行此操作的时候，执行设置主报表操作
			templatename:templatename
		}, function(del) {
			if (del == 'success') {
				alert("设置成功！");
				$("#datagrid").datagrid('reload');
			}else{
				alert("设置失败！");
			}
		});
	}
}
/**

//设置主报表的操作
function parReport(templateid,templatetypeid,id1,id2,isdefault){
	$('#datagrid').datagrid('clearSelections');
	if(isdefault=='是'){
		alert("当前报表已经是主报表，请勿重复设置！");
		return false;
	}
	if (window.confirm('你确定要将此报表设置为主报表吗？')) {
		$.post(rootPath +'/templet/templates!saveMainReport.action', {
			templateid : templateid,
			templatetypeid : templatetypeid,
			yeWuLeiXing : id1,
			jianCeDianId : id2,
			flag:'0'//设置flag 是因为默认都保存为不是主报表。当执行此操作的时候，执行设置主报表操作
		}, function(del) {
			if (del == 'success') {
				alert("设置成功！");
				$("#datagrid").datagrid('reload');
			}else{
				alert("设置失败！");
			}
		});
	}
}*/
//检索
function searchObj(){
	var templatename = $('#templatename').val();	//模块名称
	var templatetypeid = $('#templatetypeid').val();  //模块类型
	$('#datagrid').datagrid( {
		queryParams : {
		templatename : templatename,
			templatetypeid : templatetypeid
		},
		pageNumber:1             //查询后指定页码为1
	});

}

//打开详细页面
function detail(id){
	$('#datagrid').datagrid('clearSelections');
	var url = rootPath +"/templet/templates!reportView.action?id="+id;
	var _dialog =  window.top.$('	<div id ="role-dlg" style="padding:0px;"><iframe id="roleFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
	_dialog.dialog({
	title:'模板详情',
	autoOpen:false,
	modal:true,
	closed:true,
	width:'370',
	height:'280',
	onClose:function(){
			_dialog.dialog("destroy");					
		}
	});
	_dialog.dialog('open');

}
//单条删除
function del(uid,templatepath){
	$('#datagrid').datagrid('clearSelections');
		if(window.confirm('是否删除？')){
			$.post(rootPath +"/templet/templates!deleteReportOne.action",{id:uid,templatepath:templatepath},function(del){
				if(del=='success'){
					$('#datagrid').datagrid('clearSelections');
					$("#datagrid").datagrid('reload');
					alert('成功');
				}
				
			});
		}
}
//批量删除	
function delAll(){
	var selected=$("#datagrid").datagrid('getSelections');
	if(selected==null || selected.length< 1){
		alert('请至少选择一条记录！');
	}else{
		if(window.confirm('是否删除？')){
			var cc=[];
			var ss=[];
			for ( var i = 0; i < selected.length; i++) {
				if(cc==""){
						cc+=selected[i]['templateid'];
						ss+=selected[i]['templatepath'];
				}
				else{
					cc+=","+selected[i]['templateid'];
					ss+=","+selected[i]['templatepath'];
					}
			}
			$.post(rootPath +"/templet/templates!deleteReportAll.action",{ids:cc,templatepath:ss},function(del){
				if(del=='success'){
					$('#datagrid').datagrid('clearSelections');
					$("#datagrid").datagrid('reload');
					alert('成功');
				}
			});
			
		 }
	}
}
/**
 * 增加
 * @return
 */
function addTempte(id){
	$('#datagrid1').datagrid('clearSelections');
	var url = rootPath +"/templet/templates!reportInput.action?templatetypeid="+templatetypeid+"&yeWuLeiXing="+yeWuLeiXing+"&jianCeDianId="+jiancedianAll;
	//$(window.top.document).find("#btnProjectInfo").click();
	var _dialog =  window.top.$('	<div id ="role-dlg" style="padding:0px;"><iframe id="tempalteFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
	//window.top.document.body.appendChild(win);
	_dialog.dialog({
		title:'模板编辑',
		autoOpen:false,
		modal:true,
		closed:true,
		width:'500',
		height:'200',
		buttons:[{
			text:'保存',
			iconCls:'icon-save',
			handler:function(){
			$("#tempalteFrame",top.document.body).contents().find("#tempalteform").form('submit',{
					url:rootPath +'/templet/templates!doSaveEntityReport.action',
					onSubmit:function(){
						 var samplefile=$("#tempalteFrame",top.document.body).contents().find("#samplefile").val();
						 if(samplefile!=null&&samplefile!=""){
							var filename=samplefile.substring(samplefile.lastIndexOf(".")).toLowerCase(); 
							if(filename!=".raq"){
								alert("只能上传.raq文件");
								return false;
							}
						 } 
					},
					success:function(data){
						
						if(data=="success"){
						_dialog.dialog('close');
						$("#datagrid").datagrid('reload');
							alert('成功');
						}
						else if(data=="wenjian"){
							alert('此模板文件已经存在！');
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

