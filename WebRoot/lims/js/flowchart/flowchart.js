//朱国英2012.7.18
$(document).ready(function(){
	getAllRecordJson();
	getPreviousWorkflowStepActionJson();
});


//加载项目当前状态的之前的所有步骤的节点，显示流程节点
function getPreviousWorkflowStepActionJson(){
	$.ajax( {
		type : 'GET',
		url : 'flowchart!getPreviousWorkflowStepActionJson.action?timeStamp='+new Date().getTime(),//给该url一个时间戳~~这样就必须每次从服务器读取数据,
		data:{'entityid':entityid},
		success : function(data) {
			var vData = eval("(" + data + ")");
			jQuery.each(vData.rowsData, function(i, n) {
				if(vData.rowsData[i].stepcode=='qcrequireddraw'){//如果是质控要求
					$("#qcrequireddraw").css("display","block");//先设置质控要求结点亮
					$("#_qcrequireddraw").css("display","block");//
					if((i+1)<vData.rowsData.length){//判断是否有下一结点
						var temp =vData.rowsData[i+1].stepcode;//如果有取得下一结点
						if(temp=='samplingset'){//如果下一结点是采样安排
							$("#zk-cy").css("display","block");//设置指向箭头
						}else{
							$("#zk-ypjs").css("display","block");
						}
					}
				}else if(vData.rowsData[i].stepcode=='samperegister'){//如果是现场检测采样
					$("#samperegister").css("display","block");//先设置现场检测采样结点亮
					$("#_samperegister").css("display","block");//
					if((i+1)<vData.rowsData.length){//判断是否有下一结点
						var temp =vData.rowsData[i+1].stepcode;//如果有取得下一结点
						if(temp=='sampereceive'){//如果下一结点是样表接收
							$("#xc-ypjs").css("display","block");//设置指向箭头
						}
					}
					$("#_"+n.nextstepcode).css("display","block");
					$("#"+n.nextstepcode).css("display","block");
				}else if(vData.rowsData[i].stepcode=='qcdrawcode'){
					$("#"+n.stepcode).css("display","block");
					if(vData.rowsData[i].laststepcode=='dataaudit'){
						$("#ypsh-zkbm").css("display","block");
					}else{
						$("#sjsh-zkbm").css("display","block");
					}
				}else{
				$("#"+n.stepcode).css("display","block");
				$("#_"+n.stepcode).css("display","block");
				$("#_"+n.nextstepcode).css("display","block");
				$("#"+n.nextstepcode).css("display","block");
				}
			});
		}
	});
}


//加载工作流历史记录数据,用来显示退回箭头
function getAllRecordJson() {
	$.ajax( {
		type : 'GET',
		url : 'flowchart!getAllRecordJson.action?timeStamp='+new Date().getTime()+"steptype=project",//给该url一个时间戳~~这样就必须每次从服务器读取数据,
		data:{'entityid':entityid},
		success : function(data) {
			var vData = eval("(" + data + ")");
			jQuery.each(vData.rowsData, function(i, n) {				
				if(n.stepcode=='sampereceive'){//样品接收	
					if((i+1)<vData.rowsData.length){//如果当前节点的下一节点是
						var temp =vData.rowsData[i+1].stepcode;
						if(temp=='samperegister'){//监测采样
							$("#ypjs-xc").css("display","block");
						}
					}
				}else if(n.stepcode=='localdatarecheck'){//原始数据审核
					if((i+1)<vData.rowsData.length){//如果当前节点的下一节点是
						var temp =vData.rowsData[i+1].stepcode;
							if(temp=='localdatatest'){//数据录入
							$("#sjsh-sjlr").css("display","block");
						}
					}
				}else if(n.stepcode=='dataaudit'){//原始样品数据
					if((i+1)<vData.rowsData.length){//如果当前节点的下一节点是
						var temp =vData.rowsData[i+1].stepcode;
							if(temp=='sampetest'){//样品分析
							$("#ypsh-sjlr").css("display","block");
						}
					}
				}else if(n.stepcode=='testreportaudit'){//报告审核
					if((i+1)<vData.rowsData.length){//如果当前节点的下一节点是
						var temp =vData.rowsData[i+1].stepcode;
							if(temp=='testreportdrawpp'){//报告编制
							$("#bgsh-bgbz").css("display","block");
						}
					}
				}else if(n.stepcode=='testreporttssue'){//报告签发
					if((i+1)<vData.rowsData.length){//如果当前节点的下一节点是
						var temp =vData.rowsData[i+1].stepcode;
							if(temp=='testreportdrawpp'){//报告编制
							$("#bgqf-bgbz").css("display","block");
						}
					}
				}else if(n.stepcode=='samplingrecheck'){//采样审核
					if((i+1)<vData.rowsData.length){//如果当前节点的下一节点是
						var temp =vData.rowsData[i+1].stepcode;
							if(temp=='samperegister'){//现场检测、采样
							$("#cysh-xc").css("display","block");
						}
					}
				}else if(n.stepcode=='qcdrawcode'){//质控编码
					if((i+1)<vData.rowsData.length){//如果当前节点的下一节点是
						var temp =vData.rowsData[i+1].stepcode;
							if(temp=='sampetest'){//样品分析
							$("#zkbm-ypsh").css("display","block");
						}
					}
				}
			});
		}
	});
}

