
	//获取监测点类型信息
	var monitorpointtypeid;
	function initDataGrid(){
		$('#typedatagrid').datagrid({
			nowrap: false,
			striped: true,
			collapsible:true,
			url:rootPath +"/spot/externalenvparam/externalenvparamdata!getMoniterTypeTree.action?projectid="+projectid,
			fit:true,
			fitColumns : true,
			scrollbarSize:0,
			remoteSort: false,
			singleSelect:true,
			rownumbers:false,
			idField:'monitorpointtype',
			columns:[[
						{field:'monitorpointtypename',title:'监测点类型', width:70,align:"center"}
					]],
			onClickRow:getParameterData,
			onLoadSuccess:function (data){
			 var row = $('#typedatagrid').datagrid('selectRow',0);
				var rowData = $('#typedatagrid').datagrid('getSelected');
				if(rowData!=null&&rowData!=""){
					getParameterData(0,rowData);
				}
			},rowStyler:function(rowIndex,rowData){
				 if(rowData.flagExdata=='true')										
					 return 'color:red';
			}
		});
		$(window).resize(function() {
			$("#typedatagrid").datagrid('resize');
		});
	}
	//获取参数信息
	function getParameterData(rowIndex,rowData){
		if(rowData!=null&&rowData!=""){
			$("#monitorpointtypeid").val(rowData.monitorpointtype);
			$.post(rootPath +"/spot/externalenvparam/externalenvparamdata!getExterParTime.action",{projectcode:projectcode,monitorpointtypeid:rowData.monitorpointtype},function(dataTime){
				var objTime = eval('('+dataTime+')');
				$("#samplingdateAdd").html(objTime.htmlTime);
				var  samplingdate=$("#samplingdateAdd").val();
				//综合环境参数信息
				$.post(rootPath +"/spot/externalenvparam/externalenvparamdata!initAddInputData.action",{projectcode:projectcode,monitorpointtypeid:rowData.monitorpointtype,samplingdate:samplingdate},function(data){
					var innerHtml = eval('('+data+')');
					$("#tableaddson").html('');
					$("#tableaddson").html(innerHtml.html);
					//样品环境参数信息
					$.post(rootPath +"/spot/externalenvparam/externalenvparamdata!initSamplesData.action",{projectcode:projectcode,monitorpointtypeid:rowData.monitorpointtype,samplingdate:samplingdate},function(data){
						//var innerHtml = eval('('+data+')');
						$("#samplesDiv").html('')
						$("#samplesDiv").html(data);
						//new tabTableInput("quxiandatalist","text");
					});	
				});
							
			});
		}
	}
	//当时间框改变的时候触发事件
	function selExtParmTime(){
		var  samplingdate=$("#samplingdateAdd").val();
		var rowData = $('#typedatagrid').datagrid('getSelected');
		if(rowData!=null&&rowData!=""){
			$.post(rootPath +"/spot/externalenvparam/externalenvparamdata!initAddInputData.action",{projectcode:projectcode,monitorpointtypeid:rowData.monitorpointtype,samplingdate:samplingdate},function(data){
				var innerHtml = eval('('+data+')');
				$("#tableaddson").html("")
				$("#tableaddson").html(innerHtml.html);
					//综合环境参数信息
				$.post(rootPath +"/spot/externalenvparam/externalenvparamdata!initAddInputData.action",{projectcode:projectcode,monitorpointtypeid:rowData.monitorpointtype,samplingdate:samplingdate},function(data){
					var innerHtml = eval('('+data+')');
					$("#tableaddson").html('');
					$("#tableaddson").html(innerHtml.html);
					//样品环境参数信息
					$.post(rootPath +"/spot/externalenvparam/externalenvparamdata!initSamplesData.action",{projectcode:projectcode,monitorpointtypeid:rowData.monitorpointtype,samplingdate:samplingdate},function(data){
						//var innerHtml = eval('('+data+')');
						$("#samplesDiv").html('')
						$("#samplesDiv").html(data);
						//new tabTableInput("quxiandatalist","text");
					});	
				});
			});
		}
	}
	//保存
	function saveExtenParam	(){
		$("#extenParamForm").form('submit',{
			url:rootPath +"/spot/externalenvparam/externalenvparamdata!saveAddData.action"
			//onSubmit: function(){
	          
		   // }
		   , success:function(data){
				if(data=="success"||data=="noParm"){
			        // alert("成功");
			         saveSampleData();
//			    }
//				else if(data=="noParm"){
//					 alert("没有参数不能保存");
				}else{
			    	 alert("失败");
			    }
			}
		});
	}
	
	//保存样品数据
	function saveSampleData(){
		$("#samplesForm").form('submit',{
			url:rootPath +"/spot/externalenvparam/externalenvparamdata!saveSmaplesData.action"
			//onSubmit: function(){
	          
		   // }
		   , success:function(data){
				if(data=="success"){
			         alert("成功");
			    }else{
			    	 alert("失败");
			    }
			}
		});
	}
	
	function autoFullData(domObject,columnIndex){
		if(confirm("是否填充数据？"))
		{
			var nextObject=$(domObject).closest(".grid-header").siblings("*~tr[class='grid-body']");
			var inputVal=new Array();
			for(var i=0;i<$(nextObject).length;i++)
			{
				
				var findTD="td:eq("+(columnIndex-1).toString()+")"
				if(i==0)
				{	var inputDom=$(nextObject).eq(i).find(findTD.toString()).find("input");
					for(var j=0;j<$(inputDom).length;j++)
					{
						var fillValue=$(inputDom).eq(j).val();
						if(fillValue==null||fillValue=="undifined"||fillValue=="")
						{
							inputVal=[];
						}
						else
						{
							inputVal.push(fillValue);
						}
					}
					if(inputVal.length==0)
					{
						//alert($(nextObject).length);
						alert("请在当前列下的第一个输入框中输入填充的值");
						break;
					}
				}
				else
				{
					var inputDom=$(nextObject).eq(i).find(findTD.toString()).find("input");
					for(var j=0;j<$(inputDom).length;j++)
					{
						$(inputDom).eq(j).val(inputVal[j]);
					}
				}
				
			}
		}
	}
	
