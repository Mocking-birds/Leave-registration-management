package org.example.back.utils;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import lombok.extern.slf4j.Slf4j;
import org.example.back.entity.User;

import java.util.Date;

@Slf4j
public class TokenUtils {
    //创建token
    public static String createToken(User user) {
        return JWT.create()
                .withClaim("username", user.getUsername())
                .withClaim("password", user.getPassword())
                .withExpiresAt(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 24 * 7))
                .sign(Algorithm.HMAC256("admin"));
    }

    //验证token
    public static boolean verifyToken(String token) {
        try{
            JWTVerifier verifier =  JWT.require(Algorithm.HMAC256("admin"))
                    .build();

            verifier.verify(token);
            return true;
        }catch (Exception e){
            log.info("token错误: {}", e.getMessage());
            e.printStackTrace();
            return false;
        }

    }
}
