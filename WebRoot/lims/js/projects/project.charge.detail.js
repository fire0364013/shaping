//项目监测企业
function initItemChargedatagrid(){//计算费用时使用
	$('#datagrid').datagrid({
		nowrap: false,
		striped: true,
		collapsible:true,
		url: rootPath + "/projects/taskregister/chargedetail!itemchargedetailList.action?projectcode="+projectcode,
		fit:true,
		fitColumns:true,
		scrollbarSize:0,
		idField:'itemid',
		singleSelect:false,
		frozenColumns:[[
					{field:'itemid',checkbox:true,align:"center"}
			]],
		columns:[[
	        {field:'itemtype',title:'项目类别',width:300,align:'center'},
			{field:'itemname',title:'项目名称',width:150,align : 'center'},
			{field:'price',title:'费用<img src="'+rootPath+'/themes/icons/mini_edit.png"/>', width:300,align:"center",
					formatter:function(value,rec,rowIndex){
					var str = "<div id=\"priceDiv"+rowIndex+"\">" + value +"</div>";
					return str;
				}
			}
				
		]],
//		onSelect:function(rowIndex, rowData){
//		
//		},
		onLoadSuccess:function(data){
			if(data.rows.length>0){
				setTimeout("mergeCellsByField(\"datagrid\",\"itemtype,itemname\")",10)
			}
		},
		onDblClickCell:function(rowIndex, field, value){
				$('#datagrid').datagrid('clearSelections');	
				$('#datagrid').datagrid('selectRow',rowIndex);		
				var row = $('#datagrid').datagrid('getSelected');				
				if(field =="price" && row.itemid!=""){	
					var str = "<div name=\"selectDiv1\" id=\"selectDiv1\">"
					+"<input type=\"text\" class=\"TextBox\" " 
					+"id=\"price"+rowIndex+"\" " 
					+"name=\"price\" " 					
					+"style=\"width: 250px;height:20px\""
					+"value=" + value
					+">"					
					+"</div>";				
					$("#priceDiv"+rowIndex).html(str);
				}		    	
			   $("#price"+rowIndex).bind("change",{row: row},function(event){
                  var newPrice =  $(this).val();
                  updateitemFee(row.projectitemid,newPrice);
                  getaccount();
               });
			},		
		onRowContextMenu:function(e, rowIndex, rowData){
			$('#datagrid').datagrid("selectRow",rowIndex);
//			$("#taskContextMenu").menu("show", {left: e.pageX,top: e.pageY});
//			$('#addMonth').removeAttr("disabled");
//			$('#addPinci').removeAttr("disabled");
			e.preventDefault();
		},
		pagination:true,
		pageSize:20,
		pageList:[20,30,40,50]
		
	});
}

//项目监测企业
function initItemChargedatagridView(){//计算费用时使用
	$('#datagrid').datagrid({
		nowrap: false,
		striped: true,
		collapsible:true,
		url: rootPath + "/projects/taskregister/chargedetail!itemchargedetailList.action?projectcode="+projectcode,
		fit:true,
		fitColumns:true,
		scrollbarSize:0,
		idField:'itemid',
		singleSelect:false,
		frozenColumns:[[
					{field:'itemid',checkbox:true,align:"center"}
			]],
		columns:[[
	        {field:'itemtype',title:'项目类别',width:300,align:'center'},
			{field:'itemname',title:'项目名称',width:150,align : 'center'},
			{field:'price',title:'费用',width:150,align : 'center'}
				
		]],
//		onSelect:function(rowIndex, rowData){
//		
//		},
		onLoadSuccess:function(data){
			if(data.rows.length>0){
				setTimeout("mergeCellsByField(\"datagrid\",\"itemtype,itemname\")",10)
			}
		},
		onRowContextMenu:function(e, rowIndex, rowData){
			$('#datagrid').datagrid("selectRow",rowIndex);
//			$("#taskContextMenu").menu("show", {left: e.pageX,top: e.pageY});
//			$('#addMonth').removeAttr("disabled");
//			$('#addPinci').removeAttr("disabled");
			e.preventDefault();
		},
		pagination:true,
		pageSize:20,
		pageList:[20,30,40,50]
		
	});
}

function initSamplefeeChargedatagrid(){//展现人员基础信息费
	$('#datagrid1').datagrid({
		nowrap: false,
		striped: true,
		collapsible:true,
		url: rootPath + "/projects/taskregister/chargedetail!samplechargedetailList.action?projectcode="+projectcode,
		fit:true,
		fitColumns:true,
		scrollbarSize:0,
		idField:'projectsamplefeeid',
		singleSelect:false,
		frozenColumns:[[
					{field:'projectsamplefeeid',checkbox:true,align:"center"}
			]],
		columns:[[
	        {field:'entname',title:'企业名称',width:300,align:'center'},
			{field:'typename',title:'费用类型',width:300,align:'center'},
			{field:'name',title:'名称',width:300,align:'center'},
			{field:'price',title:'费用<img src="'+rootPath+'/themes/icons/mini_edit.png"/>', width:300,align:"center",
					formatter:function(value,rec,rowIndex){
					var str = "<div id=\"priceDiv"+rowIndex+"\">" + value +"</div>";
					return str;
				}
			},
			{field:'amount',title:'数量<img src="'+rootPath+'/themes/icons/mini_edit.png"/>', width:300,align:"center",
					formatter:function(value,rec,rowIndex){
					var str = "<div id=\"amountDiv"+rowIndex+"\">" +value +"</div>";
					return str;
				}
			}
			
		]],
		onDblClickCell:function(rowIndex, field, value){
				$('#datagrid1').datagrid('clearSelections');	
				$('#datagrid1').datagrid('selectRow',rowIndex);		
				var rows = $('#datagrid1').datagrid('getSelections');				
				var row = $('#datagrid1').datagrid('getSelected');				
				if(field =="price" && row.projectdetail!=""){	
					var str = "<div name=\"selectDiv1\" id=\"selectDiv1\">"
					+"<input type=\"text\" class=\"TextBox\" " 
					+"id=\"price"+rowIndex+"\" " 
					+"name=\"price\" " 					
					+"style=\"width: 250px;height:20px\""
					+"value=" + value
					+">"					
					+"</div>";				
					$("#priceDiv"+rowIndex).html(str);
				}
				if(field =="amount" && row.projectdetail!=""){	
					var str = "<div name=\"selectDiv2\" id=\"selectDiv2\">" 
					+"<input type=\"text\" class=\"TextBox\" " 
					+"id=\"amount"+rowIndex+"\" " 
					+"name=\"amount\" " 					
					+"style=\"width: 250px;height:20px\""
					+"value=" + value
					+">"																						
					+"</div>";
					$("#amountDiv"+rowIndex).html(str);
				}
			  
			    	
			   $("#price"+rowIndex).bind("change",{row: row},function(event){
                  var newPrice =  $(this).val();
                  updateSampleFee(row.projectsamplefeeid,newPrice,row.amount);
               });
			   	$("#amount"+rowIndex).bind("change",{row: row},function(event){
                  var newAmount =  $(this).val();
                  updateSampleFee(row.projectsamplefeeid,row.price,newAmount);
               });
			},
//		onSelect:function(rowIndex, rowData){
//		
//		},
		onLoadSuccess:function(data){
			if(data.rows.length>0){
				setTimeout("mergeCellsByField(\"datagrid1\",\"projectsamplefeeid,entname,typename\")",10)
			}
		},
		pagination:true,
		pageSize:20,
		pageList:[20,30,40,50]
		
	});
		
}

function updateSampleFee(projectsamplefeeid,newPrice,newAmount){
		$.ajax( {
					type : 'GET',
					url : rootPath + "/projects/taskregister/chargedetail!updateSampleFee.action?projectsamplefeeid="+projectsamplefeeid
					+'&newPrice='+newPrice	
					+'&newAmount='+newAmount		
					+'&timeStamp='+new Date().getTime(),
					async:false,//同步
					success : function(data) {
						if(data=="success"){
							$("#datagrid1").datagrid('reload');
						}
						else if(data=="error"){
							alert("修改失败！");
						}
					}
				});
}
function updateitemFee(projectitemid,newPrice){
		$.ajax( {
					type : 'GET',
					url : rootPath + "/projects/taskregister/chargedetail!updateItemFee.action?projectitemid="+projectitemid
					+'&newPrice='+newPrice			
					+'&timeStamp='+new Date().getTime(),
					async:false,//同步
					success : function(data) {
						if(data=="success"){
							$("#datagrid").datagrid('reload');
							
						}
						else if(data=="error"){
							alert("修改失败！");
						}
					}
				});
}

function initSamplefeeChargedatagridView(){//展现人员基础信息费
	$('#datagrid1').datagrid({
		nowrap: false,
		striped: true,
		collapsible:true,
		url: rootPath + "/projects/taskregister/chargedetail!samplechargedetailList.action?projectcode="+projectcode,
		fit:true,
		fitColumns:true,
		scrollbarSize:0,
		idField:'projectsamplefeeid',
		singleSelect:false,
		frozenColumns:[[
					{field:'projectsamplefeeid',checkbox:true,align:"center"}
			]],
		columns:[[
	        {field:'entname',title:'企业名称',width:300,align:'center'},
			{field:'typename',title:'费用类型',width:300,align:'center'},
			{field:'name',title:'名称',width:300,align:'center'},
			{field:'price',title:'费用', width:300,align:"center"},
			{field:'amount',title:'数量', width:300,align:"center"}
			
		]],
		onLoadSuccess:function(data){
			if(data.rows.length>0){
				setTimeout("mergeCellsByField(\"datagrid1\",\"projectsamplefeeid,entname,typename\")",10)
			}
		},
		pagination:true,
		pageSize:20,
		pageList:[20,30,40,50]
		
	});
	
	$(window).resize(function() {
		$("#datagrid1").datagrid('resize');
	});
	}
function mergeCellsByField(tableID,colList){
    var ColArray = colList.split(",");
    var tTable = $('#'+tableID);
    var TableRowCnts=tTable.datagrid("getRows").length;
    var tmpA;
    var tmpB;
    var PerTxt = "";
    var CurTxt = "";
    var alertStr = "";
    //for (j=0;j<=ColArray.length-1 ;j++ )
    for (j=ColArray.length-1;j>=0 ;j-- )
    {
        //当循环至某新的列时，变量复位。
        PerTxt="";
        tmpA=1;
        tmpB=0;
        
        //从第一行（表头为第0行）开始循环，循环至行尾(溢出一位)
        for (i=0;i<=TableRowCnts ;i++ )
        {
            if (i==TableRowCnts)
            {
                CurTxt="";
            }
            else
            {
                CurTxt=tTable.datagrid("getRows")[i][ColArray[j]];
            }
            if (PerTxt==CurTxt)
            {
                tmpA+=1;
            }
            else
            {
                tmpB+=tmpA;
                tTable.datagrid('mergeCells',{
                    index:i-tmpA,
                    field:ColArray[j],
                    rowspan:tmpA,
                    colspan:null
                });
                tmpA=1;
            }
            PerTxt=CurTxt;
        }
    }
}
//结算费用
function account(){
	var projectcode = $("#projectcode").val();
	$.ajax( {
					type : 'GET',
					url : rootPath + "/projects/taskregister/chargedetail!account.action?projectcode="+projectcode
					+'&timeStamp='+new Date().getTime(),
					async:false,//同步
					success : function(data) {
				    var json = eval('('+data+')');
						if(json.message == "success"){
							//alert("结算完成！总费用是：" + json.feepay);
							$("#totalcost").val('￥'+json.feepay);
							//window.location.reload();
						}
						else if(json.message=="error"){
							alert("结算失败！");
						}
					}
				});
}

//获得结算费用
function getaccount(){
	var projectcode = $("#projectcode").val();
	$.ajax( {
					type : 'GET',
					url : rootPath + "/projects/taskregister/chargedetail!getaccount.action?projectcode="+projectcode
					+'&timeStamp='+new Date().getTime(),
					async:false,//同步
					success : function(data) {
				    var json = eval('('+data+')');
						if(json.message == "success"){
							//alert("结算完成！总费用是：" + json.feepay);
							$("#totalcost").val('￥'+json.feepay);
							//window.location.reload();
						}
					}
				});
}


