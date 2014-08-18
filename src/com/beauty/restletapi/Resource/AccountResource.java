package com.beauty.restletapi.Resource;


import java.io.IOException;

import org.restlet.representation.Representation;
import org.restlet.representation.StringRepresentation;
import org.restlet.resource.Get;
import org.restlet.resource.ServerResource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class AccountResource extends ServerResource{  
	  
	  
    @Get  
    public Representation getAccountInfo() throws IOException{  
        return new StringRepresentation("Account Info") ;  
    }  
  
  
}  