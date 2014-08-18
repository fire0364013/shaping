	$(document).ready(function(){
		var myurl1="";
		$("#entpriselist").change(function(){
			var entid = $("#entpriselist").val();
			$.post(rootPath +"/spot/sketchmap/projectpointsketchmap!getEntPointtypeList.action",
				{projectcode:projectcode,entid:entid},
				function(data){
					var mData= eval("(" + data + ")");
					var innerHtml="<option value=''>---请选择---</option>";
					jQuery.each(mData.rowsData, function(i, n) {
						innerHtml+="<option value=" + n.typeid + ">" + n.typename + "</option>";
					});
					$('#ponitType').html("");
					$('#ponitType').append(innerHtml);
			});
		});
		$("#ponitType").change(function(){
			var entid = $("#entpriselist").val();
			var pointtype = $("#ponitType").val();
			var myurl = rootPath +"/spot/sketchmap/projectpointsketchmap!getEntpointListData.action?entid="+entid+"&monitorpointtypeid="+pointtype;
			entPicListByType(myurl);
		});
		$("#monitoridSaveWay").change(function(){
			var savetype = $("#monitoridSaveWay").val();
			var entid = $("#entpriselist").val();
			var pointtype = $("#ponitType").val();
			if(savetype=='1'){
				$("#monitorponittr").hide();
			}
			if(savetype=='2'){
				$("#monitorponittr").show();
				$.post(rootPath +"/spot/sketchmap/projectpointsketchmap!getEntPointList.action",
					{projectcode:projectcode,entid:entid,monitorpointtypeid:pointtype},
					function(data){
						var mData= eval("(" + data + ")");
						var innerHtml="<option value=''>---请选择---</option>";
						jQuery.each(mData.rowsData, function(i, n) {
							innerHtml+="<option value=" + n.pointid + ">" + n.pointname + "</option>";
						});
						$('#monitorponitid').html("");
						$('#monitorponitid').append(innerHtml);
				});
			}
		});
		$("#monitorponitid").change(function(){
			var montorid= $('#monitorponitid').val();
			var entid = $("#entpriselist").val();
			var pointtype = $("#ponitType").val();
			var myurl = rootPath +"/spot/sketchmap/projectpointsketchmap!getEntpointListData.action?entid="+entid+"&monitorpointtypeid="+pointtype+"&monitorpointid="+montorid;
			entPicListByType(myurl);
		});
		var myurl = rootPath +"/spot/sketchmap/projectpointsketchmap!getEntpointListData.action";
		entPicListByType(myurl);
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
		rownumbers:false,
		onSelect:function(){
			var selected=$("#entPicDatagrid").datagrid('getSelected');
			checkRadio();
			$("#fileName").val(selected['sketchmapname']);//图片
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
		url:rootPath +'/spot/sketchmap/projectpointsketchmap!saveEntPointSketch.action',
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