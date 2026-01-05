package com.Notification_service.controller;


import com.Notification_service.dto.NotificationRequest;
import com.Notification_service.service.EmailService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/notification")
public class NotificationController {
    private final EmailService service;

    public NotificationController(EmailService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<String> sendNotification(
            @RequestBody NotificationRequest request
            ){
        service.setMail(request.getToEmail(),request.getSubject(),request.getMessage());
        return ResponseEntity.ok("sent notification");
    }
}
