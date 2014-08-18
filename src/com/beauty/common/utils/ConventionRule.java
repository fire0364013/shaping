package com.beauty.common.utils;

import java.math.BigDecimal;
import java.math.MathContext;
import java.math.RoundingMode;
import java.text.DecimalFormat;

/**
 * 修约规则
 *
 *
 */
public class ConventionRule {
	
	/**
	 * //原始数据,有效数字位数,小数位数,修约规则,检出限,最低检出限显示值
	 * @param metadata原始数据
	 * @param significantdigit有效数字位数
	 * @param decimaldigit小数位数
	 * @param rule修约规则
	 * @param lowdetectionlimit检出限
	 * @param limitshowvalue最低检出限显示值
	 * @return
	 */
	public static String conventionRule(String metadata,String significantdigit,String decimaldigit,int rule,String criticalvalue,String significantdigit2,String decimaldigit2){
		String result="";
		if(metadata!=null&&metadata.trim().equals("")==false)
		{
			if(criticalvalue!=null && !"".equals(criticalvalue)){
				if(Double.valueOf(metadata)>Double.valueOf(criticalvalue)){
					result = newRule(metadata,significantdigit,decimaldigit,rule);
				}else{
					result = newRule(metadata,significantdigit,decimaldigit,rule);
				}
			}else{
				result = newRule(metadata,significantdigit,decimaldigit,rule);
			}
		}
		return result;
		
		
		/*String result="";
		if(metadata!=null&&metadata.trim().equals("")==false)
		{
			if(criticalvalue!=null && !"".equals(criticalvalue)){
				return newRule(metadata,significantdigit,decimaldigit,rule,criticalvalue,significantdigit2,decimaldigit2);
			}else{
				if((significantdigit==null||"".equals(significantdigit)||"0".equals(significantdigit)||"null".equals(significantdigit))
						&&(decimaldigit==null||"".equals(decimaldigit)||"0".equals(decimaldigit)||"null".equals(decimaldigit))){
					if("0".equals(decimaldigit)&& metadata.indexOf(".")>0){
					
						BigDecimal de = BigDecimal.valueOf(Double.valueOf(metadata));
						if(rule==1){
							de = de.setScale(Integer.parseInt(decimaldigit),BigDecimal.ROUND_HALF_UP);			
						}
						if(rule==2){
							de = de.setScale(Integer.parseInt(decimaldigit),BigDecimal.ROUND_HALF_EVEN);
						}
						metadata = de.toString();
					}
					return metadata;
				}
				BigDecimal de = BigDecimal.valueOf(Double.valueOf(metadata));
				result = de.toString();
				BigDecimal deYX = null;
				
				//1.先按照有效位数修约
				if(significantdigit!=null&&!"".equals(significantdigit)&&!"null".equals(significantdigit)){
					MathContext m = null;
					//四舍五入
					if(rule==1){
						m = new MathContext(Integer.parseInt(significantdigit),RoundingMode.HALF_UP);
					}
					//四舍六入五成双
					if(rule==2){
						m = new MathContext(Integer.parseInt(significantdigit),RoundingMode.HALF_EVEN);
					}
					//按照有效位数修约
					de = de.divide(BigDecimal.ONE,m);
					deYX = de.divide(BigDecimal.ONE,m);
					result = de.toString();
				}
				
				//2.判断小数位数
				if(decimaldigit!=null&&!"".equals(decimaldigit)&&!"null".equals(decimaldigit)&&Integer.parseInt(decimaldigit)>0){
					int point = 0;
					if(result.indexOf("E")>=0){
						point = result.substring(result.indexOf(".")+1,result.indexOf("E")).length();
					}else{
						if(result.indexOf(".")>=0){
							point = result.length() - (result.indexOf(".") + 1);
						}
					}
					//大于设置的小数位数，把原始数据按照小数位数重新修约
					if(point>Integer.parseInt(decimaldigit)){
						de = BigDecimal.valueOf(Double.valueOf(metadata));
						if(rule==1){
							de = de.setScale(Integer.parseInt(decimaldigit),BigDecimal.ROUND_HALF_UP);			
						}
						if(rule==2){
							de = de.setScale(Integer.parseInt(decimaldigit),BigDecimal.ROUND_HALF_EVEN);
						}
						result = de.toString();
					}
					//小于设置的小数位数，小数位数后补0
					else if(point<Integer.parseInt(decimaldigit)){
						if(significantdigit==null||"".equals(significantdigit)||"null".equals(significantdigit)||Integer.parseInt(significantdigit)==0){//没有设置有效个数直接返回
							result = addZero(de.toString(),(Integer.parseInt(decimaldigit)-point));
							return result;
						}else if(getSignificantNum(result)<Integer.parseInt(significantdigit)){
							result = addZero(de.toString(),(Integer.parseInt(decimaldigit)-point));
						}
						
					}
				}
				
				if(decimaldigit!=null&&!"".equals(decimaldigit)&&!"null".equals(decimaldigit)){
					//3.大于1000用科学计数法表示
					if(Double.valueOf(de.toString())>=1000){
						String patten = "0.#";
						for(int j = 0;j<Integer.parseInt(decimaldigit)-1;j++){					
							patten += "#";			
						}
						patten += "E0";
						DecimalFormat  df  = new DecimalFormat(patten);
						result = df.format(Double.parseDouble(de.toString()));
						int nDecCount = result.split("E")[0].length() - (result.indexOf(".") + 1);
						if(significantdigit!=null&&!"".equals(significantdigit)&&!"null".equals(significantdigit)){
							if(getSignificantNum(result)<Integer.parseInt(significantdigit) && nDecCount< Integer.parseInt(decimaldigit)){
								result = addZero(result,Integer.parseInt(significantdigit) - getSignificantNum(result));
							}
						}
						return result.replace("+", "");
					}
				}
				//4.设置有效位数和小数位数：按小数位数修约后的有效位数等于0，用科学计数法表示
				//  			   如果不等于0的情况下，如果按照小数位数修约完后的数据有效位数比设定的大，则直接报出有效位数修约后的值；
				//如果按照小数位数修约完后的数据有效位数<=设定的有效位数个数，则进行科学计数法表示。
				if(significantdigit!=null&&!"".equals(significantdigit)&&!"null".equals(significantdigit)&&decimaldigit!=null&&!"".equals(decimaldigit)&&!"null".equals(decimaldigit)){
					if(Integer.parseInt(significantdigit)>0&&Integer.parseInt(decimaldigit)>0){
						if(getSignificantNum(result)==0){
							String patten = "0.#";
							if(100 > Double.valueOf(de.toString()) && Double.valueOf(de.toString())>= 10){
								patten = "00.#";
							}else if(1000 > Double.valueOf(de.toString()) && Double.valueOf(de.toString()) >= 100)
							{
								patten = "000.#";
							}
							for(int j = 0;j<Integer.parseInt(decimaldigit)-1;j++){					
								patten += "#";			
							}
							patten += "E0";
							DecimalFormat  df  = new DecimalFormat(patten);
							result = df.format(Double.parseDouble(deYX.toString()));
		
							if(result.lastIndexOf("E0")>=0){
								result.replace("E0","");
							}else{
								patten = "0.#";
								for(int j = 0;j<Integer.parseInt(decimaldigit)-1;j++){					
									patten += "#";			
								}
								patten += "E0";
								DecimalFormat  df1  = new DecimalFormat(patten);
								result = df1.format(Double.parseDouble(deYX.toString()));
							}
							
							//小数位数和有效位数都小于设置的，补0
							int nDecCount=0;
							if(result.indexOf("E")>=0)
							{
								nDecCount=result.split("E")[0].length() - (result.indexOf(".") + 1);
							}
							else
							{
								nDecCount=result.length() - (result.indexOf(".") + 1);
							}
							if(getSignificantNum(result)<Integer.parseInt(significantdigit) && nDecCount< Integer.parseInt(decimaldigit)){
								result = addZero(result,Integer.parseInt(significantdigit) - getSignificantNum(result));
							}
							
							return result.replace("+", "");
						}else{
							//修约后的有效位数大于设定的有效位数
							if(getSignificantNum(result)>Integer.parseInt(significantdigit)){
								result = deYX.toString();
								
								//小数位数和有效位数都小于设置的，补0
								int nDecCount=0;
								if(result.indexOf("E")>=0)
								{
									nDecCount=result.split("E")[0].length() - (result.indexOf(".") + 1);
								}
								else
								{
									nDecCount=result.length() - (result.indexOf(".") + 1);
								}
								if(getSignificantNum(result)<Integer.parseInt(significantdigit) && nDecCount< Integer.parseInt(decimaldigit)){
									result = addZero(result,Integer.parseInt(significantdigit) - getSignificantNum(result));
								}
								return result.replace("+", "");
							}
							else if(getSignificantNum(result) == Integer.parseInt(significantdigit)){
								if(result.indexOf("E")<0){
									int spoint = 0;
									if(result.indexOf(".")>=0){
										spoint = result.length()-(result.indexOf(".")+1);
									}
									if(spoint >= Integer.parseInt(decimaldigit)){
										result = deYX.toString();
										
										//小数位数和有效位数都小于设置的，补0
										int nDecCount=0;
										if(result.indexOf("E")>=0)
										{
											nDecCount=result.split("E")[0].length() - (result.indexOf(".") + 1);
										}
										else
										{
											nDecCount=result.length() - (result.indexOf(".") + 1);
										}
										if(getSignificantNum(result)<Integer.parseInt(significantdigit) &&nDecCount< Integer.parseInt(decimaldigit)){
											result = addZero(result,Integer.parseInt(significantdigit) - getSignificantNum(result));
										}
										return result.replace("+", "");
									}else{
										String patten = "0.#";
										for(int j = 0;j<Integer.parseInt(decimaldigit)-1;j++){					
											patten += "#";			
										}
										
										patten += "E0";
										DecimalFormat  df  = new DecimalFormat(patten);
										result = df.format(Double.parseDouble(deYX.toString()));
		
										if(result.lastIndexOf("E0")>=0){
											result = result.replace("E0","");
										}else{
											patten = "0.#";
											for(int j = 0;j<Integer.parseInt(decimaldigit)-1;j++){					
												patten += "#";			
											}
											patten += "E0";
											DecimalFormat  df1  = new DecimalFormat(patten);
											result = df1.format(Double.parseDouble(deYX.toString()));
										}
										
										//小数位数和有效位数都小于设置的，补0
										int nDecCount=0;
										if(result.indexOf("E")>=0)
										{
											nDecCount=result.split("E")[0].length() - (result.indexOf(".") + 1);
										}
										else
										{
											nDecCount=result.length() - (result.indexOf(".") + 1);
										}
										if(getSignificantNum(result)<Integer.parseInt(significantdigit) && nDecCount < Integer.parseInt(decimaldigit)){
											result = addZero(result,Integer.parseInt(significantdigit) - getSignificantNum(result));
										}
										int rpoint = 0;
										if(result.indexOf(".")>=0){
											if(result.indexOf("E")<0){
												rpoint = result.length()-(result.indexOf(".")+1);
											}else{
												rpoint = result.substring(result.indexOf(".")+1,result.indexOf("E")).length();
											}
										}
										
										if(rpoint < Integer.parseInt(decimaldigit)){
											result = deYX.toString();
										}
										return result.replace("+", "");
									}
								}
								
							}
							//修约后的有效位数小于设定的有效位数
							else{
								String patten = "0.#";
								if(100 > Double.valueOf(de.toString()) && Double.valueOf(de.toString())>= 10){
									patten = "00.#";
								}else if(1000 > Double.valueOf(de.toString()) && Double.valueOf(de.toString()) >= 100)
								{
									patten = "000.#";
								}
								for(int j = 0;j<Integer.parseInt(decimaldigit)-1;j++){					
									patten += "#";			
								}
								
								patten += "E0";
								DecimalFormat  df  = new DecimalFormat(patten);
								result = df.format(Double.parseDouble(deYX.toString()));
		
								if(result.lastIndexOf("E0")>=0){
									result = result.replace("E0","");
								}else{
									patten = "0.#";
									for(int j = 0;j<Integer.parseInt(decimaldigit)-1;j++){					
										patten += "#";			
									}
									patten += "E0";
									DecimalFormat  df1  = new DecimalFormat(patten);
									result = df1.format(Double.parseDouble(deYX.toString()));
								}
								
								//小数位数和有效位数都小于设置的，补0
								int nDecCount=0;
								if(result.indexOf("E")>=0)
								{
									nDecCount=result.split("E")[0].length() - (result.indexOf(".") + 1);
								}
								else
								{
									nDecCount=result.length() - (result.indexOf(".") + 1);
								}
								if(getSignificantNum(result)<Integer.parseInt(significantdigit) &&nDecCount< Integer.parseInt(decimaldigit)){
									result = addZero(result,Integer.parseInt(significantdigit) - getSignificantNum(result));
								}
								return result.replace("+", "");
							}
							
						}
					}
					//设置有效位数没有设置小数位数，按照有效位数补0
					else if(Integer.parseInt(significantdigit)>0&&Integer.parseInt(decimaldigit)==0){
						if(getSignificantNum(result)<Integer.parseInt(significantdigit)){
							result = addZero(result,Integer.parseInt(significantdigit) - getSignificantNum(result));
							return result.replace("+", "");
						}
					}
				}else{
					if(significantdigit!=null&&!"".equals(significantdigit)&&!"null".equals(significantdigit)){
						if(getSignificantNum(result)<Integer.parseInt(significantdigit)){
							result = addZero(result,Integer.parseInt(significantdigit) - getSignificantNum(result));
							return result.replace("+", "");
						}
					}
				}
				
				
				result = de.toString();
			}
		}
		return result.replace("+", "");*/
	}
	
	public static String newRule(String metadata,String significantdigit,String decimaldigit,int rule){
		String result="";
		if(metadata!=null&&metadata.trim().equals("")==false)
		{
			
				if((significantdigit==null||"".equals(significantdigit)||"0".equals(significantdigit)||"null".equals(significantdigit))
						&&(decimaldigit==null||"".equals(decimaldigit)||"0".equals(decimaldigit)||"null".equals(decimaldigit))){
					if("0".equals(decimaldigit)&& metadata.indexOf(".")>0){
					
						BigDecimal de = BigDecimal.valueOf(Double.valueOf(metadata));
						if(rule==1){
							de = de.setScale(Integer.parseInt(decimaldigit),BigDecimal.ROUND_HALF_UP);			
						}
						if(rule==2){
							de = de.setScale(Integer.parseInt(decimaldigit),BigDecimal.ROUND_HALF_EVEN);
						}
						metadata = de.toString();
					}
					return metadata;
				}
				BigDecimal de = BigDecimal.valueOf(Double.valueOf(metadata));
				result = de.toString();
				BigDecimal deYX = null;
				
				//1.先按照有效位数修约
				if(significantdigit!=null&&!"".equals(significantdigit)&&!"null".equals(significantdigit)){
					MathContext m = null;
					//四舍五入
					if(rule==1){
						m = new MathContext(Integer.parseInt(significantdigit),RoundingMode.HALF_UP);
					}
					//四舍六入五成双
					if(rule==2){
						m = new MathContext(Integer.parseInt(significantdigit),RoundingMode.HALF_EVEN);
					}
					//按照有效位数修约
					de = de.divide(BigDecimal.ONE,m);
					deYX = de.divide(BigDecimal.ONE,m);
					result = de.toString();
				}
				
				//2.判断小数位数
				if(decimaldigit!=null&&!"".equals(decimaldigit)&&!"null".equals(decimaldigit)&&Integer.parseInt(decimaldigit)>0){
					int point = 0;
					if(result.indexOf("E")>=0){
						point = result.substring(result.indexOf(".")+1,result.indexOf("E")).length();
					}else{
						if(result.indexOf(".")>=0){
							point = result.length() - (result.indexOf(".") + 1);
						}
					}
					//大于设置的小数位数，把原始数据按照小数位数重新修约
					if(point>Integer.parseInt(decimaldigit)){
						de = BigDecimal.valueOf(Double.valueOf(metadata));
						if(rule==1){
							de = de.setScale(Integer.parseInt(decimaldigit),BigDecimal.ROUND_HALF_UP);			
						}
						if(rule==2){
							de = de.setScale(Integer.parseInt(decimaldigit),BigDecimal.ROUND_HALF_EVEN);
						}
						result = de.toString();
					}
					//小于设置的小数位数，小数位数后补0
					else if(point<Integer.parseInt(decimaldigit)){
						if(significantdigit==null||"".equals(significantdigit)||"null".equals(significantdigit)||Integer.parseInt(significantdigit)==0){//没有设置有效个数直接返回
							result = addZero(de.toString(),(Integer.parseInt(decimaldigit)-point));
							return result;
						}else if(getSignificantNum(result)<Integer.parseInt(significantdigit)){
							result = addZero(de.toString(),(Integer.parseInt(decimaldigit)-point));
						}
						
					}
				}
				
				if(decimaldigit!=null&&!"".equals(decimaldigit)&&!"null".equals(decimaldigit)){
					//3.大于1000用科学计数法表示
					if(Double.valueOf(de.toString())>=1000){
						String patten = "0.#";
						for(int j = 0;j<Integer.parseInt(decimaldigit)-1;j++){					
							patten += "#";			
						}
						patten += "E0";
						DecimalFormat  df  = new DecimalFormat(patten);
						result = df.format(Double.parseDouble(de.toString()));
						int nDecCount = result.split("E")[0].length() - (result.indexOf(".") + 1);
						if(significantdigit!=null&&!"".equals(significantdigit)&&!"null".equals(significantdigit)){
							if(getSignificantNum(result)<Integer.parseInt(significantdigit) && nDecCount< Integer.parseInt(decimaldigit)){
								result = addZero(result,Integer.parseInt(significantdigit) - getSignificantNum(result));
							}
						}
						return result.replace("+", "");
					}
				}
				//4.设置有效位数和小数位数：按小数位数修约后的有效位数等于0，用科学计数法表示
				//  			   如果不等于0的情况下，如果按照小数位数修约完后的数据有效位数比设定的大，则直接报出有效位数修约后的值；
				//如果按照小数位数修约完后的数据有效位数<=设定的有效位数个数，则进行科学计数法表示。
				if(significantdigit!=null&&!"".equals(significantdigit)&&!"null".equals(significantdigit)&&decimaldigit!=null&&!"".equals(decimaldigit)&&!"null".equals(decimaldigit)){
					if(Integer.parseInt(significantdigit)>0&&Integer.parseInt(decimaldigit)>0){
						if(getSignificantNum(result)==0){
							String patten = "0.#";
							if(100 > Double.valueOf(de.toString()) && Double.valueOf(de.toString())>= 10){
								patten = "00.#";
							}else if(1000 > Double.valueOf(de.toString()) && Double.valueOf(de.toString()) >= 100)
							{
								patten = "000.#";
							}
							for(int j = 0;j<Integer.parseInt(decimaldigit)-1;j++){					
								patten += "#";			
							}
							patten += "E0";
							DecimalFormat  df  = new DecimalFormat(patten);
							result = df.format(Double.parseDouble(deYX.toString()));
		
							if(result.lastIndexOf("E0")>=0){
								result.replace("E0","");
							}else{
								patten = "0.#";
								for(int j = 0;j<Integer.parseInt(decimaldigit)-1;j++){					
									patten += "#";			
								}
								patten += "E0";
								DecimalFormat  df1  = new DecimalFormat(patten);
								result = df1.format(Double.parseDouble(deYX.toString()));
							}
							
							//小数位数和有效位数都小于设置的，补0
							int nDecCount=0;
							if(result.indexOf("E")>=0)
							{
								nDecCount=result.split("E")[0].length() - (result.indexOf(".") + 1);
							}
							else
							{
								nDecCount=result.length() - (result.indexOf(".") + 1);
							}
							if(getSignificantNum(result)<Integer.parseInt(significantdigit) && nDecCount< Integer.parseInt(decimaldigit)){
								result = addZero(result,Integer.parseInt(significantdigit) - getSignificantNum(result));
							}
							
							return result.replace("+", "");
						}else{
							//修约后的有效位数大于设定的有效位数
							if(getSignificantNum(result)>Integer.parseInt(significantdigit)){
								result = deYX.toString();
								
								//小数位数和有效位数都小于设置的，补0
								int nDecCount=0;
								if(result.indexOf("E")>=0)
								{
									nDecCount=result.split("E")[0].length() - (result.indexOf(".") + 1);
								}
								else
								{
									nDecCount=result.length() - (result.indexOf(".") + 1);
								}
								if(getSignificantNum(result)<Integer.parseInt(significantdigit) && nDecCount< Integer.parseInt(decimaldigit)){
									result = addZero(result,Integer.parseInt(significantdigit) - getSignificantNum(result));
								}
								return result.replace("+", "");
							}
							else if(getSignificantNum(result) == Integer.parseInt(significantdigit)){
								if(result.indexOf("E")<0){
									int spoint = 0;
									if(result.indexOf(".")>=0){
										spoint = result.length()-(result.indexOf(".")+1);
									}
									if(spoint >= Integer.parseInt(decimaldigit)){
										result = deYX.toString();
										
										//小数位数和有效位数都小于设置的，补0
										int nDecCount=0;
										if(result.indexOf("E")>=0)
										{
											nDecCount=result.split("E")[0].length() - (result.indexOf(".") + 1);
										}
										else
										{
											nDecCount=result.length() - (result.indexOf(".") + 1);
										}
										if(getSignificantNum(result)<Integer.parseInt(significantdigit) &&nDecCount< Integer.parseInt(decimaldigit)){
											result = addZero(result,Integer.parseInt(significantdigit) - getSignificantNum(result));
										}
										return result.replace("+", "");
									}else{
										String patten = "0.#";
										for(int j = 0;j<Integer.parseInt(decimaldigit)-1;j++){					
											patten += "#";			
										}
										
										patten += "E0";
										DecimalFormat  df  = new DecimalFormat(patten);
										result = df.format(Double.parseDouble(deYX.toString()));
		
										if(result.lastIndexOf("E0")>=0){
											result = result.replace("E0","");
										}else{
											patten = "0.#";
											for(int j = 0;j<Integer.parseInt(decimaldigit)-1;j++){					
												patten += "#";			
											}
											patten += "E0";
											DecimalFormat  df1  = new DecimalFormat(patten);
											result = df1.format(Double.parseDouble(deYX.toString()));
										}
										
										//小数位数和有效位数都小于设置的，补0
										int nDecCount=0;
										if(result.indexOf("E")>=0)
										{
											nDecCount=result.split("E")[0].length() - (result.indexOf(".") + 1);
										}
										else
										{
											nDecCount=result.length() - (result.indexOf(".") + 1);
										}
										if(getSignificantNum(result)<Integer.parseInt(significantdigit) && nDecCount < Integer.parseInt(decimaldigit)){
											result = addZero(result,Integer.parseInt(significantdigit) - getSignificantNum(result));
										}
										int rpoint = 0;
										if(result.indexOf(".")>=0){
											if(result.indexOf("E")<0){
												rpoint = result.length()-(result.indexOf(".")+1);
											}else{
												rpoint = result.substring(result.indexOf(".")+1,result.indexOf("E")).length();
											}
										}
										
										if(rpoint < Integer.parseInt(decimaldigit)){
											result = deYX.toString();
										}
										return result.replace("+", "");
									}
								}
								
							}
							//修约后的有效位数小于设定的有效位数
							else{
								String patten = "0.#";
								if(100 > Double.valueOf(de.toString()) && Double.valueOf(de.toString())>= 10){
									patten = "00.#";
								}else if(1000 > Double.valueOf(de.toString()) && Double.valueOf(de.toString()) >= 100)
								{
									patten = "000.#";
								}
								for(int j = 0;j<Integer.parseInt(decimaldigit)-1;j++){					
									patten += "#";			
								}
								
								patten += "E0";
								DecimalFormat  df  = new DecimalFormat(patten);
								result = df.format(Double.parseDouble(deYX.toString()));
		
								if(result.lastIndexOf("E0")>=0){
									result = result.replace("E0","");
								}else{
									patten = "0.#";
									for(int j = 0;j<Integer.parseInt(decimaldigit)-1;j++){					
										patten += "#";			
									}
									patten += "E0";
									DecimalFormat  df1  = new DecimalFormat(patten);
									result = df1.format(Double.parseDouble(deYX.toString()));
								}
								
								//小数位数和有效位数都小于设置的，补0
								int nDecCount=0;
								if(result.indexOf("E")>=0)
								{
									nDecCount=result.split("E")[0].length() - (result.indexOf(".") + 1);
								}
								else
								{
									nDecCount=result.length() - (result.indexOf(".") + 1);
								}
								if(getSignificantNum(result)<Integer.parseInt(significantdigit) &&nDecCount< Integer.parseInt(decimaldigit)){
									result = addZero(result,Integer.parseInt(significantdigit) - getSignificantNum(result));
								}
								return result.replace("+", "");
							}
							
						}
					}
					//设置有效位数没有设置小数位数，按照有效位数补0
					else if(Integer.parseInt(significantdigit)>0&&Integer.parseInt(decimaldigit)==0){
						if(getSignificantNum(result)<Integer.parseInt(significantdigit)){
							result = addZero(result,Integer.parseInt(significantdigit) - getSignificantNum(result));
							return result.replace("+", "");
						}
					}
				}else{
					if(significantdigit!=null&&!"".equals(significantdigit)&&!"null".equals(significantdigit)){
						if(getSignificantNum(result)<Integer.parseInt(significantdigit)){
							result = addZero(result,Integer.parseInt(significantdigit) - getSignificantNum(result));
							return result.replace("+", "");
						}
					}
				}
				
				
				result = de.toString();
		}
		return result.replace("+", "");
	}
	
	
	
	/**
	 * 获取有效位数
	 * @param data 数字
	 * @return
	 */
	public static int getSignificantNum(String data){
		int number = 0;
		if(data.indexOf("E")>=0){
			data = data.split("E")[0];
		}
		if(data.indexOf(".")<0){
			number = data.length();
		}else{
			String dotBefore = data.split("\\.")[0];
			String dotAfter = data.split("\\.")[1];
			
			if("0".equals(dotBefore)||"-0".equals(dotBefore)){
				char[] arr = dotAfter.toCharArray();
				for(int i = 0; i < arr.length; i++){
					if(!"0".equals(String.valueOf(arr[i]))){
						number = dotAfter.substring(i).length();
						break;
					}
				}
			}else{
				number = dotBefore.length() + dotAfter.length();
			}
		}
		
		
		return number;
	}
	
	/**
	 * 补0函数
	 * @return
	 */
	public static String addZero(String data,int count){
		if(data.indexOf("E")>=0){
			String eBefore = data.split("E")[0];
			if(eBefore != null && !"".equals(eBefore)){
				if(eBefore.indexOf(".")<0){
					eBefore = eBefore + ".";
				}
				for(int i = 0;i < count ;i++){
					eBefore +="0";
				}
			}
			data = eBefore + "E" + data.split("E")[1];
		}else{
			if(data != null && !"".equals(data)){
				if(data.indexOf(".")<0){
					data = data + ".";
				}
				for(int i = 0;i < count ;i++){
					data +="0";
				}
			}
		}
		return data;
	}
	
	/**
	 * 检出限显示值
	 * @param metadata
	 * @param lowdetectionlimit
	 * @param limitshowvalue
	 * @return
	 */
	public static String isLowdetectionlimit(String metadata,Double lowdetectionlimit,String limitshowvalue){		
		if(lowdetectionlimit != 0.0){
			//1.小于检出限,返回最低检出限显示值
			if(Double.parseDouble(metadata)<lowdetectionlimit){
				return limitshowvalue;
			}
		}	
			
		return metadata;
	}
	
	/**
	 * 判断一个字符串是否是数字
	 * @param str
	 * @return
	 */
	public static boolean isNum(String str){	
		if(str!=null)
		{
			return str.matches("^[-+]?(([0-9]+)([.]([0-9]+))?|([.]([0-9]+))?)(E[-+]?(([0-9]+)([.]([0-9]+))?|([.]([0-9]+))?))?$");
		}else{
			return false;
		}		
	}
	
	public static void main(String[] args) {
//		System.out.print(isNum("0.000027 "));
//		System.out.println(conventionRule("0.070686",0,4,2));//正确0.0707
//		System.out.println(conventionRule("5.117",3,1,2));//正确5.1
//		System.out.println(conventionRule("1.131",0,4,2));//正确1.1310
//		System.out.println(conventionRule("12345",3,2,2));//1.23E+4
//		System.out.println(conventionRule("10.150000",2,4,2));//10
//		System.out.println(conventionRule("0.2826",0,4,2));//0.2826
//		System.out.println(conventionRule("2.0501233",2,0,2));//2.1
//		System.out.println(conventionRule("0.0511233",2,0,2));//0.051
//		System.out.println(conventionRule("0.0000000000000511233",3,3, 2));//5.11E-14
//		System.out.println(conventionRule("0.1655",0,3,2));//0.166
//		System.out.println(conventionRule("0.08106",0,3,2));//0.081
//		System.out.println(conventionRule("0.04621",3,2,2));//4.62E-2
//		System.out.println(conventionRule("0.14621",3,2,2));//1.46E-1
//		System.out.println(conventionRule("8.4",3,2,2));//8.40
//		System.out.println(conventionRule("0.084",0,3,2));//0.084
//		System.out.println(conventionRule("0.705",3,3,2));//0.705
//		System.out.println(conventionRule("0.150",3,3,2));//0.150
//		System.out.println(conventionRule("909.12345",3,2,2));//9.09E2
//		System.out.println(conventionRule("9.09",3,4,2));//9.09
//		System.out.println(conventionRule("0.00725",3,2, 2));//7.25E-3
//		System.out.println(conventionRule("0.25",3,0,2));//0.250
//		System.out.println(conventionRule("0.1255",3,2,2));//1.56E-1
		System.out.println(conventionRule("0.0037039","3","2",2,"0.001","3",""));//3.70E-3
//		System.out.println(conventionRule("1100","3","2",2));//3.70E-3
//		System.out.println(conventionRule("900","3","1",2,"10"));
	}
}
