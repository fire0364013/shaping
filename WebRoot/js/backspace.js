	//防止按backspace键回退页面
	function PreventBSK()
		{
		    var bskEventCancel = false;
		    var _EVENT = window.event;
		    bskEventCancel = _EVENT && _EVENT.altKey && (_EVENT.keyCode == 8 || _EVENT.keyCode == 37 || _EVENT.keyCode == 39);
		    if(_EVENT.keyCode == 8)
		    {
		        var tagName = _EVENT.srcElement.tagName.toUpperCase();
		        if(tagName == "TEXTAREA" || tagName == "INPUT")//文本操作不受影响
		            bskEventCancel = _EVENT.srcElement.readOnly;
		        else
		            bskEventCancel = true;
		    }
		    _EVENT.cancelBubble = bskEventCancel;
		    _EVENT.returnValue = !bskEventCancel;
		    return !bskEventCancel;
		}