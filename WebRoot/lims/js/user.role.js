
	//修改
	function addRole(id) {
		$('#datagrid1').datagrid('clearSelections');
	var url = rootPath + "/userroleinfo/userroleinfo!input.action";
	if (id != "") {
		url = url + "?id=" + id;
	}
	var _dialog = window.top.$('<div id ="role-dlg" style="padding:0px;"><iframe id="userroleinfoFrame" width="100%" height="100%" frameborder="0" scrolling="no" src=' + url + '></iframe></div>').appendTo(window.top.document.body);
	_dialog.dialog( {
				title : '授权',
				autoOpen : false,
				modal : true,
				closed : true,
				width : '400',
				height : '410',
				buttons : [
						{
							text : '保存',
							iconCls : 'icon-save',
							handler : function() {
							checkBox(id);
							_dialog.dialog('close');
	
							}
						}, {
							text : '取消',
							iconCls : 'icon-cancel',
							handler : function() {
								_dialog.dialog('close');
							}
						} ],
				onClose : function() {
					_dialog.dialog("destroy");

				}
			});
	
		_dialog.dialog('open');		
	}

	//判定左右两边的数据，对checkBtn进行绑定~
	$(function(){
		$("#sel_left,#sel_right").bind("change",checkBtn);
		$("#btn_1,#btn_2,#btn_3,#btn_4").bind("click",clickBtn);
		$("#sel_left").dblclick(function (){
			$("option:selected",this).appendTo("#sel_right");
		});
		$("#sel_right").dblclick(function (){
			$("option:selected",this).appendTo("#sel_left");
		});
		checkBtn();
	});
	//刚加载的时候~四个按钮的状态
	function checkBtn(){
		jQuery("#sel_left>option").length > 0 ? jQuery("#btn_1").removeAttr("disabled") : jQuery("#btn_1").attr("disabled","disabled");
		jQuery("#sel_left option:selected").length > 0 ? jQuery("#btn_2").removeAttr("disabled") : jQuery("#btn_2").attr("disabled","disabled");
		jQuery("#sel_right option:selected").length > 0 ? jQuery("#btn_3").removeAttr("disabled") : jQuery("#btn_3").attr("disabled","disabled");
		jQuery("#sel_right>option").length > 0 ? jQuery("#btn_4").removeAttr("disabled") : jQuery("#btn_4").attr("disabled","disabled");
	}
	//选择的时候，对按钮进行操作的事件
	function clickBtn(e){
		if("btn_1" == e.target.id){
			jQuery("#sel_left>option").appendTo("#sel_right");
		}else if("btn_2" == e.target.id){
			jQuery("#sel_left option:selected").appendTo("#sel_right");
		}else if("btn_3" == e.target.id){
			jQuery("#sel_right option:selected").appendTo("#sel_left");
		}else if("btn_4" == e.target.id){
			jQuery("#sel_right>option").appendTo("#sel_left");
		}
		checkBtn();
	}
	function bindData(id) {
		$.ajax( {
			type : 'post',
			url : 'userroleinfo!getRolesFun.action',
			data : 'id=' + id+"&"+"timeStamp="+new Date().getTime(),//给该url一个时间戳~~这样就必须每次从服务器读取数据
			success : function(data) {
			var lList = "",rList="";
				var vData = eval("(" + data + ")");
				//遍历json数据  
				jQuery.each(vData.Left, function(i, n) {
					lList += "<option value=" + n.roleIdLeft + ">" + n.roleNameLeft
							+ "</option>";
				});				
				//遍历json数据
				jQuery.each(vData.Right,function(i,n){
					rList += "<option value="+n.roleIdRight+">"+n.roleNameRight+"</option>";
				});
				//绑定数据到userName,userId
				$("#userroleinfoFrame",top.document.body).contents().find('#userName').append(vData.userName);
				$("#userroleinfoFrame",top.document.body).contents().find('#userId').val(vData.userId);
				//绑定数据到listLeft
				$("#userroleinfoFrame",top.document.body).contents().find('#sel_left').append(lList);
				//绑定数据到listRight
				$("#userroleinfoFrame",top.document.body).contents().find('#sel_right').append(rList);			
			}
		});
		
	}

	//左右移动的checkBox的roleid的获得
	function checkBox(id)
	{
		var selectedval = "";		
		var selOpt=$("#userroleinfoFrame",top.document.body).contents().find('#sel_right option');			
		for(i=0;i<selOpt.length;i++)
		{
			var sval = $(selOpt[i]).val();		
			selectedval += sval+',';		
		} 
		$.post(rootPath + "/userroleinfo/userroleinfo!checkBoxRole.action?id=" + selectedval+"&userid="+id+"&"+"timeStamp="+new Date().getTime(),
				function(del) {
					if (del == 'success') {
					$("#regiongrid").datagrid('reload');
					alert("保存成功！");
					}
				});
	}
	