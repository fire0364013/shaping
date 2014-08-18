package com.beauty.common.utils;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

import net.sf.json.JsonConfig;
import net.sf.json.processors.JsonValueProcessor;
import net.sf.json.util.CycleDetectionStrategy;

public class DateJsonValueProcessor implements JsonValueProcessor {
	/**
	 * 默认的日期格式
	 */
    public static final String DEFAULT_DATE_PATTERN = "yyyy-MM-dd HH:mm:ss";   
    private DateFormat dateFormat;   
  
    /**  
     * 构造方法.  
     * @param datePattern 日期格式  
     */  
    public DateJsonValueProcessor(String datePattern){   
        try {   
            dateFormat = new SimpleDateFormat(datePattern);   
        } catch (Exception ex) {   
            dateFormat = new SimpleDateFormat(DEFAULT_DATE_PATTERN);   
        }   
    }   
  
    public Object processArrayValue(Object value, JsonConfig jsonConfig) {   
        return process(value);   
    }   
  
    public Object processObjectValue(String key, Object value, JsonConfig jsonConfig) {   
        return process(value);   
    }   
  
    private Object process(Object value) {
    	//先判断value是否为null或“”否则会出现空指针异常
    	if(value==null || "".equals(value)) return "";
        return dateFormat.format((Date) value);   
    } 
    /**  
     * 配置json-lib需要的excludes和datePattern.  
     *   
     * @param excludes 不需要转换的属性数组，如果没有可以设置为null  
     * @param datePattern 日期转换模式  
     * @return JsonConfig 根据excludes和dataPattern生成的jsonConfig 
     */ 
    public static JsonConfig configJson(String[] excludes, String datePattern) {   
    	net.sf.json.JsonConfig jsonConfig = new net.sf.json.JsonConfig();   
        jsonConfig.setExcludes(excludes);   
        jsonConfig.setIgnoreDefaultExcludes(false);   
        jsonConfig.setCycleDetectionStrategy(CycleDetectionStrategy.LENIENT);   
        jsonConfig.registerJsonValueProcessor(Date.class, new DateJsonValueProcessor(datePattern));   
        jsonConfig.registerJsonValueProcessor(java.sql.Timestamp.class, new DateJsonValueProcessor(datePattern)); 
      
        return jsonConfig;   
    } 
}  