package com.beauty.common.utils;

import java.io.File;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;

import org.w3c.dom.Document;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

public class ResolveXML {
	//解析xml
	public static String getSqlText(String nodeName,String fileName,String xmlId){
		String text = "";
		try{
			DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
			DocumentBuilder db = dbf.newDocumentBuilder();
			 File file= new File(fileName);
			Document document = db.parse(file);
		//	Document document = db.parse(fileName);
			NodeList nodes = document.getElementsByTagName(nodeName);
			
			for(int i=0;i<nodes.getLength();i++){
				NodeList childList = nodes.item(i).getChildNodes();
				for(int j=0;j<childList.getLength();j++){
					Node child = childList.item(j);
					if("id".toUpperCase().equals(child.getNodeName().toUpperCase())){
						String childIDStr = child.getTextContent();
						if(childIDStr.equals(xmlId)){
							for(int k=0;k<childList.getLength();k++){
								if("Text".toUpperCase().equals(childList.item(k).getNodeName().toUpperCase())){
									Node childText = 	nodes.item(i).getChildNodes().item(k);
									text =  childText.getTextContent();
									return text;
								}
							}
							
						}
					}else{
						continue;
					}
				}
			}
		}catch(Exception e){
		}
		return text;
	}
}
