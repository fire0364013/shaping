//-----Au-----wjy~~
	var flagStatusCxz="";
		var	flagSta="${flagStatus}";//判断过期 
		if(flagSta!=""&&flagSta!=null){
			flagStatusCxz=flagSta;
		}
$(document).ready(function() {
	
	initDataGrid();
	//上岗证维护表里面不需要提供增加和删除的办法~只需要提供查看和修改以及查询的功能
	//只需要在用户进行添加的时候，自动在上岗证表里面增加一条记录~~而后在人员表进行维护
	//在用户进行删除的时候，把上岗证表 的数据也进行级联删除
});
// 页面加载，数据的展示~~datagrid~~
function initDataGrid() {
	$('#certgrid').datagrid(
					{
						nowrap : false,
						striped : true,
						collapsible : true,
						url : 'certificateinfo!certiList.action?flagStatus='+flagStatusCxz,
						onLoadSuccess:function(data){
						if(data.rows.length>0){
							setTimeout("mergeCellsByField(\"certgrid\",\"realname,departname,stationno\")",10)
						}
						},
						remoteSort : false,
					//	sortName : 'flagPass',
					//	sortOrder : 'asc',
						fit : true,
						fitColumns : true,
						scrollbarSize : 0,
						pageSize : 20,
						idField:'id',
						pageList : [ 20, 30, 40, 50 ],
						frozenColumns : [ [ {
							field : 'id',
							checkbox : true,align:'center'
						} ] ],
						columns : [ [
								{
									field : 'realname',
									title : '姓名',
									width : 40,
									align : 'center'
								},
								{
									field : 'departname',
									title : '部门',
									width : 40,
									align : 'center'
								},

								{
									field : 'stationno',
									title : '上岗证编号',

									width : 40,
									align : "center"
								},
								{
									field : 'itemname',
									title : '项目名称',

									width : 250,
									align : "left"
								}
								,{
									field : 'theorycheckdate',
									title : '理论考核日期',

									width : 50,
									align : "center"
								},{
									field : 'skillcheckdate',
									title : '技能考核日期',
									width : 50,
									align : "center"
								},{
									field : 'realcheckdate',
									title : '实样考核日期',

									width : 50,
									align : "center"
								},{
									field : 'licensingdate',
									title : '领证日期',

									width : 50,
									align : "center"
								},
								{
									field : 'option',
									title : '操作',
									width : 60,
									align : 'center',
									formatter : function(value, rec,rowIndex) {
										var links = '<img src="'
												+ rootPath
												+ '/themes/default/images/xiangxiimage.png" id="btnshow" onclick="detail(\''
												+ rec.id
												+ '\')" alt="查看"/>&nbsp;&nbsp;';
										links += '<img src="'
												+ rootPath
												+ '/themes/default/images/bianjiimage.png" id="btnshow" onclick="edit(\''
												+ rec.id
												+ '\')" alt="编辑"/>&nbsp;&nbsp;';
									
										links += '<img src="'+ rootPath
												+ '/themes/default/images/deleteimage.png" id="btnshow" onclick="del(\''
												+ rec.id + '\',\''+ rec.userid+ '\',\''+ rec.itemid+ '\',\''+ rec.methodid+ '\',\''+ rowIndex
												+ '\')"  alt="删除"/>&nbsp;&nbsp;';
										return links;
									}
								} ] ],
						pagination : true,
						rownumbers : true,
						rowStyler:function(rowIndex,rowData){
							//此处是用理论 实样，技能三个日期判断是否过期
								//var flag = notice(rowData.skillcheckdate,rowData.realcheckdate,rowData.theorycheckdate);
							//此处是用领证日期判断
							var flag = noticehava(rowData.licensingdate);
								if(flag=='过期')										
									return 'color:red';
									
							}
							
					});		
	$(window).resize(function() {
		$("#certgrid").datagrid('resize');
	});
}

//此处是用领证日期判断

function noticehava(date){
//当前日期
	var now = new Date();
	//var nowDate = new Date((now.getMonth()+1)+"-"+now.getDate()+"-"+now.getFullYear());
//证书获取时间
	var num="";
	date=date+"-00"
	if(date!=""){
		//先截取获得证书的时间，然后加五年，与当前时间相比，当前时间比他五年后的时间大的话就没有过期，否则就过期
		var dateArr = date.split("-");
		var dateYear = parseInt(dateArr[0])+5;
		var createTime = new Date(dateYear,dateArr[1],dateArr[2]);
		var nowDate = new Date(now.getFullYear(),now.getMonth()+1,now.getDate());
//		date=parseInt(date.substring(0,4))+5+date.substring(4,date.length);
//		date+=" 00:00:00";
//		 var createTime = new Date(Date.parse(date.replace(/-/g, '/')));
		if(nowDate-createTime>0)	{
			num = "过期";
		}
	} 
	return num;
}
//此处合并 与规格型号同一个合并方法~~~请勿用，   原始的方法参见 author.js 授权签字人
function mergeCellsByField(tableID,colList){
    var ColArray = colList.split(",");
    var tTable = $('#'+tableID);
    var TableRowCnts=tTable.datagrid("getRows").length;
    var tmpA;
    var tmpB;
    var PerTxt = "";
    var CurTxt = "";
    var alertStr = "";
    //for (j=0;j<=ColArray.length-1 ;j++ )
   // for (j=ColArray.length-1;j>=0 ;j-- )
    if(j=ColArray[0])
    {
        //当循环至某新的列时，变量复位。
        PerTxt="";
        tmpA=1;
        tmpB=0;
        
        //从第一行（表头为第0行）开始循环，循环至行尾(溢出一位)
        for (i=0;i<=TableRowCnts ;i++ )
        {
            if (i==TableRowCnts) {
                CurTxt="";
            } else{
                CurTxt=tTable.datagrid("getRows")[i][ColArray[0]];
            }
         //   if (PerTxt==CurTxt&&上一行姓名==当前行姓名){
            if (PerTxt==CurTxt){
                tmpA+=1;
            } else{
                tmpB+=tmpA;
                for (f=ColArray.length-1;f>=0 ;f-- ){
                tTable.datagrid('mergeCells',{
                    index:i-tmpA,
                    field:ColArray[f],
                    rowspan:tmpA,
                    colspan:null
                });              
                }
                tmpA=1;
            }
            PerTxt=CurTxt;
            
        }
    }
}
//此处是用三个日期判断
function notice(date,realdata,theorydata){
//当前日期
	var now = new Date();
	//var nowDate = new Date((now.getMonth()+1)+"-"+now.getDate()+"-"+now.getFullYear());
//证书获取时间
	var num="";
	if(date!=""){
		//先截取获得证书的时间，然后加五年，与当前时间相比，当前时间比他五年后的时间大的话就没有过期，否则就过期
		var dateArr = date.split("-");
		var dateYear = parseInt(dateArr[0])+5;
		var createTime = new Date(dateYear,dateArr[1],dateArr[2]);
		var nowDate = new Date(now.getFullYear(),now.getMonth()+1,now.getDate());
//		date=parseInt(date.substring(0,4))+5+date.substring(4,date.length);
//		date+=" 00:00:00";
//		 var createTime = new Date(Date.parse(date.replace(/-/g, '/')));
		if(nowDate-createTime>0)	{
			num = "过期";
		}
	}
	if(realdata!=""){
		//先截取获得证书的时间，然后加五年，与当前时间相比，当前时间比他五年后的时间大的话就没有过期，否则就过期
//		realdata=parseInt(realdata.substring(0,4))+5+realdata.substring(4,realdata.length);
//		realdata+=" 00:00:00";
//		 var createTime = new Date(Date.parse(realdata.replace(/-/g, '/')));
		var realDateArr = realdata.split("-");
		var realDateYear = parseInt(realDateArr[0])+5;
		var createTime = new Date(realDateYear,realDateArr[1],realDateArr[2]);
		var nowDate = new Date(now.getFullYear(),now.getMonth()+1,now.getDate());
		if(nowDate-createTime>0)	{
			num = "过期";
		}
	}
	if(theorydata!=""){
		//先截取获得证书的时间，然后加五年，与当前时间相比，当前时间比他五年后的时间大的话就没有过期，否则就过期
//		theorydata=parseInt(theorydata.substring(0,4))+5+theorydata.substring(4,theorydata.length);
//		theorydata+=" 00:00:00";
//		 var createTime = new Date(Date.parse(theorydata.replace(/-/g, '/')));
		var theoryDateArr = theorydata.split("-");
		var theoryDateYear = parseInt(theoryDateArr[0])+5;
		var createTime = new Date(theoryDateYear,theoryDateArr[1],theoryDateArr[2]);
		var nowDate = new Date(now.getFullYear(),now.getMonth()+1,now.getDate());
		if(nowDate-createTime>0)	{
			num = "过期";
		}
	}
	return num;
}

//单条删除
function del(uid,userid,itemid,methodid,row) {
	$('#certgrid').datagrid('clearSelections');
	$('#certgrid').datagrid('selectRow',row);
//	if (window.confirm('是否删除？上岗证信息？')) {
	if (window.confirm('是否删除？')) {
		$.post("certificateinfo!deleteOnlyOne.action", {
			id : uid,
			userid:userid,
			methodid:methodid,
			itemid:itemid
		}, function(del) {
			if (del=='success') {
				alert("删除成功！");
				$("#certgrid").datagrid('reload');
			}else{
				alert("删除失败！");
			}
		});
	}
}

//删除功能~批量
function delAll() {
	var selected = $('#certgrid').datagrid('getSelections');

	if (selected != null && selected != "") {
		if (window.confirm("是否删除？")) {
			var selcheck = new Array();
			for ( var i = 0; i < selected.length; i++) {
				selcheck[i] = selected[i].id;
			}
			$.post(rootPath + "/certificateinfo/certificateinfo!betchDeleteMethod.action?id="
					+ selcheck, function(del) {
				if (del == 'success') {
					alert("删除成功!");
					$('#certgrid').datagrid('clearSelections');
					$("#certgrid").datagrid('reload');
				}else{
					alert("删除失败!");
					$("#certgrid").datagrid('reload');
				}
			});
		}
	} else {
		alert('请至少选择一条记录！');
		return;
	}
}


//详情
function detail(id) {
	$('#certgrid').datagrid('clearSelections');
	var url = rootPath + "/certificateinfo/certificateinfo!view.action";
	if (id != "") {
		url = url + "?id=" + id;
	}
	var _dialog = window.top
			.$('<div id ="cert-dlg" style="padding:0px;"><iframe id="detailFrame" name="detailFrame" width="100%" height="100%" frameborder="0" scrolling="no" src=' + url + '></iframe></div>')
			.appendTo(window.top.document.body);
	_dialog.dialog( {
		title : '上岗证详情',
		autoOpen : false,
		modal : true,
		closed : true,
		width : '680',
		height : '350'
	});
	_dialog.dialog('open');
}

//编辑
function edit(id){
	$('#certgrid').datagrid('clearSelections');
	var url = rootPath + "/certificateinfo/certificateinfo!edit.action";
	if (id != "") {
		url = url + "?id=" + id;
	}
	var _dialog = window.top
			.$('<div id ="cert-dlg" style="padding:0px;"><iframe id="certificateinfoFrame" width="100%" height="100%" frameborder="0" scrolling="no" src=' + url + '></iframe></div>')
			.appendTo(window.top.document.body);
	_dialog.dialog({
		title:'上岗证编辑',
		autoOpen:false,
		modal:true,
		closed:true,
		width : '650',
		height : '350',
		buttons:[{
			text:'保存',
			iconCls:'icon-save',
			handler:function(){
				$("#certificateinfoFrame",top.document.body).contents().find("#certificateinfoform").form('submit',{
					url:rootPath +'/certificateinfo/certificateinfo!update.action',
					onSubmit:function(){
					var objs= $("#certificateinfoFrame",top.document.body).contents().find(".grkj-validate");
					if(!saveCheck(objs)){						
							$("#certificateinfoFrame",top.document.body).contents().find(":input").focus();
							alert("数据输入不符合格式，请查看红色边框的输入框的输入提示！");
							return false;
						}
					},
					success:function(data){ 
						if(data=='success'){
							_dialog.dialog('close');
							$("#certgrid").datagrid('reload');
							alert('保存成功');
						}else{
							alert('保存失败');
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

//添加
function addWin(id){
	var url = rootPath + "/certificateinfo/certificateinfo!input.action";
	if (id != "") {
		url = url + "?id=" + id;
	}
	var _dialog = window.top
			.$('<div id ="cert-dlg" style="padding:0px;"><iframe id="certificateinfoFrame" width="100%" height="100%" frameborder="0" scrolling="no" src=' + url + '></iframe></div>')
			.appendTo(window.top.document.body);
	_dialog.dialog({
		title:'上岗证编辑',
		autoOpen:false,
		modal:true,
		closed:true,
		width : '680',
		height : '350',
		buttons:[{
			text:'保存',
			iconCls:'icon-save',
			handler:function(){
				$("#certificateinfoFrame",top.document.body).contents().find("#certificateinfoform").form('submit',{
					url:rootPath +'/certificateinfo/certificateinfo!save.action',
					onSubmit:function(){
					var objs= $("#certificateinfoFrame",top.document.body).contents().find(".grkj-validate");
					if(!saveCheck(objs)){						
							$("#certificateinfoFrame",top.document.body).contents().find(":input").focus();
							$("#certificateinfoFrame",top.document.body).contents().find("#methodlist").focus();
							alert("数据输入不符合格式，请查看红色边框的输入框的输入提示！");
							return false;
						}
					},
					success:function(data){ 
						if(data=='success'){
							_dialog.dialog('close');
							$("#certgrid").datagrid('reload');
							alert('保存成功');
						}else if(data=='exist'){
							alert("当前人员已经具有该项目的分析方法，请确认输入！");
						}else if(data=='fail'){
							alert("保存失败");
						}else if(data=='stationnoexist'){
							alert("该上岗证编号已经存在，请重新输入！");
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



//查询
function query() { 
	var flagStatusWjy=$("#flagStatus").val();//状态
	var realnames = $("#realnames").val();//展示的名字~是用用户id去用户表查询的realname
	var itemname = $("#itemname").val();//项目名称
	var deptidnames= $("#deptidnames").val();//用户获取部门信息
	var getlastdate= $("#getlastdate").val();//时间的获取
 
	$('#certgrid').datagrid( {
		queryParams : {
		realnames : realnames,
		itemname:itemname,
		deptidnames:deptidnames,
		getlastdateString:getlastdate,
		status:flagStatusWjy
		},
		pageNumber : 1  //查询后指定页码为1
	});
}
/*  原来合并的导出
//导出
function ExportExcel() {
		//poi导出
			var urlParmDown=rootPath +"/certificateinfo/certificateinfo!exportSalChangeInfo.action";
		
			$("#exportExcel").attr("action",urlParmDown);
			$("#exportExcel").submit();	
			//报表导出
				var url = rootPath + "/common/report!toReportPage.action?raq=certificate.raq";
				
				var _dialog =  window.top.$('	<div id ="dlg" style="padding:0px;"><iframe id="frame" width="100%" height="100%" frameborder="0" scrolling="yes" src='+url+'></iframe></div>').appendTo(window.top.document.body);
				_dialog.dialog({
				title:'人员上岗',
				autoOpen:false,
				modal:true,
				closed:true,
				maximizable:true,
				width:'1000',
				height:'600',
				onClose:function(){
						_dialog.dialog("destroy");					
					}
				});
				_dialog.dialog('open');
}*/


//导出  用的是employeeinfo里面的写法
function ExportExcel() {
		//poi导出
		jQuery.blockUI({ 
			message: "正在导出文档,请稍候...", 
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
		//导出文档，不支持ajax
			var urlParmDown=rootPath +"/certificateinfo/certificateinfo!exportInfo.action";
			$("#exportExcel").attr("action",urlParmDown);
			$("#exportExcel").submit();	
			setTimeout(function foo(){jQuery.unblockUI();},1000);　//设定foo函数将在1000毫秒后执行一次
}
//延时关闭导出文档，请稍后的窗口
function foo(){
	
		jQuery.unblockUI();
}


/**
 * 删除附件的时候使用的方法
 * @param filename
 * @return
 */
function delefujian(filename,id,num){
	if (window.confirm("是否删除 " + filename.substring(13) + " ？")) {
	var encodeParm=encodeURI(encodeURI(filename.toString()));
	$.ajax( {
		type : 'GET',
		url : 'certificateinfo!deleteFuJian.action?filname='+encodeParm+'&id='+id,
		success : function(data) {
		
			alert("文件 "+filename.substring(13)+" 已经删除");
			$("#anjian"+num+",#wenjian"+num).hide();
		},
		error:function(data){
			alert("删除失败");
		}
	});
	}
}


//文件名称转义
function URLencode(sStr) 
{
    return encodeURI(sStr).replace(/\+/g, '%2B').replace(/\"/g,'%22').replace(/\'/g, '%27').replace(/\//g,'%2F');
}

/**
 * 下载的时候使用的方法~~
 * @param name
 * @return
 */
function loadFile(name){

		
	//var encodeParm=URLencode(URLencode(name.toString()));
	  var encodeParm=encodeURIComponent(encodeURIComponent(name.toString()));
	var urlParm=rootPath +"/certificateinfo/certificateinfo!downLoad.action?path="+encodeParm+"&flg="+"0";
	$.ajax({
		type:"POST",
		url:urlParm,
		success:function(data){
			cache:false;
		if(data=="success"){
			var urlParmDown=rootPath +"/certificateinfo/certificateinfo!downLoad.action?path="+encodeParm+"&flg="+"1";
			$("#certificateinfoform").attr("action",urlParmDown);
			$("#certificateinfoform").submit();
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

//姓名的弹出窗口使用selectedUserid
function showName(){
	//url=rootPath +"/certificateinfo/certificateinfo!showname.action";//自己做部门下拉框的选择按钮
	var url =  rootPath +"/oamuser/oneandmanyuser!toOneUser.action";
	var _dialog =  window.top.$('<div id ="cert-dlg" style="padding:0px;"><iframe id="ItemFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
	_dialog.dialog({
		title:'姓名选择',
		autoOpen:false,
		modal:true,
		closed:true,
		width:'800',
		height:'500',
		buttons:[{
			text:'确定',
			iconCls:'icon-save',
			handler:function(){
			$('#stationno').val("");
			$('#stationno').removeAttr("readonly");
			var val=$("#ItemFrame",top.document.body).contents().find("#selectedUser").val();
			$("#username").val(val);
			var userids=$("#ItemFrame",top.document.body).contents().find("#selectedUserid").val();
			$("#userids").val(userids);	
			$.post(
				rootPath + "/certificateinfo/certificateinfo!getCert.action",
				{userids:userids},
				function(msg){
					var obj = eval('('+msg+')');
					if(obj.stationno!=null){
					$('#stationno').val(obj.stationno);
					$('#stationno').attr("readonly","readonly");
					}
				}
			)
			
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


//做项目弹出窗口使用
function showitem(){
	url=rootPath +"/certificateinfo/certificateinfo!showitem.action";

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
 			var itemname=$("#ItemFrame",top.document.body).contents().find("#itemname").val();
			var itemid=$("#ItemFrame",top.document.body).contents().find("#itemid").val();
			if(itemid==""||itemid==null){
				alert("请选择项目");
				return false;
			}
			$("#itemname").val(itemname);
			$("#itemids").val(itemid);
			_dialog.dialog('close');
			methodData(itemid);	//选中项目之后，列出能分析的方法
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


//显示采样方法框~用在人员上岗里面
function showmethod(flag){
	url=rootPath +"/certificateinfo/certificateinfo!showsampling.action";
	var _dialog =  window.top.$('	<div id ="cert-dlg" style="padding:0px;"><iframe id="samplingFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
	_dialog.dialog({
		title:'选择方法',
		autoOpen:false,
		modal:true,
		closed:true,
		width:'700',
		height:'500',
		buttons:[{
			text:'确定',
			iconCls:'icon-save',
			handler:function(){
			var selectedanalysename=$("#samplingFrame",top.document.body).contents().find("#selectedmethodname").val();
			var selectedanalyseid=$("#samplingFrame",top.document.body).contents().find("#selectedmethodid").val();
			$("#methodidname").val(selectedanalysename);
			$("#methodids").val(selectedanalyseid);
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


//加载方法下拉框
	function methodData(itemid){
		$('#methodlist').html('');
		$.ajax( {
			type : 'GET',
			url : rootPath+'/analyse/method/itemmethod!initMethod.action?'+'timeStamp='+new Date().getTime(),//给该url一个时间戳~~这样就必须每次从服务器读取数据,
			data : {'itemid':itemid},
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
