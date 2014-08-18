function relaod(){//重新装载数据
	$('#datagrid').datagrid('reload');
}

function initDataGrid(){
	//alert("wodth:"+width+";height:"+height);
			$('#datagrid').datagrid({
			//	width:800,
			//	height:400,
				nowrap: false,
				striped: true,
				collapsible:true,
				scrollbarSize:0,
				url:rootPath+'/templet/templates!toList.action?jianCeDianId='+jianCeDianId+'&templatetypeid='+templatetypeid+"&itemid="+itemid,
				fit:true,
				fitColumns:true,
				idField:'templateid',
				columns:[[
					{field:'templateid',checkbox:true,align : 'center'},
			        {field:'templatename',title:'模板名称',width:300,align : 'center'},					
					{field:'templatepath',title:'文件名称',width:300,align : 'center'},
					{field:'isdefault',title:'是否主报表',width:300,align : 'center'},
					{field:'operate',title:'操作',width:120,align : 'center',
						formatter:function(value,rec,rowIndex){
						var links='<img src="'+rootPath+'/themes/default/images/xiangxiimage.png"   alt="详细"  id="btnshow" onclick="detail('+ rec.templateid +')"/>&nbsp;&nbsp;';
						links+='<img src="'+rootPath+'/themes/default/images/deleteimage.png"   alt="删除" id="btnshow" onclick="del(\''+ rec.templateid +'\',\''+rec.templatepath+'\')"/>&nbsp;&nbsp;';
						links += '<img src="'
							+ rootPath
							+ '/themes/default/images/indexhome.png" id="btnshow" onclick="parReport(\''
							+ rec.templateid +'\',\''+rec.templatetypeid +'\',\''+rec.id1 +'\',\''+rec.id2+'\',\''+rec.isdefault
							+ '\',\''+rec.templatename+'\')" alt="设置主报表"/>	';
						return links;
						}
					}					
				]],
//				onLoadSuccess:function(data){
//					if(data.rows.length>0){
//						setTimeout("mergeCellsByField(\"datagrid\",\"templatename\")",10)
//					}
//				},
				pagination:true,
				rownumbers:true,
				pageSize:10,
				pageList:[10,20,30,40]
				
			});
		$(window).resize(function(){
			$("#datagrid").datagrid('resize');
		})	;
			
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
   // for (j=ColArray.length-1;j>=0 ;j-- )
    if(j=ColArray[0])
    {
        //当循环至某新的列时，变量复位。
        PerTxt="";
        tmpA=1;
        tmpB=0;
        
        //从第一行（表头为第0行）开始循环，循环至行尾(溢出一位)
        for (i=0;i<=TableRowCnts ;i++ )
        {
            if (i==TableRowCnts) {
                CurTxt="";
            } else{
                CurTxt=tTable.datagrid("getRows")[i][ColArray[0]];
            }
         //   if (PerTxt==CurTxt&&上一行姓名==当前行姓名){
            if (PerTxt==CurTxt){
                tmpA+=1;
            } else{
                tmpB+=tmpA;
                for (f=ColArray.length-1;f>=0 ;f-- ){
                tTable.datagrid('mergeCells',{
                    index:i-tmpA,
                    field:ColArray[f],
                    rowspan:tmpA,
                    colspan:null
                });              
                }
                tmpA=1;
            }
            PerTxt=CurTxt;
            
        }
    }
}

//设置主报表的操作      模板的id，模板类型，id1，id2,
function parReport(templateid,templatetypeid,id1,id2,isdefault,templatename){
	$('#datagrid').datagrid('clearSelections');
	if(isdefault=='是'){
		alert("当前报表已经是主报表，请勿重复设置！");
		return false;
	}
	if (window.confirm('你确定要将此报表设置为主报表吗？')) {
		$.post(rootPath +'/templet/templates!saveMainSampe.action', {
			templateid : templateid,
			templatetypeid : templatetypeid,
			jianCeDianId : id1,
			itemid : itemid,
			flagName:ori,
			templatename:templatename
		}, function(del) {
			if (del == 'success') {
				alert("设置成功！");
				$("#datagrid").datagrid('reload');
			}else{
				alert("设置失败！");
			}
		});
	}
}
//检索
function searchObj(){
	var templatename = $('#templatename').val();	//模块名称
	var templatetypeid = $('#templatetypeid').val();  //模块类型
	$('#datagrid').datagrid( {
		queryParams : {
		templatename : templatename,
			templatetypeid : templatetypeid
		},
		pageNumber:1             //查询后指定页码为1
	});

}

//打开详细页面
function detail(id){
	$('#datagrid').datagrid('clearSelections');
	var url = rootPath +"/templet/templates!view.action?id="+id;
	var _dialog =  window.top.$('	<div id ="role-dlg" style="padding:0px;"><iframe id="roleFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
	_dialog.dialog({
	title:'模块详情',
	autoOpen:false,
	modal:true,
	closed:true,
	width:'370',
	height:'280',
	onClose:function(){
			_dialog.dialog("destroy");					
		}
	});
	_dialog.dialog('open');

}
//单条删除
function del(uid,templatepath){
	$('#datagrid').datagrid('clearSelections');
		if(window.confirm('是否删除？')){
			$.post(rootPath +"/templet/templates!deleteOnlyOne.action",{id:uid,templatepath:templatepath,templatetypeid:templatetypeid},function(del){
				if(del=='success'){
					$('#datagrid').datagrid('clearSelections');
					$("#datagrid").datagrid('reload');
					alert('成功');
				}
				
			});
		}
}
//批量删除	
function delAll(){
	var selected=$("#datagrid").datagrid('getSelections');
	if(selected==null || selected.length< 1){
		alert('请至少选择一条记录！');
	}else{
		if(window.confirm('是否删除？')){
			var cc=[];
			var ss=[];
			for ( var i = 0; i < selected.length; i++) {
				if(cc==""){
						cc+=selected[i]['templateid'];
						ss+=selected[i]['templatepath'];
				}
				else{
					cc+=","+selected[i]['templateid'];
					ss+=","+selected[i]['templatepath'];
					}
			}
			$.post(rootPath +"/templet/templates!deleteAll.action",{ids:cc,templatepath:ss,templatetypeid:templatetypeid},function(del){
				if(del=='success'){
					$('#datagrid').datagrid('clearSelections');
					$("#datagrid").datagrid('reload');
					alert('成功');
				}
			});
			
		 }
	}
}
/**
 * 增加
 * @return
 */
function addTempte(){
	$('#datagrid1').datagrid('clearSelections');
	var url = rootPath +"/templet/templates!input.action?templatetypeid="+templatetypeid+"&jianCeDianId="+jianCeDianId;
	
	if(itemid!=""){
		url = url + "&itemid="+itemid;
	}
	if(templateid!=""){
		url = url + "&templateid="+templateid;
	}
	var _dialog =  window.top.$('	<div id ="role-dlg" style="padding:0px;"><iframe id="tempalteFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
	//window.top.document.body.appendChild(win);
	_dialog.dialog({
		title:'模板编辑',
		autoOpen:false,
		modal:true,
		closed:true,
		width:'500',
		height:'200',
		buttons:[{
			text:'保存',
			iconCls:'icon-save',
			handler:function(){
			$("#tempalteFrame",top.document.body).contents().find("#tempalteform").form('submit',{
					url:rootPath +'/templet/templates!save.action',
					onSubmit:function(){
						 var samplefile=$("#tempalteFrame",top.document.body).contents().find("#samplefile").val();
						 if(samplefile!=null&&samplefile!=""){
							var filename=samplefile.substring(samplefile.lastIndexOf(".")).toLowerCase(); 
							if(filename!=".raq"){
								alert("只能上传.raq文件");
								return false;
							}
						 }
						//var objs = $(window.top.frames["tempalteFrame"].document).find(".grkj-validate");
						/*if(!saveCheck(objs)){
							$(window.top.frames["tempalteFrame"].document).find(":input").focus();
							$(window.top.frames["tempalteFrame"].document).find("#templatetypeid").focus();
							alert("数据输入不符合格式，请查看红色边框的输入框的输入提示！");
							return false;
						}*/
					},
					success:function(data){
						
						if(data=="success"){
						_dialog.dialog('close');
						$("#datagrid").datagrid('reload');
							alert('成功');
						}
						else if(data=="wenjian"){
							alert('此模板文件已经存在！');
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

