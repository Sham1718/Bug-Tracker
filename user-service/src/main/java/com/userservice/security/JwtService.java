package com.userservice.security;


import com.nimbusds.jose.JWSAlgorithm;
import com.nimbusds.jose.JWSHeader;
import com.nimbusds.jose.JWSSigner;
import com.nimbusds.jose.JWSVerifier;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jose.crypto.MACVerifier;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;
import com.userservice.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.util.Date;

@Component
@RequiredArgsConstructor
public class JwtService {
    private final JwtConfig jwtConfig;

    public String generateToken(User user){
        try {
            JWSSigner signer =new MACSigner(jwtConfig.getScrete().getBytes());
            Instant now= Instant.now();

            JWTClaimsSet Claims =new JWTClaimsSet.Builder()
                    .subject(user.getUsername())
                    .issueTime(Date.from(now))
                    .expirationTime(Date.from(now.plusSeconds(3600)))
                    .claim("userId",user.getId())
                    .claim("role",user.getRole())
                    .build();

            SignedJWT signedJWT =new SignedJWT(
                    new JWSHeader(JWSAlgorithm.HS256),Claims
            );

            signedJWT.sign(signer);

            return signedJWT.serialize();
        } catch (Exception e) {
            throw new RuntimeException("Failed TO create Jwt Token",e);
        }
    }

    public boolean isTokenValid(String token ,UserDetails userDetails){
        try {
            SignedJWT signedJWT =SignedJWT.parse(token);

            JWSVerifier verifier = new MACVerifier(jwtConfig.getScrete().getBytes());
            if (!signedJWT.verify(verifier)) return  false;

            Date expiration = signedJWT.getJWTClaimsSet().getExpirationTime();
            return new Date().before(expiration);

        } catch (Exception e) {
            return false;
        }
    }

    public String extractEmail(String Token){
        try{
            SignedJWT signedJWT =SignedJWT.parse(Token);
            return signedJWT.getJWTClaimsSet().getSubject();

        } catch (Exception e) {
            throw new RuntimeException("Invalid Token");
        }
    }

}

//done with project
