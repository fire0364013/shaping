//数据采集
function dataCapture(){
	var isDeleteFile = false;
	$.messager.confirm("删除文件","采集完成后，是否删除数据文件？",function(r){
		if(r){
			isDeleteFile = true;
		}
		
		$(window.document.body).block({ 
			message: "正在加载数据,请稍候...", 
	 		css: {
				color:'#000', 
				padding: '15px', 
				border:'2px solid #90dbfe',
				backgroundColor:'#fafafa'
			},
			overlayCSS: {
				opacity:'0.1' 
			}
		});
	
		$.ajax({
			type:'POST',
			url:rootPath +'/datacollection/datacollection!collectionSampleData.action',
			data:'batchno='+batchno+"&info="+isDeleteFile,
			success:function(msg){
				if(msg=="success"){
					alert("数据采集成功！");
					initHtml('existLoadDiv');
				}else if(msg=="The capturemethod is't existed"){
					alert("该仪器无数据采集方法！");
				}else if(msg=="No capturefile"){
					alert("没有数据文件！");
				}else{
					alert("数据采集失败！");
				}
				$(window.document.body).unblock();
			},
			error:function(){
				$(window.document.body).unblock();
			}
		});
	});
	
	//$('#originaldataFrame').attr('src','${pageContext.request.contextPath}/sampletest/sampletestbybatch!toOriginalDataEntry.action?itemid=${itemid}&methodid=${methodid}&batchno=${batchno}');			
}

/**
 * 批量添加平行
 */
function addParallel(){ 
	var	sampleitemtestids="";//样品编号编码   
	 $("#quxiandatalist tr").each(function(){
		 var temp = $(this).attr("id");
		 var arr = temp.split(",");
		 if(arr.length>2){
			var tempSamid=arr[0];
			var qctypeid = arr[2];
			if(qctypeid=='0'||(qctypeid!='' && qctypeid=='4')){
				sampleitemtestids = sampleitemtestids + tempSamid + ",";
			}
		 }
	 });
	
	if(sampleitemtestids!=""){ 
		sampleitemtestids = sampleitemtestids.substring(0,sampleitemtestids.length-1);
	 	$.post(
			rootPath + "/sampletest/sampletestbybatch!addParallel.action?sampleitemtestids="+sampleitemtestids, function(data) {
			if (data == 'success') {
				alert("添加成功!");
				initHtml();
			}else{
				alert("添加失败!");
			}
		});  
	}else{
		alert("请选择一个普通样或空白样！")
	}
}

function autoFullData(domObject,columnIndex){
	if(confirm("是否填充数据？"))
	{//header
		var nextObject=$(domObject).closest(".header").siblings("*~tr[class='content']");//$(domObject).closest(".header").siblings("*~tr[class='content']");//$(domObject).closest(".grid-header").siblings("*~tr[class='grid-body']");
		var inputVal=new Array();
		var isTrue = 'false';
		var temp = "";
		for(var i=0;i<$(nextObject).length;i++)
		{
			
			var findTD="td:eq("+(columnIndex-1).toString()+")";
			//alert(findTD);
			if(i==0)
			{	
				var inputDom=$(nextObject).eq(i).find(findTD.toString()).find("select").length;//$(nextObject).eq(i).find(findTD.toString()).find("input");
				if(inputDom!='' && inputDom!=null && inputDom!="undifined"){
					if(isTrue=='false'){
						isTrue = 'true';
						temp = $(nextObject).eq(i).find(findTD.toString()).find("select option:selected").val();
						//alert(temp);
					}
				}else /*if($(nextObject).eq(i).find(findTD.toString()).find("input")!='' && 
						$(nextObject).eq(i).find(findTD.toString()).find("input")!=null &&
						$(nextObject).eq(i).find(findTD.toString()).find("input")!="undifined")*/{
					inputDom = $(nextObject).eq(i).find(findTD.toString()).find("input");
					
					for(var j=0;j<$(inputDom).length;j++)
					{
						var fillValue=$(inputDom).eq(j).val();
						//alert(fillValue);
						if(fillValue==null||fillValue=="undifined"||fillValue=="")
						{
							inputVal=[];
						}
						else
						{
							inputVal.push(fillValue);
						}
					}
					if(inputVal.length==0)
					{
						//alert($(nextObject).length);
						alert("请在当前列下的第一个输入框（列表）中输入（选择）填充的值！");
						break;
					}
				}
			}
			else
			{//alert(isTrue);
				var inputDom="";
				if(isTrue=='false'){
					inputDom = $(nextObject).eq(i).find(findTD.toString()).find("input");
					for(var j=0;j<$(inputDom).length;j++)
					{
						$(inputDom).eq(j).val(inputVal[j]);
					}
				}else{
					inputDom = $(nextObject).eq(i).find(findTD.toString()).find("select option");
					//alert($(inputDom).length);
					/*for(var j=0;j<$(inputDom).length;j++)
					{
						$(inputDom).eq(j).val(inputVal[j]);
					}*/
					 $(inputDom).each(function(){
			            if($(this).val()==temp)
						{
						    $(this).attr("selected","selected"); 
						} 
				    });
				}
			}
		}
	}
}
function initHtml(msgDiv){//alert("原始数据");
	if(msgDiv!='existLoadDiv'){
		$(window.document.body).block({ 
				message: "正在加载数据,请稍候...", 
		 		css: {
					color:'#000', 
					padding: '15px', 
					border:'2px solid #90dbfe',
					backgroundColor:'#fafafa'
				},
				overlayCSS: {
					opacity:'0.1' 
				}
			});
	}
		$.ajax({
			type: "post",
			url: rootPath+"/sampletest/sampletestbybatch!dataEntry.action?itemid="+itemid+"&batchno="+batchno+"&" + new Date().getTime(),
			success: function(msg){
				//alert(msg);
				//var obj = eval('('+msg+')');
				$("#inner1").html('');
				$("#inner1").html(msg); 
//				var i=0;
//				//后台拼的table的单双行的颜色不一样
				//后台拼的table的单双行的颜色不一样
				 $("#quxiandatalist tr").each(function(){
					 var temp = $(this).attr("id");
					 var arr = temp.split(",");
	
					if(arr[1]%2==0){
						$(this).attr("style","background-color:#EEEEFF");
					}else {
						$(this).attr("style","background-color:#FFFFFF");
					}
					$(this).bind("click",function(){
						 $("#quxiandatalist tr").each(function(){
							 var temp2 = $(this).attr("id");
							 var arr2 = temp2.split(",");
	
							if(arr2[1]%2==0){
								$(this).attr("style","background-color:#EEEEFF");
							}else {
								$(this).attr("style","background-color:#FFFFFF");
							}});
						$(this).attr("style","background-color:#FBEC88");
						});
				    });
				//alert($("#inner1").html());
				initGrkjValidate();
				new tabTableInput("quxiandatalist","text");
				
				$(window.document.body).unblock();
				ejiaA1("quxiandatalist","#EEEEFF","#FFFFFF","#D0E5F5","#FBEC88");
				intiTablePasteEvent("quxiandatalist");
			}
		});
}

//暂存
function save7(){
	$("#form1").form('submit',{
			type : 'POST',
			url :rootPath +'/sampletest/sampletestbybatch!temporaryStorage.action',
			onSubmit:function(){
//				$("#openBlock").click();
			},
			success : function(data) {
//				if(data=='success'){
//					alert("暂存成功！");
//					$("#unLockBlock").click();
//					refreshCurrent();
//					initHtml();
//					//$("#reloadPage").click();
//				}else{
//					alert("暂存失败！");
//					$("#unLockBlock").click();
//				}
			}
	} );
}
function del(obj)
{
 	save7();
	var temp = obj.id;
	var arr = temp.split(",");
	if(arr[2]!='0'){
		loadStyle(arr[2]);
	}else{
		loadStyle('');
	}
//  	changecolor();
//	$("tr[id='"+obj.id+"']").attr("style","background-color:#FBEC88");
	addqcsample();
  
    
 }
  //所有html元素id为demo2的绑定此右键菜单
function addqcsample(){
	$('#quxiandatalist').contextMenu('myMenu2', {
      //事件    
      bindings: 
          { 
          'addBlankSample': function(t){//添加空白样
		      	if($("#addBlankSample").attr("disabled")=="disabled"){
					return false;
				}
				if($("#addstandard").attr("disabled")=="disabled"){
					return false;
				}
				if($("#addstandardcheck").attr("disabled")=="disabled"){
					return false;
				}				
				var sampleitemtestid=arr[0];								
				if(sampleitemtestid!=""){
					var url = "?flag=K&sampleitemtestid="+sampleitemtestid+"&qctypeid=4";
					$.post(
						rootPath + "/sampletest/sampletestbybatch!addQcSample.action"+ url, function(data) {
						if (data == 'success') {
							alert("添加成功!");
							refreshCurrent();
							initHtml();
						}else{
							alert("添加失败!");
						}
					});
				}else{
					alert("请选择一个已选样品！")
				}
           },
            'addParallelSample': function(t) {//添加平行样
		      	if($("#addParallelSample").attr("disabled")=="disabled"){
					return false;
				}
				var sampleitemtestid=arr[0];
				if(sampleitemtestid!=""){		
					var url = "?sampleitemtestid="+sampleitemtestid;
					$.post(
						rootPath + "/sampletest/sampletestbybatch!addParallelSample.action"+ url, function(data) {
						if (data == 'success') {
							alert("添加成功!");
							refreshCurrent();
							initHtml();
						}else{
							alert("添加失败!");
						}
					});
				}else{
					alert("请选择一个已选样品！")
				}
            },
            'enterstandardw': function(t) {//添加加标样
		      	if($("#addParallelSample").attr("disabled")=="disabled"){
					return false;
				}
				if($("#enterstandardw").attr("disabled")=="disabled"){
					return false;
				}
				var sampleitemtestid=arr[0];
				var url = "?sampleitemtestid="+sampleitemtestid+"&flag=J";
				$.post(
					rootPath + "/sampletest/sampletestbybatch!isParallelSample.action"+ url, function(data) {
					if (data == 'yes') {
						alert("该样品已添加加标样!");
						return;
					}else{
						addSample3("添加加标样",sampleitemtestid,"5");
					}
				});
			},'addstandard': function(t) {//添加质控样
		      if($("#addstandard").attr("disabled")=="disabled"){
					return false;
				}
				if($("#addstandardcheck").attr("disabled")=="disabled"){
					return false;
				}
				var sampleitemtestid=arr[0];
				if(sampleitemtestid!=""){	
					addSample2("添加质控样",sampleitemtestid,"7");
				}else{
					alert("请选择一个已选样品！")
				}
			},
			'addstandardcheck': function(t) {//添加校准曲线样
		      	if($("#addstandard").attr("disabled")=="disabled"){
					return false;
				}
				if($("#addstandardcheck").attr("disabled")=="disabled"){
					return false;
				}
				var sampleitemtestid=arr[0];
				if(sampleitemtestid!=""){	
					addSample("添加校准曲线检查样",sampleitemtestid,"8");
				}else{
					alert("请选择一个已选样品！")
				}
			},
			'deleteSample': function(t) {//删除样品
				if($("#deleteSample").attr("disabled")=="disabled"){
					return false;
				}
//				alert(1111111111);
		     	if(window.confirm('是否删除？')){
					var sampleitemtestid=arr[0];
					if(sampleitemtestid!=""){	
						var url = "?sampleitemtestid="+sampleitemtestid;
						$.post(rootPath + "/sampletest/sampletestbybatch!deleteSample.action"+ url, function(data) {
							if (data == 'success') {
								alert("删除成功!");
								refreshCurrent();
								initHtml();
							}else{
								alert("删除失败!");
							}
						});
					}else{
						alert("请选择一个已选样品！")
					}
				}
			},
			'showSampleitemrecordDialog': function(t) {//删除空白样
		     	var sampleitemtestid=arr[0];
				if(sampleitemtestid!=""){
					var url = rootPath + "/sampletest/itemtestbackrecord!toSampleitemrecordList.action?sampleitemtestid="+sampleitemtestid;
					var _dialog =  window.top.$('<div id ="ds-dlg" style="padding:0px;"><iframe id="dataSourceFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
					_dialog.dialog({
						title:'审核记录',
						autoOpen:false,
						position:'center',
						modal:true,
						closed:true,
						width:'800',
						height:'500',
						onClose:function(){
							_dialog.dialog("destroy");
						}
					});
					_dialog.dialog('open');	
				}else{
					alert("请选择一个样品！");
				}
			}
          }
    });		
}

function buttonaddqcsample(){
	$("#addQcButton").css('display','');
	$("#addQcButton").dialog({
		title : '添加质控样',
		width : 300,
		height : 250,
		closed : false,
		cache : false,
		modal : true,
		buttons : [{
			text : '确定',
			iconCls:'icon-save',
			handler : function(){
				$('#addQcButton').dialog('close');
			}
		},{
			text : '关闭',
			iconCls:'icon-cancel',
			handler : function() {
				$('#addQcButton').dialog('close');
			}
		}]
	});
}
function addBlankSample(){
	alert("gg");
	var rows = $("#quxiandatalist").datagrid("getSelected");
		if($("#addBlankSample").attr("disabled")=="disabled"){
					return false;
				}
				if($("#addstandard").attr("disabled")=="disabled"){
					return false;
				}
				if($("#addstandardcheck").attr("disabled")=="disabled"){
					return false;
				}				
				var sampleitemtestid=arr[0];								
				if(sampleitemtestid!=""){
					var url = "?flag=K&sampleitemtestid="+sampleitemtestid+"&qctypeid=4";
					$.post(
						rootPath + "/sampletest/sampletestbybatch!addQcSample.action"+ url, function(data) {
						if (data == 'success') {
							alert("添加成功!");
							refreshCurrent();
							initHtml();
						}else{
							alert("添加失败!");
						}
					});
				}else{
					alert("请选择一个已选样品！")
				}

	
//	$('#AddQcButton').click('myMenu2', {
//      //事件    
//      bindings: 
//          { 
//          'addBlankSample': function(t){//添加空白样
//		      	if($("#addBlankSample").attr("disabled")=="disabled"){
//					return false;
//				}
//				if($("#addstandard").attr("disabled")=="disabled"){
//					return false;
//				}
//				if($("#addstandardcheck").attr("disabled")=="disabled"){
//					return false;
//				}				
//				var sampleitemtestid=arr[0];								
//				if(sampleitemtestid!=""){
//					var url = "?flag=K&sampleitemtestid="+sampleitemtestid+"&qctypeid=4";
//					$.post(
//						rootPath + "/sampletest/sampletestbybatch!addQcSample.action"+ url, function(data) {
//						if (data == 'success') {
//							alert("添加成功!");
//							refreshCurrent();
//							initHtml();
//						}else{
//							alert("添加失败!");
//						}
//					});
//				}else{
//					alert("请选择一个已选样品！")
//				}
//           },
//            'addParallelSample': function(t) {//添加平行样
//		      	if($("#addParallelSample").attr("disabled")=="disabled"){
//					return false;
//				}
//				var sampleitemtestid=arr[0];
//				if(sampleitemtestid!=""){		
//					var url = "?sampleitemtestid="+sampleitemtestid;
//					$.post(
//						rootPath + "/sampletest/sampletestbybatch!addParallelSample.action"+ url, function(data) {
//						if (data == 'success') {
//							alert("添加成功!");
//							refreshCurrent();
//							initHtml();
//						}else{
//							alert("添加失败!");
//						}
//					});
//				}else{
//					alert("请选择一个已选样品！")
//				}
//            },
//            'enterstandardw': function(t) {//添加加标样
//		      	if($("#addParallelSample").attr("disabled")=="disabled"){
//					return false;
//				}
//				if($("#enterstandardw").attr("disabled")=="disabled"){
//					return false;
//				}
//				var sampleitemtestid=arr[0];
//				var url = "?sampleitemtestid="+sampleitemtestid+"&flag=J";
//				$.post(
//					rootPath + "/sampletest/sampletestbybatch!isParallelSample.action"+ url, function(data) {
//					if (data == 'yes') {
//						alert("该样品已添加加标样!");
//						return;
//					}else{
//						addSample3("添加加标样",sampleitemtestid,"5");
//					}
//				});
//			},'addstandard': function(t) {//添加质控样
//		      if($("#addstandard").attr("disabled")=="disabled"){
//					return false;
//				}
//				if($("#addstandardcheck").attr("disabled")=="disabled"){
//					return false;
//				}
//				var sampleitemtestid=arr[0];
//				if(sampleitemtestid!=""){	
//					addSample2("添加质控样",sampleitemtestid,"7");
//				}else{
//					alert("请选择一个已选样品！")
//				}
//			},
//			'addstandardcheck': function(t) {//添加校准曲线样
//		      	if($("#addstandard").attr("disabled")=="disabled"){
//					return false;
//				}
//				if($("#addstandardcheck").attr("disabled")=="disabled"){
//					return false;
//				}
//				var sampleitemtestid=arr[0];
//				if(sampleitemtestid!=""){	
//					addSample("添加校准曲线检查样",sampleitemtestid,"8");
//				}else{
//					alert("请选择一个已选样品！")
//				}
//			},
//			'deleteSample': function(t) {//删除样品
//				if($("#deleteSample").attr("disabled")=="disabled"){
//					return false;
//				}
////				alert(1111111111);
//		     	if(window.confirm('是否删除？')){
//					var sampleitemtestid=arr[0];
//					if(sampleitemtestid!=""){	
//						var url = "?sampleitemtestid="+sampleitemtestid;
//						$.post(rootPath + "/sampletest/sampletestbybatch!deleteSample.action"+ url, function(data) {
//							if (data == 'success') {
//								alert("删除成功!");
//								refreshCurrent();
//								initHtml();
//							}else{
//								alert("删除失败!");
//							}
//						});
//					}else{
//						alert("请选择一个已选样品！")
//					}
//				}
//			},
//			'showSampleitemrecordDialog': function(t) {//删除空白样
//		     	var sampleitemtestid=arr[0];
//				if(sampleitemtestid!=""){
//					var url = rootPath + "/sampletest/itemtestbackrecord!toSampleitemrecordList.action?sampleitemtestid="+sampleitemtestid;
//					var _dialog =  window.top.$('<div id ="ds-dlg" style="padding:0px;"><iframe id="dataSourceFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
//					_dialog.dialog({
//						title:'审核记录',
//						autoOpen:false,
//						position:'center',
//						modal:true,
//						closed:true,
//						width:'800',
//						height:'500',
//						onClose:function(){
//							_dialog.dialog("destroy");
//						}
//					});
//					_dialog.dialog('open');	
//				}else{
//					alert("请选择一个样品！");
//				}
//			}
//          }
//	
//    });		
}
function changecolor(){
	   $("#quxiandatalist tr").each(function(){
		    var temp = $(this).attr("id");
			 var arr = temp.split(",");

			if(arr[1]%2==0){
				$(this).attr("style","background-color:#EEEEFF");
			}else {
				$(this).attr("style","background-color:#FFFFFF");
			}
/*			if($(this).attr("id")%2==0){
				$(this).attr("style","background-color:#E0ECFF");
			}else {
				$(this).attr("style","background-color:#fafafa");
			}
*/		});
}
function loadStyle(qctypeid){
	if(qctypeid!=''){
	  /*4	空白样	2
		5	加标样	2
		6	平行样	2
		7	质控样	2
		8	校准曲线检查样	2*/
		if(qctypeid=='4'){
			//添加空白样
			//$('#addBlankSample').removeAttr("disabled");
			//$('#addBlankSample').removeClass("disable");
			//添加质控样
			$('#addstandard').removeAttr("disabled");
			$('#addstandard').removeClass("disable");
			//添加校准曲线样
			$('#addstandardcheck').removeAttr("disabled");
			$('#addstandardcheck').removeClass("disable");
			//添加平行样
			$('#addParallelSample').removeAttr("disabled");
			$('#addParallelSample').removeClass("disable");
			//添加加标样,不可操作
			$('#enterstandardw').attr({disabled:"disabled"});
			$('#enterstandardw').addClass("disable");
			//质控样品删除
			$('#deleteSample').removeAttr("disabled");
			$('#deleteSample').removeClass("disable");
		}if(qctypeid=='7' ||qctypeid=='8'){
			//添加空白样
			//$('#addBlankSample').removeAttr("disabled");
			//$('#addBlankSample').removeClass("disable");
			//添加质控样
			$('#addstandard').removeAttr("disabled");
			$('#addstandard').removeClass("disable");
			//添加校准曲线样
			$('#addstandardcheck').removeAttr("disabled");
			$('#addstandardcheck').removeClass("disable");
			//添加平行样,不可操作
			$('#addParallelSample').attr({disabled:"disabled"});
			$('#addParallelSample').addClass("disable");
			//添加加标样,不可操作
			$('#enterstandardw').attr({disabled:"disabled"});
			$('#enterstandardw').addClass("disable");
			//质控样品删除
			$('#deleteSample').removeAttr("disabled");
			$('#deleteSample').removeClass("disable");
		}else if(qctypeid=='5'){	
			//添加空白样,可操作
			//$('#addBlankSample').removeAttr("disabled");
			//$('#addBlankSample').removeClass("disable");
			//添加质控样
			$('#addstandard').removeAttr("disabled");
			$('#addstandard').removeClass("disable");
			//添加校准曲线样
			$('#addstandardcheck').removeAttr("disabled");
			$('#addstandardcheck').removeClass("disable");
			//添加平行样,不可操作
			$('#addParallelSample').attr({disabled:"disabled"});
			$('#addParallelSample').addClass("disable");
			//添加加标样,不可操作
			$('#enterstandardw').attr({disabled:"disabled"});
			$('#enterstandardw').addClass("disable");
			//质控样品删除
			$('#deleteSample').removeAttr("disabled");
			$('#deleteSample').removeClass("disable");
		}else if(qctypeid=='6'){
			//添加空白样,不可操作
			//$('#addBlankSample').removeAttr("disabled");
			//$('#addBlankSample').removeClass("disable");
			//添加质控样
			$('#addstandard').removeAttr("disabled");
			$('#addstandard').removeClass("disable");
			//添加校准曲线样
			$('#addstandardcheck').removeAttr("disabled");
			$('#addstandardcheck').removeClass("disable");
			//添加平行样,不可操作
			$('#addParallelSample').attr({disabled:"disabled"});
			$('#addParallelSample').addClass("disable");
			//添加加标样,不可操作
			$('#enterstandardw').attr({disabled:"disabled"});
			$('#enterstandardw').addClass("disable");
			
			//质控样品删除
			$('#deleteSample').removeAttr("disabled");
			$('#deleteSample').removeClass("disable");
		}
	}else{																		
		//添加空白样
		$('#enterstandardw').removeAttr("disabled");
		$('#enterstandardw').removeClass("disable");
		//添加平行样
		$('#addParallelSample').removeAttr("disabled");
		$('#addParallelSample').removeClass("disable");
		//添加加标样
		$('#enterstandardw').removeAttr("disabled");
		$('#enterstandardw').removeClass("disable");
		//添加质控样
		$('#addstandard').removeAttr("disabled");
		$('#addstandard').removeClass("disable");
		//添加校准曲线样
		$('#addstandardcheck').removeAttr("disabled");
		$('#addstandardcheck').removeClass("disable");
		
		//原样品不允许删除,不可操作
		$('#deleteSample').attr({disabled:"disabled"});
		$('#deleteSample').addClass("disable");
	}
}
//，校准曲线样
function addSample(title,sampleitemtestid,qctypeid){
		var url = rootPath + "/sampletest/sampletestbybatch!toAddQcSample.action";
		if(sampleitemtestid!=""){
			url = url + "?sampleitemtestid="+sampleitemtestid+"&qctypeid="+qctypeid;
		}
		var _dialog =  window.top.$('<div id ="batch-dlg" style="padding:0px;"><iframe id="batchFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
		_dialog.dialog({
		title:title,
		autoOpen:false,
		modal:true,
		closed:true,
		width:'320',
		height:'230',
		buttons:[{
			text:'保存',
			iconCls:'icon-save',
			handler:function(){			
				$("#batchFrame",top.document.body).contents().find("#qcsampleform").form('submit',{
						url:rootPath + '/sampletest/sampletestbybatch!addQcSample.action',
						onSubmit:function(){
							var objs = $("#batchFrame",top.document.body).contents().find(".grkj-validate");
							
							if(!saveCheck(objs)){
								$("#batchFrame",top.document.body).contents().find(":input").focus();
//								$("#batchFrame",top.document.body).contents().find("select").focus();
								alert("数据输入不符合格式，请查看红色边框的输入框的输入提示！");
								return false;
							}
						},
						success : function(data) {
							if (data == 'fail') {
								alert("添加失败！");
								return;
							}
							if (data == 'success') {
								alert('添加成功！');
								_dialog.dialog('close');
								refreshCurrent();
								initHtml();
							}
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
//添加质控样
function addSample2(title,sampleitemtestid,qctypeid){
		var url = rootPath + "/sampletest/sampletestbybatch!toAddQcSample2.action";
		if(sampleitemtestid!=""){
			url = url + "?sampleitemtestid="+sampleitemtestid+"&qctypeid="+qctypeid;
		}
		var _dialog =  window.top.$('<div id ="batch-dlg" style="padding:0px;"><iframe id="batchFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
		_dialog.dialog({
		title:title,
		autoOpen:false,
		modal:true,
		closed:true,
		width:'400',
		height:'250',
		buttons:[{
			text:'保存',
			iconCls:'icon-save',
			handler:function(){			
				$("#batchFrame",top.document.body).contents().find("#qcsampleform").form('submit',{
						url:rootPath + '/sampletest/sampletestbybatch!addQcSample2.action',
						onSubmit:function(){
							var objs = $("#batchFrame",top.document.body).contents().find(".grkj-validate");
							
							if(!saveCheck(objs)){
								$("#batchFrame",top.document.body).contents().find(":input").focus();
//								$("#batchFrame",top.document.body).contents().find("select").focus();
								alert("数据输入不符合格式，请查看红色边框的输入框的输入提示！");
								return false;
							}
						},
						success : function(data) {
							if (data == 'fail') {
								alert("添加失败！");
								return;
							}
							if (data == 'success') {
								alert('添加成功！');
								_dialog.dialog('close');
								refreshCurrent();
								initHtml();
							}
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
//添加加标样
function addSample3(title,sampleitemtestid,qctypeid){
		var url = rootPath + "/sampletest/sampletestbybatch!toAddQcSample3.action";
		if(sampleitemtestid!=""){
			url = url + "?sampleitemtestid="+sampleitemtestid+"&qctypeid="+qctypeid;
		}
		var _dialog =  window.top.$('<div id ="batch-dlg" style="padding:0px;"><iframe id="batchFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
		_dialog.dialog({
		title:title,
		autoOpen:false,
		modal:true,
		closed:true,
		width:'320',
		height:'230',
		buttons:[{
			text:'保存',
			iconCls:'icon-save',
			handler:function(){			
				$("#batchFrame",top.document.body).contents().find("#qcsampleform").form('submit',{
						url:rootPath + '/sampletest/sampletestbybatch!addQcSample.action',
						onSubmit:function(){
							var objs = $("#batchFrame",top.document.body).contents().find(".grkj-validate");
							
							if(!saveCheck(objs)){
								$("#batchFrame",top.document.body).contents().find(":input").focus();
//								$("#batchFrame",top.document.body).contents().find("select").focus();
								alert("数据输入不符合格式，请查看红色边框的输入框的输入提示！");
								return false;
							}
						},
						success : function(data) {
							if (data == 'fail') {
								alert("添加失败！");
								return;
							}
							if (data == 'success') {
								alert('添加成功！');
								_dialog.dialog('close');
								refreshCurrent();
								initHtml();
							}
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
function addRep(obj){
//	var itemid = $("#itemid").val();
//	var batchno = $("#batchno").val();
       //所有html元素id为demo2的绑定此右键菜单
    $('#quxiandatalist').contextMenu('myMenu', {
      //事件    
      bindings: 
          {
          			'item_1': function(t) {
		    		var url = rootPath+"/sampletest/sampletestbybatch!toAddRep.action?paramid="+obj.id+"&itemid="+itemid+"&batchno="+batchno;
					var _dialog =  window.top.$('<div id ="batch-dlg" style="padding:0px;"><iframe id="batchFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
					_dialog.dialog({
					title:"设置重复样数量",
					autoOpen:false,
					modal:true,
					closed:true,
					width:'300',
					height:'100',
					buttons:[{
						text:'保存',
						iconCls:'icon-save',
						handler:function(){			
							$("#batchFrame",top.document.body).contents().find("#repForm").form('submit',{
									url:rootPath+'/sampletest/sampletestbybatch!addRep.action',
									onSubmit:function(){
										var objs = $("#batchFrame",top.document.body).contents().find(".grkj-validate");
										
										if(!saveCheck(objs)){
											$("#batchFrame",top.document.body).contents().find(":input").focus();
			//								$("#batchFrame",top.document.body).contents().find("select").focus();
											alert("数据输入不符合格式，请查看红色边框的输入框的输入提示！");
											return false;
										}
									},
									success : function(data) {
										if (data == 'fail') {
											alert("设置失败！");
											return;
										}
										if (data == 'success') {
											_dialog.dialog('close');
											alert('设置成功！');
											initHtml();
										}
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
	   	 	}
	 	});
}

function removeBindings(){
	$('#quxiandatalist').unbind();
	//this.hide();
	//$('#quxiandatalist').contextMenu('myMenu', {bindings:{ $("#myMenu").hide(); }});
}

//做多用户测试用的
function manyuser(userids,usernames,username,userid){
	//alert(username+"__"+userid);
if(username==''){
	username = document.getElementById(usernames).value
}
if(userid==''){
	userid = document.getElementById(userids).value;
}
var url =  rootPath+"/oamuser/oneandmanyuser!toCertificate.action?itemid="+itemid+"&methodid="+methodid+"&realname="+encodeURI(encodeURI(username))+"&userid="+userid;
//var url =  rootPath+"/oamuser/oneandmanyuser!toManyUser.action?realname="+encodeURI(encodeURI(username))+"&userid="+userid;//?deptid="+deptid;
var _dialog =  window.top.$('<div id ="role-dlg" style="padding:0px;"><iframe id="manyUserFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
_dialog.dialog({
	title:'选择人员',
	autoOpen:false,
	modal:true,
	closed:true,
	width:'500',
	height:'500',
	buttons:[{
		text:'确定',
		iconCls:'icon-save',
		handler:function(){
			var usernameVal=$("#manyUserFrame",top.document.body).contents().find("#selectedUser").val();//$("#manyUserFrame",top.document.body).contents().find("#selectedUser").val();
			//$("#"+usernames).val(usernameVal);
			//document.form1.usernames.value = usernameVal; 
			document.getElementById(usernames).value = usernameVal;
			//$('input[@name=\''+usernames+'\']').val(usernameVal);
			var useridVal=$("#manyUserFrame",top.document.body).contents().find("#selectedUserid").val();//$("#manyUserFrame",top.document.body).contents().find("#selectedUserid").val();
			//$("#"+userids).val(useridVal);
			//$('input[@name=\''+userids+'\']').val(useridVal);
			document.getElementById(userids).value = useridVal;
			//document.form1.userids.value = useridVal; 
			//alert(document.getElementById(usernames).value);
			//alert(document.getElementById(userids).value);
			_dialog.dialog('close');
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

//嗅辨员选择
function showCertificate(userids,usernames,username,userid,items){
	if(username==''){
		username = document.getElementById(usernames).value
	}
	if(userid==''){
		userid = document.getElementById(userids).value;
	}
	var url =  rootPath+"/oamuser/oneandmanyuser!toCertificate.action?itemid="+items+"&methodid="+methodid+"&realname="+encodeURI(encodeURI(username))+"&userid="+userid;//?deptid="+deptid;
	var _dialog =  window.top.$('<div id ="role-dlg" style="padding:0px;"><iframe id="certFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
	_dialog.dialog({
		title:'选择人员',
		autoOpen:false,
		modal:true,
		closed:true,
		width:'500',
		height:'500',
		buttons:[{
			text:'确定',
			iconCls:'icon-save',
			handler:function(){
				var usernameVal=$("#certFrame",top.document.body).contents().find("#selectedUser").val();//$("#manyUserFrame",top.document.body).contents().find("#selectedUser").val();
				var useridVal=$("#certFrame",top.document.body).contents().find("#selectedUserid").val();//$("#manyUserFrame",top.document.body).contents().find("#selectedUserid").val();
				var userIds = useridVal.split(",");
				if(userIds.length>0){
					if(userIds.length<6){
						alert("嗅辨员应该不少于6个！");
					}else{
						document.getElementById(usernames).value = usernameVal;
						document.getElementById(userids).value = useridVal;
						_dialog.dialog('close');
					}
				}else{
					alert("请选择嗅辨员！");
				}
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
	//输入时显示tooltip，flag=1时显示，=0不显示。
function showToolTip(flag,name){
   var trCount=$("#inner22").find("tr").size();
   trCount=trCount*21
   var my_tips=$("#inputToolTip").get(0);
   var doObj=$("input[name='"+name+"']");
   if(flag){
	   my_tips.innerHTML=$(doObj).val();
	   my_tips.style.display="";
       my_tips.style.width=150;
       my_tips.style.left=$("input[name='"+name+"']").offset().left+document.body.scrollLeft;
       my_tips.style.top=parseInt($("input[name='"+name+"']").offset().top)-50-trCount;
       //alert(parseInt($("input[name='"+name+"']").offset().top)+"    "+document.body.scrollTop);
   }else{
       my_tips.style.display="none";
       }
   }
	function removeAttr(obj,textId){
		var val = obj.value;
		if(val!='' && val=='/'){
		document.getElementById(textId).removeAttribute("validateParam"); 
	}
}
	


//提交操作(批号，复核人)
function operate(strBatchno,userid,opinion){
	$.post(rootPath+"/sampletest/batch/batch!setAllStatus.action",
		{json:strBatchno,opinion:opinion,userid:userid,typeid:1},				
		function(msg){
			if(msg=='success'){
				alert("提交成功！");
				window.parent.location.reload();
				/*window.parent.returnValue=1;
				window.close();*/
				//$("#tijiaofuhe",window.top.document).click();
			}else{
				alert("提交失败！");
				//$("#closeDialog",window.top.document).click();
			}
		}
	);
}

	//点击保存弹出的遮盖层
	function openBlock()
	{
		//alert("弹出层");
		$(window.document.body).block({ 
			//$("#divBlock").blockUI({ 
				message: "正在保存数据,请稍候...", 
		 		css: {
					color:'#000', 
					padding: '15px', 
					border:'2px solid #90dbfe',
					backgroundColor:'#fafafa'
				},
				overlayCSS: {
					opacity:'0.1' 
				}
			});
		//setTimeout("unLockBlock()",5000);
		//unLockBlock();
	}