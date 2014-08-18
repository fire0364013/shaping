//-----Au-----wjy~~

$(document).ready(function() {
	initDataGrid();
});
function initDataGrid() {
	$('#authorgrid').datagrid(
					{
						nowrap : false,
						striped : true,
						collapsible : true,
						url : 'authorizedsignature!toList.action',
						onLoadSuccess:function(data){
						if(data.rows.length>0){
							setTimeout("mergeCellsByField(\"authorgrid\",\"monitortype\")",1)
						}
						},
						sortName : 'monitortypeid',
						sortOrder : 'desc',
						remoteSort : false,
						//idField : 'methodid',
						fit : true,
						fitColumns : true,
						scrollbarSize : 0,
						pageSize : 20,
						pageList : [ 20, 30, 40, 50 ],
						columns : [ [
								{
									field : 'monitortype',
									title : '监测业务类型',
									width : 100,
									align : 'center'
								},
								{
									field : 'monitorpointtypename',
									title : '监测点类型',
									width : 100,
									align : 'center'
								},
								{
									field : 'realname',
									title : '授权签字人',
									width : 200,
									align : 'center',
									formatter:function(value,rowData){
									if(rowData.moniteridauthor!=null){
									var	moniterids=rowData.moniteridauthor.split(",");
										for(var i=0;i<moniterids.length;i++){
											if(moniterids[i]==rowData.moniterid){										
												return rowData.realname;
											}
										}
									}else {
										return '';
									}
									}
								},
								{
									field : 'option',
									title : '操作',
									width : 40,
									align : 'center',
									formatter : function(value,rowData, rec) {
										var links = '<img src="'
												+ rootPath
												+ '/themes/default/images/bianjiimage.png" id="btnshow" onclick="addWin(\''
												+ rowData.authorizedid + '\',\''+ rowData.moniteridauthor+ '\',\''+ rowData.moniterid+ '\',\''+ rowData.monitortypeid
												+ '\')"alt="编辑"/>&nbsp;&nbsp;';
										return links;
									}
								} ] ],
						pagination : true,
						rownumbers : true
					});		
	$(window).resize(function() {
		$("#authorgrid").datagrid('resize');
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



//添加
function addWin(id,moniauthor,monicurr,monitortypeid){//授权人主键id  //监测类型   //监测表里面的监测类型  //监测类型的编号
	$('#authorgrid').datagrid('clearSelections');
	var url = rootPath + "/author/authorizedsignature!input.action";
	if(moniauthor!=null){
	var	moniterids=moniauthor.split(",");
		for(var i=0;i<moniterids.length;i++){
			if(moniterids[i]==monicurr){										
				
			}else {
				id="";
			}
		}
	}
	if (id != "") {
		url = url + "?id=" + id;
	}
	var _dialog = window.top
			.$('<div id ="cert-dlg" style="padding:0px;"><iframe id="authorFrame" width="100%" height="100%" frameborder="0" scrolling="no" src=' + url + '></iframe></div>')
			.appendTo(window.top.document.body);
	_dialog.dialog({
		title:'签字人编辑',
		autoOpen:false,
		modal:true,
		closed:true,
		width : '350',
		height : '100',
		buttons:[{
			text:'保存',
			iconCls:'icon-save',
			handler:function(){
				$("#authorFrame",top.document.body).contents().find("#authorframe").form('submit',{
					url:rootPath +'/author/authorizedsignature!save.action?id=' + id+'&moniauthor='+moniauthor+'&monicurr='+monicurr+'&monitortypeid='+monitortypeid,
					onSubmit:function(){
					var objs= $("#authorFrame",top.document.body).contents().find(".grkj-validate");
					if(!saveCheck(objs)){						
							$("#authorFrame",top.document.body).contents().find(":input").focus();
							alert("数据输入不符合格式，请查看红色边框的输入框的输入提示！");
							return false;
						}
					},
					success:function(data){
						if(data=='success'){
							_dialog.dialog('close');
							$("#authorgrid").datagrid('reload');
							alert('保存成功');
						}else if(data=='exist'){
							alert("未作更改不用保存！");
						}else if(data=='fail'){
							alert("保存失败");
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


function selectUser(){
	$("#username").focus();
	var userid=$("#userid").val();
	var username=$("#username").val();
	username=encodeURI(encodeURI(username));
	var url =rootPath +"/oamuser/oneandmanyuser!toManyUser.action?userid="+userid+"&realname="+username;
	var _dialog =  window.top.$('	<div id ="role-dlg" style="padding:0px;"><iframe id="selectFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
	_dialog.dialog({
		title:'选择用户',
		autoOpen:false,
		modal:true,
		closed:true,
		width:'630',
		height:'530',
		buttons:[{
			text:'确定',
			iconCls:'icon-save',
			handler:function(){
			
				var value=$("#selectFrame",top.document.body).contents().find("#selectedUser").val();
				var valueid=$("#selectFrame",top.document.body).contents().find("#selectedUserid").val();
				$("#username").val(value);
				$("#userid").val(valueid);
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



//查询
function query() {
	$('#authorgrid').datagrid('clearSelections');
	var monitortypename= $("#monitortypename").val();	
	$('#authorgrid').datagrid( {
		queryParams : {
		monitortypename: monitortypename			
		},
		pageNumber : 1
	});
}

