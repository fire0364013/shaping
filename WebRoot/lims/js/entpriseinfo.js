//朱国英2012.7.18
$(document).ready(function(){
	initDataGrid();
	/*
	 * 	加载下拉
	 * 	1.chooseId: 下拉的ID
	 *	2.ctable: 数据表
	 *	3.cno: 数据表id字段
	 *	4.cname: 数据表text字段
	 *	5.dbwhere: 查询条件，默认为1=1
	 * 
	 */
	});

function relaod(){//重新装载数据
	$('#datagrid').datagrid('reload');
}

function initDataGrid(){
			$('#datagrid').datagrid({
				width:800,
				height:400,
				nowrap: false,
				striped: true,
				collapsible:true,
				url:'entpriseinfo!entpriseinfoList.action',
				sortName: 'entid',
				sortOrder: 'desc',
				fit:true,
				fitColumns:true,
				scrollbarSize:0,
				idField:'entid',				
				columns:[[
					{field:'entid',checkbox:true,align : 'center'},
			        {field:'entname',title:'企业名称',width:300,align : 'center'},					
					{field:'region',title:'行政区',width:150,align : 'center'},
					{field:'pollutionsourcetype',title:'企业类型',width:150,align : 'center'},
					{field:'appinfoname',title:'App名称',width:160,align : 'center'},
					{field:'operate',title:'操作',width:150,align : 'center',
						formatter:function(value,rowData,rowIndex){
							return '<span style="color:red"><img src="'+rootPath+'/themes/default/images/xiangxiimage.png" alt="详细" onclick="viewEntpriseinfo('+rowData.entid+')"/>&nbsp; ' +
							'<img src="'+rootPath+'/themes/default/images/bianjiimage.png" alt="编辑" onclick="editEntpriseinfo('+rowData.entid+')"/> &nbsp;' +
							'<img src="'+rootPath+'/themes/default/images/deleteimage.png" alt="删除" onclick="deleteEntpriseinfo(\''+rowData.entid+ '\',\''+ rowIndex+'\')"/>&nbsp; ' ;
						}
					}					
				]],
				pagination:true,
				rownumbers:true,
				pageSize:20,
				pageList:[20,30,40,50]
				
			});
			$(window).resize(function(){
			$("#datagrid").datagrid('resize');
		})	;
}

//检索
function searchObj(){
	var entname = $('#entname').val();
	var region = $('#region').val();
	$('#datagrid').datagrid( {
		queryParams : {
			entname : entname,
			region : region
		},
		pageNumber:1
	});

}

//打开详细页面
function viewEntpriseinfo(id){
	$('#datagrid').datagrid('clearSelections');
	var url = rootPath + "/entpriseinfo/entpriseinfo!view.action";
	if(id!=""){
		url = url + "?id="+id;
	}
	var _dialog =  window.top.$('<div id ="entpriseinfo-dlg" style="padding:0px;"><iframe id="entpriseinfoFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
	_dialog.dialog({
	title:'企业信息详情',
	autoOpen:false,
	modal:true,
	closed:true,
	width:'950',
	height:'550',
	onClose:function(){
			_dialog.dialog("destroy");					
		}
	});
	_dialog.dialog('open');

}
//添加和修改
function editEntpriseinfo(id){
	$('#datagrid').datagrid('clearSelections');
	var url = rootPath + "/entpriseinfo/entpriseinfo!input.action";
	if(id!=""){
		url = url + "?id="+id;
	}
	var entname=$('#entname').val;
	
	var _dialog =  window.top.$('<div id ="entpriseinfo-dlg" style="padding:0px;"><iframe id="entpriseinfoFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
	_dialog.dialog({
	title:'企业信息编辑',
	autoOpen:false,
	modal:true,
	closed:true,
	width:'950',
	height:'550',
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
							$("#entpriseinfoFrame",top.document.body).contents().find("select").focus();
							alert("数据输入不符合格式，请查看红色边框的输入框的输入提示！");
							return false;
						}
//						//加载行业类型，如果显示的文本框的为空，则隐藏的文本框也为空
//						var tempVal = $("#entpriseinfoFrame",top.document.body).contents().find("#industrytypename").val();
//						if(tempVal==''){
//							$("#entpriseinfoFrame",top.document.body).contents().find("#industrytypecode").val('');
//						}
					},
					success : function(data) {
						if (data == 'fail') {
							alert("保存失败！");
							return;
						}
						if (data == 'success') {
							_dialog.dialog('close');
							$("#datagrid").datagrid('reload');
							alert('保存成功！');
						}
						if(data=='exist'){
							alert("该企业名字已经存在，请重新填写");
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

//批量删除
function deleteEntpriseinfos()
{
	var rows = $('#datagrid').datagrid('getSelections');
	if (rows!=null && rows!="") { 		
 		if(window.confirm('是否删除？'))
 		{
			var arr = new Array();
			for(var i=0;i<rows.length;i++){
				arr.push(rows[i].entid);			
			}
			var jsonStr={entid:arr};
			var jsonObj=$.toJSON(jsonStr);
			$.post(
				rootPath + "/entpriseinfo/entpriseinfo!deleteEntpriseInfo.action",
				{json:jsonObj},
				function(msg){
						if(msg=='success'){
							$('#datagrid').datagrid('clearSelections');
							alert("删除成功！");
							relaod();
						}
					}
			);
		}
	} else {
		// 清除所选的行
		//$('#dataTable').datagrid('clearSelections');
		alert('请至少选择一条记录！');
		return;
	}
 }

//单个删除
function deleteEntpriseinfo(id,row){
	$('#datagrid').datagrid('clearSelections');
	$('#datagrid').datagrid('selectRow',row);
 	if(window.confirm('是否删除？'))
 	{
 		var jsonStr={entid:"'"+id+"'"};
		var jsonObj=$.toJSON(jsonStr);
		$.post(
			rootPath + "/entpriseinfo/entpriseinfo!deleteEntpriseInfo.action",
			{json:jsonObj},
			function(msg){
				if(msg=="success"){
					$('#datagrid').datagrid('clearSelections');
					alert("删除成功！");
					relaod();
				}
			}
		);
	}
}
	


//加载省份的下拉列表
function provinceData() {
	$.ajax( {
		type : 'GET',
		url : 'entpriseinfo!getAllProvince.action?'+'timeStamp='+new Date().getTime(),//给该url一个时间戳~~这样就必须每次从服务器读取数据,
		async:false,//同步
		success : function(data) {
			var vData = eval("(" + data + ")");
			var lList = "";//<option value=''>---请选择---</option>";
			//修改时调用已选中的值
			var province = $("#entpriseinfoFrame",top.document.body).contents().find('#provinceVal').val();
			//遍历json数据  
			jQuery.each(vData.rowsData, function(i, n) {
				if(province!=''&&n.regioncode==province){
					lList += "<option value=" + n.regioncode + " selected>" + n.regionname	+ "</option>";
				}else{
					lList += "<option value=" + n.regioncode + ">" + n.regionname	+ "</option>";
				}
			});				
			//绑定数据到listLeft
			$("#entpriseinfoFrame",top.document.body).contents().find('#provincecode').append(lList);
		}
	});
}
//加载城市的下拉列表
function cityData() {
	//获取企业编码
	var entid = $("#entpriseinfoFrame",top.document.body).contents().find('#entid').val();
	
	var tempVal='';
	if(entid!=''){
		//修改时调用已选中的值
		var province1 = $("#entpriseinfoFrame",top.document.body).contents().find('#provinceVal').val();
		tempVal=province1;
	}else{
		//添加时调用
		var province2 = $("#entpriseinfoFrame",top.document.body).contents().find('#provincecode').val();
		tempVal=province2;
	}
	
	$.ajax( {
		type : 'GET',
		url : 'entpriseinfo!getCityOrRegion.action?'+'timeStamp='+new Date().getTime(),//给该url一个时间戳~~这样就必须每次从服务器读取数据,
		data : {'parentregioncode' : tempVal},
		async:false,//同步
		success : function(data) {
			var vData = eval("(" + data + ")");
			var lList = "";//"<option value=''>---请选择---</option>";
			var city = $("#entpriseinfoFrame",top.document.body).contents().find('#cityVal').val();
			//遍历json数据  
			jQuery.each(vData.rowsData, function(i, n) {
				if(city==n.regioncode){
					lList += "<option value=" + n.regioncode + " selected >" + n.regionname	+ "</option>";
				}else{
					lList += "<option value=" + n.regioncode + ">" + n.regionname	+ "</option>";
				}
			});				
			//绑定数据到listLeft
			$("#entpriseinfoFrame",top.document.body).contents().find('#citycode').append(lList);
		}
	});
}
//加载行政区的下拉列表
function regionData() {
	//获取企业编码
	var entid = $("#entpriseinfoFrame",top.document.body).contents().find('#entid').val();
	var tempVal='';
	if(entid!=''){
		//修改时调用已选中的值
		var city1 = $("#entpriseinfoFrame",top.document.body).contents().find('#cityVal').val();
		tempVal=city1;
	}else{
		//添加时调用
		var city2 = $("#entpriseinfoFrame",top.document.body).contents().find('#citycode').val();
		tempVal=city2;
	}
	$.ajax( {
		type : 'GET',
		url : 'entpriseinfo!getCityOrRegion.action?'+'timeStamp='+new Date().getTime(),//给该url一个时间戳~~这样就必须每次从服务器读取数据,
		data : {'parentregioncode' : tempVal},
		async:false,//同步
		success : function(data) {
			var lList = "";
			var region = $("#entpriseinfoFrame",top.document.body).contents().find('#regionVal').val();
			var vData = eval("(" + data + ")");
			//遍历json数据  
			jQuery.each(vData.rowsData, function(i, n) {
				if(region==n.regioncode){
					lList += "<option value=" + n.regioncode + "  selected  >" + n.regionname	+ "</option>";
				}else{
					lList += "<option value=" + n.regioncode + ">" + n.regionname	+ "</option>";
				}
			});				
			//绑定数据到listLeft
			$("#entpriseinfoFrame",top.document.body).contents().find('#regioncode').append(lList);
		}
	});
}
	
	
//加载行业类型
function loadIndustryData()
{	
	var url = rootPath + "/entpriseinfo/entpriseinfo!inputIndustry.action";
	var _dialog =  window.top.$('<div id ="entpriseinfo-dlg" style="padding:0px;"><iframe id="IndustryFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
	_dialog.dialog({
	title:'行业类型详情',
	autoOpen:false,
	modal:true,
	closed:true,
	width:'650',
	height:'400',
	buttons:[{
		text:'确定',
		iconCls:'icon-save',
		handler:function(){
			var parentIndustryVal = $("#IndustryFrame",top.document.body).contents().find('#parentIndustryVal').val();
			var sonIndustryVal = $("#IndustryFrame",top.document.body).contents().find('#sonIndustryVal').val();
			var grandsonIndustryVal = $("#IndustryFrame",top.document.body).contents().find('#grandsonIndustryVal').val();
			var tempVal="";
			var tempName="";
			if(grandsonIndustryVal!=''){  // alert(333);
				tempVal = grandsonIndustryVal;
				tempName = $("#IndustryFrame",top.document.body).contents().find('#grandsonIndustry option:selected').text();
//				alert(tempVal);
//				alert(tempName);
			}else{
				if(sonIndustryVal!=''){		//alert(222);	
					tempVal = sonIndustryVal;
					tempName = $("#IndustryFrame",top.document.body).contents().find('#sonIndustry option:selected').text();
//					alert(tempVal);
//					alert(tempName);
				}else{
					if(parentIndustryVal!=''){ //alert(111);
						tempVal = parentIndustryVal;
						tempName = $("#IndustryFrame",top.document.body).contents().find('#parentIndustry option:selected').text();
//						alert(tempVal);
//						alert(tempName);
					}
				}
			}
			$("#entpriseinfoFrame",top.document.body).contents().find("#industrytypecode").val('');
			$("#entpriseinfoFrame",top.document.body).contents().find("#industrytypename").val('');
			$("#entpriseinfoFrame",top.document.body).contents().find("#industrytypecode").val(tempVal);
			$("#entpriseinfoFrame",top.document.body).contents().find("#industrytypename").val(tempName);
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
	
//加载第一级行业类型的下拉列表
function parentIndustryData() {
	$.ajax( {
		type : 'GET',
		url : rootPath + '/entpriseinfo/entpriseinfo!getAllIndustry.action?timeStamp='+new Date().getTime(),//给该url一个时间戳~~这样就必须每次从服务器读取数据,
		success : function(data) {
			var vData = eval("(" + data + ")");
			var lList = "";
			//修改时调用已选中的值
			//遍历json数据  
			jQuery.each(vData.rowsData, function(i, n) {
					lList += "<option value=" + n.industrytypecode + ">" + n.industrytypename	+ "</option>";
			});				
			//绑定数据到listLeft
			$("#IndustryFrame",top.document.body).contents().find('#parentIndustry').append(lList);
		}
	});
}
//加载第二级行业类型的下拉列表
function sonIndustryData() {
	var parentVal = $("#IndustryFrame",top.document.body).contents().find('#parentIndustryVal').val();
	$.ajax( {
		type : 'GET',
		url : rootPath + '/entpriseinfo/entpriseinfo!getAllSubIndustry.action?timeStamp='+new Date().getTime(),//给该url一个时间戳~~这样就必须每次从服务器读取数据,
		data : {'parenttypecode' : parentVal},
		success : function(data) {
			var vData = eval("(" + data + ")");
			var lList = "";
			//修改时调用已选中的值
			//var province = $("#IndustryFrame",top.document.body).contents().find('#provinceVal').val();
			//遍历json数据  
			jQuery.each(vData.rowsData, function(i, n) {
					lList += "<option value=" + n.industrytypecode + ">" + n.industrytypename	+ "</option>";
			});				
			//绑定数据到listLeft
			$("#IndustryFrame",top.document.body).contents().find('#sonIndustry').append(lList);
		}
	});
}
//加载第三级行业类型的下拉列表
function grandsonIndustryData() {
	var parentVal = $("#IndustryFrame",top.document.body).contents().find('#sonIndustryVal').val();
	$.ajax( {
		type : 'GET',
		url : rootPath + '/entpriseinfo/entpriseinfo!getAllSubIndustry.action?timeStamp='+new Date().getTime(),//给该url一个时间戳~~这样就必须每次从服务器读取数据,
		data : {'parenttypecode' : parentVal},
		success : function(data) {
			var vData = eval("(" + data + ")");
			var lList = "";
			//修改时调用已选中的值
			//遍历json数据  
			jQuery.each(vData.rowsData, function(i, n) {
					lList += "<option value=" + n.industrytypecode + ">" + n.industrytypename	+ "</option>";
			});				
			//绑定数据到listLeft
			$("#IndustryFrame",top.document.body).contents().find('#grandsonIndustry').append(lList);
		}
	});
}


