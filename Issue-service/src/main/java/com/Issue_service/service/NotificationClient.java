package com.Issue_service.service;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Service
public class NotificationClient {
    private final RestTemplate template;

    public NotificationClient(RestTemplate template) {
        this.template = template;
    }

    public void sendEmail(String to,String subject ,String message){
        Map<String,String>body=new HashMap<>();
        body.put("toEmail",to);
        body.put("subject",subject);
        body.put("message",message);

        template.postForObject("http://NOTIFICATION-SERVICE/notification",
                body,
                String.class);
    }
}
