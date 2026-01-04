package com.Issue_service.controller;

import com.Issue_service.dto.CommentRequest;
import com.Issue_service.model.Comment;
import com.Issue_service.service.CommentService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/issue/{issueId}/comments")
public class CommentController {
    private final CommentService service;


    public CommentController(CommentService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<Comment>> getAllComments(
            @PathVariable Long issueId,
            @RequestHeader("X-User-Id") Long userId
    ){
        return ResponseEntity.ok(
                service.getAllComment(issueId,userId)
        );
    }

    @PostMapping
    public ResponseEntity<Comment> addComment(
            @PathVariable Long issueId,
            @RequestHeader("X-User-Id") Long userId,
            @RequestBody CommentRequest request
            ){
        return ResponseEntity.ok(
                service.addComment(issueId,userId,request.getContent())
        );
    }
}
