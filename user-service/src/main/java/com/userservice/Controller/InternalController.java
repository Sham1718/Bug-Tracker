package com.userservice.Controller;

import com.userservice.Service.AuthService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/internal/users")
public class InternalController {

    private final AuthService service;

    public InternalController(AuthService service) {
        this.service = service;
    }
    @GetMapping("/id-by-email")
    public Long getUserIdByEmail(@RequestParam String email) {
        return service.getUserIdByEmail(email);
    }
}
