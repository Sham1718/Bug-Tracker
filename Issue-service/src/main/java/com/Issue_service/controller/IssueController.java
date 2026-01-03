package com.Issue_service.controller;


import com.Issue_service.dto.CreateIssueRequest;
import com.Issue_service.model.Issue;
import com.Issue_service.service.IssueServiceIMPL;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/issues")
public class IssueController {
    private final IssueServiceIMPL serviceIMPL;

    public IssueController(IssueServiceIMPL serviceIMPL) {
        this.serviceIMPL = serviceIMPL;
    }

    @PostMapping
    public ResponseEntity<Issue> createIssue(
            @RequestBody CreateIssueRequest request,
            @RequestHeader("X-User-Id") Long userId
            ){
            Issue issue = serviceIMPL.createIssue(request,userId);
            return new ResponseEntity<>(issue, HttpStatus.CREATED);
    }

    @GetMapping("/projects/{projectId}")
    public ResponseEntity <List<Issue>> getIssueByProjectid(
            @PathVariable Long projectId,
            @RequestHeader("X-User-Id") Long userId
    ){
       return ResponseEntity.ok( serviceIMPL.getIssueByProjectId(projectId,userId));
    }
}
