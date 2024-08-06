package org.example.back.utils;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import cn.hutool.core.date.DateUtil;
import lombok.extern.slf4j.Slf4j;
import org.example.back.entity.User;

import java.util.Date;

@Slf4j
public class TokenUtils {

    private final static int EXPIRE_TIME = 1; // token 过期时间，单位分钟

    //创建token
    public static String createToken(User user) {
        return JWT.create()
                .withIssuer("admin")
                .withExpiresAt(DateUtil.offsetMinute(new Date(), EXPIRE_TIME))
                .sign(Algorithm.HMAC256("admin"));
    }

    //验证token
    public static boolean verifyToken(String token) {
            JWTVerifier verifier = JWT.require(Algorithm.HMAC256("admin"))
                    .withIssuer("admin")
                    .build();

            verifier.verify(token);
            return true;
    }
}
