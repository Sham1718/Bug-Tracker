package com.userservice.security;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Configuration
public class JwtConfig {

    @Value("${jwt.secret}")
    private String screte;

    public String getScrete() {
        return screte;
    }
}
