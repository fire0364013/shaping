	var templatetypeid;
	var flag=true;
	$(function(){
		$("#templatetypeid").change(function(){
			templatetypeid=$("#templatetypeid").val();
			if(templatetypeid=="1"||templatetypeid=="4"){//采样单
				var myUrl=rootPath+"/templet/billtemplates!showSampleBillTree.action?templatetypeid="+templatetypeid;
				myDatas(myUrl);
			}else if(templatetypeid=="2"){//原始记录单
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
				var myUrl=rootPath+"/templet/billtemplates!showOriginalReportTree.action?templatetypeid="+templatetypeid;
				originalreport(myUrl);
			}
			else if(templatetypeid=="3"){//测试报告
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
				var myUrl=rootPath+"/templet/billtemplates!showReportBillTreeWJY.action?templatetypeid="+templatetypeid;
				mointorreport(myUrl);
			}else if(templatetypeid=="5"){//任务计划单
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
				var myUrl=rootPath+"/templet/billtemplates!showMonitortypeTree.action?templatetypeid="+templatetypeid;
				projectplan(myUrl);
				$('#sampletree').tree('reload');
			}else if(templatetypeid==""){
				myDatas(rootPath+"");
				$('#sampletree').tree('reload');
			}
		});
	});
	//当右边保存完成的时候，左边调用这个事件刷新
	function fresh(){
		$('#sampletree').tree('reload');
	}
	//采样单、现场监测原始记录单的树
		function myDatas(myUrl){
			$('#sampletree').tree({
				url: myUrl,
				onClick:function(node){
					var arr=node.id.split("-");
					$.post(rootPath +"/templet/billtemplates!getMointorSample.action",{"montortypeid":arr[0],"templatetypeid":templatetypeid},function(data){
						if(templatetypeid=="1"){
							$("#billFrame").attr("src",rootPath + "/common/report!toReportPage.action?raq=SamplingList/"+encodeURI(encodeURI(node.attributes.path))+"&timeStamp="+new Date().getTime());
						}else if(templatetypeid=="4"){
							$("#billFrame").attr("src",rootPath + "/common/report!toReportPage.action?raq=OriginalList/"+encodeURI(encodeURI(node.attributes.path))+"&timeStamp="+new Date().getTime());
						}
						
					});
				},
				onContextMenu:function(e,node){
					if(node.id!=""){
						$('#sampletree').tree('select',node.target);
						if(templatetypeid=="1"){
							if(node.attributes.flag=='type'){
								$("#sampbill-menu").menu('show',{left:e.pageX,top:e.pageY});
							}else{
								$("#sampbillitem-menu").menu('show',{left:e.pageX,top:e.pageY});
							}
						}else if(templatetypeid=="4"){
							$("#localbill-menu").menu('show',{left:e.pageX,top:e.pageY});
						}
						
					}
					e.preventDefault();
				}
			});
		}
		
		function projectplan(myUrl){
			$('#sampletree').tree({
				url: myUrl,
				onLoadSuccess:function (node,data){
						jQuery.unblockUI();
				},
				onClick:function(node){
					var arr=node.id.split("-");
//					alert(node.attributes.path);
//					if(node.attributes.path != "" && node.attributes.path != null && node.attributes.path == undefined){
						$.post(rootPath +"/templet/billtemplates!getMointorSample.action",{"montortypeid":arr[0],"templatetypeid":templatetypeid},function(data){
						   $("#billFrame").attr("src",rootPath + "/common/report!toReportPage.action?raq=flowList/"+encodeURI(encodeURI(data))+"&timeStamp="+new Date().getTime());
							});
//						}
				},
				onContextMenu:function(e,node){
					$('#sampletree').tree('select',node.target);
					$("#localbill-menu").menu('show',{left:e.pageX,top:e.pageY});
					e.preventDefault();
				}
			});
		}
		/**
		 * 原始记录的备注——wjy
		 * 一：树形结构展示：
		 * 		1、是根据分析组号进行展示的
		 * 		2、查询没有分析组号的项目，然后查出级联的方法
		 * 		3、查询有分析组号的项目和方法，将其方法和分析组号一样的合并在一起，并且展示出来。
		 * 二：点击根节点的查看空的原始记录单：
		 * 		1、主要是找到报表，此时并没有去查看内容，查看内容的地方时在testreport里面，故而此时找到报表的方法
		 *		2、找到报表查询：  itemid=str[0];
		 * 		3、因为保存的时候，只要是该项目的，那么主要使用了这个报表，那么这个报表就是这个项目的主报表，所以只去其中一个就好了。
		 *三：右键查看报表模板
		 * 		展示：此处列出的只取其中一个的id 的报表  itemid=str[0];
		 * 		保存：的时候要根据 传过来的itemid 进行拆分 分开保存数据
		 * 		设置主报表：每一个id都给他设置为主报表
		 * 		删除：因为报表的名字是不允许重复的，所以此处的删除就根据templatename进行删除了。
		 * @param {Object} myUrl
		 */
		//原始记录单的树
		function originalreport(myUrl){
			$('#sampletree').tree({
				url: myUrl,
				onLoadSuccess:function (node,data){
						jQuery.unblockUI();
				},
				onClick:function(node){//当点击项目节点的时候，右边不刷新，只有点击方法节点的时候，才进行刷新操作
				if(node.attributes!="N"){
					var selected=$('#sampletree').tree("getSelected");
					var parentnode=$('#sampletree').tree("getParent",selected.target);
					var str = parentnode.id.split(',');
						var itemid="";
						if(str.length>0){
							itemid=str[0];
						}else{
							itemid=parentnode.id;
						}
						//alert(itemid);
					$.post(rootPath +"/templet/billtemplates!originalReport.action",{"templatetypeid":2,"itemid":itemid,"methodid":selected.id},function(attributes){
						$("#billFrame").attr("src",rootPath + "/common/report!toReportPage.action?raq=/OriginalList/"+encodeURI(encodeURI(attributes))+"&timeStamp="+new Date().getTime());
					});
				}
			},	
				onContextMenu:function(e,node){
				e.preventDefault();
				if(node.attributes!="N"){
					$('#sampletree').tree('select',node.target);
					$("#original-menu").menu('show',{left:e.pageX,top:e.pageY});
				}
				}
			});
		}
		
		/**
		 * 测试报告，需要根据监测任务下的监测点类型，此处监测点类型是要根据reportGroup进行合并规整。
		 * @param {Object} myUrl
		 */
		//测试报告的树
		function mointorreport(myUrl){
			$('#sampletree').tree({
				url: myUrl,
				onLoadSuccess:function (node,data){
						jQuery.unblockUI();
				},
				onClick:function(node){
					var selected=$('#sampletree').tree("getSelected");
					var parentnode=$('#sampletree').tree("getParent",selected.target); 
					var str = selected.id.split(',');
						var monitorpointid=""; 
						if(str.length>0){
							monitorpointid=str[0];
						}else{
							monitorpointid=selected.id;
						}
					$.post(rootPath +"/templet/billtemplates!mointorreport.action",{"parenttypeid":parentnode.id,"montortypeid":monitorpointid},function(data){
						$("#billFrame").attr("src",rootPath + "/common/report!toReportPage.action?raq=/MonitorReport/"+encodeURI(encodeURI(data))+"&timeStamp="+new Date().getTime());
					});
				},
				onContextMenu:function(e,node){
				if(node.attributes!="N"){
					$('#sampletree').tree('select',node.target);
					$("#report-menu").menu('show',{left:e.pageX,top:e.pageY});
				}
					e.preventDefault();
				}
			});
		}
 
//附件 采样单 按类型出
function addAdjunct(){
	var selected=$('#sampletree').tree("getSelected");
	var arr = selected.id.split("-");
	var url=rootPath +"/templet/templates!list.action?jianCeDianId="+arr[0]+"&templatetypeid="+templatetypeid;
	var _dialog =  window.top.$('	<div id ="role-dlg" style="padding:0px;"><iframe id="sampleBillFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
	_dialog.dialog({
		title:'模板',
		autoOpen:false,
		modal:true,
		closed:true,
		width:'800',
		height:'500',
		onClose:function(){
			_dialog.dialog("destroy");
			//templatetypeid=1; //采样单
			//var myUrl=rootPath+"/templet/billtemplates!showSampleBillTree.action?templatetypeid="+templatetypeid;
			//myDatas(myUrl);
		}
	});
	_dialog.dialog('open');
}

//附件采样单，按项目出
function addSamplingItem(){
	var selected=$('#sampletree').tree("getSelected");
	var arr = selected.id.split("-");
	var ori="";
	if(arr[1].indexOf(",")>0){
		ori="YES";
	}else{
		ori="NO";
	}
	var url=rootPath +"/templet/templates!list.action?templatetypeid="+templatetypeid+"&jianCeDianId="+arr[0]+"&itemid="+arr[1]+"&templateid="+selected.attributes.templateid+"&flagName="+ori;
	var _dialog =  window.top.$('	<div id ="role-dlg" style="padding:0px;"><iframe id="sampleBillFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
	_dialog.dialog({
		title:'模板',
		autoOpen:false,
		modal:true,
		closed:true,
		width:'800',
		height:'500',
		onClose:function(){
			_dialog.dialog("destroy");
		}
	});
	_dialog.dialog('open');
}

//附件 原始记录单
function originalatt(){
	//此处要将是否为分析组号报表
	//
	var selected=$('#sampletree').tree("getSelected");
	var parentnode=$('#sampletree').tree("getParent",selected.target);
	var itemids=parentnode.id;
	var str = itemids.split(',');
	var itemid="";
	var ori="";
	if(str.length>0){
		itemid=str[0];
		ori="YES";
	}else{
		itemid=parentnode.id;
		ori="NO";
	}
	//此处将itemid 以另外的方式传过去，在后台 里面接收，然后返回到List页面  把ori 这个标示符也传过去。然后再list页面进行修改操作的时候
	//判断是否为ori组合项目，如果是就将这些itemid全部改为主报表
	var url=rootPath +"/templet/templates!originalList.action?templatetypeid="+templatetypeid+"&monitortypeid="+selected.id+"&montertypeid="+itemid+"&flagName="+ori+"&itemid="+itemids;
	var _dialog =  window.top.$('	<div id ="role-dlg" style="padding:0px;"><iframe id="sampleBillFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
	_dialog.dialog({
		title:'模板',
		autoOpen:false,
		modal:true,
		closed:true,
		width:'800',
		height:'500',
		onClose:function(){
			_dialog.dialog("destroy");
			//	templatetypeid=2;//原始记录单
			//	var myUrl=rootPath+"/templet/billtemplates!showOriginalReportTree.action?templatetypeid="+templatetypeid+"&timeStamp="+new Date().getTime();
			//	originalreport(myUrl);//执行左侧属性结构 的重新加载
			//执行右侧iframe 的刷新 "billFrame"
		}
	});
	_dialog.dialog('open');
}

//附件 测试报告
function reportAdjunct(){
	var selected=$('#sampletree').tree("getSelected");
	var parentnode=$('#sampletree').tree("getParent",selected.target); 
	var str = selected.id.split(',');
	var mnitorpoint="";
	var reportGroup="";
	if(str.length>0){
		mnitorpoint=str[0];
		reportGroup="YES";
	}else{
		mnitorpoint=parentnode.id;
		reportGroup="NO";
	}
	
	var url=rootPath +"/templet/templates!reportList.action?&templatetypeid="+templatetypeid+"&jianCeDianId="+mnitorpoint+"&yeWuLeiXing="+parentnode.id+"&flagName="+reportGroup+"&jiancedianAll="+selected.id;
	//jianceid  监测点id   templatetypeid 模板类型id    yewuleixing 业务类型id
	var _dialog =  window.top.$('	<div id ="role-dlg" style="padding:0px;"><iframe id="sampleBillFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
	_dialog.dialog({
		title:'模板',
		autoOpen:false,
		modal:true,
		closed:true,
		width:'800',
		height:'500',
		onClose:function(){
			_dialog.dialog("destroy");
			//templatetypeid=3;//测试报告
			//var myUrl=rootPath+"/templet/billtemplates!showReportBillTree.action?templatetypeid="+templatetypeid;
			//mointorreport(myUrl);
		}
	});
	_dialog.dialog('open');
}

function addItem(){
	var node = $('#sampletree').tree('getSelected');
	var arr = node.id.split("-");
	
	var url = rootPath + "/templet/templates!itemList.action?pollutanttype="+encodeURI(encodeURI(arr[1]));
	var _dialog =  window.top.$('	<div id ="dlg" style="padding:0px;"><iframe id="dlgFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);

	_dialog.dialog({
	title:'选择项目',
	autoOpen:false,
	modal:true,
	closed:true,
	width:'650',
	height:'450',
	buttons:[{
		text:'保存',
		iconCls:'icon-save',
		handler:function(){
			$("#dlgFrame",top.document.body).contents().find("#items").click();
			var datas = $("#dlgFrame",top.document.body).contents().find("#items").val();
			
			if(datas==null||datas==""){
				alert("请至少选择一条记录！");
			}else{
				$.post(
					rootPath + "/templet/templates!saveSamplingByItem.action",
					{monitortypeid:arr[0],itemid:datas},	
					function(msg){
						if(msg=="success"){
							alert("保存成功！");
							_dialog.dialog('close');
							$('#sampletree').tree('reload');
						}else{
							alert("保存失败！");
						}
						
					}
				);
			}
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


//列表
function initDataGridItem(){
	$("#datagrid").datagrid({
		nowrap : false,			
		striped : true,			
		url:rootPath + "/iteminfo/iteminfo!getItemListForTemplate.action?itemtype="+encodeURI(encodeURI(pollutanttype)),
		fit:true,
		fitColumns:true,
		scrollbarSize:0,
		idField:'id',
		columns:[[
			{field:'id',checkbox:true,align : 'center'},
//			{field:'itemtypeid',title:'项目类型ID',hidden:true},
			{field:'itemtype',title:'项目类型',width:120,align : 'center'},					
			{field:'itemname',title:'项目名称',width:281,align : 'center'}					
		]],
		pagination:true,
		rownumbers:false,
		pageSize:10,
		pageList:[10,20,30],
		onLoadSuccess:function(data){
		}
	})
}

function getSelectedItem(){
	var datas = $("#datagrid").datagrid("getSelections");
	var itemids = "";
	for(var i=0;i<datas.length;i++){
		if(itemids!="") itemids = itemids + ",";
		itemids = itemids + datas[i].id;
	}
	$("#items").val(itemids);
}

function deleteItem(){
	var node = $('#sampletree').tree('getSelected');
	var arr = node.id.split("-");
	$.ajax({
		type:'post',
		url:rootPath + '/templet/templates!delSampItem.action',
		data:'monitortypeid='+arr[0]+'&itemid='+arr[1]+'&montertypeid='+templatetypeid,
		success:function(msg){
			if(msg=='success'){
				alert('删除成功');
				$('#sampletree').tree('reload')
			}else{
				alert('删除失败');
			}
		}
	})
}