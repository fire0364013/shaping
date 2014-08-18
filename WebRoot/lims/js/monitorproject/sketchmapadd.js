	$(document).ready(function(){
			//@监测点类型改变的时候     先根据后台拼接的所有已经按监测点保存的类型 与当前选择的类型所比较
			//如果拼接的监测点类型正好包含当前所选择的监测点类型，然后就将当前监测点类型  的选择方式中的“按监测点类型保存去掉”
 			$("#ponitType").change(function(){
					var thisType=$("#ponitType").val();
					if(ponitFlagId!=""){
						var ponitFlagIds=ponitFlagId.split(",");
						var isShowFlag="0";
						for(var i=0;i<ponitFlagIds.length;i++){
							if(ponitFlagIds[i]==thisType){
								$("#monitoridSaveWay").html("");
								$("#monitoridSaveWay").html("<option value='' selected='selected'>---请选择---</option>" +
								"<option value='2' >按监测点保存</option>");
								isShowFlag="1";
							}
						}
						if(isShowFlag=="0"){
							$("#monitoridSaveWay").html("");
								$("#monitoridSaveWay").html("<option value='1' selected='selected'>按监测类型保存</option>" +
								"<option value='2' >按监测点保存</option>");
						}
					}
					//$$$$$$$$按监测点保存
					//在监测点类型发生改变的时候   如果获取到监测点方式为按监测点保存   就异步获取此监测类型下此用户所负责的所有监测点，
					//并将监测点的文本框显示出来,然后还要刷新选择图片的列表
					if($("#monitoridSaveWay").val()=="2"){
						$.post(rootPath +"/monitorproject/sketchmap/projectpointsketchmap!getMonitorponitJson.action",{projectcode:projectcode,monitorpointtypeid:thisType},function(data){
							var mData= eval("(" + data + ")");
							var innerHtml="<option value=''>---请选择---</option>";
							jQuery.each(mData.rowsData, function(i, n) {
								innerHtml+="<option value=" + n.monitorid + ">" + n.monitorname	+ "</option>";
							});
							$('#monitorponitid').html("");
							$('#monitorponitid').append(innerHtml);
							
						});
						//^^^^^^^^当监测点发生改变的时候
						$('#monitorponitid').change(function(){
							var montorid= $('#monitorponitid').val();
							var myurl1=rootPath +'/monitorproject/entpointsketchmap/entpointsketchmap!getEntPicData.action?projectcode='
							+projectcode+'&deviceMaintenanceType='+thisType+"&monitorpoint="+montorid+"&enterpriseid="+enterpriseid;
							entPicListByType(myurl1);
						});
					//$$$$$$$$按类型保存
					//在监测点类型发生改变的时候   如果获取到监测点方式为按监测点类型保存   
					//就将监测点的文本框隐藏，并刷新选择图片的列表
					}else if($("#monitoridSaveWay").val()=="1"){
						$('#monitorponitid').html("");
						$('#monitorponitid').html("<option value=''>---请选择---</option>");
						$("#monitorponittr").hide();
						
						var myurl2=rootPath +'/monitorproject/entpointsketchmap/entpointsketchmap!getEntPicData.action?projectcode='
						+projectcode+'&deviceMaintenanceType='+thisType+"&enterpriseid="+enterpriseid;
						entPicListByType(myurl2);
					}else{
						var myurl3=rootPath +"/monitorproject/entpointsketchmap/entpointsketchmap!getEntPicData.action";
						entPicListByType(myurl3);
					}
			});
			
						
						
			//@选择方式改变的时候
 			//先判断当前选择的是按什么方式
 			//如果选择的为按类型保存    就将按监测点保存的文本框隐藏，并将html设置成空，并刷新选择图片的列表
			$("#monitoridSaveWay").change(function(){
				var thisType=$("#ponitType").val();
				if(thisType!=""){
					var monitoridSaveWay=$("#monitoridSaveWay").val();
					//$$$$$$$$按类型保存
					if(monitoridSaveWay=="1"){
						$('#monitorponitid').html("");
						$('#monitorponitid').html("<option value=''>---请选择---</option>");
						$("#monitorponittr").hide();
						var myurl4=rootPath +'/monitorproject/entpointsketchmap/entpointsketchmap!getEntPicData.action?projectcode='
						+projectcode+'&deviceMaintenanceType='+thisType+"&enterpriseid="+enterpriseid;
						entPicListByType(myurl4);
					}else if(monitoridSaveWay=="2"){
						//$$$$$$$$按监测点保存
						//若果选择的方式是按监测点保存，就先判断监测点类型是否为空，不为空的情况下再加载此类型下所有检测点，并刷新选择图片的列表
								$.post(rootPath +"/monitorproject/sketchmap/projectpointsketchmap!getMonitorponitJson.action",{projectcode:projectcode,monitorpointtypeid:thisType},function(data){
									var mData= eval("(" + data + ")");
									var innerHtml="<option value=''>---请选择---</option>";
									jQuery.each(mData.rowsData, function(i, n) {
										innerHtml+="<option value=" + n.monitorid + ">" + n.monitorname	+ "</option>";
									});
									$('#monitorponitid').html("");
									$('#monitorponitid').append(innerHtml);
									
								});
								$("#monitorponittr").show();
								//^^^^^^^^当监测点发生改变的时候
								//$('#monitorponitid').change(function(){
									var montorid= $('#monitorponitid').val();
									if(montorid==''){
										montorid='0';
									}
									var myurl5=rootPath +'/monitorproject/entpointsketchmap/entpointsketchmap!getEntPicData.action?projectcode='
									+projectcode+'&deviceMaintenanceType='+thisType+"&monitorpoint="+montorid+"&enterpriseid="+enterpriseid;
									entPicListByType(myurl5);
								//});
						
					}//else
					else{
						$('#monitorponitid').html("");
						$('#monitorponitid').html("<option value=''>---请选择---</option>");
						var myurl8=rootPath +'/monitorproject/entpointsketchmap/entpointsketchmap!getEntPicData.action';
						entPicListByType(myurl8);
					}
				}//if
			});
		$('#monitorponitid').change(function(){
			var thisType=$("#ponitType").val();
			var montorid= $('#monitorponitid').val();
			if(montorid==''){
				montorid='0';
			}
			var myurl7=rootPath +'/monitorproject/entpointsketchmap/entpointsketchmap!getEntPicData.action?projectcode='
			+projectcode+'&deviceMaintenanceType='+thisType+"&monitorpoint="+montorid+"&enterpriseid="+enterpriseid;
			entPicListByType(myurl7);
		});
			
			
	//页面加载成功时加载显示图片路径的列表	
			var myurl6=rootPath +"/monitorproject/entpointsketchmap/entpointsketchmap!getEntPicData.action";
			entPicListByType(myurl6);
	});		
			
//查看图片
function detailPic(filename){
	var url = rootPath +'/lims/entMapFiles/'+filename;
	var _dialog =  window.top.$('<div id ="role-dlg" style="padding:0px;"><iframe id="filnameFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
	_dialog.dialog({
		title:'示意图',
		autoOpen:false,
		modal:true,
		closed:true,
		width:'700',
		height:'600',
		onClose:function(){
			_dialog.dialog("destroy");
		}
	});
	_dialog.dialog('open');
}
/**
 * 显示图片列表
 * @return
 */
function entPicListByType(myurl){
	$("#entPicDatagrid").datagrid({
		nowrap: false,
		striped: true,
		collapsible:true,
		url:myurl, 
		fit:true,
		fitColumns : true,
		scrollbarSize:0,
		remoteSort: false,
		idField:'sketchmap',
		singleSelect:true,
		pageSize:10,
		pageList:[10,20,30,40,50],
		frozenColumns:[[
				{field:'sketchmap',title : '&nbsp;',width : 30,align : 'center',
					formatter:function(value){
						return "<input type='radio' name='radio'/>";
					}
				}]],
		columns:[[	
				{field:'sketchmapname',title:'示意图文件',width:420,align:"center"},
				{field:'operate',title:'操作',width:120,align:"center",
					formatter:function(value,rec,rowIndex){
							var links="<img src='"+rootPath+"/themes/default/images/xiangxiimage.png' alt='编辑'  id='btnshows' onclick='detailPic(\""+rec.pointsketchmap+"\")'/>&nbsp;&nbsp;";
							return links;
					}
				}]],
		pagination:true,
		rownumbers:true,
		onSelect:function(){
			var selected=$("#entPicDatagrid").datagrid('getSelected');
			checkRadio();
			$("#fileSelect").val(selected['sketchmapname']);//图片
			$("#filePath").val(selected['pointsketchmap']);//路径
		},
		onLoadSuccess:function(){
			$('#entPicDatagrid').datagrid('clearSelections');
		}
		});
		$(window).resize(function() {
			$("#entPicDatagrid").datagrid('resize');
		});
	}

function checkRadio(){
	var row=$("#entPicDatagrid").datagrid('getSelected');
	var rowNum=0;
	var rows=$("#entPicDatagrid").datagrid('getRows');
	for(var i=0;i<rows.length;i++){
		if (row == rows[i]) {
			rowNum = i;
			break;
		}
	}
	var radios = $("input[type=radio]");
	$(radios[rowNum]).attr("checked", true);
}
//上传
function upLoadFile(){
	$("#sketchmapform").form('submit',{
		url:rootPath +'/monitorproject/entpointsketchmap/entpointsketchmap!saveEntity.action',
		onSubmit:function(){
			//验证图片格式
			var filename=$("#filec").val();
			if(filename!=null && filename!=""){
				var filec=filename.substring(filename.lastIndexOf(".")).toLowerCase();
				if(filec!=".jpg"&&filec!=".jpeg"&&filec!=".gif"&&filec!=".png"&&filec!=".bmp"){
					alert("照片仅支持 jpg,jpeg,gif,png,bmp格式的图片");
					return false;
				}
			} //class="grkj-validate" 
			//验证红色星号是否全部填写
			var saveWay=$("#monitoridSaveWay").val();
			if(saveWay=="2"){
				$("#monitorponitid").addClass("grkj-validate");
			}else if(saveWay=="1"){
				$("#monitorponitid").removeClass();
			}
			var objs = $(".grkj-validate");
			if(!saveCheck(objs)){
				$("#ponitType").focus();
				$("#monitoridSaveWay").focus();
				if(saveWay=="2"){
					$("#monitorponitid").focus();
				}
				alert("请查看带有红色星号的是否全部填写！");
				return false;
			}
		},
		success:function(data){
			//var obj=document.getElementById("filec");;
			//obj.outerHTML=obj.outerHTML;
			$("#fileTd").html("");
			$("#fileTd").html("<input name=\"file\" size=\"45\" label=\"上传\" type=\"file\" class=\"TextBox\" id=\"filec\"></s:file>");
			$("#entPicDatagrid").datagrid('reload'); 
		}
	});	
}