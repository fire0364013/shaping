//加载任务接收页面
function initInceptDataGrid(){			
	$('#countlist').datagrid({
				//title:'用户信息列表',
				nowrap: false,
				striped: true,
				collapsible:true,
				url:rootPath +'/spot/spotcount/spotcount!initCount.action', 
				fit:true,
				fitColumns:true,
				scrollbarSize:0,
				idField:'taskcode',
				sortName:'taskcode',
				sortOrder:'asc',
				singleSelect:false,
				pageSize:20,
				pageList:[20,30,40,50],
				frozenColumns:[[
					{field:'taskname',title:'任务名称',width:120,align:"center"}
					]],
				columns:[[	
						{field:'taskcode',title:'任务编号',width:40,align:"center"}	,
						{field:'entname',title:'监测企业',width:50,align:"center"},
						{field:'monitortype',title:'监测点类型',width:40,align:"center"},
						{field:'monitorname',title:'监测点',width:40,align:"center"},
						{field:'monitordays',title:'监测天数',width:40,align:"center"},
						{field:'monitorfrequency',title:'监测频次',width:40,align:"center"},
						{field:'cycle',title:'监测周期',width:40,align:"center"},
						{field:'savedose',title:'样品添加剂',width:40,align:"center"},
						{field:'samplecount',title:'样品数量',width:40,align:"center"},
						{field:'status',title:'任务状态',width:40,align:"center"}						
				]],
				pagination:true,
				rownumbers:true,
				onLoadSuccess:function(data){
					if(data.rows.length>0){
						setTimeout("mergeCellsByField(\"countlist\",\"taskname,taskcode,entname,monitortype,monitorname\")",10)
					}
				}
			});
			$(window).resize(function() {
				$("#countlist").datagrid('resize');
			});
}

//查询
function queryincept() {
	$("#countlist").datagrid("clearSelections");
	var projectcode = $("#projectcode").val();//样品编码
	var typeid= $("#typeid").val();//监测点类型
//	var status = "'QCRequiredDraw','SamplingSet'";
	$('#countlist').datagrid( {
		queryParams : {
		projectcode:projectcode,
		montiorpointtypeid:typeid
//		status:status
		},
		pageNumber : 1  //查询后指定页码为1
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

