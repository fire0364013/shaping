var indexvalue;
var indexrow;
	//加载采样设置信息
	function initSampleinfo(pmonitorid){//,ppointtype){	
		$('#samplelist').datagrid({
			nowrap: false,
			striped: true,
			collapsible:true,
			url:rootPath +'/monitorproject/monitorproject!toSampleinfoList.action?pmonitorid='+pmonitorid, 
			fit:true,
			fitColumns : true,
			scrollbarSize:0,
			remoteSort: false,
			singleSelect:true,
			idField:"sampleid",
			frozenColumns:[[
					{	field : 'sampleid',
				title : '&nbsp;',
				width : 30,
				align : 'center',
				formatter : function(value){
					return "<input type='radio' name='radio'/>";}
			}
						]],
			columns:[[
						{field:'monitordays',title:'监测天数', width:50,align:"center"},
						{field:'monitorfrequency',title:'监测频次(次/天)', width:60,align:"center"},
						{field:'cycle',title:'监测周期', width:60,align:"center"},
						//{field:'samplingcount',title:'每次采样数量', width:50,align:"center"},
						{field:'stand',title:'评价标准', width:200,align:"center"}												
				]],
			onClickRow:function(rowIndex, rowData){			
//				pointtype=ppointtype;
				//点击一行加载项目信息
				checkRadio();
				psampleid = rowData.sampleid;
				initIteminfo(rowData.sampleid);
			},
			onRowContextMenu:function(e,row,rowData){	
				$("#samplelist").datagrid("clearSelections");
				$('#samplelist').datagrid('selectRow',parseInt(row));
				e.preventDefault();
				psampleid = rowData.sampleid;
//				pointtype = ppointtype;
			},
			onHeaderContextMenu:function(e,field){			
				e.preventDefault();
//				pointtype=ppointtype;
			},onLoadSuccess:function(data){
				$('#samplelist').datagrid('clearSelections');
				//默认加载第一行的基本信息
				var row = $('#samplelist').datagrid('selectRow',0);
				var rowData = $('#samplelist').datagrid('getSelected');
				checkRadio();
//				pointtype = ppointtype;
				if(rowData!=null&&rowData!=""){
					psampleid = rowData.sampleid;
					initIteminfo(rowData.sampleid);					
				}else{
					psampleid = "";
					initIteminfo("");					
				}

			}
		});
		$(window).resize(function() {
			$("#samplelist").datagrid('resize');
		});
	
	}
	
	function checkRadio(){
		var row = $('#samplelist').datagrid('getSelected');
		var rowNum = 0;
		var rows = $('#samplelist').datagrid('getRows');
		for ( var i = 0; i < rows.length; i++) {
			if (row == rows[i]) {
				rowNum = i;
				break;
			}
		}
		var radios = $("input[type=radio]");
		$(radios[rowNum]).attr("checked", true);
	}
	
	//加载项目信息
	function initIteminfo(psampleid){
		$('#itemlist').datagrid({
			nowrap: false,
			striped: true,
			collapsible:true,
			url:rootPath +'/monitorproject/monitorproject!toItemfoList.action?psampleid='+psampleid, 
			fit:true,
			fitColumns : true,
			scrollbarSize:0,
			remoteSort: false,
			iconCls:"icon-edit",
			idField:"sampleitemid",
			singleSelect:false,
			frozenColumns:[[
				{field:'sampleitemid',checkbox:true,align:"center"}
					]],
			columns:[[
				{field:'itemname',title:'监测项目', width:100,align:"center"},//',width:120,align:"center"},//
				{field:'itemmethod',title:'分析方法<img src="'+rootPath+'/themes/icons/mini_edit.png"/>', width:120,align:"center",
					formatter:function(value,rec,rowIndex){
						var str = "<div id=\"methodDiv"+rowIndex+"\">" +
								value +
								"</div>";
						return str;
					}
				},
//				{field:'fixedadditive',title:'固定添加剂', width:80,align:"center"},
				{field:'unitname',title:'计量单位', width:60,align:"center"},
				{field:'standvalue',title:'标准值', width:60,align:"center"},
				{field:'isnowtest',title:'现场监测', width:50,align:"center",
					formatter:function(value,rec){
							var str ="";
							if(value=='Y'){
								str = "<input type='checkbox' checked='checked' disabled='disabled'/>";
							}
							if(value=='N'){
								str = "<input type='checkbox' disabled='disabled'/>";
							}
							return str;
						}
				}			
			]],
			onLoadSuccess:function(data){
				countFees();
			},onDblClickCell:function(rowIndex, field, value){
				$('#itemlist').datagrid('clearSelections');
				$('#itemlist').datagrid('selectRow',rowIndex);
				
				var rows = $('#itemlist').datagrid('getSelections');				
				if(field =="itemmethod" && rows[0].itemid!=""){	
					if(indexrow!=null){
						var str = "<div id=\"methodDiv"+indexrow+"\">" +
								indexvalue +
								"</div>";
						$("#methodDiv"+indexrow).html(str);
					}
					$("#methodDiv"+rowIndex).html("");
					methodData(rows[0].itemid,rowIndex,rows[0].sampleitemid,rows[0].methodid);
					indexrow = rowIndex;
					indexvalue = value;
				}
			}
		});
		$(window).resize(function() {
			$("#itemlist").datagrid('resize');
		});
	}
	
		//获取方法
	function methodData(itemid,index,sampleitemid,methodid) {
		$.ajax( {
			type : 'GET',
			url : 'monitorproject!getMethod.action?itemid='+itemid+'&timeStamp='+new Date().getTime(),//给该url一个时间戳~~这样就必须每次从服务器读取数据,
			async:false,//同步
			success : function(data) {
				var vData = eval("(" + data + ")");
				var lList = "<select id=\"methodSel"+index+"\" style=\"width:100%\">";
					//lList += "<option value=''>---请选择---</option>";
				//遍历json数据  
				jQuery.each(vData.rowsData, function(i, n) {
					if(n.methodid==methodid){
						lList += "<option value=" + n.methodid + " selected>" + n.methodname	+ "</option>";
					}else{
						lList += "<option value=" + n.methodid + ">" + n.methodname	+ "</option>";
					}
				});			
				lList += "</select>"
				//绑定数据到listLeft
				$("#methodDiv"+index).append(lList);
				//绑定改变事件
				//updateMethod(index,sampleitemid);
				$("#methodSel"+index).change(function(){
					var mid = $("#methodSel"+index).val();
					$.ajax( {
						type : 'GET',
						url : 'monitorproject!updateMethod.action?psampleitemid='+sampleitemid+'&methodid='+mid+'&timeStamp='+new Date().getTime(),//给该url一个时间戳~~这样就必须每次从服务器读取数据,
						async:false,//同步
						success : function(data) {
							if(data=="success"){
								alert("修改成功！");
								$("#itemlist").datagrid('reload');
							}
							if(data=="fail"){
								alert("请选择方法！");
							}
							if(data=="error"){
								alert("修改失败！");
							}
						}
					});
				});
			}
		});
	}
	//批量设置监测点的采样信息和监测项目信息
	function batchSetInfo(){//pointtype){
//		alert(pointtype);
		$('#ids', parent.document).click();
		var ids =$('#ids', parent.document).val().toString();
		
		if(ids==''){
			alert("请选择监测点！");
			return null;
		}
		var rootArr = ids.split(",");
		var tempArr = '';
		var arr = new Array();
		//判断监测点类型是否相同，只能给相同监测点类型批量设置采样信息和监测项目
		for(var i=0; i<rootArr.length; i++){
			tempArr = rootArr[i].toString().split("_");
			for(var j=0; j<tempArr.length; j++){
				if(tempArr[j].toString().indexOf("object")!=-1){
					arr.push(tempArr[j].toString());
				}
			}
		}
		if(arr.length>=2){
			alert("请选择相同类型下的监测点！");
			return null;
		}
		
		var pids = '';
		var projectid = '';
		var entid = '';
		for(var i=0; i<rootArr.length; i++){
			tempArr = rootArr[i].toString().split("_");
			for(var j=0; j<tempArr.length; j++){
				if(tempArr[j].toString().indexOf("new")!=-1){
					pids = pids + tempArr[0] +",";
					if(projectid==''){
						projectid=tempArr[1];
					}
					if(entid==''){
						entid=tempArr[2];
					}
				}
			}
		}
		pids = pids.substring(0,pids.length-1);
		if(pids==''){
			alert("所选监测点都已设置项目！");
			return null;
		}
//		alert("---"+pids+"---"+projectid+"----"+entid);
//return null;
		var url = rootPath + "/monitorproject/monitorproject!toSetInfo2.action?pids="+pids+"&projectid="+projectid+"&entid="+entid;//+"&pointtype="+pointtype+"&parentpointtype="+encodeURI(encodeURI(parentpointtype));
		var _dialog = window.top
				.$('<div id="monitorDialog"  style="padding:0px;"><iframe id="monitorFrame" width="100%" height="100%" frameborder="0" scrolling="no" src=' + url + '></iframe></div>')
				.appendTo(window.top.document.body);
		_dialog.dialog( {
			title:'批量设置采样、项目',
			autoOpen : false,
			modal : true,
			closed : true,
			width : '700',
			height : '612',
			buttons : [ {
				text : '保存',
				iconCls : 'icon-save',
				handler : function() {		
					$("#monitorFrame",top.document.body).contents().find("#itemids").click();
				
					var objs = $("#monitorFrame",top.document.body).contents().find(".grkj-validate");
					if(!saveCheck(objs)){
						$("#monitorFrame",top.document.body).contents().find(":input").focus();
						$("#monitorFrame",top.document.body).contents().find(":select").focus();
						alert("数据输入不符合格式，请查看红色边框的输入框的输入提示！");
						return false;
					}				

					$("#monitorFrame",top.document.body).contents().find("#sampleinfoFrame").form('submit',{
						url:rootPath +"/monitorproject/monitorproject!addBatchSetItem2.action",
						onSubmit:function(){
							var objs = $("#monitorFrame",top.document.body).contents().find(".grkj-validate");
							if(!saveCheck(objs)){
								$("#monitorFrame",top.document.body).contents().find(":input").focus();
								$("#monitorFrame",top.document.body).contents().find(":select").focus();
								alert("数据输入不符合格式，请查看红色边框的输入框的输入提示！");
								return false;
							}
						},
						success:function(data){						
							if(data=='success'){
//								insertOtherFees();
//								newlyFees();
								_dialog.dialog('close');								
								alert('成功');
								$('#reloadTree', parent.document).click();
								$("#monitorinfolist").treegrid('reload');
//								$("#pointFrame",top.document.body).contents().find("#reloadTree").click();
								countFees();
							}
							if(data=='fail'){
								alert('失败');
							}
						}
					});
				}
			},{
				text : '取消',
				iconCls : 'icon-cancel',
				handler : function() {
					_dialog.dialog('close');
				}
			} ],
			onClose : function() {
				_dialog.dialog("destroy");
	
			}
		});
		_dialog.dialog('open');
	}
	//批量设置监测点的采样信息和监测项目信息
	function batchSetInfo2(){
		var nodes = $('#monitorinfolist').treegrid('getSelections');	
		var pids = "";
		var pointtype = "";
		var parentpointtype = "";
		if(nodes==null||nodes==""){
			alert("请至少选择一项！");
			return;
		}else{
			//pids = node.projectid;
			//var nodes = $('#monitorinfolist').treegrid('getChildren', node.projectid);
			if(nodes.length>0){//此处是点击根节点的时候，可以进行循环设置
				for ( var i = 0; i < nodes.length; i++) {
					if(parentpointtype==""){
						parentpointtype = nodes[i].parentpointtype;
					}else{
						if(parentpointtype!=nodes[i].parentpointtype){
							alert("请选择相同类型下的监测点！");
							return;
						}
					}
					if(nodes[i].pmsize>0){
						alert("已存在相关采样、监测项目信息，不能批量设置！");
						return;
					}
					if(pids != ""){
						pids = pids + ",";
					}
					pids = pids + nodes[i].projectid;
					pointtype = nodes[i].pointtype;
				}
				
			}else {//此处是点击子节点的时候，nodes是0  所以就将node的pointtype给他就可以了  
				pointtype = node.pointtype;
			}
		}
		$("#parentpointtype").val(parentpointtype);
		var url = rootPath + "/monitorproject/monitorproject!toSetInfo2.action?pids="+pids+"&pointtype="+pointtype+"&parentpointtype="+encodeURI(encodeURI(parentpointtype));
		var _dialog = window.top
				.$('<div id="monitorDialog"  style="padding:0px;"><iframe id="monitorFrame" width="100%" height="100%" frameborder="0" scrolling="no" src=' + url + '></iframe></div>')
				.appendTo(window.top.document.body);
		_dialog.dialog( {
			title:'批量设置采样、项目',
			autoOpen : false,
			modal : true,
			closed : true,
			width : '700',
			height : '612',
			buttons : [ {
				text : '保存',
				iconCls : 'icon-save',
				handler : function() {		
					$("#monitorFrame",top.document.body).contents().find("#itemids").click();
				
					var objs = $("#monitorFrame",top.document.body).contents().find(".grkj-validate");
					if(!saveCheck(objs)){
						$("#monitorFrame",top.document.body).contents().find(":input").focus();
						$("#monitorFrame",top.document.body).contents().find("select").focus();
						alert("数据输入不符合格式，请查看红色边框的输入框的输入提示！");
						return false;
					}				

					$("#monitorFrame",top.document.body).contents().find("#sampleinfoFrame").form('submit',{
						url:rootPath +"/monitorproject/monitorproject!addBatchSetItem.action",
						onSubmit:function(){
							var objs = $("#monitorFrame",top.document.body).contents().find(".grkj-validate");
							if(!saveCheck(objs)){
								$("#monitorFrame",top.document.body).contents().find(":input").focus();
								$("#monitorFrame",top.document.body).contents().find("select").focus();
								alert("数据输入不符合格式，请查看红色边框的输入框的输入提示！");
								return false;
							}
						},
						success:function(data){						
							if(data=='success'){
//								insertOtherFees();
//								newlyFees();
								_dialog.dialog('close');								
								alert('成功');
								$("#monitorinfolist").treegrid('reload');
								countFees();
							}
							if(data=='fail'){
								alert('失败');
							}
						}
					});
				}
			},{
				text : '取消',
				iconCls : 'icon-cancel',
				handler : function() {
					_dialog.dialog('close');
				}
			} ],
			onClose : function() {
				_dialog.dialog("destroy");
	
			}
		});
		_dialog.dialog('open');
	}
	//费用计算
	function countFees(){
		//初始化监测费用
		$.post(
			rootPath+'/monitorproject/monitorfees!countTotalCharge.action',
			{id:projectid},
			function(msg){
				if(msg!='success'){
					alert("费用计算出错");
					return false;
				}
							
			}
		);
	}
	
	//重新计算费用
	function newlyFees(){
		$.post(
				rootPath+'/monitorproject/monitorfees!countTotalCharge.action',
				{id:projectid},
				function(msg){
					if(msg!='success'){
						alert("费用计算出错");
						return false;
					}else{
						$("#feiyongFrame",parent.document.body).attr('src',"");
						$("#feiyongFrame",parent.document.body).attr('src',rootPath+'/monitorproject/monitorfees!list.action?id='+projectid);
					}
					
				}
			);
	}
	
//初始化树
	function initItemTree(){	
		var parentpointtype=$("#parentpointtype").val();
		//alert(parentpointtype);
		
		$('#itemtree').tree({
			checkbox:true,
			url: rootPath+'/monitorproject/monitorproject!getItemTree2.action?oldselect='+oldselect+'&pmonitorid='+pmonitorid+"&parentpointtype="+encodeURI(encodeURI(parentpointtype))
		});
	}
	
	//初始化树
	function initItemTree3(){	
		var parentpointtype=$("#parentpointtype").val();
		//alert(parentpointtype);
		
		$('#itemtree3').tree({
			checkbox:true,
			url: rootPath+'/monitorproject/monitorproject!getItemTree3.action?parentpointtype='+encodeURI(encodeURI(parentpointtype))
		});
	}
	//选择标准
	function oneStand(pids){
		var url = rootPath +"/monitorproject/monitorproject!tostandardtree2.action?pids="+pids;
		var _dialog =  window.top.$('<div id ="role-dlg" style="padding:0px;"><iframe id="oneFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
		_dialog.dialog({
			title:'评价标准',
			autoOpen:false,
			modal:true,
			closed:true,
			width:'700',
			height:'500',
			buttons:[{
				text:'保存',
				iconCls:'icon-save',
				handler:function(){
					$("#oneFrame",top.document.body).contents().find("#standid").click();
					var standid = $("#oneFrame",top.document.body).contents().find("#standid").val();
					var levelname = $("#oneFrame",top.document.body).contents().find("#levelname").val();
					var ids = standid.split(',');
					var lid = ids[0];
					var sid = ids[1];
					$('#levelid').val(lid);
					$('#standid').val(sid);
					$('#standname').html(levelname);
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
	
	//初始化标准树
	function initStandardtree(pids){
		$('#standartree').tree({			
			url: rootPath+"/monitorproject/monitorproject!InitStandardTree2.action?pids="+pids,
			onClick:clickrow
		});
	}
	function clickrow(node){
		var leveid=node.id;
		var pid=encodeURI(leveid);
			if(node.attributes=='Y'){
				var myUrl=rootPath+"/standard/standarditem/standarditem!toList.action?standardlevelcode="+pid;
				showItem(myUrl);
			}else{
				
				var myUrl=rootPath+"/standard/standarditem/standarditem!tolistN.action";
				showItem(myUrl);
			}
		
	}
	
	//获取选中的id，name
	var pptext = new Array();
	function getSelectRow(){
		var nodes = $('#standartree').tree('getSelected');
		if(nodes!=null){
			$("#standid").val(nodes.id);
			getParent(nodes);		
			pptext.reverse();
			var levelname = "";
			for(var i =0;i<pptext.length;i++){
			var strHtml="<span style='color:red;font-weight:bolder;'>"+">>"+"</span>";
				levelname +=pptext[i]+strHtml;  
			}
			$("#levelname").val(levelname +nodes.text);
		}
	}
	//递归获取父级的name
	function getParent(nodes){		
		var parent = $('#standartree').tree('getParent', nodes.target);	
		if(parent!=null){
			pptext.push(parent.text);
			getParent(parent);//递归调用
		}
	}
	//显示标准的相关项目
	function showItem(myUrl){
		$('#itemdatagrid').datagrid({
			height:655,
			nowrap: false,
			striped: true,
			collapsible:true,
			url:myUrl, 
			fit:true,
			fitColumns : true,
			scrollbarSize:0,
			remoteSort: false,
			idField:'deptid',
			singleSelect:false,
			pageSize:20,
			pageList:[20,30,40,50],
			columns:[[
					{field:'itemname',title:'项目名称',width:600,align:"center"},					
					{field:'unitname',title:'计量单位',width:200,align:"center"},
					{field:'lowervalue',title:'标准下限',width:200,align:"center"},
					{field:'uppervalue',title:'标准上限',width:200,align:"center"}
			]],
			pagination:true,
			rownumbers:true
		});		
	}
	
	//删除采样设置
	function removeSampling(psampleid){
		var rows = $('#samplelist').datagrid('getSelections');
		if(rows==null||rows==""){
			alert("请选择一项！");
			return;
		}
		if(confirm("关联的监测项目会同时删除，是否确认删除该采样信息？")){
			$.post( rootPath +"/monitorproject/monitorproject!delSampling.action",{psampleid:psampleid},function(add){
				if(add=='success'){
//					insertOtherFees();
//					newlyFees();
					alert('成功');
					$("#monitorinfolist").treegrid('reload');
					$("#samplelist").datagrid('reload');
					$("#itemlist").datagrid('reload');;
				}
				if(add=='fail'){
					alert('失败');
				}
			});
		}
	}
	//添加采样设置
	function opensampling(pmid){//,pointtype) {
		var pointtype = $("#pointtype").val();
//		alert(pmid+"___"+pointtype);
		if(pmid==""){
			alert('请选择监测点!');
			return false;
		}
		var url = rootPath + "/monitorproject/monitorproject!tosamplinginput.action?pmonitorid="+pmid+"&pointtype="+pointtype;
		var surl = rootPath + "/monitorproject/monitorproject!addSampleInfo.action";
		var _dialog = window.top
				.$('<div id="pointDialog"  style="padding:0px;"><iframe id="taskDetailFrame" width="100%" height="100%" frameborder="0" scrolling="no" src=' + url + '></iframe></div>')
				.appendTo(window.top.document.body);
		_dialog.dialog( {
			title:'添加采样设置',
			autoOpen : false,
			modal : true,
			closed : true,
			width : '400',
			height : '300',
			buttons : [ {
				text : '保存',
				iconCls : 'icon-save',
				handler : function() {
					$("#taskDetailFrame",top.document.body).contents().find("#sampleinfoFrame").form('submit',{
						url:surl,
						onSubmit:function(){
							var objs = $("#taskDetailFrame",top.document.body).contents().find(".grkj-validate");
							if(!saveCheck(objs)){
								$("#taskDetailFrame",top.document.body).contents().find(":input").focus();
								$("#taskDetailFrame",top.document.body).contents().find(":select").focus();
								alert("数据输入不符合格式，请查看红色边框的输入框的输入提示！");
								return false;
							}
						},
						success:function(data){						
							if(data=='success'){
								_dialog.dialog('close');
								alert('成功');
								$("#samplelist").datagrid('reload');
							}
							if(data=='fail'){
								alert('数据错误或者选择的是错误的监测点');
							}
						}
					});
				}
			}, {
				text : '取消',
				iconCls : 'icon-cancel',
				handler : function() {
					_dialog.dialog('close');
				}
			} ],
			onClose : function() {
				_dialog.dialog("destroy");
	
			}
		});
		_dialog.dialog('open');
	}
	
	//修改采样设置~test
	function moditfySampling(psampleid){//,pointtype){
		var pointtype = $("#pointtype").val();
//		alert(psampleid+"___"+pointtype);
		var rows = $('#samplelist').datagrid('getSelections');
		if(rows==null||rows==""){
			alert("请至少选择一项！");
			return;
		}
		var url = rootPath + "/monitorproject/monitorproject!toSedit.action?psampleid="+psampleid+"&pointtype="+pointtype;
		var surl = rootPath + "/monitorproject/monitorproject!editSampling.action";
		var _dialog = window.top
				.$('<div id="pointDialog"  style="padding:0px;"><iframe id="taskDetailFrame" width="100%" height="100%" frameborder="0" scrolling="no" src=' + url + '></iframe></div>')
				.appendTo(window.top.document.body);
		_dialog.dialog( {
			title:'修改采样设置',
			autoOpen : false,
			modal : true,
			closed : true,
			width : '400',
			height : '300',
			buttons : [ {
				text : '保存',
				iconCls : 'icon-save',
				handler : function() {
					$("#taskDetailFrame",top.document.body).contents().find("#sampleinfoFrame").form('submit',{
						url:surl,
						onSubmit:function(){
							var objs = $("#taskDetailFrame",top.document.body).contents().find(".grkj-validate");
							if(!saveCheck(objs)){
								$("#taskDetailFrame",top.document.body).contents().find(":input").focus();
								$("#taskDetailFrame",top.document.body).contents().find("select").focus();
								alert("数据输入不符合格式，请查看红色边框的输入框的输入提示！");
								return false;
							}
						},
						success:function(data){						
							if(data=='success'){
//								insertOtherFees();
//								newlyFees();
								_dialog.dialog('close');
								$("#samplelist").datagrid('reload');
								alert('成功');
							}
							if(data=='fail'){
								alert('失败');
							}
						}
					});
				}
			}, {
				text : '取消',
				iconCls : 'icon-cancel',
				handler : function() {
					_dialog.dialog('close');
				}
			} ],
			onClose : function() {
				_dialog.dialog("destroy");
	
			}
		});
		_dialog.dialog('open');
	}
	
	//添加样品项目
	function openiteminfo(pid) {
//		var parentpointtype=$("#parentpointtype").val();
		if(pid==""){
			alert('请选择采样信息!');
			return false;
		}
		var url = rootPath + "/monitorproject/monitorproject!toItemTree2.action?pmonitorid="+pmonitorid+"&parentpointtype="+encodeURI(encodeURI(parentpointtype));
		var _dialog = window.top
				.$('<div id="sample-dlg"  style="padding:0px;"><iframe id="sampleFrame" width="100%" height="100%" frameborder="0" scrolling="yes" src=' + url + '></iframe></div>')
				.appendTo(window.top.document.body);
		_dialog.dialog( {
			title : '项目管理',
			autoOpen : false,
			modal : true,
			closed : true,
			width : '500',
			height : '500',
			maximizable:true,
			buttons : [ {
				text : '保存',
				iconCls : 'icon-save',
				handler : function() {
						$("#sampleFrame",top.document.body).contents().find("#ids").click();
						var idsVal = $("#sampleFrame",top.document.body).contents().find("#ids").val();
						var oldStr = $("#sampleFrame",top.document.body).contents().find("#oldselect").val();
						$.post( rootPath +"/monitorproject/monitorproject!addItemInfo.action",{psampleid:pid,ids:idsVal,oldselect:oldStr},function(add){
							if(add=='success'){	
								_dialog.dialog('close');
								alert('成功');
								countFees();
								$("#itemlist").datagrid('reload');
							}
							if(add=='fail'){
								alert('失败');
							}
						});
				}
			}, {
				text : '取消',
				iconCls : 'icon-cancel',
				handler : function() {
					_dialog.dialog('close');
				}
			} ],
			onClose : function() {
				_dialog.dialog("destroy");
	
			}
		});
		_dialog.dialog('open');
	}
	
	//批量删除监测项目
	function delAll(){
		var selected=$("#itemlist").datagrid('getSelections');
		if(selected==null || selected.length< 1){			
			alert('请至少选择一条记录！');
			return;
		}
		else{
			if(window.confirm('是否删除？')){
				var cc=[];
				for ( var i = 0; i < selected.length; i++) {
					if(cc==""){
							cc+=selected[i]['sampleitemid'];
					}
					else{
						cc+=","+selected[i]['sampleitemid'];
						}
				}
				
				$.post(rootPath +"/monitorproject/monitorproject!deleteAll.action",{ids:cc},function(del){
					if(del=='success'){
//						insertOtherFees();
//						newlyFees();
						alert('成功');
						$('#itemlist').datagrid('clearSelections');
						$("#itemlist").datagrid('reload');
					}
					if(del=='fail'){
						alert('失败');
					}
				});
				
			 }
		}
	}
	
	
	//获取选中的值
	function getChecked(){
		var nodes = $('#itemtree').tree('getChecked');
		var s = '';
		for(var i=0; i<nodes.length; i++){
			if (s != '') s += ',';
			s += nodes[i].id+'_'+nodes[i].attributes.flag;
		}
		$("#ids").val(s);
	}
	
	
	
	
	//添加样品项目
	function additeminfo() {
//		var parentpointtype=$("#parentpointtype").val();
//		var url = rootPath + "/monitorproject/monitorproject!toSetItemTree.action?parentpointtype="+encodeURI(encodeURI(parentpointtype));
		var url = rootPath + "/monitorproject/monitorproject!toSetItemTree2.action?pids="+pids;
		
		var _dialog = window.top
				.$('<div id="sample-dlg"  style="padding:0px;"><iframe id="sampleFrame" width="100%" height="100%" frameborder="0" scrolling="yes" src=' + url + '></iframe></div>')
				.appendTo(window.top.document.body);
		_dialog.dialog( {
			title : '项目管理',
			autoOpen : false,
			modal : true,
			closed : true,
			width : '500',
			height : '500',
			maximizable:true,
			buttons : [ {
				text : '保存',
				iconCls : 'icon-save',
				handler : function() {
						var ids ="";
						//获取刚选择的
						$("#sampleFrame",top.document.body).contents().find("#ids").click();						
						var idsVal = $("#sampleFrame",top.document.body).contents().find("#ids").val();
//						alert(idsVal);
						//获取已经选择的
						getAllRows();
						var idsRows = $("#itemids").val();
						if(idsRows!=""&&idsVal!=""){
							ids = idsRows +","+idsVal;
						}
						if(idsRows!=""&&idsVal==""){
							ids = idsRows;
						}
						if(idsRows==""&&idsVal!=""){
							ids = idsVal;
						}
						_dialog.dialog('close');
						initBatchIteminfo(ids);
				}
			}, {
				text : '取消',
				iconCls : 'icon-cancel',
				handler : function() {
					_dialog.dialog('close');
				}
			} ],
			onClose : function() {
				_dialog.dialog("destroy");
	
			}
		});
		_dialog.dialog('open');
	}	
	
	//加载批量设置项目信息
	function initBatchIteminfo(ids){
		$('#batchitemlist').datagrid({
			nowrap: false,
			striped: true,
			collapsible:true,
			url:rootPath +'/monitorproject/monitorproject!batchItemfoList.action?ids='+ids, 
			fit:true,
			fitColumns : true,
			scrollbarSize:0,
			remoteSort: false,
			iconCls:"icon-edit",
			idField:"itemid",
			frozenColumns:[[
				{field:'itemid',checkbox:true,align:"center"}
					]],
			columns:[[
				{field:'itemname',title:'监测项目', width:80,align:"center"},
//				{field:'samplenum',title:'采样量', width:60,align:"center"},	
//				{field:'samplecontainer',title:'采样容器', width:80,align:"center"},
				{field:'itemmethod',title:'分析方法', width:180,align:"center"},
//				{field:'fixedadditive',title:'固定添加剂', width:60,align:"center"},
				{field:'unitname',title:'计量单位', width:40,align:"center"},
				{field:'isnowtest',title:'现场监测', width:50,align:"center",
					formatter:function(value,rec){
							var str ="";
							if(value=='Y'){
								str = "<input type='checkbox' checked='checked' disabled='disabled'/>";
							}
							if(value=='N'){
								str = "<input type='checkbox' disabled='disabled'/>";
							}
							return str;
						}
				}			
			]]//,
			//onLoadSuccess:function(data){
//				countFees();
			//}
		});
		$(window).resize(function() {
			$("#batchitemlist").datagrid('resize');
		});
	}
	
	//获取所有项目
	function getAllRows(){
		var rows = $("#batchitemlist").datagrid('getRows');
		var str = "";
		for(var i=0;i<rows.length;i++){
				if(str!="")
					str = str + ",";
				str = str + rows[i].itemtype+'_'+$('#itemmethod'+rows[i].itemid).val();
		}
		$("#itemids").val(str);
	}
	
	//删除行
	function deleteRow(){
		var rows = $("#batchitemlist").datagrid('getSelections');
		if(rows.length>0){
			var	rowindex=$('#batchitemlist').datagrid("getRowIndex",rows[0].itemid);
			$('#batchitemlist').datagrid("deleteRow",rowindex);
			deleteRow();
		}
	}