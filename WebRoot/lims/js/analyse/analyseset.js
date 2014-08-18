//wjy~~当前脚本是分析方法设置的脚本~里面有部门和组别的下拉框，级联

$(function(){
	var itemid=$("#itemid").val();
	var methodid=$("#methodid").val();
			$('#analysesetgrid').datagrid({
				//title:'用户信息列表',
				nowrap: false,
				striped: true,
				collapsible:true,
				url:rootPath +'/analyse/analyseset/analyseset!toList.action?itemid='+itemid+'&methodid='+methodid, 
				fit:true,
				fitColumns : true,
				scrollbarSize:0,
				remoteSort: false,
				singleSelect:true,
				rownumbers:true,
				columns:[[
						{field:'devicetypename',title:'设备类型',width:300,align:"center"},
						{field:'deptname',title:'分析部门',width:500,align:"center"},
						{field:'groupname',title:'分析组',width:150,align:"center"}
				]],
				onLoadSuccess:function(){
					//默认加载第一行的基本信息
					$('#analysesetgrid').datagrid('selectRow',0);
					var rowData = $('#analysesetgrid').datagrid('getSelected');
					if(rowData!=null){
						$("#totalNum").val(rowData.totalNum);
					}else{
						$("#totalNum").val(0);
					}
				},
				onRowContextMenu:function(e,row,rowData){//在右键点击的时候，是否显示灰色的问题
					var itemflag=$("#itemflag").val();
					//IE
					$('#addWin').attr({disabled:"disable"});
					$('#editWin').removeAttr("disabled");
					$('#del').removeAttr("disabled");
					$('#detail').removeAttr("disabled");
					//火狐
					$('#addWin').addClass("disable");
					$('#editWin').removeClass("disable");
					$('#del').removeClass("disable");
					$('#detail').removeClass("disable");			
					
					if(itemflag=='0'){//只有项目在项目管理模块可以出来修改等菜单
						$('#analysesetgrid').datagrid('selectRow',parseInt(row));
						$("#method-menu").menu("show", {left: e.pageX,top: e.pageY});
						$("#savedata").val(rowData['analysesetid']);
						e.preventDefault();
					}
				},
				onHeaderContextMenu:function(e,field){
					var itemflag=$("#itemflag").val();
					//IE
					$('#addWin').removeAttr("disabled");
					$('#editWin').attr({disabled:"disable"});
					$('#del').attr({disabled:"disable"});
					$('#detail').attr({disabled:"disable"});
					//火狐
					$('#addWin').removeClass("disable");
					$('#editWin').addClass("disable");
					$('#del').addClass("disable");
					$('#detail').addClass("disable");
					
					if(itemflag=='0'){
					$('#method-menu').menu('show', {left: e.pageX,top: e.pageY});
					e.preventDefault();
					}
				}
			
			});
			$(window).resize(function() {
				$("#analysesetgrid").datagrid('resize');
			});
			
	});	
//详情
function detail(id){
	if($("#detail").attr("disabled")=="disabled"){
		return false;
	}
	var did='';
	if(id=='id'){
		did=$("#savedata").val();
	}
		var url = rootPath +"/analyse/analyseset/analyseset!view.action?id="+did;
		var _dialog =  window.top.$('<div id ="role-dlg" style="padding:0px;"><iframe  width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
		_dialog.dialog({
			title:'分析方法设置详情',
			autoOpen:false,
			modal:true,
			closed:true,
			width:'350',
			height:'250'
		});
		_dialog.dialog('open');
	}

		//添加  修改
		function addWin(id,flag){
			if(id==''){
			if($("#addWin").attr("disabled")=="disabled"){
				return false;
			}
			}
//			var totalNum=$("#totalNum").val();
//			if(totalNum!=0&&flag=='add'){
//				alert("已经对该项目的当前方法添加了设备类型，如想更改，请右键修改设备类型！");
//			}else{
				var itemid=$("#itemid").val();
				var methodiddata=$("#methodid").val();
				var did='';
				if(id=='id'){
					did=$("#savedata").val();
					if($("#editWin").attr("disabled")=="disabled"){
						return false;
					}
				}
				var url = rootPath +"/analyse/analyseset/analyseset!input.action?itemid="+itemid+"&methodid="+methodiddata;
				if(did!=""){
					url = url + "&id="+did;
				}
				var _dialog =  window.top.$('	<div id ="role-dlg" style="padding:0px;"><iframe id="equipmentFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
				_dialog.dialog({
					title:'分析方法设置编辑',
					autoOpen:false,
					modal:true,
					closed:true,
					width:'350',
					height:'250',
					buttons:[{
						text:'保存',
						iconCls:'icon-save',
						handler:function(){
							$("#equipmentFrame",top.document.body).contents().find("#equipmentform").form('submit',{
								url:rootPath +'/analyse/analyseset/analyseset!save.action',
								onSubmit:function(){
								var objs = $("#equipmentFrame",top.document.body).contents().find(".grkj-validate");
									if(!saveCheck(objs)){
										$("#equipmentFrame",top.document.body).contents().find(":input").focus();
										$("#equipmentFrame",top.document.body).contents().find("#deptid").focus();
										$("#equipmentFrame",top.document.body).contents().find("#groupid").focus();
										alert("数据输入不符合格式，请查看红色边框的输入框的输入提示！");
										return false;
									}
								},
								success:function(data){
									if(data=='success'){
										_dialog.dialog('close');
										$("#analysesetgrid").datagrid('reload');
										alert('保存成功');
									}else if(data=='fail'){
										alert("保存失败");
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
				//}
			}
		//关闭
		function closeAddWin(){
			$('#addWin').window('close');
		}
	
		
		//单条删除
		function del(id){
			if($("#del").attr("disabled")=="disabled"){
				return false;
			}
			var did='';
			if(id=='id'){
				did=$("#savedata").val();
			}
				if(window.confirm('是否删除？')){
					$.post(rootPath +"/analyse/analyseset/analyseset!deleteOnlyOne.action",{id:did},function(del){
						if(del=='success'){
							$("#totalNum").val(0);
							$("#analysesetgrid").datagrid('reload');
							alert('成功');
						}
					});
				}
		}
		//显示选择仪器设备框
		function showdevice(){
			url=rootPath +"/analyse/device/analyseequipment!showdevice.action";
			var _dialog =  window.top.$('<div id ="role-dlg" style="padding:0px;"><iframe id="showdeviceFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
				_dialog.dialog({
					title:'选择仪器设备',
					autoOpen:false,
					modal:true,
					closed:true,
					width:'700',
					height:'500',
					buttons:[{
						text:'确定',
						iconCls:'icon-save',
						handler:function(){
						var obj=$("#showdeviceFrame",top.document.body).contents();
						var selectedevicename=obj.find("#selectedevicename").val();
						var selectedeviceid=obj.find("#selectedeviceid").val();
						var selectedevicenum=obj.find("#selectedevicenum").val();
						$("#devicename").val(selectedevicename);
						$("#deviceid").val(selectedeviceid);
						$("#devicenum").val(selectedevicenum);
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
		


		//加载部门的下拉列表
		function provinceData() {
			var deptidvalue=$("#deptidvalue").val();
			$.ajax( {
				type : 'GET',
				url : 'analyseset!getAllDepartJSON.action?timeStamp='+new Date().getTime(),//给该url一个时间戳~~这样就必须每次从服务器读取数据,
				async:false,//同步
				success : function(data) {
					var vData = eval("(" + data + ")");
					var lList = "<option value=''>---请选择---</option>";
					//遍历json数据  
					jQuery.each(vData.rowsData, function(i, n) {
						if(deptidvalue!=''&&n.deptid==deptidvalue){
							lList += "<option value=" + n.deptid + " selected>"+  n.deptname	+ "</option>";
						}else{
						lList += "<option value=" + n.deptid+ ">" +  n.deptname	+ "</option>";
						}
					});	
					//绑定数据到listLeft
					$('#deptid').append(lList);
				}
			});
		}
		//加载组别的下拉列表
		function cityData() {
			var str='';
			var groupidvalue=$("#groupidvalue").val();
			//查询时调用
			var deptid = $('#deptid').val();
			$.ajax( {
				type : 'post',
				url : 'analyseset!getAllGroupByDepartJSON.action?timeStamp='+new Date().getTime(),//给该url一个时间戳~~这样就必须每次从服务器读取数据,
				data : {'deptid' : deptid},
				async:false,//同步
				success : function(data) {
					var vData = eval("(" + data + ")");
					var lList = "<option value=''>---请选择---</option>";
					//遍历json数据  
					jQuery.each(vData.rowsData, function(i, n) {
						if(groupidvalue!=''&&n.groupid==groupidvalue){
							lList += "<option value=" + n.groupid + " selected>"+   n.groupname	+ "</option>";
						}else{
						lList += "<option value=" + n.groupid + ">" + n.groupname	+ "</option>";
						}
					});				
					//绑定数据到listLeft
					$('#groupid').append(lList);
				}
			});
		}	
		
