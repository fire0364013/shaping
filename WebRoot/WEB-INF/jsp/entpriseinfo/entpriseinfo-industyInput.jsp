<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ include file="/common/taglibs.jsp"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
		<title>企业信息编辑</title>

		<link rel="stylesheet" href="${ctx}/themes/default/easyui.css"	type="text/css" />
		<link rel="stylesheet" type="text/css" href="${ctx}/themes/icon.css">
		<link rel="stylesheet" type="text/css"	href="${ctx}/validate/validate.css">
		<script type="text/javascript" src="${ctx}/js/jquery-1.7.2.min.js"></script>
		<script type="text/javascript" src="${ctx}/js/jquery.easyui.min.js"></script>
		<script type="text/javascript" src="${ctx}/js/easyui-lang-zh_CN.js"></script>
		<script type="text/javascript" src="${ctx}/validate/input.validate.js"></script>
		<script language="javascript" >
		var rootPath="${ctx}";
		$(document).ready(function(){
				parentIndustryData();		
				/*var entidVal = $("#entid").val();
				if(entidVal!=""){
					cityData();
					regionData();
				}*/
				$("#parentIndustry").change(function(){
					$("#sonIndustry").html('');
					$("#grandsonIndustry").html('');
					$("#parentIndustryVal").val($("#parentIndustry").val());
					//alert($("#parentIndustry").val());
	               	sonIndustryData();
	            });
				$("#sonIndustry").change(function(){	
				   $("#grandsonIndustry").html('');
				   $("#sonIndustryVal").val($("#sonIndustry").val());
	               grandsonIndustryData();
	            });
				$("#grandsonIndustry").change(function(){	
				   $("#grandsonIndustryVal").val($("#grandsonIndustry").val());
	            });
		});		
		</script>	
		<script type="text/javascript" src="${ctx}/lims/js/entpriseinfo.js"></script>
		
	</head>
	<body onkeydown="PreventBSK();">
		<s:form action="entpriseinfo!save" id="industryForm" method="post" theme="simple">
			<table width="100%" border="1" align="center" class="grid">
				<tr>					
					<td align="left" class="Main_Tab_Style_title"
						style="width: 150px; height: 20px;">
						行业类型一级：
					</td>
					<td align="left" class="Main_Tab_Style_Content" width="170px">
						<input type="hidden" id="parentIndustryVal" name="parentIndustryVal" value="">
						<select  multiple class="TextBox"  id="parentIndustry" name="parentIndustry"  Style="width: 150px;height:310px">
						</select>						
					</td>
						
					<td align="left" class="Main_Tab_Style_title"
						style="width: 150px; height: 20px;">
						行业类型二级：
					</td>
					<td align="left" class="Main_Tab_Style_Content" width="170px">
						<input type="hidden" id="sonIndustryVal" name="sonIndustryVal" value="">
						<select  multiple class="TextBox"  id="sonIndustry" name="sonIndustry"  Style="width: 150px;height:310px">
						</select>						
					</td>
				
					<td align="left" class="Main_Tab_Style_title"
						style="width: 150px; height: 20px;">
						行业类型三级：
					</td>
					<td align="left" class="Main_Tab_Style_Content" width="170px">
						<input type="hidden" id="grandsonIndustryVal" name="grandsonIndustryVal" value="">					
						<select  multiple class="TextBox"  id="grandsonIndustry" name="grandsonIndustry"  Style="width: 150px;height:310px">
						</select>						
					</td>
				</tr>		
				</table>		
			</s:form>
	</body>
</html>
