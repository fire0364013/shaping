<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="/common/taglibs.jsp"%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<title>容器</title>
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
				$('#containergrid').datagrid(
					{
						radio:true,
						singleSelect:true,
						nowrap : false,
						striped : true,
						collapsible : true,
						url : rootPath+'/container/container!toList.action',
						sortName : 'containerid',
						sortOrder : 'asc',
						remoteSort : false,
						fit : true,
						fitColumns : true,
						scrollbarSize : 0,
						pageSize : 10,
						pageList : [ 10, 20, 30, 40 ],
						frozenColumns : [ [ {	field : 'containerid',
							title : '&nbsp;',
							width : 30,
							align : 'center',
							formatter : function(value){
								return "<input type='radio' name='radio' value=''/>";
							}
						} ] ],
						columns : [ [
								{
									field : 'containername',
									title : '容器名称',
									width : 120,
									align : 'center'
								},
								{
									field : 'tag',
									title : '容器标识符',
									width : 100,
									align : 'center'
								}
								 ] ],
						pagination : true,
						rownumbers : true,
						onClickRow:function(){
							var selected=$("#containergrid").datagrid('getSelected');
							checkRadio();
							$("#selectedcontainername").val(selected['containername']);
							$("#selectedcontainerid").val(selected['containerid']);
						}
					});
				$(window).resize(function() {
					$("#containergrid").datagrid('resize');
				});
			});
			// 查询
			function query() {
				var containername = $("#containername").val();
				$('#containergrid').datagrid( {
					queryParams : {
					containername : containername
					},
					pageNumber : 1
				});
			}
				function checkRadio(){
					var row = $('#containergrid').datagrid('getSelected');
					var rowNum = 0;
					var rows = $('#containergrid').datagrid('getRows');
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
							容器名称：
						</td>
						<td class="Main_Tab_Style_Content" style="width: 15%;">
							<input type="text" name="containername" id="containername" class="TextBox"	style="width: 100%;"  />
						</td>
						<td class="Main_Tab_Style_Content"	style="width: 50%; text-align: left;">
							<input type="button" class="Button_out" value="查询" 	onclick="query()" />
						</td>
					</tr>
				</table>
			</div>
		</div>
		<div style="height: 365px;">
			<input type="hidden" id="selectedcontainername" class="TextBox" style="width:99.5%;height:20px;" />
			<input type="hidden" id="selectedcontainerid" class="TextBox" style="width:99.5%;height:20px;" />
			<table id="containergrid"></table>
		</div>
	</body>
</html>
