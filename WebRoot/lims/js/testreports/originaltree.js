/**
 * Au !   wjy   原始记录单，左侧树形结构
 * @return
 */

//原始 记录单:isNowTest判断是否为采样时的原始记录单
function originalreport(projectcode){
			$('#originaltree').tree({
				url:rootPath+"/testreports/testreports!showOriginalReportTreeOnMonitor.action?projectcode="+projectcode+"&isNowTest="+isNowTest+"&projectid="+projectid+"&info="+info,
				onClick:function(node){//点击项目的时候，在右侧展示原始记录
					var selected=$('#originaltree').tree("getSelected");
					var parentnode=$('#originaltree').tree("getParent",selected.target);
					var selectNode= node.id.split("#");
					var templatetypeid=selectNode[0];
					if(templatetypeid==2){//2为原始记录单模板
						var itemid = selectNode[1];
						var methodid=selectNode[2];
						if(itemid=="N"){//分组出报表 此时加上Ori
							var methOri=methodid.split("T");
							var methodid=methOri[0];
							var Ori=methOri[1];
							$("#originalFrame").attr("src",rootPath + "/common/report!toReportPage.action?raq=/OriginalList/"+encodeURI(encodeURI(node.attributes))+"&projectcode="+projectcode+"&methodid="+methodid+"&originallistno="+encodeURIComponent(encodeURIComponent(Ori)));
						}else{ //正常单个项目处报表
							$("#originalFrame").attr("src",rootPath + "/common/report!toReportPage.action?raq=/OriginalList/"+encodeURI(encodeURI(node.attributes))+"&projectcode="+projectcode+"&itemid="+itemid+"&methodid="+methodid);
						}
					}else if (templatetypeid==4){//4为现场记录单模板
						var monitorid = selectNode[1];
						$("#originalFrame").attr("src",rootPath + "/common/report!toReportPage.action?raq=/OriginalList/"+encodeURI(encodeURI(node.attributes))+"&projectcode="+projectcode+"&monitorid="+monitorid);
					}
				} 
			});
		}


//现场监测原始记录单
function localOriginalReport(projectcode){
	$('#originaltree').tree({
		url: rootPath + "/testreports/testreports!showOriginalReportTreeOnMonitor.action?projectcode="+projectcode+"&isNowTest="+isNowTest,
		onClick:function(node){//点击项目的时候，在右侧展示原始记录
			var selected=$('#originaltree').tree("getSelected");
			var pointTypeId= node.id;
			$("#originalFrame").attr("src",rootPath + "/common/report!toReportPage.action?raq=/OriginalList/"+encodeURI(encodeURI(node.attributes))+"&projectcode="+projectcode);
		} 
		
	});
	
}
 