<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ include file="/common/taglibs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<title>环境监测流程图</title>
		<link type="text/css" rel="stylesheet" href="${ctx }/themes/flowchart/css/btu_css.css" />
		
		<script type="text/javascript" src="${ctx}/js/jquery-1.7.2.min.js"></script>
		<script type="text/javascript" src="${ctx}/js/jquery.easyui.min.js"></script>
		
		<script language="javascript">
		var rootPath="${ctx}";
		var entityid="${entityid}";
		var currentStep="${currentStep}";
		var isnowtest="${isnowtest}";
		</script>
		<script type="text/javascript" src="${ctx}/lims/js/flowchart/flowchart.js"></script>
	</head>
	<body>
<div class="img_lc"></div>

<!--------------------------------按钮开始----------------------->

<div  id="register"  class="btu_1"></div><!--业务受理-->
<div  id="taskapprove" class="btu_2"></div><!--任务签发-->
<div  id="qcrequireddraw" class="btu_3"></div><!--体质控要求-->
<div  id="samplingset" class="btu_4"></div><!--采样安排-->
<div  id="samperegister" class="btu_5"></div><!--现场监测、采样-->
<div  id="samplingrecheck" class="btu_6_1"></div><!--采样审核-->
<div  id="localdatatest" class="btu_6"></div><!--数据录入-->
<div  id="localdatarecheck" class="btu_7"></div><!--数据审核-->
<div  id="sampereceive" class="btu_8"></div><!--样品接收-->
<div  id="sampesure" class="btu_9"></div><!--分析任务安排-->
<div  id="sampetest" class="btu_10"></div><!--采样分析、数据录入-->
<div  id="dataaudit" class="btu_11"></div><!--数据审核-->
<div  id="qcdrawcode" class="btu_12"></div><!--质控编码-->
<div  id="testreportdrawup" class="btu_13"></div><!--报告编制-->
<div  id="testreportaudit" class="btu_14"></div><!--报告审核-->
<div  id="testreporttssue" class="btu_15"></div><!--报告签发-->
<div  id="teportsend" class="btu_16"></div><!--报告打印、发放-->

<!--------------------------------按钮结束----------------------->
<!--------------------------------箭头开始----------------------->

<div  id="_taskapprove"  class="arrow_1"></div><!--业务受理到任务签发-->
<div  id="_qcrequireddraw" class="arrow_2"></div><!--任务签发到体质控要求-->
<div  id="zk-cy" class="arrow_3"></div><!--体质控要求到采样安排-->
<div  id="_samperegister" class="arrow_4"></div><!--采样安排到现场监测、采样-->
<div  id="_samplingrecheck" class="arrow_5"></div><!--现场监测、采样到采样审核-->
<div  id="_localdatatest" class="arrow_6_1"></div><!--采样审核到数据录入-->
<div  id="_localdatarecheck" class="arrow_6"></div><!--数据录入到数据审核-->
<div  id="sjsh-zkbm" class="arrow_7"></div><!--数据审核到质控编码-->
<div  id="ypsh-zkbm" class="arrow_8"></div><!--数据审核到质控编码-->

<div  id="_dataaudit" class="arrow_9"></div><!--样品分析、数据录入到数据审核-->
<div  id="_sampetest" class="arrow_10"></div><!--分析任务按排到样品分析、数据录入-->
<div  id="_sampesure" class="arrow_11"></div><!--样品接收到分析任务按排-->
<div  id="zk-ypjs" class="arrow_12"></div><!--体质控要求到样品接收-->
<div  id="xc-ypjs" class="arrow_13"></div><!--现场监测、采样到样品接收-->
<div  id="_testreportdrawup" class="arrow_14"></div><!--质控编码到报告编制-->
<div  id="_testreportaudit" class="arrow_15"></div><!--报告编制到报告审核-->
<div  id="_testreporttssue" class="arrow_16"></div><!--报告审核到报告签发-->
<div  id="_teportsend" class="arrow_17"></div><!--报告签发到报告发放-->
<!--------------------------------箭头结束----------------------->
<!--------------------------------退回箭开始----------------------->
<div  id="bgqf-bgbz" class="arrow_f_1"></div><!--报告编制到报告签发-->
<div  id="bgsh-bgbz" class="arrow_f_2"></div><!--报告编制到报告审核-->
<div  id="ypsh-sjlr" class="arrow_f_3"></div><!--数据审核到样品分析、数据录入-->
<div  id="cysh-xc" class="arrow_f_4"></div><!-- 样品审核到现场监测、采样-->
<div  id="ypjs-xc" class="arrow_f_5"></div><!--样品接收到现场监测、采样-->
<div id="sjsh-sjlr" class="arrow_f_6"></div><!--数据审核到数据录入-->
<div id="zkbm-ypsh" class="arrow_f_7"></div><!--质控编码到样品分析-->
<!--------------------------------退回箭结束----------------------->

</body>
</html>
