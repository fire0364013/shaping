$(function(){
	$('#billtree').tree({
		url: rootPath+"/monitorproject/samperegister/samperegister!showSampleTree.action?projectid="+projectid+"&isnowtest="+isNowTest,
		onClick:function(node){
			if(node.attributes!='N'){//判断是否是根目录。
				var parent=$('#billtree').tree("getParent",node.target);
				if(parent.id=="cyd"){
					if(node.id.indexOf("-")<0){
						$("#billFrame").attr("src",rootPath + "/common/report!toReportPage.action?raq=/SamplingList/"
						+encodeURIComponent(encodeURIComponent(node.attributes))+"&projectcode="+projectcode+"&monitorpointtype="+node.id+"&userid="+userid);
					}else{
						var arr = node.id.split("-");
						$("#billFrame").attr("src",rootPath + "/common/report!toReportPage.action?raq=/SamplingList/"
						+encodeURIComponent(encodeURIComponent(node.attributes))+"&projectcode="+projectcode+"&monitorpointtype="+arr[0]+"&userid="+userid+"&itemid="+arr[1]);
					}
				}else{
					var selectNode= node.id.split("#");
					var templatetypeid=selectNode[0];
					if(templatetypeid==2){//2为原始记录单模板
						var itemid = selectNode[1];
						var methodid=selectNode[2];
						if(itemid=="N"){//分组出报表 此时加上Ori
							var methOri=methodid.split("T");
							var methodid=methOri[0];
							var Ori=methOri[1];
							$("#billFrame").attr("src",rootPath + "/common/report!toReportPage.action?raq=/OriginalList/"+encodeURI(encodeURI(node.attributes))+"&projectcode="+projectcode+"&methodid="+methodid+"&originallistno="+encodeURIComponent(encodeURIComponent(Ori)));
						}else{ //正常单个项目处报表
							$("#billFrame").attr("src",rootPath + "/common/report!toReportPage.action?raq=/OriginalList/"+encodeURI(encodeURI(node.attributes))+"&projectcode="+projectcode+"&itemid="+itemid+"&methodid="+methodid);
						}
					}else if (templatetypeid==4){//4为现场记录单模板
						var monitorid = selectNode[1];
						$("#billFrame").attr("src",rootPath + "/common/report!toReportPage.action?raq=/OriginalList/"+encodeURI(encodeURI(node.attributes))+"&projectcode="+projectcode+"&monitorid="+monitorid);
					}
				}
			} 
		}
	});
});
		