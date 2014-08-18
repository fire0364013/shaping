package com.beauty.common.utils;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerConfigurationException;
import javax.xml.transform.TransformerException;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;

import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.NodeList;
import org.xml.sax.SAXException;

import com.beauty.biz.entity.workflow.WorkflowEvent;
import com.beauty.biz.entity.workflow.WorkflowTask;

public class XmlUtils {
	
	public static String createXml(List<WorkflowTask> workflowTaskList,List<WorkflowEvent> workflowEventList){
		Document doc = null;
		try {
			DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
			DocumentBuilder builder = factory.newDocumentBuilder();
			doc = builder.newDocument();
		} catch (ParserConfigurationException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		
		Element modes = doc.createElement("modes");
		Element mode = null,line=null;
		
		WorkflowTask workflowTask = null;
        for(int i=0;i<workflowTaskList.size();i++){
        	workflowTask = workflowTaskList.get(i);
        	mode = doc.createElement("mode");
            mode.setAttribute("class", "module");
            mode.setAttribute("contentEditable","inherit");
            mode.setAttribute("attr_prop_attri1","2");
            mode.setAttribute("attr_prop_attri2","3");
            mode.setAttribute("attr_prop_attri3","4");
            mode.setAttribute("id",String.valueOf(workflowTask.getTaskId()));
            mode.setAttribute("code", workflowTask.getTaskCode());
            mode.setAttribute("title",workflowTask.getTaskName());
            mode.setAttribute("order",String.valueOf(workflowTask.getTaskOrder()));
            mode.setAttribute("width",String.valueOf(workflowTask.getTaskWidth()));
            mode.setAttribute("height",String.valueOf(workflowTask.getTaskHeight()));
            mode.setAttribute("top",String.valueOf(workflowTask.getTaskTop()));
            mode.setAttribute("left",String.valueOf(workflowTask.getTaskLeft()));
            mode.setAttribute("backImgSrc",workflowTask.getTaskImage());
            modes.appendChild(mode);
        }
        WorkflowEvent workflowEvent = null;
        for(int i=0;i<workflowEventList.size();i++){
        	workflowEvent = workflowEventList.get(i);
        	line = doc.createElement("line");
        	line.setAttribute("strokeweight", "1.35");
        	line.setAttribute("marker-end","url(#arrow)");
        	line.setAttribute("contentEditable","inherit");
        	line.setAttribute("attr_prop_attri1","2");
        	line.setAttribute("attr_prop_attri2","3");
        	line.setAttribute("attr_prop_attri3","4");
        	line.setAttribute("attr_prop_attri4","5");
        	line.setAttribute("style","WIDTH: 100px; CURSOR: pointer; POSITION: absolute; HEIGHT: 100px; fill: none; stroke: black; stroke-width: 1.7999999999999998;fill: none; stroke: black; stroke-width: 1.7999999999999998");
        	line.setAttribute("id","line"+workflowEvent.getEventId());
        	line.setAttribute("xBaseMode","module"+workflowEvent.getSourceTaskId());
        	line.setAttribute("wBaseMode","module"+workflowEvent.getTargetTaskId());
        	line.setAttribute("code",workflowEvent.getEventName());
        	line.setAttribute("d",workflowEvent.getEventPath());
        	line.setAttribute("xIndex",String.valueOf(workflowEvent.getEventOutput()));
        	line.setAttribute("wIndex",String.valueOf(workflowEvent.getEventInput()));
        	line.setAttribute("brokenType",String.valueOf(workflowEvent.getEventType()));
        	String strokecolor = "black";
        	if("back".equals(workflowEvent.getEventName())){
        		strokecolor = "red";
        	}
        	line.setAttribute("strokecolor",strokecolor);
            modes.appendChild(line);
        }
        doc.appendChild(modes);
        
        TransformerFactory tf = TransformerFactory.newInstance();
        String xmlStr = null;
		try {
			Transformer t = tf.newTransformer();
			t.setOutputProperty("encoding","gbk");
		    ByteArrayOutputStream bos = new ByteArrayOutputStream();
			t.transform(new DOMSource(doc), new StreamResult(bos));
		    xmlStr = bos.toString();
		} catch (TransformerConfigurationException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (TransformerException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
        return xmlStr;
    }
    
    public static Map<String,List> parserXml(String xmlStr,int taskSequence,int eventSequence) {
    	Map<String,List> xmlObject = new HashMap<String,List>(); 
    	List<WorkflowTask> workflowTaskList = new ArrayList<WorkflowTask>();
    	List<WorkflowEvent> workflowEventList = new ArrayList<WorkflowEvent>();
    	
    	try {
    		InputStream inputStream = new ByteArrayInputStream(xmlStr.getBytes("utf-8"));
    		
    		DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
    		dbf.setNamespaceAware(false);
    		DocumentBuilder db = dbf.newDocumentBuilder();
    		Document document = db.parse(inputStream);
    		/*
    		XPathFactory xFactory = XPathFactory.newInstance();  
            XPath xpath = xFactory.newXPath();  
            XPathExpression expr = xpath  
                    .compile("//name/text()");  
            Object result = expr.evaluate(doc, XPathConstants.NODESET);  
            NodeList nodes = (NodeList) result;  
            System.out.println(nodes.getLength());  
            for (int i = 0; i < nodes.getLength(); i++) {  
                System.out.println(nodes.item(i).getNodeValue());  
            }*/
    		
    		NodeList modeList = document.getElementsByTagName("mode");
    		WorkflowTask workflowTask = null;
    		for (int i = 0; i < modeList.getLength(); i++) {
    			workflowTask = new WorkflowTask();
    			Element mode = (Element) modeList.item(i);
    			String taskIdStr = mode.getAttribute("id");
    			if(taskIdStr != null && !"".equals(taskIdStr)){
    				int taskId = Integer.valueOf(taskIdStr);
    				if(taskId>10000)
    					workflowTask.setTaskId(taskId-10000+taskSequence);
    				else
    					workflowTask.setTaskId(taskId);
    			}
    			workflowTask.setTaskName(mode.getAttribute("title"));
    			workflowTask.setTaskCode(mode.getAttribute("code"));
    			//workflowTask.setWorkflowCode(mode.getAttribute("workflowCode"));
    			workflowTask.setTaskImage(mode.getAttribute("backImgSrc"));
    			String taskOrder = mode.getAttribute("order");
    			if(taskOrder!=null && !"".equals(taskOrder))
    				workflowTask.setTaskOrder(Integer.valueOf(taskOrder));
    			String taskWidth = mode.getAttribute("width");
    			if(taskWidth!=null && !"".equals(taskWidth))
    				workflowTask.setTaskWidth(Integer.valueOf(taskWidth));
    			String taskHeight = mode.getAttribute("height");
    			if(taskHeight!=null && !"".equals(taskHeight))
    				workflowTask.setTaskHeight(Integer.valueOf(taskHeight));
    			String taskTop = mode.getAttribute("top");
    			if(taskTop!=null && !"".equals(taskTop))
    				workflowTask.setTaskTop(Integer.valueOf(taskTop));
    			String taskLeft = mode.getAttribute("left");
    			if(taskLeft!=null && !"".equals(taskLeft))
    				workflowTask.setTaskLeft(Integer.valueOf(taskLeft));
    			workflowTask.setTaskEnable(1);
    			
    			workflowTaskList.add(workflowTask);
    		}
    		
    		NodeList lineList = document.getElementsByTagName("line");
    		WorkflowEvent workflowEvent = null;
    		for (int i = 0; i < lineList.getLength(); i++) {
    			workflowEvent = new WorkflowEvent();
    			Element line = (Element) lineList.item(i);
    			
    			String lineId = line.getAttribute("id");
    			if(lineId!=null && !"".equals(lineId)){
    				String eventIdStr = lineId.substring(4);
    				if(eventIdStr != null && !"".equals(eventIdStr)){
        				int eventId = Integer.valueOf(eventIdStr);
        				if(eventId>10000)
        					workflowEvent.setEventId(eventId-10000+eventSequence);
        				else
        					workflowEvent.setEventId(eventId);
        			}
    			}
    			String xBaseModel = line.getAttribute("xBaseMode");
    			if(xBaseModel!=null && !"".equals(xBaseModel)){
    				String sourceTaskIdStr = xBaseModel.substring(6);
    				if(sourceTaskIdStr != null && !"".equals(sourceTaskIdStr)){
        				int sourceTaskId = Integer.valueOf(sourceTaskIdStr);
        				if(sourceTaskId>10000)
        					workflowEvent.setSourceTaskId(sourceTaskId-10000+taskSequence);
        				else
        					workflowEvent.setSourceTaskId(sourceTaskId);
        			}
    			}
    			String wBaseModel = line.getAttribute("wBaseMode");
    			if(wBaseModel!=null && !"".equals(wBaseModel)){
    				String targetTaskIdStr = wBaseModel.substring(6);
    				if(targetTaskIdStr != null && !"".equals(targetTaskIdStr)){
        				int targetTaskId = Integer.valueOf(targetTaskIdStr);
        				if(targetTaskId>10000)
        					workflowEvent.setTargetTaskId(targetTaskId-10000+taskSequence);
        				else
        					workflowEvent.setTargetTaskId(targetTaskId);
        			}
    			}
    			workflowEvent.setEventName(line.getAttribute("code"));
    			//workflowEvent.setWorkflowCode(line.getAttribute("workflowCode"));
    			workflowEvent.setEventPath(line.getAttribute("d"));
    			String brokenType = line.getAttribute("brokenType");
    			if(brokenType!=null && !"".equals(brokenType)){
    				workflowEvent.setEventType(Integer.valueOf(brokenType));
    			}
    			String eventOutput = line.getAttribute("xIndex");
    			if(eventOutput!=null && !"".equals(eventOutput)){
    				workflowEvent.setEventOutput(Integer.valueOf(eventOutput));
    			}
    			String eventInput = line.getAttribute("wIndex");
    			if(eventInput!=null && !"".equals(eventInput)){
    				workflowEvent.setEventInput(Integer.valueOf(eventInput));
    			}
    			workflowEvent.setEventEnable(1);
    			workflowEventList.add(workflowEvent);
    		}
    		xmlObject.put("mode", workflowTaskList);
    		xmlObject.put("line", workflowEventList);
    	} catch (FileNotFoundException e) {
    		e.printStackTrace();
    	} catch (ParserConfigurationException e) {
    		e.printStackTrace();
    	} catch (SAXException e) {
    		e.printStackTrace();
    	} catch (IOException e) {
    		e.printStackTrace();
    	}
    	return xmlObject;
    }

}