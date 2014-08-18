package com.beauty.common.interceptor;

import org.apache.struts2.ServletActionContext;

import com.opensymphony.xwork2.Action;
import com.opensymphony.xwork2.ActionInvocation;
import com.opensymphony.xwork2.interceptor.MethodFilterInterceptor;

/**
 * 
 * 登录验证拦截器
 * 
 * @author zhuGy
 * */
public class AuthorityInterceptor extends MethodFilterInterceptor {
	private static final long serialVersionUID = 7402871261015923877L;

	@Override
	protected String doIntercept(ActionInvocation actionInvocation)
			throws Exception {
		Object user = ServletActionContext.getRequest().getSession()
				.getAttribute("sessionUser");
		if (null != user) {
			return actionInvocation.invoke();// 递归调用拦截器
		} else {
			return Action.LOGIN;// 返回到登录页面
		}
	}

}
