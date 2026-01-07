package com.userservice.Service;


import com.userservice.dto.AuthResponse;
import com.userservice.dto.LoginRequest;
import com.userservice.dto.RegisterRequest;
import com.userservice.entity.Role;
import com.userservice.entity.User;
import com.userservice.repository.UserRepository;
import com.userservice.security.CustomUserDetails;
import com.userservice.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager manager;
    private final JwtService jwtService;

    public AuthResponse Register(RegisterRequest request){

        User user= User.builder()
                .username(request.getUsername())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.User)
                .build();
        repository.save(user);

        CustomUserDetails userDetails = new CustomUserDetails(user);
        String token = jwtService.generateToken(user);
        return new AuthResponse(token);
    }

    public AuthResponse login(LoginRequest request){
        manager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        User user=repository.findByEmail(request.getEmail()).orElseThrow(()->new RuntimeException("User Not found"));

        CustomUserDetails userDetails = new CustomUserDetails(user);
        String token = jwtService.generateToken(user);
        return new AuthResponse(token);
    }

    public AuthResponse register_admin(RegisterRequest request){
        User user= User.builder()
                .username(request.getUsername())
                .email(request.getEmail())
                .password(request.getPassword())
                .role(Role.Admin)
                .build();
        repository.save(user);

        CustomUserDetails userDetails =new CustomUserDetails(user);
        String token = jwtService.generateToken(user);
        return new AuthResponse(token);

    }

}
