/**
 * 需要首先导入jquery 和 validate.css
 * 使用方法：必须因入类 class="grkj-validate" 如果只引入该类默认，如果是select的话 将忽略除message以外的其他参数
 * 属性参数：validateParam="{type:'string',maxLength:'30',required:'false'}"
 * 其中type：可以是string int double email url date radio checkbox mulSelect(自己写的可以多选的下拉) editSelect(自己写的可编辑下拉) searchText(带放大镜的查找文本框) 默认是string
 * 		如果是date的时候一定要引入js：<script type="text/javascript" src="<%=rootPath%>/js/plugin/calendar/WdatePicker.js"></script>
 * 		如果是radio 和checkbox的时候，一定要把一组checkbox或radio放在一个span里面如<span id="bglx" class="grkj-validate" validateParam="{type:'radio'}">
 * 																					<input type='radio' name='myradio' value='v1'/>
 * 																				    <input type='radio' name='myradio' value='v2'/>
 * 																					......
 * 																				</span>
 * 当type为string的时候还有一个参数是frdm表示是法人代码的校验，当frda为true或"true"时校验法人代码，否则不校验
 * minLength：如果type是int和double的话 就是允许输入的最小值，如果type为string则是允许输入字符串的最短长度
 * maxLength：如果type是int和double的话 就是允许输入的最大值，如果type为string则是允许输入字符串的最长长度
 * required：可选值'true','false',默认是'true'也就是不能为空, 注意：只有加上class="grkj-validate"就会自动校验不能为空
 * isByte：计算字符串长度的形式，'true'为按字节计算，'false'按字符计算，默认按字节计算
 * dateParam：如果是日期类型，可以传递框架日期的参数例如：{dateFmt:"yyyy-MM-dd HH:mm:ss"}，一般不用传递该参数
 * message:当校验出出错的时候的提示信息，默认按实际情况提示
 * dataType:当type是editselect的时候，文本框中可填写的数据类型，默认是string，还可以是int，double，email,url,date等
 * 初始化方法initGrkjValidate(initId);//如果initId为空，则初始化该页面所有的，否则只初始化该initId内的
 * 保存的时候先调用该方法saveCheck(id)，参数id是你的form或是表格或其他的id，如果为空在校验所有的，否则只校验在该id之内的
 */
$(document).ready(function(){
	initGrkjValidate();
	mouseChange();
});
	
function initGrkjValidate(initId){
	
	var validateAll;
	if(initId){
		validateAll=$("#"+initId).find(".grkj-validate");
	}else{
		validateAll=$(".grkj-validate");
	}
	validateAll.each(function(i,obj){
		var o=$(obj);
		var validateParam=o.attr("validateParam");validateParam=validateParam?validateParam:"{}";
		var paramObj=eval("["+validateParam+"]")[0];
		var message=paramObj.message;
		var type=paramObj.type;type=type?type.toLowerCase():'string';
		if(o.context.nodeName.toUpperCase()=="SELECT"){
			if(message=="" || message==null || message=="null")message="注意：该处不能为空！";
			if(o.hasClass("easyui-combobox")){//easyui的select
				var objSpan=o.next();
				var objText=objSpan.find(".combobox-text");
				var isshow=true;
				var offset=objSpan.offset();
				var divObj=$("<div style='border:1px solid #ff0000;background-color:#D0F180;z-index:2147483647 ;position:absolute;top:"+(offset.top+objSpan.height()+4)+"px;left:"+(offset.left-1)+"px'>"+message+"</div>");
				objSpan.hover(function(){
					var v=objSpan.find(".combobox-value").val();//alert(v)
					if(v=="" || v=="null" || v==null){
						objSpan.css("border","1px solid #ff0000");
						var newOffset=objSpan.offset();
						divObj.css({top:(newOffset.top+objSpan.height()+4)+"px",left:(newOffset.left-1)+"px"});
						divObj.appendTo("body");
					}else{
						objSpan.css("border","1px solid #A6C9E2");
						divObj.remove();
					}
				},function(){
					divObj.remove();
				});
				var imgObj=objSpan.find(".combobox-arrow");
				imgObj.click(function(){
					var divContent=$(".combobox-content");
					divContent.live("mouseout",function(){//alert(1)
						var v=objSpan.find(".combobox-value").val();//alert(v)
						if(v=="" || v=="null" || v==null){
							objSpan.css("border","1px solid #ff0000");
						}else{
							objSpan.css("border","1px solid #A6C9E2");
							divObj.remove();
						}
					});
				});
			}else{//默认的select 
				if(message=="" || message==null || message=="null")
					message="注意：该处不能为空！";
				var isshow=true;//是否显示提示的div 
				o.blur(function(){
					if(o.val()=="" || o.val()=="null" || !(o.val())){//如果值为空
						if(!o.hasClass("redBorder")){
							var spanObj=$("<span id='testDiv' style='border:1px solid #ff0000;display:inline-block;white-space:nowrap;margin:0px;padding:0px;'></span>");
							o.addClass("redBorder");
							o.wrap(spanObj);
							var offset=o.offset();
							var divObj=$("<div style='border:1px solid #ff0000;background-color:#D0F180;z-index:2147483647 ;position:absolute;top:"+(offset.top+o.height()+4)+"px;left:"+offset.left+"px'>"+message+"</div>");
							if(o.data("already")=="true"){
								isshow=true;
							}else{
								o.hover(function(){
									if(isshow){
										var newOffset=o.offset();
										divObj.css({top:(newOffset.top+o.height()+4)+"px",left:(newOffset.left-1)+"px"});
										divObj.appendTo("body");
									}
									else divObj.remove();
								},function(){
									divObj.remove();
								});
								o.data("already","true");
							}
						}
					}else{//如果有值
						if(o.hasClass("redBorder")){
							isshow=false;
							o.removeClass("redBorder");
							o.parent().parent().append(o);
							o.siblings().remove();
						}
					}
				});
			}
		}else{
			if(type==("mulselect")){//自己写的可多选select
				if(message=="" || message==null || message=="null")message="注意：该处不能为空！";
				o.attr("isshow","true");
				var id=o.attr("id");
				var objSpan=$("#"+id+"_span");
				var objokButton=$("#okButton_"+id);
				objokButton.live("click",function(){
					multipleSelect(o,objSpan,id,"okButton",message,'1')
				});
				var objcancleButton=$("#cancleButton_"+id);
				objcancleButton.live("click",function(){
					var v=$("#"+id).val();
					if(v=="" || v=="null"){
						multipleSelect(o,objSpan,id,"cancleButton",message,'1');			
					}
				});
				o.data("already","true");
			}else if(type==("mulselect2")){//自己写的可多选select2
				if(message=="" || message==null || message=="null")message="注意：该处不能为空！";
				o.attr("isshow","true");
				var id=o.attr("id");
				var objSpan=$("#"+id+"_span");
				var objokButton=$("#okButton_"+id);
				objokButton.live("click",function(){
					multipleSelect(o,objSpan,id,"okButton",message,'2')
				});
				var objcancleButton=$("#cancleButton_"+id);
				objcancleButton.live("click",function(){
					var v=$("#"+id).val();
					if(v=="" || v=="null"){
						multipleSelect(o,objSpan,id,"cancleButton",message,'2');			
					}
				});
				o.data("already","true");
			}else if(type==("searchtext")){//带放大镜查找的文本框
				if(message=="" || message==null || message=="null")message="注意：该处不能为空！";
				var objSpan=o.parent();
				var cancleButton=$("#cancleSearch_"+o.attr("id"));
				var isshow=true;
				cancleButton.live("click",function(){
					searchUnitText();
				});
				o.blur(function(){
					searchUnitText();
				});
				$("#okButton_"+o.attr("id")).live("click",function(){
					objSpan.css("border","1px solid #A6C9E2");
					isshow=false;
				});
				function searchUnitText(){
					var v=o.val();
					if(v=="" || v=="null" || v==null){
						objSpan.css("border","1px solid #ff0000");
						if(o.data("already")=="true"){
							isshow=true;
						}else{
							var offset=objSpan.offset();
							var divObj=$("<div style='border:1px solid #ff0000;background-color:#D0F180;z-index:2147483647 ;position:absolute;top:"+(offset.top+objSpan.height()+4)+"px;left:"+(offset.left-1)+"px'>"+message+"</div>");
							objSpan.hover(function(){
								if(isshow){
									var newOffset=objSpan.offset();
									divObj.css({top:(newOffset.top+objSpan.height()+4)+"px",left:(newOffset.left-1)+"px"});
									divObj.appendTo("body");
								}
								else divObj.remove();
							},function(){
								divObj.remove();
							});
							o.data("already","true");
						}
					}else{
						objSpan.css("border","1px solid #A6C9E2");
						isshow=false;
					}
				}
			}else{
				if(type=="date"){//日期类型的
					var offset=o.offset();
					message=message?message:"注意：该处不允许为空！";
					var divObj=$("<div style='border:1px solid #ff0000;background-color:#D0F180;z-index:2147483647 ;position:absolute;top:"+(offset.top+o.height()+14)+"px;left:"+(offset.left-1)+"px'>"+message+"</div>");
					o.attr("readonly","true");
					o.attr("isshow","false");
					o.hover(function(){
						if(o.attr("isshow")=="true"){
							var newOffset=o.offset();
							divObj.css({top:(newOffset.top+o.height()+4)+"px",left:(newOffset.left-1)+"px"});
							divObj.appendTo("body");
						}
						else divObj.remove();
					},function(){
						divObj.remove();
					});
					var dateParam=paramObj.dateParam?paramObj.dateParam:"";
					
					if(paramObj.required && paramObj.required.toLowerCase()=="false"){
						o.focus(function(){
							if(dateParam=="")
								WdatePicker();
							else
								WdatePicker(eval(dateParam));
						});
					}else{
						o.focus(function(){
							if(dateParam==""){
								WdatePicker({
									onpicked:function(dp){
										o.attr("isshow","false");
										o.removeClass("grkj-validate-border");
										return true;
									},
									oncleared:function(dp){
										o.addClass("grkj-validate-border");
										o.attr("isshow","true");
										return true;
									}
								});
							}else{
								var wpParam=eval(dateParam);
								wpParam.onpicked=function(dp){
									o.attr("isshow","false");
									o.removeClass("grkj-validate-border");
									return true;
								};
								wpParam.oncleared=function(dp){
									o.addClass("grkj-validate-border");
									o.attr("isshow","true");
									return true;
								}
								WdatePicker(
									wpParam
								);
							}
						});
					}
				}else if(type=="checkbox"){//复选框
					message=message?message:"注意：该处至少需要选择一项！";
					var offset=o.offset();
					var divObj=$("<div style='border:1px solid #ff0000;background-color:#D0F180;z-index:2147483647 ;position:absolute;top:"+(offset.top+o.height()+4)+"px;left:"+(offset.left-1)+"px'>"+message+"</div>");
					var checkboxs=o.find("input[type='checkbox']");		
					o.attr("isshow","false");
					o.hover(function(){
						if(o.attr("isshow")=="true"){
							var newOffset=o.offset();
							divObj.css({top:(newOffset.top+o.height()+4)+"px",left:(newOffset.left-1)+"px"});
							divObj.appendTo("body");
						}
						else divObj.remove();
					},function(){
						divObj.remove();
					});
					o.click(function(){
						if(o.find("input[type='checkbox']").filter("[checked=true]").size()<1){
							o.css("border","1px solid #ff0000");
							o.attr("isshow","true");
						}else{
							o.css("border","0px");
							o.attr("isshow","false");
						}
					});
				}else if(type=="editselect"){//自己写的可编辑select 
					var isshow=true;
					var id=o.attr("id");
					var spanObj=$("#span_"+id);
					var tableObj=$("#grid_"+id);
					tableObj.click(function(){
						$("#div_"+id).remove();
						isshow=false;
						spanObj.css({border:"1px solid #A6C9E2"});
					});
					o.blur(function(){
						var resultObj=checkMethod(o);
						var offset=o.offset();
						message=resultObj.message;
						var divObj=$("<div id='div_"+id+"' style='border:1px solid #ff0000;background-color:#D0F180;z-index:2147483647 ;position:absolute;top:"+(offset.top+o.height()+4)+"px;left:"+(offset.left-1)+"px'>"+message+"</div>");
						if(!resultObj.result){
							spanObj.css({border:"1px solid #ff0000"});
							if(o.data("already")=="true"){
								isshow=true;
							}else{
								o.hover(function(){
									if(isshow){
										var newOffset=o.offset();
										divObj.css({top:(newOffset.top+o.height()+4)+"px",left:(newOffset.left-1)+"px"});
										divObj.appendTo("body");
									}
									else divObj.remove();
								},function(){
									divObj.remove();
								});
								o.data("already","true");
							}
						}else{
							isshow=false;
							spanObj.css({border:"1px solid #A6C9E2"});
						}
					});
				}else{
					//一般的text和textarea
					var isshow=true;
					o.blur(function(){
						var resultObj=checkMethod(o);
						var offset=o.offset();
						message=resultObj.message;
						var divObj=$("<div style='border:1px solid #ff0000;background-color:#D0F180;z-index:2147483647 ;position:absolute;top:"+(offset.top+o.height()+4)+"px;left:"+(offset.left-1)+"px'>"+message+"</div>");
						if(!resultObj.result){
							o.addClass("grkj-validate-border");
							if(o.data("already")=="true"){
								isshow=true;
							}else{
								o.hover(function(){
									if(isshow){
										var newOffset=o.offset();
										divObj.css({top:(newOffset.top+o.height()+4)+"px",left:(newOffset.left-1)+"px"});
										divObj.appendTo("body");
									}
									else divObj.remove();
								},function(){
									divObj.remove();
								});
								o.data("already","true");
							}
						}else{
							isshow=false;
							o.removeClass("grkj-validate-border");
						}
					});
				}
			}
		}
	});
}

function multipleSelect(o,objSpan,id,buttonType,message,selType){
	if(o.data("already")=="true"){
		o.attr("isshow","true");
	}
	var selRows=0;
	if(selType=='2'){
		selRows=$("#"+id+"_grid tr:not(:first-child)").size()
	}else{
		var jqGridObj={};
		var rowids=new Array();
		if(buttonType=="okButton"){
			jqGridObj=$("#"+id+"_grid");
			rowids=jqGridObj.jqGrid("getGridParam","selarrrow");
		}
		selRows=rowids.length
	}
	if(selRows<1 || buttonType=="cancleButton"){
		var offset=objSpan.offset();
		var divObj=$("<div style='border:1px solid #ff0000;background-color:#D0F180;z-index:2147483647 ;position:absolute;top:"+(offset.top+objSpan.height()+4)+"px;left:"+(offset.left-1)+"px'>"+message+"</div>");
		objSpan.css("border","1px solid #ff0000");
		objSpan.hover(function(){
			if(o.attr("isshow")=="true"){
				var newOffset=objSpan.offset();
				divObj.css({top:(newOffset.top+objSpan.height()+4)+"px",left:(newOffset.left-1)+"px"});
				divObj.appendTo("body");
			}
			else divObj.remove();
		},function(){
			divObj.remove();
		});
	}else{
		o.attr("isshow","false");
		objSpan.css("border","1px solid #A6C9E2");
	}
}

/******************************************************
 * 去左右空格函数
 ******************************************************/
function trim(str){
	if(str == "") return "";
	return str.replace(/(^\s*)|(\s*$)/g, "");
}

/**
 * 检测数据类型是否合法
 * @param {Object} o
 * @return {TypeName} 
 */
function checkMethod(o){
	var validateParam=o.attr("validateParam");
	validateParam=validateParam?validateParam:"{}";
	var paramObj=eval("["+validateParam+"]")[0];
	var dataType=paramObj.dataType;
	var s=paramObj.type;            
	s=s?s:"string";
	//如果类型为可编辑的下拉，则s为传递进来的dataType，如果dataType存在的话
	if(s.toLowerCase()=="editselect")
		s=dataType?dataType:s;
	var maxLength=paramObj.maxLength;
	var minLength=paramObj.minLength;
	var required=paramObj.required; 
	required=required?required:"true";
	var isByte=paramObj.isByte;     
	isByte=isByte?isByte:"true";
	var message=paramObj.message;
	var tempMessage="";
	var RegExpPtn; 
	var t2=trim(o.val());
	var checkResult=check();
	message=message?message:tempMessage;
	
	return {result:checkResult,message:message};
	
	function check(){
		switch(s){  //先得到默认的提示信息
			case "double"://实数 
				tempMessage="该处只能输入实数！"
				if(maxLength)tempMessage="该处只能输入最大为："+maxLength+" 的实数！"
				if(minLength)tempMessage="该处只能输入最小为："+minLength+" 的实数！"
				if(maxLength && minLength) tempMessage="该处只能输入 "+minLength+"至"+maxLength+" 的实数！"
				break; 
			case "int"://正整数 
				tempMessage="该处只能输入正整数！"
				if(maxLength)tempMessage="该处只能输入最大为："+maxLength+" 的正整数！"
				if(minLength)tempMessage="该处只能输入最小为："+minLength+" 的正整数！"
				if(maxLength && minLength) tempMessage="该处只能输入 "+minLength+"至"+maxLength+" 的正整数！"
				break; 
			case "date"://日期yyyy-mm-dd 
				tempMessage="您的日期格式或日期数据不正确，日期格式为：yyyy-MM-dd hh:mm:ss也可以不带时间！"
				break; 
			case "email"://邮件 
				tempMessage="邮件格式为：xxx@qq.com ！"
				break; 
			case "url"://网址 
				tempMessage="网址格式为：http://www.xxx.com ！"
				break;
			case "code"://型号
				tempMessage="型号格式为：Xx345-564"
				break;
			case "phone"://电话
				tempMessage="电话格式为：010-10000000或13366666666"
				break;
			case "numorchar"://数字和字符
				tempMessage="请输入数字或字符！"
				break;
			case "char"://数字和字符
				tempMessage="请输入数字或字符！"
				break;
			case "GB"://汉字
				tempMessage="请输入汉字！"
				break;
			case "card"://身份证号
				tempMessage="请输入15位或18位的身份证号！"
				break;
			default://字符串
				if(maxLength)tempMessage="该处最多只能输入 "+maxLength
				if(minLength)tempMessage="该处最少要输入"+minLength
				if(maxLength && minLength) tempMessage="该处只能输入  "+minLength+"至"+maxLength
				if(maxLength || minLength){
					if(isByte!="true"){
						tempMessage=tempMessage+" 个字符！";
					}else{
						tempMessage=tempMessage+" 个字节！\r\n注意：一个汉字占两个字节,字母和数字各占一个字节！";
					}
				}
		}
		if(required=="true")
			tempMessage=tempMessage+(tempMessage==""?"该处不能为空！":"并且不能为空！");
		//下面开始校验
		if (t2 != ""){ 
			s=s.toLowerCase();
			switch(s){  
				case "double"://实数 
					RegExpPtn=/^(\+|-)?\d+($|\.\d+$)/; 
					if (!RegExpPtn.test(t2) ){return false;}else{
						if(maxLength && Number(t2)>Number(maxLength)) return false;
						if(minLength && Number(t2)<Number(minLength)) return false;
						return true;
					} 
					break; 
					case "scientific"://科学计数法
						RegExpPtn=/^(\+|-)?\d+([Ee](\+|-)?\d$|\.\d+[Ee](\+|-)?\d$)/; 
						if (!RegExpPtn.test(t2) ){return false;}else{
							if(maxLength && Number(t2)>Number(maxLength)) return false;
							if(minLength && Number(t2)<Number(minLength)) return false;
							return true;
						} 
						break;
				case "int"://正整数 
					RegExpPtn=/^[\d]+$/; 
					if (!RegExpPtn.test(t2) ){return false;}else{
						if(maxLength && Number(t2)>Number(maxLength)) return false;
						if(minLength && Number(t2)<Number(minLength)) return false;
						return true;
					} 
					break; 
				case "date"://日期yyyy-mm-dd 
					if(t2.length>10)//大于10说明是带时间的
						RegExpPtn=/^((((1[6-9]|[2-9]\d)\d{2})-(0?[13578]|1[02])-(0?[1-9]|[12]\d|3[01]))|(((1[6-9]|[2-9]\d)\d{2})-(0?[13456789]|1[012])-(0?[1-9]|[12]\d|30))|(((1[6-9]|[2-9]\d)\d{2})-0?2-(0?[1-9]|1\d|2[0-8]))|(((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))-0?2-29-))\s(20|21|22|23|[01]?\d):[0-5]?\d:[0-5]?\d$/; 
					else
						RegExpPtn=/^((((1[6-9]|[2-9]\d)\d{2})-(0?[13578]|1[02])-(0?[1-9]|[12]\d|3[01]))|(((1[6-9]|[2-9]\d)\d{2})-(0?[13456789]|1[012])-(0?[1-9]|[12]\d|30))|(((1[6-9]|[2-9]\d)\d{2})-0?2-(0?[1-9]|1\d|2[0-8]))|(((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))-0?2-29-))$/; 
					if (!RegExpPtn.test(t2) ){return false;}else{return true;}
					break; 
				case "email"://邮件 
					RegExpPtn=/\w[\w.-]+@[\w-]+(\.\w{2,})+/gi; 
					if (!RegExpPtn.test(t2) ){return false;}else{return true;} 
					break; 
				case "url"://网址 
					RegExpPtn=/^[a-zA-z]+\:\/\/(\w+(-\w+)*)(\.(\w+(-\w+)*))*(\?\S*)?$/;   
					if (!RegExpPtn.test(t2) ){return false;}else{return true;} 
					break;
				case "code"://型号
					RegExpPtn=/^[A-Za-z0-9]{1,}(-)?[A-Za-z0-9]{1,}$/;
					if (!RegExpPtn.test(t2) ){return false;}else{return true;}
					break;
				case "phone"://电话
					RegExpPtn=/^[0-9]{3}-[0-9]{8,}$/;
					RegExpPtn1=/^[0-9]{11}$/
					if (!RegExpPtn.test(t2)&&!RegExpPtn1.test(t2) ){return false;}else{return true;}
					break;
				case "numorchar"://数字和字符的输入
					RegExpPtn=/^[0-9a-zA-Z]+$/;
					if (!RegExpPtn.test(t2) ){return false;}else{return true;}
					break;
				case "char"://字符的输入
					RegExpPtn=/^[A-Za-z]+$/;
					if (!RegExpPtn.test(t2) ){return false;}else{return true;}
					break;
				case "GB"://汉字的输入
					RegExpPtn=/^[\u4e00-\u9fa5]+$/;
					if (!RegExpPtn.test(t2) ){return false;}else{return true;}
					break;
				case "card"://身份证号的校验
					RegExpPtn=/^[\d{15}|\d{18}|\d{17}(\d|X|x)]+$/;//身份证号，校验15位，或18位，或18位最后一位为字母X(大小写均可)
					if (!RegExpPtn.test(t2) ){return false;}else{return true;}
					break;
				default://字符串
					if(isByte!="true"){
						if(maxLength && Number(maxLength)<t2.length()) 
							return false;
						if(minLength && Number(minLength)>t2.length()) 
							return false;
					}else{
						if(maxLength && Number(maxLength)<strLen(t2)) 
							return false;
						if(minLength && Number(minLength)>strLen(t2)) 
							return false;
					}
					if(paramObj.frdm=="true" || paramObj.frdm==true){
						var ret= frdmValidate(t2);
						if(ret==false)
							tempMessage="不符合法人代码校验格式！(89045215-5)";
						return ret;
					}
					return true;
			} 
		}else{ 
			if(required=="true")return false; else return true;
		}
	}
}

/* 取得字符串的字节长度 */
function strLen(str){
	var len = 0; 
	for (var i=0;i<str.length;i++){ 
		if (str.charCodeAt(i)>255) len+=2; else len++; 
	} 
	return len; 
} 

/**
 * 保存时的校验函数
 * 保存的时候先调用该方法saveCheck(id)，参数id是你的form或是表格或其他的id，如果为空在校验所有的，否则只校验在该id之内的
 * @param {Object} id
 * @return {TypeName} 
 */
function saveCheck(objs){
	var returnResult=true;
//	var objs={};
//	if(id){
//		objs=$("#"+id).find(".grkj-validate");	
//	}else{
//		objs=$(".grkj-validate");
//	}

	objs.each(function(i,obj){
		var o=$(obj);
		var validateParam=o.attr("validateParam");
		validateParam=validateParam?validateParam:"{}";
		var paramObj=eval("["+validateParam+"]")[0];
		var type=paramObj.type;type=type?type.toLowerCase():'string';

		if(o.context.nodeName.toUpperCase()=="SELECT"){
			if(o.hasClass("easyui-combobox")){//easyui的select
				var objSpan=o.next();
				var v=objSpan.find(".combobox-value").val();//alert(v)
				if(v=="" || v=="null" || v==null){
					returnResult=false;
					objSpan.css("border","1px solid #ff0000");
				}
			}else{//默认的select 
				if(o.val()=="" || o.val()=="null" || !(o.val())){//如果值为空
					returnResult=false;
					o.blur();
				}
			}
		}else{
			if(type=="mulselect"){//自己写的可多选select
				var id=o.attr("id");
				var v=o.val();
				var objSpan=$("#"+id+"_span");
				if(v=="" || v=="null"){
					returnResult=false;
					multipleSelect(o,objSpan,id,"cancleButton","注意：该处不能为空！");
				}
			}else if(type=="mulselect2"){//自己写的可多选select2
				var id=o.attr("id");
				var v=o.val();
				var objSpan=$("#"+id+"_span");
				if(v=="" || v=="null"){
					returnResult=false;
					multipleSelect(o,objSpan,id,"cancleButton","注意：该处不能为空！",'2');
				}
			}else if(type=="searchtext"){//带放大镜查找的文本框
				if(o.val()=="" || o.val()=="null" || !(o.val())){//如果值为空
					returnResult=false;
					o.blur();
				}
			}else{
				if(type=="date"){//日期类型的
					if(!(paramObj.required && paramObj.required.toLowerCase()=="false")){
						if(o.val()=="" || o.val()=="null" || !(o.val())){//如果值为空
							returnResult=false;
							o.addClass("grkj-validate-border");
							o.attr("isshow","true");
						}
					}
				}else if(type=="radio"){//单选按钮
					if(o.find("input[type='radio']").filter("[checked=true]").size()<1){
						returnResult=false;
						o.css("border","1px solid #ff0000");
						var offset=o.offset();
						var message=paramObj.message;message=message?message:"请选择其中一个！";
						var divObj=$("<div style='border:1px solid #ff0000;background-color:#D0F180;z-index:2147483647 ;position:absolute;top:"+(offset.top+o.height()+4)+"px;left:"+(offset.left-1)+"px'>"+message+"</div>");
						var isshow=true;
						o.hover(function(){
							if(isshow)divObj.appendTo("body");
							else divObj.remove();
						},function(){
							divObj.remove();
						});
						o.find("input[type='radio']").click(function(){
							o.css("border","0px");
							isshow=false;
						});
					}
				}else if(type=="checkbox"){//多个复选框
					var objs=o.find("input[type='checkbox']");
					if(objs.filter("[checked=true]").size()<1){
						returnResult=false;
						o.click();
					}
				}else{//其他一般的
					var resultObj=checkMethod(o);
					if(resultObj.result==false){
						returnResult=false;
						//o.addClass("grkj-validate-border");
						//o.attr("isshow","true");
						o.blur();
					}
				}
			}
		}
	});
	return returnResult;
}


/**
 * 检验法人代码 begin 
 * 调用格式：frdmValidate("89045215-5")
 * 返回true正确，false错误
 * @param {Object} codes
 * @return {TypeName} 
 */
function frdmValidate(codes){
   var code=codes.substring(0,10);
 
	var ws = [3, 7, 9, 10, 5, 8, 4, 2];
	var str = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	var reg = /^([0-9A-Z]){8}-[0-9|X]$/;// /^[A-Za-z0-9]{8}-[A-Za-z0-9]{1}$/
	if (!reg.test(code)) {
	    //alert("法人代码不正确,请检查!");
	    return false;
	}
	var sum = 0;
	for (var i = 0; i < 8; i++) {
	   sum += str.indexOf(code.charAt(i)) * ws[i];
	}
	
	var c9 = 11 - (sum % 11);
	c9 = c9 == 10 ? 'X' : (c9 == 11 ? "0" : ("" + c9))
	if (c9 == code.charAt(9)){
	    return true;
	}else{
       //alert("法人代码不正确,请检查!");
        return false;
	}
	    
}
function mouseChange(){
	$(".Button_out").hover(function(){
		$(this).removeClass("Button_out").addClass("Button_over");
	},
	function(){
		$(this).removeClass("Button_over").addClass("Button_out");
	}
	);
	
	
}




