//曲线数据采集
function dataCapture(){	
	$.ajax({
		type:'POST',
		url:rootPath +'/datacollection/datacollection!collectionCurveData.action',
		data:'deviceid='+deviceid+'&itemid='+itemid+'&methodid='+methodid,
		success:function(msg){
//			alert(msg);
			if(msg=="success"){
				alert("数据采集成功！");
				$('#itemmethod').datagrid('reload');
				var rows = $('#itemmethod').datagrid('getRows');
				if(rows.length>0){
					editCurve(rows[0].curveid);
				}
			}else if(msg=="The capturemethod is't existed"){
				alert("该仪器无数据采集方法！");
			}else{
				alert("数据采集失败！");
			}
		}
	});
}

//加载校准曲线信息
	function initcurvelist(){
		$('#curvelist').datagrid({				
				nowrap: false,
				striped: true,
				singleSelect:true,
				collapsible:true,
				url:rootPath +'/curve/devicecalibratecurve!initCurveinfo.action?deviceid='+deviceid,
				fit : true,
				fitColumns : true,
				remoteSort : false,
				scrollbarSize:0,
				remoteSort: false,
				idField:'curveid',
				pageSize:[10,20,30,40,50],
				columns:[[
						{field:'itemname',title:'项目', width:50,align:"center"},			
						{field:'methodname',title:'分析方法', width:200,align:"center"},
						{field:'losedate',title:'失效日期', width:50,align:"center"},
						{field:'operate',title:'操作', width:40,align:"center",
							formatter : function(value, rowData, rec) {
										var links = '<img src="'
												+ rootPath
												+ '/themes/default/images/xiangxiimage.png" onclick="showdetailDialog(\''
												+ rowData.curveid + '\',\''+ rowData.itemid+ '\',\''+ rowData.methodid+ '\',\''+ rowData.deviceid
												+ '\')"alt="详情"/>&nbsp;';
										return links;
									}
						}						
				]],
			rowStyler:function(rowIndex,rowData){
			if(rowData.losedate!=null&&rowData.losedate!=''){
				var flag = notice(rowData.losedate);
				if(flag=='过期'){
					return "color:#FF3300";
				}
			}
		},
				pagination:true,
				rownumbers:true
			});
		$(window).resize(function() {
			$("#curvelist").datagrid('resize');
		});
	}	
	//
	function initcurvelist2(){
		$('#curvelist').datagrid({				
				nowrap: false,
				striped: true,
				singleSelect:true,
				collapsible:true,
				url:rootPath +'/curve/devicecalibratecurve!initcurvelist.action',
				fit : true,
				fitColumns : true,
				remoteSort : false,
				scrollbarSize:0,
				remoteSort: false,
				idField:'curveid',
				pageSize:10,
				columns:[[
						{field:'itemname',title:'项目', width:50,align:"center"},			
						{field:'methodname',title:'分析方法', width:200,align:"center"},
						{field:'analyseperson',title:'分析人', width:50,align:"center"},
						{field:'createdate',title:'分析日期', width:80,align:"center"},
						{field:'losedate',title:'失效日期', width:50,align:"center"},
						{field:'operate',title:'操作', width:40,align:"center",
							formatter : function(value, rowData, rec) {
										var links = '<img src="'
												+ rootPath
												+ '/themes/default/images/xiangxiimage.png" onclick="showdetailDialog(\''
												+ rowData.curveid + '\',\''+ rowData.itemid+ '\',\''+ rowData.methodid+ '\',\''+ rowData.deviceid
												+ '\')"alt="详情"/>&nbsp;';
										links += '<img src="'
												+ rootPath
												+ '/themes/default/images/deleteimage.png" onclick="deleteCurve('
												+ rowData.curveid
												+ ')" alt="删除"/> ';
										return links;
									}
						}						
				]],
			rowStyler:function(rowIndex,rowData){
			if(rowData.losedate!=null&&rowData.losedate!=''){
				var flag = notice(rowData.losedate);
				if(flag=='过期'){
					return "color:#FF3300";
				}
			}
		},
				pagination:true,
				rownumbers:true
			});
		$(window).resize(function() {
			$("#curvelist").datagrid('resize');
		});
	}	
	
	//比较日期
	function notice(date){
		//当前日期
		var now = new Date();
	 	date+=" 00:00:00";
	 	var createTime = new Date(Date.parse(date.replace(/-/g, '/')));
	 	var num="";
		//如果失效日期小于系统时间，则为过期
		if(now-createTime>0)	{
			num = "过期";
		}
		return num;
	}
	
	//加载项目
	function inititemlist(){
		$('#itemlist').datagrid({	
				singleSelect: true,
				nowrap: false,
				striped: true,
				collapsible:true,
				url:rootPath +'/curve/devicecalibratecurve!initItems.action?deviceid='+deviceid,
				fit : true,
				fitColumns : true,
				remoteSort : false,
				scrollbarSize:0,
				remoteSort : false,
				remoteSort: false,
				pageSize:10,
				pageList:[10,20,30,40],
				frozenColumns:[[
					{	field : 'itemid',
						title : '&nbsp;',
						width : 30,
						align : 'center',
						formatter : function(value){
							return "<input type='radio' name='radio'/>";}
					}
					]],
				columns:[[
						{field:'itemname',title:'项目', width:100,align:"center"}												
				]],
				onSelect:function(){
					checkRadio();
				},
				pagination:true,
				rownumbers:true
			});
		$(window).resize(function() {
			$("#itemlist").datagrid('resize');
		});
	}	

	//添加校准曲线信息
	function addCurveDialog(deviceid){
		var url = rootPath+"/curve/devicecalibratecurve!input.action?deviceid="+deviceid;
		var curve_dialog =  window.top.$('	<div id ="jzqxgl" style="padding:0px;"><iframe id="jiaozhunFrame" width="100%" height="100%" frameborder="0" scrolling="no" src="'+url+'"></iframe></div>').appendTo(window.top.document.body);
		curve_dialog.dialog({
			title:'校准曲线',
			autoOpen:false,
			modal:true,
			closed:true,
			width:'1000',
			height:'400',
			buttons:[{
				text:'保存',
				iconCls:'icon-save',
				handler:function(){
					$("#jiaozhunFrame",top.document.body).contents().find("#curveform").form('submit',{
							url:rootPath +'/curve/devicecalibratecurve!inSave2.action',
							onSubmit:function(){
								var objs = $("#jiaozhunFrame",top.document.body).contents().find(".grkj-validate");
								if(!saveCheck(objs)){		
									//$("#jiaozhunFrame",top.document.body).contents().find(":input").focus();
									$("#jiaozhunFrame",top.document.body).contents().find("#itemname").focus();
									//$("#jiaozhunFrame",top.document.body).contents().find("#methodlist").focus();
									
									$("#jiaozhunFrame",top.document.body).contents().find("#materialname").focus();
									$("#jiaozhunFrame",top.document.body).contents().find("#solutionconcentration").focus();
									$("#jiaozhunFrame",top.document.body).contents().find("#constantvolume").focus();
									alert("数据输入不符合格式，请查看红色边框的输入框的输入提示！");
									return false;
								}
								var losedate = $("#jiaozhunFrame",top.document.body).contents().find("#losedate").val();
								if(losedate==null||losedate==''){
									alert("失效日期不能为空!");
									return false;
								}
//								var flag=true;
//								var xvalue="";
//								var yvalue="";
//								$("#jiaozhunFrame",top.document.body).contents().find("#quxiandatalist tr").each(function(trid,tritem){
//									var count = 0;
//									var inputcount = 0;
//									$(tritem).find("td").each(function(tdid,tditem){
//										count++;
//										$(tditem).find("input").each(function(inputid,inputitem){
//											var value = $(inputitem).val();
//											if(value!=null&&value!=''){
//												inputcount++;
//											}
//										});		
//									});
//									if(trid>0&&inputcount!=0){
//										if(trid>0&&(count-2)!=inputcount){
//											flag = false;
//											alert("一行中有一条数据输入，其他必须输入");
//											return false;
//										}
//									}
//									
//								});
//								if(!flag){								
//									alert("请将参数填写完整!");
//									return false;
//								}
							},
							success:function(data){
								if(data=="success"){
									curve_dialog.dialog('close');
									alert('成功');
									$("#curvelist").datagrid('reload');
								}
								if(data=="fail"){
									alert('失败');
								}
								if(data=="wuxiao"){
									alert('请填写标样数据!');
								}
								if(data=="weikong"){
									alert('数据无效,无法保存!');
								}
							}
					});	
				}
			},{
				text:'取消',
				iconCls:'icon-cancel',
				handler:function(){	
					curve_dialog.dialog('close');
				}
			}],
			onClose:function(){
				curve_dialog.dialog("destroy");
			}
		});
		curve_dialog.dialog('open');
	}	
	
	
	//添加校准曲线信息
	function addCurve(deviceid,itemid,methodid){
		var url = rootPath+"/curve/devicecalibratecurve!toAddCurve.action?deviceid="+deviceid+"&itemid="+itemid+"&methodid="+methodid;
		var curve_dialog =  window.top.$('	<div id ="jzqxgl" style="padding:0px;"><iframe id="jiaozhunFrame" width="100%" height="100%" frameborder="0" scrolling="no" src="'+url+'"></iframe></div>').appendTo(window.top.document.body);
		curve_dialog.dialog({
			title:'校准曲线',
			autoOpen:false,
			modal:true,
			closed:true,
			width:'900',
			height:'550',
			buttons:[{
				text:'计算',
				iconCls:'icon-edit',
				handler:function(){
					$("#jiaozhunFrame",top.document.body).contents().find("#curveform").form('submit',{
							url:rootPath +'/curve/devicecalibratecurve!inSave.action',
							onSubmit:function(){
								var objs = $("#jiaozhunFrame",top.document.body).contents().find("#curveform").find(".grkj-validate");
								if(!saveCheck(objs)){		
									//$("#jiaozhunFrame",top.document.body).contents().find(":input").focus();
									$("#jiaozhunFrame",top.document.body).contents().find("#itemname").focus();
									$("#jiaozhunFrame",top.document.body).contents().find("#methodlist").focus();
									
									$("#jiaozhunFrame",top.document.body).contents().find("#materialname").focus();
									$("#jiaozhunFrame",top.document.body).contents().find("#solutionconcentration").focus();
									$("#jiaozhunFrame",top.document.body).contents().find("#constantvolume").focus();
									alert("数据输入不符合格式，请查看红色边框的输入框的输入提示！");
									return false;
								}
								var losedate = $("#jiaozhunFrame",top.document.body).contents().find("#losedate").val();
								if(losedate==null||losedate==''){
									alert("失效日期不能为空!");
									return false;
								}
								$("#jiaozhunFrame",top.document.body).contents().find("#openBlock").click();
							},
							success:function(data){
								if(data=="fail"){
									alert('计算失败!');
									$("#jiaozhunFrame",top.document.body).contents().find("#unLockBlock").click();
								}else if(data=="wuxiao"){
									alert('请填写标样数据!');
									$("#jiaozhunFrame",top.document.body).contents().find("#unLockBlock").click();
								}else if(data=="weikong"){
									alert('数据无效,无法计算!');
									$("#jiaozhunFrame",top.document.body).contents().find("#unLockBlock").click();
								}else{
//									curve_dialog.dialog('close');
									alert('计算成功!');
									$("#jiaozhunFrame",top.document.body).contents().find("#unLockBlock").click();
									//$("#jiaozhunFrame",top.document.body).contents().find("#refreshHtml").click();
									//$("#itemmethod").datagrid('reload');
									var str = "";									
									if(data!=''){
										str = data.toString();
										var arr;
										arr = str.split(",");
										$("#jiaozhunFrame",top.document.body).contents().find("#slope").val(arr[0]);
										$("#jiaozhunFrame",top.document.body).contents().find("#intercept").val(arr[1]);
										$("#jiaozhunFrame",top.document.body).contents().find("#relatedcoefficient").val(arr[2]);
										$("#jiaozhunFrame",top.document.body).contents().find("#standardcurve").val(arr[3]);
										$("#jiaozhunFrame",top.document.body).contents().find("#curveid").val(arr[4]);
									}
								}
							}
					});	
				}
			}
			,{
				text:'保存',
				iconCls:'icon-save',
				handler:function(){	
					//alert($("#jiaozhunFrame",top.document.body).contents().find("#slope").val());
					//curve_dialog.dialog('close');
					var curveid = $("#jiaozhunFrame",top.document.body).contents().find("#curveid").val();
					
					if(curveid==''){
						alert("请您先输入数据进行计算！");
						return;
					}
					var slope = $("#jiaozhunFrame",top.document.body).contents().find("#slope").val();
					var intercept = $("#jiaozhunFrame",top.document.body).contents().find("#intercept").val();
					var relatedcoefficient = $("#jiaozhunFrame",top.document.body).contents().find("#relatedcoefficient").val();
					var standardcurve = $("#jiaozhunFrame",top.document.body).contents().find("#standardcurve").val();
					var constantvolume = $("#jiaozhunFrame",top.document.body).contents().find("#constantvolume").val();
					var drawdate = $("#jiaozhunFrame",top.document.body).contents().find("#drawdate").val();
					var losedate = $("#jiaozhunFrame",top.document.body).contents().find("#losedate").val();
					var materialid = $("#jiaozhunFrame",top.document.body).contents().find("#materialid").val();
					var solutionconcentration = $("#jiaozhunFrame",top.document.body).contents().find("#solutionconcentration").val();
					var opticalpath = $("#jiaozhunFrame",top.document.body).contents().find("#opticalpath").val();
					var colorvolume = $("#jiaozhunFrame",top.document.body).contents().find("#colorvolume").val();
					
					var url=rootPath +'/curve/devicecalibratecurve!editDevicecalibratecurve.action';
					 url+="?slope=" + slope.toString()+"&intercept="+intercept.toString()+"&relatedcoefficient="+relatedcoefficient.toString()+
					 "&standardcurve="+encodeURIComponent(encodeURIComponent(standardcurve.toString()))+"&curveid="+curveid.toString()+
					 "&constantvolume="+constantvolume+"&drawdate="+drawdate+"&losedate="+losedate+"&materialid="+materialid+
					 "&solutionconcentration="+solutionconcentration+"&opticalpath="+opticalpath+"&colorvolume="+colorvolume;
					//alert(url);
					$("#jiaozhunFrame",top.document.body).contents().find("#openBlock").click();
					//监测任务为环境质量监测和污染源监测时，需要传监测时间(即月份),委托监测和三同时监测则是委托日期
					$.post(url+"&timeStamp="+new Date().getTime(),
					function(data) {
						if (data=='success') {
							alert("保存成功！");
							$("#jiaozhunFrame",top.document.body).contents().find("#unLockBlock").click();
							//curve_dialog.dialog('close');
						}else{
							alert("保存失败！");
							$("#jiaozhunFrame",top.document.body).contents().find("#unLockBlock").click();
						}
					});
				}
			}],
			onClose:function(){
				curve_dialog.dialog("destroy");
				$("#jiaozhunFrame",top.document.body).contents().find("#refreshHtml").click();
				$("#itemmethod").datagrid('reload');
			}
		});
		curve_dialog.dialog('open');
	}	
	
	
	//修改校准曲线信息
	function editCurve(eid){
		var cid = "";
		if(eid==null || eid==""){
			var curve=$('#itemmethod').datagrid("getSelections");
			if(curve.length>1 || curve.length<1){
				alert("请选择一条数据进行修改！");
				return;
			}
			
			for(var i=0;i<curve.length;i++){
				if(curve[i].standardcurve!=null){
					alert('此校准曲线已完成,不可修改！');
					return;
				}
				if(curve[i].enable==false){
					alert('此校准曲线已经被关联,不可修改！');
					return;
				}
				if(cid!="")cid = cid + ",";
				cid = cid + curve[i].curvecode
			}
		}else{
			cid = eid;
		}
		var url = rootPath+"/curve/devicecalibratecurve!toEditCurve.action?curvecode="+cid;
		var curve_dialog =  window.top.$('	<div id ="jzqxgl" style="padding:0px;"><iframe id="jiaozhunFrame" width="100%" height="100%" frameborder="0" scrolling="no" src="'+url+'"></iframe></div>').appendTo(window.top.document.body);
		curve_dialog.dialog({
			title:'校准曲线',
			autoOpen:false,
			modal:true,
			closed:true,
			width:'1000',
			height:'420',
			buttons:[{
				text:'计算',
				iconCls:'icon-edit',
				handler:function(){
					$("#jiaozhunFrame",top.document.body).contents().find("#curveform").form('submit',{
							url:rootPath +'/curve/devicecalibratecurve!editSave.action',
							onSubmit:function(){
								var objs = $("#jiaozhunFrame",top.document.body).contents().find("#curveform").find(".grkj-validate");
								if(!saveCheck(objs)){
									$("#jiaozhunFrame",top.document.body).contents().find("#materialname").focus();
									$("#jiaozhunFrame",top.document.body).contents().find("#solutionconcentration").focus();
									$("#jiaozhunFrame",top.document.body).contents().find("#constantvolume").focus();
									alert("数据输入不符合格式，请查看红色边框的输入框的输入提示！");
									return false;
								}
								var losedate = $("#jiaozhunFrame",top.document.body).contents().find("#losedate").val();
								if(losedate==null||losedate==''){
									alert("失效日期不能为空!");
									return false;
								}
								$("#jiaozhunFrame",top.document.body).contents().find("#openBlock").click();
							},
							success:function(data){
								if(data=="fail"){
									alert('计算失败!');
									$("#jiaozhunFrame",top.document.body).contents().find("#unLockBlock").click();
								}else if(data=="wuxiao"){
									alert('请填写标样数据!');
									$("#jiaozhunFrame",top.document.body).contents().find("#unLockBlock").click();
								}else if(data=="weikong"){
									alert('数据无效,无法计算!');
									$("#jiaozhunFrame",top.document.body).contents().find("#unLockBlock").click();
								}else{
//									curve_dialog.dialog('close');
									alert('计算成功!');
									$("#jiaozhunFrame",top.document.body).contents().find("#unLockBlock").click();
									//$("#jiaozhunFrame",top.document.body).contents().find("#refreshHtml").click();
									//$("#itemmethod").datagrid('reload');
									var str = "";									
									if(data!=''){
										str = data.toString();
										var arr;
										arr = str.split(",");
										$("#jiaozhunFrame",top.document.body).contents().find("#slope").val(arr[0]);
										$("#jiaozhunFrame",top.document.body).contents().find("#intercept").val(arr[1]);
										$("#jiaozhunFrame",top.document.body).contents().find("#relatedcoefficient").val(arr[2]);
										$("#jiaozhunFrame",top.document.body).contents().find("#standardcurve").val(arr[3]);
										$("#jiaozhunFrame",top.document.body).contents().find("#curveid").val(arr[4]);
									}
								}
							}
					});	
				}
			},{
				text:'保存',
				iconCls:'icon-save',
				handler:function(){	
					//alert($("#jiaozhunFrame",top.document.body).contents().find("#slope").val());
					//curve_dialog.dialog('close');
					var curveid = $("#jiaozhunFrame",top.document.body).contents().find("#curveid").val();
					
					if(curveid==''){
						alert("请您先输入数据进行计算！");
						return;
					}
					var slope = $("#jiaozhunFrame",top.document.body).contents().find("#slope").val();
					var intercept = $("#jiaozhunFrame",top.document.body).contents().find("#intercept").val();
					var relatedcoefficient = $("#jiaozhunFrame",top.document.body).contents().find("#relatedcoefficient").val();
					var standardcurve = $("#jiaozhunFrame",top.document.body).contents().find("#standardcurve").val();
					var constantvolume = $("#jiaozhunFrame",top.document.body).contents().find("#constantvolume").val();
					var drawdate = $("#jiaozhunFrame",top.document.body).contents().find("#drawdate").val();
					var losedate = $("#jiaozhunFrame",top.document.body).contents().find("#losedate").val();
					var materialid = $("#jiaozhunFrame",top.document.body).contents().find("#materialid").val();
					var solutionconcentration = $("#jiaozhunFrame",top.document.body).contents().find("#solutionconcentration").val();
					
					var url=rootPath +'/curve/devicecalibratecurve!editDevicecalibratecurve2.action';
					 url+="?slope=" + slope.toString()+"&intercept="+intercept.toString()+"&relatedcoefficient="+relatedcoefficient.toString()+
					 "&standardcurve="+encodeURIComponent(encodeURIComponent(standardcurve.toString()))+"&curveid="+curveid.toString()+
					 "&constantvolume="+constantvolume+"&drawdate="+drawdate+"&losedate="+losedate+"&materialid="+materialid+"&solutionconcentration="+solutionconcentration;
					//alert(url);
					$("#jiaozhunFrame",top.document.body).contents().find("#openBlock").click();
					//监测任务为环境质量监测和污染源监测时，需要传监测时间(即月份),委托监测和三同时监测则是委托日期
					$.post(url+"&timeStamp="+new Date().getTime(),
					function(data) {
						if (data=='success') {
							alert("保存成功！");
							$("#jiaozhunFrame",top.document.body).contents().find("#unLockBlock").click();
							curve_dialog.dialog('close');
						}else{
							alert("保存失败！");
							$("#jiaozhunFrame",top.document.body).contents().find("#unLockBlock").click();
						}
					});
				}
			}],
			onClose:function(){
				curve_dialog.dialog("destroy");
				$("#jiaozhunFrame",top.document.body).contents().find("#refreshHtml").click();
				$("#itemmethod").datagrid('reload');
			}
		});
		curve_dialog.dialog('open');
	}	
	
	
	
	//校准曲线详情
	function showdetailDialog(curveid,itemid,methodid,deviceid){
		$('#curvelist').datagrid('clearSelections');
		var url = rootPath+"/curve/devicecalibratecurve!view.action";
		if(curveid!=""){
			url +="?id="+curveid+"&itemid="+itemid+"&methodid="+methodid+"&deviceid="+deviceid;
		}
		var curve_dialog =  window.top.$('<div id ="detail" style="padding:0px;"><iframe id="detailFrame" width="100%" height="100%" frameborder="0" scrolling="no" src="'+url+'"></iframe></div>').appendTo(window.top.document.body);
		curve_dialog.dialog({
			title:'校准曲线',
			autoOpen:false,
			modal:true,
			closed:true,
			width:'980',
			height:'650',
			onClose:function(){
				if($("#detailFrame",top.document.body).contents().find("#flag").val()=="flag"){
					$("#curvelist").datagrid('reload');
				}
				curve_dialog.dialog("destroy");
			}
		});
		curve_dialog.dialog('open');
	}
	
	//初始化详情列表左侧
	function itemmethod(deviceid,itemid,methodid){
		$('#itemmethod').datagrid({				
			nowrap: false,
			striped: true,
			singleSelect:true,
			collapsible:true,
			url:rootPath +'/curve/devicecalibratecurve!inititemmethod.action?deviceid='+deviceid+"&itemid="+itemid+"&methodid="+methodid,
			fit : true,
			fitColumns : true,
			remoteSort : false,
			scrollbarSize:0,
			remoteSort: false,
			idField:'curveid',
		//	pageSize:10,
			columns:[[
					{field:'analyseperson',title:'分析人', width:80,align:"center"},
					{field:'createdate',title:'分析时间', width:150,align:"center"}
			]],
			onLoadSuccess:function(){
			//默认加载第一行的基本信息
		$('#itemmethod').datagrid('selectRow',0);
			var rowData = $('#itemmethod').datagrid('getSelected');
			if(rowData!=null){
				$("#right",document).attr("src",rootPath+"/curve/devicecalibratecurve!right.action?id="+rowData.curveid);
			}
		},
			onClickRow:function(rowIndex, rowData){
				if(rowData!=null){
					$("#right",document).attr("src",rootPath+"/curve/devicecalibratecurve!right.action?id="+rowData.curveid);
				}
			},onRowContextMenu:function(e,rowIndex,rowData){
				$("#curveidv").val(rowData.curveid);
				$("#deviceidv").val(rowData.deviceid);
				$("#itemidv").val(rowData.itemid);
				$("#methodidv").val(rowData.methodid);
				$('#curvedel-menu').menu('show', {
						left: e.pageX,
						top: e.pageY
					});
				e.preventDefault();
			 }
		});
	$(window).resize(function() {
		$("#itemmethod").datagrid('resize');
	});
	
	}
	
	//初始化详情列表左侧
	function batchitemmethod(deviceid,itemid,methodid){
		$('#itemmethod').datagrid({				
			nowrap: false,
			striped: true,
			//singleSelect:true,
			collapsible:true,
			url:rootPath +'/curve/devicecalibratecurve!inititemmethod.action?deviceid='+deviceid+"&itemid="+itemid+"&methodid="+methodid,
			fit : true,
			fitColumns : true,
			remoteSort : false,
			scrollbarSize:0,
			remoteSort: false,
			idField:'curvecode',
			sortName: 'createdate',
			sortOrder: 'desc',
			pageSize:10,
			columns:[[
					{field:'curvecode',checkbox:true,align:"center"},
					//{field:'curvecode',title:'曲线编号', width:100,align:"center"},
					{field:'analyseperson',title:'分析人', width:100,align:"center"},
					{field:'createdate',title:'分析时间', width:150,align:"center"}
			]],
			onLoadSuccess:function(data){
				$('#itemmethod').datagrid('clearSelections');
//				//默认加载选中曲线的基本信息
//				$('#itemmethod').datagrid('selectRow',0);
//					var rowData = $('#itemmethod').datagrid('getSelected');
//					if(rowData!=null){
//					$("#right",document).attr("src",rootPath+"/curve/devicecalibratecurve!right.action?id="+rowData.curveid);
//				}
				var rowData = data.rows;
				if(rowData!=''){
					if(rowData.length>0){
						var count=0;
						for(var i=0; i< rowData.length;i++){
//							alert(curvecode+"____"+i+"____"+rowData[i].curvecode);
							if(curvecode == rowData[i].curvecode){
								$('#itemmethod').datagrid('selectRow',i);
								$("#right",document).attr("src",rootPath+"/curve/devicecalibratecurve!right.action?curvecode="+rowData[i].curvecode);//+"deviceid="+deviceid+"&itemid="+itemid+"&methodid="+methodid
								break;
							}							
						}
					}else{
						$("#right",document).attr("src",rootPath+"/curve/devicecalibratecurve!right.action");
					}
				}
			
			},
			onClickRow:function(rowIndex, rowData){
				$('#itemmethod').datagrid('clearSelections');
				$('#itemmethod').datagrid('selectRow',rowIndex);
				if(rowData!=null){
					$("#right",document).attr("src",rootPath+"/curve/devicecalibratecurve!right.action?curvecode="+rowData.curvecode);
				}
			}
//			,onRowContextMenu:function(e,rowIndex,rowData){
//				$("#curveidv").val(rowData.curveid);
//				$("#deviceidv").val(rowData.deviceid);
//				$("#itemidv").val(rowData.itemid);
//				$("#methodidv").val(rowData.methodid);
//				$('#curvedel-menu').menu('show', {
//						left: e.pageX,
//						top: e.pageY
//					});
//				e.preventDefault();
//			 },onHeaderContextMenu:function(e,field){				
//				$('#header-menu').menu('show', {
//						left: e.pageX,
//						top: e.pageY
//					});
//				e.preventDefault();
//			}
		});
	$(window).resize(function() {
		$("#itemmethod").datagrid('resize');
	});
	
	}
	
	
	//删除曲线数据
	function deleteCurve(){
		if (window.confirm('删除校准曲线可能会影响相关联的数据，您确定要删除么？')) {
			var curve=$('#itemmethod').datagrid("getSelections");
			var curvecode = "";
			for(var i=0;i<curve.length;i++){
				if(curvecode!="")curvecode = curvecode + ",";
				curvecode = curvecode + curve[i].curvecode;
			}
			var deviceid=$("#deviceidv").val();
			var itemid=$("#itemidv").val();
			var methodid=$("#methodidv").val();
		if(curvecode!=null){
			$.post(rootPath + "/curve/devicecalibratecurve!deleteCurve.action",{id:curvecode,deviceid:deviceid,itemid:itemid,methodid:methodid},function(del){
				if(del=='success'){
//					$("#flag").val("0");
					$('#itemmethod').datagrid('clearSelections');
					$("#itemmethod").datagrid('reload');
					alert('成功!');
				}
				if(del=='exist'){
					alert('该校准曲线已与样品或批次关联，不能删除!');
				}
				if(del=='fail'){
					alert('失败!');
				} 
			});
		}
		}
	}
	
	//初始化校准曲线名称
	function initcurvename(curvecode){
		if(curvecode!=null){
			$.ajax({
				   type: "post",
				   url: rootPath +"/curve/devicecalibratecurve!initCurvename.action",
				   data: {curvecode:curvecode},
				   success: function(msg){
				     $("#curvecode").html(msg);	
				   }
			});
		}
	}
	//中间的斜率，截距，校准曲线的参数的获得
	function tableValue(curveid){
		if(curveid!=null){
			$.ajax({
				   type: "get",
				   url: rootPath +"/curve/devicecalibratecurve!tableValue.action",
				   data: {id:curveid},
				   success: function(msg){
						var obj = eval('('+msg+')');
						$('#slope').val(obj.slope);
						$('#strIntercept').val(obj.strIntercept);
						$('#relatedcoefficient').val(obj.relatedcoefficient);
						$('#standardcurve').val(obj.standardcurve);
				   }
			});
		}
	}

	function initCurveQuxian(){
		//加载曲线图			   
	       var chart = new Highcharts.Chart({
	            chart: {
	                renderTo: 'curveswf',
	                type: 'scatter',
	                zoomType: 'xy'
	            },
	            title: {
	                text: '校准曲线'
	            },
	            xAxis: {
	                title: {
	                    enabled: true,
	                    text: xname
	                },
	                startOnTick: true,
	                endOnTick: true,
	                showLastLabel: true
	            },
	            yAxis: {
	                title: {
	                    text: yname
	                }
	            },
	            tooltip: {
	                formatter: function() {
	                        return ''+
	                        this.x +', '+ this.y +'';
	                }
	            },
	            legend: {
           		  enabled: false
       			 },		            
	            series: [{
	                type: 'line',
	                name: '校准曲线',
	                data: linedata,
	                marker: {
	                    enabled: false
	                },
	                states: {
	                    hover: {
	                        lineWidth: 0
	                    }
	                },
	                enableMouseTracking: false
	            }, {
	                name: '标点',
	                color: 'rgba(223, 83, 83, .5)',
	                data: pointdata
	            }]
	        });
}
	
	
	//打开项目信息
	function openItems(deviceid){
		var url = rootPath+"/curve/devicecalibratecurve!toitem.action?deviceid="+deviceid;
		var curve_dialog =  window.top.$('	<div id ="item" style="padding:0px;"><iframe id="itemFrame" width="100%" height="100%" frameborder="0" scrolling="no" src="'+url+'"></iframe></div>').appendTo(window.top.document.body);
		curve_dialog.dialog({
			title:'项目',
			autoOpen:false,
			modal:true,
			closed:true,
			width:'500',
			height:'400',
			buttons:[{
				text:'确定',
				iconCls:'icon-save',
				handler:function(){
					$("#itemFrame",top.document.body).contents().find("#itemid").click();
					
					var itemid = $("#itemFrame",top.document.body).contents().find("#itemid").val();
					var itemname = $("#itemFrame",top.document.body).contents().find("#itemname").val();
					var departid = $("#itemFrame",top.document.body).contents().find("#departid").val();
					var groupid = $("#itemFrame",top.document.body).contents().find("#groupid").val();
					var devicetype = $("#itemFrame",top.document.body).contents().find("#devicetype").val();
					var reportitemname= $("#itemFrame",top.document.body).contents().find("#reportitemname").val();
				
					$("#itemid").val(itemid);
					$("#itemname").val(itemname);
					$("#reportitemname").val(reportitemname);
					curve_dialog.dialog('close');
					//加载方法下拉框
					methodData(devicetype,itemid,departid,groupid);					
				}
			},{
				text:'取消',
				iconCls:'icon-cancel',
				handler:function(){	
					curve_dialog.dialog('close');
				}
			}],
			onClose:function(){
				curve_dialog.dialog("destroy");
			}
		});
		curve_dialog.dialog('open');
	}
	
	
	//加载方法下拉框
	function methodData(devicetype,itemid,departid,groupid){
		$('#methodlist').html('');
		$.ajax( {
			type : 'GET',
			url : rootPath+'/curve/devicecalibratecurve!initMethod.action?'+'timeStamp='+new Date().getTime(),//给该url一个时间戳~~这样就必须每次从服务器读取数据,
			data : {'devicetype' : devicetype,'itemid':itemid,'departid':departid,'groupid':groupid},
			async:false,//同步
			success : function(data) {
				var vData = eval("(" + data + ")");
				var lList = "<option value=\"\">---请选择---</option>";
				var methodid = $('#methodid').val();
				//遍历json数据  
				jQuery.each(vData.rowsData, function(i, n) {
					if(methodid==n.methodid){
						lList += "<option value=" + n.methodid + " selected >" + n.methodname	+ "</option>";
					}else{
						lList += "<option value=" + n.methodid + ">" + n.methodname	+ "</option>";
					}
				});				
				//绑定数据到listLeft
				$('#methodlist').append(lList);
			}
		});
	}
	
	
	
	//获取选中的项目id
	function getSelectRow(){
		var nodes = $('#itemlist').datagrid('getSelected');
		$("#itemid").val(nodes.itemid);	
		$("#itemname").val(nodes.itemname);
		$("#departid").val(nodes.departid);
		$("#groupid").val(nodes.groupid);
		$("#devicetype").val(nodes.devicetype);
		$("#reportitemname").val(nodes.reportitemname);
	}
	
	//选中项的单选按钮置为选中状态
	function checkRadio(){
		var row = $('#itemlist').datagrid('getSelected');
		var rowNum = 0;
		var rows = $('#itemlist').datagrid('getRows');
		for ( var i = 0; i < rows.length; i++) {
			if (row == rows[i]) {
				rowNum = i;
				break;
			}
		}
		var radios = $("input[type=radio]");
		$(radios[rowNum]).attr("checked", true);
	}
	
