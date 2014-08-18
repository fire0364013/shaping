/**
 *  此js所对应SpotrecordAction 类
 *  在类中的localeMonitor 此方法  有三个隐藏值
 * 1.拼接所有不循环的文本框的name
 * 2.拼接所有循环的文本框的name
 * 3.总条数的值
 *有几个值需要注意：
 * 1.count   当前行所行号
 */


Array.prototype.indexOf = function (val) {  
    for (var i = 0; i < this.length; i++) {  
        if (this[i] == val) {  
            return i;  
        }  
    }  
    return -1;  
};  
Array.prototype.remove = function (val) {  
    var index = this.indexOf(val);  
    if (index > -1) {  
        this.splice(index, 1);  
    }  
}; 
function initAddInputData(samplingstartdate){
		$.post(rootPath +"/spot/spotrecord/spotrecord!localeMonitor.action",{projectPointId:projectPointId,samplingstartdate:samplingstartdate},function(data){
			var obj = eval('('+data+')');
			//alert(obj.html);
			$("#tableaddson").html(obj.html);
			new tabTableInput("quxiandatalist","text");
		});
}
/**
 * 添加行
 * @param {Object} count
 * @param {Object} defaultrep
 * 此处要注意两个值
 * 一：为存放当前所有能够循环并且显示出的文本框所编的号的拼接值 var flagcount=$("#flagcount"+addFlag).val();
 * 二：循环行有行号有id   id规则为row+参数id+循环行号        不需要循环行  没有行号
 * 
 * 
 * 循环和不循环的name拼接方式不同
 * 循环的name是"addparmMore"+"#"+本参数id+"#"+当前循环的次数;
 * 不循环的name是"addparm"+"#"+本参数id;
 * 
 */
//，defaultrep  当前字段所需要循环的条数 ,nameStr左侧的名字，unitStr左侧的计量单位,sportid当前参数的id
function addRow(defaultrep,nameStr,unitStr,sportid,colspanCount){
	//alert(defaultrep+"__"+nameStr+"__"+unitStr+"__"+sportid);
	//alert($("#flagcount"+sportid+"0").val());
	//获取最大值
	var flagcount=$("#flagcount"+sportid+"0").val();
	//alert(flagcount);
	var flagcountOne=flagcount.split(",");
	var max=flagcountOne[0];
	for(i=1;i<flagcountOne.length;i++){
		if(max<flagcountOne[i])
  		 max=flagcountOne[i];
	}
	//拼接html
	var newcount=parseInt(max)+1;//新的循环索引
	//alert(newcount);
	//var totalcount=$("#totalcount").val();
	//var newtotalcount=parseInt(totalcount)+1;//新的总行数
	var innerHtml="<tr id='row"+sportid+newcount+"'>" +
	"<td   style='text-align: left; width: 140px;' class='Main_Tab_Style_title' width='100px'>"+nameStr+(newcount)+unitStr+":</td>" +
	"<td style='text-align: left;width: 80px' class='Main_Tab_Style_Content'>" +
		"<input type='text' id='addparmMore"+sportid+newcount+"'  name='addparmMore#"+sportid+"#"+newcount+"'  class='TextBox'  style='width:80px;text-align: left;height:20px'/>" +
	"</td>" +
	"<td  class='Main_Tab_Style_Content' colspan='"+colspanCount+"'>" +
	"<input type='button' class='TextBox' value='删除' onclick=\"delRow('"+sportid+"','"+newcount+"')\"/></td></tr>" ;
	flagcountOne.push(newcount);
//	alert(innerHtml);
	$("#row"+sportid+max).after(innerHtml);
	//重新为隐藏 循环行赋值
	$("#flagcount"+sportid+"0").val(flagcountOne);
	//获取循环行的name拼接的隐藏域
	var extenvparamidMore=$("#extenvparamidMore").val();
	extenvparamidMore+=",addparmMore#"+sportid+"#"+newcount;
	$("#extenvparamidMore").val(extenvparamidMore);
	//alert($("#extenvparamidMore").val());
}



/**
 * 增加的时候的删除行
 * @param {Object} count
 * @param {Object} rowFlag
 * @param {Object} addFlag
 * 此处要注意两个值
 * 一：为存放当前所有能够循环并且显示出的文本框所编的号的拼接值 var flagcount=$("#flagcount"+addFlag).val();
 *二：count当前行的循环行数  和sportid 参数id
 * 
 */
//count 当前行的循环行数，sportid 本循环行参数id
function delRow(sportid,count){
	//alert(sportid+"__"+count);
	//逗号拼接的行索引的标记
	var flagcount=$("#flagcount"+sportid+"0").val();
//	alert($("#extenvparamidMore").val());
//	alert(flagcount);
	var flagcountOne=flagcount.split(",");
	//除去已经删除的循环行索引
	for(i=0;i<flagcountOne.length;i++){
		if(flagcountOne[i]==count){
			flagcountOne.remove(flagcountOne[i]);
		}
	}
	//重新给隐藏域赋值
	$("#flagcount"+sportid+"0").val(flagcountOne);
	$("#row"+sportid+count).remove();
	//获取循环行的name拼接的隐藏域
	var extenvparamidMore=$("#extenvparamidMore").val();
	var extenvparamidMoreArray=extenvparamidMore.split(",");
	for(i=0;i<extenvparamidMoreArray.length;i++){
		if(extenvparamidMoreArray[i]==("addparmMore#"+sportid+"#"+count)){
			extenvparamidMoreArray.remove(extenvparamidMoreArray[i]);
		}
	}
	$("#extenvparamidMore").val(extenvparamidMoreArray);
}


/**
 * 修改的时候的删除行
 * @param {Object} count
 * @param {Object} rowFlag
 * @param {Object} addFlag
 * 此处要注意两个值
 * 一：为存放当前所有能够循环并且显示出的文本框所编的号的拼接值 var flagcount=$("#flagcount"+addFlag).val();
 *二：count当前行的循环行数  和sportid 参数id
 * 
 * 修改删除与添加删除的区别在于 修改的时候需要把删除掉的行的数据在数据库删除，此时则需要拼接好此name然后传入action中进行处理
 * 
 */
//count 当前行的循环行数，sportid 本循环行参数id
function delRowEdit(sportid,count){//alert(222);
	//alert(sportid+"____"+count);
	//逗号拼接的标记
	var flagcount=$("#flagcount"+sportid+"0").val();
	//alert(flagcount);
	var flagcountOne=flagcount.split(",");
	//除去已经删除的循环行索引
	for(i=0;i<flagcountOne.length;i++){
		if(flagcountOne[i]==count){
			flagcountOne.remove(flagcountOne[i]);
		}
	}
	//重新给隐藏域赋值
	$("#flagcount"+sportid+"0").val(flagcountOne);
	$("#row"+sportid+count).remove();
	
	//获取循环行的name拼接的隐藏域
	var extenvparamidMore=$("#extenvparamidMore").val();
	var extenvparamidMoreArray=extenvparamidMore.split(",");
	for(i=0;i<extenvparamidMoreArray.length;i++){
		if(extenvparamidMoreArray[i]==("addparmMore#"+sportid+"#"+count)){
			extenvparamidMoreArray.remove(extenvparamidMoreArray[i]);
		}
	}
	$("#extenvparamidMore").val(extenvparamidMoreArray);
	
	//拼接好删除行的索引delRowIndex
	var delRowIndex=$("#delRowIndex").val();
	if(delRowIndex.length>0){
		delRowIndex+=","+sportid+"#"+count;
	}else{
		delRowIndex=sportid+"#"+count;
	}
	$("#delRowIndex").val(delRowIndex);
}