package com.Issue_service.service;

import com.Issue_service.dto.CreateIssueRequest;
import com.Issue_service.model.Issue;

import java.util.List;

public interface IssueService {
    Issue createIssue(CreateIssueRequest request,Long userId);
    List<Issue>getIssueByProjectId(Long projectId, Long userId);
}
