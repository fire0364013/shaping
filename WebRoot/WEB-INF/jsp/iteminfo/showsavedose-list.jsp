<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="/common/taglibs.jsp"%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<title>保存剂</title>
			<link rel="stylesheet" href="${ctx}/themes/default/easyui.css"
			type="text/css" />
		<link rel="stylesheet" type="text/css" href="${ctx}/themes/icon.css">
		<script type="text/javascript" src="${ctx}/js/jquery-1.7.2.min.js"></script>
		<script type="text/javascript" src="${ctx}/js/jquery.easyui.min.js"></script>
		<script type="text/javascript" src="${ctx}/js/easyui-lang-zh_CN.js"></script>
		<script type="text/javascript" src="${ctx}/validate/input.validate.js"></script>
		<!-- 本jsp的脚本引用__wjy -->
		<script type="text/javascript">	
			var rootPath="${ctx}";
			$(function(){
				$('#savedosegrid').datagrid(
					{
						radio:true,
						singleSelect:true,
						nowrap : false,
						striped : true,
						collapsible : true,
						url : rootPath+'/savedose/savedose!toList.action',
						sortName : 'savedoseid',
						sortOrder : 'asc',
						remoteSort : false,
						fit : true,
						fitColumns : true,
						scrollbarSize : 0,
						pageSize : 20,
						pageList : [ 20, 30, 40, 50 ],
						frozenColumns : [ [ {	field : 'savedoseid',
							title : '&nbsp;',
							width : 30,
							align : 'center',
							formatter : function(value){
								return "<input type='radio' name='radio' value=''/>";
							}
						} ] ],
						columns : [ [
								{
									field : 'savedosename',
									title : '保存剂名称',
									width : 280,
									align : 'center'
								},
								{
									field : 'remark',
									title : '备注',
									width : 280,
									align : 'center'
								}
								] ],
						pagination : true,
						rownumbers : true,
						onClickRow:function(){
							var selected=$("#savedosegrid").datagrid('getSelected');
							checkRadio();
							$("#selectedsavedosename").val(selected['savedosename']);
							$("#selectedsavedoseid").val(selected['savedoseid']);
						}
					});
				$(window).resize(function() {
					$("#savedosegrid").datagrid('resize');
				});
			});
			// 查询
			function query() {
				var savedosername = $("#savedosername").val();
				$('#savedosegrid').datagrid( {
					queryParams : {
					savedosername : savedosername
					},
					pageNumber : 1
				});
			}
			
			function checkRadio(){
					var row = $('#savedosegrid').datagrid('getSelected');
					var rowNum = 0;
					var rows = $('#savedosegrid').datagrid('getRows');
					for ( var i = 0; i < rows.length; i++) {
						if (row == rows[i]) {
							rowNum = i;
							break;
						}
					}
					var radios = $("input[type=radio]");
					$(radios[rowNum]).attr("checked", true);
				}
		</script>
	</head>
	<body>
		<div  style="height: 30px; size: 12px">
			<div>
				<table class="Main_Tab_Style" style="width: 100%; height: 22px">
					<tr>
						<td class="Main_Tab_Style_title"	style="width: 10%; text-align: left;">
							保存剂名称：
						</td>
						<td class="Main_Tab_Style_Content" style="width: 15%;">
							<input type="text" name="savedosername" id="savedosername" class="TextBox"	style="width: 100%;"  />
						</td>
						<td class="Main_Tab_Style_Content"	style="width: 50%; text-align: left;">
							<input type="button" class="Button_out" value="查询" 	onclick="query()" />
						</td>
					</tr>
				</table>
			</div>
		</div>
		
		<div style="height: 368px;">
			<input type="hidden" id="selectedsavedosename" class="TextBox" style="width:99.5%;height:20px;" />
			<input type="hidden" id="selectedsavedoseid" class="TextBox" style="width:99.5%;height:20px;" />
			<table id="savedosegrid"></table>
		</div>
	</body>
</html>
