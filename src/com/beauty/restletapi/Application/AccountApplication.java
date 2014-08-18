package com.beauty.restletapi.Application;


import org.restlet.Application;
import org.restlet.Restlet;
import org.restlet.routing.Router;

import com.beauty.restletapi.Resource.AccountResource;


public class AccountApplication extends Application{  
	  
	  
	  
    @Override  
    public Restlet createInboundRoot() {  
        Router router = new Router(getContext()) ;  
  
        router.attach("/info" , AccountResource.class);  
  
        return router ;  
  
    }  
  
} 
