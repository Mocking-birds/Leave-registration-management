package org.example.back.common;

import com.auth0.jwt.exceptions.TokenExpiredException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalException {
    @ExceptionHandler(TokenExpiredException.class)
    public R exception(Exception e) {
        return R.tokenError(404,"token已过期");
    }
}
