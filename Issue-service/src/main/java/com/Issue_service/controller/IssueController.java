package com.Issue_service.controller;


import com.Issue_service.dto.AssignIssueUpdate;
import com.Issue_service.dto.CreateIssueRequest;
import com.Issue_service.dto.UpdateIssueStatus;
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

    @PostMapping("/projects/{projectId}")
    public ResponseEntity<Issue> createIssue(
            @PathVariable Long projectId,
            @RequestBody CreateIssueRequest request,
            @RequestHeader("X-User-Id") Long userId
            ){
            Issue issue = serviceIMPL.createIssue(request,userId,projectId);
            return new ResponseEntity<>(issue, HttpStatus.CREATED);
    }

    @GetMapping("/projects/{projectId}")
    public ResponseEntity <List<Issue>> getIssueByProjectid(
            @PathVariable Long projectId,
            @RequestHeader("X-User-Id") Long userId
    ){
       return ResponseEntity.ok( serviceIMPL.getIssueByProjectId(projectId,userId));
    }

    @PatchMapping("/{issueId}/status")
    public ResponseEntity<Issue>updateIssueStatus(
            @PathVariable Long issueId,
            @RequestHeader("X-User-Id") Long userId,
            @RequestBody UpdateIssueStatus request
            ){
       return ResponseEntity.ok(
               serviceIMPL.updateIssueStatus(issueId,request.getStatus(),userId)
       );
    }

    @PatchMapping("/{issueId}/assignee")
    public ResponseEntity<Issue> updateAssignee(
            @PathVariable Long issueId,
            @RequestHeader("X-User-Id") Long userId,
            @RequestBody AssignIssueUpdate request
            ){
        System.out.println(request.getAssigneId());
        return ResponseEntity.ok(

                serviceIMPL.updateAssignee(issueId,request.getAssigneId(),userId)
        );
    }
}
