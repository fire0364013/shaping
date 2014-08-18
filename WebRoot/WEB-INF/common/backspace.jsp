<html>
<head>
<title></title>
<script type="text/javascript">
	var context="${pageContext.request.contextPath}";
	//防止按backspace键回退页面
	/**
	 * 用法在Jsp页面的body标签中加：<body  onkeydown="PreventBSK();">
	 * */
	function PreventBSK() {
		var bskEventCancel = false;
		var _EVENT = window.event;
		bskEventCancel = _EVENT
				&& _EVENT.altKey
				&& (_EVENT.keyCode == 8 || _EVENT.keyCode == 37 || _EVENT.keyCode == 39);
		if (_EVENT.keyCode == 8) {
			var tagName = _EVENT.srcElement.tagName.toUpperCase();
			if (tagName == "TEXTAREA" || tagName == "INPUT")//文本操作不受影响
				bskEventCancel = _EVENT.srcElement.readOnly;
			else
				bskEventCancel = true;
		}
		_EVENT.cancelBubble = bskEventCancel;
		_EVENT.returnValue = !bskEventCancel;
		return !bskEventCancel;
	}
</script>
</head>
<body onkeydown="PreventBSK();">

</body>
</html>