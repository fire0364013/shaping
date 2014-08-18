	$(function(){
			$('#datagrid1').datagrid({
				nowrap: false,
				striped: true,
				collapsible:true,
				url:rootPath +'/systemlog/systemlog!toList.action', 
				fit:true,
				fitColumns : true,
				scrollbarSize:0,
				remoteSort: false,
				idField:'logid',
				singleSelect:false,
				pageSize:20,
				pageList:[20,30,40,50],
				frozenColumns:[[
					{field:'logid',checkbox:true,align:"center"}
								]],
				columns:[[
						{field:'operationuser',title:'操作人员',width:60,align:"center"},					
						{field:'operatetime',title:'操作时间',width:120,align:"center"},
						{field:'moduleid',title:'操作模块',width:90,align:"center"},
						{field:'operatecontent',title:'操作说明',width:420,align:"center"},
						{field:'operate',title:'操作',width:50,align:"center",
							formatter:function(value,rec,rowIndex){
								var links='<img src="'+rootPath+'/themes/default/images/xiangxiimage.png"   alt="详细"  id="btnshow" onclick="detail('+ rec.logid +')"/>&nbsp;&nbsp;';
								links+='<img src="'+rootPath+'/themes/default/images/deleteimage.png"   alt="删除" id="btnshow" onclick="del('+ rec.logid +','+rowIndex+')"/>';
								return links;
							}
						}						
				]],
				pagination:true,
				rownumbers:true,
				onLoadSuccess:function(){
					$('#datagrid1').datagrid('clearSelections');
				}
			});
			$(window).resize(function() {
				$("#datagrid1").datagrid('resize');
			});
});		
		//详情
		function detail(id){
			$('#datagrid1').datagrid('clearSelections');
				var url = rootPath +"/systemlog/systemlog!view.action?id="+id;
				//if(id!=""){
				//	url = url + "?id="+id;
				//}
				//$(window.top.document).find("#btnProjectInfo").click();
				var _dialog =  window.top.$('	<div id ="role-dlg" style="padding:0px;"><iframe id="departmentinfoFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
				//window.top.document.body.appendChild(win);
				_dialog.dialog({
					title:'部门详情',
					maximizable:true,
					autoOpen:false,
					modal:true,
					closed:true,
					width:'300',
					height:'250',
					shadow:true
				});
				_dialog.dialog('open');
			}
		
		//单条删除
		function del(uid,rowIndex){
			$('#datagrid1').datagrid('clearSelections');
			$('#datagrid1').datagrid('selectRow',rowIndex);
				if(window.confirm('是否删除？')){
					$.post(rootPath +"/systemlog/systemlog!deleteEntity.action",{id:uid},function(del){
						if(del=='success'){
							$('#datagrid1').datagrid('clearSelections');
							$("#datagrid1").datagrid('reload');
							alert('成功');
						}
						
					});
				}
		}
		
		//批量删除	
		function delAll(){
			var selected=$("#datagrid1").datagrid('getSelections');
			if(selected==null || selected.length< 1){
				alert('请至少选择一条记录！');
			}
			else{
				if(window.confirm('是否删除？')){
					var cc="";
					for ( var i = 0; i < selected.length; i++) {
						if(cc==""){
							cc=selected[i]['logid'];
						}
						else{
							cc+=","+selected[i]['logid'];
							}
					}
					$.post(rootPath +"/systemlog/systemlog!deleteEntity.action",{id:cc},function(del){
						if(del=='success'){
							$('#datagrid1').datagrid('clearSelections');
							$("#datagrid1").datagrid('reload');
							alert('成功');
						}
					});
					
				 }
			}
		}
		
		//查询
		function query(){
			var startime=$("#startime").val();
			var endtime=$("#endtime").val();
			var realname=$("#realname").val();
			$('#datagrid1').datagrid( {
				queryParams : {
				realname : realname,
				endtime:endtime,
				startime:startime
				},
				pageNumber:1		
			});
		}
		//清除所有数据
		function delAllData(){
			var selected=$("#datagrid1").datagrid('getRows');
			if(selected.length>0){
				if(window.confirm('是否清空？')){
					$.post(rootPath +"/systemlog/systemlog!deleteAllEntity.action",{},function(del){
							if(del=='success'){
								$('#datagrid1').datagrid('clearSelections');
								$("#datagrid1").datagrid('reload');
								alert('成功');
							}
						});
				
				}
			}else{
				alert("没有日志");
			}
		}
