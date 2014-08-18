//wjy~~

$(function(){
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
					{	field : 'userid',
						title : '&nbsp;',
						width : 30,
						align : 'center',
						formatter : function(value){
							return "<input type='radio' name='radio'/>";}
					}
					]],
				columns:[[
				        {field:'departname',title:'部门',width:140,align:"center"}	,	
						{field:'realname',title:'姓名',width:140,align:"center"}					
				]],
				onClickRow:function(){
					var selected=$("#datagrid1").datagrid('getSelected');
					checkRadio();
					$("#selectedUser").val(selected['realname']);
					$("#selectedUserid").val(selected['userid']);
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
		function query() {
			var deptid = $("#deptidnames").val();//部门id
			var selectedUser = $("#selectedUser").val();//人员姓名
			$('#datagrid1').datagrid( {
				queryParams : {
				deptid : deptid,
				realname : selectedUser
				},
				pageNumber : 1  //查询后指定页码为1
			});
		}
		