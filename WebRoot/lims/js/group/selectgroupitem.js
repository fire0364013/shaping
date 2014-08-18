Array.prototype.indexOf = function (val) {  
    for (var i = 0; i < this.length; i++) {  
        if (this[i] == val) {  
            return i;  
        }  
    }  
    return -1;  
};  
Array.prototype.remove = function (val) {  
    var index = this.indexOf(val);  
    if (index > -1) {  
        this.splice(index, 1);  
    }  
}; 
var isflag="";
var numberArr=[];
$(function(){
	$("#datagrid").datagrid({
		nowrap : false,			
		striped : true,			
		url:rootPath+"/group/departmentgroup!getGroupItemData.action?deptid="+deptid+"&groupid="+groupid,
		fit:true,
		fitColumns:true,
		scrollbarSize:0,
		idField:'id',
		columns:[[
			{field:'cc',checkbox:true,align : 'center'},
			{field:'itemname',title:'项目名称',width:120,align : 'center'},
			{field:'units',title:'计量单位',width:120,align : 'center'},
			{field:'itemtype',title:'类型',width:120,align : 'center'},
			{field:'isnowtest',title:'是否现场监测项目',width:80,align : 'center',
				formatter:function(value,rowData,rowIndex){
					var str ="";
					if(value=='Y'){
						str = "<input type='checkbox' checked='checked' disabled='disabled'/>";
					}else{
						str = "<input type='checkbox' disabled='disabled'/>";
					}
					return str;
				}
			},
			{field:'devicejson',title:'仪器类型',width:120,align:'center'}
		]],
		pagination:true,
		rownumbers:true,
		pageSize:10,
		pageList:[10,20,30],
		singleSelect:false,
		onLoadSuccess:loadSucces,
		onClickRow:clickRow,
		onSelect:onselect,
		onUnselect:unselect,
		onSelectAll:selectAll,
		onUnselectAll:unselectAll
		
	});	
});
	//获取仪器类型的所有信息
	/*function getDeviceData(id){
		$.post(rootPath+"/group/departmentgroup!getDeviceData.action?timeStamp="+new Date().getTime(),{},function(data){
			
		});
	}*/
//加载成功
	function loadSucces(data){
			//一下是原来的部分
			/*var value=$("#selectitemname").val();
			var valueids=$("#selectid").val();
			var valueid=valueids.split(",");
			var device=$("#selectdivice").val().split(",");*/
			//将已经选择的项目id选中
			/*if(valueids!=null&&valueids!=""){
				for ( var i = 0; i < valueid.length; i++) {
					var rows = $('#datagrid1').datagrid('selectRecord',valueid[i]);
					$("#gitem"+valueid[i]).val(device[i]);
				}
			}*/
			//将已经选择的仪器选中
			for(var i=0;i<numberArr.length;i++){
				var inputValue = numberArr[i].split("=");
				$("#"+inputValue[0]).val(inputValue[1]);
			}
		}
	//点击一行事件
	function clickRow(){
		//$("#datagrid").datagrid("selectRow",0);
		isflag="";
	}
	/**
	 * 点击仪器类别事件点击仪器下拉别表的时候   用于判断是否点击的下来列表
	 */
	function selectOneRow(selectid,i){
		//$("#datagrid").datagrid("selectRecord",3);
		//$("#datagrid").datagrid("selectRow",0);
		//alert(i);
		isflag=i;
	}
	//控制分页时，输入框的值不清空
	function getMaterialNum(inputId){
	//	alert(inputId);
		for(var i=0;i<numberArr.length;i++){
			var inputValue = numberArr[i].split("=");
			if(inputValue[0]=="gitem"+inputId){
				numberArr.remove(numberArr[i]);
			}
		}
		numberArr.push("gitem"+inputId+"="+$("#gitem"+inputId).val());
		$("#selectdivice").val(numberArr);
		//alert(numberArr);
	}
//选择一行数据
function onselect(rowIndex,rowData){
	var cc=rowData['itemname'];
	var ss=rowData['id'];
	var value=$("#selectitemname").val();
	var valueid=$("#selectid").val();
	if(value==""){
		$("#selectitemname").val(cc);
		$("#selectid").val(ss);
	}else{
		//var valuesplit=value.split(",");
		var valueidsplit=valueid.split(",");
		//var selectdivicesplit=selectdivice.split(",");
		var flag=0;
		for ( var i = 0; i < valueidsplit.length; i++) {
			if(valueidsplit[i]==ss){
				flag=1;
				return;
			}
		}
		if(flag==0){
			$("#selectitemname").val(value+","+cc);
			$("#selectid").val(valueid+","+ss);
		}
	}
}
//取消选中一行数据
function unselect(rowIndex,rowData){
// if(isflag!=""){
	  if(isflag==rowIndex){
		$("#datagrid").datagrid("selectRow",isflag);
	  // }
	}else{
			 var value=$("#selectitemname").val().split(",");
			 var valueid=$("#selectid").val().split(",");
			 //var device=$("#selectdivice").val().split(",");
			 var acceptval=[];
			 var acceptvalid=[];
			// var deviceval=[];
			 for ( var i = 0; i < valueid.length; i++) {
				if(rowData['id']==valueid[i]){
					continue;
				}
				if(acceptval==""){
					acceptval+=value[i];
				}else{
					acceptval+=","+value[i];
				}
				if(acceptvalid==""){
					acceptvalid+=valueid[i];
				}else{
					acceptvalid+=","+valueid[i];
				}
				/* if(deviceval==""){
					deviceval+=device[i];
				}else{
					deviceval+=","+device[i]; 
				}*/
			}
			 $("#selectitemname").val(acceptval);
			 $("#selectid").val(acceptvalid);
			// $("#selectdivice").val(deviceval);
	}
	 
}
//选中所有行
function selectAll(){
	var selectitemname=$("#selectitemname").val();
	var value=selectitemname.split(",");
	var valueid=$("#selectid").val().split(",");
	//var device=$("#selectdivice").val().split(",");
	var selected=$("#datagrid").datagrid('getSelections');
	var itemname="";
	for ( var j = 0; j < selected.length; j++) {
		var tt=0;
		for ( var i = 0; i < valueid.length; i++) {
			if(valueid[i]==selected[j]['id']){
				tt=1;
			}
		}
		if(tt==0){
			if(selectitemname==""){
				selectitemname=selected[j]['itemname'];
			}else{
				selectitemname+=","+selected[j]['itemname'];
			}
			if(valueid==""){
				valueid+=selected[j]['id'];
			}else{
				valueid+=","+selected[j]['id'];
			}
			/* if(device==""){
				device+=$("#gitem"+selected[j]['id']).val();
			}else{
				device+=","+$("#gitem"+selected[j]['id']).val();
			}*/
		}
	}
	$("#selectitemname").val(selectitemname);
	$("#selectid").val(valueid);
	//$("#selectdivice").val(device);
}
//取消选中所有行
function unselectAll(){
	var rows = $('#datagrid').datagrid('getRows');;
	var value=$("#selectitemname").val().split(",");
	var valueid=$("#selectid").val().split(",");
	//var device=$("#selectdivice").val().split(",");
	var receive=[];
	var receiveid=[];
	//var deviceval=[];
	for ( var j = 0; j <valueid.length; j++) {
		var tt=0;
		for ( var i = 0; i < rows.length; i++) {
			
			if(valueid[j]==rows[i]['id']){
				tt=1;
				continue;
			}
		}
		if(tt==0){
			if(receive==""){
				receive+=value[j];
			}else{
				receive+=","+value[j];
			}
			if(receiveid==""){
				receiveid+=valueid[j];
			}else{
				receiveid+=","+valueid[j];
			}
			/* if(deviceval==""){
				deviceval+=device[j];
			}else{
				deviceval+=","+device[j];
			}*/
		}
	}
	
	$("#selectitemname").val(receive);
	$("#selectid").val(receiveid);
	//$("#selectdivice").val(deviceval);
}

//查询
function searchObj(){
	var itemname = $('#itemname').val();
	var itemtypeid = $('#itemtypeid').val();
	
	$("#datagrid").datagrid({
		queryParams : {
			itemtypeid : itemtypeid,
			itemname : itemname
		},
		pageNumber : 1
	});
}