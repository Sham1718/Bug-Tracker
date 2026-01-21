package com.Issue_service.service;



import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name = "user-service")
public interface UserClient {
    @GetMapping("/internal/users/email-by-id")
    String getEmailByUserId(@RequestParam Long userId);
}

