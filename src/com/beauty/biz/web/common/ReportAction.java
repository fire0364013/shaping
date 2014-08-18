package com.beauty.biz.web.common;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.FileInputStream;
import java.io.IOException;

import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.convention.annotation.Results;

import com.beauty.biz.entity.Unit;
import com.beauty.common.web.StrutsAction;
import com.runqian.report4.model.ReportDefine;
import com.runqian.report4.model.engine.ExtCellSet;
import com.runqian.report4.usermodel.Context;
import com.runqian.report4.usermodel.Engine;
import com.runqian.report4.usermodel.IReport;
import com.runqian.report4.usermodel.ParamMetaData;
import com.runqian.report4.util.ReportUtils;

/**
 * 公用跳转到报表页面
 * 
 * @author
 * 
 */
@Results( { @Result(name = "report", location = "report-show.jsp"),
		@Result(name = "noreport", location = "noreport1-show.jsp") })
public class ReportAction extends StrutsAction<Unit> {
	private static final long serialVersionUID = 1783206643023284993L;
	private String raq;

	public String getRaq() {
		return raq;
	}

	public void setRaq(String raq) {
		this.raq = raq;
	}

	/**
	 * 对于当前报表查询不到的时候，返回一个空报表
	 * 
	 * @return
	 * @throws IOException
	 */
	public String toReportPage() throws IOException {
		BufferedInputStream bis = null;
		BufferedOutputStream bos = null;

		String raqFilePath = java.net.URLDecoder.decode(raq, "UTF-8");
		String fileName = "lims/reportFiles/" + raqFilePath;
		try {
			String realPath = getRequest().getSession().getServletContext()
					.getRealPath(fileName);
			bis = new BufferedInputStream(new FileInputStream(realPath));
		} catch (Exception e) {
			return "noreport";			
		} finally {
			if (bos != null) {
				bos.close();
			}
			if (bis != null) {
				bis.close();
			}
		}
		return "report";
	}

	/**
	 * 对于当前报表查询不到的时候，返回一个空报表
	 * 
	 * @return
	 * @throws IOException
	 */
	public String toMonitorReportPage() throws IOException {
		BufferedInputStream bis = null;
		BufferedOutputStream bos = null;
		String raqFilePath = java.net.URLDecoder.decode(raq, "UTF-8");
		String fileName = "lims/reportFiles/" + raqFilePath;
		try {
			String realPath = getRequest().getSession().getServletContext()
					.getRealPath(fileName);
			bis = new BufferedInputStream(new FileInputStream(realPath));
		} catch (Exception e) {
			return "noreport";
		} finally {
			if (bos != null) {
				bos.close();
			}
			if (bis != null) {
				bis.close();
			}
		}

		return "monitorreport";
	}

	/**
	 * 对于当前报表查询不到的时候，返回一个空报表
	 * 
	 * @return
	 * @throws IOException
	 *             wjy原始记录单~~
	 */
	public String toReportOriPage() throws IOException {
		BufferedInputStream bis = null;
		BufferedOutputStream bos = null;
		String fileName = "lims/reportFiles/OriginalList/"
				+ getRequest().getParameter("raq");
		try {
			String realPath = getRequest().getSession().getServletContext()
					.getRealPath(fileName);
			bis = new BufferedInputStream(new FileInputStream(realPath));
		} catch (Exception e) {
			return "noreport";
		} finally {
			if (bos != null) {
				bos.close();
			}
			if (bis != null) {
				bis.close();
			}
		}

		return "report";
	}

	/**
	 * 导出某一类型。。。从系统里面直接导出pdf。。。而不用再用页面导出~~如果导出excel脚本这样写 eg: var url = rootPath
	 * + "/common/report!toReportSampleTag.action?raq=SampleTag.raq&tagid="+
	 * samplecode+"&flagName=excel";
	 * 
	 * @param args
	 * @throws Throwable
	 * @throws Throwable
	 */
	public String toReportCommon() throws Throwable {
		BufferedInputStream bis = null;
		BufferedOutputStream bos = null;
		try {
			Context cxt = new Context(); // 构建报表引擎计算环境
			String reportFile = "lims/reportFiles/"
					+ getRequest().getParameter("raq");
			String realPath = getRequest().getSession().getServletContext()
					.getRealPath(reportFile);
			// 此句的作用仅是读流，如果没有读到报表，就进catch里面。否则就执行下去。
			bis = new BufferedInputStream(new FileInputStream(realPath));

			// 设置报表后台调用的lic===begin===
			String licFile = "WEB-INF\\reportConf\\reportServerWindows.lic";
			String licPath = getRequest().getSession().getServletContext()
					.getRealPath(licFile);
			ExtCellSet.setLicenseFileName(licPath);
			// 设置报表后台调用的lic===end===

			ReportDefine rd = (ReportDefine) ReportUtils.read(realPath);

			// 下面是设置参数的开始=====begin======
			ParamMetaData pmd = rd.getParamMetaData(); // 从报表定义中取得参数元对象ParamMetaData
			String paramOrMocrName = "";
			if (pmd != null) {
				for (int i = 0, count = pmd.getParamCount(); i < count; i++) { // 讲究优化的写法
					paramOrMocrName = pmd.getParam(i).getParamName();// 获取参数名
					cxt.setParamValue(paramOrMocrName, getRequest()
							.getParameter(paramOrMocrName)); // 设参数值　
				}
			}
			// 下面是设置参数的开始=====end======

			Engine engine = new Engine(rd, cxt); // 构造报表引擎
			IReport iReport = engine.calc(); // 运算报表
			String fileName = "";
			if (flagName.equals("excel")) {
				fileName = realPath.substring(0, realPath.length() - 4)
						+ ".xls";// 导出后的pdf文件路径
				ReportUtils.exportToExcel(fileName, iReport, false);
			}// 导出excel
			if (flagName.equals("pdf")) {
				fileName = realPath.substring(0, realPath.length() - 4)
						+ ".pdf";// 导出后的pdf文件路径
				ReportUtils.exportToPDF(fileName, iReport, false, true);
			}// 导出pdf
			if (flagName.equals("word")) {
				fileName = realPath.substring(0, realPath.length() - 4)
						+ ".doc";// 导出后的pdf文件路径
				ReportUtils.exportToDOC(fileName, iReport);
			}// 导出word
		} catch (Exception e) {
			// 如果没有报表就跳转到一个空的报表页面。。。此处可以根据需要进行返回字符串。或者别的方式
			// sendMsg("没有报表");
			return "noreport";
		} finally {
			if (bos != null) {
				bos.close();
			}
			if (bis != null) {
				bis.close();
			}
		}
		return null;
	}

}
