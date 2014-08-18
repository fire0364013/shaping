<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="/common/taglibs.jsp"%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<title>图片的剪切</title>
		<link rel="stylesheet" href="${ctx}/themes/default/easyui.css" type="text/css" />
		<link rel="stylesheet" type="text/css" href="${ctx}/themes/jquery.imagecropper.css" />
		<link rel="stylesheet" type="text/css" href="${ctx}/themes/icon.css">
		<script type="text/javascript" src="${ctx}/js/jquery-1.7.2.min.js"></script>
  	  <script type="text/javascript" src="${ctx}/js/ui.core.js"></script>
  	  <script type="text/javascript" src="${ctx}/js/ui.draggable.js"></script>
  	  <script type="text/javascript" src="${ctx}/js/jquery.imagecropper.js"></script>
  	  <script type="text/javascript" charset="utf-8">
        $(document).ready(function() {
            var fileName="${flagName}";
      		 var flag="${flag}";
      		  var imageCropper;
      		 if(flag=="Pic"){//照片的
      			 $("#imgBackground").attr("src","");
         		$("#imgBackground").attr("src","${ctx}/lims/tempUserPic/Pic"+fileName);
         		   imageCropper = $('#imgBackground').imageCropper({
	                callbacks: {
	                    dragging: updateStatus,
	                    zoomed: updateStatus
	                }
            });
         	}else{//电子签章
         		 $("#imgBackground").attr("src","");
         		$("#imgBackground").attr("src","${ctx}/lims/tempUserPic/Sin"+fileName);
         		   imageCropper = $('#imgBackground').imageCropper({
	                callbacks: {
	                    dragging: updateStatus,
	                    zoomed: updateStatus
	                }
            	});
         		imageCropper.settings.width = 345;
                imageCropper.settings.height = 230;
         	 	imageCropper.resetPic();
         	}
            updateStatus();
            
            //剪切图片的
            $('#btnCropImage').click(function() {
          		$.post("${ctx}/common/pic!ProcessRequest.action",{p:imageCropper.settings.imagePath,z:imageCropper.settings.zoomLevel,t:imageCropper.settings.top,l:imageCropper.settings.left,w:imageCropper.settings.width,h:imageCropper.settings.height},function(del){
          			if(del=='success'){
          				 if(flag=="Pic"){//照片的
          					 $(window.top.document.frames["userinfoFrame"].document).find("#encodeDateJPGPic").val(imageCropper.settings.imagePath);
          					$($(window.top.document.frames["userinfoFrame"].document).find("#reshPicid")).click();
	          				 $($(window.top.document.frames["userinfoFrame"].document).find("#closeDlg")).click();
          				}else{//电子签章的
          					$(window.top.document.frames["userinfoFrame"].document).find("#encodeDateJPG").val(imageCropper.settings.imagePath);
          					$($(window.top.document.frames["userinfoFrame"].document).find("#reshSinid")).click();
          					$($(window.top.document.frames["userinfoFrame"].document).find("#closeDlg")).click();
          				}
				}else{
					alert('截取失败');
				}
			});
            });
            
			//重置
            $('#btnResetSettings').click(function() {
                imageCropper.settings.imagePath = $('#txtImgPath').val();
                imageCropper.settings.zoomLevel = parseFloat($('#txtZoomLevel').val());
                imageCropper.settings.left = parseInt($('#txtLeft').val());
                imageCropper.settings.top = parseInt($('#txtTop').val());
                imageCropper.settings.width = parseInt($('#txtWidth').val());
                imageCropper.settings.height = parseInt($('#txtHeight').val());
                imageCropper.reset();
            });
			//展示切了多少
            function updateStatus() {
				var filename=imageCropper.settings.imagePath;
				filenamePic = filename.substring(filename.lastIndexOf("/"),filename.length);
				filenamePic = filenamePic.substring(1,filenamePic.length);
                $('#txtImgPath').val(imageCropper.settings.imagePath);
                $('#txtZoomLevel').val(imageCropper.settings.zoomLevel);
                $('#txtLeft').val(imageCropper.settings.left);
                $('#txtTop').val(imageCropper.settings.top);
                $('#txtWidth').val(imageCropper.settings.width);
                $('#txtHeight').val(imageCropper.settings.height);
            }
        }); 
    </script>
    </head>
<body>
<form id="userinfofromPic"  >
<table>
	<tr>
		<td>
			<input type="hidden" value="0" id="flagPicSon"/><!-- 照片   此处是用来对照片是否进行了截图-->
		     <input type="button" class="Button_out" value="截 图" id="btnCropImage"  style="display: none"/>
		 </td>
	 </tr>
 </table>
    <div style="float: left;">
     <img id="imgBackground" />
    </div>
	</form>
</body>
</html>
