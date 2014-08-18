
		/**
		 * 按监测点类型保存时所展现的选择图片路径的列表type
		 * @return
		 */
		function entPicListByType(myurl){
			$("#entPicDatagrid").datagrid({
				nowrap: false,
				striped: true,
				collapsible:true,
				url:myurl, 
				fit:true,
				fitColumns : true,
				scrollbarSize:0,
				remoteSort: false,
				idField:'sketchmap',
				singleSelect:true,
				pageSize:10,
				pageList:[10,20,30,40,50],
				frozenColumns:[[
						{field:'sketchmap',title : '&nbsp;',width : 30,align : 'center',
							formatter:function(value){
								return "<input type='radio' name='radio'/>";
							}
						}]],
				columns:[[	
						{field:'sketchmapname',title:'示意图文件',width:420,align:"center"},
						{field:'operate',title:'操作',width:120,align:"center",
							formatter:function(value,rec,rowIndex){
									var links="<img src='"+rootPath+"/themes/default/images/xiangxiimage.png' alt='编辑'  id='btnshows' onclick='detailPic(\""+rec.pointsketchmap+"\")'/>&nbsp;&nbsp;";
									return links;
							}
						}]],
				pagination:true,
				rownumbers:true,
				onSelect:function(){
					var selected=$("#entPicDatagrid").datagrid('getSelected');
					checkRadio();
					$("#fileSelect").val(selected['sketchmapname']);//图片
					$("#filePath").val(selected['pointsketchmap']);//路径
				},
				onLoadSuccess:function(){
					$('#entPicDatagrid').datagrid('clearSelections');
				}
				});
				$(window).resize(function() {
					$("#entPicDatagrid").datagrid('resize');
				});
			}

		function checkRadio(){
			var row=$("#entPicDatagrid").datagrid('getSelected');
			var rowNum=0;
			var rows=$("#entPicDatagrid").datagrid('getRows');
			for(var i=0;i<rows.length;i++){
				if (row == rows[i]) {
					rowNum = i;
					break;
				}
			}
			var radios = $("input[type=radio]");
			$(radios[rowNum]).attr("checked", true);
		}
		//下载
		function download(filename){
			var name=encodeURIComponent(encodeURIComponent(filename.toString()));
			$.ajax({
				type: "POST",
				url: rootPath +"/monitorproject/sketchmap/projectpointsketchmap!downLoadY.action",
				data: "path="+name+"&flg=0",
				processData :false,
				success:function(data){
					if(data=="fail"){
						alert("文件不存在！");
					}else{
						var urlParmDown=rootPath +"/monitorproject/sketchmap/projectpointsketchmap!downLoadY.action?path="+name+"&flg=1";
						/*$("#form").attr("action",urlParmDown);
						$("#form").submit();*/
						$("#methoddownload").attr("action",urlParmDown);
						$("#path").val(name);
						$("#methoddownload").submit();
					}
				},
				error:function(data){
					alert("服务器正在维修，请稍后！");
				}
			});
		}
		//上传
		function upLoadFile(){
			$("#sketchmapform").form('submit',{
				url:rootPath +'/monitorproject/entpointsketchmap/entpointsketchmap!saveEntity.action',
				onSubmit:function(){
					//验证图片格式
					var filename=$("#filec").val();
					if(filename!=null && filename!=""){
						var filec=filename.substring(filename.lastIndexOf(".")).toLowerCase();
						if(filec!=".jpg"&&filec!=".jpeg"&&filec!=".gif"&&filec!=".png"&&filec!=".bmp"){
							alert("照片仅支持 jpg,jpeg,gif,png,bmp格式的图片");
							return false;
						}
					} //class="grkj-validate" 
					//验证红色星号是否全部填写
					var saveWay=$("#monitoridSaveWay").val();
					if(saveWay=="2"){
						$("#monitorponitid").addClass("grkj-validate");
					}else if(saveWay=="1"){
						$("#monitorponitid").removeClass();
					}
					var objs = $(".grkj-validate");
					if(!saveCheck(objs)){
						$("#ponitType").focus();
						$("#monitoridSaveWay").focus();
						if(saveWay=="2"){
							$("#monitorponitid").focus();
						}
						alert("请查看带有红色星号的是否全部填写！");
						return false;
					}
				},
				success:function(data){
					$("#fileTd").html("");
					$("#entPicDatagrid").datagrid('reload'); 
				}
			});	
		}
		//查看图片
		function detailPic(filename){
			var url = rootPath +'/lims/entMapFiles/'+filename;
			var _dialog =  window.top.$('<div id ="role-dlg" style="padding:0px;"><iframe id="filnameFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
			_dialog.dialog({
				title:'示意图',
				autoOpen:false,
				modal:true,
				closed:true,
				width:'700',
				height:'600',
				onClose:function(){
					_dialog.dialog("destroy");
				}
			});
			_dialog.dialog('open');
		}