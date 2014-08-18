package com.beauty.restletapi.Component;


import org.restlet.Component;

import com.beauty.restletapi.Application.AccountApplication;
import com.beauty.restletapi.Application.MovieApplication;


public class MovieComponent extends Component{  
	  
    public MovieComponent(){  
        setName("movie web service");  
        setDescription("movie web service");  
        setOwner("zhoufeng");  
        setAuthor("zhoufeng");  
          
        getDefaultHost().attach("/restlet/movie" , new MovieApplication());  
          
        getDefaultHost().attach("/restlet/account" ,new AccountApplication());  
          
          
    }  
  
}
