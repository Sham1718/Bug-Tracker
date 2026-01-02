package com.project_service.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<String> handleAccessDenied (AccessDeniedException ad){
        return ResponseEntity
                .status(HttpStatus.FORBIDDEN)
                .body(ad.getMessage());
    }

    @ExceptionHandler(ResourceNotFound.class)
    public  ResponseEntity <String> handleResourcenotfound(ResourceNotFound rs){
        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(rs.getMessage());
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleGlobal(Exception e){
        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Internal Server Error");

    }
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<String> handleIllegalArgument(IllegalArgumentException i){
        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(i.getMessage());
    }
}
