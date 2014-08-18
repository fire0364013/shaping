/**
 * 仪器使用记录 基础信息
 */
function deviceUsed(){ 
	$('#deviceUsed').datagrid({
		nowrap: false,
		striped: true,
		collapsible:true,
		url:rootPath +"/monitorproject/deviceuserecord/samplingdeviceuserecord!getListDataForDeviceused.action?deviceid="+deviceid,
		fit:true,
		fitColumns : true,
		scrollbarSize:0,
		remoteSort: false,
		singleSelect:false,
		pageSize : 15,
		pageList : [15, 30, 45, 60 ],
		rownumbers:false,
		idField:'userecordid',
		columns:[[//  使用时间 项目编码 监测点编码 使用人 使用前状态，使用后状态，项目
				{field:'userecordid',checkbox:true,align:"center"},
				{field:'usedate',title:'使用时间',width:100,align:"center"},	
				{field:'projectrealcode',title:'项目编号',width:70,align:"center"}, 
				{field:'ent',title:'被测单位',width:90,align:"center"}, 
				{field:'monitorpointname',title:'监测点名称',width:80,align:"center"},
				{field:'monitorcode',title:'监测点<br>编码',width:60,align:"center"},
				{field:'startingupperson',title:'使用人',width:60,align:"center"},
				{field:'beforeusestatus',title:'使用前<br>状态',width:40,align:"center"},
				{field:'afterusestatus',title:'使用后<br>状态',width:40,align:"center"},	
				{field:'monitoritemname',title:'项目',width:190,align:"center"}					
		]],
		pagination:true,
		rownumbers:true
	});
} 
//查询
function search(){  
	var startingupperson=$("#startingupperson").val();  
	var fromdate = $('#fromdate').val();
	var todate = $('#todate').val();
	if(fromdate!=""&&todate==""||fromdate==""&&todate!=""){
		alert("请输入完整的时间段查询");
		return false;
	}
	$('#deviceUsed').datagrid( {
		queryParams : {  
		startingupperson:startingupperson,
		fromdate : fromdate,
		todate : todate
		},
		pageNumber:1		
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
		 