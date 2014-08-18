var monitorTotalCharge="";
var editingId = undefined;  


//监测费用
function initMonitorFeesDatagrid(){
	//alert(1);
			$('#datagrid').treegrid({
				nowrap: false,
				striped: true,
				collapsible:true,
				url:'monitorfees!monitorFeesList.action?id='+projectid,
				fit:true,
				fitColumns:true,
				rownumbers:false,
				treeField:'monitorcode' ,
				scrollbarSize:0,
				singleSelect:false,
				idField:'id',
				columns:[[
					{field:'id',checkbox:true,align:"center"},
				//	{field:'monitortype',title:'监测点类型',width:80,align : 'center'},
			        {field:'monitorcode',title:'监测点编码',width:100,align : 'left'},					
					{field:'monitorname',title:'监测点名称',width:120,align : 'center'},
					{field:'analysesfees',title:'分析费（元）',width:80,align : 'center'},
					{field:'samplefees',title:'采样费(元)',width:80,align : 'center'},
					{field:'multiple',title:'倍数   <img src="'+rootPath+'/themes/icons/mini_edit.png"/>',width:50,align : 'center',
						formatter:function(value,rowData){
							return '<div ondblclick="editValue(this,\''+rowData.id+'\')">'+value+'</div>';
						}},
					{field:'count',title:'小计（元）',width:50,align : 'center',
						formatter:function(value,rowData){
							var count= (rowData.analysesfees + rowData.samplefees) * rowData.multiple;
							if(rowData.analysesfees!=null&&rowData.samplefees!=null){
								count = (rowData.analysesfees + rowData.samplefees) * rowData.multiple;
								return count;
							}
						}
					}
				]],
				onLoadSuccess:function(data){
//					var datas = $('#datagrid').treegrid('getRows');
					var roots = $('#datagrid').treegrid('getRoots');
					var analysesFeesTotal = 0;
					var sampleFeesTotal = 0;
					for(var i=0;i<roots.length;i++){
						var childrens = $('#datagrid').treegrid('getChildren',roots[i].id);
						for(var j=0;j<childrens.length;j++){
							analysesFeesTotal = analysesFeesTotal + childrens[j].analysesfees * childrens[j].multiple;
							sampleFeesTotal = sampleFeesTotal + childrens[j].samplefees * childrens[j].multiple;
						}
					}
//					for(var i=0;i<datas.length;i++){
//						analysesFeesTotal = analysesFeesTotal + datas[i].analysesfees * datas[i].multiple;
//						sampleFeesTotal = sampleFeesTotal + datas[i].samplefees * datas[i].multiple;
//					}
					$('#fxf').val(analysesFeesTotal);
					$('#cyf').val(sampleFeesTotal);
					monitorTotalCharge = analysesFeesTotal + sampleFeesTotal;
					initOtherFeesBeford();
					//countFees();
					var monitorTotalFees = analysesFeesTotal + sampleFeesTotal;
					var otherTotalFees = parseFloat($('#qtfy').val());
					if(otherTotalFees==""||otherTotalFees==null){
						otherTotalFees = 0;
					}
					$('#zfy').val(monitorTotalFees + otherTotalFees);
				},
				onHeaderContextMenu:function(e,field){
					if(field=='multiple'){
						$('#menu').menu('show', {
							left: e.pageX,
							top: e.pageY
						});
						e.preventDefault();
					}
				},
				onSelect:function(node){
					if(node!=null){
						if(node.attributes.flag=='monitortype'){
							var childrens = $('#datagrid').treegrid('getChildren',node.id);
							for(var i=0;i<childrens.length;i++){
								$('#datagrid').treegrid('select',childrens[i].id);
							}
						}
					}
				},
				onUnselect:function(node){
					if(node!=null){
						if(node.attributes.flag=='monitortype'){
							var childrens = $('#datagrid').treegrid('getChildren',node.id);
							for(var i=0;i<childrens.length;i++){
								$('#datagrid').treegrid('unselect',childrens[i].id);
							}
						}
					}
					
				}
			});
			
		$(window).resize(function(){
			$("#datagrid").treegrid('resize');
		})	;
}


//倍数批量修改
function openUpdateDlg(){
	var rows = $('#datagrid').treegrid('getSelections');
	if(rows==null||rows==""){
		alert("请至少选择一项！");
	}else{
		if(rows.length==1){
			if(rows[0].multiple==0){
				alert("监测方案采样未设置，不能修改！");
				return;
			}
		}
		var url = rootPath + "/monitorproject/monitorfees!multiple.action";
		var _dialog =  window.top.$('	<div id ="dlg" style="padding:0px;"><iframe id="frame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
	
		_dialog.dialog({
		title:'倍数编辑',
		autoOpen:false,
		modal:true,
		closed:true,
		width:'275',
		height:'150',
		buttons:[{
			text:'保存',
			iconCls:'icon-save',
			handler:function(){
				var multiple = $("#frame",top.document.body).contents().find("#multiple").val();
				if(multiple==""||multiple==null){
					$("#frame",top.document.body).contents().find(":input").focus();
					alert("数据输入不符合格式，请查看红色边框的输入框的输入提示！");
					return false;
				}else{
					var arr = [];
					for(var i=0;i<rows.length;i++){
						if(rows[i].attributes.flag=='monitorpoint'){
							if(arr!=""){
								arr = arr + ",";
							}
							arr = arr + rows[i].id;
						}
					}
					$.ajax({
					type:'post',
					url:rootPath + '/monitorproject/monitorfees!updateMultiple.action',
					data:'json='+arr+'& info='+multiple,
					success:function(data){
						if(data>0){
							alert('修改成功！');
							_dialog.dialog('close');
							$('#datagrid').treegrid('reload');
						}
					}
					});
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
}

//编辑单元格
function editValue(element,id){
	$('#datagrid').treegrid('unselectAll');
	$('#datagrid').treegrid('select',id);
	var parent = $(element).parent();
	var beforeEditValue = $(element).html();
	if(beforeEditValue==0){
		alert("监测方案采样未设置，不能修改！");
	}else{
		$(parent).html("<div><input id='editvalue' type='text' value='"+$(element).html()+"' class='TextBox' style='width:100%;' onBlur='operateBlur(this,\""+id+"\",\""+beforeEditValue+"\")' /></div>");
		$('#editvalue').focus();
	}
}

//文本框失去焦点
function operateBlur(element,id,beforeValue){
	$('#datagrid').treegrid('select',id);
	var value = ($('#editvalue').val());
	//var projectPointId = $("#datagrid").treegrid('getSelected');
	var afterEditHtml = '<div ondblclick="editValue(this,\''+id+'\')">'+$('#editvalue').val()+'</div>';
	$(element).parent().parent().html(afterEditHtml);
	if(beforeValue!=value){
		$.ajax({
		type:'post',
		url:rootPath + '/monitorproject/monitorfees!updateMultiple.action',
		data:'json='+id+'& info='+value,
		success:function(data){
			if(data>0){
				$('#datagrid').treegrid('reload');
			}
		}
		});
	}
}

//初始化其他费用列表之前的工作(liuh修改   不让在页面加载的时候就往表中插入数据  而是在监测方案增加和删除的时候插入)
function initOtherFeesBeford(){
//	alert(monitorTotalCharge);
	//alert(2);
	$.post(
		rootPath + "/monitorproject/monitorfees!initOtherChargetBefore.action",
		{"id":projectid,"json":monitorTotalCharge},
		function(msg){
			if(msg=='success'){
				initOtherFeesDatagrid();
			}
		}
	);
}

//其他费用
function initOtherFeesDatagrid(){
	//alert(3);
	$('#datagrid1').datagrid({
		nowrap: false,
		striped: true,
		collapsible:true,
		url:'monitorfees!otherFeesList.action?id='+projectid,
		fit:true,
		fitColumns:true,
		scrollbarSize:0,
		//singleSelect:true,
		columns:[[
			{field:'id',checkbox:true,align:"center"},
			{field:'project',title:'收费项目',width:100,align : 'center'},					
			{field:'unit',title:'计量单位',width:50,align : 'center'},
			{field:'standard',title:'收费标准（元）',width:50,align : 'center'},
			{field:'carnumber',title:'辆次',width:20,align : 'center'},
			{field:'dasys',title:'天数',width:20,align : 'center'},
			{field:'fees',title:'费用（元）',width:50,align : 'center'},
			{field:'remark',title:'费用描述',width:130,align : 'center'},
			{field:'operate',title:'操作',width:30,align : 'center',
				formatter:function(value,rowData,rowIndex){
					return '<img src="'+rootPath+'/themes/default/images/bianjiimage.png" alt="修改" onclick="otherFeesEdit('+rowData.id+','+projectid+')"/>' ;
					}
				}
		]],
		//pagination:true,
		rownumbers:true,
		//pageSize:6,
		//pageList:[6,10],
		onLoadSuccess:function(data){
			var otherFeesTotal = 0;
			var datas = $('#datagrid1').datagrid('getRows');
			for(var i=0;i<datas.length;i++){
				otherFeesTotal = otherFeesTotal + datas[i].fees;
			}
			$('#qtfy').val(otherFeesTotal);
			
			if(data.isCheck=="true"){
				$("#isCheck").attr("checked","true");
			}else{
				$("#isCheck").removeAttr("checked");
			}
			
			countFees();
//			var sampleTotalFees = $('#cyf').val()==""||$('#cyf').val()==null?0:parseFloat($('#cyf').val());
//			var analysesTotalFees = $('#fxf').val()==""||$('#fxf').val()==null?0:parseFloat($('#fxf').val());
//			$('#zfy').val(sampleTotalFees + analysesTotalFees + otherFeesTotal);
			
		}
	});
			
	$(window).resize(function(){
		$("#datagrid1").datagrid('resize');
	})	;
}

//其他费用添加或修改
function otherFeesEdit(id){
	var url = rootPath + "/monitorproject/monitorfees!input.action?info="+projectid;
	if(id!=""){
		url = url + "&id="+id;
	}
	var _dialog =  window.top.$('	<div id ="dlg" style="padding:0px;"><iframe id="frame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);

	_dialog.dialog({
	title:'其他费用编辑',
	autoOpen:false,
	modal:true,
	closed:true,
	width:'345',
	height:'200',
	buttons:[{
		text:'保存',
		iconCls:'icon-save',
		handler:function(){
			$("#frame",top.document.body).contents().find("#form").form('submit',
				{
					url:rootPath + '/monitorproject/monitorfees!save.action',
					onSubmit:function(){
						var objs = $("#frame",top.document.body).contents().find(".grkj-validate");
						if(!saveCheck(objs)){
							$("#frame",top.document.body).contents().find(":input").focus();
							alert("数据输入不符合格式，请查看红色边框的输入框的输入提示！");
							return false;
						}																			
					},
					success:function(data){
						if(data=='success'){
							alert("保存成功！");
							_dialog.dialog('close');
							$("#datagrid1").datagrid('reload');
						}else{
							alert("保存失败！");
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

//其他费用删除
function otherFeesRemove(){
	var rows = $('#datagrid1').datagrid('getSelections');
	if (rows!=null && rows!="") {
 		if(window.confirm('是否删除？'))
 		{
 			var arr = [];
			for(var i=0;i<rows.length;i++){
				if(arr!=""){
					arr = arr + ",";
				}
				arr = arr + rows[i].id;
			}
			$.post(
				rootPath + "/monitorproject/monitorfees!delete.action",
				{"json":arr},
				function(msg){
						if(msg=='success'){
							$('#datagrid1').datagrid('clearSelections');
							alert("删除成功！");
							$('#datagrid1').datagrid('reload');
						}else{
							alert("删除失败！");
						}
					}
				);
		}
	} else {
		alert('请至少选择一条记录！');
		return;
	}
}

//费用计算
function countFees(){
//  	var totalFees = $('#zfy').val();
//	if($('#fxf').val()==""||$('#cyf').val()==""||$('#qtfy').val()=="")
//		return;
	//alert(4);
  	var xs = $('#xs').val();
  	var s = xs * 10000;
  	var pay = (parseFloat($('#fxf').val())+parseFloat($('#cyf').val())+parseFloat($('#qtfy').val()))* s/10000;
 // 	alert(parseFloat($('#fxf').val())+"---"+parseFloat($('#cyf').val())+"----"+parseFloat($('#qtfy').val()));
//  	var realFees = totalFees * s / 10000;
//  	alert(pay);
//	$('#zfy').val(totalFees);
//	$('#ysfy').val(totalFees * s / 10000);
	$.post(
		rootPath + '/monitorproject/monitorfees!updateProjectFees.action?id='+projectid,
		{json:'{"real":"'+pay+'","xs":"'+xs+'"}'},
		function(msg){
			//alert(msg+111);
			if(msg=='success'){
				var p=pay+"";
				if(p.lastIndexOf(".")>0){
					p=p.substring(0, p.lastIndexOf("."));
				}
				$('#ysfy').val(p);
			}
		});
}

//费用单明细
function showOrder(){
	var url = rootPath + "/common/report!toReportPage.action?raq=MonitorMoney.raq&projectid="+projectid;
	
	var _dialog =  window.top.$('	<div id ="dlg" style="padding:0px;"><iframe id="frame" width="100%" height="100%" frameborder="0" scrolling="yes" src='+url+'></iframe></div>').appendTo(window.top.document.body);
	_dialog.dialog({
	title:'监测费用明细',
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
