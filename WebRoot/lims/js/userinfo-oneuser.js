	$(function(){
			$('#tree').tree({
				url:rootPath+"/oamuser/oneandmanyuser!toTrees.action",
				onClick:function(node){
				var selecteddeparname=node.text;
				var selecteddeparid=node.id;
				$("#selecteddeparname").val(selecteddeparname);
				$("#selecteddeparid").val(selecteddeparid);
				
				
					var myurl=rootPath+"/oamuser/oneandmanyuser!toOneAndManyList.action?deptid="+node.id;
					getDatas(myurl);
					}
				
			});
			
			getDatas(rootPath+"/oamuser/oneandmanyuser!toOneAndManyList.action");
		});

		function getDatas(myurl){
			$('#datagrid1').datagrid({
				title:'人员列表',
				singleSelect:true,
				nowrap: false,
				striped: true,
				collapsible:true,
				url:myurl,
				fit:true,
				fitColumns:true,
				scrollbarSize:0,
				remoteSort: false,
				idField:'userid',
				pageSize:10,
				pageList:[10,20,30,40],
				frozenColumns:[[
					{	field : 'id',
						title : '&nbsp;',
						width : 30,
						align : 'center',
						formatter : function(value){
							return "<input type='radio' name='radio'/>";}
					}
							]],
				columns:[[
						{field:'realname',title:'姓名',width:140,align:"center"}					
				]],
				onSelect:function(){
					var selected=$("#datagrid1").datagrid('getSelected');
					checkRadio();
					$("#selectedUser").val(selected['realname']);
					$("#selectedUserid").val(selected['userid']);
				},
				onLoadSuccess:function(){
					var value=$("#selectedUser").val();
					var valueids=$("#selectedUserid").val();
					var valueid=$("#selectedUserid").val().split(",");
					
					//alert(valueids);
					if(valueids!=null&&valueids!=""){
						for ( var i = 0; i < valueid.length; i++) {
							//alert(valueid[i]);
							var rows = $('#datagrid1').datagrid('selectRecord',valueid[i]);
						}
						
					}
				},
				pagination:true,
				rownumbers:true
				
				
			});			
			}
		function checkRadio(){
			var row = $('#datagrid1').datagrid('getSelected');
			var rowNum = 0;
			var rows = $('#datagrid1').datagrid('getRows');
			for ( var i = 0; i < rows.length; i++) {
				if (row == rows[i]) {
					rowNum = i;
					break;
				}
			}
			var radios = $("input[type=radio]");
			$(radios[rowNum]).attr("checked", true);
		}
		
		//查询
	function query(){
		var username=$("#username").val();
		$('#datagrid1').datagrid( {
			queryParams : {
			usernametest : username
			},
			pageNumber:1		
		});
	}
