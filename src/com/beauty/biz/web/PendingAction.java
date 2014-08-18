package com.beauty.biz.web;

import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;

import org.hibernate.Query;
import org.springframework.beans.factory.annotation.Autowired;

import com.beauty.biz.entity.Certificateinfo;
import com.beauty.biz.entity.Module;
import com.beauty.biz.entity.ModuleRight;
import com.beauty.biz.entity.Userinfo;
import com.beauty.biz.entity.Userroleinfo;
import com.beauty.biz.entity.author.Authorizedsignature;
import com.beauty.biz.entity.group.Usergroup;
import com.beauty.biz.service.CertificateinfoManager;
import com.beauty.biz.service.PendingManager;
import com.beauty.biz.service.group.UsergroupManager;
import com.beauty.common.page.QueryResult;
import com.beauty.common.utils.EasyStr;
import com.beauty.common.utils.SessionUser;
import com.beauty.common.web.StrutsAction;

/**
 * @Description 本类主要处理PendingAction.java
 * @author chenxz
 * @date 2012-9-5
 */
public class PendingAction extends StrutsAction<Userinfo>{

	private static final long serialVersionUID = -6432118655689267242L;
	
	@Autowired
	private PendingManager pendingManager;										//待办
	@Autowired
	private UsergroupManager usergroupManager;									//用户组	
	@Autowired
	private CertificateinfoManager certificateinfoManager;
	/**
	 * 待办列表
	 * @throws IOException
	 */
	@SuppressWarnings({ "unchecked", "deprecation" })
	public void getPendings(){
		try{
			StringBuffer innerHtml = new StringBuffer();
			String daiban="";
			SessionUser suser = this.getSessionUser();//登录用户信息	
			
			//==========校准曲线待办		
//			List<String> curveobj = getCurveData();
//			if(curveobj.size()>0){
				//List<Devicecalibratecurve> curvelist = devicecalibratecurveManager.getCurvesByHql("from Devicecalibratecurve o where o.iteminfo.itemid in ("+curveobj.get(0)+") and o.method.methodid in ("+curveobj.get(1)+")").list();
//				String SQL="";	
//				String fileName = "/sql/CurvePending.xml"; 
//				Object[] curveobjs = new Object[]{getSessionUser().getUserid(),getSessionUser().getUserid(),getSessionUser().getUserid()};
//				String realPath = getRequest().getSession().getServletContext().getRealPath(fileName);
//				SQL = getSqlText("sql",realPath,"GetCurvePends");
//				QueryResult<Object[]> q = authorizedsignatureManager.getScrollDateByXmlSQL(1, 20, SQL,curveobjs);
//				if(q.getTotalrecord()>0){
//					daiban += "<div class=\"remind_child_out\" onclick=\"javascript:showContentPage('curve/devicecalibratecurve!toCurvelist.action','校准曲线管理','仪器设备管理');\" onmousemove=\"this.className='remind_child_over'\" onmouseout=\"this.className='remind_child_out'\">";
//					daiban += "<a>待更新校准曲线<span class=\"remind_num\">("+q.getTotalrecord()+")</span></a>";
//					daiban += "</div>";
//				}
//			}
			//==========校准曲线待办结束
			//=========数据录入
//			int datacount = pendingManager.getPendings("select distinct s.iitemid from Sampleitem s where s.status='SampeTest' and ( s.anlyseperson='"+suser.getUserid()+"' or s.anlyseperson like '"+suser.getUserid()+",%' or s.anlyseperson like '%,"+suser.getUserid()+",%'  or s.anlyseperson like '%,"+suser.getUserid()+"')");
//			if(datacount>0){
//				daiban += "<div class=\"remind_child_out\" onclick=\"javascript:showContentPage('sampletest/sampletestbybatch!toSampletestbybatchList.action','原始数据录入（按批检验）','样品检验管理');\" onmousemove=\"this.className='remind_child_over'\" onmouseout=\"this.className='remind_child_out'\">";
//				daiban += "<a>数据录入<span class=\"remind_num\">("+ datacount +")</span></a>";
//				daiban += "</div>";
//			}
			//=========数据录入结束
			if(daiban == ""){
				daiban += "<div class=\"remind_child_out\" onmouseout=\"this.className='remind_child_out'\">";
				daiban += "<a href=\"#\">无待办任务</a>";
				daiban += "</div>";
			}
			innerHtml.append(daiban);
			sendMsg(innerHtml.toString());
		}catch(Exception e){
			e.printStackTrace();
		}
	}
	
	/**
	 * 日期比较
	 * @param date		上次检定校准或者维护时间
	 * @param cycle		周期
	 * @param type		类型（年、月、日）
	 * @param day		提醒天数
	 * @return true为过期或者即将到期，false为没有到提醒时间
	 */
	public static boolean comparedate(String date,int cycle,String type,int day){
		try{
			boolean flag = false;
			//默认10天提醒
			if(day==0){
				day = 10;
			}
			//当前日期
			Date now = new Date();
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
			
			if (date != null) {
				String dateStr = date;
				if(type.equals("年")){
					dateStr = (Integer.parseInt(dateStr.substring(0, 4)) + cycle)+ dateStr.substring(4, dateStr.length());
				}
				if(type.equals("月")){
					dateStr = (dateStr.substring(0, 5)) + (Integer.parseInt(dateStr.substring(5,7)) + cycle) + dateStr.substring(dateStr.length()-3);			
				}
				if(type.equals("日")){
					dateStr = (dateStr.substring(0, 8))+ (Integer.parseInt(dateStr.substring(dateStr.length()-2))+cycle);			
				}
			
				try {
					Date createTime = sdf.parse(dateStr);
					if((createTime.getTime()-now.getTime())<0){
						flag = true;//过期
					}else{
						//即将到期或者没到到期时间
						flag = (Math.floor(createTime.getTime()-now.getTime())/(1000*60*60*24))<day?true:false;
					}
				} catch (ParseException e) {
					e.printStackTrace();
				}
			}
			return flag;
		}catch(Exception e){
			e.printStackTrace();
			return false;
		}
	}
	
	
	
	
	
	/**
	 * 对字符串进行去重复操作。
	 * @param codeids
	 * @return
	 */
	public String removeRepeat(String codeids){
		//对codeids 进行去重复~~begin~~~
		String T_Str=""+codeids+"";
		String R_Str="";
		String[] OID_Arr=T_Str.split(",");
		for(int i=0;i<OID_Arr.length;i++)
		{
		   for(int j=i+1;j<OID_Arr.length;j++)
		   {
		if(OID_Arr[i].equals(OID_Arr[j]))
		{
		   OID_Arr[j]="";
		}
		   }
		}
		for(int m=0;m<OID_Arr.length;m++)
		{
		  if(OID_Arr[m]!="")
		  {
		    R_Str=R_Str==""?OID_Arr[m]:R_Str+","+OID_Arr[m];
		  }
		}  
		//对codeids 进行去重复~~end~~~
		return R_Str;
	}
	
	
	
	/**
	 * 去除重复值，但顺序改变
	 * @param list
	 * @return
	 */
    public static List<String> removeDuplicate(List<String> list){        
    	HashSet<String> hashSet = new HashSet<String>(list);        
    	list.clear();         
    	list.addAll(hashSet);                 
    	return list;    
    } 
    
	
	/**
	 * 转向待办列表
	 * 
	 */
	public String pendingInfo(){	
		return "list";
	}

}
