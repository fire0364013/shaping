package com.beauty.common;
/**
 * 短信猫 发送内容
 * @author dell
 *
 */
public class SendContent {
	private static StringBuffer sb ;
	/**
	 * 任务发送内容
	 * @param status
	 * @param stepname
	 * @return
	 */
	public static String getProjectContent(String projectcode,String stepname){
		sb = new StringBuffer();
		sb.append("任务流水号：").append(projectcode).append("将流转至").append(stepname).append(",请及时处理！");
		return sb.toString();
	}
	/**
	 * 样品发送内容
	 * @param projectcode
	 * @param samples
	 * @param stepname
	 * @return
	 */
	public static String getSampleContent(String projectcode,String samples ,String stepname){
		sb = new StringBuffer();
		sb.append("任务流水号：").append(projectcode).append("下的样品编号").append(samples).append("将流转至").append(stepname).append(",请及时处理！");
		return sb.toString();
	}
	/**
	 * 批次项目发送内容
	 * @param itemname
	 * @param batchno
	 * @param stepname
	 * @return
	 */
	public static String getBatchItemContent(String itemname,String batchno,String stepname){
		sb = new StringBuffer();
		sb.append("分析项目：").append(itemname).append("下的批次号").append(batchno).append("将流转至").append(stepname).append(",请及时处理！");
		return sb.toString();
	}
	/**
	 * 样品项目发送内容
	 * @param itemname
	 * @param batchno
	 * @param stepname
	 * @return
	 */
	public static String getSampleItemContent(String projectcode,String samples,String itemname,String stepname){
		sb = new StringBuffer();
		sb.append("任务流水号：").append(projectcode).append("下的样品").append(samples).append("下的项目").append(itemname).append("将流转至").append(stepname).append(",请及时处理！");
		return sb.toString();
	}
	/**
	 * 报告发送内容
	 * @param projectcode
	 * @param monitortypename
	 * @param stepname
	 * @return
	 */
	public static String getReportContent(String projectcode,String reportcode,String stepname){
		sb = new StringBuffer();
		sb.append("任务流水号：").append(projectcode).append("下的报告编号:").append(reportcode).append("将流转至").append(stepname).append(",请及时处理！");
		return sb.toString();
	}
	
}
