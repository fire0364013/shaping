package com.beauty.restletapi.Application;


import org.restlet.Application;
import org.restlet.Restlet;
import org.restlet.routing.Router;

import com.beauty.restletapi.Resource.MovieResource;


public class MovieApplication extends Application{  
	  
	  
	  
    @Override  
    public Restlet createInboundRoot() {  
        Router router = new Router(getContext()) ;  
  
        router.attach("/info" , MovieResource.class);  
  
        return router ;  
  
    }  
  
}
