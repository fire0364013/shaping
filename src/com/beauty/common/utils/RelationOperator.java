package com.beauty.common.utils;




/**
 * 关系运算符常量值类
 * @author zhuGy
 *
 */
public class RelationOperator {
	public static final String DY = ">";//大于
	public static final String DYDY = "≥";//大于等于
	public static final String XY = "<";//小于
	public static final String XYDY = "≤";//小于等于
	public static final String DH = "=";//等于
	
	public static String getJavaRelationOperator(String relationOperator){
		String javaRelationOperator = "";
		if(relationOperator.equals(RelationOperator.DY)){
			javaRelationOperator=">";
		}else if(relationOperator.equals(RelationOperator.DYDY)){
			javaRelationOperator=">=";
		}else if(relationOperator.equals(RelationOperator.XY)){
			javaRelationOperator="<";
		}else if(relationOperator.equals(RelationOperator.XYDY)){
			javaRelationOperator="<=";
		}else if(relationOperator.equals(RelationOperator.DH)){
			javaRelationOperator="==";
		}
		return javaRelationOperator;
	}
	
	public static void main(String[] args){
//		String str = "±5";
//		String operator = str.substring(0, 1);
//		String bqdVal = str.substring(1, str.length());
		/*int i=9;
		int j=8;
		if(i >= j){
			System.out.println("true");
		}else{
			System.out.println("false");
		}*/
//		System.out.println(operator);
//		long l1 = 4001L;//&=4000L);
//		long l2 = 4000L;
//		long l = (l1+=l2);
//		BigDecimal b1 = new BigDecimal(5.00);
//		BigDecimal b2 = new BigDecimal(75.00);
//		BigDecimal str = b1.divide(b2,4,BigDecimal.ROUND_HALF_UP);
//		System.out.println((5d/75d));//str.doubleValue()*100);//"\u6d53\u5ea6");
		
		double d = 0.0415d;
		System.out.println(String.format("%.2f", d*100));
		
		
	}
}
