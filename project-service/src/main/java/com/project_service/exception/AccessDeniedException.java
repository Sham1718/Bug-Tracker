package com.project_service.exception;

public class AccessDeniedException extends RuntimeException {

    public AccessDeniedException(String message){
        super(message);
    }
}
