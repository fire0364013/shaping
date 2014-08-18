//$(document).ready(function(){		
//	initHtml2();
//});

function initHtml2(){//alert("修约后的值");
	//var itemid = $("#itemid").val();
	//var batchno = $("#batchno").val();
	$(window.document.body).block({ 
				message: "正在加载数据,请稍候...", 
		 		css: {
					color:'#000', 
					padding: '15px', 
					border:'2px solid #90dbfe',
					backgroundColor:'#fafafa'
				},
				overlayCSS: {
					opacity:'0.1' 
				}
			});
	$.ajax({
		type: "post",
		url: rootPath+"/sampletest/sampletestbybatch!viewAnalyseResult.action?itemid="+itemid+"&batchno="+batchno+"&" + new Date().getTime(),
		success: function(msg){
			//alert($("#ruledata11111").html());
			//alert($("#ruledata"));
			//var obj = eval('('+msg+')');
			$("#ruledata11111").html('');
			$("#ruledata11111").html(msg);
			//$("#ruledata").html(msg.toString());  
			//alert($("#ruledata").html());
			$(window.document.body).unblock();
			ejiaA1("quxiandatalist2","#EEEEFF","#FFFFFF","#D0E5F5","#FBEC88");
		}
	});
}