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
$(function(){
		$('#grouptree').tree({
			url: rootPath+"/group/departmentgroup!toTrees.action",
			onClick:function(node){
			$("#del").show();
				var deviceUrl="";
				var myurl="";
				var groupid="";
				var parentnode=$('#grouptree').tree('getParent',node.target);
				if(parentnode!=null){
					if(parentnode.id==""){
						myurl=rootPath+"/group/departmentgroup!showUserGroup.action?deptid="+encodeURI(node.id);
						deviceUrl=rootPath+"/group/departmentgroup!getItemDivice.action?deptid="+encodeURI(node.id);
					}else{
						groupid=encodeURI(node.id);
						myurl=rootPath+"/group/departmentgroup!showUserGroup.action?deptid="+parentnode.id+"&groupid="+groupid;
						deviceUrl=rootPath+"/group/departmentgroup!getItemDivice.action?deptid="+parentnode.id+"&groupid="+groupid;
					}
				}else{
					myurl=rootPath+"/group/departmentgroup!showUserGroup.action";
					deviceUrl=rootPath+"/group/departmentgroup!getItemDivice.action";
				}
				
				$("#itemtable").show();$("#usertable").show();
				$("#itemtypeid").val("");$("#itemname").val("");$("#realname").val("");
				clicknode(myurl,groupid);
				getItemDeviceList(deviceUrl);
			},onContextMenu:contextMenu
		});
		//clicknode(rootPath+"/group/departmentgroup!showUserGroup.action);
	});	
	function contextMenu(e,node){
		$('#grouptree').tree('select',node.target);
		if(node.attributes=="department"){
			$("#updategroup").attr("disabled","disabled");//修改分组
			$('#updategroup').addClass("disable");
			
			$("#addgroupitem").attr("disabled","disabled");//添加监测项目
			$('#addgroupitem').addClass("disable");
			
			$("#addusergroup").attr("disabled","disabled");//增加分组
			$('#addusergroup').addClass("disable");
			
			$("#deletegroup").attr("style","display:none");//删除分组（在是部门的情况下  是批量删除）
			$("#deletegroupAll").removeAttr("style");
			
			$("#grouptree-menu").menu("show", {left: e.pageX,top: e.pageY});
		}
		else if(node.attributes=="group"){
			$("#updategroup").removeAttr("disabled");//修改分组
			$('#updategroup').removeClass("disable");
			
			$("#addgroupitem").removeAttr("disabled");//添加监测项目
			$('#addgroupitem').removeClass("disable");
			
			$("#addusergroup").removeAttr("disabled");//增加分组
			$('#addusergroup').removeClass("disable");
			
			$("#deletegroup").removeAttr("style","display:none");//删除分组（在是组的情况下  是单条删除）
			$("#deletegroupAll").attr("style","display:none");
			$("#deletegroup").removeAttr("style");
			
			$("#grouptree-menu").menu("show", {left: e.pageX,top: e.pageY});
		}
		e.preventDefault();
	}
	//增加分组
	function addGroup(id){
		if(id=='edit'){
			if($("#updategroup").attr("disabled")=="disabled"){
				return false;
			}
		}
		var selecttree=$('#grouptree').tree('getSelected');
		var deptid=selecttree.id;
		var deptname="";
		var groupid="";
		if(selecttree.attributes=="group"){
			if(id=='edit'){
				deptname=selecttree.text;
				groupid=selecttree.id;
			}
			var parentnode=$('#grouptree').tree('getParent',selecttree.target);
				deptid=parentnode.id;
		}
		editGroup(deptname,deptid,groupid);
	}
	function editGroup(value,id,groupid){
		var _dialog =  window.top.$('<div id ="role-dlg" style="padding:0px;">'
				+'<table width="100%" border="1" align="center" class="grid">'
				+'<tr>'
				+'<td  align="left" class="Main_Tab_Style_title" width="100px">组名称:</td>'
				+'<td  align="left" class="Main_Tab_Style_Content" width="150px">'
				+'<input id="groupname" name="groupname"  class="TextBox grkj-validate" style="width: 150px;height:20px"'
				+'validateParam="{type:\'String\',maxLength:\'40\',required:\'true\',message:\'请输入组名！\' }" value="'+value+'"/>'
				+'</td>'
				+'</tr>'
				+'</table>'
				+'</div>').appendTo(window.top.document.body);
		_dialog.dialog({
			title:'分组编辑',
			autoOpen:false,
			modal:true,
			closed:true,
			width:'300',
			height:'100',
			buttons:[{
				text:'确定',
				iconCls:'icon-save',
				handler:function(){
				var groupname=$(window.top.document).find("#groupname").val();
				var objs = $(window.top.document).find(".grkj-validate");
				if(!saveCheck(objs)){
					$(window.top.document).find(":input").focus();
					alert("请输入组名称,并且不能超过20个字！");
					return false;
				}else{
						$.post(rootPath +"/group/departmentgroup!save.action",{groupname:groupname,deptid:id,id:groupid},function(data){
							if(data=='success'){
								alert('成功');
								$("#grouptree").tree('reload');
							}else{
								alert('失败');
							}
						});//post
						_dialog.dialog('close');
					}//else
				}//function
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
	//批量删除分组
	function delGroupdelAll(){
		var selecttree=$('#grouptree').tree('getSelected');
		if(window.confirm('是否删除部门下所有分组、人员和项目？')){
			$.post(rootPath +"/group/departmentgroup!deleteAll.action",{deptid:selecttree.id},function(data){
				if(data=='success'){
					alert('成功');
					$("#grouptree").tree('reload');
					$('#datagrid1').datagrid('reload');
					$('#itemlist').datagrid('reload');
				}else{
					alert('失败');
					$("#grouptree").tree('reload');
					$('#datagrid1').datagrid('reload');
					$('#itemlist').datagrid('reload');
				}
			});//post
		}
	}
	//删除分组
	function delGroup(){
		var selecttree=$('#grouptree').tree('getSelected');
		if(window.confirm('是否删除部门组、人员和项目？')){
			$.post(rootPath +"/group/departmentgroup!deleteOne.action",{groupid:selecttree.id},function(data){
				if(data=='success'){
					alert('成功');
					$("#grouptree").tree('reload');
					$('#datagrid1').datagrid('reload');
					$('#itemlist').datagrid('reload');
				}else{
					alert('失败');
					$("#grouptree").tree('reload');
					$('#datagrid1').datagrid('reload');
					$('#itemlist').datagrid('reload');
				}
			});//post
		}
	}
	//加载人员列表
	function clicknode(myurl,groupid){
		if(groupid!=""){
			$('#datagrid1').datagrid({
				nowrap : false,
				striped : true,
				collapsible : true,
				url :myurl,
				fit : true,
				fitColumns : true,
				scrollbarSize:0,
				remoteSort : false,
				idField : 'usergroupid',
				pageSize : 9,
				pageList : [ 9, 18, 27,36 ],
				frozenColumns : [ [ {
					field : 'userid',
					checkbox : true,
					align:"center"
				} ] ],
				columns:[[
						{field:'realname',title:'姓名',width:340,align:"center"},
						{field:'isprincipal',title:'是否负责人',width:340,align:"center",
							formatter:function(value,rec,rowIndex){
								if(value=="Y"){
									return "是";
								}else if(value=="N"){
									return "否";
								}else{
									return "";
								}
							}
						},
						{field:'operate',title:'操作',width:100,align:"center",
								formatter:function(value,rec,rowIndex){
									var links='<img src="'+rootPath+'/themes/default/images/indexhome.png"   alt="设置负责人"  id="btnshow" onclick="setPrincipal(\''+ rec.isprincipal +'\','+ rec.usergroupid +','+rowIndex+')"/>&nbsp;&nbsp;';
									links+='<img src="'+rootPath+'/themes/default/images/deleteimage.png"   alt="删除" id="btnshow" onclick="delOne('+ rec.usergroupid +','+rowIndex+')"/>';
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
		}
		else{
			$('#datagrid1').datagrid({
				nowrap : false,
				striped : true,
				collapsible : true,
				url :myurl,
				fit : true,
				fitColumns : true,
				scrollbarSize:0,
				remoteSort : false,
				idField : 'usergroupid',
				pageSize : 9,
				pageList : [ 9, 18, 27,36 ],
				frozenColumns : [ [ {
					field : 'userid',
					checkbox : true
				} ] ],
				columns:[[
						{field:'realname',title:'姓名',width:640,align:"center"},
						{field:'isprincipal',title:'是否负责人',width:340,align:"center",
							formatter:function(value,rec,rowIndex){
								if(value=="Y"){
									return "是";
								}else if(value=="N"){
									return "否";
								}else{
									return "";
								}
							}
						}
				]],
				pagination:true,
				rownumbers:true
			});
		}
		$("#groups").resize(function() {
			$("#datagrid1").datagrid('resize');
		});
	}
	//查询人员
	function query(){
			var realname=$("#realname").val();
			var myurl="";
			var groupid="";
			var selecttree=$('#grouptree').tree('getSelected');
			var parentnode=$('#grouptree').tree('getParent',selecttree.target);
			if(parentnode!=null){
				if(parentnode.id==""){
					myurl=rootPath+"/group/departmentgroup!showUserGroup.action?deptid="+selecttree.id+"&realname="+encodeURIComponent(encodeURIComponent(realname));
				}else{
					groupid=selecttree.id;
					myurl=rootPath+"/group/departmentgroup!showUserGroup.action?deptid="+parentnode.id+"&groupid="+groupid+"&realname="+encodeURIComponent(encodeURIComponent(realname));
				}
			}else{
				myurl=rootPath+"/group/departmentgroup!showUserGroup.action?realname="+encodeURI(realname);
			}
			$("#itemtable").show();$("#usertable").show();
			clicknode(myurl,groupid);
			
	}
	//加载仪器信息列表
	function getItemDeviceList(deviceUrl){
			$('#itemlist').datagrid({
				nowrap : false,
				striped : true,
				collapsible : true,
				url :deviceUrl,
				fit : true,
				fitColumns : true,
				scrollbarSize:0,
				remoteSort : false,
				idField : 'analysesetid',
				pageSize : 9,
				pageList : [ 9, 18, 27,36 ],
				frozenColumns : [ [ {
					field : 'analysesetid',
					checkbox : true,
					align:"center"
				} ] ],
				columns:[[
						{field:'itemname',title:'项目名字',width:100,align:"center"},
						{field:'itemtype',title:'项目类型',width:120,align:"center"},
						{field:'methodname',title:'分析方法',width:300,align:"left"},
						{field:'devicetypename',title:'设备类型',width:100,align:"center"},
						{field:'operate',title:'操作',width:30,align:"center",
							formatter:function(value,rowData,rowIndex){
								return '<img src="'+rootPath+'/themes/default/images/bianjiimage.png"  alt="编辑"   onclick="editDevice(\''+rowData.analysesetid+'\')"/> ' ;
							}
						}
				]],
				pagination:true,
				rownumbers:true,
				onLoadSuccess:function(data){
//					$('#itemlist').datagrid('clearSelections');
					if(data.rows.length>0){
						setTimeout("mergeCellsByField(\"itemlist\",\"itemname,itemtype\")",10)
					}
				}
			});
		$("#groups").resize(function() {
			$("#datagrid1").datagrid('resize');
		});
	}
	
//合并单元格
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
	//查询项目
	function devicequery(){
		var itemtypeid=encodeURI($("#itemtypeid").val());
		var itemname=encodeURIComponent(encodeURIComponent($("#itemname").val()));
			var deviceUrl="";
			var groupid="";
			var selecttree=$('#grouptree').tree('getSelected');
			var parentnode=$('#grouptree').tree('getParent',selecttree.target);
			if(parentnode!=null){
				if(parentnode.id==""){
					deviceUrl=rootPath+"/group/departmentgroup!getItemDivice.action?deptid="+selecttree.id+"&itemname="+itemname+"&itemtypeid="+itemtypeid;
				}else{
					groupid=selecttree.id;
					deviceUrl=rootPath+"/group/departmentgroup!getItemDivice.action?deptid="+parentnode.id+"&groupid="+groupid+"&itemname="+itemname+"&itemtypeid="+itemtypeid;
				}
			}else{
				deviceUrl=rootPath+"/group/departmentgroup!getItemDivice.action?itemname="+itemname+"&itemtypeid="+itemtypeid;
			}
			getItemDeviceList(deviceUrl);
	}
	//删除项目仪器
	function delAllItemDevice(){
		var selected=$("#itemlist").datagrid('getSelections');
		if(selected==null || selected.length< 1){
			alert('请至少选择一条记录！');
		}
		else{
			if(window.confirm('是否删除？')){
				var cc=[];
				for ( var i = 0; i < selected.length; i++) {
					if(cc==""){
							cc+=selected[i]['analysesetid'];
					}
					else{
						cc+=","+selected[i]['analysesetid'];
					}
				}
				$.post(rootPath +"/group/departmentgroup!deleteItemDevice.action",{analysesetid:cc},function(del){
					if(del=='success'){
						$('#itemlist').datagrid('clearSelections');
						$("#itemlist").datagrid('reload');
						alert('删除成功！');
					}
				});
				
			 }
		}
	}
	
	//修改仪器设备类型
function editDevice(analysesetid){
	var url = rootPath + "/group/departmentgroup!toDeviceInputPage.action?analysesetid="+analysesetid;
	var _dialog =  window.top.$('	<div id ="unit-dlg" style="padding:0px;"><iframe id="deviceFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);

	_dialog.dialog({
	title:'仪器设备类型修改',
	autoOpen:false,
	modal:true,
	closed:true,
	width:'345',
	height:'260',
	buttons:[{
		text:'保存',
		iconCls:'icon-save',
		handler:function(){
			var devicetypeid = $("#deviceFrame",top.document.body).contents().find("#deviceType").val();
//			alert(devicetypeid);
			$.post(
				rootPath +"/group/departmentgroup!updateDeviceType.action",
				{analysesetid:analysesetid,devicetypeid:devicetypeid},
				function(msg){
					if(msg=="success"){
						alert("修改成功！");
						_dialog.dialog("close");
						$("#itemlist").datagrid('reload');
					}else{
						alert("修改失败！");
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
	
	//设置负责人
	function setPrincipal(isprincipal,usergroupid,rowIndex){
		if(isprincipal=="Y"){
			alert("已经是负责人，请勿重复设置！");
		}else{
			if(window.confirm('是否设置负责人')){ 
				$('#datagrid1').datagrid('clearSelections');
				$('#datagrid1').datagrid('selectRow',rowIndex);
				$.post(rootPath+"/group/departmentgroup!setPrincipal.action",{usergroupid:usergroupid},function(del){
					if(del="suceess"){
						alert("成功！");
						$('#datagrid1').datagrid("reload");
					}
				});
			}
		}
	}

	//增加人员
	function addUserGroup(){
		if($("#addusergroup").attr("disabled")=="disabled"){
			return false;
		}
		var selecttree=$('#grouptree').tree('getSelected');
		var parentnode=$('#grouptree').tree('getParent',selecttree.target);
		//
		//$.post( rootPath +"/group/departmentgroup!getUserGroupData.action",{deptid:parentnode.id,groupid:selecttree.id},function(data){
			var url =  rootPath +"/group/departmentgroup!toUserGroup.action?deptid="+parentnode.id+"&groupid="+selecttree.id;
			/*if(data!=null&&data!=""){
				var dataStr=data.split("&");
				url+="&thisuserid="+dataStr[0]+"&username"+dataStr[1];
			}*/
			var _dialog =  window.top.$('<div id ="role-dlg" style="padding:0px;"><iframe id="manyUserFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
			_dialog.dialog({
			   title:'人员列表',
				autoOpen:false,
				modal:true,
				closed:true,
				width:'800',
				height:'500',
				buttons:[{
					text:'保存',
					iconCls:'icon-save',
					handler:function(){
					var userid=$("#manyUserFrame",top.document.body).contents().find("#selectedUserid").val();
						$.post(rootPath +"/group/departmentgroup!saveUserGroup.action",{userid:userid,deptid:parentnode.id,groupid:selecttree.id},function(data){
							if(data=='success'){
								alert('成功');
								//$("#grouptree").tree('reload');
								//$('#datagrid1').datagrid('reload');
								var deviceUrl="";
								var myurl="";
								var groupid="";
								if(parentnode!=null){
									if(parentnode.id==""){
										myurl=rootPath+"/group/departmentgroup!showUserGroup.action?deptid="+encodeURI(selecttree.id);
										deviceUrl=rootPath+"/group/departmentgroup!getItemDivice.action?deptid="+encodeURI(selecttree.id);
									}else{
										groupid=encodeURI(selecttree.id);
										myurl=rootPath+"/group/departmentgroup!showUserGroup.action?deptid="+parentnode.id+"&groupid="+groupid;
										deviceUrl=rootPath+"/group/departmentgroup!getItemDivice.action?deptid="+parentnode.id+"&groupid="+groupid;
									}
								}else{
									myurl=rootPath+"/group/departmentgroup!showUserGroup.action";
									deviceUrl=rootPath+"/group/departmentgroup!getItemDivice.action";
								}
								
								$("#itemtable").show();$("#usertable").show();
								$("#itemtypeid").val("");$("#itemname").val("");$("#realname").val("");
								clicknode(myurl,groupid);
								getItemDeviceList(deviceUrl);
							}else{
								alert('失败');
							}
						});//post
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
		//});
		
	}
	//批量删除人员	
	function delAll(){
		var selected=$("#datagrid1").datagrid('getSelections');
		//alert(selected.length);
		if(selected==null || selected.length< 1){
			alert('请至少选择一条记录！');
		}
		else{
			if(window.confirm('是否删除？')){
				var cc=[];
				for ( var i = 0; i < selected.length; i++) {
					if(cc==""){
							cc+=selected[i]['usergroupid'];
					}
					else{
						cc+=","+selected[i]['usergroupid'];
						}
				}
				$.post(rootPath +"/group/departmentgroup!deleteAllUser.action",{"usergroupid":cc},function(del){
					if(del=='success'){
						$('#datagrid1').datagrid('clearSelections');
						$("#datagrid1").datagrid('reload');
						alert('删除成功！');
					}
				});
				
			 }
		}
	}	
	
	//删除一条人员
	function delOne(uid,rowIndex){
			$('#datagrid1').datagrid('clearSelections');
			$('#datagrid1').datagrid('selectRow',rowIndex);
				if(window.confirm('是否删除？')){
					$.post(rootPath +"/group/departmentgroup!deleteOnlyOne.action",{id:uid},function(del){
						if(del=='success'){
							$('#datagrid1').datagrid('clearSelections');
							$("#datagrid1").datagrid('reload');
							alert('成功');
						}
						
					});
				}
	}
	
	//添加监测项目
	function addGroupItem(){
		if($("#addgroupitem").attr("disabled")=="disabled"){
				return false;
		}
		var selecttree=$('#grouptree').tree('getSelected');
		var parentnode=$('#grouptree').tree('getParent',selecttree.target);
		$.post( rootPath +"/group/departmentgroup!isAddGroupItem.action",{deptid:parentnode.id,groupid:selecttree.id},function(data){
			if(data=="yes"){
					var url = rootPath +"/group/departmentgroup!toGroupItem.action?deptid="+parentnode.id+"&groupid="+selecttree.id;
					var _dialog =  window.top.$('	<div id ="role-dlg" style="padding:0px;"><iframe id="groupItemFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'>77</iframe>		</div>').appendTo(window.top.document.body);
					//window.top.document.body.appendChild(win);
					_dialog.dialog({
						title:'监测项目',
						autoOpen:false,
						modal:true,
						closed:true,
						width:'800',
						height:'500',
						buttons:[{
							text:'确定',
							iconCls:'icon-save',
							handler:function(){
								var attrStr="";
								var selectid=$("#groupItemFrame",top.document.body).contents().find("#selectid").val();
								var newnumberArr=$("#groupItemFrame",top.document.body).contents().find("#selectdivice").val();
								if(selectid!=""&&selectid.length>0){
									if(newnumberArr.length>0){
										var itemids=selectid.split(",");
										var numberArr=newnumberArr.split(",");
										for(var i=0;i<itemids.length;i++){
											var flag="0";
											var itemdevice="gitem"+itemids[i];
											for(var j=0;j<numberArr.length;j++){
												var inputValue = numberArr[j].split("=");
												if(itemdevice==inputValue[0]){
													var deviceid=inputValue[1];
													if(attrStr==""){
														attrStr="{'id':'"+itemids[i]+"','number':'"+deviceid+"'}"
													}
													else{
														attrStr+=","+ "{'id':'"+itemids[i]+"','number':'"+deviceid+"'}"
													}
													flag="1";
												}
											}
											if(flag=="0"){
												alert("请选择所有已选择项目的仪器类型！");
												return ;
											}
										}//for(var i=0;i<itemids.length;i++)
										
											/* for(var i=0;i<itemids.length;i++){
												var deviceid=$("#groupItemFrame",top.document.body).contents().find("#gitem"+itemids[i]).val();
												if(attrStr==""){
													attrStr="{'id':'"+itemids[i]+"','number':'"+deviceid+"'}"
												}
												else{
													attrStr+=","+ "{'id':'"+itemids[i]+"','number':'"+deviceid+"'}"
												}
											}*/
											$.post(rootPath +"/group/departmentgroup!saveGroupItem.action",{itemid:"["+attrStr+"]",deptid:parentnode.id,groupid:selecttree.id},function(del){
												if(del=="success"){
													//$("#itemlist").datagrid('reload');
													_dialog.dialog('close');
													var deviceUrl="";
													var myurl="";
													if(parentnode!=null){
														if(parentnode.id==""){
															myurl=rootPath+"/group/departmentgroup!showUserGroup.action?deptid="+encodeURI(selecttree.id);
															deviceUrl=rootPath+"/group/departmentgroup!getItemDivice.action?deptid="+encodeURI(selecttree.id);
														}else{
															groupid=encodeURI(selecttree.id);
															myurl=rootPath+"/group/departmentgroup!showUserGroup.action?deptid="+parentnode.id+"&groupid="+groupid;
															deviceUrl=rootPath+"/group/departmentgroup!getItemDivice.action?deptid="+parentnode.id+"&groupid="+groupid;
														}
													}else{
														myurl=rootPath+"/group/departmentgroup!showUserGroup.action";
														deviceUrl=rootPath+"/group/departmentgroup!getItemDivice.action";
													}
													$("#itemtable").show();$("#usertable").show();
													$("#itemtypeid").val("");$("#itemname").val("");$("#realname").val("");
													clicknode(myurl,groupid);
													getItemDeviceList(deviceUrl);
													alert("成功！");
												}else{
													alert("失败！");
												}
											});//post
									}else{
										alert("请选择所有已选择项目的仪器类型！")
									  };
									
								}else{
									alert("请至少选择一条记录！");
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
			}else{
				alert("请先为组添加人员！");
			}
		});
		
	}