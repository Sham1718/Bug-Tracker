package com.api_gateway.security;
import lombok.RequiredArgsConstructor;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.core.Ordered;
import org.springframework.http.HttpHeaders;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

import lombok.AllArgsConstructor;

import java.text.ParseException;


@Component
@AllArgsConstructor
public class JwtHeaderInjection implements GlobalFilter ,Ordered {
    private final JwtService jwtService;

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        ServerHttpRequest request =exchange.getRequest();
        String authHeader =request.getHeaders().getFirst(HttpHeaders.AUTHORIZATION);

        if (authHeader!=null&& !authHeader.startsWith("Bearer ")){
            return chain.filter(exchange);
        }

        String token=authHeader.substring(7);
        if (!jwtService.isTokenValid(token)){
            return chain.filter(exchange);
        }

        Long userId = jwtService.extractClaim(
                token,
                claims -> {
                    try {
                        return claims.getLongClaim("userId");
                    } catch (ParseException e) {
                        throw new RuntimeException("userId claim missing or invalid", e);
                    }
                }
        );

        ServerHttpRequest mutatedRequest = request.mutate()
                .header("X-User-Id",String.valueOf(userId))
                .build();
        return chain.filter(exchange.mutate().request(mutatedRequest).build());
    }

    @Override
    public int getOrder() {
        return -1;
    }
}
