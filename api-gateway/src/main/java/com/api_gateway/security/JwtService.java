package com.api_gateway.security;


import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.util.function.Function;

@Service
public class JwtService {
    @Value("${jwt.secret}")
    private String screte;

    public <T> T extractClaim(String token, Function<JWTClaimsSet, T> resolver) {
        try {
            SignedJWT signedJWT = SignedJWT.parse(token);
            return resolver.apply(signedJWT.getJWTClaimsSet());
        } catch (ParseException e) {
            throw new RuntimeException("Invalid JWT token", e);
        }
    }

    public boolean isTokenValid(String token) {
        try {
            SignedJWT signedJWT = SignedJWT.parse(token);
            return signedJWT.getJWTClaimsSet().getExpirationTime().after(new java.util.Date());
        } catch (Exception e) {
            return false;
        }
    }

}

//done
