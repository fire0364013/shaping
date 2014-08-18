package com.beauty.common.utils;

import java.io.File;
import java.io.UnsupportedEncodingException;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.apache.commons.lang.StringUtils;

/**
 * 
 * @author zhuGy
 * 
 */
/**
 * 文件类
 * 
 * public static String getFileName(String path)得到第一个文件名(根据路径) 返回字符串
 * 
 * public static void deleFile(String pathname)删除文件(根据路径和名称)
 * 
 * public static void deleteFile(String path)删除某目录下的所有文件（根据路径）
 * 
 * public static boolean isDirectory(String path)判断是否为目录 是目录则true否则为false
 * 
 * 字符类
 * 
 * public static String toHtml(String src)特殊字符替换
 * 
 * public static boolean nil(String s)判断是否为空串或null *
 * 
 * @return 空串或null为true否则为false
 * 
 * public static boolean nil(String s[])判断是否为空数组或null
 * @return 空数组或null为true否则为false
 * 
 * public static String eq(String s)判断是否为空串能力 *
 * @return 空串再返回null否则返回原串
 * 
 * 编码类
 * 
 * public static String toGBK(String src)把字符串ISO-8859-1转成GBK编码方式
 * 
 * public static String toGB2312(String src)把字符串ISO-8859-1转成GB2312编码方式
 * 
 * public static String toUTF8(String src)把字符串转成UTF8编码方式
 * 
 * public static String Encoding(String src,String first,String
 * second)把字符串src(原编码方式first)转成新的编码方式（second）
 * 
 * 类型转化 public static int LongToInt(Long s) 把长整形转成整形
 * 
 * public static String[] splittoArray(String s, String spliter)
 * 把原字符串s按spliter分隔成数组*
 * @return 数组
 * 
 * public static String split(String[] s, String spliter) 把字符数组s按spliter转化成字符串
 * 
 * public static boolean parseBoolean(String flag)把字符串的真与假返回Boolean*
 * @retuun boolean
 * 
 * public static int parseInt(String flag)把字符串转成整形
 * 
 * public static long parseLong(String flag)把字符转成长整形
 * 
 * public static String parseLongToString(Long flag)把长整形转成字符型
 * 
 * 时间类
 * 
 * public static long getDateMinutes(String d1, String d2)获得两时间段 之间的分钟数 *
 * @return 长整形
 * 
 * public static String getStandardTime() 将当前时间格式化为yyyy-MM-dd HH:mm:ss
 * 
 * public static Date parseDate(String string)把字符串yyyy-MM-dd HH:mm:ss 换成日期形 *
 * @return 日期形
 * 
 * public static Date parseDateYMD(String date)把字符串yyyy-MM-dd换成日期型 *
 * @return 日期
 * 
 * public static String getDate(Date dates)把日期转成yyyy-MM-dd HH:mm:ss的字符串
 * @return String
 * 
 * public static String getDateYMD(Date d)把日期型换成yyyy-MM-dd字符串*
 * @return String
 * 
 * public static String getDateHMS(Date data) 把日期型换成HH:mm:ss字符串只要时分秒
 * 
 * public static String getNow()得到今天0点的时间
 * @return String
 * 
 * public static Long getDateLong(String date)从时间格式获取秒数 *
 * @return 1970-1-1到date的秒数
 * 
 * sql
 * 
 * public static String getLimitSql(String sql, int pagefirst, int page_size)
 * 分页Oracle分页
 * 
 * public static List getProperty(String tableName, Map<String, String> other,
 * List datePro) 连结sql
 * 
 */
public class EasyStr {
	/**
	 * 
	 * @param content
	 * @return
	 */
	private static String getValidRuleContent(String content) {
		content = StringUtils.trim(content);
		if (content != null) {
			content = content.replaceAll("[|]", "");
			while (content.startsWith(";")) {
				content = content.substring(1);
			}
			while (content.endsWith(";")) {
				content = content.substring(0, content.length() - 1);
			}
		}
		return content;

	}

	// //////////////////////文件类///////////////////////////////
	/**
	 * 得到第一个文件名(根据路径)
	 * 
	 * @param path
	 * @return
	 */
	public static String getFileName(String path) {
		if (EasyStr.nil(path))
			return null;
		File f = new File(path);
		String[] list = f.list();
		if (null != list && list.length > 0) {
			return list[0];

		}
		return null;
	}

	/**
	 * 删除文件(根据路径和名称)
	 * 
	 * @param pathname
	 */
	public static void deleFile(String pathname) {
		if (EasyStr.nil(pathname))
			return;
		File f = new File(pathname);
		if (f.exists()) {
			if (f.isFile())
				f.delete();
		}
	}

	/**
	 * 删除某目录下的所有文件（根据路径）
	 * 
	 * @param path
	 */
	public static void deleteFile(String path) {
		if (EasyStr.nil(path))
			return;
		File f = new File(path);
		String[] list = f.list();
		if (null != list && list.length > 0) {
			for (int i = 0; i < list.length; i++) {
				File file = new File(path + "/" + list[i]);
				file.delete();
			}

		}
	}

	/**
	 * 判断是否为目录
	 * 
	 * @param path
	 * @return
	 */
	public static boolean isDirectory(String path) {
		if (EasyStr.nil(path))
			return false;
		File f = new File(path);
		String[] list = f.list();
		if (null != list && list.length > 0) {
			return true;
		}
		return false;
	}

	// ////////////////////字符类////////////////////////////////
	/**
	 * 特殊字符替换
	 * 
	 * @param src
	 * @return
	 */
	public static String toHtml(String src) {

		if (src == null)
			return null;

		src = src.replaceAll("&", "&amp;");
		src = src.replaceAll("<", "&lt;");
		src = src.replaceAll(">", "&gt;");
		src = src.replaceAll("\"", "&quot;");
		src = src.replaceAll("'", "&#146;");

		src = src.replaceAll("\r\n", "<br />");

		return src.trim();

	}

	/**
	 * 判断是否为空串或null
	 * 
	 * @param s
	 * @return 空串或null为true否则为false
	 */
	public static boolean nil(String s) {
		if (s == null || "".equals(s.trim()) || s.length() <= 0) {
			return true;
		}
		return false;
	}

	/**
	 * 判断是否为空数组或null
	 * 
	 * @param s
	 * @return 空数组或null为true否则为false
	 */
	public static boolean nil(String s[]) {
		if (s == null || s.length == 0) {
			return true;
		}
		return false;
	}

	/**
	 * 判断是否为空串
	 * 
	 * @param s
	 * @return 空串再返回null否则返回原串
	 */
	public static String eq(String s) {
		if ("".equals(s) || s == "" || null == s)
			return null;
		else
			return s.trim();
	}

	// ///////////////编码类//////////////////////
	/**
	 * 把字符串src(原编码方式first)转成新的编码方式（second）
	 */
	public static String Encoding(String src, String first, String second) {
		if (nil(src) || nil(first) || nil(second))
			return "";
		String s = null;
		try {
			s = new String(src.getBytes(first), second);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return s;
	}

	/**
	 * 把字符串转成GBK编码方式
	 * 
	 * @param src
	 * @return
	 */
	public static String toGBK(String src) {
		if (nil(src))
			return "";
		String s = null;
		try {
			s = new String(src.getBytes("ISO-8859-1"), "GBK");
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		return s;
	}

	/**
	 * 把字符串转成GB2312编码方式
	 * 
	 * @param src
	 * @return
	 */
	public static String toGB2312(String src) {
		if (nil(src))
			return "";
		String s = null;
		try {
			s = new String(src.getBytes("ISO-8859-1"), "gb2312");
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		return s;
	}
    /**
     * 去掉空格
     * @param src
     * @return
     */
	public static String trim(String src) {
		if (nil(src)) {
			return src;

		} else {
			return src.trim();
		}
	}

	/**
	 * 把字符串转成UTF8编码方式
	 * 
	 * @param src
	 * @return
	 */
	public static String toUTF8(String src) {
		if (nil(src))
			return "";
		String s = null;
		try {
			s = new String(src.getBytes("ISO-8859-1"), "UTF-8");
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		return s;
	}

	// ///////////////类型转化///////////////////////
	/**
	 * 把原字符串按spliter分隔成数组
	 */
	public static String[] splittoArray(String s, String spliter) {
		if (EasyStr.nil(s))
			return null;
		return s.split(spliter);
	}
	/**
	 * Set集合转成list集合
	 * @param set
	 * @return
	 */
    public static <T>List<T> SetToList(Set<T> set){
    	Iterator<T> i=set.iterator();
    	List<T> list=new ArrayList<T>();
    	while(i.hasNext()){
    		list.add(i.next());
    	}
    	return list;
    }
	/**
	 * 把字符数组转化成字符串
	 * 
	 * @param s
	 * @param spliter
	 * @return
	 */
	public static String split(String[] s, String spliter) {
		if (EasyStr.nil(s))
			return "";
		if (s.length == 1)
			return s[0];
		StringBuffer sb = new StringBuffer();
		for (int i = 0; i < s.length; i++) {
			sb.append(s[i]).append(spliter);
		}
		sb.deleteCharAt(sb.lastIndexOf(spliter));
		return sb.toString();
	}

	/**
	 * 把字符串的真与假返回Boolean
	 * 
	 * @param flag
	 * @return
	 */
	public static boolean parseBoolean(String flag) {
		if (nil(flag))
			return false;
		else if (flag.equals("true") || flag.equals("1") || flag.equals("真")
				|| flag.equals("yes"))
			return true;
		else if (flag.equals("false") || flag.equals("0") || flag.equals("假")
				|| flag.equals("no"))
			return false;
		return false;
	}

	/**
	 * 把长整形转成整形
	 * 
	 * @param s
	 * @return
	 */
	public static int LongToInt(Long s) {
		if (null == s)
			return 0;
		else
			return s.intValue();
	}

	/**
	 * 把字符串转成整形
	 * 
	 * @param flag
	 * @return
	 */
	public static int parseInt(String flag) {
		if (nil(flag))
			return 0;
		else if (flag.equals("true"))
			return 1;
		else if (flag.equals("false"))
			return 0;
		return Integer.parseInt(flag);
	}

	/**
	 * 把字符转成长整形
	 * 
	 * @param flag
	 * @return
	 */
	public static long parseLong(String flag) {
		if (nil(flag))
			return 0;
		return Long.parseLong(flag);
	}

	/**
	 * 把长整形转成字符型
	 * 
	 * @param flag
	 * @return
	 */
	public static String parseLongToString(Long flag) {
		if (null != flag)
			return flag.toString();
		return "";
	}

	/**
	 * 把字符转成浮点型
	 * 
	 * @param flag
	 * @return
	 */
	public static Double parseDouble(String flag) {
		if (nil(flag))
			return 0.0;
		return Double.parseDouble(flag);
	}

	// ///////////////////时间类///////////////////////////

	/**
	 * 获得两时间段 之间的分钟数
	 * 
	 * @param d1
	 * @param d2
	 * @return
	 * @throws java.text.ParseException
	 */
	public static long getDateMinutes(String d1, String d2) {
		try {
			DateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			Date date1 = df.parse(d1);
			Date date2 = df.parse(d2);
			if (date2.before(date1)) {
				Date tempdate = date1;
				date1 = date2;
				date2 = tempdate;
			}
			long rvalue = 0L;

			rvalue = date2.getTime() / 60 / 1000 - date1.getTime() / 60 / 1000;
			return rvalue;
		} catch (Exception e) {
			return 0;
		}

	}

	/**
	 * 把字符串yyyy-MM-dd HH:mm:ss 换成日期形
	 * 
	 * @param string
	 * @return Date
	 */
	public static Date parseDate(String string) {
		try {
			DateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			return (Date) formatter.parse(string);
		} catch (Exception ex) {
			ex.printStackTrace();
			return null;
		}
	}

	/**
	 * 把字符串yyyy-MM-dd换成日期型
	 * 
	 * @param date
	 * @return
	 */
	public static Date parseDateYMD(String date) {
		if (date == null || date.length() == 0) {
			return null;
		}
		try {
			DateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
			return (java.util.Date) sdf.parse(date);
		} catch (Exception ex) {
			ex.printStackTrace();
			return null;
		}
	}
	public static Date parseDateHM(String date) {
		if (date == null || date.length() == 0) {
			return null;
		}
		try {
			DateFormat sdf = new SimpleDateFormat("HH:mm");
			return (java.util.Date) sdf.parse(date);
		} catch (Exception ex) {
			ex.printStackTrace();
			return null;
		}
	}
	/**
	 * 把字符串yyyy-MM-dd换成日期型
	 * 
	 * @param date
	 * @return
	 */
	public static Calendar parseCalendarHM(String date) {
		if (date == null || date.length() == 0) {
			return null;
		}
		try {
			DateFormat sdf = new SimpleDateFormat("HH:mm");
			Date dateCale = sdf.parse(date);
			Calendar calendar=Calendar.getInstance();
			calendar.setTime(dateCale);
			return calendar;
		} catch (Exception ex) {
			ex.printStackTrace();
			return null;
		}
	}
	/**
	 * 把字符串yyyy-MM-dd换成日期型
	 * 
	 * @param date
	 * @return
	 */
	public static Date parseDateYM(String date) {
		if (date == null || date.length() == 0) {
			return null;
		}
		try {
			DateFormat sdf = new SimpleDateFormat("yyyy-MM");
			return (java.util.Date) sdf.parse(date);
		} catch (Exception ex) {
			ex.printStackTrace();
			return null;
		}
	}
	
	/**
	 * 把字符串yyyy-MM-dd HH:mm换成日期型
	 * 
	 * @param date
	 * @return
	 */
	public static Date parseDateYMDHM(String date) {
		if (date == null || date.length() == 0) {
			return null;
		}
		try {
			DateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm");
			return (java.util.Date) sdf.parse(date);
		} catch (Exception ex) {
			ex.printStackTrace();
			return null;
		}
	}
	/**
	 * @author fengbo
	 * 
	 * @return 将当前时间格式化为yyyy-MM-dd HH:mm:ss
	 */
	public static String getStandardTime() {

		java.text.SimpleDateFormat format = new java.text.SimpleDateFormat(
				"yyyy-MM-dd HH:mm:ss");
		Date dt = new Date();

		String date = format.format(dt);
		return date;
	}

	/**
	 * 把日期转成yyyy-MM-dd HH:mm:ss的字符串
	 * 
	 * @param dates
	 * @return
	 */
	public static String getDate(Date dates) {
		if (dates == null)
			return null;
		java.text.DateFormat df = new java.text.SimpleDateFormat(
				"yyyy-MM-dd HH:mm:ss");
		String s = df.format(dates);
		return s;

	}
	
	/**
	 * 把日期转成yyyy-MM-dd HH:mm:ss的字符串
	 * 
	 * @param dates
	 * @return
	 */
	public static String getDateYMDHMSM(Date dates) {
		if (dates == null)
			return null;
		java.text.DateFormat df = new java.text.SimpleDateFormat(
				"yyyyMMddHHmmssms");
		String s = df.format(dates);
		return s;

	}
	/**
	 * 把日期转成yyyy的字符串
	 * 
	 * @param dates
	 * @return
	 */
	public static String getDateY(Date dates) {
		if (dates == null)
			return null;
		java.text.DateFormat df = new java.text.SimpleDateFormat(
				"yyyy");
		String s = df.format(dates);
		return s;

	}
	
	/**
	 * 把日期转成yyyy-MM-dd HH:mm的字符串
	 * 
	 * @param dates
	 * @return
	 */
	public static String getDateYMDHM(Date dates) {
		if (dates == null)
			return null;
		java.text.DateFormat df = new java.text.SimpleDateFormat("yyyy-MM-dd HH:mm");
		String s = df.format(dates);
		return s;

	}

	/**
	 * 把日期型换成yyyy-MM-dd字符串
	 * 
	 * @param d
	 * @return
	 */
	public static String getDateYMD(Date d) {
		try {
			SimpleDateFormat dt = new SimpleDateFormat("yyyy-MM-dd");
			String s = dt.format(d);
			return s;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	
	/**
	 * 把日期型换成yyyy-MM字符串
	 * 
	 * @param d
	 * @return
	 */
	public static String getDateYM(Date d) {
		try {
			SimpleDateFormat dt = new SimpleDateFormat("yyyy-MM");
			String s = dt.format(d);
			return s;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	/**
	 * 把日期型换成HH:mm:ss字符串
	 * 
	 * @param data
	 * @return
	 */
	public static String getDateHMS(Date data) {
		if (null == data) {
			return null;
		}
		java.text.SimpleDateFormat formathhmmss = new java.text.SimpleDateFormat(
				"HH:mm:ss");

		return formathhmmss.format(data);
	}

	/**
	 * 得到今天0点的时间
	 * 
	 * @return
	 */
	public static String getNow() {
		Date now = new Date();
		String nows = getDateYMD(now);
		nows = nows + " 00:00:00";
		return nows;

	}

	/**
	 * 从时间格式获取秒数
	 * 
	 * @param date
	 * @return 1970-1-1到date的秒数
	 */
	public static Long getDateLong(String date) {
		try {
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			// sdf.setTimeZone(TimeZone.getTimeZone("GMT+04"));
			Date d = (java.util.Date) sdf.parse(date);
			return d.getTime()/1000;
		} catch (ParseException e) {
			e.printStackTrace();
			return 0l;
		}

	}
	/**
	 * 从时间格式获取秒数
	 * 
	 * @param date
	 * @return 1970-1-1到date的秒数
	 */
	public static Long getDateLong(Date date) {
		try {
//			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
//			Date d = new Date(sdf.format(date));
			return date.getTime()/1000 ;
		} catch (Exception e) {
			e.printStackTrace();
			return 0l;
		}

	}

	// /////////////////sql///////////////////////

	/**
	 * 分页Oracle分页
	 * 
	 * @param sql
	 * @param pagefirst
	 * @param page_size
	 * @return
	 */
	public static String getLimitSql(String sql, int pagefirst, int page_size) {
		// sql = sql + " limit " + pagefirst + "," + page_size;
		sql = "select * from (select a1.*,rownum rn from (" + sql
				+ " ) a1 where rownum<=" + (page_size + pagefirst)
				+ ") a2 where rn>=" + (pagefirst + 1);// 支持oracle
		// System.out.println(sql);
		return sql;
	}

	public static String getLimitMySql(String sql, int pagefirst, int page_size) {
		sql = sql + " limit " + pagefirst + " , " + page_size;
		return sql;
	}

	/**
	 * 连结sql
	 * 
	 * @param tableName
	 * @param other
	 * @param datePro
	 * @return
	 */
	public static List getProperty(String tableName, Map<String, String> other,
			List datePro) {
		StringBuffer str = new StringBuffer("from " + tableName
				+ " as names where 1=1");
		List lis = new ArrayList();

		if (other != null) {
			Boolean bk = new Boolean("true");
			for (Map.Entry<String, String> m : other.entrySet()) {

				if (m.getValue() != null) {
					if (m.getValue().equals("true")
							|| m.getValue().equals("false")) {

						str.append(" and names." + m.getKey() + "=?");

						lis.add(new Boolean(m.getValue()));

					} else {

						str.append(" and names." + m.getKey() + "  like ?");
						String s = "%" + m.getValue() + "%";

						lis.add(s);
					}
				}
			}
		}

		if (datePro != null) {

			if (datePro.get(1) != null && datePro.get(2) != null) {
				str.append(" and names." + datePro.get(0)
						+ "  BETWEEN  ? and ?");
				lis.add(parseDate(datePro.get(1).toString()));
				// System.out.println("------------"+datePro.get(2).toString()+"
				// 23:59:59");
				// System.out.println("---------------"+parseDates(datePro.get(2).toString()+"
				// 23:59:59"));
				lis.add(parseDate(datePro.get(2).toString() + " 23:59:59"));
			}

		}
		str.append(" order by names.id desc");// 按ID倒序排列
		List proList = new ArrayList();
		proList.add(str.toString());
		// System.out.println(str.toString());
		if (lis != null || !lis.isEmpty()) {
			proList.add(lis.toArray());

		} else {

			proList.add(null);
		}
		return proList;
	}
	
	public static String getStatusName(String status)
	{
		String statusname ="";
		if(status!=null&&!"".equals(status))
		{
			if(status.equals("Register"))
			{
				statusname = "任务登记";
			}else if(status.equals("TaskApprove"))
			{
				statusname = "任务处理";
			}else if(status.equals("deal"))
			{
				statusname = "任务成交";
			}else if(status.equals("TaskApprove"))
			{
				statusname = "任务未成交";
			}
		
		}
		return statusname;
	}

}