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

        String path = exchange.getRequest().getURI().getPath();

        // 1️⃣ Skip auth endpoints
        if (path.startsWith("/auth")) {
            return chain.filter(exchange);
        }

        ServerHttpRequest request = exchange.getRequest();
        String authHeader = request.getHeaders().getFirst(HttpHeaders.AUTHORIZATION);

        // 2️⃣ No Authorization header or wrong format → just forward
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return chain.filter(exchange);
        }

        String token = authHeader.substring(7);

        // 3️⃣ Invalid token → forward (or block if you want later)
        if (!jwtService.isTokenValid(token)) {
            return chain.filter(exchange);
        }

        // 4️⃣ Extract userId
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

        // 5️⃣ Inject header
        ServerHttpRequest mutatedRequest = request.mutate()
                .header("X-User-Id", String.valueOf(userId))
                .build();

        return chain.filter(exchange.mutate().request(mutatedRequest).build());
    }


    @Override
    public int getOrder() {
        return -1;
    }
}
