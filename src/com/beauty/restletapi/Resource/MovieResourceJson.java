package com.beauty.restletapi.Resource;


import org.json.JSONException;
import org.json.JSONObject;
import org.restlet.ext.json.JsonRepresentation;
import org.restlet.representation.Representation;
import org.restlet.resource.Get;
import org.restlet.resource.Put;
import org.restlet.resource.ServerResource;

public class MovieResourceJson extends ServerResource{

	/** 
	 * 返回简单JSON类型 
	 */  
	@Get  
	public Representation getMovieInfo() throws  JSONException{  
	    JSONObject mailEle = new JSONObject() ;  
	    mailEle.put("name", "速度与激情6") ;  
	    mailEle.put("size", 100000l) ;  
	    mailEle.put("minutes", 120) ;  
	    return new JsonRepresentation(mailEle) ;  
	}
	
	/** 
	 * 接收简单Json类型数据 
	 */  
	@Put  
	public String uploadMovie(JsonRepresentation mivieJson) throws JSONException{  
	    JSONObject movie = mivieJson.getJsonObject();    
	    String result = String.format("upload movie{name:%s size:%d minutes:%d} success!" ,  
	            movie.get("name") ,      
	            movie.get("size"),  
	            movie.get("minutes"));    
	    return result ;  
	}
	
}
