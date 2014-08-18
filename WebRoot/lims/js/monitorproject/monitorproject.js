	
var idfild=[];//选中的监测点id
var indexrow;
var indexvalue;
	function initMonitorinfo(){		
		$('#monitorinfolist').treegrid({
				nowrap: false,
				striped: true,
				fit:true,
				fitColumns : true,
				animate:false,
				collapsible:true,
				singleSelect:false,
				scrollbarSize:0,
				url:rootPath +'/monitorproject/monitorproject!toMonitorinfoList.action?projectid='+projectid+'&entid='+entid,
				idField:'projectid',
				treeField:'attributetype',
				frozenColumns:[[
					{field:'number',width:20},
					{field:'projectid',width:40,checkbox:true,align:"center"}
				]],
				columns:[[
	                {field:'attributetype',title:'监测点编码',width:140},
	                {field:'object',title:'监测对象', width:120,align:"center"},	
            		{field:'pointname',title:'监测点名称 ', width:170,align:"center"},		
					{field:'departid',title:'采样科室<img src="'+rootPath+'/themes/icons/mini_edit.png"/>', width:60,align:"center",
						formatter:function(value,rec){
								for(var i=0; i<departjson.length; i++){
								if (departjson[i].departid == value) 
									return departjson[i].departname;
								}
								return value;
						}
					},
					{field:'itemcount',title:'监测项目数', width:40,align:"center"}
				]],
				onClickRow:function(node){
					if(node.projectid.indexOf("node")>=0){
						$('#monitorinfolist').treegrid('clearSelections');
						$("#monitorinfolist").treegrid('select',node.projectid);
					}else{
						$('#monitorinfolist').treegrid('clearSelections');
						$("#monitorinfolist").treegrid('select',node.projectid);
					}
					$("#parentpointtype").val(node.parentpointtype);				
					//点击一行 加载采样设置信息
					pmonitorid = node.projectid;
					initSampleinfo(node.projectid,node.pointtype);
				},onLoadSuccess:function(data){
					var header = $("#monitorinfolist").parent(".datagrid-view").find("div.datagrid-header");
					var fields = header.find("td:has(div.datagrid-cell)");
					$(fields).unbind('click');//先取消绑定
					
					for(var i=0;i<fields.length;i++){
						if($(fields[i]).attr('field') =='departid'){
							$(fields[i]).bind('click',function(e){
								moditfyMonitor();
//								$('#set-menu').menu('show', {
//									left: e.pageX,
//									top: e.pageY
//								});
//								e.preventDefault();
							});
						}
					}
					for(var i=0;i<idfild.length;i++){
						$('#monitorinfolist').treegrid('select',idfild[i]);
						var nodes = $('#monitorinfolist').treegrid('getParent',idfild[i]);
						if(nodes!=null){
							$('#monitorinfolist').treegrid('expand',nodes.projectid);
						}
					}
					initSampleinfo('','');
				},onSelect:function(rowData){
					var flag=0;
					if(idfild.length>0){
						for(var i=0;i<idfild.length;i++){
							if(idfild[i]==rowData.projectid){
								flag=1;
								break;
							}
						}
						if(flag==0){
							idfild.push(rowData.projectid);
						}
					}else{
						idfild.push(rowData.projectid);
					}
					if(rowData.projectid.indexOf("node")>=0){
						var nodes = $('#monitorinfolist').treegrid('getChildren', rowData.projectid);
						for ( var i = 0; i < nodes.length; i++) {
							$('#monitorinfolist').treegrid('select', nodes[i].projectid);
						}
					}
					//initSampleinfo(rowData.projectid,rowData.pointtype);
				},onUnselect:function(rowData){
					
					if(idfild.length>0){
						for(var i=0;i<idfild.length;i++){
							if(idfild[i]==rowData.projectid){
								idfild.splice(i,1);
							}
						}
					}
					if(rowData.projectid.indexOf("node")>=0){
						var nodes = $('#monitorinfolist').treegrid('getChildren', rowData.projectid);
						for ( var i = 0; i < nodes.length; i++) {
							$('#monitorinfolist').treegrid('unselect', nodes[i].projectid);
						}
					}
				},onSelectAll:function(rows){
					idfild=[];
					var getSelections=$('#monitorinfolist').treegrid('getSelections');
						for(var i=0;i<getSelections.length;i++){
							idfild.push(getSelections[i].projectid);
						}
						
				},onUnselectAll:function(){
					idfild=[];
				}/*,onHeaderContextMenu:function(e,field){
					if(field=='departid'){//采样科室
						$('#set-menu').menu('show', {left: e.pageX,top: e.pageY});
						e.preventDefault();
					}
				}*/

		});
		$(window).resize(function() {
			$("#monitorinfolist").treegrid('resize');
		});
	}
	//加载采样设置信息
	function initSampleinfo(pmonitorid,ppointtype){	
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
			rownumbers:true,
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
//						{field:'samplingcount',title:'每次采样数量', width:50,align:"center"},
						{field:'stand',title:'评价标准', width:200,align:"center"}												
				]],
			onClickRow:function(rowIndex, rowData){			
				pointtype=ppointtype;
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
				pointtype = ppointtype;
			},
			onHeaderContextMenu:function(e,field){			
				e.preventDefault();
				pointtype=ppointtype;
			},onLoadSuccess:function(data){
				$('#samplelist').datagrid('clearSelections');
				//默认加载第一行的基本信息
				var row = $('#samplelist').datagrid('selectRow',0);
				var rowData = $('#samplelist').datagrid('getSelected');
				checkRadio();
				pointtype = ppointtype;
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
			rownumbers:true,
			frozenColumns:[[
				{field:'sampleitemid',checkbox:true,align:"center"}
					]],
			columns:[[
				{field:'itemname',title:'监测项目', width:60,align:"center"},
				{field:'itemmethod',title:'分析方法<img src="'+rootPath+'/themes/icons/mini_edit.png"/>', width:120,align:"center",
					formatter:function(value,rec,rowIndex){
						var str = "<div id=\"methodDiv"+rowIndex+"\">" +
								value +
								"</div>";
						return str;
					}
				},
//				{field:'fixedadditive',title:'固定添加剂', width:80,align:"center"},
				{field:'unitname',title:'计量单位', width:40,align:"center"},
				{field:'standvalue',title:'标准值', width:40,align:"center"},
				{field:'isnowtest',title:'现场监测', width:30,align:"center",
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
				},
				{field:'feename',title:'采样费 <img src="'+rootPath+'/themes/icons/mini_edit.png"/>', width:60,align:"center",
					formatter:function(value,rec,rowIndex){
						var str = "<div id=\"feeDiv"+rowIndex+"\">" +
								value +
								"</div>";
						return str;
					}}
			]],
			onLoadSuccess:function(data){
				countFees();
			},onDblClickCell:function(rowIndex, field, value){
				$('#itemlist').datagrid('clearSelections');
				$('#itemlist').datagrid('selectRow',rowIndex);
				
				var row = $('#itemlist').datagrid('getSelected');				
				if(field =="itemmethod" && row.itemid!=""){	
					$("#selectDiv").remove();//单击之前，先将其他的下拉框至为空
					$("#methodDiv"+rowIndex).html("");//删除单元格中的内容，下面将会用下拉框填充
					var row = $('#itemlist').datagrid('getSelected');				
					var str = "<div name=\"selectDiv\" id=\"selectDiv\">" +
								"</div>";
					$("#methodDiv"+rowIndex).html(str);
					methodData(row.itemid,rowIndex,row.sampleitemid,row.methodid,value);
					indexrow = rowIndex;
					indexvalue = value;
				}else if(field =="feename" && row.itemid!=""){
					$("#selectDiv").remove();//单击之前，先将其他的下拉框至为空
					$("#feeDiv"+rowIndex).html("");//删除单元格中的内容，下面将会用下拉框填充
					var row = $('#itemlist').datagrid('getSelected');				
					var str = "<div name=\"selectDiv\" id=\"selectDiv\">" +
								"</div>";
					$("#feeDiv"+rowIndex).html(str);
					samplingFeeData(row.itemid,rowIndex,row.sampleitemid,row.methodid,value);
					indexrow = rowIndex;
					indexvalue = value;
				}
			}
		});
		$(window).resize(function() {
			$("#itemlist").datagrid('resize');
		});
	}
	
	function samplingFeeData(itemid,index,sampleitemid,methodid,feename) {
		$.ajax( {
			type : 'GET',
			url : rootPath +'/monitorproject/monitorproject!getSamplingFee.action?itemid='+itemid+'&methodid='+methodid+'&timeStamp='+new Date().getTime(),//给该url一个时间戳~~这样就必须每次从服务器读取数据,
			async:false,//同步
			success : function(data) {
				var vData = eval("(" + data + ")");
				if(vData==null||vData==""){
					alert("项目没有采样费！");
					$.ajax( {
						type : 'GET',
						url : 'monitorproject!updateSamplingFee.action?psampleitemid='+sampleitemid+'&feevalue=&feename=&timeStamp='+new Date().getTime(),//给该url一个时间戳~~这样就必须每次从服务器读取数据,
						async:false,//同步
						success : function(data) {
							if(data=="fail"){
								alert("修改失败！");
							}
						}
					});
					return false;
				}
				var lList = "<select id=\"feeSel"+index+"\" style=\"width:100%\">";
					lList += "<option value=''>---请选择---</option>";
				//遍历json数据  
				jQuery.each(vData, function(i, n) {
					if(n.feename == feename){
						lList += "<option value=" + n.feevalue + " selected>" + n.feename	+ "</option>";
					}else{
						lList += "<option value=" + n.feevalue + ">" + n.feename	+ "</option>";
					}
				});			
				lList += "</select>";
				//绑定数据到listLeft
				$("#feeDiv"+index).append(lList);
				//绑定改变事件
				$("#feeDiv"+index).change(function(){
					var feevalue = $("#feeSel"+index).val();
					var feename = '';
					if(feevalue!=''){
						feename = $("#feeSel"+index+" option:selected").text();
					}
					$.ajax( {
						type : 'GET',
						url : rootPath +'/monitorproject/monitorproject!updateSamplingFee.action?psampleitemid='+sampleitemid+'&feevalue='+feevalue+'&feename='+encodeURI(encodeURI(feename))+'&timeStamp='+new Date().getTime(),//给该url一个时间戳~~这样就必须每次从服务器读取数据,
						async:false,//同步
						success : function(data) {
							if(data=="success"){
//								alert("修改成功！");
								$("#itemlist").datagrid('reload');
							}else if(data=="fail"){
								alert("请选择方法！");
							}else{
								alert("修改失败！");
							}
						}
					});
				});
				$("#feeSel"+index).blur(function(){
					$("#selectDiv").remove();
					$("#feeDiv"+index).html(feename);
				});
			}
		});
	}
	
	//获取方法
	function methodData(itemid,index,sampleitemid,methodid,cellvalue) {
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
//								alert("修改成功！");
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
				
				$("#methodSel"+index).blur(function(){
					$("#selectDiv").remove();
					$("#methodDiv"+index).html(cellvalue);
				});
			}
		});
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
				},
				{field:'samplingfee',title:'采样费', width:100,align:"center"}
			]],
			onLoadSuccess:function(data){
				
//				countFees();
			},onClickRow:function(rowIndex, rowData){
				$("#itemmethod"+rowData.itemid).unbind('change');
				$("#itemmethod"+rowData.itemid).bind('change',function(){
					var methodid = $("#itemmethod"+rowData.itemid).val();
					$.ajax( {
						type : 'GET',
						url : rootPath +'/monitorproject/monitorproject!getSamplingFee.action?itemid='+rowData.itemid+'&methodid='+methodid+'&timeStamp='+new Date().getTime(),//给该url一个时间戳~~这样就必须每次从服务器读取数据,
						async:false,
						success : function(data) {
							var vData = eval("(" + data + ")");
							var lList = "";
							jQuery.each(vData, function(i, n) {
								lList += "<option value=" + n.feevalue + ">" + n.feename	+ "</option>";
							});			
							$("#fee"+rowData.itemid).html(lList);
						}
					});
				});
			}
		});
		$(window).resize(function() {
			$("#batchitemlist").datagrid('resize');
		});
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
		$('#tree').tree({
		checkbox: true,
		//animate: true,
		url: rootPath+'/monitorproject/monitorproject!getItemTree.action?itemtypeid=0&pmonitorid='+pmonitorid+"&parentpointtype="+encodeURI(encodeURI(parentpointtype)),
		onBeforeExpand:function(node,param){
			$('#tree').tree('options').url = 
				rootPath+'/monitorproject/monitorproject!getItemTree.action?itemtypeid='+node.id+'&pmonitorid='+pmonitorid+"&parentpointtype="+encodeURI(encodeURI(parentpointtype));
		},
		onContextMenu: function(e, node){
			e.preventDefault();
			$('#tree').tree('select', node.target);
			var flag = false;
			var roots = $('#tree').tree('getRoots');
			for(var i=0;i<roots.length;i++){
				if(roots[i].id==node.id){
					flag = true;
					break;
				}
			}
			if(str != ''){
				$('#paste').removeAttr("disabled");
				$('#paste').removeClass("disable");
			}else{
				$('#paste').attr({disabled:"true"});
				$('#paste').addClass("disable");
			}
			if(node.attributes.flag=="type"){
				$('#update').attr({disabled:"true"});
				$('#addtype').removeAttr("disabled");
				$('#addpro').removeAttr("disabled");
				
				$('#update').addClass("disable");
				$('#addtype').removeClass("disable");
				$('#addpro').removeClass("disable");
				//根节点不能重命名
				if(flag){
					$('#rename').attr({disabled:"true"});
					$('#rename').addClass("disable");
				}else{
					$('#rename').removeAttr("disabled");
					$('#rename').removeClass("disable");
				}
				
			}else{
				$('#addtype').attr({disabled:"true"});
				$('#addpro').attr({disabled:"true"});
				$('#rename').attr({disabled:"true"});
				$('#update').removeAttr("disabled");
				
				$('#addtype').addClass("disable");
				$('#addpro').addClass("disable");
				$('#rename').addClass("disable");
				$('#update').removeClass("disable");
			}

			$('#mm').menu('show', {
				left: e.pageX,
				top: e.pageY
			});
		},
		
		//重命名后的处理
		onAfterEdit:onAfterEdit
	});
}
	//获取选中的值
	function getChecked(){
		var nodes = $('#tree').tree('getChecked');
		var s = '';
		for(var i=0; i<nodes.length; i++){
			if (s != '') s += ',';
			s += nodes[i].id+'_'+nodes[i].attributes.flag;
		}
		$("#ids").val(s);
	}

	 //添加监测点信息
	function openmonitor(pid) {
		var url = rootPath + "/monitorproject/monitorproject!toTree.action?projectid="+pid;
//		if (eid != "") {
//			url = url + "?projectid="+pid;
//		}
		var _dialog = window.top
				.$('<div id="pointDialog"  style="padding:0px;overflow:hidden;"><iframe id="taskDetailFrame" width="100%" height="100%" frameborder="0" scrolling="no" src=' + url + '></iframe></div>')
				.appendTo(window.top.document.body);
		_dialog.dialog( {
			title : '监测点选择',
			autoOpen : false,
			modal : true,
			closed : true,
			width : '900',
			height : '630',
			buttons : [ {
				text : '保存',
				iconCls : 'icon-save',
				handler : function() {	
					$("#taskDetailFrame",top.document.body).contents().find("#ids").click();
					var idsVal = $("#taskDetailFrame",top.document.body).contents().find("#ids").val();
					var oldStr = $("#taskDetailFrame",top.document.body).contents().find("#oldselect").val();
					if(idsVal==""&&oldStr==""){
						alert('请选择监测点！');
						return;
					}
					$.post( rootPath +"/monitorproject/monitorproject!addMonitorInfo.action",{ids:idsVal,oldselect:oldStr},function(add){
						if(add=='success'){								
							_dialog.dialog('close');
							alert('成功');
							$("#monitorinfolist").treegrid('reload');
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

	 //添加监测点信息
	function openmonitor2(pid) {
		var url = rootPath + "/monitorproject/monitorproject!toTree2.action?projectid="+pid;
//		if (eid != "") {
//			url = url + "?projectid="+pid;
//		}
		var _dialog = window.top
				.$('<div id="pointDialog"  style="padding:0px;"><iframe id="taskDetailFrame" width="100%" height="100%" frameborder="0" scrolling="no" src=' + url + '></iframe></div>')
				.appendTo(window.top.document.body);
		_dialog.dialog( {
			title : '监测点选择',
			autoOpen : false,
			modal : true,
			closed : true,
			width : '1000',
			height : '600',
			buttons : [ {
				text : '确定',
				iconCls : 'icon-save',
				handler : function() {	
					_dialog.dialog('close');
					$("#monitorinfolist").treegrid('reload');
					/*$("#taskDetailFrame",top.document.body).contents().find("#ids").click();
					var idsVal = $("#taskDetailFrame",top.document.body).contents().find("#ids").val();
					var oldStr = $("#taskDetailFrame",top.document.body).contents().find("#oldselect").val();
					if(idsVal==""&&oldStr==""){
						alert('请选择监测点！');
						return;
					}
					$.post( rootPath +"/monitorproject/monitorproject!addMonitorInfo.action",{ids:idsVal,oldselect:oldStr},function(add){
						if(add=='success'){								
							_dialog.dialog('close');
							alert('成功');
							$("#monitorinfolist").treegrid('reload');
						}
						if(add=='fail'){
							alert('失败');
						}
					});*/
				}
			}/*,{
				text : '取消',
				iconCls : 'icon-cancel',
				handler : function() {
					_dialog.dialog('close');
				}
			}*/],
			onClose : function(){
				_dialog.dialog("destroy");	
				$("#monitorinfolist").treegrid('reload');
			}
		});
		_dialog.dialog('open');
	}

	//选择标准
	function oneStand(pppointtype){
		var url = rootPath +"/monitorproject/monitorproject!tostandardtree.action?pointtype="+pppointtype;
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

	//添加采样设置
	function opensampling(pmid,pointtype) {
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
								$("#taskDetailFrame",top.document.body).contents().find("select").focus();
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

	//添加样品项目
	function openiteminfo(pid) {
		var parentpointtype=$("#parentpointtype").val();
		if(pid==""){
			alert('请选择采样信息!');
			return false;
		}
		var url = rootPath + "/monitorproject/monitorproject!toItemTree.action?pmonitorid="+pmonitorid+"&parentpointtype="+encodeURI(encodeURI(parentpointtype));
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
				text : '确定',
				iconCls : 'icon-save',
				handler : function() {
						$("#sampleFrame",top.document.body).contents().find("#ids").click();
						var idsVal = $("#sampleFrame",top.document.body).contents().find("#ids").val();
//						alert(idsVal);
						var oldStr = $("#sampleFrame",top.document.body).contents().find("#oldselect").val();
						$.post( rootPath +"/monitorproject/monitorproject!addItemInfo.action",{psampleid:pid,ids:idsVal,oldselect:oldStr},function(add){
							if(add=='success'){	
//								insertOtherFees();
//								newlyFees();
								_dialog.dialog('close');
								alert('成功');
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
	//修改监测点信息
	function moditfyMonitor(){
		var nodes = $('#monitorinfolist').treegrid('getSelections');	
		var pids = "";
		if(nodes.length<=0){
			alert("请至少选择一项！");
			return;
		}else{
			//pids = node.projectid;
			//var nodes = $('#monitorinfolist').treegrid('getChildren', node.projectid);
			for ( var i = 0; i < nodes.length; i++) {
				if(pids != ""){
					pids = pids + ",";
				}
				pids = pids + nodes[i].projectid;
			}
		}
		
		var url = rootPath + "/monitorproject/monitorproject!toMedit.action";
		var _dialog = window.top
				.$('<div id="monitorDialog"  style="padding:0px;"><iframe id="monitorFrame" width="100%" height="100%" frameborder="0" scrolling="no" src=' + url + '></iframe></div>')
				.appendTo(window.top.document.body);
		_dialog.dialog( {
			title:'科室选择',
			autoOpen : false,
			modal : true,
			closed : true,
			width : '300',
			height : '130',
			buttons : [ {
				text : '保存',
				iconCls : 'icon-save',
				handler : function() {				
					var objs = $("#monitorFrame",top.document.body).contents().find(".grkj-validate");
					if(!saveCheck(objs)){
						$("#monitorFrame",top.document.body).contents().find(":input").focus();
						$("#monitorFrame",top.document.body).contents().find("select").focus();
						alert("数据输入不符合格式，请查看红色边框的输入框的输入提示！");
						return false;
					}				
					var deptid = $("#monitorFrame",top.document.body).contents().find("#deptid").val();					

					$.post(rootPath + "/monitorproject/monitorproject!monitorEdit.action",{pids:pids,deptid:deptid},function(edit){
						if(edit=='success'){
							_dialog.dialog('close');
							alert('成功');
							$("#monitorinfolist").treegrid('reload');
						}
						if(edit=='fail'){
							alert('失败');
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

	//删除监测点
	function removeMonitor(){
		var node = $('#monitorinfolist').treegrid('getSelections');	
		var pids = "";
		if(node.length<=0){
			alert("请至少选择一项！");
			return;
		}else{
			//alert(node.length);
			//pids = node.projectid;
			//var nodes = $('#monitorinfolist').treegrid('getChildren', node.projectid);
			for ( var i = 0; i < node.length; i++) {
				if(node[i].pointid!="pointid"){
					if(pids != ""){
						pids = pids + ",";
					}
					pids = pids + node[i].projectid;
				}
			}
		}
		if(confirm("关联的采样信息和监测项目会同时删除，是否确认删除该记录？")){
			$.post( rootPath +"/monitorproject/monitorproject!delMonitor.action",{pids:pids},function(del){
				if(del=='success'){	
//					insertOtherFees();
//					newlyFees();
					//alert('成功');
					//删除成功后清空数据
					idfild = [];
					$("#monitorinfolist").treegrid('reload');
					$("#samplelist").datagrid('reload');
					$("#itemlist").datagrid('reload');

				}
				if(del=='fail'){
					alert('失败');
				}
			});
		}
	}

		//修改采样设置~test
	function moditfySampling(psampleid,ppointtype){
		var rows = $('#samplelist').datagrid('getSelections');
		if(rows==null||rows==""){
			alert("请至少选择一项！");
			return;
		}
		var url = rootPath + "/monitorproject/monitorproject!toSedit.action?psampleid="+psampleid+"&pointtype="+ppointtype;
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
					//alert('成功');
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

	//批量删除	
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
						//alert('成功');
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
	//初始化标准树
	function initStandardtree(pointtype){
		$('#standartree').tree({			
			url: rootPath+"/monitorproject/monitorproject!InitStandardTree.action?levelcode=0&pointtype="+pointtype,
			onBeforeExpand:function(node,param){
				$('#standartree').tree('options').url = rootPath+"/monitorproject/monitorproject!InitStandardTree.action?levelcode="+node.attributes.levelcode+"&pointtype="+pointtype;
			},
			onClick:clickrow
		});
	}
	function clickrow(node){
		var leveid=node.id;
		var pid=encodeURI(leveid);
			if(node.attributes.islastlevel=='Y'){
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
	
	//批量设置监测点的采样信息和监测项目信息
	function batchSetInfo(){
//		if(psampleid!=null&&psampleid!=""){
//			alert("已存在相关采样、监测项目信息，不能批量设置！");
//			return;
//		}

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
//					if(nodes[i].pmsize>0){
//						alert("已存在相关采样、监测项目信息，不能批量设置！");
//						return;
//					}
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
		//alert(parentpointtype+"___"+pids+"___"+pointtype);
		$("#parentpointtype").val(parentpointtype);
		var url = rootPath + "/monitorproject/monitorproject!toSetInfo.action?pids="+pids+"&pointtype="+pointtype+"&parentpointtype="+encodeURI(encodeURI(parentpointtype));
		var _dialog = window.top
				.$('<div id="monitorDialog"  style="padding:0px;"><iframe id="monitorFrame" width="100%" height="100%" frameborder="0" scrolling="no" src=' + url + '></iframe></div>')
				.appendTo(window.top.document.body);
		_dialog.dialog( {
			title:'批量设置采样、项目',
			autoOpen : false,
			modal : true,
			closed : true,
			width : '700',
			height : '512',
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
	
	//添加样品项目
	function additeminfo() {
		var parentpointtype=$("#parentpointtype").val();
//		alert(parentpointtype);
		var url = rootPath + "/monitorproject/monitorproject!toSetItemTree.action?parentpointtype="+encodeURI(encodeURI(parentpointtype));
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
				text : '确定',
				iconCls : 'icon-save',
				handler : function() {
						var ids ="";
						//获取刚选择的
						$("#sampleFrame",top.document.body).contents().find("#ids").click();						
						var idsVal = $("#sampleFrame",top.document.body).contents().find("#ids").val();
						//alert(idsVal);
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
	
	//获取所有项目
	function getAllRows(){
		var rows = $("#batchitemlist").datagrid('getRows');
		var str = "";
		for(var i=0;i<rows.length;i++){
			var feename = $('#fee'+rows[i].itemid+" option:selected").text();
			var feevalue = 	$('#fee'+rows[i].itemid).val();
				if(str!="")
					str = str + ",";
				str = str + rows[i].itemtype+'_'+$('#itemmethod'+rows[i].itemid).val()+"_"+encodeURI(feename)+"_"+feevalue;
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
	//向其他费用表中插入数据
	function insertOtherFees(){
		//alert(monitorTotalCharge);
		var monitorTotalCharge;
		if($("#feiyongFrame",parent.document.body).contents().find("#cyf").val()!=undefined){
			var sampleFeesTotal=$("#feiyongFrame",parent.document.body).contents().find("#cyf").val();
			var analysesFeesTotal=$("#feiyongFrame",parent.document.body).contents().find("#fxf").val();
			monitorTotalCharge=sampleFeesTotal+analysesFeesTotal;
		}
		$.post(
			rootPath + "/monitorproject/monitorfees!initOtherChargetBefore.action",
			{"id":projectid,"json":monitorTotalCharge},
			function(msg){
				if(msg=='success'){
				}
			}
		);
	}

	