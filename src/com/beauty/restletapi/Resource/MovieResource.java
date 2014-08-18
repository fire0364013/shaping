package com.beauty.restletapi.Resource;


import javax.resource.ResourceException;

import org.restlet.Context;
import org.restlet.Request;
import org.restlet.Response;
import org.restlet.data.Form;
import org.restlet.data.MediaType;
import org.restlet.representation.Representation;
import org.restlet.representation.StringRepresentation;
import org.restlet.representation.Variant;
import org.restlet.resource.Delete;  
import org.restlet.resource.Get;  
import org.restlet.resource.Post;  
import org.restlet.resource.Put;  
import org.restlet.resource.ServerResource;  
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.beauty.biz.dao.UserInfoDao;
import com.beauty.biz.entity.Userinfo;
import com.beauty.biz.service.UserInfoManager;
import com.runqian.report4.remote.example.UserInfo;
  
/** 
 * 
 */  
@Service
public class MovieResource extends ServerResource{  
      

	String userid = "";
	@Autowired
	private UserInfoDao userInfoDao;
	
	
	@Override
	protected void doInit() {
		this.userid = (String) getRequest().getAttributes().get("userid");
	}
	
    @Get  
    public String play(){  
        Form form = getRequest().getResourceRef().getQueryAsForm() ;    //获取查询参数  
        String movie = form.getFirstValue("movie");     //获取key=movie的参数值  
//        UserInfoManager userInfoManager = new UserInfoManager();
//        UserInfoDao userInfoDao = new UserInfoDao();
        Userinfo userinfo = userInfoDao.getUserInfo(userid);
        if(userinfo !=null)
        {
        	System.err.println("用户名为："+userinfo.getLoginname());
        }
        return "电影正在播放，电影名称：" + movie;  
    }  
      
      
    @Post  
    public String pause(String movie){  
    	return movie + "暂停...";  
    }  
      
    @Put  
    public String upload(){  
        return "电影正在上传...";  
    }  
      
    @Delete  
    public String deleteMovie(){  
        return "删除电影...";  
    }  
      
      
} 
