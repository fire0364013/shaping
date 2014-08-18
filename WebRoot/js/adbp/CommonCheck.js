/**
*Title : 通用JS验证函数
* Description : 
* 
* Copyright : Copyright(c)2010
* Company : 中科宇图天下科技有限公司
* @Author : HuangYong||2010年10月29日 09时00分
* @Version : V1.0
**/

/**
* 用途：页面信息验证提示弹出框
* 输入：
*content弹出层的内容
*注意：调用此方法是需要引用popupwindow.js
* 返回：
*/
function showMessage(content) {
    //    popupWindow("提示", "text:" + content, "250", "150", "true", "", "true", "msg", "true");
    var rtn = alert(content);
    if (undefined == rtn || true == rtn){ rtn = true; }else { rtn = false; }
    return rtn;
}

function confirmMessage(content) {
    //    popupWindow("提示", "text:" + content, "250", "150", "true", "", "true", "msg", "true");
    return confirm(content);
}

/**
* 用途：检查输入字符串是否全部是数字
* 输入：str  字符串
* 返回：true 或 flase; true表示为数字
*/
function checkNum(str) {
    if (str.match(/\D/) == null) {
        return false;
    }
    else {
        return true;
    }
}

/**
* 用途：检查输入字符串是否为小数
* 输入：str  字符串
* 返回：true 或 flase; true表示为小数
*/
function checkDecimal(str) {
    if (str.match(/^-?\d+(\.\d+)?$/g) == null) {
        return false;
    }
    else {
        return true;
    }
}

/**
* 用途：检查输入字符串是否为整型数据
* 输入：str  字符串
* 返回：true 或 flase; true表示为小数
*/
function checkInteger(str) {
    if (str.match(/^[-+]?\d*$/) == null) {
        return false;
    }
    else {
        return true;
    }
}

/**************************************************************************************/
/*************************************字符的验证**************************************/
/**************************************************************************************/

/*
用途：检查输入字符串是否为空或者全部都是空格
输入：str 字符串
返回：true 或 flase; true表示为空
*/
function checkNull(str) {
    if (str == null||str == "") return true;
    var regu = "^[ ]+$";
    var re = new RegExp(regu);
    return re.test(str);
}

/**
* 用途：去掉字符串头尾空格
* 输入：str  字符串
* 返回：去掉头尾空格后的新字符串
*/
function trim(str) {
    return str.replace(/(^\s*)|(\s*$)/g, "");
}

/**
* 用途：检查输入字符串是否是字符
* 输入：str  字符串
* 返回：true 或 flase; true表示为全部为字符 不包含汉字
*/
function checkStr(str) {
    if (/[^\x00-\xff]/g.test(str)) {
        return false;
    }
    else {
        return true;
    }
}


/**
* 用途：检查输入的一串字符是否包含汉字
* 输入：str  字符串
* 返回：true 或 flase; true表示包含汉字
*/
function checkChinese(str) {
    if (escape(str).indexOf("%u") != -1) {
        return true;
    }
    else {
        return false;
    }
}

/*
用途：检查输入对象的值是否符合端口号格式
输入：str 字符串
返回：true或false; true表示是正确端口号
*/
function checkPort(str) {
    return (isNumber(str) && str < 65536);
}

/*
用途：检查输入字符串是否符合金额格式
格式定义为带小数的正数，小数点后最多三位
输入：str：字符串
返回：true或false; true表示是正确金额格式
*/
function checkMoney(str) {
    var regu = "^[0-9]+[\.][0-9]{0,3}$";
    var re = new RegExp(regu);
    if (re.test(str)) {
        return true;
    } else {
        return false;
    }
}

/*
用途：检查输入字符串是否只由英文字母和数字和下划线组成
输入：s：字符串
返回：true或false;通过验证为true
*/
function checkNumberOr_Letter(str) {
    var regu = "^[0-9a-zA-Z\_]+$";
    var re = new RegExp(regu);
    if (re.test(str)) {
        return true;
    } else {
        return false;
    }
}

/*
用途：检查输入字符串是否只由英文字母和数字组成
输入：str：字符串
返回：true或false;通过验证为true
*/
function checkNumberOrLetter(str) {
    var regu = "^[0-9a-zA-Z]+$";
    var re = new RegExp(regu);
    if (re.test(str)) {
        return true;
    } else {
        return false;
    }
}

/*
用途：检查输入字符串是否只由汉字、字母、数字组成
输入：value：字符串
返回：true或false;通过验证为true
*/
function checkChinaOrNumbOrLett(str) {
    var regu = "^[0-9a-zA-Z\u4e00-\u9fa5]+$";
    var re = new RegExp(regu);
    if (re.test(str)) {
        return true;
    } else {
        return false;
    }
}

/*
用途：检查输入字符串是否只由汉字组成
输入：value：字符串
返回：true或false;通过验证为true
*/
function checkChina(str) {
    var regu = "^[\u4e00-\u9fa5]+$";
    var re = new RegExp(regu);
    if (re.test(str)) {
        return true;
    } else {
        return false;
    }
}

/*
用途：字符1是否以字符串2开始
输入：str1：字符串；str2：被包含的字符串
返回：true或false;通过验证为true
*/
function checkFirstMatch(str1, str2) {
    var index = str1.indexOf(str2);
    if (index == 0) return true;
    return false;
}

/*
用途：字符1是否以字符串2结尾
输入：str1：字符串；str2：被包含的字符串
返回：true或false;通过验证为true
*/
function checkLastMatch(str1, str2) {
    var regu = "[" + str2 + "]$";
    var re = new RegExp(regu);
    if (re.test(str1)) {
        return true;
    } else {
        return false;
    }
}

/*
用途：字符1是包含字符串2
输入：str1：字符串；str2：被包含的字符串
返回：true或false;通过验证为true
*/
function checkMatch(str1, str2) {
    var index = str1.indexOf(str2);
    if (index == -1) return false;
    return true;
}

/**
* 用途：检查输入的邮政编码格式是否正确
* 输入：str  字符串
* 返回：true 或 flase; 通过验证为true
*/
function checkPostalCode(str) {
    if (str.match(/^\d{6}$/) == null) {
        return false;
    }
    else {
        return true;
    }
}

/**
* 用途：检查输入的邮箱格式是否正确
* 输入：str  字符串
* 返回：true 或 flase; 通过验证为true
*/
function checkEmail(str) {
if (str.match(/[A-Za-z0-9_-]+[@](\S+)(.net|.com|.cn|.org|.cc|.tv|.[0-9]{1,3})(\S*)/g) == null) {
        return false;
    }
    else {
        return true;
    }
}


/**
* 用途：检查输入的手机号码格式是否正确
* 输入：str  字符串
* 返回：true 或 flase; true表示格式正确
*/
function checkMobilePhone(str) {
    if (str.match(/^(?:13\d|15[89])-?\d{5}(\d{3}|\*{3})$/) == null) {
        return false;
    }
    else {
        return true;
    }
}


/**
* 用途：检查输入的固定电话号码是否正确
* 输入：str  字符串
* 返回：true 或 flase;通过验证为true
*/
function checkTelephone(str) {
    if (str.match(/^(([0\+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/) == null) {
        return false;
    }
    else {
        return true;
    }
}

/**
* 用途：检查QQ的格式是否正确
* 输入：str  字符串
*  返回：true 或 flase; true表示格式正确
*/
function checkQQ(str) {
    if (str.match(/^\d{5,10}$/) == null) {
        return false;
    }
    else {
        return true;
    }
}

/**
* 用途：检查输入的身份证号是否正确
* 输入：str  字符串
*  返回：true 或 flase; 通过验证为true
*/
function checkCard(str) {
    //15位数身份证正则表达式
    var arg1 = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/;
    //18位数身份证正则表达式
    var arg2 = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[A-Z])$/;
    if (str.match(arg1) == null && str.match(arg2) == null) {
        return false;
    }
    else {
        return true;
    }
}

/**
* 用途：检查输入的IP地址是否正确
* 输入：str  字符串
* 返回：true 或 flase; 通过验证为true
*/
function checkIP(str) {
    var arg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
    if (str.match(arg) == null) {
        return false;
    }
    else {
        return true;
    }
}

/**
* 用途：检查输入的URL地址是否正确
* 输入：str  字符串
* 返回：true 或 flase; true表示格式正确
*/
function checkURL(str) {
    if (str.match(/(http[s]?|ftp):\/\/[^\/\.]+?\..+\w$/i) == null) {
        return false
    }
    else {
        return true;
    }
}

/**
* 用途：检查输入的字符是否具有特殊字符
* 输入：str  字符串
* 返回：true 或 flase; true表示包含特殊字符
* 说明：主要用于注册信息的时候验证
*/
function checkQuote(str) {
    var items = new Array("-", "*", "@", "'", "\\", "?");
//    items.push(":", ";", "|", "<", ">", "/", "<<", ">>", "||", "//");
//    items.push("admin", "administrators", "administrator", "管理员", "系统管理员");
//    items.push("select", "delete", "update", "insert", "create", "drop", "alter", "trancate");
    str = str.toLowerCase();
    for (var i = 0; i < items.length; i++) {
        if (str.indexOf(items[i]) >= 0) {
            return true;
        }
    }
    return false;
}


/**************************************************************************************/
/*************************************时间的验证*****************************************/
/**************************************************************************************/

/**
* 用途：检查日期格式是否正确
* 输入：str  字符串
* 返回：true 或 flase; 通过验证为true
* 注意：此处不能验证中文日期格式
* 说明：此处验证短日期格式为：2010-10-29
*/
function checkDate(str) {
    //var value=str.match(/((^((1[8-9]\d{2})|([2-9]\d{3}))(-)(10|12|0?[13578])(-)(3[01]|[12][0-9]|0?[1-9])$)|(^((1[8-9]\d{2})|([2-9]\d{3}))(-)(11|0?[469])(-)(30|[12][0-9]|0?[1-9])$)|(^((1[8-9]\d{2})|([2-9]\d{3}))(-)(0?2)(-)(2[0-8]|1[0-9]|0?[1-9])$)|(^([2468][048]00)(-)(0?2)(-)(29)$)|(^([3579][26]00)(-)(0?2)(-)(29)$)|(^([1][89][0][48])(-)(0?2)(-)(29)$)|(^([2-9][0-9][0][48])(-)(0?2)(-)(29)$)|(^([1][89][2468][048])(-)(0?2)(-)(29)$)|(^([2-9][0-9][2468][048])(-)(0?2)(-)(29)$)|(^([1][89][13579][26])(-)(0?2)(-)(29)$)|(^([2-9][0-9][13579][26])(-)(0?2)(-)(29)$))/);
    var value = str.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
    if (value == null) {
        return false;
    }
    else {
        var date = new Date(value[1], value[3] - 1, value[4]);
        return (date.getFullYear() == value[1] && (date.getMonth() + 1) == value[3] && date.getDate() == value[4]);
    }
}

/**
* 用途：检查时间格式是否正确
* 输入：str  字符串
* 返回：true 或 flase; true表示格式正确
* 说明：验证时间格式为：10:57:10
*/
function checkTime(str) {
    var value = str.match(/^(\d{1,2})(:)?(\d{1,2})\2(\d{1,2})$/)
    if (value == null) {
        return false;
    }
    else {
        if (value[1] > 24 || value[3] > 60 || value[4] > 60) {
            return false
        }
        else {
            return true;
        }
    }
}

/**
* 用途：检查全日期时间格式是否正确
* 输入：str  字符串
* 返回：true 或 flase; true表示格式正确
* 说明：全日期时间格式为：2010-10-29 10:57:10
*/
function checkFullTime(str) {
    //var value = str.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/);
    var value = str.match(/^(?:19|20)[0-9][0-9]-(?:(?:0[1-9])|(?:1[0-2]))-(?:(?:[0-2][1-9])|(?:[1-3][0-1])) (?:(?:[0-2][0-3])|(?:[0-1][0-9])):[0-5][0-9]:[0-5][0-9]$/);
    if (value == null) {
        return false;
    }
    else {
        //var date = new Date(checkFullTime[1], checkFullTime[3] - 1, checkFullTime[4], checkFullTime[5], checkFullTime[6], checkFullTime[7]);
        //return (date.getFullYear() == value[1] && (date.getMonth() + 1) == value[3] && date.getDate() == value[4] && date.getHours() == value[5] && date.getMinutes() == value[6] && date.getSeconds() == value[7]);
        return true;
    }

}


/**
* 用途：比较两个日期的大小
* 输入：str1  比较日期字符串，str2  被比较日期字符串
* 返回：true 或 flase; true表示 str1大
*/
function checkCompareTime(str1, str2) {
    if (str1 <= str2) {
        return false;
    }
    else {
        //var date = new Date(checkFullTime[1], checkFullTime[3] - 1, checkFullTime[4], checkFullTime[5], checkFullTime[6], checkFullTime[7]);
        //return (date.getFullYear() == value[1] && (date.getMonth() + 1) == value[3] && date.getDate() == value[4] && date.getHours() == value[5] && date.getMinutes() == value[6] && date.getSeconds() == value[7]);
        return true;
    }

}




/**************************************************************************************/
/************************************身份证号码的验证*********************************/
/**************************************************************************************/

/**  
* 身份证15位编码规则：dddddd yymmdd xx p
* dddddd：地区码
* yymmdd: 出生年月日
* xx: 顺序类编码，无法确定
* p: 性别，奇数为男，偶数为女
* <p />
* 身份证18位编码规则：dddddd yyyymmdd xxx y
* dddddd：地区码
* yyyymmdd: 出生年月日
* xxx:顺序类编码，无法确定，奇数为男，偶数为女
* y: 校验码，该位数值可通过前17位计算获得
* <p />
* 18位号码加权因子为(从右到左) Wi = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2,1 ]
* 验证位 Y = [ 1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2 ]
* 校验位计算公式：Y_P = mod( ∑(Ai×Wi),11 )
* i为身份证号码从右往左数的 2...18 位; Y_P为脚丫校验码所在校验码数组位置
*
*/
var Wi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1]; // 加权因子   
var ValideCode = [1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2]; // 身份证验证位值.10代表X   
function IdCardValidate(idCard) {
    idCard = trim(idCard.replace(/ /g, ""));
    if (idCard.length == 15) {
        return isValidityBrithBy15IdCard(idCard);
    }
    else
        if (idCard.length == 18) {
        var a_idCard = idCard.split(""); // 得到身份证数组   
        if (isValidityBrithBy18IdCard(idCard) && isTrueValidateCodeBy18IdCard(a_idCard)) {
            return true;
        }
        else {
            return false;
        }
    }
    else {
        return false;
    }
}

/**  
* 用途：判断身份证号码为18位时最后的验证位是否正确
* 输入 a_idCard 身份证号码数组
* 返回：true为正确，否则为false
*/
function isTrueValidateCodeBy18IdCard(a_idCard) {
    var sum = 0; // 声明加权求和变量   
    if (a_idCard[17].toLowerCase() == 'x') {
        a_idCard[17] = 10; // 将最后位为x的验证码替换为10方便后续操作   
    }
    for (var i = 0; i < 17; i++) {
        sum += Wi[i] * a_idCard[i]; // 加权求和   
    }
    valCodePosition = sum % 11; // 得到验证码所位置   
    if (a_idCard[17] == ValideCode[valCodePosition]) {
        return true;
    }
    else {
        return false;
    }
}

/**  
*用途： 通过身份证判断是男是女
* 输入： idCard 15/18位身份证号码
* 返回： 'female'-女、'male'-男
*/
function maleOrFemalByIdCard(idCard) {
    idCard = trim(idCard.replace(/ /g, "")); // 对身份证号码做处理。包括字符间有空格。   
    if (idCard.length == 15) {
        if (idCard.substring(14, 15) % 2 == 0) {
            return 'female';
        }
        else {
            return 'male';
        }
    }
    else
        if (idCard.length == 18) {
        if (idCard.substring(14, 17) % 2 == 0) {
            return 'female';
        }
        else {
            return 'male';
        }
    }
    else {
        return null;
    }
}

/**  
* 用途：验证18位数身份证号码中的生日是否是有效生日
* 输入：idCard 18位书身份证字符串
* 返回：true为
*/
function isValidityBrithBy18IdCard(idCard18) {
    var year = idCard18.substring(6, 10);
    var month = idCard18.substring(10, 12);
    var day = idCard18.substring(12, 14);
    var temp_date = new Date(year, parseFloat(month) - 1, parseFloat(day));
    // 这里用getFullYear()获取年份，避免千年虫问题   
    if (temp_date.getFullYear() != parseFloat(year) ||
    temp_date.getMonth() != parseFloat(month) - 1 ||
    temp_date.getDate() != parseFloat(day)) {
        return false;
    }
    else {
        return true;
    }
}

/**  
* 用途：验证15位数身份证号码中的生日是否是有效生日
* 输入：idCard15 15位书身份证字符串
* 返回：
*/
function isValidityBrithBy15IdCard(idCard15) {
    var year = idCard15.substring(6, 8);
    var month = idCard15.substring(8, 10);
    var day = idCard15.substring(10, 12);
    var temp_date = new Date(year, parseFloat(month) - 1, parseFloat(day));
    if (temp_date.getYear() != parseFloat(year) ||
    temp_date.getMonth() != parseFloat(month) - 1 ||
    temp_date.getDate() != parseFloat(day)) {
        return false;
    }
    else {
        return true;
    }
}


/**  
* 用途：验证字符长度
* 输入：字符
* 返回：
*/
function isGraff(str, lenght) {
    var lengh = str.length;
    if (lengh > lenght) {
        //     alert("文件过长");
        return true;
    }
    else 
    {
        var realLengh = 0;
        for(var i=0; i<lengh; i++)
        {
            realLengh = realLengh + 1;
            if(checkChina(str.substring(i, 1)))
            {
                realLengh = realLengh + 1;
            }
        }
        if (realLengh > lenght) 
        {
            return true;
        }
        else
        {
            return false;
        }
        
    }
}

/**  
* 用途：验证小数点后位数
* 输入：字符
* 返回：
*/
function DecimalDigits(number, count) {
    var res = false;
    var str = number.split('.');
    if (str.length > 0) {
        for (var i = 0; i < str.length; i++) {
            if (str[1] != null && str[1] != "") {
                if (count < str[1].length) {
                    res=true;
                }
            }
        }
    }
    return res;
}

/**  
* 用途：验证文件是否存在
* 输入：文件路径
* 返回：
*/
function isFileIn(FilePath) {
    var fso = new ActiveXObject("Scripting.FileSystemObject");
    if (!fso.FileExists(FilePath)) {
        return true;
    }
    else {
        return false;
    }
}

/**  
* 用途：全选/全不选
* 输入：
* 返回：
*/
function selectAll(elementtd) 
{
	var isCheckAll=elementtd.checked;
    var dataList = elementtd.parentNode.parentNode.parentNode;
	for (i=1; i < dataList.rows.length; i++)
		{
			var elements=dataList.rows[i].cells[0].getElementsByTagName("input");
			for (j=0;j < elements.length; j++)
		{
			if (elements[j].type =='checkbox')
			{
				elements[j].checked = isCheckAll;
			}
		}
		}
 }
 
 /**  
* 用途：table多选删除提示
* 输入：
* 返回：
*/
function deleteDialog(gridid) 
{
    var currentgrid = document.getElementById(gridid);
	var isHaveChecked=false;
	for (i=1; i < currentgrid.rows.length; i++)
	{
		var elements=currentgrid.rows[i].cells[0].getElementsByTagName("input");
		for (j=0;j < elements.length; j++)
		{
			if (elements[j].type =='checkbox')
			{
				if(elements[j].checked)
				{
					isHaveChecked=true;
					break;
				}
			}
		}
	}
	if(isHaveChecked)
	{
		confirm("您是否确认删除所有选中项？");
	}
	else
	{
		alert("请选择需要删除的项");
	}
 }

/**  
* 用途：检查GridView是否有选中项
* 输入：gvId为gridview的ID
* 返回：
*/
function checkIsHaveCheckedItem(gvId) {
    var checked = false;
    var elements = document.getElementsByTagName("INPUT");
    for (i = 0; i < elements.length; i++)
     {
         if (elements[i].type == 'checkbox')
             if (checkFirstMatch(elements[i].id, gvId)) 
             {
                 if (elements[i].checked ) 
                 {
                    if(elements[i].parentNode.nodeName == 'TH')
                    {
                        continue;
                    }
                    else
                    {
                        checked = true;
                        break;
                    }
                 }
            }
     }
     return checked;
}

/*table滑动效果*/
 $(function() {
		$(".grid-body").hover(function() {
		var oldClass = $(this).attr("class");
        if (checkFirstMatch(oldClass, 'grid-body'))
		{
		$(this).attr("class", "grid-row-over");  
		}
	   },
		 function() {
		 	var oldClass = $(this).attr("class");
         	if (checkFirstMatch(oldClass, 'grid-row-over')) {
		   		$(this).attr("class", "grid-body");
		   }
		});
		
		$(".grid-body").bind("click",function(){
			$(this).siblings().not(".grid-header").attr("class", "grid-body"); 
			$(this).attr("class", "grid-row-selected");  
		});
	  });

