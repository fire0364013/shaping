$(document).ready(function(){
	$('#tableId').datagrid(
			{
				nowrap : false,
				striped : true,
				collapsible : true,
				url : 'qualitycontrolset!qualityControlsetList.action?analysissparamid='+analysissparamid,
				remoteSort : false,
				fit : false,
				height : '200',
				fitColumns : true,
				scrollbarSize : 18,
				singleSelect : true,
				columns : [ [ 
					{
						title : '浓度范围',
						field : 'ndfw',
						align: 'center',
						width : 40,
						sortable : true
					},{
						title : '室内精密度',
						field : 'innerPrecision',
						align: 'center',
						width : 30,
						sortable : true
					},{
						title : '室间精密度',
						field : 'outerPrecision',
						align: 'center',
						width : 30,
						sortable : true
					},{
						title : '加标回收率范围',
						field : 'jbhslfw',
						align: 'center',
						width : 50,
						sortable : true
					},{
						title : '空白样范围',
						field : 'kbyfw',
						align: 'center',
						width : 40,
						sortable : true
					},{
						title : '室内相对偏差范围',
						field : 'snxdpcfw',
						align: 'center',
						width : 50,
						sortable : true
					},{
						title : '室间相对偏差范围',
						field : 'sjxdpcfw',
						align: 'center',
						width : 40,
						sortable : true
					}
				 ] ],
				rownumbers : true,
				onRowContextMenu : function(e, row, rowData) {
					var itemflag = $("#itemflag").val();
					var itemflag = '0';
					// IE
					$('#editWin').removeAttr("disabled");
					$('#del').removeAttr("disabled");
					$('#detail').removeAttr("disabled");
					// 火狐
					$('#editWin').removeClass("disable");
					$('#del').removeClass("disable");
					$('#detail').removeClass("disable");

					if (itemflag == '0') {
						$('#calibrategrid').datagrid('selectRow', parseInt(row));
						$("#method-menu").menu("show", {
							left : e.pageX,
							top : e.pageY
						});
						$("#savedata").val(rowData['qcsetid']);
						e.preventDefault();
					}
				},

				onHeaderContextMenu : function(e, field) {
					var itemflag = $("#itemflag").val();
					// IE
					$('#editWin').attr({
						disabled : "true"
					});
					$('#del').attr({
						disabled : "true"
					});
					$('#detail').attr({
						disabled : "true"
					});
					// 火狐
					$('#editWin').addClass("disable");
					$('#del').addClass("disable");
					$('#detail').addClass("disable");
					// if(itemflag=='0'){
					$('#method-menu').menu('show', {
						left : e.pageX,
						top : e.pageY
					});
					e.preventDefault();
				}
			// }
			});
});

function saveWin(id)
{
	var url;
	if(id == 'id')
	{
		id = $("#savedata").val();
		url = rootPath +'/analyse/analyseparam/qualitycontrolset!toInput.action?qcsetid=' + id ;
	}else
	{
		url = rootPath +'/analyse/analyseparam/qualitycontrolset!toInput.action?analysissparamid='+$('#analysissparamid').val();
	}
//	alert(url);
	var _dialog =  window.top.$('<div id ="role-dlg" style="padding:0px;"><iframe id="tlmQualityControlsetFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
	_dialog.dialog({
		title:'',
		autoOpen:false,
		modal:true,
		closed:true,
		width:'800',
		height:'240',
		buttons:[{
			text:'保存',
			iconCls:'icon-save',
			handler:function()
			{
				$("#tlmQualityControlsetFrame",top.document.body).contents().find("#tlmQualityControlsetForm").form('submit',{
					url:rootPath +'/analyse/analyseparam/qualitycontrolset!toSave.action',
					onSubmit:function(){
						
					},
					success:function(data){
						if(data=='success'){
							alert("保存成功!");
							_dialog.dialog('close');
							$("#tableId").datagrid('reload');
						}else{
							alert("保存失败!");
						}
						},
					error:function(){
						alert("保存失败");
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

function del(id)
{
	if($("#del").attr("disabled")=="disabled"){
		return false;
	}
	var did='';
	if(id=='id'){
		did=$("#savedata").val();
	}
//	alert(did);
		if(window.confirm('是否删除？')){
			$.post(rootPath +"/analyse/analyseparam/qualitycontrolset!delTlmQualityControlset.action",{qcsetid:did},function(del){
				if(del=='success'){
					$('#tableId').datagrid('clearSelections');
					$("#tableId").datagrid('reload');
					//$.messager.show({title:'提示',msg:'删除成功!',timeout:5000,showType:'slide'});
					alert("删除成功！");
				}else{
					alert("删除失败！");
					//$.messager.show({title:'提示',msg:'删除失败!',timeout:5000,showType:'slide'});
				}
				
			});
		}
}

/***********************备用方法*****************************/
//验证只能输入整数，浮点数（包括负数）
function CheckInputIntFloat(oInput)
{
	if(oInput.value.substr(0,1) == '.')
	{
		oInput.value ="";
	}
	if(oInput.value.length>1 && oInput.value.substr(0,2) =='00')
	{
		oInput.value ="0";
	}
	if(oInput.value.substr(0,1) !='-')
	{
		if('' != oInput.value.replace(/\d{1,}\.{0,1}\d{0,}/,''))
		{
			oInput.value = oInput.value.match(/\d{1,}\.{0,1}\d{0,}/) == null ? '' :oInput.value.match(/\d{1,}\.{0,1}\d{0,}/);
		}
	}else
	{
		if('' != oInput.value.substr(1,oInput.value.length).replace(/\d{1,}\.{0,1}\d{0,}/,''))
		{
			var value_ = oInput.value.substr(1,oInput.value.length).match(/\d{1,}\.{0,1}\d{0,}/) == null ? '' :oInput.value.substr(1,oInput.value.length).match(/\d{1,}\.{0,1}\d{0,}/);
			oInput.value = oInput.value.substr(0,1) + value_;
		}
	}
}

//屏蔽非法输入
function event()
{
	if (event.keyCode!=46 && event.keyCode!=45 && (event.keyCode<48 || event.keyCode>57)) event.returnValue=false;
}