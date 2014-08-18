$(function(){
	var documentWidth=document.body.clientWidth;
	var versionid = $('#versionid').val();
			$('#intemchargedata').datagrid({
				//title:'用户信息列表',
				width:documentWidth,
				height:655,
				nowrap: false,
				striped: true,
				collapsible:true,
				url:rootPath +'/charge/itemcharge/monitoritemcharge!toList.action?versionid='+versionid, 
				fit:true,
				fitColumns : true,
				scrollbarSize:0,
				singleSelect:false,
				pageSize:20,
				pageList:[20,30,40,50],
				frozenColumns:[[
					{field:'itempriceid',checkbox:true,align:"center"}
						]],
				columns:[[
					    {field:'itemtypeid',title:'itemtypeid',width:100,align:"center",hidden:"true"},
						{field:'itemName',title:'项目名称',width:300,align:"center"},
						{field:'btypeName',title:'项目大类',width:200,align:"center"},
						{field:'stypeName',title:'项目小类',width:200,align:"center"},
						{field:'sampleFee',title:'样品采集费',width:200,align:"center"},
						{field:'analysisFee',title:'分析费',width:200,align:"center"},
						{field:'beforeFee',title:'前处理费',width:200,align:"center"},
						{field:'price',title:'单价',width:150,align:"center"},
						{field:'operate',title:'操作',width:150,align:"center",
							formatter:function(value,rec,rowIndex){
								var links='<img src="'+rootPath+'/themes/default/images/xiangxiimage.png" alt="详细" id="btnshow" onclick="detail('+ rec.itempriceid+')"/>&nbsp;&nbsp;';
								links+='<img src="'+rootPath+'/themes/default/images/bianjiimage.png" alt="编辑" id="btnshow" onclick="addWin('+ rec.itempriceid +')"/>&nbsp;&nbsp;';
								links+='<img src="'+rootPath+'/themes/default/images/deleteimage.png" alt="删除" id="btnshow" onclick="del(\''+rec.itempriceid+ '\',\''+ rowIndex+'\')"/>';
								return links;
							}
						}						
				]],
				pagination:true,
				rownumbers:true,
				onLoadSuccess:function(){
					$('#intemchargedata').datagrid('clearSelections');
				}
			});
			$(window).resize(function() {
				$("#intemchargedata").datagrid('resize', {
					width : function() {
						return documentWidth;
					},
					height : function() {
						return document.body.clientHeight;
					}
				});
			});
	});	
		//单条删除
		function del(uid,row){
			$('#intemchargedata').datagrid('clearSelections');
			$('#intemchargedata').datagrid('selectRow',row);
				if(window.confirm('是否删除？')){
					$.post(rootPath +"/charge/itemcharge/monitoritemcharge!deleteOnlyOne.action",{id:uid},function(del){
						if(del=='success'){
							$('#intemchargedata').datagrid('clearSelections');
							$("#intemchargedata").datagrid('reload');
							alert('成功');
						}else{
							alert('失败');
						}
					});
				}
		}
		//添加
		function addWin(id){
			var versionid = $('#versionid').val();
			$('#intemchargedata').datagrid('clearSelections');
			var url = rootPath +"/charge/itemcharge/monitoritemcharge!input.action?versionid="+versionid;
			if(id!=""){
				url = url + "&id="+id;
			}
			var _dialog =  window.top.$('	<div id ="role-dlg" style="padding:0px;"><iframe id="itemChargeFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
			_dialog.dialog({
				title:'监测项目收费标准编辑',
				autoOpen:false,
				modal:true,
				closed:true,
				width:'700',
				height:'400',
				buttons:[{
					text:'保存',
					iconCls:'icon-save',
					handler:function(){
					
						$("#itemChargeFrame",top.document.body).contents().find("#itemCharge").form('submit',{
							url:rootPath +'/charge/itemcharge/monitoritemcharge!save.action',
							onSubmit:function(){
								var objs = $("#itemChargeFrame",top.document.body).contents().find(".grkj-validate");
								if(!saveCheck(objs)){
									$("#iteminfoFrame",top.document.body).contents().find(":input").focus();
									alert("数据输入不符合格式，请查看红色边框的输入框的输入提示！");
									return false;
								}
							},
							success:function(data){
								if(data=='success'){
								_dialog.dialog('close');
								$("#intemchargedata").datagrid('reload');
								alert('成功');
								}else{
									alert("失败");
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
		//关闭
		function closeAddWin(){
			$('#addWin').window('close');
		}
		//详情
		function detail(id){
			$('#intemchargedata').datagrid('clearSelections');
				var url = rootPath +"/charge/itemcharge/monitoritemcharge!view.action?id="+ id;
				var _dialog =  window.top.$('<div id ="role-dlg" style="padding:0px;"><iframe id="itemChargeFrame" width="100%" height="560px;" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
				_dialog.dialog({
					title:'监测项目收费标准详情',
					autoOpen:false,
					maximizable:true,
					modal:true,
					closed:true,
					width:'500',
					height:'400'
				});
				_dialog.dialog('open');
			}
		
		//批量删除	
		function delAll(){
			var selected=$("#intemchargedata").datagrid('getSelections');
			if(selected==null || selected.length< 1){
				alert('请至少选择一条记录！');
			}
			else{
				if(window.confirm('是否删除？')){
					var cc=[];
					for ( var i = 0; i < selected.length; i++) {
						if(cc==""){
								cc+=selected[i]['itempriceid'];
						}
						else{
							cc+=","+selected[i]['itempriceid'];
							}
					}
					$.post(rootPath +"/charge/itemcharge/monitoritemcharge!deleteAll.action",{"ids":cc},function(del){
						if(del=='success'){
							$('#intemchargedata').datagrid('clearSelections');
							$("#intemchargedata").datagrid('reload');
							alert('成功');
						}
					});
				 }
			}
		}
		function query(){
			$('#intemchargedata').datagrid('clearSelections');
			var itemid=$("#itemid").val();
			var bitemtypeid=$("#bitemtypeid").val();
			var sitemtypeid=$("#sitemtypeid").val();
			$('#intemchargedata').datagrid( {
				queryParams : {
				itemid : itemid,
				bitemtypeid : bitemtypeid,
				sitemtypeid : sitemtypeid
				
				},
				pageNumber:1		
			});
		}

	 function xiaolei(iteminfo){
    	 var smallitemtype = document.getElementById('sitemtypeid'); 
    	 var monitoritem = document.getElementById('itemid'); 
    	 var iteminfo1 = eval(iteminfo);
    	 smallitemtype.options.add(new Option("---请选择---",""));
    	  monitoritem.options.add(new Option("---请选择---",""));
    	 for(var i = 0;i<iteminfo1.length;i++){
    		 smallitemtype.options.add(new Option(iteminfo1[i].itemtypename,iteminfo1[i].itemtypeid));
    	 }
     }
  function item(iteminfo){
 	    var monitoritem = document.getElementById('itemid');  
    	 var iteminfo1 = eval(iteminfo);
    	 monitoritem.options.add(new Option("---请选择---",""));
    	 for(var i = 0;i<iteminfo1.length;i++){
    		 monitoritem.options.add(new Option(iteminfo1[i].itemname,iteminfo1[i].itemid));
    	 }
     }
 //改变大类级联小类
function changeDailei(){
  $("#sitemtypeid").html("");//清空小类下拉框
  $("#itemid").html("");//清空监测项目下拉框
  var bigitemtype = $("#bitemtypeid").val();
   $.ajax({
   type: "POST",
   url: rootPath +"/charge/itemcharge/monitoritemcharge!dalei.action",
   data: "bitemtypeid="+bigitemtype,
   success: function(msg){
     xiaolei(msg);
   }
});	
}
 //改变小类级联项目
function changeXiaolei(){
  $("#itemid").html("");//清空监测项目下拉框
  var sitemtypeid = $("#sitemtypeid").val();
   $.ajax({
   type: "POST",
   url: rootPath +"/charge/itemcharge/monitoritemcharge!xiaolei.action",
   data: "sitemtypeid="+sitemtypeid,
   success: function(msg){
     item(msg);
   }
});	
}
