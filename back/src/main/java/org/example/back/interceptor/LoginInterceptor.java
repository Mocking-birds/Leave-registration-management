package org.example.back.interceptor;


import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.example.back.utils.TokenUtils;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

//定义拦截器
@Slf4j
@Component
public class LoginInterceptor implements HandlerInterceptor {
    @Override
    public boolean preHandle(final HttpServletRequest request, final HttpServletResponse response, final Object handler) {
        log.info("LoginInterceptor preHandle(目标方法执行前执行)");
        String token = request.getHeader("Authorization");
        if (token != null) {
            if(TokenUtils.verifyToken(token)){
                return true;
            }else{
                return false;
            }
        }else{
            return false;
        }
    }
}
