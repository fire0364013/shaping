package com.beauty.common.utils;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * 
 * @author zhugy
 * 
 */
public class SearchUtil {
	/**
	 * 查询按整形Integer查询
	 * 
	 * @param sb
	 *            条件
	 * @param params
	 *            参数
	 * @param action
	 *            动作
	 * @param name
	 *            名称
	 * @param value
	 *            Integer值
	 */
	public static void getIntSearch(StringBuilder sb, List<Object> params,
			 String name,String action, Integer value) {
		if (value !=null && value >= 0 ) {
			if (params.size() > 0)
				sb.append(" and ");
			sb.append(" o.").append(name).append(" ").append(action).append(" ?");
			params.add(value);
		}
	}
	
	/**
	 * 查询按整形Integer查询
	 * 
	 * @param sb
	 *            条件
	 * @param params
	 *            参数
	 * @param action
	 *            动作
	 * @param name
	 *            名称
	 * @param value
	 *            Integer值
	 */
	public static void getIntSearchByDot(StringBuilder sb, List<Object> params,
			 String name,String action, Integer value) {
		if (value !=null && value >= 0 ) {
			if (params.size() > 0)
				sb.append(" and ");
			sb.append(name).append(" ").append(action).append(" ?");
			params.add(value);
		}
	}
	
	/**
	 * 查询按整形BigDecimal查询
	 * 
	 * @param sb
	 *            条件
	 * @param params
	 *            参数
	 * @param action
	 *            动作
	 * @param name
	 *            名称
	 * @param value
	 *            BigDecimal值
	 */
	public static void getIntSearch(StringBuilder sb, List<Object> params,
			 String name,String action, BigDecimal value) {
		if (value !=null) {
			if (params.size() > 0)
				sb.append(" and ");
			sb.append(" o.").append(name).append(" ").append(action).append(" ?");
			params.add(value);
		}
	}
	/**
	 * 查询按字符串查询
	 * 
	 * @param sb
	 *            条件
	 * @param params
	 *            参数
	 * @param action
	 *            动作
	 * @param name
	 *            名称
	 * @param value
	 *            值
	 */
	public static void getStringSearch(StringBuilder sb, List<Object> params,
			 String name,String action, String value) {
		
		if (!EasyStr.nil(value)) {
			if (params.size() > 0)
				sb.append(" and ");
			sb.append(" o.").append(name).append(" ").append(action).append(" ?");
			if (action.equals("like") || action.equals("no like"))
				params.add("%" + EasyStr.toHtml(value.trim()) + "%");
			else
				params.add(EasyStr.toHtml(value.trim()));
		}
	}
	
	/**
	 * 按照日期查询，月份或者年份查询
	 * @param sb
	 * @param params
	 * @param name
	 * @param action
	 * @param value
	 */
	public static void getStringByDateSearch(StringBuilder sb, List<Object> params,
			 String name,String action, String value){
		if (!EasyStr.nil(value)) {
			if (params.size() > 0)
				sb.append(" and ");
			sb.append("to_char(").append(" o.").append(name).append(",'yyyy-MM-dd') ").append(action).append(" ?");
			if (action.equals("like") || action.equals("no like"))
				params.add("%" + EasyStr.toHtml(value.trim()) + "%");
			else
				params.add(EasyStr.toHtml(value.trim()));
		}
	}
	
	/**
	 * 两个字段比较
	 * @param sb
	 * @param params
	 * @param name1
	 * @param action
	 * @param name2
	 */
	public static void getStringCompare(StringBuilder sb,List<Object> params,String name1,String action, String name2){
		if (params.size() > 0){
			sb.append(" and ");
		}
		sb.append(" o.").append(name1).append(" ").append(action).append("o.").append(name2);
	}
	public static void getStringSearchByLower(StringBuilder sb, List<Object> params,
			 String name,String action, String value) {
		
		if (!EasyStr.nil(value)) {
			if (params.size() > 0)
				sb.append(" and ");
			sb.append("lower(o.").append(name).append(") ").append(action).append(" ?");
			if (action.equals("like") || action.equals("no like"))
				params.add("%" + EasyStr.toHtml(value.toLowerCase().trim()) + "%");
			else
				params.add(EasyStr.toHtml(value.toLowerCase().trim()));
		}
	}

	/**
	 * 按二个日期查询(日期 格式日期)
	 * 
	 * @param sb
	 *            条件
	 * @param params
	 *            参数
	 * @param name
	 *            名称
	 * @param value
	 *            开始时间
	 * @param value2
	 *            结束时间
	 */
	public static void getDateBetweenSearch(StringBuilder sb,
			List<Object> params, String name, Date value, Date value2) {
		if (value != null && value2 != null) {
			if (params.size() > 0)
				sb.append(" and ");
			sb.append(" o.").append(name).append(" between ?").append(" and ?");
			params.add(value);
			params.add(value2);
		}
	}
	/**
	 * 按二个日期查询(String 日期)
	 * 
	 * @param sb
	 *            条件
	 * @param params
	 *            参数
	 * @param name
	 *            名称
	 * @param value
	 *            开始时间
	 * @param value2
	 *            结束时间
	 */
	public static void getStringDateBetweenSearch(StringBuilder sb,
			List<Object> params, String name, String value, String value2) {
		if (value != null && value2 != null) {
			if (params.size() > 0)
				sb.append(" and ");
			sb.append(" o.").append(name).append(" between ?").append(" and ?");
			params.add(value);
			params.add(value2);
		}
	}
	
	
	
	/**
	 * 查询按字符串查询
	 * 
	 * @param sb
	 *            条件
	 * @param params
	 *            参数
	 * @param action
	 *            动作
	 * @param name
	 *            名称
	 * @param value
	 *            值
	 */
	public static void getStringSearchFor(StringBuilder sb, List<Object> params,
			 String name,String action, String value) {
		
		if (!EasyStr.nil(value)) {
			if (params.size() > 0)
				sb.append(" and (");
			sb.append(" o.").append(name).append(" ").append(action).append(" ?");
			if (action.equals("like") || action.equals("no like"))
				params.add("%" + EasyStr.toHtml(value.trim()) + "%");
			else
				params.add(EasyStr.toHtml(value.trim()));
		}
	}
	/**
	 * 按两个日期查询(String 日期)
	 * 此方法是在循环的时候使用的~~or
	 * @param sb
	 *            条件
	 * @param params
	 *            参数
	 * @param name
	 *            名称
	 * @param value
	 *            开始时间
	 * @param value2
	 *            结束时间
	 */
	public static void getStringDateBetweenSearchByYMD(StringBuilder sb,
			List<Object> params, String name, String value, String value2) {
		if (value != null && value2 != null) {
			if (params.size() > 0)
				sb.append(" or ");
			sb.append(" o.").append(name).append(" > ? and ").append(name).append(" < ? )");
			params.add(EasyStr.parseDateYMD(value));
			params.add(EasyStr.parseDateYMD(value2));
		}
	}
	
    /**
     * 日期查询
     * @param sb
     * @param params
     * @param name
     * @param action
     * @param value:yyyy-MM-dd 
     */
	public static void getDateSearchByYMD(StringBuilder sb, List<Object> params,
			String name, String action, String value) {
		if (value != null && !EasyStr.nil(value)) {
			if (params.size() > 0)
				sb.append(" and ");
			sb.append(" o.").append(name).append(" ").append(action).append(
					" ?");
			params.add(EasyStr.parseDateYMD(value));
		}
	}
	
	
    /**
     * 日期查询
     * 此方法是在循环的时候使用的~~or
     * @param sb
     * @param params
     * @param name
     * @param action
     * @param value:yyyy-MM-dd 
     */
	public static void getDateSearchByYMDFor(StringBuilder sb, List<Object> params,
			String name, String action, String value) {
		if (value != null && !EasyStr.nil(value)) {
			if (params.size() > 0)
				sb.append(" or ");
			sb.append(" o.").append(name).append(" ").append(action).append(
					" ? )");
			params.add(EasyStr.parseDateYMD(value));
		}
	}
	
	   /**
     * 日期查询
     * @param sb
     * @param params
     * @param name
     * @param action
     * @param value:yyyy-MM-dd HH:mm:ss
     */
	public static void getDateSearchByYMDHMS(StringBuilder sb, List<Object> params,
			String name, String action, String value) {
		if (value != null && !EasyStr.nil(value)) {
			if (params.size() > 0)
				sb.append(" and ");
			sb.append(" o.").append(name).append(" ").append(action).append(
					" ?");
			params.add(EasyStr.parseDate(value));
		}
	}
	/**
	 * In 操作
	 * @param sb
	 * @param params
	 * @param name
	 * @param action
	 * @param value
	 */
    public static void getInSearch(StringBuilder sb, List<Object> params,
			 String name,String action, String value){
    	if(value!=null){
	    	String[] arr = value.split(",");
	    	if (!EasyStr.nil(value)) {
				if (params.size() > 0)
					sb.append(" and ");
				sb.append(" o.").append(name).append(" ").append(action).append("(");
				if(arr.length>0){
					for(int i=0;i<arr.length;i++){
						sb.append("?");
						params.add(arr[i]);
						if(i<arr.length-1){
							sb.append(",");
						}					
					}				
				}
				sb.append(")");
	//			 Long  ids[]=new  Long[]{new Long("3"),new Long("4")};
	//			String[] arr = value.split(",");
	//			params.add(arr[0]+","+arr[1]);
				//(Integer.parseInt("3")+","+Integer.parseInt("4")));
	//			params.add(value);
			}
    	}
    }
    
    /**
	 * In 操作
	 * @param sb
	 * @param params
	 * @param name
	 * @param action
	 * @param value
	 */
    public static void getInSearch2(StringBuilder sb, List<Object> params,
			 String name,String action, String value){
    	//String[] arr = value.split(",");
    	if (!EasyStr.nil(value)) {
			if (params.size() > 0)
				sb.append(" and ");
			sb.append(" o.").append(name).append(" ").append(action).append("(");
//			if(arr.length>0){
//				for(int i=0;i<arr.length;i++){
//					params.add(arr[i]);
//					if(i<arr.length-1){
//						sb.append(",");
			sb.append(value);
//					}					
//				}				
//			}
			sb.append(")");
//			 Long  ids[]=new  Long[]{new Long("3"),new Long("4")};
//			String[] arr = value.split(",");
//			params.add(arr[0]+","+arr[1]);
			//(Integer.parseInt("3")+","+Integer.parseInt("4")));
//			params.add(value);
		}
    }
    
    
    public static void getLongSearch(StringBuilder sb, List<Object> params,
			 String name,String action, Long value) {
		if (value !=null && value >= 0 ) {
			if (params.size() > 0)
				sb.append(" and ");
			sb.append(" o.").append(name).append(" ").append(action).append(" ?");
			params.add(value);
		}
	}


	public static void main(String[] arg) {
		StringBuilder sb = new StringBuilder();
		List<Object> params = new ArrayList<Object>();
		sb.append("form abc where ");	
//		SearchUtil.getInSearch(sb, params, "id", "in", "1,2,3");
		SearchUtil.getInSearch2(sb, params, "id", "in", "1,2,3");
//		SearchUtil.getDateSearchByYMD(sb, params, "abc", "=","2012-07-12");		
//		SearchUtil.getIntSearch(sb, params, "a", "=",  1);
//		SearchUtil.getIntSearch(sb, params,  "a", "!=", 1);	
//		SearchUtil.getIntSearch(sb, params, "a", ">",  1);
//		SearchUtil.getIntSearch(sb, params, "a", "<",  1);
//		SearchUtil.getStringSearch(sb, params, "six", "no like",  "b");
//		SearchUtil.getStringSearch(sb, params, "six", "like",  "b");
//		SearchUtil.getStringSearch(sb, params,"six", "=",  "b");
//		SearchUtil.getDateBetweenSearch(sb, params, "aa", new Date(), new Date());
		 System.out.println(sb.toString());
		 for(Object o:params){
			 System.out.println("qq:"+o);
		 }
	}

}
