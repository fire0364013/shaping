var options = {};

// JavaScript Document
$(function(){
	//var itemtype = getSelectData("TYPE_ID", "NAME","T_LM_BAS_TYPE", " 1=1 ");
	//$("#itemtype").append(itemtype);
//	var qctype = getSelectData("QCTYPEID", "QCSAMPLETYPENAME","t_lm_qcsampletype", " QCCATEGORY=2 ");
//	$("#qcsampletype").append(qctype);	
	searchtemplet();
});
 
function searchtemplet() {
//	var qctypeid = $("#qcsampletype").val();
//	if(qctypeid == ""){
//		alert("请选择质控类型");
//		return ;
//	}
//	var times = $("#times").val();
//	if(times == "" ){
//		alert("请选择质控样时间");
//		return false;
//	}
//	var typeid = $("#itemtype").val();
//	if(typeid == ""){
//		alert("请选择项目类型");
//		return false;
//	}
	$.ajax({
		url : path + "/sampletest/batch/qcsample!templet2.action",
		data : {qctypeid : qctypeid,flag:flag},
		async : false,
		type : "post",
		dataType : "json",
		success : function(data) {
//			excelTempId=qctypeid;
			var co = "[[";
			co = co + data + "]]";
			options.columns = eval(co);
			var colum =  eval(co);
			//options.url = path + '/qcsample/queryData2.do?qctypeid='+ qctypeid+'&itemid='+itemid+'&batchno='+batchno;
			var vurl = path + '/sampletest/batch/qcsample!queryData2.action?qctypeid='+ qctypeid+'&itemid='+itemid+'&batchno='+batchno;
			initdatagrid(vurl,colum);
			//$('#tableData').datagrid(options);
		},
		error : function() {
			alert("获取动态模板失败！");
		}
	});
}

function initdatagrid(vurl,colum){
//	var year = $("#qcyearid").val();
//	var times = $("#times").val();
//	if(times == "" ){
//		alert("请选择质控样时间");
//		return false;
//	}
//	var season = $("#seasons").val();
//	var month = $("#months").val();
//	var typeid = $("#itemtype").val();
//	if(typeid == ""){
//		alert("请选择项目类型");
//		return false;
//	}
	var qcsample = $("#qcsampletype").val();
	if(qcsample == ""){
		alert("请选择质控类型");
		return false;
	}
	$('#tableData').datagrid({
		//title:'质控样评价列表',
		url:vurl,
		nowrap: false,
		striped: true,
		collapsible:true,
		border : "true",			
		fit:true,
		fitColumns : true,
		scrollbarSize:0,
		remoteSort: false,
		singleSelect:true,
		pageSize:20,
		pageList:[20,30,40,50],
		/*queryParams : {
			//year:year,
			//season:season,
			//month:month,
			//typeid:typeid,
			qcsample:qcsample
//			itemid:itemid,
//			batchno:batchno
			},*/
		columns : colum,//[ [] ],	
		pagination:true,
		//rownumbers:true
		rowStyler: function(index,row){
			if (row.judgeResult!='' && row.judgeResult=='不合格'){
				return 'background-color:#F70909;';//color:#fff;';
			}
		}
		
//		,rowStyler:function(rowIndex,rowData){
//			if(rowData.issubmit!=null&&rowData.issubmit!=''){
//				if(rowData.issubmit!='' && rowData.issubmit=='yes'){
//					return "color:red;";//background-color:#FFFF00
//				}
//			}
//		}

		
	});
	$(window).resize(function() {
		$("#tableData").datagrid('resize');
	});
}

//得到下拉列表数据
function getSelectData(id, name, tables, wh) {
	var dataObj;
	$.ajax({
		url : path + "/monitoringInfo/getSelectData.do",
		data : {
			id : id,
			name : name,
			tables : tables,
			wh : wh
		},
		async : false,
		type : "post",
		dataType : "json",
		success : function(data) {
			dataObj = data;
		},
		error : function() {
			alert("加载下拉列表时出现未知错误！");
		}
	});
	// 返回select里面的option字符串
	var str = "";
	for ( var i = 0; i < dataObj.length; i++) {
		str += "<option value='" + dataObj[i].id + "'>" + dataObj[i].name
				+ "</option>";
	}
	return str;
}

