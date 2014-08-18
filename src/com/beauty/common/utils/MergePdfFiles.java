package com.beauty.common.utils;

import java.io.FileOutputStream;

import com.lowagie2.text.Document;
import com.lowagie2.text.pdf.PdfCopy;
import com.lowagie2.text.pdf.PdfImportedPage;
import com.lowagie2.text.pdf.PdfReader;

/**
 * @Description 本类主要处理MergePdfFiles.java
 * @author chenxz
 * @date 2012-11-15
 */
public class MergePdfFiles {

	/**
	 * 合并pdf
	 * @param files 需要合并的文件
	 * @param newfile 合并后生成的新文件
	 * @return 成功合并返回true,否则false
	 */
	public boolean mergePdfFiles(String[] files, String newfile) {   
	    boolean retValue = false;   
	    Document document = null;   
	    try {   
	        document = new Document(new PdfReader(files[0]).getPageSize(1));   
	        PdfCopy copy = new PdfCopy(document, new FileOutputStream(newfile));   
	        document.open();   
	        for (int i = 0; i < files.length; i++) {   
	            PdfReader reader = new PdfReader(files[i]);   
	            int n = reader.getNumberOfPages();   
	            for (int j = 1; j <= n; j++) {   
	                document.newPage();   
	                PdfImportedPage page = copy.getImportedPage(reader, j);   
	                copy.addPage(page);   
	            }   
	        }   
	        retValue = true;
	    } catch (Exception e) {   
	        e.printStackTrace();   
	    } finally {   
	        document.close();   
	    }   
	    return retValue;   
	}   
}
