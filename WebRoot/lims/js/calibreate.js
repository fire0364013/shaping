//-----Au-----wjy~~
$(function(){
	var documentWidth=document.body.clientWidth;
			$('#datagrid1').datagrid({
				singleSelect:true,
				width : documentWidth,
				height : document.body.clientHeight,
				nowrap: false,
				striped: true,
				collapsible:true,
				url:rootPath +'/device/calibreate/calibreate!calibrateList.action',
				fit : true,
				fitColumns : true,
				remoteSort : false,
				scrollbarSize:0,
				remoteSort: false,
				idField:'deviceid',
				pageSize:20,
				pageList:[20,30,40,50],
				columns:[[
						{field:'devicename',title:'设备名称', width:105,align:"center"},
						{field:'leavefactorynum',title:'出厂编号', width:140,align:"center"},	
						{field:'usingoffice',title:'使用科室', width:80,align:"center"},
//						{field:'person',title:'校准人', width:60,align:"center"},
						{field:'cycle',title:'检定/校准周期', width:50,align:"center"},
						{field:'lastcalldate',title:'上次周期检定日期', width:80,align:"center"},
						{field:'calldate',title:'本次周期检定日期', width:80,align:"center"},
						{field:'calibrateunit',title:'检测单位', width:80,align:"center"},
						{field:'booktype',title:'证书类型', width:50,align:"center"},
//						{field:'booknum',title:'证书编号', width:80,align:"center"},
						{field:'operate',title:'操作', width:60,align:"center",
							formatter:function(value,rec){
								var links='<img src="'+rootPath +'/themes/default/images/xiangxiimage.png" id="btnshow" onclick="detail('+ rec.deviceid +')" alt="详情"/>&nbsp;&nbsp;';
								links+='<img src="'+rootPath +'/themes/default/images/bianjiimage.png" id="btnshow" onclick="detail2('+ rec.deviceid+')" alt="编辑"/>&nbsp;&nbsp;';
								return links;
							}
						}						
				]],
				pagination:true,
				rownumbers:true,
				rowStyler:function(rowIndex,rowData){
					if(rowData.flag=='过期')						
						return 'color:red';
					else if(rowData.flag=='将过期')
						return "color:#FF9900";					
				}			
				
			});
			

		$(window).resize(function() {
			$("#datagrid1").datagrid('resize');
		});
		
		$("#file").click(function(){
			download($("#file").html());
		});
	});		

	function addcurve(){
			var url = rootPath +"/device/calibreate/calibreate!toaddCalibreate.action";	
			var surl = rootPath +'/device/calibreate/calibreate!save.action';		
			
			var _dialog =  window.top.$('<div id ="callbreate-dlg" style="padding:0px;"><iframe id="callbreateFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
			_dialog.dialog({
				title:'仪器检定/校验信息编辑',
				autoOpen:false,
				modal:true,
				closed:true,
				width:'600',
				height:'400',
				buttons:[{
					text:'保存',
					iconCls:'icon-save',
					handler:function(){
					$("#callbreateFrame",top.document.body).contents().find("#cform").form('submit',{
							url:surl,
							onSubmit:function(){
								var objs = $("#callbreateFrame",top.document.body).contents().find(".grkj-validate");
								if(!saveCheck(objs)){
									$("#callbreateFrame",top.document.body).contents().find(":input").focus();
									$("#callbreateFrame",top.document.body).contents().find("select").focus();
									alert("数据输入不符合格式，请查看红色边框的输入框的输入提示！");
									return false;
								}
								var date = $("#callbreateFrame",top.document.body).contents().find("#datefocus").val();
								if(date==""){
									alert('日期不能为空!');
									return false;
								}
							},
							success:function(data){
								_dialog.dialog('close');
								$("#datagrid2").datagrid('reload');
								if(data=='success'){
									alert('成功');
								}
								if(data=='fail'){
									alert('失败');                                                    
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

		//详情
		function detail(id){
			$('#datagrid1').datagrid('clearSelections');
			var url =  rootPath +"/device/calibreate/calibreate!view.action";
			if(id!=""){
				url = url + "?id="+id;
			}
			var _dialog =  window.top.$('	<div id ="callbreate-dlg" style="padding:0px;"><iframe id="callbreateFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
			_dialog.dialog({
				title:'仪器基本信息详情',
				autoOpen:false,
				modal:true,
				closed:true,
				width:'550',
				height:'400'
			});
			_dialog.dialog('open');
		}
	//详情
		function detail2(id){
			$('#datagrid1').datagrid('clearSelections');
			var url =  rootPath +"/device/calibreate/calibreate!toview.action";
			if(id!=""){
				url = url + "?id="+id;
			}
			var _dialog =  window.top.$('	<div id ="callbreate-dlg" style="padding:0px;"><iframe id="callbreateFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
			_dialog.dialog({
				title:'仪器检定/校准信息详情',
				autoOpen:false,
				modal:true,
				closed:true,
				width:'550',
				height:'400',
				onClose:function(){
					$("#datagrid1").datagrid('reload');
					_dialog.dialog("destroy");
					
				}
			});
			_dialog.dialog('open');
		}
		
		
		//查询
		function query(){
			var devicenumquery=$("#devicenumquery").val();
			var devicenamequery=$("#devicenamequery").val();
			var depart=$("#depart").val();
			var calibrateunit =$("#calibrateunit").val();
			var startdate= $("#startdate").val();//开始日期
			var enddate= $("#enddate").val();//结束日期
			$('#datagrid1').datagrid( {
				queryParams : {
				devicenum : devicenumquery,
				devicename : devicenamequery,
				deptid : depart,
				calibrateunit : calibrateunit,
				startdate:startdate,
				enddate:enddate
				},
				pageNumber:1		
			});
		}
		

//function notice(date,cycle,day){
////默认10天提醒
//	if(day==""||day==null){
//		day = 10;
//	}
////当前日期
//	var now = new Date();
//	var nowDate = new Date((now.getMonth()+1)+"-"+now.getDate()+"-"+now.getFullYear());
//
////下一次维护日期
//	var arrs;
//	var times;
//	var num="";
//	if(date!=""){
//		arrs=date.split("-");									
//		var cyclename = cycle.substring(cycle.length-1,cycle.length);
//		if(cyclename=='日'){
//			arrs[2] = parseInt(cycle.substring(0,cycle.length-1))+parseInt(arrs[2],10);
//		}else if(cyclename =='月'){
//			arrs[1] = parseInt(cycle.substring(0,cycle.length-1))+parseInt(arrs[1],10);
//		}else{
//			arrs[0] = parseInt(cycle.substring(0,cycle.length-1))+parseInt(arrs[0],10);
//		}
//		times = new Date(arrs[1]+"-"+arrs[2]+"-"+arrs[0]);
//								
//		//判断
//		//如果下次维护日期小于当前日期，则”过期“提醒；
//		//如果下次维护日期与当前日期相隔时间小于维护提醒天数，则”即将到期“提醒
//		if(times.getTime()-nowDate.getTime()<0){
//			num = "过期";
//		}else{
//			num = parseInt(Math.floor(times-nowDate)/(1000*60*60*24))<parseInt(day)?"即将到期":""//离下次提醒日期间隔天数
//		}
//	}
//	return num;
//
//}

//文件下载
function download(filename){
	var name=encodeURI(filename.toString());
	$.ajax({
		type: "POST",
		url: rootPath +"/device/calibreate/calibreate!downLoad.action",
		data: "path="+name+"&flg=0",
		processData :false,
		success:function(data){
		cache:false;
			if(data=="fail"){
				alert("下载失败,该文件不存在！");
			}else{
				var urlParmDown=rootPath +"/device/calibreate/calibreate!downLoad.action?path="+name+"&flg=1";
				$("#callbreateform").attr("action",urlParmDown);
				$("#callbreateform").submit();
			}
		}
	});
}



//导出
function ExportExcel() {
		//poi导出
			var urlParmDown=rootPath +"/device/calibreate/calibreate!newExportInfo.action";
			$("#exportExcel").attr("action",urlParmDown);
			$("#exportExcel").submit();	
}

function removeAttach(element){
	$(element).parent().remove();
	var value = $("tr:eq(3)").find("td[class='Main_Tab_Style_Content']").html();
	if(value==""||value==null){
		$("tr:eq(3)").remove();
	}
	var files = $(":input[class='upload-files']");
	var arr = new Array();
	for(var i=0;i<files.length;i++){
		arr.push($(files[i]).val());
	}
	$("#upload").val(arr);
}

