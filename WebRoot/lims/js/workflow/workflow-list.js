function initDataGrid(){
	$('#datagrid').datagrid({
		singleSelect:true,//文本框的多选 单选  因为判断比较麻烦，容易出问题，所以修改成单选
		nowrap: false,
		striped: true,
		collapsible:true,
		url:'workflow!workflowList.action',
		fit:true,
		border:true,
		fitColumns:false,
		scrollbarSize:0,
		idField:'workflowId',
		frozenColumns:[[
	       {field : ' ',
				title : '&nbsp;',
				width : 30,
				align : 'center',
				formatter : function(value){
					return "<input type='radio' name='radio'/>";}
		 	},
		 	{field:'workflowId',title:'流水号',width:50,align : 'center'},
       	    {field:'workflowCode',title:'流程编号',width:120,align : 'center'}
		]],
		columns:[[
	        {field:'workflowName',title:'流程名称',width:160,align : 'left'}
		]],
		pagination:true,
		rownumbers:false,
		pageSize:20,
		pageList:[20,30,40,50],
		onRowContextMenu:function(e,rowIndex,rowData){
			$('#datagrid').datagrid("selectRow",rowIndex);
		},
		onSelect:function(rowIndex,rowData){
			$("#workflowCode").val(rowData.workflowCode);
			$($("input[type=radio]")[rowIndex]).attr("checked", true);
		},
		onClickRow:function(rowIndex, rowData){
			$('#WorkflowGraph').attr("src","");
			selectView('业务流程图');
		}
	});
	
	$('#workflowDiv').resize(function(){
		$("#datagrid").datagrid('resize');
	});	
}

function selectView(title){
	$('#tab').tabs({
		onSelect: function(title){
			if(title == '业务流程图'){
				if($('#workflowCode').val()!=''){
					if($('#WorkflowGraph').attr('src')==undefined||$('#WorkflowGraph').attr('src')==""){
						$("#WorkflowGraph").attr("src",rootPath+"/workflow/workflow!getGraph.action?workflowCode="+$('#workflowCode').val());
					}
				}
			}
		}			
	});
}

function addWorkflow(){
	var url = rootPath + "/workflow/workflow!toAddWorkflow.action";
	var _dialog =  window.top.$('<div id ="workflowDialog_id" style="padding:0px;"><iframe id="workflowFrame_id" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
	_dialog.dialog({
	title:'添加工作流程',
	autoOpen:false,
	modal:true,
	closed:true,
	width:'400',
	height:'250',
	buttons:[{
			text:'新增',
			iconCls:'icon-next',
			handler:function(){
				$("#workflowFrame_id",window.top.document).contents().find("#WorkflowForm").form('submit',{
						url:rootPath + "/workflow/workflow!addWorkflow.action",
						onSubmit:function(){
							var objs = $("#infoFrame",window.top.document).contents().find(".grkj-validate");
							
							if(!saveCheck(objs)){
								$("#infoFrame",window.top.document).contents().find(":input").focus();
								alert("数据输入不符合格式，请查看红色边框的输入框的输入提示！");
								return false;
							}
						},
						success : function(data) {
							if (data == 'fail') {
								alert("保存失败！");
								return;
							}
							if (data == 'success') {
								alert('保存成功！');
								$('#datagrid').datagrid('reload');
							}
							_dialog.dialog('close');
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

/**
 * 保存
 * @return
 */
function moditfyWorkflow(){
	
}

function removeWorkflow(){
 	if(window.confirm('是否删除？')){ 		
		 $.ajax( {
			type : 'POST',
			url :rootPath + "/workflow/workflow!removeWorkflow.action",
			data : {'workflowCode' : $('#workflowCode').val()},
			success : function(data) {
				if (data == 'fail') {
					alert("删除失败！");
					return;
				}else if (data == 'success'){
					alert('删除成功！');
					$("#datagrid").datagrid("clearSelections");
					$('#BasicInfoFrame').attr("src","");
					$('#workflowCode').val('');
					$('#datagrid').datagrid('reload');
				}
				
			}
		});
 	}
}