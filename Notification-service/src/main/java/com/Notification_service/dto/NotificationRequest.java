package com.Notification_service.dto;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class NotificationRequest {
    private String type;
    private String toEmail;
    private String subject;
    private String message;

}
