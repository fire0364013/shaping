<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="/common/taglibs.jsp"%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<title>库存管理</title>
		
		<link rel="stylesheet" href="${ctx}/themes/default/easyui.css"
			type="text/css" />
		<link rel="stylesheet" type="text/css" href="${ctx}/themes/icon.css">
		<script type="text/javascript" src="${ctx}/js/jquery-1.7.2.min.js"></script>
		<script type="text/javascript" src="${ctx}/js/jquery.easyui.min.js"></script>
		<script type="text/javascript" src="${ctx}/js/easyui-lang-zh_CN.js"></script>
		</head>
		<script type="text/javascript">
			var rootPath = "${ctx}";
			//写下载
			function download(filename){
				var name=encodeURIComponent(encodeURIComponent(filename.toString()));
				$.ajax({
					type: "POST",
					url: rootPath +"/material/standardinventory/standardinventory!downLoad.action",
					data: "path="+name+"&flg=0",
					processData :false,
					success:function(data){
						if(data=="fail"){
							alert("文件不存在！");
						}else{
							var urlParmDown=rootPath +"/material/standardinventory/standardinventory!downLoad.action?path="+name+"&flg=1";
							/*$("#form").attr("action",urlParmDown);
							$("#form").submit();*/
							$("#methoddownload").attr("action",urlParmDown);
							$("#path").val(name);
							$("#methoddownload").submit();
						}
					},
					error:function(data){
						alert("服务器正在维修，请稍后！");
					}
				});
			}
	 </script>
	<body>
	<form id="certificateinfoform" >
		<div id="dlg-buttons">
			<input type="hidden" name="inventoryid" id="inventoryid"value="${inventoryid }" />
				<table border="1" align="center" class="grid">
					<tr>
					<td align="left" class="Main_Tab_Style_title"
						style="width: 100px; height: 20px;">
						标准物质名称：
					</td>
					<td align="left" class="Main_Tab_Style_Content" style="width: 200px; height: 20px;">
						<input type="text" name="materialname" id="materialname"
						readonly="readonly"	class="TextBox"  disabled="disabled"
						value="${material.materialname}"  style="width: 200px;; height: 20px;" /> 
					</td>
					<td align="left" class="Main_Tab_Style_title"
						style="width: 100px; height: 20px;">
						规格型号：
					</td>
					<td align="left" class="Main_Tab_Style_Content" width="200px;">
					<input type="text"  name="modelname"  class="TextBox"   value="${materialmodel.modelname}" style="width: 200px;; height: 20px;" disabled="disabled"/>
					</td>
				</tr>
				<tr>
					<td align="left" class="Main_Tab_Style_title"
						style="width: 100px; height: 20px;">
						批号：
					</td>
					<td align="left" class="Main_Tab_Style_Content">
						<input type="text" name="batchno" value="${batchno}" disabled="disabled"  class="TextBox"  
							style="width: 200px;; height: 20px;" />
					</td>
					<td align="left" class="Main_Tab_Style_title"
						style="width: 100px; height: 20px;">
						稀释倍数：
					</td>
					<td align="left" class="Main_Tab_Style_Content">
						<input type="text" name="dilutionmultiple"  class="TextBox"  
							value="${dilutionmultiple}"  disabled="disabled" style="width: 200px;;" />
					</td>
					
				</tr>
				<tr>
					<td align="left" class="Main_Tab_Style_title"
						style="width: 100px; height: 20px;">
						浓度：
					</td>
					<td align="left" class="Main_Tab_Style_Content"  colspan="3">
						<input type="text" name="consistence"
							value="${consistence}" disabled="disabled"
							class="TextBox " style="width: 505px;" /> 
							
					</td>
				</tr> 
				<tr>
					<td align="left" class="Main_Tab_Style_title"
						style="width: 100px; height: 20px;">
						不确定度：
					</td>
					<td align="left" class="Main_Tab_Style_Content"   colspan="3" >
						<input type="text" name="uncertainty"
							value="${uncertainty}" class="TextBox " disabled="disabled"	
							style="width: 505px;" />
					</td>
					</tr>
					<tr>
				<td align="left" class="Main_Tab_Style_title" 	style="width: 100px; height: 20px;">
					浓度单位：
				</td>
					<td align="left"  class="Main_Tab_Style_Content">
					<input type="text"  name="unitname"  class="TextBox"   value="${unitname}" style="width: 200px;; height: 20px;" disabled="disabled"/>
			
				</td>
				<td align="left" class="Main_Tab_Style_title"
				style="width: 100px; height: 20px;">
				保管人：
				</td>
				<td align="left" class="Main_Tab_Style_Content">
							<input type="text" name="useperson" id="useperson" class="TextBox"  value="${userinfo.realname }"  disabled="disabled"
	                           style="width: 200px;; height: 20px;" />
					 
				</td>
				</tr>
				<tr>
					<td align="left" class="Main_Tab_Style_title"
						style="width: 100px; height: 20px;">
						失效日期：
					</td>
					<td align="left" class="Main_Tab_Style_Content">
						<input type="text" name="expirationdate" 
							class="TextBox" disabled="disabled"
							value="${expirationdate}" style="width: 200px;;" />
					</td>
					<td align="left" class="Main_Tab_Style_title"
							style="width: 100px; height: 20px;">
							仓库：
						</td>
					 <td align="left" class="Main_Tab_Style_Content">
						<input type="text" name="providername" id="providername"
								class="TextBox" disabled="disabled" value="${warehouseid.warehousename }"
								style="width: 200px; height: 20px;" /> 
				 	</td>
				</tr>
				<tr>
				<td align="left" class="Main_Tab_Style_title"
						style="width: 100px; height: 20px;">
						入库数量：
					</td>
					<td align="left" class="Main_Tab_Style_Content">
						<input type="text" name="storagenum"
							value="${storagenum}"	class="TextBox" disabled="disabled"
								 style="width: 200px;;" /> 
					</td>
				<td align="left" class="Main_Tab_Style_title"
						style="width: 100px; height: 20px;">
						剩余数量：
					</td>
					<td align="left" class="Main_Tab_Style_Content" style="width: 200px; height: 20px;" >
						<input type="text" name="remainingnum" id="remainingnum" disabled="disabled"
						class="TextBox "  style="width: 200px;; height: 20px;"  value="${remainingnum}"/>
						
					</td>
				</tr>
				<tr>
					<td align="left" class="Main_Tab_Style_title"
						style="width: 100px; height: 20px;">
						存放位置：
					</td>
					<td align="left" class="Main_Tab_Style_Content">
						<input type="text" name="depositplace"
								class="TextBox " disabled="disabled"   
							value="${depositplace}"
							style="width: 200px;; height: 20px;" />
					</td>
					<td align="left" class="Main_Tab_Style_title"
						style="width: 100px; height: 20px;">
						存放条件：
					</td>
					<td align="left" class="Main_Tab_Style_Content">
						<input type="text" name="depositcondition"
							class="TextBox " disabled="disabled"
							value="${depositcondition}"
							style="width: 200px;; height: 20px;" />
					</td>
				</tr>
				 <tr>
					<td align="left" class="Main_Tab_Style_title"
						style="width: 100px; height: 20px;">
						入库人：
					</td>
					<td align="left" class="Main_Tab_Style_Content">
						<input type="text" name="storageperson"
								class="TextBox " disabled="disabled"   
							value="${storageperson.realname}"
							style="width: 200px;; height: 20px;" />
					</td>
					<td align="left" class="Main_Tab_Style_title"
						style="width: 100px; height: 20px;">
						入库时间：
					</td>
					<td align="left" class="Main_Tab_Style_Content">
						<input type="text" name="storagetime"
							class="TextBox " disabled="disabled"
							value="${storagetime}"
							style="width: 200px;; height: 20px;" />
					</td>
				</tr>
				<tr>
					<td align="left" class="Main_Tab_Style_title"
						style="width: 100px; height: 20px;">
						供应商：
					</td>
					<td align="left" class="Main_Tab_Style_Content" style="width: 200px; height: 20px;" colspan="3">
						<input type="text" name="providername" id="providername" disabled="disabled"
						class="TextBox"  style="width: 500px; height: 20px;"   value="${providerid.providername}"/>
					 
					</td>
				</tr>
				<tr>
					<td align="left" class="Main_Tab_Style_title"
						style="width: 100px; height: 20px;">
						备注：
					</td>
					<td colspan="3" align="left" class="Main_Tab_Style_Content">
						<textarea class="TextBox "  disabled="disabled"
							style="width:500px; height: 60px;"name="remark">${remark}</textarea>
					</td>
				</tr>
				<tr>
				<td  align="left" class="Main_Tab_Style_title" width="100px">已上传附件：</td>
					<td align="left" class="Main_Tab_Style_Content" style="" colspan="3">
						<div >
							<table style="width: 100%;height: 100%; size: 12px">
							<c:forEach items="${listname}" var="trainperson" varStatus="count" > 
								<tr id="wenjian${count.count}">
								<td align="left" style="color:#1281bb;cursor:pointer;font-size:13px;">
								<a onclick="download('${trainperson.certificateno }','${count.count}')">${trainperson.trainresult }</a></td>
								</tr>
								</c:forEach>
							</table>
						</div>
					</td>
				</tr> 	
				</table>
		</div>
		</form>
		
		<form id="methoddownload" method="post" action ="${ctx}/trainplan/trainrecord/trainrecord!downLoad.action">
		<input type="hidden" value="1" name="flg"/>
		<input type="hidden" value="" name="path" id="path"/>
	</form>
	</body>
</html>
