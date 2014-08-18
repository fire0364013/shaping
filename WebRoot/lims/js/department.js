$(function(){
	var documentWidth=document.body.clientWidth;
			$('#datagrid1').datagrid({
				width:documentWidth,
				height:655,
				nowrap: false,
				striped: true,
				collapsible:true,
				url:rootPath +'/departmentinfo/departmentinfo!toList.action', 
				fit:true,
				fitColumns : true,
				scrollbarSize:0,
				remoteSort: false,
				idField:'deptid',
				singleSelect:false,
				pageSize:20,
				pageList:[20,30,40,50],
				frozenColumns:[[
					{field:'deptid',checkbox:true,align:"center"}
								]],
				columns:[[
						{field:'deptname',title:'部门名称',width:425,align:"center"},					
						
						{field:'orderid',title:'序号',width:420,align:"center"},
						{field:'operate',title:'操作',width:120,align:"center",
							formatter:function(value,rec,rowIndex){
								var links='<img src="'+rootPath+'/themes/default/images/xiangxiimage.png"   alt="详细"  id="btnshow" onclick="detail('+ rec.deptid +')"/>&nbsp;&nbsp;';
								links+='<img src="'+rootPath+'/themes/default/images/bianjiimage.png"  alt="编辑"  id="btnshow" onclick="addWin('+ rec.deptid +')"/>&nbsp;&nbsp;';
								links+='<img src="'+rootPath+'/themes/default/images/deleteimage.png"   alt="删除" id="btnshow" onclick="del('+ rec.deptid +','+rowIndex+')"/>';
								return links;
							}
						}						
				]],
				pagination:true,
				rownumbers:true,
				onLoadSuccess:function(){
					$('#datagrid1').datagrid('clearSelections');
				}
			});
			$(window).resize(function() {
				$("#datagrid1").datagrid('resize');
			});
});		
		//添加
		function addWin(id){
			$('#datagrid1').datagrid('clearSelections');
			var url = rootPath +"/departmentinfo/departmentinfo!input.action";
			if(id!=""){
				url = url + "?id="+id;
			}
			//$(window.top.document).find("#btnProjectInfo").click();
			var _dialog =  window.top.$('	<div id ="role-dlg" style="padding:0px;"><iframe id="departmentinfoFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'>77</iframe>		</div>').appendTo(window.top.document.body);
			//window.top.document.body.appendChild(win);
			_dialog.dialog({
				title:'部门编辑',
				autoOpen:false,
				modal:true,
				closed:true,
				width:'300',
				height:'200',
				buttons:[{
					text:'保存',
					iconCls:'icon-save',
					handler:function(){
						$("#departmentinfoFrame",top.document.body).contents().find("#departmentinfoform").form('submit',{
							url:'departmentinfo!save.action',
							onSubmit:function(){
								var objs = $("#departmentinfoFrame",top.document.body).contents().find(".grkj-validate");
								if(!saveCheck(objs)){
									$("#departmentinfoFrame",top.document.body).contents().find(":input").focus();
									alert("数据输入不符合格式，请查看红色边框的输入框的输入提示！");
									return false;
								}
								
							},
							success:function(data){
								_dialog.dialog('close');
								$("#datagrid1").datagrid('reload'); 
								alert('成功');
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
			$('#datagrid1').datagrid('clearSelections');
				var url = rootPath +"/departmentinfo/departmentinfo!view.action?id="+id;
				//if(id!=""){
				//	url = url + "?id="+id;
				//}
				//$(window.top.document).find("#btnProjectInfo").click();
				var _dialog =  window.top.$('	<div id ="role-dlg" style="padding:0px;"><iframe id="departmentinfoFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
				//window.top.document.body.appendChild(win);
				_dialog.dialog({
					title:'部门详情',
					maximizable:true,
					autoOpen:false,
					modal:true,
					closed:true,
					width:'300',
					height:'200'
				});
				_dialog.dialog('open');
			}
		
		//单条删除
		function del(uid,rowIndex){
			$('#datagrid1').datagrid('clearSelections');
			$('#datagrid1').datagrid('selectRow',rowIndex);
				if(window.confirm('是否删除？')){
					$.post(rootPath +"/departmentinfo/departmentinfo!deleteOnlyOne.action",{id:uid},function(del){
						if(del=='success'){
							$('#datagrid1').datagrid('clearSelections');
							$("#datagrid1").datagrid('reload');
							alert('成功');
						}
						
					});
				}
		}
		
		//批量删除	
		function delAll(){
			var selected=$("#datagrid1").datagrid('getSelections');
			//alert(selected.length);
			if(selected==null || selected.length< 1){
				alert('请至少选择一条记录！');
			}
			else{
				if(window.confirm('是否删除？')){
					var cc="";
					for ( var i = 0; i < selected.length; i++) {
						if(cc==""){
							cc=selected[i]['deptid'];
						}
						else{
							cc+=","+selected[i]['deptid'];
							}
					}
					$.post(rootPath +"/departmentinfo/departmentinfo!deleteAll.action",{"ids":cc},function(del){
						if(del=='success'){
							$('#datagrid1').datagrid('clearSelections');
							$("#datagrid1").datagrid('reload');
							alert('成功');
						}
					});
					
				 }
			}
		}
		
		//查询
		function query(){
			var deptnames=$("#deptnames").val();
			$('#datagrid1').datagrid( {
				queryParams : {
				deptnames : deptnames
				},
				pageNumber:1		
			});
			//location.href = "departmentinfo.action?deptid=" + deptid+"&deptnames="+deptnames;
			
		}
		
		//选择弹出框
		function selectdepar(id){
			var url = rootPath +"/departmentinfo/departmentinfo!selectlist.action";
			var _dialog =  window.top.$('	<div id ="role-dlg" style="padding:0px;"><iframe id="selectFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
			_dialog.dialog({
				title:'部门编辑',
				autoOpen:false,
				modal:true,
				closed:true,
				width:'630',
				height:'530',
				buttons:[{
					text:'保存',
					iconCls:'icon-save',
					handler:function(){
						//var depname=$("#depname").val().split(",");
						//var depid=$("#depid").val().split(",");
						var seletdeptnames=$("#selectFrame",top.document.body).contents().find("#seletdeptnames").val().split(",");
						var selected=$("#selectFrame",top.document.body).contents().find("#seletdeptid").val().split(",");
						var value=$("#managedepts").val().split(",");//此处managedepts是用户里面所用，请勿更改
						var valueid=$("#depid").val().split(",");
					//上面是追加，下面这句是不追加~~重新选择，用户里面用到
					//	var value="";
					//	var valueid="";
						for ( var j = 0; j < selected.length; j++) {
							var tt=0;
							for ( var i = 0; i < valueid.length; i++) {
								if(valueid[i]==selected[j]){
									tt=1;
								}
							}
							if(tt==0){
								if(value==""){
									value+=seletdeptnames[j];
								}else{
									value+=","+seletdeptnames[j];
								}
								if(valueid==""){
									valueid+=selected[j];
								}else{
									valueid+=","+selected[j];
								}
							}
						}
						$("#managedepts").val(value);//此处managedepts是用户里面所用，请勿更改
						$("#depid").val(valueid);
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